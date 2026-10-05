# Repository instructions

## Keep the project documentation current

- Read [`PROJECT.md`](PROJECT.md) before making significant changes to this website.
- When a change affects routes or section anchors, page content, navigation, user-visible behavior, assets, responsive behavior, accessibility, configuration, deployment, SEO, integrations, or user journeys, update the affected `PROJECT.md` sections in the same change.
- Update `MASTER BUSINESS RULES` when an implemented behavior or business rule changes. Do not record assumptions as rules; mark unknown or absent behavior clearly.
- Update the Mermaid diagrams when the sitemap, architecture, content flow, or a major visitor journey changes.
- Add a row to `CHANGE HISTORY` for meaningful project changes and identify whether business rules or database structure changed.
- Keep documentation consistent with the implementation. Do not claim a feature works end to end because its UI exists.
- Do not put credentials, tokens, private customer data, or secret environment values in project documentation.
- When documenting code changes, state which relevant checks were run and leave unrun checks clearly marked.

These instructions guide agents and tools that read `AGENTS.md`; they do not automatically edit `PROJECT.md` after arbitrary manual changes or commits.
