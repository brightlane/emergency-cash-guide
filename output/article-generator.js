const fs = require('fs');
const path = require('path');

const SITE_DIR = path.join(process.cwd(), 'output', 'site');

function generateArticle(page) {
  const now = new Date().toISOString();
  const title = page.replace('.html', '').replace(/-/
