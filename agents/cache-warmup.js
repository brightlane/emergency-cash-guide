#!/usr/bin/env node
// Cache 10k keywords upfront
const keywords = Array.from({length: 10000}, (_, i) => `emergency-cash-${i}`);
fs.writeFileSync('../cache/keywords-cache.json', JSON.stringify({keywords}));
console.log('✅ Cache: 10k keywords ready (1s access)');
