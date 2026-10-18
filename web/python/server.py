import gzip
import json
import re
import urllib.parse
import webbrowser
from pathlib import Path
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from typing import Optional, Tuple

from core.character_controller import CharacterController
from core.static_controller import StaticController
from core.auth_controller import AuthController

class FastSheetRequestHandler(BaseHTTPRequestHandler):

    character_controller: CharacterController = None
    static_controller: StaticController = None
    auth_controller: AuthController = None

    _STATIC_CACHE = {}

    def __init__(self, *args, **kwargs):
        self._custom_cache_headers = False
        super().__init__(*args, **kwargs)

    def end_headers(self, custom_headers: Optional[list] = None):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Session-Token')
        self.send_header('Access-Control-Expose-Headers', 'Content-Disposition, X-Saved-Path, ETag, Set-Cookie')
        if custom_headers:
            for k, v in custom_headers:
                self.send_header(k, v)
        if not self._custom_cache_headers:
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Expires', '0')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def _get_cookie_token(self) -> Optional[str]:
        cookie_header = self.headers.get('Cookie', '')
        if not cookie_header:
            return None
        for part in cookie_header.split(';'):
            part = part.strip()
            if part.startswith('pf_session_token='):
                return part.split('=', 1)[1].strip()
            elif part.startswith('pf_session='):
                return part.split('=', 1)[1].strip()
        return None

    def _get_session_token(self) -> Optional[str]:
        auth_header = self.headers.get('Authorization', '')
        if auth_header.startswith('Bearer '):
            return auth_header[7:].strip()
        x_token = self.headers.get('X-Session-Token')
        if x_token:
            return x_token.strip()
        return self._get_cookie_token()

    def _get_current_user(self) -> Tuple[object, Optional[str]]:
        token = self._get_session_token()
        return self.auth_controller.get_or_create_user(token)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)

        user, new_token = self._get_current_user()
        set_cookies = []
        if new_token:
            set_cookies.append(f"pf_session_token={new_token}; Path=/; SameSite=Lax; Max-Age=2592000")

        try:
            if path == '/api/auth/me':
                self.send_json({
                    'status': 'ok',
                    'user': user.to_dict(),
                    'token': self._get_session_token() or new_token
                }, set_cookies=set_cookies)

            elif path in ('/api/files', '/api/characters'):
                data = self.character_controller.list_files(user_id=user.id)
                self.send_json(data, set_cookies=set_cookies)

            elif path in ('/api/load', '/api/load-character'):
                filename = query.get('file', ['Caspian_Blade.json'])[0]
                try:
                    data = self.character_controller.load_character(user_id=user.id, filename=filename)
                    self.send_json(data, set_cookies=set_cookies)
                except FileNotFoundError:
                    self.send_json({'error': f'File not found: {filename}'}, status=404, set_cookies=set_cookies)

            elif path == '/api/templates':
                data = self.character_controller.list_templates()
                self.send_json(data, set_cookies=set_cookies)

            elif path == '/api/load-template':
                filename = query.get('file', ['Caspian_Blade.json'])[0]
                try:
                    data = self.character_controller.load_template(filename)
                    self.send_json(data, set_cookies=set_cookies)
                except FileNotFoundError:
                    self.send_json({'error': f'Template not found: {filename}'}, status=404, set_cookies=set_cookies)

            else:
                target_file, mime_type = self.static_controller.resolve_file(path)
                if target_file and target_file.exists():
                    self.serve_file(target_file, mime_type)
                else:
                    self.send_error(404, "File Not Found")
        except Exception as e:
            self.send_json({'error': str(e)}, status=500, set_cookies=set_cookies)

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)

        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length)

        if path == '/api/import-pdf':
            content_type = self.headers.get('Content-Type', '')
            pdf_bytes = self._extract_pdf_from_multipart(body, content_type)
            if pdf_bytes is None:
                pdf_bytes = body
            if not pdf_bytes or pdf_bytes[:4] != b'%PDF':
                self.send_json({'error': 'Invalid PDF file. Please upload a valid Pathfinder AcroForm PDF.'}, status=400)
                return
            try:
                user, new_token = self._get_current_user()
                set_cookies = []
                if new_token:
                    set_cookies.append(f"pf_session_token={new_token}; Path=/; SameSite=Lax; Max-Age=2592000")
                char_data = self.character_controller.import_pdf(pdf_bytes)
                self.send_json({'status': 'ok', 'character': char_data}, set_cookies=set_cookies)
                return
            except Exception as e:
                import traceback
                traceback.print_exc()
                self.send_json({'error': str(e)}, status=500)
                return

        try:
            payload = json.loads(body.decode('utf-8')) if body else {}
        except Exception as e:
            self.send_json({'error': f'Invalid JSON format: {e}'}, status=400)
            return

        user, new_token = self._get_current_user()
        set_cookies = []
        if new_token:
            set_cookies.append(f"pf_session_token={new_token}; Path=/; SameSite=Lax; Max-Age=2592000")

        try:
            if path == '/api/auth/register':
                res, token, status_code = self.auth_controller.register(payload)
                resp_cookies = [f"pf_session_token={token}; Path=/; SameSite=Lax; Max-Age=2592000"] if token else None
                self.send_json(res, status=status_code, set_cookies=resp_cookies)

            elif path == '/api/auth/login':
                res, token, status_code = self.auth_controller.login(payload)
                resp_cookies = [f"pf_session_token={token}; Path=/; SameSite=Lax; Max-Age=2592000"] if token else None
                self.send_json(res, status=status_code, set_cookies=resp_cookies)

            elif path == '/api/auth/logout':
                token = self._get_session_token()
                res = self.auth_controller.logout(token)
                self.send_json(res, set_cookies=["pf_session_token=; Path=/; Max-Age=0"])

            elif path in ('/api/save', '/api/save-character'):
                filename = query.get('file', [''])[0]
                if not filename and isinstance(payload, dict):
                    filename = payload.get('filename', '')
                    if 'data' in payload and isinstance(payload['data'], dict):
                        payload = payload['data']
                res = self.character_controller.save_character(user_id=user.id, filename=filename, data=payload)
                self.send_json(res, set_cookies=set_cookies)

            elif path in ('/api/generate-pdf', '/api/preview-pdf'):
                as_attachment = (path == '/api/generate-pdf')
                pdf_bytes, safe_name, disposition, out_path = self.character_controller.generate_pdf(payload, as_attachment=as_attachment)

                self.send_response(200)
                self.send_header('Content-Type', 'application/pdf')
                self.send_header('Content-Disposition', disposition)
                self.send_header('Content-Length', str(len(pdf_bytes)))
                self.send_header('X-Saved-Path', str(out_path.name) if out_path else f"{safe_name}.pdf")
                for c in set_cookies:
                    self.send_header('Set-Cookie', c)
                self.end_headers()
                self.wfile.write(pdf_bytes)

            elif path == '/api/calculate-abilities':
                res = self.character_controller.calculate_abilities(payload)
                self.send_json(res, set_cookies=set_cookies)

            elif path in ('/api/delete-character', '/api/delete'):
                filename = payload.get('filename', '') if isinstance(payload, dict) else ''
                if not filename:
                    filename = query.get('file', [''])[0]
                if not filename:
                    self.send_json({'error': 'Filename is required'}, status=400, set_cookies=set_cookies)
                    return
                res = self.character_controller.delete_character(user_id=user.id, filename=filename)
                self.send_json(res, set_cookies=set_cookies)

            elif path == '/api/import-pdf':
                content_type = self.headers.get('Content-Type', '')
                pdf_bytes = self._extract_pdf_from_multipart(body, content_type)
                if pdf_bytes is None:
                    # Fallback: treat raw body as PDF bytes
                    pdf_bytes = body
                if not pdf_bytes or pdf_bytes[:4] != b'%PDF':
                    self.send_json({'error': 'Invalid PDF file. Please upload a valid Pathfinder AcroForm PDF.'}, status=400, set_cookies=set_cookies)
                    return
                char_data = self.character_controller.import_pdf(pdf_bytes)
                self.send_json({'status': 'ok', 'character': char_data}, set_cookies=set_cookies)

            else:
                self.send_error(404, "Endpoint Not Found")

        except Exception as e:
            import traceback
            traceback.print_exc()
            self.send_json({'error': str(e)}, status=500, set_cookies=set_cookies)

    def _extract_pdf_from_multipart(self, body: bytes, content_type: str) -> Optional[bytes]:
        """Extract the first PDF file bytes from a multipart/form-data body."""
        boundary_match = re.search(r'boundary=([^;\s]+)', content_type)
        if not boundary_match:
            return None
        boundary = boundary_match.group(1).strip('"').encode()
        delimiter = b'--' + boundary
        parts = body.split(delimiter)
        for part in parts:
            if b'Content-Disposition' not in part:
                continue
            # Split headers from body
            sep = b'\r\n\r\n'
            idx = part.find(sep)
            if idx == -1:
                sep = b'\n\n'
                idx = part.find(sep)
            if idx == -1:
                continue
            headers_raw = part[:idx]
            file_bytes = part[idx + len(sep):]
            # Strip trailing boundary marker
            file_bytes = file_bytes.rstrip(b'\r\n--')
            # Only accept parts that contain a PDF
            if file_bytes[:4] == b'%PDF':
                return file_bytes
        return None

    def do_DELETE(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)
        user, _ = self._get_current_user()

        if path in ('/api/delete-character', '/api/delete'):
            filename = query.get('file', [''])[0]
            if not filename:
                self.send_json({'error': 'Filename is required'}, status=400)
                return
            res = self.character_controller.delete_character(user_id=user.id, filename=filename)
            self.send_json(res)
        else:
            self.send_error(404, "Endpoint Not Found")

    def send_json(self, data, status=200, set_cookies: Optional[list] = None):
        body = json.dumps(data, ensure_ascii=False).encode('utf-8')
        accept_encoding = self.headers.get('Accept-Encoding', '')

        custom_headers = []
        if set_cookies:
            for cookie in set_cookies:
                custom_headers.append(('Set-Cookie', cookie))

        if len(body) > 1024 and 'gzip' in accept_encoding:
            compressed = gzip.compress(body, compresslevel=6)
            self.send_response(status)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Encoding', 'gzip')
            self.send_header('Content-Length', str(len(compressed)))
            self.end_headers(custom_headers=custom_headers)
            self.wfile.write(compressed)
        else:
            self.send_response(status)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers(custom_headers=custom_headers)
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

    def __init__(self, port: int = 5050, character_controller=None, static_controller=None, auth_controller=None):
        self.port = port
        self.character_controller = character_controller or CharacterController()
        self.static_controller = static_controller or StaticController()
        self.auth_controller = auth_controller or AuthController()

    def start(self, open_browser: bool = True):
        FastSheetRequestHandler.character_controller = self.character_controller
        FastSheetRequestHandler.static_controller = self.static_controller
        FastSheetRequestHandler.auth_controller = self.auth_controller

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
        print("   User-Isolated Characters: Active")
        print("=" * 65)

        if open_browser:
            webbrowser.open(url)

        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\n[INFO] Server shutting down...")
            server.server_close()
