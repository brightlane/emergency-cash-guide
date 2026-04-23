const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

const ROOT = __dirname;
const OUTPUT_DIR = path.join(ROOT, 'output');
const BLUEPRINT_PATH = path.join(OUTPUT_DIR, 'blueprint.full.yaml');
const LOCK_PATH = path.join(OUTPUT_DIR, '.claudio.lock');

function now() {
  return new Date().toISOString();
}

function log(step, msg) {
  console.log(`[${now()}] [${step}] ${msg}`);
}

function acquireLock() {
  if (fs.existsSync(LOCK_PATH)) {
    throw new Error('Lock file exists. Another Claudio batch is already running.');
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

function loadBlueprint() {
  if (!fs.existsSync(BLUEPRINT_PATH)) {
    throw new Error(`Missing blueprint file: ${BLUEPRINT_PATH}`);
  }
  return yaml.parse(fs.readFileSync(BLUEPRINT_PATH, 'utf8'));
}

function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function runStage(name, fn) {
  log(name, 'started');
  const result = fn();
  log(name, 'finished');
  return result;
}

function scanKeywords() {
  return runStage('Agent-1', () => [
    'emergency cash guide',
    'maxlend review',
    'loan alternatives',
    'responsible borrowing',
    'fast cash options'
  ]);
}

function classifyIntent(keywords) {
  return runStage('Agent-2', () =>
    keywords.map(k => ({
      keyword: k,
      stage: k.includes('review') || k.includes('alternatives') ? 'decision' : 'informational'
    }))
  );
}

function buildOutlines(items) {
  return runStage('Agent-3', () =>
    items.map(item => ({
      keyword: item.keyword,
      outline: `Outline for ${item.keyword}: intro, details, pros, cons, CTA`
    }))
  );
}

function writeArticles(outlines) {
  return runStage('Agent-4', () =>
    outlines.map(item => ({
      keyword: item.keyword,
      html: `<article><h1>${item.keyword}</h1><p>Generated content for ${item.keyword}.</p></article>`
    }))
  );
}

function optimizeSEO(pages) {
  return runStage('Agent-5', () =>
    pages.map(page => ({
      ...page,
      metaTitle: `${page.keyword} | Emergency Cash Guide`,
      metaDescription: `Helpful guide for ${page.keyword}.`,
      schema: true
    }))
  );
}

function translateTopPages(pages) {
  return runStage('Agent-6', () => {
    const count = Math.max(1, Math.ceil(pages.length * 0.2));
    return pages.slice(0, count).map(page => ({
      ...page,
      translations: ['de', 'es', 'fr']
    }));
  });
}

function validateHTML(pages) {
  return runStage('Agent-16', () => pages.every(p => typeof p.html === 'string' && p.html.length > 0));
}

function checkLinks() {
  return runStage('Agent-17', () => true);
}

function deployGuard() {
  return runStage('Agent-18', () => true);
}

function generateSitemap() {
  return runStage('Agent-19', () => true);
}

function readAnalytics() {
  return runStage('Agent-20', () => ({ traffic: 'pending' }));
}

function writeRunSummary(result) {
  const summary = {
    generatedAt: now(),
    pagesGenerated: result.optimized.length,
    translatedPages: result.translated.length
  };
  fs.writeFileSync(path.join(OUTPUT_DIR, 'run-summary.json'), JSON.stringify(summary, null, 2));
}

function main() {
  ensureOutputDir();
  acquireLock();

  try {
    const blueprint = loadBlueprint();
    log('Agent-0', blueprint?.claudioFlow ? 'Blueprint loaded' : 'Blueprint missing claudioFlow');

    const keywords = scanKeywords();
    const intents = classifyIntent(keywords);
    const outlines = buildOutlines(intents);
    const articles = writeArticles(outlines);
    const optimized = optimizeSEO(articles);
    const translated = translateTopPages(optimized);

    const htmlOk = validateHTML(optimized);
    const linksOk = checkLinks();
    const deployOk = deployGuard();
    const sitemapOk = generateSitemap();
    const analytics = readAnalytics();

    if (!htmlOk || !linksOk || !deployOk || !sitemapOk) {
      throw new Error('Validation failed.');
    }

    writeRunSummary({ optimized, translated });
    log('Agent-0', `Completed: ${optimized.length} pages, ${translated.length} translated sets`);
    log('Agent-0', `Analytics: ${JSON.stringify(analytics)}`);
  } finally {
    releaseLock();
  }
}

main();
