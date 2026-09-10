# Command guide

Examples use `pnpm flowdular` from an application that declares that script.
Replace example IDs with identifiers observed in the user's workspace. Read the
installed `help --json` and capability descriptions before relying on flags.

| Task | Command | Effect |
| --- | --- | --- |
| Configuration | `doctor --json` | Diagnostics; does not repair the workspace |
| Modules | `module list --json` | Installed/enabled module information |
| Contracts | `module validate --json` | Manifest, dependency and locale validation |
| Installer integrity | `module validate --locked --json` | Also checks the source lock; requires a lock |
| Specs | `spec validate --json` | Validates module specifications |
| Regenerate composition | `module sync --json` | Plan; `--apply` writes generated composition |
| Catalog | `module search <query> --json` | Reads the configured catalog |
| Release | `module info <module-id> --json` | Release contract and compatibility |
| Source install | `module install <module-id> --json` | Plan; `--apply` writes source and lock |
| Source update | `module update <module-id> --json` | Plan; refuses local edits and historical migration drift |
| Activate | `module enable <module-id> --json` | Plan; apply can install/link dependencies and grant scopes |
| Deactivate | `module disable <module-id> --json` | Plan; protected modules and required dependencies refuse |
| Migration ledger | `migration status --module <module-id> --json` | Reads the configured database |
| Migration integrity | `migration verify --json` | Checks checksums, RLS and file/constant parity |
| Migration scaffold | `migration new <name> --module <module-id> --json` | Plan for numbered SQL files |
| Migration apply | `migration apply --module <module-id> --json` | Plan; apply is subject to environment/capability policy |
| Recovery | `module recover --json` | Plan for a stopped installer transaction |

`auth`, `agents` and `sandbox` are module-provided command groups. Discover them
in this workspace instead of assuming they are enabled. Capability IDs are not
necessarily identical to command paths; discover the ID before describing it.

`setup quick` and `auth greenfield` reset local authentication. They are not
routine diagnostics. `database reset` drops all tables, including the migration
ledger, in the configured database; it does not support a module-scoped reset.
Never use these commands to repair an unknown existing application.

Sources: Flowdular CLI protocol and runner, SDK/CLI 0.2.0 source snapshot.
The installed version's help is authoritative when it differs.
