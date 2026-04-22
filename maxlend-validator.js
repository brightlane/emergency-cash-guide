#!/usr/bin/env node
// Agent-8: MaxLend Validator
import fs from 'fs';
const data = JSON.parse(fs.readFileSync('../output/maxlend-products.json'));
const valid = data.products.filter(p => p.status === 'live');
fs.writeFileSync('../output/maxlend-valid.json', JSON.stringify({...data, products: valid}));
console.log(`✅ ${valid.length} MaxLend products validated`);
