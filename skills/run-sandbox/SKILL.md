---
name: run-sandbox
description: Start and connect the independent Flowdular coding sandbox for an existing SDK application, with the correct workspace, access grants and agent mode. Use for launching or troubleshooting a Flowdular sandbox.
---

# Run the Flowdular sandbox

Find the application's `flowdular.json`, read its scripts and identify the
installed SDK version. The sandbox is a separate application, normally on
127.0.0.1:4320, connected to the platform, normally on port 4310. Starting the
sandbox does not start the platform or establish access.

## Select the launcher

The coding application is published as **`@flowdular/sandbox`**, which depends
on `@flowdular/sdk`. The SDK does not contain the application or its launcher.
The SDK's `modules/sandbox` entry is the platform access/grant module.

- If this checkout has a working `sandbox` script, use `pnpm sandbox`.
- With an installed compatible sandbox package, run
  `pnpm exec flowdular-sandbox --workspace /absolute/application`.
- To run without installing it in the application, use
  `npx @flowdular/sandbox@<compatible-version> --workspace /absolute/application`.
  Resolve the application's installed SDK version and check the selected sandbox
  release's SDK dependency first. The 0.2.0 sandbox depends on SDK 0.2.0. Do not
  upgrade the application or select an unrelated `latest` merely to launch it.

Check npm availability before proposing a version. An unpublished release must
be tested from its verified local tarballs or wait for publication. Do not fall
back to a removed SDK launcher or install private workspace packages.

Run the selected executable with `--help` before relying on its flags.
Supported source flags include `--workspace`, `--host`, `--port`, `--mode`
(`loopback` or `self-hosted`), and `--verbose`.

## Start and verify

Start or reuse the platform process, then start the sandbox with the explicit
workspace. Prefer the default loopback binding. Wait for the ready output and
check the actual HTTP URL. A busy port calls for inspecting the process or using
an explicit free port; do not kill an unrelated process. Keep process handles
for cleanup, and do not launch duplicates on repeated requests.

Read [connection and troubleshooting](references/connection.md) when connecting
or diagnosing access. Report platform connection and offered coding drivers
separately from HTTP readiness. A rendered connect screen is not a connected
coding session.

Changing to a non-loopback host forces self-hosted rules: local Claude/Codex
binaries are unavailable, and a provider key and authenticated browser session
are required. Do not expose the sandbox externally merely to solve local access.
Do not print API keys, tokens, vault contents or local agent credentials.

When stopping a sandbox you launched, send its normal termination signal and
wait for process exit. Do not delete session state. Starting a server does not
authorize new paid agent runs, spec approval or delivery of module changes.
