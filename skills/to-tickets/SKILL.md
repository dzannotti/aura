---
name: to-tickets
description: Cut a spec into vertical-slice tickets on the issue tracker, each with acceptance criteria, the user stories it covers and its blocking edges.
disable-model-invocation: true
---

# To Tickets

Break a spec into **tickets**: tracer-bullet vertical slices, each declaring the tickets that **block** it.

## 1. Gather

The user passes the spec reference. Fetch its full body and comments (see `docs/agents/issue-tracker.md`). Read `docs/agents/domain.md` and follow it, so ticket titles use the glossary's terms and respect the ADRs. Explore the code the spec touches, and look for prefactoring that would make the work easier: "make the change easy, then make the easy change."

## 2. Slice

- Each slice cuts a narrow but complete path through every layer the feature needs: vertical, never one layer at a time.
- A completed slice is demoable or verifiable on its own.
- Each slice fits one fresh session (under about 120k tokens) and aims at 500 changed lines or fewer, not counting lockfiles and generated files. A slice that needs more says why in one line.
- Order: prefactoring first, then the tracer bullet (the thinnest end-to-end path), then the slice you are least sure of, then the rest.
- **Split, never shrink.** A slice that would need a "for now", a stub or a placeholder becomes two slices.
- Give each slice its **blocking edges**: the tickets that must be done before it can start.

**Wide refactors are the exception to vertical slicing.** One mechanical change whose blast radius fans across the codebase (rename a column, retype a shared symbol) can't land green as a vertical slice. Sequence it as expand–contract: first add the new form beside the old; then migrate the call sites in batches sized by blast radius, each batch its own ticket blocked by the expand; then delete the old form in a ticket blocked by every batch. When even the batches can't stay green alone, keep the sequence but let them share an integration branch, all blocking a final integrate-and-verify ticket.

Then build a coverage table: every user story `US-n` in the spec against the tickets that cover it. A story no ticket covers is a gap: add a slice, or treat it as a doubt.

## 3. Ask only on a real doubt

When you are sure of the breakdown, publish it. Ask the user only when one of these holds, and ask exactly that question:

- A story can't be placed without a decision the spec didn't make.
- A split changes the order or scope in a way the spec didn't settle.
- A slice can't get under about 1,000 changed lines without splitting a behaviour the user would see as one.
- Two reasonable granularities would change what gets built first.

## 4. Publish

Load `/technical-writing` and follow it. Publish in dependency order, blockers first, so each ticket can reference real ids. Apply the `ready-for-agent` role from `docs/agents/triage-labels.md`. Never close or edit the spec.

- **Real tracker**: one issue per ticket, as a sub-issue of the spec, with the tracker's native blocking where it has one.
- **Local markdown**: one file per ticket at `.scratch/<spec-slug>/issues/<NN>-<slug>.md`, numbered from `01` in dependency order.

```markdown
## Parent

<the spec, as a reference>

## What to build

The end-to-end behaviour this ticket makes work, from the user's perspective, not a layer-by-layer list.

**Covers:** US-2, US-5

## Acceptance criteria

- [ ] <a condition a test or a reader can check>

## Blocked by

<the blocking tickets, or "None (can start immediately)"; omit when native blocking is set>
```

No file paths or code: they go stale fast. The exception is a prototype snippet that pins a decision more precisely than prose: inline only the decision-carrying part and say it came from a prototype.

Then show the user the published list: each ticket's title, what it covers and what blocks it.

## Next step

Tell the user to start a fresh session (`/new` in pi, `/clear` in Claude Code) and run `/implement-spec <spec reference>` to build the whole spec, or `/implement <ticket reference>` to build one ticket, written as the exact command for their harness.
