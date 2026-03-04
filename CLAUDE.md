# CLAUDE.md — Lincoln University Cost Calculator

## Project Purpose
A client-facing, vanilla JS/HTML/CSS net price calculator for Lincoln University of Missouri graduate programs. Prospective students use it to estimate tuition, location fees, program fees, and book costs per semester.

## Key Files
- `prototype.html` — Main deliverable. Uses a scraped LU Academics page as a shell/container for the calculator. Do not edit the surrounding site markup (nav, footer, etc.) unless absolutely necessary.
- `assets/cost-calculator.js` — All calculator logic: cost computation, form validation, URL sync, reset.
- `assets/cost-calculator.css` — Custom styles for the calculator component only.
- `assets/prototype-isolated.html` — Standalone mockup; the client-approved design reference. Use this to verify UI appearance.
- `Academics _ Lincoln University of Missouri_files/` — Downloaded LU site assets (fonts, CSS, JS). Do not modify these files.

## Architecture
- **No build step, no dependencies.** Pure vanilla JS, HTML, CSS. Open `prototype.html` directly in a browser to run.
- **All tuition/fee rates are stored as `data-*` attributes** on the `#costCalculator` form element in both `prototype.html` and `assets/prototype-isolated.html`. Update rates there, not in JS.
- **Program filtering** is driven by `data-enrollment="online|inseat"` attributes on `<option>` elements.
- **URL query params** mirror form state for shareable links (`updateURLFromOptions` / `applyOptionsFromURL`).

## Rate Configuration (data- attributes on #costCalculator)
| Attribute | Description |
|---|---|
| `data-online-cost` | Online tuition per credit hour |
| `data-in-state-cost` | In-state tuition per credit hour |
| `data-out-of-state-cost` | Out-of-state tuition per credit hour |
| `data-edu-fee` | Education program fee per credit hour |
| `data-bus-fee` | Business program fee per credit hour |
| `data-nur-fee` | Nursing program fee per credit hour |
| `data-art-sci-fee` | Arts & Sciences fee per credit hour |
| `data-aehs-fee` | Ag/Environmental/Human Sciences fee per credit hour |
| `data-other-programs-fee` | Other programs fee per credit hour |
| `data-books-cost` | Book cost per course (3 credit hours) |
| `data-online-boundary-hours` | Credit hour threshold for online location fee switch |
| `data-online-upper-boundary-fee` | Flat location fee for online students at/above boundary |
| `data-online-lower-boundary-fee` | Per-credit location fee for online students below boundary |
| `data-in-state-fee` | Location fee per credit hour for in-state in-seat |
| `data-out-of-state-fee` | Location fee per credit hour for out-of-state in-seat |

## Cost Calculation Logic
1. **Tuition** = tuition rate × credit hours
2. **Location fee** = per-credit rate × credit hours (online: flat fee ÷ credit hours if ≥ 9 hrs)
3. **Program fee** = program rate × credit hours (determined by program value prefix: `edu-`, `bus-`, `nur-`, `art&sci-`, `aehs-`)
4. **Books** = $90 × ceil(credit hours / 3), capped at $340
5. **Total** = sum of all above

## Conventions
- Form validation uses inline error spans injected at the top of each field group, not alerts. Errors scroll into view smoothly.
- Credit hour slider defaults to 6; summer semesters cap at 9, others at 12.
- `lastCalculation` stores the most recent result so `updateDisplay()` can re-render without recalculating.
- Do not edit the `<!-- DO NOT EDIT -->` block in `prototype.html` (Mainstay Web Chat integration).

## What NOT to Change
- Anything inside `Academics _ Lincoln University of Missouri_files/` — these are external LU site assets.
- The surrounding page shell in `prototype.html` (header, nav, footer).
