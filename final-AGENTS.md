Build UI in this Vite React TypeScript app using Tailwind only.

Put files under `src/designs` using:
- `wireframe/components`
- `wireframe/pages`
- `hifi/components`
- `hifi/pages`

Rules:
- Use `components` for isolated UI pieces.
- Use `pages` for full-screen compositions.
- Keep wireframes low-fidelity and structure-first.
- Wireframe entries render inside a shared wireframe style scope. Do not add hifi styling inside wireframe variants.
- Keep hifi work polished, production-like, and visually intentional.
- Create a new variant instead of overwriting an existing one unless the user asked to refine that exact variant.
- Prefer editing the smallest relevant file.
- Do not add custom CSS files unless the user explicitly asks for them.
