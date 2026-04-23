const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUTPUT_DIR = path.join(ROOT, 'output');
const ARTICLES_DIR = path.join(OUTPUT_DIR, 'articles');
const LOCK_PATH = path.join(OUTPUT_DIR, '.claudio.lock');
const META_PATH = path.join(OUTPUT_DIR, 'meta.json');
const SITEMAP_PATH = path.join(OUTPUT_DIR, 'sitemap.xml');

const generators = [
  require('./generators/blog'),
  require('./generators/video'),
  require('./generators/seo'),
  require('./generators/social')
];

function now() {
  return new Date().toISOString();
}

function log(msg) {
  console.log(`[${now()}] ${msg}`);
}

function ensureDirs() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(ARTICLES_DIR, { recursive: true });
}

/**
 * SAFE LOCK
 */
function acquireLock() {
  try {
    fs.writeFileSync(
      LOCK_PATH,
      JSON.stringify({ pid: process.pid, startedAt: now() }, null, 2),
      { flag: 'wx' }
    );
  } catch {
    throw new Error('Claudio Pro Engine already running');
  }

  process.on('exit', releaseLock);
  process.on('SIGINT', () => { releaseLock(); process.exit(1); });
  process.on('SIGTERM', () => { releaseLock(); process.exit(1); });
}

function releaseLock() {
  try {
    if (fs.existsSync(LOCK_PATH)) fs.unlinkSync(LOCK_PATH);
  } catch {}
}

/**
 * RETRY WRAPPER (important upgrade)
 */
async function runWithRetry(fn, input, retries = 2) {
  let lastErr;

  for (let i = 0; i <= retries; i++) {
    try {
      return await fn(input);
    } catch (err) {
      lastErr = err;
      log(`Retry ${i + 1} failed: ${err.message}`);
    }
  }

  throw lastErr;
}

/**
 * RUN ALL GENERATORS
 */
async function runGenerators() {
  const results = [];

  for (let i = 0; i < generators.length; i++) {
    const gen = generators[i];

    try {
      const result = await runWithRetry(
        gen,
        { outputDir: ARTICLES_DIR },
        2
      );

      results.push({ status: 'ok', result });
      log(`Generator ${i + 1} OK`);
    } catch (err) {
      results.push({ status: 'fail', error: err.message });
      log(`Generator ${i + 1} FAILED permanently: ${err.message}`);
    }
  }

  return results;
}

/**
 * SAVE METADATA (NEW)
 */
function saveMeta(results) {
  const meta = {
    generatedAt: now(),
    total: results.length,
    success: results.filter(r => r.status === 'ok').length
  };

  fs.writeFileSync(META_PATH, JSON.stringify(meta, null, 2));
}

/**
 * SIMPLE SITEMAP (NEW)
 */
function generateSitemap() {
  const files = fs.readdirSync(ARTICLES_DIR);

  const urls = files.map(f => {
    return `<url><loc>/articles/${f}</loc></url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset>
${urls}
</urlset>`;

  fs.writeFileSync(SITEMAP_PATH, xml);
}

/**
 * MAIN
 */
async function main() {
  ensureDirs();
  acquireLock();

  try {
    log('🚀 Claudio Pro Engine starting...');

    const results = await runGenerators();

    saveMeta(results);
    generateSitemap();

    const ok = results.filter(r => r.status === 'ok').length;

    log(`🏁 DONE — ${ok}/${results.length} generators succeeded`);
  } catch (err) {
    log(`FATAL: ${err.message}`);
  } finally {
    releaseLock();
  }
}

main();
