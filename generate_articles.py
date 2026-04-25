# generate_articles.py
import os
import time
import random
import re
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

# internal pages for SEO linking
INTERNAL_LINKS = [
    f"{BASE_URL}/index.html",
    f"{BASE_URL}/blog.html",
    f"{BASE_URL}/faq.html"
]

def ensure_dirs():
    os.makedirs(POSTS_DIR, exist_ok=True)

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)   # remove symbols
    text = re.sub(r'\s+', '-', text)           # spaces → dash
    return text.strip('-')

def generate_internal_links():
    links = ""
    for link in INTERNAL_LINKS:
        name = link.split("/")[-1].replace(".html", "")
        links += f'<a href="{link}">{name}</a> | '
    return links.rstrip(" | ")

def generate_html(title):
    return f"""<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="robots" content="index, follow">
<title>{title}</title>
<meta name="description" content="{title} - complete guide and strategies.">
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

<h2>Related Pages</h2>
<p>{generate_internal_links()}</p>

<footer style="margin-top:40px;font-size:12px;color:#777">
Affiliate disclosure: links may earn commission.
</footer>

</body>
</html>
"""

def create_post():
    title = random.choice(TOPICS)
    timestamp = int(time.time())
    filename = f"{slugify(title)}-{timestamp}.html"
    filepath = os.path.join(POSTS_DIR, filename)

    try:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(generate_html(title))
        print(f"✅ Created: {filepath}")
    except Exception as e:
        print(f"❌ Error writing file: {e}")

    return filename

def update_sitemap():
    try:
        files = sorted(os.listdir(POSTS_DIR))

        urls = ""

        # include main pages
        urls += f"""
  <url>
    <loc>{BASE_URL}/</loc>
    <lastmod>{datetime.utcnow().date()}</lastmod>
  </url>"""

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

        print("✅ Sitemap updated")

    except Exception as e:
        print(f"❌ Sitemap error: {e}")

def main():
    ensure_dirs()
    create_post()
    update_sitemap()

if __name__ == "__main__":
    main()
