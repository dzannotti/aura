---
name: ask-aura
description: Ask which Aura skill fits your situation and what each one does. A router over the Aura skills.
disable-model-invocation: true
---

# Ask Aura

You don't remember every skill, so ask.

Before stating what a skill does or recommending a step be skipped, read that skill's SKILL.md: the summaries here are for orientation only.

Aura grows one skill at a time. This page lists only the skills that exist. If the user asks for a step Aura has no skill for yet, say so plainly instead of improvising one.

## Skills

### `/setup-aura`

Configure a repo for Aura. It records where issues live, which commands check the code (fast and full), and how the domain docs are laid out, and it writes `docs/coding-standards.md`, `docs/git-etiquette.md` and empty `NORTH_STAR.md`, `GLOSSARY.md` and `docs/adr/`. Run it once per repo before any other Aura skill, and again to change the configuration.

### `/grill-with-docs`

Sharpen a plan, design or idea by interview, in a repo. Runs `/grilling` and `/domain-modeling` together: one question at a time with a recommended answer, decisions the context already settles taken for you and listed as assumptions, high-fidelity questions parked as needing a prototype, and `GLOSSARY.md` and ADRs updated as terms and decisions land. Reach for it whenever you're about to change something and want to align first.

### `/grilling`

The interview itself, with no docs side effects. Other skills run it internally; reach for it directly to stress-test thinking outside a repo, or when you want the interview without touching `GLOSSARY.md` or ADRs.

### `/domain-modeling`

The discipline for the project's domain language: challenge a fuzzy or conflicting term, check proposals against `NORTH_STAR.md`, keep `GLOSSARY.md` a clean glossary, and record a hard-to-reverse decision as an ADR. `/grill-with-docs` drives it; reach for it directly when the words, not the process, are the problem.

### `/ask-aura`

This page: which skill fits your situation, and what each one does.

## Precondition

**`/setup-aura`**: run it before the first Aura flow in a repo. Every other skill reads what it writes.
