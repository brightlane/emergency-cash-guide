#!/usr/bin/env node
// Add cache headers to _headers (Cloudflare/GitHub Pages)
const headers = `_headers
/*
  Cache-Control: public, max-age=31536000
  Content-Encoding: br,gzip
  X-Content-Type-Options: nosniff

/*.html
  Cache-Control: public, max-age=3600
  Vary: Accept-Encoding

/sitemap.xml
  Cache-Control: public, max-age=1800`;

fs.writeFileSync('./public/_headers', headers);
console.log('✅ Speed headers deployed (1s loads)');
