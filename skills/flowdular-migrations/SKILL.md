---
name: flowdular-migrations
description: Author and verify PostgreSQL migrations for Flowdular modules, inspect migration drift, and diagnose database configuration without resetting application data.
---

# Work with Flowdular migrations

Identify the application, module, configured database adapter and environment
without printing credentials. PGlite and hosted PostgreSQL use the same async
database contract. A read-only status check can still open the configured
database; confirm which environment the task targets before connecting.

Read the owning module's SQL and `databaseMigrations` registration. Inspect the
current ledger with `pnpm flowdular migration status --module <id> --json` and
the installed capability policy before mutation. Distinguish pending migrations
from checksum mismatch and adoption refusal.

## Add schema changes

Preview then apply `migration new <name> --module <id>` to scaffold the numbered
up/down SQL pair. Complete PostgreSQL columns, constraints and indexes. Keep the
up SQL byte-identical to its `databaseMigrations` entry. Applied migrations are
immutable; never alter a checksum, ledger row or old SQL to make validation pass.

Tenant tables require `ENABLE ROW LEVEL SECURITY`, `FORCE ROW LEVEL SECURITY`
and a tenant policy with `USING` and `WITH CHECK`. Runtime roles must have neither
superuser nor BYPASSRLS. Migration leases are for DDL only. Repositories use
bound parameters, tenant predicates and
`transaction(..., { tenantId, access })`; preserve that contract in new queries.

Test fresh apply and the relevant upgrade/adoption path through the installed
database-testing provider with an isolated temporary database. Test cross-tenant
access and transaction behavior where the schema changes them. Drain workers
and close handles before deleting temporary test data.

Run the module tests and `migration verify`. Preview
`migration apply --module <id>` before applying to the user's authorized target.
Respect environment refusals; never relabel a deployed database as development.
Report the migration IDs and actual applied/verified state separately.

## Diagnose without data loss

Unreadable environment files, missing roles and checksum drift need a root-cause
fix. `setup quick` resets authentication; `database reset` drops every table and
the ledger, across all modules. Neither is a generic migration repair. A requested
reset needs explicit database scope, the runner's preview and exact confirmation.
Do not invent a module-only reset, manually remove PGlite state, or claim that
source rollback also rolled back the database.
