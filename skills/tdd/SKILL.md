---
name: tdd
description: Test-driven development. Build a feature or fix a bug through the red-green loop, one test at a time, at the seams the spec agreed.
---

# Test-Driven Development

TDD is the red → green loop. What makes a test worth keeping (good tests, seams, anti-patterns, mocking) is in `docs/coding-standards.md` §9. Read it before the first cycle and consult it on every cycle, not after.

Read `docs/agents/domain.md` and follow it, so test names and interface vocabulary use the glossary's terms and respect the ADRs in the area you touch.

## Before the first test

List the seams under test. Take them from the spec's testing decisions. A seam the spec did not agree is a stop (§9.1): raise it, don't invent it.

Order the work as vertical slices: one acceptance criterion, or one behaviour inside it, per slice. Never write all the tests first.

## The loop

1. **Red.** Write one test, at an agreed seam, for the next behaviour. Run it and watch it fail for the reason you expect. A test that passes at once proves nothing: fix the test or pick another behaviour.
2. **Green.** Write only enough code to pass it. Don't anticipate the next test or add speculative features.
3. Run the fast checks from `docs/agents/checks.md`. Commit the green cycle as one small commit (`docs/git-etiquette.md`).
4. Repeat with the next slice. Each test is a tracer bullet: let what the last cycle taught you shape the next one.

**A bug fix starts with red:** a test that reproduces the bug through the interface and fails. Then fix the root cause.

**Refactoring is not part of the loop.** It belongs to review, with the whole change in view. Inside the loop, write the plain code that passes.

## Done

Every slice is green and the full checks from `docs/agents/checks.md` pass. Report the command and its result verbatim.

## Next step

Inside `/implement`, return to the session that started you. On its own, tell the user to run `/code-review` on the branch in this session.
