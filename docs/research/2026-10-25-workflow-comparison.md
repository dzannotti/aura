# Workflow comparison: spec-kit, superpowers, gstack, humanlayer

How four mature agent workflows handle what Aura must handle. Read from the skill files on 2026-10-25.

## Ideas Aura lacks, ranked

1. **Rulings, not stalls** (superpowers `subagent-driven-development`, `references/final-review.md`). During a build the coordinator decides ambiguities itself, logs `what — why — cost if wrong`, and stops only for an irreversible operation, a security-sensitive action, an external side effect, or a hopeless plan. The human sees every ruling at the end.
2. **Session kinds** (gstack preamble, `autoplan/sections/unattended.md.tmpl`). State what interactive, spawned, unattended and headless runs each do at a gate. An unattended run never approves.
3. **Evidence bound to a SHA** (gstack `ship` receipts; superpowers `verification-before-completion`). A verdict is valid only for the tree it checked; a later push invalidates it. "Agent reports success → check the diff."
4. **Bounded fix loop** (superpowers `references/fix-loop.md`). The same implementer for 3 rounds, a fresh implementer on a stronger model for 2, then the controller rules. Re-reviews cover only the fix; out-of-scope findings don't extend the loop.
5. **Conflict scan before parallel dispatch** (superpowers `writing-plans`, `references/preflight.md`). Tasks state what they consume and produce; pairs sharing files or interfaces don't run in parallel. superpowers forbids parallel implementers outright.
6. **Intent-blind research** (humanlayer `create-research`). The agent researching existing code must not read the ticket, so findings aren't bent toward the wanted outcome.
7. **Provenance in handoffs** (gstack `context-save`). Each claim is tagged `run`, `read` or `assumed`; a resume checks `assumed` first.
8. **Converge pass** (spec-kit `templates/commands/converge.md`). After the build, compare spec and code and append the gaps as new tasks.

## Where they disagree

- **Parallel builders**: superpowers forbids them, spec-kit allows them for tasks on different files, humanlayer runs phases in sequence, gstack merges parallel PRs in order through a queue.
- **Human gates**: spec-kit gates spec and plan; humanlayer gates design, outline and every phase; superpowers gates design and plan; gstack `autoplan` has one final gate.
- **Where state lives**: only spec-kit (in-repo files) and a GitHub-based design resume on any machine without extra infrastructure.
- **Tests**: optional in spec-kit; superpowers deletes code written before its test.

## Avoid

- gstack's generated skills of 5-8k words.
- superpowers' coercive auto-triggering ("1% chance… you MUST invoke").
- spec-kit's guess-first specs and optional tests.
- humanlayer's manual human check on every phase by default.
