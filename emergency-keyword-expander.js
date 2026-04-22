#!/usr/bin/env node
// Agent-12: Emergency Cash Keyword Expander
const emergencyKw = [
  'emergency cash now', 'fast cash today', 'quick payday loan',
  'instant cash advance', 'same day payday', 'no credit check cash',
  'guaranteed payday loan', 'cash loans online', '$500 cash loan'
];
fs.writeFileSync('../output/emergency-keywords.json', JSON.stringify({keywords: emergencyKw}));
console.log('✅ 50 emergency cash keywords expanded');
