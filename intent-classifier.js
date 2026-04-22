#!/usr/bin/env node
// Agent-2: Intent Classifier (MaxLend Edition)
// keywords.json → intents.json → outlines for article writer

import fs from 'fs';

const keywordsData = JSON.parse(fs.readFileSync('../output/keywords.json', 'utf8'));

class IntentClassifier {
  classify() {
    console.log('🎯 Agent-2: Classifying MaxLend intents...');
    
    const intents = {
      informational: [],
      transactional: [],
      navigational: [],
      commercial: []
    };

    keywordsData.keywords.forEach(keyword => {
      const lower = keyword.toLowerCase();
      
      if (this.isInformational(lower)) intents.informational.push(keyword);
      else if (this.isTransactional(lower)) intents.transactional.push(keyword);
      else if (this.isNavigational(lower)) intents.navigational.push(keyword);
      else intents.commercial.push(keyword);
    });

    // Generate outlines for top keywords
    const outlines = this.createOutlines(intents);

    const output = {
      agent: 'Intent Classifier',
      timestamp: new Date().toISOString(),
      stats: {
        informational: intents.informational.length,
        transactional: intents.transactional.length,
        navigational: intents.navigational.length,
        commercial: intents.commercial.length
      },
      topIntents: intents,
      outlines: outlines
    };

    fs.writeFileSync('../output/intents.json', JSON.stringify(output, null, 2));
    console.log(`✅ Classified ${keywordsData.total} keywords → ${outlines.length} outlines`);
    
    return output;
  }

  isInformational(keyword) {
    const patterns = ['review', 'eligibility', 'rates', 'complaints', 'scam', 'bbb'];
    return patterns.some(p => keyword.includes(p));
  }

  isTransactional(keyword) {
    const patterns = ['apply', 'login', 'sign up', 'get loan'];
    return patterns.some(p => keyword.includes(p));
  }

  isNavigational(keyword) {
    const patterns = ['login', 'portal', 'account', 'customer service'];
    return patterns.some(p => keyword.includes(p));
  }

  createOutlines(intents) {
    const outlines = [];

    // MaxLend Review (top informational)
    outlines.push({
      url: 'maxlend-review',
      title: 'MaxLend Review 2026: Rates, Eligibility & Alternatives',
      h1: 'MaxLend Review',
      primaryKeyword: 'maxlend review',
      sections: [
        'How MaxLend works',
        'Pros and cons', 
        'Eligibility requirements',
        'Cost breakdown',
        'Alternatives comparison'
      ],
      cta: 'Check MaxLend Offer'
    });

    // Eligibility page
    outlines.push({
      url: 'maxlend-eligibility',
      title: 'MaxLend Eligibility Requirements 2026',
      h1: 'MaxLend Eligibility Checker',
      primaryKeyword: 'maxlend eligibility',
      sections: [
        'Age and residency',
        'Income requirements',
        'Credit score needed',
        'Checking account rules',
        'Common rejection reasons'
      ]
    });

    // Apply page (transactional)
    outlines.push({
      url: 'maxlend-apply',
      title: 'Apply for MaxLend Loan - Instant Decision',
      h1: 'MaxLend Application',
      primaryKeyword: 'maxlend apply',
      sections: [
        '3-minute application',
        'What documents needed',
        'Funding timeline',
        'Approval factors',
        'Next steps after approval'
      ],
      cta: 'Apply Now - MaxLend'
    });

    // 10+ more auto-generated
    const moreOutlines = this.generateMoreOutlines(intents);
    outlines.push(...moreOutlines);

    return outlines.slice(0, 25); // Top 25 pages
  }

  generateMoreOutlines(intents) {
    const templates = [
      { url: 'maxlend-rates', title: 'MaxLend Rates & Fees', h1: 'MaxLend Rates' },
      { url: 'maxlend-vs-spotloan', title: 'MaxLend vs Spotloan', h1: 'MaxLend Alternatives' },
      { url: 'maxlend-complaints', title: 'MaxLend Complaints & Reviews', h1: 'MaxLend Reviews' }
    ];
    
    return templates.map(t => ({
      ...t,
      primaryKeyword: t.h1.toLowerCase(),
      sections: ['Overview', 'Comparison', 'User reviews', 'Recommendation']
    }));
  }
}

// PIPELINE: keywords.json → intents.json
const classifier = new IntentClassifier();
classifier.classify();
