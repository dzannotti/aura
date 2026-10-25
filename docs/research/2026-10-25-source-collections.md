# Source collections

What each collection Aura draws from contains, and what Aura takes from it. Read on 2026-10-25.

## Matt Pocock

- [mattpocock/skills](https://github.com/mattpocock/skills): grilling, grill-with-docs, domain-modeling (GLOSSARY + ADRs), to-spec, to-tickets (vertical slices with blocking edges), implement, implement-spec (task-graph frontier, worktrees, integration branch), tdd (agree seams first), code-review (Standards and Spec axes in separate subagents), diagnosing-bugs (a red feedback loop before any hypothesis), wayfinder (decision tickets, fog of war), prototype, handoff, retro, improve-codebase-architecture, ask-matt (flow router) and its phase-boundaries tree.
- [mattpocock/sandcastle](https://github.com/mattpocock/sandcastle): a TypeScript library that runs agents in Docker or Podman sandboxes. Its templates loop planner, then implementer and reviewer per branch, then a merger agent.
- Videos (2026): the main flow; wayfinder ("specs are disposable destinations"); prototype ("raise the fidelity of the discussion"); handoff (a DIY subagent across sessions and harnesses); the thermonuclear review ("be ambitious past the diff"); "9 things people get wrong with grilling" (low- vs high-fidelity questions, scope, smart model, keep the session's decisions); de-slop with improve-codebase-architecture (a HITL strategic pass).
- Key numbers: the smart zone ends around 120-150k tokens; clear between tickets; review in fresh subagents.

## Lauren Tan (poteto)

- [cursor/plugins pstack](https://github.com/cursor/plugins/tree/main/pstack): principles as small skills, figure-it-out, show-me-your-work (TSV decision log, cross-model "Attention" list), ketchup, interrogate and arena (model diversity as the adversarial signal), architect, correct (mistake class to the highest fix that works), create- and maintain-verification-skill (a CLI plus a feature map), unslop, technical-writing.
- [poteto/noodle](https://github.com/poteto/noodle), [poteto/brainmaxxing](https://github.com/poteto/brainmaxxing): brain vault, reflect, meditate, ruminate, plan, review, adversarial-review.
- Talk, "How I shipped 2,500 PRs last month" ([YouTube](https://www.youtube.com/watch?v=NjoZoUm85x0)): trust is the bottleneck. Fix order: architecture makes the mistake impossible, then static analysis, then rules and skills, then a style guide. The codebase is the agents' memory; anti-patterns spread like a virus; ban comments; one paved path; the Gardener role.
- Matt Pocock interview ([YouTube](https://www.youtube.com/watch?v=MN9dGgmLyso)): at the end state agents merge and she samples merged work each morning.

## Addy Osmani

- [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills): lifecycle commands, interview-me (one question with a guess, ~95% confidence), doubt-driven-development (artifact plus contract, never the claim), constraint-driven-development (CONSTRAINTS.md, ratchets), spec-driven-development, incremental-implementation.
- [addyosmani/factory](https://github.com/addyosmani/factory): charter (tier, load-bearing paths, automatable, stop conditions, review-queue limit), label queue, deterministic branch claim, fail-closed gates.sh, prove-test.sh (the test must fail without the fix), cold factory-verifier, factory-critic, never merge.

## BMAD (pre-v7, commit 61e01f8)

[bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD): the Scrum Master, QA agent, sharding and correct-course are gone. What remains: a ticket tree with stable `R<n>` ids; a build-time plan with a frozen intent block, code map and 900-1600 token budget that is the builder's only context; review triage routing (intent_gap, bad_plan, patch, defer; 5-loop cap); status stops at `built` and only the human sets `done`; replan; an epic retrospective with aggregate views.

## Uncle Bob

[unclebob/ub-mode](https://github.com/unclebob/ub-mode): poteto's principles reduced to bullets, plus three gate tools for Go, TypeScript, Java, Python, Rust and Clojure: [crapper](https://github.com/unclebob/crapper) (CRAP < 10 per function), [dryer](https://github.com/unclebob/dryer) (duplication ≥ 0.8), [mutator](https://github.com/unclebob/mutator) (mutation testing).
