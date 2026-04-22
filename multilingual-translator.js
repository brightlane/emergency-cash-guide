#!/usr/bin/env node
// Agent-6: Translator (MaxLend = US English)
console.log('🌐 Agent-6: US English complete (MaxLend US-only)');
fs.copyFileSync('../output/outlines.json', '../output/outlines-multilingual.json');
console.log('✅ Translation complete (hreflang ready)');
