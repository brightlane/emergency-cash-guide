#!/usr/bin/env node
// Agent-9: MaxLend Page Builder
import fs from 'fs';
const valid = JSON.parse(fs.readFileSync('../output/maxlend-valid.json'));

valid.products.forEach(product => {
  const html = `<!DOCTYPE html>
<html><head><title>${product.name} | MaxLend Guide</title></head>
<body>
  <h1>${product.name}</h1>
  <div class="specs">
    <strong>Amount:</strong> ${product.amount}<br>
    <strong>APR:</strong> ${product.apr}<br>
    <strong>Term:</strong> ${product.term}
  </div>
  <a href="${product.affiliate}" class="cta" rel="sponsored">Check ${product.name} Offer</a>
</body></html>`;
  fs.writeFileSync(`../output/${product.id}.html`, html);
});

console.log(`✅ Built MaxLend product pages`);
