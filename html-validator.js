#!/usr/bin/env node
// Agent-16: HTML Validator
// Checks all generated HTML for errors

import fs from 'fs';
import path from 'path';

class HTMLValidator {
  validate() {
    console.log('🔍 Agent-16: Validating HTML integrity...');
    
    const files = fs.readdirSync('../output').filter(f => f.endsWith('.html'));
    let valid = 0, errors = [];

    files.forEach(file => {
      try {
        const content = fs.readFileSync(path.join('../output', file), 'utf8');
        
        // Basic validation
        if (!content.includes('<!DOCTYPE html>')) {
          errors.push(`${file}: Missing DOCTYPE`);
        } else if (!content.includes('<title>')) {
          errors.push(`${file}: Missing title`);
        } else if (content.length < 1000) {
          errors.push(`${file}: Too short`);
        } else {
          valid++;
        }
      } catch (e) {
        errors.push(`${file}: ${e.message}`);
      }
    });

    const report = {
      agent: 'HTML Validator',
      totalFiles: files.length,
      valid,
      errors,
      passRate: Math.round((valid / files.length) * 100)
    };

    fs.writeFileSync('../output/validation-report.json', JSON.stringify(report, null, 2));
    
    console.log(`✅ ${report.passRate}% pass rate (${valid}/${files.length})`);
    return report;
  }
}

new HTMLValidator().validate();
