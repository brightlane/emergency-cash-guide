#!/usr/bin/env node
// Agent-3: Content Architect (MaxLend Edition)
// intents.json → detailed outlines → article-writer ready

import fs from 'fs';

const intentsData = JSON.parse(fs.readFileSync('../output/intents.json', 'utf8'));

class ContentArchitect {
  architect() {
    console.log('🏗️ Agent-3: Architecting MaxLend content...');
    
    const detailedOutlines = intentsData.outlines.map(outline => {
      return {
        ...outline,
        meta: this.generateMeta(outline),
        schema: this.generateSchema(outline),
        internalLinks: this.generateLinks(outline),
        wordcount: 1800,
        structure: this.detailedStructure(outline),
        affiliateCTAs: this.ctaPositions(outline)
      };
    });

    const output = {
      agent: 'Content Architect',
      timestamp: new Date().toISOString(),
      pages: detailedOutlines.length,
      totalWords: detailedOutlines.reduce((sum, p) => sum + p.wordcount, 0),
      outlines: detailedOutlines
    };

    fs.writeFileSync('../output/outlines.json', JSON.stringify(output, null, 2));
    console.log(`✅ Architected ${output.pages} pages (${output.totalWords} words)`);
    
    return output;
  }

  generateMeta(outline) {
    return {
      title: outline.title,
      description: `${outline.h1}: ${outline.primaryKeyword} rates, eligibility, reviews, and alternatives for ${new Date().getFullYear()}.`,
      keywords: [outline.primaryKeyword, 'maxlend', 'emergency cash', 'installment loans'],
      canonical: `https://brightlane.github.io/emergency-cash-guide/${outline.url}.html`
    };
  }

  generateSchema(outline) {
    return {
      "@type": "FinancialProductReview",
      "name": outline.title,
      "reviewBody": `Complete ${outline.h1} covering eligibility, rates, application process, and alternatives.`,
      "author": {"@type": "Person", "name": "Emergency Cash Guide"},
      "datePublished": new Date().toISOString().split('T')[0]
    };
  }

  generateLinks(outline) {
    const baseLinks = [
      { url: 'index.html', text: 'Home' },
      { url: 'maxlend-review.html', text: 'MaxLend Review' },
      { url: 'responsible-borrowing.html', text: 'Responsible Borrowing' }
    ];
    
    // Context-specific
    if (outline.url.includes('eligibility')) {
      baseLinks.push({ url: 'maxlend-apply.html', text: 'Apply Now' });
    }
    
    return baseLinks;
  }

  detailedStructure(outline) {
    const baseStructure = {
      hero: {
        h1: outline.h1,
        subtitle: `Your complete guide to ${outline.primaryKeyword}`,
        cta: outline.cta || 'Check MaxLend Offer'
      },
      sections: outline.sections.map((section, i) => ({
        h2: section,
        contentType: i < 3 ? 'detailed-analysis' : 'comparison-list',
        wordcount: 250,
        includesTable: i === 1
      }))
    };
    
    return baseStructure;
  }

  ctaPositions(outline) {
    return [
      { position: 'hero', text: 'Check MaxLend Offer', link: 'https://www.linkconnector.com/ta.php?lc=007949096598005765&atid=MaxlendT' },
      { position: 'mid-content', text: 'See If You Qualify', link: 'maxlend-eligibility.html' },
      { position: 'footer', text: 'Apply Responsibly', link: 'responsible-borrowing.html' }
    ];
  }
}

// PIPELINE: intents.json → outlines.json
const architect = new ContentArchitect();
architect.architect();
