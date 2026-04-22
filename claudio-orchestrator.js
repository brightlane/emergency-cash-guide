# Claudio's 20-Agent Empire Blueprint v1.6 (GLOBAL)
# HyperAgent Architecture - 4 Teams, 20 Specialized Agents

orchestrator:
  name: Claudio
  id: agent-0
  role: HYPERAGENT ORCHESTRATOR
  executionFlow:
    daily:
      - "Agent-1 scans keywords → Agent-2 classifies"
      - "Agent-3 architects → Agent-4 writes → Agent-5 optimizes"
      - "Agent-6 translates top 20% pages"
      - "Agent-7 fetches PAAPI → Agent-8 validates → Agent-9 builds"
      - "Agent-12 scans routes → Agent-14 builds destinations"
      - "Agent-16/17 validates → Agent-18 approves → Agent-19 deploys"
    realtime:
      - "Agent-10 monitors prices → triggers rebuilds"
      - "Agent-20 reads analytics → feeds Claudio"

teams:
  contentFactory:
    agents:
      - id: 1
        name: Keyword Scout
        input: global.config.yaml
        output: keywords.json
        sources: ["amazon", "skyscanner", "google-trends"]
      - id: 2
        name: Intent Classifier
        input: keywords.json
        output: intents.json
      - id: 3
        name: Content Architect
        input: intents.json
        output: outlines.json
      - id: 4
        name: Article Writer
        input: outlines.json
        output: articles-raw.json
      - id: 5
        name: SEO Optimizer
        input: articles-raw.json
        output: articles-optimized.json
      - id: 6
        name: Multilingual Translator
        input: articles-optimized.json
        output: articles-multilingual.json
        languages: ["en", "de", "fr", "es"]

  productEngine:
    agents:
      - id: 7
        name: PAAPI Fetcher
        input: global.config.yaml
        output: products-raw.json
        api: amazon-paapi
      - id: 8
        name: Product Validator
        input: products-raw.json
        output: products-valid.json
      - id: 9
        name: ASIN Page Builder
        input: products-valid.json
        output: product-pages.json
      - id: 10
        name: Price Monitor
        input: products-valid.json
        output: price-changes.json
        cron: "*/15 * * * *"
      - id: 11
        name: Product Ranker
        input: products-valid.json
        output: category-pages.json

  travelIntelligence:
    agents:
      - id: 12
        name: Route Scanner
        input: global.config.yaml
        output: routes.json
        api: skyscanner
      - id: 13
        name: Event Detector
        input: routes.json
        output: events.json
        sources: ["world-cup", "holidays", "trends"]
      - id: 14
        name: Destination Builder
        input: routes.json, events.json
        output: destinations.json
      - id: 15
        name: Travel Linker
        input: destinations.json, products-valid.json
        output: cross-links.json

  productionLine:
    agents:
      - id: 16
        name: HTML Validator
        input: "*.json"
        output: validation-report.json
      - id: 17
        name: Link Checker
        input: "*.html"
        output: link-report.json
      - id: 18
        name: Deploy Guard
        input: validation-report.json, link-report.json
        output: deploy-approval.json
      - id: 19
        name: Sitemap Generator
        input: deploy-approval.json
        output: sitemap.xml, robots.txt
      - id: 20
        name: Analytics Reader
        input: google-analytics
        output: performance.json

globalConfig: "global.config.yaml"
outputDir: "./output"
deployDir: "./public"
parallelTeams: 4
