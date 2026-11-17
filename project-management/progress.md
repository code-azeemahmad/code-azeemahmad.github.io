# Project Progress

Last updated: 2026-11-17

## Current phase
Phase 8 & 9: Quality, Hardening & GitHub Pages Deployment (Completed & Verified) — Project Complete

## Completed
- Inspected repository and preserved legacy single-page portfolio into `legacy/index.html`.
- Added `.gitignore` ignoring build artifacts, caches, dependencies, and OS alternate data streams.
- Configured `package.json` with Astro 7, React 19, Tailwind CSS v4 (`@tailwindcss/vite`), and TypeScript strict tooling.
- Configured `tsconfig.json` extending `astro/tsconfigs/strict` with path aliases (`@/*`).
- Configured `astro.config.mjs` with static output (`output: 'static'`), React integration, Tailwind Vite plugin, and base/site settings honoring custom domain `https://azeemahmad.me`.
- Created `public/` directory structure with `CNAME` and `favicon.svg`.
- Implemented `Layout.astro` with semantic HTML5 and SEO meta tags.
- Designed ChatGPT-inspired theme tokens and subtle scrollbars in `src/styles/global.css`.
- Built reusable accessible UI primitives: `Button`, `Badge`, `Dialog`.
- Installed and integrated `lucide-react` icons.
- Built responsive desktop collapsible `Sidebar` with featured portfolio topics, local history placeholder, profile card, and settings trigger.
- Built accessible mobile slide-over `MobileDrawer` with backdrop, keyboard Escape navigation, and focus management.
- Built `ChatHeader` with mobile menu trigger, title, live status badge, and quick actions.
- Built `WelcomeScreen` with greeting, owner bio summary, and interactive suggested prompt cards.
- Built `ChatComposer` with auto-resizing textarea, Enter to send, Shift+Enter for newline, send/stop button, and grounding disclaimer.
- Built `SettingsModal` supporting BYOK provider configuration, in-memory privacy disclosures, and local data reset.
- Defined strict TypeScript content models in `src/types/portfolio.ts` (`Profile`, `Project`, `Product`, `SkillCategory`, `ExperienceItem`, `EducationItem`, `FeaturedChatTemplate`).
- Populated structured JSON files in `src/data/` (`profile.json`, `projects.json`, `products.json`, `skills.json`, `experience.json`, `education.json`) using verified facts and explicit placeholders.
- Synchronized Markdown knowledge files in `src/content/portfolio/` (`biography.md`, `projects.md`, `products.md`, `skills.md`, `experience.md`, `education.md`).
- Built 6 immutable featured chat templates under `src/data/featured-chats/` (`about-me.json`, `projects.json`, `experience.json`, `products.json`, `skills.json`, `contact.json`) with verified dialogue and suggested follow-up questions.
- Built centralized typed loader `src/data/index.ts`.
- Integrated immutable template forking and instant topic loading into `ChatApplication.tsx` and linked `WelcomeScreen` prompts directly to featured chats.
- Installed `react-markdown` and `remark-gfm` for rich markdown formatting.
- Defined chat and persistence types in `src/types/chat.ts` (`ChatMessage`, `Conversation`, `ConversationStorageSchema`).
- Built versioned `localStorage` persistence layer in `src/lib/storage/conversationStorage.ts` with schema validation, error resilience, and automatic title generation.
- Built export helpers for both formatted Markdown (`.md`) and raw structured JSON (`.json`) files with safe filename sanitization.
- Created `useConversationManager` custom React hook providing reactive conversation lifecycle (start, fork template, select, rename, delete, clear all, search, export).
- Built `MarkdownRenderer` supporting GFM tables, lists, blockquotes, safe protocol links (`http/https/mailto`), and syntax-highlighted code blocks with copy-code feedback.
- Built `MessageItem` component handling user/assistant avatars, responsive bubbles, copy feedback, and grounding badges.
- Enhanced `Sidebar` with real-time conversation title/content search, rename dialog, delete controls, and clear-all confirmation.
- Enhanced `ChatHeader` with export dropdown menu and quick-delete actions.
- Installed and configured `fuse.js` (`v7.5.0`) for fast in-browser fuzzy and keyword retrieval.
- Defined RAG types in `src/types/rag.ts` (`KnowledgeChunk`, `RetrievalResult`, `SourceCitation`, `GroundedContext`).
- Built deterministic corpus generator in `src/lib/rag/knowledgeBase.ts` transforming structured portfolio facts into indexed knowledge chunks with metadata and source IDs.
- Implemented weighted search engine in `src/lib/rag/retrievalEngine.ts` with multi-token queries, stemming, and category-intent boosting.
- Implemented injection-safe bounded prompt and context builder in `src/lib/rag/contextBuilder.ts`.
- Implemented offline grounded response generator in `src/lib/rag/groundedResponder.ts` returning synthesized factual answers and verified citations.
- Updated `MessageItem.tsx` to render interactive, clickable source reference badges linking to external repositories or demos.
- Created automated retrieval test suite in `tests/rag-evaluation.test.ts` running 10 test queries across all portfolio domains and verified 10/10 tests pass (100% accuracy).
- Defined multi-provider LLM interfaces in `src/lib/ai/types.ts` (`gemini`, `openai`, `groq`, `anthropic`).
- Implemented native browser-compatible streaming adapters (`GeminiAdapter`, `OpenAIAdapter`, `AnthropicAdapter`) using standard browser `fetch` and Server-Sent Events (SSE).
- Created `chatOrchestrator.ts` connecting RAG retrieval, prompt injection defense, conversation history, and live token streaming.
- Connected in-memory BYOK credentials, provider selection, and API key management into `SettingsModal` and `ChatApplication`.
- Built live generation stop controls (`AbortController`) and user-friendly provider error handling.
- Built comprehensive unit & integration test suites in `tests/`:
  - `storage.test.ts`: Title capitalization, bounds, and schema verification.
  - `security.test.ts`: Protocol validation and prompt boundary encapsulation.
  - `provider.test.ts`: Adapter dispatching and cancellation signal tests.
  - `rag-evaluation.test.ts`: 10-query cross-domain retrieval benchmark.
- Built themed `404.astro` error page with navigation back to chat workspace.
- Configured automated GitHub Actions deployment workflow in `.github/workflows/deploy.yml` with `upload-pages-artifact@v3` and `deploy-pages@v4`.
- Updated `docs/08-deployment/github-pages.md` with verified release checklist items.
- Overhauled visual design to match Anthropic Claude warm editorial design system (`DESIGN.md`):
  - Cream/parchment light theme (`#faf9f5`) and deep charcoal dark theme (`#181715`).
  - Dark/Light mode switcher toggle with dark theme as default, persisted in `localStorage`.
  - Scaled typography by +1px (`17px` desktop base, `16px` mobile, `15px` message text).
- Performed end-to-end mobile responsiveness hardening across all screens:
  - Fixed mobile drawer conflict by removing duplicate close button and synchronizing top-right close action.
  - Implemented smooth CSS slide-in/out transitions and backdrop opacity fades.
  - Resolved flex centering clipping on short mobile screens using `min-h-full my-auto`.
  - Added dynamic viewport height (`100dvh`) support to prevent mobile address bar overlap.
  - Added safe area padding (`env(safe-area-inset-bottom)`) for iOS notched devices.
  - Optimized touch targets, message bubble widths, and header title truncation on narrow 320px–375px viewports.
  - Tested and deployed to live production custom domain `https://azeemahmad.me`.
- Authored production-ready `README.md` with architecture details, quick start commands, testing instructions, deployment guidelines, and security policies.
- Implemented permanent preloaded portfolio chats and storage protection:
  - Canonical portfolio conversations (About Azeem Ahmad, Software Projects, Professional Experience, Technical Skills & Stack, Products & Platforms, Contact & Links) are derived from source-controlled featured chat templates and automatically seeded on initialization or when storage is cleared.
  - Preloaded chats are marked with `isPreloaded: true` and cannot be deleted or renamed (action buttons hidden in sidebar and header, actions blocked in state manager).
  - Clearing conversation history clears only custom visitor-created chats, retaining all preloaded portfolio chats.
  - Rule 8 compliant: Continuing a preloaded chat automatically forks it into a visitor-owned conversation without mutating the preloaded template.
- Verified static build generates `dist/index.html`, `dist/404.html`, `dist/CNAME`, and assets with 0 errors.

## In progress
- None.

## Blocked
- None.

## Decisions needed from owner
- Replace remaining explicit placeholders in `src/data/` and `src/content/portfolio/` when additional verified achievements are available.

## Latest verification
- Diagnostics check (`astro check`): Passed (0 errors, 0 warnings, 0 hints across 41 files).
- Type check (`tsc --noEmit`): Passed (0 errors).
- Automated test suite (`npm test`): Passed (32/32 tests across all test suites, 100% pass rate).
- Production build (`npm run build`): Passed (2 pages generated in `dist/` in 582ms).
- Secret scan: Passed (zero private credentials or keys present in build assets).
- Deployment: Live production verified at `https://azeemahmad.me`.

Update this file only with work that has actually been completed and verified.
