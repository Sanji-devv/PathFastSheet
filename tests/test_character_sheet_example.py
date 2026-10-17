import json
import sys
import types
import unittest
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
PYTHON_CORE = PROJECT_ROOT / "web" / "python"
sys.path.insert(0, str(PYTHON_CORE))

core_package = types.ModuleType("core")
core_package.__path__ = [str(PYTHON_CORE)]
sys.modules["core"] = core_package

from core.character import Character
from core.pdf_view import PdfCharacterSheetView


class CaspianCharacterSheetTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        sample_path = PROJECT_ROOT / "characters" / "Caspian_Blade.json"
        cls.sample = json.loads(sample_path.read_text(encoding="utf-8"))

    def test_gear_objects_keep_their_names_and_multiple_kits(self):
        character = Character.from_dict(self.sample)

        self.assertEqual(
            character.get_clean_gear(),
            [
                "Clerik Kit",
                "Inquisitor Kit",
                "Ring of Protection +1",
                "STR Belt +2",
                "Cloak Of Resistance +3",
            ],
        )

    def test_example_maps_character_and_inventory_to_pdf_fields(self):
        character = Character.from_dict(self.sample)
        fields = PdfCharacterSheetView().map_character_to_fields(character)

        self.assertEqual(fields["Character Name"], "Caspian Blade")
        self.assertEqual(fields["Character Class and Level"], "Omdura 12")
        self.assertEqual(fields["Gear 1"], "Clerik Kit")
        self.assertEqual(fields["Gear 2"], "Inquisitor Kit")
        self.assertEqual(fields["Gear 4"], "STR Belt +2")
        self.assertEqual(fields["Spells 1 1"], "Bless")
        self.assertEqual(fields["Spells 0 Per Day"], "6")
        self.assertEqual(fields["Spells 4 Save DC"], "18")
        self.assertEqual(fields["Spells 4 Per Day"], "3")

    def test_zero_slot_autosave_keeps_imported_spell_counts(self):
        sample = json.loads(json.dumps(self.sample))
        for slot in sample["sheetData"]["spells"]["slots"]:
            slot["perDay"] = 0

        fields = PdfCharacterSheetView().map_character_to_fields(Character.from_dict(sample))

        self.assertEqual(
            [fields[f"Spells {level} Per Day"] for level in range(5)],
            ["6", "5", "5", "4", "3"],
        )


if __name__ == "__main__":
    unittest.main()
