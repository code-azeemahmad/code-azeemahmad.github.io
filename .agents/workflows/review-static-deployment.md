# Workflow: Review Static Deployment

1. Confirm Astro is configured for static output.
2. Confirm GitHub Pages `site` and `base` configuration match the repository URL/deployment type.
3. Check internal links, assets, fonts, images, resume links, and client-side navigation for the configured base path.
4. Confirm no API keys or private environment values are bundled.
5. Confirm there are no server endpoints, SSR adapters, or runtime backend requirements.
6. Run the production build and inspect the generated `dist/` output.
7. Test the built site under the actual repository subpath, not only at `/`.
8. Verify the GitHub Actions workflow publishes the correct build directory.
9. Record deployment verification and any known limitations.
