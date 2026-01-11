const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf-8');
const base64Pattern = /data:application\/javascript;base64,([A-Za-z0-9+/=]+)/g;

let match;
let moduleIndex = 0;

while ((match = base64Pattern.exec(html)) !== null) {
  moduleIndex++;
  const decoded = Buffer.from(match[1], 'base64').toString('utf-8');

  if (decoded.includes('harry-n2.github.io')) {
    console.log(`✓ Module ${moduleIndex}: Found NEW URL (harry-n2.github.io/kiwami)`);
  }

  if (decoded.includes('run.app')) {
    console.log(`Module ${moduleIndex}: Contains 'run.app'`);
    const lines = decoded.split('\n');
    lines.forEach((line, idx) => {
      if (line.includes('run.app')) {
        console.log(`  Line ${idx}: ${line.trim().substring(0, 100)}`);
      }
    });
  }
}
