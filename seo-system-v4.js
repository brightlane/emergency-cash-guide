#!/usr/bin/env node

/**
 * V4 ALL-IN-ONE SEO SYSTEM
 * - Generates articles
 * - Injects affiliate links
 * - Builds internal linking
 * - Creates sitemap.xml
 * - Generates social posts
 * - Builds dashboard.html
 */

const fs = require("fs");
const path = require("path");

const BASE_URL = "https://brightlane.github.io/Sanebox.com";
const OUTPUT = path.join(process.cwd(), "output");
const ARTICLES = path.join(OUTPUT, "articles");
const SOCIAL = path.join(OUTPUT, "social");

// 🔗 AFFILIATE LINKS (KEEP YOURS HERE)
const AFFILIATE_LINKS = {
  maxlend: "https://www.linkconnector.com/ta.php?lc=007949096598005765&atid=MaxlendeMergency",
  sanebox: "https://try.sanebox.com/efdrajzfvk2c"
};

// SEO TOPICS (edit freely)
const TOPICS = [
  {
    topic: "emergency cash loans",
    affiliate: "maxlend",
    keywords: ["fast loan approval", "emergency money", "instant cash advance"]
  },
  {
    topic: "email overload management",
    affiliate: "sanebox",
    keywords: ["inbox cleanup", "email filtering", "zero inbox system"]
  }
];

// INIT FOLDERS
fs.mkdirSync(ARTICLES, { recursive: true });
fs.mkdirSync(SOCIAL, { recursive: true });

let sitemapUrls = [`${BASE_URL}/`];

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, "-");
}

// 🔥 ARTICLE GENERATOR
function buildArticle(item, i) {
  const slug = `${slugify(item.topic)}-${i}.html`;
  const filePath = path.join(ARTICLES, slug);
  const url = `${BASE_URL}/output/articles/${slug}`;

  const affiliate = AFFILIATE_LINKS[item.affiliate];

  const internalLinks = TOPICS
    .filter(t => t.topic !== item.topic)
    .map(t => `<a href="${BASE_URL}/output/articles/${slugify(t.topic)}-0.html">${t.topic}</a>`)
    .join(" | ");

  const html = `
<!DOCTYPE html>
<html>
<head>
<title>${item.topic} Guide</title>
<meta name="description" content="Complete guide on ${item.topic}">
</head>

<body>

<h1>${item.topic.toUpperCase()}</h1>

<p>This guide explains everything about ${item.topic}, including strategies, tips, and insights.</p>

<h2>Key Insights</h2>
<ul>
${item.keywords.map(k => `<li>${k}</li>`).join("\n")}
</ul>

<h2>Practical Tips</h2>
<ul>
<li>Compare options carefully</li>
<li>Understand terms before committing</li>
<li>Look for fast approval systems</li>
</ul>

<h2>Recommended Solution</h2>
<p>
<a href="${affiliate}" target="_blank">Click here to explore solution</a>
</p>

<h2>Internal Resources</h2>
<p>${internalLinks}</p>

</body>
</html>
`;

  fs.writeFileSync(filePath, html);

  sitemapUrls.push(url);

  return { slug, url };
}

// 🔥 SOCIAL GENERATOR
function buildSocial(topic, url) {
  return {
    twitter: `💡 ${topic} explained simply → ${url}`,
    reddit: `Breakdown of ${topic} with real insights here: ${url}`,
    linkedin: `Exploring ${topic} and modern solutions: ${url}`
  };
}

let results = [];

// 🔥 BUILD ALL CONTENT
TOPICS.forEach((item, i) => {
  const article = buildArticle(item, i);
  const social = buildSocial(item.topic, article.url);
  results.push({ ...article, social });
});

// 🔥 SITEMAP
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(u => `<url><loc>${u}</loc></url>`).join("\n")}
</urlset>`;

fs.writeFileSync(path.join(OUTPUT, "sitemap.xml"), sitemap);

// 🔥 DASHBOARD
const dashboard = `
<!DOCTYPE html>
<html>
<head><title>SEO Dashboard</title></head>
<body>

<h1>SEO SYSTEM DASHBOARD</h1>

${results.map(r => `
<h3>${r.slug}</h3>
<p><a href="${r.url}">${r.url}</a></p>
<pre>${JSON.stringify(r.social, null, 2)}</pre>
<hr/>
`).join("\n")}

</body>
</html>
`;

fs.writeFileSync(path.join(OUTPUT, "dashboard.html"), dashboard);

console.log("✅ V4 SEO SYSTEM COMPLETE");
console.log("Articles created:", results.length);
