#!/usr/bin/env node
// Claudio v1.6 - 20-Agent HyperAgent Orchestrator (GLOBAL)
// Commands 4 parallel teams across 7 markets

import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class Claudio {
  constructor() {
    this.blueprint = yaml.load(fs.readFileSync('./blueprint.full.yaml', 'utf8'));
    this.config = yaml.load(fs.readFileSync('./global.config.yaml', 'utf8'));
    this.outputDir = './output';
    this.deployDir = './public';
    this.ensureDirs();
    console.log('👑 CLAUDIO v1.6 LOADED');
  }

  ensureDirs() {
    ['output', 'public', 'agents'].forEach(dir => {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    });
  }

  async runAgent(agentId) {
    const agent = this.findAgent(agentId);
    console.log(`🟢 Agent-${agent.id}: ${agent.name}`);
    
    // MOCK OUTPUT (Step 4+ will be real APIs)
    const outputFile = path.join(this.outputDir, agent.output);
    fs.writeFileSync(outputFile, JSON.stringify({
      agent: agent.name,
      markets: this.config.markets,
      timestamp: new Date().toISOString(),
      count: agentId < 10 ? 50 : 30,
      status: 'success'
    }, null, 2));
    
    return outputFile;
  }

  findAgent(id) {
    for (const team of Object.values(this.blueprint.teams)) {
      const agent = team.agents.find(a => a.id == id);
      if (agent) return agent;
    }
  }

  async runTeam(teamName) {
    const team = this.blueprint.teams[teamName];
    console.log(`🏭 Running Team: ${teamName}`);
    
    const promises = team.agents.map(agent => this.runAgent(agent.id));
    await Promise.all(promises);
  }

  async fullEmpire() {
    console.log('👑 CLAUDIO FULL EMPIRE RUN');
    console.log('=======================');
    
    // Phase 1: Content leads
    await this.runTeam('contentFactory');
    
    // Phase 2: Product + Travel parallel
    await Promise.all([
      this.runTeam('productEngine'),
      this.runTeam('travelIntelligence')
    ]);
    
    // Phase 3: Production validates/deploys
    await this.runTeam('productionLine');
    
    console.log('✅ ALL 20 AGENTS COMPLETE');
    await this.deploy();
  }

  async deploy() {
    console.log('🚀 DEPLOYING TO BRIGHTLANE GITHUB PAGES');
    
    // Copy everything to public
    fs.cpSync(this.outputDir, this.deployDir, { recursive: true });
    
    // Real sitemap from blueprint
    this.generateSitemap();
    
    console.log(`✅ Deployed to: ${this.config.site.baseUrl}`);
    console.log(`📊 Pages generated: ${Object.keys(fs.readdirSync(this.deployDir)).length}`);
  }

  generateSitemap() {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    
    // Add core pages + agent outputs
    const corePages = ['index.html', 'sitemap.xml'];
    corePages.forEach(page => {
      xml += `<url><loc>${this.config.site.baseUrl}${page}</loc></url>`;
    });
    
    // Add agent JSON as discoverable (SEO bonus)
    const agentFiles = fs.readdirSync(this.outputDir).filter(f => f.endsWith('.json'));
    agentFiles.slice(0, 50).forEach(file => {
      xml += `<url><loc>${this.config.site.baseUrl}output/${file}</loc></url>`;
    });
    
    xml += '</urlset>';
    fs.writeFileSync(path.join(this.deployDir, 'sitemap.xml'), xml);
    
    // robots.txt
    const robots = `User-agent: *
Allow: /
Sitemap: ${this.config.site.baseUrl}sitemap.xml`;
    fs.writeFileSync(path.join(this.deployDir, 'robots.txt'), robots);
  }

  async run(mode = 'full-empire') {
    try {
      if (mode === 'full-empire') {
        await this.fullEmpire();
      } else if (mode === 'test') {
        await this.runAgent(1);
        console.log('✅ Test mode complete');
      }
    } catch (error) {
      console.error('❌ Empire error:', error.message);
    }
  }
}

// 🔥 RUN CLAUDIO
const args = process.argv.slice(2);
const mode = args[0] || 'full-empire';

const claudio = new Claudio();
await claudio.run(mode);
