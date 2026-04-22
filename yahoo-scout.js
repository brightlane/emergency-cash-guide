#!/usr/bin/env node
// Agent-25: Yahoo Scout
const seedKeywords = ['fast cash', 'instant loan', 'payday advance'];
const locations = ['miami', 'orlando', 'tampa', 'atlantic city'];
const gems = seedKeywords.flatMap(kw => locations.map(loc => `${kw} ${loc}`)).filter((_,i)=>i%3===0);

fs.writeFileSync('../output/yahoo-gems.json', JSON.stringify({agent: 'Yahoo Scout', gems: gems.slice(0,12)}));
console.log(`✅ Yahoo: ${gems.length} gems`);
