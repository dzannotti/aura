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

Configure a repo for Aura. It records where issues live and which `aura:` triage labels mark their state, which commands check the code (fast and full), and how the domain docs are laid out, and it writes `docs/coding-standards.md`, `docs/git-etiquette.md` and empty `GLOSSARY.md` and `docs/adr/`. Run it once per repo before any other Aura skill: every other skill reads what it writes. Run it again to change the configuration.

### `/grill-with-docs`

Sharpen a plan, design or idea by interview, in a repo. Runs `/grill-me` and `/domain-modeling` together, so `GLOSSARY.md` and ADRs are updated as terms and decisions land. Reach for it whenever you're about to change something in a repo and want to align first.

### `/grill-me`

The interview itself, with no docs side effects. One question at a time with a recommended answer; decisions the context already settles are taken as assumptions; high-fidelity questions are flagged as likely needing a `/prototype`. Reach for it to stress-test a plan, a design or a piece of writing outside a repo. Other skills run it internally when they need a grilling session.

### `/domain-modeling`

The discipline for the project's domain language: challenge a fuzzy or conflicting term, keep `GLOSSARY.md` a clean glossary, and record a hard-to-reverse decision as an ADR. `/grill-with-docs` drives it; reach for it directly when the words, not the process, are the problem.

### `/to-spec`

Turn the grilling session you just had (run it in that same session), or a finished wayfinder map, into a spec on the issue tracker: numbered user stories, implementation and testing decisions with the agreed test seams, and out of scope. Three fresh-context agents review the draft first: `spec-fidelity` (does it say what was decided?), `spec-builder-check` (could someone build it without guessing?) and `spec-critic` (should it be built this way? advisory). Then the user gives one explicit approval.

### `/to-tickets`

Cut a spec into tracer-bullet vertical slices on the issue tracker: prefactoring first, then the thinnest end-to-end path, then the riskiest slice. Each ticket carries acceptance criteria, the stories it covers (`covers: US-n`) and its blocking edges, and fits one fresh session. It asks you only when the breakdown hinges on a decision the spec didn't make.

### `/wayfinder`

Plan work too big and foggy for one session as a map on the issue tracker: a checkable destination, decision tickets (research, prototype, grilling, task) resolved one per session, and fog that graduates into tickets as the way clears. When the way is clear, `/to-spec` turns the map into a spec published under it. Reach for it only for fog: if the way is clear and the work fits one session, grill it and build it.

### `/technical-writing`

The drafting standard for every document Aura writes for a person or an agent: specs, tickets, ADRs, pull request bodies, docs. Pick the mode, write to the reader, one statement at a time, nothing open to two readings. Writing skills load it while drafting.

### `/unslop`

The catalog of AI writing patterns, with stable rule numbers, and how to fix each. Run on a finished draft. The `unslop` agent applies it to one file in a fresh context and returns a short report.

### `/ask-aura`

This page: which skill fits your situation, and what each one does.

## Planned

### `/research`

Answer one question from primary sources (official docs, source code, specs) in a background agent, and write the cited findings to `docs/research/`.

### `/implement-spec`

Build a whole spec from its tickets: work the ready frontier of the ticket graph with builder agents in parallel worktrees, resumable from the tracker and pushed branches on any machine.

### `/implement`

Build one ticket: test-first at the agreed seams, the repo's checks, push often, stop at built.

### `/prototype`

Throwaway code that answers one high-fidelity question: how a UI should look and feel, or whether a state model behaves right. Grilling sends questions here when the user can't answer them without seeing the thing.

### `/handoff`

Write a portable handoff document so a fresh session can pick up one piece of the work, for example a prototype spun off from a grilling session, and hand what it learned back.

## Next step

Give the user the one skill that fits, as the exact command for their harness with a prompt already written. Stay in this session: there is no context worth leaving behind.
