# Azeem Ahmad — Conversational AI Portfolio

A modern, static-first, ChatGPT-inspired conversational portfolio website built with **Astro 7**, **React 19 Islands**, **TypeScript**, and **Tailwind CSS v4**.

Designed for static hosting on **GitHub Pages** with **zero server backends**, **zero databases**, and strict client-side privacy.

🌐 **Live URL:** [https://azeemahmad.me](https://azeemahmad.me)  
📦 **Repository:** [code-azeemahmad.github.io](https://github.com/code-azeemahmad/code-azeemahmad.github.io)

---

## ✨ Key Features

- **ChatGPT-Style Conversational Interface:**
  - Modern, responsive chat workspace with desktop collapsible sidebar and accessible mobile slide-over drawer.
  - Interactive suggested prompts and welcome screen.
  - Rich Markdown rendering with GitHub Flavored Markdown (GFM) tables, lists, blockquotes, and syntax-highlighted code blocks with one-click copy actions.
  - Export chat history to both formatted Markdown (`.md`) and structured JSON (`.json`).

- **Preloaded Featured Conversations:**
  - 6 immutable featured conversations exploring **About Me**, **Projects**, **Experience**, **Products**, **Skills**, and **Contact**.
  - Works instantly out of the box **without requiring an external API key**.
  - Forking a featured conversation automatically creates a visitor-owned local chat.

- **Client-Side RAG (Retrieval-Augmented Generation):**
  - Powered by in-browser fuzzy and keyword search using **Fuse.js**.
  - Deterministic knowledge chunking from structured portfolio data with source citations.
  - Intent boosting, token stemming, and prompt injection defense tags (`<PORTFOLIO_CONTEXT>`).
  - Synthesized offline factual answers when no external AI provider is configured.

- **Multi-Provider BYOK (Bring Your Own Key) Live Streaming:**
  - Direct browser-to-provider streaming via Server-Sent Events (SSE) and Fetch Streams without proxy servers.
  - Supported providers:
    - **Google Gemini** (`gemini-2.0-flash`, `gemini-1.5-pro`)
    - **OpenAI** (`gpt-4o`, `gpt-4o-mini`)
    - **Groq** (`llama-3.3-70b-versatile`, `mixtral-8x7b-32768`)
    - **Anthropic Claude** (`claude-3-5-sonnet-20241022`, `claude-3-5-haiku-20241022`)
  - Real-time generation stop control via `AbortController`.

- **Strict Security & Privacy First:**
  - **In-Memory Key Storage:** User API keys are stored in volatile JavaScript memory only and are never saved to `localStorage`, cookies, or remote analytics.
  - **Zero Secret Leakage:** No private API keys or owner credentials exist in source code or static build bundles.
  - **Safe Links:** Strict URL protocol verification allowing only `https://`, `http://`, and `mailto:` links, blocking unsafe protocols like `javascript:`.
  - **Local Persistence:** Visitor conversations are stored exclusively in their own browser's `localStorage` (schema versioned).

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework & Pages** | [Astro 7](https://astro.build/) (Static Site Generation, SEO metadata) |
| **UI Components** | [React 19](https://react.dev/) (Interactive chat workspace island) |
| **Styling & Tokens** | [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`), custom theme tokens |
| **Icons & Typography** | [Lucide React](https://lucide.dev/), Inter font family |
| **Markdown & Formatting** | [react-markdown](https://github.com/remarkjs/react-markdown), [remark-gfm](https://github.com/remarkjs/remark-gfm) |
| **In-Browser RAG** | [Fuse.js](https://www.fusejs.io/) (Fuzzy search and retrieval ranking) |
| **Language & Tooling** | TypeScript 5.7+ (strict mode), Node.js 22+, tsx |
| **Deployment** | [GitHub Pages](https://pages.github.com/) via automated GitHub Actions |

---

## 📁 Repository Structure

```text
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions static deployment workflow
├── docs/                           # Architecture, security, and product documentation
│   ├── 01-product/                 # PRD and requirements
│   ├── 02-architecture/           # Architecture, decisions, and tech stack
│   ├── 03-experience/             # UI/UX design tokens and layout specs
│   ├── 04-content/                # Content standards and schemas
│   ├── 05-ai/                     # RAG pipeline and provider specifications
│   ├── 06-security/               # Security and privacy architecture
│   ├── 07-quality/                # Testing strategy and benchmarks
│   └── 08-deployment/             # GitHub Pages deployment guide
├── project-management/             # Roadmap, task tracker, progress, and changelog
├── public/
│   ├── CNAME                       # Custom domain (azeemahmad.me)
│   └── favicon.svg                 # Site favicon
├── src/
│   ├── components/
│   │   ├── chat/                  # Chat application island & subcomponents
│   │   │   ├── composer/          # Auto-resizing textarea & send controls
│   │   │   ├── header/            # Chat header & action buttons
│   │   │   ├── messages/          # Message items, markdown renderer, citations
│   │   │   ├── modals/            # BYOK settings modal & privacy disclosures
│   │   │   ├── sidebar/           # Desktop sidebar & mobile drawer
│   │   │   ├── welcome/           # Suggested prompt cards & intro
│   │   │   └── ChatApplication.tsx# Primary React chat island
│   │   └── ui/                    # Reusable primitives (Button, Badge, Dialog)
│   ├── content/
│   │   └── portfolio/             # Markdown portfolio knowledge source
│   ├── data/
│   │   ├── featured-chats/        # 6 immutable featured conversation templates
│   │   ├── *.json                 # Structured profile, projects, products, skills, etc.
│   │   └── index.ts               # Centralized typed data loader
│   ├── hooks/                     # Custom React hooks (useConversationManager, etc.)
│   ├── layouts/                   # Astro HTML shell & SEO meta layout
│   ├── lib/
│   │   ├── ai/                    # Multi-provider streaming adapters & orchestrator
│   │   ├── rag/                   # Knowledge chunker, retrieval engine, context builder
│   │   └── storage/               # Versioned localStorage adapter & export utilities
│   ├── pages/
│   │   ├── index.astro            # Main static entry point
│   │   └── 404.astro              # Themed 404 error page
│   ├── styles/
│   │   └── global.css             # Tailwind v4 theme tokens & custom scrollbars
│   └── types/                     # TypeScript definitions (chat, portfolio, rag)
├── tests/                         # Automated unit, security, and RAG evaluation tests
├── astro.config.mjs               # Astro static configuration
├── package.json                   # Project metadata & scripts
└── tsconfig.json                  # Strict TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20.0.0 or higher (Node.js 22 LTS recommended)
- `npm` v10.0.0 or higher

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/code-azeemahmad/code-azeemahmad.github.io.git
cd code-azeemahmad.github.io
npm install
```

### Development Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Astro development server at `http://localhost:4321` |
| `npm run check` | Runs Astro diagnostics and type checks (`astro check`) |
| `npm test` | Runs the automated test suite (Storage, Security, Providers, RAG retrieval) |
| `npm run build` | Validates types and compiles static output to the `dist/` folder |
| `npm run preview` | Serves the generated static `dist/` build locally for preview |

---

## 🧪 Testing & Verification

The project includes an automated test runner (`tests/run-all-tests.ts`) executing 28 test assertions:

```bash
npm test
```

Test suites include:
1. **Storage Layer Tests (`tests/storage.test.ts`):** Validates title truncation, capitalization, schema versioning, and sanitization.
2. **Security & Sanitization Tests (`tests/security.test.ts`):** Validates safe URL protocols (`http`, `https`, `mailto`), blocks dangerous protocols (`javascript:`, `data:`), and verifies RAG prompt boundary encapsulation.
3. **AI Provider Registry Tests (`tests/provider.test.ts`):** Validates adapter dispatching (Gemini, OpenAI, Groq, Anthropic) and stream cancellation handling via `AbortController`.
4. **Client-Side RAG Evaluation (`tests/rag-evaluation.test.ts`):** Benchmarks 10 cross-domain user queries (biography, skills, education, projects, products, contact) with a **100% retrieval accuracy rate**.

---

## 🚢 GitHub Pages Deployment

The site is configured for automatic continuous deployment to GitHub Pages via **GitHub Actions**.

### How It Works:
1. Pushing to the `main` branch triggers `.github/workflows/deploy.yml`.
2. The workflow installs dependencies, runs `npm run check`, executes `npm test`, builds the static site with `npm run build`, and publishes `dist/` directly to GitHub Pages using `actions/deploy-pages@v4`.
3. The custom domain `azeemahmad.me` is served automatically via the root `CNAME` file located in `public/CNAME`.

### Configuring GitHub Repository Settings:
1. Navigate to **Settings** > **Pages** in the repository.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Under **Custom domain**, enter `azeemahmad.me` and verify DNS records with HTTPS enabled.

---

## 🔒 Security & Privacy Policy

- **No Remote Credential Logging:** Any LLM API key entered into the Settings modal is held **only in volatile browser memory** for the duration of the current tab session.
- **Client-Side Execution:** Inquiries and document retrieval occur entirely inside the user's browser using local JavaScript data structures.
- **Data Retention:** Conversation histories are saved only in the visitor's local browser storage (`localStorage`). Clearing browser cache or clicking "Clear All History" immediately purges all conversation data.

---

## 📝 Updating Portfolio Facts

All portfolio information is stored in source-controlled structured data and Markdown:
- **Biographical & Profile Data:** `src/data/profile.json` and `src/content/portfolio/biography.md`
- **Projects:** `src/data/projects.json` and `src/content/portfolio/projects.md`
- **Products:** `src/data/products.json` and `src/content/portfolio/products.md`
- **Skills:** `src/data/skills.json` and `src/content/portfolio/skills.md`
- **Work Experience:** `src/data/experience.json` and `src/content/portfolio/experience.md`
- **Education:** `src/data/education.json` and `src/content/portfolio/education.md`
- **Featured Templates:** `src/data/featured-chats/`

---

## 📄 License & Attribution

Designed and engineered by **Azeem Ahmad**.  
Open-source under the [MIT License](LICENSE).
