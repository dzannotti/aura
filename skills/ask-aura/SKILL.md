---
name: ask-aura
description: Ask which Aura skill fits your situation and what each one does. A router over the Aura skills.
disable-model-invocation: true
---

# Ask Aura

You don't remember every skill, so ask.

Before stating what a skill does or recommending a step be skipped, read that skill's SKILL.md: the summaries here are for orientation only.

Aura grows one skill at a time. **Skills** lists what exists today. **Planned** lists skills that other skills already link to but that are not built yet. If the user needs a planned skill, say it is planned and what it will do; don't improvise it.

## Skills

### `/setup-aura`

Configure a repo for Aura. It records where issues live, which commands check the code (fast and full), and how the domain docs are laid out, and it writes `docs/coding-standards.md`, `docs/git-etiquette.md` and empty `NORTH_STAR.md`, `GLOSSARY.md` and `docs/adr/`. Run it once per repo before any other Aura skill, and again to change the configuration.

### `/grill-with-docs`

Sharpen a plan, design or idea by interview, in a repo. Runs `/grill-me` and `/domain-modeling` together, so `GLOSSARY.md` and ADRs are updated as terms and decisions land. Reach for it whenever you're about to change something in a repo and want to align first.

### `/grill-me`

The interview itself, with no docs side effects. One question at a time with a recommended answer; decisions the context already settles are taken for you and listed as assumptions; high-fidelity questions are flagged as likely needing a `/prototype`. Reach for it to stress-test a plan, a design or a piece of writing outside a repo. Other skills run it internally when they need a grilling session.

### `/domain-modeling`

The discipline for the project's domain language: challenge a fuzzy or conflicting term, show how each proposal aligns with `NORTH_STAR.md` and challenge requests that go against it, keep `GLOSSARY.md` a clean glossary, and record a hard-to-reverse decision as an ADR. `/grill-with-docs` drives it; reach for it directly when the words, not the process, are the problem.

### `/ask-aura`

This page: which skill fits your situation, and what each one does.

## Planned

### `/north-star`

Create and maintain `NORTH_STAR.md`: grill the user into a short brief, a set of destination statements that work can be checked against, and explicit non-goals, and revise it when the project learns something that moves the destination. Every other skill reads it; `/domain-modeling` challenges proposals against it.

### `/prototype`

Throwaway code that answers one high-fidelity question: how a UI should look and feel, or whether a state model behaves right. Grilling sends questions here when the user can't answer them without seeing the thing.

### `/handoff`

Write a portable handoff document so a fresh session can pick up one piece of the work, for example a prototype spun off from a grilling session, and hand what it learned back.

## Precondition

**`/setup-aura`**: run it before the first Aura flow in a repo. Every other skill reads what it writes.
