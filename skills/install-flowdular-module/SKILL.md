---
name: install-flowdular-module
description: Find, install, activate, update or recover Flowdular business modules distributed as source, preserving local edits, migration history and module locks.
---

# Install or update module source

Read `flowdular.json`, installed versions and the installed CLI help. Inspect
the requested module and current worktree before changing it. Module IDs,
directory names and npm package names are distinct; obtain each from the
catalog/manifest rather than deriving them from the ID.

```sh
pnpm flowdular module search expenses --json
pnpm flowdular module info expenses.core --json
pnpm flowdular module install expenses.core --json
```

These are examples, not a request to install expenses. Choose the user's module
and a compatible version observed in the catalog. `--registry /absolute/index.json`
selects an accessible local catalog when supported. Do not invent a remote
registry or bypass a private repository's access requirements. An npm install
does not establish Official Modules repository access.

## Install and activate

Inspect the source/dependency plan and then apply the authorized install with
`module install <id[@version]> --apply --json`. This writes source under the
configured module root and `flowdular.modules.lock.json`; it does not activate
the module, run its scripts or migrate the application's database.

Review the source before enabling it. `module enable <id> --apply --json` is a
separate step: it updates the dependency closure, links packages, generates
composition and can grant declared scopes to workspace owners. Apply it when
activation is in scope, after reviewing the plan and configured database target.
Never edit `modules.enabled`, generated composition or platform dependencies
by hand. Verify with `module list` and `module validate --locked`.

## Update and recover

Preview `module update <id[@version]> --json`. The installer refuses local edits,
extra source files, incompatible versions, downgrades and edits/removal of old
migrations. Preserve local changes and resolve their ownership; do not delete
them or rewrite the lock to force acceptance. Add new migrations rather than
changing history. Source updates and application migration rollout are distinct.

For an interrupted transaction, first confirm its owning installer process has
exited. Preview `module recover --json` and apply only the recorded recovery
plan. Keep conflicting transaction evidence instead of deleting it. Source
recovery does not roll back a database. Report the installed version, activation
state, lock validation and any remaining runtime restart or migration work.
