# Claudio Content Empire

This repository contains a scheduled content-generation pipeline built around a blueprint, an article queue, and a guarded batch orchestrator.

## What it does

- Loads the current blueprint.
- Processes queued article topics.
- Generates HTML articles into `output/articles/`.
- Validates output before deploy.
- Commits in batches on a schedule.

## Main files

- `claudio-orchestrator.js` — Batch-level controller.
- `claudio-article-factory.js` — Queue runner.
- `article-generator.js` — Writes one HTML article.
- `article-pipeline.js` — Processes queued items.
- `article-queue.json` — Pending topics.
- `package.json` — Scripts and dependencies.
- `.github/workflows/claudio-content-empire.yml` — Scheduled workflow.

## Requirements

- Node.js 20+
- npm
- `yaml` package installed

## Install

```bash
npm install
```

## Run

### Orchestrator

```bash
npm run orchestrate
```

### Pipeline

```bash
npm run pipeline
```

### Generate one article

```bash
npm run generate:article -- "maxlend review"
```

### Batch mode

```bash
npm run batch
```

## Queue format

`article-queue.json` should contain items like this:

```json
[
  { "keyword": "maxlend review", "status": "pending" }
]
```

## Output

Generated files are written to:

- `output/articles/`
- `output/run-summary.json`
- `output/article-pipeline-report.json`

## Scheduling

The GitHub Actions workflow runs on a schedule and uses concurrency controls plus skip flags to avoid duplicate runs.

## Notes

Keep the queue updated and avoid editing generated output by hand unless you intend to replace a batch.
