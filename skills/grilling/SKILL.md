---
name: grilling
description: Grill the user relentlessly, one question at a time, until you reach a shared understanding of a plan, decision, or idea. Use when the user wants to stress-test their thinking, uses any 'grill' trigger phrase, or another skill needs a grilling session.
---

Interview the user relentlessly until you reach a shared understanding. Map this as a **design tree**: every decision branches into the decisions that hang off it.

It's a conversation, not an interview. The user leads the direction and owns the scope; your job is to keep it on track and to make every question count.

## Scope first

Before the first question, check the size of what you're grilling. If it can't be settled comfortably in one session, or you can already see several high-fidelity questions in it (see **Fidelity**), say so and propose splitting it into smaller scopes. Grill one scope at a time.

## Attention is the budget

The user's attention is highest at the start of a session and drains fast. Spend it only on decisions that are genuinely theirs.

- **Finding facts is your job, never the user's.** When a question needs a fact from the environment (filesystem, tools, docs, the web), dispatch a subagent to find it; don't ask the user for anything you could look up yourself. Don't block on it: a running exploration is an unsettled prerequisite, so only the questions downstream of it wait for the report.
- **Decide what the context already decides.** When the answer follows from the code, the repo's docs and standards, or the user's earlier answers, or when the decision is low-stakes and easy to reverse and has a sensible default, don't ask. Take the decision and record it as an assumption.
- **Ask the most valuable question first.** Of the open questions, ask the one whose answer reshapes the most of the tree or that you're least able to predict, while attention is fresh.
- **Make later questions cheap.** As the session goes on, prefer questions the user can settle by confirming your default over questions that make them generate an answer.

## Fidelity

Questions come at different levels of fidelity (Ryan Singer, _Shape Up_).

- **Low-fidelity questions** are settled by talk. Which route a page lives on, what a thing is called, which of two flows comes first.
- **High-fidelity questions** depend on seeing or feeling the thing. How a UI feels in use, how a complex state machine behaves under awkward sequences, whether something is fast enough. Talk alone rarely settles them.

Still ask a high-fidelity question, but say that it looks high-fidelity. If the user can't answer it with confidence, that is the signal they need to see it before deciding: recommend a `/prototype` session, reached with a `/handoff` out and a `/handoff` back into this session, and carry on with the other questions meanwhile.

Several high-fidelity questions in one session are a symptom, not a backlog: the scope is too big, the problem isn't shaped yet, or you're asking the user for facts you should find. Stop and name which one it is.

## The frontier

The **frontier** is every decision whose prerequisites are already settled: the questions you can ask _now_ without guessing at answers you haven't heard yet. Ask **one question per message**, the most valuable on the frontier. A question whose answer depends on another open question belongs later.

Each answer reshapes the tree: settled decisions push the frontier outward and unblock questions that depended on them. Recompute the frontier before the next question.

Format each message like so:

```
Understanding: <your current read in one line> (~<confidence>%, missing: <what's unresolved>)

❓ **<question title>**: <question body, might be multiple paragraphs, including multiple choices>

➡️ <your recommended answer>

Assumed: <decisions you took yourself since the last message, one line each with the reason; omit when none>
```

Write `missing:` only when confidence is below about 70%. Word each question so "yes" accepts your recommended answer.

## Reading answers

- "Yes" accepts the recommended answer to the current question, and nothing more.
- When an answer is ambiguous, check it in one line instead of guessing.
- "Whatever you think" is delegation, not a decision. Re-ask with two concrete options as a choice.
- When an answer sounds like what a thoughtful answer _should_ be rather than what the user wants ("scalable", "clean", "the standard way", "best practice"), ask: _"If you didn't have to justify this to anyone, what would you actually want?"_

The _decisions_ are the user's: put each to them and wait.

## Never answer for the user

You never answer your own questions, and you never stand in for the user's side of the conversation. When nobody is there to answer (an autonomous or non-interactive run), don't grill: stop, and report the open questions as a blocker, each with your recommended answer, so the user can settle them in one pass later.

## Done

The session is done when all of these hold:

- the frontier is empty: every branch of the design tree visited, and every high-fidelity question either answered or sent to a prototype;
- you can predict the user's reaction to the next three questions you would ask;
- nothing is silently assumed: every assumption you took has been shown to the user.

If confidence isn't rising after three or four answers, you're asking the wrong questions: stop, say so, and step back to the scope.

At the end, list every assumption and every question sent to a prototype together, so the user can veto in one pass. Do not act on the shared understanding until the user confirms it. The decisions made in this session are its most valuable output: keep working in this session, or carry them into a durable artifact; never let them be thrown away.
