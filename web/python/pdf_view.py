import re
import json
from pathlib import Path
from core.character import Character, parse_int, calc_mod, SKILL_NAME_MAP, SPELLCASTING_CONFIG
from core.abilities import is_placeholder_ability

try:
    import pymupdf
except ImportError:
    try:
        import fitz as pymupdf
    except ImportError:
        pymupdf = None

class PdfCharacterSheetView:

    def __init__(self, template_path: Path = None):
        if template_path is None:
            p = Path(__file__).resolve().parent
            if p.name == "python" and p.parent.name == "web":
                base_dir = p.parent.parent
            else:
                base_dir = p.parent
            template_path = base_dir / "Pathfinder-Character-Sheet-EDIT.pdf"
        self.template_path = Path(template_path)
        self._template_bytes = None

    def map_character_to_fields(self, character: Character) -> dict:

        fields = {}
        basic = character.basic
        dynamic = character.dynamic

        fields['Character Name'] = character.name
        fields['Alignment'] = character.alignment
        fields['Player'] = character.player
        fields['Character Class and Level'] = character.class_and_level
        fields['Race'] = character.race
        fields['Size'] = character.size
        fields['Experience Points'] = character.xp
        fields['Deity'] = character.deity
        fields['Homeland'] = character.homeland
        fields['Gender'] = character.gender
        fields['Age'] = character.age
        fields['Height'] = character.height
        fields['Weight'] = character.weight
        fields['Hair'] = character.hair
        fields['Eyes'] = character.eyes

        stats = [
            ('Strength', 'str'),
            ('Dexterity', 'dex'),
            ('Constitution', 'con'),
            ('Intelligence', 'int'),
            ('Wisdom', 'wis'),
            ('Charisma', 'cha')
        ]
        for name, key in stats:
            score = character.get_ability_score(key)
            fields[name] = score
            fields[f'{name} Modifier'] = calc_mod(score)
            fields[f'{name} Base Modifier'] = calc_mod(score)
            temp = character.get_ability_temp(key)
            if temp:
                fields[f'{name} Temp Adjustment'] = temp
                fields[f'{name} Temp Modifier'] = calc_mod(temp)

        fields['Hit Points'] = character.hit_points
        fields['Wounds/Current HP'] = ""
        fields['Nonlethal Damage'] = str(basic.get('in-nonlethal', ''))
        fields['Damage Reduction'] = basic.get('in-dr', '')
        fields['Initiative'] = character.initiative
        fields['Initiative Misc Modifier'] = character.initiative_misc

        base_ft, base_sq, arm_ft, arm_sq = character.calculate_speeds()
        fields['Speed Ft'] = base_ft
        fields['Speed Sq'] = base_sq
        fields['Armor Speed Ft'] = arm_ft
        fields['Armor Speed Sq'] = arm_sq

        ac_data = character.calculate_ac()
        fields['Armor Class'] = ac_data['total']
        fields['Touch Armor Class'] = ac_data['touch']
        fields['Flatfooted Armor Class'] = ac_data['flat_footed']
        fields['Armor Bonus'] = ac_data['armor_bonus']
        fields['Shield Bonus'] = ac_data['shield_bonus']
        fields['Natural Armor'] = ac_data['natural_armor']
        fields['Deflection Modifier'] = ac_data['deflection']
        fields['Size Modifier'] = ac_data['size']
        fields['Armor Misc Modifier'] = ac_data['misc']
        fields['AC Dexterity Modifier'] = ac_data['dex_mod']

        saves = character.calculate_saves()
        fields['Fortitude Save'] = saves['fort']
        fields['Fortitude Save Base'] = saves['fort_base']
        if saves['fort_magic']: fields['Fortitude Save Magic Modifier'] = saves['fort_magic']
        if saves['fort_misc']: fields['Fortitude Save Misc Modifier'] = saves['fort_misc']
        if saves['fort_temp']: fields['Fortitude Save Temp Modifier'] = saves['fort_temp']

        fields['Reflex Save'] = saves['ref']
        fields['Reflex Save Base'] = saves['ref_base']
        if saves['ref_magic']: fields['Reflex Save Magic Modifier'] = saves['ref_magic']
        if saves['ref_misc']: fields['Reflex Save Misc Modifier'] = saves['ref_misc']
        if saves['ref_temp']: fields['Reflex Save Temp Modifier'] = saves['ref_temp']

        fields['Will Save'] = saves['will']
        fields['Will Save Base'] = saves['will_base']
        if saves['will_magic']: fields['Will Save Magic Modifier'] = saves['will_magic']
        if saves['will_misc']: fields['Will Save Misc Modifier'] = saves['will_misc']
        if saves['will_temp']: fields['Will Save Temp Modifier'] = saves['will_temp']

        fields['Base Attack Bonus'] = character.bab
        fields['Base Attack Bonus C'] = character.bab
        fields['Spell Resistance'] = character.sr
        fields['CMB'] = character.cmb
        fields['CMB Ability Modifier'] = calc_mod(character.str_score, with_sign=False)
        fields['CMD'] = character.cmd

        langs_str = str(basic.get('in-languages', 'Common')).strip()
        langs_list = [l.strip() for l in langs_str.split(',') if l.strip()]
        line1, line2, line3 = [], [], []
        target = 1
        for l in langs_list:
            if target == 1:
                line1.append(l)
                if len(', '.join(line1)) >= 28:
                    target = 2
            elif target == 2:
                line2.append(l)
                if len(', '.join(line2)) >= 28:
                    target = 3
            else:
                line3.append(l)

        fields['Languages 1'] = ', '.join(line1)
        fields['Languages 2'] = ', '.join(line2)
        fields['Languages 3'] = ', '.join(line3)
        cond_mods = basic.get('in-conditional-modifiers', '') or character.sheet_data.get('skillConditional', '')
        save_cond = basic.get('in-save-conditional', '') or character.sheet_data.get('saveConditional', '')
        all_conds = []
        if save_cond:
            all_conds.append(f"Saves: {save_cond}")
        if cond_mods:
            all_conds.append(f"Skills: {cond_mods}")
        cond_text = '; '.join(all_conds)
        fields['Conditional Modifiers'] = cond_text[:40] if cond_text else ""
        fields['Conditional Modifiers 1'] = cond_text[40:80] if len(cond_text) > 40 else ""
        fields['Conditional Modifiers 2'] = cond_text[80:120] if len(cond_text) > 80 else ""

        structured_skills = dynamic.get('skills', []) or character.sheet_data.get('skills')
        if isinstance(structured_skills, dict):
            converted = []
            for k, v in structured_skills.items():
                if isinstance(v, dict):
                    converted.append({'name': k, **v})
                elif isinstance(v, (int, str)):
                    converted.append({'name': k, 'total': str(v)})
            structured_skills = converted

        if isinstance(structured_skills, list) and len(structured_skills) > 0:
            craft_idx = 1
            prof_idx = 1
            perf_idx = 1
            for sk in structured_skills:
                s_name = sk.get('name', '').strip().lower()
                s_total = sk.get('total', '')
                s_ranks = str(sk.get('ranks', '') if sk.get('ranks') is not None else '')
                s_misc = str(sk.get('misc', '') if sk.get('misc') is not None else '')
                is_class = bool(sk.get('isClass') or sk.get('isClassSkill') or sk.get('cs'))

                if s_name.startswith('craft'):
                    desc = sk.get('desc', '') or sk.get('customSubname', '')
                    if craft_idx <= 3:
                        fields[f'Craft {craft_idx} Description'] = desc
                        fields[f'Craft {craft_idx} Total'] = str(s_total) if s_total != '' else ''
                        fields[f'Craft {craft_idx} Ranks'] = s_ranks
                        fields[f'Craft {craft_idx} Mod'] = s_misc
                        if is_class: fields[f'Craft {craft_idx}'] = 'On'
                        craft_idx += 1
                    continue

                if s_name.startswith('profession'):
                    desc = sk.get('desc', '') or sk.get('customSubname', '')
                    if prof_idx <= 2:
                        fields[f'Profession {prof_idx} Description'] = desc
                        fields[f'Profession {prof_idx} Total'] = str(s_total) if s_total != '' else ''
                        fields[f'Profession {prof_idx} Ranks'] = s_ranks
                        fields[f'Profession {prof_idx} Mod'] = s_misc
                        if is_class: fields[f'Profession {prof_idx}'] = 'On'
                        prof_idx += 1
                    continue

                if s_name.startswith('perform'):
                    desc = sk.get('desc', '') or sk.get('customSubname', '')
                    if perf_idx <= 2:
                        fields[f'Perform {perf_idx} Description'] = desc
                        fields[f'Perform {perf_idx} Total'] = str(s_total) if s_total != '' else ''
                        fields[f'Perform {perf_idx} Ranks'] = s_ranks
                        fields[f'Perform {perf_idx} Mod'] = s_misc
                        if is_class: fields[f'Perform {perf_idx}'] = 'On'
                        perf_idx += 1
                    continue

                target = SKILL_NAME_MAP.get(s_name)
                if target:
                    fields[f'{target} Total'] = str(s_total) if s_total != '' else ''
                    if s_ranks != '': fields[f'{target} Ranks'] = s_ranks
                    if s_misc != '': fields[f'{target} Mod'] = s_misc
                    if is_class: fields[target] = 'On'
        else:
            skills_str = basic.get('in-skills', '')
            if skills_str:
                craft_idx = 1
                prof_idx = 1
                perf_idx = 1
                for item in skills_str.split(','):
                    item = item.strip()
                    if not item: continue
                    m = re.match(r'^(.*?)\s*([+-]\d+)$', item)
                    if not m: continue
                    s_name = m.group(1).strip().lower()
                    s_bonus = m.group(2)

                    if s_name.startswith('craft'):
                        m_sub = re.search(r'\((.*?)\)', s_name)
                        desc = m_sub.group(1).title() if m_sub else ''
                        if craft_idx <= 3:
                            fields[f'Craft {craft_idx} Description'] = desc
                            fields[f'Craft {craft_idx} Total'] = s_bonus
                            craft_idx += 1
                        continue

                    if s_name.startswith('profession'):
                        m_sub = re.search(r'\((.*?)\)', s_name)
                        desc = m_sub.group(1).title() if m_sub else ''
                        if prof_idx <= 2:
                            fields[f'Profession {prof_idx} Description'] = desc
                            fields[f'Profession {prof_idx} Total'] = s_bonus
                            prof_idx += 1
                        continue

                    if s_name.startswith('perform'):
                        m_sub = re.search(r'\((.*?)\)', s_name)
                        desc = m_sub.group(1).title() if m_sub else ''
                        if perf_idx <= 2:
                            fields[f'Perform {perf_idx} Description'] = desc
                            fields[f'Perform {perf_idx} Total'] = s_bonus
                            perf_idx += 1
                        continue

                    target = SKILL_NAME_MAP.get(s_name)
                    if target:
                        fields[f'{target} Total'] = s_bonus

        weapons_list = character.get_weapons() if hasattr(character, 'get_weapons') and character.get_weapons() else (dynamic.get('weapons', []) or [])
        if not weapons_list:
            melee_list = dynamic.get('melee', [])
            ranged_list = dynamic.get('ranged', [])
            for w in melee_list:
                if isinstance(w, dict):
                    raw = w.get('rawText', '') or w.get('name', '')
                    weapons_list.append({'type': 'Melee', 'raw': raw, **w})
                elif isinstance(w, str):
                    weapons_list.append({'type': 'Melee', 'raw': w})
            for w in ranged_list:
                if isinstance(w, dict):
                    raw = w.get('rawText', '') or w.get('name', '')
                    weapons_list.append({'type': 'Ranged', 'raw': raw, **w})
                elif isinstance(w, str):
                    weapons_list.append({'type': 'Ranged', 'raw': w})

        for idx in range(1, 6):
            fields[f'Weapon {idx}'] = ""
            fields[f'Weapon {idx} Attack Bonus'] = ""
            fields[f'Weapon {idx} Damage'] = ""
            fields[f'Weapon {idx} Critical'] = ""
            fields[f'Weapon {idx} Type'] = ""
            fields[f'Weapon {idx} Range'] = ""
            fields[f'Weapon {idx} Ammunition'] = ""

        for idx, w in enumerate(weapons_list[:5], 1):
            w_name = w.get('name', '')
            w_atk = w.get('attack', '')
            w_dmg = w.get('damage', '')
            w_crit = w.get('crit', '')
            w_type = w.get('type', 'Melee')
            w_range = w.get('range', '')
            w_ammo = w.get('ammo', '')
            raw_w = w.get('raw', '') or w.get('rawText', '')

            if not w_name and raw_w:
                clean_raw = raw_w.replace('–', '-').replace('—', '-')
                m_w = re.match(r'^(.*?)\s+([+-]\d+(?:/[+-]?\d+)*)\s*\((.*?)\)(.*)$', clean_raw.strip())
                if m_w:
                    w_name = m_w.group(1).strip().title()
                    w_atk = m_w.group(2).strip()
                    inside = m_w.group(3).strip()
                    extra_text = m_w.group(4).strip()
                    if '/' in inside:
                        w_dmg, w_crit = inside.split('/', 1)
                    else:
                        w_dmg, w_crit = inside, '20/x2'
                    if extra_text:
                        w_dmg += f" {extra_text}"
                else:
                    w_name = raw_w.title()

            fields[f'Weapon {idx}'] = w_name
            fields[f'Weapon {idx} Attack Bonus'] = w_atk
            fields[f'Weapon {idx} Damage'] = w_dmg.strip()
            fields[f'Weapon {idx} Critical'] = w_crit.strip()
            fields[f'Weapon {idx} Type'] = w_type
            if w_range: fields[f'Weapon {idx} Range'] = str(w_range)
            if w_ammo: fields[f'Weapon {idx} Ammunition'] = str(w_ammo)

        for idx in range(1, 6):
            fields[f'AC Item {idx}'] = ""
            fields[f'AC Item {idx} Bonus'] = ""
            fields[f'AC Item {idx} Max Dex'] = ""
            fields[f'AC Item {idx} Check Penalty'] = ""
            fields[f'AC Item {idx} Spell Failure'] = ""
            fields[f'AC Item {idx} Weight'] = ""
            fields[f'AC Item {idx} Properties'] = ""

        ac_items = dynamic.get('ac_items') or dynamic.get('armors') or character.sheet_data.get('acItems') or []
        total_ac_bonus = 0
        total_check_penalty = 0
        total_spell_failure = 0
        total_ac_weight = 0
        lowest_max_dex = None

        if isinstance(ac_items, list) and len(ac_items) > 0:
            for idx, ac_it in enumerate(ac_items[:5], 1):
                name = str(ac_it.get('name', '')).strip()
                if not name:
                    continue
                fields[f'AC Item {idx}'] = name
                is_act = ac_it.get('is_active', ac_it.get('isActive', True))
                b = ac_it.get('bonus')
                if b is not None:
                    b_val = parse_int(b, 0)
                    if is_act:
                        total_ac_bonus += b_val
                fields[f'AC Item {idx} Bonus'] = str(b) if b is not None else ''

                md = ac_it.get('max_dex')
                if md is not None and str(md) != '' and str(md) != '-':
                    try:
                        md_int = int(str(md).replace('+', ''))
                        if is_act and (lowest_max_dex is None or md_int < lowest_max_dex):
                            lowest_max_dex = md_int
                    except Exception:
                        pass
                fields[f'AC Item {idx} Max Dex'] = str(md) if md is not None else ''

                cp = ac_it.get('check_penalty') if ac_it.get('check_penalty') is not None else ac_it.get('pen')
                if cp is not None and str(cp) != '' and str(cp) != '-':
                    try:
                        cp_int = int(str(cp).replace('–', '-').replace('−', '-'))
                        if cp_int > 0:
                            cp_int = -cp_int
                        if is_act:
                            total_check_penalty += cp_int
                        fields[f'AC Item {idx} Check Penalty'] = str(cp_int)
                    except Exception:
                        fields[f'AC Item {idx} Check Penalty'] = str(cp)
                else:
                    fields[f'AC Item {idx} Check Penalty'] = '-' if str(cp) == '-' else '0'

                sf = ac_it.get('spell_failure', '')
                if sf and str(sf) != '-':
                    m_sf = re.search(r'(\d+)', str(sf))
                    if m_sf and is_act:
                        total_spell_failure += int(m_sf.group(1))
                fields[f'AC Item {idx} Spell Failure'] = str(sf) if sf else '-'

                wt = ac_it.get('weight', '')
                if wt is not None and str(wt) != '':
                    try:
                        wt_int = parse_int(wt, 0)
                        if is_act:
                            total_ac_weight += wt_int
                    except Exception:
                        pass
                fields[f'AC Item {idx} Weight'] = str(wt) if wt is not None else ''

                prop_val = str(ac_it.get('properties') or ac_it.get('type') or ac_it.get('category') or '').strip()
                if prop_val.lower() == 'shield':
                    prop_val = 'Shield'
                elif prop_val.lower() in ['armor', 'body armor']:
                    prop_val = 'Armor'
                fields[f'AC Item {idx} Properties'] = prop_val
        else:
            armor_name = basic.get('in-armor-name', '')
            if armor_name and armor_name != 'None':
                fields['AC Item 1'] = armor_name
                b = basic.get('in-ac-armor', '')
                fields['AC Item 1 Bonus'] = str(b)
                fields['AC Item 1 Properties'] = 'Armor'
                total_ac_bonus += parse_int(b, 0)
            shield_name = basic.get('in-shield-name', '')
            if shield_name and shield_name != 'None':
                fields['AC Item 2'] = shield_name
                b = basic.get('in-ac-shield', '')
                fields['AC Item 2 Bonus'] = str(b)
                fields['AC Item 2 Properties'] = 'Shield'
                total_ac_bonus += parse_int(b, 0)

            raw_acp = basic.get('in-ac-check-penalty', '')
            if raw_acp:
                try:
                    total_check_penalty = int(str(raw_acp).replace('–', '-').replace('−', '-'))
                except Exception:
                    pass

        fields['AC Item Bonus Total'] = f"+{total_ac_bonus}" if total_ac_bonus > 0 else str(total_ac_bonus)
        fields['AC Item Max Dex'] = f"+{lowest_max_dex}" if (lowest_max_dex is not None and lowest_max_dex > 0) else (str(lowest_max_dex) if lowest_max_dex is not None else '')
        fields['AC Item Check Penalty Total'] = str(total_check_penalty)
        fields['AC Item Spell Failure Total'] = f"{total_spell_failure}%" if total_spell_failure else "-"
        fields['AC Item Weight Total'] = str(total_ac_weight) if total_ac_weight else "0"

        for idx in range(1, 27):
            fields[f'Gear {idx}'] = ""
            fields[f'Gear Weight {idx}'] = ""

        clean_gear = character.get_clean_gear()
        for idx, g_item in enumerate(clean_gear[:26], 1):
            fields[f'Gear {idx}'] = g_item

        total_gear_weight = character.sheet_data.get('totalWeight') or character.sheet_data.get('gearTotalWeight')
        if not total_gear_weight:
            gear_list = character.sheet_data.get('gear') or character.dynamic.get('gear') or []
            if isinstance(gear_list, list):
                total_gear_weight = sum(parse_int(g.get('weight', 0)) for g in gear_list if isinstance(g, dict))
            total_gear_weight = (total_gear_weight or 0) + total_ac_weight
        fields['Gear Total Weight'] = str(total_gear_weight) if total_gear_weight else "35"

        fields['Copper'] = str(basic.get('in-cp', ''))
        fields['Silver'] = str(basic.get('in-sp', ''))
        fields['Gold'] = str(basic.get('in-gp', ''))
        fields['Platinum'] = str(basic.get('in-pp', ''))

        for idx in range(1, 13):
            fields[f'Feats {idx}'] = ""

        clean_feats = character.get_clean_feats()
        feat_lines = []
        i = 0
        while i < len(clean_feats):
            f1 = clean_feats[i]
            if i + 1 < len(clean_feats):
                f2 = clean_feats[i + 1]
                if len(f1) > 35 or (len(f1) + len(f2) + 2 > 46):
                    feat_lines.append(f1)
                    i += 1
                else:
                    feat_lines.append(f"{f1}, {f2}")
                    i += 2
            else:
                feat_lines.append(f1)
                i += 1

        for idx, line in enumerate(feat_lines[:12], 1):
            fields[f'Feats {idx}'] = line

        if len(feat_lines) > 12:
            extra = ', '.join(feat_lines[11:])
            fields['Feats 12'] = extra

        for idx in range(1, 21):
            fields[f'Special Ability {idx}'] = ""

        specials_list = character.sheet_data.get('specials') or character.dynamic.get('specials')
        if specials_list and isinstance(specials_list, list) and len(specials_list) > 0:
            for idx, sp in enumerate(specials_list[:20], 1):
                if isinstance(sp, dict):
                    t = str(sp.get('title') or sp.get('name') or '').strip()
                    d = str(sp.get('desc') or '').strip()
                    if t and d and t.lower() != d.lower():
                        full_text = f"{t}: {d}"
                    else:
                        full_text = t or d
                else:
                    full_text = str(sp).strip()
                fields[f'Special Ability {idx}'] = full_text[:95]
        else:
            resolved_ab = character.resolve_abilities()
            abilities = resolved_ab.get('abilities_list', [])

            category_prefix_pattern = re.compile(
                r'^(?:defense|defensive|special\s+attack|attacks?|special\s+quality|sq|racial\s+trait|racial|class\s+feature|feature|aura)\s*:\s*',
                re.IGNORECASE
            )

            line_idx = 1
            for ab in abilities:
                if line_idx > 20:
                    break
                name = ab.get('name', '').strip()
                desc = ab.get('desc', '').strip()

                clean_name = category_prefix_pattern.sub('', name).strip()
                clean_desc = category_prefix_pattern.sub('', desc).strip()

                if is_placeholder_ability(clean_desc) or is_placeholder_ability(clean_name):
                    continue

                if clean_name and clean_desc and clean_name.lower() != clean_desc.lower():
                    full_text = f"{clean_name}: {clean_desc}"
                else:
                    full_text = clean_desc or clean_name

                full_text = category_prefix_pattern.sub('', full_text).strip()
                if full_text and not is_placeholder_ability(full_text):
                    fields[f'Special Ability {line_idx}'] = full_text[:95]
                    line_idx += 1

            if not abilities:
                if line_idx <= 20 and basic.get('in-aura') and basic.get('in-aura') != 'None':
                    a_clean = category_prefix_pattern.sub('', basic['in-aura']).strip()
                    if a_clean and not is_placeholder_ability(a_clean):
                        fields[f'Special Ability {line_idx}'] = a_clean[:95]
                        line_idx += 1
                if line_idx <= 20 and basic.get('in-def-abilities'):
                    for d in basic['in-def-abilities'].split('|'):
                        d_clean = category_prefix_pattern.sub('', d.strip()).strip()
                        if d_clean and not is_placeholder_ability(d_clean) and line_idx <= 20:
                            fields[f'Special Ability {line_idx}'] = d_clean[:95]
                            line_idx += 1
                if line_idx <= 20 and basic.get('in-special-attacks'):
                    for a in basic['in-special-attacks'].split('|'):
                        a_clean = category_prefix_pattern.sub('', a.strip()).strip()
                        if a_clean and not is_placeholder_ability(a_clean) and line_idx <= 20:
                            fields[f'Special Ability {line_idx}'] = a_clean[:95]
                            line_idx += 1
                if line_idx <= 20 and basic.get('in-sq'):
                    for s in basic['in-sq'].split('|'):
                        s_clean = category_prefix_pattern.sub('', s.strip()).strip()
                        if s_clean and not is_placeholder_ability(s_clean) and line_idx <= 20:
                            fields[f'Special Ability {line_idx}'] = s_clean[:95]
                            line_idx += 1

        for lvl in range(10):
            fields[f'Spells {lvl} Known'] = ""
            fields[f'Spells {lvl} Save DC'] = ""
            fields[f'Spells {lvl} Per Day'] = ""
            fields[f'Spells {lvl} Bonus'] = ""
            for s_idx in range(1, 9):
                fields[f'Spells {lvl} {s_idx}'] = ""
        fields['Spell Domain'] = ""

        spells_source = (
            character.sheet_data.get('spells') or
            character.dynamic.get('spells') or
            basic.get('in-spells-data') or
            basic.get('in-spells')
        )

        cls_key = None
        cfg = None
        for c in character.classes:
            ck = c['class'].lower().strip()
            if ck in SPELLCASTING_CONFIG:
                cls_key = ck
                cfg = SPELLCASTING_CONFIG[ck]
                break
        if not cls_key:
            cls_key = character.primary_class.lower().strip()
            cfg = SPELLCASTING_CONFIG.get(cls_key)

        spell_stat = basic.get('in-spell-stat')
        if not spell_stat and isinstance(spells_source, dict):
            spell_stat = spells_source.get('castingStat')
        if not spell_stat or (spell_stat.lower() == 'cha' and cfg and cfg['stat'] != 'cha'):
            spell_stat = cfg['stat'] if cfg else 'cha'
        else:
            spell_stat = spell_stat.lower()

        stat_map = {
            'str': character.str_score,
            'dex': character.dex_score,
            'con': character.con_score,
            'int': character.int_score,
            'wis': character.wis_score,
            'cha': character.cha_score
        }
        casting_mod = parse_int(calc_mod(stat_map.get(spell_stat, character.cha_score)))

        if spells_source or character.has_spellcasting():
            if isinstance(spells_source, str):
                try:
                    spells_source = json.loads(spells_source)
                except Exception:
                    spells_source = {}

            levels_dict = {}
            if isinstance(spells_source, dict):
                if 'levels' in spells_source and isinstance(spells_source['levels'], dict):
                    levels_dict = spells_source['levels']
                elif 'slots' in spells_source and isinstance(spells_source['slots'], list):
                    for sl in spells_source['slots']:
                        lvl = sl.get('lvl', 0)
                        levels_dict[str(lvl)] = {
                            'known': sl.get('known', ''),
                            'per_day': sl.get('perDay', ''),
                            'bonus': sl.get('bonus', ''),
                            'dc': sl.get('dc', 10 + lvl + casting_mod),
                            'spells': sl.get('spells', [])
                        }
                else:
                    levels_dict = spells_source

                slots = spells_source.get('slots', [])
                if isinstance(slots, list):
                    for slot in slots:
                        try:
                            slot_level = str(int(slot.get('lvl', 0)))
                        except (AttributeError, TypeError, ValueError):
                            continue
                        level_data = dict(levels_dict.get(slot_level, {}))
                        for source_key, target_key in (('known', 'known'), ('perDay', 'per_day')):
                            value = slot.get(source_key)
                            if value is not None and str(value).strip():
                                existing_value = level_data.get(target_key)
                                is_empty_existing = existing_value is None or str(existing_value).strip() in ('', '—')
                                is_zero_fallback = parse_int(value) == 0 and not is_empty_existing
                                if not is_zero_fallback:
                                    level_data[target_key] = value
                        levels_dict[slot_level] = level_data

            if isinstance(levels_dict, dict):
                for lvl_str, s_info in levels_dict.items():
                    try:
                        lvl = int(lvl_str)
                    except ValueError:
                        continue
                    if lvl > 9 or not isinstance(s_info, dict):
                        continue
                    s_list = s_info.get('spells', [])
                    known_val = s_info.get('known', '')
                    if known_val == '' and s_list:
                        known_val = len(s_list)
                    fields[f'Spells {lvl} Known'] = str(known_val) if known_val != '' else ''
                    dc_val = s_info.get('dc')
                    if dc_val is None or str(dc_val).strip() == '' or str(dc_val) == '—':
                        dc_val = 10 + lvl + casting_mod
                    fields[f'Spells {lvl} Save DC'] = str(dc_val) if dc_val != '' else ''
                    slots = s_info.get('slots', '') or s_info.get('per_day', '')
                    if str(slots) == '—': slots = ''
                    fields[f'Spells {lvl} Per Day'] = str(slots) if slots != '' else ''
                    bonus_spells = s_info.get('bonus', '')
                    if str(bonus_spells) == '—': bonus_spells = ''
                    fields[f'Spells {lvl} Bonus'] = str(bonus_spells) if bonus_spells != '' else ''

                    for s_idx, sp_name in enumerate(s_list[:8], 1):
                        fields[f'Spells {lvl} {s_idx}'] = str(sp_name).strip()

            in_sp_cls = basic.get('in-spell-class', '').strip()
            if not in_sp_cls and isinstance(spells_source, dict):
                in_sp_cls = str(spells_source.get('castingClass', '')).strip()

            if in_sp_cls:
                spell_class = in_sp_cls.title()
            elif cls_key:
                spell_class = cls_key.title()
            else:
                spell_class = character.primary_class.title()

            in_cl = basic.get('in-spell-cl', '').strip()
            if not in_cl and isinstance(spells_source, dict):
                in_cl = str(spells_source.get('cl', '')).strip()

            if in_cl:
                spell_cl = in_cl
            else:
                sp_lvl = character.level
                for c in character.classes:
                    if c['class'].lower().strip() == cls_key:
                        sp_lvl = c['level']
                        break
                if cls_key in ['paladin', 'ranger', 'bloodrager', 'antipaladin']:
                    spell_cl = str(max(1, sp_lvl - 3))
                else:
                    spell_cl = str(sp_lvl)

            spell_conc = basic.get('in-spell-conc', '').strip()
            if spell_conc:
                fields['Spell Domain'] = f"Class: {spell_class} (CL {spell_cl}, Conc {spell_conc})".strip()
            else:
                fields['Spell Domain'] = f"Class: {spell_class} (CL {spell_cl})".strip()

        light_l, med_l, hvy_l, lift_head, lift_gnd, drag_push = character.get_carrying_capacity_data()
        fields['Light Load'] = str(light_l)
        fields['Medium Load'] = str(med_l)
        fields['Heavy Load'] = str(hvy_l)
        fields['Lift Over Head'] = str(lift_head)
        fields['Lift Off Ground'] = str(lift_gnd)
        fields['Drag or Push'] = str(drag_push)

        return fields

    def render(self, character: Character, output_path: Path = None) -> tuple:

        if pymupdf is None:
            raise ImportError("PyMuPDF (fitz) is not installed. Please run 'pip install pymupdf'.")

        if self._template_bytes is None:
            if not self.template_path.exists():
                raise FileNotFoundError(f"PDF template not found at {self.template_path}")
            with open(self.template_path, 'rb') as f:
                self._template_bytes = f.read()

        mapped_fields = self.map_character_to_fields(character)
        doc = pymupdf.open(stream=self._template_bytes, filetype="pdf")
        updated_count = 0

        for page in doc:
            for widget in page.widgets():
                fn = widget.field_name
                if fn in mapped_fields:
                    val = mapped_fields[fn]
                    widget.field_value = str(val) if val is not None else ""
                    widget.update()
                    updated_count += 1

        pdf_bytes = doc.tobytes()

        char_name = character.name
        safe_name = re.sub(r'[^\w\-_\. ]', '_', char_name).replace(' ', '_')
        if not safe_name:
            safe_name = "Character"

        if output_path is not None:
            doc.save(str(output_path))
            print(f"[SUCCESS] {updated_count} fields filled for '{char_name}' -> {output_path}")
        else:
            print(f"[SUCCESS] {updated_count} fields rendered in-memory for '{char_name}'")

        doc.close()
        return pdf_bytes, output_path, safe_name
