import re
from typing import Optional, Tuple
from core.character import Character
from core.pdf_view import PdfCharacterSheetView
from core.character_repository import ICharacterRepository, CharacterRepository
from core.pdf_import_service import PdfImportService

class CharacterController:
    """
    Controller responsible for character management operations (MVC & SOLID).
    Enforces user isolation so each user only sees and modifies their own sheets.
    """

    def __init__(self, repository: Optional[ICharacterRepository] = None, pdf_view: Optional[PdfCharacterSheetView] = None):
        self.repository = repository or CharacterRepository()
        self.pdf_view = pdf_view or PdfCharacterSheetView()
        self.pdf_import = PdfImportService()

    def list_files(self, user_id: str = "default") -> dict:
        files = self.repository.list_files(user_id=user_id)
        characters = self.repository.list_characters(user_id=user_id)
        templates = self.repository.list_templates()
        return {
            'files': files,
            'characters': characters,
            'templates': templates,
            'user_id': user_id,
            'total_characters': len(characters)
        }

    def load_character(self, user_id: str = "default", filename: str = "") -> dict:
        if not filename:
            filename = 'Caspian_Blade.json'
        return self.repository.load(user_id=user_id, filename=filename)

    def save_character(self, user_id: str = "default", filename: str = "", data: Optional[dict] = None) -> dict:
        if data is None:
            data = {}

        char_name = data.get('basic', {}).get('in-name', '').strip() or data.get('name', '').strip()
        if not filename or filename in ('character_creator.json', 'default.json'):
            if char_name:
                safe_name = re.sub(r'[^\w\-_\. ]', '_', char_name).strip().replace(' ', '_')
                filename = f"{safe_name}.json"
            else:
                filename = 'character_sheet.json'
        elif not filename.endswith('.json'):
            filename = f"{filename}.json"

        saved_path = self.repository.save(user_id=user_id, filename=filename, data=data)

        return {
            'status': 'ok',
            'saved_to': saved_path.name,
            'size': saved_path.stat().st_size,
            'character_name': char_name or saved_path.stem,
            'user_id': user_id
        }

    def delete_character(self, user_id: str = "default", filename: str = "") -> dict:
        if not filename:
            return {'status': 'error', 'message': 'Filename is required'}

        success = self.repository.delete(user_id=user_id, filename=filename)
        return {
            'status': 'ok' if success else 'not_found',
            'deleted': filename,
            'user_id': user_id
        }

    def list_templates(self) -> dict:
        templates = self.repository.list_templates()
        return {'status': 'ok', 'templates': templates}

    def load_template(self, filename: str) -> dict:
        return self.repository.load_template(filename)

    def generate_pdf(self, data: dict, as_attachment: bool = True) -> Tuple[bytes, str, str, Optional[object]]:
        character = Character.from_dict(data)
        pdf_bytes, out_path, safe_name = self.pdf_view.render(character)

        disposition = f'attachment; filename="{safe_name}_Character_Sheet.pdf"' if as_attachment else 'inline'
        return pdf_bytes, safe_name, disposition, out_path

    def calculate_abilities(self, data: dict) -> dict:
        character = Character.from_dict(data)
        return character.resolve_abilities()

    def import_pdf(self, pdf_bytes: bytes) -> dict:
        """Parse an AcroForm PDF and return character data as a dict."""
        return self.pdf_import.parse(pdf_bytes)
