#!/bin/bash
# deploy-quality-legion.sh - Full deployment

echo "🚀 DEPLOYING 10-AI QUALITY LEGION..."

# 1. Generate auditors
chmod +x generate-auditors.sh
./generate-auditors.sh

# 2. Save commander
# [quality-legion-commander.js already saved]

# 3. Blueprint update snippet
cat >> blueprint.full.yaml << 'EOF'

  - id: 49
    name: Grammar Auditor
  - id: 50
    name: Readability Auditor
  - id: 51
    name: E-E-A-T Auditor
  - id: 52
    name: Mobile Auditor
  - id: 53
    name: Keyword Auditor
  - id: 54
    name: Internal Link Auditor
  - id: 55
    name: CTA Auditor
  - id: 56
    name: Trust Auditor
  - id: 57
    name: Duplicate Auditor
  - id: 58
    name: Final QC Auditor
EOF

echo "✅ Blueprint updated (add 'qualityLegion' team)"

# 4. Test run
echo "🧪 TESTING LEGION..."
node agents/quality-legion-commander.js

# 5. Verify
echo "📊 VERIFICATION:"
ls agents/auditor-*.js | wc -l
cat output/quality-legion-report.json | grep -E "(auditors|pages)"

echo "🎉 QUALITY LEGION FULLY DEPLOYED - Ready for claudio-orchestrator.js"
