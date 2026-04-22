from pathlib import Path

out = Path("output")
out.mkdir(exist_ok=True)

text = """claudioFlow:
  agent-0:
    name: Claudio
    role: HYPERAGENT ORCHESTRATOR
    command: full-empire
    scope: usa-site
    outputs:
      - blueprint.full.yaml
      - robots.txt
      - sitemap.xml
      - index.html
      - maxlend-review.html
      - maxlend-eligibility.html
      - maxlend-vs-alternatives.html
      - responsible-borrowing.html
      - faq.html
      - privacy.html
      - terms.html
      - contact.html

  teams:
    contentFactory:
      agents:
        - agent-1: keyword-scout
        - agent-2: intent-classifier
        - agent-3: content-architect
        - agent-4: article-writer
        - agent-5: seo-optimizer
        - agent-6: multilingual-translator
    productEngine:
      agents:
        - agent-7: paapi-fetcher
        - agent-8: product-validator
        - agent-9: asin-page-builder
        - agent-10: price-monitor
        - agent-11: product-ranker
    travelIntelligence:
      agents:
        - agent-12: route-scanner
        - agent-13: event-detector
        - agent-14: destination-builder
        - agent-15: travel-linker
    productionLine:
      agents:
        - agent-16: html-validator
        - agent-17: link-checker
        - agent-18: deploy-guard
        - agent-19: sitemap-generator
        - agent-20: analytics-reader

  executionFlow:
    - daily: agent-1 scans keywords -> agent-2 classifies
    - agent-3 architects -> agent-4/9 writes -> agent-5 optimizes
    - agent-6 translates only when locale expansion is approved
    - agent-16/17 validates -> agent-18 approves -> agent-19 deploys
    - agent-20 reports -> Claudio rewrites strategyRules

  strategyRules:
    - prioritize_us_compliance
    - keep_disclosures_prominent
    - avoid_guaranteed_approval_language
    - publish_canonical_pages_only
    - generate_sitemap_from_live_html
    - add_hreflang_only_for_real_locales

  usaSiteBlueprint:
    pages:
      - index.html
      - maxlend-review.html
      - maxlend-eligibility.html
      - maxlend-vs-alternatives.html
      - responsible-borrowing.html
      - faq.html
      - privacy.html
      - terms.html
      - contact.html
    seoAssets:
      - robots.txt
      - sitemap.xml
    notes:
      - single_country_first
      - multilingual_later_if_needed
      - finance_content_requires_strict_accuracy
"""

(out / "blueprint.full.yaml").write_text(text, encoding="utf-8")
print("saved", out / "blueprint.full.yaml")
