# Implementation Plan: Astro Documentation Site with GitHub Pages

**Branch**: `001-astro-docs` | **Date**: 2026-01-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-astro-docs/spec.md`

## Summary

Build an Astro-based documentation site at `./packages/docs` with custom theming using `@duskmoon-dev/core` design tokens (moonlight/sunshine themes). The site documents all DuskMoon Elements components with live examples and auto-deploys to GitHub Pages via GitHub Actions workflow on push to main.

## Technical Context

**Language/Version**: TypeScript (ES2022+ target), Astro 5.x
**Primary Dependencies**: Astro, @duskmoon-dev/core, @duskmoon-dev/el-* packages
**Storage**: N/A (static site generation)
**Testing**: Playwright for E2E, Astro's built-in checks for broken links
**Target Platform**: Web (GitHub Pages static hosting)
**Project Type**: Documentation site within monorepo
**Performance Goals**: <3s page load, 90+ Lighthouse accessibility score
**Constraints**: Must integrate with Bun workspace, use existing design system
**Scale/Scope**: 4 component docs + guides (Getting Started, Theming, API Reference)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Web Standards First | ✅ Pass | Docs site uses standard web tech; live examples use native web components |
| II. BaseElement Pattern | ✅ N/A | Docs site, not a custom element |
| III. Package Independence | ✅ Pass | Docs is a separate package in monorepo |
| IV. Type Safety | ✅ Pass | TypeScript used for Astro components |
| V. Accessibility and Theming | ✅ Pass | Uses `--color-*` CSS variables from `@duskmoon-dev/core`; moonlight/sunshine themes |
| VI. Design System Bridge | ✅ Pass | Docs site consumes `@duskmoon-dev/core` design tokens |
| Technology Standards | ✅ Pass | Bun runtime, TypeScript, integrates with workspace |
| Code Quality | ✅ Pass | ESLint, Prettier, TypeScript checks apply |

**Gate Result**: PASS - No violations requiring justification.

## Project Structure

### Documentation (this feature)

```text
specs/001-astro-docs/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A for static docs)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
packages/docs/
├── src/
│   ├── components/      # Astro components (Layout, Nav, ThemeToggle, etc.)
│   ├── content/         # Markdown/MDX documentation content
│   │   ├── docs/
│   │   │   ├── getting-started.mdx
│   │   │   ├── theming.mdx
│   │   │   └── components/
│   │   │       ├── button.mdx
│   │   │       ├── card.mdx
│   │   │       ├── input.mdx
│   │   │       └── markdown.mdx
│   │   └── config.ts    # Content collections config
│   ├── layouts/         # Page layouts
│   ├── pages/           # Astro pages (index, 404)
│   └── styles/          # Global styles using @duskmoon-dev/core
├── public/              # Static assets
├── astro.config.mjs     # Astro configuration
├── package.json
└── tsconfig.json

.github/workflows/
└── docs.yml             # GitHub Pages deployment workflow
```

**Structure Decision**: Single documentation package within the existing monorepo packages directory. Follows Astro's content collections pattern for MDX documentation. Integrates with Bun workspace.

## Complexity Tracking

> No violations requiring justification. Table intentionally empty.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| - | - | - |
