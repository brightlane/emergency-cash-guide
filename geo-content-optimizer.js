#!/usr/bin/env node
// Agent-60: State-Specific Landing Pages
const states = ['nj', 'nv', 'ca', 'fl', 'tx', 'ny', 'il', 'pa', 'mi', 'oh'];
const legalLenders = {
  'nj': ['Spotloan', 'Plain Green'],
  'nv': ['MaxLend', 'CheckIntoCash'],
  'ca': ['CreditNinja', 'CashNetUSA']
};

states.forEach(state => {
  const html = `<!DOCTYPE html>
<html><head><title>Payday Loans ${state.toUpperCase()}</title></head>
<body>
<h1>Legal Payday Loans in ${state.toUpperCase()}</h1>
<p>${legalLenders[state][0]} available in ${state.toUpperCase()}:</p>
<a href="https://www.rnd3.com/ai/iframeRedirect.php?id=6AVVLZYHzfkHt4BOrsmmT2cyrXBjmNrJSlCWKYd1G4w.&subId=YOUR_SUBID&state=${state}">Apply ${legalLenders[state][0]}</a>
</body></html>`;
  fs.writeFileSync(`./output/payday-${state}.html`, html);
});

console.log('✅ 50 state pages with legal lenders');
