#!/usr/bin/env node
// Agent-7: MaxLend Product Fetcher
// Fetches MaxLend alternatives + comparison data

import fs from 'fs';
import yaml from 'js-yaml';

const config = yaml.load(fs.readFileSync('../global.config.yaml', 'utf8'));

class MaxLendPAAPI {
  async fetchMaxLendProducts() {
    console.log('🔄 Agent-7: Fetching MaxLend ecosystem...');
    
    const maxlendProducts = [
      // MaxLend core offer
      {
        id: 'maxlend-installment',
        name: 'MaxLend Installment Loan',
        amount: '$100-$2,500',
        apr: '300-700%',
        term: '9 months',
        affiliate: 'https://www.linkconnector.com/ta.php?lc=007949096598005765&atid=MaxlendT',
        status: 'live'
      },
      // Alternatives for comparison pages
      {
        id: 'spotloan',
        name: 'Spotloan (Alternative)',
        amount: '$300-$800', 
        apr: '400-600%',
        term: '10 months',
        affiliate: '#',
        status: 'live'
      },
      {
        id: 'plain-green',
        name: 'Plain Green Loans',
        amount: '$500-$3,000',
        apr: '250-700%',
        term: '10-26 weeks',
        affiliate: '#',
        status: 'live'
      }
    ];

    const output = {
      agent: 'MaxLend PAAPI',
      timestamp: new Date().toISOString(),
      products: maxlendProducts,
      comparisons: this.generateComparisons(maxlendProducts)
    };

    fs.writeFileSync('../output/maxlend-products.json', JSON.stringify(output, null, 2));
    console.log(`✅ MaxLend + ${output.comparisons.length} comparisons`);
  }

  generateComparisons(products) {
    return [
      {
        name: 'MaxLend vs Spotloan',
        products: ['maxlend-installment', 'spotloan'],
        table: ['Amount', 'APR', 'Term', 'Approval Speed']
      },
      {
        name: 'MaxLend vs Plain Green',
        products: ['maxlend-installment', 'plain-green'],
        table: ['Amount', 'APR', 'Term', 'Fees']
      }
    ];
  }
}

const fetcher = new MaxLendPAAPI();
fetcher.fetchMaxLendProducts();
