import math
from pathlib import Path
import json

def calc_mod(score):
    try:
        val = int(score)
        return (val - 10) // 2
    except:
        return 0

def format_mod(val):
    return f"+{val}" if val >= 0 else str(val)

def get_racial_traits(race_name: str) -> list:
    r = (race_name or "Human").lower().strip()
    traits = []

    if "human" in r:

        return []
    elif "elf" in r and "half" not in r:
        traits.append("Low-Light Vision")
        traits.append("Elven Immunities (immune to magic sleep, +2 saves vs enchantment)")
        traits.append("Keen Senses (+2 Perception)")
        traits.append("Elven Magic (+2 caster level vs spell resistance, +2 Spellcraft to ID magic items)")
        traits.append("Weapon Familiarity (longbows, composite longbows, longswords, rapiers)")
    elif "dwarf" in r:
        traits.append("Darkvision 60 ft.")
        traits.append("Stonecunning (+2 Perception to notice unusual stonework)")
        traits.append("Defensive Training (+4 dodge AC vs giants)")
        traits.append("Hardy (+2 saves vs poison, spells, and spell-like abilities)")
        traits.append("Stability (+4 CMD vs bull rush/trip on solid ground)")
        traits.append("Greed (+2 Appraise on non-magical goods with precious metals/gems)")
        traits.append("Weapon Familiarity (battleaxes, heavy picks, warhammers)")
    elif "halfling" in r:
        traits.append("Small Size (+1 AC, +1 attack bonus, +4 Stealth, -1 CMB/CMD)")
        traits.append("Slow Speed (20 ft.)")
        traits.append("Fearless (+2 morale bonus on saves vs fear)")
        traits.append("Halfling Luck (+1 luck bonus on all saving throws)")
        traits.append("Keen Senses (+2 Perception)")
        traits.append("Sure-Footed (+2 Acrobatics, Climb)")
        traits.append("Weapon Familiarity (slings)")
    elif "gnome" in r:
        traits.append("Small Size (+1 AC, +1 attack bonus, +4 Stealth, -1 CMB/CMD)")
        traits.append("Slow Speed (20 ft.)")
        traits.append("Low-Light Vision")
        traits.append("Defensive Training (+4 dodge AC vs giants)")
        traits.append("Gnome Magic (+1 DC to illusion spells, 1/day dancing lights/ghost sound/prestidigitation)")
        traits.append("Illusion Resistance (+2 saves vs illusion spells and effects)")
        traits.append("Keen Senses (+2 Perception)")
        traits.append("Obsessive (+2 Craft or Profession checks)")
        traits.append("Hatred (+1 attack vs reptilians and goblins)")
        traits.append("Weapon Familiarity (gnome hooked hammers)")
    elif "half-elf" in r or "half elf" in r:
        traits.append("Low-Light Vision")
        traits.append("Adaptability (Skill Focus bonus feat)")
        traits.append("Elf Blood (counts as both elf and human)")
        traits.append("Elven Immunities (immune to magic sleep, +2 saves vs enchantment)")
        traits.append("Keen Senses (+2 Perception)")
        traits.append("Multitalented (two favored classes)")
    elif "half-orc" in r or "half orc" in r:
        traits.append("Darkvision 60 ft.")
        traits.append("Intimidating (+2 Intimidate checks)")
        traits.append("Orc Ferocity (once/day fight disabled for 1 round when below 0 HP)")
        traits.append("Orc Blood (counts as both orc and human)")
        traits.append("Weapon Familiarity (greataxes, falchions)")
    elif "aasimar" in r:
        traits.append("Darkvision 60 ft.")
        traits.append("Celestial Resistance (Acid 5, Cold 5, Electricity 5)")
        traits.append("Skilled (+2 Diplomacy, Perception)")
        traits.append("Daylight 1/day (Sp, caster level = character level)")
    elif "tiefling" in r:
        traits.append("Darkvision 60 ft.")
        traits.append("Fiendish Resistance (Cold 5, Electricity 5, Fire 5)")
        traits.append("Skilled (+2 Bluff, Stealth)")
        traits.append("Darkness 1/day (Sp, caster level = character level)")
    else:
        traits.append("Normal Senses")
        traits.append("Standard Racial Traits")

    return traits

def split_outside_parens(s: str) -> list:
    if not s:
        return []
    result = []
    current = []
    depth = 0
    for c in s:
        if c == '(':
            depth += 1
        elif c == ')':
            depth = max(0, depth - 1)

        if c == ',' and depth == 0:
            item = "".join(current).strip()
            if item:
                result.append(item)
            current = []
        else:
            current.append(c)
    item = "".join(current).strip()
    if item:
        result.append(item)
    return result

def get_root_feature_name(text: str) -> str:
    import re
    if not text:
        return ""
    s = text.lower().strip()
    if s.startswith('deeds'):
        return 'deeds'
    if 'bonus combat feat' in s:
        return 'bonus combat feat'
    if 'bonus feat' in s:
        return 'bonus feat'
    s = re.sub(r'\(.*?\)', '', s).strip()
    s = re.sub(r'\s*\+\d+.*$', '', s)
    s = re.sub(r'\s+\d+\/day.*$', '', s)
    s = re.sub(r'\s+\d+d\d+.*$', '', s)
    s = re.sub(r'\s+\d+.*$', '', s)
    s = re.sub(r'^\d+(st|nd|rd|th)\s+', '', s)
    return s.strip()

def is_placeholder_ability(text: str) -> bool:
    import re
    if not text:
        return False
    s = text.lower().strip()
    clean = re.sub(r'\(.*?\)', '', s).strip()
    clean = re.sub(r'^(?:defense|defensive|special\s+attack|attacks?|special\s+quality|sq|racial\s+trait|racial|class\s+feature|feature|aura)\s*:\s*', '', clean).strip()

    if clean in ('spells', 'spells known', 'discipline spells', 'paladin spells', 'ranger spells', 'arcanist spells', 'bloodrager spells', 'adept spells'):
        return True
    if re.match(r'^(?:bloodline|mystery|patron|discipline)\s+spells?(\s+known)?$', clean):
        return True
    if re.match(r'^[a-z\s]+ spells?(\s+known)?$', clean) and any(c in clean for c in ['paladin', 'ranger', 'arcanist', 'bloodrager', 'adept', 'cleric', 'druid', 'wizard', 'sorcerer', 'bard', 'magus', 'inquisitor', 'oracle', 'witch', 'shaman']):
        return True

    if clean in ('advanced talents', 'advanced talent', 'rogue talent', 'rogue talents', 'slayer talent', 'slayer talents', 'investigator talent', 'investigator talents', 'social talent', 'social talents', 'vigilante talent', 'vigilante talents', 'utility wild talent', 'talent', 'talents'):
        return True
    if re.match(r'^(?:\d+\s+)?(?:advanced|(?:rogue|slayer|investigator|social|vigilante|utility\s+wild))\s+talents?$', clean):
        return True

    if clean in ('bonus feat', 'bonus feats', 'bonus combat feat', 'bonus combat feats', 'bonus wizard feat', 'bloodline feat', 'combat style feat', 'teamwork feat'):
        return True
    if clean.startswith('bonus feat') or clean.startswith('bonus combat feat'):
        return True

    if 'weapon and armor proficiencies' in clean or 'weapon and armor proficiency' in clean:
        return True
    if clean in ('simple weapon proficiency', 'martial weapon proficiency', 'all martial weapon and armor proficiencies', 'skills and proficiencies'):
        return True
    if 'weapon/armor proficiencies active' in clean:
        return True

    return False

class AbilitiesEngine:

    @staticmethod
    def resolve(cls_key: str, level: int, stats: dict = None, race: str = "Human", alignment: str = "LG", raw_specials: dict = None) -> dict:
        cls = (cls_key or "paladin").lower().replace(" ", "_").strip()
        lvl = max(1, min(20, int(level or 10)))
        stats = stats or {}

        str_m = calc_mod(stats.get('str', 10))
        dex_m = calc_mod(stats.get('dex', 10))
        con_m = calc_mod(stats.get('con', 10))
        int_m = calc_mod(stats.get('int', 10))
        wis_m = calc_mod(stats.get('wis', 10))
        cha_m = calc_mod(stats.get('cha', 10))

        align = (alignment or "LG").upper().strip()
        racial_traits = get_racial_traits(race)

        abilities = []
        sp_attacks = []
        def_abilities = []
        auras = []
        sq_list = []

        if cls == "paladin":
            smite_count = math.floor((lvl + 2) / 3)
            smite_dmg = lvl
            smite_ac = max(0, cha_m)
            sp_attacks.append(f"Smite Evil {smite_count}/day ({format_mod(cha_m)} atk, +{smite_dmg} dmg [+{smite_dmg*2} vs evil dragons/undead/outsiders], +{smite_ac} deflection AC)")

            loh_count = math.floor(lvl / 2) + max(1, cha_m)
            loh_dice = f"{math.floor(lvl / 2)}d6"
            mercies_count = math.floor((lvl - 1) / 3)
            mercies = ["fatigued", "dazed", "diseased", "staggered", "exhausted", "frightened"][:mercies_count]
            mercy_str = f", {mercies_count} mercies: {', '.join(mercies)}" if mercies else ""
            sp_attacks.append(f"Lay on Hands {loh_count}/day ({loh_dice}{mercy_str})")

            if lvl >= 4:
                chan_dc = 10 + math.floor(lvl / 2) + cha_m
                sp_attacks.append(f"Channel Positive Energy {loh_dice} (DC {chan_dc}, costs 2 LoH uses)")

            def_abilities.append(f"Divine Grace ({format_mod(cha_m)} bonus to all saving throws)")
            if lvl >= 3:
                def_abilities.append("Divine Health (immune to all diseases including magical)")
                def_abilities.append("Aura of Courage (immune to fear, allies within 10 ft. gain +4 morale bonus vs fear)")
            if lvl >= 8:
                def_abilities.append("Aura of Resolve (immune to charm, allies within 10 ft. gain +4 morale bonus vs charm)")
            if lvl >= 17:
                def_abilities.append("Aura of Righteousness (DR 5/evil, compulsion immunity, allies +4 vs compulsion)")
            if lvl >= 20:
                def_abilities.append("Holy Champion (DR 10/evil, banish evil outsiders on smite)")

            auras.append(f"Aura of Good (power {lvl})")
            if lvl >= 3: auras.append("Aura of Courage (10 ft.)")
            if lvl >= 8: auras.append("Aura of Resolve (10 ft.)")
            if lvl >= 11: auras.append("Aura of Justice (10 ft.)")
            if lvl >= 14: auras.append("Aura of Faith (10 ft.)")
            if lvl >= 17: auras.append("Aura of Righteousness (10 ft.)")

            sq_list.append("Detect evil at will")
            if lvl >= 5:
                bond_bonus = math.floor((lvl - 2) / 3)
                sq_list.append(f"Divine Bond (weapon +{bond_bonus}/flaming/holy or mount)")
            sq_list.append("Code of Conduct (Lawful Good)")

        elif cls in ["barbarian", "unchained_barbarian"]:
            rage_rounds = 4 + (lvl - 1) * 2 + max(0, con_m)
            rage_powers = math.floor(lvl / 2)
            dr = math.floor(lvl / 3) - 1 if lvl >= 7 else 0
            trap_sense = math.floor(lvl / 3)

            rage_type = "Mighty Rage (+8 STR, +8 CON, +4 Will)" if lvl >= 20 else ("Greater Rage (+6 STR, +6 CON, +3 Will)" if lvl >= 11 else "Rage (+4 STR, +4 CON, +2 Will, -2 AC)")
            sp_attacks.append(f"{rage_type} {rage_rounds} rounds/day")

            if dr > 0:
                def_abilities.append(f"Damage Reduction {dr}/-")
            if trap_sense > 0:
                def_abilities.append(f"Trap Sense +{trap_sense} (Reflex vs traps, dodge AC vs traps)")
            if lvl >= 2:
                def_abilities.append("Uncanny Dodge (cannot be caught flat-footed)")
            if lvl >= 5:
                def_abilities.append("Improved Uncanny Dodge (cannot be flanked)")
            if lvl >= 14:
                def_abilities.append("Indomitable Will (+4 Will saves vs enchantment while raging)")

            sq_list.append("Fast Movement (+10 ft. base speed)")
            if rage_powers > 0:
                sq_list.append(f"{rage_powers} Rage Powers selected")
            if lvl >= 17:
                sq_list.append("Tireless Rage (no longer fatigued after rage)")

        elif cls in ["rogue", "unchained_rogue"]:
            sneak_dice = f"{math.ceil(lvl / 2)}d6"
            sp_attacks.append(f"Sneak Attack +{sneak_dice} precision damage")

            if lvl >= 2:
                def_abilities.append("Evasion (no damage on successful Reflex save)")
            if lvl >= 4:
                def_abilities.append("Uncanny Dodge (cannot be caught flat-footed)")
            if lvl >= 8:
                def_abilities.append("Improved Uncanny Dodge (cannot be flanked)")
            trap_sense = math.floor(lvl / 3)
            if trap_sense > 0:
                def_abilities.append(f"Trap Sense +{trap_sense} (Reflex vs traps, dodge AC vs traps)")
            if lvl >= 20:
                sp_attacks.append(f"Master Strike (DC {10 + 10 + int_m} Fort save or sleep/paralyze/kill)")

            sq_list.append(f"Trapfinding +{math.floor(lvl / 2)} (Perception to locate traps, Disable Device)")
            if "unchained" in cls:
                sq_list.append("Finesse Training (Dex to hit & damage)")
                sq_list.append("Debilitating Injury (bewildered, disoriented, hamstrung)")

        elif cls == "fighter":
            bonus_feats = math.floor(lvl / 2) + 1
            bravery = math.floor((lvl + 2) / 4)
            arm_train = math.floor((lvl - 1) / 4)
            wep_train = math.floor((lvl - 1) / 4)

            if wep_train > 0:
                sp_attacks.append(f"Weapon Training {wep_train} (+{wep_train} atk/dmg to primary group, +{max(1, wep_train-1)} secondary)")
            if bravery > 0:
                def_abilities.append(f"Bravery +{bravery} (morale bonus on Will saves vs fear)")
            if arm_train > 0:
                def_abilities.append(f"Armor Training {arm_train} (reduces ACP by {arm_train}, increases Max Dex by {arm_train}, move at normal speed in medium/heavy armor)")
            if lvl >= 19:
                def_abilities.append("Armor Mastery (DR 5/- while wearing armor)")

        elif cls == "cleric":
            chan_uses = 3 + max(0, cha_m)
            chan_dice = f"{math.ceil(lvl / 2)}d6"
            chan_dc = 10 + math.floor(lvl / 2) + cha_m
            chan_type = "Positive (heals living, damages undead)" if "G" in align or "NG" in align or "CG" in align or "LG" in align else "Negative (damages living, heals undead)"
            sp_attacks.append(f"Channel Energy {chan_uses}/day ({chan_dice}, DC {chan_dc}, {chan_type})")

            domain_uses = 3 + max(0, wis_m)
            sq_list.append(f"Domain Powers {domain_uses}/day (2 chosen domains)")
            sq_list.append("Spontaneous Casting (" + ("Cure spells" if "G" in align or "N" in align else "Inflict spells") + ")")

            aura_aligns = []
            if "L" in align: aura_aligns.append("Law")
            if "C" in align: aura_aligns.append("Chaos")
            if "G" in align: aura_aligns.append("Good")
            if "E" in align: aura_aligns.append("Evil")
            auras.append(f"Aura of {', Aura of '.join(aura_aligns) if aura_aligns else 'Faith'} (power {lvl})")

        elif cls == "wizard":
            bonus_feats = math.floor(lvl / 5)
            sq_list.append("Arcane Bond (Familiar or Bonded Object: 1 extra prepared spell/day)")
            sq_list.append("Arcane School Powers (specialist powers + opposition schools)")
            sq_list.append("Cantrips, Scribe Scroll")

        elif cls in ["monk", "unchained_monk"]:
            unarmed_dice = "1d6" if lvl < 4 else ("1d8" if lvl < 8 else ("1d10" if lvl < 12 else ("2d6" if lvl < 16 else ("2d8" if lvl < 20 else "2d10"))))
            ac_bonus = max(0, wis_m) + math.floor(lvl / 4)
            fast_mov = math.floor(lvl / 3) * 10
            ki_pool = math.floor(lvl / 2) + max(0, wis_m)
            ki_strikes = []
            if lvl >= 4: ki_strikes.append("Magic")
            if lvl >= 7: ki_strikes.append("Cold Iron/Silver")
            if lvl >= 10: ki_strikes.append("Lawful")
            if lvl >= 16: ki_strikes.append("Adamantine")

            sp_attacks.append(f"Flurry of Blows (full BAB iterative extra attacks)")
            sp_attacks.append(f"Unarmed Strike ({unarmed_dice} damage, {', '.join(ki_strikes) if ki_strikes else 'non-magical'})")
            stunning_dc = 10 + math.floor(lvl / 2) + wis_m
            sp_attacks.append(f"Stunning Fist {lvl}/day (DC {stunning_dc} Fort save or stunned 1 round)")

            def_abilities.append(f"Monk AC Bonus (+{ac_bonus} dodge AC when unarmored/unencumbered)")
            if lvl >= 2: def_abilities.append("Evasion (no damage on successful Reflex save)")
            if lvl >= 3: def_abilities.append("Still Mind (+2 bonus on saves vs enchantment spells/effects)")
            if lvl >= 5: def_abilities.append("Purity of Body (immune to all diseases)")
            if lvl >= 9: def_abilities.append("Improved Evasion")
            if lvl >= 11: def_abilities.append("Diamond Body (immune to all poisons)")
            if lvl >= 13: def_abilities.append(f"Diamond Soul (Spell Resistance {lvl + 10})")

            sq_list.append(f"Ki Pool {ki_pool} points/day (+4 dodge AC, +20 ft. speed, or extra attack on flurry)")
            if fast_mov > 0: sq_list.append(f"Fast Movement (+{fast_mov} ft. unarmored speed bonus)")
            if lvl >= 4: sq_list.append(f"Slow Fall {min(90, lvl * 10)} ft.")
            if lvl >= 7: sq_list.append(f"Wholeness of Body (heal {lvl * 2} HP/day for 2 ki points)")
            if lvl >= 12: sq_list.append("Abundant Step (dimension door for 2 ki points)")

        elif cls == "ranger":
            fav_enemies = math.floor((lvl + 3) / 5) + 1
            fav_terrains = math.floor((lvl + 2) / 5)
            comb_feats = math.floor(lvl / 4) + 1

            sp_attacks.append(f"{fav_enemies} Favored Enemies (scaling +{fav_enemies*2} to +2 atk/dmg and skills)")
            if lvl >= 11: sp_attacks.append("Quarry (+2 insight bonus to hit, auto-confirm crits)")
            if lvl >= 20: sp_attacks.append(f"Master Hunter (DC {10 + math.floor(lvl/2) + wis_m} Fort save or slain)")

            if lvl >= 9: def_abilities.append("Evasion")
            if lvl >= 16: def_abilities.append("Improved Evasion")

            sq_list.append(f"Track +{math.floor(lvl / 2)} to Survival checks")
            sq_list.append(f"Wild Empathy ({format_mod(lvl + cha_m)})")
            if fav_terrains > 0: sq_list.append(f"{fav_terrains} Favored Terrains (+{fav_terrains*2} to +2 to Initiative, Stealth, Perception)")
            sq_list.append(f"Hunter's Bond ({'Animal Companion' if lvl >= 4 else 'Hunting Companions'})")
            if lvl >= 7: sq_list.append("Woodland Stride, Swift Tracker")
            if lvl >= 12: sq_list.append("Camouflage, Hide in Plain Sight (lvl 17)")

        elif cls == "bard":
            perf_rounds = 4 + (lvl - 1) * 2 + max(0, cha_m)
            inspire_courage = math.floor((lvl - 1) / 6) + 1
            inspire_comp = math.floor((lvl + 3) / 4) + 1
            versatile_count = math.floor((lvl + 2) / 4)

            sp_attacks.append(f"Bardic Performance {perf_rounds} rounds/day")
            sp_attacks.append(f"Inspire Courage +{inspire_courage} (+{inspire_courage} competence to atk/dmg and morale vs fear)")
            sp_attacks.append(f"Inspire Competence +{inspire_comp} (+{inspire_comp} competence bonus to skill checks)")

            def_abilities.append("Well-Versed (+4 bonus on saves vs bardic performance, sonic, and language effects)")

            sq_list.append(f"Bardic Knowledge +{math.floor(lvl / 2)} to all Knowledge checks")
            if versatile_count > 0: sq_list.append(f"Versatile Performance ({versatile_count} Perform skills substitute for other skills)")
            if lvl >= 5:
                lore_uses = math.floor((lvl + 1) / 6)
                sq_list.append(f"Lore Master {lore_uses}/day (take 10 or 20 on Knowledge checks)")
            if lvl >= 8: sq_list.append("Dirge of Doom (enemies within 30 ft. shaken)")
            if lvl >= 10: sq_list.append("Jack of All Trades (use any skill untrained)")

        elif cls == "druid":
            ws_uses = max(0, lvl - 3)
            sp_attacks.append(f"Wild Shape {ws_uses}/day (duration {lvl} hours/use: animal, elemental, plant forms)")

            def_abilities.append("Resist Nature's Lure (+4 saves vs spell-like abilities of fey and plants)")
            if lvl >= 9: def_abilities.append("Venom Immunity (immune to all poisons)")

            sq_list.append("Nature Bond (Animal Companion or Cleric Domain)")
            sq_list.append(f"Wild Empathy ({format_mod(lvl + cha_m)})")
            sq_list.append("Nature Sense (+2 Knowledge nature, Survival)")
            if lvl >= 2: sq_list.append("Woodland Stride, Trackless Step (lvl 3)")
            if lvl >= 13: sq_list.append("A Thousand Faces (alter self at will)")
            if lvl >= 15: sq_list.append("Timeless Body (no ability score penalties for aging)")

        elif cls == "sorcerer":
            sq_list.append("Bloodline Powers (1st, 3rd, 9th, 15th, 20th level abilities)")
            sq_list.append("Bloodline Powers & Class Skills")
            sq_list.append("Cantrips, Eschew Materials")

        elif cls == "alchemist":
            bombs_per_day = lvl + max(1, int_m)
            bomb_dice = f"{math.ceil(lvl / 2)}d6"
            bomb_dc = 10 + math.floor(lvl / 2) + int_m
            sp_attacks.append(f"Bombs {bombs_per_day}/day ({bomb_dice}+{int_m} fire, splash min dmg, DC {bomb_dc} Ref half)")

            pois_res = math.floor((lvl - 1) / 3) * 2
            if lvl >= 10: def_abilities.append("Poison Immunity (immune to all poisons)")
            elif pois_res > 0: def_abilities.append(f"Poison Resistance +{pois_res} vs poisons")

            sq_list.append(f"Mutagen (+4 physical stat, +2 natural armor, -2 mental stat for {lvl * 10} min)")
            disc_count = math.floor(lvl / 2)
            if disc_count > 0: sq_list.append(f"{disc_count} Discoveries selected")
            sq_list.append("Poison Use, Swift Alchemy, Brew Potion, Throw Anything")

        elif cls == "inquisitor":
            judg_count = math.ceil(lvl / 3)
            sp_attacks.append(f"Judgment {judg_count}/day (Destruction, Healing, Justice, Piercing, Protection, Purity, Resiliency, Resistance, Smiting)")
            if lvl >= 5: sp_attacks.append(f"Bane {lvl} rounds/day (+2 enhancement, +2d6 damage vs chosen foe)")

            def_abilities.append("Stern Gaze (morale bonus to Intimidate & Sense Motive)")
            if lvl >= 11: def_abilities.append("Stalwart (no effect on successful Fort/Will save)")

            sq_list.append(f"Monster Lore ({format_mod(wis_m)} to identify monsters)")
            sq_list.append(f"Cunning Initiative ({format_mod(wis_m)} to Initiative)")
            sq_list.append("Solo Tactics")
            sq_list.append(f"Detect Alignment at will, Track +{math.floor(lvl / 2)}")

        elif cls == "magus":
            arc_pool = math.floor(lvl / 2) + max(1, int_m)
            enh_bonus = math.floor((lvl + 3) / 4)
            sp_attacks.append(f"Arcane Pool {arc_pool} pts/day (+{enh_bonus} weapon enhancement, flaming, shock, keen, speed)")
            sp_attacks.append("Spell Combat (full attack while casting a spell with off-hand)")
            sp_attacks.append("Spellstrike (deliver touch spell through melee weapon attack)")

            arcana_count = math.floor(lvl / 3)
            if arcana_count > 0: sq_list.append(f"{arcana_count} Magus Arcana selected")
            sq_list.append("Spell Recall (recall expended spell for pool points)")
            if lvl >= 7: sq_list.append("Medium Armor proficiency (no arcane spell failure)")
            if lvl >= 13: sq_list.append("Heavy Armor proficiency (no arcane spell failure)")

        elif cls == "omdura":
            invoc_action = "swift action" if lvl >= 13 else ("move action" if lvl >= 7 else "standard action")

            destr_dmg = 1 + math.floor(lvl / 3)
            healing_fh = 1 + math.floor(lvl / 3)
            justice_atk = 1 + math.floor(lvl / 5)
            justice_crit = f", +{justice_atk * 2} confirm crits" if lvl >= 10 else ""
            pierce_bonus = 1 + math.floor(lvl / 3)
            prot_ac = 1 + math.floor(lvl / 5)
            prot_crit = f", +{prot_ac * 2} vs crit confirm" if lvl >= 10 else ""
            pur_bonus = 1 + math.floor(lvl / 5)
            pur_crit = f", +{pur_bonus * 2} vs curse/disease/poison" if lvl >= 10 else ""
            resil_dr = 1 + math.floor(lvl / 5)
            resil_type = "alignment" if lvl >= 10 else "magic"
            resist_energy = 2 + 2 * math.floor(lvl / 3)
            smiting_desc = "DR/magic, align & adamantine" if lvl >= 10 else ("DR/magic & align" if lvl >= 6 else "DR/magic")

            if lvl >= 20:
                invoc_header = f"Invocations {lvl} min/day + Greater Invocation (1 buff 24h at full bonus; {invoc_action}, 30 ft aura to allies)"
            elif lvl >= 11:
                invoc_header = f"Improved Invocations {lvl} min/day (grant 2 buffs to allies, self gains 1 at half bonus; {invoc_action}, 30 ft)"
            else:
                invoc_header = f"Invocations {lvl} min/day ({invoc_action}, 30-ft aura to allies)"

            sp_attacks.append(invoc_header)
            sp_attacks.append(f"Invocation - Destruction: +{destr_dmg} sacred bonus on weapon damage rolls")
            sp_attacks.append(f"Invocation - Healing: Fast Healing {healing_fh} (recovers {healing_fh} HP/round)")
            sp_attacks.append(f"Invocation - Justice: +{justice_atk} sacred bonus on attack rolls{justice_crit}")
            sp_attacks.append(f"Invocation - Piercing: +{pierce_bonus} sacred bonus on Concentration & CL checks vs SR")
            sp_attacks.append(f"Invocation - Protection: +{prot_ac} sacred bonus to AC{prot_crit}")
            sp_attacks.append(f"Invocation - Purify: +{pur_bonus} sacred bonus on all saving throws{pur_crit}")
            sp_attacks.append(f"Invocation - Resiliency: DR {resil_dr}/{resil_type}")
            sp_attacks.append(f"Invocation - Resistance: {resist_energy} Energy Resistance (acid, cold, elec, fire, sonic)")
            sp_attacks.append(f"Invocation - Smiting: Allies' weapons bypass {smiting_desc}")

            dm_uses = 0
            if lvl >= 19: dm_uses = 4
            elif lvl >= 14: dm_uses = 3
            elif lvl >= 9: dm_uses = 2
            elif lvl >= 4: dm_uses = 1

            if dm_uses > 0:
                if lvl >= 18:
                    dm_atk = format_mod(max(0, cha_m))
                    dm_dmg = lvl
                    dm_ac = max(0, cha_m)
                else:
                    dm_atk = format_mod(max(0, cha_m // 2))
                    dm_dmg = math.floor(lvl / 2)
                    dm_ac = max(0, cha_m // 2)
                sp_attacks.append(f"Divine Might {dm_uses}/day ({dm_atk} atk, +{dm_dmg} dmg, +{dm_ac} deflection AC vs opposed target)")

            if lvl >= 2:
                dt_count = math.floor(lvl / 2) + max(1, cha_m)
                dt_dice = f"{math.floor(lvl / 2)}d6"
                sp_attacks.append(f"Divine Touch {dt_count}/day ({dt_dice} heal/harm)")

            if lvl >= 3:
                infusion_count = math.floor(lvl / 3)
                sq_list.append(f"Divine Infusion ({infusion_count} mercies/cruelties applied to Divine Touch)")

            if lvl >= 5:
                dw_uses = 1 + math.floor((lvl - 5) / 4)
                dw_bonus = 1 + math.floor((lvl - 5) / 3)
                sq_list.append(f"Divine Weapon {dw_uses}/day (+{dw_bonus} enhancement or weapon properties, {lvl} min)")

            if lvl >= 15:
                sq_list.append("Commune 2/day (Sp)")
            elif lvl >= 7:
                sq_list.append("Commune 1/day (Sp)")

            auras.append("Aura (Ex) & Detect Alignment (Sp, at-will)")

        elif cls == "cavalier":
            chal_count = math.floor((lvl + 2) / 3)
            sp_attacks.append(f"Challenge {chal_count}/day (+{lvl} damage to challenged target)")
            if lvl >= 3: sp_attacks.append("Cavalier's Charge (+4 atk, no AC penalty on charge)")
            sq_list.append("Order Abilities, Mount, Tactician (share teamwork feat)")
            if lvl >= 5: sq_list.append("Banner (+2 morale vs fear, +1 atk on charge to allies)")

        elif cls == "gunslinger":
            grit = max(1, wis_m)
            nimble = math.floor((lvl + 2) / 4)
            gun_train = math.floor((lvl - 1) / 4)
            sp_attacks.append(f"Grit {grit} points/day (Deeds: Deadeye, Gunslinger's Dodge, Quick Clear, Dead Shot, Targeting)")
            if gun_train > 0: sp_attacks.append(f"Gun Training {gun_train} (+{dex_m} damage with chosen firearms)")
            if nimble > 0: def_abilities.append(f"Nimble +{nimble} (dodge to AC)")
            sq_list.append("Gunsmithing (craft/repair firearms and ammunition)")

        elif cls == "swashbuckler":
            panache = max(1, cha_m)
            nimble = 1 + math.floor((lvl - 3) / 4) if lvl >= 3 else 0
            charmed = 3 + math.floor((lvl - 2) / 4) if lvl >= 2 else 0
            wep_train = 1 + math.floor((lvl - 5) / 4) if lvl >= 5 else 0

            deeds_list = ["Derring-Do", "Dodging Panache", "Opportune Parry & Riposte"]
            if lvl >= 3: deeds_list.extend(["Kip-Up", "Menacing Swordplay", f"Precise Strike (+{lvl} dmg)"])
            if lvl >= 7: deeds_list.extend(["Swashbuckler's Grace", "Superior Feint", "Targeted Strike"])
            if lvl >= 11: deeds_list.extend(["Bleeding Wound", "Evasive", "Subtle Cut"])
            if lvl >= 15: deeds_list.extend(["Dizzying Defense", "Perfect Thrust", "Swashbuckler's Edge"])
            if lvl >= 19: deeds_list.extend(["Cheat Death", "Deadly Stab", "Stunning Stab"])

            cha_sign = f"+{cha_m}" if cha_m >= 0 else str(cha_m)
            sp_attacks.append(f"Panache {panache} points/day (CHA {cha_sign})")
            sp_attacks.append(f"Deeds ({', '.join(deeds_list)})")
            if wep_train > 0: sp_attacks.append(f"Swashbuckler Weapon Training +{wep_train} (+{wep_train} atk/dmg with light/1H piercing)")
            if nimble > 0: def_abilities.append(f"Nimble +{nimble} (dodge to AC)")
            if charmed > 0: def_abilities.append(f"Charmed Life {charmed}/day ({cha_sign} CHA bonus to save as immediate action)")

            sq_list.append("Swashbuckler Finesse (Weapon Finesse with light/1H piercing, use CHA for feat prerequisites)")

            if lvl >= 20:
                sq_list.append("Swashbuckler Weapon Mastery (automatic confirmed crits with piercing weapons, crit multiplier increases by 1)")

        elif cls == "slayer":
            stud_bonus = math.floor((lvl + 3) / 5)
            sneak_dice = f"{math.floor(lvl / 3)}d6"
            sp_attacks.append(f"Studied Target +{stud_bonus} (+{stud_bonus} atk/dmg, Bluff, Knowledge, Perception, Sense Motive, Survival)")
            if lvl >= 3: sp_attacks.append(f"Sneak Attack +{sneak_dice} precision damage")
            sq_list.append(f"Track +{math.floor(lvl / 2)}, Stalker")

        elif cls == "warpriest":
            sacred_dice = "1d6" if lvl < 5 else ("1d8" if lvl < 10 else ("1d10" if lvl < 15 else ("2d6" if lvl < 20 else "2d8")))
            fervor_uses = math.floor(lvl / 2) + max(0, wis_m)
            fervor_dice = f"{math.floor((lvl + 1) / 3)}d6"
            sp_attacks.append(f"Sacred Weapon ({sacred_dice} damage, +{math.floor(lvl / 4)} enhancement pool)")
            sp_attacks.append(f"Fervor {fervor_uses}/day ({fervor_dice} healing/damage or swift self-cast)")
            if lvl >= 7: def_abilities.append(f"Sacred Armor +{math.floor((lvl - 4) / 3)} enhancement/abilities")
            sq_list.append(f"Blessings {math.floor(lvl / 2) + 1}/day from 2 domains, Focus Weapon")
            auras.append("Aura of Faith (alignment aura)")

        else:
            cls_title = cls.replace("_", " ").title()
            sp_attacks.append(f"{cls_title} Combat Features (Level {lvl})")
            sq_list.append(f"Level {lvl} {cls_title} Class Progression Features")

        progression_map = {}
        if raw_specials and isinstance(raw_specials, dict):
            for l in range(1, lvl + 1):
                s_text = raw_specials.get(str(l))
                if s_text and s_text != "—":
                    items = split_outside_parens(s_text)
                    for item in items:
                        item_clean = item.strip().title()
                        if item_clean and not is_placeholder_ability(item_clean):
                            root = get_root_feature_name(item_clean)
                            if not is_placeholder_ability(root):
                                progression_map[root] = item_clean

        slot_idx = 1
        for atk in sp_attacks:
            if is_placeholder_ability(atk): continue
            if slot_idx > 20: break
            abilities.append({"name": "", "desc": atk, "type": "attack"})
            slot_idx += 1

        for d in def_abilities:
            if is_placeholder_ability(d): continue
            if slot_idx > 20: break
            abilities.append({"name": "", "desc": d, "type": "defense"})
            slot_idx += 1

        for a in auras:
            if is_placeholder_ability(a): continue
            if slot_idx > 20: break
            abilities.append({"name": "", "desc": a, "type": "aura"})
            slot_idx += 1

        existing_roots = set()
        for a in abilities:
            existing_roots.add(get_root_feature_name(a["desc"]))

        for sq in sq_list:
            if is_placeholder_ability(sq): continue
            if slot_idx > 20: break
            sq_root = get_root_feature_name(sq)
            if sq_root not in existing_roots and not is_placeholder_ability(sq_root):
                abilities.append({"name": "", "desc": sq, "type": "sq"})
                existing_roots.add(sq_root)
                slot_idx += 1

        for r_trait in racial_traits:
            if is_placeholder_ability(r_trait) or 'skilled' in r_trait.lower(): continue
            if slot_idx > 20: break
            abilities.append({"name": "", "desc": r_trait, "type": "racial"})
            slot_idx += 1

        for root, feat_name in progression_map.items():
            if is_placeholder_ability(root) or is_placeholder_ability(feat_name): continue
            if slot_idx > 20: break
            if root not in existing_roots:
                abilities.append({"name": "", "desc": feat_name, "type": "feature"})
                existing_roots.add(root)
                slot_idx += 1

        clean_sq = [s for s in sq_list if not is_placeholder_ability(s)]
        clean_racial = [r for r in racial_traits if not is_placeholder_ability(r) and 'skilled' not in r.lower()]
        final_sq = " | ".join(clean_sq + clean_racial[:2])
        final_attacks = " | ".join(sp_attacks)
        final_def = " | ".join(def_abilities) if def_abilities else "None"
        final_aura = ", ".join(auras) if auras else "None"

        filtered_abilities = [
            a for a in abilities
            if (a.get("desc") and not is_placeholder_ability(a["desc"])) or (a.get("name") and not is_placeholder_ability(a["name"]))
        ]

        return {
            "abilities_list": filtered_abilities[:20],
            "special_qualities": final_sq,
            "special_attacks": final_attacks,
            "defensive_abilities": final_def,
            "aura": final_aura,
            "racial_traits": clean_racial
        }

    @classmethod
    def resolve_multiclass(cls, classes_list: list, stats: dict, race: str = "Human", alignment: str = "LG", raw_specials_map: dict = None) -> dict:

        if not classes_list:
            return cls.resolve("paladin", 1, stats, race, alignment)

        if len(classes_list) == 1:
            item = classes_list[0]
            c_name = item.get("class") or item.get("name") or "paladin"
            c_lvl = item.get("level", 1)
            raw_s = raw_specials_map.get(c_name.lower().replace(" ", "_")) if raw_specials_map else None
            return cls.resolve(c_name, c_lvl, stats, race, alignment, raw_s)

        merged_abilities = []
        merged_attacks = []
        merged_defenses = []
        merged_auras = []
        merged_sq = []
        merged_racial = []
        existing_roots = set()

        for idx, item in enumerate(classes_list):
            c_name = item.get("class") or item.get("name") or ""
            c_lvl = int(item.get("level", 1))
            if not c_name or c_lvl < 1:
                continue

            raw_s = raw_specials_map.get(c_name.lower().replace(" ", "_")) if raw_specials_map else None

            res = cls.resolve(c_name, c_lvl, stats, race if idx == 0 else "", alignment, raw_s)

            if idx == 0:
                merged_racial = res.get("racial_traits", [])

            if res.get("special_attacks"):
                for atk in res["special_attacks"].split(" | "):
                    atk_s = atk.strip()
                    if atk_s and atk_s not in merged_attacks:
                        merged_attacks.append(atk_s)

            if res.get("defensive_abilities") and res["defensive_abilities"] != "None":
                for df in res["defensive_abilities"].split(" | "):
                    df_s = df.strip()
                    if df_s and df_s != "None" and df_s not in merged_defenses:
                        merged_defenses.append(df_s)

            if res.get("aura") and res["aura"] != "None":
                for au in res["aura"].split(", "):
                    au_s = au.strip()
                    if au_s and au_s != "None" and au_s not in merged_auras:
                        merged_auras.append(au_s)

            if res.get("special_qualities"):
                for sq in res["special_qualities"].split(" | "):
                    sq_s = sq.strip()
                    if sq_s and sq_s not in merged_sq:
                        merged_sq.append(sq_s)

            for ab in res.get("abilities_list", []):
                desc = ab.get("desc") or ab.get("name") or ""
                root = get_root_feature_name(desc)
                if root not in existing_roots and not is_placeholder_ability(root):
                    merged_abilities.append(ab)
                    existing_roots.add(root)

        return {
            "abilities_list": merged_abilities[:20],
            "special_qualities": " | ".join(merged_sq),
            "special_attacks": " | ".join(merged_attacks),
            "defensive_abilities": " | ".join(merged_defenses) if merged_defenses else "None",
            "aura": ", ".join(merged_auras) if merged_auras else "None",
            "racial_traits": merged_racial
        }

resolve_character_abilities = AbilitiesEngine.resolve
