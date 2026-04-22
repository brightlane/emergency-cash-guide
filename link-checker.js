#!/usr/bin/env node
// Agent-17: Link Checker
// Validates all affiliate + internal links

import fs from 'fs';

const maxlendLink = 'https://www.linkconnector.com/ta.php?lc=007949096598005765&atid=MaxlendT';
const errors = [];

const files = fs.readdirSync('../output').filter(f => f.endsWith('.html'));
files.forEach(file => {
  const content = fs.readFileSync(`../output/${file}`).toString();
  
  // Check MaxLend affiliate links
  if (!content.includes(maxlendLink)) {
    errors.push(`${file}: Missing MaxLend affiliate link`);
  }
  
  // Check internal links
  if (!content.includes('index.html') && !content.includes('maxlend-review.html')) {
    errors.push(`${file}: Missing internal links`);
  }
});

const report = { agent: 'Link Checker', errors, total: files.length, valid: files.length - errors.length };
fs.writeFileSync('../output/link-report.json', JSON.stringify(report, null, 2));

console.log(`✅ Links: ${report.valid}/${report.total} OK`);
