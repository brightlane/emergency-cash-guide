#!/usr/bin/env node
// Agent-19: Sitemap Generator
// Auto XML + hreflang for all pages

import fs from 'fs';

const files = fs.readdirSync('../output').filter(f => f.endsWith('.html'));
let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

files.forEach(file => {
  const loc = `https://brightlane.github.io/emergency-cash-guide/${file}`;
  xml += `
  <url>
    <loc>${loc}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
});

xml += '</urlset>';
fs.writeFileSync('../output/sitemap.xml', xml);
fs.writeFileSync('../public/sitemap.xml', xml);

const robots = `User-agent: *
Allow: /
Sitemap: https://brightlane.github.io/emergency-cash-guide/sitemap.xml`;
fs.writeFileSync('../public/robots.txt', robots);

console.log(`✅ Sitemap: ${files.length} URLs + robots.txt`);
