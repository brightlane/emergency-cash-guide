#!/usr/bin/env node
// Agent-11: MaxLend Ranker
const comparisons = JSON.parse(fs.readFileSync('../output/maxlend-products.json')).comparisons;

const html = `<!DOCTYPE html>
<html><head><title>MaxLend vs Alternatives 2026</title></head>
<body>
  <h1>MaxLend vs Top Alternatives</h1>
  ${comparisons.map(comp => `
    <section>
      <h2>${comp.name}</h2>
      <table border="1">
        <tr><th>Feature</th><th>MaxLend</th><th>${comp.name.split('vs')[1].trim()}</th></tr>
        ${comp.table.map(row => `<tr><td>${row}</td><td>-</td><td>-</td></tr>`).join('')}
      </table>
    </section>
  `).join('')}
</body></html>`;

fs.writeFileSync('../output/maxlend-vs-alternatives.html', html);
console.log('✅ MaxLend comparison pages built');
