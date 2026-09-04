# FastForward Operations Dashboard

An executive operations dashboard prototype for the fictional FastForward Logistics freight network. It turns shipment volume, service performance, regional health, and open exceptions into one meeting-ready view.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite, usually `http://127.0.0.1:5173/`.

## Validate a production build

```bash
npm run build
```

## Project map

- `src/App.vue`: dashboard data model, layout, and interactions.
- `src/pages/`: shipment overview and shipment detail route views.
- `src/data/shipments.js`: shared representative shipment fixtures.
- `src/router.js`: overview, shipment list, and shipment detail routes.
- `src/style.css`: visual system and responsive layout.
- `src/main.js`: Vue application entry point.
- `vite.config.js`: Vite configuration, including Vuetify 3 auto-import support.
- `BRIEF.md`: client context, product scope, and design decisions.
- `context/`: maintained AI working notes for future sessions.

## UI foundation

Vuetify 3 is registered globally with the Material Design Icons (`mdi`) set available for future dashboard components. The current overview keeps its custom visual system and Lucide icons so the existing FastForward operations design remains stable while the component library is introduced incrementally.

## Prototype interactions

The sidebar navigation switches between the executive overview and shipments workspace. The shipments page supports search, status filtering, and row navigation into shipment detail. The overview still supports date selection, exception search, and exception expansion. Data is intentionally local and representative because no production TMS connection exists for this prototype.