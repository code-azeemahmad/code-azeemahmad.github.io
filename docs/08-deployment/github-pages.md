# GitHub Pages Deployment

## Hosting model
GitHub Pages hosts the generated static site. It does not run Astro server routes, API endpoints, or serverless functions. Keep Astro configured for static output.

## Astro configuration
Configure `site` with the final public site URL. Configure `base` according to the deployment type:
- User/organization site at `https://USERNAME.github.io/`: usually base `/`.
- Project site at `https://USERNAME.github.io/REPOSITORY/`: base should be `/<REPOSITORY>`.

Use Astro's official GitHub Pages deployment guidance for the current recommended configuration and adapter-free static deployment approach. Confirm the exact configuration against the repository name and custom-domain setup before editing.

## Asset and route requirements
- Use Astro-aware asset helpers or base-aware paths.
- Check images, icons, fonts, resume PDF, links, and client navigation under the repository subpath.
- Avoid root-absolute paths that bypass the configured base.
- Configure canonical URLs and sitemap/robots behavior only when the final public URL is known.

## Build
- Ensure `astro.config` uses static output.
- Build output is expected in `dist/` unless the project changes the directory.
- Preview/test the generated site locally and under the intended base path.
- Do not require runtime environment variables for the deployed static site.

## GitHub Actions
Use a GitHub Actions workflow that:
1. Checks out the repository.
2. Sets up the supported Node.js version.
3. Installs dependencies reproducibly using the lockfile.
4. Runs checks/tests as configured.
5. Runs the Astro production build.
6. Uploads the generated `dist/` artifact.
7. Deploys it using GitHub Pages Actions with the required repository permissions.

Do not hardcode an unverified Node version or workflow action version; choose supported versions when implementing and pin actions appropriately.

## Secrets
Never put a provider API key into GitHub Pages build variables if it will be included in public assets. BYOK is the initial live-AI model.

## Release checklist
- [x] Public URL (`https://azeemahmad.me`) and repository name (`code-azeemahmad.github.io`) confirmed.
- [x] `site` and `base` configured correctly in `astro.config.mjs` with CNAME file in `public/CNAME`.
- [x] Static build succeeds (`npm run build` generates clean static HTML in `dist/`).
- [x] Internal links, assets, and 404 handler work properly under base path.
- [x] No private credentials or secrets in source code, environment files, or built output.
- [x] GitHub Pages is configured for GitHub Actions deployment via `.github/workflows/deploy.yml`.
- [x] Workflow uses least-privilege permissions (`contents: read`, `pages: write`, `id-token: write`).
- [x] Featured chats and grounded offline retrieval work completely without an external provider key.
- [x] Live BYOK behavior implemented with in-memory key storage and direct client-side SSE streaming (Gemini, OpenAI, Groq, Anthropic).
- [x] Mobile drawer responsiveness, keyboard navigation, and accessibility smoke tests completed.
