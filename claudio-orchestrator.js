# Claudio's Global Config v1.6
# Powers 20-Agent Empire across 7 markets

markets:
  - us
  - uk
  - de
  - fr
  - es
  - ca
  - au

languages:
  us: en
  uk: en
  de: de
  fr: fr
  es: es
  ca: en
  au: en

currencies:
  us: USD
  uk: GBP
  de: EUR
  fr: EUR
  es: EUR
  ca: CAD
  au: AUD

# Affiliate Networks
affiliates:
  amazon:
    enabled: true
    markets: ["us", "uk", "de", "fr", "es", "ca", "au"]
    paapiKeys:
      us: "YOUR_US_PAAPI_ACCESS_KEY"
      uk: "YOUR_UK_PAAPI_ACCESS_KEY"
      de: "YOUR_DE_PAAPI_ACCESS_KEY"
  linkconnector:
    enabled: true
    trackingId: "007949096598005765"
  skyscanner:
    enabled: true
    apiKey: "YOUR_SKYSCANNER_KEY"

# Keyword Sources
keywordSources:
  - google-trends
  - amazon-suggestions
  - skyscanner-routes
  - semrush
  - ahrefs

# Travel Focus
travel:
  modes: ["flights", "hotels", "car-hire"]
  popularRoutes:
    - "London-NewYork"
    - "Berlin-Bali" 
    - "Paris-Tokyo"
    - "Madrid-Miami"
  events:
    - world-cup
    - olympics
    - holidays
    - festivals

# Site Config (Brightlane)
site:
  baseUrl: "https://brightlane.github.io/emergency-cash-guide/"
  deployPath: "./public"
  outputPath: "./output"
  langs: ["en", "de", "fr", "es"]

# Production Limits
scaling:
  parallelAgents: 4
  maxPagesPerRun: 200
  topContentPercent: 0.2  # Translates top 20%

# Claudio's Strategy Rules
strategy:
  contentVelocity: "high"  # pages/day target
  rebuildTrigger: "price_change > 5%" 
  deployThreshold: 95  # % validation pass required
