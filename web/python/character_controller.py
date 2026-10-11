from core.character import Character
from core.abilities import AbilitiesEngine
from core.pdf_view import PdfCharacterSheetView
from core.character_repository import CharacterRepository

class CharacterController:

    def __init__(self, repository: CharacterRepository = None, pdf_view: PdfCharacterSheetView = None):
        self.repository = repository or CharacterRepository()
        self.pdf_view = pdf_view or PdfCharacterSheetView()

    def list_files(self) -> dict:

        files = self.repository.list_files()
        characters = self.repository.list_characters()
        return {'files': files, 'characters': characters}

    def load_character(self, filename: str) -> dict:

        if not filename:
            filename = 'character_creator.json'
        return self.repository.load(filename)

    def save_character(self, filename: str, data: dict) -> dict:

        import re
        char_name = data.get('basic', {}).get('in-name', '').strip()
        if not filename or filename == 'character_creator.json':
            if char_name:
                safe_name = re.sub(r'[^\w\-_\. ]', '_', char_name).strip().replace(' ', '_')
                filename = f"{safe_name}.json"
            else:
                filename = 'character_creator.json'

        saved_path = self.repository.save(filename, data)

        return {
            'status': 'ok',
            'saved_to': saved_path.name,
            'size': saved_path.stat().st_size,
            'character_name': char_name or saved_path.stem
        }

    def delete_character(self, filename: str) -> dict:

        success = self.repository.delete(filename)
        return {'status': 'ok' if success else 'not_found', 'deleted': filename}

    def generate_pdf(self, data: dict, as_attachment: bool = True) -> tuple:

        character = Character.from_dict(data)
        pdf_bytes, out_path, safe_name = self.pdf_view.render(character)

        disposition = f'attachment; filename="{safe_name}_Character_Sheet.pdf"' if as_attachment else 'inline'
        return pdf_bytes, safe_name, disposition, out_path

    def calculate_abilities(self, data: dict) -> dict:

        character = Character.from_dict(data)
        return character.resolve_abilities()
