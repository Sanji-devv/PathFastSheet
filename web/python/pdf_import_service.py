"""
PDF Import Service — AcroForm field extraction from Pathfinder 1E character sheet PDFs.
Implements Single Responsibility Principle (SOLID).
"""
from __future__ import annotations
import re

try:
    import pymupdf as fitz
except ImportError:
    try:
        import fitz
    except ImportError:
        fitz = None


class PdfImportService:
    """
    Parses a filled-in Pathfinder 1E AcroForm PDF and converts it
    to the internal JSON character data structure used by PathFastSheet.
    """

    # PDF field name → (json_section, json_key)
    BASIC_FIELD_MAP: dict[str, tuple[str, str]] = {
        'Character Name':              ('basic', 'in-name'),
        'Alignment':                   ('basic', 'in-alignment'),
        'Player':                      ('basic', 'in-player'),
        'Character Class and Level':   ('basic', 'in-class'),
        'Race':                        ('basic', 'in-race'),
        'Size':                        ('basic', 'in-size'),
        'Experience Points':           ('basic', 'in-xp'),
        'Deity':                       ('basic', 'in-deity'),
        'Homeland':                    ('basic', 'in-homeland'),
        'Gender':                      ('basic', 'in-gender'),
        'Age':                         ('basic', 'in-age'),
        'Height':                      ('basic', 'in-height'),
        'Weight':                      ('basic', 'in-weight'),
        'Hair':                        ('basic', 'in-hair'),
        'Eyes':                        ('basic', 'in-eyes'),
        # Combat
        'Hit Points':                  ('basic', 'in-hp'),
        'Damage Reduction':            ('basic', 'in-dr'),
        'Spell Resistance':            ('basic', 'in-sr'),
        'Base Attack Bonus':           ('basic', 'in-bab'),
        'CMB':                         ('basic', 'in-cmb'),
        'CMD':                         ('basic', 'in-cmd'),
        'Initiative':                  ('basic', 'in-initiative'),
        'Speed Ft':                    ('basic', 'in-speed'),
        # AC
        'Armor Class':                 ('basic', 'in-ac'),
        'Touch Armor Class':           ('basic', 'in-ac-touch'),
        'Flatfooted Armor Class':      ('basic', 'in-ac-flatfooted'),
        'Armor Bonus':                 ('basic', 'in-armor-bonus'),
        'Shield Bonus':                ('basic', 'in-shield-bonus'),
        'Natural Armor':               ('basic', 'in-natural-armor'),
        'Deflection Modifier':         ('basic', 'in-deflection'),
        # Saves
        'Fortitude Save':              ('basic', 'in-fort'),
        'Fortitude Save Base':         ('basic', 'in-fort-base'),
        'Fortitude Save Magic Modifier': ('basic', 'in-fort-magic'),
        'Fortitude Save Misc Modifier':  ('basic', 'in-fort-misc'),
        'Reflex Save':                 ('basic', 'in-ref'),
        'Reflex Save Base':            ('basic', 'in-ref-base'),
        'Reflex Save Magic Modifier':  ('basic', 'in-ref-magic'),
        'Reflex Save Misc Modifier':   ('basic', 'in-ref-misc'),
        'Will Save':                   ('basic', 'in-will'),
        'Will Save Base':              ('basic', 'in-will-base'),
        'Will Save Magic Modifier':    ('basic', 'in-will-magic'),
        'Will Save Misc Modifier':     ('basic', 'in-will-misc'),
        # Ability Scores
        'Strength':                    ('abilities', 'str'),
        'Dexterity':                   ('abilities', 'dex'),
        'Constitution':                ('abilities', 'con'),
        'Intelligence':                ('abilities', 'int'),
        'Wisdom':                      ('abilities', 'wis'),
        'Charisma':                    ('abilities', 'cha'),
        'Strength Temp Adjustment':    ('abilities', 'str-temp'),
        'Dexterity Temp Adjustment':   ('abilities', 'dex-temp'),
        'Constitution Temp Adjustment':('abilities', 'con-temp'),
        'Intelligence Temp Adjustment':('abilities', 'int-temp'),
        'Wisdom Temp Adjustment':      ('abilities', 'wis-temp'),
        'Charisma Temp Adjustment':    ('abilities', 'cha-temp'),
    }

    # Skill fields: PDF prefix → JSON skill name
    SKILL_FIELDS = [
        ('Acrobatics',          'acrobatics'),
        ('Appraise',            'appraise'),
        ('Bluff',               'bluff'),
        ('Climb',               'climb'),
        ('Diplomacy',           'diplomacy'),
        ('Disable Device',      'disable-device'),
        ('Disguise',            'disguise'),
        ('Escape Artist',       'escape-artist'),
        ('Fly',                 'fly'),
        ('Handle Animal',       'handle-animal'),
        ('Heal',                'heal'),
        ('Intimidate',          'intimidate'),
        ('Knowledge Arcana',    'knowledge-arcana'),
        ('Knowledge Dungeoneering', 'knowledge-dungeoneering'),
        ('Knowledge Engineering',   'knowledge-engineering'),
        ('Knowledge Geography',     'knowledge-geography'),
        ('Knowledge History',       'knowledge-history'),
        ('Knowledge Local',         'knowledge-local'),
        ('Knowledge Nature',        'knowledge-nature'),
        ('Knowledge Nobility',      'knowledge-nobility'),
        ('Knowledge Planes',        'knowledge-planes'),
        ('Knowledge Religion',      'knowledge-religion'),
        ('Linguistics',         'linguistics'),
        ('Perception',          'perception'),
        ('Ride',                'ride'),
        ('Sense Motive',        'sense-motive'),
        ('Sleight of Hand',     'sleight-of-hand'),
        ('Spellcraft',          'spellcraft'),
        ('Stealth',             'stealth'),
        ('Survival',            'survival'),
        ('Swim',                'swim'),
        ('Use Magic Device',    'use-magic-device'),
    ]

    def parse(self, pdf_bytes: bytes) -> dict:
        """
        Parse AcroForm fields from a PDF file bytes and return
        a character data dictionary compatible with PathFastSheet JSON format.
        Raises ValueError if pymupdf is not available.
        """
        if fitz is None:
            raise ValueError(
                "pymupdf is not installed. Run: pip install pymupdf"
            )

        doc = fitz.open(stream=pdf_bytes, filetype='pdf')
        try:
            raw = self._extract_all_fields(doc)
        finally:
            doc.close()

        return self._map_fields_to_character(raw)

    def _extract_all_fields(self, doc) -> dict[str, str]:
        """Extract all AcroForm field values into a flat dict."""
        fields: dict[str, str] = {}
        seen: dict[str, int] = {}

        for page in doc:
            widgets = page.widgets()
            if not widgets:
                continue
            for w in widgets:
                name = w.field_name
                if not name:
                    continue
                val = w.field_value or ''

                # Handle duplicate field names (e.g. modifier columns)
                if name in seen:
                    seen[name] += 1
                    name = f'{name}__{seen[name]}'
                else:
                    seen[name] = 0

                # CheckBox: normalize to boolean-ish string
                if w.field_type_string == 'CheckBox':
                    val = 'true' if val and val not in ('', 'Off', 'No') else 'false'

                fields[name] = str(val).strip() if val else ''

        return fields

    def _map_fields_to_character(self, raw: dict[str, str]) -> dict:
        """Convert flat PDF field dict to PathFastSheet character JSON structure."""
        data: dict = {
            'basic': {},
            'abilities': {},
            'skills': [],
            'equipment': {},
            'spells': {},
            '_import_source': 'pdf',
        }

        # ── Basic & combat fields ──────────────────────────────────────────
        for pdf_key, (section, json_key) in self.BASIC_FIELD_MAP.items():
            val = raw.get(pdf_key, '')
            if val:
                data[section][json_key] = val

        # ── Languages (merged from up to 3 PDF lines) ────────────────────
        lang_parts = [
            raw.get('Languages 1', ''),
            raw.get('Languages 2', ''),
            raw.get('Languages 3', ''),
        ]
        languages = ', '.join(p for p in lang_parts if p)
        if languages:
            data['basic']['in-languages'] = languages

        # ── Conditional modifiers ─────────────────────────────────────────
        conds = ' '.join(filter(None, [
            raw.get('Conditional Modifiers', ''),
            raw.get('Conditional Modifiers 1', ''),
            raw.get('Conditional Modifiers 2', ''),
        ])).strip()
        if conds:
            data['basic']['in-conditional-modifiers'] = conds

        # ── Skills ───────────────────────────────────────────────────────
        skills_list = []
        for pdf_prefix, skill_key in self.SKILL_FIELDS:
            total_val = raw.get(f'{pdf_prefix} Total', '')
            ranks_val = raw.get(f'{pdf_prefix} Ranks', '')
            misc_val  = raw.get(f'{pdf_prefix} Mod', '')
            is_class  = raw.get(f'{pdf_prefix} Train', 'false') == 'true'

            if total_val or ranks_val:
                skills_list.append({
                    'name':    skill_key,
                    'total':   total_val,
                    'ranks':   ranks_val,
                    'misc':    misc_val,
                    'isClass': is_class,
                })

        # Dynamic skills: Craft 1-3, Profession 1-2, Perform 1-2
        for label, json_prefix, max_idx in [
            ('Craft', 'craft', 3),
            ('Profession', 'profession', 2),
            ('Perform', 'perform', 2),
        ]:
            for i in range(1, max_idx + 1):
                desc   = raw.get(f'{label} {i} Description', '')
                total  = raw.get(f'{label} {i} Total', '')
                ranks  = raw.get(f'{label} {i} Ranks', '')
                misc   = raw.get(f'{label} {i} Mod', '')
                is_cls = raw.get(f'{label} {i} Train', 'false') == 'true'
                if desc or total or ranks:
                    skills_list.append({
                        'name':          f'{json_prefix}-{i}',
                        'customSubname': desc,
                        'total':         total,
                        'ranks':         ranks,
                        'misc':          misc,
                        'isClass':       is_cls,
                    })

        data['skills'] = skills_list

        # ── Spells ───────────────────────────────────────────────────────
        spells: dict = {}
        for level in range(10):
            level_spells = []
            for slot in range(1, 10):
                spell_name = raw.get(f'Spells {level} {slot}', '')
                if spell_name:
                    level_spells.append({'name': spell_name})
            if level_spells:
                spells[str(level)] = level_spells
        if spells:
            data['spells'] = spells

        # ── Weapons (3 weapon slots) ─────────────────────────────────────
        weapons = []
        for i in range(1, 6):
            w_name   = raw.get(f'Weapon {i}', '') or raw.get(f'Wpn{i} Name', '')
            w_atk    = raw.get(f'Weapon {i} Attack Bonus', '') or raw.get(f'Wpn{i} Atk Bonus', '')
            w_dmg    = raw.get(f'Weapon {i} Damage', '') or raw.get(f'Wpn{i} Damage', '')
            w_crit   = raw.get(f'Weapon {i} Critical', '') or raw.get(f'Wpn{i} Critical', '')
            w_range  = raw.get(f'Weapon {i} Range', '') or raw.get(f'Wpn{i} Range', '')
            w_type   = raw.get(f'Weapon {i} Type', '') or raw.get(f'Wpn{i} Type', '')
            w_ammo   = raw.get(f'Weapon {i} Ammunition', '') or raw.get(f'Weapon {i} Ammo', '') or raw.get(f'Wpn{i} Ammo', '')
            if w_name:
                weapons.append({
                    'name':   w_name,
                    'attack': w_atk,
                    'damage': w_dmg,
                    'crit':   w_crit,
                    'range':  w_range,
                    'type':   w_type,
                    'ammo':   w_ammo,
                })
        if weapons:
            data['equipment']['weapons'] = weapons

        # ── Armor ────────────────────────────────────────────────────────
        armor_name  = raw.get('Armor Name', '')
        if armor_name:
            data['equipment']['armor'] = {
                'name':    armor_name,
                'bonus':   raw.get('Armor AC', ''),
                'type':    raw.get('Armor Type', ''),
                'check':   raw.get('Armor Check Penalty', ''),
                'spell_fail': raw.get('Armor Spell Failure', ''),
                'weight':  raw.get('Armor Weight', ''),
            }

        # ── Notes / Description ──────────────────────────────────────────
        for note_field in ['Character Notes', 'Notes', 'Background', 'Description']:
            note_val = raw.get(note_field, '')
            if note_val:
                data['basic']['in-notes'] = note_val
                break

        # ── Feats & Special Abilities ─────────────────────────────────────
        feats_parts = []
        for field in ['Feats', 'Feats 1', 'Feats 2', 'Special Abilities']:
            val = raw.get(field, '')
            if val:
                feats_parts.append(val)
        if feats_parts:
            data['basic']['in-feats'] = '\n'.join(feats_parts)

        # ── Character name fallback ───────────────────────────────────────
        if not data['basic'].get('in-name'):
            data['basic']['in-name'] = 'Imported Character'

        self._attach_sheet_data(data, raw)
        return data

    def _attach_sheet_data(self, data: dict, raw: dict[str, str]) -> None:
        """Adapt extracted PDF values to the web character editor's saved schema."""
        def text(field: str) -> str:
            return str(raw.get(field, '') or '').strip()

        def number(value: str, default=None):
            if not value:
                return default
            match = re.search(r'[-+]?\d+', value.replace(',', ''))
            return int(match.group(0)) if match else default

        ability_names = {
            'Strength': 'str',
            'Dexterity': 'dex',
            'Constitution': 'con',
            'Intelligence': 'int',
            'Wisdom': 'wis',
            'Charisma': 'cha',
        }
        ability_scores = {}
        ability_modifiers = {}
        for pdf_name, key in ability_names.items():
            score = number(text(pdf_name), None)
            if score is not None:
                score += number(text(f'{pdf_name} Temp Adjustment'), 0)
                ability_scores[key] = score
                data['basic'][f'in-{key}'] = score
            else:
                score = 10
            ability_modifiers[key] = (score - 10) // 2

        skill_keys = {
            'Acrobatics': 'acrobatics',
            'Appraise': 'appraise',
            'Bluff': 'bluff',
            'Climb': 'climb',
            'Craft': 'craft',
            'Diplomacy': 'diplomacy',
            'Disable Device': 'disable_device',
            'Disguise': 'disguise',
            'Escape Artist': 'escape_artist',
            'Fly': 'fly',
            'Handle Animal': 'handle_animal',
            'Heal': 'heal',
            'Intimidate': 'intimidate',
            'Knowledge Arcana': 'know_arcana',
            'Knowledge Dungeoneering': 'know_dungeon',
            'Knowledge Engineering': 'know_engineer',
            'Knowledge Geography': 'know_geography',
            'Knowledge History': 'know_history',
            'Knowledge Local': 'know_local',
            'Knowledge Nature': 'know_nature',
            'Knowledge Nobility': 'know_nobility',
            'Knowledge Planes': 'know_planes',
            'Knowledge Religion': 'know_religion',
            'Linguistics': 'linguistics',
            'Perception': 'perception',
            'Perform': 'perform',
            'Profession': 'profession',
            'Ride': 'ride',
            'Sense Motive': 'sense_motive',
            'Sleight of Hand': 'sleight_of_hand',
            'Spellcraft': 'spellcraft',
            'Stealth': 'stealth',
            'Survival': 'survival',
            'Swim': 'swim',
            'Use Magic Device': 'use_magic_device',
        }
        skill_abilities = {
            'acrobatics': 'dex', 'bluff': 'cha', 'climb': 'str',
            'diplomacy': 'cha', 'disable_device': 'dex', 'disguise': 'cha',
            'escape_artist': 'dex', 'fly': 'dex', 'handle_animal': 'cha',
            'heal': 'wis', 'intimidate': 'cha', 'linguistics': 'int',
            'perception': 'wis', 'ride': 'dex', 'sense_motive': 'wis',
            'sleight_of_hand': 'dex', 'spellcraft': 'int', 'stealth': 'dex',
            'survival': 'wis', 'swim': 'str', 'use_magic_device': 'cha',
        }
        sheet_skills = {}
        for pdf_prefix, skill_name in self.SKILL_FIELDS:
            key = skill_keys[pdf_prefix]
            total_text = text(f'{pdf_prefix} Total')
            ranks_text = text(f'{pdf_prefix} Ranks')
            misc_text = text(f'{pdf_prefix} Mod')
            is_class = text(f'{pdf_prefix} Train').lower() == 'true'
            if not (total_text or ranks_text or misc_text):
                continue
            ranks = number(ranks_text, 0)
            total = number(total_text, None)
            misc = number(misc_text, None)
            if misc is None:
                misc = total - ability_modifiers.get(skill_abilities.get(key, 'int'), 0) - ranks if total is not None else 0
                if is_class and ranks:
                    misc -= 3
            sheet_skills[key] = {
                'isClassSkill': is_class,
                'ranks': ranks,
                'misc': misc,
            }

        for label, key, ability in (
            ('Craft', 'int', 'int'),
            ('Profession', 'wis', 'wis'),
            ('Perform', 'cha', 'cha'),
        ):
            for index in range(1, 4 if label == 'Craft' else 3):
                prefix = f'{label} {index}'
                description = text(f'{prefix} Description')
                total_text = text(f'{prefix} Total')
                ranks_text = text(f'{prefix} Ranks')
                misc_text = text(f'{prefix} Mod')
                is_class = text(f'{prefix} Train').lower() == 'true'
                if not (description or total_text or ranks_text or misc_text):
                    continue
                ranks = number(ranks_text, 0)
                total = number(total_text, None)
                misc = number(misc_text, None)
                if misc is None:
                    misc = total - ability_modifiers[ability] - ranks if total is not None else 0
                    if is_class and ranks:
                        misc -= 3
                sheet_skills[f'{label.lower()}{index}'] = {
                    'isClassSkill': is_class,
                    'ranks': ranks,
                    'misc': misc,
                    'customSubname': description,
                }

        spell_levels = {}
        for level in range(10):
            level_spells = [
                text(f'Spells {level} {slot}')
                for slot in range(1, 10)
                if text(f'Spells {level} {slot}')
            ]
            spell_levels[str(level)] = {
                'spells': level_spells,
                'known': text(f'Spells {level} Known'),
                'dc': text(f'Spells {level} Save DC'),
                'per_day': text(f'Spells {level} Per Day'),
                'bonus': text(f'Spells {level} Bonus'),
            }

        sheet_weapons = []
        for weapon in data['equipment'].get('weapons', []):
            index = len(sheet_weapons) + 1
            weapon_type = str(weapon.get('type', '')).lower()
            attack_type = 'ranged' if 'range' in weapon_type else 'melee'
            enhancement_match = re.search(r'\+(\d+)(?:\s|$)', weapon['name'])
            enhancement = min(5, int(enhancement_match.group(1))) if enhancement_match else 0
            critical_match = re.search(r'(\d+(?:-\d+)?)\s*/?\s*x(\d+)', weapon.get('crit', ''), re.IGNORECASE)
            damage_match = re.search(r'(\d*d\d+)(?:\s*([+-])\s*(\d+))?', weapon.get('damage', ''), re.IGNORECASE)
            bab = number(text('Base Attack Bonus'), 0)
            attack_match = re.search(r'[+-]?\d+', weapon.get('attack', ''))
            key = 'dex' if attack_type == 'ranged' else 'str'
            misc_attack = int(attack_match.group(0)) - bab - ability_modifiers[key] - enhancement if attack_match else 0
            damage_bonus = int(damage_match.group(3)) if damage_match and damage_match.group(3) else 0
            if damage_match and damage_match.group(2) == '-':
                damage_bonus *= -1
            base_die = damage_match.group(1).lower() if damage_match else '1d8'
            misc_damage = damage_bonus - (ability_modifiers['str'] if attack_type == 'melee' else 0) - enhancement
            sheet_weapons.append({
                'name': weapon['name'],
                'atkType': attack_type,
                'type': '',
                'range': weapon.get('range', ''),
                'baseDie': base_die,
                'enh': enhancement,
                'miscAtk': misc_attack,
                'miscDmg': misc_damage,
                'critRange': critical_match.group(1) if critical_match else '20',
                'critMult': int(critical_match.group(2)) if critical_match else 2,
                'ammo': weapon.get('ammo', ''),
            })

        ac_items = []
        for index in range(1, 6):
            name = text(f'AC Item {index}')
            if not name:
                continue
            properties = text(f'AC Item {index} Properties')
            item_type = 'shield' if 'shield' in (properties + name).lower() else 'armor'
            ac_items.append({
                'name': name,
                'type': item_type,
                'bonus': number(text(f'AC Item {index} Bonus'), 0),
                'max_dex': number(text(f'AC Item {index} Max Dex'), None),
                'pen': number(text(f'AC Item {index} Check Penalty'), 0),
                'weight': number(text(f'AC Item {index} Weight'), 0),
                'category': properties,
                'is_active': True,
            })
        if not any(item['type'] == 'armor' for item in ac_items):
            name = text('Armor Name')
            bonus = number(text('Armor AC'), number(text('Armor Bonus'), 0))
            if name or bonus:
                ac_items.append({
                    'name': name or 'Imported Armor',
                    'type': 'armor',
                    'bonus': bonus,
                    'max_dex': number(text('Armor Max Dex'), None),
                    'pen': number(text('Armor Check Penalty'), 0),
                    'weight': number(text('Armor Weight'), 0),
                    'category': text('Armor Type'),
                    'is_active': True,
                })
        if not any(item['type'] == 'shield' for item in ac_items):
            name = text('Shield Name')
            bonus = number(text('Shield Bonus'), 0)
            if name or bonus:
                ac_items.append({
                    'name': name or 'Imported Shield',
                    'type': 'shield',
                    'bonus': bonus,
                    'weight': number(text('Shield Weight'), 0),
                    'is_active': True,
                })

        gear = [
            {'name': text(f'Gear {index}'), 'weight': number(text(f'Gear Weight {index}'), 0)}
            for index in range(1, 27)
            if text(f'Gear {index}')
        ]
        feats = [
            {'title': text(f'Feats {index}'), 'desc': ''}
            for index in range(1, 13)
            if text(f'Feats {index}')
        ]
        specials = [
            {'badge': 'Special', 'title': text(f'Special Ability {index}'), 'desc': ''}
            for index in range(1, 21)
            if text(f'Special Ability {index}')
        ]
        if feats:
            data['basic']['in-feats'] = '\n'.join(feat['title'] for feat in feats)

        class_entries = []
        for part in re.split(r'\s*(?:/|,|;)\s*', text('Character Class and Level')):
            if not part:
                continue
            match = re.fullmatch(r'(.+?)\s+(?:level\s*)?(\d+)', part, re.IGNORECASE)
            class_name = match.group(1).strip() if match else part.strip()
            class_level = int(match.group(2)) if match else 1
            class_key = re.sub(r'[^a-z0-9]+', '_', class_name.lower()).strip('_')
            class_entries.append({'class': class_key, 'name': class_name, 'level': class_level})

        level = class_entries[0]['level'] if class_entries else 1
        race = text('Race') or 'Human'
        size = text('Size') or 'Medium'
        scores = {key: number(text(name), 10) + number(text(f'{name} Temp Adjustment'), 0)
                  for name, key in ability_names.items()}
        armor_bonus_total = sum(item['bonus'] for item in ac_items if item['type'] == 'armor')
        shield_bonus_total = sum(item['bonus'] for item in ac_items if item['type'] == 'shield')
        size_modifier = {'Fine': 8, 'Diminutive': 4, 'Tiny': 2, 'Small': 1, 'Medium': 0, 'Large': -1,
                         'Huge': -2, 'Gargantuan': -4, 'Colossal': -8}.get(size, 0)
        ac_misc = number(text('Armor Misc Modifier'), None)
        ac_total = number(text('Armor Class'), None)
        if ac_misc is None and ac_total is not None:
            ac_misc = ac_total - (10 + armor_bonus_total + shield_bonus_total + (scores['dex'] - 10) // 2
                                  + size_modifier + number(text('Natural Armor'), 0)
                                  + number(text('Deflection Modifier'), 0))

        sheet_data = data.setdefault('sheetData', {})
        sheet_data.update({
            'alignment': text('Alignment') or 'LG',
            'player': text('Player'),
            'deity': text('Deity'),
            'homeland': text('Homeland'),
            'size': size,
            'gender': text('Gender') or 'Male',
            'age': text('Age'),
            'height': text('Height'),
            'weight': text('Weight'),
            'hair': text('Hair'),
            'eyes': text('Eyes'),
            'eyesHair': ' / '.join(filter(None, (text('Hair'), text('Eyes')))),
            'abilityScores': scores,
            'dr': text('Damage Reduction'),
            'nonlethal': text('Nonlethal Damage'),
            'speedBase': number(text('Speed Ft'), 30),
            'speedArmor': number(text('Armor Speed Ft'), 20),
            'speedFly': number(text('Fly Speed Ft'), ''),
            'speedSwim': number(text('Swim Speed Ft'), ''),
            'speedClimb': number(text('Climb Speed Ft'), ''),
            'speedBurrow': number(text('Burrow Speed Ft'), ''),
            'initMisc': number(text('Initiative Misc Modifier'), 0),
            'acNatural': number(text('Natural Armor'), 0),
            'acDeflect': number(text('Deflection Modifier'), 0),
            'acMisc': ac_misc if ac_misc is not None else 0,
            'sr': text('Spell Resistance'),
            'skillConditional': ' '.join(filter(None, (
                text('Conditional Modifiers'), text('Conditional Modifiers 1'),
                text('Conditional Modifiers 2'),
            ))).strip(),
            'saveConditional': text('Save Modifiers'),
            'languages': ', '.join(filter(None, (
                text('Languages 1'), text('Languages 2'), text('Languages 3'),
            ))),
            'hpExtraMisc': 0,
            'skills': sheet_skills,
            'weapons': sheet_weapons,
            'acItems': ac_items,
            'saveItems': [],
            'gear': gear,
            'feats': feats,
            'specials': specials,
            'spells': {
                'castingStat': '',
                'spellNotes': text('Spell Domain'),
                'levels': spell_levels,
            },
            'moneyCp': number(text('Copper'), 0),
            'moneySp': number(text('Silver'), 0),
            'moneyGp': number(text('Gold'), 0),
            'moneyPp': number(text('Platinum'), 0),
            'currentXp': number(text('Experience Points'), 0),
            'hpRolls': {},
            'multiclass': [
                {'class': item['class'], 'name': item['name'], 'level': item['level']}
                for item in class_entries[1:]
            ],
        })
        max_hp = number(text('Hit Points'), None)
        if max_hp is not None:
            sheet_data['maxHp'] = max_hp
        current_hp = number(text('Wounds/Current HP'), max_hp)
        if current_hp is not None:
            sheet_data['currentHp'] = current_hp

        for save, pdf_name, ability in (
            ('fort', 'Fortitude', 'con'),
            ('ref', 'Reflex', 'dex'),
            ('will', 'Will', 'wis'),
        ):
            base = number(text(f'{pdf_name} Save Base'), None)
            if base is not None:
                sheet_data[f'saveBase_{save}'] = base
            sheet_data[f'saveAbility_{save}'] = ability_modifiers[ability]
            for component, field_name in (
                ('Magic', f'{pdf_name} Save Magic Modifier'),
                ('Misc', f'{pdf_name} Save Misc Modifier'),
            ):
                sheet_data[f'save{component}_{save}'] = number(text(field_name), 0)

        data['name'] = text('Character Name') or 'Imported Character'
        data['race'] = race
        data['player'] = text('Player')
        data['level'] = level
        data['basic']['in-level'] = level
        data['basic']['in-race'] = race
        data['basic']['in-size'] = size
        if class_entries:
            primary_class = class_entries[0]
            data['classKey'] = primary_class['class']
            data['class'] = primary_class['name']
            data['className'] = primary_class['name']
            data['dynamic'] = {'classes': class_entries}
        data['equipment']['acItems'] = ac_items
        data['equipment']['gear'] = gear
        data['equipment']['feats'] = feats
        data['equipment']['specials'] = specials
        data['field_count'] = (
            len(data['basic']) + len(data['skills']) + len(sheet_weapons) + len(ac_items)
            + len(gear) + len(feats) + len(specials)
            + sum(len(level_data['spells']) for level_data in spell_levels.values())
        )
