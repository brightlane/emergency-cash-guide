#!/usr/bin/env node
// Agent-5: SEO Optimizer
import fs from 'fs';
console.log('🔧 Agent-5: Optimizing HTML...');
fs.readdirSync('../output').filter(f => f.endsWith('.html')).forEach(file => {
  let content = fs.readFileSync(`../output/${file}`, 'utf8');
  content = content.replace('<head>', '<head><meta name="robots" content="index,follow">');
  fs.writeFileSync(`../output/${file}`, content);
});
console.log('✅ SEO headers added');
