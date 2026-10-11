CARRYING_CAPACITY_TABLE = {
    1: (3, 6, 10),
    2: (6, 13, 20),
    3: (10, 20, 30),
    4: (13, 26, 40),
    5: (16, 33, 50),
    6: (20, 40, 60),
    7: (23, 46, 70),
    8: (26, 53, 80),
    9: (30, 60, 90),
    10: (33, 66, 100),
    11: (38, 76, 115),
    12: (43, 86, 130),
    13: (50, 100, 150),
    14: (58, 116, 175),
    15: (66, 133, 200),
    16: (76, 153, 230),
    17: (86, 173, 260),
    18: (100, 200, 300),
    19: (116, 233, 350),
    20: (133, 266, 400),
    21: (153, 306, 460),
    22: (173, 346, 520),
    23: (200, 400, 600),
    24: (233, 466, 700),
    25: (266, 533, 800),
    26: (306, 613, 920),
    27: (346, 693, 1040),
    28: (400, 800, 1200),
    29: (466, 933, 1400),
}

def get_carrying_capacity(str_score: int):

    try:
        s = int(str_score)
        if s <= 0:
            return 0, 0, 0, 0, 0, 0
        if s in CARRYING_CAPACITY_TABLE:
            light, med, hvy = CARRYING_CAPACITY_TABLE[s]
        else:
            mult = 4 ** ((s - 20) // 10)
            base_s = 20 + ((s - 20) % 10)
            b_light, b_med, b_hvy = CARRYING_CAPACITY_TABLE.get(base_s, (133, 266, 400))
            light, med, hvy = b_light * mult, b_med * mult, b_hvy * mult
        overhead = hvy
        ground = hvy * 2
        drag = hvy * 5
        return light, med, hvy, overhead, ground, drag
    except Exception:
        return 33, 66, 100, 100, 200, 500

class WeaponItem:
    def __init__(self, name="", attack="", damage="", crit="20/x2", w_range="", weapon_type="Melee", weight="", raw_text="", ammo=""):
        self.name = name
        self.attack = attack
        self.damage = damage
        self.crit = crit
        self.range = w_range
        self.weapon_type = weapon_type
        self.weight = weight
        self.raw_text = raw_text
        self.ammo = ammo

    @classmethod
    def from_dict(cls, d: dict):
        return cls(
            name=d.get("name", "").strip(),
            attack=d.get("attack", "").strip(),
            damage=d.get("damage", "").strip(),
            crit=d.get("crit", "20/x2").strip(),
            w_range=d.get("range", "").strip(),
            weapon_type=d.get("type", "Melee").strip(),
            weight=d.get("weight", "").strip(),
            raw_text=d.get("rawText", "") or d.get("raw", ""),
            ammo=d.get("ammo", "").strip()
        )

class ArmorItem:
    def __init__(self, name="", bonus=0, max_dex=None, check_penalty=0, spell_failure="", weight="", properties="Armor"):
        self.name = name
        self.bonus = bonus
        self.max_dex = max_dex
        self.check_penalty = check_penalty
        self.spell_failure = spell_failure
        self.weight = weight
        self.properties = properties

    @property
    def is_shield(self) -> bool:
        p = (self.properties or "").lower()
        n = (self.name or "").lower()
        return "shield" in p or "shield" in n or "buckler" in n

    @classmethod
    def from_dict(cls, d: dict):
        cp = d.get("check_penalty") if d.get("check_penalty") is not None else d.get("pen", 0)
        return cls(
            name=d.get("name", "").strip(),
            bonus=d.get("bonus", 0),
            max_dex=d.get("max_dex"),
            check_penalty=cp,
            spell_failure=d.get("spell_failure", "").strip(),
            weight=d.get("weight", "").strip(),
            properties=(d.get("properties") or d.get("type") or d.get("category") or "Armor").strip()
        )
