# Development Roadmap

Build incrementally. Do not begin later phases until earlier dependencies are stable.

## Phase 1 — Project foundation
- Create Astro project with TypeScript.
- Add React integration and Tailwind CSS.
- Configure static output.
- Establish lint/test/build scripts.
- Confirm GitHub Pages project-site base-path strategy.

## Phase 2 — Design system and shell
- Define tokens and responsive layout.
- Build Astro layout, SEO component, header/footer as needed.
- Build React chat workspace shell.
- Implement desktop sidebar and mobile drawer.

## Phase 3 — Welcome and featured portfolio chats
- Create profile and portfolio content data models.
- Add verified portfolio content.
- Create featured chat templates.
- Implement welcome screen and suggested prompts.
- Ensure featured conversations work without an API key.

## Phase 4 — Conversation management
- New conversation.
- Fork featured template.
- Rename/delete/search conversations.
- Versioned localStorage persistence.
- Export and clear history.

## Phase 5 — Message experience
- Markdown rendering and safe links.
- Code highlighting.
- Copy response.
- Loading, error, stop, retry, and empty states.
- Accessibility and responsive refinements.

## Phase 6 — Client-side retrieval
- Load and normalize Markdown/JSON knowledge.
- Implement chunking and keyword search.
- Add source IDs and references.
- Evaluate retrieval against representative portfolio questions.
- Add precomputed semantic embeddings only if justified.

## Phase 7 — BYOK provider integration
- Select and verify a browser-compatible provider/SDK.
- Implement provider abstraction.
- Add in-memory key configuration.
- Implement streaming/cancellation where supported.
- Add privacy disclosures and failure handling.
- Confirm no key enters built assets or logs.

## Phase 8 — Quality and hardening
- Unit/component/E2E tests.
- Security review.
- Performance and accessibility review.
- Verify static output and base-path behavior.

## Phase 9 — GitHub Pages release
- Add Actions deployment workflow.
- Deploy to GitHub Pages.
- Test deployed paths, assets, and chat behavior.
- Document release and known limitations.
