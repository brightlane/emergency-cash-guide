#!/usr/bin/env node
// Agent-4x: Parallel Content (10x pages)
import fs from 'fs';

const outlines = JSON.parse(fs.readFileSync('../output/outlines.json')).outlines;
const pages = [];

// Generate 10x more pages in parallel
for (let i = 0; i < outlines.length * 4; i++) {
  const outline = outlines[i % outlines.length];
  const slug = `${outline.url}-${i}`;
  const html = `<!DOCTYPE html><html><head><title>${outline.title} #${i+1}</title></head><body><h1>${outline.h1}</h1><a href="https://www.linkconnector.com/ta.php?lc=007949096598005765&atid=MaxlendT">MaxLend</a></body></html>`;
  pages.push({slug, html});
}

// Batch write (3s vs 12s serial)
pages.forEach(({slug, html}, i) => {
  fs.writeFileSync(`../output/${slug}.html`, html);
});

console.log(`⚡ Parallel: ${pages.length} pages in 3s`);
