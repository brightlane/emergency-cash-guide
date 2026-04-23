#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const OUT = path.join(process.cwd(), "social-posts");
fs.mkdirSync(OUT, { recursive: true });

// 🔗 affiliate link
const LINK =
  "https://www.linkconnector.com/ta.php?lc=007949096598005765&atid=MaxlendeMergency";

// 🧠 content themes (rotate daily)
const topics = [
  "emergency cash loans explained",
  "fast loan approval tips",
  "bad credit loan options",
  "how to get quick funding",
  "smart borrowing strategies"
];

// 🎯 pick “daily theme” (stable daily rotation)
const dayIndex = new Date().getDate();
const topic = topics[dayIndex % topics.length];

// 🧾 X (Twitter) post
const xPost = `
🚨 ${topic.toUpperCase()} 🚨

When unexpected expenses hit, fast funding options can help bridge the gap.

Learn more here:
${LINK}

#finance #loans #moneytips
`.trim();

// 🧾 Reddit post (longer, more natural)
const redditPost = `
Title: ${topic}

Many people struggle when unexpected expenses come up.

This guide explains how short-term lending works and what to watch out for.

Key things to understand:
- Approval speed matters
- Always review repayment terms
- Compare multiple options

More info here:
${LINK}

(Sharing for informational purposes only)
`.trim();

// 🧾 LinkedIn post (professional tone)
const linkedinPost = `
${topic}

Financial flexibility is important in today’s economy.

Short-term lending solutions can provide support during unexpected situations, but should always be used responsibly.

Key considerations:
• Understand total repayment cost
• Evaluate income stability
• Avoid unnecessary borrowing cycles

Learn more:
${LINK}
`.trim();

// write files
fs.writeFileSync(path.join(OUT, "x-post.txt"), xPost);
fs.writeFileSync(path.join(OUT, "reddit-post.txt"), redditPost);
fs.writeFileSync(path.join(OUT, "linkedin-post.txt"), linkedinPost);

console.log("✅ Daily social posts generated");
