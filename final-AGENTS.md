Build UI in this Vite React TypeScript app using Tailwind only.

Put design files under `src/designs`:
- `wireframe/components`
- `wireframe/pages`
- `hifi/components`
- `hifi/pages`

Rules:
- Use `components` for isolated UI pieces.
- Use `pages` for full-screen compositions.
- Use skills listed in `.agents/` whenever they are relevant to the task, applicable to the work, or explicitly mentioned by the user.
- Read the `references/` folder as necessary. It is the place for references the user provides that may be useful for design work.
- Treat `references/current/` as references for the current design, product, project, or existing state.
- Treat `references/ideas/` as references for external inspiration, internet examples, mood, interaction ideas, or visual directions the user likes.
- Use the `assets/` folder for the actual PNG and SVG files used and maintained in hi-fi designs.
- For hi-fi designs, prefer real SVGs and PNGs when they are available instead of rough placeholder shapes, especially for logos, icons, product imagery, and brand marks.
- Check `assets/` first before adding new visual assets.
- If an asset is missing and the design needs one, use good sources for the right job: Lucide (`https://lucide.dev/icons`) for clean UI icons, SVGL (`https://svgl.app`) for brand/product logos, and Iconify icon sets (`https://icon-sets.iconify.design/`) when a broader or more specific icon set is needed.
- Keep downloaded or created hi-fi SVG/PNG assets in `assets/` so future variants can reuse them.
- Ask the user about purpose first before designing.
- Serious design work depends on staying aligned with the human's purpose context. Capture and maintain that context as the design changes.
- The preferred workflow is collaborative: the user explains the purpose, audience, key actions, priorities, and constraints, and you capture the useful parts in the file.
- If the user wants to explore, move fast, or is not sure yet, that is fine. Ask first, then make reasonable assumptions and keep going.
- Start each design file with a short `PURPOSE` comment block.
- In the `PURPOSE` block, include only what is useful for that specific file. Keep it concise, factual, and free of filler or overly helpful wording.
- Update the `PURPOSE` block when the user's direction changes, so it remains the source of truth for why the design exists.
- Prefer short fields such as `Goal`, `Primary user`, `Core actions`, `Priority`, `Constraints`, `Context`, `State`, or `Business goal`.
- Keep the `PURPOSE` block about real usage and product intent, not just appearance.
- Keep wireframes low-fidelity, consistent, and structure-first.
- Wireframe entries render inside a shared wireframe style scope. Do not add hifi styling inside wireframe variants.
- Keep hifi work polished, production-like, and visually intentional.
- Create a new variant instead of overwriting an existing one unless the user asked to refine that exact variant.
- Prefer editing the smallest relevant file.
- Do not add custom CSS files unless the user explicitly asks for them.
