const fs = require('fs');
const path = require('path');
const { writeArticle } = require('./article-generator');

const ROOT = __dirname;
const OUTPUT_DIR = path.join(ROOT, 'output');
const QUEUE_PATH = path.join(OUTPUT_DIR, 'article-queue.json');
const LOCK_PATH = path.join(OUTPUT_DIR, '.article-pipeline.lock');
const REPORT_PATH = path.join(OUTPUT_DIR, 'article-pipeline-report.json');

function now() {
  return new Date().toISOString();
}

function log(step, msg) {
  console.log(`[${now()}] [${step}] ${msg}`);
}

function ensureOutput() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function acquireLock() {
  if (fs.existsSync(LOCK_PATH)) {
    throw new Error('Pipeline lock exists. Another run is already active.');
  }
  fs.writeFileSync(LOCK_PATH, JSON.stringify({ pid: process.pid, startedAt: now() }, null, 2));
  process.on('exit', releaseLock);
  process.on('SIGINT', () => { releaseLock(); process.exit(1); });
  process.on('SIGTERM', () => { releaseLock(); process.exit(1); });
}

function releaseLock() {
  try {
    if (fs.existsSync(LOCK_PATH)) fs.unlinkSync(LOCK_PATH);
  } catch {}
}

function loadQueue() {
  if (!fs.existsSync(QUEUE_PATH)) {
    throw new Error(`Missing queue file: ${QUEUE_PATH}`);
  }
  return JSON.parse(fs.readFileSync(QUEUE_PATH, 'utf8'));
}

function saveQueue(queue) {
  fs.writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2));
}

function processOne(item) {
  log('Agent-4', `Generating article for "${item.keyword}"`);
  const file = writeArticle({ keyword: item.keyword });
  return { ...item, status: 'done', generatedAt: now(), output: file };
}

function writeReport(result) {
  fs.writeFileSync(
    REPORT_PATH,
    JSON.stringify(
      {
        generatedAt: now(),
        processed: result.processed,
        remaining: result.remaining,
        files: result.files
      },
      null,
      2
    )
  );
}

function main() {
  ensureOutput();
  acquireLock();

  try {
    const queue = loadQueue();
    const files = [];
    let processed = 0;

    for (let i = 0; i < queue.length; i++) {
      const item = queue[i];
      if (item.status !== 'pending') continue;
      const updated = processOne(item);
      queue[i] = updated;
      processed += 1;
      files.push(updated.output);
    }

    saveQueue(queue);
    const remaining = queue.filter(x => x.status === 'pending').length;
    writeReport({ processed, remaining, files });

    log('Agent-0', `Processed ${processed} item(s), ${remaining} remaining`);
  } finally {
    releaseLock();
  }
}

main();
