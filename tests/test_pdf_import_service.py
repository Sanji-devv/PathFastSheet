import sys
import unittest
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT / "web" / "python"))

from pdf_import_service import PdfImportService


class PdfImportServiceTests(unittest.TestCase):
    def test_blank_sheet_does_not_invent_class_or_hit_points(self):
        character = PdfImportService()._map_fields_to_character({})

        self.assertEqual(character["name"], "Imported Character")
        self.assertNotIn("classKey", character)
        self.assertNotIn("currentHp", character["sheetData"])
        self.assertNotIn("maxHp", character["sheetData"])
        self.assertEqual(character["sheetData"]["hpExtraMisc"], 0)

    def test_maps_character_data_to_editor_schema(self):
        raw = {
            "Character Name": "Test Hero",
            "Character Class and Level": "Fighter 3 / Rogue 2",
            "Race": "Human",
            "Size": "Medium",
            "Gender": "Female",
            "Alignment": "CG",
            "Experience Points": "5,000",
            "Strength": "16",
            "Dexterity": "14",
            "Constitution": "14",
            "Intelligence": "14",
            "Wisdom": "12",
            "Charisma": "10",
            "Hit Points": "41",
            "Wounds/Current HP": "27",
            "Armor Class": "18",
            "Fortitude Save Base": "3",
            "Fortitude Save Magic Modifier": "1",
            "Fortitude Save Misc Modifier": "2",
            "Acrobatics Total": "9",
            "Acrobatics Ranks": "2",
            "Acrobatics Mod": "2",
            "Acrobatics Train": "true",
            "Bluff Total": "8",
            "Bluff Ranks": "1",
            "Bluff Train": "true",
            "Craft 1 Description": "Alchemy",
            "Craft 1 Total": "8",
            "Craft 1 Ranks": "3",
            "Craft 1 Mod": "2",
            "Craft 1 Train": "true",
            "Weapon 1": "Longbow +1",
            "Weapon 1 Attack Bonus": "+9",
            "Weapon 1 Damage": "1d8+3",
            "Weapon 1 Critical": "20/x3",
            "Weapon 1 Range": "100 ft",
            "Weapon 1 Type": "Ranged",
            "Weapon 1 Ammunition": "20 arrows",
            "Armor Name": "Chain Shirt",
            "Armor AC": "+4",
            "Armor Type": "Light",
            "Armor Check Penalty": "-2",
            "Armor Weight": "25",
            "AC Item 2": "Buckler",
            "AC Item 2 Properties": "Shield",
            "AC Item 2 Bonus": "+1",
            "Gear 1": "Thieves' tools",
            "Feats 1": "Weapon Focus",
            "Special Ability 1": "Trapfinding",
            "Languages 1": "Common",
            "Languages 2": "Elven",
            "Copper": "4",
            "Silver": "5",
            "Gold": "120",
            "Platinum": "1",
            "Spells 1 1": "Magic Missile",
            "Spells 1 Known": "3",
            "Spells 1 Save DC": "14",
            "Spells 1 Per Day": "4",
            "Spells 1 Bonus": "1",
        }

        character = PdfImportService()._map_fields_to_character(raw)
        sheet = character["sheetData"]

        self.assertEqual(character["name"], "Test Hero")
        self.assertEqual(character["level"], 3)
        self.assertEqual(character["dynamic"]["classes"][1]["class"], "rogue")
        self.assertEqual(character["dynamic"]["classes"][1]["level"], 2)
        self.assertEqual(sheet["abilityScores"], {
            "str": 16, "dex": 14, "con": 14, "int": 14, "wis": 12, "cha": 10,
        })
        self.assertEqual(sheet["currentHp"], 27)
        self.assertEqual(sheet["maxHp"], 41)
        self.assertEqual(sheet["saveBase_fort"], 3)
        self.assertEqual(sheet["saveAbility_fort"], 2)
        self.assertEqual(sheet["saveMagic_fort"], 1)
        self.assertEqual(sheet["saveMisc_fort"], 2)
        self.assertEqual(sheet["acMisc"], 1)
        self.assertEqual(sheet["skills"]["acrobatics"], {
            "isClassSkill": True, "ranks": 2, "misc": 2,
        })
        self.assertEqual(sheet["skills"]["bluff"]["misc"], 4)
        self.assertEqual(sheet["skills"]["craft1"]["customSubname"], "Alchemy")
        self.assertEqual(sheet["skills"]["craft1"]["ranks"], 3)
        self.assertEqual(sheet["weapons"][0]["atkType"], "ranged")
        self.assertEqual(sheet["weapons"][0]["ammo"], "20 arrows")
        ac_items = {item["type"]: item for item in sheet["acItems"]}
        self.assertEqual(set(ac_items), {"armor", "shield"})
        self.assertEqual(ac_items["armor"]["name"], "Chain Shirt")
        self.assertEqual(sheet["gear"][0]["name"], "Thieves' tools")
        self.assertEqual(sheet["feats"][0]["title"], "Weapon Focus")
        self.assertEqual(sheet["specials"][0]["title"], "Trapfinding")
        self.assertEqual(sheet["languages"], "Common, Elven")
        self.assertEqual(sheet["spells"]["levels"]["1"]["spells"], ["Magic Missile"])
        self.assertEqual(sheet["spells"]["levels"]["1"]["per_day"], "4")
        self.assertEqual(sheet["moneyGp"], 120)


if __name__ == "__main__":
    unittest.main()
