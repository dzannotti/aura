---
name: setup-aura
description: "Configure a repo for Aura: issue tracker, check commands, domain docs, coding standards and git etiquette. Run once per repo before the other Aura skills, and again to update the configuration."
disable-model-invocation: true
---

# Setup Aura

Scaffold the per-repo configuration and docs the Aura skills assume:

- **Domain docs**: `NORTH_STAR.md`, `GLOSSARY.md` and `docs/adr/`, plus the rules for reading them
- **Standards**: `docs/coding-standards.md` and `docs/git-etiquette.md`
- **Checks**: the repo's own fast and full check commands
- **Issue tracker**: where issues live (GitHub by default; local markdown also works)

This is a prompt-driven skill, not a deterministic script. Explore, present what you found, confirm with the user, then write. Running it again updates what exists in place; it never overwrites user edits without showing the difference first.

## Process

### 1. Explore

Read whatever exists; don't assume:

- `git remote -v` and `.git/config`: is this a GitHub repo? Which one?
- `AGENTS.md` and `CLAUDE.md` at the repo root: does either exist? Is there already an `## Aura` section? Does `CLAUDE.md` import or point at `AGENTS.md`?
- `NORTH_STAR.md`, `GLOSSARY.md`, `GLOSSARY-MAP.md` at the root, `docs/adr/` and any `<context>/docs/adr/`
- `docs/coding-standards.md`, `docs/git-etiquette.md`, `docs/agents/`
- `.scratch/`: a sign that a local-markdown tracker is already in use
- The commands the repo already uses to check itself: scripts in the package manifest, task runner files (`Makefile`, `justfile`, `Taskfile`), and every command the CI workflows run
- Monorepo signals: a workspace declaration or several packages with their own sources. Their absence means single-context, which is almost every repo.

### 2. Present findings and ask

Summarise what's present and what's missing. Then take the sections in order: one section, one answer, then the next. Lead each section with the recommended answer so the user can accept it in a word. Skip a section entirely when exploration already settled it.

**Section A: Issue tracker.** If a `git remote` points at GitHub, propose GitHub. Otherwise offer:

- **GitHub**: issues live in the repo's GitHub Issues (uses the `gh` CLI)
- **Local markdown**: issues live as files under `.scratch/<effort>/` (one agent on one branch only; files drift when several agents edit them on separate branches)
- **Other** (Linear, Jira, …): ask the user to describe the workflow in one paragraph and record it as prose

**Section B: Check commands.** Propose a **fast** command (format, lint, type check; seconds) and a **full** command (fast plus tests and every other merge-blocking gate), taken from what the repo and its CI already run. Prefer one command per level that CI also runs. If no check exists for a level, record `none` and tell the user plainly that agents will have no way to prove their work at that level. Never invent a command the repo can't run.

**Section C: Domain docs layout.** Default to **single-context**: one `GLOSSARY.md` and `docs/adr/` at the root. Write it without asking. Offer **multi-context** (a root `GLOSSARY-MAP.md` pointing at one `GLOSSARY.md` per context) only when exploration found monorepo signals.

**Section D: Standards.** If `docs/coding-standards.md` or `docs/git-etiquette.md` already exists, show how it differs from the Aura template and ask whether to keep it, replace it, or merge. Never merge silently: list each conflicting rule and let the user decide it.

### 3. Confirm and edit

Show the user a draft of:

- The `## Aura` block for `AGENTS.md`
- `docs/agents/issue-tracker.md`, `docs/agents/checks.md` and `docs/agents/domain.md`

Let them edit before writing.

### 4. Write

**Steering file.** Write the `## Aura` block (template: [agents-block.md](templates/agents-block.md)) into `AGENTS.md`, creating it if needed. pi, Claude Code and Codex all read `AGENTS.md`. If `CLAUDE.md` also exists and neither imports nor points at `AGENTS.md`, ask the user whether to add `@AGENTS.md` to it. If an `## Aura` block already exists, update it in place and leave the surrounding sections alone.

**Config docs**, from the templates in this skill:

- `docs/agents/issue-tracker.md` from [issue-tracker-github.md](templates/issue-tracker-github.md) or [issue-tracker-local.md](templates/issue-tracker-local.md); for "other", write it from the user's description
- `docs/agents/checks.md` from [checks.md](templates/checks.md), with the confirmed commands filled in
- `docs/agents/domain.md` from [domain.md](templates/domain.md)

**Standards**, unless the user chose to keep their own in Section D:

- `docs/coding-standards.md` from [coding-standards.md](templates/coding-standards.md)
- `docs/git-etiquette.md` from [git-etiquette.md](templates/git-etiquette.md)

**Empty domain docs**, only where missing. Never overwrite one that exists.

- `NORTH_STAR.md` containing only `# North Star`
- `GLOSSARY.md` containing only `# Glossary` (single-context only)
- `docs/adr/.gitkeep`

### 5. Done

Tell the user what was written and which docs the other Aura skills will now read. They can edit `docs/agents/*.md` and the standards directly; re-running this skill is only needed to switch tracker or restart from the templates.
