# Architecture Decision Records

Record significant decisions here. Do not silently replace an accepted decision; add a dated entry explaining the change.

## ADR-001: Astro + React Islands
- Status: Accepted
- Decision: Astro generates the static site; React powers the primary interactive chat workspace.
- Reason: Static-first output with JavaScript limited to interactive areas.
- Consequence: Keep the chat state within the React island; keep static content and SEO in Astro.

## ADR-002: Static-only GitHub Pages deployment
- Status: Accepted
- Decision: Initial deployment contains static assets only; no backend or server functions.
- Reason: Simple hosting and no runtime infrastructure.
- Consequence: No server-side secret storage or API proxy is available.

## ADR-003: BYOK for live LLM access
- Status: Accepted for initial release
- Decision: Visitors configure their own provider credentials for live LLM requests.
- Reason: A static frontend cannot safely protect an owner-managed shared API key.
- Consequence: Provider setup is optional; curated portfolio content must work without it. Credentials should remain in memory by default.

## ADR-004: Local portfolio knowledge and browser retrieval
- Status: Accepted
- Decision: Store portfolio facts in Markdown/JSON and retrieve relevant content in the browser.
- Reason: The portfolio knowledge base is small and can be shipped with static assets.
- Consequence: No database/vector service; keep retrieval modular and evaluate search quality.

## ADR-005: Browser-local conversation persistence
- Status: Accepted
- Decision: Store conversation history in localStorage.
- Reason: No accounts or backend.
- Consequence: Data is tied to the browser profile and is not securely isolated between people sharing that profile.

## ADR-006: Featured chats are immutable templates
- Status: Accepted
- Decision: Featured conversation JSON files are templates; continuation creates a new local conversation.
- Reason: Preserve the curated original for every visitor.
- Consequence: Template data and visitor history use distinct types/storage paths.
