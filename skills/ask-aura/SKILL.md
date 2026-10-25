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

### `/ask-aura`

This page: which skill fits your situation, and what each one does.

## Precondition

**`/setup-aura`**: run it before the first Aura flow in a repo. Every other skill reads what it writes.
