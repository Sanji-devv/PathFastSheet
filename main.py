import sys
import argparse
from pathlib import Path
import types

pkg_dir = Path(__file__).resolve().parent / "web" / "python"
if pkg_dir.exists():
    sys.path.insert(0, str(pkg_dir))
    if 'core' not in sys.modules:
        core_pkg = types.ModuleType('core')
        core_pkg.__path__ = [str(pkg_dir)]
        sys.modules['core'] = core_pkg

from core.server import FastSheetServer
from core.character_controller import CharacterController
from core.static_controller import StaticController
from core.character_repository import CharacterRepository
from core.pdf_view import PdfCharacterSheetView
from core.user_repository import JsonUserRepository
from core.auth_controller import AuthController

def main():
    parser = argparse.ArgumentParser(description="PathFastSheet - Pathfinder 1E Character Sheet Generator (SOLID & MVC)")
    parser.add_argument("--port", type=int, default=5050, help="Port to run the web server on (default: 5050)")
    parser.add_argument("--no-browser", action="store_true", help="Do not automatically open the browser on startup")

    args = parser.parse_args()

    # Model Layer (Repositories with Dependency Inversion)
    user_repository = JsonUserRepository()
    character_repository = CharacterRepository()
    pdf_view = PdfCharacterSheetView()

    # Controller Layer (MVC)
    auth_controller = AuthController(user_repository=user_repository)
    character_controller = CharacterController(repository=character_repository, pdf_view=pdf_view)
    static_controller = StaticController()

    # Server (Request Dispatcher)
    server = FastSheetServer(
        port=args.port,
        character_controller=character_controller,
        static_controller=static_controller,
        auth_controller=auth_controller
    )

    server.start(open_browser=not args.no_browser)

if __name__ == '__main__':
    main()
