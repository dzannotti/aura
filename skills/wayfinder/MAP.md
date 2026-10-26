# The map

The map is one issue on the tracker with the `aura:map` label. Its decision tickets are its child issues.

The map is an **index**, not a store. It lists the decisions made and points at the tickets that hold their detail. A decision lives in exactly one place, its ticket. The map only gives its gist and the link.

## The map body

Open tickets are not listed in the body: they are the map's open children, found by query.

```markdown
## Destination

<what reaching the end of this map looks like, written so a reader can check it. One or two lines.>

## Notes

<the domain; skills every session should load; standing preferences for this effort>

## Decisions so far

- [<closed ticket title>](link): <one-line gist of the answer>

## Not yet specified

<fog: in-scope questions you can't state precisely yet>

## Out of scope

<work ruled beyond the destination; never graduates>
```

## Tickets

Each ticket is a child issue of the map, sized to one session. Its body is the question:

```markdown
## Question

<the decision or investigation this ticket resolves>
```

Each ticket carries exactly one type label, and no triage label: tickets are decisions, not implementation work. A session claims a ticket by assigning it to the user driving the map, before any work; an open, unassigned ticket is unclaimed. Blocking uses the tracker's native dependencies. A ticket is unblocked when every ticket blocking it is closed.

The **frontier** is the map's open, unblocked, unclaimed children that carry a type label. Specs published under the map have no type label, so they are never on the frontier.

The answer is not part of the body. It is recorded on resolution, as a comment. Link anything created while resolving a ticket from the issue; don't paste it in.

## Ticket types

A ticket is either **HITL** (worked with the user, who speaks for themselves) or **AFK** (driven by an agent alone). A HITL ticket resolves only through that live exchange. The agent never stands in for the user's side.

- **`aura:research`** (AFK): find a fact a decision waits on, in documentation, third-party APIs or local resources. A background agent runs `/research` and writes its cited findings to `docs/research/`. Use it when the answer lives outside the working directory.
- **`aura:prototype`** (HITL): raise the fidelity of the discussion with a cheap, rough artifact to react to, through `/prototype`. Link the prototype from the ticket. Use it when "how should it look or behave" is the question.
- **`aura:grilling`** (HITL): a conversation, and the default type. Run `/grill-with-docs`.
- **`aura:task`** (HITL or AFK): manual work that must happen before a decision can be made, such as signing up for a service to judge its API or moving data to see its shape. The agent does it alone where it can; otherwise it gives the user a precise checklist. The resolution records what was done and any facts later tickets depend on.

## Fog of war

The map is deliberately incomplete. Don't chart what you can't see yet. **Not yet specified** holds the dim view of decisions you can tell are coming but can't pin down, because they depend on questions still open. Resolving a ticket clears the fog ahead of it.

**Fog or ticket?** The test is whether you can state the question precisely now, not whether you can answer it now. Ticket a sharp question even when it's blocked. Leave a question you can't yet phrase sharply as fog, and don't pre-slice fog into ticket-sized pieces: one patch may become several tickets, or none.

## Out of scope

Fog gathers only toward the destination. Work beyond it is out of scope: it isn't fog, and it never graduates. When an existing ticket turns out to sit past the destination, close it and add one line under **Out of scope** with the reason and the link. Out-of-scope items stay out of **Decisions so far**, which records only the route actually walked.
