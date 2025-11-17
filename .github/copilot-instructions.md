## Quick context for AI coding agents

This repository is a Vite + React (ESM) single-page app (source: `package.json`, `vite.config.js`). Key facts to be productive quickly:

- Start / build / lint
  - Dev server: `npm run dev` (Vite). Configured to listen on 0.0.0.0:5174 with strictPort (see `vite.config.js`).
  - Build: `npm run build` and preview with `npm run preview`.
  - Lint: `npm run lint` (ESLint configured for .js/.jsx files).

- App entry & routing
  - Entry point: `src/main.jsx` — wraps `<App />` with `BrowserRouter` and `AppProvider` (Context API).
  - Routes are defined in `src/App.jsx` using React Router v6 (`Routes` / `Route`). Examples: `/meals` maps to `src/components/Meals.jsx`.

- Global state & conventions
  - Global state lives in `src/context/AppContext.jsx`. Important helpers: `addNotification`, `removeNotification`, `setLoadingState`, `loginUser`, `logoutUser`.
  - Notifications auto-remove after 5s (look at `addNotification` implementation).
  - `useAppContext()` throws if used outside provider — preserve this pattern when refactoring.

- UI & design tokens
  - TailwindCSS is the utility framework; tokens and colors are defined in `tailwind.config.js` (e.g., `primary-500` coral color).
  - Components use Tailwind container classes (`container mx-auto`), responsive grid classes, and a shared font setup (`font-display`, `font-sans`).

- Component patterns & examples
  - Components live under `src/components/` and default-export a React component (e.g., `Meals.jsx`, `ListingCard.jsx`).
  - Reusable patterns: Listing components accept a `listing` prop and callbacks like `onBook` / `onSave` (see `Meals.jsx` using `ListingCard`).
  - Animations: `framer-motion` + `AnimatePresence` are used in list transitions (observe `Meals.jsx`).
  - **Recent cleanup (Nov 2025)**: Reduced from 53 → 29 components. Integrated: `NotFound`, `Loading`, `Modal`, `Notification`, `Pagination`, `Skeleton`.

- Utilities
  - `src/utils/helpers.js` contains shared helpers: `formatCurrency`, `formatDate`, `truncateText`, `calculateTotalPrice`, `getRandomImageUrl`, and validators. Use these before adding duplicate utilities.

- Images & placeholders
  - Placeholder images often use Unsplash (`source.unsplash.com`) or hard-coded URLs in components; when adding features prefer `getRandomImageUrl()` or consistent image-loading helper.

- Development tips & pitfalls
  - Vite HMR is bound to port 5174/host 0.0.0.0; when working on multiple local projects, change port in `vite.config.js` or use `--port` override.
  - The project is ESM (`type: "module"` in `package.json`). Use `import`/`export` syntax and default exports for components.
  - No test harness or unit tests present — if adding tests, follow existing ESLint rules and add simple React Testing Library + Vitest setup.

- Good-first edits examples for AI
  - Add a small prop to `ListingCard` (e.g., show `duration`) — update `src/components/ListingCard.jsx` and the few places that render it (`Meals.jsx`, other listing pages).
  - Use `useAppContext()` to show a success notification after a mock booking: call `addNotification('Booked successfully', 'success')` and keep the 5s auto-removal behaviour.

If something in this summary is unclear or you want me to expand specific areas (e.g., routing details, a component contract, or a preferred PR template), tell me which section to expand and I'll update this file.
