# Security and Privacy Requirements

## Threat model
This is a public static website. Visitors control their browsers and can inspect all downloaded HTML, JavaScript, JSON, and assets. There is no trusted server in the initial deployment.

## API credentials
- Never embed an owner/shared provider key in frontend source, static environment variables, JSON, or built assets.
- GitHub Actions secrets do not make a key safe if the build injects it into public JavaScript.
- BYOK credentials belong to the visitor. Keep them in memory by default.
- If optional key persistence is ever added, make it explicit, explain browser-profile risks, and provide a clear delete action.
- Do not log, transmit to telemetry, or persist credentials unintentionally.

## Browser storage
- localStorage is accessible to scripts running on the same origin and to anyone using the same browser profile.
- Do not store passwords, authentication tokens, or sensitive personal data.
- Validate and version stored conversation data.
- Handle corrupt, stale, or oversized values safely.
- Provide delete-one, clear-all, and export controls with clear user feedback.

## Content and rendering
- Treat chat messages, imported content, retrieved documents, and model output as untrusted.
- Render Markdown without arbitrary raw HTML by default.
- Sanitize any explicitly supported HTML and review URL protocols before making links clickable.
- Never execute model-generated code, HTML, or tool instructions.
- Protect against prompt injection: retrieved content cannot override system/developer instructions or authorize actions.

## Privacy disclosures
Explain that:
- Conversations are stored in the visitor's browser.
- History is not synced across devices.
- People sharing the same browser profile may be able to view local history.
- With BYOK, prompts and retrieved portfolio context are sent directly to the selected provider.
- Provider billing, retention, and data processing are governed by that provider.

## Static hosting
- GitHub Pages has no private runtime environment for this site.
- Do not add server-only routes or assume build secrets remain private after bundling.
- Keep dependencies updated and review security advisories.

## Incident response
If a credential is accidentally committed or published, revoke/rotate it immediately, remove it from active use, inspect repository history and deployed assets, and document the incident. Deleting a key from the latest commit alone does not invalidate it.
