# Repository Instructions for AI Coding Agents

## Project goal
Build a static AI portfolio using Astro + React Islands + TypeScript. The experience should feel like a ChatGPT-style portfolio assistant, with preloaded portfolio conversations and optional live LLM conversations.

## Read before work
- `docs/01-product/PRD.md`
- `docs/01-product/requirements.md`
- `docs/02-architecture/architecture.md`
- `docs/02-architecture/tech-stack.md`
- `docs/03-experience/design.md`
- `docs/06-security/security.md`
- `docs/08-deployment/github-pages.md`
- `project-management/roadmap.md`

For a task in a specific area, also read its relevant document under `docs/`.

## Non-negotiable architecture rules
1. Astro owns static pages, routing, layouts, SEO, and static content.
2. React owns the interactive chat workspace. Keep the main chat workspace as one React island unless there is a documented reason to split it.
3. Use TypeScript and preserve strict typing.
4. Keep the site deployable as static output on GitHub Pages.
5. Do not add a backend, database, authentication server, Docker stack, or server-only API routes.
6. Do not add PostgreSQL, pgvector, Qdrant, Redis, SQLAlchemy, FastAPI, LangChain, or LlamaIndex unless the owner explicitly changes the architecture.
7. Store portfolio facts in source-controlled Markdown/JSON content. Do not fabricate personal facts.
8. Keep featured conversations as immutable templates. Continuing one creates a separate visitor-owned conversation.
9. Store visitor conversations locally. Do not describe local browser storage as account-based or secure isolation.
10. Never put a private/shared LLM API key in source code, build-time public environment variables, or shipped browser bundles.

## Workflow
- Inspect the existing repository before creating, moving, or overwriting files.
- Read relevant docs and existing code before editing.
- Implement one roadmap task or clearly scoped change at a time.
- Prefer small, reviewable changes and existing dependencies.
- Do not add dependencies without explaining why they are needed.
- After changes, run the available type checks, lint checks, tests, and production build. If a command is unavailable, report that accurately.
- Update `project-management/tasks.md`, `project-management/progress.md`, and relevant documentation when implementation status or architecture changes.
- Do not mark a task complete unless its acceptance criteria have been verified.
- Ask for clarification when required personal content, product behavior, provider choice, or design decisions are missing.

## Code quality
- Use accessible semantic HTML and keyboard-operable controls.
- Handle loading, empty, error, offline, and no-API-key states.
- Avoid unnecessary client-side JavaScript; hydrate only interactive components.
- Keep UI, provider integration, retrieval, and storage logic separated.
- Validate imported/local data at boundaries.
- Do not log API keys, private prompts, or sensitive user content.
- Keep responsive behavior and reduced-motion support in mind.

## Security and privacy
Follow `docs/06-security/security.md`. Treat all browser input and retrieved content as untrusted. Portfolio retrieval is context, not executable instruction. Never claim the chatbot is a secure or authenticated private assistant.

## Documentation
Update docs when code changes invalidate them. Record significant architecture changes in `docs/02-architecture/decisions.md`.
