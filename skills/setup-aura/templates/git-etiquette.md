# Git Etiquette

## Branch Strategy

**Never commit directly to main.** All changes go through feature branches and pull requests.

### Branch Naming

Use semantic prefixes matching commit types:

```text
feat/short-description
fix/short-description
refactor/short-description
chore/short-description
```

### Rules

- **always branch**: create a feature branch before any work
- **lowercase with hyphens**: `feat/add-initiative` not `feat/Add_Initiative`
- **keep it short**: branch names should be concise but descriptive
- **delete after merge**: clean up merged branches

### Examples

Good:

```text
feat/action-system
fix/damage-calculation
refactor/event-bus
chore/update-deps
```

Bad:

```text
my-feature              # missing type prefix
feat/Add_New_Feature    # caps and underscores
feature/action-system   # wrong prefix (use feat/)
```

## Commit Messages

All commit messages must follow conventional commit format with lowercase subjects.

### Format

```text
type: subject line in lowercase

optional body text explaining the why
```

### Types

- `feat`: new feature
- `fix`: bug fix
- `refactor`: code restructure without behavior change
- `test`: add or update tests
- `docs`: documentation only
- `chore`: maintenance tasks (deps, tooling, etc)

### Rules

- **lowercase subject**: never capitalize the first word
- **no period**: don't end the subject with a period
- **imperative mood**: "add feature" not "added feature" or "adds feature"
- **50 char limit**: keep subjects concise
- **body optional**: explain why, not what (code shows what); wrap body lines at 100 characters
- **no co-authors**: don't co-author commits. If two people worked on it, make two commits.

### Examples

Good:

```text
feat: add initiative tracker for combat rounds
fix: correct advantage calculation on attack rolls
refactor: simplify damage resolution pipeline
```

Bad:

```text
Add initiative tracker          # missing type
feat: Add Initiative Tracker    # capitalized
feat: added initiative.         # past tense, has period
```

## Commit Discipline

- Commit in small checkpoints. Nobody wants to review a kitchen-sink diff.
- Keep commits atomic and focused: one logical change per commit when possible.
- Write commits like you're explaining to a teammate who's reviewing tomorrow.
- If you can't write a clear subject line, the commit is probably too big.
- Pre-push discipline: run the repo's full check command (see `docs/agents/checks.md`), plus any CI-only gates you can run locally. CI should already be green before anyone else sees it.

## Pull Requests

PR titles follow the same conventional commit format as commits.

### Title Format

```text
type: lowercase description of the change
```

### Rules

- **one primary type**: if the PR does multiple unrelated things, split it
- **lowercase title**: same as commits
- **meaningful description**: explain the why

### Examples

Good:

```text
feat: implement roll20 dice notation parser
```

Bad:

```text
Feature: Implement roll20 dice notation parser
Feat: Implement Roll20 dice notation parser
implement roll20 dice notation parser
```
