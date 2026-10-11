<div align="center">

  <img src="web/assets/img/branding/valiant-shade-logo-small.png" alt="PathFastSheet Logo" width="120" style="border-radius: 12px; margin-bottom: 12px;" />

  # PathFastSheet — Valiant Shade v1.0
  **Pathfinder 1E Interactive Character Sheet, Combat Cockpit & Official PDF Generator**

  [![Python Version](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
  [![PyMuPDF](https://img.shields.io/badge/PyMuPDF-fitz-brightgreen?style=for-the-badge&logo=pdf&logoColor=white)](https://pymupdf.readthedocs.io/)
  [![Pathfinder 1E](https://img.shields.io/badge/Ruleset-Pathfinder%201E%20%2F%20SRD%203.5-red?style=for-the-badge)](https://www.d20pfsrd.com/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
  [![Language: English](https://img.shields.io/badge/Language-English-orange?style=for-the-badge)](README.md)

</div>

---

### 📖 Overview

**PathFastSheet (Valiant Shade)** is a lightweight, responsive, and tactile character manager, combat cockpit, and official PDF sheet generator for **Pathfinder 1st Edition (PF1E / SRD 3.5)**.

Engineered with zero bulky web frameworks, the application relies solely on Python's native standard library (`http.server` with multithreading) and modern Vanilla JavaScript, utilizing `PyMuPDF` (`fitz`) for pixel-perfect official PDF form generation.

All character statistics are calculated dynamically, stored in local JSON files, and exported to the official interactive **Paizo Pathfinder Character Sheet PDF** (`Pathfinder-Character-Sheet-EDIT.pdf`) with a single click.

---

### ✨ Features

- 🧙‍♂️ **Comprehensive Class & Mechanics Support (50+ Classes & Multiclass):**
  - Full support for Core, Base, Hybrid, Occult, Alternate, and NPC classes (Paladin, Fighter, Wizard, Rogue, Omdura, Kineticist, Magus, etc.).
  - Advanced **Multiclass** progression engine tracking total levels, BAB stacking, and composite saving throws.
- ⚡ **Automated Rules & Statistical Engine:**
  - **Ability Scores:** Automatic derivation of modifiers `(Score - 10) // 2`.
  - **Armor Class (AC):** Full AC, Touch AC, and Flat-Footed AC calculations incorporating armor, shield, DEX cap, natural, deflection, size, and dodge bonuses.
  - **Saving Throws:** Automatic class progression for Fortitude, Reflex, and Will with item resistance bonuses.
  - **Combat Stats:** Base Attack Bonus (BAB), Combat Maneuver Bonus (CMB), and Combat Maneuver Defense (CMD).
  - **Hit Point Progression:** Hit Dice per level, Constitution bonuses, and health tracking.
  - **Short Alignment Standard:** Alignment is standardized across the entire engine and PDF outputs as concise abbreviations (`LG`, `NG`, `CG`, `LN`, `N`, `CN`, `LE`, `NE`, `CE`).
- 📜 **1,300+ Traits Database:**
  - Searchable database sourced directly from d20pfsrd rules with category filters, source links, and direct character slot assignment.
- ⚔️ **Dynamic Weapon, Armor & Encumbrance Calculations:**
  - Melee and ranged weapons configuration, critical range/multiplier tracking, and damage formulas.
  - Armor Check Penalty (ACP), Max DEX capping, and STR-based Light/Medium/Heavy encumbrance thresholds.
- 🔮 **Spellcasting Ledger:**
  - Automated DC derivation based on INT/WIS/CHA, spells known, and spell slot matrices across circles 0–9.
- 🎲 **Interactive Floating Dice Tray:**
  - Built-in roller supporting d4, d6, d8, d10, d12, d20, and d100 with one-click roll checks directly from sheet stats.
- 📄 **Official Paizo PDF Generation:**
  - Populates all fields, attacks, inventory, skills, and special abilities onto the official interactive fillable Paizo PDF template.
  - Supports instant browser preview (inline) and one-click file download.
- 💾 **Local JSON Persistence:**
  - Save characters locally in `characters/*.json` with offline readiness, export, and import.

---

### 🚀 Installation & Quickstart

#### 1. Prerequisites
- Python 3.10 or higher
- Modern web browser (Chrome, Edge, Firefox, Brave, Safari)

#### 2. Setup
```bash
# Clone the repository
git clone https://github.com/sanji/PathFastSheet.git
cd PathFastSheet

# Install the single dependency (PyMuPDF)
pip install -r requirements.txt
```

#### 3. Run Application
```bash
python main.py
```

The server will initialize and automatically open your default browser at `http://localhost:5050`.

#### 4. Command Line Options
```bash
python main.py --port 5050       # Specify custom port (default: 5050)
python main.py --no-browser      # Run headless without opening browser
python main.py -h, --help        # Display help and usage instructions
```

---

### 📁 Project Structure

```text
PathFastSheet/
├── Pathfinder-Character-Sheet-EDIT.pdf   # Official fillable Paizo PDF template
├── LICENSE                              # MIT License
├── README.md                            # Project documentation
├── requirements.txt                     # Python dependencies (PyMuPDF)
├── main.py                              # Application entry point & CLI parser
├── characters/                          # Saved character JSON files
└── web/                                 # Web client and application core
    ├── index.html                       # Responsive SPA character sheet UI
    ├── assets/                          # Media and branding assets
    ├── css/                             # Dark mode design system
    ├── locales/                         # Localization resources (en.json, tr.json)
    ├── data/                            # Pathfinder data sets (pf_classes.json, traits.json, etc.)
    ├── js/                              # Client-side logic & rule engines
    │   ├── app.js                       # Main application state & UI controller
    │   ├── class_engine.js              # Class and race mechanical calculation engine
    │   ├── official_classes.js          # Official class progressions
    │   └── pf_data.js                   # Master reference data
    └── python/                          # Python backend services
        ├── server.py                    # Threading HTTP server with ETag & compression
        ├── character_controller.py      # REST API route handlers
        ├── static_controller.py         # Static asset server and MIME resolver
        ├── character_repository.py      # JSON persistence repository
        ├── character.py                 # Character domain model & rules
        ├── abilities.py                 # Mathematical engine & class abilities
        ├── equipment.py                 # Equipment, weapons, and encumbrance matrix
        └── pdf_view.py                  # PyMuPDF form mapping & PDF exporter
```

---

### 🔌 REST API Endpoints

The internal HTTP server exposes the following REST endpoints:

| Method | Endpoint | Description | Payload / Query |
|---|---|---|---|
| `GET` | `/api/characters` | Lists all saved characters | — |
| `GET` | `/api/load-character?file=<name>` | Loads character JSON data | Query: `file=Character_Name.json` |
| `POST` | `/api/save-character` | Saves character to local JSON | `{ filename: "...", data: {...} }` |
| `POST` | `/api/generate-pdf` | Generates official PDF attachment | Character JSON payload |
| `POST` | `/api/preview-pdf` | Renders official PDF for inline browser viewing | Character JSON payload |
| `POST` | `/api/calculate-abilities` | Resolves ability scores, feats, and special abilities | Character JSON payload |
| `DELETE` / `POST` | `/api/delete-character` | Deletes character file from disk | `{ filename: "Character.json" }` |

---

### 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

<div align="center">
  <sub>Developed with ❤️ for tabletop roleplaying enthusiasts. Pathfinder is a registered trademark of Paizo Inc.</sub>
</div>
