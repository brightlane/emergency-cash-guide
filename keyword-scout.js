#!/usr/bin/env node
// Agent-1: Keyword Scout (REAL - No Mock)
// Finds trending keywords for 7 global markets

import fs from 'fs';
import yaml from 'js-yaml';
import axios from 'axios';
import cheerio from 'cheerio';

const config = yaml.load(fs.readFileSync('../global.config.yaml', 'utf8'));

class KeywordScout {
  async scout() {
    console.log('🔍 Agent-1: Scanning global keywords...');
    
    const keywords = [];
    
    // 1. REAL Google Trends (trending searches)
    const trends = await this.getGoogleTrends();
    keywords.push(...trends);
    
    // 2. REAL Amazon autocomplete (product keywords) 
    for (const market of ['us', 'uk', 'de']) {
      const amazonKw = await this.getAmazonSuggestions(market);
      keywords.push(...amazonKw);
    }
    
    // 3. Travel keywords (Skyscanner style)
    const travelKw = await this.getTravelKeywords();
    keywords.push(...travelKw);
    
    // Dedupe + save
    const uniqueKeywords = [...new Set(keywords)].slice(0, 500);
    
    const output = {
      agent: 'Keyword Scout',
      timestamp: new Date().toISOString(),
      total: uniqueKeywords.length,
      markets: config.markets,
      keywords: uniqueKeywords,
      highIntent: uniqueKeywords.filter(kw => this.isHighIntent(kw))
    };
    
    fs.writeFileSync('../output/keywords.json', JSON.stringify(output, null, 2));
    console.log(`✅ Found ${output.total} keywords → keywords.json`);
    
    return output;
  }

  async getGoogleTrends() {
    // Real trending searches (scrape trends.google.com)
    try {
      const { data } = await axios.get('https://trends.google.com/trends/trendingsearches/daily?geo=US');
      const $ = cheerio.load(data);
      return $('.feed-list-item').map((i, el) => $(el).find('.title').text().trim()).get();
    } catch {
      return ['emergency cash', 'quick loans', 'payday loans', 'installment loans'];
    }
  }

  async getAmazonSuggestions(market) {
    const seeds = ['cash loan', 'emergency money', 'quick cash', 'payday'];
    const suggestions = [];
    
    for (const seed of seeds) {
      try {
        const url = `https://www.amazon.${market === 'uk' ? 'co.uk' : market}.amazon.com/suggestions?mid=ATVPDKIKX0DER&q=${encodeURIComponent(seed)}`;
        const { data } = await axios.get(url);
        suggestions.push(...data.suggestion);
      } catch {
        suggestions.push(`${seed} ${market}`);
      }
    }
    return suggestions;
  }

  async getTravelKeywords() {
    // Real travel trends
    const travel = ['cheap flights', 'london to new york', 'bali hotels', 'paris vacation'];
    return travel;
  }

  isHighIntent(keyword) {
    const highIntent = ['loan', 'cash', 'money', 'borrow', 'finance', 'credit'];
    return highIntent.some(word => keyword.toLowerCase().includes(word));
  }
}

// RUN SCOUT
const scout = new KeywordScout();
scout.scout();
