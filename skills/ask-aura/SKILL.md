---
name: ask-aura
description: Ask which Aura skill fits your situation and what each one does. A router over the Aura skills.
disable-model-invocation: true
---

# Ask Aura

Before stating what a skill does or recommending a step be skipped, read that skill's SKILL.md: the summaries here are for orientation only.

Aura grows one skill at a time. **Skills** lists what exists today. **Planned** lists skills that other skills already link to but that are not built yet. If the user needs a planned skill, say it is planned and what it will do; don't improvise it.

## Skills

### `/setup-aura`

Configure a repo for Aura. It records where issues live, which commands check the code (fast and full), and how the domain docs are laid out, and it writes `docs/coding-standards.md`, `docs/git-etiquette.md` and empty `GLOSSARY.md` and `docs/adr/`. Run it once per repo before any other Aura skill: every other skill reads what it writes. Run it again to change the configuration.

### `/grill-with-docs`

Sharpen a plan, design or idea by interview, in a repo. Runs `/grill-me` and `/domain-modeling` together, so `GLOSSARY.md` and ADRs are updated as terms and decisions land. Reach for it whenever you're about to change something in a repo and want to align first.

### `/grill-me`

The interview itself, with no docs side effects. One question at a time with a recommended answer; decisions the context already settles are taken as assumptions; high-fidelity questions are flagged as likely needing a `/prototype`. It writes a ledger of the session to `.local/grill/`, which the next step reads. Reach for it to stress-test a plan, a design or a piece of writing outside a repo. Other skills run it internally when they need a grilling session.

### `/domain-modeling`

The discipline for the project's domain language: challenge a fuzzy or conflicting term, keep `GLOSSARY.md` a clean glossary, and record a hard-to-reverse decision as an ADR. `/grill-with-docs` drives it; reach for it directly when the words, not the process, are the problem.

### `/ask-aura`

This page: which skill fits your situation, and what each one does.

## Planned

### `/to-spec`

Turn a grilling ledger into a spec on the issue tracker: numbered user stories, implementation and testing decisions with the agreed test seams, and out of scope. Three fresh-context review agents check it before the user gives one explicit approval.

### `/prototype`

Throwaway code that answers one high-fidelity question: how a UI should look and feel, or whether a state model behaves right. Grilling sends questions here when the user can't answer them without seeing the thing.

### `/handoff`

Write a portable handoff document so a fresh session can pick up one piece of the work, for example a prototype spun off from a grilling session, and hand what it learned back.

## Next step

Give the user the one skill that fits, as the exact command for their harness with a prompt already written. Stay in this session: there is no context worth leaving behind.
