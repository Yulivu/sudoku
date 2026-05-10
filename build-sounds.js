const fs = require('fs');
const path = require('path');

const SOUNDS_DIR = path.join(__dirname, 'sounds');

const GROUP_MAP = {
  yes:  'sounds/click/YES',
  no:   'sounds/click/NO',
  help: 'sounds/click/HELP',
  win:  'sounds/click/win'
};

function scanDir(dir) {
  const abs = path.join(__dirname, dir);
  if (!fs.existsSync(abs)) return [];
  return fs.readdirSync(abs)
    .filter(f => /\.(mp3|wav|ogg|m4a)$/i.test(f))
    .sort()
    .map(f => dir + '/' + f);
}

const manifest = {};
for (const [group, dir] of Object.entries(GROUP_MAP)) {
  manifest[group] = scanDir(dir);
}

const out = path.join(__dirname, 'sounds.js');
const content = 'window.__SOUNDS__ = ' + JSON.stringify(manifest, null, 2) + ';\n';
fs.writeFileSync(out, content, 'utf-8');

console.log('Generated sounds.js:');
for (const [g, files] of Object.entries(manifest)) {
  console.log(`  ${g}: ${files.length} file(s)`);
}
