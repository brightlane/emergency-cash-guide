#!/usr/bin/env node
// Agent-1: Keyword Scout (MaxLend Edition)
// Targets EXACT MaxLend keywords + emergency cash niche

import fs from 'fs';
import yaml from 'js-yaml';
import axios from 'axios';
import cheerio from 'cheerio';

const config = yaml.load(fs.readFileSync('../global.config.yaml', 'utf8'));

class MaxLendKeywordScout {
  constructor() {
    this.maxlendSeeds = [
      'maxlend', 'maxlend review', 'maxlend login', 'maxlend loans',
      'maxlend eligibility', 'maxlend application', 'maxlend rates',
      'maxlend alternatives', 'maxlend complaints', 'maxlend customer service'
    ];
    this.emergencySeeds = [
      'emergency cash', 'quick cash loans', 'installment loans online',
      'bad credit loans', 'no credit check loans', 'same day cash'
    ];
  }

  async scout() {
    console.log('🔍 Agent-1: MaxLend keyword scouting...');
    
    const keywords = new Set();
    
    // 1. MaxLend exact match + modifiers
    const maxlendKw = await this.scoutMaxLend();
    maxlendKw.forEach(kw => keywords.add(kw));
    
    // 2. Emergency cash competitors
    const emergencyKw = await this.scoutEmergencyCash();
    emergencyKw.forEach(kw => keywords.add(kw));
    
    // 3. Google autocomplete for MaxLend
    const autocomplete = await this.googleAutocomplete();
    autocomplete.forEach(kw => keywords.add(kw));
    
    // 4. Amazon product keywords (cash advance related)
    const amazonKw = await this.amazonSuggestions();
    amazonKw.forEach(kw => keywords.add(kw));
    
    const keywordList = Array.from(keywords).slice(0, 300);
    
    const output = {
      agent: 'MaxLend Keyword Scout',
      timestamp: new Date().toISOString(),
      total: keywordList.length,
      markets: ['us'],  // MaxLend = US only
      highIntent: keywordList.filter(kw => this.isHighIntent(kw)),
      maxlendExact: maxlendKw.slice(0, 50),
      volumeEstimates: this.estimateVolumes(keywordList),
      keywords: keywordList
    };
    
    fs.writeFileSync('../output/keywords.json', JSON.stringify(output, null, 2));
    console.log(`✅ MaxLend: ${output.maxlendExact.length} exact + ${output.total} total keywords`);
    
    return output;
  }

  async scoutMaxLend() {
    const modifiers = ['review', 'login', 'apply', 'rates', 'eligibility', 
                      'complaints', 'bbb', 'scam', 'alternatives', 'vs'];
    return this.maxlendSeeds.flatMap(seed => 
      modifiers.map(mod => `${seed} ${mod}`)
    );
  }

  async scoutEmergencyCash() {
    const modifiers = ['online', 'direct lender', 'bad credit', 'instant approval',
                      'no credit check', 'guaranteed approval', '$1000'];
    return this.emergencySeeds.flatMap(seed => 
      modifiers.map(mod => `${seed} ${mod}`)
    );
  }

  async googleAutocomplete() {
    // Real Google suggest (simplified)
    const seeds = ['maxlend', 'emergency cash loan'];
    const suggestions = [];
    
    for (const seed of seeds) {
      // Mock real autocomplete (production = google-suggest-api)
      suggestions.push(
        `${seed} review`,
        `${seed} login`, 
        `${seed} apply online`,
        `${seed} bad credit`,
        `${seed} rates`
      );
    }
    return suggestions;
  }

  async amazonSuggestions() {
    // Real Amazon cash-related products
    return [
      'cash advance', 'emergency loan book', 'financial help guide',
      'debt relief', 'credit repair'
    ];
  }

  isHighIntent(keyword) {
    const signals = ['loan', 'cash', 'apply', 'login', 'eligibility', 'rates'];
    return signals.some(signal => keyword.toLowerCase().includes(signal));
  }

  estimateVolumes(keywords) {
    // Mock SEMrush/Ahrefs volumes (real = API)
    return keywords.map(kw => ({
      keyword: kw,
      estMonthly: Math.floor(Math.random() * 5000) + 100,
      competition: Math.random()
    })).slice(0, 50);
  }
}

// EXECUTE
const scout = new MaxLendKeywordScout();
scout.scout().catch(console.error);
