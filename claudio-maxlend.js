// claudio-maxlend.js – 20-Agent MaxLend Generator
const fs = require('fs');
const yaml = require('js-yaml');

console.log('🚀 MAXLEND EMPIRE ACTIVATED – emergency-cash-guide');

// Load blueprint
const blueprint = yaml.load(fs.readFileSync('blueprint.maxlend.yaml', 'utf8'));

// Keywords pool
const keywords = [...blueprint.keywords.emergency, ...blueprint.keywords.maxlend];

// Generate 150 pages
for(let i = 0; i < 150; i++) {
  const keyword = keywords[Math.floor(Math.random() * keywords.length)];
  const pageName = keyword.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-') + '.html';
  
  const page = `<!DOCTYPE html>
<html>
<head>
  <title>${keyword} | MaxLend Bad Credit OK</title>
  <meta name="description" content="Need ${keyword}? MaxLend approves FICO 520+. Same day funding.">
  <meta name="keywords" content="${keyword}, bad credit loans, emergency cash">
</head>
<body>
  <h1>${keyword} – Bad Credit OK</h1>
  <p>Got approved for ${keyword} with FICO 520. MaxLend funds same/next day.</p>
  <h2>Why MaxLend?</h2>
  <ul>
    <li>$100-$3750 loans</li>
    <li>No hard credit check</li>
    <li>Direct lender</li>
  </ul>
  <a href="${blueprint.product.affiliateLink}" style="background:red;color:white;padding:15px;font-size:24px;display:block;width:300px;margin:20px auto;text-align:center;text-decoration:none;" target="_blank">
    APPLY MAXLEND NOW → Funds Tomorrow
  </a>
  <p>Most approved within minutes. Rent due? Emergency? MaxLend works.</p>
</body>
</html>`;

  fs.writeFileSync(`pages/${pageName}`, page);
  console.log(`✅ ${i+1}/150: ${pageName}`);
}

// Sitemap
fs.writeFileSync('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + 
  fs.readdirSync('pages').map(f => `<url><loc>https://YOURUSERNAME.github.io/emergency-cash-guide/pages/${f}</loc></url>`).join('') + 
'</urlset>');

console.log('\n🎉 EMPIRE COMPLETE!');
console.log('📁 150 pages in /pages/');
console.log('🗺️  sitemap.xml ready');
console.log('🚀 git add . && git commit -m "MaxLend 150 pages" && git push');
console.log('💰 https://YOURUSERNAME.github.io/emergency-cash-guide/ → LIVE LEADS');
console.log('⏰ First leads: Tomorrow morning');
