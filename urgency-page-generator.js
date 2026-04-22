#!/usr/bin/env node
// Agent-15: "Cash TODAY" urgency pages
const pages = ['cash-today', 'money-now', 'payday-instant'];
pages.forEach(slug => {
  const html = `<!DOCTYPE html>
<html><head><title>Get ${slug.replace('-',' ').toUpperCase()} - MaxLend</title></head>
<body>
<h1>Get ${slug.replace('-',' ').toUpperCase()}</h1>
<p>Need ${slug.replace('-',' ')}? MaxLend can deposit same day.</p>
<a href="https://www.linkconnector.com/ta.php?lc=007949096598005765&atid=MaxlendT">Get Cash Now</a>
</body></html>`;
  fs.writeFileSync(`../output/${slug}.html`, html);
});
console.log('✅ 3 urgency pages created');
