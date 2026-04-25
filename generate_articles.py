# generate_articles.py
import os
import time
import random
from datetime import datetime

BASE_URL = "https://brightlane.github.io/emergency-cash-guide"

POSTS_DIR = "posts"
SITEMAP_FILE = "sitemap.xml"

TOPICS = [
    "How to Get Emergency Cash Fast in 2026",
    "Best Ways to Make Money Online Quickly",
    "How to Handle Financial Emergencies",
    "Top Side Hustles for Quick Cash",
    "How to Build an Emergency Fund Fast"
]

AFFILIATE_LINK = "https://try.restream.io/rwapmhjhzv2z"

def ensure_dirs():
    os.makedirs(POSTS_DIR, exist_ok=True)

def slugify(text):
    return text.lower().replace(" ", "-")

def generate_html(title):
    return f"""<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="robots" content="index, follow">
<title>{title}</title>
<style>
body{{font-family:Arial;background:#0b0b10;color:#fff;padding:40px;line-height:1.6}}
a{{color:#ff3b30}}
</style>
</head>
<body>

<h1>{title}</h1>

<p>This guide explains {title} and how to take action immediately.</p>

<h2>Quick solution</h2>
<p>Use tools and platforms that allow fast execution and distribution.</p>

<h2>Recommended tool</h2>
<p>Stream and grow faster using:</p>

<p><a href="{AFFILIATE_LINK}" target="_blank" rel="nofollow sponsored">
Start Free with Restream →
</a></p>

<h2>Strategy</h2>
<p>Combine consistency, distribution, and smart tools.</p>

<footer style="margin-top:40px;font-size:12px;color:#777">
Affiliate disclosure: links may earn commission.
</footer>

</body>
</html>
"""

def create_post():
    title = random.choice(TOPICS)
    filename = f"{slugify(title)}-{int(time.time())}.html"
    filepath = os.path.join(POSTS_DIR, filename)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(generate_html(title))

    print(f"Created: {filepath}")
    return filename

def update_sitemap():
    files = os.listdir(POSTS_DIR)

    urls = ""
    for f in files:
        urls += f"""
  <url>
    <loc>{BASE_URL}/posts/{f}</loc>
    <lastmod>{datetime.utcnow().date()}</lastmod>
  </url>"""

    xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{urls}
</urlset>
"""

    with open(SITEMAP_FILE, "w", encoding="utf-8") as f:
        f.write(xml)

    print("Sitemap updated")

def main():
    ensure_dirs()
    create_post()
    update_sitemap()

if __name__ == "__main__":
    main()
