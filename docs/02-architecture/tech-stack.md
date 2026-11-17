# Technology Stack

## Selected stack

| Area | Technology | Role |
|---|---|---|
| Static framework | Astro | Static generation, routes, layouts, SEO |
| Interactive UI | React | Chat workspace |
| Language | TypeScript | Application and retrieval logic |
| Styling | Tailwind CSS | Utility styling and responsive design |
| Component primitives | shadcn/ui (React components) | Accessible reusable UI, selectively adopted |
| Motion | Framer Motion | Optional interface transitions |
| Icons | Lucide React | Icons |
| Markdown | React Markdown | Assistant/user Markdown rendering |
| Syntax highlighting | Shiki | Code blocks |
| Notifications | Sonner | Toast notifications |
| AI integration | Vercel AI SDK or provider-native SDK | Use only after confirming browser-side compatibility for the selected provider/version |
| Keyword retrieval | Fuse.js | Local fuzzy/keyword search |
| Semantic retrieval | Precomputed embeddings + cosine similarity | Optional semantic ranking |
| Optional browser embeddings | Transformers.js | Only if measured value justifies model download/runtime cost |
| State | React hooks | Default state management |
| Optional state library | Zustand | Add only if state complexity justifies it |
| Persistence | localStorage | Browser-local conversations/settings |
| Hosting | GitHub Pages | Static deployment |

## Dependency selection rules
- Check current official documentation and package compatibility before installing.
- Prefer the smallest dependency set that meets requirements.
- Do not install both competing libraries for the same responsibility without a documented reason.
- Do not assume an SDK supports browser use merely because it supports TypeScript. Verify CORS, credential handling, streaming, and browser support.
- Do not bundle a large embedding model by default. Start with keyword search and precomputed embeddings if available.
- Use the Tailwind integration compatible with the installed Astro/Vite versions.

## Explicitly excluded from initial architecture
FastAPI, Python backend, SQLAlchemy, Alembic, Pydantic backend schemas, backend API routers, authentication services, JWT, PostgreSQL, pgvector, Qdrant, Redis, Dockerized backend, LangChain, and LlamaIndex.
