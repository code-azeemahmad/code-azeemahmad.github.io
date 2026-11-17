# Testing and Quality Strategy

## Test layers

### Unit tests
- Conversation title generation and message utilities.
- localStorage serialization, migration, validation, and failure handling.
- Retrieval normalization, ranking, deduplication, and source attribution.
- Prompt/context construction and token/size bounds.
- Provider adapter request mapping and cancellation behavior using mocks.

### Component tests
- Welcome screen and suggested prompts.
- Sidebar open/close, featured chats, and conversation history.
- Message rendering, code blocks, copy actions, and error states.
- Composer keyboard behavior and disabled/loading states.
- BYOK settings, masking, and clear-key behavior.

### End-to-end tests
- Load the static home page.
- Open every featured conversation without an API key.
- Fork a featured conversation and verify the template remains unchanged.
- Create, rename, search, reload, and delete a conversation.
- Verify mobile sidebar behavior.
- Verify no-provider and provider-error states.
- Verify a mocked provider stream can be stopped.
- Verify project-site base path links and assets.

### Security checks
- Search built assets for accidental secret patterns and known test keys.
- Verify no private key is included in client bundle.
- Verify Markdown rendering does not execute arbitrary HTML/script.
- Verify external links use safe protocols and appropriate rel attributes.
- Verify localStorage data is validated before use.

## Build checks
Run the scripts actually defined in package.json. At minimum, verify TypeScript, linting if configured, tests, and Astro production build.

## Manual checks
Test keyboard-only navigation, screen-reader labels/status, reduced motion, narrow viewport, long code blocks, and browser storage disabled/full scenarios.

## Definition of done
A task is done when acceptance criteria pass, relevant automated/manual checks are recorded, no known regression remains, and documentation/task status is updated.
