# Portfolio Content Model

## Source of truth
Owner-verified Markdown and JSON files in `src/content/portfolio/` and `src/data/` are the source of truth for portfolio claims.

## Required content files
Suggested Markdown knowledge documents:
- `biography.md`
- `experience.md`
- `projects.md`
- `products.md`
- `skills.md`
- `education.md`

Suggested structured data:
- `profile.json`
- `projects.json`
- `products.json`
- `skills.json`
- `achievements.json`
- `experience.json`

## Content rules
- Use `[PLACEHOLDER]` for unknown values.
- Include dates and metrics only when verified by the owner.
- Distinguish personal contribution from team outcomes.
- Add source URLs for public projects where possible.
- Keep facts consistent between Markdown and JSON; avoid maintaining duplicate facts manually if one format can be derived from the other.
- Do not add confidential employer/client information without permission.

## Featured conversations
Store templates under `src/data/featured-chats/`:
- `about-me.json`
- `projects.json`
- `experience.json`
- `products.json`
- `contact.json`

Each template should have a stable ID, title, description, and ordered messages. Templates are immutable. Fork the template when the visitor continues the conversation.

## Knowledge retrieval metadata
Each document/chunk should have a stable source ID, title, category, content, and optional public URL. Retrieval must preserve source IDs so the UI can show references.
