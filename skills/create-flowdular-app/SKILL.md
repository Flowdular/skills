---
name: create-flowdular-app
description: Create a new Flowdular application with create-flowdular, initialize a fresh local workspace, and verify the generated SDK project. Use when starting a new Flowdular app.
---

# Create a Flowdular application

Check the requested parent directory and target before generating. Use an empty
target and Node.js >=22.22.2 (or the selected release's higher requirement).
The generated application uses pnpm workspaces even when npm starts the generator.

```sh
npm create flowdular@latest my-app
cd my-app
pnpm flowdular doctor --json
```

Use the user's requested version instead of `latest` when one is specified.
The generator installs packages and initializes Git by default. To defer those
steps, pass flags after `--`:

```sh
npm create flowdular@latest my-app -- --no-install --no-git
```

Do not use `--force` to resolve a populated target. Reuse an existing application
only when the task is to extend it; generation would be the wrong operation.

## Initialize and launch

Read the generated README and scripts. The starter includes `platform/`,
`modules/example`, `flowdular.json` and a private `.env` with generated keys.
Keep `.env` out of output and Git. PGlite is the default embedded PostgreSQL
provider; a separate database server is not needed for that default.

For an explicitly fresh local workspace using its default database, preview
`pnpm flowdular setup quick --json`. Explain that it resets local authentication.
With the user's authorization for that initialization and the app stopped, run
`pnpm flowdular setup quick --apply --confirm reset-local-auth --json`.
Never perform this reset against an existing, custom or deployed database.
Respect additional project approval rules. When setup was already completed,
inspect the current state and continue without resetting it.

Run `pnpm dev` and wait for its actual ready URL (normally port 4310). Confirm
the application responds. Keep the process available for the requested work,
recording its session/process handle so it can later be stopped cleanly.

## Check and hand off

Run the generated project's `pnpm verify`. Read available scripts before adding
build commands; the consumer starter need not have the monorepo's root `build`,
`sandbox`, `validate` or `rules:generate` scripts. Report the created directory,
runtime version, application URL and actual checks. An SDK application imports
`@flowdular/sdk/<surface>`; do not install private internal workspace packages.
