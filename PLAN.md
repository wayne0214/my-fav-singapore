# My Fav Singapore — "The Little Red Dot, 1960 → Future"

An interactive, era-by-era 3D story of Singapore for young people: what Singapore is,
what it went through, how it overcame each challenge, and where it is heading.
Inspired by https://puma.taipei/heart-island (Three.js low-poly island + story panel).

## Experience

* **Left: a living 3D island of Singapore** (Three.js, procedural low-poly, no model files).
  Buildings, towns, MRT lines, airports, ports and gardens *grow out of the ground* as you
  move through the eras. Going back an era shrinks them again. Future projects appear as
  translucent "blueprint" structures.
* **Top: an era timeline** — 1960s · 1970s · 1980s · 1990s · 2000s · 2010s · 2020s · Future.
  Click an era, use ← → keys, or press ▶ Play to auto-advance the story.
* **Right: the story panel** for the current era:
  1. Headline + one-line mood
  2. *What happened* (short narrative)
  3. *The challenge* / *How Singapore overcame it*
  4. Milestones (year + event), clickable → highlights the landmark on the island
  5. Live stats that count up: population, GDP per capita, home ownership, life expectancy
  6. *For the young* — one takeaway sentence
* Day/night toggle, clickable landmark labels (CSS2D) with short explanations.
* Intro overlay (3 steps, skippable) like the reference site.

## Era outline

| Era | Theme | Island changes |
|-----|-------|----------------|
| 1960s | Survival: self-rule, merger, separation, housing crisis | Kampongs, Queenstown & Toa Payoh HDB, Jurong factories, Bukit Ho Swee fire, Tanjong Pagar port |
| 1970s | Build: jobs, homes, National Service, port boom | More new towns (Ang Mo Kio, Bedok), container port, Singapore River clean-up |
| 1980s | Connect: Changi Airport, first MRT, 1985 recession | Changi Airport, NS Line, Marina reclamation, CBD towers |
| 1990s | Mature: Goh Chok Tong, Asian Financial Crisis, Suntec, ERP | EW Line, Suntec, Woodlands, Tampines, Jurong Island |
| 2000s | Reinvent: SARS, NEWater, Biopolis, Marina Bay, F1 | NEL, Circle Line, Esplanade, Flyer, Marina Barrage, MBS/RWS |
| 2010s | Shine: Gardens by the Bay, SG50, Smart Nation, Jewel, TEL | GBTB, Jewel, DTL, TEL, Punggol Digital District |
| 2020s | Resilience: COVID-19, 4G leadership, SG60, Green Plan, Tuas Port | Tuas Port, TEL completion, Tengah forest town, solar farms |
| Future | What the government has said: Long Island, Changi T5, Cross Island Line, Greater Southern Waterfront, Paya Lebar move, Net Zero 2050, Forward SG, new southern island (NDR 2026) | Translucent blueprint structures |

## Tech

* Static site: `index.html`, `style.css`, `app.js`, `data.js`. No build step.
* Three.js r170 via import map (jsdelivr CDN). Works on GitHub Pages.
* Mobile: island on top, story panel becomes a scrollable sheet below.

## Sources used for facts (see data.js `sources` per era)
PMO National Day Rally 2026 release, URA Long Island / Draft Master Plan 2025, MOT COS 2026 speech,
Forward SG report (2023), Singapore Green Plan 2030, Smart Nation 2.0, SingStat (GDP per capita 2025,
home ownership 91.2% in 2025), plus widely documented historical milestones.
