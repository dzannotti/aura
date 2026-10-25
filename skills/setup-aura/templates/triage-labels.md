# Triage Labels

Aura skills speak in canonical triage roles. This file maps each role to the label string this repo's tracker uses. When a skill names a role ("apply `ready-for-agent`"), apply the label from this table.

## State: exactly one per issue

| Role              | Label                  | Meaning                                 |
| ----------------- | ---------------------- | --------------------------------------- |
| `needs-triage`    | `aura:needs-triage`    | The principal needs to evaluate it      |
| `needs-info`      | `aura:needs-info`      | Waiting on someone for more information |
| `ready-for-agent` | `aura:ready-for-agent` | Fully specified, ready for an AFK agent |
| `ready-for-human` | `aura:ready-for-human` | Needs a human to implement or decide    |
| `wontfix`         | `aura:wontfix`         | Will not be done                        |

## Category: at most one per issue

| Role          | Label              | Meaning                      |
| ------------- | ------------------ | ---------------------------- |
| `bug`         | `aura:bug`         | Something is broken          |
| `enhancement` | `aura:enhancement` | A new feature or improvement |

On a local-markdown tracker, write the role name in the issue file's `Status:` line instead.
