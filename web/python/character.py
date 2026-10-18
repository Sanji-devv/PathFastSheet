import re
import json
from pathlib import Path
from core.equipment import get_carrying_capacity, WeaponItem, ArmorItem
from core.abilities import AbilitiesEngine

SKILL_NAME_MAP = {
    'acrobatics': 'Acrobatics',
    'appraise': 'Appraise',
    'bluff': 'Bluff',
    'climb': 'Climb',
    'diplomacy': 'Diplomacy',
    'disable device': 'Disable Device',
    'disguise': 'Disguise',
    'escape artist': 'Escape Artist',
    'fly': 'Fly',
    'handle animal': 'Handle Animal',
    'heal': 'Heal',
    'intimidate': 'Intimidate',
    'knowledge (arcana)': 'Knowledge Arcana',
    'knowledge arcana': 'Knowledge Arcana',
    'knowledge (dungeoneering)': 'Knowledge Dungeoneering',
    'knowledge dungeoneering': 'Knowledge Dungeoneering',
    'knowledge (engineering)': 'Knowledge Engineering',
    'knowledge engineering': 'Knowledge Engineering',
    'knowledge (geography)': 'Knowledge Geography',
    'knowledge geography': 'Knowledge Geography',
    'knowledge (history)': 'Knowledge History',
    'knowledge history': 'Knowledge History',
    'knowledge (local)': 'Knowledge Local',
    'knowledge local': 'Knowledge Local',
    'knowledge (nature)': 'Knowledge Nature',
    'knowledge nature': 'Knowledge Nature',
    'knowledge (nobility)': 'Knowledge Nobility',
    'knowledge nobility': 'Knowledge Nobility',
    'knowledge (planes)': 'Knowledge Planes',
    'knowledge planes': 'Knowledge Planes',
    'knowledge (religion)': 'Knowledge Religion',
    'knowledge religion': 'Knowledge Religion',
    'linguistics': 'Linguistics',
    'perception': 'Perception',
    'ride': 'Ride',
    'sense motive': 'Sense Motive',
    'sleight of hand': 'Sleight of Hand',
    'spellcraft': 'Spellcraft',
    'stealth': 'Stealth',
    'survival': 'Survival',
    'swim': 'Swim',
    'use magic device': 'Use Magic Device'
}

CLASS_STARTING_KITS = {
    'alchemist': "Alchemist's Kit",
    'antipaladin': "Antipaladin's Kit",
    'arcanist': "Arcanist's Kit",
    'barbarian': "Barbarian's Kit",
    'bard': "Bard's Kit",
    'bloodrager': "Bloodrager's Kit",
    'brawler': "Brawler's Kit",
    'cavalier': "Cavalier's Kit",
    'cleric': "Cleric's Kit",
    'druid': "Druid's Kit",
    'fighter': "Fighter's Kit",
    'gunslinger': "Gunslinger's Kit",
    'hunter': "Hunter's Kit",
    'inquisitor': "Inquisitor's Kit",
    'investigator': "Investigator's Kit",
    'kineticist': "Kineticist's Kit",
    'magus': "Magus's Kit",
    'medium': "Medium's Kit",
    'mesmerist': "Mesmerist's Kit",
    'monk': "Monk's Kit",
    'occultist': "Occultist's Kit",
    'omdura': "Omdura's Kit",
    'oracle': "Oracle's Kit",
    'paladin': "Paladin's Kit",
    'psychic': "Psychic's Kit",
    'ranger': "Ranger's Kit",
    'rogue': "Rogue's Kit",
    'shaman': "Shaman's Kit",
    'shifter': "Shifter's Kit",
    'skald': "Skald's Kit",
    'slayer': "Slayer's Kit",
    'sorcerer': "Sorcerer's Kit",
    'spiritualist': "Spiritualist's Kit",
    'swashbuckler': "Swashbuckler's Kit",
    'vigilante': "Vigilante's Kit",
    'warpriest': "Warpriest's Kit",
    'witch': "Witch's Kit",
    'wizard': "Wizard's Kit"
}

SPELLCASTING_CONFIG = {
    'bard': {'stat': 'cha', 'max_lvl': 6, 'min_cl': 1},
    'cleric': {'stat': 'wis', 'max_lvl': 9, 'min_cl': 1},
    'druid': {'stat': 'wis', 'max_lvl': 9, 'min_cl': 1},
    'paladin': {'stat': 'cha', 'max_lvl': 4, 'min_cl': 4},
    'ranger': {'stat': 'wis', 'max_lvl': 4, 'min_cl': 4},
    'sorcerer': {'stat': 'cha', 'max_lvl': 9, 'min_cl': 1},
    'wizard': {'stat': 'int', 'max_lvl': 9, 'min_cl': 1},
    'alchemist': {'stat': 'int', 'max_lvl': 6, 'min_cl': 1},
    'inquisitor': {'stat': 'wis', 'max_lvl': 6, 'min_cl': 1},
    'magus': {'stat': 'int', 'max_lvl': 6, 'min_cl': 1},
    'omdura': {'stat': 'cha', 'max_lvl': 6, 'min_cl': 1},
    'oracle': {'stat': 'cha', 'max_lvl': 9, 'min_cl': 1},
    'summoner': {'stat': 'cha', 'max_lvl': 6, 'min_cl': 1},
    'unchained summoner': {'stat': 'cha', 'max_lvl': 6, 'min_cl': 1},
    'unchained_summoner': {'stat': 'cha', 'max_lvl': 6, 'min_cl': 1},
    'witch': {'stat': 'int', 'max_lvl': 9, 'min_cl': 1},
    'arcanist': {'stat': 'int', 'max_lvl': 9, 'min_cl': 1},
    'bloodrager': {'stat': 'cha', 'max_lvl': 4, 'min_cl': 4},
    'hunter': {'stat': 'wis', 'max_lvl': 6, 'min_cl': 1},
    'investigator': {'stat': 'int', 'max_lvl': 6, 'min_cl': 1},
    'shaman': {'stat': 'wis', 'max_lvl': 9, 'min_cl': 1},
    'skald': {'stat': 'cha', 'max_lvl': 6, 'min_cl': 1},
    'warpriest': {'stat': 'wis', 'max_lvl': 6, 'min_cl': 1},
    'medium': {'stat': 'cha', 'max_lvl': 4, 'min_cl': 1},
    'mesmerist': {'stat': 'cha', 'max_lvl': 6, 'min_cl': 1},
    'occultist': {'stat': 'int', 'max_lvl': 6, 'min_cl': 1},
    'psychic': {'stat': 'int', 'max_lvl': 9, 'min_cl': 1},
    'spiritualist': {'stat': 'wis', 'max_lvl': 6, 'min_cl': 1},
    'antipaladin': {'stat': 'cha', 'max_lvl': 4, 'min_cl': 4},
    'adept': {'stat': 'wis', 'max_lvl': 5, 'min_cl': 1}
}

def parse_int(s, default=0):
    try:
        m = re.search(r'[-+]?\d+', str(s))
        return int(m.group(0)) if m else default
    except Exception:
        return default

def calc_mod(score, with_sign=True):
    try:
        val = int(score)
        m = (val - 10) // 2
        if with_sign:
            return f"+{m}" if m >= 0 else str(m)
        return str(m)
    except Exception:
        return "+0" if with_sign else "0"

def expand_critical_threat(crit_str: str) -> str:
    if not crit_str:
        return '19-20/x2'
    clean = crit_str.strip().replace('–', '-').replace('—', '-')

    m_range = re.match(r'^(\d+)\s*-\s*20(?:\s*/\s*x(\d+))?$', clean, re.IGNORECASE)
    if m_range:
        low = int(m_range.group(1))
        mult = f"x{m_range.group(2)}" if m_range.group(2) else "x2"
        if low <= 17:
            return f"{low}-20/{mult}"
        width = 21 - low
        doubled_width = width * 2
        new_low = max(1, 21 - doubled_width)
        return f"{new_low}-20/{mult}"

    m_single = re.match(r'^20(?:\s*/\s*x(\d+))?$', clean, re.IGNORECASE)
    if m_single:
        mult = f"x{m_single.group(1)}" if m_single.group(1) else "x2"
        return f"19-20/{mult}"

    m_mult = re.match(r'^x(\d+)$', clean, re.IGNORECASE)
    if m_mult:
        return f"19-20/x{m_mult.group(1)}"

    return clean

def is_swashbuckler_piercing_weapon(name: str, subcategory: str = '', w_type: str = '', clean_feats: list = None) -> bool:
    clean_name = (name or '').lower()
    sub = (subcategory or '').lower()
    typ = (w_type or '').lower()
    feats = clean_feats or []

    if any(n in clean_name or n in sub for n in ['natural', 'bite', 'claw', 'gore', 'slam', 'tail']):
        return False

    if 'two-handed' in sub or any(n in clean_name for n in ['greatsword', 'greataxe', 'halberd', 'scythe', 'lance']):
        return False
    if 'spear' in clean_name and 'shortspear' not in clean_name:
        return False

    if any('dervish dance' in f.lower() for f in feats) and 'scimitar' in clean_name:
        return True
    if any('slashing grace' in f.lower() for f in feats):
        for f in feats:
            if 'slashing grace' in f.lower():
                m = re.search(r'\((.*?)\)', f)
                if not m or m.group(1).lower().strip() in clean_name:
                    return True

    is_piercing = (
        'p' in typ or
        any(p in clean_name for p in ['rapier', 'dagger', 'shortsword', 'estoc', 'pick', 'shortspear', 'trident', 'dart', 'starknife'])
    )
    if not is_piercing:
        return False

    if 'light' in sub or 'one-handed' in sub or 'thrown' in sub:
        return True

    if any(p in clean_name for p in ['rapier', 'dagger', 'shortsword', 'kukri', 'dart']):
        return True

    return False

class Character:

    def __init__(self, raw_data: dict = None):
        self.raw_data = raw_data or {}
        self.basic = self.raw_data.get('basic', {})
        self.dynamic = self.raw_data.get('dynamic', {})

    @classmethod
    def from_dict(cls, data: dict):
        return cls(data)

    def to_dict(self) -> dict:
        return {
            'basic': self.basic,
            'dynamic': self.dynamic
        }

    @property
    def sheet_data(self) -> dict:

        return self.raw_data.get('sheetData') or self.raw_data.get('sheet_data') or {}

    @property
    def name(self) -> str:
        return self.basic.get('in-name', 'Unnamed Character').strip()

    @property
    def alignment(self) -> str:
        raw = self.basic.get('in-alignment', '').strip()
        m = re.search(r'\b(LG|NG|CG|LN|CN|NC|LE|NE|CE)\b', raw, re.IGNORECASE)
        if m:
            val = m.group(1).upper()
            return 'CN' if val == 'NC' else val
        if re.search(r'\bTrue Neutral\b|\bNeutral\b|\bN\b', raw, re.IGNORECASE):
            return 'N'
        return raw or 'LG'

    @property
    def player(self) -> str:
        return (self.basic.get('in-player') or self.basic.get('in-author', '')).strip()

    @property
    def classes(self) -> list[dict]:

        raw_classes = self.dynamic.get('classes')
        if raw_classes and isinstance(raw_classes, list):
            res = []
            for c in raw_classes:
                if isinstance(c, dict):
                    c_name = str(c.get('name') or c.get('class') or '').strip()
                    c_key = str(c.get('class') or c_name).lower().strip()
                    c_lvl = parse_int(c.get('level', 1), default=1)
                    if c_name:
                        res.append({'class': c_key, 'name': c_name, 'level': c_lvl})
            if res:
                return res

        cls_str = self.basic.get('in-class', '').strip()
        if '/' in cls_str:
            parts = [p.strip() for p in cls_str.split('/') if p.strip()]
            res = []
            for p in parts:
                m = re.match(r'^(.*?)(?:\s+(\d+))?$', p)
                if m:
                    c_name = m.group(1).strip()
                    c_lvl = int(m.group(2)) if m.group(2) else 1
                    c_key = c_name.lower().replace(' ', '_')
                    if c_name:
                        res.append({'class': c_key, 'name': c_name, 'level': c_lvl})
            if res:
                return res

        c_name = cls_str or 'Paladin'
        c_key = c_name.lower().replace(' ', '_')
        c_lvl = parse_int(self.basic.get('in-level', 1), default=1)
        return [{'class': c_key, 'name': c_name, 'level': c_lvl}]

    @property
    def is_multiclass(self) -> bool:
        return len(self.classes) > 1

    @property
    def primary_class(self) -> str:
        cls_list = self.classes
        return cls_list[0]['name'] if cls_list else 'Paladin'

    @property
    def class_name(self) -> str:
        if self.is_multiclass:
            return " / ".join(f"{c['name']} {c['level']}" for c in self.classes)
        return self.basic.get('in-class', '').strip()

    @property
    def level(self) -> int:
        if self.is_multiclass:
            return sum(c['level'] for c in self.classes)
        return parse_int(self.basic.get('in-level', 1), default=1)

    @property
    def class_and_level(self) -> str:
        if self.is_multiclass:
            return " / ".join(f"{c['name']} {c['level']}" for c in self.classes)
        cls_n = self.class_name
        lvl = self.basic.get('in-level', '')
        type_full = self.basic.get('in-type-full', '')
        if cls_n and lvl:
            if re.search(r'\b\d+\b', cls_n):
                return cls_n
            return f"{cls_n} {lvl}"
        elif cls_n:
            return cls_n
        return type_full

    @property
    def race(self) -> str:
        race_val = self.basic.get('in-race', '').strip()
        if race_val:
            return race_val
        type_full = self.basic.get('in-type-full', '')
        if ' ' in type_full:
            return type_full.split()[0]
        return self.basic.get('in-type', '')

    @property
    def size(self) -> str:
        s = self.basic.get('in-size', 'Medium').strip()
        return 'Med' if s.lower() == 'medium' else s

    @property
    def xp(self) -> str:
        return str(self.basic.get('in-xp', ''))

    @property
    def deity(self) -> str:
        return self.basic.get('in-deity', '').strip()

    @property
    def homeland(self) -> str:
        return self.basic.get('in-homeland', '').strip()

    @property
    def gender(self) -> str:
        return self.basic.get('in-gender', '').strip()

    @property
    def age(self) -> str:
        return str(self.basic.get('in-age', '')).strip()

    @property
    def height(self) -> str:
        return self.basic.get('in-height', '').strip()

    @property
    def weight(self) -> str:
        return self.basic.get('in-weight', '').strip()

    @property
    def hair(self) -> str:
        return self.basic.get('in-hair', '').strip()

    @property
    def eyes(self) -> str:
        return self.basic.get('in-eyes', '').strip()

    def get_ability_score(self, key: str) -> str:
        return str(self.basic.get(f'in-{key.lower()}', '10')).strip()

    def get_ability_temp(self, key: str) -> str:
        return str(self.basic.get(f'in-{key.lower()}-temp', '')).strip()

    @property
    def str_score(self) -> str: return self.get_ability_score('str')
    @property
    def dex_score(self) -> str: return self.get_ability_score('dex')
    @property
    def con_score(self) -> str: return self.get_ability_score('con')
    @property
    def int_score(self) -> str: return self.get_ability_score('int')
    @property
    def wis_score(self) -> str: return self.get_ability_score('wis')
    @property
    def cha_score(self) -> str: return self.get_ability_score('cha')

    @property
    def str_mod(self) -> str: return calc_mod(self.str_score)
    @property
    def dex_mod(self) -> str: return calc_mod(self.dex_score)
    @property
    def con_mod(self) -> str: return calc_mod(self.con_score)
    @property
    def int_mod(self) -> str: return calc_mod(self.int_score)
    @property
    def wis_mod(self) -> str: return calc_mod(self.wis_score)
    @property
    def cha_mod(self) -> str: return calc_mod(self.cha_score)

    @property
    def hit_points(self) -> str:
        hp_raw = str(self.basic.get('in-hp', ''))
        m_hp = re.search(r'^(\d+)', hp_raw.strip())
        return m_hp.group(1) if m_hp else str(self.basic.get('in-hp-extra', ''))

    @property
    def initiative(self) -> str:
        return str(self.basic.get('in-init', self.dex_mod))

    @property
    def initiative_misc(self) -> str:
        return str(self.basic.get('in-init-extra', '0'))

    def calculate_speeds(self):

        race_str = self.race.lower()
        type_str = str(self.basic.get('in-type-full', '')).lower()
        is_slow_race = any(r in race_str or r in type_str for r in ['dwarf', 'gnome', 'halfling'])
        base_spd_val = 20 if is_slow_race else 30

        spd_raw = str(self.basic.get('in-speed', '')).strip()
        if spd_raw:
            m_base = re.search(r'(\d+)', spd_raw)
            if m_base:
                v = int(m_base.group(1))
                if is_slow_race:
                    base_spd_val = v
                else:
                    base_spd_val = 30 if v == 20 else v

        slowed_by_armor = False
        armor_name = str(self.basic.get('in-armor-name', '')).lower()
        ac_items = self.dynamic.get('ac_items') or self.dynamic.get('armors') or self.sheet_data.get('acItems') or []
        for it in ac_items:
            if it.get('is_active') is False or it.get('isActive') is False:
                continue
            cat = str(it.get('properties') or it.get('type') or it.get('category') or '').lower()
            nm = str(it.get('name', '')).lower()
            if ('heavy' in cat or 'medium' in cat or any(h in nm for h in ['plate', 'breastplate', 'chainmail', 'splint', 'banded', 'half-plate'])) and 'mithral shirt' not in nm:
                slowed_by_armor = True
                break
        if not slowed_by_armor and armor_name and armor_name != 'none':
            if any(h in armor_name for h in ['plate', 'breastplate', 'chainmail', 'splint', 'banded', 'half-plate', 'scale']) and 'mithral shirt' not in armor_name:
                slowed_by_armor = True

        armor_spd_raw = str(self.basic.get('in-speed-armor', '')).strip()
        custom_arm_spd = None
        if armor_spd_raw:
            m_arm = re.search(r'(\d+)', armor_spd_raw)
            if m_arm:
                val_arm = int(m_arm.group(1))
                if val_arm < base_spd_val:
                    slowed_by_armor = True
                    custom_arm_spd = val_arm

        if 'dwarf' in race_str or 'dwarf' in type_str:
            slowed_by_armor = False

        base_ft = f"{base_spd_val} ft."
        base_sq = str(base_spd_val // 5)
        if slowed_by_armor:
            arm_val = custom_arm_spd if custom_arm_spd else (15 if base_spd_val <= 20 else 20)
            arm_ft = f"{arm_val} ft."
            arm_sq = str(arm_val // 5)
        else:
            arm_ft = ""
            arm_sq = ""

        return base_ft, base_sq, arm_ft, arm_sq

    def calculate_ac(self):

        ac_raw = str(self.basic.get('in-ac', ''))
        m_ac = re.search(r'^(\d+)', ac_raw.strip())
        ac_total = m_ac.group(1) if m_ac else str(self.basic.get('in-ac-total', ''))

        m_touch = re.search(r'touch\s+(\d+)', ac_raw)
        touch_ac = m_touch.group(1) if m_touch else str(self.basic.get('in-ac-touch', ''))

        m_ff = re.search(r'flat-footed\s+(\d+)', ac_raw)
        ff_ac = m_ff.group(1) if m_ff else str(self.basic.get('in-ac-flat', self.basic.get('in-ac-ff', '')))

        armor_bonus = str(self.basic.get('in-ac-armor', ''))
        shield_bonus = str(self.basic.get('in-ac-shield', ''))

        ac_items = self.dynamic.get('ac_items') or self.dynamic.get('armors') or self.sheet_data.get('acItems') or []
        defl_bonus_from_items = 0
        nat_bonus_from_items = 0
        misc_bonus_from_items = 0
        lowest_max_dex = None

        if ac_items:
            for it in ac_items:
                if it.get('is_active') is False or it.get('isActive') is False:
                    continue
                cat = str(it.get('properties') or it.get('type') or it.get('category') or '').lower()
                nm = str(it.get('name', '')).lower()
                b = parse_int(it.get('bonus', 0))
                md = it.get('max_dex')
                if md is not None and str(md) != '':
                    try:
                        md_int = int(str(md))
                        if lowest_max_dex is None or md_int < lowest_max_dex:
                            lowest_max_dex = md_int
                    except Exception:
                        pass

                if 'shield' in cat or 'shield' in nm or 'buckler' in nm:
                    if (not shield_bonus or shield_bonus == '0') and b:
                        shield_bonus = str(b)
                elif 'deflection' in cat:
                    defl_bonus_from_items += b
                elif 'natural' in cat:
                    nat_bonus_from_items += b
                elif 'dodge' in cat or 'misc' in cat:
                    misc_bonus_from_items += b
                else:
                    if (not armor_bonus or armor_bonus == '0') and b:
                        armor_bonus = str(b)

        if not armor_bonus: armor_bonus = '0'
        if not shield_bonus: shield_bonus = '0'

        dex_mod_val = parse_int(calc_mod(self.dex_score))
        if lowest_max_dex is not None and dex_mod_val > lowest_max_dex:
            dex_mod_val = lowest_max_dex

        nat_val = parse_int(self.basic.get('in-ac-natural', '0')) + nat_bonus_from_items
        defl_val = parse_int(self.basic.get('in-ac-deflection', '0')) + defl_bonus_from_items
        size_val = parse_int(self.basic.get('in-ac-size', '0'))
        misc_val = parse_int(self.basic.get('in-ac-misc', '0')) + misc_bonus_from_items

        if not ac_total or ac_total == '10':
            computed_total = 10 + parse_int(armor_bonus) + parse_int(shield_bonus) + dex_mod_val + nat_val + defl_val + size_val + misc_val
            ac_total = str(computed_total)

        if not touch_ac or touch_ac == '10':
            touch_ac = str(10 + dex_mod_val + defl_val + size_val + misc_val)

        if not ff_ac or ff_ac == '10':
            ff_ac = str(10 + parse_int(armor_bonus) + parse_int(shield_bonus) + nat_val + defl_val + size_val + misc_val + (dex_mod_val if dex_mod_val < 0 else 0))

        return {
            'total': ac_total,
            'touch': touch_ac,
            'flat_footed': ff_ac,
            'armor_bonus': armor_bonus,
            'shield_bonus': shield_bonus,
            'natural_armor': str(nat_val),
            'deflection': str(defl_val),
            'size': str(size_val),
            'misc': str(misc_val),
            'dex_mod': str(dex_mod_val)
        }


    def calculate_saves(self):

        fort_val = self.basic.get('in-fort', '')
        ref_val = self.basic.get('in-ref', '')
        will_val = self.basic.get('in-will', '')

        con_m = parse_int(self.con_mod)
        dex_m = parse_int(self.dex_mod)
        wis_m = parse_int(self.wis_mod)

        save_items = self.dynamic.get('save_items') or self.sheet_data.get('saveItems') or []
        res_fort = 0
        res_ref = 0
        res_will = 0
        for s_it in save_items:
            if s_it.get('is_active') is False or s_it.get('isActive') is False:
                continue
            b = parse_int(s_it.get('bonus', 0))
            tgt = str(s_it.get('target', 'all')).lower()
            if tgt == 'all':
                res_fort += b
                res_ref += b
                res_will += b
            elif tgt == 'fort':
                res_fort += b
            elif tgt == 'ref':
                res_ref += b
            elif tgt == 'will':
                res_will += b

        fort_magic = str(self.basic.get('in-fort-magic') or (f"+{res_fort}" if res_fort else ''))
        ref_magic = str(self.basic.get('in-ref-magic') or (f"+{res_ref}" if res_ref else ''))
        will_magic = str(self.basic.get('in-will-magic') or (f"+{res_will}" if res_will else ''))

        base_fort = self.basic.get('in-fort-base')
        if base_fort is None and fort_val:
            base_fort = parse_int(fort_val) - con_m - res_fort
        fort_base_str = f"+{base_fort}" if parse_int(base_fort) >= 0 else str(base_fort)

        base_ref = self.basic.get('in-ref-base')
        if base_ref is None and ref_val:
            base_ref = parse_int(ref_val) - dex_m - res_ref
        ref_base_str = f"+{base_ref}" if parse_int(base_ref) >= 0 else str(base_ref)

        base_will = self.basic.get('in-will-base')
        if base_will is None and will_val:
            base_will = parse_int(will_val) - wis_m - res_will
        will_base_str = f"+{base_will}" if parse_int(base_will) >= 0 else str(base_will)

        return {
            'fort': fort_val,
            'fort_base': fort_base_str,
            'fort_magic': fort_magic,
            'fort_misc': str(self.basic.get('in-fort-misc', '')),
            'fort_temp': str(self.basic.get('in-fort-temp', '')),
            'ref': ref_val,
            'ref_base': ref_base_str,
            'ref_magic': ref_magic,
            'ref_misc': str(self.basic.get('in-ref-misc', '')),
            'ref_temp': str(self.basic.get('in-ref-temp', '')),
            'will': will_val,
            'will_base': will_base_str,
            'will_magic': will_magic,
            'will_misc': str(self.basic.get('in-will-misc', '')),
            'will_temp': str(self.basic.get('in-will-temp', ''))
        }

    @property
    def bab(self) -> str:
        return str(self.basic.get('in-bab', '0'))

    @property
    def cmb(self) -> str:
        return str(self.basic.get('in-cmb', ''))

    @property
    def cmd(self) -> str:
        return str(self.basic.get('in-cmd', ''))

    @property
    def sr(self) -> str:
        return str(self.basic.get('in-sr', ''))

    def get_carrying_capacity_data(self):
        return get_carrying_capacity(self.str_score)

    def get_clean_gear(self) -> list:
        cls_key = self.primary_class.lower().strip()
        expected_kit = CLASS_STARTING_KITS.get(
            cls_key,
            f"{self.class_name.title()}'s Kit" if self.class_name else "Adventurer's Kit"
        )

        excluded_names = {'breastplate', 'scimitar', 'full plate', 'buckler', 'longsword', 'dagger', 'shortsword', 'leather armor', 'shield'}
        armor_name = str(self.basic.get('in-armor-name', '')).strip().lower()
        if armor_name and armor_name != 'none':
            excluded_names.add(armor_name)
        shield_name = str(self.basic.get('in-shield-name', '')).strip().lower()
        if shield_name and shield_name != 'none':
            excluded_names.add(shield_name)

        for it in (self.dynamic.get('ac_items') or self.dynamic.get('armors') or self.sheet_data.get('acItems') or []):
            nm = str(it.get('name', '')).strip().lower()
            if nm and nm != 'none':
                excluded_names.add(nm)
                stripped = re.sub(r'^\+\d+\s+', '', nm)
                stripped = re.sub(r'^(masterwork|mwk)\s+', '', stripped).strip()
                if stripped:
                    excluded_names.add(stripped)

        for i in range(1, 6):
            w_nm = str(self.basic.get(f'in-w{i}-name', '')).strip().lower()
            if w_nm and w_nm != 'none':
                excluded_names.add(w_nm)
                w_stripped = re.sub(r'^\+\d+\s+', '', w_nm)
                w_stripped = re.sub(r'^(masterwork|mwk)\s+', '', w_stripped).strip()
                if w_stripped:
                    excluded_names.add(w_stripped)
        for w in (self.dynamic.get('weapons') or []):
            nm = str(w.get('name', '')).strip().lower()
            if nm and nm != 'none':
                excluded_names.add(nm)
                w_stripped = re.sub(r'^\+\d+\s+', '', nm)
                w_stripped = re.sub(r'^(masterwork|mwk)\s+', '', w_stripped).strip()
                if w_stripped:
                    excluded_names.add(w_stripped)

        gear_data = self.sheet_data.get('gear') or self.dynamic.get('gear') or self.basic.get('in-gear', '')
        raw_items = []
        if isinstance(gear_data, list):
            raw_items = [
                str(g.get('name', '') if isinstance(g, dict) else g).strip()
                for g in gear_data
                if (g.get('name', '') if isinstance(g, dict) else g)
            ]
        elif isinstance(gear_data, str) and gear_data:
            raw_items = [g.strip() for g in gear_data.split(',') if g.strip()]

        clean = []
        has_kit = False
        kit_pattern = re.compile(r'\bkit\b', re.IGNORECASE)

        DIVINE_RELIGIOUS_CLASSES = {
            'cleric', 'paladin', 'warpriest', 'inquisitor',
            'antipaladin', 'omdura', 'oracle', 'shaman', 'adept',
            'druid', 'hunter', 'ranger'
        }
        is_religious_class = cls_key in DIVINE_RELIGIOUS_CLASSES
        holy_symbol_pattern = re.compile(r'\b(?:holy|unholy|sacred)\s+symbol\b|\bdivine\s+focus\b', re.IGNORECASE)

        for item in raw_items:
            low = item.lower()

            if kit_pattern.search(item):
                clean.append(item)
                has_kit = True
                continue

            if low in excluded_names:
                continue

            if any(re.search(rf'\b{re.escape(ex)}\b', low) for ex in ['scimitar', 'longsword', 'full plate', 'breastplate', 'buckler']):
                continue

            if not is_religious_class and holy_symbol_pattern.search(item):
                continue

            clean.append(item)

        if not has_kit and expected_kit:
            clean.insert(0, expected_kit)

        return clean

    def has_spellcasting(self) -> bool:

        for c in self.classes:
            cls_key = c['class'].lower().strip()
            c_lvl = c['level']
            if cls_key in SPELLCASTING_CONFIG:
                cfg = SPELLCASTING_CONFIG[cls_key]
                if c_lvl >= cfg.get('min_cl', 1):
                    return True

        spells_data = self.basic.get('in-spells-data') or self.basic.get('in-spells', '')
        if spells_data:
            try:
                sp_obj = json.loads(spells_data) if isinstance(spells_data, str) else spells_data
                if isinstance(sp_obj, dict):
                    for _, s_info in sp_obj.items():
                        if s_info.get('spells') or s_info.get('slots') or s_info.get('per_day'):
                            return True
                elif isinstance(sp_obj, list) and len(sp_obj) > 0:
                    return True
            except Exception:
                if isinstance(spells_data, str) and len(spells_data.strip()) > 3:
                    return True

        return False

    def get_weapons(self) -> list[dict]:

        raw_weapons = self.dynamic.get('weapons', []) or []
        if not raw_weapons:
            return []

        clean_feats = self.get_clean_feats()
        bab_val = parse_int(self.bab, 0)
        str_m = parse_int(self.str_mod, 0)
        dex_m = parse_int(self.dex_mod, 0)
        cls_name = re.sub(r'\d+', '', (self.class_name or self.basic.get('in-class', ''))).lower().strip()
        lvl = self.level

        shield_name = (self.basic.get('in-shield-name') or '').lower().strip()
        has_non_buckler_shield = bool(shield_name and 'buckler' not in shield_name)

        results = []
        for w in raw_weapons:
            if not isinstance(w, dict):
                continue
            name = w.get('name', '')
            w_type = w.get('atkType') or w.get('type', 'Melee')
            existing_atk = w.get('attack') or w.get('atkBonus', '')
            existing_dmg = w.get('damage') or w.get('dmg', '')
            crit = w.get('crit') or f"{w.get('critRange', '20')}/x{w.get('critMult', 2)}"
            rng = w.get('range', '')

            clean_name = re.sub(r'^\+\d+\s+', '', name.lower()).strip()
            clean_name = re.sub(r'^(masterwork|mwk)\s+', '', clean_name).strip()
            is_keen = 'keen' in name.lower()

            feat_atk = 0
            feat_dmg = 0
            has_improved_crit = False
            for f in clean_feats:
                fl = f.lower()
                if 'weapon focus' in fl and (clean_name in fl or '(' not in fl):
                    feat_atk += 1
                if 'weapon specialization' in fl and (clean_name in fl or '(' not in fl):
                    feat_dmg += 2
                if 'improved critical' in fl and (clean_name in fl or '(' not in fl):
                    has_improved_crit = True

            is_swash_piercing = is_swashbuckler_piercing_weapon(name, w.get('subcategory', ''), w_type, clean_feats)

            swash_atk_dmg = (lvl - 1) // 4 if (cls_name == 'swashbuckler' and lvl >= 5 and is_swash_piercing) else 0
            swash_crit = bool(cls_name == 'swashbuckler' and lvl >= 5 and is_swash_piercing)

            should_expand_crit = has_improved_crit or is_keen or swash_crit
            if should_expand_crit:
                crit = expand_critical_threat(crit)

            precise_eligible = bool(
                cls_name == 'swashbuckler' and
                lvl >= 3 and
                is_swash_piercing and
                not has_non_buckler_shield
            )
            precise_bonus = lvl if precise_eligible else 0

            if existing_atk and existing_dmg:
                res_w = dict(w)
                res_w['crit'] = crit
                if 'precise' in existing_dmg.lower():
                    m_p = re.search(r'\(\+(\d+)\s+precise\)', existing_dmg, re.IGNORECASE)
                    p_val = int(m_p.group(1)) if m_p else lvl
                    clean_dmg = re.sub(r'\s*\(\+\d+\s+precise\)', '', existing_dmg).strip()
                    if precise_eligible:
                        m_mod = re.search(r'([+-])(\d+)$', clean_dmg)
                        if m_mod:
                            sign = m_mod.group(1)
                            cur_mod = int(m_mod.group(2)) * (1 if sign == '+' else -1)
                            new_mod = cur_mod + p_val
                            new_sign = f"+{new_mod}" if new_mod >= 0 else str(new_mod)
                            res_w['damage'] = f"{clean_dmg[:m_mod.start()]}{new_sign}"
                        else:
                            res_w['damage'] = f"{clean_dmg}+{p_val}"
                    else:
                        res_w['damage'] = clean_dmg
                else:
                    res_w['damage'] = existing_dmg

                res_w['rawText'] = f"{name} {existing_atk} ({res_w['damage']}/{crit})"
                results.append(res_w)
                continue

            is_ranged = w_type.lower() == 'ranged' or any(r in name.lower() for r in ['bow', 'crossbow', 'dart', 'sling'])
            can_finesse = (cls_name == 'swashbuckler' and is_swash_piercing) or any('weapon finesse' in f.lower() for f in clean_feats)
            stat_mod = dex_m if (is_ranged or (can_finesse and dex_m > str_m)) else str_m

            m_plus = re.search(r'\+(\d+)', name)
            magic_bonus = int(m_plus.group(1)) if m_plus else (1 if ('masterwork' in name.lower() or 'mwk' in name.lower()) else 0)

            total_atk = bab_val + stat_mod + feat_atk + magic_bonus + swash_atk_dmg
            iterative_count = max(1, (bab_val - 1) // 5 + 1)
            atk_iterative = [f"+{total_atk - 5*i}" if (total_atk - 5*i) >= 0 else str(total_atk - 5*i) for i in range(iterative_count)]
            atk_str = "/".join(atk_iterative)

            base_dmg = w.get('damage') or '1d8'
            if '+' in base_dmg or '-' in base_dmg:
                base_dice = re.split(r'[+-]', base_dmg)[0]
            else:
                base_dice = base_dmg

            has_dex_damage = any(
                ('dervish dance' in f.lower() and 'scimitar' in clean_name) or
                'slashing grace' in f.lower() or 'fencing grace' in f.lower()
                for f in clean_feats
            )
            stat_dmg = max(str_m, dex_m) if has_dex_damage else (0 if is_ranged else str_m)
            total_dmg_m = stat_dmg + feat_dmg + (magic_bonus if m_plus else 0) + swash_atk_dmg + precise_bonus
            dmg_sign = f"+{total_dmg_m}" if total_dmg_m >= 0 else str(total_dmg_m)
            dmg_str = f"{base_dice}{dmg_sign}"

            results.append({
                'name': name,
                'type': 'Ranged' if is_ranged else 'Melee',
                'attack': atk_str,
                'damage': dmg_str,
                'crit': crit,
                'range': rng,
                'rawText': f"{name} {atk_str} ({dmg_str}/{crit})"
            })

        return results

    def get_clean_feats(self) -> list:
        feats_data = self.dynamic.get('feats') or self.sheet_data.get('feats') or self.basic.get('in-feats', '')
        if isinstance(feats_data, list):
            res = []
            for f in feats_data:
                if isinstance(f, dict):
                    t = f.get('title') or f.get('name') or ''
                    if t.strip(): res.append(t.strip())
                elif str(f).strip():
                    res.append(str(f).strip())
            return res
        elif isinstance(feats_data, str) and feats_data:
            flist = [f.strip() for f in re.split(r',\s*(?![^()]*\))', feats_data) if f.strip()]
            clean = []
            i = 0
            while i < len(flist):
                curr = flist[i]
                if i + 1 < len(flist) and flist[i+1].lower() in ['heavy', 'medium', 'light']:
                    clean.append(f'{curr} ({flist[i+1]})')
                    i += 2
                else:
                    clean.append(curr)
                    i += 1
            return clean
        return []

    def resolve_abilities(self) -> dict:

        from core.abilities import is_placeholder_ability
        raw_ab = self.dynamic.get('abilities', []) or self.dynamic.get('special_abilities', [])
        abilities = [
            a for a in raw_ab
            if isinstance(a, dict) and not is_placeholder_ability(a.get('desc', '') or a.get('name', ''))
        ]

        classes_list = self.classes
        race = self.race or 'Human'
        align = self.alignment or 'LG'
        stats = {
            'str': self.str_score,
            'dex': self.dex_score,
            'con': self.con_score,
            'int': self.int_score,
            'wis': self.wis_score,
            'cha': self.cha_score
        }

        if not abilities or len(abilities) < 3:
            raw_specials_map = {}
            try:
                global _CLASS_PROGRESSIONS_CACHE
                if _CLASS_PROGRESSIONS_CACHE is None:
                    p = Path(__file__).resolve().parent
                    if p.name == "python" and p.parent.name == "web":
                        base_dir = p.parent.parent
                    else:
                        base_dir = p.parent
                    cp_file = base_dir / "web" / "data" / "class_progressions.json"
                    if not cp_file.exists():
                        cp_file = base_dir / "data" / "class_progressions.json"
                    if cp_file.exists():
                        with open(cp_file, 'r', encoding='utf-8') as f:
                            _CLASS_PROGRESSIONS_CACHE = json.load(f)
                    else:
                        _CLASS_PROGRESSIONS_CACHE = {}
                cp_json = _CLASS_PROGRESSIONS_CACHE
                for c in classes_list:
                    ck = c['class'].lower().replace(' ', '_')
                    raw_specials_map[ck] = cp_json.get(ck, {}).get('specials')
            except Exception:
                pass

            if len(classes_list) > 1:
                resolved = AbilitiesEngine.resolve_multiclass(classes_list, stats, race, align, raw_specials_map)
            else:
                primary = classes_list[0]
                cls_key = primary['class']
                lvl = primary['level']
                raw_specials = raw_specials_map.get(cls_key.lower().replace(' ', '_'))
                resolved = AbilitiesEngine.resolve(cls_key, lvl, stats, race, align, raw_specials)

            abilities = resolved.get('abilities_list', [])

            if not self.basic.get('in-sq'):
                self.basic['in-sq'] = resolved.get('special_qualities', '')

            return resolved

        return {
            'abilities_list': abilities,
            'special_qualities': self.basic.get('in-sq', ''),
            'special_attacks': self.basic.get('in-special-attacks', ''),
            'defensive_abilities': self.basic.get('in-def-abilities', ''),
            'aura': self.basic.get('in-aura', ''),
            'racial_traits': []
        }
