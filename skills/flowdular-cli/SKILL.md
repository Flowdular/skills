---
name: flowdular-cli
description: Inspect and operate a Flowdular application through its CLI, discover commands and capabilities, diagnose configuration, and plan scoped changes. Use for Flowdular CLI help and workspace operations.
---

# Operate the Flowdular CLI

Start in the requested application. Read its instructions, `package.json`,
`flowdular.json` and lockfile. An SDK application has different scripts and
package names from the platform monorepo. Do not assume `@flowdular/cli`, a
`packages/` directory, a sandbox script or a root build script exists.

Run the installed CLI through the project's existing `flowdular` script, or
`pnpm exec flowdular` when no such script exists:

```sh
pnpm flowdular help --json
pnpm flowdular doctor --json
pnpm flowdular capability list --json
```

`--root /absolute/application` overrides discovery of the nearest ancestor
`flowdular.json`; it does not install or upgrade a CLI. Avoid `npx flowdular@latest`
in an existing application because it can select a different contract version.
Use [the command guide](references/commands.md) when selecting an operation.

## Parse results

The JSON envelope has `protocolVersion`, `ok`, `data` or `error`, `warnings`,
`evidence`, and `auditId`. An error contains `code`, `message` and sometimes
`details`. Require both a successful process exit and `ok: true`. Preserve
warnings and report partial outcomes. A package manager may log its script
prefix separately; invoke the installed executable directly for machine parsing.
Do not parse human output or treat a dry-run plan as an applied change.

## Apply the requested change

Inspect `capability describe <id> --json` when the command's authority is unclear.
Use a dry run before writes, then apply only the requested, understood scope.
Existing authorization is enough for ordinary reversible changes. Destructive
operations require the exact scope and confirmation demanded by the runner.
Never change `FD_ENV` to get around a refusal. A skill grants no additional rights.

The executable loads the target workspace's `.env`. Do not print it, secret
values, invitation links, tokens or decrypted runtime configuration. An unreadable
environment file is a failure, not permission to pick a fallback database.

Command availability depends on enabled modules. If an extension is missing,
inspect `module list` and the declared catalog. Do not invent a command or enable
a module just to make help match this document. After changes, rerun the relevant
read command and report the observed result, affected application and next action.
