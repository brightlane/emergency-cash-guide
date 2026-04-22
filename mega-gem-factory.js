#!/usr/bin/env node
// Mega Gem Factory - 5,000 targeted pages
const fs = require('fs');
const path = require('path');

const gemFiles = fs.readdirSync('../output').filter(f => f.includes('scout-gems'));
let allGems = [];

gemFiles.forEach(file => {
  try {
    const data = JSON.parse(fs.readFileSync(`../output/${file}`));
    allGems = allGems.concat(data.gems || []);
  } catch {}
});

console.log(`🏭 Factory input: ${allGems.length} gems from ${gemFiles.length} scouts`);

// Generate 5k pages (top gems)
allGems.sort((a,b) => b.volume - a.volume);
const topGems = allGems.slice(0, 5000);

topGems.forEach((gem, i) => {
  const slug = gem.query.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const filename = `gem-${i.toString().padStart(4,'0')}-${slug}.html`;
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <title>${gem.query} - MaxLend Fast Approval</title>
  <meta name="description" content="Get ${gem.query} same day with MaxLend. Instant approval, direct deposit.">
  <meta name="keywords" content="${gem.query}, emergency cash, MaxLend, payday loan">
</head>
<body style="font-family:Arial;padding:20px;max-width:800px;margin:auto;">
  <h1>${gem.query}</h1>
  <div style="background:#f0f8ff;padding:20px;border-radius:10px;">
    <h2>MaxLend ${gem.query}</h2>
    <ul>
      <li>Amount: $300-$2,500</li>
      <li>Approval: Same day</li> 
      <li>No hard credit check</li>
      <li>Direct bank deposit</li>
    </ul>
    <a href="https://www.linkconnector.com/ta.php?lc=007949096598005765&atid=MaxlendT" 
       style="background:#ff6b35;color:white;padding:15px 30px;text-decoration:none;font-size:20px;border-radius:5px;display:inline-block;" 
       rel="sponsored">Apply Now - ${gem.query}</a>
  </div>
  <p style="margin-top:30px;"><a href="index.html">More emergency cash options</a></p>
</body>
</html>`;

  fs.writeFileSync(`../output/${filename}`, html);
});

console.log(`✅ FACTORY: Generated ${topGems.length} targeted pages (gem-0000-payday-atlantic-city.html)`);
