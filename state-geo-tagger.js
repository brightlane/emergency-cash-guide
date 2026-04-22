#!/usr/bin/env node
// Agent-61: Geo-Target Meta Tags
const states = ['nj','nv','ca','fl','tx','ny','il','pa','mi','oh'];
const files = fs.readdirSync('./output').filter(f=>f.endsWith('.html'));

files.forEach(file => {
  let content = fs.readFileSync(`./output/${file}`).toString();
  states.forEach(state => {
    content = content.replace('</head>', `<meta name="geo.region" content="${state.toUpperCase()}"></head>`);
  });
  fs.writeFileSync(`./output/${file}`, content);
});
console.log('✅ Geo-meta added to all pages');
