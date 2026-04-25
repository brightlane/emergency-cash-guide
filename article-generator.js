function generateArticle() {
  const topics = [
    "Emergency Cash Tips",
    "Quick Side Hustles",
    "How to Save Money Fast",
    "Budget Survival Guide"
  ];

  const title = topics[Math.floor(Math.random() * topics.length)];

  return {
    title,
    slug: title.toLowerCase().replace(/ /g, "-"),
    date: new Date().toISOString(),
    content: `
# ${title}

This article was auto-generated.

## Key Points
- Save money quickly by reducing expenses
- Consider short-term income sources
- Focus on essentials only

## Summary
This is a generated emergency cash guide article for SEO content expansion.
    `.trim()
  };
}

module.exports = generateArticle;
