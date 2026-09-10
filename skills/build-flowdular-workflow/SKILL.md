---
name: build-flowdular-workflow
description: Integrate a module with Flowdular workflows or author a workflow through its supported API, preserving graph validation, pinned revisions, tenant authority and durable execution.
---

# Build or integrate a workflow

Inspect the installed `workflows.core` contracts and the user's intended business
process. Distinguish a tenant-owned workflow definition, a module action it
calls, a module invoking a workflow, and an automation schedule/webhook. Tenant
workflow data belongs in the supported API/canvas, not hardcoded tenant state
inside module source.

A module starts workflows through the public `workflows.execution.v1`
capability resolved from `context.capabilities`. It never imports workflow
repositories or opens their database. Read the installed capability type for
the exact invocation envelope. If the optional module is absent, handle a null
capability with an unavailable state or a clear refusal.

## Graph and dependencies

The source contract is a bounded DAG with typed ports. Supported node kinds
include input, agent, agent-decision, gate, validator, action, merge and output;
use the installed version's types and limits. Mappings are declarative values,
JSON pointer paths or templates. Do not put JavaScript, shell execution, dynamic
imports or arbitrary expressions into graph data.

Validate cycles, dangling edges, unreachable nodes, missing output, incompatible
ports, graph bounds and dependency availability. Agent nodes pin an exact
immutable executable revision. Action nodes pin a registered contract version.
Never replace a missing pinned version with latest at execution time.

Draft updates use optimistic `expectedRevision`; resolve conflicts rather than
overwriting another editor. Publication validates/compiles dependencies and
creates an immutable content-addressed revision. Editing later creates a draft.

## Execute and test

Use dry-run validation first, then fixture simulation where appropriate. Dry
run must create no live run, provider call, business action or write. Simulation
uses fixtures and virtual time. Start a live run only within the user's requested
scope and authority; live execution may invoke paid providers or write data.

Enqueue persists before acknowledgment and uses stable idempotency. Preserve
tenant identity, cancellation, replay, retries, revision pins and audit evidence.
Schedules and signed webhooks belong to `automations.core` and its optional
workflow bridge, not to a parallel scheduler in the business module.

Test the changed boundary, including invalid graphs, missing dependencies,
dry-run isolation, cross-tenant/denied access and idempotent enqueue when affected.
Do not duplicate the entire shared runtime suite in each module. Report the
draft/published revision, execution mode, validation and actual run state.
