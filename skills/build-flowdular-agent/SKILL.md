---
name: build-flowdular-agent
description: Implement a module-owned business agent and its registered tools in Flowdular, with exact tool grants, tenant provider bindings, revisions and durable side effects.
---

# Build a module-owned business agent

This is business automation shipped by a module. Coding sandbox specialists are
a different mechanism. Read the approved module requirements and the installed
SDK's agent/tool contracts before implementing. Confirm the SDK version exports
the required API; never invent a missing export or silently upgrade dependencies.

Use `defineAgent` from `@flowdular/sdk/modules/agents/server`. Declare the module
dependency on `agents.core`. The module owns `moduleId`, stable `key`, positive
`definitionRevision`, name, description, instructions, exact `allowedTools` and
limits (`maxSteps`, `timeoutMs`, `temperature`, `maxOutputTokens`). Register the
definitions through `context.agentDefinitions.register(...)` during
`createServerComposition`, before registries are sealed.

Tenant bindings choose provider/model, active state and a subset of enabled
tools. Do not hardcode provider connections, model IDs, credentials or tenant
IDs in module code. An unconfigured agent remains unavailable until configured.
Treat the opaque derived agent ID as opaque.

## Tools and authority

Use registered tools from the owning module or a declared dependency. If a tool
is missing, implement and test its contract before making the agent depend on
it. Discover registration types in the installed SDK. Every tool needs exact
permissions, bounded validated input/output and its declared timeout/risk.

Effective authority intersects the code allowlist, tenant binding, invocation
tool grants, saved actor ceiling and live permissions. No wildcard or prefix
grants. Missing grants mean no tools. Instructions cannot grant authority, and
the model does not receive a database, repository, shell or capability registry.

For mutating tools, persist a target-side idempotency ledger in the same
transaction as the business write, declare `idempotencyProtection: 'target-ledger'`
when required by the installed contract, and prove replay does not duplicate
effects. Scope revocation must be respected before the body executes.

## Revisions and evidence

Increment `definitionRevision` for changes to executable definition content,
including instructions, tools, limits and copy. Never reuse a revision with
different bytes or decrement it. Runs/workflows pin immutable tenant executable
revisions, not the mutable binding or the module definition number.

Test the module's exact definition/tool ceiling, registration and granted/denied
tool behavior. Include cross-tenant and replay cases for new persistent tools.
Keep provider calls mocked or use the isolated test provider unless live use was
requested. Preserve retained revision/audit evidence and reject new runs when
the owning module is unavailable. Run module tests and project verification.
