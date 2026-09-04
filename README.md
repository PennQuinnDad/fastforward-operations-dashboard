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
- `src/style.css`: visual system and responsive layout.
- `src/main.js`: Vue application entry point.
- `vite.config.js`: Vite configuration, including Vuetify 3 auto-import support.
- `BRIEF.md`: client context, product scope, and design decisions.
- `context/`: maintained AI working notes for future sessions.

## UI foundation

Vuetify 3 is registered globally and available for future dashboard components. The current overview keeps its custom visual system and Lucide icons so the existing FastForward operations design remains stable while the component library is introduced incrementally.

## Prototype interactions

The sidebar navigation updates the active view label, the date selector changes the selected reporting window, the exceptions search filters the visible rows, and “View all exceptions” expands the queue. Data is intentionally local and representative because no production TMS connection exists for this prototype.