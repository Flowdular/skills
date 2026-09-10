---
name: extend-flowdular-cli
description: Add a module-owned command to Flowdular CLI with a declarative catalog, matching implementation, capability policy, dry run and command-boundary tests.
---

# Extend a module's CLI

Read the module spec, manifest and existing CLI contract from the installed
SDK. In SDK applications, `defineCliExtension` comes from
`@flowdular/sdk/cli-protocol`. Use the module's first ID segment as the namespace;
do not claim a core command group or another module's namespace.

Declare the `cli` capability and these module-local paths in `module.json`:

```json
{
  "cli": {
    "catalog": "src/cli/commands.json",
    "entry": "src/cli/index.ts"
  }
}
```

Merge these fields into the existing manifest, retaining other capabilities.
The JSON catalog has `protocolVersion: 1`, `moduleId` and `commands`, each with
a `path` array and capability descriptor. The implementation's default export
is `defineCliExtension(...)` with identical metadata and an `execute` handler.
Discovery reads JSON without running module code; import-time side effects do
not belong in the implementation. An enabled module contributes the commands.

## Capability policy

Set the real `risk`, `requiresApprovedSpec` and `supportsDryRun` values. The
handler receives `apply` and parsed arguments. A dry run reports its plan without
writing files, changing business data or sending requests with side effects.
Validate bounds and use the platform services/database access appropriate to
the operation. Tenant scope must be checked against the operator's authority;
accepting a tenant flag is not authorization by itself.

`requiresApprovedSpec` requires a schema-valid approved spec passed via `--spec`.
Local destructive capabilities additionally declare `localOnly` and an exact
confirmation token and are restricted to permitted environments. External and
non-local destructive capabilities need the platform's configured approval
verifier. Do not weaken the descriptor to bypass the runner.

## Prove the command boundary

Test catalog-only discovery, disabled-module absence, metadata drift refusal,
argument failures, dry-run zero writes, authorized apply and the applicable
approval/tenant refusals. Invoke through the real CLI runner in an isolated
fixture, so directly calling `execute` cannot hide a runner bug.

Validate the module, sync composition through the CLI when needed, and confirm
the command appears in installed `help`/`capability list`. Report the new command
syntax, its apply behavior and the checks actually run.
