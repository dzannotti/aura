# Issue tracker: GitHub

Issues and specs for this repo live as GitHub issues. Use the `gh` CLI for all operations.

## Conventions

- **Create an issue**: `gh issue create --title "..." --body "..."`. Use a heredoc for multi-line bodies.
- **Read an issue**: `gh issue view <number> --json number,title,body,labels,comments`.
- **List issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` with appropriate `--label` and `--state` filters.
- **Make an issue a sub-issue of a parent**: `gh issue create --parent <parent> ...`, or `gh issue edit <parent> --add-sub-issue <child>` afterwards (`gh` 2.94+). Older `gh`: `gh api --method POST repos/<owner>/<repo>/issues/<parent>/sub_issues -F sub_issue_id=<child-db-id>`, where `<child-db-id>` is the numeric database id (`gh api repos/<owner>/<repo>/issues/<n> --jq .id`). Without sub-issues, put `Part of #<parent>` at the top of the child body.
- **Blocking**: GitHub's native issue dependencies. Add an edge with `gh api --method POST repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`. GitHub reports `issue_dependencies_summary.blocked_by` (open blockers only). Where dependencies aren't available, fall back to a `Blocked by: #<n>, #<n>` line at the top of the child body. An issue is unblocked when every blocker is closed.
- **Comment on an issue**: `gh issue comment <number> --body "..."`
- **Apply / remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Assign**: `gh issue edit <number> --add-assignee <login>`
- **Close**: `gh issue close <number> --comment "..."`

Infer the repo from `git remote -v`; `gh` does this automatically when run inside a clone.

## Wayfinding operations

Used by `/wayfinder`. The **map** is one issue with child issues as its tickets.

- **Map**: an issue labelled `aura:map`. `gh issue create --label aura:map`.
- **Child ticket**: a sub-issue of the map (see **Make an issue a sub-issue of a parent**), carrying one type label: `aura:research`, `aura:prototype`, `aura:grilling` or `aura:task`.
- **Blocking**: native issue dependencies (see **Blocking** above).
- **Frontier query**: the map's open sub-issues that carry a type label, have no open blocker (`issue_dependencies_summary.blocked_by` is 0), and have no assignee. First in map order wins.
- **Claim**: `gh issue edit <n> --add-assignee @me`, the session's first write.
- **Resolve**: `gh issue comment <n> --body "<answer>"`, then `gh issue close <n>`, then add a pointer (gist and link) to the map's Decisions so far.

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Read it as in **Read an issue** above.
