// Scaffolds a patch note in all three locales.
//
//   node scripts/new-patch-note.mjs 0.1.4
//
// Writing the three files by hand is where this goes wrong: a locale gets
// forgotten and its page silently falls back to Korean, or sidebar_position is
// off and the version list stops being newest-first. Both are computed here.

import fs from 'node:fs';
import path from 'node:path';

const version = process.argv[2];
if (!version || !/^\d+\.\d+\.\d+(-\w+)?$/.test(version)) {
  console.error('usage: node scripts/new-patch-note.mjs <version>');
  console.error('example: node scripts/new-patch-note.mjs 0.1.4');
  process.exit(1);
}

const LOCALES = [
  {code: 'ko', dir: 'docs/changelog'},
  {
    code: 'en',
    dir: 'i18n/en/docusaurus-plugin-content-docs/current/changelog',
  },
  {
    code: 'ja',
    dir: 'i18n/ja/docusaurus-plugin-content-docs/current/changelog',
  },
];

const TEMPLATE = 'docs/changelog/_template.md';

// Docusaurus sorts ascending, so a newer version needs a smaller number.
// Negating a zero-padded version code keeps the list newest-first forever.
const [major, minor, patch] = version.split('-')[0].split('.').map(Number);
const position = -(major * 10000 + minor * 100 + patch);

const template = fs.readFileSync(TEMPLATE, 'utf8');
const body = template
  .replace(/^---\n[\s\S]*?\n---\n/, '')
  .replace(/^<!--[\s\S]*?-->\n/, '');

const frontmatter = [
  '---',
  `id: v${version}`,
  `title: ${version}`,
  `sidebar_position: ${position}`,
  '---',
  '',
].join('\n');

const guard =
  '<!--\n' +
  '  작성 규칙은 docs/changelog/_template.md 위쪽 주석에 있습니다.\n' +
  '  세 언어(ko · en · ja)를 항상 함께 채우세요. 하나라도 비우면 그 언어\n' +
  '  페이지가 한국어로 폴백되어, 번역된 것처럼 보이면서 실제로는 안 됩니다.\n' +
  '  링크 앵커는 한국어 원본 그대로 세 언어에 동일하게 씁니다.\n' +
  '-->\n\n';

let created = 0;
for (const {code, dir} of LOCALES) {
  const file = path.join(dir, `${version}.md`);
  if (fs.existsSync(file)) {
    console.log(`exists   ${file}`);
    continue;
  }
  fs.mkdirSync(dir, {recursive: true});
  fs.writeFileSync(file, frontmatter + guard + body);
  console.log(`created  ${file}`);
  created++;
}

if (created) {
  console.log(
    `\n${version}  sidebar_position ${position}\n` +
      'Fill all three, then:\n' +
      '  npm run build\n' +
      '  node scripts/check-translations.mjs en\n' +
      '  node scripts/check-translations.mjs ja'
  );
}
