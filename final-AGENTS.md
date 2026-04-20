Build UI in this Vite React TypeScript app using Tailwind only.

Put design files under `src/designs`:

- `wireframe/components`
- `wireframe/pages`
- `hifi/components`
- `hifi/pages`

## Rules

### Structure

- `components` for isolated UI pieces; `pages` for full-screen compositions.
- Use skills in `.agents/` when relevant or requested.

### References

- Read `references/` as needed: `references/current/` for the current design/product/state; `references/ideas/` for external inspiration, examples, mood, or visual directions.

### Research

- Use web research for fresh inspiration, real product patterns, competitors, or missing references. Browse targeted (product type, screen, audience, platform, visual direction), not broad. Use web access or Chrome DevTools.
- Pick the right source: Mobbin (real app flows, UX patterns), Figma Community (reusable layouts/structures), Dribbble (visual direction), Awwwards/SiteInspire (expressive web/landing), real competitors (structure, messaging, conversion).
- Keep research concise—gather enough to decide, then design. Don't copy; extract patterns (layout, hierarchy, density, spacing, interaction, state, tone, conversion).
- Save useful screenshots/captures in `references/ideas/` if reusable. When research influences a design, briefly note the patterns in the response or `PURPOSE` block.
- For video references, use `ffmpeg` to extract frames when it helps inspect motion, state, layout, or details.

### Assets

- `assets/` holds PNG/SVG files used in hi-fi designs. Check it first before adding. Prefer real SVGs/PNGs over placeholders for logos, icons, product imagery, brand marks. Keep downloaded/created hi-fi assets there for reuse.
- Asset sources: Lucide (`https://lucide.dev/icons`) for UI icons, SVGL (`https://svgl.app`) for brand logos, Iconify (`https://icon-sets.iconify.design/`) for broader/specific sets.

### Purpose

- Ask the user about purpose before designing. Serious work depends on staying aligned with their purpose context—capture and maintain it as designs change.
- Preferred workflow is collaborative: user explains purpose, audience, key actions, priorities, constraints; you capture the useful parts. If they want to explore or are unsure, ask first, then make reasonable assumptions and keep moving.
- Start each design file with a short `PURPOSE` comment block. Include only what's useful for that file—concise, factual, no filler. Update it when direction changes so it stays the source of truth.
- Prefer short fields: `Goal`, `Primary user`, `Core actions`, `Priority`, `Constraints`, `Context`, `State`, `Business goal`. Focus on real usage and product intent, not appearance.

### Fidelity

- Wireframes: low-fidelity, consistent, structure-first. Entries render inside a shared wireframe style scope—no hifi styling in wireframe variants.
- Hi-fi: polished, production-like, visually intentional.

### Editing

- Create a new variant instead of overwriting, unless the user asked to refine that exact one.
- Edit the smallest relevant file. No custom CSS files unless explicitly requested.
