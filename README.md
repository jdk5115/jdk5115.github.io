# Jonathan Kelly — Data & AI Consulting

Static site for jonathankelly data/AI consulting. Snowflake-centric positioning, interactive 3D geospatial demo, architecture pattern explorer, and prepaid booking via Cal.com + Stripe.

## Stack
- Plain HTML/CSS/JS — no build step
- MapLibre GL JS + OpenFreeMap tiles (OpenStreetMap data, no API key)
- Cal.com embeds for booking (Stripe payment collected at booking)
- Deployed to GitHub Pages via `.github/workflows/deploy.yml`

## One-time setup still required (owner)
1. **Cal.com**: create account, set username, create 3 event types with slugs:
   - `intro-15` — 15 min, free, non-technical intro
   - `technical-30` — 30 min, $100 (Stripe app enabled, charge upfront)
   - `technical-60` — 60 min, $200 (Stripe app enabled, charge upfront)
2. **Stripe**: create account, connect in Cal.com → Apps → Stripe.
3. Update `CAL_USERNAME` at the top of `js/main.js`.

## Editing
All changes are made via Claude (chat) → commit → push → auto-deploy.

- `index.html` — all content/sections
- `css/styles.css` — theme (colors in `:root`)
- `js/map.js` — geospatial demo (cities, 3D buildings)
- `js/main.js` — booking modal, tabs, nav, `CAL_USERNAME`

## About section placeholders
`index.html` contains `[X] years` and `[industries/companies — placeholder]` to be replaced with real bio details.
