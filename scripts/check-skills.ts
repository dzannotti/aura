import { existsSync, lstatSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const MAX_DESCRIPTION_LENGTH = 1024;
const MAX_SKILL_WORDS = 1200;
const MAX_AGENT_WORDS = 600;
const NEXT_STEP_HEADING = /^## Next step$/m;
const ROUTER_SKILL = "ask-aura";
const HARNESS_COMMANDS = new Set(["new", "clear", "compact"]);

type Frontmatter = { name?: unknown; description?: unknown };

function walk(root: string): string[] {
  return readdirSync(root).flatMap((entry) => {
    const path = join(root, entry);
    const stat = lstatSync(path);
    if (stat.isDirectory()) {
      return [path, ...walk(path)];
    }
    return [path];
  });
}

function parseFrontmatter(markdown: string): Frontmatter | undefined {
  const match = /^---\n([\s\S]*?)\n---\n/.exec(markdown);
  if (!match?.[1]) {
    return undefined;
  }
  let parsed: unknown;
  try {
    parsed = Bun.YAML.parse(match[1]);
  } catch {
    return undefined;
  }
  if (typeof parsed !== "object" || parsed === null) {
    return undefined;
  }
  return parsed;
}

function proseOf(markdownPath: string): string {
  return readFileSync(markdownPath, "utf8").replaceAll(
    /^(```|~~~)[\s\S]*?^\1/gm,
    "",
  );
}

function skillReferences(markdown: string): string[] {
  return [...markdown.matchAll(/`\/([a-z0-9-]+)(?=[`\s])/g)].map(
    (match) => match[1] ?? "",
  );
}

function headingReferences(section: string): string[] {
  return [...section.matchAll(/^### `\/([a-z0-9-]+)`/gm)].map(
    (match) => match[1] ?? "",
  );
}

function routerSections(router: string): { built: string; planned: string } {
  const plannedStart = router.indexOf("\n## Planned");
  if (plannedStart === -1) {
    return { built: router, planned: "" };
  }
  const afterPlanned = router.slice(plannedStart + 1);
  const nextSection = afterPlanned.indexOf("\n## ", 1);
  return {
    built: router.slice(0, plannedStart),
    planned:
      nextSection === -1 ? afterPlanned : afterPlanned.slice(0, nextSection),
  };
}

function brokenLinks(markdownPath: string, root: string): string[] {
  const markdown = proseOf(markdownPath);
  const targets = [...markdown.matchAll(/\]\(([^)\s]+)\)/g)].map(
    (match) => match[1] ?? "",
  );
  return targets
    .filter((target) => !/^[a-z]+:/i.test(target) && !target.startsWith("#"))
    .filter(
      (target) =>
        !existsSync(resolve(dirname(markdownPath), target.split("#")[0] ?? "")),
    )
    .map(
      (target) =>
        `${markdownPath.slice(root.length + 1)}: broken link ${target}`,
    );
}

function checkSkill(skillsDir: string, name: string, root: string): string[] {
  const skillFile = join(skillsDir, name, "SKILL.md");
  if (!existsSync(skillFile)) {
    return [`skills/${name}: missing SKILL.md`];
  }
  const frontmatter = parseFrontmatter(readFileSync(skillFile, "utf8"));
  if (!frontmatter) {
    return [`skills/${name}: SKILL.md has no valid frontmatter`];
  }
  const problems: string[] = [];
  if (frontmatter.name !== name) {
    problems.push(`skills/${name}: frontmatter name must be "${name}"`);
  }
  const description = frontmatter.description;
  if (typeof description !== "string" || description.trim() === "") {
    problems.push(`skills/${name}: frontmatter needs a description`);
  } else if (description.length > MAX_DESCRIPTION_LENGTH) {
    problems.push(
      `skills/${name}: description exceeds ${MAX_DESCRIPTION_LENGTH} characters`,
    );
  }
  const markdown = readFileSync(skillFile, "utf8");
  if (!NEXT_STEP_HEADING.test(markdown)) {
    problems.push(`skills/${name}: SKILL.md needs a "## Next step" section`);
  }
  const words = markdown.split(/\s+/).filter(Boolean).length;
  if (words > MAX_SKILL_WORDS) {
    problems.push(
      `skills/${name}: SKILL.md has ${words} words; the limit is ${MAX_SKILL_WORDS}`,
    );
  }
  return [...problems, ...brokenLinks(skillFile, root)];
}

function checkAgent(agentsDir: string, entry: string): string[] {
  const name = entry.slice(0, -".md".length);
  const markdown = readFileSync(join(agentsDir, entry), "utf8");
  const frontmatter = parseFrontmatter(markdown);
  if (!frontmatter) {
    return [`agents/${entry}: no valid frontmatter`];
  }
  const problems: string[] = [];
  if (frontmatter.name !== name) {
    problems.push(`agents/${entry}: frontmatter name must be "${name}"`);
  }
  if (
    typeof frontmatter.description !== "string" ||
    frontmatter.description.trim() === ""
  ) {
    problems.push(`agents/${entry}: frontmatter needs a description`);
  }
  const words = markdown.split(/\s+/).filter(Boolean).length;
  if (words > MAX_AGENT_WORDS) {
    problems.push(
      `agents/${entry}: ${words} words; the limit is ${MAX_AGENT_WORDS}`,
    );
  }
  return problems;
}

function versionOf(path: string): unknown {
  const parsed: unknown = JSON.parse(readFileSync(path, "utf8"));
  if (typeof parsed !== "object" || parsed === null || !("version" in parsed)) {
    return undefined;
  }
  return parsed.version;
}

export function checkRepo(root: string): string[] {
  const skillsDir = join(root, "skills");
  const paths = walk(skillsDir);
  const symlinks = paths
    .filter((path) => lstatSync(path).isSymbolicLink())
    .map(
      (path) =>
        `${path.slice(root.length + 1)}: symlinks are not allowed in skills/`,
    );
  const names = readdirSync(skillsDir).filter((entry) =>
    lstatSync(join(skillsDir, entry)).isDirectory(),
  );
  const skillProblems = names.flatMap((name) =>
    checkSkill(skillsDir, name, root),
  );
  const supportLinks = paths
    .filter((path) => path.endsWith(".md") && !path.endsWith("SKILL.md"))
    .flatMap((path) => brokenLinks(path, root));

  const routerFile = join(skillsDir, ROUTER_SKILL, "SKILL.md");
  const router = existsSync(routerFile) ? readFileSync(routerFile, "utf8") : "";
  const sections = routerSections(router);
  const routed = new Set(headingReferences(sections.built));
  const planned = new Set(headingReferences(sections.planned));
  const unrouted = names
    .filter((name) => !routed.has(name))
    .map((name) => `skills/${ROUTER_SKILL}: does not describe /${name}`);
  const builtButPlanned = names
    .filter((name) => planned.has(name))
    .map(
      (name) =>
        `skills/${ROUTER_SKILL}: /${name} exists; move it from Planned to Skills`,
    );
  const known = new Set([...names, ...planned, ...HARNESS_COMMANDS]);
  const danglingReferences = paths
    .filter((path) => path.endsWith(".md"))
    .flatMap((path) =>
      [...new Set(skillReferences(proseOf(path)))]
        .filter((name) => !known.has(name))
        .map(
          (name) =>
            `${path.slice(root.length + 1)}: links /${name}, which is neither a skill nor planned in ${ROUTER_SKILL}`,
        ),
    );

  const agentsDir = join(root, "agents");
  const agentProblems = existsSync(agentsDir)
    ? readdirSync(agentsDir)
        .filter((entry) => entry.endsWith(".md"))
        .flatMap((entry) => checkAgent(agentsDir, entry))
    : [];

  const packageVersion = versionOf(join(root, "package.json"));
  const pluginVersion = versionOf(join(root, ".claude-plugin", "plugin.json"));
  const versionDrift =
    packageVersion === pluginVersion
      ? []
      : [
          `version drift: package.json ${String(packageVersion)} vs .claude-plugin/plugin.json ${String(pluginVersion)}`,
        ];

  return [
    ...symlinks,
    ...skillProblems,
    ...supportLinks,
    ...agentProblems,
    ...unrouted,
    ...builtButPlanned,
    ...danglingReferences,
    ...versionDrift,
  ];
}

if (import.meta.main) {
  const problems = checkRepo(resolve(import.meta.dir, ".."));
  for (const problem of problems) {
    console.error(problem);
  }
  if (problems.length > 0) {
    process.exit(1);
  }
  console.log("skills: ok");
}
