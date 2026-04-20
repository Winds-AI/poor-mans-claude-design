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
- Use web research when the task needs fresh design inspiration, real product patterns, competitor examples, or references the user did not provide.
- Use targeted browsing with web access or Chrome DevTools. Search by product type, screen type, audience, platform, and visual direction instead of browsing broadly.
- Prefer practical reference sources for the right job: Mobbin for real app flows and product UX patterns, Figma Community/templates for reusable layouts and UI structures, Dribbble for polished visual direction, Awwwards or SiteInspire for expressive web and landing page inspiration, and real competitor sites for practical structure, messaging, and conversion patterns.
- Keep research concise. Gather enough references to make better design decisions, then design.
- Do not copy references directly. Extract patterns such as layout, hierarchy, density, spacing, interaction behavior, state changes, visual tone, and conversion strategy.
- Save useful screenshots, downloads, or captured references in `references/ideas/` when they are likely to help future work.
- When research influences a design, briefly mention the useful reference patterns in the response or `PURPOSE` block when relevant.
- When analyzing video references, use `ffmpeg` to break the video into frames when that helps inspect motion, state changes, layout, or visual details.
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
