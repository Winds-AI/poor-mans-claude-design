Build UI in this Vite React TypeScript app using Tailwind only.

Put design files under `src/designs`:
- `wireframe/components`
- `wireframe/pages`
- `hifi/components`
- `hifi/pages`

Rules:
- Use `components` for isolated UI pieces.
- Use `pages` for full-screen compositions.
- Ask the user about purpose first before designing.
- The preferred workflow is collaborative: the user explains the purpose, audience, key actions, priorities, and constraints, and you capture the useful parts in the file.
- If the user wants to explore, move fast, or is not sure yet, that is fine. Ask first, then make reasonable assumptions and keep going.
- Start each design file with a short `PURPOSE` comment block.
- In the `PURPOSE` block, include only what is useful for that specific file.
- Prefer short fields such as `Goal`, `Primary user`, `Core actions`, `Priority`, `Constraints`, `Context`, `State`, or `Business goal`.
- Keep the `PURPOSE` block about real usage and product intent, not just appearance.
- Keep wireframes low-fidelity, consistent, and structure-first.
- Wireframe entries render inside a shared wireframe style scope. Do not add hifi styling inside wireframe variants.
- Keep hifi work polished, production-like, and visually intentional.
- Create a new variant instead of overwriting an existing one unless the user asked to refine that exact variant.
- Prefer editing the smallest relevant file.
- Do not add custom CSS files unless the user explicitly asks for them.
