---
name: grill-me
description: Grill the user relentlessly, one question at a time, until you reach a shared understanding of a plan, decision, or idea. Use when the user wants to stress-test their thinking, uses any 'grill' trigger phrase, or another skill needs a grilling session.
---

Interview the user until you reach a shared understanding. Map it as a **design tree**: every decision branches into the decisions that hang off it. The user owns the scope; you keep the session on it.

## Scope first

Before the first question, check the size. If it won't settle in one session, or it already holds several high-fidelity questions, propose splitting it and grill one part.

## Spend the user's attention

Attention is highest at the start and drains fast.

- **Facts are your job.** Look up anything the environment can answer, in a subagent so you don't block; only questions downstream of it wait.
- **Don't ask what the context decides.** When the code, the repo's docs or the user's earlier answers settle a question, take the answer and record it as an assumption. Ask every other decision, however small.
- **Ask the most valuable question first**: the one that reshapes most of the tree, or whose answer you can least predict.
- **Make later questions cheap**: prefer confirming your default over asking the user to generate an answer.

## Fidelity

A high-fidelity question depends on seeing or feeling the thing: how a UI feels, how a state machine behaves under awkward sequences, whether something is fast enough. Ask it, but say it looks high-fidelity. If the user can't answer with confidence, recommend `/prototype`, reached by a `/handoff` out and a `/handoff` back, and carry on with the rest.

Several high-fidelity questions in one session are a symptom: the scope is too big, the problem isn't shaped, or you're asking for facts you should find. Stop and name which.

## One question per message

Ask only from the **frontier**: decisions whose prerequisites are settled. Recompute it after every answer.

```
Understanding: <your read in one line> (~<confidence>%, missing: <what's unresolved>)

❓ **<question title>**: <question body, with options when there are options>

➡️ <your recommended answer>

Assumed: <decisions the context settled since the last message, one line each with its source; omit when none>
```

Write `missing:` only below about 70%. Word each question so "yes" accepts your recommendation.

## Reading answers

- "Yes" accepts the current recommendation only.
- An ambiguous answer gets a one-line check, not a guess.
- "Whatever you think" is delegation: re-ask as a choice between two concrete options.
- An answer that sounds like what one _should_ want ("scalable", "clean", "best practice") gets: _"If you didn't have to justify this to anyone, what would you actually want?"_

Never answer your own questions or stand in for the user. When nobody is there to answer (an autonomous run), don't grill: stop and report the open questions as a blocker, each with your recommendation.

## Done

- The frontier is empty: every branch visited, every high-fidelity question answered or sent to a prototype.
- You can predict the user's reaction to your next three questions.
- Every assumption has been shown to the user.

If confidence isn't rising after three or four answers, stop and step back to the scope.

Close by listing every assumption and prototype question together for one-pass veto. Act on nothing until the user confirms the shared understanding.

## Next step

When another skill loaded this one, hand back to it. Otherwise stay in this session: the decisions live in it. If the work fits what is left of this session, build it here. If it needs several sessions, run `/to-spec` next, here.
