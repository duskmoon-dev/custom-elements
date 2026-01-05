# Quickstart: Astro Documentation Site

**Feature**: 001-astro-docs
**Date**: 2026-01-05

## Prerequisites

- Bun v1.0+ installed
- Git repository cloned
- Existing packages built (`bun run build:all`)

## Setup Steps

### 1. Create the docs package

```bash
# From repository root
mkdir -p packages/docs/src/{components,content/docs,layouts,pages,styles}
mkdir -p packages/docs/public
```

### 2. Initialize package.json

```bash
cd packages/docs
cat > package.json << 'EOF'
{
  "name": "@duskmoon-dev/docs",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "@astrojs/mdx": "^4.0.0",
    "astro": "^5.0.0",
    "@duskmoon-dev/core": "^1.1.1",
    "@duskmoon-dev/el-button": "workspace:*",
    "@duskmoon-dev/el-card": "workspace:*",
    "@duskmoon-dev/el-input": "workspace:*",
    "@duskmoon-dev/el-markdown": "workspace:*"
  },
  "devDependencies": {
    "typescript": "^5.7.2"
  }
}
EOF
```

### 3. Create Astro configuration

```bash
cat > astro.config.mjs << 'EOF'
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [mdx()],
  site: 'https://duskmoon-dev.github.io',
  base: '/duskmoon-elements',
  output: 'static',
});
EOF
```

### 4. Create TypeScript configuration

```bash
cat > tsconfig.json << 'EOF'
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
EOF
```

### 5. Install dependencies

```bash
cd ../..  # back to repo root
bun install
```

### 6. Create base layout with theme support

Create `packages/docs/src/layouts/BaseLayout.astro`:
```astro
---
interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<!DOCTYPE html>
<html lang="en" data-theme="moonlight">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title} | DuskMoon Elements</title>
    <link rel="stylesheet" href="https://unpkg.com/@duskmoon-dev/core/dist/moonlight.css" />
    <script is:inline>
      const theme = localStorage.getItem('duskmoon-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'moonlight' : 'sunshine');
      document.documentElement.dataset.theme = theme;
    </script>
  </head>
  <body>
    <slot />
  </body>
</html>
```

### 7. Create index page

Create `packages/docs/src/pages/index.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Home" description="DuskMoon Elements documentation">
  <main>
    <h1>DuskMoon Elements</h1>
    <p>A web components library bridging @duskmoon-dev/core design to real projects.</p>
    <a href="/duskmoon-elements/docs/getting-started">Get Started</a>
  </main>
</BaseLayout>
```

### 8. Run development server

```bash
bun run --filter @duskmoon-dev/docs dev
```

Visit `http://localhost:4321` to see the docs site.

## Verification Checklist

- [ ] `bun install` completes without errors
- [ ] `bun run --filter @duskmoon-dev/docs dev` starts Astro dev server
- [ ] Homepage loads at `http://localhost:4321`
- [ ] Theme toggle switches between moonlight/sunshine
- [ ] Build succeeds: `bun run --filter @duskmoon-dev/docs build`

## Next Steps

1. Add content collection configuration
2. Create navigation component
3. Add component documentation pages
4. Set up GitHub Actions workflow
5. Configure GitHub Pages deployment

## Common Issues

### "Cannot find package @duskmoon-dev/el-*"

Ensure element packages are built first:
```bash
bun run build:all
```

### "Port 4321 already in use"

Kill existing process or use different port:
```bash
bun run --filter @duskmoon-dev/docs dev -- --port 4322
```

### "GitHub Pages 404"

Ensure `base` in `astro.config.mjs` matches repository name:
```javascript
base: '/duskmoon-elements',
```
