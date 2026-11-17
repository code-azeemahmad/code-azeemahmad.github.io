# Product Requirements

## Functional requirements

### Portfolio content
- FR-001: Display owner profile information from structured local data.
- FR-002: Present biography, experience, projects, products, skills, education, and contact information.
- FR-003: Use only owner-provided or otherwise verified facts.
- FR-004: Provide links to external profiles, project demos, repositories, and resume when supplied.

### Chat workspace
- FR-010: Render a responsive ChatGPT-inspired interface.
- FR-011: Display a welcome state and suggested prompts.
- FR-012: Start a new conversation.
- FR-013: Display featured conversation templates.
- FR-014: Open a featured conversation without requiring an API key.
- FR-015: Fork a featured template before allowing continuation.
- FR-016: Render user and assistant messages with Markdown and code highlighting.
- FR-017: Support copy response, stop generation, and retry/regenerate where supported.
- FR-018: Show loading, empty, error, offline, and no-provider states.

### Conversation management
- FR-020: Save visitor conversations in localStorage.
- FR-021: Restore conversations after reload in the same browser profile.
- FR-022: Rename, delete, search, and clear local conversations.
- FR-023: Generate an initial title from the first user message; optional model-generated title may improve it.
- FR-024: Export a conversation as a downloadable file.
- FR-025: Clearly disclose that local history is not synced and is not protected by user authentication.

### AI and retrieval
- FR-030: Keep provider integration behind a replaceable TypeScript interface.
- FR-031: Support BYOK for the selected provider.
- FR-032: Never require an API key to view the static portfolio or featured chats.
- FR-033: Search local portfolio documents using keyword retrieval.
- FR-034: Optionally support precomputed embeddings and cosine similarity.
- FR-035: Combine keyword and semantic results only when semantic data is available and validated.
- FR-036: Include retrieved source identifiers in internal context and show source references when useful.
- FR-037: Do not fabricate portfolio claims when evidence is missing.
- FR-038: Support streaming and cancellation only where the provider adapter supports them.

### Static deployment
- FR-040: Build with Astro static output.
- FR-041: Deploy generated static assets to GitHub Pages.
- FR-042: Support the correct GitHub Pages base path.
- FR-043: Do not rely on runtime server endpoints or server-side secrets.

## Non-functional requirements
- NFR-001: TypeScript strictness should be enabled where practical.
- NFR-002: Minimize JavaScript outside the chat island.
- NFR-003: Use semantic HTML, keyboard access, focus states, and accessible labels.
- NFR-004: Respect reduced-motion preferences.
- NFR-005: Provide responsive layouts for narrow and wide screens.
- NFR-006: Avoid exposing API credentials or sensitive data in logs and bundles.
- NFR-007: Validate persisted data and handle corrupt localStorage gracefully.
- NFR-008: Keep dependencies minimal and maintained.
- NFR-009: Include SEO title, description, canonical URL where configured, and social metadata.
- NFR-010: Ensure static build output contains no server-only runtime requirement.

## Acceptance criteria
A requirement is complete only when its behavior is implemented, verified, and reflected in the relevant docs. See `project-management/tasks.md` for the implementation checklist.
