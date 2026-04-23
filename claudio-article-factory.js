const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUTPUT_DIR = path.join(ROOT, 'output');
const QUEUE_PATH = path.join(OUTPUT_DIR, 'article-queue.json');
const LOCK_PATH = path.join(OUTPUT_DIR, '.article-factory.lock');
const ARTICLES_DIR = path.join(OUTPUT_DIR, 'articles');

function now() {
  return new Date().toISOString();
}

function log(step, msg) {
  console.log(`[${now()}] [${step}] ${msg}`);
}

function ensureDirs() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  if (!fs.existsSync(ARTICLES_DIR)) fs.mkdirSync(ARTICLES_DIR, { recursive: true });
}

function acquireLock() {
  if (fs.existsSync(LOCK_PATH)) {
    throw new Error('Article factory lock exists. Another run is active.');
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
    const seed = [
      { keyword: 'maxlend review', status: 'pending' },
      { keyword: 'maxlend eligibility', status: 'pending' },
      { keyword: 'maxlend alternatives', status: 'pending' },
      { keyword: 'responsible borrowing', status: 'pending' },
      { keyword: 'emergency cash faq', status: 'pending' }
    ];
    fs.writeFileSync(QUEUE_PATH, JSON.stringify(seed, null, 2));
    return seed;
  }
  return JSON.parse(fs.readFileSync(QUEUE_PATH, 'utf8'));
}

function saveQueue(queue) {
  fs.writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2));
}

function generateArticle(item) {
  const slug = item.keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const file = path.join(ARTICLES_DIR, `${slug}.html`);
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${item.keyword} | Emergency Cash Guide</title>
  <meta name="description" content="Auto-generated article for ${item.keyword}.">
  //brightlane.github.io/emergency-cash-guide/articles/${slug}.html">
</head>
<body>
  <main>
    <h1>${item.keyword}</h1>
    <p>Generated content for ${item.keyword}.</p>
  </main>
</body>
</html>`;
  fs.writeFileSync(file, html, 'utf8');
  return file;
}

function processQueue(queue) {
  const updated = [];
  const generated = [];
  for (const item of queue) {
    if (item.status !== 'pending') {
      updated.push(item);
      continue;
    }
    log('Agent-4', `Writing ${item.keyword}`);
    const output = generateArticle(item);
    generated.push(output);
    updated.push({ ...item, status: 'done', generatedAt: now(), output });
  }
  return { updated, generated };
}

function writeBatchReport(generated) {
  const report = {
    generatedAt: now(),
    generatedCount: generated.length,
    files: generated
  };
  fs.writeFileSync(path.join(OUTPUT_DIR, 'article-factory-report.json'), JSON.stringify(report, null, 2));
}

function main() {
  ensureDirs();
  acquireLock();

  try {
    const queue = loadQueue();
    const { updated, generated } = processQueue(queue);
    saveQueue(updated);
    writeBatchReport(generated);
    log('Agent-0', `Generated ${generated.length} article(s)`);
  } finally {
    releaseLock();
  }
}

main();
