#!/usr/bin/env node
// Agent-18: Deploy Guard
// Blocks bad deploys (<95% validation)

import fs from 'fs';

const validation = JSON.parse(fs.readFileSync('../output/validation-report.json'));
const links = JSON.parse(fs.readFileSync('../output/link-report.json'));

const score = (validation.passRate * 0.7) + ((links.valid / links.total) * 30);

const approval = {
  agent: 'Deploy Guard',
  validationScore: validation.passRate,
  linkScore: (links.valid / links.total) * 100,
  finalScore: Math.round(score),
  approved: score >= 95,
  message: score >= 95 ? '🚀 DEPLOY APPROVED' : '⏸️ DEPLOY BLOCKED'
};

fs.writeFileSync('../output/deploy-approval.json', JSON.stringify(approval, null, 2));

console.log(approval.message);
console.log(`Score: ${approval.finalScore}%`);
