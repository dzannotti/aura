# Anti-slop writing, and north star formats

## Anti-slop writing

Read from the skill files on 2026-10-25.

- **Short beats long.** The only real ablation found ([AminBlg/SimpleEnglish](https://github.com/AminBlg/SimpleEnglish), `evals/results/WHY-USELESS-2026-09-02.md`): an 8-line prompt beat the full 50+ rule skill on every visible measure (5.8 vs 13.4 sentences, 2 vs 17 em dashes, 0 vs 24 bold). "50+ rules dilute the 5 that matter."
- **Base**: pstack `unslop` (33 stable-id patterns tuned for engineering prose) and `technical-writing` (Diátaxis, Google style, STE, Global English).
- **Grafts**: [blader/humanizer](https://github.com/blader/humanizer) "lead with the decision" and "don't re-explain what the reader knows"; [addyosmani/clarity](https://github.com/addyosmani/clarity) "do not manufacture… opinions", `[TK: question]` instead of invented detail, one self-review then stop; STE structure from [danyuchn/asd-ste100-skill](https://github.com/danyuchn/asd-ste100-skill) (sentence caps, keep modality).
- **Deterministic checks** worth copying into a small script: em dashes, semicolons, curly quotes, sycophancy phrases, "not just X but Y", "This PR introduces…", trailing "…ensuring X" ([krishnasunkam/vale-ai-tells](https://github.com/krishnasunkam/vale-ai-tells) regexes). No stylometric scores: [Wikipedia's Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) and clarity both show they mislead.
- **Bad for specs**: "add soul / let some mess in", bans on adverbs, passive voice, "not" or modals, "two beats three", forced rhythm variation.

## North star and vision

- **North Star Metric** (Sean Ellis, [Amplitude](https://amplitude.com/blog/product-north-star-metric)): one value metric plus input metrics. Aligns teams; not a decision rule set.
- **Product vision** (Moore's positioning statement, [Pichler's vision board](https://www.romanpichler.com/tools/the-product-vision-board/), the [Scrum Product Goal](https://scrumguides.org/scrum-guide.html), BMAD's brief and PRD Vision sections): inspiring prose, not checkable.
- **Amazon tenets** ([AWS](https://aws.amazon.com/blogs/enterprise-strategy/tenets-supercharging-decision-making/), [Kindel](https://blog.kindel.com/2020/02/10/tenets/)): at most 7, in priority order, each with a defensible opposite, ending "unless you know better ones". Used as tie-breakers.
- **Non-goals** ([Malte Ubl, design docs at Google](https://www.industrialempathy.com/posts/design-docs-at-google/)): things that "could reasonably be goals, but are explicitly chosen not to be".
- Aura tried a `NORTH_STAR.md` (destination plus ordered principles plus non-goals) and dropped it for now: ADRs and the glossary carry the domain.
