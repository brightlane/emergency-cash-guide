import os
import time
import random
import re
from datetime import datetime

# =========================
# CONFIG
# =========================

BASE_URL = "https://brightlane.github.io/emergency-cash-guide"

POSTS_DIR = "posts"
SITEMAP_FILE = "sitemap.xml"

AFFILIATE_LINK = "https://try.restream.io/rwapmhjhzv2z"

TOPICS = [
    "How to Get Emergency Cash Fast in 2026",
    "Best Ways to Make Money Online Quickly",
    "How to Handle Financial Emergencies",
    "Top Side Hustles for Quick Cash",
    "How to Build an Emergency Fund Fast",
    "Passive Income Ideas That Actually Work",
    "Beginner Guide to Making Money Online",
]

INTERNAL_LINKS = [
    f"{BASE_URL}/index.html",
    f"{BASE_URL}/blog.html",
    f"{BASE_URL}/faq.html",
]

# =========================
# HELPERS
# =========================

def ensure_dirs():
    os.makedirs(POSTS_DIR, exist_ok=True)


def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'\s+', '-', text)
    return text.strip('-')


def get_internal_links():
    return " | ".join(
        [f'<a href="{link}">{link.split("/")[-1].replace(".html","")}</a>'
         for link in INTERNAL_LINKS]
    )


# =========================
# ARTICLE GENERATOR
# =========================

def generate_html(title):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="index, follow">
<title>{title}</title>
<meta name="description" content="{title} - practical guide and strategies for beginners.">

<style>
body {{
    font-family: Arial;
    background: #0b0b10;
    color: #ffffff;
    padding: 40px;
    line-height: 1.6;
}}
a {{
    color: #ff3b30;
}}
h1 {{
    color: #ffffff;
}}
h2 {{
    margin-top: 30px;
}}
</style>
</head>

<body>

<h1>{title}</h1>

<p>This guide breaks down <strong>{title}</strong> into simple steps you can apply immediately.</p>

<h2>Step 1: Understand the opportunity</h2>
<p>Most income opportunities today come from digital tools, content, and distribution systems.</p>

<h2>Step 2: Use the right tools</h2>
<p>Speed matters. The faster you execute, the faster results come.</p>

<h2>Recommended platform</h2>

<p>
<a href="{AFFILIATE_LINK}" target="_blank" rel="nofollow sponsored">
👉 Start Free with Restream (Go Live Everywhere)
</a>
</p>

<p>Restream helps creators and beginners distribute content across multiple platforms instantly.</p>

<h2>Step 3: Scale your results</h2>
<p>Consistency + automation = long-term income growth.</p>

<h2>Internal Resources</h2>
<p>{get_internal_links()}</p>

<footer style="margin-top:50px;font-size:12px;color:#888">
Affiliate disclosure: This page contains affiliate links.
</footer>

</body>
</html>
"""


# =========================
# CREATE POST
# =========================

def create_post():
    title = random.choice(TOPICS)
    filename = f"{slugify(title)}-{int(time.time())}.html"
    filepath = os.path.join(POSTS_DIR, filename)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(generate_html(title))

    print(f"[OK] Created post: {filepath}")
    return filename


# =========================
# SITEMAP (SAFE, NO DEPENDENCIES)
# =========================

def update_sitemap():
    files = os.listdir(POSTS_DIR)

    urls = ""

    # homepage
    urls += f"""
<url>
  <loc>{BASE_URL}/</loc>
  <lastmod>{datetime.utcnow().date()}</lastmod>
</url>
"""

    # posts
    for f in files:
        urls += f"""
<url>
  <loc>{BASE_URL}/posts/{f}</loc>
  <lastmod>{datetime.utcnow().date()}</lastmod>
</url>
"""

    xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{urls}
</urlset>
"""

    with open(SITEMAP_FILE, "w", encoding="utf-8") as f:
        f.write(xml)

    print("[OK] Sitemap updated")


# =========================
# MAIN
# =========================

def main():
    ensure_dirs()
    create_post()
    update_sitemap()


if __name__ == "__main__":
    main()
