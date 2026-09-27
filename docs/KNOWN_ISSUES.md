# Known Issues & Workarounds

## 1. Local Database Dependency
- **Issue**: The local development server throws connection errors indicating Postgres is unavailable (`connect ECONNREFUSED 127.0.0.1:5432`).
- **Workaround**: Ensure the local Postgres instance is running or the neon connection string is correctly provided in the `.env` file before attempting to fetch Payload data.

## 2. Next.js App Router Hydration Warnings
- **Issue**: Certain client-side states (like time-based logic or localStorage checks) can cause React hydration mismatch warnings if not handled properly.
- **Workaround**: Always wrap localStorage reads or timezone-sensitive logic in `useEffect` and use `useState` to wait until the component has safely mounted on the client.

## 3. Caustics Effect Compatibility
- **Issue**: Previously, WebGL/Shader-based effects failed to initialize smoothly and caused UI breakage.
- **Workaround**: A static CC0 `caustics.jpg` layered with CSS mix-blend modes is being used as a stable, zero-cost, high-performance fallback across the site (Hero, Final CTA, Match Page). Do not revert to the broken WebGL shader.
