---
name: wayfinder
description: Plan a piece of work too big and foggy for one session as a shared map of decision tickets on the issue tracker, and resolve them one at a time until the way to the destination is clear.
disable-model-invocation: true
---

# Wayfinder

A loose idea has arrived, too big for one agent session, and the way from here to the **destination** isn't visible yet. Wayfinding finds that way. It charts a **map** on the issue tracker, then works its **decision tickets** (questions whose answer is a decision, not slices of a build) one at a time until nothing is left to decide.

Use it only for fog. When the way is already clear and the work fits one session, grill it with `/grill-with-docs` and build it instead.

**Plan, don't do.** Each ticket resolves a decision. The urge to just do the work is the signal that you have reached the edge of the map. The map's **Notes** may explicitly carry execution into the map; otherwise, produce decisions, not deliverables.

**Refer by name.** Every map and ticket is an issue. In everything the user reads, call it by its title with the link inside it, never by a bare number.

The map body, ticket format, ticket types, and the rules for fog and out of scope are in [MAP.md](MAP.md). Read it before charting or working a map. The tracker commands for maps, children, blocking, claims and the frontier are under "Wayfinding operations" in `docs/agents/issue-tracker.md`.

## Chart the map

The user invokes this with a loose idea.

1. **Name the destination.** Run `/grill-with-docs` to pin down what the map is finding its way to. Write it so a reader can check it, such as "an approved spec exists for X". If the user can't state one, that is the first question. The destination fixes the scope, so settle it first.
2. **Map the frontier.** Grill again, breadth-first: fan out across the whole space, surfacing the open decisions and the first steps takeable now. If this surfaces no fog, you don't need a map: stop and tell the user to grill and build, or run `/to-spec`.
3. **Create the map** with the `aura:map` label: Destination and Notes filled in, Decisions so far empty, the fog sketched under Not yet specified.
4. **Create the tickets you can state precisely now** as children of the map, then wire the blocking edges in a second pass, once every ticket has an id. Everything you can't yet state precisely stays as fog.
5. **Start the research tickets.** For each `research` ticket, start a background agent that runs `/research` and writes its findings to `docs/research/`, linked from the ticket.
6. Stop. Charting is one session's work; it resolves nothing by hand.

## Work through the map

The user invokes this with a map, and optionally a ticket.

1. Load the map: the low-resolution view, not every ticket body.
2. Choose the ticket: the one the user named, or the first ticket on the frontier. **Claim it** before any other work.
3. Resolve it as its type label says (see [MAP.md](MAP.md)). Fetch the full body of any related or closed ticket when you need it, and load the skills the map's Notes name.
4. Record the resolution: post the answer as a comment, close the ticket, and add a one-line pointer to the map's Decisions so far.
5. Create newly surfaced tickets, and graduate any fog the answer made specifiable into tickets, removing it from Not yet specified. If a ticket now sits beyond the destination, rule it out of scope. If the answer invalidates other tickets, update or close them.

Resolve one ticket per session, except research tickets. Other sessions may be working the same map, so re-read the tracker before you write to it.

When the frontier is empty and no fog remains, the way is clear: hand off to `/to-spec` with the map.

## Next step

After charting: tell the user to start a fresh session (`/new` in pi, `/clear` in Claude Code) and run `/wayfinder <map reference>` to work the first ticket. After resolving a ticket: the same, for the next one. When the way is clear: a fresh session and `/to-spec <map reference>`. Write each as the exact command for their harness.
