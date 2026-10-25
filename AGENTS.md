# Aura

A software factory made of agent skills. One principal engineer agrees the destination and the spec; agents do the rest and stop only for decisions, deviations, and final approval.

## Layout

- `skills/<name>/SKILL.md`: one skill per directory, flat, real directories (Codex drops symlinks on install). Supporting files sit next to the `SKILL.md` that links them.
- `agents/<name>.md`: subagent definitions.
- `.claude-plugin/`: Claude Code plugin and marketplace manifests. Claude Code discovers `skills/` and `agents/` by convention.
- `package.json`: the pi package manifest (`pi.skills`) and this repo's own scripts.
- `scripts/`: tooling for developing Aura itself, not shipped to target repos.
- `docs/research/`: dated research notes behind Aura's design choices. Read the relevant one before changing a skill it covers.

## Rules for skills

- Write for the agent that will run the skill. State what changes its behaviour or removes a guess; cut what it already does by default. Say each rule once, in the one place that owns it. `bun check` caps a `SKILL.md` at 1,200 words; detail it rarely needs goes in a linked file.
- Protect the orchestrator's context. Pass subagents file paths, never pasted content or the author's account of the work; have them write long output to `.local/` and return a short verdict.
- Every skill ends with `## Next step`: the exact next command, and whether to continue the session or start a fresh one.
- Skills are language- and stack-agnostic. A skill never names a language, framework, formatter, linter or test runner; it points at the target repo's `docs/agents/checks.md` and `docs/coding-standards.md` instead.
- Skills are harness-agnostic. Write for pi, Claude Code and Codex alike; when a step needs a harness feature, say what it achieves, not which tool name to call.
- Every skill is described in `skills/ask-aura/SKILL.md`: what it does and when to reach for it. Add the entry in the same change that adds the skill.
- Link skills to each other by name (`` `/name` ``), including skills that don't exist yet. Never drop a link because the target isn't built: list the target under **Planned** in `ask-aura` instead. When a planned skill gets built, `grep -rn '`/name`' skills/` finds every skill that depends on it. `bun check` fails on a link to a skill that is neither built nor planned.
- When a skill is adapted from another collection, record the source in `CREDITS.md` in the same change.
- Bump `version` in `package.json` and `.claude-plugin/plugin.json` together.

## Developing

- `bun check` is the definition of done: skill structure, type check, formatting, tests. CI runs the same command.
- `bun fmt` formats everything, Markdown included.
- Use pi with `pi install ~/Work/aura` (loads in place, edits are live) and Claude Code with `claude --plugin-dir ~/Work/aura`.
- Code here follows `skills/setup-aura/templates/coding-standards.md` and commits follow `skills/setup-aura/templates/git-etiquette.md`.
