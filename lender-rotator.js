#!/usr/bin/env node
// Agent-62: State Lender Rotator
const stateFallbacks = {
  'nj': 'https://www.rnd3.com/ai/iframeRedirect.php?id=SPOTLOAN_ID&subId=YOUR_SUBID',
  'ca': 'https://www.rnd3.com/ai/iframeRedirect.php?id=CREDITNINJA_ID&subId=YOUR_SUBID'
};

Object.entries(stateFallbacks).forEach(([state, url]) => {
  const html = `<html><body><h1>${state.toUpperCase()} Loans</h1><a href="${url}">Legal ${state.toUpperCase()} Option</a></body></html>`;
  fs.writeFileSync(`./output/state-${state}.html`, html);
});
console.log('✅ State fallbacks created');
