# Coding Standards

Keep it strict, predictable, and readable enough that nobody has to spelunk through garbage later.

These standards apply to every language in this repo. Language- and tool-specific choices (which formatter, which linter, which type checker) live in `docs/agents/checks.md` and the linter config, never here. Git rules live in `docs/git-etiquette.md`.

---

## 0. Principles

- **Strict types aren't optional.** Code passes the repo's type check on the first pass. No escape hatches: no dynamic "any" types, no unchecked casts, no ignore or suppression directives, no lying to the type system.
- **Readability wins every fight.** If someone can't grok the file in one pass, rewrite it. Straightforward beats clever every time.
- **Self-explanatory or bust.** Code states the what. The why goes in commit messages, ADRs and docs, never in comments.
- **Fail fast, stay flat.** Guard clauses and early returns keep the happy path flush-left.
- **Small files, deep modules, small interfaces.** One domain concept per module. Extract before a file turns into a novel, but keep the module's interface small and its capability types tiny (see §3).
- **Design for extension, not speculation.** The interface should survive the next obvious requirement without surgery, but don't build fantasy features.

---

## 1. Comments

- No comments. Names and structure carry the meaning.
- The why goes in the commit message, an ADR, or `GLOSSARY.md`. A comment that explains a workaround becomes the pattern the next contributor copies, so the workaround spreads instead of getting fixed.
- The only exceptions are directives a tool requires to function and license headers. A directive that suppresses a check is not a tool requirement; it is a banned suppression (§0).
- Never comment-out code. Delete it or keep it in history.

---

## 2. File & Module Layout

- One exported concept per module. Support types that exist solely for it can live in the same file; otherwise, split.
- Keep files tight. If you're scrolling past three screens, the module is doing too much. When the linter enforces function-length, file-length or one-export-per-file limits and you hit them, split, don't disable.
- Export only the public surface. Everything else stays file-local or lives under an `internal` location the language or package system keeps private.
- File names follow the language's idiomatic casing and match their primary export.
- No barrel files: no module whose only job is to re-export other modules. A package exposes its modules through its declared public entry points, and that declaration is the package's public surface; anything not listed is internal. Performance beats convenience here: a re-export module drags every module into the graph for one symbol. Runtimes and test runners that load source without a bundling pass then load, parse and evaluate all of it on every import, and the type checker resolves the whole re-export graph for every importer. A bundler forgives it only when tree-shaking and side-effect declarations happen to line up.
- Don't stutter. `encounter/encounter` exports `Encounter`, not `EncounterEncounter`.

---

## 3. Architecture: Deep Modules

Design **deep modules**: a lot of behaviour behind a small interface, placed at a clean seam, testable through that interface. The aim is leverage for callers, locality for maintainers, and testability for everyone.

### 3.1 Vocabulary

Use these terms exactly in code review, issues and design discussion. Don't substitute "component", "service", "API" or "boundary". Domain concepts take their names from `GLOSSARY.md`; architecture concepts take their names from this list.

- **Module**: anything with an interface and an implementation. Deliberately scale-agnostic: a function, class, package, or tier-spanning slice. _Avoid_: unit, component, service.
- **Interface**: everything a caller must know to use the module correctly: the type signature, but also invariants, ordering constraints, error modes, required configuration, and performance characteristics. _Avoid_: API, signature (too narrow).
- **Implementation**: what's inside a module, its body of code.
- **Depth**: leverage at the interface. The amount of behaviour a caller (or test) can exercise per unit of interface they have to learn. A module is **deep** when a large amount of behaviour sits behind a small interface, **shallow** when the interface is nearly as complex as the implementation.
- **Seam** (Michael Feathers): a place where you can alter behaviour without editing in that place; the location at which a module's interface lives. Where to put the seam is its own design decision, distinct from what goes behind it. _Avoid_: boundary.
- **Adapter**: a concrete thing that satisfies an interface at a seam. Describes role (what slot it fills), not substance.
- **Capability type**: the language construct that names a set of operations (an interface, protocol or trait). Not the same thing as a module's **Interface**.
- **Port**: a capability type placed at a seam so that an adapter can be swapped in.
- **Leverage**: what callers get from depth. More capability per unit of interface they learn. One implementation pays back across N call sites and M tests.
- **Locality**: what maintainers get from depth. Change, bugs, knowledge and verification concentrate in one place rather than spreading across callers. Fix once, fixed everywhere.

### 3.2 Principles

- **Depth is a property of the interface, not the implementation.** A deep module can be internally composed of small, swappable parts across several small files; they just aren't part of the interface. Small files serve navigation; a small interface serves callers. The two never conflict.
- **The deletion test.** Imagine deleting the module. If complexity vanishes, it was a pass-through. If complexity reappears across N callers, it was earning its keep.
- **The interface is the test surface.** Callers and tests cross the same seam. If you want to test past the interface, the module is probably the wrong shape.
- **One adapter means a hypothetical seam. Two adapters means a real one.** Don't introduce a port unless something actually varies across it (typically production + test).
- **Internal seams vs external seams.** A deep module can have internal seams (private to its implementation, used by its own tests) as well as the external seam at its interface. Don't expose internal seams through the interface just because tests use them.
- **Don't extract for testability alone.** A pure function pulled out only so a test can reach it, while the real bugs hide in how it's called, loses locality. Extract helpers as private parts of the module; test through the module's interface.

When designing an interface, ask: can I reduce the number of methods? Can I simplify the parameters? Can I hide more complexity inside?

### 3.2.1 Capability types (Go-style)

- **Small.** One to three operations. The bigger the capability type, the weaker the abstraction.
- **Defined by the consumer, not the implementer.** The module that needs a capability declares the capability type it depends on, next to its own code. Implementers satisfy it without knowing about it, where the language allows.
- **Named for the capability.** `Roller`, `Renderer`, `Resolver`. Never `IRoller`, `RollerInterface`, or a name for the thing that implements it.
- **Accept capabilities, return concrete types.** Parameters ask for the smallest capability the function uses; results are the concrete type, so callers get everything without casting.
- **No capability type without a second implementation** (§3.2): a port with one adapter is indirection.

### 3.3 Dependencies across a seam

Classify every dependency of a module. The category decides how the module is tested across its seam.

1. **In-process**: pure computation, in-memory state, no I/O. Always deepenable: merge the modules and test through the new interface directly. No adapter needed.
2. **Local-substitutable**: dependencies with local test stand-ins (an embedded database, an in-memory filesystem). Test with the stand-in running in the suite. The seam is internal; no port at the module's external interface.
3. **Remote but owned**: your own services across a network boundary. Define a port at the seam. The deep module owns the logic; the transport is injected as an adapter. Tests use an in-memory adapter; production uses the network adapter.
4. **True external**: third-party services you don't control. The module takes the external dependency as an injected port; tests provide a mock adapter.

### 3.4 Designing for testability

- **Accept dependencies, don't create them.** Pass collaborators in; never construct a network client or read global configuration inside domain logic.
- **Return results, don't produce side effects.** A function that computes a value is easier to test than one that mutates something it was handed.
- **Small surface area.** Fewer methods mean fewer tests needed. Fewer parameters mean simpler test setup.
- **SDK-style interfaces at system boundaries.** One specific function per external operation (`getUser`, `createOrder`), never one generic fetcher with conditional logic. Each mock then returns one shape, with no conditional logic in test setup.

### 3.5 Boundaries

- Dependency direction is part of the architecture. Libraries never import from applications; applications compose libraries and know nothing about each other. Entry points (CLI, HTTP handlers, UI shells) do input parsing and output formatting only.
- Domain logic assumes nothing about its host. Transports, terminals, timers and the filesystem stay at the application boundary.
- When the import graph can express a boundary, the linter or an architecture check enforces it, so a wrong import fails.

---

## 4. Naming

- Keep it precise: `round`, `bonus`, `encounter`.
- Type names describe capabilities or domain concepts (`Renderer`, `Roller`, `Encounter`). Skip "Manager" or "Helper".
- Follow the language's idiomatic casing for types, values, functions and constants, and apply it everywhere.
- Stay consistent across modules: one concept, one name. Domain names come from `GLOSSARY.md`; don't drift to synonyms it avoids.
- Let the formatter handle spacing. Manual blank lines only when they help readability.

### 4.1 Variable Naming

- Non-boolean variables are descriptive nouns. No cargo-cult abbreviations.
- Booleans read like adjectives (`isActive`, `hasWeapon`, `canAct`) and never carry hidden meaning.
- Don't pile on multiple booleans to represent a complex state. Use discriminated unions, sum types or enums.
- Collections take plural nouns (`players`, `rounds`). Index variables stay scoped and obvious.

### 4.2 Function Naming

- Verbs for work (`applyBuff`, `updateInitiative`), nouns for pure value accessors, and explicit verbs for mutations.
- Boolean-returning functions start with `is`, `has`, or `can` (`isDead`, `hasCover`, `canActNow`).
- Event handlers and dispatchers start with `on` (`onDeath`, `onPickup`). Avoid the `handle` prefix.
- Asynchronous functions are named for what they return (`loadEncounter`, `saveWorldState`), and every asynchronous call is awaited or otherwise joined.
- Skip ambiguous nouns (`processData`) and names that look like booleans but aren't (`active`, `dead` when returning payloads).

### 4.3 Access Levels

- Default to private. Expose properties or methods only when some caller actually needs them.
- Relax to the language's "subclass-visible" level only when subclasses must participate; make things public on purpose, not out of habit.
- Don't write redundant visibility modifiers where the language's default already says it; specify visibility only when it is part of the signal.
- Use one privacy mechanism per language. Where a language offers two (for example, a compile-time modifier and a runtime-enforced one), pick the one the linter enforces and never mix them.

---

## 5. Type Safety

- Never reach for the dynamic "any" type or its equivalent. Use the language's "unknown" type when you truly don't know, narrow it immediately, and document why.
- Prefer one way of declaring object shapes, the one the linter enforces.
- Shape complex state with discriminated unions, sum types or tagged types instead of loose bags of properties.
- Constrain generics. `T extends Actor` says more than `T`.
- Mark values that should never change as constant or read-only at the type level.
- Make optionality mean something. A field or parameter that is always set in practice is required, not optional.

---

## 6. Control Flow & Functions

- Guard early: validate inputs, short-circuit edge cases, keep the happy path flush-left.
- Limit nesting depth. Extract private helpers or rearrange logic before a function becomes a Russian doll.
- Functions get one responsibility. If you can't explain it in one sentence, split it.
- Side effects are explicit. If a function mutates shared state, the name makes that clear.
- Prefer the language's iteration constructs and collection combinators over manual index juggling unless you actually need the index.
- Prefer explicit over implicit behavior: no hidden control flow or surprise mutation.

---

## 7. Error Handling

- Throw (or return the language's error value) when you can't recover. Returning an empty value or a typed result is for expected absences, not failures.
- Never raise bare strings or untyped values. Use named error types, or typed results like `{ ok: false, reason }`.
- Preserve context when rethrowing or wrapping. Attach the original cause.
- No swallowed failures. If you wait on asynchronous work, handle its failure or propagate it.
- Logging isn't error handling. Callers decide whether to log, retry, or die.

---

## 8. Data & State

- Avoid globals. Pass collaborators explicitly and wire them up at the boundary.
- Prefer immutable data.
- Model state with discriminated unions or dedicated types instead of loose bags of properties.
- Validate inputs at module boundaries. Domain types should be impossible to misuse.
- When returning collections, don't leak internal references. Clone or map at the boundary when ownership is unclear.
- Asynchronous work needs lifetimes. No fire-and-forget; if you start something, keep a handle and a shutdown path.
- Deterministic cores: inject randomness and scheduling as collaborators rather than reaching for the platform's random number generator or timers in domain code. Randomness arrives as a parameter, never as a default argument.

---

## 9. Testing

### 9.1 What a good test is

- Exercise observable behavior through the module's interface, not implementation details. If the interface doesn't change, the test shouldn't care. A good test reads like a specification ("user can check out with a valid cart") and survives refactors.
- Tests live at **seams** (§3.1). The seams under test are agreed with the principal when the spec is written, so testing effort lands on the critical paths and complex logic. Write tests only at agreed seams. Needing a seam the spec did not agree is a stop: raise it, don't invent it.
- Follow Arrange-Act-Assert. Set up state, execute the behavior, make the assertion: no interleaving.
- One logical assertion per test. The test name describes what, not how.
- Keep tests deterministic. Seed randomness, fake timers when timing matters, and avoid race-prone asynchronous waits.
- Table-driven tests are fine when they clarify cases. If the table is harder to read than a loop, inline the scenarios.
- Each test sets up only what it needs. No shared mutable fixtures, no hidden state.
- No skipped tests. A test that can't run yet doesn't get committed.
- Every test must be able to fail. It fails when the behaviour it covers breaks, and passes when only the internals change.

### 9.2 Anti-patterns

- **Implementation-coupled**: mocks internal collaborators, tests private members, asserts on call counts or call order, or verifies through a side channel (querying the database instead of using the interface). The tell: the test breaks when you refactor but behavior hasn't changed.
- **Tautological**: the expected value is recomputed the way the code computes it, or the test re-asserts a constant or an ordering detail, so it passes by construction and can never fail. Expected values come from an independent source of truth: a known-good literal, a worked example, the spec.
- **Useless**: a test that only checks the code runs without asserting an outcome, tests the language or a library rather than this code, or duplicates what another test already proves. Delete it.
- **Horizontal slicing**: writing all tests first, then all implementation. Work in vertical slices instead: one test, one minimal implementation, repeat.

### 9.3 Mocking

Mock at system boundaries only: external services, time and randomness, and sometimes databases and the filesystem (prefer a local stand-in). Never mock your own modules or internal collaborators.

### 9.4 Replace, don't layer

When a cluster of shallow modules is deepened, the old unit tests on the shallow modules become waste once tests at the deepened module's interface exist: delete them. If a test has to change when the implementation changes, it is testing past the interface.

---

## 10. Code Smells

A fixed baseline from Fowler (_Refactoring_, ch. 3). Each is a judgement call, never a hard violation, and a documented rule elsewhere in this file overrides it.

- **Mysterious Name**: a name that doesn't reveal what it does or holds. Rename it; if no honest name comes, the design is murky.
- **Duplicated Code**: the same logic shape in more than one place. Extract the shared shape, call it from both.
- **Feature Envy**: a function that reaches into another module's data more than its own. Move it onto the data it envies.
- **Data Clumps**: the same few fields or parameters keep travelling together. Bundle them into one type.
- **Primitive Obsession**: a primitive or string standing in for a domain concept. Give the concept its own small type.
- **Repeated Switches**: the same branching on the same type recurs. Replace with polymorphism, or one table both sites share.
- **Shotgun Surgery**: one logical change forces scattered edits across many files. Gather what changes together into one module.
- **Divergent Change**: one module edited for several unrelated reasons. Split so each module changes for one reason.
- **Speculative Generality**: abstraction, parameters or hooks for needs nobody has. Delete it; inline back until a real need shows.
- **Message Chains**: long `a.b().c().d()` navigation the caller shouldn't depend on. Hide the walk behind one function on the first object.
- **Middle Man**: a module that mostly delegates onward. Cut it; call the real target directly.
- **Refused Bequest**: a subtype that ignores or overrides most of what it inherits. Drop the inheritance; use composition.

---

## 11. Tooling

- Manage dependencies with the package manager's CLI. Never hand-edit dependency manifests or lockfiles.
- Ship nothing that fails the type check. Types are part of the contract.
- The repo's check command (see `docs/agents/checks.md`) passes before you call it done. CI runs the same command.
- Let the linter and formatter do their job. Don't fight the formatter or disable rules to silence noise; if a rule fights readability or idiomatic code, raise it in review (see Enforcement).
- Generated artifacts must be reproducible. If a script emits files, rerun it before committing.

---

## 12. Enforcement

- The lines you change must conform.
- Stay on topic. Problems you notice outside the change (structural rot, a better design, a missed edge case elsewhere) are welcome findings: file them as a ticket with what you saw and why it matters, then carry on with the task. Don't fix them in the same change.
- If a rule fights readability or idiomatic code, call it out. Standards serve maintainability, not dogma.
- New rules need a real problem statement and consensus. We're not collecting process for sport.
- Never write the same comment twice: a rule that fires twice in review belongs in the linter config, a script, or CI, not in the next reviewer's mouth.

### Known deviations (deliberate, not sloppiness)

- Config exceptions are global, never per-path. The only directory-scoped exceptions allowed are build or CI helper scripts and tests. A rule switched off for one folder is a rule nobody reviews.
- List every rule this repo deliberately turns off below, each with the reason and the evidence that the exception is load-bearing.

---

## Project-specific

_Add rules that apply only to this repo here: its boundaries, its runtime constraints, its domain invariants._
