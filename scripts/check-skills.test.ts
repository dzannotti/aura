import { afterEach, expect, test } from "bun:test";
import {
  mkdirSync,
  mkdtempSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { checkRepo } from "./check-skills";

const roots: string[] = [];

function skill(name: string, description = "Does a thing."): string {
  return `---\nname: ${name}\ndescription: ${description}\n---\n\n# ${name}\n`;
}

function makeRepo(files: Record<string, string>, version = "0.1.0"): string {
  const root = mkdtempSync(join(tmpdir(), "aura-check-"));
  roots.push(root);
  mkdirSync(join(root, ".claude-plugin"), { recursive: true });
  writeFileSync(join(root, "package.json"), JSON.stringify({ version }));
  writeFileSync(
    join(root, ".claude-plugin", "plugin.json"),
    JSON.stringify({ version }),
  );
  for (const [path, content] of Object.entries(files)) {
    mkdirSync(join(root, path, ".."), { recursive: true });
    writeFileSync(join(root, path), content);
  }
  return root;
}

afterEach(() => {
  for (const root of roots.splice(0)) {
    rmSync(root, { recursive: true, force: true });
  }
});

function routerFor(built: string[], planned: string[] = []): string {
  const headings = (names: string[]) =>
    names.map((name) => `### \`/${name}\`\n\nDoes ${name}.\n`).join("\n");
  return `${skill("ask-aura")}\n## Skills\n\n${headings(built)}\n## Planned\n\n${headings(planned)}`;
}

const router = routerFor(["ask-aura", "demo"]);

test("a well-formed repo has no problems", () => {
  const root = makeRepo({
    "skills/ask-aura/SKILL.md": router,
    "skills/demo/SKILL.md": `${skill("demo")}\nSee [notes](notes.md).\n`,
    "skills/demo/notes.md": "# Notes\n",
  });
  expect(checkRepo(root)).toEqual([]);
});

test("a skill the router does not describe is reported", () => {
  const root = makeRepo({
    "skills/ask-aura/SKILL.md": routerFor(["ask-aura"]),
    "skills/demo/SKILL.md": skill("demo"),
  });
  expect(checkRepo(root)).toEqual(["skills/ask-aura: does not describe /demo"]);
});

test("a frontmatter name that differs from the directory is reported", () => {
  const root = makeRepo({
    "skills/ask-aura/SKILL.md": router,
    "skills/demo/SKILL.md": skill("other"),
  });
  expect(checkRepo(root)).toEqual([
    'skills/demo: frontmatter name must be "demo"',
  ]);
});

test("a missing description and a broken link are both reported", () => {
  const root = makeRepo({
    "skills/ask-aura/SKILL.md": router,
    "skills/demo/SKILL.md": `---\nname: demo\n---\n\nSee [gone](gone.md).\n`,
  });
  expect(checkRepo(root)).toEqual([
    "skills/demo: frontmatter needs a description",
    "skills/demo/SKILL.md: broken link gone.md",
  ]);
});

test("links inside fenced code blocks are examples, not links", () => {
  const root = makeRepo({
    "skills/ask-aura/SKILL.md": router,
    "skills/demo/SKILL.md": `${skill("demo")}\n\`\`\`md\n- [Ordering](./src/ordering/GLOSSARY.md)\n\`\`\`\n`,
  });
  expect(checkRepo(root)).toEqual([]);
});

test("a symlink inside skills is reported", () => {
  const root = makeRepo({
    "skills/ask-aura/SKILL.md": router,
    "skills/demo/SKILL.md": skill("demo"),
  });
  symlinkSync(
    join(root, "skills/demo/SKILL.md"),
    join(root, "skills/demo/alias.md"),
  );
  expect(checkRepo(root)).toEqual([
    "skills/demo/alias.md: symlinks are not allowed in skills/",
  ]);
});

test("a plugin version that drifts from package.json is reported", () => {
  const root = makeRepo({
    "skills/ask-aura/SKILL.md": routerFor(["ask-aura"]),
  });
  writeFileSync(
    join(root, ".claude-plugin", "plugin.json"),
    JSON.stringify({ version: "9.9.9" }),
  );
  expect(checkRepo(root)).toEqual([
    "version drift: package.json 0.1.0 vs .claude-plugin/plugin.json 9.9.9",
  ]);
});

test("a link to a planned skill is allowed", () => {
  const root = makeRepo({
    "skills/ask-aura/SKILL.md": routerFor(["ask-aura", "demo"], ["later"]),
    "skills/demo/SKILL.md": `${skill("demo")}\nHand off to \`/later\`.\n`,
  });
  expect(checkRepo(root)).toEqual([]);
});

test("a link to a skill that is neither built nor planned is reported", () => {
  const root = makeRepo({
    "skills/ask-aura/SKILL.md": router,
    "skills/demo/SKILL.md": `${skill("demo")}\nHand off to \`/ghost\`.\n`,
  });
  expect(checkRepo(root)).toEqual([
    "skills/demo/SKILL.md: links /ghost, which is neither a skill nor planned in ask-aura",
  ]);
});

test("a built skill still listed as planned is reported", () => {
  const root = makeRepo({
    "skills/ask-aura/SKILL.md": routerFor(["ask-aura", "demo"], ["demo"]),
    "skills/demo/SKILL.md": skill("demo"),
  });
  expect(checkRepo(root)).toEqual([
    "skills/ask-aura: /demo exists; move it from Planned to Skills",
  ]);
});

test("a skill mentioned only in passing is not routed", () => {
  const root = makeRepo({
    "skills/ask-aura/SKILL.md": `${routerFor(["ask-aura"])}\nSee \`/demo\`.\n`,
    "skills/demo/SKILL.md": skill("demo"),
  });
  expect(checkRepo(root)).toEqual(["skills/ask-aura: does not describe /demo"]);
});
