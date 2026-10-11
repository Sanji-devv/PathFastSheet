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

def main():
    parser = argparse.ArgumentParser(description="PathFastSheet - Pathfinder 1E Character Sheet Generator")
    parser.add_argument("--port", type=int, default=5050, help="Port to run the web server on (default: 5050)")
    parser.add_argument("--no-browser", action="store_true", help="Do not automatically open the browser on startup")

    args = parser.parse_args()

    repository = CharacterRepository()
    pdf_view = PdfCharacterSheetView()
    character_controller = CharacterController(repository=repository, pdf_view=pdf_view)
    static_controller = StaticController()

    server = FastSheetServer(
        port=args.port,
        character_controller=character_controller,
        static_controller=static_controller
    )

    server.start(open_browser=not args.no_browser)

if __name__ == '__main__':
    main()
