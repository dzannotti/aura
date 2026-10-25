import { existsSync, lstatSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const MAX_DESCRIPTION_LENGTH = 1024;
const ROUTER_SKILL = "ask-aura";

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
  const parsed: unknown = Bun.YAML.parse(match[1]);
  if (typeof parsed !== "object" || parsed === null) {
    return undefined;
  }
  return parsed;
}

function brokenLinks(markdownPath: string, root: string): string[] {
  const markdown = readFileSync(markdownPath, "utf8").replaceAll(
    /^(```|~~~)[\s\S]*?^\1/gm,
    "",
  );
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
    return [`skills/${name}: SKILL.md has no frontmatter`];
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
  return [...problems, ...brokenLinks(skillFile, root)];
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
  const unrouted = names
    .filter((name) => !router.includes(`\`/${name}\``))
    .map((name) => `skills/${ROUTER_SKILL}: does not describe /${name}`);

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
    ...unrouted,
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
