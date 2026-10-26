---
name: implement
description: Build one ticket end to end as its lead. Agents in fresh contexts build it test-first, verify it and review it; the lead pushes, waits for CI and review bots, and hands a green pull request to the user.
disable-model-invocation: true
---

# Implement

You are the **lead** for one ticket. You write no code. Agents do the work in fresh contexts; you hold references and short verdicts, own the branch, the pull request and the hand-off, and keep your own context small.

**One writer, many readers.** Only one agent writes to a working copy at a time: the implementer. Agents that only read a fixed commit (the verifier, the reviewers) run in parallel.

Give every agent only references and paths, never pasted content or your account of the work. Each writes long output under `.local/implement/<ticket>/` and replies with a short verdict.

## 1. Start

The user passes a ticket reference. Fetch it and its parent spec (`docs/agents/issue-tracker.md`).

- The ticket must carry the `ready-for-agent` role (`docs/agents/triage-labels.md`) and have no open blocker. Otherwise stop and say why.
- **Resume** when a branch or pull request for this ticket already exists: read the ticket's comments, the pull request and `.local/implement/<ticket>/`, and continue from the first step not yet done.
- **Claim** the ticket (assign it to the user driving this session) before any other work.
- Branch from the up-to-date default branch, named as `docs/git-etiquette.md` says, with the ticket number in the slug. Create `.local/implement/<ticket>/rulings.md`, empty.

## 2. Build

Spawn the `implementer` agent with the ticket, the spec, the working directory and branch, and the rulings file. If it replies `blocked`, stop (see **Stopping**).

## 3. Local gates

On the implementer's SHA, in parallel:

- the `verifier` agent (ticket, spec, working directory, SHA, output `verify-r<N>.md`, and the previous report on later rounds);
- `/code-review` on the branch against the default branch, in a fresh context, writing to `review-r<N>.md`.

Merge every blocking finding into `findings-r<N>.md`, keeping each gate's ids. Out-of-scope findings and observations go to `notes.md` instead. No blocking findings: go to step 4. Otherwise run a fix round (see **Fix loop**), then run both gates again on the new SHA.

## 4. Push and open the pull request

Run the full checks from `docs/agents/checks.md` yourself on the final SHA, then push. Open a **draft** pull request: the title as `docs/git-etiquette.md` says, the body one short paragraph of what changed and why, and the reference that closes the ticket when it merges.

## 5. Remote gates

Wait for CI to finish. Then find out whether review bots run on this repo: bot reviewers requested on the pull request, pending bot checks, or bot reviews on recent merged pull requests. If they do, wait until each has posted, at most 15 minutes after CI finishes.

Merge failing CI jobs (the job and the failing lines from its log, written to a file) and every bot comment that asks for a change into `findings-remote-r<N>.md`. Judge each bot comment: a wrong one is rejected with a reason in `rulings.md`, not fixed. When nothing is left, go to step 6. Otherwise run a fix round, run the local gates on the fix, push, and wait again.

## 6. Hand-off

Only when CI is green and every review is handled:

1. Mark the pull request ready for review.
2. Post review comments on the lines a human should read first: what could break there and why. Comment only where the risk is real, not on every file.
3. Post one comment with the rulings from `rulings.md` (`what — why — cost if wrong`) and the items in `notes.md`.
4. Assign the user, and tell them in the session with the pull request link.

Never merge. The ticket closes when the user merges; on a tracker the code host can't close, the hand-off asks the user to close it.

## Fix loop

One round: the implementer fixes one merged findings file, then every gate that reported runs again on the new SHA.

- **Budget**: 3 rounds with the same implementer agent, then 2 with a fresh one on the strongest model you can choose, given the same inputs. The local gates and the remote gates each have their own budget.
- **Stop on repeat**: when a finding comes back after a round that claimed to fix it, stop.
- Re-checks cover the fix. A new finding outside it goes to `notes.md` and does not extend the loop.

## Stopping

Stop when the implementer is blocked, a budget runs out, or a finding repeats. Comment on the ticket with what failed, what was tried and the question only the user can answer; leave the pull request as a draft; assign the user; and tell them in the session if one is attached.

## Next step

After the hand-off: the user reviews and merges the pull request. Tell them to start a fresh session (`/new` in pi, `/clear` in Claude Code) and run `/implement <next ticket>` for the next unblocked ticket of the spec, or `/implement-spec <spec reference>` for the rest, written as the exact command for their harness. After a stop: the same command for this ticket, once they have answered on it. It resumes where it stopped.
