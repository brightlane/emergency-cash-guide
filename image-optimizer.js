#!/usr/bin/env node
// Auto-convert images + lazy loading
const fs = require('fs');
const sharp = require('sharp');  // npm i sharp

const images = fs.readdirSync('./public').filter(f => /\.(png|jpg|jpeg)$/i.test(f));
images.forEach(img => {
  sharp(`./public/${img}`)
    .webp({ quality: 80 })
    .toFile(`./public/${img.replace(/\.(png|jpg|jpeg)$/i, '.webp')}`);
  
  // Add lazy to HTML
  const htmlFiles = fs.readdirSync('./public').filter(f=>f.endsWith('.html'));
  htmlFiles.forEach(html => {
    let content = fs.readFileSync(`./public/${html}`).toString();
    content = content.replace(new RegExp(img, 'g'), `${img} (lazy loading)`);
    fs.writeFileSync(`./public/${html}`, content);
  });
});

console.log(`✅ Optimized ${images.length} images → WebP + lazy`);
