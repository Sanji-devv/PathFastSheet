document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const LANGS = {
    EN: {

      nav_lang:          'EN',
      nav_characters:    'Characters',
      nav_new:           'New',
      nav_pdf:           'PDF',
      nav_save:          'Save',
      nav_import:        'Import',
      nav_download:      'JSON',
      nav_dice:          'Dice',

      savedToDb:         'Cached in Web Storage',
      savedLocally:      'Cached in Web Cookies',
      saveError:         'Save Error',
      saved:             'Saved!',
      saveChanges:       'Save Changes',
      saving:            'Saving...',
      generatingPdf:     'Generating PDF...',
      pdfReady:          'PDF Ready',
      pdfError:          'PDF Error',

      weaponName:        'Weapon Name',
      weapon:            'Weapon',
      attackType:        'Attack Type',
      damageType:        'Damage Type',
      range:             'Range',
      deleteWeapon:      'Delete Weapon',
      baseDie:           'Base Die',
      enhancement:       'Enhancement',
      critRangeMult:     'Crit Range / Mult',
      critThreat:        'Crit Threat',
      ammunition:        'Ammunition',
      attackBonusAuto:   'Attack Bonus (Auto)',
      damageAuto:        'Damage (Auto)',
      critDamageAuto:    'Crit Damage (Auto)',
      savingThrow:       'Saving Throw',
      roll:              'Roll',
      check:             'Check',
      lastRoll:          'Last Roll Result',

      toast_lang:        'Language set to English',
      toast_saved:       'Character saved successfully!',
      toast_loaded:      'Character loaded!',
      toast_pdf:         'PDF generated successfully!',
      toast_cache:       'Cache cleared!',

      classLabel:        'Class',
      levelLabel:        'Level',
      hpLabel:           'HP',
      acLabel:           'AC',
      initLabel:         'Initiative',
      fortLabel:         'Fortitude',
      refLabel:          'Reflex',
      willLabel:         'Will',
      strLabel:          'STR',
      dexLabel:          'DEX',
      conLabel:          'CON',
      intLabel:          'INT',
      wisLabel:          'WIS',
      chaLabel:          'CHA',
    },
    TR: {}
  };
  LANGS.TR = LANGS.EN;

  function setCookie(name, value, days = 30) {
    try {
      const d = new Date();
      d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = "expires=" + d.toUTCString();
      document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/;SameSite=Lax";
    } catch (e) {
      console.warn("Cookie set warning:", e);
    }
  }

  function getCookie(name) {
    try {
      const cname = name + "=";
      const decodedCookie = decodeURIComponent(document.cookie || "");
      const ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(cname) === 0) {
          return c.substring(cname.length, c.length);
        }
      }
    } catch (e) {
      console.warn("Cookie get warning:", e);
    }
    return "";
  }

  function deleteCookie(name) {
    try {
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax";
    } catch (e) {}
  }

  let currentLang = 'EN';
  let i18n = LANGS.EN;

  function applyI18n() {
    i18n = LANGS[currentLang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (i18n[key] !== undefined) el.textContent = i18n[key];
    });

    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (i18n[key] !== undefined) el.placeholder = i18n[key];
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (i18n[key] !== undefined) el.title = i18n[key];
    });

    document.documentElement.lang = currentLang === 'TR' ? 'tr' : 'en';
  }

  const pfData = (window.PF_DATA && window.PF_DATA.classes) ? window.PF_DATA : {
    classes: {},
    classSkills: {},
    bab: {},
    saves: {},
    progressions: {},
    armors: [],
    saveItems: []
  };

  let multiclassState = [];

  const PATHFINDER_SAVE_ITEMS = [
    { name: 'Cloak of Resistance +1', target: 'all', type: 'resistance', bonus: 1, weight: 1, slot: 'Shoulders', desc: '+1 resistance bonus on all saving throws' },
    { name: 'Cloak of Resistance +2', target: 'all', type: 'resistance', bonus: 2, weight: 1, slot: 'Shoulders', desc: '+2 resistance bonus on all saving throws' },
    { name: 'Cloak of Resistance +3', target: 'all', type: 'resistance', bonus: 3, weight: 1, slot: 'Shoulders', desc: '+3 resistance bonus on all saving throws' },
    { name: 'Cloak of Resistance +4', target: 'all', type: 'resistance', bonus: 4, weight: 1, slot: 'Shoulders', desc: '+4 resistance bonus on all saving throws' },
    { name: 'Cloak of Resistance +5', target: 'all', type: 'resistance', bonus: 5, weight: 1, slot: 'Shoulders', desc: '+5 resistance bonus on all saving throws' },
    { name: 'Vest of Resistance +1', target: 'all', type: 'resistance', bonus: 1, weight: 1, slot: 'Chest', desc: '+1 resistance bonus on all saving throws' },
    { name: 'Vest of Resistance +2', target: 'all', type: 'resistance', bonus: 2, weight: 1, slot: 'Chest', desc: '+2 resistance bonus on all saving throws' },
    { name: 'Vest of Resistance +3', target: 'all', type: 'resistance', bonus: 3, weight: 1, slot: 'Chest', desc: '+3 resistance bonus on all saving throws' },
    { name: 'Vest of Resistance +4', target: 'all', type: 'resistance', bonus: 4, weight: 1, slot: 'Chest', desc: '+4 resistance bonus on all saving throws' },
    { name: 'Vest of Resistance +5', target: 'all', type: 'resistance', bonus: 5, weight: 1, slot: 'Chest', desc: '+5 resistance bonus on all saving throws' },
    { name: 'Ring of Resistance +1', target: 'all', type: 'resistance', bonus: 1, weight: 0, slot: 'Ring', desc: '+1 resistance bonus on all saving throws' },
    { name: 'Ring of Resistance +2', target: 'all', type: 'resistance', bonus: 2, weight: 0, slot: 'Ring', desc: '+2 resistance bonus on all saving throws' },
    { name: 'Ring of Resistance +3', target: 'all', type: 'resistance', bonus: 3, weight: 0, slot: 'Ring', desc: '+3 resistance bonus on all saving throws' },
    { name: 'Ring of Resistance +4', target: 'all', type: 'resistance', bonus: 4, weight: 0, slot: 'Ring', desc: '+4 resistance bonus on all saving throws' },
    { name: 'Ring of Resistance +5', target: 'all', type: 'resistance', bonus: 5, weight: 0, slot: 'Ring', desc: '+5 resistance bonus on all saving throws' },
    { name: 'Stone of Good Luck (Luckstone)', target: 'all', type: 'luck', bonus: 1, weight: 0, slot: 'None', desc: '+1 luck bonus on saving throws, ability checks, and skill checks' },
    { name: 'Four-Leaf Clover', target: 'all', type: 'luck', bonus: 2, weight: 0, slot: 'None', desc: '+2 luck bonus on saving throws, ability checks, or skill checks (3/day)' },
    { name: 'Fortifying Stone', target: 'all', type: 'resistance', bonus: 1, weight: 0, slot: 'None', desc: '+1 resistance bonus on saving throws' },
    { name: 'Shawl of Life-Keeping', target: 'fort', type: 'resistance', bonus: 2, weight: 1, slot: 'Shoulders', desc: '+2 resistance bonus on Fortitude saves against death effects' },
    { name: 'Periapt of Proof against Poison', target: 'fort', type: 'misc', bonus: 4, weight: 0, slot: 'Neck', desc: '+4 bonus on Fortitude saves against poison' },
    { name: 'Periapt of Health', target: 'fort', type: 'misc', bonus: 4, weight: 0, slot: 'Neck', desc: 'Immunity to all disease effects and +4 Fortitude checks' },
    { name: 'Boots of the Cat', target: 'ref', type: 'misc', bonus: 2, weight: 1, slot: 'Feet', desc: '+2 bonus on Acrobatics and Reflex saving throws against falls/trips' },
    { name: 'Boots of Friendly Terrain', target: 'ref', type: 'insight', bonus: 2, weight: 1, slot: 'Feet', desc: '+2 insight bonus on initiative and Reflex saves in favored terrain' },
    { name: 'Cap of the Free Thinker', target: 'will', type: 'misc', bonus: 2, weight: 0, slot: 'Head', desc: '+2 bonus and roll-twice advantage on Will saves against mind-affecting effects' },
    { name: 'Amulet of the Planes', target: 'will', type: 'misc', bonus: 2, weight: 0, slot: 'Neck', desc: '+2 on Will saving throws against extraplanar powers' },
    { name: 'Bracers of Steadfast Resilience', target: 'fort', type: 'resistance', bonus: 2, weight: 1, slot: 'Wrists', desc: '+2 resistance bonus on Fortitude saves' },
    { name: 'Band of the Stalwart Warrior', target: 'fort', type: 'morale', bonus: 2, weight: 0, slot: 'Headband', desc: '+2 morale bonus on Fortitude saves against fatigue, exhaustion, and fear' },
    { name: 'Brooch of Shielding', target: 'all', type: 'misc', bonus: 1, weight: 0, slot: 'Neck', desc: '+1 bonus on saving throws against harmful spells' },
    { name: 'Medallion of Courage', target: 'will', type: 'morale', bonus: 2, weight: 0, slot: 'Neck', desc: '+2 morale bonus on Will saving throws against fear' },
    { name: 'All-Tool (Alchemical)', target: 'all', type: 'misc', bonus: 1, weight: 1, slot: 'None', desc: '+1 alchemical bonus assisting saving throws' }
  ];

  const PF_SKILLS = [
    { key: 'acrobatics', name: 'Acrobatics', ab: 'dex', armorPen: true },
    { key: 'appraise', name: 'Appraise', ab: 'int', armorPen: false },
    { key: 'bluff', name: 'Bluff', ab: 'cha', armorPen: false },
    { key: 'climb', name: 'Climb', ab: 'str', armorPen: true },
    { key: 'craft1', name: 'Craft', ab: 'int', armorPen: false, isCraft: true },
    { key: 'craft2', name: 'Craft', ab: 'int', armorPen: false, isCraft: true },
    { key: 'craft3', name: 'Craft', ab: 'int', armorPen: false, isCraft: true },
    { key: 'diplomacy', name: 'Diplomacy', ab: 'cha', armorPen: false },
    { key: 'disable_device', name: 'Disable Device *', ab: 'dex', armorPen: true },
    { key: 'disguise', name: 'Disguise', ab: 'cha', armorPen: false },
    { key: 'escape_artist', name: 'Escape Artist', ab: 'dex', armorPen: true },
    { key: 'fly', name: 'Fly', ab: 'dex', armorPen: true },
    { key: 'handle_animal', name: 'Handle Animal *', ab: 'cha', armorPen: false },
    { key: 'heal', name: 'Heal', ab: 'wis', armorPen: false },
    { key: 'intimidate', name: 'Intimidate', ab: 'cha', armorPen: false },
    { key: 'know_arcana', name: 'Knowledge (Arcana) *', ab: 'int', armorPen: false },
    { key: 'know_dungeon', name: 'Knowledge (Dungeoneering) *', ab: 'int', armorPen: false },
    { key: 'know_engineer', name: 'Knowledge (Engineering) *', ab: 'int', armorPen: false },
    { key: 'know_geography', name: 'Knowledge (Geography) *', ab: 'int', armorPen: false },
    { key: 'know_history', name: 'Knowledge (History) *', ab: 'int', armorPen: false },
    { key: 'know_local', name: 'Knowledge (Local) *', ab: 'int', armorPen: false },
    { key: 'know_nature', name: 'Knowledge (Nature) *', ab: 'int', armorPen: false },
    { key: 'know_nobility', name: 'Knowledge (Nobility) *', ab: 'int', armorPen: false },
    { key: 'know_planes', name: 'Knowledge (Planes) *', ab: 'int', armorPen: false },
    { key: 'know_religion', name: 'Knowledge (Religion) *', ab: 'int', armorPen: false },
    { key: 'linguistics', name: 'Linguistics *', ab: 'int', armorPen: false },
    { key: 'perception', name: 'Perception', ab: 'wis', armorPen: false },
    { key: 'perform1', name: 'Perform (Oratory/Song)', ab: 'cha', armorPen: false },
    { key: 'perform2', name: 'Perform (Act/Dance)', ab: 'cha', armorPen: false },
    { key: 'profession1', name: 'Profession (Sailor/Medic) *', ab: 'wis', armorPen: false },
    { key: 'profession2', name: 'Profession (Other) *', ab: 'wis', armorPen: false },
    { key: 'ride', name: 'Ride', ab: 'dex', armorPen: true },
    { key: 'sense_motive', name: 'Sense Motive', ab: 'wis', armorPen: false },
    { key: 'sleight_of_hand', name: 'Sleight of Hand *', ab: 'dex', armorPen: true },
    { key: 'spellcraft', name: 'Spellcraft *', ab: 'int', armorPen: false },
    { key: 'stealth', name: 'Stealth', ab: 'dex', armorPen: true },
    { key: 'survival', name: 'Survival', ab: 'wis', armorPen: false },
    { key: 'swim', name: 'Swim', ab: 'str', armorPen: true },
    { key: 'use_magic_device', name: 'Use Magic Device *', ab: 'cha', armorPen: false }
  ];

  const STR_CAPACITY = {
    1: [3, 6, 10], 2: [6, 13, 20], 3: [10, 20, 30], 4: [13, 26, 40], 5: [16, 33, 50],
    6: [20, 40, 60], 7: [23, 46, 70], 8: [26, 53, 80], 9: [30, 60, 90], 10: [33, 66, 100],
    11: [38, 76, 115], 12: [43, 86, 130], 13: [50, 100, 150], 14: [58, 116, 175], 15: [66, 133, 200],
    16: [76, 153, 230], 17: [86, 173, 260], 18: [100, 200, 300], 19: [116, 233, 350], 20: [133, 266, 400],
    21: [153, 306, 460], 22: [173, 346, 520], 23: [200, 400, 600], 24: [233, 466, 700], 25: [266, 533, 800],
    26: [306, 613, 920], 27: [346, 693, 1040], 28: [400, 800, 1200], 29: [466, 933, 1400], 30: [533, 1066, 1600]
  };

  const userUuid = "local_user";
  const charStorageKey = 'valiant_shade_characters_' + userUuid;
  const serverDbChar = null;

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function getCharacters() {
    let raw = localStorage.getItem(charStorageKey);
    if (raw === null) {
      const legacy = localStorage.getItem('valiant_shade_characters');
      if (legacy) {
        try {
          const parsed = JSON.parse(legacy);
          if (Array.isArray(parsed)) {
            localStorage.setItem(charStorageKey, legacy);
            raw = legacy;
          }
        } catch (e) {}
      }
    }
    try {
      const list = JSON.parse(raw || '[]');
      if (Array.isArray(list)) {
        list.forEach(c => {
          if (c && c.sheetData && Array.isArray(c.sheetData.weapons)) {
            c.sheetData.weapons.forEach(w => {
              if (w && w.name === 'Longsword +1') {
                w.name = 'Longsword';
                if (w.enh === 1) w.enh = 0;
              }
            });
            if (c.sheetData.weapons.length > 1 && c.sheetData.weapons.some(w => w.name === 'Longsword')) {
              c.sheetData.weapons = c.sheetData.weapons.filter(w => !(w.name === 'Heavy Crossbow' && (w.ammo === '30 bolts' || !w.ammo)));
            }
          }
        });
      }
      return list;
    } catch (e) {
      return [];
    }
  }

  function saveCharacters(chars) {
    try {
      const list = chars || [];
      localStorage.setItem(charStorageKey, JSON.stringify(list));
      localStorage.setItem('valiant_shade_characters', JSON.stringify(list));

      setCookie('pf_char_count', String(list.length), 30);
      setCookie('pf_last_cached', new Date().toISOString(), 30);
      if (currentChar) {
        if (currentChar.id) setCookie('pf_active_char_id', currentChar.id, 30);
        setCookie('pf_active_char_name', currentChar.name || '', 30);
        if (currentChar.classKey) setCookie('pf_active_class', currentChar.classKey, 30);
        if (currentChar.level) setCookie('pf_active_level', String(currentChar.level), 30);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const urlParams = new URLSearchParams(window.location.search);
  let charId = urlParams.get('id');
  let charNameParam = urlParams.get('name');
  const isNewRequest = urlParams.get('new') === '1';
  let chars = getCharacters();
  let currentChar = null;

  if (serverDbChar) {
    let parsed = serverDbChar.sheet_data || {};
    if (typeof parsed === 'string') {
      try { parsed = JSON.parse(parsed); } catch (e) { parsed = {}; }
    }
    const sDetails = (parsed && parsed.sheetData) ? parsed.sheetData : (parsed || {});

    if (!sDetails.traits) sDetails.traits = {};
    if (serverDbChar.traits && Array.isArray(serverDbChar.traits)) {
      serverDbChar.traits.forEach(t => {
        if (t.slot_key) {
          sDetails.traits[t.slot_key] = {
            name: t.trait_name || '',
            desc: t.description || '',
            category: t.category || '',
            source_url: t.source_url || ''
          };
        }
      });
    }
    if (parsed.traits && typeof parsed.traits === 'object') {
      ['uye', 'kidemli', 'uzman'].forEach(k => {
        if (parsed.traits[k] && (!sDetails.traits[k] || !sDetails.traits[k].name)) {
          sDetails.traits[k] = parsed.traits[k];
        }
      });
    }

    if (serverDbChar.feats && Array.isArray(serverDbChar.feats) && serverDbChar.feats.length > 0) {
      sDetails.feats = serverDbChar.feats.map(f => ({
        title: f.feat_name || f.title || '',
        desc: f.notes || f.desc || ''
      }));
    } else if (parsed.feats && Array.isArray(parsed.feats)) {
      sDetails.feats = parsed.feats;
    }

    if (!sDetails.abilityScores) sDetails.abilityScores = {};
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(attr => {
      if (serverDbChar[attr] !== undefined && serverDbChar[attr] !== null) {
        sDetails.abilityScores[attr] = serverDbChar[attr];
      }
    });
    if (serverDbChar.level) {
      sDetails.level = serverDbChar.level;
    }
    if (serverDbChar.hp !== undefined && serverDbChar.hp !== null) {
      sDetails.currentHp = serverDbChar.hp;
      sDetails.maxHp = serverDbChar.max_hp || serverDbChar.hp;
    }
    if (serverDbChar.class_name) {
      sDetails.class = serverDbChar.class_name;
      sDetails.className = serverDbChar.class_name;
    }
    if (serverDbChar.race) {
      sDetails.race = serverDbChar.race;
    }

    currentChar = {
      id: serverDbChar.character_id || ('char_' + serverDbChar.id),
      name: serverDbChar.character_name,
      race: serverDbChar.race || 'Human',
      class: serverDbChar.class_name || 'Paladin',
      classKey: parsed.classKey || (serverDbChar.class_name || 'paladin').toLowerCase(),
      level: serverDbChar.level || 1,
      hp: serverDbChar.hp !== null && serverDbChar.hp !== undefined ? serverDbChar.hp : (sDetails.currentHp || 12),
      maxHp: serverDbChar.max_hp !== null && serverDbChar.max_hp !== undefined ? serverDbChar.max_hp : (sDetails.maxHp || 12),
      hitDie: serverDbChar.hit_die || sDetails.hitDie || 'd10',
      active: true,
      sheetData: sDetails
    };

    const existingIdx = chars.findIndex(c => c.id === currentChar.id || c.name === currentChar.name);
    if (existingIdx !== -1) {
      chars[existingIdx] = currentChar;
    } else {
      chars.unshift(currentChar);
    }
    saveCharacters(chars);
  }

  const cookieActiveCharId = getCookie('pf_active_char_id');
  const cookieActiveCharName = getCookie('pf_active_char_name');

  if (!currentChar && charId) {
    currentChar = chars.find(c => c.id === charId || c.name === charNameParam);
  }
  if (!currentChar && charNameParam) {
    currentChar = chars.find(c => c.name === charNameParam);
  }
  if (!currentChar && cookieActiveCharId) {
    currentChar = chars.find(c => c.id === cookieActiveCharId);
  }
  if (!currentChar && cookieActiveCharName) {
    currentChar = chars.find(c => c.name === cookieActiveCharName);
  }
  if (!currentChar && chars.length > 0) {
    currentChar = chars.find(c => c.active) || chars[0];
  }

  const shouldLoadExample = chars.length === 0 && !charId && !charNameParam && !isNewRequest && !cookieActiveCharId && !cookieActiveCharName;
  const isNewSheet = !currentChar || (!charId && !charNameParam && !cookieActiveCharId && !cookieActiveCharName);
  if (!currentChar) {
    currentChar = {
      id: charId || ('char_' + Date.now()),
      name: '',
      race: 'Human',
      class: 'Paladin',
      classKey: 'paladin',
      level: 1,
      hp: 12,
      maxHp: 12,
      hitDie: 'd10',
      active: true,
      sheetData: {}
    };
  }

  if (currentChar && currentChar.name === 'Valiant Adventurer') {
    currentChar.name = '';
  }

  let sData = currentChar.sheetData || {};
  if (sData.player === 'Valiant Adventurer' || isNewSheet) {
    sData.player = '';
  }
  if (isNewSheet) {
    currentChar.name = '';
  }

  sData.deity = sData.deity || currentChar.basic?.['in-deity'] || '';
  sData.homeland = sData.homeland || currentChar.basic?.['in-homeland'] || '';

  if (Array.isArray(currentChar.multiclass) && currentChar.multiclass.length > 0) {
    multiclassState = currentChar.multiclass;
  } else if (Array.isArray(sData.multiclass) && sData.multiclass.length > 0) {
    multiclassState = sData.multiclass;
  } else if (currentChar.dynamic && Array.isArray(currentChar.dynamic.classes) && currentChar.dynamic.classes.length > 1) {
    multiclassState = currentChar.dynamic.classes.slice(1).map(c => ({
      class: c.class || c.name.toLowerCase(),
      name: c.name || c.class,
      level: c.level || 1,
      hitDie: c.hitDie || 'd8',
      skillRanks: c.skillRanks || 2
    }));
  }

  const topNameEl = document.getElementById('topCharNameDisplay');
  if (topNameEl) topNameEl.textContent = currentChar.name || '';

  function calcMod(score) {
    score = parseInt(score, 10);
    if (isNaN(score)) score = 10;
    return Math.floor((score - 10) / 2);
  }

  function formatMod(val) {
    val = parseInt(val, 10);
    if (isNaN(val)) val = 0;
    return val >= 0 ? '+' + val : '' + val;
  }

  function normalizeAlignment(raw) {
    if (!raw) return 'LG';
    const u = String(raw).toUpperCase().trim();
    if (u === 'LG' || u.includes('(LG)') || (u.includes('LAWFUL') && u.includes('GOOD'))) return 'LG';
    if (u === 'NG' || u.includes('(NG)') || (u.includes('NEUTRAL') && u.includes('GOOD'))) return 'NG';
    if (u === 'CG' || u.includes('(CG)') || (u.includes('CHAOTIC') && u.includes('GOOD'))) return 'CG';
    if (u === 'LN' || u.includes('(LN)') || (u.includes('LAWFUL') && u.includes('NEUTRAL'))) return 'LN';
    if (u === 'CN' || u === 'NC' || u.includes('(CN)') || u.includes('(NC)') || (u.includes('CHAOTIC') && u.includes('NEUTRAL'))) return 'CN';
    if (u === 'LE' || u.includes('(LE)') || (u.includes('LAWFUL') && u.includes('EVIL'))) return 'LE';
    if (u === 'NE' || u.includes('(NE)') || (u.includes('NEUTRAL') && u.includes('EVIL'))) return 'NE';
    if (u === 'CE' || u.includes('(CE)') || (u.includes('CHAOTIC') && u.includes('EVIL'))) return 'CE';
    if (u === 'N' || u.includes('(N)') || u.includes('TRUE NEUTRAL') || u === 'NEUTRAL') return 'N';
    return 'LG';
  }

  function cleanText(val) {
    if (!val) return '';
    return String(val).replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();
  }

  document.getElementById('sheetCharName').value = (!isNewSheet && currentChar.name) ? currentChar.name : '';
  document.getElementById('sheetLevelInput').value = currentChar.level || 1;
  document.getElementById('sheetClassSelect').value = currentChar.classKey || 'paladin';
  document.getElementById('sheetAlignmentSelect').value = normalizeAlignment(sData.alignment || 'LG');
  document.getElementById('sheetPlayerName').value = (!isNewSheet && sData.player) ? sData.player : '';
  document.getElementById('sheetRaceInput').value = cleanText(currentChar.race) || 'Human';
  document.getElementById('sheetDeityInput').value = (!isNewSheet && sData.deity) ? sData.deity : '';
  document.getElementById('sheetHomelandInput').value = (!isNewSheet && sData.homeland) ? sData.homeland : '';
  document.getElementById('sheetSizeSelect').value = sData.size || 'Medium';
  const cookieGender = getCookie('pf_active_gender');
  document.getElementById('sheetGenderInput').value = (sData.gender === 'Female' || cookieGender === 'Female') ? 'Female' : 'Male';
  document.getElementById('sheetAgeInput').value = sData.age || '25';
  document.getElementById('sheetHeightInput').value = sData.height || '6 ft. 1 in.';
  document.getElementById('sheetWeightInput').value = sData.weight || '';
  document.getElementById('sheetEyesHairInput').value = sData.eyesHair || 'Brown / Hazel';

  document.getElementById('sheetCurrentHp').value = sData.currentHp !== undefined ? sData.currentHp : (currentChar.hp || 12);
  document.getElementById('sheetDrInput').value = sData.dr || '';
  document.getElementById('sheetNonlethalInput').value = sData.nonlethal || '';
  document.getElementById('sheetSpeedBase').value = sData.speedBase || 30;
  document.getElementById('sheetSpeedArmor').value = sData.speedArmor || 20;
  document.getElementById('sheetSpeedFly').value = sData.speedFly || '';
  document.getElementById('sheetSpeedSwim').value = sData.speedSwim || '';
  document.getElementById('sheetSpeedClimb').value = sData.speedClimb || '';
  document.getElementById('sheetSpeedBurrow').value = sData.speedBurrow || '';
  document.getElementById('sheetInitMisc').value = sData.initMisc || 0;

  const hpExtraElInit = document.getElementById('sheetHpExtraMisc');
  if (hpExtraElInit) {
    const savedExtra = sData.hpExtraMisc !== undefined ? sData.hpExtraMisc : (parseInt(hpExtraElInit.value, 10) || 0);
    hpExtraElInit.value = savedExtra;
    sData.hpExtraMisc = savedExtra;
  }

  let allTraitsDatabase = [];
  let isTraitsDbLoading = false;
  let activeEditingSlot = null;

  async function getTraitsDatabase() {
    if (allTraitsDatabase && allTraitsDatabase.length > 0) return allTraitsDatabase;
    if (isTraitsDbLoading) return [];
    isTraitsDbLoading = true;
    try {
      const res = await fetch('/data/traits.json');
      if (res.ok) {
        allTraitsDatabase = await res.json();
      }
    } catch (e) {
      console.warn('Could not load traits.json:', e);
    } finally {
      isTraitsDbLoading = false;
    }
    return allTraitsDatabase || [];
  }

  function updateTraitSlotUI(slotKey, name, desc, category, url) {
    const cleanName = (name && name !== '-') ? String(name).trim() : '';
    const cleanDesc = (desc !== undefined && desc !== null) ? String(desc).trim() : '';
    const cleanCat = category ? String(category).trim() : '';
    const cleanUrl = url || (cleanName ? `https://www.d20pfsrd.com/?s=${encodeURIComponent(cleanName)}` : '');

    const nameInp = document.getElementById(`sheetTraitName_${slotKey}`);
    const descInp = document.getElementById(`sheetTraitDesc_${slotKey}`);
    const catInp = document.getElementById(`sheetTraitCatInput_${slotKey}`);
    const urlInp = document.getElementById(`sheetTraitUrl_${slotKey}`);

    if (nameInp) nameInp.value = cleanName;
    if (descInp) descInp.value = cleanDesc;
    if (catInp) catInp.value = cleanCat;
    if (urlInp) urlInp.value = cleanUrl;

    const displayEl = document.getElementById(`sheetTraitDisplay_${slotKey}`);
    const descTextEl = document.getElementById(`sheetTraitDescText_${slotKey}`);
    const linkEl = document.getElementById(`sheetTraitLink_${slotKey}`);
    const catEl = document.getElementById(`sheetTraitCat_${slotKey}`);
    const filledEl = document.getElementById(`sheetTraitFilled_${slotKey}`);
    const emptyEl = document.getElementById(`sheetTraitEmpty_${slotKey}`);

    if (cleanName) {
      if (displayEl) displayEl.textContent = cleanName;
      if (descTextEl) descTextEl.textContent = cleanDesc || '—';
      if (linkEl) {
        linkEl.href = cleanUrl;
        linkEl.classList.remove('d-none');
      }
      if (catEl) {
        if (cleanCat) {
          catEl.textContent = cleanCat;
          catEl.classList.remove('d-none');
        } else {
          catEl.classList.add('d-none');
        }
      }
      if (filledEl) filledEl.classList.remove('d-none');
      if (emptyEl) emptyEl.classList.add('d-none');
    } else {
      if (displayEl) displayEl.textContent = '';
      if (descTextEl) descTextEl.textContent = '';
      if (linkEl) linkEl.classList.add('d-none');
      if (catEl) catEl.classList.add('d-none');
      if (filledEl) filledEl.classList.add('d-none');
      if (emptyEl) emptyEl.classList.remove('d-none');
    }
  }

  function renderCustomTraits() {
    const container = document.getElementById('customTraitsContainer');
    if (!container) return;
    container.innerHTML = '';
    const customList = (sData.traits && Array.isArray(sData.traits.custom)) ? sData.traits.custom : [];
    customList.forEach((t, idx) => {
      const cName = t.name ? t.name.trim() : '';
      if (!cName) return;
      const cDesc = t.desc || '';
      const cCat = t.category || '';
      const cUrl = t.source_url || (cName ? `https://www.d20pfsrd.com/?s=${encodeURIComponent(cName)}` : '');

      const div = document.createElement('div');
      div.className = 'p-2 rounded border bg-body trait-slot-card position-relative';
      div.style.borderLeft = '3px solid rgba(115, 103, 240, 0.5) !important';
      div.innerHTML = `
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
          <div class="d-flex align-items-center gap-2 flex-grow-1 min-w-0">
            <span class="badge bg-label-primary font-monospace py-1 px-2 flex-shrink-0">Ekstra Trait</span>
            <div class="trait-filled-block flex-grow-1 min-w-0">
              <div class="d-flex align-items-center gap-1 flex-wrap">
                <span class="fw-bold text-heading small text-truncate">${escapeHtml(cName)}</span>
                ${cCat ? `<span class="badge bg-label-secondary font-monospace py-0 px-1 text-xs" style="font-size:0.65rem;">${escapeHtml(cCat)}</span>` : ''}
                ${cUrl ? `<a href="${escapeHtml(cUrl)}" target="_blank" class="text-body-secondary text-hover-primary small" title="View source"><i class="icon-base ti tabler-external-link" style="font-size:0.8rem;"></i></a>` : ''}
              </div>
              <small class="text-body-secondary d-block trait-description">${escapeHtml(cDesc || '—')}</small>
            </div>
          </div>
          <div class="d-flex align-items-center gap-1 flex-shrink-0">
            <button type="button" class="btn btn-icon btn-text-primary btn-xs btn-edit-custom-trait" data-index="${idx}" title="Edit">
              <i class="icon-base ti tabler-pencil"></i>
            </button>
            <button type="button" class="btn btn-icon btn-text-danger btn-xs btn-del-custom-trait" data-index="${idx}" title="Sil">
              <i class="icon-base ti tabler-trash"></i>
            </button>
          </div>
        </div>
      `;
      container.appendChild(div);
    });

    container.querySelectorAll('.btn-edit-custom-trait').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const index = parseInt(btn.getAttribute('data-index'), 10);
        openTraitModal(`custom_${index}`);
      };
    });

    container.querySelectorAll('.btn-del-custom-trait').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const index = parseInt(btn.getAttribute('data-index'), 10);
        deleteCustomTrait(index);
      };
    });
  }

  function deleteTraitSlot(slotKey) {
    if (!slotKey) return;
    updateTraitSlotUI(slotKey, '', '', '', '');
    if (!sData.traits) sData.traits = {};
    sData.traits[slotKey] = { name: '', desc: '', category: '', source_url: '' };
    triggerAutoSave();
    showToast(i18n.toast_trait_deleted || 'Trait silindi.', 'info');
  }

  function deleteCustomTrait(index) {
    if (!sData.traits || !Array.isArray(sData.traits.custom)) return;
    sData.traits.custom.splice(index, 1);
    renderCustomTraits();
    triggerAutoSave();
    showToast(i18n.toast_trait_deleted || 'Ekstra trait silindi.', 'info');
  }

  function populateTraitsFromData(traits) {
    const traitsInit = traits || {};
    ['uye', 'kidemli', 'uzman'].forEach(r => {
      const tData = traitsInit[r] || {};
      const cleanName = (tData.name && tData.name !== '-') ? tData.name.trim() : '';
      const cleanDesc = tData.desc || '';
      const cleanCat = tData.category || '';
      const cleanUrl = tData.source_url || tData.url || (cleanName ? `https://www.d20pfsrd.com/?s=${encodeURIComponent(cleanName)}` : '');
      updateTraitSlotUI(r, cleanName, cleanDesc, cleanCat, cleanUrl);
    });
    renderCustomTraits();
  }

  function openTraitModal(slotKey) {
    activeEditingSlot = slotKey;
    getTraitsDatabase(); // preload

    const titleEl = document.getElementById('modalTraitTitle');
    const badgeEl = document.getElementById('modalTraitSlotBadge');
    const nameInp = document.getElementById('modalTraitName');
    const catInp = document.getElementById('modalTraitCategory');
    const descInp = document.getElementById('modalTraitDesc');
    const urlInp = document.getElementById('modalTraitUrl');
    const searchInp = document.getElementById('modalTraitSearch');
    const resultsContainer = document.getElementById('modalTraitSearchResults');
    const delBtn = document.getElementById('btnModalDeleteTrait');

    if (searchInp) searchInp.value = '';
    if (resultsContainer) {
      resultsContainer.innerHTML = '';
      resultsContainer.classList.add('d-none');
    }

    let curName = '', curCat = '', curDesc = '', curUrl = '', slotLabel = '';

    if (slotKey === 'uye') {
      slotLabel = 'Slot 1 • Member';
      curName = document.getElementById('sheetTraitName_uye')?.value || '';
      curDesc = document.getElementById('sheetTraitDesc_uye')?.value || '';
      curCat = document.getElementById('sheetTraitCatInput_uye')?.value || '';
      curUrl = document.getElementById('sheetTraitUrl_uye')?.value || '';
    } else if (slotKey === 'kidemli') {
      slotLabel = 'Slot 2 • Senior';
      curName = document.getElementById('sheetTraitName_kidemli')?.value || '';
      curDesc = document.getElementById('sheetTraitDesc_kidemli')?.value || '';
      curCat = document.getElementById('sheetTraitCatInput_kidemli')?.value || '';
      curUrl = document.getElementById('sheetTraitUrl_kidemli')?.value || '';
    } else if (slotKey === 'uzman') {
      slotLabel = 'Slot 3 • Expert';
      curName = document.getElementById('sheetTraitName_uzman')?.value || '';
      curDesc = document.getElementById('sheetTraitDesc_uzman')?.value || '';
      curCat = document.getElementById('sheetTraitCatInput_uzman')?.value || '';
      curUrl = document.getElementById('sheetTraitUrl_uzman')?.value || '';
    } else if (slotKey === 'new_custom') {
      slotLabel = 'New Extra Trait';
    } else if (slotKey.startsWith('custom_')) {
      const idx = parseInt(slotKey.replace('custom_', ''), 10);
      slotLabel = `Extra Trait #${idx + 1}`;
      const item = (sData.traits && sData.traits.custom) ? sData.traits.custom[idx] : null;
      if (item) {
        curName = item.name || '';
        curDesc = item.desc || '';
        curCat = item.category || '';
        curUrl = item.source_url || '';
      }
    }

    if (titleEl) titleEl.textContent = curName ? 'Edit Trait' : 'Select / Enter Trait';
    if (badgeEl) badgeEl.textContent = slotLabel;
    if (nameInp) nameInp.value = curName;
    if (catInp) catInp.value = curCat;
    if (descInp) descInp.value = curDesc;
    if (urlInp) urlInp.value = curUrl;

    if (delBtn) {
      if (curName || slotKey.startsWith('custom_')) {
        delBtn.classList.remove('d-none');
      } else {
        delBtn.classList.add('d-none');
      }
    }

    const modalEl = document.getElementById('modalTrait');
    if (modalEl && window.bootstrap) {
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.show();
      setTimeout(() => {
        if (searchInp) searchInp.focus();
      }, 350);
    }
  }

  function setupTraitEvents() {
    // 1. Edit & delete buttons on the 3 slots
    ['uye', 'kidemli', 'uzman'].forEach(r => {
      const card = document.getElementById(`sheetTraitCard_${r}`);
      const editBtn = card?.querySelector('.btn-edit-trait');
      const delBtn = card?.querySelector('.btn-del-trait');
      const emptyBlock = document.getElementById(`sheetTraitEmpty_${r}`);

      if (editBtn) {
        editBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          openTraitModal(r);
        });
      }
      if (delBtn) {
        delBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          deleteTraitSlot(r);
        });
      }
      if (emptyBlock) {
        emptyBlock.addEventListener('click', () => {
          openTraitModal(r);
        });
      }
    });

    // 2. Add trait button
    const btnAddTrait = document.getElementById('btnAddTraitRow');
    if (btnAddTrait) {
      btnAddTrait.addEventListener('click', () => {
        let targetSlot = null;
        for (const s of ['uye', 'kidemli', 'uzman']) {
          const nameVal = document.getElementById(`sheetTraitName_${s}`)?.value?.trim();
          if (!nameVal) {
            targetSlot = s;
            break;
          }
        }
        if (targetSlot) {
          openTraitModal(targetSlot);
        } else {
          openTraitModal('new_custom');
        }
      });
    }

    // 3. Search input in modal
    const searchInp = document.getElementById('modalTraitSearch');
    const searchResults = document.getElementById('modalTraitSearchResults');
    const clearSearchBtn = document.getElementById('btnClearTraitSearch');

    if (searchInp && searchResults) {
      let searchTimeout = null;
      searchInp.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(async () => {
          const query = searchInp.value.trim().toLowerCase();
          if (!query || query.length < 2) {
            searchResults.innerHTML = '';
            searchResults.classList.add('d-none');
            return;
          }
          const db = await getTraitsDatabase();
          const matches = db.filter(t => t.name && t.name.toLowerCase().includes(query)).slice(0, 20);

          if (matches.length === 0) {
            searchResults.innerHTML = `<div class="p-2 text-body-secondary small fst-italic">No results found ("${escapeHtml(query)}").</div>`;
            searchResults.classList.remove('d-none');
            return;
          }

          searchResults.innerHTML = matches.map(t => {
            const snippet = (t.content || '').replace(/\n+/g, ' ').slice(0, 100);
            return `
              <div class="trait-search-item" data-id="${t.id}">
                <div class="d-flex align-items-center justify-content-between">
                  <strong class="text-heading small">${escapeHtml(t.name)}</strong>
                  ${t.category ? `<span class="badge bg-label-info font-monospace py-0 px-1" style="font-size:0.62rem;">${escapeHtml(t.category)}</span>` : ''}
                </div>
                ${snippet ? `<small class="text-body-secondary d-block" style="font-size:0.68rem;">${escapeHtml(snippet)}...</small>` : ''}
              </div>
            `;
          }).join('');

          searchResults.classList.remove('d-none');

          searchResults.querySelectorAll('.trait-search-item').forEach((itemEl, idx) => {
            itemEl.addEventListener('click', () => {
              const selectedTrait = matches[idx];
              if (!selectedTrait) return;
              document.getElementById('modalTraitName').value = selectedTrait.name || '';
              document.getElementById('modalTraitCategory').value = selectedTrait.category || '';
              document.getElementById('modalTraitDesc').value = selectedTrait.content || '';
              document.getElementById('modalTraitUrl').value = `https://www.d20pfsrd.com/?s=${encodeURIComponent(selectedTrait.name)}`;
              searchResults.classList.add('d-none');
              searchInp.value = selectedTrait.name;
            });
          });
        }, 150);
      });
    }

    if (clearSearchBtn && searchInp) {
      clearSearchBtn.addEventListener('click', () => {
        searchInp.value = '';
        if (searchResults) {
          searchResults.innerHTML = '';
          searchResults.classList.add('d-none');
        }
        searchInp.focus();
      });
    }

    const btnSaveTrait = document.getElementById('btnModalSaveTrait');
    if (btnSaveTrait) {
      btnSaveTrait.addEventListener('click', () => {
        const nameVal = document.getElementById('modalTraitName')?.value?.trim();
        const catVal = document.getElementById('modalTraitCategory')?.value?.trim();
        const descVal = document.getElementById('modalTraitDesc')?.value?.trim();
        const urlVal = document.getElementById('modalTraitUrl')?.value?.trim();

        if (!nameVal) {
          alert('Please enter a Trait Name or select a trait from the search box.');
          return;
        }

        if (['uye', 'kidemli', 'uzman'].includes(activeEditingSlot)) {
          updateTraitSlotUI(activeEditingSlot, nameVal, descVal, catVal, urlVal);
          if (!sData.traits) sData.traits = {};
          sData.traits[activeEditingSlot] = {
            name: nameVal,
            desc: descVal,
            category: catVal,
            source_url: urlVal
          };
        } else if (activeEditingSlot === 'new_custom') {
          if (!sData.traits) sData.traits = {};
          if (!Array.isArray(sData.traits.custom)) sData.traits.custom = [];
          sData.traits.custom.push({
            name: nameVal,
            desc: descVal,
            category: catVal,
            source_url: urlVal
          });
          renderCustomTraits();
        } else if (activeEditingSlot && activeEditingSlot.startsWith('custom_')) {
          const idx = parseInt(activeEditingSlot.replace('custom_', ''), 10);
          if (!sData.traits) sData.traits = {};
          if (!Array.isArray(sData.traits.custom)) sData.traits.custom = [];
          sData.traits.custom[idx] = {
            name: nameVal,
            desc: descVal,
            category: catVal,
            source_url: urlVal
          };
          renderCustomTraits();
        }

        triggerAutoSave();
        showToast(i18n.toast_trait_saved || 'Trait kaydedildi!', 'success');

        const modalEl = document.getElementById('modalTrait');
        if (modalEl && window.bootstrap) {
          const modal = bootstrap.Modal.getInstance(modalEl);
          if (modal) modal.hide();
        }
      });
    }

    const btnDelTrait = document.getElementById('btnModalDeleteTrait');
    if (btnDelTrait) {
      btnDelTrait.addEventListener('click', () => {
        if (['uye', 'kidemli', 'uzman'].includes(activeEditingSlot)) {
          deleteTraitSlot(activeEditingSlot);
        } else if (activeEditingSlot && activeEditingSlot.startsWith('custom_')) {
          const idx = parseInt(activeEditingSlot.replace('custom_', ''), 10);
          deleteCustomTrait(idx);
        }

        const modalEl = document.getElementById('modalTrait');
        if (modalEl && window.bootstrap) {
          const modal = bootstrap.Modal.getInstance(modalEl);
          if (modal) modal.hide();
        }
      });
    }
  }

  populateTraitsFromData(sData.traits);

  const defaultScores = { str: 16, dex: 12, con: 14, int: 10, wis: 12, cha: 14 };
  const abScores = sData.abilityScores || defaultScores;
  ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(k => {
    const input = document.getElementById(`score_${k}`);
    if (input) input.value = abScores[k] !== undefined ? abScores[k] : defaultScores[k];
  });

  document.getElementById('sheetAcNatural').value = sData.acNatural || 0;
  document.getElementById('sheetAcDeflect').value = sData.acDeflect || 0;
  const initAcMiscEl = document.getElementById('sheetAcMisc');
  if (initAcMiscEl) initAcMiscEl.value = sData.acMisc || 0;

  ['fort', 'ref', 'will'].forEach(k => {
    const baseInp = document.getElementById(`saveBase_${k}`);
    if (baseInp && sData[`saveBase_${k}`] !== undefined) baseInp.value = sData[`saveBase_${k}`];
    const abInp = document.getElementById(`saveAbility_${k}`);
    if (abInp) {
      if (sData[`saveAbility_${k}`] !== undefined) {
        abInp.value = sData[`saveAbility_${k}`];
      } else {
        const fallbackMod = (k === 'fort') ? calcMod(abScores.con) : ((k === 'ref') ? calcMod(abScores.dex) : calcMod(abScores.wis));
        abInp.value = fallbackMod;
      }
    }
    const magicInp = document.getElementById(`saveMagic_${k}`);
    if (magicInp) magicInp.value = sData[`saveMagic_${k}`] !== undefined ? sData[`saveMagic_${k}`] : 0;
    const miscInp = document.getElementById(`saveMisc_${k}`);
    if (miscInp) miscInp.value = sData[`saveMisc_${k}`] !== undefined ? sData[`saveMisc_${k}`] : 0;
  });
  const saveCondEl = document.getElementById('sheetSaveConditional');
  if (saveCondEl) saveCondEl.value = sData.saveConditional || '';
  document.getElementById('sheetSrInput').value = sData.sr || '';

  document.getElementById('sheetMoneyCp').value = sData.moneyCp !== undefined ? sData.moneyCp : 15;
  document.getElementById('sheetMoneySp').value = sData.moneySp !== undefined ? sData.moneySp : 48;
  document.getElementById('sheetMoneyGp').value = sData.moneyGp !== undefined ? sData.moneyGp : 120;
  document.getElementById('sheetMoneyPp').value = sData.moneyPp !== undefined ? sData.moneyPp : 5;

  document.getElementById('sheetSkillConditional').value = sData.skillConditional || '';
  document.getElementById('sheetLanguages').value = sData.languages || 'Common';

  const defaultCastingStat = getCastingStatForClass(currentChar.classKey || document.getElementById('sheetClassSelect')?.value);
  document.getElementById('sheetCastingStat').value = sData.castingStat || defaultCastingStat;
  document.getElementById('sheetSpellNotes').value = sData.spellNotes || '';

  function createWeaponRowHtml(idx, w = {}) {
    const isAlchemist = (currentChar.classKey || document.getElementById('sheetClassSelect')?.value || '').toLowerCase() === 'alchemist';
    let defaultName = '';
    let defaultAtkType = 'melee';
    let defaultType = '';
    let defaultRange = '—';
    let defaultBaseDie = '1d8';
    let defaultEnh = 0;
    let defaultCritRange = '20';
    let defaultCritMult = 2;
    let defaultAmmo = '';

    if (idx === 1 && isAlchemist) {
      defaultName = 'Bomb';
      defaultAtkType = 'ranged';
      defaultType = 'Fire';
      defaultRange = '20 ft.';
      const curLvl = parseInt(document.getElementById('sheetLevelInput')?.value, 10) || currentChar.level || 1;
      defaultBaseDie = getBombDamageDie(curLvl);
      const intScore = parseInt(document.getElementById('score_int')?.value, 10) || 10;
      defaultAmmo = `${Math.max(1, curLvl + calcMod(intScore))}/day`;
    } else if (idx === 1) {
      defaultName = 'Longsword';
      defaultAtkType = 'melee';
      defaultType = 'Slashing';
      defaultRange = '—';
      defaultBaseDie = '1d8';
      defaultEnh = 0;
      defaultCritRange = '19-20';
      defaultCritMult = 2;
    }

    const name = w.name !== undefined ? w.name : defaultName;
    const atkType = w.atkType || defaultAtkType;
    const type = w.type !== undefined ? w.type : defaultType;
    const range = w.range !== undefined ? w.range : defaultRange;
    const baseDie = w.baseDie || defaultBaseDie;
    const enh = w.enh !== undefined ? w.enh : defaultEnh;
    const miscAtk = w.miscAtk !== undefined ? w.miscAtk : 0;
    const miscDmg = w.miscDmg !== undefined ? w.miscDmg : 0;
    const critRange = w.critRange || defaultCritRange;
    const critMult = w.critMult !== undefined ? w.critMult : defaultCritMult;
    const ammo = w.ammo !== undefined ? w.ammo : defaultAmmo;

    return `
      <div class="pf-weapon-block weapon-row" data-idx="${idx}">
        <div class="row g-2 align-items-center">
          <div class="col-12 col-md-4">
            <label class="form-label small text-body-secondary fw-semibold mb-0" style="font-size: 0.68rem;">${i18n.weaponName} (${i18n.weapon} ${idx})</label>
            <input type="text" class="form-control form-control-sm pf-box-input text-start px-2 wp-name" placeholder="e.g. Dagger, Light Crossbow" value="${escapeHtml(name)}" />
          </div>
          <div class="col-6 col-md-3">
            <label class="form-label small text-body-secondary fw-semibold mb-0" style="font-size: 0.68rem;">${i18n.attackType}</label>
            <select class="form-select form-select-sm pf-box-input wp-atk-type">
              <option value="melee" ${atkType === 'melee' ? 'selected' : ''}>Melee (STR)</option>
              <option value="ranged" ${atkType === 'ranged' ? 'selected' : ''}>Ranged (DEX)</option>
            </select>
          </div>
          <div class="col-6 col-md-2">
            <label class="form-label small text-body-secondary fw-semibold mb-0" style="font-size: 0.68rem;">${i18n.damageType}</label>
            <input type="text" class="form-control form-control-sm pf-box-input wp-type" placeholder="S / P / B" value="${escapeHtml(type)}" />
          </div>
          <div class="col-8 col-md-2">
            <label class="form-label small text-body-secondary fw-semibold mb-0" style="font-size: 0.68rem;">${i18n.range}</label>
            <input type="text" class="form-control form-control-sm pf-box-input wp-range" placeholder="—" value="${escapeHtml(range)}" />
          </div>
          <div class="col-4 col-md-1 d-flex align-items-end justify-content-end">
            <button type="button" class="btn btn-icon btn-text-danger btn-xs btn-del-weapon" title="${i18n.deleteWeapon}">
              <i class="icon-base ti tabler-trash fs-5"></i>
            </button>
          </div>

          <div class="col-6 col-md-2 mt-1">
            <label class="form-label small text-body-secondary fw-semibold mb-0" style="font-size: 0.68rem;">${i18n.baseDie}</label>
            <input type="text" class="form-control form-control-sm pf-box-input font-monospace wp-base-die" placeholder="1d8" value="${escapeHtml(baseDie)}" />
          </div>
          <div class="col-3 col-md-1 mt-1">
            <label class="form-label small text-body-secondary fw-semibold mb-0 text-truncate" style="font-size: 0.68rem;" title="Enhancement Bonus">Ench(+)</label>
            <input type="number" class="form-control form-control-sm pf-box-input font-monospace wp-enh text-center px-1" min="0" max="5" value="${enh}" />
          </div>
          <div class="col-3 col-md-1 mt-1">
            <label class="form-label small text-body-secondary fw-semibold mb-0 text-truncate" style="font-size: 0.68rem;">Misc Atk</label>
            <input type="number" class="form-control form-control-sm pf-box-input font-monospace wp-misc-atk text-center px-1" value="${miscAtk}" />
          </div>
          <div class="col-3 col-md-1 mt-1">
            <label class="form-label small text-body-secondary fw-semibold mb-0 text-truncate" style="font-size: 0.68rem;">Misc Dmg</label>
            <input type="number" class="form-control form-control-sm pf-box-input font-monospace wp-misc-dmg text-center px-1" value="${miscDmg}" />
          </div>
          <div class="col-6 col-md-4 mt-1">
            <label class="form-label small text-body-secondary fw-semibold mb-0 d-flex align-items-center justify-content-between text-truncate" style="font-size: 0.68rem;">
              <span>${i18n.critRangeMult}</span>
              <span class="wp-feat-crit-indicator badge bg-label-info py-0 px-1 d-none" style="font-size: 0.58rem;">Imp. Crit</span>
            </label>
            <div class="d-flex align-items-center gap-1">
              <input type="text" class="form-control form-control-sm pf-box-input font-monospace wp-crit-range text-center px-1" style="width: 50%; min-width: 60px;" placeholder="20" title="Threat Range (e.g. 20, 19-20, 18-20)" value="${escapeHtml(critRange || '20')}" />
              <span class="text-body-secondary fw-bold px-1 user-select-none">/</span>
              <select class="form-select form-select-sm pf-box-input font-monospace wp-crit-mult text-center px-1" style="width: 50%; min-width: 60px;">
                <option value="2" ${critMult == 2 ? 'selected' : ''}>x2</option>
                <option value="3" ${critMult == 3 ? 'selected' : ''}>x3</option>
                <option value="4" ${critMult == 4 ? 'selected' : ''}>x4</option>
              </select>
            </div>
          </div>
          <div class="col-6 col-md-4 mt-1">
            <label class="form-label small text-body-secondary fw-semibold mb-0" style="font-size: 0.68rem;">${i18n.ammunition}</label>
            <input type="text" class="form-control form-control-sm pf-box-input wp-ammo" placeholder="—" value="${escapeHtml(ammo)}" />
          </div>

          <div class="col-12 col-md-4 mt-1">
            <label class="form-label small text-body-secondary fw-semibold mb-0" style="font-size: 0.68rem;">${i18n.attackBonusAuto}</label>
            <div class="pf-mod-box font-monospace fw-bold text-primary py-1 wp-atk-total" title="BAB + STR/DEX + Enhancement + Misc">+0</div>
            <small class="text-body-secondary font-monospace d-block mt-0" style="font-size: 0.62rem;"><span class="wp-atk-formula">BAB+STR+Enh</span></small>
          </div>
          <div class="col-12 col-md-4 mt-1">
            <label class="form-label small text-body-secondary fw-semibold mb-0" style="font-size: 0.68rem;">${i18n.damageAuto}</label>
            <div class="pf-box-input font-monospace fw-bold text-warning py-1 wp-dmg-total">1d8+0</div>
            <small class="text-body-secondary font-monospace d-block mt-0" style="font-size: 0.62rem;"><span class="wp-dmg-formula">Die+STR+Enh</span></small>
          </div>
          <div class="col-12 col-md-4 mt-1">
            <label class="form-label small text-body-secondary fw-semibold mb-0" style="font-size: 0.68rem;">${i18n.critDamageAuto}</label>
            <div class="pf-box-input font-monospace fw-bold text-danger py-1 wp-crit-dmg-total">2d8+0</div>
            <small class="text-body-secondary font-monospace d-block mt-0" style="font-size: 0.62rem;"><span class="wp-crit-dmg-formula">x2</span></small>
          </div>
        </div>
      </div>
    `;
  }

  function getBombDamageDie(level) {
    const lvl = Math.min(20, Math.max(1, parseInt(level, 10) || 1));
    const dice = Math.ceil(lvl / 2);
    return `${dice}d6`;
  }

  function syncAlchemistBomb(level, intMod) {
    const container = document.getElementById('weaponsContainer');
    if (!container) return;
    const lvl = Math.min(20, Math.max(1, parseInt(level, 10) || 1));
    const baseDie = getBombDamageDie(lvl);
    const ammoCount = Math.max(1, lvl + (intMod !== undefined ? intMod : 0));

    const rows = container.querySelectorAll('.weapon-row');
    let bombRow = null;
    rows.forEach(row => {
      const name = (row.querySelector('.wp-name')?.value || '').toLowerCase();
      if (name.includes('bomb') || name.includes('bomba')) {
        bombRow = row;
      }
    });

    if (bombRow) {
      const baseDieEl = bombRow.querySelector('.wp-base-die');
      if (baseDieEl) baseDieEl.value = baseDie;
      const ammoEl = bombRow.querySelector('.wp-ammo');
      if (ammoEl && (!ammoEl.value || ammoEl.value.includes('/day'))) {
        ammoEl.value = `${ammoCount}/day`;
      }
    } else {
      const bombData = {
        name: 'Bomb',
        atkType: 'ranged',
        type: 'Fire',
        range: '20 ft.',
        baseDie: baseDie,
        enh: 0,
        miscAtk: 0,
        critRange: '20',
        critMult: 2,
        ammo: `${ammoCount}/day`
      };
      container.insertAdjacentHTML('afterbegin', createWeaponRowHtml(1, bombData));
      attachWeaponEvents();
    }
  }

  function setupAlchemistWeapons(level, intMod) {
    syncAlchemistBomb(level, intMod);
  }

  function populateWeaponsFromData(weapons) {
    if (!weapons || !Array.isArray(weapons) || weapons.length === 0) return;
    const container = document.getElementById('weaponsContainer');
    if (!container) return;
    container.innerHTML = '';
    weapons.forEach((w, idx) => {
      container.insertAdjacentHTML('beforeend', createWeaponRowHtml(idx + 1, w));
    });
  }

  const _armorLookupMap = new Map();
  function findArmorByName(name) {
    if (!name || !pfData.armors || !Array.isArray(pfData.armors)) return null;
    if (_armorLookupMap.size === 0) {
      pfData.armors.forEach(a => {
        if (!a || !a.name) return;
        const raw = a.name.trim().toLowerCase();
        _armorLookupMap.set(raw, a);
        const clean = raw.replace(/,\s*/g, ' ');
        if (!_armorLookupMap.has(clean)) _armorLookupMap.set(clean, a);
      });
    }
    const q = String(name).trim().toLowerCase();
    let found = _armorLookupMap.get(q);
    if (found) return found;
    return _armorLookupMap.get(q.replace(/,\s*/g, ' ')) || null;
  }

  function isShieldItem(item) {
    if (!item) return false;
    if (item.bonus_type === 'shield') return true;
    if (item.is_shield === true) return true;
    const cat = (item.category || '').toLowerCase();
    if (cat.includes('shield')) return true;
    const name = (item.name || '').toLowerCase();
    if (name.includes('shield') || name.includes('buckler') || name.includes('klar') || name.includes('madu')) return true;
    return false;
  }

  function attachAcItemAutocomplete(tr) {
    const input = tr.querySelector('.ac-item-name');
    const dropdown = tr.querySelector('.ac-item-autocomplete');
    const typeSelect = tr.querySelector('.ac-item-type');
    const bonusInput = tr.querySelector('.ac-item-bonus');
    const penInput = tr.querySelector('.ac-item-pen');
    const wtInput = tr.querySelector('.ac-item-weight');
    if (!input || !dropdown) return;

    function doSearch() {
      const q = (input.value || '').trim().toLowerCase();
      if (!q || q.length < 1) {
        dropdown.style.display = 'none';
        dropdown.innerHTML = '';
        return;
      }

      const armors = pfData.armors || [];
      const qTokens = q.split(/\s+/).filter(Boolean);
      const matches = armors.filter(a => {
        const name = (a.name || '').toLowerCase();
        const cat = (a.category || '').toLowerCase();
        return qTokens.every(tok => name.includes(tok) || cat.includes(tok));
      }).slice(0, 15);

      if (matches.length === 0) {
        dropdown.innerHTML = '<div class="p-2 text-body-secondary small text-center font-monospace">No matching item found</div>';
        dropdown.style.display = 'block';
        return;
      }

      dropdown.innerHTML = '';
      matches.forEach(item => {
        const div = document.createElement('div');
        div.className = 'pf-armor-result-item d-flex align-items-center justify-content-between font-monospace p-1 rounded mb-1';
        div.style.cursor = 'pointer';
        div.style.transition = 'background-color 0.15s ease';

        const isShield = item.bonus_type === 'shield' || isShieldItem(item);
        const isDeflect = item.bonus_type === 'deflection';
        const isNat = item.bonus_type === 'natural';
        const isMisc = item.bonus_type === 'misc' || item.bonus_type === 'dodge';

        let icon = 'tabler-shield-filled';
        if (isShield) icon = 'tabler-shield';
        else if (isDeflect) icon = 'tabler-ring';
        else if (isNat) icon = 'tabler-sparkles';
        else if (isMisc) icon = 'tabler-gem';

        const typeLabel = item.bonus_type ? (item.bonus_type.charAt(0).toUpperCase() + item.bonus_type.slice(1)) : (isShield ? 'Shield' : 'Armor');
        const bonusStr = formatMod(item.bonus || 0);
        const maxDexStr = (item.max_dex !== null && item.max_dex !== undefined) ? `Max Dex +${item.max_dex}` : '';
        const penStr = (item.check_penalty !== 0 && item.check_penalty !== null) ? `ACP ${item.check_penalty}` : '';
        const wtStr = item.weight ? `${item.weight} lbs` : '0 lbs';

        div.innerHTML = `
          <div class="d-flex align-items-center gap-2 text-start">
            <i class="icon-base ti ${icon} text-warning fs-5"></i>
            <div>
              <span class="fw-bold text-heading d-block" style="font-size: 0.78rem;">${escapeHtml(item.name)}</span>
              <span class="badge bg-label-secondary py-0 px-1" style="font-size: 0.62rem;">${escapeHtml(item.category || typeLabel)}</span>
            </div>
          </div>
          <div class="text-end font-monospace" style="font-size: 0.7rem;">
            <div class="fw-bold text-primary">${bonusStr} ${typeLabel}</div>
            <div class="text-body-secondary" style="font-size: 0.62rem;">${[maxDexStr, penStr, wtStr].filter(Boolean).join(' | ')}</div>
          </div>
        `;

        div.onmouseenter = () => div.style.backgroundColor = 'rgba(226, 185, 111, 0.15)';
        div.onmouseleave = () => div.style.backgroundColor = 'transparent';

        div.onmousedown = function (e) {
          e.preventDefault();
          input.value = item.name;

          let targetType = item.bonus_type || (isShield ? 'shield' : 'armor');
          if (typeSelect) typeSelect.value = targetType;
          if (bonusInput) bonusInput.value = item.bonus !== undefined ? item.bonus : 0;
          if (penInput) penInput.value = item.check_penalty !== undefined ? item.check_penalty : 0;
          if (wtInput) wtInput.value = item.weight !== undefined ? item.weight : 0;

          if (item.max_dex !== null && item.max_dex !== undefined) {
            tr.setAttribute('data-max-dex', item.max_dex);
          } else {
            tr.removeAttribute('data-max-dex');
          }
          if (item.category) tr.setAttribute('data-category', item.category);

          const activeChk = tr.querySelector('.ac-item-active');
          if (activeChk && activeChk.checked && (targetType === 'armor' || targetType === 'shield')) {
            document.querySelectorAll('#acItemsTbody tr').forEach(otherTr => {
              if (otherTr !== tr) {
                const otherType = otherTr.querySelector('.ac-item-type')?.value || 'armor';
                if (otherType === targetType) {
                  const otherChk = otherTr.querySelector('.ac-item-active');
                  if (otherChk) otherChk.checked = false;
                }
              }
            });
          }

          dropdown.style.display = 'none';
          dropdown.innerHTML = '';

          recalculateAll();
          triggerAutoSave();
        };

        dropdown.appendChild(div);
      });
      dropdown.style.display = 'block';
    }

    input.addEventListener('input', doSearch);
    input.addEventListener('focus', () => {
      if (input.value.trim().length > 0) doSearch();
    });
    input.addEventListener('blur', () => {
      setTimeout(() => {
        dropdown.style.display = 'none';
      }, 200);
    });
  }

  function createAcItemRow(data = {}) {
    const tr = document.createElement('tr');
    const name = data.name || '';
    const type = (data.type || 'armor').toLowerCase();
    const bonus = data.bonus !== undefined && data.bonus !== null ? data.bonus : 0;
    const pen = data.pen !== undefined && data.pen !== null ? data.pen : 0;
    const weight = data.weight !== undefined && data.weight !== null ? data.weight : 0;
    const maxDex = data.maxDex !== undefined && data.maxDex !== null ? data.maxDex : (data.max_dex || '');
    const category = data.category || '';
    const isActive = data.is_active !== undefined ? !!data.is_active : (data.isActive !== undefined ? !!data.isActive : true);

    if (maxDex !== '') tr.setAttribute('data-max-dex', maxDex);
    if (category) tr.setAttribute('data-category', category);

    tr.className = isActive ? 'row-ac-active' : 'row-ac-inactive';

    tr.innerHTML = `
      <td class="p-1 text-center align-middle" style="width: 58px;">
        <div class="form-check form-switch d-flex justify-content-center m-0 p-0" title="Active / Equipped">
          <input type="checkbox" class="form-check-input ac-item-active m-0 cursor-pointer" ${isActive ? 'checked' : ''} style="width: 2.1rem; height: 1.15rem;" />
        </div>
      </td>
      <td class="position-relative p-1">
        <input type="text" class="form-control form-control-sm pf-box-input pf-input-compact text-start ac-item-name" placeholder="Item Name (e.g. Mithral Shirt)" value="${escapeHtml(name)}" autocomplete="off" />
        <div class="ac-item-autocomplete dropdown-menu shadow-lg pf-scroll p-1" style="display: none; position: absolute; top: 100%; left: 0; min-width: 280px; max-width: 360px; max-height: 240px; overflow-y: auto; z-index: 1050; background: #1b1c2d; border: 1px solid rgba(226, 185, 111, 0.35);"></div>
      </td>
      <td class="p-1">
        <select class="form-select form-select-sm pf-box-input pf-input-compact ac-item-type font-monospace p-1 text-center" style="font-size: 0.68rem;">
          <option value="armor" ${type === 'armor' ? 'selected' : ''}>Armor</option>
          <option value="shield" ${type === 'shield' ? 'selected' : ''}>Shield</option>
          <option value="deflection" ${type === 'deflection' ? 'selected' : ''}>Deflect</option>
          <option value="natural" ${type === 'natural' ? 'selected' : ''}>Natural</option>
          <option value="dodge" ${type === 'dodge' ? 'selected' : ''}>Dodge</option>
          <option value="misc" ${type === 'misc' ? 'selected' : ''}>Misc</option>
        </select>
      </td>
      <td class="p-1"><input type="number" class="form-control form-control-sm pf-box-input pf-input-compact text-center ac-item-bonus font-monospace" value="${bonus}" /></td>
      <td class="p-1"><input type="number" class="form-control form-control-sm pf-box-input pf-input-compact text-center ac-item-pen font-monospace" value="${pen}" /></td>
      <td class="p-1"><input type="number" class="form-control form-control-sm pf-box-input pf-input-compact text-center ac-item-weight font-monospace" value="${weight}" /></td>
      <td class="p-1"><button type="button" class="btn btn-icon btn-text-danger btn-xs btn-del-row" title="Delete Item"><i class="icon-base ti tabler-x"></i></button></td>
    `;

    attachAcItemAutocomplete(tr);
    return tr;
  }

  function renderEquippedArmorChips() {
    const container = document.getElementById('equippedArmorList');
    if (!container) return;
    container.innerHTML = '';
  }

  function equipArmor(item) {
    if (!item) return;
    const tbody = document.getElementById('acItemsTbody');
    if (!tbody) return;
    const isShield = item.bonus_type === 'shield' || isShieldItem(item);
    const targetType = item.bonus_type || (isShield ? 'shield' : 'armor');

    if (targetType === 'armor' || targetType === 'shield') {
      document.querySelectorAll('#acItemsTbody tr').forEach(otherTr => {
        const otherType = otherTr.querySelector('.ac-item-type')?.value || 'armor';
        if (otherType === targetType) {
          const otherChk = otherTr.querySelector('.ac-item-active');
          if (otherChk) otherChk.checked = false;
        }
      });
    }

    const tr = createAcItemRow({
      name: item.name,
      type: targetType,
      bonus: item.bonus || 0,
      pen: item.check_penalty || 0,
      weight: parseInt(item.weight, 10) || 0,
      maxDex: item.max_dex,
      category: item.category,
      is_active: true
    });
    tbody.appendChild(tr);
    attachDynamicRowEvents();
    recalculateAll();
    triggerAutoSave();
  }

  function setupArmorSearch() {

  }

  function populateAcItemsFromData(acItems) {
    const tbody = document.getElementById('acItemsTbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (Array.isArray(acItems) && acItems.length > 0) {
      let hasActiveArmor = false;
      let hasActiveShield = false;

      acItems.forEach(item => {
        const found = findArmorByName(item.name);
        const maxDex = item.max_dex !== undefined && item.max_dex !== null && item.max_dex !== ''
          ? item.max_dex
          : (found && found.max_dex !== undefined && found.max_dex !== null ? found.max_dex : '');
        const category = item.category || (found ? found.category : '');
        let type = item.type;
        if (!type) {
          if (found && found.bonus_type) {
            type = found.bonus_type;
          } else if (isShieldItem({ name: item.name, category })) {
            type = 'shield';
          } else {
            type = 'armor';
          }
        }

        let isActive = true;
        if (item.is_active !== undefined) {
          isActive = !!item.is_active;
        } else if (item.isActive !== undefined) {
          isActive = !!item.isActive;
        } else {

          if (type === 'armor') {
            isActive = !hasActiveArmor;
          } else if (type === 'shield') {
            isActive = !hasActiveShield;
          }
        }

        if (isActive) {
          if (type === 'armor') hasActiveArmor = true;
          if (type === 'shield') hasActiveShield = true;
        }

        const tr = createAcItemRow({
          name: item.name || '',
          type: type,
          bonus: item.bonus !== undefined ? item.bonus : 0,
          pen: item.pen !== undefined ? item.pen : 0,
          weight: item.weight !== undefined ? item.weight : 0,
          maxDex: maxDex,
          category: category,
          is_active: isActive
        });
        tbody.appendChild(tr);
      });
    }
    if (typeof attachDynamicRowEvents === 'function') {
      attachDynamicRowEvents();
    }
  }

  function findSaveItemByName(name) {
    if (!name) return null;
    const q = name.trim().toLowerCase();
    const catalog = (pfData && pfData.saveItems && Array.isArray(pfData.saveItems) && pfData.saveItems.length > 0)
      ? pfData.saveItems
      : PATHFINDER_SAVE_ITEMS;
    return catalog.find(a => (a.name || '').trim().toLowerCase() === q) || null;
  }

  function attachSaveItemAutocomplete(tr) {
    const input = tr.querySelector('.save-item-name');
    const dropdown = tr.querySelector('.save-item-autocomplete');
    const targetSelect = tr.querySelector('.save-item-target');
    const typeSelect = tr.querySelector('.save-item-type');
    const bonusInput = tr.querySelector('.save-item-bonus');
    const wtInput = tr.querySelector('.save-item-weight');

    if (!input || !dropdown) return;

    function doSearch() {
      const q = (input.value || '').trim().toLowerCase();
      if (!q || q.length < 1) {
        dropdown.style.display = 'none';
        dropdown.innerHTML = '';
        return;
      }

      const items = (pfData && pfData.saveItems && Array.isArray(pfData.saveItems) && pfData.saveItems.length > 0)
        ? pfData.saveItems
        : PATHFINDER_SAVE_ITEMS;

      const qTokens = q.split(/\s+/).filter(Boolean);
      const matches = items.filter(it => {
        const name = (it.name || '').toLowerCase();
        const desc = (it.desc || it.description || '').toLowerCase();
        const target = (it.target || '').toLowerCase();
        const type = (it.type || '').toLowerCase();
        return qTokens.every(tok => name.includes(tok) || desc.includes(tok) || target.includes(tok) || type.includes(tok));
      }).slice(0, 15);

      if (matches.length === 0) {
        dropdown.innerHTML = '<div class="p-2 text-body-secondary small text-center font-monospace">No matching protective item found</div>';
        dropdown.style.display = 'block';
        return;
      }

      dropdown.innerHTML = '';
      matches.forEach(item => {
        const div = document.createElement('div');
        div.className = 'pf-save-result-item d-flex align-items-center justify-content-between font-monospace p-1 rounded mb-1';
        div.style.cursor = 'pointer';
        div.style.transition = 'background-color 0.15s ease';

        const nameLower = (item.name || '').toLowerCase();
        let icon = 'tabler-shield-spark';
        if (nameLower.includes('cloak') || nameLower.includes('cape')) icon = 'tabler-hanger';
        else if (nameLower.includes('ring')) icon = 'tabler-ring';
        else if (nameLower.includes('vest') || nameLower.includes('shirt')) icon = 'tabler-shirt';
        else if (nameLower.includes('stone') || nameLower.includes('luck') || nameLower.includes('clover')) icon = 'tabler-sparkles';
        else if (nameLower.includes('periapt') || nameLower.includes('amulet') || nameLower.includes('medallion')) icon = 'tabler-medal';
        else if (nameLower.includes('boot')) icon = 'tabler-shoe';

        let targetBadgeClass = 'bg-label-primary';
        let targetLabel = 'All Saves';
        if (item.target === 'fort') {
          targetBadgeClass = 'bg-label-danger';
          targetLabel = 'Fortitude';
        } else if (item.target === 'ref') {
          targetBadgeClass = 'bg-label-success';
          targetLabel = 'Reflex';
        } else if (item.target === 'will') {
          targetBadgeClass = 'bg-label-info';
          targetLabel = 'Will';
        }

        const bonusStr = formatMod(item.bonus || 0);
        const typeStr = item.type ? (item.type.charAt(0).toUpperCase() + item.type.slice(1)) : 'Resistance';
        const wtStr = item.weight !== undefined ? `${item.weight} lbs` : '1 lbs';
        const slotStr = item.slot || '';

        div.innerHTML = `
          <div class="d-flex align-items-center gap-2 text-start">
            <i class="icon-base ti ${icon} text-warning fs-5"></i>
            <div>
              <span class="fw-bold text-heading d-block" style="font-size: 0.78rem;">${escapeHtml(item.name)}</span>
              <div class="d-flex align-items-center gap-1">
                <span class="badge ${targetBadgeClass} py-0 px-1" style="font-size: 0.62rem;">${targetLabel}</span>
                <span class="badge bg-label-secondary py-0 px-1" style="font-size: 0.62rem;">${typeStr}</span>
              </div>
            </div>
          </div>
          <div class="text-end font-monospace" style="font-size: 0.7rem;">
            <div class="fw-bold text-warning">${bonusStr} ${typeStr}</div>
            <div class="text-body-secondary" style="font-size: 0.62rem;">${[slotStr, wtStr].filter(Boolean).join(' | ')}</div>
          </div>
        `;

        div.onmouseenter = () => div.style.backgroundColor = 'rgba(226, 185, 111, 0.15)';
        div.onmouseleave = () => div.style.backgroundColor = 'transparent';

        div.onmousedown = function (e) {
          e.preventDefault();
          input.value = item.name;
          if (targetSelect) targetSelect.value = item.target || 'all';
          if (typeSelect) typeSelect.value = item.type || 'resistance';
          if (bonusInput) bonusInput.value = item.bonus !== undefined ? item.bonus : 1;
          if (wtInput) wtInput.value = item.weight !== undefined ? item.weight : 1;

          dropdown.style.display = 'none';
          dropdown.innerHTML = '';

          recalculateAll();
          triggerAutoSave();
        };

        dropdown.appendChild(div);
      });
      dropdown.style.display = 'block';
    }

    input.addEventListener('input', doSearch);
    input.addEventListener('focus', () => {
      if (input.value.trim().length > 0) doSearch();
    });
    input.addEventListener('blur', () => {
      setTimeout(() => {
        dropdown.style.display = 'none';
      }, 200);
    });
  }

  function createSaveItemRow(data = {}) {
    const tr = document.createElement('tr');
    const name = data.name || '';
    const target = (data.target || 'all').toLowerCase();
    const type = (data.type || 'resistance').toLowerCase();
    const bonus = data.bonus !== undefined && data.bonus !== null ? data.bonus : 1;
    const weight = data.weight !== undefined && data.weight !== null ? data.weight : 1;
    const isActive = data.is_active !== undefined ? !!data.is_active : (data.isActive !== undefined ? !!data.isActive : true);

    tr.className = isActive ? 'row-save-active' : 'row-save-inactive';

    tr.innerHTML = `
      <td class="p-1 text-center align-middle" style="width: 58px;">
        <div class="form-check form-switch d-flex justify-content-center m-0 p-0" title="Active / Equipped">
          <input type="checkbox" class="form-check-input save-item-active m-0 cursor-pointer" ${isActive ? 'checked' : ''} style="width: 2.1rem; height: 1.15rem;" />
        </div>
      </td>
      <td class="position-relative p-1">
        <input type="text" class="form-control form-control-sm pf-box-input pf-input-compact text-start save-item-name" placeholder="Item Name (e.g. Cloak of Resistance +2)" value="${escapeHtml(name)}" autocomplete="off" />
        <div class="save-item-autocomplete dropdown-menu shadow-lg pf-scroll p-1" style="display: none; position: absolute; top: 100%; left: 0; min-width: 290px; max-width: 380px; max-height: 240px; overflow-y: auto; z-index: 1050; background: #1b1c2d; border: 1px solid rgba(226, 185, 111, 0.35);"></div>
      </td>
      <td class="p-1">
        <select class="form-select form-select-sm pf-box-input pf-input-compact save-item-target font-monospace p-1 text-center" style="font-size: 0.68rem;">
          <option value="all" ${target === 'all' ? 'selected' : ''}>All Saves</option>
          <option value="fort" ${target === 'fort' ? 'selected' : ''}>Fortitude</option>
          <option value="ref" ${target === 'ref' ? 'selected' : ''}>Reflex</option>
          <option value="will" ${target === 'will' ? 'selected' : ''}>Will</option>
        </select>
      </td>
      <td class="p-1">
        <select class="form-select form-select-sm pf-box-input pf-input-compact save-item-type font-monospace p-1 text-center" style="font-size: 0.68rem;">
          <option value="resistance" ${type === 'resistance' ? 'selected' : ''}>Resistance</option>
          <option value="luck" ${type === 'luck' ? 'selected' : ''}>Luck</option>
          <option value="morale" ${type === 'morale' ? 'selected' : ''}>Morale</option>
          <option value="insight" ${type === 'insight' ? 'selected' : ''}>Insight</option>
          <option value="sacred" ${type === 'sacred' ? 'selected' : ''}>Sacred</option>
          <option value="misc" ${type === 'misc' ? 'selected' : ''}>Misc</option>
        </select>
      </td>
      <td class="p-1"><input type="number" class="form-control form-control-sm pf-box-input pf-input-compact text-center save-item-bonus font-monospace" value="${bonus}" /></td>
      <td class="p-1"><input type="number" class="form-control form-control-sm pf-box-input pf-input-compact text-center save-item-weight font-monospace" value="${weight}" /></td>
      <td class="p-1"><button type="button" class="btn btn-icon btn-text-danger btn-xs btn-del-save-row" title="Delete Item"><i class="icon-base ti tabler-x"></i></button></td>
    `;

    attachSaveItemAutocomplete(tr);
    return tr;
  }

  function equipSaveItem(item) {
    if (!item) return;
    const tbody = document.getElementById('saveItemsTbody');
    if (!tbody) return;

    const tr = createSaveItemRow({
      name: item.name,
      target: item.target || 'all',
      type: item.type || 'resistance',
      bonus: item.bonus || 1,
      weight: parseInt(item.weight, 10) || 1,
      is_active: true
    });
    tbody.appendChild(tr);
    attachDynamicRowEvents();
    recalculateAll();
    triggerAutoSave();
  }

  function populateSaveItemsFromData(saveItems) {
    const tbody = document.getElementById('saveItemsTbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (Array.isArray(saveItems) && saveItems.length > 0) {
      saveItems.forEach(item => {
        const tr = createSaveItemRow({
          name: item.name || '',
          target: item.target || 'all',
          type: item.type || 'resistance',
          bonus: item.bonus !== undefined ? item.bonus : 1,
          weight: item.weight !== undefined ? item.weight : 1,
          is_active: item.is_active !== undefined ? !!item.is_active : (item.isActive !== undefined ? !!item.isActive : true)
        });
        tbody.appendChild(tr);
      });
    }
    if (typeof attachDynamicRowEvents === 'function') {
      attachDynamicRowEvents();
    }
  }

  function populateGearFromData(gear) {
    if (!gear || !Array.isArray(gear) || gear.length === 0) return;
    const container = document.getElementById('gearItemsContainer');
    if (!container) return;
    container.innerHTML = '';
    gear.forEach(item => {
      const div = document.createElement('div');
      div.className = 'd-flex align-items-center gap-1 mb-1';
      div.innerHTML = `
        <input type="text" class="form-control form-control-sm pf-box-input pf-input-compact text-start gear-name" placeholder="Item Name" value="${escapeHtml(item.name || '')}" />
        <input type="number" class="form-control form-control-sm pf-box-input pf-input-compact text-center gear-wt font-monospace" style="width: 60px;" placeholder="Wt" value="${item.weight !== undefined ? item.weight : 0}" />
        <button type="button" class="btn btn-icon btn-text-danger btn-xs btn-del-gear"><i class="icon-base ti tabler-x"></i></button>
      `;
      container.appendChild(div);
    });
  }

  function populateFeatsFromData(feats) {
    const container = document.getElementById('featsContainer');
    if (!container) return;
    container.innerHTML = '';
    if (!feats || !Array.isArray(feats) || feats.length === 0) return;
    feats.forEach(f => {
      const title = typeof f === 'string' ? f : (f.title || f.feat_name || '');
      const desc = typeof f === 'string' ? '' : (f.desc || f.notes || '—');
      if (!title) return;
      const div = document.createElement('div');
      div.className = 'p-2 mb-1 rounded bg-body border d-flex justify-content-between align-items-center feat-item';
      div.innerHTML = `
        <div>
          <strong class="text-heading d-block small feat-title">${escapeHtml(title)}</strong>
          <small class="text-body-secondary feat-desc">${escapeHtml(desc)}</small>
        </div>
        <button type="button" class="btn btn-icon btn-text-danger btn-xs btn-del-feat"><i class="icon-base ti tabler-x"></i></button>
      `;
      container.appendChild(div);
    });
  }

  const REPEATABLE_CHOICE_SPECIALS = new Set([
    'discovery',
    'bonus feat',
    'rage power',
    'rogue talent',
    'mercy',
    'combat style feat',
    'order ability',
    'teamwork feat',
    'magus arcana',
    'revelation',
    'hex',
    'major hex',
    'grand hex',
    'bloodline feat',
    'bloodline spell',
    'bloodline power',
    'mystery spell',
    'deeds',
    'versatile performance'
  ]);

  function getSpecialScalingKey(title, badge) {
    if (!title || typeof title !== 'string') return null;
    if (badge && badge !== 'Class' && !badge.startsWith('Lvl ')) {
      return null;
    }
    const t = title.trim().toLowerCase();

    for (const rep of REPEATABLE_CHOICE_SPECIALS) {
      if (t === rep || t.startsWith(rep + ' ')) {
        return null;
      }
    }

    let m = t.match(/^(.+?)\s+(\+?\d+d\d+)$/i);
    if (m) return m[1].trim();

    m = t.match(/^(.+?)\s+(\d+\/day)$/i);
    if (m) return m[1].trim();

    m = t.match(/^(.+?)\s+(\+\d+)$/i);
    if (m) return m[1].trim();

    m = t.match(/^(.+?)\s+(\d+\/[—\-])$/);
    if (m) return m[1].trim();

    if (t.startsWith('slow fall ')) return 'slow fall';

    m = t.match(/^(.+?)\s+(i|ii|iii|iv|v|vi|vii|viii|ix|x)$/i);
    if (m) return m[1].trim();

    m = t.match(/^(.+?)\s+(\d+)$/i);
    if (m) return m[1].trim();

    return null;
  }

  function getSpecialPowerValue(title) {
    if (!title || typeof title !== 'string') return 0;
    let m = title.match(/(\d+)d\d+/i);
    if (m) return parseInt(m[1], 10);
    m = title.match(/(\d+)\/day/i);
    if (m) return parseInt(m[1], 10);
    m = title.match(/\+(\d+)/);
    if (m) return parseInt(m[1], 10);
    m = title.match(/(\d+)\/[—\-]/);
    if (m) return parseInt(m[1], 10);
    m = title.match(/(\d+)$/);
    if (m) return parseInt(m[1], 10);
    return 0;
  }

  function filterScalingSpecials(list) {
    if (!Array.isArray(list) || list.length === 0) return [];
    const highestMap = new Map();

    list.forEach((item, index) => {
      const key = getSpecialScalingKey(item.title, item.badge);
      if (key) {
        const lvl = parseInt((item.badge || '').replace(/\D+/g, ''), 10) || 0;
        const power = getSpecialPowerValue(item.title);
        const existing = highestMap.get(key);
        if (!existing || lvl > existing.lvl || (lvl === existing.lvl && (power > existing.power || index > existing.index))) {
          highestMap.set(key, { item, lvl, power, index });
        }
      }
    });

    return list.filter((item, index) => {
      const key = getSpecialScalingKey(item.title, item.badge);
      if (!key) return true;
      const highest = highestMap.get(key);
      return highest && highest.index === index;
    });
  }

  function getClassSpecialsList(classKey, level) {
    if (!classKey) return [];
    classKey = classKey.toLowerCase();

    if (classKey === 'omdura') {
      const specials = [];
      const invocAction = level >= 13 ? 'swift action' : (level >= 7 ? 'move action' : 'standard action');
      const destrDmg = 1 + Math.floor(level / 3);
      const healingFh = 1 + Math.floor(level / 3);
      const justiceAtk = 1 + Math.floor(level / 5);
      const justiceCrit = level >= 10 ? `, +${justiceAtk * 2} confirm crits` : '';
      const pierceBonus = 1 + Math.floor(level / 3);
      const protAc = 1 + Math.floor(level / 5);
      const protCrit = level >= 10 ? `, +${protAc * 2} vs crit confirm` : '';
      const purBonus = 1 + Math.floor(level / 5);
      const purCrit = level >= 10 ? `, +${purBonus * 2} vs curse/disease/poison` : '';
      const resilDr = 1 + Math.floor(level / 5);
      const resilType = level >= 10 ? 'alignment' : 'magic';
      const resistEnergy = 2 + 2 * Math.floor(level / 3);
      const smitingDesc = level >= 10 ? 'DR/magic, align & adamantine' : (level >= 6 ? 'DR/magic & align' : 'DR/magic');

      let invocHeader = `Invocations ${level} min/day (${invocAction}, 30-ft aura to allies)`;
      if (level >= 20) {
        invocHeader = `Invocations ${level} min/day + Greater Invocation (1 buff 24h at full bonus; ${invocAction}, 30 ft)`;
      } else if (level >= 11) {
        invocHeader = `Improved Invocations ${level} min/day (grant 2 buffs to allies, self gains 1 at half bonus; ${invocAction}, 30 ft)`;
      }

      specials.push({ badge: 'Invocation', title: invocHeader, desc: 'Omdura Signature Aura Feature' });
      specials.push({ badge: 'Buff', title: `Destruction: +${destrDmg} weapon damage`, desc: '+1 sacred bonus on weapon damage rolls, +1 per 3 omdura levels' });
      specials.push({ badge: 'Buff', title: `Healing: Fast Healing ${healingFh}`, desc: `Allies recover ${healingFh} HP each round up to maximum HP` });
      specials.push({ badge: 'Buff', title: `Justice: +${justiceAtk} attack rolls${justiceCrit}`, desc: '+1 sacred bonus on attack rolls (+1 per 5 lvls, doubled to confirm crits at lvl 10+)' });
      specials.push({ badge: 'Buff', title: `Piercing: +${pierceBonus} Concentration & CL vs SR`, desc: '+1 sacred bonus on concentration and caster level checks to overcome SR (+1 per 3 lvls)' });
      specials.push({ badge: 'Buff', title: `Protection: +${protAc} Armor Class (AC)${protCrit}`, desc: '+1 sacred bonus to AC (+1 per 5 lvls, doubled vs crit confirm at lvl 10+)' });
      specials.push({ badge: 'Buff', title: `Purify: +${purBonus} all saving throws${purCrit}`, desc: '+1 sacred bonus on all saves (+1 per 5 lvls, doubled vs curses/diseases/poisons at lvl 10+)' });
      specials.push({ badge: 'Buff', title: `Resiliency: DR ${resilDr}/${resilType}`, desc: 'Damage reduction against attacks (+1 per 5 lvls, becomes alignment opposite omdura at lvl 10+)' });
      specials.push({ badge: 'Buff', title: `Resistance: ${resistEnergy} Energy Resistance`, desc: 'Resistance against chosen energy type: acid, cold, electricity, fire, or sonic (+2 per 3 lvls)' });
      specials.push({ badge: 'Buff', title: `Smiting: Weapons bypass ${smitingDesc}`, desc: 'Allies\' weapons count as magic (lvl 6+: alignment, lvl 10+: adamantine) to bypass DR' });

      let dmUses = 0;
      if (level >= 19) dmUses = 4;
      else if (level >= 14) dmUses = 3;
      else if (level >= 9) dmUses = 2;
      else if (level >= 4) dmUses = 1;

      if (dmUses > 0) {
        specials.push({
          badge: 'Attack',
          title: `Divine Might ${dmUses}/day`,
          desc: level >= 18 ? `Full CHA to attack and AC, +${level} damage vs opposed alignment target` : `Half CHA to attack and AC, +${Math.floor(level / 2)} damage vs opposed alignment target`
        });
      }

      if (level >= 2) {
        specials.push({
          badge: 'Healing',
          title: `Divine Touch (${Math.floor(level / 2)}d6)`,
          desc: `Deliver positive or negative energy to heal or harm (${Math.floor(level / 2)} + CHA uses/day)`
        });
      }

      if (level >= 3) {
        specials.push({
          badge: 'Class',
          title: `Divine Infusion (${Math.floor(level / 3)} infusions)`,
          desc: 'Applies mercies (positive) or cruelties (negative) to Divine Touch'
        });
      }

      if (level >= 5) {
        const dwBonus = 1 + Math.floor((level - 5) / 3);
        const dwUses = 1 + Math.floor((level - 5) / 4);
        specials.push({
          badge: 'Class',
          title: `Divine Weapon ${dwUses}/day (+${dwBonus})`,
          desc: `Enhance bonded weapon with +${dwBonus} enhancement or special weapon properties for ${level} minutes`
        });
      }

      if (level >= 7) {
        specials.push({
          badge: 'Sp',
          title: `Commune ${level >= 15 ? '2/day' : '1/day'}`,
          desc: 'Commune with deity or mentors as spell-like ability'
        });
      }

      specials.push({ badge: 'Aura', title: 'Aura & Detect Alignment', desc: 'Powerful alignment aura and at-will detect alignment' });

      return specials;
    }

    const prog = (pfData.progressions && pfData.progressions[classKey]) || (pfData.classes && pfData.classes[classKey]);
    if (!prog || !prog.specials) return [];

    const specials = [];
    const className = prog.name || (classKey.charAt(0).toUpperCase() + classKey.slice(1));

    for (let lvl = 1; lvl <= level; lvl++) {
      const specStr = prog.specials[lvl];
      if (!specStr || specStr.trim() === '—' || specStr.trim() === '-') continue;

      const parts = specStr.split(',').map(s => s.trim()).filter(Boolean);
      parts.forEach(part => {
        const title = part.charAt(0).toUpperCase() + part.slice(1);
        specials.push({
          badge: `Lvl ${lvl}`,
          title: title,
          desc: `${className} Lvl ${lvl} Class Feature`
        });
      });
    }
    return filterScalingSpecials(specials);
  }

  function renderSpecialRow(s, container) {
    const badge = s.badge || 'Class';
    const title = s.title || '';
    const desc = s.desc || '—';
    if (!title) return;
    const div = document.createElement('div');
    div.className = 'p-2 mb-1 rounded bg-body border d-flex justify-content-between align-items-center special-item';
    div.innerHTML = `
      <div>
        <span class="badge bg-label-warning font-monospace py-0 me-1">${escapeHtml(badge)}</span>
        <strong class="text-heading small">${escapeHtml(title)}</strong>
        <small class="text-body-secondary d-block">${escapeHtml(desc)}</small>
      </div>
      <button type="button" class="btn btn-icon btn-text-danger btn-xs btn-del-special"><i class="icon-base ti tabler-x"></i></button>
    `;
    container.appendChild(div);
  }

  function isOmduraClassSpecial(title) {
    return /^(?:improved )?invocations?\b|^(?:destruction|healing|justice|piercing|protection|purify|resiliency|resistance|smiting)\s*:|^(?:divine might|divine touch|divine infusion|divine weapon)\b|^smite\b|^mercy(?:\b|\s*\()|^commune\b|^aura & detect alignment\b/i.test((title || '').trim());
  }

  function populateSpecialsFromData(specials) {
    const container = document.getElementById('specialsContainer');
    if (!container) return;
    container.innerHTML = '';

    const classKey = (currentChar.classKey || document.getElementById('sheetClassSelect')?.value || '').toLowerCase();
    const level = Math.min(20, Math.max(1, parseInt(document.getElementById('sheetLevelInput')?.value, 10) || currentChar.level || 1));

    let listToRender = specials;
    const isOldDummyPaladinData = Array.isArray(specials) && specials.length > 0 && classKey !== 'paladin' &&
      specials.every(s => (s.title || '').includes('Smite Evil') || (s.title || '').includes('Aura of Good'));

    if (classKey === 'omdura') {
      const customSpecials = Array.isArray(specials)
        ? specials.filter(s => !isOmduraClassSpecial(s.title))
        : [];
      listToRender = [...getClassSpecialsList(classKey, level), ...customSpecials];
    } else if (!listToRender || !Array.isArray(listToRender) || listToRender.length === 0 || isOldDummyPaladinData) {
      listToRender = getClassSpecialsList(classKey, level);
    } else {
      listToRender = filterScalingSpecials(listToRender);
    }

    listToRender.forEach(s => renderSpecialRow(s, container));
  }

  function updateClassSpecials(classKey, level) {
    const container = document.getElementById('specialsContainer');
    if (!container) return;

    const customSpecials = [];
    container.querySelectorAll('.special-item').forEach(div => {
      const badge = div.querySelector('.badge')?.textContent.trim() || '';
      const title = div.querySelector('strong')?.textContent.trim() || '';
      const desc = div.querySelector('small')?.textContent.trim() || '';
      if (isOmduraClassSpecial(title)) return;
      if (badge === 'Special' || (!badge.startsWith('Lvl ') && !badge.startsWith('Class'))) {
        if (title) customSpecials.push({ badge, title, desc });
      }
    });

    const classSpecials = getClassSpecialsList(classKey, level);
    if (Array.isArray(multiclassState)) {
      multiclassState.forEach(mc => {
        const mcSpecials = getClassSpecialsList(mc.class, mc.level);
        mcSpecials.forEach(ms => {
          classSpecials.push({
            badge: `${mc.name} ${ms.badge ? ms.badge.replace('Lvl ', '') : '1'}`,
            title: ms.title,
            desc: ms.desc
          });
        });
      });
    }
    const combined = filterScalingSpecials([...classSpecials, ...customSpecials]);

    container.innerHTML = '';
    combined.forEach(s => renderSpecialRow(s, container));
    if (typeof attachDynamicRowEvents === 'function') {
      attachDynamicRowEvents();
    }
  }

  function populateSpellsFromData(spells) {
    if (!spells) return;
    if (spells.spellNotes && document.getElementById('sheetSpellNotes')) {
      document.getElementById('sheetSpellNotes').value = spells.spellNotes;
    }
    if (Array.isArray(spells.slots)) {
      const rows = document.querySelectorAll('#paneSpells table tbody tr, #tab-page2 table tbody tr');
      spells.slots.forEach(slot => {
        const lvl = slot.lvl;
        if (rows[lvl]) {
          const knownInp = rows[lvl].querySelector('.spell-known, .spell-known-val');
          const perDayInp = rows[lvl].querySelector('.spell-per-day');
          const usedInp = rows[lvl].querySelector('.spell-used');
          if (knownInp && slot.known !== undefined) {
            if (knownInp.tagName === 'INPUT') knownInp.value = slot.known;
            else knownInp.textContent = slot.known;
          }
          if (perDayInp && slot.perDay !== undefined && slot.perDay !== null) perDayInp.value = slot.perDay;
          if (usedInp && slot.used !== undefined) usedInp.value = slot.used;
        }
      });
    }
  }

  if (sData.weapons && Array.isArray(sData.weapons)) {
    sData.weapons.forEach(w => {
      if (w && w.name === 'Longsword +1') {
        w.name = 'Longsword';
        if (w.enh === 1) w.enh = 0;
      }
    });
    if (sData.weapons.length > 1 && sData.weapons.some(w => w.name === 'Longsword')) {
      sData.weapons = sData.weapons.filter(w => !(w.name === 'Heavy Crossbow' && (w.ammo === '30 bolts' || !w.ammo)));
    }
  }

  const activeClassKey = (currentChar.classKey || document.getElementById('sheetClassSelect')?.value || '').toLowerCase();
  if (sData.weapons && Array.isArray(sData.weapons) && sData.weapons.length > 0) {
    populateWeaponsFromData(sData.weapons);
    if (activeClassKey === 'alchemist') {
      const initInt = parseInt(document.getElementById('score_int')?.value, 10) || (currentChar.sheetData?.abilityScores?.int ?? 10);
      const initIntMod = calcMod(initInt);
      syncAlchemistBomb(currentChar.level || 1, initIntMod);
    }
  } else if (activeClassKey === 'alchemist') {
    const initInt = parseInt(document.getElementById('score_int')?.value, 10) || (currentChar.sheetData?.abilityScores?.int ?? 10);
    const initIntMod = calcMod(initInt);
    syncAlchemistBomb(currentChar.level || 1, initIntMod);
  } else {
    populateWeaponsFromData(sData.weapons);
  }
  attachWeaponEvents();
  populateAcItemsFromData(sData.acItems);
  populateSaveItemsFromData(sData.saveItems);
  populateGearFromData(sData.gear);
  populateFeatsFromData(sData.feats);
  populateSpecialsFromData(sData.specials);
  populateSpellsFromData(sData.spells);

  function getSelectedClassSkills(classKey) {
    if (!classKey) classKey = document.getElementById('sheetClassSelect').value;
    classKey = (classKey || 'paladin').toLowerCase();
    const skills = new Set(pfData.classSkills[classKey] || []);
    if (Array.isArray(multiclassState)) {
      multiclassState.forEach(mc => {
        const subSkills = pfData.classSkills[mc.class] || [];
        subSkills.forEach(s => skills.add(s));
      });
    }
    return Array.from(skills);
  }

  function renderSkillsTable() {
    const tbody = document.getElementById('skillsTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const currentClassKey = document.getElementById('sheetClassSelect').value;
    const officialClassSkills = getSelectedClassSkills(currentClassKey);
    const savedSkillState = sData.skills || {};

    const fragment = document.createDocumentFragment();
    PF_SKILLS.forEach(sk => {
      const saved = savedSkillState[sk.key] || {};

      const isClassSkill = (saved.isClassSkill !== undefined) ? saved.isClassSkill : officialClassSkills.includes(sk.key);
      const ranks = parseInt(saved.ranks, 10) || 0;
      const misc = parseInt(saved.misc, 10) || 0;

      const tr = document.createElement('tr');
      tr.className = isClassSkill ? 'is-class-skill' : '';
      tr.setAttribute('data-skill-key', sk.key);
      tr.setAttribute('data-ab', sk.ab);
      tr.setAttribute('data-pen', sk.armorPen ? '1' : '0');

      let skillNameHtml = `<span class="fw-semibold text-heading skill-name-label cursor-pointer" title="${i18n.roll}: 1d20 + ${sk.name}">${sk.name}</span>`;
      if (sk.isCraft) {
        const subName = saved.customSubname || '';
        skillNameHtml = `
          <span class="fw-semibold text-heading skill-name-label cursor-pointer" title="${i18n.roll}: 1d20 + ${sk.name}">${sk.name}</span>
          <span class="text-body-secondary small">(</span><input type="text" class="form-control form-control-sm d-inline-block p-0 px-1 border-0 border-bottom text-heading font-monospace skill-custom-subname" style="width: 80px; height: 18px; font-size: 0.72rem; background: transparent;" placeholder="________" value="${escapeHtml(subName)}" title="Craft type" /><span class="text-body-secondary small">)</span>
        `;
      }

      tr.innerHTML = `
        <td class="text-center">
          <input type="checkbox" class="form-check-input chk-class-skill" style="cursor: pointer;" ${isClassSkill ? 'checked' : ''} title="Class Skill (+3 bonus with ≥1 rank)" />
        </td>
        <td>
          ${skillNameHtml}
          ${sk.armorPen ? '<span class="badge bg-label-secondary font-monospace py-0 px-1 ms-1" style="font-size: 0.6rem;" title="Armor Check Penalty applies">ACP</span>' : ''}
        </td>
        <td class="text-center">
          <span class="badge bg-label-primary font-monospace fw-bold fs-6 skill-total-badge" id="skTotal_${sk.key}">+0</span>
        </td>
        <td class="text-center font-monospace text-body-secondary small skill-ab-mod-text">
          =${sk.ab.toUpperCase()} <span class="skill-ab-val">+0</span>
        </td>
        <td class="text-center">
          <input type="number" class="form-control form-control-sm pf-box-input pf-input-compact font-monospace text-center skill-ranks-input" min="0" max="20" value="${ranks}" />
        </td>
        <td class="text-center">
          <input type="number" class="form-control form-control-sm pf-box-input pf-input-compact font-monospace text-center skill-misc-input" value="${misc}" />
        </td>
        <td class="text-center">
          <button type="button" class="btn btn-icon btn-text-warning btn-xs btn-roll-skill" title="${i18n.roll}: 1d20 + ${sk.name}">
            <i class="icon-base ti tabler-dice-5"></i>
          </button>
        </td>
      `;

      tr._cache = {
        chk: tr.querySelector('.chk-class-skill'),
        ranks: tr.querySelector('.skill-ranks-input'),
        misc: tr.querySelector('.skill-misc-input'),
        abVal: tr.querySelector('.skill-ab-val'),
        badge: tr.querySelector('.skill-total-badge'),
        nameLabel: tr.querySelector('.skill-name-label'),
        customSub: tr.querySelector('.skill-custom-subname')
      };

      fragment.appendChild(tr);
    });

    tbody.appendChild(fragment);
    attachSkillEvents();
  }

  let _skillsEventsAttached = false;
  function attachSkillEvents() {
    if (_skillsEventsAttached) return;
    _skillsEventsAttached = true;
    const tbody = document.getElementById('skillsTableBody');
    if (!tbody) return;

    tbody.addEventListener('change', function (e) {
      const chk = e.target.closest('.chk-class-skill');
      if (chk) {
        const tr = chk.closest('tr');
        if (chk.checked) {
          tr.classList.add('is-class-skill');
        } else {
          tr.classList.remove('is-class-skill');
        }
        recalculateSkills();
        triggerAutoSave();
      }
    });

    tbody.addEventListener('input', function (e) {
      if (e.target.matches('.skill-ranks-input, .skill-misc-input')) {
        recalculateSkills();
        triggerAutoSave();
      } else if (e.target.matches('.skill-custom-subname')) {
        triggerAutoSave();
      }
    });

    tbody.addEventListener('click', function (e) {
      const el = e.target.closest('.skill-name-label, .btn-roll-skill');
      if (el) {
        const tr = el.closest('tr');
        if (!tr) return;
        const name = tr.querySelector('.skill-name-label')?.textContent.trim() || 'Skill';
        const customSub = tr.querySelector('.skill-custom-subname')?.value;
        const displayName = customSub ? `${name} (${customSub})` : name;
        const total = parseInt(tr.querySelector('.skill-total-badge')?.textContent, 10) || 0;
        rollD20WithMod(total, `${displayName} ${i18n.check}`);
      }
    });
  }

  function formatPathfinderBab(bab) {
    bab = Math.max(0, parseInt(bab, 10) || 0);
    if (bab <= 5) return `+${bab}`;
    const parts = [];
    let curr = bab;
    while (curr > 0 && parts.length < 4) {
      parts.push(`+${curr}`);
      curr -= 5;
    }
    return parts.join('/');
  }

  function getCombinedBab(classKey, lvl) {
    const classMeta = pfData.classes[classKey] || {};
    const babTableKey = classMeta.bab_table || 'bab_section_1';
    const babTable = pfData.bab[babTableKey] || {};
    const mainBabVal = babTable[lvl] || `+${lvl}`;
    let totalBabInt = parseInt(mainBabVal, 10) || 0;

    if (Array.isArray(multiclassState)) {
      multiclassState.forEach(mc => {
        const mcMeta = pfData.classes[mc.class] || {};
        const mcBabKey = mcMeta.bab_table || 'bab_section_2';
        const mcBabTable = pfData.bab[mcBabKey] || {};
        const mcBabVal = mcBabTable[mc.level] || `+${mc.level}`;
        totalBabInt += parseInt(mcBabVal, 10) || 0;
      });
    }

    return formatPathfinderBab(totalBabInt);
  }

  function getCombinedBaseSaves(classKey, lvl) {
    const savesTable = pfData.saves[classKey] || {};
    const curSave = savesTable[lvl] || { fort: '+0', ref: '+0', will: '+0' };
    let totalFort = parseInt(curSave.fort, 10) || 0;
    let totalRef = parseInt(curSave.ref, 10) || 0;
    let totalWill = parseInt(curSave.will, 10) || 0;

    if (Array.isArray(multiclassState)) {
      multiclassState.forEach(mc => {
        const mcSaves = pfData.saves[mc.class] || {};
        const mcSave = mcSaves[mc.level] || { fort: '+0', ref: '+0', will: '+0' };
        totalFort += parseInt(mcSave.fort, 10) || 0;
        totalRef += parseInt(mcSave.ref, 10) || 0;
        totalWill += parseInt(mcSave.will, 10) || 0;
      });
    }

    return { fort: totalFort, ref: totalRef, will: totalWill };
  }

  function onClassOrLevelChange() {
    const classSelect = document.getElementById('sheetClassSelect');
    const classKey = classSelect.value;
    const lvl = Math.min(20, Math.max(1, parseInt(document.getElementById('sheetLevelInput').value, 10) || 1));
    const race = cleanText(document.getElementById('sheetRaceInput').value) || 'Human';

    const classMeta = pfData.classes[classKey] || {};
    const hd = classMeta.hit_die || 'd10';
    document.getElementById('sheetHitDie').value = hd;
    document.getElementById('sheetHitDieBadge').textContent = `HD: ${hd}`;
    document.getElementById('modalHpHitDie').textContent = hd;

    const combinedBab = getCombinedBab(classKey, lvl);
    document.getElementById('sheetBabInput').value = combinedBab;

    const combinedSaves = getCombinedBaseSaves(classKey, lvl);
    document.getElementById('saveBase_fort').value = combinedSaves.fort;
    document.getElementById('saveBase_ref').value = combinedSaves.ref;
    document.getElementById('saveBase_will').value = combinedSaves.will;

    const conMod = calcMod(document.getElementById('score_con')?.value);
    const dexMod = calcMod(document.getElementById('score_dex')?.value);
    const wisMod = calcMod(document.getElementById('score_wis')?.value);
    const fortAb = document.getElementById('saveAbility_fort');
    const refAb = document.getElementById('saveAbility_ref');
    const willAb = document.getElementById('saveAbility_will');
    if (fortAb && (!fortAb.value || fortAb.value === '0')) fortAb.value = conMod;
    if (refAb && (!refAb.value || refAb.value === '0')) refAb.value = dexMod;
    if (willAb && (!willAb.value || willAb.value === '0')) willAb.value = wisMod;

    const officialSkills = getSelectedClassSkills(classKey);
    document.querySelectorAll('#skillsTableBody tr').forEach(tr => {
      const skKey = tr.getAttribute('data-skill-key');
      const chk = tr.querySelector('.chk-class-skill');
      if (chk) {
        const isOfficial = officialSkills.includes(skKey);
        chk.checked = isOfficial;
        if (isOfficial) {
          tr.classList.add('is-class-skill');
        } else {
          tr.classList.remove('is-class-skill');
        }
      }
    });

    const baseRanks = classMeta.skill_ranks || 2;
    const isHuman = race.toLowerCase().includes('human');
    const humanBonus = isHuman ? 1 : 0;
    const formulaLbl = document.getElementById('lblClassSkillRankFormula');
    if (formulaLbl) {
      if (Array.isArray(multiclassState) && multiclassState.length > 0) {
        formulaLbl.textContent = `${baseRanks}${isHuman ? '+1(Human)' : ''}+INT x ${lvl} + Sub`;
      } else {
        formulaLbl.textContent = `${baseRanks}${isHuman ? '+1(Human)' : ''}+INT x ${lvl} Lvl`;
      }
    }

    const isAlchemist = (classKey || '').toLowerCase() === 'alchemist';
    if (isAlchemist) {
      const intScore = parseInt(document.getElementById('score_int')?.value, 10) || 10;
      const intMod = calcMod(intScore);
      syncAlchemistBomb(lvl, intMod);
    }

    updateClassSpecials(classKey, lvl);

    updateClassSpellSlots(classKey, lvl, null, true);

    renderMulticlassUI();
    recalculateAll();
    triggerAutoSave();
  }

  let _recalcRafId = null;
  function scheduleRecalculate() {
    if (_recalcRafId) return;
    _recalcRafId = requestAnimationFrame(() => {
      _recalcRafId = null;
      recalculateAll();
    });
  }

  function recalculateAll() {
    const lvl = Math.min(20, Math.max(1, parseInt(document.getElementById('sheetLevelInput').value, 10) || 1));
    const race = cleanText(document.getElementById('sheetRaceInput').value) || 'Human';
    const classKey = document.getElementById('sheetClassSelect').value;
    const classMeta = pfData.classes[classKey] || {};
    const baseClassRanks = classMeta.skill_ranks || 2;

    const mods = {};
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(k => {
      const scoreEl = document.getElementById(`score_${k}`);
      const baseScore = parseInt(scoreEl ? scoreEl.value : 10, 10) || 10;
      const mod = calcMod(baseScore);
      mods[k] = mod;

      const modValEl = document.getElementById(`mod_val_${k}`);
      const modEl = document.getElementById(`mod_${k}`);
      if (modValEl) {
        modValEl.textContent = formatMod(mod);
      } else if (modEl) {
        modEl.textContent = formatMod(mod);
      }
    });

    const initMisc = parseInt(document.getElementById('sheetInitMisc').value, 10) || 0;
    const initTotal = mods.dex + initMisc;
    document.getElementById('lblInitDexMod').textContent = formatMod(mods.dex);
    document.getElementById('sheetInitTotal').textContent = formatMod(initTotal);

    updateAcItemsTotals();

    let minMaxDex = null;
    document.querySelectorAll('#acItemsTbody tr').forEach(tr => {
      const isActive = tr.querySelector('.ac-item-active')?.checked ?? true;
      if (!isActive) return;

      const type = tr.querySelector('.ac-item-type')?.value || 'armor';
      if (type !== 'armor' && type !== 'shield') return;

      let maxDex = tr.getAttribute('data-max-dex');
      const name = tr.querySelector('.ac-item-name')?.value;
      if ((maxDex === null || maxDex === undefined || maxDex === '') && name) {
        const found = findArmorByName(name);
        if (found && found.max_dex !== null && found.max_dex !== undefined) {
          maxDex = found.max_dex;
        }
      }
      if (maxDex !== null && maxDex !== undefined && maxDex !== '' && !isNaN(parseInt(maxDex, 10))) {
        const val = parseInt(maxDex, 10);
        if (minMaxDex === null || val < minMaxDex) {
          minMaxDex = val;
        }
      }
    });

    const rawDexMod = mods.dex;
    let effectiveDex = rawDexMod;
    const badgeDexCapInfo = document.getElementById('badgeDexCapInfo');
    const dexCapNotice = document.getElementById('dexCapNotice');

    if (minMaxDex !== null && rawDexMod > minMaxDex) {
      effectiveDex = minMaxDex;
      if (badgeDexCapInfo) {
        badgeDexCapInfo.className = 'badge bg-label-warning font-monospace py-1 px-2';
        badgeDexCapInfo.innerHTML = `<i class="icon-base ti tabler-alert-triangle me-1"></i>Max Dex: +${minMaxDex} (Dex mod ${formatMod(rawDexMod)} capped)`;
      }
      if (dexCapNotice) dexCapNotice.classList.remove('d-none');
    } else if (minMaxDex !== null) {
      effectiveDex = rawDexMod;
      if (badgeDexCapInfo) {
        badgeDexCapInfo.className = 'badge bg-label-secondary font-monospace py-1 px-2';
        badgeDexCapInfo.textContent = `Max Dex: +${minMaxDex} (Applied Dex: ${formatMod(rawDexMod)})`;
      }
      if (dexCapNotice) dexCapNotice.classList.remove('d-none');
    } else {
      effectiveDex = rawDexMod;
      if (dexCapNotice) dexCapNotice.classList.add('d-none');
    }

    const acArmor = parseInt(document.getElementById('sheetAcArmor').value, 10) || 0;
    const acShield = parseInt(document.getElementById('sheetAcShield').value, 10) || 0;
    const acNatural = parseInt(document.getElementById('sheetAcNatural').value, 10) || 0;
    const acDeflect = parseInt(document.getElementById('sheetAcDeflect').value, 10) || 0;
    const acMisc = parseInt(document.getElementById('sheetAcMisc')?.value, 10) || 0;
    const sizeSelect = document.getElementById('sheetSizeSelect');
    const sizeMod = getSizeModifier(sizeSelect.value);

    document.getElementById('sheetAcDex').value = effectiveDex;
    document.getElementById('sheetAcSize').value = sizeMod;

    const totalAc = 10 + acArmor + acShield + effectiveDex + sizeMod + acNatural + acDeflect + acMisc;

    const touchAc = 10 + effectiveDex + sizeMod + acDeflect + acMisc;

    const flatAc = 10 + acArmor + acShield + sizeMod + acNatural + acDeflect + acMisc + Math.min(0, effectiveDex);

    document.getElementById('sheetAcTotal').textContent = totalAc;
    document.getElementById('sheetAcTouch').textContent = touchAc;
    document.getElementById('sheetAcFlat').textContent = flatAc;

    updateSaveItemsTotals();
    ['fort', 'ref', 'will'].forEach(k => {
      recalculateSaveTotal(k);
    });

    const babStr = document.getElementById('sheetBabInput').value || '+1';
    const mainBab = parseInt(babStr.replace('+', ''), 10) || 0;
    const cmbTotal = mainBab + mods.str + sizeMod;
    const cmdTotal = 10 + mainBab + mods.str + mods.dex + sizeMod;
    document.getElementById('sheetCmbTotal').textContent = formatMod(cmbTotal);
    document.getElementById('sheetCmdTotal').textContent = cmdTotal;

    recalculateHp(mods.con, lvl);

    const strScore = parseInt(document.getElementById('score_str').value, 10) || 10;
    updateCarryingCapacity(strScore);

    recalculateSkills(mods);

    updateClassSpellSlots(classKey, lvl, mods, false);

    recalculateWeapons(mods, mainBab);
  }

  function getSizeModifier(sizeName) {
    const map = {
      'Colossal': -8, 'Gargantuan': -4, 'Huge': -2, 'Large': -1,
      'Medium': 0, 'Small': 1, 'Tiny': 2, 'Diminutive': 4, 'Fine': 8
    };
    return map[sizeName] !== undefined ? map[sizeName] : 0;
  }

  function recalculateSkills(mods) {
    if (!mods) {
      mods = {
        str: calcMod(document.getElementById('score_str').value),
        dex: calcMod(document.getElementById('score_dex').value),
        con: calcMod(document.getElementById('score_con').value),
        int: calcMod(document.getElementById('score_int').value),
        wis: calcMod(document.getElementById('score_wis').value),
        cha: calcMod(document.getElementById('score_cha').value)
      };
    }

    const lvl = Math.min(20, Math.max(1, parseInt(document.getElementById('sheetLevelInput').value, 10) || 1));
    const race = cleanText(document.getElementById('sheetRaceInput').value) || 'Human';
    const classKey = document.getElementById('sheetClassSelect').value;
    const baseClassRanks = (pfData.classes[classKey] && pfData.classes[classKey].skill_ranks) || 2;
    const humanBonus = race.toLowerCase().includes('human') ? 1 : 0;

    const ranksPerLevel = Math.max(1, baseClassRanks + mods.int + humanBonus);
    let totalAvailableRanks = ranksPerLevel * lvl;

    if (Array.isArray(multiclassState)) {
      multiclassState.forEach(mc => {
        const mcKey = (mc.class || '').toLowerCase();
        const mcRanksBase = (pfData.classes[mcKey] && pfData.classes[mcKey].skill_ranks) || mc.skillRanks || 2;
        const mcRanksPerLvl = Math.max(1, mcRanksBase + mods.int + humanBonus);
        totalAvailableRanks += mcRanksPerLvl * (mc.level || 1);
      });
    }

    let totalSpentRanks = 0;
    const totalArmorPen = parseInt(document.getElementById('acItemTotalPen')?.textContent, 10) || 0;

    document.querySelectorAll('#skillsTableBody tr').forEach(tr => {
      const skKey = tr.getAttribute('data-skill-key');
      const abKey = tr.getAttribute('data-ab') || 'int';
      const armorPen = tr.getAttribute('data-pen') === '1';

      const cache = tr._cache;
      const isClassSkill = cache ? cache.chk.checked : tr.querySelector('.chk-class-skill').checked;
      const ranks = parseInt(cache ? cache.ranks.value : tr.querySelector('.skill-ranks-input').value, 10) || 0;
      const misc = parseInt(cache ? cache.misc.value : tr.querySelector('.skill-misc-input').value, 10) || 0;
      totalSpentRanks += ranks;

      const abMod = mods[abKey] || 0;
      const abValEl = cache ? cache.abVal : tr.querySelector('.skill-ab-val');
      if (abValEl) abValEl.textContent = formatMod(abMod);

      const classSkillBonus = (isClassSkill && ranks > 0) ? 3 : 0;
      const penVal = armorPen ? totalArmorPen : 0;
      const totalBonus = abMod + ranks + classSkillBonus + misc + penVal;

      const badge = cache ? cache.badge : tr.querySelector('.skill-total-badge');
      if (badge) {
        badge.textContent = formatMod(totalBonus);
        if (ranks > 0) {
          badge.className = 'badge bg-label-success font-monospace fw-bold fs-6 skill-total-badge';
        } else {
          badge.className = 'badge bg-label-primary font-monospace fw-bold fs-6 skill-total-badge';
        }
      }
    });

    const spentEl = document.getElementById('spentSkillRanks');
    const totalEl = document.getElementById('totalAvailableSkillRanks');
    const poolBadge = document.getElementById('skillRanksPoolBadge');

    if (spentEl) spentEl.textContent = totalSpentRanks;
    if (totalEl) totalEl.textContent = totalAvailableRanks;

    if (poolBadge) {
      if (totalSpentRanks > totalAvailableRanks) {
        poolBadge.className = 'badge bg-danger text-white font-monospace animate__animated animate__shakeX';
      } else if (totalSpentRanks === totalAvailableRanks) {
        poolBadge.className = 'badge bg-success text-white font-monospace';
      } else {
        poolBadge.className = 'badge bg-primary text-white font-monospace';
      }
    }
  }

  function recalculateHp(conMod, lvl) {
    const classKey = document.getElementById('sheetClassSelect').value;
    const mainHdStr = (pfData.classes[classKey] && pfData.classes[classKey].hit_die) || 'd10';
    const mainSides = parseInt(mainHdStr.replace('d', ''), 10) || 10;

    let totalCharLvl = lvl;
    if (Array.isArray(multiclassState)) {
      multiclassState.forEach(mc => {
        totalCharLvl += (mc.level || 0);
      });
    }

    const hpExtraInp = document.getElementById('sheetHpExtraMisc');
    const extraMisc = hpExtraInp ? (parseInt(hpExtraInp.value, 10) || 0) : (parseInt(sData.hpExtraMisc, 10) || 0);
    sData.hpExtraMisc = extraMisc;

    if (!sData.hpRolls) sData.hpRolls = {};

    const lvlDiceMap = [];
    const mainClassName = pfData.classes[classKey]?.name || classKey;
    for (let i = 1; i <= lvl; i++) {
      lvlDiceMap.push({ lvlNum: i, sides: mainSides, name: mainClassName });
    }
    let curLvlCounter = lvl + 1;
    if (Array.isArray(multiclassState)) {
      multiclassState.forEach(mc => {
        const mcKey = (mc.class || '').toLowerCase();
        const mcHdStr = (pfData.classes[mcKey] && pfData.classes[mcKey].hit_die) || mc.hitDie || 'd8';
        const mcSides = parseInt(mcHdStr.replace('d', ''), 10) || 8;
        for (let m = 0; m < mc.level; m++) {
          lvlDiceMap.push({ lvlNum: curLvlCounter++, sides: mcSides, name: mc.name || mc.class });
        }
      });
    }

    if (sData.hpRolls[1] === undefined) sData.hpRolls[1] = mainSides;

    let rollsSum = 0;
    lvlDiceMap.forEach(item => {
      const i = item.lvlNum;
      const s = item.sides;
      if (sData.hpRolls[i] === undefined) {
        sData.hpRolls[i] = (i === 1) ? s : (Math.floor(s / 2) + 1);
      }
      rollsSum += parseInt(sData.hpRolls[i], 10) || 1;
    });

    const conTotal = totalCharLvl * conMod;
    const totalMaxHp = Math.max(1, rollsSum + conTotal + extraMisc);

    const oldMaxHp = parseInt(document.getElementById('sheetMaxHp')?.value, 10) || totalMaxHp;
    const curHpEl = document.getElementById('sheetCurrentHp');
    if (curHpEl) {
      const curHp = parseInt(curHpEl.value, 10);
      if (curHp === oldMaxHp || isNaN(curHp) || curHp > totalMaxHp) {
        curHpEl.value = totalMaxHp;
      }
    }

    document.getElementById('sheetMaxHp').value = totalMaxHp;
    document.getElementById('sheetMaxHpDisplay').textContent = totalMaxHp;

    let extraMiscStr = '';
    if (extraMisc !== 0) {
      extraMiscStr = extraMisc > 0 ? ` + ${extraMisc} (Misc/Feat)` : ` - ${Math.abs(extraMisc)} (Misc/Feat)`;
    }
    const summaryFormulaEl = document.getElementById('sheetHpTotalFormulaSummary');
    if (summaryFormulaEl) {
      summaryFormulaEl.textContent =
        `Total Level ${totalCharLvl}: ${rollsSum} (Dice) + ${conTotal} (CON ${conMod >= 0 ? '+' : ''}${conMod}x${totalCharLvl})${extraMiscStr} = ${totalMaxHp} Max HP`;
    }

    const modalConMod = document.getElementById('modalHpConMod');
    if (modalConMod) modalConMod.textContent = formatMod(conMod);
    const modalTotalMax = document.getElementById('modalHpTotalMax');
    if (modalTotalMax) modalTotalMax.textContent = `${totalMaxHp} HP`;

    renderLevelHpTable(totalCharLvl, lvlDiceMap, conMod);
  }

  function renderLevelHpTable(totalLvl, lvlDiceMap, conMod) {
    const tbody = document.getElementById('tbodyLevelHpBreakdown');
    if (!tbody) return;

    const existingRows = tbody.querySelectorAll('tr');
    if (existingRows.length === totalLvl) {
      existingRows.forEach((tr, idx) => {
        const i = idx + 1;
        const item = (Array.isArray(lvlDiceMap) && lvlDiceMap[idx]) ? lvlDiceMap[idx] : { sides: 8, name: '' };
        const sides = item.sides || 8;
        const inp = tr.querySelector('.hp-level-roll');
        if (inp && document.activeElement !== inp) {
          inp.value = sData.hpRolls[i] !== undefined ? sData.hpRolls[i] : (i === 1 ? sides : Math.floor(sides / 2) + 1);
        }
        const roll = parseInt(inp ? inp.value : sData.hpRolls[i], 10) || (i === 1 ? sides : Math.floor(sides / 2) + 1);
        const conTd = tr.children[2];
        const totalTd = tr.children[3];
        if (conTd) conTd.textContent = formatMod(conMod);
        if (totalTd) totalTd.textContent = roll + conMod;
      });
      return;
    }

    tbody.innerHTML = '';
    for (let idx = 0; idx < totalLvl; idx++) {
      const i = idx + 1;
      const item = (Array.isArray(lvlDiceMap) && lvlDiceMap[idx]) ? lvlDiceMap[idx] : { sides: 8, name: '' };
      const sides = item.sides || 8;
      const roll = parseInt(sData.hpRolls[i], 10) || (i === 1 ? sides : Math.floor(sides / 2) + 1);
      const rowTotal = roll + conMod;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="fw-bold text-primary">Lvl ${i} <span class="badge bg-label-secondary font-monospace" style="font-size:0.65rem;">${escapeHtml(item.name || 'HD')} d${sides}</span></td>
        <td>
          <input type="number" class="form-control form-control-sm pf-box-input pf-input-compact text-center hp-level-roll" min="1" max="${sides}" value="${roll}" data-level="${i}" />
        </td>
        <td class="text-body-secondary">${formatMod(conMod)}</td>
        <td class="fw-bold text-heading">${rowTotal}</td>
      `;
      tbody.appendChild(tr);
    }

    tbody.querySelectorAll('.hp-level-roll').forEach(inp => {
      inp.addEventListener('input', function () {
        const lvlIdx = parseInt(this.getAttribute('data-level'), 10);
        const val = parseInt(this.value, 10) || 1;
        if (!sData.hpRolls) sData.hpRolls = {};
        sData.hpRolls[lvlIdx] = val;
        recalculateAll();
        triggerAutoSave();
      });
    });
  }

  function updateCarryingCapacity(str) {
    str = Math.min(30, Math.max(1, parseInt(str, 10) || 10));
    const cap = STR_CAPACITY[str] || [33, 66, 100];

    document.getElementById('lblCarryingStrScore').textContent = `STR ${str}`;
    document.getElementById('capLight').textContent = `≤ ${cap[0]} lbs`;
    document.getElementById('capMedium').textContent = `${cap[0] + 1} - ${cap[1]} lbs`;
    document.getElementById('capHeavy').textContent = `${cap[1] + 1} - ${cap[2]} lbs`;

    document.getElementById('capLiftHead').textContent = `${cap[2]} lbs`;
    document.getElementById('capLiftGround').textContent = `${cap[2] * 2} lbs`;
    document.getElementById('capDrag').textContent = `${cap[2] * 5} lbs`;
  }

  function updateAcItemsTotals() {
    let totBonus = 0;
    let totPen = 0;
    let totWeight = 0;
    let armorBonus = 0;
    let shieldBonus = 0;
    let deflectBonus = 0;
    let naturalBonus = 0;
    let miscBonus = 0;
    let activeArmorName = '';
    let activeShieldName = '';
    const rows = document.querySelectorAll('#acItemsTbody tr');

    rows.forEach(tr => {
      const name = (tr.querySelector('.ac-item-name')?.value || '').trim();
      const type = tr.querySelector('.ac-item-type')?.value || 'armor';
      const bonus = parseInt(tr.querySelector('.ac-item-bonus')?.value, 10) || 0;
      const pen = parseInt(tr.querySelector('.ac-item-pen')?.value, 10) || 0;
      const wt = parseInt(tr.querySelector('.ac-item-weight')?.value, 10) || 0;
      const isActive = tr.querySelector('.ac-item-active')?.checked ?? true;

      if (isActive) {
        tr.classList.add('row-ac-active');
        tr.classList.remove('row-ac-inactive');
      } else {
        tr.classList.add('row-ac-inactive');
        tr.classList.remove('row-ac-active');
      }

      totWeight += wt;

      if (isActive) {
        if (type === 'shield') {
          shieldBonus += bonus;
          activeShieldName = name ? `${name} (+${bonus})` : `Shield (+${bonus})`;
        } else if (type === 'deflection') {
          deflectBonus += bonus;
        } else if (type === 'natural') {
          naturalBonus += bonus;
        } else if (type === 'dodge' || type === 'misc') {
          miscBonus += bonus;
        } else {

          armorBonus += bonus;
          activeArmorName = name ? `${name} (+${bonus})` : `Armor (+${bonus})`;
        }

        totBonus += bonus;
        totPen += pen;
      }
    });

    const bEl = document.getElementById('acItemTotalBonus');
    const pEl = document.getElementById('acItemTotalPen');
    const wEl = document.getElementById('acItemTotalWeight');

    if (bEl) bEl.textContent = formatMod(totBonus);
    if (pEl) pEl.textContent = formatMod(totPen);
    if (wEl) wEl.textContent = `${totWeight} lbs`;

    const lblArmor = document.getElementById('lblActiveArmorName');
    const lblShield = document.getElementById('lblActiveShieldName');
    if (lblArmor) lblArmor.textContent = activeArmorName || 'None (Unarmored)';
    if (lblShield) lblShield.textContent = activeShieldName || 'None';

    const sheetArmorInput = document.getElementById('sheetAcArmor');
    const sheetShieldInput = document.getElementById('sheetAcShield');
    const sheetDeflectInput = document.getElementById('sheetAcDeflect');
    const sheetNaturalInput = document.getElementById('sheetAcNatural');
    const sheetMiscInput = document.getElementById('sheetAcMisc');

    if (sheetArmorInput) sheetArmorInput.value = armorBonus;
    if (sheetShieldInput) sheetShieldInput.value = shieldBonus;
    if (sheetDeflectInput) sheetDeflectInput.value = deflectBonus;
    if (sheetNaturalInput) sheetNaturalInput.value = naturalBonus;
    if (sheetMiscInput) sheetMiscInput.value = miscBonus;

    let gearTotWt = 0;
    document.querySelectorAll('.gear-wt').forEach(inp => {
      gearTotWt += parseInt(inp.value, 10) || 0;
    });
    let saveTotWt = 0;
    document.querySelectorAll('.save-item-weight').forEach(inp => {
      saveTotWt += parseInt(inp.value, 10) || 0;
    });
    const totalAllWeight = totWeight + gearTotWt + saveTotWt;
    const gearWtBadge = document.getElementById('lblTotalGearWeight');
    if (gearWtBadge) gearWtBadge.textContent = `${totalAllWeight} lbs`;
  }

  function updateSaveItemsTotals() {
    let fortBonus = 0;
    let refBonus = 0;
    let willBonus = 0;
    let totWeight = 0;
    let activeItemNames = [];
    const rows = document.querySelectorAll('#saveItemsTbody tr');

    rows.forEach(tr => {
      const name = (tr.querySelector('.save-item-name')?.value || '').trim();
      const target = tr.querySelector('.save-item-target')?.value || 'all';
      const type = tr.querySelector('.save-item-type')?.value || 'resistance';
      const bonus = parseInt(tr.querySelector('.save-item-bonus')?.value, 10) || 0;
      const wt = parseInt(tr.querySelector('.save-item-weight')?.value, 10) || 0;
      const isActive = tr.querySelector('.save-item-active')?.checked ?? true;

      if (isActive) {
        tr.classList.add('row-save-active');
        tr.classList.remove('row-save-inactive');
      } else {
        tr.classList.add('row-save-inactive');
        tr.classList.remove('row-save-active');
      }

      totWeight += wt;

      if (isActive && bonus !== 0) {
        if (target === 'all') {
          fortBonus += bonus;
          refBonus += bonus;
          willBonus += bonus;
        } else if (target === 'fort') {
          fortBonus += bonus;
        } else if (target === 'ref') {
          refBonus += bonus;
        } else if (target === 'will') {
          willBonus += bonus;
        }

        if (name) {
          activeItemNames.push(`${name} (+${bonus})`);
        }
      }
    });

    const fInp = document.getElementById('saveMagic_fort');
    const rInp = document.getElementById('saveMagic_ref');
    const wInp = document.getElementById('saveMagic_will');

    if (rows.length > 0) {
      if (fInp) fInp.value = fortBonus;
      if (rInp) rInp.value = refBonus;
      if (wInp) wInp.value = willBonus;
    }

    recalculateSaveTotal('fort');
    recalculateSaveTotal('ref');
    recalculateSaveTotal('will');

    const bEl = document.getElementById('saveItemTotalBonus');
    const wEl = document.getElementById('saveItemTotalWeight');
    if (bEl) {
      if (fortBonus === refBonus && refBonus === willBonus) {
        bEl.textContent = formatMod(fortBonus);
      } else {
        bEl.textContent = `F:${formatMod(fortBonus)} R:${formatMod(refBonus)} W:${formatMod(willBonus)}`;
      }
    }
    if (wEl) wEl.textContent = `${totWeight} lbs`;

    const lblResName = document.getElementById('lblActiveResistanceName');
    const lblSaveBonuses = document.getElementById('lblActiveSaveBonusesText');
    if (lblResName) {
      lblResName.textContent = activeItemNames.length > 0 ? activeItemNames.join(', ') : 'None';
    }
    if (lblSaveBonuses) {
      lblSaveBonuses.textContent = `Fort ${formatMod(fortBonus)} | Ref ${formatMod(refBonus)} | Will ${formatMod(willBonus)}`;
    }

    let armorTotWt = 0;
    document.querySelectorAll('.ac-item-weight').forEach(inp => {
      armorTotWt += parseInt(inp.value, 10) || 0;
    });
    let gearTotWt = 0;
    document.querySelectorAll('.gear-wt').forEach(inp => {
      gearTotWt += parseInt(inp.value, 10) || 0;
    });
    const totalAllWeight = armorTotWt + gearTotWt + totWeight;
    const gearWtBadge = document.getElementById('lblTotalGearWeight');
    if (gearWtBadge) gearWtBadge.textContent = `${totalAllWeight} lbs`;

    return { fortBonus, refBonus, willBonus, totWeight };
  }

  const CLASS_CASTING_STATS = {
    wizard: 'int', alchemist: 'int', magus: 'int', witch: 'int', arcanist: 'int', investigator: 'int',
    cleric: 'wis', druid: 'wis', ranger: 'wis', inquisitor: 'wis', shaman: 'wis', hunter: 'wis',
    paladin: 'cha', sorcerer: 'cha', bard: 'cha', oracle: 'cha', summoner: 'cha', bloodrager: 'cha', skald: 'cha',
    fighter: 'none', barbarian: 'none', rogue: 'none', monk: 'none', cavalier: 'none', gunslinger: 'none',
    brawler: 'none', slayer: 'none', swashbuckler: 'none'
  };

  function getCastingStatForClass(classKey) {
    if (!classKey) return 'none';
    classKey = classKey.toLowerCase();
    if (classKey === 'omdura') return 'cha';
    const prog = pfData.progressions[classKey];
    if (prog && prog.casting_stat) return prog.casting_stat;
    if (CLASS_CASTING_STATS[classKey]) return CLASS_CASTING_STATS[classKey];
    if (prog && prog.has_spells === false) return 'none';
    return 'none';
  }

  function getOrdinal(lvl) {
    if (lvl === 1) return '1st';
    if (lvl === 2) return '2nd';
    if (lvl === 3) return '3rd';
    return `${lvl}th`;
  }

  function updateClassSpellSlots(classKey, charLevel, mods, autoSetStat = false) {
    if (!classKey) classKey = document.getElementById('sheetClassSelect')?.value || 'paladin';
    classKey = classKey.toLowerCase();
    if (!charLevel) charLevel = Math.min(20, Math.max(1, parseInt(document.getElementById('sheetLevelInput')?.value, 10) || 1));

    const prog = pfData.progressions[classKey] || {};
    const defaultStat = getCastingStatForClass(classKey);
    const statSelect = document.getElementById('sheetCastingStat');

    if (autoSetStat && statSelect) {
      statSelect.value = defaultStat;
    }

    const currentStat = statSelect?.value || defaultStat;
    const hasCasting = (currentStat && currentStat !== 'none');

    let castMod = 0;
    if (hasCasting) {
      if (mods && mods[currentStat] !== undefined) {
        castMod = mods[currentStat];
      } else {
        const scoreEl = document.getElementById(`score_${currentStat}`);
        const scoreVal = parseInt(scoreEl ? scoreEl.value : 10, 10) || 10;
        castMod = calcMod(scoreVal);
      }
    }

    const baseDcEl = document.getElementById('lblBaseSpellDc');
    if (baseDcEl) {
      if (hasCasting) {
        baseDcEl.textContent = `10 + ${currentStat.toUpperCase()} (${formatMod(castMod)}) = ${10 + castMod}`;
      } else {
        baseDcEl.textContent = 'None';
      }
    }

    const subBanner = document.getElementById('lblSpellCastingSub');
    if (subBanner) {
      if (hasCasting) {
        const spellType = (prog.spellcasting || currentStat.toUpperCase()).split(',')[0].trim();
        subBanner.textContent = `${spellType} (Lvl ${charLevel})`;
      } else {
        subBanner.textContent = 'No Spells';
      }
    }

    const spellLevels = prog.spell_levels || [];
    const charSpells = prog.spells?.[charLevel] || [];

    for (let lvl = 0; lvl <= 9; lvl++) {
      const tr = document.getElementById(`spellRow_${lvl}`);
      const dcEl = document.getElementById(`spellDc_${lvl}`);
      const bonusEl = document.getElementById(`spellBonus_${lvl}`);
      const perDayInp = tr ? tr.querySelector('.spell-per-day') : null;
      const knownInp = tr ? tr.querySelector('.spell-known') : null;

      if (!hasCasting) {
        if (tr) tr.classList.add('opacity-50');
        if (dcEl) dcEl.textContent = '—';
        if (bonusEl) bonusEl.textContent = '—';
        if (perDayInp) { perDayInp.value = '—'; perDayInp.disabled = true; }
        if (knownInp) { knownInp.disabled = true; }
        continue;
      }

      let isLevelAccessible = false;
      let slotsVal = '—';

      if (lvl === 0) {
        if (spellLevels.includes('0')) {
          const idx = spellLevels.indexOf('0');
          const raw = charSpells[idx];
          if (raw !== undefined && raw !== null) {
            slotsVal = raw;
            isLevelAccessible = true;
          }
        }
      } else {
        const ord = getOrdinal(lvl);
        if (spellLevels.includes(ord)) {
          const idx = spellLevels.indexOf(ord);
          const raw = charSpells[idx];
          if (raw !== undefined && raw !== '—') {
            slotsVal = raw;
            isLevelAccessible = true;
          }
        }
      }

      const importedLevel = currentChar.sheetData?.spells?.levels?.[String(lvl)];
      const hasImportedLevel = importedLevel && (
        (Array.isArray(importedLevel.spells) && importedLevel.spells.length > 0) ||
        importedLevel.per_day !== undefined ||
        importedLevel.known !== undefined
      );
      if (!isLevelAccessible && hasImportedLevel) {
        const currentSlots = perDayInp?.value;
        const importedSlots = parseInt(importedLevel.per_day, 10);
        const currentSlotsValue = parseInt(currentSlots, 10);
        const useImportedSlots = !currentSlots || currentSlots === '—' ||
          (currentSlotsValue === 0 && importedSlots > 0);
        slotsVal = useImportedSlots ? (importedLevel.per_day ?? '—') : currentSlots;
        isLevelAccessible = true;
      }

      if (isLevelAccessible) {
        if (tr) tr.classList.remove('opacity-50');
        if (dcEl) dcEl.textContent = 10 + lvl + castMod;

        if (bonusEl) {
          if (lvl === 0 || castMod <= 0) {
            bonusEl.textContent = '0';
          } else if (castMod >= lvl) {
            const b = Math.floor((castMod - lvl) / 4) + 1;
            bonusEl.textContent = `+${b}`;
          } else {
            bonusEl.textContent = '0';
          }
        }

        if (perDayInp) {
          perDayInp.value = slotsVal;
          perDayInp.disabled = false;
        }
        if (knownInp) {
          knownInp.disabled = false;
        }
      } else {
        if (tr) tr.classList.add('opacity-50');
        if (dcEl) dcEl.textContent = '—';
        if (bonusEl) bonusEl.textContent = '—';
        if (perDayInp) {
          perDayInp.value = '—';
          perDayInp.disabled = true;
        }
        if (knownInp) {
          knownInp.disabled = true;
        }
      }
    }
  }

  const btnAddAcItem = document.getElementById('btnAddAcItemRow');
  if (btnAddAcItem) {
    btnAddAcItem.addEventListener('click', () => {
      const tbody = document.getElementById('acItemsTbody');

      const hasActiveArmor = !!Array.from(document.querySelectorAll('#acItemsTbody tr')).find(r => {
        const type = r.querySelector('.ac-item-type')?.value || 'armor';
        const active = r.querySelector('.ac-item-active')?.checked;
        return type === 'armor' && active;
      });
      const tr = createAcItemRow({ name: '', type: 'armor', bonus: 0, pen: 0, weight: 0, is_active: !hasActiveArmor });
      tbody.appendChild(tr);
      attachDynamicRowEvents();
      const inp = tr.querySelector('.ac-item-name');
      if (inp) inp.focus();
      recalculateAll();
      triggerAutoSave();
    });
  }

  const btnAddSaveItem = document.getElementById('btnAddSaveItemRow');
  if (btnAddSaveItem) {
    btnAddSaveItem.addEventListener('click', () => {
      const tbody = document.getElementById('saveItemsTbody');
      const tr = createSaveItemRow({ name: '', target: 'all', type: 'resistance', bonus: 1, weight: 1, is_active: true });
      tbody.appendChild(tr);
      attachDynamicRowEvents();
      const inp = tr.querySelector('.save-item-name');
      if (inp) inp.focus();
      recalculateAll();
      triggerAutoSave();
    });
  }

  const btnAddGear = document.getElementById('btnAddGearRow');
  if (btnAddGear) {
    btnAddGear.addEventListener('click', () => {
      const container = document.getElementById('gearItemsContainer');
      const div = document.createElement('div');
      div.className = 'd-flex align-items-center gap-1 mb-1';
      div.innerHTML = `
        <input type="text" class="form-control form-control-sm pf-box-input pf-input-compact text-start gear-name" placeholder="New Item Name" />
        <input type="number" class="form-control form-control-sm pf-box-input pf-input-compact text-center gear-wt font-monospace" style="width: 60px;" placeholder="Wt" value="1" />
        <button type="button" class="btn btn-icon btn-text-danger btn-xs btn-del-gear"><i class="icon-base ti tabler-x"></i></button>
      `;
      container.appendChild(div);
      attachDynamicRowEvents();
      recalculateAll();
      triggerAutoSave();
    });
  }

  const btnAddFeat = document.getElementById('btnAddFeatRow');
  if (btnAddFeat) {
    btnAddFeat.addEventListener('click', () => {
      const title = prompt('Feat Name:');
      if (!title) return;
      const desc = prompt('Description / Bonus:');
      const container = document.getElementById('featsContainer');
      const div = document.createElement('div');
      div.className = 'p-2 mb-1 rounded bg-body border d-flex justify-content-between align-items-center';
      div.innerHTML = `
        <div>
          <strong class="text-heading d-block small feat-title">${title}</strong>
          <small class="text-body-secondary feat-desc">${desc || '—'}</small>
        </div>
        <button type="button" class="btn btn-icon btn-text-danger btn-xs btn-del-feat"><i class="icon-base ti tabler-x"></i></button>
      `;
      container.appendChild(div);
      attachDynamicRowEvents();
      triggerAutoSave();
    });
  }

  const btnAddSpecial = document.getElementById('btnAddSpecialRow');
  if (btnAddSpecial) {
    btnAddSpecial.addEventListener('click', () => {
      const title = prompt('Special Ability / Class Feature:');
      if (!title) return;
      const desc = prompt('Description:');
      const container = document.getElementById('specialsContainer');
      const div = document.createElement('div');
      div.className = 'p-2 mb-1 rounded bg-body border d-flex justify-content-between align-items-center special-item';
      div.innerHTML = `
        <div>
          <span class="badge bg-label-warning font-monospace py-0 me-1">Special</span>
          <strong class="text-heading small">${escapeHtml(title)}</strong>
          <small class="text-body-secondary d-block">${escapeHtml(desc || '—')}</small>
        </div>
        <button type="button" class="btn btn-icon btn-text-danger btn-xs btn-del-special"><i class="icon-base ti tabler-x"></i></button>
      `;
      container.appendChild(div);
      attachDynamicRowEvents();
      triggerAutoSave();
    });
  }

  const btnAddWeapon = document.getElementById('btnAddWeaponRow');
  if (btnAddWeapon) {
    btnAddWeapon.addEventListener('click', () => {
      const container = document.getElementById('weaponsContainer');
      if (!container) return;
      const idx = container.querySelectorAll('.weapon-row').length + 1;
      container.insertAdjacentHTML('beforeend', createWeaponRowHtml(idx));
      attachWeaponEvents();
      recalculateAll();
      triggerAutoSave();
    });
  }

  function attachDynamicRowEvents() {
    document.querySelectorAll('.btn-del-row').forEach(btn => {
      btn.onclick = function () {
        this.closest('tr').remove();
        recalculateAll();
        triggerAutoSave();
      };
    });
    document.querySelectorAll('.btn-del-gear').forEach(btn => {
      btn.onclick = function () {
        this.closest('div').remove();
        recalculateAll();
        triggerAutoSave();
      };
    });
    document.querySelectorAll('.btn-del-feat, .btn-del-special').forEach(btn => {
      btn.onclick = function () {
        this.closest('div.rounded, div.feat-item, div.special-item')?.remove();
        recalculateAll();
        triggerAutoSave();
      };
    });
    document.querySelectorAll('.ac-item-bonus, .ac-item-pen, .ac-item-weight, .gear-wt').forEach(inp => {
      inp.oninput = function () {
        recalculateAll();
        triggerAutoSave();
      };
    });
    document.querySelectorAll('.ac-item-active').forEach(chk => {
      chk.onchange = function () {
        const tr = this.closest('tr');
        const isChecked = this.checked;
        const currentType = tr?.querySelector('.ac-item-type')?.value || 'armor';
        if (isChecked && (currentType === 'armor' || currentType === 'shield')) {
          document.querySelectorAll('#acItemsTbody tr').forEach(otherTr => {
            if (otherTr !== tr) {
              const otherType = otherTr.querySelector('.ac-item-type')?.value || 'armor';
              if (otherType === currentType) {
                const otherChk = otherTr.querySelector('.ac-item-active');
                if (otherChk) otherChk.checked = false;
              }
            }
          });
        }
        recalculateAll();
        triggerAutoSave();
      };
    });
    document.querySelectorAll('.ac-item-type').forEach(sel => {
      sel.onchange = function () {
        const tr = this.closest('tr');
        const activeChk = tr?.querySelector('.ac-item-active');
        const targetType = this.value;
        if (activeChk && activeChk.checked && (targetType === 'armor' || targetType === 'shield')) {
          document.querySelectorAll('#acItemsTbody tr').forEach(otherTr => {
            if (otherTr !== tr) {
              const otherType = otherTr.querySelector('.ac-item-type')?.value || 'armor';
              if (otherType === targetType) {
                const otherChk = otherTr.querySelector('.ac-item-active');
                if (otherChk) otherChk.checked = false;
              }
            }
          });
        }
        recalculateAll();
        triggerAutoSave();
      };
    });
    document.querySelectorAll('.ac-item-name').forEach(inp => {
      inp.onchange = function () {
        recalculateAll();
        triggerAutoSave();
      };
    });
    document.querySelectorAll('.btn-del-save-row').forEach(btn => {
      btn.onclick = function () {
        this.closest('tr').remove();
        recalculateAll();
        triggerAutoSave();
      };
    });
    document.querySelectorAll('.save-item-bonus, .save-item-weight').forEach(inp => {
      inp.oninput = function () {
        recalculateAll();
        triggerAutoSave();
      };
    });
    document.querySelectorAll('.save-item-active').forEach(chk => {
      chk.onchange = function () {
        recalculateAll();
        triggerAutoSave();
      };
    });
    document.querySelectorAll('.save-item-target, .save-item-type').forEach(sel => {
      sel.onchange = function () {
        recalculateAll();
        triggerAutoSave();
      };
    });
    document.querySelectorAll('.save-item-name').forEach(inp => {
      inp.onchange = function () {
        recalculateAll();
        triggerAutoSave();
      };
    });
  }

  const diceDrawer = document.getElementById('diceDrawer');
  const btnToggleDrawer = document.getElementById('btnToggleDiceDrawer');
  const btnCloseDrawer = document.getElementById('btnCloseDiceDrawer');
  const rollValEl = document.getElementById('diceRollValue');
  const rollLabelEl = document.getElementById('diceRollLabel');
  const rollBreakdownEl = document.getElementById('diceRollBreakdown');
  const rollHistoryEl = document.getElementById('diceRollHistory');

  if (btnToggleDrawer) {
    btnToggleDrawer.addEventListener('click', () => {
      if (diceDrawer) {
        diceDrawer.style.display = (diceDrawer.style.display === 'none' || !diceDrawer.style.display) ? 'block' : 'none';
      }
    });
  }
  if (btnCloseDrawer) {
    btnCloseDrawer.addEventListener('click', () => {
      if (diceDrawer) diceDrawer.style.display = 'none';
    });
  }

  function rollDice(sides) {
    if (diceDrawer) diceDrawer.style.display = 'block';
    const roll = Math.floor(Math.random() * sides) + 1;
    if (rollLabelEl) rollLabelEl.textContent = `d${sides} ${i18n.roll}`;
    if (rollValEl) {
      rollValEl.textContent = roll;
      rollValEl.className = 'mb-0 fw-bold font-monospace text-primary animate__animated animate__rubberBand';
    }
    if (rollBreakdownEl) rollBreakdownEl.textContent = `1d${sides} result: ${roll}`;
    logRollResult(`d${sides} ${i18n.roll}`, roll, `[1d${sides}]`);
    return roll;
  }

  function rollD20WithMod(mod, label) {
    if (diceDrawer) diceDrawer.style.display = 'block';
    const d20 = Math.floor(Math.random() * 20) + 1;
    const total = d20 + mod;
    if (rollLabelEl) rollLabelEl.textContent = label || `d20 ${i18n.check}`;
    if (rollValEl) {
      rollValEl.textContent = total;
      if (d20 === 20) {
        rollValEl.className = 'mb-0 fw-bold font-monospace text-success animate__animated animate__tada';
      } else if (d20 === 1) {
        rollValEl.className = 'mb-0 fw-bold font-monospace text-danger animate__animated animate__shakeX';
      } else {
        rollValEl.className = 'mb-0 fw-bold font-monospace text-primary animate__animated animate__bounceIn';
      }
    }
    const breakdown = `[d20 (${d20}) + Bonus (${formatMod(mod)})] = ${total}`;
    if (rollBreakdownEl) {
      rollBreakdownEl.textContent = d20 === 20 ? `${breakdown} (NATURAL 20 - CRITICAL!)` : (d20 === 1 ? `${breakdown} (NATURAL 1 - FUMBLE!)` : breakdown);
    }
    logRollResult(label || 'd20', total, `[1d20 (${d20}) ${formatMod(mod)}]`);
    return total;
  }

  window.rollDice = rollDice;
  window.rollD20WithMod = rollD20WithMod;

  function logRollResult(title, total, breakdown) {
    if (!rollHistoryEl) return;
    const time = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const logItem = `
      <div class="d-flex align-items-center justify-content-between border-bottom border-secondary border-opacity-10 py-1">
        <span class="text-truncate me-2" style="max-width: 140px;">${title}</span>
        <span class="text-body-secondary small me-2">${breakdown}</span>
        <span class="badge bg-label-warning font-monospace fw-bold">${total}</span>
      </div>
    `;
    rollHistoryEl.insertAdjacentHTML('afterbegin', logItem);
  }

  function attachWeaponEvents() {

    document.querySelectorAll('.btn-del-weapon').forEach(btn => {
      btn.onclick = function () {
        this.closest('.weapon-row').remove();
        recalculateAll();
        triggerAutoSave();
      };
    });

    document.querySelectorAll('.wp-name, .wp-atk-type, .wp-base-die, .wp-enh, .wp-misc-atk, .wp-misc-dmg, .wp-crit-range, .wp-crit-mult, .wp-ammo').forEach(inp => {
      const evtType = (inp.tagName === 'SELECT' || inp.type === 'checkbox') ? 'change' : 'input';
      inp.addEventListener(evtType, () => {
        recalculateAll();
        triggerAutoSave();
      });
    });

    document.querySelectorAll('.wp-atk-total').forEach(btn => {
      btn.onclick = function () {
        const row = this.closest('.weapon-row');
        const name = row?.querySelector('.wp-name')?.value || 'Weapon';
        const total = parseInt(this.textContent, 10) || 0;
        rollD20WithMod(total, `${name} Attack Roll`);
      };
    });
  }

  function getCharacterFeats() {
    const feats = [];
    document.querySelectorAll('#featsContainer .feat-title').forEach(el => {
      const t = el.textContent.trim();
      if (t) feats.push(t);
    });
    return feats;
  }

  function hasImprovedCriticalForWeapon(weaponName) {
    const wName = (weaponName || '').toLowerCase().trim();
    const feats = getCharacterFeats();
    for (const feat of feats) {
      const fLower = feat.toLowerCase().trim();
      if (fLower.includes('improved critical') || fLower.includes('imp. critical') || fLower.includes('imp critical')) {

        const match = fLower.match(/\(([^)]+)\)/);
        if (match) {
          const targetWeapon = match[1].trim();
          if (wName.includes(targetWeapon) || targetWeapon.includes(wName)) {
            return true;
          }
        } else {

          const words = wName.split(/[\s+]+/).filter(w => w.length > 2);
          if (words.some(w => fLower.includes(w)) || fLower === 'improved critical' || fLower === 'imp. critical') {
            return true;
          }
        }
      }
    }
    return false;
  }

  function hasWeaponFeat(featName, weaponName) {
    const normalizedWeapon = (weaponName || '').toLowerCase().trim();
    if (!normalizedWeapon) return false;
    return getCharacterFeats().some(feat => {
      const normalizedFeat = feat.toLowerCase().trim();
      if (!normalizedFeat.startsWith(featName)) return false;
      const target = normalizedFeat.match(/\(([^)]+)\)/)?.[1]?.trim();
      return !target || normalizedWeapon.includes(target) || target.includes(normalizedWeapon);
    });
  }

  function recalculateWeapons(mods, mainBab) {
    document.querySelectorAll('.weapon-row').forEach(row => {
      const wpName = row.querySelector('.wp-name')?.value || '';
      const atkType = row.querySelector('.wp-atk-type')?.value || 'melee';
      const baseDie = row.querySelector('.wp-base-die')?.value || '1d8';
      const enh = parseInt(row.querySelector('.wp-enh')?.value, 10) || 0;
      const miscAtk = parseInt(row.querySelector('.wp-misc-atk')?.value, 10) || 0;
      const miscDmg = parseInt(row.querySelector('.wp-misc-dmg')?.value, 10) || 0;
      const critRangeStr = row.querySelector('.wp-crit-range')?.value || '20';
      const critMult = parseInt(row.querySelector('.wp-crit-mult')?.value, 10) || 2;

      const hasImprovedCrit = hasImprovedCriticalForWeapon(wpName);
      const featIndicator = row.querySelector('.wp-feat-crit-indicator');

      const isBomb = wpName.toLowerCase().includes('bomb') || wpName.toLowerCase().includes('bomba');

      const abilityMod = (atkType === 'ranged' || isBomb) ? (mods.dex || 0) : (mods.str || 0);
      const focusBonus = hasWeaponFeat('weapon focus', wpName) ? 1 : 0;
      const specializationBonus = hasWeaponFeat('weapon specialization', wpName) ? 2 : 0;
      const atkTotal = mainBab + abilityMod + enh + miscAtk + focusBonus;
      const atkTotalEl = row.querySelector('.wp-atk-total');
      if (atkTotalEl) {
        const iterativeCount = Math.max(1, Math.floor((mainBab - 1) / 5) + 1);
        atkTotalEl.textContent = Array.from({ length: iterativeCount }, (_, index) => formatMod(atkTotal - index * 5)).join('/');
      }

      const atkFormulaEl = row.querySelector('.wp-atk-formula');
      const abLabel = (atkType === 'ranged' || isBomb) ? 'DEX' : 'STR';
      if (atkFormulaEl) {
        if (isBomb) {
          atkFormulaEl.textContent = `${formatMod(mainBab)}(BAB) ${formatMod(abilityMod)}(DEX Touch) ${enh ? formatMod(enh)+'(Enh)' : ''} ${miscAtk ? formatMod(miscAtk)+'(Misc)' : ''}`.replace(/\s+/g, ' ').trim();
        } else {
          atkFormulaEl.textContent = `${formatMod(mainBab)}(BAB) ${formatMod(abilityMod)}(${abLabel}) ${focusBonus ? '+1(Weapon Focus)' : ''} ${enh ? formatMod(enh)+'(Enh)' : ''} ${miscAtk ? formatMod(miscAtk)+'(Misc)' : ''}`.replace(/\s+/g, ' ').trim();
        }
      }

      const dmgMod = isBomb
        ? (mods.int || 0) + enh + miscDmg
        : (atkType === 'melee' ? (mods.str || 0) + enh : enh) + miscDmg + specializationBonus;
      const dmgTotalEl = row.querySelector('.wp-dmg-total');
      if (dmgTotalEl) {
        dmgTotalEl.textContent = dmgMod !== 0 ? `${baseDie}${formatMod(dmgMod)}` : baseDie;
      }

      const dmgFormulaEl = row.querySelector('.wp-dmg-formula');
      if (dmgFormulaEl) {
        if (isBomb) {
          dmgFormulaEl.textContent = `${baseDie} ${formatMod(mods.int || 0)}(INT) ${enh ? formatMod(enh)+'(Enh)' : ''} [Fire/Splash]`.replace(/\s+/g, ' ').trim();
        } else if (atkType === 'melee') {
          dmgFormulaEl.textContent = `${baseDie} ${formatMod(mods.str || 0)}(STR) ${specializationBonus ? formatMod(specializationBonus)+'(Weapon Specialization)' : ''} ${enh ? formatMod(enh)+'(Enh)' : ''} ${miscDmg ? formatMod(miscDmg)+'(Misc)' : ''}`.replace(/\s+/g, ' ').trim();
        } else {
          dmgFormulaEl.textContent = `${baseDie} ${enh ? formatMod(enh)+'(Enh)' : 'no STR'} ${miscDmg ? formatMod(miscDmg)+'(Misc)' : ''} ${specializationBonus ? formatMod(specializationBonus)+'(Weapon Specialization)' : ''}`.replace(/\s+/g, ' ').trim();
        }
      }

      let critLow = 20, critHigh = 20;
      const critMatch = critRangeStr.match(/(\d+)(?:-(\d+))?/);
      if (critMatch) {
        critLow = parseInt(critMatch[1], 10) || 20;
        critHigh = critMatch[2] ? parseInt(critMatch[2], 10) : critLow;
        if (critHigh < critLow) critHigh = 20;
      }

      let threatRange = 21 - critLow;
      if (hasImprovedCrit) threatRange *= 2;
      const finalCritLow = 21 - threatRange;
      const critRangeDisplay = finalCritLow < 20 ? `${finalCritLow}-20/x${critMult}` : `20/x${critMult}`;

      if (featIndicator) {
        if (hasImprovedCrit) {
          featIndicator.classList.remove('d-none');
          featIndicator.title = `Feat: Improved Critical aktif (${critRangeDisplay})!`;
        } else {
          featIndicator.classList.add('d-none');
        }
      }

      const dieMatch = baseDie.match(/(\d+)d(\d+)/i);
      const diceCount = dieMatch ? parseInt(dieMatch[1], 10) : 1;
      const diceSides = dieMatch ? parseInt(dieMatch[2], 10) : (isBomb ? 6 : 8);

      let critDiceCount = diceCount * critMult;
      let critDmgMod = dmgMod * critMult;

      if (isBomb) {

        critDiceCount = (1 * critMult) + (diceCount - 1);
        critDmgMod = ((mods.int || 0) * critMult) + (enh * critMult);
      }

      const critDmgTotalEl = row.querySelector('.wp-crit-dmg-total');
      if (critDmgTotalEl) {
        critDmgTotalEl.textContent = critDmgMod !== 0 ? `${critDiceCount}d${diceSides}${formatMod(critDmgMod)}` : `${critDiceCount}d${diceSides}`;
      }

      const critDmgFormulaEl = row.querySelector('.wp-crit-dmg-formula');
      if (critDmgFormulaEl) {
        if (isBomb) {
          critDmgFormulaEl.textContent = `1d6x${critMult} + ${diceCount - 1}d6 + INTx${critMult}`;
        } else {
          critDmgFormulaEl.textContent = `x${critMult} | ${critRangeDisplay}`;
        }
      }

      if (isBomb) {
        const ammoEl = row.querySelector('.wp-ammo');
        if (ammoEl && (!ammoEl.value || ammoEl.value.includes('/day'))) {
          const lvl = Math.min(20, Math.max(1, parseInt(document.getElementById('sheetLevelInput')?.value, 10) || 1));
          ammoEl.value = `${Math.max(1, lvl + (mods.int || 0))}/day`;
        }
      }
    });
  }

  document.getElementById('sheetClassSelect')?.addEventListener('change', onClassOrLevelChange);
  document.getElementById('sheetLevelInput')?.addEventListener('input', onClassOrLevelChange);
  document.getElementById('sheetLevelInput')?.addEventListener('change', onClassOrLevelChange);
  document.getElementById('sheetRaceInput')?.addEventListener('input', onClassOrLevelChange);
  document.getElementById('sheetRaceInput')?.addEventListener('change', onClassOrLevelChange);

  document.getElementById('btnLvlUp')?.addEventListener('click', () => {
    const el = document.getElementById('sheetLevelInput');
    const cur = parseInt(el?.value, 10) || 1;
    if (cur < 20) {
      el.value = cur + 1;
      onClassOrLevelChange();
    }
  });

  document.getElementById('btnLvlDown')?.addEventListener('click', () => {
    const el = document.getElementById('sheetLevelInput');
    const cur = parseInt(el?.value, 10) || 1;
    if (cur > 1) {
      el.value = cur - 1;
      onClassOrLevelChange();
    }
  });

  const btnGeneratePdf = document.getElementById('btn-generate-pdf');
  if (btnGeneratePdf) {
    btnGeneratePdf.addEventListener('click', generateOfficialPdf);
  }

  const btnAddMc = document.getElementById('btn-add-multiclass');
  if (btnAddMc) {
    btnAddMc.addEventListener('click', openAddMulticlassPrompt);
  }

  const btnCharModal = document.getElementById('btn-characters-modal');
  if (btnCharModal) {
    btnCharModal.addEventListener('click', () => {
      const modalEl = document.getElementById('modalCharacters');
      if (modalEl && window.bootstrap) {
        const m = new bootstrap.Modal(modalEl);
        m.show();
        loadCharactersList();
      }
    });
  }

  const btnNewChar = document.getElementById('btn-new-character');
  if (btnNewChar) {
    btnNewChar.addEventListener('click', () => {
      if (!confirm('Create a new blank character sheet?')) return;
      deleteCookie('pf_active_char_id');
      deleteCookie('pf_active_char_name');
      deleteCookie('pf_sheet_draft');
      window.location.href = window.location.pathname + '?new=1';
    });
  }

  const btnModalNewChar = document.getElementById('btn-modal-new-char');
  if (btnModalNewChar) {
    btnModalNewChar.addEventListener('click', () => {
      deleteCookie('pf_active_char_id');
      deleteCookie('pf_active_char_name');
      deleteCookie('pf_sheet_draft');
      window.location.href = window.location.pathname + '?new=1';
    });
  }

  const btnDownloadJson = document.getElementById('btn-download-json');
  if (btnDownloadJson) {
    btnDownloadJson.addEventListener('click', () => {
      const payload = buildFastSheetPayload();
      const str = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
      const a = document.createElement('a');
      a.href = str;
      a.download = ((currentChar?.name || 'character').replace(/\s+/g, '_')) + '.json';
      document.body.appendChild(a);
      a.click();
      a.remove();
      showToast('Character JSON downloaded!', 'success');
    });
  }

  const btnImportJson = document.getElementById('btn-import-json');
  const fileInput = document.getElementById('file-input');
  if (btnImportJson && fileInput) {
    btnImportJson.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          populateSheetFromData(parsed);
          showToast('Character JSON imported successfully!', 'success');
        } catch (err) {
          showToast('Invalid JSON file', 'danger');
        }
      };
      reader.readAsText(file);
      e.target.value = '';
    });
  }

  const btnToggleDiceDrawer = document.getElementById('btnToggleDiceDrawer');
  const btnCloseDiceDrawer = document.getElementById('btnCloseDiceDrawer');
  if (btnToggleDiceDrawer) {
    btnToggleDiceDrawer.addEventListener('click', () => {
      const drawer = document.getElementById('diceDrawer');
      if (drawer) {
        drawer.style.display = (drawer.style.display === 'none' || !drawer.style.display) ? 'block' : 'none';
      }
    });
  }
  if (btnCloseDiceDrawer) {
    btnCloseDiceDrawer.addEventListener('click', () => {
      const drawer = document.getElementById('diceDrawer');
      if (drawer) drawer.style.display = 'none';
    });
  }

  const btnToggleLang = document.getElementById('btn-toggle-lang');
  if (btnToggleLang) {
    btnToggleLang.addEventListener('click', () => {
      currentLang = 'EN';
      localStorage.setItem('pf_lang', 'EN');
      setCookie('pf_lang', 'EN', 30);
      applyI18n();
      showToast('Language is set to English', 'info');
    });
  }

  applyI18n();

  function switchPane(targetId) {
    if (!targetId) return;

    document.querySelectorAll('.pf-section-pane').forEach(p => {
      p.classList.remove('active-pane');
    });
    const targetPane = document.getElementById(targetId);
    if (targetPane) {
      targetPane.classList.add('active-pane');
    }

    document.querySelectorAll('.pf-nav-tab').forEach(tab => {
      if (tab.getAttribute('data-target') === targetId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    document.querySelectorAll('.pf-dock-btn[data-target]').forEach(btn => {
      if (btn.getAttribute('data-target') === targetId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (window.innerWidth < 1200) {
      const navEl = document.getElementById('mainSectionNav');
      if (navEl) {
        const topPos = navEl.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: Math.max(0, topPos), behavior: 'smooth' });
      }
    }
  }

  function setupResponsiveNavigation() {

    document.querySelectorAll('.pf-nav-tab').forEach(tab => {
      tab.addEventListener('click', function () {
        const target = this.getAttribute('data-target');
        switchPane(target);
      });
    });

    document.querySelectorAll('.pf-dock-btn[data-target]').forEach(btn => {
      btn.addEventListener('click', function () {
        const target = this.getAttribute('data-target');
        switchPane(target);
      });
    });

    const dockDice = document.getElementById('btnDockDice');
    if (dockDice) {
      dockDice.addEventListener('click', () => {
        const drawer = document.getElementById('diceDrawer');
        if (drawer) {
          const isHidden = (drawer.style.display === 'none' || !drawer.style.display);
          drawer.style.display = isHidden ? 'block' : 'none';
          if (isHidden) {
            drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
      });
    }

    document.querySelectorAll('.skill-search-filter').forEach(inp => {
      inp.addEventListener('input', function () {
        const q = this.value.toLowerCase().trim();
        document.querySelectorAll('#skillsTableBody tr').forEach(tr => {
          const name = tr.querySelector('.skill-name-label')?.textContent.toLowerCase() || '';
          const sub = tr.querySelector('.skill-custom-subname')?.value.toLowerCase() || '';
          if (!q || name.includes(q) || sub.includes(q)) {
            tr.style.display = '';
          } else {
            tr.style.display = 'none';
          }
        });
      });
    });

    document.querySelectorAll('.ability-mod-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const ab = this.getAttribute('data-ab') || 'str';
        const scoreEl = document.getElementById(`score_${ab}`);
        const score = parseInt(scoreEl ? scoreEl.value : 10, 10) || 10;
        const mod = calcMod(score);
        const abNames = {
          str: 'Strength',
          dex: 'Dexterity',
          con: 'Constitution',
          int: 'Intelligence',
          wis: 'Wisdom',
          cha: 'Charisma'
        };
        const name = abNames[ab] || ab.toUpperCase();
        rollD20WithMod(mod, `${name} Check (${formatMod(mod)})`);
      });
    });
  }
  setupResponsiveNavigation();

  document.querySelectorAll('.ability-score-input, .ability-temp-adj').forEach(inp => {
    inp.addEventListener('input', () => {
      const conMod = calcMod(document.getElementById('score_con')?.value);
      const dexMod = calcMod(document.getElementById('score_dex')?.value);
      const wisMod = calcMod(document.getElementById('score_wis')?.value);
      const fortAb = document.getElementById('saveAbility_fort');
      const refAb = document.getElementById('saveAbility_ref');
      const willAb = document.getElementById('saveAbility_will');
      if (fortAb && (inp.id.includes('con') || !inp.id)) fortAb.value = conMod;
      if (refAb && (inp.id.includes('dex') || !inp.id)) refAb.value = dexMod;
      if (willAb && (inp.id.includes('wis') || !inp.id)) willAb.value = wisMod;

      scheduleRecalculate();
      triggerAutoSave();
    });
  });

  ['fort', 'ref', 'will'].forEach(k => {
    ['Base', 'Ability', 'Magic', 'Misc'].forEach(field => {
      const el = document.getElementById(`save${field}_${k}`);
      if (el) {
        el.addEventListener('input', () => {
          recalculateSaveTotal(k);
          triggerAutoSave();
        });
        el.addEventListener('change', () => {
          recalculateSaveTotal(k);
          triggerAutoSave();
        });
      }
    });
  });

  function recalculateSaveTotal(k) {
    const base = parseInt(document.getElementById(`saveBase_${k}`)?.value, 10) || 0;
    const ability = parseInt(document.getElementById(`saveAbility_${k}`)?.value, 10) || 0;
    const magic = parseInt(document.getElementById(`saveMagic_${k}`)?.value, 10) || 0;
    const misc = parseInt(document.getElementById(`saveMisc_${k}`)?.value, 10) || 0;
    const total = base + ability + magic + misc;
    const totalEl = document.getElementById(`saveTotal_${k}`);
    if (totalEl) totalEl.textContent = formatMod(total);
  }

  const castingStatSelect = document.getElementById('sheetCastingStat');
  if (castingStatSelect) {
    castingStatSelect.addEventListener('change', () => {
      recalculateAll();
      triggerAutoSave();
    });
  }

  document.querySelectorAll('.ability-mod-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const abKey = this.getAttribute('data-ab');
      const valSpan = document.getElementById(`mod_val_${abKey}`) || this.querySelector('span') || this;
      const mod = parseInt(valSpan.textContent, 10) || 0;
      rollD20WithMod(mod, `${abKey.toUpperCase()} ${i18n.check}`);
    });
  });

  document.querySelectorAll('.btn-roll-save').forEach(btn => {
    btn.addEventListener('click', function () {
      const saveType = this.getAttribute('data-save');
      const val = parseInt(this.textContent, 10) || 0;
      rollD20WithMod(val, `${saveType.toUpperCase()} ${i18n.savingThrow}`);
    });
  });

  const btnCmb = document.getElementById('btnRollCmb');
  if (btnCmb) {
    btnCmb.addEventListener('click', () => {
      const cmb = parseInt(document.getElementById('sheetCmbTotal').textContent, 10) || 0;
      rollD20WithMod(cmb, `CMB ${i18n.check}`);
    });
  }

  const btnInit = document.getElementById('btnRollInit');
  if (btnInit) {
    btnInit.addEventListener('click', () => {
      const init = parseInt(document.getElementById('sheetInitTotal').textContent, 10) || 0;
      rollD20WithMod(init, `Initiative ${i18n.check}`);
    });
  }

  const btnRollHp = document.getElementById('btnModalRollHp');
  if (btnRollHp) {
    btnRollHp.addEventListener('click', () => {
      const lvl = Math.min(20, Math.max(1, parseInt(document.getElementById('sheetLevelInput').value, 10) || 1));
      const classKey = document.getElementById('sheetClassSelect').value;
      const hdStr = (pfData.classes[classKey] && pfData.classes[classKey].hit_die) || 'd10';
      const sides = parseInt(hdStr.replace('d', ''), 10) || 10;

      for (let i = 2; i <= lvl; i++) {
        sData.hpRolls[i] = Math.floor(Math.random() * sides) + 1;
      }
      recalculateAll();
      triggerAutoSave();
    });
  }

  const btnAvgHp = document.getElementById('btnModalSetAverage');
  if (btnAvgHp) {
    btnAvgHp.addEventListener('click', () => {
      const lvl = Math.min(20, Math.max(1, parseInt(document.getElementById('sheetLevelInput').value, 10) || 1));
      const classKey = document.getElementById('sheetClassSelect').value;
      const hdStr = (pfData.classes[classKey] && pfData.classes[classKey].hit_die) || 'd10';
      const sides = parseInt(hdStr.replace('d', ''), 10) || 10;
      const avg = Math.floor(sides / 2) + 1;

      for (let i = 2; i <= lvl; i++) {
        sData.hpRolls[i] = avg;
      }
      recalculateAll();
      triggerAutoSave();
    });
  }

  const tabBothBtn = document.getElementById('tab-both-btn');
  if (tabBothBtn) {
    tabBothBtn.addEventListener('click', () => {
      const container = document.getElementById('bothPagesContainer');
      const page1El = document.getElementById('tab-page1');
      const page2El = document.getElementById('tab-page2');
      if (!container || !page1El || !page2El) return;

      const p1 = page1El.cloneNode(true);
      const p2 = page2El.cloneNode(true);

      p1.classList.add('show', 'active', 'mb-5');
      p2.classList.add('show', 'active', 'page-break');

      container.innerHTML = '';
      container.appendChild(p1);
      container.appendChild(p2);
    });
  }

  let autoSaveTimeout = null;
  function triggerAutoSave() {
    const indicator = document.getElementById('saveStatusIndicator');
    if (indicator) {
      indicator.style.display = '';
      indicator.className = 'pf-save-status pf-save-status--saving';
      indicator.innerHTML = '<span class="spinner-border spinner-border-sm me-1" style="width:0.75rem;height:0.75rem;border-width:2px;"></span>' + i18n.saving;
    }
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
      saveAllData();
    }, 600);
  }

  function renderMulticlassUI() {
    const container = document.getElementById('multiclass-rows');
    const summaryBadge = document.getElementById('multiclass-summary-badge');
    const lvlCounter = document.getElementById('sheetLvlCounter');
    if (!container) return;

    container.innerHTML = '';

    const mainLvl = parseInt(document.getElementById('sheetLevelInput')?.value, 10) || 1;
    const classSel = document.getElementById('sheetClassSelect');
    const mainClassKey = (classSel?.value || 'omdura').toLowerCase();
    const mainClsMeta = pfData.classes[mainClassKey] || {};
    const mainClsName = mainClsMeta.name || (classSel ? (classSel.options[classSel.selectedIndex]?.text?.split('(')[0]?.trim() || 'Omdura') : 'Omdura');

    if (!Array.isArray(multiclassState) || multiclassState.length === 0) {
      if (summaryBadge) {
        summaryBadge.style.display = 'none';
        summaryBadge.textContent = '';
      }
      if (lvlCounter) {
        lvlCounter.textContent = `${mainLvl}`;
      }
      return;
    }

    const parts = [`${mainClsName} ${mainLvl}`];
    let totalLvl = mainLvl;

    const primaryRow = document.createElement('div');
    primaryRow.className = 'multiclass-row-item d-flex align-items-center justify-content-between flex-wrap gap-2 p-1 rounded bg-label-primary bg-opacity-10 border border-primary border-opacity-20';
    primaryRow.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        <span class="badge bg-primary font-monospace py-1 px-2">Primary</span>
        <strong class="text-heading small">${escapeHtml(mainClsName)}</strong>
        <span class="badge bg-label-secondary font-monospace" style="font-size:0.68rem;">HD: ${mainClsMeta.hit_die || 'd8'}</span>
        <span class="badge bg-label-info font-monospace" style="font-size:0.68rem;">Ranks: ${(mainClsMeta.skill_ranks || 4)}+INT</span>
      </div>
      <div class="d-flex align-items-center gap-2">
        <div class="input-group input-group-sm" style="width: 105px;">
          <button class="btn btn-outline-secondary px-2 btn-main-lvl-down" type="button" title="Decrease Level"><i class="icon-base ti tabler-minus"></i></button>
          <input type="number" class="form-control form-control-sm pf-box-input font-monospace text-center inp-main-level" min="1" max="20" value="${mainLvl}" />
          <button class="btn btn-outline-secondary px-2 btn-main-lvl-up" type="button" title="Increase Level"><i class="icon-base ti tabler-plus"></i></button>
        </div>
      </div>
    `;
    container.appendChild(primaryRow);

    primaryRow.querySelector('.btn-main-lvl-down').addEventListener('click', () => {
      const lvlInp = document.getElementById('sheetLevelInput');
      const cur = parseInt(lvlInp?.value, 10) || 1;
      if (cur > 1) {
        if (lvlInp) lvlInp.value = cur - 1;
        onClassOrLevelChange();
      }
    });
    primaryRow.querySelector('.btn-main-lvl-up').addEventListener('click', () => {
      const lvlInp = document.getElementById('sheetLevelInput');
      const cur = parseInt(lvlInp?.value, 10) || 1;
      if (cur < 20) {
        if (lvlInp) lvlInp.value = cur + 1;
        onClassOrLevelChange();
      }
    });
    primaryRow.querySelector('.inp-main-level').addEventListener('change', (e) => {
      const val = Math.max(1, Math.min(20, parseInt(e.currentTarget.value, 10) || 1));
      const lvlInp = document.getElementById('sheetLevelInput');
      if (lvlInp) lvlInp.value = val;
      onClassOrLevelChange();
    });

    multiclassState.forEach((mc, idx) => {
      totalLvl += mc.level;
      parts.push(`${mc.name} ${mc.level}`);

      const row = document.createElement('div');
      row.className = 'multiclass-row-item d-flex align-items-center justify-content-between flex-wrap gap-2 p-1 rounded border border-secondary border-opacity-10';
      row.innerHTML = `
        <div class="d-flex align-items-center gap-2">
          <span class="badge bg-label-warning font-monospace py-1 px-2">Sub ${idx + 1}</span>
          <strong class="text-heading small">${escapeHtml(mc.name)}</strong>
          <span class="badge bg-label-secondary font-monospace" style="font-size:0.68rem;">HD: ${mc.hitDie || 'd8'}</span>
          <span class="badge bg-label-info font-monospace" style="font-size:0.68rem;">Ranks: ${mc.skillRanks || 2}+INT</span>
        </div>
        <div class="d-flex align-items-center gap-2">
          <div class="input-group input-group-sm" style="width: 105px;">
            <button class="btn btn-outline-secondary px-2 btn-mc-lvl-down" type="button" data-idx="${idx}" title="Decrease Level"><i class="icon-base ti tabler-minus"></i></button>
            <input type="number" class="form-control form-control-sm pf-box-input font-monospace text-center inp-mc-level" min="1" max="20" value="${mc.level}" data-idx="${idx}" />
            <button class="btn btn-outline-secondary px-2 btn-mc-lvl-up" type="button" data-idx="${idx}" title="Increase Level"><i class="icon-base ti tabler-plus"></i></button>
          </div>
          <button type="button" class="btn btn-icon btn-text-danger btn-xs btn-del-mc" data-idx="${idx}" title="Remove Class">
            <i class="icon-base ti tabler-x"></i>
          </button>
        </div>
      `;
      container.appendChild(row);
    });

    if (summaryBadge) {
      summaryBadge.style.display = 'inline-flex';
      summaryBadge.textContent = `${parts.join(' / ')} (Total Level ${totalLvl})`;
    }
    if (lvlCounter) {
      lvlCounter.textContent = `Total ${totalLvl}`;
    }

    container.querySelectorAll('.btn-del-mc').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-idx'), 10);
        multiclassState.splice(idx, 1);
        onClassOrLevelChange();
      });
    });

    container.querySelectorAll('.btn-mc-lvl-down').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-idx'), 10);
        if (multiclassState[idx].level > 1) {
          multiclassState[idx].level--;
          onClassOrLevelChange();
        }
      });
    });

    container.querySelectorAll('.btn-mc-lvl-up').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-idx'), 10);
        if (multiclassState[idx].level < 20) {
          multiclassState[idx].level++;
          onClassOrLevelChange();
        }
      });
    });

    container.querySelectorAll('.inp-mc-level').forEach(inp => {
      inp.addEventListener('change', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-idx'), 10);
        multiclassState[idx].level = Math.max(1, Math.min(20, parseInt(e.currentTarget.value, 10) || 1));
        onClassOrLevelChange();
      });
    });
  }

  function initMulticlassModal() {
    const modalEl = document.getElementById('modalAddMulticlass');
    const selectEl = document.getElementById('modalAddMcSelect');
    const lvlInp = document.getElementById('modalAddMcLvl');
    const btnDown = document.getElementById('btnModalMcLvlDown');
    const btnUp = document.getElementById('btnModalMcLvlUp');
    const btnConfirm = document.getElementById('btnConfirmAddMc');
    if (!modalEl || !selectEl) return;

    selectEl.innerHTML = '';
    const classSel = document.getElementById('sheetClassSelect');
    if (classSel && classSel.options.length > 0) {
      Array.from(classSel.options).forEach(opt => {
        const o = document.createElement('option');
        o.value = opt.value;
        o.textContent = opt.textContent;
        o.setAttribute('data-hd', opt.getAttribute('data-hd') || 'd8');
        o.setAttribute('data-ranks', opt.getAttribute('data-ranks') || '2');
        selectEl.appendChild(o);
      });
    } else {
      const classes = pfData.classes || {};
      Object.keys(classes).sort().forEach(k => {
        const c = classes[k];
        const o = document.createElement('option');
        o.value = k;
        o.textContent = `${c.name || k} (${c.hit_die || 'd8'} - ${c.skill_ranks || 2}+INT)`;
        o.setAttribute('data-hd', c.hit_die || 'd8');
        o.setAttribute('data-ranks', c.skill_ranks || '2');
        selectEl.appendChild(o);
      });
    }

    if (btnDown && lvlInp) {
      btnDown.onclick = () => {
        const cur = parseInt(lvlInp.value, 10) || 1;
        if (cur > 1) lvlInp.value = cur - 1;
      };
    }
    if (btnUp && lvlInp) {
      btnUp.onclick = () => {
        const cur = parseInt(lvlInp.value, 10) || 1;
        if (cur < 20) lvlInp.value = cur + 1;
      };
    }

    if (btnConfirm) {
      btnConfirm.onclick = () => {
        const key = selectEl.value;
        const lvl = Math.max(1, Math.min(20, parseInt(lvlInp.value, 10) || 1));
        const cData = pfData.classes[key] || {};
        const selOpt = selectEl.options[selectEl.selectedIndex];
        const name = cData.name || (selOpt ? selOpt.textContent.split('(')[0].trim() : key.toUpperCase());
        const hd = cData.hit_die || selOpt?.getAttribute('data-hd') || 'd8';
        const ranks = cData.skill_ranks || parseInt(selOpt?.getAttribute('data-ranks'), 10) || 2;

        const existing = multiclassState.find(m => m.class === key);
        if (existing) {
          existing.level = Math.min(20, existing.level + lvl);
        } else {
          multiclassState.push({
            class: key,
            name: name,
            level: lvl,
            hitDie: hd,
            skillRanks: ranks
          });
        }

        if (window.bootstrap && bootstrap.Modal) {
          const bsModal = bootstrap.Modal.getInstance(modalEl);
          if (bsModal) bsModal.hide();
        }

        onClassOrLevelChange();
        showToast(`Added ${name} Level ${lvl}`, 'success');
      };
    }
  }

  function openAddMulticlassPrompt() {
    const modalEl = document.getElementById('modalAddMulticlass');
    if (modalEl && window.bootstrap && bootstrap.Modal) {
      const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
      bsModal.show();
    } else {
      const classes = pfData.classes || {};
      const keyList = Object.keys(classes).sort();
      const res = prompt('Select Secondary Class key:\n' + keyList.slice(0, 15).join(', '), 'rogue');
      if (!res) return;
      const key = res.toLowerCase().trim();
      const cData = classes[key] || { name: key.toUpperCase(), hit_die: 'd8', skill_ranks: 2 };
      multiclassState.push({
        class: key,
        name: cData.name || key.toUpperCase(),
        level: 1,
        hitDie: cData.hit_die || 'd8',
        skillRanks: cData.skill_ranks || 2
      });
      onClassOrLevelChange();
      showToast(`Added ${cData.name || key} Level 1`, 'success');
    }
  }

  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `pf-toast`;
    let icon = 'tabler-info-circle text-primary';
    if (type === 'success') icon = 'tabler-check text-success';
    if (type === 'danger' || type === 'error') icon = 'tabler-alert-triangle text-danger';
    if (type === 'warning') icon = 'tabler-alert-circle text-warning';

    toast.innerHTML = `<i class="icon-base ti ${icon} fs-5"></i> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  function buildFastSheetPayload() {
    const charName = document.getElementById('sheetCharName')?.value?.trim() || '';
    const player = document.getElementById('sheetPlayerName')?.value || '';
    const alignment = document.getElementById('sheetAlignmentSelect')?.value || '';
    const classKey = document.getElementById('sheetClassSelect')?.value || 'paladin';
    const level = parseInt(document.getElementById('sheetLevelInput')?.value, 10) || 1;
    const race = document.getElementById('sheetRaceInput')?.value || 'Human';
    const eyesHair = document.getElementById('sheetEyesHairInput')?.value || '';
    const [hair = '', eyes = ''] = eyesHair.split('/').map(value => value.trim());
    const sheetData = currentChar?.sheetData || {};
    const gear = (sheetData.gear || []).map(item => typeof item === 'string' ? item : item.name).filter(Boolean);
    const feats = (sheetData.feats || []).map(feat => typeof feat === 'string' ? feat : feat.title).filter(Boolean);

    let classString = currentChar?.className || classKey;
    if (multiclassState && multiclassState.length > 0) {
      const parts = [`${currentChar?.className || classKey} ${level}`];
      multiclassState.forEach(mc => parts.push(`${mc.name} ${mc.level}`));
      classString = parts.join(' / ');
    }

    const skillsObj = {};
    if (currentChar?.sheetData?.skills) {
      for (const [skKey, skVal] of Object.entries(currentChar.sheetData.skills)) {
        skillsObj[skKey] = {
          ranks: skVal.ranks || 0,
          misc: skVal.misc || 0,
          total: skVal.total || 0,
          cs: !!(skVal.cs || skVal.isClassSkill)
        };
      }
    }

    return {
      basic: {
        'in-name': charName,
        'in-player': player,
        'in-alignment': alignment,
        'in-class': classString,
        'in-level': level,
        'in-race': race,
        'in-size': document.getElementById('sheetSizeSelect')?.value || 'Medium',
        'in-deity': document.getElementById('sheetDeityInput')?.value || '',
        'in-homeland': document.getElementById('sheetHomelandInput')?.value || '',
        'in-gender': document.getElementById('sheetGenderInput')?.value || '',
        'in-age': document.getElementById('sheetAgeInput')?.value || '',
        'in-height': document.getElementById('sheetHeightInput')?.value || '',
        'in-weight': document.getElementById('sheetWeightInput')?.value || '',
        'in-hair': sheetData.hair || hair,
        'in-eyes': sheetData.eyes || eyes,
        'in-xp': sheetData.currentXp || '',
        'in-str': parseInt(document.getElementById('score_str')?.value, 10) || 10,
        'in-dex': parseInt(document.getElementById('score_dex')?.value, 10) || 10,
        'in-con': parseInt(document.getElementById('score_con')?.value, 10) || 10,
        'in-int': parseInt(document.getElementById('score_int')?.value, 10) || 10,
        'in-wis': parseInt(document.getElementById('score_wis')?.value, 10) || 10,
        'in-cha': parseInt(document.getElementById('score_cha')?.value, 10) || 10,
        'in-bab': document.getElementById('sheetBabInput')?.value || '+1',
        'in-ac': parseInt(document.getElementById('sheetAcTotal')?.textContent, 10) || 10,
        'in-hp': parseInt(document.getElementById('sheetMaxHp')?.value, 10) || 12,
        'in-speed': parseInt(document.getElementById('sheetSpeedBase')?.value, 10) || 30,
        'in-fort': parseInt(document.getElementById('saveTotal_fort')?.textContent, 10) || 0,
        'in-ref': parseInt(document.getElementById('saveTotal_ref')?.textContent, 10) || 0,
        'in-will': parseInt(document.getElementById('saveTotal_will')?.textContent, 10) || 0,
        'in-cmb': parseInt(document.getElementById('sheetCmbTotal')?.textContent, 10) || 0,
        'in-cmd': parseInt(document.getElementById('sheetCmdTotal')?.textContent, 10) || 10,
        'in-speed-armor': parseInt(document.getElementById('sheetSpeedArmor')?.value, 10) || '',
        'in-init': parseInt(document.getElementById('sheetInitTotal')?.textContent, 10) || 0,
        'in-init-extra': parseInt(document.getElementById('sheetInitMisc')?.value, 10) || 0,
        'in-dr': document.getElementById('sheetDrInput')?.value || '',
        'in-sr': document.getElementById('sheetSrInput')?.value || '',
        'in-gp': document.getElementById('sheetMoneyGp')?.value || '',
        'in-sp': document.getElementById('sheetMoneySp')?.value || '',
        'in-cp': document.getElementById('sheetMoneyCp')?.value || '',
        'in-pp': document.getElementById('sheetMoneyPp')?.value || '',
        'in-gear': gear.join('\n'),
        'in-feats': feats.join(', '),
        'in-sq': [
          ...((currentChar?.sheetData?.traits ? Object.entries(currentChar.sheetData.traits).filter(([k, v]) => k !== 'custom' && v && v.name).map(([_, v]) => `Trait: ${v.name}${v.desc ? ' (' + v.desc + ')' : ''}`) : [])),
          ...((currentChar?.sheetData?.traits?.custom && Array.isArray(currentChar.sheetData.traits.custom)) ? currentChar.sheetData.traits.custom.filter(t => t && t.name).map(t => `Trait: ${t.name}${t.desc ? ' (' + t.desc + ')' : ''}`) : []),
          ...(currentChar?.sheetData?.specials || []).map(s => `${s.title}: ${s.desc}`)
        ].join('\n'),
        'in-languages': document.getElementById('sheetLanguages')?.value || currentChar?.sheetData?.languages || 'Common',
        'in-conditional-modifiers': document.getElementById('sheetSkillConditional')?.value || currentChar?.sheetData?.skillConditional || '',
        'in-save-conditional': document.getElementById('sheetSaveConditional')?.value || currentChar?.sheetData?.saveConditional || ''
      },
      sheetData: currentChar?.sheetData || {},
      dynamic: {
        classes: [{ class: classKey, name: currentChar?.className || classKey, level: level }, ...(multiclassState || [])],
        weapons: currentChar?.sheetData?.weapons || [],
        armors: currentChar?.sheetData?.acItems || [],
        ac_items: currentChar?.sheetData?.acItems || [],
        gear: currentChar?.sheetData?.gear || [],
        feats: currentChar?.sheetData?.feats || [],
        save_items: currentChar?.sheetData?.saveItems || [],
        skills: skillsObj
      }
    };
  }

  function generateOfficialPdf() {
    saveAllData();
    const payload = buildFastSheetPayload();
    const indicator = document.getElementById('saveStatusIndicator');
    if (indicator) {
      indicator.style.display = '';
      indicator.className = 'pf-save-status pf-save-status--saving';
      indicator.innerHTML = '<span class="spinner-border spinner-border-sm" style="width:0.75rem;height:0.75rem;border-width:2px;color:#ff4c51"></span>' + i18n.generatingPdf;
    }
    showToast('Generating official character PDF...', 'info');

    fetch('/api/generate-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => {
      if (!res.ok) throw new Error('PDF Generation failed: ' + res.statusText);
      return res.blob();
    })
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = ((currentChar?.name || 'Character').replace(/\s+/g, '_')) + '_FastSheet.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      showToast('Official PDF Generated Successfully!', 'success');
      if (indicator) {
        indicator.className = 'pf-save-status pf-save-status--success';
        indicator.innerHTML = '<i class="ti tabler-file-check"></i>' + i18n.pdfReady;
        clearTimeout(indicator._hideTimer);
        indicator._hideTimer = setTimeout(() => { indicator.style.display = 'none'; }, 2000);
      }
    })
    .catch(err => {
      console.error('PDF Generation Error:', err);
      showToast('PDF Error: ' + err.message, 'danger');
      if (indicator) {
        indicator.className = 'pf-save-status pf-save-status--error';
        indicator.innerHTML = '<i class="ti tabler-alert-circle"></i>' + i18n.pdfError;
        clearTimeout(indicator._hideTimer);
        indicator._hideTimer = setTimeout(() => { indicator.style.display = 'none'; }, 2000);
      }
    });
  }

  function loadCharactersList() {
    const container = document.getElementById('characters-list-container');
    if (!container) return;
    container.innerHTML = '<div class="text-center py-3 text-body-secondary"><span class="spinner-border spinner-border-sm me-2"></span>Loading character sheets...</div>';

    fetch('/api/characters')
      .then(r => r.json())
      .then(data => {
        const serverChars = data.characters || [];
        const localChars = getCharacters();

        const map = new Map();
        serverChars.forEach(c => map.set(c.name, c));
        localChars.forEach(c => {
          if (!map.has(c.name)) {
            map.set(c.name, {
              name: c.name,
              class: c.className || c.class || 'Unknown',
              level: c.level || 1,
              filename: (c.name || 'char').replace(/[^\w\-_\. ]/g, '_').trim().replace(/\s+/g, '_') + '.json'
            });
          }
        });

        const list = Array.from(map.values());
        if (list.length === 0) {
          container.innerHTML = '<div class="text-center py-4 text-body-secondary">No saved characters found. Click "+ New Character" to create one.</div>';
          return;
        }

        container.innerHTML = '';
        list.forEach(c => {
          const item = document.createElement('div');
          item.className = 'p-2_5 rounded border bg-body d-flex align-items-center justify-content-between flex-wrap gap-2';
          item.innerHTML = `
            <div class="d-flex align-items-center gap-2">
              <span class="avatar avatar-sm rounded bg-label-primary d-flex align-items-center justify-content-center">
                <i class="icon-base ti tabler-user fs-5"></i>
              </span>
              <div>
                <strong class="text-heading d-block small">${escapeHtml(c.name)}</strong>
                <small class="text-body-secondary font-monospace">${escapeHtml(c.class || 'Paladin')} • Level ${c.level || 1}</small>
              </div>
            </div>
            <div class="d-flex align-items-center gap-2">
              <button type="button" class="btn btn-sm btn-outline-primary rounded-pill px-3 btn-load-char" data-name="${escapeHtml(c.name)}" data-file="${escapeHtml(c.filename || '')}">
                <i class="icon-base ti tabler-folder-open me-1"></i> Load
              </button>
              <button type="button" class="btn btn-sm btn-icon btn-text-danger btn-del-char" data-name="${escapeHtml(c.name)}" data-file="${escapeHtml(c.filename || '')}" title="Delete Character">
                <i class="icon-base ti tabler-trash fs-5"></i>
              </button>
            </div>
          `;
          container.appendChild(item);
        });

        container.querySelectorAll('.btn-load-char').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const name = e.currentTarget.getAttribute('data-name');
            const file = e.currentTarget.getAttribute('data-file');
            loadCharacterByName(name, file);
            const modalEl = document.getElementById('modalCharacters');
            if (modalEl && window.bootstrap) {
              const m = bootstrap.Modal.getInstance(modalEl);
              if (m) m.hide();
            }
          });
        });

        container.querySelectorAll('.btn-del-char').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const name = e.currentTarget.getAttribute('data-name');
            const file = e.currentTarget.getAttribute('data-file');
            if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

            let all = getCharacters();
            all = all.filter(x => x.name !== name);
            saveCharacters(all);

            if (file) {
              fetch('/api/delete-character', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filename: file })
              }).catch(console.warn);
            }

            showToast(`Deleted "${name}"`, 'warning');
            loadCharactersList();
          });
        });
      })
      .catch(() => {
        const localChars = getCharacters();
        container.innerHTML = '';
        if (localChars.length === 0) {
          container.innerHTML = '<div class="text-center py-4 text-body-secondary">No saved characters found.</div>';
          return;
        }
        localChars.forEach(c => {
          const item = document.createElement('div');
          item.className = 'p-2_5 rounded border bg-body d-flex align-items-center justify-content-between flex-wrap gap-2';
          item.innerHTML = `
            <div class="d-flex align-items-center gap-2">
              <span class="avatar avatar-sm rounded bg-label-primary d-flex align-items-center justify-content-center">
                <i class="icon-base ti tabler-user fs-5"></i>
              </span>
              <div>
                <strong class="text-heading d-block small">${escapeHtml(c.name)}</strong>
                <small class="text-body-secondary font-monospace">${escapeHtml(c.className || c.class || 'Paladin')} • Level ${c.level || 1}</small>
              </div>
            </div>
            <button type="button" class="btn btn-sm btn-outline-primary rounded-pill px-3 btn-load-char" data-name="${escapeHtml(c.name)}">
              <i class="icon-base ti tabler-folder-open me-1"></i> Load
            </button>
          `;
          container.appendChild(item);
        });
        container.querySelectorAll('.btn-load-char').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const name = e.currentTarget.getAttribute('data-name');
            loadCharacterByName(name);
            const modalEl = document.getElementById('modalCharacters');
            if (modalEl && window.bootstrap) {
              const m = bootstrap.Modal.getInstance(modalEl);
              if (m) m.hide();
            }
          });
        });
      });
  }

  function loadCharacterByName(name, filename) {
    if (filename) {
      fetch(`/api/load-character?file=${encodeURIComponent(filename)}`)
        .then(r => r.json())
        .then(data => {
          if (data && (data.sheetData || data.basic)) {
            populateSheetFromData(data);
            showToast(`Loaded "${name}" from disk`, 'success');
            return;
          }
          fallbackLocal(name);
        })
        .catch(() => fallbackLocal(name));
    } else {
      fallbackLocal(name);
    }

    function fallbackLocal(n) {
      const all = getCharacters();
      const found = all.find(x => x.name === n);
      if (found) {
        populateSheetFromData(found);
        showToast(`Loaded "${n}" from storage`, 'success');
      }
    }
  }

  function populateSheetFromData(data) {
    if (!data) return;
    const loadedSheetData = data.sheetData || data;
    const basic = data.basic || {};

    const rawCharName = data.name || basic['in-name'] || loadedSheetData.name || '';
    const charName = rawCharName !== 'Valiant Adventurer' ? rawCharName : '';
    sData = loadedSheetData;
    currentChar = { ...currentChar, ...data, name: charName, sheetData: loadedSheetData };
    const nameEl = document.getElementById('sheetCharName');
    if (nameEl) nameEl.value = charName;
    const topName = document.getElementById('header-character-name');
    if (topName) topName.textContent = charName;

    const lvl = data.level || basic['in-level'] || loadedSheetData.level || 1;
    const lvlEl = document.getElementById('sheetLevelInput');
    if (lvlEl) lvlEl.value = lvl;
    const lvlCounter = document.getElementById('sheetLvlCounter');
    if (lvlCounter) lvlCounter.textContent = lvl;

    const classKey = data.classKey || (data.class ? String(data.class).toLowerCase() : null) || 'paladin';
    currentChar.classKey = classKey;
    currentChar.className = data.className || data.class || classKey;
    currentChar.level = parseInt(lvl, 10) || 1;
    currentChar.race = data.race || basic['in-race'] || 'Human';
    const classEl = document.getElementById('sheetClassSelect');
    if (classEl) {
      classEl.value = classKey;
      const opt = classEl.options[classEl.selectedIndex];
      if (opt) {
        document.getElementById('sheetHitDie').value = opt.getAttribute('data-hd') || 'd10';
        document.getElementById('sheetHitDieBadge').textContent = 'HD: ' + (opt.getAttribute('data-hd') || 'd10');
      }
    }

    if (data.dynamic && Array.isArray(data.dynamic.classes) && data.dynamic.classes.length > 1) {
      multiclassState = data.dynamic.classes.slice(1).map(c => ({
        class: c.class || c.name.toLowerCase(),
        name: c.name || c.class,
        level: c.level || 1,
        hitDie: c.hitDie || 'd8',
        skillRanks: c.skillRanks || 2
      }));
    } else if (Array.isArray(sData.multiclass)) {
      multiclassState = sData.multiclass;
    } else if (Array.isArray(data.multiclass)) {
      multiclassState = data.multiclass;
    } else {
      multiclassState = [];
    }
    renderMulticlassUI();

    if (sData.alignment || basic['in-alignment']) document.getElementById('sheetAlignmentSelect').value = normalizeAlignment(sData.alignment || basic['in-alignment']);
    const rawPlayer = sData.player || basic['in-player'] || '';
    document.getElementById('sheetPlayerName').value = rawPlayer !== 'Valiant Adventurer' ? rawPlayer : '';
    document.getElementById('sheetDeityInput').value = sData.deity || basic['in-deity'] || '';
    document.getElementById('sheetHomelandInput').value = sData.homeland || basic['in-homeland'] || '';
    if (sData.size) document.getElementById('sheetSizeSelect').value = sData.size;
    const resolvedGender = (sData.gender === 'Female') ? 'Female' : 'Male';
    document.getElementById('sheetGenderInput').value = resolvedGender;
    setCookie('pf_active_gender', resolvedGender, 30);
    if (sData.age) document.getElementById('sheetAgeInput').value = sData.age;
    if (sData.height) document.getElementById('sheetHeightInput').value = sData.height;
    if (sData.weight || basic['in-weight']) document.getElementById('sheetWeightInput').value = sData.weight || basic['in-weight'];
    if (sData.eyesHair || sData.hair || sData.eyes || basic['in-hair'] || basic['in-eyes']) {
      document.getElementById('sheetEyesHairInput').value = sData.eyesHair ||
        [sData.hair || basic['in-hair'], sData.eyes || basic['in-eyes']].filter(Boolean).join(' / ');
    }
    if (sData.race || basic['in-race']) document.getElementById('sheetRaceInput').value = sData.race || basic['in-race'];

    const ab = sData.abilityScores || {
      str: basic['in-str'] || 10,
      dex: basic['in-dex'] || 10,
      con: basic['in-con'] || 10,
      int: basic['in-int'] || 10,
      wis: basic['in-wis'] || 10,
      cha: basic['in-cha'] || 10
    };
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(k => {
      const el = document.getElementById('score_' + k);
      if (el) el.value = ab[k] || 10;
    });

    if (sData.currentHp !== undefined) document.getElementById('sheetCurrentHp').value = sData.currentHp;
    if (sData.dr) document.getElementById('sheetDrInput').value = sData.dr;
    if (sData.nonlethal) document.getElementById('sheetNonlethalInput').value = sData.nonlethal;
    if (sData.hpExtraMisc !== undefined) {
      const el = document.getElementById('sheetHpExtraMisc');
      if (el) el.value = sData.hpExtraMisc;
    }

    if (Array.isArray(sData.weapons)) populateWeaponsFromData(sData.weapons);
    if (Array.isArray(sData.acItems)) populateAcItemsFromData(sData.acItems);
    if (Array.isArray(sData.saveItems)) populateSaveItemsFromData(sData.saveItems);
    if (Array.isArray(sData.gear)) populateGearFromData(sData.gear);
    if (Array.isArray(sData.feats)) populateFeatsFromData(sData.feats);
    if (Array.isArray(sData.specials)) populateSpecialsFromData(sData.specials);
    if (sData.spells) populateSpellsFromData(sData.spells);
    populateTraitsFromData(sData.traits);

    renderSkillsTable();
    onClassOrLevelChange();
  }

  function saveAllData() {
    const sheetData = {
      alignment: document.getElementById('sheetAlignmentSelect').value,
      player: document.getElementById('sheetPlayerName').value,
      deity: document.getElementById('sheetDeityInput').value,
      homeland: document.getElementById('sheetHomelandInput').value,
      size: document.getElementById('sheetSizeSelect').value,
      gender: document.getElementById('sheetGenderInput').value,
      age: document.getElementById('sheetAgeInput').value,
      height: document.getElementById('sheetHeightInput').value,
      weight: document.getElementById('sheetWeightInput').value,
      eyesHair: document.getElementById('sheetEyesHairInput').value,
      hair: document.getElementById('sheetEyesHairInput').value.split('/')[0]?.trim() || '',
      eyes: document.getElementById('sheetEyesHairInput').value.split('/')[1]?.trim() || '',
      currentHp: parseInt(document.getElementById('sheetCurrentHp').value, 10) || 12,
      maxHp: parseInt(document.getElementById('sheetMaxHp').value, 10) || 12,
      hitDie: document.getElementById('sheetHitDie').value || 'd10',
      dr: document.getElementById('sheetDrInput').value,
      nonlethal: document.getElementById('sheetNonlethalInput').value,
      speedBase: parseInt(document.getElementById('sheetSpeedBase').value, 10) || 30,
      speedArmor: parseInt(document.getElementById('sheetSpeedArmor').value, 10) || 20,
      speedFly: document.getElementById('sheetSpeedFly').value,
      speedSwim: document.getElementById('sheetSpeedSwim').value,
      speedClimb: document.getElementById('sheetSpeedClimb').value,
      speedBurrow: document.getElementById('sheetSpeedBurrow').value,
      initMisc: parseInt(document.getElementById('sheetInitMisc').value, 10) || 0,
      acNatural: parseInt(document.getElementById('sheetAcNatural')?.value, 10) || 0,
      acDeflect: parseInt(document.getElementById('sheetAcDeflect')?.value, 10) || 0,
      acMisc: parseInt(document.getElementById('sheetAcMisc')?.value, 10) || 0,
      sr: document.getElementById('sheetSrInput').value,
      saveConditional: document.getElementById('sheetSaveConditional')?.value || '',
      saveBase_fort: parseInt(document.getElementById('saveBase_fort')?.value, 10) || 0,
      saveAbility_fort: parseInt(document.getElementById('saveAbility_fort')?.value, 10) || 0,
      saveMagic_fort: parseInt(document.getElementById('saveMagic_fort')?.value, 10) || 0,
      saveMisc_fort: parseInt(document.getElementById('saveMisc_fort')?.value, 10) || 0,
      saveBase_ref: parseInt(document.getElementById('saveBase_ref')?.value, 10) || 0,
      saveAbility_ref: parseInt(document.getElementById('saveAbility_ref')?.value, 10) || 0,
      saveMagic_ref: parseInt(document.getElementById('saveMagic_ref')?.value, 10) || 0,
      saveMisc_ref: parseInt(document.getElementById('saveMisc_ref')?.value, 10) || 0,
      saveBase_will: parseInt(document.getElementById('saveBase_will')?.value, 10) || 0,
      saveAbility_will: parseInt(document.getElementById('saveAbility_will')?.value, 10) || 0,
      saveMagic_will: parseInt(document.getElementById('saveMagic_will')?.value, 10) || 0,
      saveMisc_will: parseInt(document.getElementById('saveMisc_will')?.value, 10) || 0,
      abilityScores: {
        str: parseInt(document.getElementById('score_str')?.value, 10) || 10,
        dex: parseInt(document.getElementById('score_dex')?.value, 10) || 10,
        con: parseInt(document.getElementById('score_con')?.value, 10) || 10,
        int: parseInt(document.getElementById('score_int')?.value, 10) || 10,
        wis: parseInt(document.getElementById('score_wis')?.value, 10) || 10,
        cha: parseInt(document.getElementById('score_cha')?.value, 10) || 10
      },
      skills: {},
      weapons: [],
      acItems: [],
      saveItems: [],
      gear: [],
      feats: [],
      specials: [],
      spells: {
        castingStat: document.getElementById('sheetCastingStat')?.value || 'cha',
        spellNotes: document.getElementById('sheetSpellNotes')?.value || '',
        castingClass: sData.spells?.castingClass || '',
        cl: sData.spells?.cl || 0,
        levels: { ...(sData.spells?.levels || {}) },
        slots: []
      },
      hpRolls: sData.hpRolls || {},
      hpExtraMisc: parseInt(document.getElementById('sheetHpExtraMisc')?.value, 10) || 0,
      traits: {
        uye: {
          name: document.getElementById('sheetTraitName_uye')?.value.trim() || '',
          desc: document.getElementById('sheetTraitDesc_uye')?.value.trim() || '',
          category: document.getElementById('sheetTraitCatInput_uye')?.value.trim() || '',
          source_url: document.getElementById('sheetTraitUrl_uye')?.value.trim() || ''
        },
        kidemli: {
          name: document.getElementById('sheetTraitName_kidemli')?.value.trim() || '',
          desc: document.getElementById('sheetTraitDesc_kidemli')?.value.trim() || '',
          category: document.getElementById('sheetTraitCatInput_kidemli')?.value.trim() || '',
          source_url: document.getElementById('sheetTraitUrl_kidemli')?.value.trim() || ''
        },
        uzman: {
          name: document.getElementById('sheetTraitName_uzman')?.value.trim() || '',
          desc: document.getElementById('sheetTraitDesc_uzman')?.value.trim() || '',
          category: document.getElementById('sheetTraitCatInput_uzman')?.value.trim() || '',
          source_url: document.getElementById('sheetTraitUrl_uzman')?.value.trim() || ''
        },
        custom: (sData.traits && Array.isArray(sData.traits.custom)) ? sData.traits.custom : []
      },
      moneyCp: parseInt(document.getElementById('sheetMoneyCp').value, 10) || 0,
      moneySp: parseInt(document.getElementById('sheetMoneySp').value, 10) || 0,
      moneyGp: parseInt(document.getElementById('sheetMoneyGp').value, 10) || 0,
      moneyPp: parseInt(document.getElementById('sheetMoneyPp').value, 10) || 0,
      currentXp: parseInt(document.getElementById('sheetCurrentXp')?.value, 10) || 0,
      nextLevelXp: parseInt(document.getElementById('sheetNextLevelXp')?.value, 10) || 1300,
      skillConditional: document.getElementById('sheetSkillConditional').value,
      languages: document.getElementById('sheetLanguages').value
    };

    document.querySelectorAll('#skillsTableBody tr').forEach(tr => {
      const k = tr.getAttribute('data-skill-key');
      if (k) {
        sheetData.skills[k] = {
          isClassSkill: tr.querySelector('.chk-class-skill')?.checked || false,
          ranks: parseInt(tr.querySelector('.skill-ranks-input')?.value, 10) || 0,
          misc: parseInt(tr.querySelector('.skill-misc-input')?.value, 10) || 0,
          customSubname: tr.querySelector('.skill-custom-subname')?.value || ''
        };
      }
    });

    document.querySelectorAll('.weapon-row').forEach(row => {
      sheetData.weapons.push({
        name: row.querySelector('.wp-name')?.value || '',
        atkType: row.querySelector('.wp-atk-type')?.value || 'melee',
        type: row.querySelector('.wp-type')?.value || '',
        range: row.querySelector('.wp-range')?.value || '',
        baseDie: row.querySelector('.wp-base-die')?.value || '1d8',
        enh: parseInt(row.querySelector('.wp-enh')?.value, 10) || 0,
        miscAtk: parseInt(row.querySelector('.wp-misc-atk')?.value, 10) || 0,
        miscDmg: parseInt(row.querySelector('.wp-misc-dmg')?.value, 10) || 0,
        critRange: row.querySelector('.wp-crit-range')?.value || '20',
        critMult: parseInt(row.querySelector('.wp-crit-mult')?.value, 10) || 2,
        ammo: row.querySelector('.wp-ammo')?.value || '',
        atkBonus: row.querySelector('.wp-atk-total')?.textContent || '+0',
        dmg: row.querySelector('.wp-dmg-total')?.textContent || '1d8',
        critDmg: row.querySelector('.wp-crit-dmg-total')?.textContent || '2d8'
      });
    });

    document.querySelectorAll('#acItemsTbody tr').forEach(tr => {
      const name = tr.querySelector('.ac-item-name')?.value;
      const type = tr.querySelector('.ac-item-type')?.value || 'armor';
      const isActive = tr.querySelector('.ac-item-active')?.checked ?? true;
      if (name !== undefined) {
        sheetData.acItems.push({
          name: name,
          type: type,
          bonus: parseInt(tr.querySelector('.ac-item-bonus')?.value, 10) || 0,
          pen: parseInt(tr.querySelector('.ac-item-pen')?.value, 10) || 0,
          weight: parseInt(tr.querySelector('.ac-item-weight')?.value, 10) || 0,
          max_dex: tr.getAttribute('data-max-dex') || null,
          category: tr.getAttribute('data-category') || null,
          is_active: isActive
        });
      }
    });

    sheetData.saveItems = [];
    document.querySelectorAll('#saveItemsTbody tr').forEach(tr => {
      const name = tr.querySelector('.save-item-name')?.value;
      const target = tr.querySelector('.save-item-target')?.value || 'all';
      const type = tr.querySelector('.save-item-type')?.value || 'resistance';
      const isActive = tr.querySelector('.save-item-active')?.checked ?? true;
      if (name !== undefined) {
        sheetData.saveItems.push({
          name: name,
          target: target,
          type: type,
          bonus: parseInt(tr.querySelector('.save-item-bonus')?.value, 10) || 0,
          weight: parseInt(tr.querySelector('.save-item-weight')?.value, 10) || 0,
          is_active: isActive
        });
      }
    });

    document.querySelectorAll('#gearItemsContainer > div').forEach(div => {
      const nameInp = div.querySelector('.gear-name');
      const wtInp = div.querySelector('.gear-wt');
      if (nameInp) {
        sheetData.gear.push({
          name: nameInp.value,
          weight: parseFloat(wtInp?.value) || 0
        });
      }
    });

    document.querySelectorAll('#featsContainer .feat-title').forEach(tEl => {
      const parent = tEl.closest('div.feat-item') || tEl.closest('div.p-2') || tEl.parentElement;
      const descEl = parent ? parent.querySelector('.feat-desc') : null;
      sheetData.feats.push({
        title: tEl.textContent.trim(),
        desc: descEl ? descEl.textContent.trim() : ''
      });
    });

    document.querySelectorAll('#specialsContainer > div').forEach(div => {
      const badge = div.querySelector('.badge')?.textContent.trim() || 'Special';
      const strong = div.querySelector('strong')?.textContent.trim() || '';
      const desc = div.querySelector('small')?.textContent.trim() || '';
      if (strong) {
        sheetData.specials.push({ badge, title: strong, desc });
      }
    });

    document.querySelectorAll('#paneSpells table tbody tr, #tab-page2 table tbody tr').forEach((tr, lvl) => {
      const knownEl = tr.querySelector('.spell-known, .spell-known-val');
      const known = parseInt(knownEl?.value || knownEl?.textContent, 10) || 0;
      const perDayInput = tr.querySelector('.spell-per-day');
      const perDay = parseInt(perDayInput?.value, 10) || 0;
      const used = parseInt(tr.querySelector('.spell-used')?.value, 10) || 0;
      sheetData.spells.slots.push({ lvl, known, perDay, used });
      if (perDayInput && !perDayInput.disabled && perDayInput.value && perDayInput.value !== '—') {
        sheetData.spells.levels[String(lvl)] = {
          ...(sheetData.spells.levels[String(lvl)] || {}),
          per_day: perDayInput.value
        };
      }
    });

    currentChar.name = document.getElementById('sheetCharName').value.trim() || '';
    currentChar.level = parseInt(document.getElementById('sheetLevelInput').value, 10) || 1;
    currentChar.classKey = document.getElementById('sheetClassSelect').value;
    const classSel = document.getElementById('sheetClassSelect');
    currentChar.class = classSel.options[classSel.selectedIndex]?.text || currentChar.classKey;
    currentChar.className = currentChar.class.split('(')[0].trim();
    currentChar.race = cleanText(document.getElementById('sheetRaceInput').value) || 'Human';
    currentChar.hp = sheetData.currentHp;
    currentChar.maxHp = sheetData.maxHp;
    currentChar.hitDie = sheetData.hitDie;
    currentChar.multiclass = multiclassState;
    sheetData.multiclass = multiclassState;
    currentChar.sheetData = sheetData;
    sData.hpExtraMisc = sheetData.hpExtraMisc;
    sData.traits = sheetData.traits;
    sData.multiclass = multiclassState;

    const topName = document.getElementById('topCharNameDisplay');
    if (topName) topName.textContent = currentChar.name;
    const topLvl = document.getElementById('sheetTopLevelBadge');
    if (topLvl) topLvl.textContent = 'Lvl ' + currentChar.level;

    const allChars = getCharacters();
    const idx = allChars.findIndex(c => c.id === currentChar.id || c.name === currentChar.name);
    if (idx !== -1) {
      allChars[idx] = currentChar;
    } else {
      allChars.push(currentChar);
    }
    saveCharacters(allChars);

    setCookie('pf_active_char_id', currentChar.id, 30);
    setCookie('pf_active_char_name', currentChar.name || '', 30);
    setCookie('pf_active_gender', sheetData.gender || 'Male', 30);
    setCookie('pf_active_class', currentChar.classKey || 'paladin', 30);
    setCookie('pf_active_level', String(currentChar.level || 1), 30);
    setCookie('pf_char_count', String(allChars.length), 30);
    setCookie('pf_last_cached', new Date().toLocaleTimeString(), 30);

    try {
      const draftCookie = {
        id: currentChar.id,
        name: currentChar.name || '',
        race: currentChar.race || 'Human',
        class: currentChar.classKey || 'paladin',
        lvl: currentChar.level || 1,
        hp: currentChar.hp || 12,
        gender: sheetData.gender || 'Male',
        ac: document.getElementById('sheetAcTotal')?.textContent || '10',
        t: Date.now()
      };
      setCookie('pf_sheet_draft', JSON.stringify(draftCookie), 30);
    } catch (e) {}

    const indicator = document.getElementById('saveStatusIndicator');
    if (indicator) {
      indicator.style.display = 'inline-flex';
      indicator.className = 'pf-save-status pf-save-status--local';
      const cacheMsg = 'Cached in Web Cookies';
      indicator.innerHTML = '<i class="ti tabler-cookie text-warning me-1"></i> ' + cacheMsg;
      clearTimeout(indicator._hideTimer);
      indicator._hideTimer = setTimeout(() => { indicator.style.display = 'none'; }, 2200);
    }
  }

  const saveBtn = document.getElementById('btnSaveSheet');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      saveAllData();
      saveBtn.classList.add('btn-success');
      saveBtn.classList.remove('btn-primary');
      const savedMsg = 'Cached in Web Cookies';
      saveBtn.innerHTML = '<i class="icon-base ti tabler-cookie me-1"></i> ' + savedMsg;
      showToast('Character cached in web cookies and local storage!', 'success');
      setTimeout(() => {
        saveBtn.classList.remove('btn-success');
        saveBtn.classList.add('btn-primary');
        saveBtn.innerHTML = '<i class="icon-base ti tabler-device-floppy me-1"></i> ' + (i18n.nav_save || 'Save');
      }, 1500);
    });
  }

  ['sheetAcArmor', 'sheetAcShield', 'sheetAcNatural', 'sheetAcDeflect', 'sheetAcMisc', 'sheetSizeSelect'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => { scheduleRecalculate(); triggerAutoSave(); });
      el.addEventListener('change', () => { recalculateAll(); triggerAutoSave(); });
    }
  });

  const hpExtraEl = document.getElementById('sheetHpExtraMisc');
  if (hpExtraEl) {
    const onHpExtraChange = (isInput) => {
      sData.hpExtraMisc = parseInt(hpExtraEl.value, 10) || 0;
      if (isInput) scheduleRecalculate();
      else recalculateAll();
      triggerAutoSave();
    };
    hpExtraEl.addEventListener('input', () => onHpExtraChange(true));
    hpExtraEl.addEventListener('change', () => onHpExtraChange(false));
  }

  const currentHpEl = document.getElementById('sheetCurrentHp');
  if (currentHpEl) {
    currentHpEl.addEventListener('input', () => { triggerAutoSave(); });
    currentHpEl.addEventListener('change', () => { triggerAutoSave(); });
  }

  ['sheetTraitName_uye', 'sheetTraitDesc_uye', 'sheetTraitName_kidemli', 'sheetTraitDesc_kidemli', 'sheetTraitName_uzman', 'sheetTraitDesc_uzman'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => { triggerAutoSave(); });
      el.addEventListener('change', () => { triggerAutoSave(); });
    }
  });

  const charNameInput = document.getElementById('sheetCharName');
  if (charNameInput) {
    charNameInput.addEventListener('input', () => {
      const val = charNameInput.value.trim();
      currentChar.name = val;
      const topName = document.getElementById('topCharNameDisplay');
      if (topName) topName.textContent = val;
      const hdrName = document.getElementById('header-character-name');
      if (hdrName) hdrName.textContent = val;
      triggerAutoSave();
    });
  }

  ['sheetPlayerName', 'sheetDeityInput', 'sheetHomelandInput', 'sheetGenderInput', 'sheetAlignmentSelect', 'sheetAgeInput', 'sheetHeightInput', 'sheetWeightInput', 'sheetEyesHairInput'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => triggerAutoSave());
      el.addEventListener('change', () => triggerAutoSave());
    }
  });

  const toggleGender = () => {
    const genderSel = document.getElementById('sheetGenderInput');
    if (!genderSel) return;
    genderSel.value = (genderSel.value === 'Female') ? 'Male' : 'Female';
    setCookie('pf_active_gender', genderSel.value, 30);
    triggerAutoSave();
  };
  document.getElementById('btnToggleGender')?.addEventListener('click', toggleGender);
  document.getElementById('lblGender')?.addEventListener('click', toggleGender);

  setupArmorSearch();
  renderSkillsTable();
  attachDynamicRowEvents();
  attachWeaponEvents();
  renderEquippedArmorChips();
  initMulticlassModal();
  setupTraitEvents();
  onClassOrLevelChange();

  if (shouldLoadExample) {
    fetch('/api/load-character?file=Caspian_Blade.json')
      .then(response => {
        if (!response.ok) throw new Error(`Example character could not be loaded (${response.status})`);
        return response.json();
      })
      .then(data => {
        populateSheetFromData(data);
        showToast('Caspian Blade example loaded. Edit and save your own copy.', 'success');
      })
      .catch(error => {
        console.error('Example character load failed:', error);
        showToast('Example character load failed: ' + error.message, 'danger');
      });
  }

});
