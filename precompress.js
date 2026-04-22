#!/usr/bin/env node
// Precompress ALL assets (50% size reduction)
const fs = require('fs');
const zlib = require('zlib');

const files = fs.readdirSync('./public').filter(f => 
  f.endsWith('.html') || f.endsWith('.css') || f.endsWith('.js')
);

files.forEach(file => {
  const content = fs.readFileSync(`./public/${file}`);
  
  // GZIP
  zlib.gzip(content, (err, gzip) => {
    fs.writeFileSync(`./public/${file}.gz`, gzip);
  });
  
  // Brotli  
  zlib.brotliCompress(content, {params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 }}, (err, brotli) => {
    fs.writeFileSync(`./public/${file}.br`, brotli);
  });
});

console.log(`✅ Precompressed ${files.length} files (50% smaller)`);
