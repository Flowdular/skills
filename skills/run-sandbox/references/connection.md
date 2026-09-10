# Connection and troubleshooting

The sandbox accesses a running application through its public API. It never
opens that application's database. Session previews have their own embedded
PostgreSQL. A missing platform connection cannot be fixed by copying production
database credentials into the sandbox.

## Establish access

1. Inspect the running application's module list. `sandbox.core` must be enabled
   to provide its grant and access commands. If enabling it is in scope, preview
   `module enable sandbox.core` first; activation can grant scopes.
2. Identify the actual account and tenant from the application or authorized
   operator records. Do not guess `admin@example.com` or `operations-demo`.
3. Inspect `pnpm flowdular sandbox access --tenant <tenant> --json`. When the
   user has authorized a grant, preview then apply
   `sandbox grant --email <email> --tenant <tenant> --apply --json`.
4. In Administration > API tokens, the operator creates a token with
   `sandbox.access.use` and only the read scopes required for the preview. Add
   `sandbox.preview.data` only for live data, and `sandbox.modules.eject` only
   for authorized delivery. A token's scopes and the account's active sandbox
   grant are separate requirements.
5. Enter the application origin and token through the sandbox connect screen.
   Keep secrets in that flow; do not ask the operator to paste a token into chat.

Use the legitimate UI or a documented authenticated client when automating
the connection. Do not forge Origin/CSRF headers, cookies, approval records or
encrypted state files. Workspace instructions and granted tool access still apply.

## Diagnose the observed symptom

| Symptom | Next check |
| --- | --- |
| Launcher missing | Use the independent `@flowdular/sandbox` package; check its compatibility with the application's SDK |
| `@flowdular/sandbox` returns npm 404 | Check the selected version's publication and registry access; use a verified local artifact when available |
| Server cannot connect | Confirm the configured application origin is reachable and the platform has started |
| State returns 401 in self-hosted mode | Complete the browser connect/sign-in flow; server readiness alone is insufficient |
| No local driver offered | Confirm loopback mode and the operator's installed/authenticated coding CLI; self-hosted intentionally omits local binaries |
| Token is valid but access denied | Check the active account's sandbox grant and token scopes independently |
| Preview reads denied | Inspect module read permissions and `sandbox.preview.data`; do not broaden all scopes |
| Eject unavailable | Check `sandbox.modules.eject`, all affected spec approvals, current gates and current auto-review |

Status can be read from `GET /sandbox/api/state` in an already authorized
session. Do not dump the whole state response; summarize connection, driver
availability and actionable errors. Preserve `.flowdular/sandbox` during
diagnosis, including sessions, revisions and encrypted connection state.
