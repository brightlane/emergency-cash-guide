const path = require("path");

function loadGenerator() {
  const generatorPath = path.resolve(__dirname, "article-generator.js");

  try {
    // Try loading real generator
    return require("./article-generator");
  } catch (err) {
    console.warn("⚠️ article-generator.js missing — using fallback generator");

    // SAFE fallback (never crashes pipeline)
    return function generateArticle() {
      return {
        title: "Fallback Article",
        slug: "fallback-article",
        date: new Date().toISOString(),
        content: `
# Fallback Article

This was generated because article-generator.js was missing.

## What this means
- Pipeline is still working
- No build failure
- Safe fallback content generated
        `.trim()
      };
    };
  }
}

module.exports = loadGenerator;
