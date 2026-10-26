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

## Wayfinding: used by `/wayfinder`

| Label            | Meaning                                   |
| ---------------- | ----------------------------------------- |
| `aura:map`       | A wayfinder map                           |
| `aura:research`  | A decision ticket answered by research    |
| `aura:prototype` | A decision ticket answered by a prototype |
| `aura:grilling`  | A decision ticket answered by a grilling  |
| `aura:task`      | Manual work a decision waits on           |

On a local-markdown tracker, write the role name in the issue file's `Status:` line, and the wayfinding type in its `Type:` line, instead.
