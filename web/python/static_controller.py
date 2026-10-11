from pathlib import Path

class StaticController:

    MIME_TYPES = {
        '.html': 'text/html; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.json': 'application/json; charset=utf-8',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.pdf': 'application/pdf',
        '.txt': 'text/plain; charset=utf-8'
    }

    def __init__(self, root_dir: Path = None):
        if root_dir is None:
            p = Path(__file__).resolve().parent
            if p.name == "python" and p.parent.name == "web":
                root_dir = p.parent.parent
            else:
                root_dir = p.parent
        self.root_dir = Path(root_dir)
        self.web_dir = self.root_dir / "web"
        self.data_dir = (self.root_dir / "data") if (self.root_dir / "data").exists() else (self.web_dir / "data")
        self._cache = {}

    def resolve_file(self, requested_path: str) -> tuple:

        clean_path = requested_path.split('?')[0].lstrip('/')
        if clean_path in self._cache:
            return self._cache[clean_path]

        result = (None, None)
        if clean_path in ('', 'index.html'):
            target = self.web_dir / 'index.html'
            if target.exists():
                result = (target, 'text/html; charset=utf-8')

        if result[0] is not None:
            self._cache[clean_path] = result
            return result

        target = self.web_dir / clean_path
        if target.exists() and target.is_file():
            mime = self.MIME_TYPES.get(target.suffix.lower(), 'application/octet-stream')
            result = (target, mime)
            self._cache[clean_path] = result
            return result

        for subdir in ('css', 'js', 'data', 'locales', 'assets'):
            fallback = self.web_dir / subdir / clean_path
            if fallback.exists() and fallback.is_file():
                mime = self.MIME_TYPES.get(fallback.suffix.lower(), 'application/octet-stream')
                result = (fallback, mime)
                self._cache[clean_path] = result
                return result

        if clean_path.startswith('data/'):
            sub_path = clean_path[len('data/'):]
            target = self.data_dir / sub_path
            if target.exists() and target.is_file():
                mime = self.MIME_TYPES.get(target.suffix.lower(), 'application/octet-stream')
                result = (target, mime)
                self._cache[clean_path] = result
                return result

        root_target = self.root_dir / clean_path
        if root_target.exists() and root_target.is_file():
            mime = self.MIME_TYPES.get(root_target.suffix.lower(), 'application/octet-stream')
            result = (root_target, mime)
            self._cache[clean_path] = result
            return result

        return None, None
