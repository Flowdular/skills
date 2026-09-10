---
name: work-in-sandbox
description: Guide an existing Flowdular sandbox session from a business brief through specification, implementation, gates, preview and delivery. Use for work inside the coding sandbox after it is running.
---

# Work through a sandbox session

Inspect the selected session before creating anything. Reuse an existing session
when it owns the requested change. Identify every affected module, the active
module, selected driver, connection and current phase. Keep the user's chosen
driver/model; do not change provider or incur unrelated runs.

Describe the requested business outcome and acceptance cases. Name existing
modules by their actual dotted IDs so planning does not create duplicates.
A session can include several modules, but a specialist turn owns one module
and its declared write paths. Additional skills do not expand those paths.

## Specification and implementation

Review the actual `spec/module.yaml` for each affected module. Approval must
come from the user for the exact current specification. Use the sandbox's
operator approval action; never edit `session.json`, approval hashes, gate
records or the draft status to fabricate it. If requirements change, obtain
approval of the changed version before dependent implementation.

Inside a specialist workspace, follow its generated instructions and its single
assigned `reference/skills/<name>/SKILL.md`. Do not load this repository's whole
catalog or import host permissions into the sandbox. The host owns installs,
network access and preparation. New modules are scaffolded through the platform's
approved-spec operation, not by manually faking generated files.

Inspect gate output and fix the owning module. Passing types alone does not
mean the spec, dependency, test, format or auto-review gates passed. Never skip
assertions, fake a gate file, or copy source directly into the live application
to bypass a refusal. Use preview to inspect authorized states and changed flows.

## Delivery

Open the delivery plan for the requested target. Verify all session modules,
added/overwritten/deleted files, dependencies, scope grants and restart notes.
Current approval and review evidence must cover the exact files being delivered.
Complete implementation and checks before requesting any missing final approval.
Existing explicit authorization for that delivery remains valid within its scope.

Workspace delivery can install packages, enable modules and sync scopes. Git PR
and Official Modules are separate targets with their own repository/access
requirements. Do not change visibility or choose a publication target for the
user. Confirm the target's result and link the actual PR if one was created.
On a failed step, inspect recorded progress before retrying; do not blindly
repeat side effects or mark the session delivered.

Archive or delete only when requested. Deletion affects workspace and preview
data; never remove session directories manually as routine cleanup. Report the
module IDs, phase, gates, preview/delivery result and any required user action.
