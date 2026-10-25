# Issue tracker: Local Markdown

Issues and specs for this repo live as markdown files in `.scratch/`.

## Conventions

- One effort per directory: `.scratch/<effort-slug>/`
- The spec is `.scratch/<effort-slug>/spec.md`
- Issues are one file per ticket at `.scratch/<effort-slug>/issues/<NN>-<slug>.md`, numbered from `01`, never a single combined tickets file
- State is recorded as a `Status:` line near the top of each issue file
- Blocking is a `Blocked by: NN, NN` line near the top. An issue is unblocked when every issue it lists is closed.
- Comments and conversation history append to the bottom of the file under a `## Comments` heading

Local markdown suits a single agent working on one branch. When several agents edit these files on separate branches, they drift; use a real tracker for that.

## When a skill says "publish to the issue tracker"

Create a new file under `.scratch/<effort-slug>/` (creating the directory if needed).

## When a skill says "fetch the relevant ticket"

Read the file at the referenced path. The user will normally pass the path or the issue number directly.
