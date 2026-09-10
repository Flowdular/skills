# Maintaining Flowdular skills

Keep skills portable and independently installable. Read the owning SDK types,
CLI help or implementation before changing command examples. Never invent flags
or copy private monorepo paths as consumer prerequisites.

Each task lives in `skills/<name>/SKILL.md` with matching `name` and a concise
`description` explaining when an agent should load it. Optional references stay
inside that skill. Project instructions, exact spec approval, authenticated
authority and sandbox write boundaries remain authoritative.

Check `node scripts/validate.mjs` and actual Skills CLI discovery before delivery.
For changed launch/install instructions, test in a temporary consumer directory;
do not replace the user's installed skills. Review examples against the supported
Flowdular release. Preserve other edits and never publish credentials.
