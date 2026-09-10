# Flowdular agent skills

Practical instructions for coding agents working with [Flowdular](https://flowdular.com):
create an SDK application, operate its CLI, run the independent coding sandbox,
and build, test and deliver modules.

## Install

Install with the [Skills CLI](https://github.com/vercel-labs/skills):

```sh
npx skills add flowdular/skills
```

List skills or select a task:

```sh
npx skills add flowdular/skills --list
npx skills add flowdular/skills --skill run-sandbox --agent codex
```

The installer selects agent and project/user scope. These instructions work with
agents that support the `SKILL.md` format, including Codex and Claude Code.
While this repository is private, installation requires GitHub repository access
and working Git authentication. The install command does not grant that access.

## Skills

| Skill | Use it for |
| --- | --- |
| [create-flowdular-app](skills/create-flowdular-app/SKILL.md) | Generate and verify a new SDK application |
| [flowdular-cli](skills/flowdular-cli/SKILL.md) | Discover commands, inspect configuration and apply scoped operations |
| [run-sandbox](skills/run-sandbox/SKILL.md) | Start the standalone package, connect a platform and diagnose access |
| [work-in-sandbox](skills/work-in-sandbox/SKILL.md) | Guide a session through specs, gates, preview and delivery |
| [install-flowdular-module](skills/install-flowdular-module/SKILL.md) | Install, enable, update or recover module source |
| [build-flowdular-module](skills/build-flowdular-module/SKILL.md) | Implement a module against the installed SDK contracts |
| [flowdular-migrations](skills/flowdular-migrations/SKILL.md) | Author immutable PostgreSQL migrations with tenant isolation |
| [verify-flowdular](skills/verify-flowdular/SKILL.md) | Choose checks and report actual test and review evidence |
| [extend-flowdular-cli](skills/extend-flowdular-cli/SKILL.md) | Add module-owned CLI commands |
| [build-flowdular-agent](skills/build-flowdular-agent/SKILL.md) | Define a business agent and its permitted tools |
| [build-flowdular-workflow](skills/build-flowdular-workflow/SKILL.md) | Build and invoke typed workflow graphs |
| [design-flowdular-ui](skills/design-flowdular-ui/SKILL.md) | Use shared components, permissions and translations |

## Package boundaries and compatibility

- `@flowdular/sdk`: application and module contracts, runtime and UI.
- `flowdular`: workspace CLI.
- `create-flowdular`: application generator.
- `@flowdular/sandbox`: independent coding application that depends on the SDK.
- This repository: agent instructions, installed separately with the Skills CLI.

The instructions target the Flowdular 0.2.0 contract. Check the installed version's
exports and CLI help before running commands. A skill's presence does not mean a
particular npm version has been published. The sandbox skill checks availability
and SDK compatibility before launching. Skills do not install the Flowdular
runtime, authorize spec approval, grant scopes or override project instructions.

Each skill can be installed alone. References use the installed SDK, generated
example module and project files; private monorepo paths are not prerequisites.
Inside an actual sandbox specialist session, follow its generated role and its
assigned reference skill. This catalog does not expand the session's permissions.

## Contribute

Keep one focused task per `skills/<name>/SKILL.md`. Put longer optional examples
in that skill's `references/` directory. Verify commands against the owning CLI
and keep version assumptions explicit. After changes:

```sh
node scripts/validate.mjs
npx skills add . --list
```

The validation script checks discovery metadata, local Markdown links, duplicate
names and accidental author-machine paths. Installation and runtime behavior
need their own smoke checks when those instructions change.

Licensed under [MIT](LICENSE).
