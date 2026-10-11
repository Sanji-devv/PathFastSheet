import json
from pathlib import Path

class CharacterRepository:

    def __init__(self, root_dir: Path = None):
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
        self.root_dir = self.storage_dir
        self._meta_cache = {}

    def list_characters(self) -> list[dict]:

        items = []
        excluded = {'package.json', 'tsconfig.json', 'armor.json', 'weapons.json'}
        for f in self.storage_dir.glob('*.json'):
            if f.name.lower() in excluded or f.name.startswith('.'):
                continue
            try:
                stat = f.stat()
                cached = self._meta_cache.get(f.name)
                if cached and cached.get('mtime') == stat.st_mtime and cached.get('size') == stat.st_size:
                    items.append(cached)
                    continue

                with open(f, 'r', encoding='utf-8') as jf:
                    data = json.load(jf)
                basic = data.get('basic', {})
                name = basic.get('in-name') or f.stem
                cls = basic.get('in-class') or 'Unknown'
                lvl = basic.get('in-level') or '1'
                player = basic.get('in-player') or ''
                entry = {
                    'filename': f.name,
                    'name': name,
                    'class': cls,
                    'level': lvl,
                    'player': player,
                    'mtime': stat.st_mtime,
                    'size': stat.st_size
                }
                self._meta_cache[f.name] = entry
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
                    'size': stat.st_size
                }
                self._meta_cache[f.name] = entry
                items.append(entry)
        items.sort(key=lambda x: x['mtime'], reverse=True)
        return items

    def list_files(self) -> list[str]:

        return [c['filename'] for c in self.list_characters()]

    def load(self, filename: str) -> dict:

        clean_name = Path(filename).name
        file_path = self.storage_dir / clean_name

        if not file_path.exists():

            root_fallback = self.project_root / clean_name
            if root_fallback.exists():
                file_path = root_fallback
            else:
                raise FileNotFoundError(f"Character file not found: {clean_name}")

        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)

    def save(self, filename: str, data: dict) -> Path:

        clean_name = Path(filename).name
        if not clean_name.endswith('.json'):
            clean_name += '.json'

        file_path = self.storage_dir / clean_name
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        self._meta_cache.pop(clean_name, None)
        return file_path

    def delete(self, filename: str) -> bool:

        clean_name = Path(filename).name
        file_path = self.storage_dir / clean_name
        deleted = False

        if file_path.exists() and file_path.is_file():
            file_path.unlink()
            deleted = True
            self._meta_cache.pop(clean_name, None)

        pdf_path = self.storage_dir / f"{file_path.stem}_Character_Sheet.pdf"
        if pdf_path.exists() and pdf_path.is_file():
            try:
                pdf_path.unlink()
            except Exception:
                pass

        return deleted
