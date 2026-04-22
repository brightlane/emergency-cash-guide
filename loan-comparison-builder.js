#!/usr/bin/env node
// Agent-14: Loan Comparison Pages
const html = `<!DOCTYPE html>
<html><head><title>Emergency Cash Loans Comparison</title></head>
<body>
<h1>Fastest Emergency Cash Loans 2026</h1>
<table border="1">
<tr><th>Lender</th><th>Amount</th><th>Speed</th><th>Action</th></tr>
<tr><td>MaxLend</td><td>$1000</td><td>Same Day</td><td><a href="https://www.linkconnector.com/ta.php?lc=007949096598005765&atid=MaxlendT">Apply</a></td></tr>
</table>
</body></html>`;
fs.writeFileSync('../output/emergency-cash-comparison.html', html);
console.log('✅ Loan comparison page built');
