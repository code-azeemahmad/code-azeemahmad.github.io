# Architecture — Astro + React Islands

## 1. Overview
The application is a static-first website. Astro generates HTML and static assets. React runs the interactive chat application as one primary island. A local portfolio knowledge base supports retrieval in the browser. An external LLM provider is optional and accessed using visitor BYOK.

## 2. Runtime boundaries

| Concern | Responsibility |
|---|---|
| Routes, page shell, SEO, static content | Astro |
| Interactive chat workspace | React |
| UI styling | Tailwind CSS and shared component primitives |
| Motion | Framer Motion, used selectively |
| Icons | Lucide React |
| Message Markdown | React Markdown with safe rendering |
| Code highlighting | Shiki or a compatible build/runtime strategy |
| Notifications | Sonner |
| Provider requests | Client-side provider adapter |
| Portfolio retrieval | TypeScript client-side retrieval |
| Persistence | localStorage |
| Hosting | GitHub Pages static hosting |

## 3. Astro/React boundary
- Astro renders the page shell and static portfolio routes/content.
- The primary chat workspace is rendered as a React component and hydrated with `client:load`.
- Do not hydrate the entire site unnecessarily.
- Use Astro components for static navigation, footer, SEO, and content sections where appropriate.
- Smaller controls may use lightweight client islands only when there is a clear benefit.

## 4. Request flow
1. Visitor submits a message in the React chat workspace.
2. Chat state validates the input and adds the user message.
3. Retrieval searches the bundled portfolio Markdown/JSON corpus.
4. Context builder selects relevant snippets and source identifiers.
5. If no provider is configured, show curated/local guidance or a clear provider-setup prompt.
6. If BYOK is configured, the provider adapter sends the request directly from the browser.
7. Stream the response when supported.
8. Render the response safely and persist the conversation locally.

## 5. Suggested module boundaries
- `components/astro/`: static Astro components.
- `components/chat/`: React chat workspace and subcomponents.
- `components/ui/`: reusable UI primitives.
- `content/portfolio/`: owner-authored Markdown knowledge.
- `data/`: structured profile, project, skill, and featured-chat data.
- `hooks/`: React hooks for chat, conversations, and local storage.
- `lib/ai/`: provider interface, adapters, prompts, streaming/cancellation.
- `lib/rag/`: loading, chunking, indexing, retrieval, ranking, context assembly.
- `lib/storage/`: versioned conversation persistence.
- `types/`: shared TypeScript types.
- `styles/`: global styles and design tokens.

## 6. Static hosting constraints
GitHub Pages serves files; it does not execute Astro server routes, API endpoints, or server functions. Configure Astro for static output and ensure all asset and route URLs honor the configured `base` path. Do not add an SSR adapter for this architecture.

## 7. Data flow and trust
Portfolio documents are factual source material, not executable instructions. Retrieved snippets must be treated as untrusted text. The assistant prompt should instruct the model to answer portfolio questions only from retrieved evidence and disclose when evidence is absent.

## 8. Future extension
A serverless proxy may be added later to protect an owner-managed provider key, enforce rate limits, and avoid BYOK. That changes the strict-static architecture and must be separately designed, secured, and documented. It is not part of the initial GitHub Pages release.
