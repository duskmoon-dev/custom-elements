# Research: Astro Documentation Site

**Feature**: 001-astro-docs
**Date**: 2026-01-05

## Research Topics

### 1. Astro 5.x with Bun Compatibility

**Decision**: Use Astro 5.x with Bun as package manager and build tool

**Rationale**:
- Astro 5.x officially supports Bun as a package manager
- Bun is already the project's standard runtime (per constitution)
- Astro's build process works with `bun run astro build`
- Content Collections API provides type-safe MDX handling

**Alternatives Considered**:
- Astro 4.x: Older, fewer features; no compelling reason to use older version
- Other SSG (VitePress, Docusaurus): Would require different ecosystem; Astro explicitly requested

### 2. Custom Theme Implementation with @duskmoon-dev/core

**Decision**: Build custom Astro components consuming `@duskmoon-dev/core` CSS variables

**Rationale**:
- User explicitly requested custom theme using core design tokens
- `@duskmoon-dev/core` provides moonlight (dark) and sunshine (light) themes
- CSS custom properties (`--color-*`) can be applied to Astro components via global styles
- Theme toggle can use `localStorage` for persistence and `prefers-color-scheme` for initial value

**Implementation Approach**:
```astro
<!-- Layout.astro -->
<html data-theme="moonlight">
  <head>
    <style is:global>
      @import '@duskmoon-dev/core/moonlight.css';
      @import '@duskmoon-dev/core/sunshine.css';

      [data-theme="moonlight"] { /* dark theme variables */ }
      [data-theme="sunshine"] { /* light theme variables */ }
    </style>
  </head>
</html>
```

**Alternatives Considered**:
- Astro Starlight: Pre-built but uses its own design system; doesn't match our tokens
- Tailwind CSS: Additional dependency; we already have design tokens in core

### 3. Live Component Examples in Documentation

**Decision**: Use client-side hydration with custom Astro components wrapping web components

**Rationale**:
- Astro supports `client:load` directive for interactive components
- Web components (el-dm-*) work in any HTML context
- Import component register functions and render in MDX

**Implementation Approach**:
```mdx
// button.mdx
import { register } from '@duskmoon-dev/el-button/register';

<script>
  import('@duskmoon-dev/el-button/register').then(m => m.register());
</script>

<el-dm-button variant="primary">Click me</el-dm-button>
```

**Alternatives Considered**:
- Iframe sandboxing: More isolation but complex communication; overkill for docs
- Static screenshots: No interactivity; doesn't showcase component behavior

### 4. GitHub Actions Deployment to GitHub Pages

**Decision**: Use `actions/deploy-pages` with Astro's static output

**Rationale**:
- Official GitHub Actions for Pages deployment
- Astro builds to `dist/` directory by default
- Can use `peaceiris/actions-gh-pages` or official `actions/deploy-pages`
- Workflow triggers on push to main branch

**Implementation Approach**:
```yaml
# .github/workflows/docs.yml
name: Deploy Docs
on:
  push:
    branches: [main]
    paths:
      - 'packages/docs/**'
      - '.github/workflows/docs.yml'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install
      - run: bun run --filter @duskmoon-dev/docs build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: packages/docs/dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

**Alternatives Considered**:
- Netlify/Vercel: External services; GitHub Pages is simpler for OSS project
- Manual deployment: Error-prone; doesn't scale

### 5. Documentation Content Structure

**Decision**: Use Astro Content Collections with MDX

**Rationale**:
- Type-safe frontmatter validation
- Built-in support for MDX components
- Automatic slug generation from file paths
- Easy navigation structure from collection data

**Content Structure**:
```
src/content/
├── config.ts           # Collection schemas
└── docs/
    ├── index.mdx       # Redirects to getting-started
    ├── getting-started.mdx
    ├── theming.mdx
    └── components/
        ├── _index.mdx  # Components overview
        ├── button.mdx
        ├── card.mdx
        ├── input.mdx
        └── markdown.mdx
```

**Alternatives Considered**:
- Plain Markdown without collections: No type safety; harder to maintain
- External CMS: Unnecessary complexity for technical docs

### 6. Syntax Highlighting for Code Examples

**Decision**: Use Astro's built-in Shiki integration

**Rationale**:
- Shiki is bundled with Astro
- Supports all common languages (HTML, TypeScript, CSS, shell)
- Theme can be customized to match moonlight/sunshine themes
- Zero additional dependencies

**Alternatives Considered**:
- Prism.js: Requires additional setup; Shiki is already included
- highlight.js: Same as above; Shiki better integrated

### 7. Navigation and Sidebar

**Decision**: Build custom Nav component reading from content collection

**Rationale**:
- Full control over structure matching our design system
- Content collection provides automatic page discovery
- Can organize into sections (Getting Started, Components, Theming)

**Implementation Approach**:
- `Nav.astro` component reads all docs from collection
- Groups by folder (components/, guides/)
- Highlights current page
- Responsive: sidebar on desktop, drawer on mobile

## Summary of Decisions

| Topic | Decision | Key Dependency |
|-------|----------|----------------|
| Framework | Astro 5.x | astro |
| Theme | Custom using @duskmoon-dev/core | @duskmoon-dev/core |
| Live Examples | Client-side web components | @duskmoon-dev/el-* packages |
| Deployment | GitHub Actions + Pages | actions/deploy-pages |
| Content | MDX with Content Collections | @astrojs/mdx |
| Syntax Highlighting | Built-in Shiki | (included) |
| Navigation | Custom Astro component | (none) |
