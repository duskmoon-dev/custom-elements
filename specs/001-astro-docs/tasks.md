# Tasks: Astro Documentation Site with GitHub Pages

**Input**: Design documents from `/specs/001-astro-docs/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: No tests explicitly requested in feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Docs package**: `packages/docs/src/`
- **Workflows**: `.github/workflows/`
- **Content**: `packages/docs/src/content/docs/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and Astro package structure

- [ ] T001 Create docs package directory structure at packages/docs/
- [ ] T002 Create package.json with Astro dependencies at packages/docs/package.json
- [ ] T003 [P] Create astro.config.mjs with MDX integration at packages/docs/astro.config.mjs
- [ ] T004 [P] Create tsconfig.json extending astro/tsconfigs/strict at packages/docs/tsconfig.json
- [ ] T005 Run bun install to add docs package to workspace

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core components and configuration that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 Create content collection config with docs schema at packages/docs/src/content/config.ts
- [ ] T007 [P] Create global styles importing @duskmoon-dev/core themes at packages/docs/src/styles/global.css
- [ ] T008 [P] Create BaseLayout.astro with theme support at packages/docs/src/layouts/BaseLayout.astro
- [ ] T009 Create DocsLayout.astro extending BaseLayout at packages/docs/src/layouts/DocsLayout.astro
- [ ] T010 Create ThemeToggle component with localStorage persistence at packages/docs/src/components/ThemeToggle.astro
- [ ] T011 Create index page redirecting to getting-started at packages/docs/src/pages/index.astro
- [ ] T012 [P] Create 404 page at packages/docs/src/pages/404.astro

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Developer Reads Component Documentation (Priority: P1) 🎯 MVP

**Goal**: Developers can read documentation about available components with properties, usage examples, and syntax-highlighted code

**Independent Test**: Navigate to deployed site, visit component page, verify properties table and code examples render correctly

### Implementation for User Story 1

- [ ] T013 [US1] Create Getting Started guide at packages/docs/src/content/docs/getting-started.mdx
- [ ] T014 [P] [US1] Create Theming guide at packages/docs/src/content/docs/theming.mdx
- [ ] T015 [P] [US1] Create Button component docs at packages/docs/src/content/docs/components/button.mdx
- [ ] T016 [P] [US1] Create Card component docs at packages/docs/src/content/docs/components/card.mdx
- [ ] T017 [P] [US1] Create Input component docs at packages/docs/src/content/docs/components/input.mdx
- [ ] T018 [P] [US1] Create Markdown component docs at packages/docs/src/content/docs/components/markdown.mdx
- [ ] T019 [US1] Create PropsTable.astro component for displaying component properties at packages/docs/src/components/PropsTable.astro
- [ ] T020 [US1] Create CodeBlock.astro component with copy button at packages/docs/src/components/CodeBlock.astro
- [ ] T021 [US1] Create docs page template at packages/docs/src/pages/docs/[...slug].astro

**Checkpoint**: User Story 1 complete - developers can read all component documentation with properties and code examples

---

## Phase 4: User Story 2 - Documentation Auto-Deploys on Push (Priority: P1)

**Goal**: Documentation automatically rebuilds and deploys to GitHub Pages when changes are pushed to main

**Independent Test**: Push a documentation change, verify workflow runs and site updates on GitHub Pages

### Implementation for User Story 2

- [ ] T022 [US2] Create GitHub Actions workflow at .github/workflows/docs.yml
- [ ] T023 [US2] Configure workflow to trigger on packages/docs/** changes
- [ ] T024 [US2] Add Bun setup and install steps to workflow
- [ ] T025 [US2] Add build step for docs package in workflow
- [ ] T026 [US2] Add GitHub Pages deployment with actions/deploy-pages@v4

**Checkpoint**: User Story 2 complete - documentation auto-deploys on push to main

---

## Phase 5: User Story 3 - Developer Views Live Component Examples (Priority: P2)

**Goal**: Developers can see and interact with live rendered components in the documentation

**Independent Test**: Visit component page, verify live component renders and responds to interaction

### Implementation for User Story 3

- [ ] T027 [US3] Create ComponentDemo.astro wrapper for live examples at packages/docs/src/components/ComponentDemo.astro
- [ ] T028 [US3] Add client-side script to register web components in demo at packages/docs/src/scripts/register-components.ts
- [ ] T029 [P] [US3] Add live examples to Button docs at packages/docs/src/content/docs/components/button.mdx
- [ ] T030 [P] [US3] Add live examples to Card docs at packages/docs/src/content/docs/components/card.mdx
- [ ] T031 [P] [US3] Add live examples to Input docs at packages/docs/src/content/docs/components/input.mdx
- [ ] T032 [P] [US3] Add live examples to Markdown docs at packages/docs/src/content/docs/components/markdown.mdx

**Checkpoint**: User Story 3 complete - live component examples render and are interactive

---

## Phase 6: User Story 4 - Developer Navigates Documentation Structure (Priority: P2)

**Goal**: Developers can easily navigate between documentation sections using sidebar and mobile menu

**Independent Test**: Click through navigation, verify correct pages load with active state highlighted; test on mobile viewport

### Implementation for User Story 4

- [ ] T033 [US4] Create Nav.astro sidebar component at packages/docs/src/components/Nav.astro
- [ ] T034 [US4] Create MobileNav.astro drawer component at packages/docs/src/components/MobileNav.astro
- [ ] T035 [US4] Add navigation structure generation from content collection at packages/docs/src/utils/navigation.ts
- [ ] T036 [US4] Integrate Nav into DocsLayout with responsive behavior at packages/docs/src/layouts/DocsLayout.astro
- [ ] T037 [US4] Add active page highlighting and section grouping to Nav

**Checkpoint**: User Story 4 complete - navigation works on desktop sidebar and mobile drawer

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T038 [P] Add favicon and meta images to packages/docs/public/
- [ ] T039 [P] Add SEO meta tags to BaseLayout at packages/docs/src/layouts/BaseLayout.astro
- [ ] T040 Verify all internal links work (run astro build and check for warnings)
- [ ] T041 Test responsive design across viewport sizes (320px to 1920px)
- [ ] T042 Run Lighthouse audit and address accessibility issues
- [ ] T043 Update root README.md with docs package information

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - US1 and US2 are both P1 priority and can proceed in parallel
  - US3 and US4 are both P2 priority and can proceed in parallel after US1/US2
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - Creates core documentation content
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Independent of US1 content
- **User Story 3 (P2)**: Depends on US1 component docs existing - Adds live examples to existing pages
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - Builds navigation from content collection

### Within Each User Story

- Core components/utilities before content that uses them
- Layout integration after components are created
- Testing/verification after implementation

### Parallel Opportunities

- Setup tasks T003, T004 can run in parallel
- Foundational tasks T007, T008 can run in parallel; T012 in parallel with T010
- US1 content docs T014-T018 can all run in parallel
- US3 live example additions T029-T032 can all run in parallel
- US1 and US2 are independent and can be worked in parallel
- US3 and US4 are independent and can be worked in parallel

---

## Parallel Example: User Story 1

```bash
# After T013 (Getting Started) is created, all component docs can run in parallel:
Task: "Create Button component docs at packages/docs/src/content/docs/components/button.mdx"
Task: "Create Card component docs at packages/docs/src/content/docs/components/card.mdx"
Task: "Create Input component docs at packages/docs/src/content/docs/components/input.mdx"
Task: "Create Markdown component docs at packages/docs/src/content/docs/components/markdown.mdx"
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 2)

1. Complete Phase 1: Setup (T001-T005)
2. Complete Phase 2: Foundational (T006-T012)
3. Complete Phase 3: User Story 1 - Component Documentation (T013-T021)
4. Complete Phase 4: User Story 2 - Auto-Deploy (T022-T026)
5. **STOP and VALIDATE**: Verify docs build, deploy, and display correctly
6. Deploy to GitHub Pages - MVP complete!

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 + 2 → Test independently → Deploy (MVP!)
3. Add User Story 3 → Test live examples → Deploy
4. Add User Story 4 → Test navigation → Deploy
5. Polish phase → Final quality improvements

### Single Developer Strategy

1. Work phases sequentially: Setup → Foundation → US1 → US2 → US3 → US4 → Polish
2. Leverage parallel tasks within each phase for efficiency
3. Commit after each task or logical group
4. Test at each checkpoint before proceeding

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- No tests requested in specification - testing is manual/visual
- Live examples require element packages to be built first
- Theme toggle uses localStorage key `duskmoon-theme`
- Avoid: modifying same file in parallel tasks
