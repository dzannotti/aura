---
name: setup-aura
description: "Configure a repo for Aura: issue tracker, check commands, domain docs, coding standards and git etiquette. Run once per repo before the other Aura skills, and again to update the configuration."
disable-model-invocation: true
---

# Setup Aura

Write the per-repo configuration, labels and docs the other Aura skills read. Explore, propose, confirm, then write. A re-run updates in place and never overwrites a user edit without showing the difference.

## 1. Explore

- The git remote: GitHub or not, which repo.
- `AGENTS.md` and `CLAUDE.md`: an existing `## Aura` block; whether `CLAUDE.md` imports `AGENTS.md`.
- `GLOSSARY.md`, `GLOSSARY-MAP.md`, `docs/adr/`, `docs/coding-standards.md`, `docs/git-etiquette.md`, `docs/agents/`, `.scratch/`, and whether `.gitignore` covers `.local/`.
- Every command the repo already uses to check itself: manifest scripts, task runner files, and what CI runs.
- Monorepo signals: a workspace declaration, or several packages with their own sources.

## 2. Propose, one section at a time

Lead each section with your recommendation. Skip a section that exploration already settled.

- **A. Issue tracker.** GitHub when the remote is GitHub. Otherwise offer GitHub, local markdown (`.scratch/`; safe for one agent on one branch only, since files drift across branches), or another tracker the user describes in a paragraph.
- **B. Checks.** A **fast** command (format, lint, type check; seconds) and a **full** command (fast plus tests and every merge-blocking gate), taken from what the repo and its CI already run. A level with no command is recorded as `none`, and you tell the user that agents cannot prove their work at that level. Never invent a command.
- **C. Domain layout.** Single-context unless monorepo signals exist; then offer one `GLOSSARY.md` per context behind a root `GLOSSARY-MAP.md`.
- **D. Labels.** Propose the default `aura:` labels from [triage-labels.md](templates/triage-labels.md). If the tracker already uses its own triage labels, map each role to the existing label instead of creating a duplicate.
- **E. Standards.** If either standards doc exists, list each rule that differs from the template and let the user decide keep, replace or merge, rule by rule.

Then show drafts of the `## Aura` block and the four `docs/agents/` files, and let the user edit them.

## 3. Write

- **`AGENTS.md`**: the `## Aura` block from [agents-block.md](templates/agents-block.md), created or updated in place. pi, Claude Code and Codex all read `AGENTS.md`. If `CLAUDE.md` exists without importing it, ask whether to add `@AGENTS.md`.
- **`docs/agents/issue-tracker.md`** from [issue-tracker-github.md](templates/issue-tracker-github.md) or [issue-tracker-local.md](templates/issue-tracker-local.md), or from the user's description.
- **`docs/agents/checks.md`** from [checks.md](templates/checks.md), with the confirmed commands.
- **`docs/agents/domain.md`** from [domain.md](templates/domain.md).
- **`docs/agents/triage-labels.md`** from [triage-labels.md](templates/triage-labels.md), with the confirmed labels. On GitHub, create each label with `gh label create <label> --force`, which is safe to re-run.
- **`docs/coding-standards.md`** and **`docs/git-etiquette.md`** from [coding-standards.md](templates/coding-standards.md) and [git-etiquette.md](templates/git-etiquette.md), unless kept in section E.
- **`.gitignore`**: add `.local/`, the scratch space for Aura working files (grilling ledgers, review reports) that must never be committed.
- **Only where missing**: `GLOSSARY.md` containing `# Glossary` (single-context), and `docs/adr/.gitkeep`.

Tell the user what was written.

## Next step

Tell the user to commit the setup on its own (see `docs/git-etiquette.md`), then start a fresh session (`/new` in pi, `/clear` in Claude Code) and run `/grill-with-docs <the first thing they want to build>`, written as the exact command for their harness.
