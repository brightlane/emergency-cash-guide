name: Claudio MaxLend Nonstop
on:
  schedule:
    - cron: '*/15 * * * *'
  workflow_dispatch:
jobs:
  blueprint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - name: Claudio Orchestrator
        run: node output/claudio-orchestrator.js
      - name: Task Runner  
        run: node output/task-runner.js
      - name: Sitemap
        run: node output/generate-sitemap.js
      - name: Deploy MaxLend Site
        uses: actions/upload-pages-artifact@v3
        with:
          path: output/site/
      - name: Pages Deploy
        uses: actions/deploy-pages@v4
