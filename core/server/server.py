import gzip
import json
import urllib.parse
import webbrowser
from pathlib import Path
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler

from core.character_controller import CharacterController
from core.static_controller import StaticController

class FastSheetRequestHandler(BaseHTTPRequestHandler):

    character_controller: CharacterController = None
    static_controller: StaticController = None

    _STATIC_CACHE = {}

    def __init__(self, *args, **kwargs):
        self._custom_cache_headers = False
        super().__init__(*args, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Access-Control-Expose-Headers', 'Content-Disposition, X-Saved-Path, ETag')
        if not self._custom_cache_headers:
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Expires', '0')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)

        try:
            if path in ('/api/files', '/api/characters'):
                data = self.character_controller.list_files()
                self.send_json(data)
            elif path in ('/api/load', '/api/load-character'):
                filename = query.get('file', ['character_creator.json'])[0]
                try:
                    data = self.character_controller.load_character(filename)
                    self.send_json(data)
                except FileNotFoundError:
                    self.send_json({'error': f'File not found: {filename}'}, status=404)
            else:
                target_file, mime_type = self.static_controller.resolve_file(path)
                if target_file and target_file.exists():
                    self.serve_file(target_file, mime_type)
                else:
                    self.send_error(404, "File Not Found")
        except Exception as e:
            self.send_json({'error': str(e)}, status=500)

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)

        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length)

        try:
            payload = json.loads(body.decode('utf-8'))
        except Exception as e:
            self.send_json({'error': f'Invalid JSON format: {e}'}, status=400)
            return

        try:
            if path in ('/api/save', '/api/save-character'):
                filename = query.get('file', [''])[0]
                if not filename and isinstance(payload, dict):
                    filename = payload.get('filename', '')
                    if 'data' in payload and isinstance(payload['data'], dict):
                        payload = payload['data']
                res = self.character_controller.save_character(filename, payload)
                self.send_json(res)

            elif path in ('/api/generate-pdf', '/api/preview-pdf'):
                as_attachment = (path == '/api/generate-pdf')
                pdf_bytes, safe_name, disposition, out_path = self.character_controller.generate_pdf(payload, as_attachment=as_attachment)

                self.send_response(200)
                self.send_header('Content-Type', 'application/pdf')
                self.send_header('Content-Disposition', disposition)
                self.send_header('Content-Length', str(len(pdf_bytes)))
                self.send_header('X-Saved-Path', str(out_path.name) if out_path else f"{safe_name}.pdf")
                self.end_headers()
                self.wfile.write(pdf_bytes)

            elif path == '/api/calculate-abilities':
                res = self.character_controller.calculate_abilities(payload)
                self.send_json(res)

            elif path in ('/api/delete-character', '/api/delete'):
                filename = payload.get('filename', '') if isinstance(payload, dict) else ''
                if not filename:
                    filename = query.get('file', [''])[0]
                if not filename:
                    self.send_json({'error': 'Filename is required'}, status=400)
                    return
                res = self.character_controller.delete_character(filename)
                self.send_json(res)

            else:
                self.send_error(404, "Endpoint Not Found")

        except Exception as e:
            import traceback
            traceback.print_exc()
            self.send_json({'error': str(e)}, status=500)

    def do_DELETE(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)

        try:
            if path in ('/api/delete', '/api/delete-character'):
                filename = query.get('file', [''])[0] or query.get('filename', [''])[0]
                if not filename:
                    self.send_json({'error': 'Filename is required'}, status=400)
                    return
                res = self.character_controller.delete_character(filename)
                self.send_json(res)
            else:
                self.send_error(404, "Endpoint Not Found")
        except Exception as e:
            self.send_json({'error': str(e)}, status=500)

    def send_json(self, data, status=200):
        body = json.dumps(data, ensure_ascii=False).encode('utf-8')
        accept_encoding = self.headers.get('Accept-Encoding', '')

        if len(body) > 1024 and 'gzip' in accept_encoding:
            compressed = gzip.compress(body, compresslevel=6)
            self.send_response(status)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Encoding', 'gzip')
            self.send_header('Content-Length', str(len(compressed)))
            self.end_headers()
            self.wfile.write(compressed)
        else:
            self.send_response(status)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)

    def serve_file(self, file_path: Path, content_type: str):
        stat = file_path.stat()
        mtime = int(stat.st_mtime)
        size = stat.st_size
        etag = f'"{mtime:x}-{size:x}"'

        client_etag = self.headers.get('If-None-Match')
        if client_etag and client_etag.strip() == etag:
            self._custom_cache_headers = True
            self.send_response(304)
            self.send_header('ETag', etag)
            self.send_header('Cache-Control', 'public, max-age=3600')
            self.end_headers()
            return

        cached = self._STATIC_CACHE.get(file_path)
        if cached and cached[0] == mtime:
            raw_content, gzip_content = cached[1], cached[2]
        else:
            with open(file_path, 'rb') as f:
                raw_content = f.read()
            gzip_content = gzip.compress(raw_content, compresslevel=6) if len(raw_content) > 512 else None
            self._STATIC_CACHE[file_path] = (mtime, raw_content, gzip_content)

        accept_encoding = self.headers.get('Accept-Encoding', '')
        is_compressible = content_type.startswith(('text/', 'application/javascript', 'application/json', 'image/svg+xml'))

        self._custom_cache_headers = True
        self.send_response(200)
        self.send_header('Content-Type', content_type)
        self.send_header('ETag', etag)
        self.send_header('Cache-Control', 'public, max-age=3600')

        if gzip_content and is_compressible and 'gzip' in accept_encoding:
            self.send_header('Content-Encoding', 'gzip')
            self.send_header('Content-Length', str(len(gzip_content)))
            self.end_headers()
            self.wfile.write(gzip_content)
        else:
            self.send_header('Content-Length', str(len(raw_content)))
            self.end_headers()
            self.wfile.write(raw_content)

    def log_message(self, format, *args):

        print(f"[{self.log_date_time_string()}] {args[0]}")

class FastSheetServer:

    def __init__(self, port: int = 5050, character_controller=None, static_controller=None):
        self.port = port
        self.character_controller = character_controller or CharacterController()
        self.static_controller = static_controller or StaticController()

    def start(self, open_browser: bool = True):

        FastSheetRequestHandler.character_controller = self.character_controller
        FastSheetRequestHandler.static_controller = self.static_controller

        server = None
        bound_port = None

        for p in range(self.port, self.port + 15):
            try:
                server = ThreadingHTTPServer(('127.0.0.1', p), FastSheetRequestHandler)
                bound_port = p
                break
            except OSError:
                continue

        if not server:
            raise RuntimeError(f"Could not bind to any port in range {self.port}-{self.port + 15}")

        url = f"http://127.0.0.1:{bound_port}"
        print("=" * 65)
        print("   FASTSHEET - PATHFINDER 1E SHEET GENERATOR (SOLID & MVC)")
        print(f"   Server Address: {url}")
        print("=" * 65)

        if open_browser:
            webbrowser.open(url)

        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\n[INFO] Server shutting down...")
            server.server_close()
