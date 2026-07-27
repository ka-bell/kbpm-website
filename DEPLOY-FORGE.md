# Deploy (Laravel Forge)

This is a **Next.js 15** app (not TanStack Start / not static-only).

## Forge site settings

- **Node version:** 20+
- **Build command:** `npm ci && npm run build`
- **Start / daemon:** `npm run start` (listens on port **3000**)
- **Web directory:** leave as site root (do **not** point nginx only at `/public` for SSR)
- Point nginx / proxy to the Node process on `127.0.0.1:3000`

## Local

```bash
npm install
npm run dev    # http://localhost:8080
npm run build
npm run start  # http://localhost:3000
```
