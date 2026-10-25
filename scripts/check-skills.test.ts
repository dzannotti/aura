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

const router = `${skill("ask-aura")}\n\`/ask-aura\` \`/demo\`\n`;

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
    "skills/ask-aura/SKILL.md": `${skill("ask-aura")}\n\`/ask-aura\`\n`,
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
    "skills/ask-aura/SKILL.md": `${skill("ask-aura")}\n\`/ask-aura\`\n`,
  });
  writeFileSync(
    join(root, ".claude-plugin", "plugin.json"),
    JSON.stringify({ version: "9.9.9" }),
  );
  expect(checkRepo(root)).toEqual([
    "version drift: package.json 0.1.0 vs .claude-plugin/plugin.json 9.9.9",
  ]);
});
