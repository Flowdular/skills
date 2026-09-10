---
name: build-flowdular-module
description: Create or extend a business module in a Flowdular SDK application, from an approved specification through server, data, client, translations and module validation.
---

# Build a Flowdular business module

Read the project's instructions, `flowdular.json`, package versions and the
owning module before editing. For an SDK starter, `modules/example` is a working
local reference. The monorepo's `.ai/references/catalog` is optional and may not
exist or be publicly accessible. Use the installed SDK exports/types and local
module tests; do not require private source access to follow this skill.

## Contract and scaffold

Describe permissions, entities, tenancy, screens, dependencies and acceptance
cases in `spec/module.yaml`, using the installed schema. A new module needs
explicit user approval of its current spec. Never set `status: approved` based
on the agent's own judgment. Sandbox approval uses the operator action and hash.

After approval, use the installed CLI:

```sh
pnpm flowdular spec validate --json
pnpm flowdular module new sales.orders --spec modules/sales-orders/spec/module.yaml --json
pnpm flowdular module new sales.orders --spec modules/sales-orders/spec/module.yaml --apply --json
```

Substitute the approved module ID and actual spec path. Preview before applying.
For an existing module, change its owned files instead of scaffolding over it.
Read [the implementation contract](references/module-contract.md) for the files
and boundary rules that need to stay aligned.

## Implement and prove behavior

Use `@flowdular/sdk/server`, `/client`, `/ui`, `/database`, `/contracts` and the
appropriate `/modules/<name>/server` exports in consumer applications. There is
no SDK root barrel. Check exact exports in the installed version; do not install
private `@flowdular/*` workspace packages or add monorepo aliases.

Test the requested behavior through endpoints or services, including denied
access and cross-tenant cases for tenant data. Inspect the changed rendered UI
and its loading, empty, error, populated and denied states. Run the module's
actual package scripts, spec validation and `module validate`; then the project's
`pnpm verify`. Keep module/package/spec versions aligned as the project requires.

Use `module enable <id>` to plan activation and `--apply` when authorized. It
can grant scopes and touch the configured database. Use `module sync --apply`
for generated composition rather than editing generated files. Review the final
diff and report checks actually run, missing prerequisites and activation state.
