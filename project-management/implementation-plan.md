# Implementation Plan

## Working agreement
Implement one task at a time. Before each task, inspect existing code and read the relevant specification. Keep changes small and verify them before moving on.

## Task format
For each implementation task, record:
- Goal
- Dependencies
- Files/modules likely affected
- Acceptance criteria
- Verification commands and manual checks
- Status and blockers

## Suggested sequence

### A. Scaffold
1. Inspect repository and package manager.
2. Create/verify Astro static project.
3. Add React integration.
4. Add Tailwind integration compatible with installed versions.
5. Add TypeScript strict configuration.
6. Verify clean static build.

### B. Shell and UI
1. Define design tokens.
2. Create Astro main layout and home route.
3. Create React ChatApplication island.
4. Build sidebar, welcome state, message list, and composer.
5. Add mobile behavior and accessibility.

### C. Portfolio data
1. Define typed profile/project/experience types.
2. Add owner-approved Markdown and JSON content.
3. Add content validation.
4. Create immutable featured conversation templates.
5. Link featured cards to the appropriate templates.

### D. Chat and storage
1. Define conversation/message types and schema version.
2. Implement localStorage adapter with validation/migration.
3. Implement new/rename/delete/search/export.
4. Implement template forking.
5. Test reload and corrupted storage behavior.

### E. AI and RAG
1. Implement local knowledge loader.
2. Implement keyword search and ranking.
3. Build bounded context with source IDs.
4. Define provider interface.
5. Verify provider browser support before choosing SDK.
6. Implement BYOK settings in memory.
7. Implement streaming, abort, errors, and privacy disclosure.
8. Add semantic retrieval only if evaluation supports it.

### F. Release
1. Verify static output.
2. Configure site/base for actual GitHub Pages URL.
3. Add CI checks and deployment workflow.
4. Test built site under project subpath.
5. Deploy and smoke-test.
