import json
from pathlib import Path
import sys

import types

base_dir = Path(__file__).resolve().parent.parent
pkg_dir = base_dir / "web" / "python"
sys.path.insert(0, str(pkg_dir))
if 'core' not in sys.modules:
    core_pkg = types.ModuleType('core')
    core_pkg.__path__ = [str(pkg_dir)]
    sys.modules['core'] = core_pkg

from core.character import Character
from core.pdf_view import PdfCharacterSheetView

caspian_data = {
    "name": "Caspian Blade",
    "player": "ERDEM UĞUR ŞAHİN",
    "alignment": "LG",
    "classKey": "omdura",
    "class": "Omdura",
    "className": "Omdura",
    "level": 12,
    "race": "Human",
    "deity": "Siwion",
    "homeland": "Malburg",
    "size": "Med",
    "gender": "Male",
    "age": "31",
    "height": "170",
    "weight": "80",
    "hair": "Blonde",
    "eyes": "Blue",
    "xp": "",
    "basic": {
        "in-name": "Caspian Blade",
        "in-player": "ERDEM UĞUR ŞAHİN",
        "in-alignment": "LG",
        "in-class": "Omdura 12",
        "in-level": 12,
        "in-race": "Human",
        "in-deity": "Siwion",
        "in-homeland": "Malburg",
        "in-size": "Med",
        "in-gender": "Male",
        "in-age": "31",
        "in-height": "170",
        "in-weight": "80",
        "in-hair": "Blonde",
        "in-eyes": "Blue",
        "in-str": 16,
        "in-dex": 14,
        "in-con": 16,
        "in-int": 14,
        "in-wis": 12,
        "in-cha": 18,
        "in-hp": 107,
        "in-dr": "",
        "in-speed": "30",
        "in-speed-armor": "20",
        "in-init": "7",
        "in-init-extra": "+5",
        "in-ac": 20,
        "in-ac-touch": 13,
        "in-ac-flat": 18,
        "in-ac-armor": 7,
        "in-ac-shield": 0,
        "in-ac-deflection": 1,
        "in-ac-check-penalty": -5,
        "in-fort": 14,
        "in-fort-base": 8,
        "in-fort-magic": 3,
        "in-ref": 9,
        "in-ref-base": 4,
        "in-ref-magic": 3,
        "in-will": 12,
        "in-will-base": 8,
        "in-will-magic": 3,
        "in-bab": "+9",
        "in-cmb": 12,
        "in-cmd": 24,
        "in-languages": "Common, Imperial, Infernal, Celestial",
        "in-gear": "Clerik Kit\nInquisitor Kit\nRing of Protection +1\nSTR Belt +2\nCloak Of Resistance +3",
        "in-feats": "Additional Traits(Fate's Favored, Reactionary), Defiant Luck, Weapon Focus(Cutlass), Improved Initiative, Inexplicable Luck, Bestow Luck, Improved Critical(Cutlass)"
    },
    "dynamic": {
        "classes": [{"class": "omdura", "name": "Omdura", "level": 12}],
        "weapons": [
            {
                "name": "Cutlass",
                "attack": "+13/+8",
                "crit": "15-20/x2",
                "damage": "1d6+4",
                "type": "Melee",
                "range": "",
                "ammo": ""
            },
            {
                "name": "Longbow",
                "attack": "+12/+7",
                "crit": "20/x3",
                "damage": "d8",
                "type": "Ranged",
                "range": "100 ft",
                "ammo": "20"
            }
        ],
        "ac_items": [
            {
                "name": "Breastplate",
                "bonus": "+6",
                "max_dex": "+3",
                "check_penalty": "-4",
                "spell_failure": "-",
                "weight": "30",
                "properties": "Armor",
                "is_active": True
            },
            {
                "name": "Buckler",
                "bonus": "+1",
                "max_dex": "-",
                "check_penalty": "-1",
                "spell_failure": "-",
                "weight": "5",
                "properties": "Shield",
                "is_active": True
            }
        ],
        "save_items": [
            {
                "name": "Cloak Of Resistance +3",
                "bonus": 3,
                "target": "all",
                "type": "resistance",
                "is_active": True
            }
        ],
        "gear": [
            {"name": "Clerik Kit", "weight": 0},
            {"name": "Inquisitor Kit", "weight": 0},
            {"name": "Ring of Protection +1", "weight": 0},
            {"name": "STR Belt +2", "weight": 0},
            {"name": "Cloak Of Resistance +3", "weight": 0}
        ],
        "skills": [
            {"name": "acrobatics", "total": "3", "ranks": "6", "misc": "", "isClass": False},
            {"name": "appraise", "total": "6", "ranks": "1", "misc": "", "isClass": True},
            {"name": "bluff", "total": "8", "ranks": "1", "misc": "", "isClass": True},
            {"name": "climb", "total": "4", "ranks": "6", "misc": "", "isClass": False},
            {"name": "craft", "desc": "", "total": "6", "ranks": "1", "misc": "", "isClass": True},
            {"name": "craft", "desc": "", "total": "2", "ranks": "", "misc": "", "isClass": False},
            {"name": "craft", "desc": "", "total": "2", "ranks": "", "misc": "", "isClass": False},
            {"name": "diplomacy", "total": "8", "ranks": "1", "misc": "", "isClass": True},
            {"name": "disable device", "total": "", "ranks": "", "misc": "", "isClass": False},
            {"name": "disguise", "total": "4", "ranks": "", "misc": "", "isClass": False},
            {"name": "escape artist", "total": "9", "ranks": "12", "misc": "", "isClass": False},
            {"name": "fly", "total": "-3", "ranks": "", "misc": "", "isClass": False},
            {"name": "handle animal", "total": "", "ranks": "", "misc": "", "isClass": False},
            {"name": "heal", "total": "1", "ranks": "", "misc": "", "isClass": False},
            {"name": "intimidate", "total": "4", "ranks": "", "misc": "", "isClass": False},
            {"name": "knowledge (arcana)", "total": "9", "ranks": "4", "misc": "", "isClass": True},
            {"name": "knowledge (dungeoneering)", "total": "", "ranks": "", "misc": "", "isClass": False},
            {"name": "knowledge (engineering)", "total": "", "ranks": "", "misc": "", "isClass": False},
            {"name": "knowledge (geography)", "total": "", "ranks": "", "misc": "", "isClass": False},
            {"name": "knowledge (history)", "total": "", "ranks": "", "misc": "", "isClass": False},
            {"name": "knowledge (local)", "total": "", "ranks": "", "misc": "", "isClass": False},
            {"name": "knowledge (nature)", "total": "", "ranks": "", "misc": "", "isClass": False},
            {"name": "knowledge (nobility)", "total": "9", "ranks": "4", "misc": "", "isClass": True},
            {"name": "knowledge (planes)", "total": "9", "ranks": "4", "misc": "", "isClass": True},
            {"name": "knowledge (religion)", "total": "9", "ranks": "4", "misc": "", "isClass": True},
            {"name": "linguistics", "total": "7", "ranks": "2", "misc": "", "isClass": True},
            {"name": "perception", "total": "16", "ranks": "12", "misc": "", "isClass": True},
            {"name": "perform", "desc": "", "total": "4", "ranks": "", "misc": "", "isClass": False},
            {"name": "perform", "desc": "", "total": "4", "ranks": "", "misc": "", "isClass": False},
            {"name": "profession", "desc": "", "total": "1", "ranks": "", "misc": "", "isClass": False},
            {"name": "profession", "desc": "", "total": "1", "ranks": "", "misc": "", "isClass": False},
            {"name": "ride", "total": "-3", "ranks": "", "misc": "", "isClass": False},
            {"name": "sense motive", "total": "1", "ranks": "", "misc": "", "isClass": False},
            {"name": "sleight of hand", "total": "", "ranks": "", "misc": "", "isClass": False},
            {"name": "spellcraft", "total": "11", "ranks": "6", "misc": "", "isClass": True},
            {"name": "stealth", "total": "3", "ranks": "6", "misc": "", "isClass": False},
            {"name": "survival", "total": "1", "ranks": "", "misc": "", "isClass": False},
            {"name": "swim", "total": "5", "ranks": "7", "misc": "", "isClass": False},
            {"name": "use magic device", "total": "15", "ranks": "7", "misc": "1", "isClass": True}
        ]
    },
    "sheetData": {
        "specials": [
            {"title": "Improved Invocations 12 min as Move", "desc": ""},
            {"title": "Destruction: +5 sacred weapon damage rolls", "desc": ""},
            {"title": "Healing: Fast Healing 5", "desc": ""},
            {"title": "Justice: +3 sacred attack rolls, +6 confirm crits", "desc": ""},
            {"title": "Piercing: +5 sacred Concentration, CL and SR", "desc": ""},
            {"title": "Protection: +3 sacred AC, +6 vs crit confirm", "desc": ""},
            {"title": "Purify: +3 sacred on all saving throws", "desc": ""},
            {"title": "Resiliency: DR 3/alignment", "desc": ""},
            {"title": "Resistance: 10 ER (acid, cold, elec, fire, sonic)", "desc": ""},
            {"title": "Smiting: bypass DR/magic, align & adamantine", "desc": ""},
            {"title": "Smite 3/day (+2 atk, +6 dmg, +2 AC)", "desc": ""},
            {"title": "Divine Touch 10/day (6d6 heal/harm)", "desc": ""},
            {"title": "Mercy(Shaken/Enfeebled/Restorative/Ensorcelled)", "desc": ""},
            {"title": "Divine Weapon 2/day(+3 enhancement 12 min)", "desc": ""},
            {"title": "Commune 1/day (Sp)", "desc": ""}
        ],
        "spells": {
            "castingClass": "Omdura",
            "cl": 12,
            "levels": {
                "0": {
                    "dc": 14,
                    "per_day": 6,
                    "known": "",
                    "bonus": "",
                    "spells": ["Detect Magic", "Detect Poison", "Guidance", "Light", "Read Magic", "Mending"]
                },
                "1": {
                    "dc": 15,
                    "per_day": 5,
                    "bonus": 1,
                    "known": 6,
                    "spells": ["Bless", "Divine Favor", "Liberating Command", "Cure Light Wounds", "Sanctuary", "Hero's Defiance", "Tactical Acumen"]
                },
                "2": {
                    "dc": 16,
                    "per_day": 5,
                    "bonus": 1,
                    "known": 6,
                    "spells": ["Com Protection from Evil, Ironskin", "Defending Bone", "Grace", "Invisibility", "Silence", "Bestow Grace", "Carry Companion"]
                },
                "3": {
                    "dc": 17,
                    "per_day": 4,
                    "bonus": 1,
                    "known": 5,
                    "spells": ["Beacon of Luck, Sanctify Armor", "Dispel Magic", "Prayer", "Second Wind", "Angelic Aspect", "Litany of Escape"]
                },
                "4": {
                    "dc": 18,
                    "per_day": 3,
                    "bonus": 1,
                    "known": 4,
                    "spells": ["Blessing of Fervor", "Com Protection from Energy", "Divine Power", "Freedom of Movement"]
                }
            }
        }
    }
}

char = Character(caspian_data)
view = PdfCharacterSheetView(base_dir / "Pathfinder-Character-Sheet-EDIT.pdf")
fields = view.map_character_to_fields(char)
print("Mapped fields count:", len(fields))
for k in ["Character Name", "Alignment", "Player", "Character Class and Level", "Deity", "Homeland", "Race", "Size", "Gender", "Age", "Height", "Weight", "Hair", "Eyes"]:
    print(f"  {k}: {fields.get(k)}")

for k in ["Strength", "Strength Modifier", "Dexterity", "Dexterity Modifier", "Initiative", "Initiative Misc Modifier", "Armor Class", "Touch Armor Class", "Flatfooted Armor Class"]:
    print(f"  {k}: {fields.get(k)}")

for k in ["Fortitude Save", "Fortitude Save Base", "Fortitude Save Magic Modifier", "Reflex Save", "Reflex Save Base", "Reflex Save Magic Modifier", "Will Save", "Will Save Base", "Will Save Magic Modifier"]:
    print(f"  {k}: {fields.get(k)}")

for k in ["Weapon 1", "Weapon 1 Attack Bonus", "Weapon 1 Damage", "Weapon 1 Critical", "Weapon 2", "Weapon 2 Attack Bonus", "Weapon 2 Damage", "Weapon 2 Critical"]:
    print(f"  {k}: {fields.get(k)}")

for k in ["AC Item 1", "AC Item 1 Bonus", "AC Item 1 Check Penalty", "AC Item 2", "AC Item 2 Bonus", "AC Item 2 Check Penalty", "AC Item Bonus Total", "AC Item Check Penalty Total"]:
    print(f"  {k}: {fields.get(k)}")

for i in range(1, 5):
    print(f"  Feats {i}: {fields.get(f'Feats {i}')}")

for i in range(1, 16):
    print(f"  Special Ability {i}: {fields.get(f'Special Ability {i}')}")

for lvl in range(5):
    print(f"  Spells {lvl}: DC={fields.get(f'Spells {lvl} Save DC')} PerDay={fields.get(f'Spells {lvl} Per Day')} Bonus={fields.get(f'Spells {lvl} Bonus')} Known={fields.get(f'Spells {lvl} Known')}")
    for idx in range(1, 8):
        val = fields.get(f'Spells {lvl} {idx}')
        if val:
            print(f"    Spells {lvl} {idx}: {val}")
