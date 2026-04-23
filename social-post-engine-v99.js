#!/usr/bin/env node

/**
 * V99 SOCIAL MEDIA ENGINE
 * - Generates high-quality social posts
 * - Hooks into affiliate links
 * - Clusters messaging per platform
 * - Builds ready-to-post content packs
 * - Outputs JSON + HTML dashboard
 */

const fs = require("fs");
const path = require("path");

const OUTPUT = path.join(process.cwd(), "output");
const SOCIAL = path.join(OUTPUT, "social");

fs.mkdirSync(SOCIAL, { recursive: true });

// 🔗 AFFILIATE LINKS (YOUR REAL ONES)
const LINKS = {
  maxlend: "https://www.linkconnector.com/ta.php?lc=007949096598005765&atid=MaxlendeMergency",
  sanebox: "https://try.sanebox.com/efdrajzfvk2c"
};

// 🧠 CONTENT CORE (edit/expand anytime)
const TOPICS = [
  {
    brand: "MaxLend",
    angle: "emergency cash solutions",
    affiliate: LINKS.maxlend,
    tone: "urgent-helpful"
  },
  {
    brand: "SaneBox",
    angle: "email inbox overload fix",
    affiliate: LINKS.sanebox,
    tone: "productivity-educational"
  }
];

// 🔥 POST GENERATOR (V99 QUALITY ENGINE)
function generatePosts(item) {
  const link = item.affiliate;

  const base = {
    x: [
      `💡 Struggling with ${item.angle}? Here’s a simple solution many people overlook 👉 ${link}`,
      `⚡ Fast insight: ${item.angle} doesn’t have to be complicated. This helps simplify it 👉 ${link}`,
      `🚀 Real-world breakdown of ${item.angle} and how people are solving it faster 👉 ${link}`
    ],

    reddit: [
      `I put together a breakdown of ${item.angle} that might help someone: ${link}`,
      `Not financial advice, but this explains ${item.angle} in a simple way: ${link}`,
      `Sharing a resource on ${item.angle} that could be useful: ${link}`
    ],

    linkedin: [
      `Exploring modern approaches to ${item.angle}. Here's a structured breakdown: ${link}`,
      `Many professionals struggle with ${item.angle}. This approach simplifies it: ${link}`,
      `A practical look at improving ${item.angle} workflows: ${link}`
    ]
  };

  return base;
}

// 🔥 EXPORT PACK BUILDER
let outputPack = [];

TOPICS.forEach(topic => {
  const posts = generatePosts(topic);

  outputPack.push({
    brand: topic.brand,
    angle: topic.angle,
    posts
  });
});

// 🔥 SAVE JSON PACK
fs.writeFileSync(
  path.join(SOCIAL, "social-pack-v99.json"),
  JSON.stringify(outputPack, null, 2)
);

// 🔥 HTML DASHBOARD (READY COPY/PASTE PANEL)
const html = `
<!DOCTYPE html>
<html>
<head>
<title>Social Engine V99 Dashboard</title>
<style>
body { font-family: Arial; padding: 20px; }
.card { border: 1px solid #ddd; padding: 10px; margin-bottom: 20px; }
textarea { width: 100%; height: 80px; }
</style>
</head>
<body>

<h1>🚀 Social Media Engine V99</h1>

${outputPack.map(p => `
<div class="card">
  <h2>${p.brand}</h2>
  <p><b>Topic:</b> ${p.angle}</p>

  <h3>X (Twitter)</h3>
  ${p.posts.x.map(t => `<textarea>${t}</textarea>`).join("")}

  <h3>Reddit</h3>
  ${p.posts.reddit.map(t => `<textarea>${t}</textarea>`).join("")}

  <h3>LinkedIn</h3>
  ${p.posts.linkedin.map(t => `<textarea>${t}</textarea>`).join("")}

</div>
`).join("")}

</body>
</html>
`;

fs.writeFileSync(path.join(SOCIAL, "dashboard.html"), html);

console.log("✅ V99 SOCIAL ENGINE COMPLETE");
console.log("Posts generated:", outputPack.length);
