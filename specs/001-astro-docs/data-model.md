# Data Model: Astro Documentation Site

**Feature**: 001-astro-docs
**Date**: 2026-01-05

## Overview

This feature is a static documentation site with no persistent data storage. The "data model" describes the content structure and configuration schemas used by Astro Content Collections.

## Content Entities

### 1. Documentation Page

Represents a single documentation page in the site.

**Schema** (Zod via Astro Content Collections):
```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const docsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().optional().default(999),
    section: z.enum(['getting-started', 'components', 'theming', 'api']),
    component: z.string().optional(), // For component docs: package name
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = {
  docs: docsCollection,
};
```

**Attributes**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | Yes | Page title displayed in navigation and header |
| description | string | Yes | Meta description and page summary |
| order | number | No | Sort order within section (default: 999) |
| section | enum | Yes | Navigation section grouping |
| component | string | No | Package name for component docs (e.g., "@duskmoon-dev/el-button") |
| draft | boolean | No | Hide from production build if true |

### 2. Navigation Structure

Derived from content collection at build time.

**Structure**:
```typescript
interface NavSection {
  title: string;
  slug: string;
  items: NavItem[];
}

interface NavItem {
  title: string;
  slug: string;
  order: number;
  isActive: boolean;
}
```

**Sections** (fixed order):
1. Getting Started
2. Components
3. Theming
4. API Reference

### 3. Theme Configuration

User preference stored in browser.

**Storage**: `localStorage`
**Key**: `duskmoon-theme`
**Values**: `"moonlight"` | `"sunshine"`
**Default**: `prefers-color-scheme` media query result

### 4. Component Documentation Frontmatter

Extended schema for component-specific pages.

```typescript
// Example: button.mdx frontmatter
---
title: Button
description: Interactive button component with multiple variants
order: 1
section: components
component: "@duskmoon-dev/el-button"
---
```

## Relationships

```
┌─────────────────┐
│ Content         │
│ Collection      │
└────────┬────────┘
         │ generates
         ▼
┌─────────────────┐     ┌─────────────────┐
│ Navigation      │◄────│ Current URL     │
│ Structure       │     │ (active state)  │
└─────────────────┘     └─────────────────┘
         │
         │ rendered in
         ▼
┌─────────────────┐     ┌─────────────────┐
│ Layout          │◄────│ Theme State     │
│ Component       │     │ (localStorage)  │
└─────────────────┘     └─────────────────┘
```

## Validation Rules

1. **Title**: 3-60 characters, no special HTML characters
2. **Description**: 10-160 characters (SEO best practices)
3. **Order**: Positive integer, unique within section
4. **Section**: Must be one of predefined enum values
5. **Component**: Must match existing package in monorepo

## State Transitions

### Theme State

```
┌──────────────┐    toggle()    ┌──────────────┐
│  moonlight   │◄──────────────►│  sunshine    │
│  (dark)      │                │  (light)     │
└──────────────┘                └──────────────┘
       ▲                              ▲
       │                              │
       └──────── initial load ────────┘
                (prefers-color-scheme)
```

## No Database/API Contracts

This feature is a static site with no runtime API. All data is:
- Build-time: Content collections processed by Astro
- Client-side: Theme preference in localStorage

The `/contracts/` directory is not applicable for this feature.
