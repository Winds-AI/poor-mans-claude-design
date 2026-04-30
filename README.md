# Poor Man's Claude Design

A small Vite + React + Tailwind workspace for generating and browsing design variants.

## Commands

- `pnpm dev` starts the local design browser.
- `pnpm build` type-checks and builds the app.
- `pnpm lint` runs ESLint.

## Design Workflow

- Add design files under `src/designs/wireframe` or `src/designs/hifi`.
- Use `components` for isolated UI pieces and `pages` for full-screen compositions.
- Start every design file with a `PURPOSE` block so future sessions keep the product context.
- Register new variants in `src/designs/registry.ts`.
