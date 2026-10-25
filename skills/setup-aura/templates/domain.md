# Domain Docs

How skills consume this repo's domain documentation when exploring the codebase.

## Before exploring, read these

- **`NORTH_STAR.md`** at the repo root: where the project is heading. Work that does not move toward it needs a reason.
- **`GLOSSARY.md`** at the repo root, or **`GLOSSARY-MAP.md`** if it exists: it points at one `GLOSSARY.md` per context. Read each one relevant to the topic.
- **`docs/adr/`**: read ADRs that touch the area you're about to work in. In multi-context repos, also check `<context>/docs/adr/` for context-scoped decisions.
- **`docs/coding-standards.md`** before writing or reviewing code, and **`docs/git-etiquette.md`** before branching, committing or opening a pull request.

If a file is empty or missing, proceed silently. Don't flag its absence and don't fill it in unprompted; the skills that own it fill it when there is something real to write.

## File structure

Single-context repo (most repos):

```
/
├── NORTH_STAR.md
├── GLOSSARY.md
├── docs/
│   ├── adr/
│   │   ├── 0001-event-sourced-orders.md
│   │   └── 0002-postgres-for-write-model.md
│   ├── coding-standards.md
│   └── git-etiquette.md
└── src/
```

Multi-context repo (presence of `GLOSSARY-MAP.md` at the root):

```
/
├── NORTH_STAR.md
├── GLOSSARY-MAP.md
├── docs/adr/                          ← system-wide decisions
└── src/
    ├── ordering/
    │   ├── GLOSSARY.md
    │   └── docs/adr/                  ← context-specific decisions
    └── billing/
        ├── GLOSSARY.md
        └── docs/adr/
```

## Use the glossary's vocabulary

When your output names a domain concept (in an issue title, a refactor proposal, a hypothesis, a test name), use the term as defined in `GLOSSARY.md`. Don't drift to synonyms the glossary explicitly avoids.

If the concept you need isn't in the glossary yet, that's a signal: either you're inventing language the project doesn't use (reconsider) or there's a real gap (raise it).

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding:

> _Contradicts ADR-0007 (event-sourced orders), but worth reopening because…_
