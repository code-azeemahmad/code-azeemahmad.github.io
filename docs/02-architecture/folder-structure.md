# Application Folder Structure

The following is the target application structure. Adapt it to the actual scaffold and avoid creating empty folders without a current use.

```text
ai-portfolio/
├── .agents/
│   ├── rules/
│   └── workflows/
├── docs/
├── project-management/
├── public/
│   ├── images/
│   ├── icons/
│   └── documents/
│       └── resume.pdf
├── src/
│   ├── components/
│   │   ├── astro/
│   │   ├── chat/
│   │   │   ├── sidebar/
│   │   │   ├── messages/
│   │   │   ├── input/
│   │   │   └── welcome/
│   │   └── ui/
│   ├── layouts/
│   ├── pages/
│   ├── content/
│   │   └── portfolio/
│   ├── data/
│   │   └── featured-chats/
│   ├── hooks/
│   ├── lib/
│   │   ├── ai/
│   │   ├── rag/
│   │   ├── storage/
│   │   └── utils/
│   ├── styles/
│   └── types/
├── tests/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── AGENTS.md
├── GEMINI.md
├── CLAUDE.md
└── README.md
```

## Rules
- Keep Astro page/layout files separate from React chat components.
- Keep source portfolio content separate from UI configuration.
- Keep provider-specific code inside `src/lib/ai/`.
- Keep retrieval code inside `src/lib/rag/`.
- Keep browser persistence behind a storage module.
- Do not create `backend/`, `database/`, or `auth/` directories for the initial static version.
