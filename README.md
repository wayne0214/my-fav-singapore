# The Little Red Dot — Singapore 1960 → Future

An interactive 3D story of Singapore for young people. Press an era and watch towns,
MRT lines, the airport, the port and the Marina Bay skyline grow out of the island,
while the panel explains what happened, what went wrong, and how Singapore got through it.
The final chapter covers what the government has publicly said about Singapore's future.

Inspired by [puma.taipei/heart-island](https://puma.taipei/heart-island).

## Run it

No build step. Serve the folder with any static server:

```bash
python3 -m http.server 8765
```

Then open http://localhost:8765. It also works on GitHub Pages as-is.

## Files

| File | What it is |
|------|-----------|
| `index.html` | Page shell, import map for Three.js (CDN) |
| `style.css` | All styling, including the phone layout |
| `app.js` | 3D island, landmark builders, era transitions, panel, timeline, intro |
| `data.js` | **All content**: eras, stories, milestones, stats, landmark positions, MRT lines |
| `PLAN.md` | The design plan |

## Editing the content

Everything a non-developer would want to change lives in `data.js`:

* `ERAS` — one object per chapter (title, story, challenge, how it was overcome, milestones, stats, takeaway).
* `LANDMARKS` — each building cluster or MRT line, with `[longitude, latitude]`, a `type`, the `era` index it appears in, and a `blurb` shown when clicked. Set `future: true` for blueprint-style structures.
* `INTRO_STEPS` — the three welcome cards.

Landmark `type` can be: `hdb`, `tower`, `factory`, `airport`, `port`, `dome`, `garden`, `wheel`, `kampong`, `civic`, `park`, `river`, `reclaim`, `reservoir`, `barrage`, `mbs`, `jewel`, `esplanade`, `solar`, or `line` (with `pts` and `color`).

## Controls

* Timeline buttons, `←` `→` keys, or **Play** to auto-advance every 9 seconds
* Drag to orbit, scroll to zoom, **Reset view** to return
* Click a label or a milestone ◎ to fly to that landmark
* ☀ / 🌇 / ☾ for day, dusk and night (windows light up at night)
