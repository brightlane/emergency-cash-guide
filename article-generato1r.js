const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'output');

function ensureOutput() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

function writeArticle({ keyword }) {
  ensureOutput();

  const safeKeyword = keyword.replace(/\s+/g, '-').toLowerCase();
  const fileName = `${safeKeyword}.html`;
  const filePath = path.join(OUTPUT_DIR, fileName);

  const content = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${keyword} - Complete Guide</title>
  <meta name="description" content="Learn about ${keyword}, how it works, and key considerations.">
</head>
<body>
  <h1>${keyword}</h1>

  <p>
    This article provides an overview of ${keyword}, including how it works,
    what to consider, and general informational guidance.
  </p>

  <p>
    Always compare options carefully and understand terms before making decisions.
  </p>
</body>
</html>
`;

  fs.writeFileSync(filePath, content.trim(), 'utf8');

  return filePath;
}

module.exports = {
  writeArticle
};
