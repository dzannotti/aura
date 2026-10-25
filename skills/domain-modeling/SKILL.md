---
name: domain-modeling
description: Build and sharpen a project's domain model. Use when discussing codebase terminology, writing or editing a GLOSSARY.md, or recording or editing an ADR.
---

# Domain Modeling

Build and sharpen the domain model while you design: challenge terms, invent edge-case scenarios, and write terms and decisions down the moment they settle. Reading `GLOSSARY.md` for vocabulary is not this skill; changing the model is.

The model lives in `GLOSSARY.md` (or one per context behind `GLOSSARY-MAP.md`) and `docs/adr/`. `/setup-aura` creates them, so they never first appear inside a feature change. Write into them only when you have something to write. If one is missing, tell the user to run `/setup-aura` rather than creating it.

## During the session

- **Challenge against the glossary.** When a term conflicts with `GLOSSARY.md`, say so at once: "Your glossary defines 'cancellation' as X, but you seem to mean Y. Which is it?"
- **Sharpen fuzzy language.** Propose one canonical term for a vague or overloaded one: "You're saying 'account': do you mean the Customer or the User?"
- **Stress-test with scenarios.** Invent concrete edge cases that force precise boundaries between concepts.
- **Cross-reference with code.** When the user states how something works, check the code and surface contradictions: "Your code cancels entire Orders, but you just said partial cancellation is possible. Which is right?"
- **Update `GLOSSARY.md` inline**, as each term settles, in the format of [GLOSSARY-FORMAT.md](GLOSSARY-FORMAT.md). It holds definitions only: no implementation detail, no spec, no scratch notes.

## Offer ADRs sparingly

Offer one only when all three hold:

1. **Hard to reverse**: changing your mind later costs something real.
2. **Surprising without context**: a future reader will wonder why.
3. **A real trade-off**: there were genuine alternatives, and one won for specific reasons.

Use the format in [ADR-FORMAT.md](ADR-FORMAT.md).

## Next step

When another skill loaded this one, hand back to it. Otherwise, if the words led to a design question, suggest `/grill-with-docs` on it in this session.
