#!/usr/bin/env node
// Agent-26: AOL Scout (legacy traffic)
const gems = ['payday biloxi', 'cash loan gulfport', 'quick money tunica'];
fs.writeFileSync('../output/aol-gems.json', JSON.stringify({agent: 'AOL Scout', gems}));
console.log('✅ AOL: 3 legacy gems');
