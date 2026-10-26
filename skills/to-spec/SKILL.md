---
name: to-spec
description: Turn the current grilling session, or a finished wayfinder map, into a spec on the issue tracker. Three fresh-context reviewers check the draft before the user gives one explicit approval.
disable-model-invocation: true
---

# To Spec

A spec is the destination of one multi-session piece of work: what the code will do when it is done. It is disposable. Its issue closes when the code lands.

## 1. Find the source

The source is what was decided, and nothing else. Don't re-interview the user.

- **This conversation**, by default: the grilling session that just happened. Only the user's assent or instruction settles a choice; your recommendations and their thinking out loud do not.
- **A wayfinder map**, when the user passes one: its closed decision tickets and their resolution comments. Link each decision in the spec to the ticket it came from.

Read `docs/agents/domain.md` and follow it, so the spec uses the glossary's terms and respects the ADRs. Explore the code the work touches.

If something the spec needs is still undecided, settle it with the user through `/grill-me` before drafting.

## 2. Draft

Load `/technical-writing` and follow it. Write the draft to `.local/spec/<slug>.md`:

```markdown
## Problem statement

The problem the user faces, from the user's perspective.

## Solution

The solution, from the user's perspective.

## User stories

- **US-1**: As an <actor>, I want a <feature>, so that <benefit>.

## Implementation decisions

The decisions that were made: modules built or changed, their interfaces, schema changes, API contracts, specific interactions.

## Testing decisions

What a good test is here (external behaviour only), the agreed test seams and what each one catches, and prior art in the codebase.

## Out of scope

What this spec deliberately does not cover.

## Further notes
```

- Give the stories ids `US-1`, `US-2`… and keep them stable. Tickets cite them later (`covers: US-3`). Cover the whole feature: the list is long.
- No file paths or code. They go stale fast. The exception is a prototype snippet that pins a decision more precisely than prose (a state machine, a schema, a type shape): inline only the decision-carrying part and say it came from a prototype.
- Take the test seams from the source. If none were agreed, agree them with the user now: prefer existing seams and the highest seam possible.

## 3. Review in fresh contexts

Give each agent only the paths it needs, never a summary or your account of the work. This session's transcript is the newest `.jsonl` file for this project: under `~/.claude/projects/<project path, with every / as ->/` in Claude Code, under `~/.pi/agent/sessions/<project path>/` in pi.

Spawn `spec-fidelity` (the source: this session's transcript file, or the map reference; the draft; the calls file; output `.local/spec/<slug>-fidelity-r<N>.md`) and `spec-builder-check` (draft, output `.local/spec/<slug>-builder-r<N>.md`) in parallel. Sort every finding into one pile:

- **Answered already**: the source settles it. Fix the draft.
- **Minor**: you can decide it without changing what gets built. Decide it, fix the draft, and add it to `.local/spec/<slug>-calls.md`, one line per call.
- **The user's**: only the user can answer it, and the answer changes what gets built.

Re-run both with their previous review, at most three rounds. Count only blocking findings: a finding the calls file explains, or one waiting in the user's pile, is not blocking. Stop a reviewer early when two rounds leave the same findings open.

Then run `spec-critic` once on the final draft (output `.local/spec/<slug>-critic.md`). Its verdict is advisory. Last, run the `unslop` agent once on the draft.

## 4. One approval

Show the user the draft path, the calls file, the questions only they can answer, and the critic's block under its own heading. Fold their answers in, and re-run step 3 on what changed.

Publish only on an explicit yes. "Sounds good" or "sure" is not a yes: ask whether anything needs changing.

## 5. Publish

Publish the spec to the issue tracker (see `docs/agents/issue-tracker.md`) with the `ready-for-agent` role from `docs/agents/triage-labels.md`. When the source was a map, publish it as a sub-issue of the map. Then delete the `.local/spec/` files for this slug.

## Next step

Give the user the spec reference and tell them to start a fresh session (`/new` in pi, `/clear` in Claude Code) and run `/to-tickets <spec reference>`, written as the exact command for their harness.
