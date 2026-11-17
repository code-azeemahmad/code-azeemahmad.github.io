# Architecture Rule

- Astro is the static site framework and owns routes, layouts, metadata, and static content.
- React is used for interactive UI. The chat workspace is one primary React island hydrated with `client:load`.
- Keep the project compatible with Astro `output: "static"` and GitHub Pages.
- No server endpoints, API routes, database, authentication backend, or server runtime in this version.
- Keep provider calls behind a small client-side provider abstraction.
- Keep retrieval, provider integration, conversation persistence, and presentation in separate modules.
- Any architecture change requires an update to `docs/02-architecture/architecture.md` and an ADR in `decisions.md`.
