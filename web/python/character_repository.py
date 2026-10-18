import re
import json
import shutil
from pathlib import Path
from typing import Optional, Protocol, List, Dict

class ICharacterRepository(Protocol):
    def list_characters(self, user_id: str = "default") -> List[dict]:
        ...
    def list_files(self, user_id: str = "default") -> List[str]:
        ...
    def load(self, user_id: str = "default", filename: str = "") -> dict:
        ...
    def save(self, user_id: str = "default", filename: str = "", data: Optional[dict] = None) -> Path:
        ...
    def delete(self, user_id: str = "default", filename: str = "") -> bool:
        ...
    def list_templates(self) -> List[dict]:
        ...
    def load_template(self, filename: str) -> dict:
        ...

class CharacterRepository:
    """
    User-Isolated Character Repository adhering to SOLID principles.
    Each user's characters are stored in a dedicated partition: characters/data/<user_id>/
    Users cannot access or view other users' character sheets.
    """

    def __init__(self, root_dir: Optional[Path] = None):
        if root_dir is None:
            p = Path(__file__).resolve().parent
            if p.name == "python" and p.parent.name == "web":
                self.project_root = p.parent.parent
            else:
                self.project_root = p.parent
            self.storage_dir = self.project_root / "characters"
        else:
            p = Path(root_dir)
            if p.name == "characters":
                self.storage_dir = p
                self.project_root = p.parent
            else:
                self.project_root = p
                self.storage_dir = p / "characters"

        self.storage_dir.mkdir(parents=True, exist_ok=True)
        self.data_dir = self.storage_dir / "data"
        self.data_dir.mkdir(parents=True, exist_ok=True)
        self.templates_dir = self.storage_dir / "templates"
        self.templates_dir.mkdir(parents=True, exist_ok=True)

        self._meta_cache: Dict[str, dict] = {}
        self._init_templates()

    def _init_templates(self):
        """Seed templates from existing character files if present."""
        root_caspian = self.storage_dir / "Caspian_Blade.json"
        dest_caspian = self.templates_dir / "Caspian_Blade.json"
        if root_caspian.exists() and not dest_caspian.exists():
            try:
                shutil.copy2(root_caspian, dest_caspian)
            except Exception as e:
                print(f"Could not seed Caspian_Blade template: {e}")

    def _get_user_dir(self, user_id: str) -> Path:
        safe_id = re.sub(r'[^\w\-_\.]', '_', str(user_id or 'default')).strip() or 'default'
        user_path = (self.data_dir / safe_id).resolve()
        
        # Security: Prevent path traversal
        if not str(user_path).startswith(str(self.data_dir.resolve())):
            user_path = self.data_dir / "default"

        user_path.mkdir(parents=True, exist_ok=True)
        return user_path

    def _sanitize_filename(self, filename: str) -> str:
        clean = Path(filename).name
        clean = re.sub(r'[^\w\-_\. ]', '_', clean).strip()
        if not clean.endswith('.json'):
            clean += '.json'
        return clean

    def list_characters(self, user_id: str = "default") -> List[dict]:
        user_dir = self._get_user_dir(user_id)
        items = []
        excluded = {'package.json', 'tsconfig.json', 'armor.json', 'weapons.json'}

        for f in user_dir.glob('*.json'):
            if f.name.lower() in excluded or f.name.startswith('.'):
                continue
            cache_key = f"{user_id}:{f.name}"
            try:
                stat = f.stat()
                cached = self._meta_cache.get(cache_key)
                if cached and cached.get('mtime') == stat.st_mtime and cached.get('size') == stat.st_size:
                    items.append(cached)
                    continue

                with open(f, 'r', encoding='utf-8') as jf:
                    data = json.load(jf)
                basic = data.get('basic', {})
                name = basic.get('in-name') or data.get('name') or f.stem
                cls = basic.get('in-class') or data.get('class') or 'Unknown'
                lvl = basic.get('in-level') or data.get('level') or '1'
                player = basic.get('in-player') or data.get('player') or ''
                entry = {
                    'filename': f.name,
                    'name': name,
                    'class': cls,
                    'level': str(lvl),
                    'player': player,
                    'mtime': stat.st_mtime,
                    'size': stat.st_size,
                    'user_id': user_id
                }
                self._meta_cache[cache_key] = entry
                items.append(entry)
            except Exception:
                stat = f.stat()
                entry = {
                    'filename': f.name,
                    'name': f.stem,
                    'class': 'Unknown',
                    'level': '',
                    'player': '',
                    'mtime': stat.st_mtime,
                    'size': stat.st_size,
                    'user_id': user_id
                }
                self._meta_cache[cache_key] = entry
                items.append(entry)

        items.sort(key=lambda x: x['mtime'], reverse=True)
        return items

    def list_files(self, user_id: str = "default") -> List[str]:
        return [c['filename'] for c in self.list_characters(user_id)]

    def load(self, user_id: str = "default", filename: str = "") -> dict:
        if not filename:
            filename = 'Caspian_Blade.json'
        clean_name = self._sanitize_filename(filename)
        user_dir = self._get_user_dir(user_id)
        file_path = user_dir / clean_name

        # 1. Search in user's isolated folder
        if file_path.exists() and file_path.is_file():
            with open(file_path, 'r', encoding='utf-8') as f:
                return json.load(f)

        # 2. Fallback to public templates folder if user hasn't copied it yet
        template_path = self.templates_dir / clean_name
        if template_path.exists() and template_path.is_file():
            with open(template_path, 'r', encoding='utf-8') as f:
                return json.load(f)

        # 3. Fallback to legacy root characters folder
        legacy_path = self.storage_dir / clean_name
        if legacy_path.exists() and legacy_path.is_file():
            with open(legacy_path, 'r', encoding='utf-8') as f:
                return json.load(f)

        raise FileNotFoundError(f"Character file not found: {clean_name}")

    def save(self, user_id: str = "default", filename: str = "", data: Optional[dict] = None) -> Path:
        if data is None:
            data = {}
        clean_name = self._sanitize_filename(filename)
        user_dir = self._get_user_dir(user_id)
        file_path = user_dir / clean_name

        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        cache_key = f"{user_id}:{clean_name}"
        self._meta_cache.pop(cache_key, None)
        return file_path

    def delete(self, user_id: str = "default", filename: str = "") -> bool:
        clean_name = self._sanitize_filename(filename)
        user_dir = self._get_user_dir(user_id)
        file_path = user_dir / clean_name
        deleted = False

        if file_path.exists() and file_path.is_file():
            file_path.unlink()
            deleted = True
            cache_key = f"{user_id}:{clean_name}"
            self._meta_cache.pop(cache_key, None)

        pdf_path = user_dir / f"{file_path.stem}_Character_Sheet.pdf"
        if pdf_path.exists() and pdf_path.is_file():
            try:
                pdf_path.unlink()
            except Exception:
                pass

        return deleted

    def list_templates(self) -> List[dict]:
        templates = []
        for f in self.templates_dir.glob('*.json'):
            try:
                with open(f, 'r', encoding='utf-8') as jf:
                    data = json.load(jf)
                basic = data.get('basic', {})
                name = basic.get('in-name') or data.get('name') or f.stem
                cls = basic.get('in-class') or data.get('class') or 'Unknown'
                lvl = basic.get('in-level') or data.get('level') or '1'
                templates.append({
                    'filename': f.name,
                    'name': name,
                    'class': cls,
                    'level': str(lvl),
                    'is_template': True
                })
            except Exception:
                templates.append({
                    'filename': f.name,
                    'name': f.stem,
                    'class': 'Template',
                    'level': '1',
                    'is_template': True
                })
        return templates

    def load_template(self, filename: str) -> dict:
        clean_name = self._sanitize_filename(filename)
        t_path = self.templates_dir / clean_name
        if t_path.exists():
            with open(t_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        raise FileNotFoundError(f"Template not found: {clean_name}")
