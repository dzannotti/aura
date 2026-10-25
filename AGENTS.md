# Aura

A software factory made of agent skills. One principal engineer agrees the destination and the spec; agents do the rest and stop only for decisions, deviations, and final approval.

## Layout

- `skills/<name>/SKILL.md`: one skill per directory, flat, real directories (Codex drops symlinks on install). Supporting files sit next to the `SKILL.md` that links them.
- `agents/<name>.md`: subagent definitions.
- `.claude-plugin/`: Claude Code plugin and marketplace manifests. Claude Code discovers `skills/` and `agents/` by convention.
- `package.json`: the pi package manifest (`pi.skills`) and this repo's own scripts.
- `scripts/`: tooling for developing Aura itself, not shipped to target repos.

## Rules for skills

- Skills are language- and stack-agnostic. A skill never names a language, framework, formatter, linter or test runner; it points at the target repo's `docs/agents/checks.md` and `docs/coding-standards.md` instead.
- Skills are harness-agnostic. Write for pi, Claude Code and Codex alike; when a step needs a harness feature, say what it achieves, not which tool name to call.
- Every skill is described in `skills/ask-aura/SKILL.md`: what it does and when to reach for it. Add the entry in the same change that adds the skill.
- When a skill is adapted from another collection, record the source in `CREDITS.md` in the same change.
- Bump `version` in `package.json` and `.claude-plugin/plugin.json` together.

## Developing

- `bun check` is the definition of done: skill structure, type check, formatting, tests. CI runs the same command.
- `bun fmt` formats everything, Markdown included.
- Use pi with `pi install ~/Work/aura` (loads in place, edits are live) and Claude Code with `claude --plugin-dir ~/Work/aura`.
- Code here follows `skills/setup-aura/templates/coding-standards.md` and commits follow `skills/setup-aura/templates/git-etiquette.md`.
