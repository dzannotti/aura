# Checks

The commands that decide whether a change is done. Agents and CI run the same commands; a check that only CI runs is a check agents learn about too late.

## Commands

| Level | When                                 | Command     |
| ----- | ------------------------------------ | ----------- |
| fast  | after each edit                      | `<command>` |
| full  | before calling a change done, and CI | `<command>` |

- **fast** covers formatting, linting and type checking. It runs in seconds.
- **full** covers everything in fast plus the test suite and any other gate that blocks a merge.

## Rules

- A check that cannot run fails. A missing tool, a missing script or a misconfigured command is a red result, never a skipped one.
- Never edit check configuration, linter rules or thresholds to make a change pass. Raise it instead.
- Report the command you ran and its result verbatim; don't paraphrase a red run as green.

## CI-only gates

List any gate that runs only in CI (coverage floors, slow suites), with the reason it can't run locally.
