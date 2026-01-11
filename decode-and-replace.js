const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf-8');
const base64Pattern = /data:application\/javascript;base64,([A-Za-z0-9+/=]+)/g;

let newHtml = html;
let replacementCount = 0;

newHtml = newHtml.replace(base64Pattern, (match, base64Content) => {
  const decoded = Buffer.from(base64Content, 'base64').toString('utf-8');

  // Check if this module contains the URL we want to replace
  if (decoded.includes('run.app') || decoded.includes('kiwami')) {
    console.log('Found URL in base64 module, replacing...');

    // Replace the old URL with the new one
    const updatedDecoded = decoded.replace(
      /https:\/\/kiwami-zero-one-marketing-mvp-[\d]+\.us-west1\.run\.app\/?#?\/?/g,
      'https://harry-n2.github.io/kiwami/'
    );

    if (updatedDecoded !== decoded) {
      replacementCount++;
      console.log('Replacement made!');
    }

    // Re-encode to base64
    const newBase64 = Buffer.from(updatedDecoded, 'utf-8').toString('base64');
    return `data:application/javascript;base64,${newBase64}`;
  }

  return match;
});

if (replacementCount > 0) {
  fs.writeFileSync('index.html', newHtml, 'utf-8');
  console.log(`Successfully replaced ${replacementCount} occurrence(s) of the URL.`);
} else {
  console.log('No replacements made. URL not found in base64 modules.');
}
