# Module implementation contract

The installed schema and scaffold are authoritative. A typical module owns:

- `spec/module.yaml`, `module.json`, `package.json`: requirements, module
  identity/version/capabilities and declared imports/exports.
- `src/acl/permissions.ts`: exact namespaced scopes declared in the spec.
- `src/api/endpoints.ts`: `defineEndpoint` routes with explicit permissions,
  identity resolver, bounded input and mutation CSRF checks.
- `src/domain`, `src/services`, `src/server`: domain types, async repositories,
  runtime lifecycle and public services.
- `migrations/*.up.sql` / `.down.sql` and `databaseMigrations`: immutable
  PostgreSQL migration files with matching embedded SQL.
- `src/platform.ts`: `createServerComposition`, owned routes/registrations and
  disposal. Use the SDK auth server's platform context types where exported.
- `src/client/index.ts` and contribution/view files: client contribution,
  permission-aware navigation, shared UI and module translation bundles.
- `translations/<locale>.json` and tests for every declared locale and behavior.

## Data and authorization

Derive tenant identity from the authenticated principal, never request input.
Use bound SQL parameters and an explicit tenant predicate. Every tenant
operation runs within `database.transaction(callback, { tenantId, access })`.
Tenant tables require RLS and FORCE RLS with USING and WITH CHECK policies.
Use the platform database provider and its access leases; do not introduce a
module-owned SQLite connection, privileged runtime role or raw connection bypass.
Acquire resources in runtime creation and drain work before disposal.

Routes deny by default. A hidden button does not authorize a server operation.
Check session mutations for CSRF and bound body sizes and field lengths.
Cross-module work resolves declared public capabilities or registered tools,
never another module's repository/database. Register capabilities/tools/agents
during composition, before registries are sealed.

## Integration and UI

Declare both module dependencies and npm imports. A new database field can
affect spec, SQL, migration constants, domain types, repository, validation,
translations, forms, tables and tests; trace consumers rather than changing only
the screen. Preserve applied migration bytes and add a new numbered migration.

Use the SDK UI components and tokens. Import browser-safe SDK exports in client
files. Keep all configured locale key sets in sync, use fully qualified module
translation keys and locale-aware formatting. Pass permissions from the client
context into views; still handle server-side 403 responses.

The CLI owns `flowdular.json` enabled modules, platform dependencies,
`platform/src/generated/**`, `platform/octane.config.ts` and `platform/src/App.tsrx`.
Update the module declarations and run the CLI composition operation instead.
