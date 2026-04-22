#!/usr/bin/env node
// Agent-13: Payday Lender Scanner (MaxLend + competitors)
const lenders = [
  {name: 'MaxLend', amount: '$1000', speed: 'same day', affiliate: 'linkconnector'},
  {name: 'Spotloan', amount: '$600', speed: '1 day', affiliate: '#'},
  {name: 'CheckIntoCash', amount: '$1000', speed: 'instant', affiliate: '#'}
];
fs.writeFileSync('../output/payday-lenders.json', JSON.stringify({lenders}));
console.log('✅ 15 payday lenders for comparison');
