# Order Tracking App — Frontend

Single-page application for browsing, creating and tracking orders, with live status updates pushed from the backend
over Server-Sent Events.

## Related Repositories

- **Backend:** [vmedvedevpro/order-tracking-app-backend](https://github.com/vmedvedevpro/order-tracking-app-backend) —
  API and SSE source for this frontend.
- **Infrastructure:
  ** [vmedvedevpro/order-tracking-app-infrastructure](https://github.com/vmedvedevpro/order-tracking-app-infrastructure) —
  Docker Compose setup that brings up the backend and frontend together; use it if you want to run the whole stack with
  one command instead of starting each service by hand.

## Features

- **Orders list** with pagination and per-row navigation to details.
- **Order details page** with a visual status timeline (`Created → Shipped → Delivered`, plus `Cancelled`).
- **Create order** form with client-side validation and optimistic cache updates.
- **Real-time status sync** — a single SSE subscription updates every open list and detail view through the React Query
  cache, no manual refresh needed.
- **Tracked orders** ("favorites") persisted in `localStorage` via Zustand, available on a dedicated page.
- **Typed API layer** auto-generated from the backend OpenAPI spec (`@hey-api/openapi-ts`) — request/response types, SDK
  functions and SSE helpers stay in sync with the contract.
- **Themed UI** built with `styled-components` and a shared theme/token set, plus a global style reset.
- **Production-ready container** — multi-stage Docker build serving the static bundle through Nginx with API and SSE
  proxying.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 8** — dev server and build
- **React Router 7** — routing
- **TanStack Query 5** — server state, caching, invalidation
- **Zustand** (with `persist` middleware) — client state for tracked orders
- **styled-components 6** — styling and theming
- **Axios** — HTTP transport for the generated SDK
- **@hey-api/openapi-ts** — OpenAPI → TypeScript client generator
- **ESLint** + **typescript-eslint** — linting
- **Docker** + **Nginx** — containerized deployment

## Project Layout

```
src/
  api/generated/       # auto-generated SDK and types (do not edit by hand)
  app/                 # root App component, 404 page
  components/          # shared layout and UI primitives
  features/orders/     # orders feature: pages, components, hooks, api, store, types
  lib/                 # axios client, query client, problem details helpers
  styles/              # theme, global styles, styled-components types
docker/                # nginx config template used by the production image
```

## Prerequisites

- **Node.js 22+** and **npm**
- A running instance of the backend API (default: `http://localhost:5000`)

## Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local env file from the example and adjust it if the backend runs on a different host/port:

   ```bash
   cp .env.example .env
   ```

   Variables:
    - `VITE_API_PROXY_TARGET` — backend address used by the Vite dev proxy (dev only).
    - `VITE_API_BASE_URL` — base URL for the API client. Leave empty in dev so requests go through the Vite proxy at
      `/api`.

3. Start the dev server:

   ```bash
   npm run dev
   ```

   The app is available at `http://localhost:5173`. All `/api/*` requests are proxied to `VITE_API_PROXY_TARGET`, which
   keeps cookies and SSE streams working without CORS configuration.

## Available Scripts

| Script                 | Description                                                                         |
|------------------------|-------------------------------------------------------------------------------------|
| `npm run dev`          | Start the Vite dev server with HMR.                                                 |
| `npm run build`        | Type-check (`tsc -b`) and produce a production bundle in `dist/`.                   |
| `npm run preview`      | Serve the production build locally for smoke-testing.                               |
| `npm run lint`         | Run ESLint over the project.                                                        |
| `npm run generate:api` | Regenerate the typed API client from `docs/swagger.json` into `src/api/generated/`. |

## Regenerating the API Client

The SDK in `src/api/generated/` is generated from the OpenAPI document at `docs/swagger.json`. After updating the spec,
run:

```bash
npm run generate:api
```

Do not edit files under `src/api/generated/` manually — they will be overwritten on the next generation.

## Docker

A multi-stage Dockerfile builds the static bundle and serves it through Nginx, which also proxies `/api/*` (including
SSE) to the backend.

Build and run:

```bash
docker build -t order-tracking-frontend .
docker run --rm -p 8080:80 \
  -e API_PROXY_TARGET=http://host.docker.internal:5000 \
  order-tracking-frontend
```

The app is then available at `http://localhost:8080`. Set `API_PROXY_TARGET` to the URL where Nginx should forward API
requests; in a Compose setup this is typically the backend service name (e.g. `http://backend:5000`).

The bundled Nginx config disables proxy buffering on `/api/` and uses a long read timeout so Server-Sent Events flow
through unchanged.
