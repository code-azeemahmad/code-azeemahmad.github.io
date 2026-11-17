# Security Rule

- Never place a private/shared LLM API key in source code, `PUBLIC_` environment variables, static JSON, or the browser bundle.
- Use visitor BYOK for live provider access in the strict static deployment.
- Keep BYOK credentials in memory by default; clearly disclose risks before offering persistence.
- Do not log credentials or sensitive chat content.
- Treat user messages, imported data, retrieved documents, and model output as untrusted.
- Render Markdown safely; do not enable arbitrary raw HTML from model output without a deliberate sanitizer and security review.
- Do not execute model-generated code or tool instructions.
- Do not claim localStorage provides authentication, encryption, or secure user isolation.
- Follow `docs/06-security/security.md`.
