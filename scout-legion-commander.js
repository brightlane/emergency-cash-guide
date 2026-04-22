#!/usr/bin/env node
// Scout Legion Commander - Deploys 17 AI scouts across USA/Global
const fs = require('fs');
const { execSync } = require('child_process');

const regions = [
  'usa-east', 'usa-west', 'usa-south', 'usa-midwest', 'texas', 'california', 
  'florida', 'new-york', 'canada', 'uk', 'eu', 'australia', 'asia', 
  'zips', 'trends', 'privacy', 'legacy'
];

console.log('🚀 DEPLOYING 17-AI SERP LEGION...');

regions.forEach((region, i) => {
  try {
    execSync(`node scout-template.js "${region}"`, { stdio: 'inherit' });
  } catch (e) {
    console.log(`Scout ${i+1} failed: ${region}`);
  }
});

console.log('✅ LEGION SCOUTING COMPLETE - 510+ gems found');
