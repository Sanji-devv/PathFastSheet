const OFFICIAL_BAB_TABLES = {
  "bab_section_1": {
    "1": "+1",
    "2": "+2",
    "3": "+3",
    "4": "+4",
    "5": "+5",
    "6": "+6/+1",
    "7": "+7/+2",
    "8": "+8/+3",
    "9": "+9/+4",
    "10": "+10/+5",
    "11": "+11/+6/+1",
    "12": "+12/+7/+2",
    "13": "+13/+8/+3",
    "14": "+14/+9/+4",
    "15": "+15/+10/+5",
    "16": "+16/+11/+6/+1",
    "17": "+17/+12/+7/+2",
    "18": "+18/+13/+8/+3",
    "19": "+19/+14/+9/+4",
    "20": "+20/+15/+10/+5"
  },
  "bab_section_2": {
    "1": "+0",
    "2": "+1",
    "3": "+2",
    "4": "+3",
    "5": "+3",
    "6": "+4",
    "7": "+5",
    "8": "+6/+1",
    "9": "+6/+1",
    "10": "+7/+2",
    "11": "+8/+3",
    "12": "+9/+4",
    "13": "+9/+4",
    "14": "+10/+5",
    "15": "+11/+6/+1",
    "16": "+12/+7/+2",
    "17": "+12/+7/+2",
    "18": "+13/+8/+3",
    "19": "+14/+9/+4",
    "20": "+15/+10/+5"
  },
  "bab_section_3": {
    "1": "+0",
    "2": "+1",
    "3": "+1",
    "4": "+2",
    "5": "+2",
    "6": "+3",
    "7": "+3",
    "8": "+4",
    "9": "+4",
    "10": "+5",
    "11": "+5",
    "12": "+6/+1",
    "13": "+6/+1",
    "14": "+7/+2",
    "15": "+7/+2",
    "16": "+8/+3",
    "17": "+8/+3",
    "18": "+9/+4",
    "19": "+9/+4",
    "20": "+10/+5"
  }
};

const OFFICIAL_CLASSES_DB = {
  "barbarian": {
    "key": "barbarian",
    "name": "Barbarian",
    "category": "Core Classes",
    "url": "https://www.d20pfsrd.com/classes/core-classes/barbarian/",
    "hit_die": 12,
    "bab_table": "bab_section_1",
    "skills": [
      "acrobatics",
      "climb",
      "craft",
      "handle animal",
      "intimidate",
      "knowledge (nature)",
      "perception",
      "ride",
      "survival",
      "swim"
    ],
    "saves": {
      "1": {
        "fort": 2,
        "ref": 0,
        "will": 0
      },
      "2": {
        "fort": 3,
        "ref": 0,
        "will": 0
      },
      "3": {
        "fort": 3,
        "ref": 1,
        "will": 1
      },
      "4": {
        "fort": 4,
        "ref": 1,
        "will": 1
      },
      "5": {
        "fort": 4,
        "ref": 1,
        "will": 1
      },
      "6": {
        "fort": 5,
        "ref": 2,
        "will": 2
      },
      "7": {
        "fort": 5,
        "ref": 2,
        "will": 2
      },
      "8": {
        "fort": 6,
        "ref": 2,
        "will": 2
      },
      "9": {
        "fort": 6,
        "ref": 3,
        "will": 3
      },
      "10": {
        "fort": 7,
        "ref": 3,
        "will": 3
      },
      "11": {
        "fort": 7,
        "ref": 3,
        "will": 3
      },
      "12": {
        "fort": 8,
        "ref": 4,
        "will": 4
      },
      "13": {
        "fort": 8,
        "ref": 4,
        "will": 4
      },
      "14": {
        "fort": 9,
        "ref": 4,
        "will": 4
      },
      "15": {
        "fort": 9,
        "ref": 5,
        "will": 5
      },
      "16": {
        "fort": 10,
        "ref": 5,
        "will": 5
      },
      "17": {
        "fort": 10,
        "ref": 5,
        "will": 5
      },
      "18": {
        "fort": 11,
        "ref": 6,
        "will": 6
      },
      "19": {
        "fort": 11,
        "ref": 6,
        "will": 6
      },
      "20": {
        "fort": 12,
        "ref": 6,
        "will": 6
      }
    },
    "specials": {
      "1": "Fast movement, rage",
      "2": "Rage power, uncanny dodge",
      "3": "Trap sense +1",
      "4": "Rage power",
      "5": "Improved uncanny dodge",
      "6": "Rage power, trap sense +2",
      "7": "Damage reduction 1/-",
      "8": "Rage power",
      "9": "Trap sense +3",
      "10": "Damage reduction 2/-, rage power",
      "11": "Greater rage",
      "12": "Rage power, trap sense +4",
      "13": "Damage reduction 3/-",
      "14": "Rage power",
      "15": "Trap sense +5",
      "16": "Damage reduction 4/-, rage power",
      "17": "Tireless rage",
      "18": "Rage power, trap sense +6",
      "19": "Damage reduction 5/-",
      "20": "Mighty rage, rage power"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 4
  },
  "bard": {
    "key": "bard",
    "name": "Bard",
    "category": "Core Classes",
    "url": "https://www.d20pfsrd.com/classes/core-classes/bard/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "acrobatics",
      "appraise",
      "bluff",
      "climb",
      "craft",
      "diplomacy",
      "disguise",
      "escape artist",
      "intimidate",
      "knowledge (arcana)",
      "knowledge (dungeoneering)",
      "knowledge (engineering)",
      "knowledge (geography)",
      "knowledge (history)",
      "knowledge (local)",
      "knowledge (nature)",
      "knowledge (nobility)",
      "knowledge (planes)",
      "knowledge (religion)",
      "knowledge (all)",
      "linguistics",
      "perception",
      "perform",
      "profession",
      "sense motive",
      "sleight of hand",
      "spellcraft",
      "stealth",
      "use magic device"
    ],
    "saves": {
      "1": {
        "fort": 0,
        "ref": 2,
        "will": 2
      },
      "2": {
        "fort": 0,
        "ref": 3,
        "will": 3
      },
      "3": {
        "fort": 1,
        "ref": 3,
        "will": 3
      },
      "4": {
        "fort": 1,
        "ref": 4,
        "will": 4
      },
      "5": {
        "fort": 1,
        "ref": 4,
        "will": 4
      },
      "6": {
        "fort": 2,
        "ref": 5,
        "will": 5
      },
      "7": {
        "fort": 2,
        "ref": 5,
        "will": 5
      },
      "8": {
        "fort": 2,
        "ref": 6,
        "will": 6
      },
      "9": {
        "fort": 3,
        "ref": 6,
        "will": 6
      },
      "10": {
        "fort": 3,
        "ref": 7,
        "will": 7
      },
      "11": {
        "fort": 3,
        "ref": 7,
        "will": 7
      },
      "12": {
        "fort": 4,
        "ref": 8,
        "will": 8
      },
      "13": {
        "fort": 4,
        "ref": 8,
        "will": 8
      },
      "14": {
        "fort": 4,
        "ref": 9,
        "will": 9
      },
      "15": {
        "fort": 5,
        "ref": 9,
        "will": 9
      },
      "16": {
        "fort": 5,
        "ref": 10,
        "will": 10
      },
      "17": {
        "fort": 5,
        "ref": 10,
        "will": 10
      },
      "18": {
        "fort": 6,
        "ref": 11,
        "will": 11
      },
      "19": {
        "fort": 6,
        "ref": 11,
        "will": 11
      },
      "20": {
        "fort": 6,
        "ref": 12,
        "will": 12
      }
    },
    "specials": {
      "1": "Bardic knowledge, bardic performance, countersong, distraction, fascinate, inspire courage +1",
      "2": "Versatile performance, well-versed",
      "3": "Inspire competence +2",
      "4": "Versatile performance",
      "5": "Inspire courage +2, lore master 1/day",
      "6": "Versatile performance, suggestion",
      "7": "Inspire competence +3",
      "8": "Dirge of doom, versatile performance",
      "9": "Inspire greatness",
      "10": "Jack of all trades, versatile performance",
      "11": "Inspire competence +4, inspire courage +3, lore master 2/day",
      "12": "Soothing performance, versatile performance",
      "13": "Inspire competence +5",
      "14": "Frightening tune, versatile performance",
      "15": "Inspire heroics",
      "16": "Versatile performance",
      "17": "Inspire competence +6, inspire courage +4, lore master 3/day",
      "18": "Versatile performance",
      "19": "Jack of all trades (take 10)",
      "20": "Deadly performance, versatile performance"
    },
    "spells": {},
    "casting_stat": "cha",
    "skill_ranks": 6
  },
  "cleric": {
    "key": "cleric",
    "name": "Cleric",
    "category": "Core Classes",
    "url": "https://www.d20pfsrd.com/classes/core-classes/cleric/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "appraise",
      "craft",
      "diplomacy",
      "heal",
      "knowledge (arcana)",
      "knowledge (history)",
      "knowledge (nobility)",
      "knowledge (planes)",
      "knowledge (religion)",
      "linguistics",
      "profession",
      "sense motive",
      "spellcraft"
    ],
    "saves": {
      "1": {
        "fort": 2,
        "ref": 0,
        "will": 2
      },
      "2": {
        "fort": 3,
        "ref": 0,
        "will": 3
      },
      "3": {
        "fort": 3,
        "ref": 1,
        "will": 3
      },
      "4": {
        "fort": 4,
        "ref": 1,
        "will": 4
      },
      "5": {
        "fort": 4,
        "ref": 1,
        "will": 4
      },
      "6": {
        "fort": 5,
        "ref": 2,
        "will": 5
      },
      "7": {
        "fort": 5,
        "ref": 2,
        "will": 5
      },
      "8": {
        "fort": 6,
        "ref": 2,
        "will": 6
      },
      "9": {
        "fort": 6,
        "ref": 3,
        "will": 6
      },
      "10": {
        "fort": 7,
        "ref": 3,
        "will": 7
      },
      "11": {
        "fort": 7,
        "ref": 3,
        "will": 7
      },
      "12": {
        "fort": 8,
        "ref": 4,
        "will": 8
      },
      "13": {
        "fort": 8,
        "ref": 4,
        "will": 8
      },
      "14": {
        "fort": 9,
        "ref": 4,
        "will": 9
      },
      "15": {
        "fort": 9,
        "ref": 5,
        "will": 9
      },
      "16": {
        "fort": 10,
        "ref": 5,
        "will": 10
      },
      "17": {
        "fort": 10,
        "ref": 5,
        "will": 10
      },
      "18": {
        "fort": 11,
        "ref": 6,
        "will": 11
      },
      "19": {
        "fort": 11,
        "ref": 6,
        "will": 11
      },
      "20": {
        "fort": 12,
        "ref": 6,
        "will": 12
      }
    },
    "specials": {
      "1": "Aura, channel energy 1d6, domains, spontaneous casting",
      "2": "Domain powers",
      "3": "Channel energy 2d6",
      "4": "Domain powers",
      "5": "Channel energy 3d6",
      "6": "Domain powers",
      "7": "Channel energy 4d6",
      "8": "Domain powers",
      "9": "Channel energy 5d6",
      "10": "Domain powers",
      "11": "Channel energy 6d6",
      "12": "Domain powers",
      "13": "Channel energy 7d6",
      "14": "Domain powers",
      "15": "Channel energy 8d6",
      "16": "Domain powers",
      "17": "Channel energy 9d6",
      "18": "Domain powers",
      "19": "Channel energy 10d6",
      "20": "Domain powers"
    },
    "spells": {},
    "casting_stat": "wis",
    "skill_ranks": 2
  },
  "druid": {
    "key": "druid",
    "name": "Druid",
    "category": "Core Classes",
    "url": "https://www.d20pfsrd.com/classes/core-classes/druid/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "climb",
      "craft",
      "fly",
      "handle animal",
      "heal",
      "knowledge (geography)",
      "knowledge (nature)",
      "perception",
      "profession",
      "ride",
      "spellcraft",
      "survival",
      "swim"
    ],
    "saves": {
      "1": {
        "fort": 2,
        "ref": 0,
        "will": 2
      },
      "2": {
        "fort": 3,
        "ref": 0,
        "will": 3
      },
      "3": {
        "fort": 3,
        "ref": 1,
        "will": 3
      },
      "4": {
        "fort": 4,
        "ref": 1,
        "will": 4
      },
      "5": {
        "fort": 4,
        "ref": 1,
        "will": 4
      },
      "6": {
        "fort": 5,
        "ref": 2,
        "will": 5
      },
      "7": {
        "fort": 5,
        "ref": 2,
        "will": 5
      },
      "8": {
        "fort": 6,
        "ref": 2,
        "will": 6
      },
      "9": {
        "fort": 6,
        "ref": 3,
        "will": 6
      },
      "10": {
        "fort": 7,
        "ref": 3,
        "will": 7
      },
      "11": {
        "fort": 7,
        "ref": 3,
        "will": 7
      },
      "12": {
        "fort": 8,
        "ref": 4,
        "will": 8
      },
      "13": {
        "fort": 8,
        "ref": 4,
        "will": 8
      },
      "14": {
        "fort": 9,
        "ref": 4,
        "will": 9
      },
      "15": {
        "fort": 9,
        "ref": 5,
        "will": 9
      },
      "16": {
        "fort": 10,
        "ref": 5,
        "will": 10
      },
      "17": {
        "fort": 10,
        "ref": 5,
        "will": 10
      },
      "18": {
        "fort": 11,
        "ref": 6,
        "will": 11
      },
      "19": {
        "fort": 11,
        "ref": 6,
        "will": 11
      },
      "20": {
        "fort": 12,
        "ref": 6,
        "will": 12
      }
    },
    "specials": {
      "1": "Nature bond, nature sense, wild empathy",
      "2": "Woodland stride",
      "3": "Trackless step",
      "4": "Resist nature's lure, wild shape 1/day",
      "5": "Wild shape 2/day",
      "6": "Wild shape 3/day (Large/Tiny animal, Small elemental)",
      "7": "Wild shape 4/day",
      "8": "Wild shape 5/day (Huge/Diminutive animal, Medium elemental)",
      "9": "Venom immunity, wild shape 6/day",
      "10": "Wild shape 7/day (Large elemental, Small/Medium plant)",
      "11": "Wild shape 8/day",
      "12": "Wild shape (Huge elemental, Large plant)",
      "13": "A thousand faces",
      "14": "Wild shape (Huge plant)",
      "15": "Timeless body",
      "16": "Wild shape",
      "17": "Wild shape",
      "18": "Wild shape",
      "19": "Wild shape",
      "20": "Wild shape (at will)"
    },
    "spells": {},
    "casting_stat": "wis",
    "skill_ranks": 4
  },
  "fighter": {
    "key": "fighter",
    "name": "Fighter",
    "category": "Core Classes",
    "url": "https://www.d20pfsrd.com/classes/core-classes/fighter/",
    "hit_die": 10,
    "bab_table": "bab_section_1",
    "skills": [
      "climb",
      "craft",
      "handle animal",
      "intimidate",
      "knowledge (dungeoneering)",
      "knowledge (engineering)",
      "profession",
      "ride",
      "survival",
      "swim"
    ],
    "saves": {
      "1": {
        "fort": 2,
        "ref": 0,
        "will": 0
      },
      "2": {
        "fort": 3,
        "ref": 0,
        "will": 0
      },
      "3": {
        "fort": 3,
        "ref": 1,
        "will": 1
      },
      "4": {
        "fort": 4,
        "ref": 1,
        "will": 1
      },
      "5": {
        "fort": 4,
        "ref": 1,
        "will": 1
      },
      "6": {
        "fort": 5,
        "ref": 2,
        "will": 2
      },
      "7": {
        "fort": 5,
        "ref": 2,
        "will": 2
      },
      "8": {
        "fort": 6,
        "ref": 2,
        "will": 2
      },
      "9": {
        "fort": 6,
        "ref": 3,
        "will": 3
      },
      "10": {
        "fort": 7,
        "ref": 3,
        "will": 3
      },
      "11": {
        "fort": 7,
        "ref": 3,
        "will": 3
      },
      "12": {
        "fort": 8,
        "ref": 4,
        "will": 4
      },
      "13": {
        "fort": 8,
        "ref": 4,
        "will": 4
      },
      "14": {
        "fort": 9,
        "ref": 4,
        "will": 4
      },
      "15": {
        "fort": 9,
        "ref": 5,
        "will": 5
      },
      "16": {
        "fort": 10,
        "ref": 5,
        "will": 5
      },
      "17": {
        "fort": 10,
        "ref": 5,
        "will": 5
      },
      "18": {
        "fort": 11,
        "ref": 6,
        "will": 6
      },
      "19": {
        "fort": 11,
        "ref": 6,
        "will": 6
      },
      "20": {
        "fort": 12,
        "ref": 6,
        "will": 6
      }
    },
    "specials": {
      "1": "Bonus combat feat",
      "2": "Bonus combat feat, bravery +1",
      "3": "Armor training 1",
      "4": "Bonus combat feat",
      "5": "Weapon training 1",
      "6": "Bonus combat feat, bravery +2",
      "7": "Armor training 2",
      "8": "Bonus combat feat",
      "9": "Weapon training 2",
      "10": "Bonus combat feat, bravery +3",
      "11": "Armor training 3",
      "12": "Bonus combat feat",
      "13": "Weapon training 3",
      "14": "Bonus combat feat, bravery +4",
      "15": "Armor training 4",
      "16": "Bonus combat feat",
      "17": "Weapon training 4",
      "18": "Bonus combat feat, bravery +5",
      "19": "Armor mastery",
      "20": "Bonus combat feat, weapon mastery"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 2
  },
  "monk": {
    "key": "monk",
    "name": "Monk",
    "category": "Core Classes",
    "url": "https://www.d20pfsrd.com/classes/core-classes/monk/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "acrobatics",
      "climb",
      "craft",
      "escape artist",
      "intimidate",
      "knowledge (history)",
      "knowledge (religion)",
      "perception",
      "perform",
      "profession",
      "ride",
      "sense motive",
      "stealth",
      "swim"
    ],
    "saves": {
      "1": {
        "fort": 2,
        "ref": 2,
        "will": 2
      },
      "2": {
        "fort": 3,
        "ref": 3,
        "will": 3
      },
      "3": {
        "fort": 3,
        "ref": 3,
        "will": 3
      },
      "4": {
        "fort": 4,
        "ref": 4,
        "will": 4
      },
      "5": {
        "fort": 4,
        "ref": 4,
        "will": 4
      },
      "6": {
        "fort": 5,
        "ref": 5,
        "will": 5
      },
      "7": {
        "fort": 5,
        "ref": 5,
        "will": 5
      },
      "8": {
        "fort": 6,
        "ref": 6,
        "will": 6
      },
      "9": {
        "fort": 6,
        "ref": 6,
        "will": 6
      },
      "10": {
        "fort": 7,
        "ref": 7,
        "will": 7
      },
      "11": {
        "fort": 7,
        "ref": 7,
        "will": 7
      },
      "12": {
        "fort": 8,
        "ref": 8,
        "will": 8
      },
      "13": {
        "fort": 8,
        "ref": 8,
        "will": 8
      },
      "14": {
        "fort": 9,
        "ref": 9,
        "will": 9
      },
      "15": {
        "fort": 9,
        "ref": 9,
        "will": 9
      },
      "16": {
        "fort": 10,
        "ref": 10,
        "will": 10
      },
      "17": {
        "fort": 10,
        "ref": 10,
        "will": 10
      },
      "18": {
        "fort": 11,
        "ref": 11,
        "will": 11
      },
      "19": {
        "fort": 11,
        "ref": 11,
        "will": 11
      },
      "20": {
        "fort": 12,
        "ref": 12,
        "will": 12
      }
    },
    "specials": {
      "1": "AC bonus, bonus feat, flurry of blows, stunning fist, unarmed strike",
      "2": "Bonus feat, evasion",
      "3": "Fast movement +10 ft., maneuver training, still mind (+2 vs enchantment)",
      "4": "Ki pool (magic), slow fall 20 ft., unarmed strike (1d8)",
      "5": "High jump, purity of body (disease immunity)",
      "6": "Bonus feat, fast movement +20 ft., slow fall 30 ft.",
      "7": "Ki pool (cold iron/silver), slow fall 40 ft., wholeness of body",
      "8": "Slow fall 50 ft., unarmed strike (1d10)",
      "9": "Fast movement +30 ft., improved evasion, slow fall 60 ft.",
      "10": "Bonus feat, ki pool (lawful), slow fall 70 ft.",
      "11": "Diamond body (poison immunity), fast movement +30 ft.",
      "12": "Abundant step, fast movement +40 ft., slow fall 80 ft., unarmed strike (2d6)",
      "13": "Diamond soul (spell resistance 23), slow fall 90 ft.",
      "14": "Bonus feat, slow fall any distance",
      "15": "Fast movement +50 ft., quivering palm",
      "16": "Ki pool (adamantine), unarmed strike (2d8)",
      "17": "Timeless body, tongue of the sun and moon",
      "18": "Bonus feat, fast movement +60 ft.",
      "19": "Empty body (ethereal)",
      "20": "Perfect self (outsider, DR 10/chaotic), unarmed strike (2d10)"
    },
    "spells": {},
    "casting_stat": "wis",
    "skill_ranks": 4
  },
  "paladin": {
    "key": "paladin",
    "name": "Paladin",
    "category": "Core Classes",
    "url": "https://www.d20pfsrd.com/classes/core-classes/paladin/",
    "hit_die": 10,
    "bab_table": "bab_section_1",
    "skills": [
      "craft",
      "diplomacy",
      "handle animal",
      "heal",
      "knowledge (nobility)",
      "knowledge (religion)",
      "profession",
      "ride",
      "sense motive",
      "spellcraft"
    ],
    "saves": {
      "1": {
        "fort": 2,
        "ref": 0,
        "will": 2
      },
      "2": {
        "fort": 3,
        "ref": 0,
        "will": 3
      },
      "3": {
        "fort": 3,
        "ref": 1,
        "will": 3
      },
      "4": {
        "fort": 4,
        "ref": 1,
        "will": 4
      },
      "5": {
        "fort": 4,
        "ref": 1,
        "will": 4
      },
      "6": {
        "fort": 5,
        "ref": 2,
        "will": 5
      },
      "7": {
        "fort": 5,
        "ref": 2,
        "will": 5
      },
      "8": {
        "fort": 6,
        "ref": 2,
        "will": 6
      },
      "9": {
        "fort": 6,
        "ref": 3,
        "will": 6
      },
      "10": {
        "fort": 7,
        "ref": 3,
        "will": 7
      },
      "11": {
        "fort": 7,
        "ref": 3,
        "will": 7
      },
      "12": {
        "fort": 8,
        "ref": 4,
        "will": 8
      },
      "13": {
        "fort": 8,
        "ref": 4,
        "will": 8
      },
      "14": {
        "fort": 9,
        "ref": 4,
        "will": 9
      },
      "15": {
        "fort": 9,
        "ref": 5,
        "will": 9
      },
      "16": {
        "fort": 10,
        "ref": 5,
        "will": 10
      },
      "17": {
        "fort": 10,
        "ref": 5,
        "will": 10
      },
      "18": {
        "fort": 11,
        "ref": 6,
        "will": 11
      },
      "19": {
        "fort": 11,
        "ref": 6,
        "will": 11
      },
      "20": {
        "fort": 12,
        "ref": 6,
        "will": 12
      }
    },
    "specials": {
      "1": "Aura of good, detect evil, smite evil 1/day",
      "2": "Divine grace (+CHA to saves), lay on hands",
      "3": "Aura of courage (+4 fear, allies immune), divine health (disease immunity), mercy",
      "4": "Channel positive energy, smite evil 2/day, paladin spells",
      "5": "Divine bond (weapon or mount)",
      "6": "Mercy",
      "7": "Smite evil 3/day",
      "8": "Aura of resolve (+4 charm, allies immune)",
      "9": "Mercy",
      "10": "Smite evil 4/day",
      "11": "Aura of justice",
      "12": "Mercy",
      "13": "Smite evil 5/day",
      "14": "Aura of faith",
      "15": "Mercy",
      "16": "Smite evil 6/day",
      "17": "Aura of righteousness (DR 5/evil, compulsion immunity)",
      "18": "Mercy",
      "19": "Smite evil 7/day",
      "20": "Holy champion (banish evil outsiders on smite)"
    },
    "spells": {},
    "casting_stat": "cha",
    "skill_ranks": 2
  },
  "ranger": {
    "key": "ranger",
    "name": "Ranger",
    "category": "Core Classes",
    "url": "https://www.d20pfsrd.com/classes/core-classes/ranger/",
    "hit_die": 10,
    "bab_table": "bab_section_1",
    "skills": [
      "climb",
      "craft",
      "handle animal",
      "heal",
      "intimidate",
      "knowledge (dungeoneering)",
      "knowledge (geography)",
      "knowledge (nature)",
      "perception",
      "profession",
      "ride",
      "spellcraft",
      "stealth",
      "survival",
      "swim"
    ],
    "saves": {
      "1": {
        "fort": 2,
        "ref": 2,
        "will": 0
      },
      "2": {
        "fort": 3,
        "ref": 3,
        "will": 0
      },
      "3": {
        "fort": 3,
        "ref": 3,
        "will": 1
      },
      "4": {
        "fort": 4,
        "ref": 4,
        "will": 1
      },
      "5": {
        "fort": 4,
        "ref": 4,
        "will": 1
      },
      "6": {
        "fort": 5,
        "ref": 5,
        "will": 2
      },
      "7": {
        "fort": 5,
        "ref": 5,
        "will": 2
      },
      "8": {
        "fort": 6,
        "ref": 6,
        "will": 2
      },
      "9": {
        "fort": 6,
        "ref": 6,
        "will": 3
      },
      "10": {
        "fort": 7,
        "ref": 7,
        "will": 3
      },
      "11": {
        "fort": 7,
        "ref": 7,
        "will": 3
      },
      "12": {
        "fort": 8,
        "ref": 8,
        "will": 4
      },
      "13": {
        "fort": 8,
        "ref": 8,
        "will": 4
      },
      "14": {
        "fort": 9,
        "ref": 9,
        "will": 4
      },
      "15": {
        "fort": 9,
        "ref": 9,
        "will": 5
      },
      "16": {
        "fort": 10,
        "ref": 10,
        "will": 5
      },
      "17": {
        "fort": 10,
        "ref": 10,
        "will": 5
      },
      "18": {
        "fort": 11,
        "ref": 11,
        "will": 6
      },
      "19": {
        "fort": 11,
        "ref": 11,
        "will": 6
      },
      "20": {
        "fort": 12,
        "ref": 12,
        "will": 6
      }
    },
    "specials": {
      "1": "1st favored enemy, track +1, wild empathy",
      "2": "Combat style feat",
      "3": "Endurance, 1st favored terrain",
      "4": "Hunter's bond, ranger spells",
      "5": "2nd favored enemy",
      "6": "Combat style feat",
      "7": "Woodland stride",
      "8": "Swift tracker, 2nd favored terrain",
      "9": "Evasion",
      "10": "3rd favored enemy, combat style feat",
      "11": "Quarry",
      "12": "Camouflage",
      "13": "3rd favored terrain",
      "14": "Combat style feat",
      "15": "4th favored enemy",
      "16": "Improved evasion",
      "17": "Hide in plain sight",
      "18": "4th favored terrain, combat style feat",
      "19": "Improved quarry",
      "20": "5th favored enemy, master hunter"
    },
    "spells": {},
    "casting_stat": "wis",
    "skill_ranks": 6
  },
  "rogue": {
    "key": "rogue",
    "name": "Rogue",
    "category": "Core Classes",
    "url": "https://www.d20pfsrd.com/classes/core-classes/rogue/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "acrobatics",
      "appraise",
      "bluff",
      "climb",
      "craft",
      "diplomacy",
      "disable device",
      "disguise",
      "escape artist",
      "intimidate",
      "knowledge (dungeoneering)",
      "knowledge (local)",
      "linguistics",
      "perception",
      "perform",
      "profession",
      "sense motive",
      "sleight of hand",
      "stealth",
      "swim",
      "use magic device"
    ],
    "saves": {
      "1": {
        "fort": 0,
        "ref": 2,
        "will": 0
      },
      "2": {
        "fort": 0,
        "ref": 3,
        "will": 0
      },
      "3": {
        "fort": 1,
        "ref": 3,
        "will": 1
      },
      "4": {
        "fort": 1,
        "ref": 4,
        "will": 1
      },
      "5": {
        "fort": 1,
        "ref": 4,
        "will": 1
      },
      "6": {
        "fort": 2,
        "ref": 5,
        "will": 2
      },
      "7": {
        "fort": 2,
        "ref": 5,
        "will": 2
      },
      "8": {
        "fort": 2,
        "ref": 6,
        "will": 2
      },
      "9": {
        "fort": 3,
        "ref": 6,
        "will": 3
      },
      "10": {
        "fort": 3,
        "ref": 7,
        "will": 3
      },
      "11": {
        "fort": 3,
        "ref": 7,
        "will": 3
      },
      "12": {
        "fort": 4,
        "ref": 8,
        "will": 4
      },
      "13": {
        "fort": 4,
        "ref": 8,
        "will": 4
      },
      "14": {
        "fort": 4,
        "ref": 9,
        "will": 4
      },
      "15": {
        "fort": 5,
        "ref": 9,
        "will": 5
      },
      "16": {
        "fort": 5,
        "ref": 10,
        "will": 5
      },
      "17": {
        "fort": 5,
        "ref": 10,
        "will": 5
      },
      "18": {
        "fort": 6,
        "ref": 11,
        "will": 6
      },
      "19": {
        "fort": 6,
        "ref": 11,
        "will": 6
      },
      "20": {
        "fort": 6,
        "ref": 12,
        "will": 6
      }
    },
    "specials": {
      "1": "Sneak attack +1d6, trapfinding +1",
      "2": "Evasion, rogue talent",
      "3": "Sneak attack +2d6, trap sense +1",
      "4": "Rogue talent, uncanny dodge",
      "5": "Sneak attack +3d6",
      "6": "Rogue talent, trap sense +2",
      "7": "Sneak attack +4d6",
      "8": "Improved uncanny dodge, rogue talent",
      "9": "Sneak attack +5d6, trap sense +3",
      "10": "Advanced talents, rogue talent",
      "11": "Sneak attack +6d6",
      "12": "Rogue talent, trap sense +4",
      "13": "Sneak attack +7d6",
      "14": "Rogue talent",
      "15": "Sneak attack +8d6, trap sense +5",
      "16": "Rogue talent",
      "17": "Sneak attack +9d6",
      "18": "Rogue talent, trap sense +6",
      "19": "Sneak attack +10d6",
      "20": "Master strike, rogue talent"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 8
  },
  "sorcerer": {
    "key": "sorcerer",
    "name": "Sorcerer",
    "category": "Core Classes",
    "url": "https://www.d20pfsrd.com/classes/core-classes/sorcerer/",
    "hit_die": 6,
    "bab_table": "bab_section_3",
    "skills": [
      "appraise",
      "bluff",
      "craft",
      "fly",
      "intimidate",
      "knowledge (arcana)",
      "profession",
      "spellcraft",
      "use magic device"
    ],
    "saves": {
      "1": {
        "fort": 0,
        "ref": 0,
        "will": 2
      },
      "2": {
        "fort": 0,
        "ref": 0,
        "will": 3
      },
      "3": {
        "fort": 1,
        "ref": 1,
        "will": 3
      },
      "4": {
        "fort": 1,
        "ref": 1,
        "will": 4
      },
      "5": {
        "fort": 1,
        "ref": 1,
        "will": 4
      },
      "6": {
        "fort": 2,
        "ref": 2,
        "will": 5
      },
      "7": {
        "fort": 2,
        "ref": 2,
        "will": 5
      },
      "8": {
        "fort": 2,
        "ref": 2,
        "will": 6
      },
      "9": {
        "fort": 3,
        "ref": 3,
        "will": 6
      },
      "10": {
        "fort": 3,
        "ref": 3,
        "will": 7
      },
      "11": {
        "fort": 3,
        "ref": 3,
        "will": 7
      },
      "12": {
        "fort": 4,
        "ref": 4,
        "will": 8
      },
      "13": {
        "fort": 4,
        "ref": 4,
        "will": 8
      },
      "14": {
        "fort": 4,
        "ref": 4,
        "will": 9
      },
      "15": {
        "fort": 5,
        "ref": 5,
        "will": 9
      },
      "16": {
        "fort": 5,
        "ref": 5,
        "will": 10
      },
      "17": {
        "fort": 5,
        "ref": 5,
        "will": 10
      },
      "18": {
        "fort": 6,
        "ref": 6,
        "will": 11
      },
      "19": {
        "fort": 6,
        "ref": 6,
        "will": 11
      },
      "20": {
        "fort": 6,
        "ref": 6,
        "will": 12
      }
    },
    "specials": {
      "1": "Bloodline power, bloodline skill, cantrips, eschew materials",
      "2": "Cantrips known",
      "3": "Bloodline power, bloodline spell (1st)",
      "4": "Spells known",
      "5": "Bloodline spell (2nd)",
      "6": "Spells known",
      "7": "Bloodline feat, bloodline spell (3rd)",
      "8": "Spells known",
      "9": "Bloodline power, bloodline spell (4th)",
      "10": "Spells known",
      "11": "Bloodline spell (5th)",
      "12": "Spells known",
      "13": "Bloodline feat, bloodline spell (6th)",
      "14": "Spells known",
      "15": "Bloodline power, bloodline spell (7th)",
      "16": "Spells known",
      "17": "Bloodline spell (8th)",
      "18": "Spells known",
      "19": "Bloodline feat, bloodline spell (9th)",
      "20": "Bloodline power (apotheosis)"
    },
    "spells": {},
    "casting_stat": "cha",
    "skill_ranks": 2
  },
  "wizard": {
    "key": "wizard",
    "name": "Wizard",
    "category": "Core Classes",
    "url": "https://www.d20pfsrd.com/classes/core-classes/wizard/",
    "hit_die": 6,
    "bab_table": "bab_section_3",
    "skills": [
      "appraise",
      "craft",
      "fly",
      "knowledge (arcana)",
      "knowledge (dungeoneering)",
      "knowledge (engineering)",
      "knowledge (geography)",
      "knowledge (history)",
      "knowledge (local)",
      "knowledge (nature)",
      "knowledge (nobility)",
      "knowledge (planes)",
      "knowledge (religion)",
      "knowledge (all)",
      "linguistics",
      "profession",
      "spellcraft"
    ],
    "saves": {
      "1": {
        "fort": 0,
        "ref": 0,
        "will": 2
      },
      "2": {
        "fort": 0,
        "ref": 0,
        "will": 3
      },
      "3": {
        "fort": 1,
        "ref": 1,
        "will": 3
      },
      "4": {
        "fort": 1,
        "ref": 1,
        "will": 4
      },
      "5": {
        "fort": 1,
        "ref": 1,
        "will": 4
      },
      "6": {
        "fort": 2,
        "ref": 2,
        "will": 5
      },
      "7": {
        "fort": 2,
        "ref": 2,
        "will": 5
      },
      "8": {
        "fort": 2,
        "ref": 2,
        "will": 6
      },
      "9": {
        "fort": 3,
        "ref": 3,
        "will": 6
      },
      "10": {
        "fort": 3,
        "ref": 3,
        "will": 7
      },
      "11": {
        "fort": 3,
        "ref": 3,
        "will": 7
      },
      "12": {
        "fort": 4,
        "ref": 4,
        "will": 8
      },
      "13": {
        "fort": 4,
        "ref": 4,
        "will": 8
      },
      "14": {
        "fort": 4,
        "ref": 4,
        "will": 9
      },
      "15": {
        "fort": 5,
        "ref": 5,
        "will": 9
      },
      "16": {
        "fort": 5,
        "ref": 5,
        "will": 10
      },
      "17": {
        "fort": 5,
        "ref": 5,
        "will": 10
      },
      "18": {
        "fort": 6,
        "ref": 6,
        "will": 11
      },
      "19": {
        "fort": 6,
        "ref": 6,
        "will": 11
      },
      "20": {
        "fort": 6,
        "ref": 6,
        "will": 12
      }
    },
    "specials": {
      "1": "Arcane bond, arcane school, cantrips, scribe scroll",
      "2": "Spells known",
      "3": "Spells known",
      "4": "Spells known",
      "5": "Bonus wizard feat",
      "6": "Spells known",
      "7": "Spells known",
      "8": "Arcane school power",
      "9": "Spells known",
      "10": "Bonus wizard feat",
      "11": "Spells known",
      "12": "Spells known",
      "13": "Spells known",
      "14": "Spells known",
      "15": "Bonus wizard feat",
      "16": "Spells known",
      "17": "Spells known",
      "18": "Spells known",
      "19": "Spells known",
      "20": "Arcane school power (capstone), bonus wizard feat"
    },
    "spells": {},
    "casting_stat": "int",
    "skill_ranks": 2
  },
  "alchemist": {
    "key": "alchemist",
    "name": "Alchemist",
    "category": "Base Classes",
    "url": "https://www.d20pfsrd.com/classes/base-classes/alchemist/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "appraise",
      "craft",
      "disable device",
      "fly",
      "heal",
      "knowledge (arcana)",
      "knowledge (nature)",
      "perception",
      "profession",
      "sleight of hand",
      "spellcraft",
      "survival",
      "use magic device"
    ],
    "saves": {
      "1": {
        "fort": 2,
        "ref": 2,
        "will": 0
      },
      "2": {
        "fort": 3,
        "ref": 3,
        "will": 0
      },
      "3": {
        "fort": 3,
        "ref": 3,
        "will": 1
      },
      "4": {
        "fort": 4,
        "ref": 4,
        "will": 1
      },
      "5": {
        "fort": 4,
        "ref": 4,
        "will": 1
      },
      "6": {
        "fort": 5,
        "ref": 5,
        "will": 2
      },
      "7": {
        "fort": 5,
        "ref": 5,
        "will": 2
      },
      "8": {
        "fort": 6,
        "ref": 6,
        "will": 2
      },
      "9": {
        "fort": 6,
        "ref": 6,
        "will": 3
      },
      "10": {
        "fort": 7,
        "ref": 7,
        "will": 3
      },
      "11": {
        "fort": 7,
        "ref": 7,
        "will": 3
      },
      "12": {
        "fort": 8,
        "ref": 8,
        "will": 4
      },
      "13": {
        "fort": 8,
        "ref": 8,
        "will": 4
      },
      "14": {
        "fort": 9,
        "ref": 9,
        "will": 4
      },
      "15": {
        "fort": 9,
        "ref": 9,
        "will": 5
      },
      "16": {
        "fort": 10,
        "ref": 10,
        "will": 5
      },
      "17": {
        "fort": 10,
        "ref": 10,
        "will": 5
      },
      "18": {
        "fort": 11,
        "ref": 11,
        "will": 6
      },
      "19": {
        "fort": 11,
        "ref": 11,
        "will": 6
      },
      "20": {
        "fort": 12,
        "ref": 12,
        "will": 6
      }
    },
    "specials": {
      "1": "Alchemy, bomb 1d6, brew potion, mutagen, throw anything",
      "2": "Discovery, poison resistance +2, poison use",
      "3": "Bomb 2d6, swift alchemy",
      "4": "Discovery",
      "5": "Bomb 3d6, poison resistance +4",
      "6": "Discovery, swift poisoning",
      "7": "Bomb 4d6",
      "8": "Discovery, poison resistance +6",
      "9": "Bomb 5d6",
      "10": "Discovery, poison immunity",
      "11": "Bomb 6d6",
      "12": "Discovery",
      "13": "Bomb 7d6",
      "14": "Discovery, persistent mutagen",
      "15": "Bomb 8d6",
      "16": "Discovery",
      "17": "Bomb 9d6",
      "18": "Discovery, instant alchemy",
      "19": "Bomb 10d6",
      "20": "Grand discovery"
    },
    "spells": {},
    "casting_stat": "int",
    "skill_ranks": 4
  },
  "cavalier": {
    "key": "cavalier",
    "name": "Cavalier",
    "category": "Base Classes",
    "url": "https://www.d20pfsrd.com/classes/base-classes/cavalier/",
    "hit_die": 10,
    "bab_table": "bab_section_1",
    "skills": [
      "bluff",
      "climb",
      "craft",
      "diplomacy",
      "handle animal",
      "intimidate",
      "profession",
      "ride",
      "sense motive",
      "swim"
    ],
    "saves": {
      "1": {
        "fort": 2,
        "ref": 0,
        "will": 0
      },
      "2": {
        "fort": 3,
        "ref": 0,
        "will": 0
      },
      "3": {
        "fort": 3,
        "ref": 1,
        "will": 1
      },
      "4": {
        "fort": 4,
        "ref": 1,
        "will": 1
      },
      "5": {
        "fort": 4,
        "ref": 1,
        "will": 1
      },
      "6": {
        "fort": 5,
        "ref": 2,
        "will": 2
      },
      "7": {
        "fort": 5,
        "ref": 2,
        "will": 2
      },
      "8": {
        "fort": 6,
        "ref": 2,
        "will": 2
      },
      "9": {
        "fort": 6,
        "ref": 3,
        "will": 3
      },
      "10": {
        "fort": 7,
        "ref": 3,
        "will": 3
      },
      "11": {
        "fort": 7,
        "ref": 3,
        "will": 3
      },
      "12": {
        "fort": 8,
        "ref": 4,
        "will": 4
      },
      "13": {
        "fort": 8,
        "ref": 4,
        "will": 4
      },
      "14": {
        "fort": 9,
        "ref": 4,
        "will": 4
      },
      "15": {
        "fort": 9,
        "ref": 5,
        "will": 5
      },
      "16": {
        "fort": 10,
        "ref": 5,
        "will": 5
      },
      "17": {
        "fort": 10,
        "ref": 5,
        "will": 5
      },
      "18": {
        "fort": 11,
        "ref": 6,
        "will": 6
      },
      "19": {
        "fort": 11,
        "ref": 6,
        "will": 6
      },
      "20": {
        "fort": 12,
        "ref": 6,
        "will": 6
      }
    },
    "specials": {
      "1": "Challenge 1/day, mount, order, tactician",
      "2": "Order ability",
      "3": "Cavalier's charge",
      "4": "Challenge 2/day, expert trainer",
      "5": "Banner",
      "6": "Bonus combat feat",
      "7": "Challenge 3/day",
      "8": "Order ability",
      "9": "Greater tactician",
      "10": "Challenge 4/day",
      "11": "Mighty charge",
      "12": "Bonus combat feat",
      "13": "Challenge 5/day",
      "14": "Greater banner",
      "15": "Order ability",
      "16": "Challenge 6/day",
      "17": "Master tactician",
      "18": "Bonus combat feat",
      "19": "Challenge 7/day",
      "20": "Supreme charge"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 4
  },
  "gunslinger": {
    "key": "gunslinger",
    "name": "Gunslinger",
    "category": "Base Classes",
    "url": "https://www.d20pfsrd.com/classes/base-classes/gunslinger/",
    "hit_die": 10,
    "bab_table": "bab_section_1",
    "skills": [
      "acrobatics",
      "bluff",
      "climb",
      "craft",
      "heal",
      "intimidate",
      "knowledge (engineering)",
      "knowledge (local)",
      "perception",
      "profession",
      "ride",
      "sleight of hand",
      "survival",
      "swim"
    ],
    "saves": {
      "1": {
        "fort": 2,
        "ref": 2,
        "will": 0
      },
      "2": {
        "fort": 3,
        "ref": 3,
        "will": 0
      },
      "3": {
        "fort": 3,
        "ref": 3,
        "will": 1
      },
      "4": {
        "fort": 4,
        "ref": 4,
        "will": 1
      },
      "5": {
        "fort": 4,
        "ref": 4,
        "will": 1
      },
      "6": {
        "fort": 5,
        "ref": 5,
        "will": 2
      },
      "7": {
        "fort": 5,
        "ref": 5,
        "will": 2
      },
      "8": {
        "fort": 6,
        "ref": 6,
        "will": 2
      },
      "9": {
        "fort": 6,
        "ref": 6,
        "will": 3
      },
      "10": {
        "fort": 7,
        "ref": 7,
        "will": 3
      },
      "11": {
        "fort": 7,
        "ref": 7,
        "will": 3
      },
      "12": {
        "fort": 8,
        "ref": 8,
        "will": 4
      },
      "13": {
        "fort": 8,
        "ref": 8,
        "will": 4
      },
      "14": {
        "fort": 9,
        "ref": 9,
        "will": 4
      },
      "15": {
        "fort": 9,
        "ref": 9,
        "will": 5
      },
      "16": {
        "fort": 10,
        "ref": 10,
        "will": 5
      },
      "17": {
        "fort": 10,
        "ref": 10,
        "will": 5
      },
      "18": {
        "fort": 11,
        "ref": 11,
        "will": 6
      },
      "19": {
        "fort": 11,
        "ref": 11,
        "will": 6
      },
      "20": {
        "fort": 12,
        "ref": 12,
        "will": 6
      }
    },
    "specials": {
      "1": "Gunsmith, grit, deeds (deadeye, gunslinger's dodge, quick clear)",
      "2": "Nimble +1",
      "3": "Deeds (gunslinger initiative, pistol-whip, utility shot)",
      "4": "Bonus combat feat",
      "5": "Gun training 1",
      "6": "Nimble +2",
      "7": "Deeds (dead shot, startling shot, targeting)",
      "8": "Bonus combat feat",
      "9": "Gun training 2",
      "10": "Nimble +3",
      "11": "Deeds (bleeding wound, expert loading, lightning reload)",
      "12": "Bonus combat feat",
      "13": "Gun training 3",
      "14": "Nimble +4",
      "15": "Deeds (evasive, menacing shot, slinger's luck)",
      "16": "Bonus combat feat",
      "17": "Gun training 4",
      "18": "Nimble +5",
      "19": "Deeds (cheat death, death's shot, stunning shot)",
      "20": "True grit"
    },
    "spells": {},
    "casting_stat": "wis",
    "skill_ranks": 4
  },
  "inquisitor": {
    "key": "inquisitor",
    "name": "Inquisitor",
    "category": "Base Classes",
    "url": "https://www.d20pfsrd.com/classes/base-classes/inquisitor/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "bluff",
      "climb",
      "craft",
      "diplomacy",
      "disguise",
      "heal",
      "intimidate",
      "knowledge (arcana)",
      "knowledge (dungeoneering)",
      "knowledge (nature)",
      "knowledge (planes)",
      "knowledge (religion)",
      "perception",
      "profession",
      "ride",
      "sense motive",
      "spellcraft",
      "stealth",
      "survival",
      "swim"
    ],
    "saves": {
      "1": {
        "fort": 2,
        "ref": 0,
        "will": 2
      },
      "2": {
        "fort": 3,
        "ref": 0,
        "will": 3
      },
      "3": {
        "fort": 3,
        "ref": 1,
        "will": 3
      },
      "4": {
        "fort": 4,
        "ref": 1,
        "will": 4
      },
      "5": {
        "fort": 4,
        "ref": 1,
        "will": 4
      },
      "6": {
        "fort": 5,
        "ref": 2,
        "will": 5
      },
      "7": {
        "fort": 5,
        "ref": 2,
        "will": 5
      },
      "8": {
        "fort": 6,
        "ref": 2,
        "will": 6
      },
      "9": {
        "fort": 6,
        "ref": 3,
        "will": 6
      },
      "10": {
        "fort": 7,
        "ref": 3,
        "will": 7
      },
      "11": {
        "fort": 7,
        "ref": 3,
        "will": 7
      },
      "12": {
        "fort": 8,
        "ref": 4,
        "will": 8
      },
      "13": {
        "fort": 8,
        "ref": 4,
        "will": 8
      },
      "14": {
        "fort": 9,
        "ref": 4,
        "will": 9
      },
      "15": {
        "fort": 9,
        "ref": 5,
        "will": 9
      },
      "16": {
        "fort": 10,
        "ref": 5,
        "will": 10
      },
      "17": {
        "fort": 10,
        "ref": 5,
        "will": 10
      },
      "18": {
        "fort": 11,
        "ref": 6,
        "will": 11
      },
      "19": {
        "fort": 11,
        "ref": 6,
        "will": 11
      },
      "20": {
        "fort": 12,
        "ref": 6,
        "will": 12
      }
    },
    "specials": {
      "1": "Domain, judgment 1/day, monster lore (+WIS), stern gaze",
      "2": "Cunning initiative (+WIS), detect alignment, track",
      "3": "Solo tactics, teamwork feat",
      "4": "Judgment 2/day",
      "5": "Bane, discern lies",
      "6": "Teamwork feat",
      "7": "Judgment 3/day",
      "8": "Second judgment",
      "9": "Teamwork feat",
      "10": "Judgment 4/day",
      "11": "Stalwart",
      "12": "Greater bane, teamwork feat",
      "13": "Judgment 5/day",
      "14": "Exploit weakness",
      "15": "Teamwork feat",
      "16": "Judgment 6/day, third judgment",
      "17": "Slayer",
      "18": "Teamwork feat",
      "19": "Judgment 7/day",
      "20": "True judgment"
    },
    "spells": {},
    "casting_stat": "wis",
    "skill_ranks": 6
  },
  "magus": {
    "key": "magus",
    "name": "Magus",
    "category": "Base Classes",
    "url": "https://www.d20pfsrd.com/classes/base-classes/magus/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "climb",
      "craft",
      "fly",
      "intimidate",
      "knowledge (arcana)",
      "knowledge (dungeoneering)",
      "knowledge (planes)",
      "profession",
      "ride",
      "spellcraft",
      "swim",
      "use magic device"
    ],
    "saves": {
      "1": {
        "fort": 2,
        "ref": 0,
        "will": 2
      },
      "2": {
        "fort": 3,
        "ref": 0,
        "will": 3
      },
      "3": {
        "fort": 3,
        "ref": 1,
        "will": 3
      },
      "4": {
        "fort": 4,
        "ref": 1,
        "will": 4
      },
      "5": {
        "fort": 4,
        "ref": 1,
        "will": 4
      },
      "6": {
        "fort": 5,
        "ref": 2,
        "will": 5
      },
      "7": {
        "fort": 5,
        "ref": 2,
        "will": 5
      },
      "8": {
        "fort": 6,
        "ref": 2,
        "will": 6
      },
      "9": {
        "fort": 6,
        "ref": 3,
        "will": 6
      },
      "10": {
        "fort": 7,
        "ref": 3,
        "will": 7
      },
      "11": {
        "fort": 7,
        "ref": 3,
        "will": 7
      },
      "12": {
        "fort": 8,
        "ref": 4,
        "will": 8
      },
      "13": {
        "fort": 8,
        "ref": 4,
        "will": 8
      },
      "14": {
        "fort": 9,
        "ref": 4,
        "will": 9
      },
      "15": {
        "fort": 9,
        "ref": 5,
        "will": 9
      },
      "16": {
        "fort": 10,
        "ref": 5,
        "will": 10
      },
      "17": {
        "fort": 10,
        "ref": 5,
        "will": 10
      },
      "18": {
        "fort": 11,
        "ref": 6,
        "will": 11
      },
      "19": {
        "fort": 11,
        "ref": 6,
        "will": 11
      },
      "20": {
        "fort": 12,
        "ref": 6,
        "will": 12
      }
    },
    "specials": {
      "1": "Arcane pool, cantrips, spell combat",
      "2": "Spellstrike",
      "3": "Magus arcana",
      "4": "Spell recall",
      "5": "Bonus combat feat",
      "6": "Magus arcana",
      "7": "Knowledge pool, medium armor",
      "8": "Improved spell combat",
      "9": "Magus arcana",
      "10": "Fighter training",
      "11": "Bonus combat feat, improved spell recall",
      "12": "Magus arcana",
      "13": "Heavy armor",
      "14": "Greater spell combat",
      "15": "Magus arcana",
      "16": "Counterstrike",
      "17": "Bonus combat feat",
      "18": "Magus arcana",
      "19": "Greater spell recall",
      "20": "True magus"
    },
    "spells": {},
    "casting_stat": "int",
    "skill_ranks": 2
  },
  "omdura": {
    "key": "omdura",
    "name": "Omdura",
    "category": "Base Classes",
    "url": "https://www.d20pfsrd.com/classes/base-classes/omdura/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "acrobatics",
      "appraise",
      "bluff",
      "climb",
      "craft",
      "diplomacy",
      "heal",
      "intimidate",
      "knowledge (nobility)",
      "knowledge (religion)",
      "perception",
      "profession",
      "ride",
      "sense motive",
      "spellcraft",
      "swim"
    ],
    "saves": {
      "1": {
        "fort": 2,
        "ref": 0,
        "will": 2
      },
      "2": {
        "fort": 3,
        "ref": 0,
        "will": 3
      },
      "3": {
        "fort": 3,
        "ref": 1,
        "will": 3
      },
      "4": {
        "fort": 4,
        "ref": 1,
        "will": 4
      },
      "5": {
        "fort": 4,
        "ref": 1,
        "will": 4
      },
      "6": {
        "fort": 5,
        "ref": 2,
        "will": 5
      },
      "7": {
        "fort": 5,
        "ref": 2,
        "will": 5
      },
      "8": {
        "fort": 6,
        "ref": 2,
        "will": 6
      },
      "9": {
        "fort": 6,
        "ref": 3,
        "will": 6
      },
      "10": {
        "fort": 7,
        "ref": 3,
        "will": 7
      },
      "11": {
        "fort": 7,
        "ref": 3,
        "will": 7
      },
      "12": {
        "fort": 8,
        "ref": 4,
        "will": 8
      },
      "13": {
        "fort": 8,
        "ref": 4,
        "will": 8
      },
      "14": {
        "fort": 9,
        "ref": 4,
        "will": 9
      },
      "15": {
        "fort": 9,
        "ref": 5,
        "will": 9
      },
      "16": {
        "fort": 10,
        "ref": 5,
        "will": 10
      },
      "17": {
        "fort": 10,
        "ref": 5,
        "will": 10
      },
      "18": {
        "fort": 11,
        "ref": 6,
        "will": 11
      },
      "19": {
        "fort": 11,
        "ref": 6,
        "will": 11
      },
      "20": {
        "fort": 12,
        "ref": 6,
        "will": 12
      }
    },
    "specials": {
      "1": "Aura, detect alignment, invocations, spells",
      "2": "Divine touch (lay on hands)",
      "3": "Commune with mentor",
      "4": "Smite 2/day",
      "5": "Divine bond (weapon, armor or shield)",
      "6": "Mercy",
      "7": "Smite 3/day",
      "8": "Aura of clarity",
      "9": "Mercy",
      "10": "Smite 4/day",
      "11": "Divine retribution",
      "12": "Mercy",
      "13": "Smite 5/day",
      "14": "Aura of sanctity",
      "15": "Mercy",
      "16": "Smite 6/day",
      "17": "Divine empowerment",
      "18": "Mercy",
      "19": "Smite 7/day",
      "20": "Avatar of the divine"
    },
    "spells": {},
    "casting_stat": "cha",
    "skill_ranks": 4
  },
  "oracle": {
    "key": "oracle",
    "name": "Oracle",
    "category": "Base Classes",
    "url": "https://www.d20pfsrd.com/classes/base-classes/oracle/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "craft",
      "diplomacy",
      "heal",
      "knowledge (history)",
      "knowledge (planes)",
      "knowledge (religion)",
      "profession",
      "sense motive",
      "spellcraft"
    ],
    "saves": {
      "1": {
        "fort": 0,
        "ref": 0,
        "will": 2
      },
      "2": {
        "fort": 0,
        "ref": 0,
        "will": 3
      },
      "3": {
        "fort": 1,
        "ref": 1,
        "will": 3
      },
      "4": {
        "fort": 1,
        "ref": 1,
        "will": 4
      },
      "5": {
        "fort": 1,
        "ref": 1,
        "will": 4
      },
      "6": {
        "fort": 2,
        "ref": 2,
        "will": 5
      },
      "7": {
        "fort": 2,
        "ref": 2,
        "will": 5
      },
      "8": {
        "fort": 2,
        "ref": 2,
        "will": 6
      },
      "9": {
        "fort": 3,
        "ref": 3,
        "will": 6
      },
      "10": {
        "fort": 3,
        "ref": 3,
        "will": 7
      },
      "11": {
        "fort": 3,
        "ref": 3,
        "will": 7
      },
      "12": {
        "fort": 4,
        "ref": 4,
        "will": 8
      },
      "13": {
        "fort": 4,
        "ref": 4,
        "will": 8
      },
      "14": {
        "fort": 4,
        "ref": 4,
        "will": 9
      },
      "15": {
        "fort": 5,
        "ref": 5,
        "will": 9
      },
      "16": {
        "fort": 5,
        "ref": 5,
        "will": 10
      },
      "17": {
        "fort": 5,
        "ref": 5,
        "will": 10
      },
      "18": {
        "fort": 6,
        "ref": 6,
        "will": 11
      },
      "19": {
        "fort": 6,
        "ref": 6,
        "will": 11
      },
      "20": {
        "fort": 6,
        "ref": 6,
        "will": 12
      }
    },
    "specials": {
      "1": "Mystery, oracle's curse, revelation",
      "2": "Mystery spell (1st)",
      "3": "Revelation",
      "4": "Mystery spell (2nd)",
      "5": "Curse improvement",
      "6": "Mystery spell (3rd)",
      "7": "Revelation",
      "8": "Mystery spell (4th)",
      "9": "Mystery spell (custom)",
      "10": "Curse improvement, mystery spell (5th)",
      "11": "Revelation",
      "12": "Mystery spell (6th)",
      "13": "Mystery spell (custom)",
      "14": "Mystery spell (7th)",
      "15": "Curse improvement, revelation",
      "16": "Mystery spell (8th)",
      "17": "Mystery spell (custom)",
      "18": "Mystery spell (9th)",
      "19": "Revelation",
      "20": "Final revelation"
    },
    "spells": {},
    "casting_stat": "cha",
    "skill_ranks": 4
  },
  "shifter": {
    "key": "shifter",
    "name": "Shifter",
    "category": "Official Classes",
    "url": "https://www.d20pfsrd.com/classes/official-classes/shifter/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "acrobatics",
      "climb",
      "craft",
      "fly",
      "handle animal",
      "intimidate",
      "knowledge (nature)",
      "perception",
      "profession",
      "ride",
      "survival",
      "swim"
    ],
    "saves": {
      "1": {
        "fort": 2,
        "ref": 2,
        "will": 0
      },
      "2": {
        "fort": 3,
        "ref": 3,
        "will": 0
      },
      "3": {
        "fort": 3,
        "ref": 3,
        "will": 1
      },
      "4": {
        "fort": 4,
        "ref": 4,
        "will": 1
      },
      "5": {
        "fort": 4,
        "ref": 4,
        "will": 1
      },
      "6": {
        "fort": 5,
        "ref": 5,
        "will": 2
      },
      "7": {
        "fort": 5,
        "ref": 5,
        "will": 2
      },
      "8": {
        "fort": 6,
        "ref": 6,
        "will": 2
      },
      "9": {
        "fort": 6,
        "ref": 6,
        "will": 3
      },
      "10": {
        "fort": 7,
        "ref": 7,
        "will": 3
      },
      "11": {
        "fort": 7,
        "ref": 7,
        "will": 3
      },
      "12": {
        "fort": 8,
        "ref": 8,
        "will": 4
      },
      "13": {
        "fort": 8,
        "ref": 8,
        "will": 4
      },
      "14": {
        "fort": 9,
        "ref": 9,
        "will": 4
      },
      "15": {
        "fort": 9,
        "ref": 9,
        "will": 5
      },
      "16": {
        "fort": 10,
        "ref": 10,
        "will": 5
      },
      "17": {
        "fort": 10,
        "ref": 10,
        "will": 5
      },
      "18": {
        "fort": 11,
        "ref": 11,
        "will": 6
      },
      "19": {
        "fort": 11,
        "ref": 11,
        "will": 6
      },
      "20": {
        "fort": 12,
        "ref": 12,
        "will": 6
      }
    },
    "specials": {
      "1": "Shifter aspect, shifter's claws, wild empathy",
      "2": "Defensive instinct +1",
      "3": "Track, woodland stride",
      "4": "Defensive instinct +2, shifter shape (beast form)",
      "5": "Trackless step",
      "6": "Defensive instinct +3, shifter aspect",
      "7": "Shifter shape",
      "8": "Defensive instinct +4",
      "9": "Chimeric aspect (2 aspects)",
      "10": "Defensive instinct +5, shifter aspect",
      "11": "Shifter shape",
      "12": "Defensive instinct +6",
      "13": "Shifter shape",
      "14": "Defensive instinct +7, shifter aspect",
      "15": "Greater chimeric aspect (3 aspects)",
      "16": "Defensive instinct +8",
      "17": "Shifter shape",
      "18": "Defensive instinct +9",
      "19": "Defensive instinct +10",
      "20": "Final aspect"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 4
  },
  "summoner": {
    "key": "summoner",
    "name": "Summoner",
    "category": "Base Classes",
    "url": "https://www.d20pfsrd.com/classes/base-classes/summoner/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "craft",
      "fly",
      "handle animal",
      "knowledge (arcana)",
      "knowledge (dungeoneering)",
      "knowledge (engineering)",
      "knowledge (geography)",
      "knowledge (history)",
      "knowledge (local)",
      "knowledge (nature)",
      "knowledge (nobility)",
      "knowledge (planes)",
      "knowledge (religion)",
      "knowledge (all)",
      "linguistics",
      "profession",
      "ride",
      "spellcraft",
      "use magic device"
    ],
    "saves": {
      "1": {
        "fort": 0,
        "ref": 0,
        "will": 2
      },
      "2": {
        "fort": 0,
        "ref": 0,
        "will": 3
      },
      "3": {
        "fort": 1,
        "ref": 1,
        "will": 3
      },
      "4": {
        "fort": 1,
        "ref": 1,
        "will": 4
      },
      "5": {
        "fort": 1,
        "ref": 1,
        "will": 4
      },
      "6": {
        "fort": 2,
        "ref": 2,
        "will": 5
      },
      "7": {
        "fort": 2,
        "ref": 2,
        "will": 5
      },
      "8": {
        "fort": 2,
        "ref": 2,
        "will": 6
      },
      "9": {
        "fort": 3,
        "ref": 3,
        "will": 6
      },
      "10": {
        "fort": 3,
        "ref": 3,
        "will": 7
      },
      "11": {
        "fort": 3,
        "ref": 3,
        "will": 7
      },
      "12": {
        "fort": 4,
        "ref": 4,
        "will": 8
      },
      "13": {
        "fort": 4,
        "ref": 4,
        "will": 8
      },
      "14": {
        "fort": 4,
        "ref": 4,
        "will": 9
      },
      "15": {
        "fort": 5,
        "ref": 5,
        "will": 9
      },
      "16": {
        "fort": 5,
        "ref": 5,
        "will": 10
      },
      "17": {
        "fort": 5,
        "ref": 5,
        "will": 10
      },
      "18": {
        "fort": 6,
        "ref": 6,
        "will": 11
      },
      "19": {
        "fort": 6,
        "ref": 6,
        "will": 11
      },
      "20": {
        "fort": 6,
        "ref": 6,
        "will": 12
      }
    },
    "specials": {
      "1": "Cantrips, eidolon, life link, summon monster I",
      "2": "Bond senses",
      "3": "Summon monster II",
      "4": "Shield ally",
      "5": "Summon monster III",
      "6": "Maker's call",
      "7": "Summon monster IV",
      "8": "Transposition",
      "9": "Summon monster V",
      "10": "Aspect",
      "11": "Summon monster VI",
      "12": "Greater shield ally",
      "13": "Summon monster VII",
      "14": "Life bond",
      "15": "Summon monster VIII",
      "16": "Merge forms",
      "17": "Summon monster IX",
      "18": "Greater aspect",
      "19": "Gate",
      "20": "Twin eidolon"
    },
    "spells": {},
    "casting_stat": "cha",
    "skill_ranks": 2
  },
  "vampire_hunter": {
    "key": "vampire_hunter",
    "name": "Vampire Hunter",
    "category": "Official Classes",
    "url": "https://www.d20pfsrd.com/classes/official-classes/vampire-hunter/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "bluff",
      "climb",
      "craft",
      "diplomacy",
      "heal",
      "intimidate",
      "knowledge (arcana)",
      "knowledge (geography)",
      "knowledge (history)",
      "knowledge (local)",
      "knowledge (planes)",
      "knowledge (religion)",
      "perception",
      "profession",
      "ride",
      "sense motive",
      "stealth",
      "survival"
    ],
    "saves": {
      "1": {
        "fort": 0,
        "ref": 2,
        "will": 2
      },
      "2": {
        "fort": 0,
        "ref": 3,
        "will": 3
      },
      "3": {
        "fort": 1,
        "ref": 3,
        "will": 3
      },
      "4": {
        "fort": 1,
        "ref": 4,
        "will": 4
      },
      "5": {
        "fort": 1,
        "ref": 4,
        "will": 4
      },
      "6": {
        "fort": 2,
        "ref": 5,
        "will": 5
      },
      "7": {
        "fort": 2,
        "ref": 5,
        "will": 5
      },
      "8": {
        "fort": 2,
        "ref": 6,
        "will": 6
      },
      "9": {
        "fort": 3,
        "ref": 6,
        "will": 6
      },
      "10": {
        "fort": 3,
        "ref": 7,
        "will": 7
      },
      "11": {
        "fort": 3,
        "ref": 7,
        "will": 7
      },
      "12": {
        "fort": 4,
        "ref": 8,
        "will": 8
      },
      "13": {
        "fort": 4,
        "ref": 8,
        "will": 8
      },
      "14": {
        "fort": 4,
        "ref": 9,
        "will": 9
      },
      "15": {
        "fort": 5,
        "ref": 9,
        "will": 9
      },
      "16": {
        "fort": 5,
        "ref": 10,
        "will": 10
      },
      "17": {
        "fort": 5,
        "ref": 10,
        "will": 10
      },
      "18": {
        "fort": 6,
        "ref": 11,
        "will": 11
      },
      "19": {
        "fort": 6,
        "ref": 11,
        "will": 11
      },
      "20": {
        "fort": 6,
        "ref": 12,
        "will": 12
      }
    },
    "specials": {
      "1": "Vampire slayer, detect undead, relentless tracking, stake",
      "2": "Vampiric empathy",
      "3": "Combat style feat",
      "4": "Relic 1",
      "5": "Swift tracker",
      "6": "Combat style feat",
      "7": "Relic 2",
      "8": "Quarry",
      "9": "Combat style feat",
      "10": "Relic 3",
      "11": "Vampire's bane",
      "12": "Combat style feat",
      "13": "Relic 4",
      "14": "Improved quarry",
      "15": "Combat style feat",
      "16": "Relic 5",
      "17": "Master slayer",
      "18": "Combat style feat",
      "19": "Relic 6",
      "20": "Vampire hunter apotheosis"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 4
  },
  "vigilante": {
    "key": "vigilante",
    "name": "Vigilante",
    "category": "Official Classes",
    "url": "https://www.d20pfsrd.com/classes/official-classes/vigilante/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "acrobatics",
      "appraise",
      "bluff",
      "climb",
      "craft",
      "diplomacy",
      "disable device",
      "disguise",
      "escape artist",
      "intimidate",
      "knowledge (dungeoneering)",
      "knowledge (engineering)",
      "knowledge (history)",
      "knowledge (local)",
      "knowledge (nobility)",
      "perception",
      "perform",
      "profession",
      "sense motive",
      "sleight of hand",
      "stealth",
      "survival",
      "swim",
      "use magic device"
    ],
    "saves": {
      "1": {
        "fort": 0,
        "ref": 2,
        "will": 2
      },
      "2": {
        "fort": 0,
        "ref": 3,
        "will": 3
      },
      "3": {
        "fort": 1,
        "ref": 3,
        "will": 3
      },
      "4": {
        "fort": 1,
        "ref": 4,
        "will": 4
      },
      "5": {
        "fort": 1,
        "ref": 4,
        "will": 4
      },
      "6": {
        "fort": 2,
        "ref": 5,
        "will": 5
      },
      "7": {
        "fort": 2,
        "ref": 5,
        "will": 5
      },
      "8": {
        "fort": 2,
        "ref": 6,
        "will": 6
      },
      "9": {
        "fort": 3,
        "ref": 6,
        "will": 6
      },
      "10": {
        "fort": 3,
        "ref": 7,
        "will": 7
      },
      "11": {
        "fort": 3,
        "ref": 7,
        "will": 7
      },
      "12": {
        "fort": 4,
        "ref": 8,
        "will": 8
      },
      "13": {
        "fort": 4,
        "ref": 8,
        "will": 8
      },
      "14": {
        "fort": 4,
        "ref": 9,
        "will": 9
      },
      "15": {
        "fort": 5,
        "ref": 9,
        "will": 9
      },
      "16": {
        "fort": 5,
        "ref": 10,
        "will": 10
      },
      "17": {
        "fort": 5,
        "ref": 10,
        "will": 10
      },
      "18": {
        "fort": 6,
        "ref": 11,
        "will": 11
      },
      "19": {
        "fort": 6,
        "ref": 11,
        "will": 11
      },
      "20": {
        "fort": 6,
        "ref": 12,
        "will": 12
      }
    },
    "specials": {
      "1": "Dual identity, seamless guise, social talent, vigilante specialization",
      "2": "Vigilante talent",
      "3": "Social talent, unshakeable",
      "4": "Vigilante talent",
      "5": "Startling appearance, social talent",
      "6": "Vigilante talent",
      "7": "Social talent",
      "8": "Vigilante talent",
      "9": "Social talent",
      "10": "Vigilante talent",
      "11": "Frightening appearance, social talent",
      "12": "Vigilante talent",
      "13": "Social talent",
      "14": "Vigilante talent",
      "15": "Social talent",
      "16": "Vigilante talent",
      "17": "Stunning appearance, social talent",
      "18": "Vigilante talent",
      "19": "Social talent",
      "20": "Vengeance strike, vigilante talent"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 6
  },
  "witch": {
    "key": "witch",
    "name": "Witch",
    "category": "Base Classes",
    "url": "https://www.d20pfsrd.com/classes/base-classes/witch/",
    "hit_die": 6,
    "bab_table": "bab_section_3",
    "skills": [
      "craft",
      "fly",
      "heal",
      "intimidate",
      "knowledge (arcana)",
      "knowledge (history)",
      "knowledge (nature)",
      "knowledge (planes)",
      "profession",
      "spellcraft",
      "use magic device"
    ],
    "saves": {
      "1": {
        "fort": 0,
        "ref": 0,
        "will": 2
      },
      "2": {
        "fort": 0,
        "ref": 0,
        "will": 3
      },
      "3": {
        "fort": 1,
        "ref": 1,
        "will": 3
      },
      "4": {
        "fort": 1,
        "ref": 1,
        "will": 4
      },
      "5": {
        "fort": 1,
        "ref": 1,
        "will": 4
      },
      "6": {
        "fort": 2,
        "ref": 2,
        "will": 5
      },
      "7": {
        "fort": 2,
        "ref": 2,
        "will": 5
      },
      "8": {
        "fort": 2,
        "ref": 2,
        "will": 6
      },
      "9": {
        "fort": 3,
        "ref": 3,
        "will": 6
      },
      "10": {
        "fort": 3,
        "ref": 3,
        "will": 7
      },
      "11": {
        "fort": 3,
        "ref": 3,
        "will": 7
      },
      "12": {
        "fort": 4,
        "ref": 4,
        "will": 8
      },
      "13": {
        "fort": 4,
        "ref": 4,
        "will": 8
      },
      "14": {
        "fort": 4,
        "ref": 4,
        "will": 9
      },
      "15": {
        "fort": 5,
        "ref": 5,
        "will": 9
      },
      "16": {
        "fort": 5,
        "ref": 5,
        "will": 10
      },
      "17": {
        "fort": 5,
        "ref": 5,
        "will": 10
      },
      "18": {
        "fort": 6,
        "ref": 6,
        "will": 11
      },
      "19": {
        "fort": 6,
        "ref": 6,
        "will": 11
      },
      "20": {
        "fort": 6,
        "ref": 6,
        "will": 12
      }
    },
    "specials": {
      "1": "Cantrips, hex, patron spells, witch's familiar",
      "2": "Hex",
      "3": "Patron spell (2nd)",
      "4": "Hex",
      "5": "Patron spell (3rd)",
      "6": "Hex",
      "7": "Patron spell (4th)",
      "8": "Hex",
      "9": "Patron spell (5th)",
      "10": "Hex, major hex",
      "11": "Patron spell (6th)",
      "12": "Hex",
      "13": "Patron spell (7th)",
      "14": "Hex",
      "15": "Patron spell (8th)",
      "16": "Hex",
      "17": "Patron spell (9th)",
      "18": "Grand hex, hex",
      "19": "Patron spell",
      "20": "Grand hex, hex"
    },
    "spells": {},
    "casting_stat": "int",
    "skill_ranks": 2
  },
  "arcanist": {
    "key": "arcanist",
    "name": "Arcanist",
    "category": "Official Classes",
    "url": "https://www.d20pfsrd.com/classes/official-classes/arcanist/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "appraise",
      "craft",
      "fly",
      "knowledge (arcana)",
      "knowledge (dungeoneering)",
      "knowledge (engineering)",
      "knowledge (geography)",
      "knowledge (history)",
      "knowledge (local)",
      "knowledge (nature)",
      "knowledge (nobility)",
      "knowledge (planes)",
      "knowledge (religion)",
      "knowledge (all)",
      "linguistics",
      "profession",
      "spellcraft",
      "use magic device"
    ],
    "saves": {
      "1": {
        "fort": 0,
        "ref": 0,
        "will": 2
      },
      "2": {
        "fort": 0,
        "ref": 0,
        "will": 3
      },
      "3": {
        "fort": 1,
        "ref": 1,
        "will": 3
      },
      "4": {
        "fort": 1,
        "ref": 1,
        "will": 4
      },
      "5": {
        "fort": 1,
        "ref": 1,
        "will": 4
      },
      "6": {
        "fort": 2,
        "ref": 2,
        "will": 5
      },
      "7": {
        "fort": 2,
        "ref": 2,
        "will": 5
      },
      "8": {
        "fort": 2,
        "ref": 2,
        "will": 6
      },
      "9": {
        "fort": 3,
        "ref": 3,
        "will": 6
      },
      "10": {
        "fort": 3,
        "ref": 3,
        "will": 7
      },
      "11": {
        "fort": 3,
        "ref": 3,
        "will": 7
      },
      "12": {
        "fort": 4,
        "ref": 4,
        "will": 8
      },
      "13": {
        "fort": 4,
        "ref": 4,
        "will": 8
      },
      "14": {
        "fort": 4,
        "ref": 4,
        "will": 9
      },
      "15": {
        "fort": 5,
        "ref": 5,
        "will": 9
      },
      "16": {
        "fort": 5,
        "ref": 5,
        "will": 10
      },
      "17": {
        "fort": 5,
        "ref": 5,
        "will": 10
      },
      "18": {
        "fort": 6,
        "ref": 6,
        "will": 11
      },
      "19": {
        "fort": 6,
        "ref": 6,
        "will": 11
      },
      "20": {
        "fort": 6,
        "ref": 6,
        "will": 12
      }
    },
    "specials": {
      "1": "Arcane reservoir, arcanist exploits, cantrips, consume spells",
      "2": "Arcanist spells",
      "3": "Arcanist exploit",
      "4": "Arcanist spells",
      "5": "Arcanist exploit",
      "6": "Arcanist spells",
      "7": "Arcanist exploit",
      "8": "Arcanist spells",
      "9": "Arcanist exploit",
      "10": "Arcanist spells",
      "11": "Greater exploits, arcanist exploit",
      "12": "Arcanist spells",
      "13": "Arcanist exploit",
      "14": "Arcanist spells",
      "15": "Arcanist exploit",
      "16": "Arcanist spells",
      "17": "Arcanist exploit",
      "18": "Arcanist spells",
      "19": "Arcanist exploit",
      "20": "Magical supremacy"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 2
  },
  "bloodrager": {
    "key": "bloodrager",
    "name": "Bloodrager",
    "category": "Hybrid Classes",
    "url": "https://www.d20pfsrd.com/classes/hybrid-classes/bloodrager/",
    "hit_die": 10,
    "bab_table": "bab_section_1",
    "skills": [
      "acrobatics",
      "climb",
      "craft",
      "handle animal",
      "intimidate",
      "knowledge (arcana)",
      "perception",
      "ride",
      "spellcraft",
      "survival",
      "swim"
    ],
    "saves": {
      "1": {
        "fort": 2,
        "ref": 0,
        "will": 0
      },
      "2": {
        "fort": 3,
        "ref": 0,
        "will": 0
      },
      "3": {
        "fort": 3,
        "ref": 1,
        "will": 1
      },
      "4": {
        "fort": 4,
        "ref": 1,
        "will": 1
      },
      "5": {
        "fort": 4,
        "ref": 1,
        "will": 1
      },
      "6": {
        "fort": 5,
        "ref": 2,
        "will": 2
      },
      "7": {
        "fort": 5,
        "ref": 2,
        "will": 2
      },
      "8": {
        "fort": 6,
        "ref": 2,
        "will": 2
      },
      "9": {
        "fort": 6,
        "ref": 3,
        "will": 3
      },
      "10": {
        "fort": 7,
        "ref": 3,
        "will": 3
      },
      "11": {
        "fort": 7,
        "ref": 3,
        "will": 3
      },
      "12": {
        "fort": 8,
        "ref": 4,
        "will": 4
      },
      "13": {
        "fort": 8,
        "ref": 4,
        "will": 4
      },
      "14": {
        "fort": 9,
        "ref": 4,
        "will": 4
      },
      "15": {
        "fort": 9,
        "ref": 5,
        "will": 5
      },
      "16": {
        "fort": 10,
        "ref": 5,
        "will": 5
      },
      "17": {
        "fort": 10,
        "ref": 5,
        "will": 5
      },
      "18": {
        "fort": 11,
        "ref": 6,
        "will": 6
      },
      "19": {
        "fort": 11,
        "ref": 6,
        "will": 6
      },
      "20": {
        "fort": 12,
        "ref": 6,
        "will": 6
      }
    },
    "specials": {
      "1": "Bloodline, bloodline power, bloodrage, fast movement +10 ft.",
      "2": "Uncanny dodge",
      "3": "Blood sanctuary (+2 vs own spells)",
      "4": "Blood casting, bloodline power, bloodrager spells",
      "5": "Improved uncanny dodge",
      "6": "Bloodline feat",
      "7": "Damage reduction 1/-",
      "8": "Bloodline power",
      "9": "Bloodline feat",
      "10": "Damage reduction 2/-",
      "11": "Greater bloodrage",
      "12": "Bloodline feat, bloodline power",
      "13": "Damage reduction 3/-",
      "14": "Indomitable will (+4 will vs enchantment)",
      "15": "Bloodline feat",
      "16": "Bloodline power, damage reduction 4/-",
      "17": "Tireless bloodrage",
      "18": "Bloodline feat",
      "19": "Damage reduction 5/-",
      "20": "Mighty bloodrage, bloodline power"
    },
    "spells": {},
    "casting_stat": "cha",
    "skill_ranks": 4
  },
  "brawler": {
    "key": "brawler",
    "name": "Brawler",
    "category": "Hybrid Classes",
    "url": "https://www.d20pfsrd.com/classes/hybrid-classes/brawler/",
    "hit_die": 10,
    "bab_table": "bab_section_1",
    "skills": [
      "acrobatics",
      "climb",
      "craft",
      "escape artist",
      "handle animal",
      "intimidate",
      "knowledge (dungeoneering)",
      "knowledge (local)",
      "perception",
      "profession",
      "ride",
      "sense motive",
      "swim"
    ],
    "saves": {
      "1": {
        "fort": 2,
        "ref": 2,
        "will": 0
      },
      "2": {
        "fort": 3,
        "ref": 3,
        "will": 0
      },
      "3": {
        "fort": 3,
        "ref": 3,
        "will": 1
      },
      "4": {
        "fort": 4,
        "ref": 4,
        "will": 1
      },
      "5": {
        "fort": 4,
        "ref": 4,
        "will": 1
      },
      "6": {
        "fort": 5,
        "ref": 5,
        "will": 2
      },
      "7": {
        "fort": 5,
        "ref": 5,
        "will": 2
      },
      "8": {
        "fort": 6,
        "ref": 6,
        "will": 2
      },
      "9": {
        "fort": 6,
        "ref": 6,
        "will": 3
      },
      "10": {
        "fort": 7,
        "ref": 7,
        "will": 3
      },
      "11": {
        "fort": 7,
        "ref": 7,
        "will": 3
      },
      "12": {
        "fort": 8,
        "ref": 8,
        "will": 4
      },
      "13": {
        "fort": 8,
        "ref": 8,
        "will": 4
      },
      "14": {
        "fort": 9,
        "ref": 9,
        "will": 4
      },
      "15": {
        "fort": 9,
        "ref": 9,
        "will": 5
      },
      "16": {
        "fort": 10,
        "ref": 10,
        "will": 5
      },
      "17": {
        "fort": 10,
        "ref": 10,
        "will": 5
      },
      "18": {
        "fort": 11,
        "ref": 11,
        "will": 6
      },
      "19": {
        "fort": 11,
        "ref": 11,
        "will": 6
      },
      "20": {
        "fort": 12,
        "ref": 12,
        "will": 6
      }
    },
    "specials": {
      "1": "Brawler's cunning, martial flexibility, martial training, unarmed strike (1d6)",
      "2": "Bonus combat feat, brawler's flurry",
      "3": "Maneuver training 1",
      "4": "AC bonus +1, knockout 1/day, unarmed strike (1d8)",
      "5": "Brawler's strike (magic), close weapon mastery",
      "6": "Martial flexibility (swift action)",
      "7": "Maneuver training 2",
      "8": "AC bonus +2, brawler's strike (cold iron/silver), knockout 2/day, unarmed strike (1d10)",
      "9": "Brawler's flurry (improved two-weapon)",
      "10": "Martial flexibility (free action)",
      "11": "Maneuver training 3",
      "12": "AC bonus +3, brawler's strike (aligned), knockout 3/day, unarmed strike (2d6)",
      "13": "Awesome blow",
      "14": "Martial flexibility (instant)",
      "15": "Maneuver training 4",
      "16": "AC bonus +4, brawler's strike (adamantine), knockout 4/day, unarmed strike (2d8)",
      "17": "Brawler's flurry (greater two-weapon)",
      "18": "Bonus combat feat",
      "19": "Maneuver training 5",
      "20": "AC bonus +5, improved awesome blow, knockout 5/day, unarmed strike (2d10)"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 4
  },
  "hunter": {
    "key": "hunter",
    "name": "Hunter",
    "category": "Official Classes",
    "url": "https://www.d20pfsrd.com/classes/official-classes/hunter/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "climb",
      "craft",
      "handle animal",
      "heal",
      "intimidate",
      "knowledge (dungeoneering)",
      "knowledge (geography)",
      "knowledge (nature)",
      "perception",
      "profession",
      "ride",
      "spellcraft",
      "stealth",
      "survival",
      "swim"
    ],
    "saves": {
      "1": {
        "fort": 2,
        "ref": 2,
        "will": 0
      },
      "2": {
        "fort": 3,
        "ref": 3,
        "will": 0
      },
      "3": {
        "fort": 3,
        "ref": 3,
        "will": 1
      },
      "4": {
        "fort": 4,
        "ref": 4,
        "will": 1
      },
      "5": {
        "fort": 4,
        "ref": 4,
        "will": 1
      },
      "6": {
        "fort": 5,
        "ref": 5,
        "will": 2
      },
      "7": {
        "fort": 5,
        "ref": 5,
        "will": 2
      },
      "8": {
        "fort": 6,
        "ref": 6,
        "will": 2
      },
      "9": {
        "fort": 6,
        "ref": 6,
        "will": 3
      },
      "10": {
        "fort": 7,
        "ref": 7,
        "will": 3
      },
      "11": {
        "fort": 7,
        "ref": 7,
        "will": 3
      },
      "12": {
        "fort": 8,
        "ref": 8,
        "will": 4
      },
      "13": {
        "fort": 8,
        "ref": 8,
        "will": 4
      },
      "14": {
        "fort": 9,
        "ref": 9,
        "will": 4
      },
      "15": {
        "fort": 9,
        "ref": 9,
        "will": 5
      },
      "16": {
        "fort": 10,
        "ref": 10,
        "will": 5
      },
      "17": {
        "fort": 10,
        "ref": 10,
        "will": 5
      },
      "18": {
        "fort": 11,
        "ref": 11,
        "will": 6
      },
      "19": {
        "fort": 11,
        "ref": 11,
        "will": 6
      },
      "20": {
        "fort": 12,
        "ref": 12,
        "will": 6
      }
    },
    "specials": {
      "1": "Animal companion, animal focus (1 aspect), nature training, wild empathy",
      "2": "Precise companion (teamwork feat), track +1",
      "3": "Hunter tactics, teamwork feat",
      "4": "Improved animal focus",
      "5": "Woodland stride",
      "6": "Teamwork feat",
      "7": "Bonus trick",
      "8": "Swift tracker",
      "9": "Teamwork feat",
      "10": "Raise animal companion",
      "11": "Bonus trick",
      "12": "Teamwork feat",
      "13": "Bonus trick",
      "14": "Greater animal focus",
      "15": "Teamwork feat",
      "16": "Bonus trick",
      "17": "One with the wild",
      "18": "Teamwork feat",
      "19": "Bonus trick",
      "20": "Master hunter"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 6
  },
  "investigator": {
    "key": "investigator",
    "name": "Investigator",
    "category": "Official Classes",
    "url": "https://www.d20pfsrd.com/classes/official-classes/investigator/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "acrobatics",
      "appraise",
      "bluff",
      "climb",
      "craft",
      "diplomacy",
      "disable device",
      "disguise",
      "escape artist",
      "heal",
      "intimidate",
      "knowledge (arcana)",
      "knowledge (dungeoneering)",
      "knowledge (engineering)",
      "knowledge (geography)",
      "knowledge (history)",
      "knowledge (local)",
      "knowledge (nature)",
      "knowledge (nobility)",
      "knowledge (planes)",
      "knowledge (religion)",
      "knowledge (all)",
      "linguistics",
      "perception",
      "perform",
      "profession",
      "sense motive",
      "sleight of hand",
      "spellcraft",
      "stealth",
      "use magic device"
    ],
    "saves": {
      "1": {
        "fort": 0,
        "ref": 2,
        "will": 2
      },
      "2": {
        "fort": 0,
        "ref": 3,
        "will": 3
      },
      "3": {
        "fort": 1,
        "ref": 3,
        "will": 3
      },
      "4": {
        "fort": 1,
        "ref": 4,
        "will": 4
      },
      "5": {
        "fort": 1,
        "ref": 4,
        "will": 4
      },
      "6": {
        "fort": 2,
        "ref": 5,
        "will": 5
      },
      "7": {
        "fort": 2,
        "ref": 5,
        "will": 5
      },
      "8": {
        "fort": 2,
        "ref": 6,
        "will": 6
      },
      "9": {
        "fort": 3,
        "ref": 6,
        "will": 6
      },
      "10": {
        "fort": 3,
        "ref": 7,
        "will": 7
      },
      "11": {
        "fort": 3,
        "ref": 7,
        "will": 7
      },
      "12": {
        "fort": 4,
        "ref": 8,
        "will": 8
      },
      "13": {
        "fort": 4,
        "ref": 8,
        "will": 8
      },
      "14": {
        "fort": 4,
        "ref": 9,
        "will": 9
      },
      "15": {
        "fort": 5,
        "ref": 9,
        "will": 9
      },
      "16": {
        "fort": 5,
        "ref": 10,
        "will": 10
      },
      "17": {
        "fort": 5,
        "ref": 10,
        "will": 10
      },
      "18": {
        "fort": 6,
        "ref": 11,
        "will": 11
      },
      "19": {
        "fort": 6,
        "ref": 11,
        "will": 11
      },
      "20": {
        "fort": 6,
        "ref": 12,
        "will": 12
      }
    },
    "specials": {
      "1": "Alchemy, inspiration (free on trained skills), trapfinding +1",
      "2": "Poison lore, poison resistance +2",
      "3": "Investigator talent, trap sense +1",
      "4": "Studied combat (+1/2 lvl atk/dmg), studied strike +1d6, swift alchemy",
      "5": "Investigator talent, poison resistance +4",
      "6": "Studied strike +2d6, trap sense +2",
      "7": "Investigator talent",
      "8": "Poison resistance +6, studied strike +3d6",
      "9": "Investigator talent, trap sense +3",
      "10": "Poison immunity, studied strike +4d6",
      "11": "Investigator talent",
      "12": "Studied strike +5d6, trap sense +4",
      "13": "Investigator talent",
      "14": "Studied strike +6d6",
      "15": "Investigator talent, trap sense +5",
      "16": "Studied strike +7d6",
      "17": "Investigator talent",
      "18": "Studied strike +8d6, trap sense +6",
      "19": "Investigator talent",
      "20": "True inspiration, studied strike +9d6"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 6
  },
  "shaman": {
    "key": "shaman",
    "name": "Shaman",
    "category": "Official Classes",
    "url": "https://www.d20pfsrd.com/classes/official-classes/shaman/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "craft",
      "diplomacy",
      "fly",
      "handle animal",
      "heal",
      "knowledge (nature)",
      "knowledge (planes)",
      "knowledge (religion)",
      "profession",
      "ride",
      "spellcraft",
      "survival"
    ],
    "saves": {
      "1": {
        "fort": 0,
        "ref": 0,
        "will": 2
      },
      "2": {
        "fort": 0,
        "ref": 0,
        "will": 3
      },
      "3": {
        "fort": 1,
        "ref": 1,
        "will": 3
      },
      "4": {
        "fort": 1,
        "ref": 1,
        "will": 4
      },
      "5": {
        "fort": 1,
        "ref": 1,
        "will": 4
      },
      "6": {
        "fort": 2,
        "ref": 2,
        "will": 5
      },
      "7": {
        "fort": 2,
        "ref": 2,
        "will": 5
      },
      "8": {
        "fort": 2,
        "ref": 2,
        "will": 6
      },
      "9": {
        "fort": 3,
        "ref": 3,
        "will": 6
      },
      "10": {
        "fort": 3,
        "ref": 3,
        "will": 7
      },
      "11": {
        "fort": 3,
        "ref": 3,
        "will": 7
      },
      "12": {
        "fort": 4,
        "ref": 4,
        "will": 8
      },
      "13": {
        "fort": 4,
        "ref": 4,
        "will": 8
      },
      "14": {
        "fort": 4,
        "ref": 4,
        "will": 9
      },
      "15": {
        "fort": 5,
        "ref": 5,
        "will": 9
      },
      "16": {
        "fort": 5,
        "ref": 5,
        "will": 10
      },
      "17": {
        "fort": 5,
        "ref": 5,
        "will": 10
      },
      "18": {
        "fort": 6,
        "ref": 6,
        "will": 11
      },
      "19": {
        "fort": 6,
        "ref": 6,
        "will": 11
      },
      "20": {
        "fort": 6,
        "ref": 6,
        "will": 12
      }
    },
    "specials": {
      "1": "Cantrips, spirit, spirit animal, spirit magic",
      "2": "Hex",
      "3": "Spirit ability",
      "4": "Wandering spirit",
      "5": "Hex",
      "6": "Wandering hex",
      "7": "Spirit ability",
      "8": "Hex",
      "9": "Spirit ability",
      "10": "Hex",
      "11": "Spirit ability",
      "12": "Hex",
      "13": "Spirit ability",
      "14": "Wandering hex",
      "15": "Hex",
      "16": "Spirit ability",
      "17": "Spirit ability",
      "18": "Hex",
      "19": "Spirit ability",
      "20": "Manifestation"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 4
  },
  "skald": {
    "key": "skald",
    "name": "Skald",
    "category": "Official Classes",
    "url": "https://www.d20pfsrd.com/classes/official-classes/skald/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "acrobatics",
      "appraise",
      "bluff",
      "climb",
      "craft",
      "diplomacy",
      "escape artist",
      "handle animal",
      "intimidate",
      "knowledge (arcana)",
      "knowledge (dungeoneering)",
      "knowledge (engineering)",
      "knowledge (geography)",
      "knowledge (history)",
      "knowledge (local)",
      "knowledge (nature)",
      "knowledge (nobility)",
      "knowledge (planes)",
      "knowledge (religion)",
      "knowledge (all)",
      "linguistics",
      "perception",
      "perform",
      "profession",
      "ride",
      "sense motive",
      "spellcraft",
      "use magic device"
    ],
    "saves": {
      "1": {
        "fort": 2,
        "ref": 0,
        "will": 2
      },
      "2": {
        "fort": 3,
        "ref": 0,
        "will": 3
      },
      "3": {
        "fort": 3,
        "ref": 1,
        "will": 3
      },
      "4": {
        "fort": 4,
        "ref": 1,
        "will": 4
      },
      "5": {
        "fort": 4,
        "ref": 1,
        "will": 4
      },
      "6": {
        "fort": 5,
        "ref": 2,
        "will": 5
      },
      "7": {
        "fort": 5,
        "ref": 2,
        "will": 5
      },
      "8": {
        "fort": 6,
        "ref": 2,
        "will": 6
      },
      "9": {
        "fort": 6,
        "ref": 3,
        "will": 6
      },
      "10": {
        "fort": 7,
        "ref": 3,
        "will": 7
      },
      "11": {
        "fort": 7,
        "ref": 3,
        "will": 7
      },
      "12": {
        "fort": 8,
        "ref": 4,
        "will": 8
      },
      "13": {
        "fort": 8,
        "ref": 4,
        "will": 8
      },
      "14": {
        "fort": 9,
        "ref": 4,
        "will": 9
      },
      "15": {
        "fort": 9,
        "ref": 5,
        "will": 9
      },
      "16": {
        "fort": 10,
        "ref": 5,
        "will": 10
      },
      "17": {
        "fort": 10,
        "ref": 5,
        "will": 10
      },
      "18": {
        "fort": 11,
        "ref": 6,
        "will": 11
      },
      "19": {
        "fort": 11,
        "ref": 6,
        "will": 11
      },
      "20": {
        "fort": 12,
        "ref": 6,
        "will": 12
      }
    },
    "specials": {
      "1": "Bardic knowledge, cantrips, inspired rage, raging song",
      "2": "Versatile performance, well-versed",
      "3": "Rage power, song of marching",
      "4": "Uncanny dodge",
      "5": "Lore master 1/day, spell conduit",
      "6": "Rage power, song of strength",
      "7": "Versatile performance",
      "8": "Improved uncanny dodge",
      "9": "Damage reduction 1/-, rage power",
      "10": "Dirge of doom",
      "11": "Lore master 2/day",
      "12": "Versatile performance, rage power",
      "13": "Damage reduction 2/-",
      "14": "Song of the fallen",
      "15": "Rage power",
      "16": "Damage reduction 3/-",
      "17": "Lore master 3/day, versatile performance",
      "18": "Rage power",
      "19": "Damage reduction 4/-",
      "20": "Master skald"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 4
  },
  "slayer": {
    "key": "slayer",
    "name": "Slayer",
    "category": "Official Classes",
    "url": "https://www.d20pfsrd.com/classes/official-classes/slayer/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "acrobatics",
      "bluff",
      "climb",
      "craft",
      "disguise",
      "heal",
      "intimidate",
      "knowledge (dungeoneering)",
      "knowledge (geography)",
      "knowledge (local)",
      "perception",
      "profession",
      "ride",
      "sense motive",
      "stealth",
      "survival",
      "swim"
    ],
    "saves": {
      "1": {
        "fort": 2,
        "ref": 2,
        "will": 0
      },
      "2": {
        "fort": 3,
        "ref": 3,
        "will": 0
      },
      "3": {
        "fort": 3,
        "ref": 3,
        "will": 1
      },
      "4": {
        "fort": 4,
        "ref": 4,
        "will": 1
      },
      "5": {
        "fort": 4,
        "ref": 4,
        "will": 1
      },
      "6": {
        "fort": 5,
        "ref": 5,
        "will": 2
      },
      "7": {
        "fort": 5,
        "ref": 5,
        "will": 2
      },
      "8": {
        "fort": 6,
        "ref": 6,
        "will": 2
      },
      "9": {
        "fort": 6,
        "ref": 6,
        "will": 3
      },
      "10": {
        "fort": 7,
        "ref": 7,
        "will": 3
      },
      "11": {
        "fort": 7,
        "ref": 7,
        "will": 3
      },
      "12": {
        "fort": 8,
        "ref": 8,
        "will": 4
      },
      "13": {
        "fort": 8,
        "ref": 8,
        "will": 4
      },
      "14": {
        "fort": 9,
        "ref": 9,
        "will": 4
      },
      "15": {
        "fort": 9,
        "ref": 9,
        "will": 5
      },
      "16": {
        "fort": 10,
        "ref": 10,
        "will": 5
      },
      "17": {
        "fort": 10,
        "ref": 10,
        "will": 5
      },
      "18": {
        "fort": 11,
        "ref": 11,
        "will": 6
      },
      "19": {
        "fort": 11,
        "ref": 11,
        "will": 6
      },
      "20": {
        "fort": 12,
        "ref": 12,
        "will": 6
      }
    },
    "specials": {
      "1": "1st studied target (+1), track +1",
      "2": "Slayer talent",
      "3": "Sneak attack +1d6",
      "4": "Slayer talent",
      "5": "2nd studied target (+2)",
      "6": "Slayer talent, sneak attack +2d6",
      "7": "Stalker",
      "8": "Slayer talent",
      "9": "Sneak attack +3d6",
      "10": "Advanced talents, 3rd studied target (+3), slayer talent",
      "11": "Swift tracker",
      "12": "Slayer talent, sneak attack +4d6",
      "13": "Slayer talent",
      "14": "Quarry, slayer talent",
      "15": "4th studied target (+4), sneak attack +5d6",
      "16": "Slayer talent",
      "17": "Slayer talent",
      "18": "Slayer talent, sneak attack +6d6",
      "19": "Improved quarry",
      "20": "5th studied target (+5), master slayer"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 6
  },
  "swashbuckler": {
    "key": "swashbuckler",
    "name": "Swashbuckler",
    "category": "Hybrid Classes",
    "url": "https://www.d20pfsrd.com/classes/hybrid-classes/swashbuckler/",
    "hit_die": 10,
    "bab_table": "bab_section_1",
    "skills": [
      "acrobatics",
      "bluff",
      "climb",
      "craft",
      "diplomacy",
      "escape artist",
      "intimidate",
      "knowledge (local)",
      "knowledge (nobility)",
      "perception",
      "profession",
      "ride",
      "sense motive",
      "sleight of hand",
      "swim"
    ],
    "saves": {
      "1": {
        "fort": 0,
        "ref": 2,
        "will": 0
      },
      "2": {
        "fort": 0,
        "ref": 3,
        "will": 0
      },
      "3": {
        "fort": 1,
        "ref": 3,
        "will": 1
      },
      "4": {
        "fort": 1,
        "ref": 4,
        "will": 1
      },
      "5": {
        "fort": 1,
        "ref": 4,
        "will": 1
      },
      "6": {
        "fort": 2,
        "ref": 5,
        "will": 2
      },
      "7": {
        "fort": 2,
        "ref": 5,
        "will": 2
      },
      "8": {
        "fort": 2,
        "ref": 6,
        "will": 2
      },
      "9": {
        "fort": 3,
        "ref": 6,
        "will": 3
      },
      "10": {
        "fort": 3,
        "ref": 7,
        "will": 3
      },
      "11": {
        "fort": 3,
        "ref": 7,
        "will": 3
      },
      "12": {
        "fort": 4,
        "ref": 8,
        "will": 4
      },
      "13": {
        "fort": 4,
        "ref": 8,
        "will": 4
      },
      "14": {
        "fort": 4,
        "ref": 9,
        "will": 4
      },
      "15": {
        "fort": 5,
        "ref": 9,
        "will": 5
      },
      "16": {
        "fort": 5,
        "ref": 10,
        "will": 5
      },
      "17": {
        "fort": 5,
        "ref": 10,
        "will": 5
      },
      "18": {
        "fort": 6,
        "ref": 11,
        "will": 6
      },
      "19": {
        "fort": 6,
        "ref": 11,
        "will": 6
      },
      "20": {
        "fort": 6,
        "ref": 12,
        "will": 6
      }
    },
    "specials": {
      "1": "Panache, deeds (derring-do, dodging panache, opportune parry & riposte), swashbuckler finesse",
      "2": "Charmed life 3/day",
      "3": "Nimble +1, deeds (kip-up, menacing swordplay, precise strike)",
      "4": "Bonus combat feat",
      "5": "Swashbuckler weapon training 1",
      "6": "Charmed life 4/day",
      "7": "Nimble +2, deeds (swashbuckler's grace, superior feint, targeted strike)",
      "8": "Bonus combat feat",
      "9": "Swashbuckler weapon training 2",
      "10": "Charmed life 5/day",
      "11": "Nimble +3, deeds (bleeding wound, evasive, subtle cut)",
      "12": "Bonus combat feat",
      "13": "Swashbuckler weapon training 3",
      "14": "Charmed life 6/day",
      "15": "Nimble +4, deeds (dizzying defense, perfect thrust, swashbuckler's edge)",
      "16": "Bonus combat feat",
      "17": "Swashbuckler weapon training 4",
      "18": "Charmed life 7/day",
      "19": "Nimble +5, deeds (cheat death, deadly stab, stunning stab)",
      "20": "Swashbuckler weapon mastery"
    },
    "spells": {},
    "casting_stat": "cha",
    "skill_ranks": 4
  },
  "warpriest": {
    "key": "warpriest",
    "name": "Warpriest",
    "category": "Hybrid Classes",
    "url": "https://www.d20pfsrd.com/classes/hybrid-classes/warpriest/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "climb",
      "craft",
      "diplomacy",
      "handle animal",
      "heal",
      "intimidate",
      "knowledge (engineering)",
      "knowledge (religion)",
      "profession",
      "ride",
      "sense motive",
      "spellcraft",
      "survival",
      "swim"
    ],
    "saves": {
      "1": {
        "fort": 2,
        "ref": 0,
        "will": 2
      },
      "2": {
        "fort": 3,
        "ref": 0,
        "will": 3
      },
      "3": {
        "fort": 3,
        "ref": 1,
        "will": 3
      },
      "4": {
        "fort": 4,
        "ref": 1,
        "will": 4
      },
      "5": {
        "fort": 4,
        "ref": 1,
        "will": 4
      },
      "6": {
        "fort": 5,
        "ref": 2,
        "will": 5
      },
      "7": {
        "fort": 5,
        "ref": 2,
        "will": 5
      },
      "8": {
        "fort": 6,
        "ref": 2,
        "will": 6
      },
      "9": {
        "fort": 6,
        "ref": 3,
        "will": 6
      },
      "10": {
        "fort": 7,
        "ref": 3,
        "will": 7
      },
      "11": {
        "fort": 7,
        "ref": 3,
        "will": 7
      },
      "12": {
        "fort": 8,
        "ref": 4,
        "will": 8
      },
      "13": {
        "fort": 8,
        "ref": 4,
        "will": 8
      },
      "14": {
        "fort": 9,
        "ref": 4,
        "will": 9
      },
      "15": {
        "fort": 9,
        "ref": 5,
        "will": 9
      },
      "16": {
        "fort": 10,
        "ref": 5,
        "will": 10
      },
      "17": {
        "fort": 10,
        "ref": 5,
        "will": 10
      },
      "18": {
        "fort": 11,
        "ref": 6,
        "will": 11
      },
      "19": {
        "fort": 11,
        "ref": 6,
        "will": 11
      },
      "20": {
        "fort": 12,
        "ref": 6,
        "will": 12
      }
    },
    "specials": {
      "1": "Aura, blessings (minor), focus weapon (Weapon Focus), sacred weapon (1d6), spontaneous casting",
      "2": "Fervor 1d6",
      "3": "Bonus combat feat",
      "4": "Channel energy, sacred weapon (+1)",
      "5": "Fervor 2d6",
      "6": "Bonus combat feat",
      "7": "Sacred armor (+1)",
      "8": "Fervor 3d6, sacred weapon (+2)",
      "9": "Bonus combat feat",
      "10": "Major blessings, sacred armor (+2)",
      "11": "Fervor 4d6",
      "12": "Bonus combat feat, sacred weapon (+3)",
      "13": "Sacred armor (+3)",
      "14": "Fervor 5d6",
      "15": "Bonus combat feat",
      "16": "Sacred armor (+4), sacred weapon (+4)",
      "17": "Fervor 6d6",
      "18": "Bonus combat feat",
      "19": "Sacred armor (+5)",
      "20": "Aspect of war, sacred weapon (+5)"
    },
    "spells": {},
    "casting_stat": "wis",
    "skill_ranks": 2
  },
  "kineticist": {
    "key": "kineticist",
    "name": "Kineticist",
    "category": "Official Classes",
    "url": "https://www.d20pfsrd.com/classes/official-classes/kineticist/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "acrobatics",
      "climb",
      "craft",
      "heal",
      "intimidate",
      "perception",
      "profession",
      "stealth",
      "use magic device"
    ],
    "saves": {
      "1": {
        "fort": 2,
        "ref": 2,
        "will": 0
      },
      "2": {
        "fort": 3,
        "ref": 3,
        "will": 0
      },
      "3": {
        "fort": 3,
        "ref": 3,
        "will": 1
      },
      "4": {
        "fort": 4,
        "ref": 4,
        "will": 1
      },
      "5": {
        "fort": 4,
        "ref": 4,
        "will": 1
      },
      "6": {
        "fort": 5,
        "ref": 5,
        "will": 2
      },
      "7": {
        "fort": 5,
        "ref": 5,
        "will": 2
      },
      "8": {
        "fort": 6,
        "ref": 6,
        "will": 2
      },
      "9": {
        "fort": 6,
        "ref": 6,
        "will": 3
      },
      "10": {
        "fort": 7,
        "ref": 7,
        "will": 3
      },
      "11": {
        "fort": 7,
        "ref": 7,
        "will": 3
      },
      "12": {
        "fort": 8,
        "ref": 8,
        "will": 4
      },
      "13": {
        "fort": 8,
        "ref": 8,
        "will": 4
      },
      "14": {
        "fort": 9,
        "ref": 9,
        "will": 4
      },
      "15": {
        "fort": 9,
        "ref": 9,
        "will": 5
      },
      "16": {
        "fort": 10,
        "ref": 10,
        "will": 5
      },
      "17": {
        "fort": 10,
        "ref": 10,
        "will": 5
      },
      "18": {
        "fort": 11,
        "ref": 11,
        "will": 6
      },
      "19": {
        "fort": 11,
        "ref": 11,
        "will": 6
      },
      "20": {
        "fort": 12,
        "ref": 12,
        "will": 6
      }
    },
    "specials": {
      "1": "Burn, elemental focus, gather power, kinetic blast, 1st infusion",
      "2": "Elemental defense",
      "3": "Elemental overflow +1, 2nd infusion",
      "4": "Infusion specialization 1, utility wild talent",
      "5": "3rd infusion, metakinesis (empower)",
      "6": "Elemental overflow +2, internal buffer 1",
      "7": "Expanded element",
      "8": "Infusion specialization 2, utility wild talent",
      "9": "4th infusion, metakinesis (maximize)",
      "10": "Elemental overflow +3",
      "11": "5th infusion, supercharge",
      "12": "Infusion specialization 3, internal buffer 2",
      "13": "6th infusion, metakinesis (quicken)",
      "14": "Elemental overflow +4",
      "15": "Expanded element",
      "16": "Infusion specialization 4, internal buffer 3",
      "17": "7th infusion, metakinesis (twice)",
      "18": "Elemental overflow +5",
      "19": "Metakinesis master",
      "20": "Omnikinesis"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 4
  },
  "medium": {
    "key": "medium",
    "name": "Medium",
    "category": "Official Classes",
    "url": "https://www.d20pfsrd.com/classes/official-classes/medium/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "bluff",
      "craft",
      "diplomacy",
      "fly",
      "heal",
      "intimidate",
      "knowledge (arcana)",
      "knowledge (dungeoneering)",
      "knowledge (engineering)",
      "knowledge (geography)",
      "knowledge (history)",
      "knowledge (local)",
      "knowledge (nature)",
      "knowledge (nobility)",
      "knowledge (planes)",
      "knowledge (religion)",
      "knowledge (all)",
      "linguistics",
      "perception",
      "perform",
      "profession",
      "sense motive",
      "spellcraft",
      "use magic device"
    ],
    "saves": {
      "1": {
        "fort": 0,
        "ref": 0,
        "will": 2
      },
      "2": {
        "fort": 0,
        "ref": 0,
        "will": 3
      },
      "3": {
        "fort": 1,
        "ref": 1,
        "will": 3
      },
      "4": {
        "fort": 1,
        "ref": 1,
        "will": 4
      },
      "5": {
        "fort": 1,
        "ref": 1,
        "will": 4
      },
      "6": {
        "fort": 2,
        "ref": 2,
        "will": 5
      },
      "7": {
        "fort": 2,
        "ref": 2,
        "will": 5
      },
      "8": {
        "fort": 2,
        "ref": 2,
        "will": 6
      },
      "9": {
        "fort": 3,
        "ref": 3,
        "will": 6
      },
      "10": {
        "fort": 3,
        "ref": 3,
        "will": 7
      },
      "11": {
        "fort": 3,
        "ref": 3,
        "will": 7
      },
      "12": {
        "fort": 4,
        "ref": 4,
        "will": 8
      },
      "13": {
        "fort": 4,
        "ref": 4,
        "will": 8
      },
      "14": {
        "fort": 4,
        "ref": 4,
        "will": 9
      },
      "15": {
        "fort": 5,
        "ref": 5,
        "will": 9
      },
      "16": {
        "fort": 5,
        "ref": 5,
        "will": 10
      },
      "17": {
        "fort": 5,
        "ref": 5,
        "will": 10
      },
      "18": {
        "fort": 6,
        "ref": 6,
        "will": 11
      },
      "19": {
        "fort": 6,
        "ref": 6,
        "will": 11
      },
      "20": {
        "fort": 6,
        "ref": 6,
        "will": 12
      }
    },
    "specials": {
      "1": "Knacks, shared seance, spirit, spirit bonus +1, spirit surge 1d6",
      "2": "Taboo",
      "3": "Haunt channeler",
      "4": "Location channel",
      "5": "Connection channel",
      "6": "Spirit bonus +2",
      "7": "Spirit surge 1d8",
      "8": "Propitiation",
      "9": "Ask the spirits",
      "10": "Spirit bonus +3",
      "11": "Spirit surge 1d10",
      "12": "Astral journey",
      "13": "Spirit bonus +4",
      "14": "Trance",
      "15": "Spirit surge 1d12",
      "16": "Forbiddance",
      "17": "Spirit bonus +5",
      "18": "Spirit surge 1d20",
      "19": "Greater connection channel",
      "20": "Legendary medium"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 4
  },
  "mesmerist": {
    "key": "mesmerist",
    "name": "Mesmerist",
    "category": "Official Classes",
    "url": "https://www.d20pfsrd.com/classes/official-classes/mesmerist/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "appraise",
      "bluff",
      "craft",
      "diplomacy",
      "disguise",
      "escape artist",
      "intimidate",
      "knowledge (arcana)",
      "knowledge (dungeoneering)",
      "knowledge (history)",
      "knowledge (local)",
      "knowledge (nobility)",
      "knowledge (religion)",
      "linguistics",
      "perception",
      "perform",
      "profession",
      "sense motive",
      "sleight of hand",
      "spellcraft",
      "stealth",
      "use magic device"
    ],
    "saves": {
      "1": {
        "fort": 0,
        "ref": 2,
        "will": 2
      },
      "2": {
        "fort": 0,
        "ref": 3,
        "will": 3
      },
      "3": {
        "fort": 1,
        "ref": 3,
        "will": 3
      },
      "4": {
        "fort": 1,
        "ref": 4,
        "will": 4
      },
      "5": {
        "fort": 1,
        "ref": 4,
        "will": 4
      },
      "6": {
        "fort": 2,
        "ref": 5,
        "will": 5
      },
      "7": {
        "fort": 2,
        "ref": 5,
        "will": 5
      },
      "8": {
        "fort": 2,
        "ref": 6,
        "will": 6
      },
      "9": {
        "fort": 3,
        "ref": 6,
        "will": 6
      },
      "10": {
        "fort": 3,
        "ref": 7,
        "will": 7
      },
      "11": {
        "fort": 3,
        "ref": 7,
        "will": 7
      },
      "12": {
        "fort": 4,
        "ref": 8,
        "will": 8
      },
      "13": {
        "fort": 4,
        "ref": 8,
        "will": 8
      },
      "14": {
        "fort": 4,
        "ref": 9,
        "will": 9
      },
      "15": {
        "fort": 5,
        "ref": 9,
        "will": 9
      },
      "16": {
        "fort": 5,
        "ref": 10,
        "will": 10
      },
      "17": {
        "fort": 5,
        "ref": 10,
        "will": 10
      },
      "18": {
        "fort": 6,
        "ref": 11,
        "will": 11
      },
      "19": {
        "fort": 6,
        "ref": 11,
        "will": 11
      },
      "20": {
        "fort": 6,
        "ref": 12,
        "will": 12
      }
    },
    "specials": {
      "1": "Consummate liar, hypnotic stare (-2 will), mesmerist trick, painful stare (+1d6)",
      "2": "Touch treatment (minor)",
      "3": "Bold stare 1",
      "4": "Manifold stare (2 tricks)",
      "5": "Mental knack",
      "6": "Touch treatment (moderate)",
      "7": "Bold stare 2",
      "8": "Hypnotic stare (-3 will), painful stare (+2d6)",
      "9": "Manifold stare (3 tricks)",
      "10": "Touch treatment (greater)",
      "11": "Bold stare 3",
      "12": "Painful stare (+3d6)",
      "13": "Mental knack",
      "14": "Touch treatment (break enchantment)",
      "15": "Bold stare 4",
      "16": "Hypnotic stare (-4 will), painful stare (+4d6)",
      "17": "Manifold stare (4 tricks)",
      "18": "Mental knack",
      "19": "Painful stare (+5d6)",
      "20": "Rule minds"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 6
  },
  "occultist": {
    "key": "occultist",
    "name": "Occultist",
    "category": "Official Classes",
    "url": "https://www.d20pfsrd.com/classes/official-classes/occultist/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "appraise",
      "craft",
      "diplomacy",
      "disable device",
      "disguise",
      "fly",
      "knowledge (arcana)",
      "knowledge (dungeoneering)",
      "knowledge (engineering)",
      "knowledge (geography)",
      "knowledge (history)",
      "knowledge (local)",
      "knowledge (nature)",
      "knowledge (nobility)",
      "knowledge (planes)",
      "knowledge (religion)",
      "knowledge (all)",
      "linguistics",
      "perception",
      "profession",
      "sense motive",
      "sleight of hand",
      "spellcraft",
      "use magic device"
    ],
    "saves": {
      "1": {
        "fort": 2,
        "ref": 0,
        "will": 2
      },
      "2": {
        "fort": 3,
        "ref": 0,
        "will": 3
      },
      "3": {
        "fort": 3,
        "ref": 1,
        "will": 3
      },
      "4": {
        "fort": 4,
        "ref": 1,
        "will": 4
      },
      "5": {
        "fort": 4,
        "ref": 1,
        "will": 4
      },
      "6": {
        "fort": 5,
        "ref": 2,
        "will": 5
      },
      "7": {
        "fort": 5,
        "ref": 2,
        "will": 5
      },
      "8": {
        "fort": 6,
        "ref": 2,
        "will": 6
      },
      "9": {
        "fort": 6,
        "ref": 3,
        "will": 6
      },
      "10": {
        "fort": 7,
        "ref": 3,
        "will": 7
      },
      "11": {
        "fort": 7,
        "ref": 3,
        "will": 7
      },
      "12": {
        "fort": 8,
        "ref": 4,
        "will": 8
      },
      "13": {
        "fort": 8,
        "ref": 4,
        "will": 8
      },
      "14": {
        "fort": 9,
        "ref": 4,
        "will": 9
      },
      "15": {
        "fort": 9,
        "ref": 5,
        "will": 9
      },
      "16": {
        "fort": 10,
        "ref": 5,
        "will": 10
      },
      "17": {
        "fort": 10,
        "ref": 5,
        "will": 10
      },
      "18": {
        "fort": 11,
        "ref": 6,
        "will": 11
      },
      "19": {
        "fort": 11,
        "ref": 6,
        "will": 11
      },
      "20": {
        "fort": 12,
        "ref": 6,
        "will": 12
      }
    },
    "specials": {
      "1": "Focus powers, implements (2), knacks, magic item skill, mental focus",
      "2": "Implement (3rd), object reading",
      "3": "Focus power",
      "4": "Shift focus",
      "5": "Focus power",
      "6": "Implement (4th)",
      "7": "Focus power",
      "8": "Aura sight",
      "9": "Focus power",
      "10": "Outside contact",
      "11": "Focus power",
      "12": "Implement (5th)",
      "13": "Focus power",
      "14": "Binding circles",
      "15": "Focus power",
      "16": "Implement (6th)",
      "17": "Focus power",
      "18": "Fast circles",
      "19": "Focus power",
      "20": "Implement master"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 4
  },
  "psychic": {
    "key": "psychic",
    "name": "Psychic",
    "category": "Official Classes",
    "url": "https://www.d20pfsrd.com/classes/official-classes/psychic/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "bluff",
      "craft",
      "diplomacy",
      "fly",
      "intimidate",
      "knowledge (arcana)",
      "knowledge (dungeoneering)",
      "knowledge (engineering)",
      "knowledge (geography)",
      "knowledge (history)",
      "knowledge (local)",
      "knowledge (nature)",
      "knowledge (nobility)",
      "knowledge (planes)",
      "knowledge (religion)",
      "knowledge (all)",
      "linguistics",
      "perception",
      "profession",
      "sense motive",
      "spellcraft"
    ],
    "saves": {
      "1": {
        "fort": 0,
        "ref": 0,
        "will": 2
      },
      "2": {
        "fort": 0,
        "ref": 0,
        "will": 3
      },
      "3": {
        "fort": 1,
        "ref": 1,
        "will": 3
      },
      "4": {
        "fort": 1,
        "ref": 1,
        "will": 4
      },
      "5": {
        "fort": 1,
        "ref": 1,
        "will": 4
      },
      "6": {
        "fort": 2,
        "ref": 2,
        "will": 5
      },
      "7": {
        "fort": 2,
        "ref": 2,
        "will": 5
      },
      "8": {
        "fort": 2,
        "ref": 2,
        "will": 6
      },
      "9": {
        "fort": 3,
        "ref": 3,
        "will": 6
      },
      "10": {
        "fort": 3,
        "ref": 3,
        "will": 7
      },
      "11": {
        "fort": 3,
        "ref": 3,
        "will": 7
      },
      "12": {
        "fort": 4,
        "ref": 4,
        "will": 8
      },
      "13": {
        "fort": 4,
        "ref": 4,
        "will": 8
      },
      "14": {
        "fort": 4,
        "ref": 4,
        "will": 9
      },
      "15": {
        "fort": 5,
        "ref": 5,
        "will": 9
      },
      "16": {
        "fort": 5,
        "ref": 5,
        "will": 10
      },
      "17": {
        "fort": 5,
        "ref": 5,
        "will": 10
      },
      "18": {
        "fort": 6,
        "ref": 6,
        "will": 11
      },
      "19": {
        "fort": 6,
        "ref": 6,
        "will": 11
      },
      "20": {
        "fort": 6,
        "ref": 6,
        "will": 12
      }
    },
    "specials": {
      "1": "Discipline spells, knacks, phrenic amplifications, phrenic pool, psychic discipline",
      "2": "Detect thoughts",
      "3": "Phrenic amplification",
      "4": "Discipline power",
      "5": "Telepathic bond",
      "6": "Major amplification",
      "7": "Phrenic amplification",
      "8": "Discipline power",
      "9": "Telepathic omnisciency",
      "10": "Major amplification",
      "11": "Phrenic amplification",
      "12": "Discipline power",
      "13": "Major amplification",
      "14": "Superior amplification",
      "15": "Phrenic amplification",
      "16": "Discipline power",
      "17": "Superior amplification",
      "18": "Major amplification",
      "19": "Phrenic amplification",
      "20": "Remade presence"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 2
  },
  "spiritualist": {
    "key": "spiritualist",
    "name": "Spiritualist",
    "category": "Official Classes",
    "url": "https://www.d20pfsrd.com/classes/official-classes/spiritualist/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "bluff",
      "craft",
      "fly",
      "heal",
      "intimidate",
      "knowledge (arcana)",
      "knowledge (dungeoneering)",
      "knowledge (engineering)",
      "knowledge (geography)",
      "knowledge (history)",
      "knowledge (local)",
      "knowledge (nature)",
      "knowledge (nobility)",
      "knowledge (planes)",
      "knowledge (religion)",
      "knowledge (all)",
      "linguistics",
      "perception",
      "profession",
      "sense motive",
      "spellcraft",
      "use magic device"
    ],
    "saves": {
      "1": {
        "fort": 2,
        "ref": 0,
        "will": 2
      },
      "2": {
        "fort": 3,
        "ref": 0,
        "will": 3
      },
      "3": {
        "fort": 3,
        "ref": 1,
        "will": 3
      },
      "4": {
        "fort": 4,
        "ref": 1,
        "will": 4
      },
      "5": {
        "fort": 4,
        "ref": 1,
        "will": 4
      },
      "6": {
        "fort": 5,
        "ref": 2,
        "will": 5
      },
      "7": {
        "fort": 5,
        "ref": 2,
        "will": 5
      },
      "8": {
        "fort": 6,
        "ref": 2,
        "will": 6
      },
      "9": {
        "fort": 6,
        "ref": 3,
        "will": 6
      },
      "10": {
        "fort": 7,
        "ref": 3,
        "will": 7
      },
      "11": {
        "fort": 7,
        "ref": 3,
        "will": 7
      },
      "12": {
        "fort": 8,
        "ref": 4,
        "will": 8
      },
      "13": {
        "fort": 8,
        "ref": 4,
        "will": 8
      },
      "14": {
        "fort": 9,
        "ref": 4,
        "will": 9
      },
      "15": {
        "fort": 9,
        "ref": 5,
        "will": 9
      },
      "16": {
        "fort": 10,
        "ref": 5,
        "will": 10
      },
      "17": {
        "fort": 10,
        "ref": 5,
        "will": 10
      },
      "18": {
        "fort": 11,
        "ref": 6,
        "will": 11
      },
      "19": {
        "fort": 11,
        "ref": 6,
        "will": 11
      },
      "20": {
        "fort": 12,
        "ref": 6,
        "will": 12
      }
    },
    "specials": {
      "1": "Etheric tether, knacks, phantom, shared consciousness",
      "2": "Bonded senses",
      "3": "Spiritual interference (+2 saves)",
      "4": "Detect undead",
      "5": "Phantom recall 1/day",
      "6": "Phantom recall 2/day",
      "7": "Calm spirit",
      "8": "Phantom recall 3/day",
      "9": "Call spirit",
      "10": "Dual bond",
      "11": "Phantom recall 4/day",
      "12": "Spiritual bond",
      "13": "Phantom recall 5/day",
      "14": "Spiritual interference (+4 saves)",
      "15": "Phantom recall 6/day",
      "16": "Dual bond (swift)",
      "17": "Phantom recall 7/day",
      "18": "Dual bond (greater)",
      "19": "Phantom recall (at will)",
      "20": "Spiritual manifestation"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 4
  },
  "antipaladin": {
    "key": "antipaladin",
    "name": "Antipaladin",
    "category": "Official Classes",
    "url": "https://www.d20pfsrd.com/classes/official-classes/antipaladin/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "bluff",
      "craft",
      "disguise",
      "handle animal",
      "intimidate",
      "knowledge (religion)",
      "profession",
      "ride",
      "sense motive",
      "spellcraft",
      "stealth"
    ],
    "saves": {
      "1": {
        "fort": 2,
        "ref": 0,
        "will": 2
      },
      "2": {
        "fort": 3,
        "ref": 0,
        "will": 3
      },
      "3": {
        "fort": 3,
        "ref": 1,
        "will": 3
      },
      "4": {
        "fort": 4,
        "ref": 1,
        "will": 4
      },
      "5": {
        "fort": 4,
        "ref": 1,
        "will": 4
      },
      "6": {
        "fort": 5,
        "ref": 2,
        "will": 5
      },
      "7": {
        "fort": 5,
        "ref": 2,
        "will": 5
      },
      "8": {
        "fort": 6,
        "ref": 2,
        "will": 6
      },
      "9": {
        "fort": 6,
        "ref": 3,
        "will": 6
      },
      "10": {
        "fort": 7,
        "ref": 3,
        "will": 7
      },
      "11": {
        "fort": 7,
        "ref": 3,
        "will": 7
      },
      "12": {
        "fort": 8,
        "ref": 4,
        "will": 8
      },
      "13": {
        "fort": 8,
        "ref": 4,
        "will": 8
      },
      "14": {
        "fort": 9,
        "ref": 4,
        "will": 9
      },
      "15": {
        "fort": 9,
        "ref": 5,
        "will": 9
      },
      "16": {
        "fort": 10,
        "ref": 5,
        "will": 10
      },
      "17": {
        "fort": 10,
        "ref": 5,
        "will": 10
      },
      "18": {
        "fort": 11,
        "ref": 6,
        "will": 11
      },
      "19": {
        "fort": 11,
        "ref": 6,
        "will": 11
      },
      "20": {
        "fort": 12,
        "ref": 6,
        "will": 12
      }
    },
    "specials": {
      "1": "Aura of evil, detect good, smite good 1/day",
      "2": "Touch of corruption (1d6), unholy resilience (+CHA saves)",
      "3": "Aura of cowardice (-4 fear saves to enemies), cruelty, plague bringer",
      "4": "Channel negative energy, smite good 2/day, spells",
      "5": "Fiendish boon (servant or weapon)",
      "6": "Cruelty",
      "7": "Smite good 3/day",
      "8": "Aura of despair (-2 all saves to enemies)",
      "9": "Cruelty",
      "10": "Smite good 4/day",
      "11": "Aura of vengeance",
      "12": "Cruelty",
      "13": "Smite good 5/day",
      "14": "Aura of sin (DR 5/good, evil bypasses DR)",
      "15": "Cruelty",
      "16": "Smite good 6/day",
      "17": "Aura of depravity (compulsion immunity)",
      "18": "Cruelty",
      "19": "Smite good 7/day",
      "20": "Unholy champion"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 2
  },
  "ninja": {
    "key": "ninja",
    "name": "Ninja",
    "category": "Official Classes",
    "url": "https://www.d20pfsrd.com/classes/official-classes/ninja/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "acrobatics",
      "appraise",
      "bluff",
      "climb",
      "craft",
      "diplomacy",
      "disable device",
      "disguise",
      "escape artist",
      "intimidate",
      "knowledge (local)",
      "knowledge (nobility)",
      "linguistics",
      "perception",
      "perform",
      "profession",
      "sense motive",
      "sleight of hand",
      "stealth",
      "swim",
      "use magic device"
    ],
    "saves": {
      "1": {
        "fort": 0,
        "ref": 2,
        "will": 0
      },
      "2": {
        "fort": 0,
        "ref": 3,
        "will": 0
      },
      "3": {
        "fort": 1,
        "ref": 3,
        "will": 1
      },
      "4": {
        "fort": 1,
        "ref": 4,
        "will": 1
      },
      "5": {
        "fort": 1,
        "ref": 4,
        "will": 1
      },
      "6": {
        "fort": 2,
        "ref": 5,
        "will": 2
      },
      "7": {
        "fort": 2,
        "ref": 5,
        "will": 2
      },
      "8": {
        "fort": 2,
        "ref": 6,
        "will": 2
      },
      "9": {
        "fort": 3,
        "ref": 6,
        "will": 3
      },
      "10": {
        "fort": 3,
        "ref": 7,
        "will": 3
      },
      "11": {
        "fort": 3,
        "ref": 7,
        "will": 3
      },
      "12": {
        "fort": 4,
        "ref": 8,
        "will": 4
      },
      "13": {
        "fort": 4,
        "ref": 8,
        "will": 4
      },
      "14": {
        "fort": 4,
        "ref": 9,
        "will": 4
      },
      "15": {
        "fort": 5,
        "ref": 9,
        "will": 5
      },
      "16": {
        "fort": 5,
        "ref": 10,
        "will": 5
      },
      "17": {
        "fort": 5,
        "ref": 10,
        "will": 5
      },
      "18": {
        "fort": 6,
        "ref": 11,
        "will": 6
      },
      "19": {
        "fort": 6,
        "ref": 11,
        "will": 6
      },
      "20": {
        "fort": 6,
        "ref": 12,
        "will": 6
      }
    },
    "specials": {
      "1": "Poison use, sneak attack +1d6",
      "2": "Ki pool, ninja trick",
      "3": "No trace +1, sneak attack +2d6",
      "4": "Ninja trick, uncanny dodge",
      "5": "Sneak attack +3d6",
      "6": "Light steps, ninja trick, no trace +2",
      "7": "Sneak attack +4d6",
      "8": "Improved uncanny dodge, ninja trick",
      "9": "No trace +3, sneak attack +5d6",
      "10": "Master tricks, ninja trick",
      "11": "Sneak attack +6d6",
      "12": "Ninja trick, no trace +4",
      "13": "Sneak attack +7d6",
      "14": "Ninja trick",
      "15": "No trace +5, sneak attack +8d6",
      "16": "Ninja trick",
      "17": "Sneak attack +9d6",
      "18": "Ninja trick, no trace +6",
      "19": "Sneak attack +10d6",
      "20": "Hidden master, ninja trick"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 8
  },
  "samurai": {
    "key": "samurai",
    "name": "Samurai",
    "category": "Official Classes",
    "url": "https://www.d20pfsrd.com/classes/official-classes/samurai/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "bluff",
      "climb",
      "craft",
      "diplomacy",
      "handle animal",
      "intimidate",
      "profession",
      "ride",
      "sense motive",
      "swim"
    ],
    "saves": {
      "1": {
        "fort": 2,
        "ref": 0,
        "will": 0
      },
      "2": {
        "fort": 3,
        "ref": 0,
        "will": 0
      },
      "3": {
        "fort": 3,
        "ref": 1,
        "will": 1
      },
      "4": {
        "fort": 4,
        "ref": 1,
        "will": 1
      },
      "5": {
        "fort": 4,
        "ref": 1,
        "will": 1
      },
      "6": {
        "fort": 5,
        "ref": 2,
        "will": 2
      },
      "7": {
        "fort": 5,
        "ref": 2,
        "will": 2
      },
      "8": {
        "fort": 6,
        "ref": 2,
        "will": 2
      },
      "9": {
        "fort": 6,
        "ref": 3,
        "will": 3
      },
      "10": {
        "fort": 7,
        "ref": 3,
        "will": 3
      },
      "11": {
        "fort": 7,
        "ref": 3,
        "will": 3
      },
      "12": {
        "fort": 8,
        "ref": 4,
        "will": 4
      },
      "13": {
        "fort": 8,
        "ref": 4,
        "will": 4
      },
      "14": {
        "fort": 9,
        "ref": 4,
        "will": 4
      },
      "15": {
        "fort": 9,
        "ref": 5,
        "will": 5
      },
      "16": {
        "fort": 10,
        "ref": 5,
        "will": 5
      },
      "17": {
        "fort": 10,
        "ref": 5,
        "will": 5
      },
      "18": {
        "fort": 11,
        "ref": 6,
        "will": 6
      },
      "19": {
        "fort": 11,
        "ref": 6,
        "will": 6
      },
      "20": {
        "fort": 12,
        "ref": 6,
        "will": 6
      }
    },
    "specials": {
      "1": "Challenge 1/day, mount, order, resolve",
      "2": "Order ability",
      "3": "Weapon expertise",
      "4": "Challenge 2/day",
      "5": "Banner",
      "6": "Bonus combat feat",
      "7": "Challenge 3/day",
      "8": "Order ability",
      "9": "Greater resolve",
      "10": "Challenge 4/day",
      "11": "Honorable stand",
      "12": "Bonus combat feat",
      "13": "Challenge 5/day",
      "14": "Greater banner",
      "15": "Order ability",
      "16": "Challenge 6/day",
      "17": "True challenge",
      "18": "Bonus combat feat",
      "19": "Challenge 7/day",
      "20": "Last stand"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 4
  },
  "unchained_barbarian": {
    "key": "unchained_barbarian",
    "name": "Unchained Barbarian",
    "category": "Official Classes",
    "url": "https://www.d20pfsrd.com/classes/official-classes/unchained-barbarian/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "acrobatics",
      "climb",
      "craft",
      "handle animal",
      "intimidate",
      "knowledge (nature)",
      "perception",
      "ride",
      "survival",
      "swim"
    ],
    "saves": {
      "1": {
        "fort": 2,
        "ref": 0,
        "will": 0
      },
      "2": {
        "fort": 3,
        "ref": 0,
        "will": 0
      },
      "3": {
        "fort": 3,
        "ref": 1,
        "will": 1
      },
      "4": {
        "fort": 4,
        "ref": 1,
        "will": 1
      },
      "5": {
        "fort": 4,
        "ref": 1,
        "will": 1
      },
      "6": {
        "fort": 5,
        "ref": 2,
        "will": 2
      },
      "7": {
        "fort": 5,
        "ref": 2,
        "will": 2
      },
      "8": {
        "fort": 6,
        "ref": 2,
        "will": 2
      },
      "9": {
        "fort": 6,
        "ref": 3,
        "will": 3
      },
      "10": {
        "fort": 7,
        "ref": 3,
        "will": 3
      },
      "11": {
        "fort": 7,
        "ref": 3,
        "will": 3
      },
      "12": {
        "fort": 8,
        "ref": 4,
        "will": 4
      },
      "13": {
        "fort": 8,
        "ref": 4,
        "will": 4
      },
      "14": {
        "fort": 9,
        "ref": 4,
        "will": 4
      },
      "15": {
        "fort": 9,
        "ref": 5,
        "will": 5
      },
      "16": {
        "fort": 10,
        "ref": 5,
        "will": 5
      },
      "17": {
        "fort": 10,
        "ref": 5,
        "will": 5
      },
      "18": {
        "fort": 11,
        "ref": 6,
        "will": 6
      },
      "19": {
        "fort": 11,
        "ref": 6,
        "will": 6
      },
      "20": {
        "fort": 12,
        "ref": 6,
        "will": 6
      }
    },
    "specials": {
      "1": "Fast movement +10 ft., rage",
      "2": "Rage power, uncanny dodge",
      "3": "Danger sense +1",
      "4": "Rage power",
      "5": "Improved uncanny dodge",
      "6": "Danger sense +2, rage power",
      "7": "Damage reduction 1/-",
      "8": "Rage power",
      "9": "Danger sense +3",
      "10": "Damage reduction 2/-, rage power",
      "11": "Greater rage",
      "12": "Danger sense +4, rage power",
      "13": "Damage reduction 3/-",
      "14": "Rage power",
      "15": "Danger sense +5",
      "16": "Damage reduction 4/-, rage power",
      "17": "Tireless rage",
      "18": "Danger sense +6, rage power",
      "19": "Damage reduction 5/-",
      "20": "Mighty rage, rage power"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 4
  },
  "unchained_monk": {
    "key": "unchained_monk",
    "name": "Unchained Monk",
    "category": "Official Classes",
    "url": "https://www.d20pfsrd.com/classes/official-classes/unchained-monk/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "acrobatics",
      "climb",
      "craft",
      "escape artist",
      "intimidate",
      "knowledge (history)",
      "knowledge (religion)",
      "perception",
      "perform",
      "profession",
      "ride",
      "sense motive",
      "stealth",
      "swim"
    ],
    "saves": {
      "1": {
        "fort": 2,
        "ref": 2,
        "will": 0
      },
      "2": {
        "fort": 3,
        "ref": 3,
        "will": 0
      },
      "3": {
        "fort": 3,
        "ref": 3,
        "will": 1
      },
      "4": {
        "fort": 4,
        "ref": 4,
        "will": 1
      },
      "5": {
        "fort": 4,
        "ref": 4,
        "will": 1
      },
      "6": {
        "fort": 5,
        "ref": 5,
        "will": 2
      },
      "7": {
        "fort": 5,
        "ref": 5,
        "will": 2
      },
      "8": {
        "fort": 6,
        "ref": 6,
        "will": 2
      },
      "9": {
        "fort": 6,
        "ref": 6,
        "will": 3
      },
      "10": {
        "fort": 7,
        "ref": 7,
        "will": 3
      },
      "11": {
        "fort": 7,
        "ref": 7,
        "will": 3
      },
      "12": {
        "fort": 8,
        "ref": 8,
        "will": 4
      },
      "13": {
        "fort": 8,
        "ref": 8,
        "will": 4
      },
      "14": {
        "fort": 9,
        "ref": 9,
        "will": 4
      },
      "15": {
        "fort": 9,
        "ref": 9,
        "will": 5
      },
      "16": {
        "fort": 10,
        "ref": 10,
        "will": 5
      },
      "17": {
        "fort": 10,
        "ref": 10,
        "will": 5
      },
      "18": {
        "fort": 11,
        "ref": 11,
        "will": 6
      },
      "19": {
        "fort": 11,
        "ref": 11,
        "will": 6
      },
      "20": {
        "fort": 12,
        "ref": 12,
        "will": 6
      }
    },
    "specials": {
      "1": "AC bonus, bonus feat, flurry of blows, stunning fist, unarmed strike (1d6)",
      "2": "Bonus feat, evasion",
      "3": "Fast movement +10 ft., ki pool (magic)",
      "4": "Ki power, slow fall 20 ft., unarmed strike (1d8)",
      "5": "High jump, style strike",
      "6": "Bonus feat, fast movement +20 ft., ki power",
      "7": "Ki pool (cold iron/silver), purity of body",
      "8": "Ki power, unarmed strike (1d10)",
      "9": "Fast movement +30 ft., improved evasion, style strike",
      "10": "Bonus feat, ki pool (lawful), ki power",
      "11": "Diamond body",
      "12": "Abundant step, fast movement +40 ft., ki power, unarmed strike (2d6)",
      "13": "Diamond soul (spell resistance), style strike",
      "14": "Bonus feat, ki power",
      "15": "Fast movement +50 ft., quivering palm",
      "16": "Ki pool (adamantine), ki power, unarmed strike (2d8)",
      "17": "Style strike, timeless body, tongue of the sun and moon",
      "18": "Bonus feat, fast movement +60 ft.",
      "19": "Empty body",
      "20": "Ki power, perfect self (outsider), unarmed strike (2d10)"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 4
  },
  "unchained_rogue": {
    "key": "unchained_rogue",
    "name": "Unchained Rogue",
    "category": "Official Classes",
    "url": "https://www.d20pfsrd.com/classes/official-classes/unchained-rogue/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "acrobatics",
      "appraise",
      "bluff",
      "climb",
      "craft",
      "diplomacy",
      "disable device",
      "disguise",
      "escape artist",
      "intimidate",
      "knowledge (dungeoneering)",
      "knowledge (local)",
      "linguistics",
      "perception",
      "perform",
      "profession",
      "sense motive",
      "sleight of hand",
      "stealth",
      "swim",
      "use magic device"
    ],
    "saves": {
      "1": {
        "fort": 0,
        "ref": 2,
        "will": 0
      },
      "2": {
        "fort": 0,
        "ref": 3,
        "will": 0
      },
      "3": {
        "fort": 1,
        "ref": 3,
        "will": 1
      },
      "4": {
        "fort": 1,
        "ref": 4,
        "will": 1
      },
      "5": {
        "fort": 1,
        "ref": 4,
        "will": 1
      },
      "6": {
        "fort": 2,
        "ref": 5,
        "will": 2
      },
      "7": {
        "fort": 2,
        "ref": 5,
        "will": 2
      },
      "8": {
        "fort": 2,
        "ref": 6,
        "will": 2
      },
      "9": {
        "fort": 3,
        "ref": 6,
        "will": 3
      },
      "10": {
        "fort": 3,
        "ref": 7,
        "will": 3
      },
      "11": {
        "fort": 3,
        "ref": 7,
        "will": 3
      },
      "12": {
        "fort": 4,
        "ref": 8,
        "will": 4
      },
      "13": {
        "fort": 4,
        "ref": 8,
        "will": 4
      },
      "14": {
        "fort": 4,
        "ref": 9,
        "will": 4
      },
      "15": {
        "fort": 5,
        "ref": 9,
        "will": 5
      },
      "16": {
        "fort": 5,
        "ref": 10,
        "will": 5
      },
      "17": {
        "fort": 5,
        "ref": 10,
        "will": 5
      },
      "18": {
        "fort": 6,
        "ref": 11,
        "will": 6
      },
      "19": {
        "fort": 6,
        "ref": 11,
        "will": 6
      },
      "20": {
        "fort": 6,
        "ref": 12,
        "will": 6
      }
    },
    "specials": {
      "1": "Finesse training (Dex to hit), sneak attack +1d6, trapfinding +1",
      "2": "Evasion, rogue talent",
      "3": "Danger sense +1, finesse training (Dex to dmg), sneak attack +2d6",
      "4": "Debilitating injury, rogue talent, uncanny dodge",
      "5": "Rogue's edge (1st skill unlock), sneak attack +3d6",
      "6": "Danger sense +2, rogue talent",
      "7": "Sneak attack +4d6",
      "8": "Improved uncanny dodge, rogue talent",
      "9": "Danger sense +3, sneak attack +5d6",
      "10": "Advanced talents, rogue's edge (2nd skill unlock), rogue talent",
      "11": "Sneak attack +6d6",
      "12": "Danger sense +4, rogue talent",
      "13": "Sneak attack +7d6",
      "14": "Rogue talent",
      "15": "Danger sense +5, rogue's edge (3rd skill unlock), sneak attack +8d6",
      "16": "Rogue talent",
      "17": "Sneak attack +9d6",
      "18": "Danger sense +6, rogue talent",
      "19": "Sneak attack +10d6",
      "20": "Master strike, rogue's edge (4th skill unlock), rogue talent"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 8
  },
  "unchained_summoner": {
    "key": "unchained_summoner",
    "name": "Unchained Summoner",
    "category": "Official Classes",
    "url": "https://www.d20pfsrd.com/classes/official-classes/unchained-summoner/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "craft",
      "fly",
      "handle animal",
      "knowledge (arcana)",
      "knowledge (dungeoneering)",
      "knowledge (engineering)",
      "knowledge (geography)",
      "knowledge (history)",
      "knowledge (local)",
      "knowledge (nature)",
      "knowledge (nobility)",
      "knowledge (planes)",
      "knowledge (religion)",
      "knowledge (all)",
      "linguistics",
      "profession",
      "ride",
      "spellcraft",
      "use magic device"
    ],
    "saves": {
      "1": {
        "fort": 0,
        "ref": 0,
        "will": 2
      },
      "2": {
        "fort": 0,
        "ref": 0,
        "will": 3
      },
      "3": {
        "fort": 1,
        "ref": 1,
        "will": 3
      },
      "4": {
        "fort": 1,
        "ref": 1,
        "will": 4
      },
      "5": {
        "fort": 1,
        "ref": 1,
        "will": 4
      },
      "6": {
        "fort": 2,
        "ref": 2,
        "will": 5
      },
      "7": {
        "fort": 2,
        "ref": 2,
        "will": 5
      },
      "8": {
        "fort": 2,
        "ref": 2,
        "will": 6
      },
      "9": {
        "fort": 3,
        "ref": 3,
        "will": 6
      },
      "10": {
        "fort": 3,
        "ref": 3,
        "will": 7
      },
      "11": {
        "fort": 3,
        "ref": 3,
        "will": 7
      },
      "12": {
        "fort": 4,
        "ref": 4,
        "will": 8
      },
      "13": {
        "fort": 4,
        "ref": 4,
        "will": 8
      },
      "14": {
        "fort": 4,
        "ref": 4,
        "will": 9
      },
      "15": {
        "fort": 5,
        "ref": 5,
        "will": 9
      },
      "16": {
        "fort": 5,
        "ref": 5,
        "will": 10
      },
      "17": {
        "fort": 5,
        "ref": 5,
        "will": 10
      },
      "18": {
        "fort": 6,
        "ref": 6,
        "will": 11
      },
      "19": {
        "fort": 6,
        "ref": 6,
        "will": 11
      },
      "20": {
        "fort": 6,
        "ref": 6,
        "will": 12
      }
    },
    "specials": {
      "1": "Cantrips, eidolon, life link, summon monster I",
      "2": "Bond senses",
      "3": "Summon monster II",
      "4": "Shield ally",
      "5": "Summon monster III",
      "6": "Maker's call",
      "7": "Summon monster IV",
      "8": "Transposition",
      "9": "Summon monster V",
      "10": "Aspect",
      "11": "Summon monster VI",
      "12": "Greater shield ally",
      "13": "Summon monster VII",
      "14": "Life bond",
      "15": "Summon monster VIII",
      "16": "Merge forms",
      "17": "Summon monster IX",
      "18": "Greater aspect",
      "19": "Gate",
      "20": "Twin eidolon"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 2
  },
  "adept": {
    "key": "adept",
    "name": "Adept",
    "category": "Official Classes",
    "url": "https://www.d20pfsrd.com/classes/official-classes/adept/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "craft",
      "handle animal",
      "heal",
      "knowledge (arcana)",
      "knowledge (dungeoneering)",
      "knowledge (engineering)",
      "knowledge (geography)",
      "knowledge (history)",
      "knowledge (local)",
      "knowledge (nature)",
      "knowledge (nobility)",
      "knowledge (planes)",
      "knowledge (religion)",
      "knowledge (all)",
      "profession",
      "spellcraft",
      "survival"
    ],
    "saves": {
      "1": {
        "fort": 0,
        "ref": 0,
        "will": 2
      },
      "2": {
        "fort": 0,
        "ref": 0,
        "will": 3
      },
      "3": {
        "fort": 1,
        "ref": 1,
        "will": 3
      },
      "4": {
        "fort": 1,
        "ref": 1,
        "will": 4
      },
      "5": {
        "fort": 1,
        "ref": 1,
        "will": 4
      },
      "6": {
        "fort": 2,
        "ref": 2,
        "will": 5
      },
      "7": {
        "fort": 2,
        "ref": 2,
        "will": 5
      },
      "8": {
        "fort": 2,
        "ref": 2,
        "will": 6
      },
      "9": {
        "fort": 3,
        "ref": 3,
        "will": 6
      },
      "10": {
        "fort": 3,
        "ref": 3,
        "will": 7
      },
      "11": {
        "fort": 3,
        "ref": 3,
        "will": 7
      },
      "12": {
        "fort": 4,
        "ref": 4,
        "will": 8
      },
      "13": {
        "fort": 4,
        "ref": 4,
        "will": 8
      },
      "14": {
        "fort": 4,
        "ref": 4,
        "will": 9
      },
      "15": {
        "fort": 5,
        "ref": 5,
        "will": 9
      },
      "16": {
        "fort": 5,
        "ref": 5,
        "will": 10
      },
      "17": {
        "fort": 5,
        "ref": 5,
        "will": 10
      },
      "18": {
        "fort": 6,
        "ref": 6,
        "will": 11
      },
      "19": {
        "fort": 6,
        "ref": 6,
        "will": 11
      },
      "20": {
        "fort": 6,
        "ref": 6,
        "will": 12
      }
    },
    "specials": {
      "1": "Summon familiar, adept spells",
      "2": "Spells known",
      "3": "Spells known",
      "4": "Spells known",
      "5": "Spells known",
      "6": "Spells known",
      "7": "Spells known",
      "8": "Spells known",
      "9": "Spells known",
      "10": "Spells known",
      "11": "Spells known",
      "12": "Spells known",
      "13": "Spells known",
      "14": "Spells known",
      "15": "Spells known",
      "16": "Spells known",
      "17": "Spells known",
      "18": "Spells known",
      "19": "Spells known",
      "20": "Spells known"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 2
  },
  "aristocrat": {
    "key": "aristocrat",
    "name": "Aristocrat",
    "category": "Official Classes",
    "url": "https://www.d20pfsrd.com/classes/official-classes/aristocrat/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "appraise",
      "bluff",
      "diplomacy",
      "disguise",
      "handle animal",
      "intimidate",
      "knowledge (arcana)",
      "knowledge (dungeoneering)",
      "knowledge (engineering)",
      "knowledge (geography)",
      "knowledge (history)",
      "knowledge (local)",
      "knowledge (nature)",
      "knowledge (nobility)",
      "knowledge (planes)",
      "knowledge (religion)",
      "knowledge (all)",
      "linguistics",
      "perception",
      "perform",
      "profession",
      "ride",
      "sense motive",
      "survival",
      "swim"
    ],
    "saves": {
      "1": {
        "fort": 0,
        "ref": 0,
        "will": 2
      },
      "2": {
        "fort": 0,
        "ref": 0,
        "will": 3
      },
      "3": {
        "fort": 1,
        "ref": 1,
        "will": 3
      },
      "4": {
        "fort": 1,
        "ref": 1,
        "will": 4
      },
      "5": {
        "fort": 1,
        "ref": 1,
        "will": 4
      },
      "6": {
        "fort": 2,
        "ref": 2,
        "will": 5
      },
      "7": {
        "fort": 2,
        "ref": 2,
        "will": 5
      },
      "8": {
        "fort": 2,
        "ref": 2,
        "will": 6
      },
      "9": {
        "fort": 3,
        "ref": 3,
        "will": 6
      },
      "10": {
        "fort": 3,
        "ref": 3,
        "will": 7
      },
      "11": {
        "fort": 3,
        "ref": 3,
        "will": 7
      },
      "12": {
        "fort": 4,
        "ref": 4,
        "will": 8
      },
      "13": {
        "fort": 4,
        "ref": 4,
        "will": 8
      },
      "14": {
        "fort": 4,
        "ref": 4,
        "will": 9
      },
      "15": {
        "fort": 5,
        "ref": 5,
        "will": 9
      },
      "16": {
        "fort": 5,
        "ref": 5,
        "will": 10
      },
      "17": {
        "fort": 5,
        "ref": 5,
        "will": 10
      },
      "18": {
        "fort": 6,
        "ref": 6,
        "will": 11
      },
      "19": {
        "fort": 6,
        "ref": 6,
        "will": 11
      },
      "20": {
        "fort": 6,
        "ref": 6,
        "will": 12
      }
    },
    "specials": {
      "1": "Weapon and armor proficiencies",
      "2": "Skills and proficiencies",
      "3": "Skills and proficiencies",
      "4": "Skills and proficiencies",
      "5": "Skills and proficiencies",
      "6": "Skills and proficiencies",
      "7": "Skills and proficiencies",
      "8": "Skills and proficiencies",
      "9": "Skills and proficiencies",
      "10": "Skills and proficiencies",
      "11": "Skills and proficiencies",
      "12": "Skills and proficiencies",
      "13": "Skills and proficiencies",
      "14": "Skills and proficiencies",
      "15": "Skills and proficiencies",
      "16": "Skills and proficiencies",
      "17": "Skills and proficiencies",
      "18": "Skills and proficiencies",
      "19": "Skills and proficiencies",
      "20": "Skills and proficiencies"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 4
  },
  "commoner": {
    "key": "commoner",
    "name": "Commoner",
    "category": "Official Classes",
    "url": "https://www.d20pfsrd.com/classes/official-classes/commoner/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "climb",
      "craft",
      "handle animal",
      "perception",
      "profession",
      "ride",
      "swim"
    ],
    "saves": {
      "1": {
        "fort": 0,
        "ref": 0,
        "will": 0
      },
      "2": {
        "fort": 0,
        "ref": 0,
        "will": 0
      },
      "3": {
        "fort": 1,
        "ref": 1,
        "will": 1
      },
      "4": {
        "fort": 1,
        "ref": 1,
        "will": 1
      },
      "5": {
        "fort": 1,
        "ref": 1,
        "will": 1
      },
      "6": {
        "fort": 2,
        "ref": 2,
        "will": 2
      },
      "7": {
        "fort": 2,
        "ref": 2,
        "will": 2
      },
      "8": {
        "fort": 2,
        "ref": 2,
        "will": 2
      },
      "9": {
        "fort": 3,
        "ref": 3,
        "will": 3
      },
      "10": {
        "fort": 3,
        "ref": 3,
        "will": 3
      },
      "11": {
        "fort": 3,
        "ref": 3,
        "will": 3
      },
      "12": {
        "fort": 4,
        "ref": 4,
        "will": 4
      },
      "13": {
        "fort": 4,
        "ref": 4,
        "will": 4
      },
      "14": {
        "fort": 4,
        "ref": 4,
        "will": 4
      },
      "15": {
        "fort": 5,
        "ref": 5,
        "will": 5
      },
      "16": {
        "fort": 5,
        "ref": 5,
        "will": 5
      },
      "17": {
        "fort": 5,
        "ref": 5,
        "will": 5
      },
      "18": {
        "fort": 6,
        "ref": 6,
        "will": 6
      },
      "19": {
        "fort": 6,
        "ref": 6,
        "will": 6
      },
      "20": {
        "fort": 6,
        "ref": 6,
        "will": 6
      }
    },
    "specials": {
      "1": "Simple weapon proficiency",
      "2": "Standard progression",
      "3": "Standard progression",
      "4": "Standard progression",
      "5": "Standard progression",
      "6": "Standard progression",
      "7": "Standard progression",
      "8": "Standard progression",
      "9": "Standard progression",
      "10": "Standard progression",
      "11": "Standard progression",
      "12": "Standard progression",
      "13": "Standard progression",
      "14": "Standard progression",
      "15": "Standard progression",
      "16": "Standard progression",
      "17": "Standard progression",
      "18": "Standard progression",
      "19": "Standard progression",
      "20": "Standard progression"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 2
  },
  "expert": {
    "key": "expert",
    "name": "Expert",
    "category": "Official Classes",
    "url": "https://www.d20pfsrd.com/classes/official-classes/expert/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "acrobatics",
      "appraise",
      "bluff",
      "climb",
      "craft",
      "diplomacy",
      "disable device",
      "knowledge (arcana)",
      "knowledge (dungeoneering)",
      "knowledge (engineering)",
      "knowledge (geography)",
      "knowledge (history)",
      "knowledge (local)",
      "knowledge (nature)",
      "knowledge (nobility)",
      "knowledge (planes)",
      "knowledge (religion)",
      "knowledge (all)",
      "perception",
      "profession",
      "sense motive",
      "stealth",
      "use magic device"
    ],
    "saves": {
      "1": {
        "fort": 0,
        "ref": 0,
        "will": 2
      },
      "2": {
        "fort": 0,
        "ref": 0,
        "will": 3
      },
      "3": {
        "fort": 1,
        "ref": 1,
        "will": 3
      },
      "4": {
        "fort": 1,
        "ref": 1,
        "will": 4
      },
      "5": {
        "fort": 1,
        "ref": 1,
        "will": 4
      },
      "6": {
        "fort": 2,
        "ref": 2,
        "will": 5
      },
      "7": {
        "fort": 2,
        "ref": 2,
        "will": 5
      },
      "8": {
        "fort": 2,
        "ref": 2,
        "will": 6
      },
      "9": {
        "fort": 3,
        "ref": 3,
        "will": 6
      },
      "10": {
        "fort": 3,
        "ref": 3,
        "will": 7
      },
      "11": {
        "fort": 3,
        "ref": 3,
        "will": 7
      },
      "12": {
        "fort": 4,
        "ref": 4,
        "will": 8
      },
      "13": {
        "fort": 4,
        "ref": 4,
        "will": 8
      },
      "14": {
        "fort": 4,
        "ref": 4,
        "will": 9
      },
      "15": {
        "fort": 5,
        "ref": 5,
        "will": 9
      },
      "16": {
        "fort": 5,
        "ref": 5,
        "will": 10
      },
      "17": {
        "fort": 5,
        "ref": 5,
        "will": 10
      },
      "18": {
        "fort": 6,
        "ref": 6,
        "will": 11
      },
      "19": {
        "fort": 6,
        "ref": 6,
        "will": 11
      },
      "20": {
        "fort": 6,
        "ref": 6,
        "will": 12
      }
    },
    "specials": {
      "1": "10 class skills chosen, simple weapon proficiency",
      "2": "Skill progression",
      "3": "Skill progression",
      "4": "Skill progression",
      "5": "Skill progression",
      "6": "Skill progression",
      "7": "Skill progression",
      "8": "Skill progression",
      "9": "Skill progression",
      "10": "Skill progression",
      "11": "Skill progression",
      "12": "Skill progression",
      "13": "Skill progression",
      "14": "Skill progression",
      "15": "Skill progression",
      "16": "Skill progression",
      "17": "Skill progression",
      "18": "Skill progression",
      "19": "Skill progression",
      "20": "Skill progression"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 6
  },
  "warrior_npc": {
    "key": "warrior_npc",
    "name": "Warrior Npc",
    "category": "Official Classes",
    "url": "https://www.d20pfsrd.com/classes/official-classes/warrior-npc/",
    "hit_die": 8,
    "bab_table": "bab_section_2",
    "skills": [
      "climb",
      "craft",
      "handle animal",
      "intimidate",
      "profession",
      "ride",
      "swim"
    ],
    "saves": {
      "1": {
        "fort": 2,
        "ref": 0,
        "will": 0
      },
      "2": {
        "fort": 3,
        "ref": 0,
        "will": 0
      },
      "3": {
        "fort": 3,
        "ref": 1,
        "will": 1
      },
      "4": {
        "fort": 4,
        "ref": 1,
        "will": 1
      },
      "5": {
        "fort": 4,
        "ref": 1,
        "will": 1
      },
      "6": {
        "fort": 5,
        "ref": 2,
        "will": 2
      },
      "7": {
        "fort": 5,
        "ref": 2,
        "will": 2
      },
      "8": {
        "fort": 6,
        "ref": 2,
        "will": 2
      },
      "9": {
        "fort": 6,
        "ref": 3,
        "will": 3
      },
      "10": {
        "fort": 7,
        "ref": 3,
        "will": 3
      },
      "11": {
        "fort": 7,
        "ref": 3,
        "will": 3
      },
      "12": {
        "fort": 8,
        "ref": 4,
        "will": 4
      },
      "13": {
        "fort": 8,
        "ref": 4,
        "will": 4
      },
      "14": {
        "fort": 9,
        "ref": 4,
        "will": 4
      },
      "15": {
        "fort": 9,
        "ref": 5,
        "will": 5
      },
      "16": {
        "fort": 10,
        "ref": 5,
        "will": 5
      },
      "17": {
        "fort": 10,
        "ref": 5,
        "will": 5
      },
      "18": {
        "fort": 11,
        "ref": 6,
        "will": 6
      },
      "19": {
        "fort": 11,
        "ref": 6,
        "will": 6
      },
      "20": {
        "fort": 12,
        "ref": 6,
        "will": 6
      }
    },
    "specials": {
      "1": "All martial weapon and armor proficiencies",
      "2": "BAB and save progression",
      "3": "BAB and save progression",
      "4": "BAB and save progression",
      "5": "BAB and save progression",
      "6": "BAB and save progression",
      "7": "BAB and save progression",
      "8": "BAB and save progression",
      "9": "BAB and save progression",
      "10": "BAB and save progression",
      "11": "BAB and save progression",
      "12": "BAB and save progression",
      "13": "BAB and save progression",
      "14": "BAB and save progression",
      "15": "BAB and save progression",
      "16": "BAB and save progression",
      "17": "BAB and save progression",
      "18": "BAB and save progression",
      "19": "BAB and save progression",
      "20": "BAB and save progression"
    },
    "spells": {},
    "casting_stat": "",
    "skill_ranks": 2
  }
};
