---
name: verify-flowdular
description: Validate and review a Flowdular application or module change, reproduce failures, and report concrete gate evidence before delivery.
---

# Verify a Flowdular change

Read the actual diff, owning module and workspace scripts. Preserve unrelated
edits. Map the requested behavior to an observable check and identify the affected
server, data, client and integration boundaries.

## Run the appropriate checks

1. Run the changed module's existing typecheck/test scripts using its real
   package name. Add a regression test for a bug at the owning behavior boundary;
   first reproduce the failure, then prove the fix. Do not add source-string
   tests for ordinary copy edits.
2. Run `pnpm flowdular spec validate --json` when requirements changed and
   `pnpm flowdular module validate --json` for module integration.
   Use `--locked` only when an installer lock exists and its integrity is in scope.
3. Run the project's `pnpm verify`. In the monorepo, additional `build` and
   generated-rule checks may be required; an SDK app can have different scripts.
   Read its instructions rather than copying nonexistent commands.
4. Inspect rendered UI for a visual change, including permission denial,
   empty/loading/error/populated states and keyboard operation where affected.

Database tests use isolated providers, never a production/shared development
database. An import failure is not a passing test. Do not skip assertions,
silence errors, broaden permissions or regenerate locks to hide failures.

## Review the finished change

Read the final diff again after generation or formatting. Check correctness,
authorization/tenancy, public contracts and dependencies, async cleanup and
durability, regression evidence and rendered UI. Include denial cases where
permissions changed, historical migration parity where SQL changed, and retained
revision/idempotency behavior where agents or workflows changed.

Follow the project's auto-review protocol when present. A review is an assessment,
not spec approval or a substitute for failed gates. Separate pre-existing failures
from introduced ones without claiming full verification when required checks fail.
Stop broadening tests once relevant checks and required project gates pass unless
new changes or evidence justify another run.

Report what changed, exact checks/results and actionable remaining failures.
Do not infer a push, merge, publish, reset or deployment request from verification.
