#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(process.cwd(), "public");
const BASE_URL = "https://brightlane.github.io/Sanebox.com";

// Your affiliate link (MaxLend)
const AFFILIATE_LINK =
  "https://www.linkconnector.com/ta.php?lc=007949096598005765&atid=MaxlendeMergency";

// SEO topics (you can expand this later safely)
const TOPICS = [
  "emergency cash loans explained",
  "how installment loans work",
  "fast personal loans online",
  "alternatives to payday loans",
  "how to handle financial emergencies",
  "credit rebuilding strategies",
  "borrowing money safely online",
  "unexpected expense solutions"
];

// Ensure output folder exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Generate SEO blog page
function generatePage(topic, index) {
  const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return `<!DOCTYPE html>
<html>
<head>
  <title>${topic} | Financial Guide</title>
  <meta name="description" content="In-depth guide about ${topic} and how emergency financial solutions work.">
</head>

<body>

<h1>${topic}</h1>

<p>This article explains <strong>${topic}</strong> in a clear and practical way so readers can understand how short-term financial solutions work and when they may be useful.</p>

<h2>Understanding the Basics</h2>

<p>Financial emergencies can happen unexpectedly. Whether it is medical expenses, car repairs, or urgent bills, many people look for fast funding solutions to bridge short-term gaps.</p>

<p>Installment-based lending options allow borrowers to repay over time instead of a single lump sum, making repayment more manageable.</p>

<h2>Why People Search for This</h2>

<ul>
  <li>Unexpected expenses</li>
  <li>Short-term cash flow gaps</li>
  <li>Limited savings availability</li>
  <li>Urgent financial needs</li>
</ul>

<h2>Important Considerations</h2>

<p>Before borrowing, it is important to understand repayment terms, total cost, and monthly budget impact. Responsible borrowing ensures financial stability rather than stress.</p>

<h2>Recommended Option</h2>

<p>If you are exploring emergency loan options, you can review this provider below:</p>

<p>
<a href="${AFFILIATE_LINK}">
👉 Apply for Emergency Loan Option
</a>
</p>

<h2>Final Thoughts</h2>

<p>Understanding ${topic} helps you make better financial decisions. Always evaluate your needs carefully before committing to any loan product.</p>

</body>
</html>`;
}

// Generate sitemap
function generateSitemap(pages) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  pages.forEach((p) => {
    xml += `<url><loc>${BASE_URL}/${p}</loc></url>\n`;
  });

  xml += `</urlset>`;
  return xml;
}

// Build pages
const pages = [];

TOPICS.forEach((topic, i) => {
  const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const filename = `post-${i + 1}-${slug}.html`;

  const html = generatePage(topic, i);

  fs.writeFileSync(path.join(OUTPUT_DIR, filename), html);
  pages.push(filename);

  console.log("Generated:", filename);
});

// Write sitemap
const sitemap = generateSitemap(pages);
fs.writeFileSync(path.join(OUTPUT_DIR, "sitemap.xml"), sitemap);

console.log("\n✅ SEO system build complete!");
console.log("Pages generated:", pages.length);
