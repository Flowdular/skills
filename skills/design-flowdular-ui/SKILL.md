---
name: design-flowdular-ui
description: Build or revise a Flowdular module screen using the shared SDK UI, permission-aware states, translation bundles and the record-table/drawer pattern.
---

# Design a Flowdular module screen

Read the owning view, its client contribution, installed SDK UI exports and
project design instructions. SDK consumers import `@flowdular/sdk/ui` and
`@flowdular/sdk/ui/styles`; do not require the monorepo's `packages/ui` directory.
Use the local example module as a working reference when available.

## Compose the screen

Use `PageHeader`, `TableCard`/`Table`, `SearchField`, `Filters`, `Drawer`,
`FormField`, `Button`, `Alert`, `Tag` and `Kpi` where they match the task. Check
current props in installed types before writing markup. Shared components own
their loading rows, table head and action column.

Records occupy the main page. Create/edit forms open in a drawer; keep read-only
master/detail views for actual detail exploration. Define stable table columns
outside the view, give each a width, and render row actions through the public
table action API. Keep identifiers/long text out of KPI values. Use design tokens
and module-owned classes; do not override shared `ui-*` classes or import a
second table/component framework to reproduce primitives already provided.

## Data, permissions and language

Preserve visible rows during refresh. Provide loading, initial empty, filtered
empty, error, populated and denied behavior. Hide actions according to the client
context's scopes and handle a server 403; client visibility is not authorization.
Show submission errors inside the form and prevent duplicate submission while busy.

Copy belongs in every declared `translations/<locale>.json` bundle. Keep keys
aligned and fully namespaced; use the shared translation runtime and locale-aware
formatting. Do not assume English-only because this skill is written in English.
Keep server imports and secrets out of browser modules.

## Inspect

Run the module's checks and inspect the rendered change on desktop and a narrow
viewport. Check long values, overflow containment, keyboard/focus behavior,
form validation and relevant permission states. Reuse the project's running
preview; do not start unrelated services or add auth/database dependencies for
visual work. Report the actual UI scenarios inspected and any unresolved issue.
