#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const yaml = require("yaml");

const OUTPUT_DIR = path.join(process.cwd(), "output");
const BLUEPRINT_PATH = path.join(process.cwd(), "blueprint.yml");

// Ensure output folder exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Load blueprint (content instructions)
function loadBlueprint() {
  if (!fs.existsSync(BLUEPRINT_PATH)) {
    console.log("No blueprint.yml found — using default content set.");
    return null;
  }
  const file = fs.readFileSync(BLUEPRINT_PATH, "utf8");
  return yaml.parse(file);
}

// Affiliate links (replace with yours if needed)
const LINKS = {
  maxlend: "https://example.com/maxlend-affiliate",
  roundtree: "https://example.com/roundtree-repair-affiliate"
};

// High-quality article generator
function generateArticle({ brand, topic, keywords }) {
  const affiliate = LINKS[brand] || "#";

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${topic} | Expert Guide</title>
  <meta name="description" content="${topic} guide with expert insights and tips">
</head>
<body>

<h1>${topic}</h1>

<p>
This comprehensive guide explores ${topic} with actionable insights, practical tips, and real-world strategies.
</p>

<h2>Why This Matters</h2>
<p>
Understanding ${topic} can significantly improve your decision-making and outcomes. Many people overlook key details that can make a major difference.
</p>

<h2>Key Insights</h2>
<ul>
  <li>Important factor one related to ${keywords[0]}</li>
  <li>Strategic advantage involving ${keywords[1]}</li>
  <li>Common mistake to avoid in ${topic}</li>
</ul>

<h2>Practical Tips</h2>
<p>
Start by focusing on clarity and consistency. Whether you're evaluating options or taking action, structure matters.
</p>

<h2>Recommended Resource</h2>
<p>
For more information and tools related to this topic, visit:
<br>
<a href="${affiliate}" target="_blank">Learn more here</a>
</p>

<h2>Final Thoughts</h2>
<p>
${topic} requires both understanding and execution. With the right approach, better outcomes are achievable.
</p>

</body>
</html>`;
}

// Generate multiple articles
function build() {
  const blueprint = loadBlueprint();

  const jobs = blueprint?.articles || [
    {
      brand: "maxlend",
      topic: "Smart Lending Strategies for Financial Flexibility",
      keywords: ["loans", "credit", "borrowing"]
    },
    {
      brand: "roundtree",
      topic: "Home Repair Planning Without Stress",
      keywords: ["repair", "home improvement", "budgeting"]
    }
  ];

  jobs.forEach((job, index) => {
    const html = generateArticle(job);

    const fileName = `${job.brand}-${index + 1}.html`;
    const filePath = path.join(OUTPUT_DIR, fileName);

    fs.writeFileSync(filePath, html);
    console.log("Generated:", fileName);
  });

  console.log("Done: All articles generated.");
}

build();
