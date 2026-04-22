#!/usr/bin/env node
// Agent-30: Gem Page Auto-Builder
import fs from 'fs';
const engines = ['google', 'bing', 'yahoo', 'aol', 'msn', 'ddd', 'legacy'];

let allGems = [];
engines.forEach(engine => {
  try {
    const data = JSON.parse(fs.readFileSync(`../output/${engine}-gems.json`));
    allGems.push(...data.gems);
  } catch {}
});

allGems.slice(0, 50).forEach((gem, i) => {
  const slug = gem.query.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const html = `<!DOCTYPE html>
<html><head><title>${gem.query} - Fast Cash MaxLend</title>
<meta name="description" content="Get ${gem.query} with MaxLend same day funding.">
</head><body>
<h1>${gem.query}</h1>
<p>Need ${gem.query.replace('payday','cash')}? MaxLend offers fast approval.</p>
<a href="https://www.linkconnector.com/ta.php?lc=007949096598005765&atid=MaxlendT" rel="sponsored">Get Cash Now - MaxLend</a>
<p><a href="index.html">More emergency cash options</a></p>
</body></html>`;
  fs.writeFileSync(`../output/gem-${i}-${slug}.html`, html);
});

console.log(`✅ Generated ${allGems.length} gem pages (payday-atlantic-city.html etc)`);
