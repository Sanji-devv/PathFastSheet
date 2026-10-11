function getRacialTraits(raceName) {
  const r = (raceName || 'Human').toLowerCase().trim();
  const traits = [];

  if (r.includes('human')) {

    return [];
  } else if (r.includes('elf') && !r.includes('half')) {
    traits.push('Low-Light Vision');
    traits.push('Elven Immunities (immune to magic sleep, +2 saves vs enchantment)');
    traits.push('Keen Senses (+2 Perception)');
    traits.push('Elven Magic (+2 caster level vs spell resistance, +2 Spellcraft to ID magic items)');
    traits.push('Weapon Familiarity (longbows, composite longbows, longswords, rapiers)');
  } else if (r.includes('dwarf')) {
    traits.push('Darkvision 60 ft.');
    traits.push('Stonecunning (+2 Perception to notice unusual stonework)');
    traits.push('Defensive Training (+4 dodge AC vs giants)');
    traits.push('Hardy (+2 saves vs poison, spells, and spell-like abilities)');
    traits.push('Stability (+4 CMD vs bull rush/trip on solid ground)');
    traits.push('Greed (+2 Appraise on non-magical goods with precious metals/gems)');
    traits.push('Weapon Familiarity (battleaxes, heavy picks, warhammers)');
  } else if (r.includes('halfling')) {
    traits.push('Small Size (+1 AC, +1 attack bonus, +4 Stealth, -1 CMB/CMD)');
    traits.push('Slow Speed (20 ft.)');
    traits.push('Fearless (+2 morale bonus on saves vs fear)');
    traits.push('Halfling Luck (+1 luck bonus on all saving throws)');
    traits.push('Keen Senses (+2 Perception)');
    traits.push('Sure-Footed (+2 Acrobatics, Climb)');
    traits.push('Weapon Familiarity (slings)');
  } else if (r.includes('gnome')) {
    traits.push('Small Size (+1 AC, +1 attack bonus, +4 Stealth, -1 CMB/CMD)');
    traits.push('Slow Speed (20 ft.)');
    traits.push('Low-Light Vision');
    traits.push('Defensive Training (+4 dodge AC vs giants)');
    traits.push('Gnome Magic (+1 DC to illusion spells, 1/day dancing lights/ghost sound/prestidigitation)');
    traits.push('Illusion Resistance (+2 saves vs illusion spells and effects)');
    traits.push('Keen Senses (+2 Perception)');
    traits.push('Obsessive (+2 Craft or Profession checks)');
    traits.push('Hatred (+1 attack vs reptilians and goblins)');
    traits.push('Weapon Familiarity (gnome hooked hammers)');
  } else if (r.includes('half-elf') || r.includes('half elf')) {
    traits.push('Low-Light Vision');
    traits.push('Adaptability (Skill Focus bonus feat)');
    traits.push('Elf Blood (counts as both elf and human)');
    traits.push('Elven Immunities (immune to magic sleep, +2 saves vs enchantment)');
    traits.push('Keen Senses (+2 Perception)');
    traits.push('Multitalented (two favored classes)');
  } else if (r.includes('half-orc') || r.includes('half orc')) {
    traits.push('Darkvision 60 ft.');
    traits.push('Intimidating (+2 Intimidate checks)');
    traits.push('Orc Ferocity (once/day fight disabled for 1 round when below 0 HP)');
    traits.push('Orc Blood (counts as both orc and human)');
    traits.push('Weapon Familiarity (greataxes, falchions)');
  } else if (r.includes('aasimar')) {
    traits.push('Darkvision 60 ft.');
    traits.push('Celestial Resistance (Acid 5, Cold 5, Electricity 5)');
    traits.push('Skilled (+2 Diplomacy, Perception)');
    traits.push('Daylight 1/day (Sp, caster level = character level)');
  } else if (r.includes('tiefling')) {
    traits.push('Darkvision 60 ft.');
    traits.push('Fiendish Resistance (Cold 5, Electricity 5, Fire 5)');
    traits.push('Skilled (+2 Bluff, Stealth)');
    traits.push('Darkness 1/day (Sp, caster level = character level)');
  } else {
    traits.push('Normal Senses');
    traits.push('Standard Racial Traits');
  }

  return traits;
}

function splitOutsideParens(str) {
  if (!str) return [];
  const result = [];
  let current = '';
  let depth = 0;
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (c === '(') depth++;
    else if (c === ')') depth = Math.max(0, depth - 1);

    if (c === ',' && depth === 0) {
      if (current.trim()) result.push(current.trim());
      current = '';
    } else {
      current += c;
    }
  }
  if (current.trim()) result.push(current.trim());
  return result;
}

function getRootFeatureName(text) {
  if (!text) return '';
  let s = text.toLowerCase().trim();
  if (s.startsWith('deeds')) return 'deeds';
  if (s.includes('bonus combat feat')) return 'bonus combat feat';
  if (s.includes('bonus feat')) return 'bonus feat';
  s = s.replace(/\(.*?\)/g, '').trim();
  s = s.replace(/\s*\+\d+.*$/, '');
  s = s.replace(/\s+\d+\/day.*$/, '');
  s = s.replace(/\s+\d+d\d+.*$/, '');
  s = s.replace(/\s+\d+.*$/, '');
  s = s.replace(/^\d+(st|nd|rd|th)\s+/, '');
  return s.trim();
}

function isPlaceholderAbility(text) {
  if (!text) return false;
  const s = text.toLowerCase().trim();
  let clean = s.replace(/\(.*?\)/g, '').trim();
  clean = clean.replace(/^(?:defense|defensive|special\s+attack|attacks?|special\s+quality|sq|racial\s+trait|racial|class\s+feature|feature|aura)\s*:\s*/i, '').trim();

  if (['spells', 'spells known', 'discipline spells', 'paladin spells', 'ranger spells', 'arcanist spells', 'bloodrager spells', 'adept spells'].includes(clean)) {
    return true;
  }
  if (/^(?:bloodline|mystery|patron|discipline)\s+spells?(\s+known)?$/i.test(clean)) {
    return true;
  }
  if (/^[a-z\s]+ spells?(\s+known)?$/i.test(clean) && ['paladin', 'ranger', 'arcanist', 'bloodrager', 'adept', 'cleric', 'druid', 'wizard', 'sorcerer', 'bard', 'magus', 'inquisitor', 'oracle', 'witch', 'shaman'].some(c => clean.includes(c))) {
    return true;
  }

  if (['advanced talents', 'advanced talent', 'rogue talent', 'rogue talents', 'slayer talent', 'slayer talents', 'investigator talent', 'investigator talents', 'social talent', 'social talents', 'vigilante talent', 'vigilante talents', 'utility wild talent', 'talent', 'talents'].includes(clean)) {
    return true;
  }
  if (/^(?:\d+\s+)?(?:advanced|(?:rogue|slayer|investigator|social|vigilante|utility\s+wild))\s+talents?$/i.test(clean)) {
    return true;
  }

  if (['bonus feat', 'bonus feats', 'bonus combat feat', 'bonus combat feats', 'bonus wizard feat', 'bloodline feat', 'combat style feat', 'teamwork feat'].includes(clean)) {
    return true;
  }
  if (clean.startsWith('bonus feat') || clean.startsWith('bonus combat feat')) {
    return true;
  }

  if (clean.includes('weapon and armor proficiencies') || clean.includes('weapon and armor proficiency')) {
    return true;
  }
  if (['simple weapon proficiency', 'martial weapon proficiency', 'all martial weapon and armor proficiencies', 'skills and proficiencies'].includes(clean)) {
    return true;
  }
  if (clean.includes('weapon/armor proficiencies active')) {
    return true;
  }

  return false;
}

function resolveCharacterAbilities(clsKey, level, stats, race, alignment, rawSpecials) {
  const cls = (clsKey || 'paladin').toLowerCase().replace(/\s+/g, '_').trim();
  const lvl = Math.max(1, Math.min(20, parseInt(level, 10) || 10));
  stats = stats || {};

  const getMod = (val) => Math.floor((parseInt(val || 10, 10) - 10) / 2);
  const fmtMod = (m) => m >= 0 ? `+${m}` : `${m}`;

  const strM = getMod(stats.str);
  const dexM = getMod(stats.dex);
  const conM = getMod(stats.con);
  const intM = getMod(stats.int);
  const wisM = getMod(stats.wis);
  const chaM = getMod(stats.cha);

  const align = (alignment || 'LG').toUpperCase().trim();
  const racialTraits = getRacialTraits(race || 'Human');

  const abilities = [];
  const spAttacks = [];
  const defAbilities = [];
  const auras = [];
  const sqList = [];

  if (cls === 'paladin') {
    const smiteCount = Math.floor((lvl + 2) / 3);
    const smiteDmg = lvl;
    const smiteAc = Math.max(0, chaM);
    spAttacks.push(`Smite Evil ${smiteCount}/day (${fmtMod(chaM)} atk, +${smiteDmg} dmg [+${smiteDmg * 2} vs evil dragons/undead/outsiders], +${smiteAc} deflection AC)`);

    const lohCount = Math.floor(lvl / 2) + Math.max(1, chaM);
    const lohDice = `${Math.floor(lvl / 2)}d6`;
    const merciesCount = Math.floor((lvl - 1) / 3);
    const mercies = ['fatigued', 'dazed', 'diseased', 'staggered', 'exhausted', 'frightened'].slice(0, merciesCount);
    const mercyStr = mercies.length ? `, ${merciesCount} mercies: ${mercies.join(', ')}` : '';
    spAttacks.push(`Lay on Hands ${lohCount}/day (${lohDice}${mercyStr})`);

    if (lvl >= 4) {
      const chanDc = 10 + Math.floor(lvl / 2) + chaM;
      spAttacks.push(`Channel Positive Energy ${lohDice} (DC ${chanDc}, costs 2 LoH uses)`);
    }

    defAbilities.push(`Divine Grace (${fmtMod(chaM)} bonus to all saving throws)`);
    if (lvl >= 3) {
      defAbilities.push('Divine Health (immune to all diseases including magical)');
      defAbilities.push('Aura of Courage (immune to fear, allies within 10 ft. gain +4 morale bonus vs fear)');
    }
    if (lvl >= 8) {
      defAbilities.push('Aura of Resolve (immune to charm, allies within 10 ft. gain +4 morale bonus vs charm)');
    }
    if (lvl >= 17) {
      defAbilities.push('Aura of Righteousness (DR 5/evil, compulsion immunity, allies +4 vs compulsion)');
    }
    if (lvl >= 20) {
      defAbilities.push('Holy Champion (DR 10/evil, banish evil outsiders on smite)');
    }

    auras.push(`Aura of Good (power ${lvl})`);
    if (lvl >= 3) auras.push('Aura of Courage (10 ft.)');
    if (lvl >= 8) auras.push('Aura of Resolve (10 ft.)');
    if (lvl >= 11) auras.push('Aura of Justice (10 ft.)');
    if (lvl >= 14) auras.push('Aura of Faith (10 ft.)');
    if (lvl >= 17) auras.push('Aura of Righteousness (10 ft.)');

    sqList.push('Detect evil at will');
    if (lvl >= 5) {
      const bondBonus = Math.floor((lvl - 2) / 3);
      sqList.push(`Divine Bond (weapon +${bondBonus}/flaming/holy or mount)`);
    }
    sqList.push('Code of Conduct (Lawful Good)');

  } else if (cls === 'barbarian' || cls === 'unchained_barbarian') {
    const rageRounds = 4 + (lvl - 1) * 2 + Math.max(0, conM);
    const ragePowers = Math.floor(lvl / 2);
    const dr = lvl >= 7 ? Math.floor(lvl / 3) - 1 : 0;
    const trapSense = Math.floor(lvl / 3);

    const rageType = lvl >= 20 ? 'Mighty Rage (+8 STR, +8 CON, +4 Will)' : (lvl >= 11 ? 'Greater Rage (+6 STR, +6 CON, +3 Will)' : 'Rage (+4 STR, +4 CON, +2 Will, -2 AC)');
    spAttacks.push(`${rageType} ${rageRounds} rounds/day`);

    if (dr > 0) defAbilities.push(`Damage Reduction ${dr}/-`);
    if (trapSense > 0) defAbilities.push(`Trap Sense +${trapSense} (Reflex vs traps, dodge AC vs traps)`);
    if (lvl >= 2) defAbilities.push('Uncanny Dodge (cannot be caught flat-footed)');
    if (lvl >= 5) defAbilities.push('Improved Uncanny Dodge (cannot be flanked)');
    if (lvl >= 14) defAbilities.push('Indomitable Will (+4 Will saves vs enchantment while raging)');

    sqList.push('Fast Movement (+10 ft. base speed)');
    if (ragePowers > 0) sqList.push(`${ragePowers} Rage Powers selected`);
    if (lvl >= 17) sqList.push('Tireless Rage (no longer fatigued after rage)');

  } else if (cls === 'rogue' || cls === 'unchained_rogue') {
    const sneakDice = `${Math.ceil(lvl / 2)}d6`;
    spAttacks.push(`Sneak Attack +${sneakDice} precision damage`);

    if (lvl >= 2) defAbilities.push('Evasion (no damage on successful Reflex save)');
    if (lvl >= 4) defAbilities.push('Uncanny Dodge (cannot be caught flat-footed)');
    if (lvl >= 8) defAbilities.push('Improved Uncanny Dodge (cannot be flanked)');
    const trapSense = Math.floor(lvl / 3);
    if (trapSense > 0) defAbilities.push(`Trap Sense +${trapSense} (Reflex vs traps, dodge AC vs traps)`);
    if (lvl >= 20) spAttacks.push(`Master Strike (DC ${10 + 10 + intM} Fort save or sleep/paralyze/kill)`);

    sqList.push(`Trapfinding +${Math.floor(lvl / 2)} (Perception to locate traps, Disable Device)`);
    if (cls.includes('unchained')) {
      sqList.push('Finesse Training (Dex to hit & damage)');
      sqList.push('Debilitating Injury (bewildered, disoriented, hamstrung)');
    }

  } else if (cls === 'fighter') {
    const bonusFeats = Math.floor(lvl / 2) + 1;
    const bravery = Math.floor((lvl + 2) / 4);
    const armTrain = Math.floor((lvl - 1) / 4);
    const wepTrain = Math.floor((lvl - 1) / 4);

    if (wepTrain > 0) spAttacks.push(`Weapon Training ${wepTrain} (+${wepTrain} atk/dmg to primary group, +${Math.max(1, wepTrain - 1)} secondary)`);
    if (bravery > 0) defAbilities.push(`Bravery +${bravery} (morale bonus on Will saves vs fear)`);
    if (armTrain > 0) defAbilities.push(`Armor Training ${armTrain} (reduces ACP by ${armTrain}, increases Max Dex by ${armTrain}, move at normal speed in medium/heavy armor)`);
    if (lvl >= 19) defAbilities.push('Armor Mastery (DR 5/- while wearing armor)');

  } else if (cls === 'cleric') {
    const chanUses = 3 + Math.max(0, chaM);
    const chanDice = `${Math.ceil(lvl / 2)}d6`;
    const chanDc = 10 + Math.floor(lvl / 2) + chaM;
    const chanType = (align.includes('G') || align === 'N') ? 'Positive (heals living, damages undead)' : 'Negative (damages living, heals undead)';
    spAttacks.push(`Channel Energy ${chanUses}/day (${chanDice}, DC ${chanDc}, ${chanType})`);

    const domainUses = 3 + Math.max(0, wisM);
    sqList.push(`Domain Powers ${domainUses}/day (2 chosen domains)`);
    sqList.push('Spontaneous Casting (' + ((align.includes('G') || align === 'N') ? 'Cure spells' : 'Inflict spells') + ')');

    const auraAligns = [];
    if (align.includes('L')) auraAligns.push('Law');
    if (align.includes('C')) auraAligns.push('Chaos');
    if (align.includes('G')) auraAligns.push('Good');
    if (align.includes('E')) auraAligns.push('Evil');
    auras.push(`Aura of ${auraAligns.length ? auraAligns.join(', Aura of ') : 'Faith'} (power ${lvl})`);

  } else if (cls === 'wizard') {
    const bonusFeats = Math.floor(lvl / 5);
    sqList.push('Arcane Bond (Familiar or Bonded Object: 1 extra prepared spell/day)');
    sqList.push('Arcane School Powers (specialist powers + opposition schools)');
    sqList.push('Cantrips, Scribe Scroll');

  } else if (cls === 'monk' || cls === 'unchained_monk') {
    const unarmedDice = lvl < 4 ? '1d6' : (lvl < 8 ? '1d8' : (lvl < 12 ? '1d10' : (lvl < 16 ? '2d6' : (lvl < 20 ? '2d8' : '2d10'))));
    const acBonus = Math.max(0, wisM) + Math.floor(lvl / 4);
    const fastMov = Math.floor(lvl / 3) * 10;
    const kiPool = Math.floor(lvl / 2) + Math.max(0, wisM);
    const kiStrikes = [];
    if (lvl >= 4) kiStrikes.push('Magic');
    if (lvl >= 7) kiStrikes.push('Cold Iron/Silver');
    if (lvl >= 10) kiStrikes.push('Lawful');
    if (lvl >= 16) kiStrikes.push('Adamantine');

    spAttacks.push('Flurry of Blows (full BAB iterative extra attacks)');
    spAttacks.push(`Unarmed Strike (${unarmedDice} damage, ${kiStrikes.length ? kiStrikes.join(', ') : 'non-magical'})`);
    const stunningDc = 10 + Math.floor(lvl / 2) + wisM;
    spAttacks.push(`Stunning Fist ${lvl}/day (DC ${stunningDc} Fort save or stunned 1 round)`);

    defAbilities.push(`Monk AC Bonus (+${acBonus} dodge AC when unarmored/unencumbered)`);
    if (lvl >= 2) defAbilities.push('Evasion (no damage on successful Reflex save)');
    if (lvl >= 3) defAbilities.push('Still Mind (+2 bonus on saves vs enchantment spells/effects)');
    if (lvl >= 5) defAbilities.push('Purity of Body (immune to all diseases)');
    if (lvl >= 9) defAbilities.push('Improved Evasion');
    if (lvl >= 11) defAbilities.push('Diamond Body (immune to all poisons)');
    if (lvl >= 13) defAbilities.push(`Diamond Soul (Spell Resistance ${lvl + 10})`);

    sqList.push(`Ki Pool ${kiPool} points/day (+4 dodge AC, +20 ft. speed, or extra attack on flurry)`);
    if (fastMov > 0) sqList.push(`Fast Movement (+${fastMov} ft. unarmored speed bonus)`);
    if (lvl >= 4) sqList.push(`Slow Fall ${Math.min(90, lvl * 10)} ft.`);
    if (lvl >= 7) sqList.push(`Wholeness of Body (heal ${lvl * 2} HP/day for 2 ki points)`);
    if (lvl >= 12) sqList.push('Abundant Step (dimension door for 2 ki points)');

  } else if (cls === 'ranger') {
    const favEnemies = Math.floor((lvl + 3) / 5) + 1;
    const favTerrains = Math.floor((lvl + 2) / 5);
    const combFeats = Math.floor(lvl / 4) + 1;

    spAttacks.push(`${favEnemies} Favored Enemies (scaling +${favEnemies * 2} to +2 atk/dmg and skills)`);
    if (lvl >= 11) spAttacks.push('Quarry (+2 insight bonus to hit, auto-confirm crits)');
    if (lvl >= 20) spAttacks.push(`Master Hunter (DC ${10 + Math.floor(lvl / 2) + wisM} Fort save or slain)`);

    if (lvl >= 9) defAbilities.push('Evasion');
    if (lvl >= 16) defAbilities.push('Improved Evasion');

    sqList.push(`Track +${Math.floor(lvl / 2)} to Survival checks`);
    sqList.push(`Wild Empathy (${fmtMod(lvl + chaM)})`);
    if (favTerrains > 0) sqList.push(`${favTerrains} Favored Terrains (+${favTerrains * 2} to +2 to Initiative, Stealth, Perception)`);
    sqList.push(`Hunter's Bond (${lvl >= 4 ? 'Animal Companion' : 'Hunting Companions'})`);
    if (lvl >= 7) sqList.push('Woodland Stride, Swift Tracker');
    if (lvl >= 12) sqList.push('Camouflage, Hide in Plain Sight (lvl 17)');

  } else if (cls === 'bard') {
    const perfRounds = 4 + (lvl - 1) * 2 + Math.max(0, chaM);
    const inspireCourage = Math.floor((lvl - 1) / 6) + 1;
    const inspireComp = Math.floor((lvl + 3) / 4) + 1;
    const versatileCount = Math.floor((lvl + 2) / 4);

    spAttacks.push(`Bardic Performance ${perfRounds} rounds/day`);
    spAttacks.push(`Inspire Courage +${inspireCourage} (+${inspireCourage} competence to atk/dmg and morale vs fear)`);
    spAttacks.push(`Inspire Competence +${inspireComp} (+${inspireComp} competence bonus to skill checks)`);

    defAbilities.push('Well-Versed (+4 bonus on saves vs bardic performance, sonic, and language effects)');

    sqList.push(`Bardic Knowledge +${Math.floor(lvl / 2)} to all Knowledge checks`);
    if (versatileCount > 0) sqList.push(`Versatile Performance (${versatileCount} Perform skills substitute for other skills)`);
    if (lvl >= 5) {
      const loreUses = Math.floor((lvl + 1) / 6);
      sqList.push(`Lore Master ${loreUses}/day (take 10 or 20 on Knowledge checks)`);
    }
    if (lvl >= 8) sqList.push('Dirge of Doom (enemies within 30 ft. shaken)');
    if (lvl >= 10) sqList.push('Jack of All Trades (use any skill untrained)');

  } else if (cls === 'druid') {
    const wsUses = Math.max(0, lvl - 3);
    spAttacks.push(`Wild Shape ${wsUses}/day (duration ${lvl} hours/use: animal, elemental, plant forms)`);

    defAbilities.push('Resist Nature\'s Lure (+4 saves vs spell-like abilities of fey and plants)');
    if (lvl >= 9) defAbilities.push('Venom Immunity (immune to all poisons)');

    sqList.push('Nature Bond (Animal Companion or Cleric Domain)');
    sqList.push(`Wild Empathy (${fmtMod(lvl + chaM)})`);
    sqList.push('Nature Sense (+2 Knowledge nature, Survival)');
    if (lvl >= 2) sqList.push('Woodland Stride, Trackless Step (lvl 3)');
    if (lvl >= 13) sqList.push('A Thousand Faces (alter self at will)');
    if (lvl >= 15) sqList.push('Timeless Body (no ability score penalties for aging)');

  } else if (cls === 'sorcerer') {
    sqList.push('Bloodline Powers (1st, 3rd, 9th, 15th, 20th level abilities)');
    sqList.push('Bloodline Powers & Class Skills');
    sqList.push('Cantrips, Eschew Materials');

  } else if (cls === 'alchemist') {
    const bombsPerDay = lvl + Math.max(1, intM);
    const bombDice = `${Math.ceil(lvl / 2)}d6`;
    const bombDc = 10 + Math.floor(lvl / 2) + intM;
    spAttacks.push(`Bombs ${bombsPerDay}/day (${bombDice}+${intM} fire, splash min dmg, DC ${bombDc} Ref half)`);

    const poisRes = Math.floor((lvl - 1) / 3) * 2;
    if (lvl >= 10) defAbilities.push('Poison Immunity (immune to all poisons)');
    else if (poisRes > 0) defAbilities.push(`Poison Resistance +${poisRes} vs poisons`);

    sqList.push(`Mutagen (+4 physical stat, +2 natural armor, -2 mental stat for ${lvl * 10} min)`);
    const discCount = Math.floor(lvl / 2);
    if (discCount > 0) sqList.push(`${discCount} Discoveries selected`);
    sqList.push('Poison Use, Swift Alchemy, Brew Potion, Throw Anything');

  } else if (cls === 'inquisitor') {
    const judgCount = Math.ceil(lvl / 3);
    spAttacks.push(`Judgment ${judgCount}/day (Destruction, Healing, Justice, Piercing, Protection, Purity, Resiliency, Resistance, Smiting)`);
    if (lvl >= 5) spAttacks.push(`Bane ${lvl} rounds/day (+2 enhancement, +2d6 damage vs chosen foe)`);

    defAbilities.push('Stern Gaze (morale bonus to Intimidate & Sense Motive)');
    if (lvl >= 11) defAbilities.push('Stalwart (no effect on successful Fort/Will save)');

    sqList.push(`Monster Lore (${fmtMod(wisM)} to identify monsters)`);
    sqList.push(`Cunning Initiative (${fmtMod(wisM)} to Initiative)`);
    sqList.push('Solo Tactics');
    sqList.push(`Detect Alignment at will, Track +${Math.floor(lvl / 2)}`);

  } else if (cls === 'magus') {
    const arcPool = Math.floor(lvl / 2) + Math.max(1, intM);
    const enhBonus = Math.floor((lvl + 3) / 4);
    spAttacks.push(`Arcane Pool ${arcPool} pts/day (+${enhBonus} weapon enhancement, flaming, shock, keen, speed)`);
    spAttacks.push('Spell Combat (full attack while casting a spell with off-hand)');
    spAttacks.push('Spellstrike (deliver touch spell through melee weapon attack)');

    const arcanaCount = Math.floor(lvl / 3);
    if (arcanaCount > 0) sqList.push(`${arcanaCount} Magus Arcana selected`);
    sqList.push('Spell Recall (recall expended spell for pool points)');
    if (lvl >= 7) sqList.push('Medium Armor proficiency (no arcane spell failure)');
    if (lvl >= 13) sqList.push('Heavy Armor proficiency (no arcane spell failure)');

  } else if (cls === 'omdura') {
    const invocAction = lvl >= 13 ? 'swift action' : (lvl >= 7 ? 'move action' : 'standard action');

    const destrDmg = 1 + Math.floor(lvl / 3);
    const healingFh = 1 + Math.floor(lvl / 3);
    const justiceAtk = 1 + Math.floor(lvl / 5);
    const justiceCrit = lvl >= 10 ? `, +${justiceAtk * 2} confirm crits` : '';
    const pierceBonus = 1 + Math.floor(lvl / 3);
    const protAc = 1 + Math.floor(lvl / 5);
    const protCrit = lvl >= 10 ? `, +${protAc * 2} vs crit confirm` : '';
    const purBonus = 1 + Math.floor(lvl / 5);
    const purCrit = lvl >= 10 ? `, +${purBonus * 2} vs curse/disease/poison` : '';
    const resilDr = 1 + Math.floor(lvl / 5);
    const resilType = lvl >= 10 ? 'alignment' : 'magic';
    const resistEnergy = 2 + 2 * Math.floor(lvl / 3);
    const smitingDesc = lvl >= 10 ? 'DR/magic, align & adamantine' : (lvl >= 6 ? 'DR/magic & align' : 'DR/magic');

    let invocHeader = `Invocations ${lvl} min/day (${invocAction}, 30-ft aura to allies)`;
    if (lvl >= 20) {
      invocHeader = `Invocations ${lvl} min/day + Greater Invocation (1 buff 24h at full bonus; ${invocAction}, 30 ft aura to allies)`;
    } else if (lvl >= 11) {
      invocHeader = `Improved Invocations ${lvl} min/day (grant 2 buffs to allies, self gains 1 at half bonus; ${invocAction}, 30 ft)`;
    }

    spAttacks.push(invocHeader);
    spAttacks.push(`Invocation - Destruction: +${destrDmg} sacred bonus on weapon damage rolls`);
    spAttacks.push(`Invocation - Healing: Fast Healing ${healingFh} (recovers ${healingFh} HP/round)`);
    spAttacks.push(`Invocation - Justice: +${justiceAtk} sacred bonus on attack rolls${justiceCrit}`);
    spAttacks.push(`Invocation - Piercing: +${pierceBonus} sacred bonus on Concentration & CL checks vs SR`);
    spAttacks.push(`Invocation - Protection: +${protAc} sacred bonus to AC${protCrit}`);
    spAttacks.push(`Invocation - Purify: +${purBonus} sacred bonus on all saving throws${purCrit}`);
    spAttacks.push(`Invocation - Resiliency: DR ${resilDr}/${resilType}`);
    spAttacks.push(`Invocation - Resistance: ${resistEnergy} Energy Resistance (acid, cold, elec, fire, sonic)`);
    spAttacks.push(`Invocation - Smiting: Allies' weapons bypass ${smitingDesc}`);

    let dmUses = 0;
    if (lvl >= 19) dmUses = 4;
    else if (lvl >= 14) dmUses = 3;
    else if (lvl >= 9) dmUses = 2;
    else if (lvl >= 4) dmUses = 1;

    if (dmUses > 0) {
      const dmAtk = lvl >= 18 ? fmtMod(Math.max(0, chaM)) : fmtMod(Math.max(0, Math.floor(chaM / 2)));
      const dmDmg = lvl >= 18 ? lvl : Math.floor(lvl / 2);
      const dmAc = lvl >= 18 ? Math.max(0, chaM) : Math.max(0, Math.floor(chaM / 2));
      spAttacks.push(`Divine Might ${dmUses}/day (${dmAtk} atk, +${dmDmg} dmg, +${dmAc} deflection AC vs opposed target)`);
    }

    if (lvl >= 2) {
      const dtCount = Math.floor(lvl / 2) + Math.max(1, chaM);
      const dtDice = `${Math.floor(lvl / 2)}d6`;
      spAttacks.push(`Divine Touch ${dtCount}/day (${dtDice} heal/harm)`);
    }

    if (lvl >= 3) {
      const infusionCount = Math.floor(lvl / 3);
      sqList.push(`Divine Infusion (${infusionCount} mercies/cruelties applied to Divine Touch)`);
    }

    if (lvl >= 5) {
      const dwUses = 1 + Math.floor((lvl - 5) / 4);
      const dwBonus = 1 + Math.floor((lvl - 5) / 3);
      sqList.push(`Divine Weapon ${dwUses}/day (+${dwBonus} enhancement or weapon properties, ${lvl} min)`);
    }

    if (lvl >= 15) {
      sqList.push('Commune 2/day (Sp)');
    } else if (lvl >= 7) {
      sqList.push('Commune 1/day (Sp)');
    }

    auras.push('Aura (Ex) & Detect Alignment (Sp, at-will)');

  } else if (cls === 'cavalier') {
    const chalCount = Math.floor((lvl + 2) / 3);
    spAttacks.push(`Challenge ${chalCount}/day (+${lvl} damage to challenged target)`);
    if (lvl >= 3) spAttacks.push('Cavalier\'s Charge (+4 atk, no AC penalty on charge)');

    sqList.push('Order Abilities, Mount, Tactician (share teamwork feat)');
    if (lvl >= 5) sqList.push('Banner (+2 morale vs fear, +1 atk on charge to allies)');

  } else if (cls === 'gunslinger') {
    const grit = Math.max(1, wisM);
    const nimble = Math.floor((lvl + 2) / 4);
    const gunTrain = Math.floor((lvl - 1) / 4);

    spAttacks.push(`Grit ${grit} points/day (Deeds: Deadeye, Gunslinger's Dodge, Quick Clear, Dead Shot, Targeting)`);
    if (nimble > 0) defAbilities.push(`Nimble +${nimble} (dodge to AC)`);

    sqList.push('Gunsmithing (craft/repair firearms and ammunition)');

  } else if (cls === 'swashbuckler') {
    const panache = Math.max(1, chaM);
    const nimble = lvl >= 3 ? (1 + Math.floor((lvl - 3) / 4)) : 0;
    const charmed = lvl >= 2 ? (3 + Math.floor((lvl - 2) / 4)) : 0;
    const wepTrain = lvl >= 5 ? (1 + Math.floor((lvl - 5) / 4)) : 0;

    const deedsList = ['Derring-Do', 'Dodging Panache', 'Opportune Parry & Riposte'];
    if (lvl >= 3) deedsList.push('Kip-Up', 'Menacing Swordplay', `Precise Strike (+${lvl} dmg)`);
    if (lvl >= 7) deedsList.push("Swashbuckler's Grace", 'Superior Feint', 'Targeted Strike');
    if (lvl >= 11) deedsList.push('Bleeding Wound', 'Evasive', 'Subtle Cut');
    if (lvl >= 15) deedsList.push('Dizzying Defense', 'Perfect Thrust', "Swashbuckler's Edge");
    if (lvl >= 19) deedsList.push('Cheat Death', 'Deadly Stab', 'Stunning Stab');

    const chaSign = chaM >= 0 ? `+${chaM}` : `${chaM}`;
    spAttacks.push(`Panache ${panache} points/day (CHA ${chaSign})`);
    spAttacks.push(`Deeds (${deedsList.join(', ')})`);
    if (wepTrain > 0) spAttacks.push(`Swashbuckler Weapon Training +${wepTrain} (+${wepTrain} atk/dmg with light/1H piercing)`);
    if (nimble > 0) defAbilities.push(`Nimble +${nimble} (dodge to AC)`);
    if (charmed > 0) defAbilities.push(`Charmed Life ${charmed}/day (${chaSign} CHA bonus to save as immediate action)`);

    sqList.push('Swashbuckler Finesse (Weapon Finesse with light/1H piercing, use CHA for feat prerequisites)');

    if (lvl >= 20) {
      sqList.push('Swashbuckler Weapon Mastery (automatic confirmed crits with piercing weapons, crit multiplier increases by 1)');
    }

  } else if (cls === 'slayer') {
    const studBonus = Math.floor((lvl + 3) / 5);
    const sneakDice = `${Math.floor(lvl / 3)}d6`;
    spAttacks.push(`Studied Target +${studBonus} (+${studBonus} atk/dmg, Bluff, Knowledge, Perception, Sense Motive, Survival)`);
    if (lvl >= 3) spAttacks.push(`Sneak Attack +${sneakDice} precision damage`);
    sqList.push(`Track +${Math.floor(lvl / 2)}, Stalker`);

  } else if (cls === 'warpriest') {
    const sacredDice = lvl < 5 ? '1d6' : (lvl < 10 ? '1d8' : (lvl < 15 ? '1d10' : (lvl < 20 ? '2d6' : '2d8')));
    const fervorUses = Math.floor(lvl / 2) + Math.max(0, wisM);
    const fervorDice = `${Math.floor((lvl + 1) / 3)}d6`;
    spAttacks.push(`Sacred Weapon (${sacredDice} damage, +${Math.floor(lvl / 4)} enhancement pool)`);
    spAttacks.push(`Fervor ${fervorUses}/day (${fervorDice} healing/damage or swift self-cast)`);

    if (lvl >= 7) defAbilities.push(`Sacred Armor +${Math.floor((lvl - 4) / 3)} enhancement/abilities`);

    sqList.push(`Blessings ${Math.floor(lvl / 2) + 1}/day from 2 domains, Focus Weapon`);
    auras.push('Aura of Faith (alignment aura)');

  } else {
    const clsTitle = cls.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    spAttacks.push(`${clsTitle} Combat Features (Level ${lvl})`);
    sqList.push(`Level ${lvl} ${clsTitle} Class Progression Features`);
  }

  const progressionMap = new Map();
  if (rawSpecials && typeof rawSpecials === 'object') {
    for (let l = 1; l <= lvl; l++) {
      const sText = rawSpecials[String(l)];
      if (sText && sText !== '—') {
        const items = splitOutsideParens(sText);
        items.forEach(item => {
          const itemClean = item.trim().replace(/\b\w/g, c => c.toUpperCase());
          if (itemClean && !isPlaceholderAbility(itemClean)) {
            const root = getRootFeatureName(itemClean);
            if (!isPlaceholderAbility(root)) {
              progressionMap.set(root, itemClean);
            }
          }
        });
      }
    }
  }

  let slotIdx = 1;

  spAttacks.forEach(atk => {
    if (isPlaceholderAbility(atk)) return;
    if (slotIdx <= 20) {
      abilities.push({ name: '', desc: atk, type: 'attack' });
      slotIdx++;
    }
  });

  defAbilities.forEach(d => {
    if (isPlaceholderAbility(d)) return;
    if (slotIdx <= 20) {
      abilities.push({ name: '', desc: d, type: 'defense' });
      slotIdx++;
    }
  });

  auras.forEach(a => {
    if (isPlaceholderAbility(a)) return;
    if (slotIdx <= 20) {
      abilities.push({ name: '', desc: a, type: 'aura' });
      slotIdx++;
    }
  });

  const existingRoots = new Set();
  abilities.forEach(a => {
    existingRoots.add(getRootFeatureName(a.desc));
  });

  sqList.forEach(sq => {
    if (isPlaceholderAbility(sq)) return;
    if (slotIdx <= 20) {
      const sqRoot = getRootFeatureName(sq);
      if (!existingRoots.has(sqRoot) && !isPlaceholderAbility(sqRoot)) {
        abilities.push({ name: '', desc: sq, type: 'sq' });
        existingRoots.add(sqRoot);
        slotIdx++;
      }
    }
  });

  racialTraits.forEach(rTrait => {
    if (isPlaceholderAbility(rTrait) || rTrait.toLowerCase().includes('skilled')) return;
    if (slotIdx <= 20) {
      abilities.push({ name: '', desc: rTrait, type: 'racial' });
      slotIdx++;
    }
  });

  progressionMap.forEach((featName, root) => {
    if (isPlaceholderAbility(root) || isPlaceholderAbility(featName)) return;
    if (slotIdx <= 20) {
      if (!existingRoots.has(root)) {
        abilities.push({ name: '', desc: featName, type: 'feature' });
        existingRoots.add(root);
        slotIdx++;
      }
    }
  });

  const cleanSq = sqList.filter(s => !isPlaceholderAbility(s));
  const cleanRacial = racialTraits.filter(r => !isPlaceholderAbility(r) && !r.toLowerCase().includes('skilled'));
  const finalSq = [...cleanSq, ...cleanRacial.slice(0, 2)].join(' | ');
  const finalAttacks = spAttacks.join(' | ');
  const finalDef = defAbilities.length ? defAbilities.join(' | ') : 'None';
  const finalAura = auras.length ? auras.join(', ') : 'None';

  const filteredAbilities = abilities.filter(a => {
    return (a.desc && !isPlaceholderAbility(a.desc)) || (a.name && !isPlaceholderAbility(a.name));
  });

  return {
    abilitiesList: filteredAbilities.slice(0, 20),
    specialQualities: finalSq,
    specialAttacks: finalAttacks,
    defensiveAbilities: finalDef,
    aura: finalAura,
    racialTraits: cleanRacial
  };
}

function resolveMulticlassAbilities(classesList, stats, race, alignment, db) {
  if (!classesList || classesList.length === 0) {
    return resolveCharacterAbilities('paladin', 1, stats, race, alignment);
  }
  if (classesList.length === 1) {
    const c = classesList[0];
    const rawS = (db && db[c.class]) ? db[c.class].specials : null;
    return resolveCharacterAbilities(c.class, c.level, stats, race, alignment, rawS);
  }

  const mergedAbilities = [];
  const mergedAttacks = [];
  const mergedDefenses = [];
  const mergedAuras = [];
  const mergedSq = [];
  let mergedRacial = [];
  const existingRoots = new Set();

  classesList.forEach((c, idx) => {
    const rawS = (db && db[c.class]) ? db[c.class].specials : null;
    const res = resolveCharacterAbilities(c.class, c.level, stats, idx === 0 ? race : '', alignment, rawS);
    if (idx === 0) mergedRacial = res.racialTraits || [];

    if (res.specialAttacks) {
      res.specialAttacks.split(' | ').forEach(atk => {
        const s = atk.trim();
        if (s && !mergedAttacks.includes(s)) mergedAttacks.push(s);
      });
    }

    if (res.defensiveAbilities && res.defensiveAbilities !== 'None') {
      res.defensiveAbilities.split(' | ').forEach(df => {
        const s = df.trim();
        if (s && s !== 'None' && !mergedDefenses.includes(s)) mergedDefenses.push(s);
      });
    }

    if (res.aura && res.aura !== 'None') {
      res.aura.split(', ').forEach(au => {
        const s = au.trim();
        if (s && s !== 'None' && !mergedAuras.includes(s)) mergedAuras.push(s);
      });
    }

    if (res.specialQualities) {
      res.specialQualities.split(' | ').forEach(sq => {
        const s = sq.trim();
        if (s && !mergedSq.includes(s)) mergedSq.push(s);
      });
    }

    (res.abilitiesList || []).forEach(ab => {
      const desc = ab.desc || ab.name || '';
      const root = getRootFeatureName(desc);
      if (!existingRoots.has(root) && !isPlaceholderAbility(root)) {
        mergedAbilities.push(ab);
        existingRoots.add(root);
      }
    });
  });

  return {
    abilitiesList: mergedAbilities.slice(0, 20),
    specialQualities: mergedSq.join(' | '),
    specialAttacks: mergedAttacks.join(' | '),
    defensiveAbilities: mergedDefenses.length ? mergedDefenses.join(' | ') : 'None',
    aura: mergedAuras.length ? mergedAuras.join(', ') : 'None',
    racialTraits: mergedRacial
  };
}

if (typeof window !== 'undefined') {
  window.resolveCharacterAbilities = resolveCharacterAbilities;
  window.resolveMulticlassAbilities = resolveMulticlassAbilities;
  window.getRacialTraits = getRacialTraits;
  window.isPlaceholderAbility = isPlaceholderAbility;
}
