const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUTPUT_DIR = path.join(ROOT, 'output');
const LOCK_PATH = path.join(OUTPUT_DIR, '.claudio.lock');

const ARTICLES_DIR = path.join(OUTPUT_DIR, 'articles');

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
 * SAFE LOCK (prevents double runs)
 */
function acquireLock() {
  try {
    fs.writeFileSync(LOCK_PATH, JSON.stringify({
      pid: process.pid,
      startedAt: now()
    }), { flag: 'wx' });
  } catch {
    throw new Error('Claude engine already running');
  }

  process.on('exit', releaseLock);
  process.on('SIGINT', () => { releaseLock(); process.exit(); });
  process.on('SIGTERM', () => { releaseLock(); process.exit(); });
}

function releaseLock() {
  try {
    if (fs.existsSync(LOCK_PATH)) fs.unlinkSync(LOCK_PATH);
  } catch {}
}

/**
 * RUN ALL GENERATORS IN PARALLEL
 */
async function runGenerators() {
  const jobs = generators.map(fn => fn({ outputDir: ARTICLES_DIR }));

  const results = await Promise.allSettled(jobs);

  let success = 0;

  results.forEach((r, i) => {
    if (r.status === 'fulfilled') {
      success++;
      log(`Generator ${i + 1} OK`);
    } else {
      log(`Generator ${i + 1} FAILED: ${r.reason}`);
    }
  });

  return success;
}

async function main() {
  ensureDirs();
  acquireLock();

  try {
    const count = await runGenerators();
    log(`Done — ${count} generators completed`);
  } finally {
    releaseLock();
  }
}

main();
