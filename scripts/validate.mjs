import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const skills = join(root, 'skills');
const names = new Set();
async function markdownFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await markdownFiles(path));
    else if (entry.name.endsWith('.md')) files.push(path);
  }
  return files;
}
for (const entry of await readdir(skills, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const directory = join(skills, entry.name);
  const text = await readFile(join(directory, 'SKILL.md'), 'utf8');
  const header = /^---\nname: ([a-z0-9]+(?:-[a-z0-9]+)*)\ndescription: ([^\n]+)\n---\n/.exec(text);
  assert.ok(header, `${entry.name}: expected plain name/description frontmatter`);
  assert.equal(header[1], entry.name, `${entry.name}: directory and name differ`);
  assert.ok(header[1].length <= 64 && !names.has(header[1]), `${entry.name}: invalid or duplicate name`);
  assert.ok(header[2].trim().length >= 30 && header[2].length <= 1024, `${entry.name}: invalid description`);
  assert.ok(text.split('\n').length < 500, `${entry.name}: move optional detail into references`);
  names.add(header[1]);
  for (const path of await markdownFiles(directory)) {
    const body = await readFile(path, 'utf8');
    assert.ok(!/\/(?:Users|home)\/[^\s/]+\//.test(body), `${path}: author-machine path`);
    for (const match of body.matchAll(/\[[^\]]*\]\(([^\s)]+)\)/g)) {
      const target = match[1];
      if (/^(?:https?:|#)/.test(target)) continue;
      const linked = resolve(dirname(path), target.split('#')[0]);
      assert.ok(linked.startsWith(directory + sep), `${path}: reference escapes this skill`);
      assert.ok((await stat(linked)).isFile(), `${path}: missing reference ${target}`);
    }
  }
}
assert.ok(names.size > 0, 'No skills found');
console.log(`Validated ${names.size} independently installable skills.`);
