# Credits

Aura adapts ideas and text from these collections. Each entry names what was taken and where it lives in Aura.

## Matt Pocock — [mattpocock/skills](https://github.com/mattpocock/skills) (MIT)

- `setup-aura`: process and issue-tracker and domain templates adapted from `setup-matt-pocock-skills`.
- `ask-aura`: router shape adapted from `ask-matt`.
- `grill-me`: design tree, frontier, facts-are-the-agent's-job, and the fidelity and scope lessons from "9 Things People Get Wrong With My /grill-\* skills", adapted from `grilling` and `grill-me`.
- `grill-with-docs`: adapted from `grill-with-docs`.
- `to-spec`: process and spec template adapted from `to-spec`.
- `to-tickets`: adapted from `to-tickets`, with BMAD's ordering rules (the riskiest slice right after the tracer bullet; split, never shrink).
- `domain-modeling`: adapted from `domain-modeling`, with `GLOSSARY-FORMAT.md` and `ADR-FORMAT.md` taken near-verbatim.
- `setup-aura/templates/coding-standards.md` §3, §9 and §10: the deep-module vocabulary, deepening and seam discipline from `codebase-design` and `improve-codebase-architecture`, test guidance from `tdd`, and the smell baseline from `code-review`.

## Daniele Zannotti — yggdrasil and anvil

- `setup-aura/templates/coding-standards.md`: yggdrasil coding standards, made language-agnostic.
- `setup-aura/templates/git-etiquette.md`: anvil git etiquette, with commit rules from yggdrasil.

## Addy Osmani — [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) (MIT)

- `grill-me`: the confidence line, the "want vs should want" probe, "whatever you think is delegation", and the rule that non-interactive runs report a blocker instead of grilling, from `interview-me`.

## Spec review sources

- `agents/spec-fidelity.md`: the two-direction check with one verdict per item from DeepEval's SummarizationMetric; "a recommendation does not settle a choice", stop-on-repeat and the incomplete-input rule from gstack `plan-ceo-review`; "thinking out loud is not a decision" from humanlayer `iterate-prd`.
- `agents/spec-builder-check.md`: obra/superpowers `brainstorming/builder-check-prompt.md`, with spec-kit `analyze`'s vagueness list.
- `agents/spec-critic.md`: Addy Osmani's `factory-critic`.
- `to-spec` review loop: the three-pile triage and scoped re-review from superpowers; the explicit-yes rule from Addy Osmani's `interview-me`.

## Ryan Singer — _Shape Up_

- `grill-me`: low- vs high-fidelity questions.

## Lauren Tan (poteto) — [cursor/plugins pstack](https://github.com/cursor/plugins/tree/main/pstack)

- `setup-aura/templates/coding-standards.md` §1: the outright ban on code comments.
- `unslop`: pstack `unslop`, verbatim apart from the description and the next step.
- `technical-writing`: pstack `technical-writing`, verbatim apart from the description, skill links, the next step, the mode guide and worked example moved to linked files, and one Cursor-specific line (tabs in code snippets) removed.
- `agents/unslop.md`: written for Aura to run `unslop` in a fresh context.
