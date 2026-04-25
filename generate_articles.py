import os
import time
import random
import re
from datetime import datetime

BASE_URL = "https://brightlane.github.io/emergency-cash-guide"

POSTS_DIR = "posts"
SITEMAP_FILE = "sitemap.xml"
INDEX_FILE = "blog.html"

TOPICS = [
    "How to Get Emergency Cash Fast in 2026",
    "Best Ways to Make Money Online Quickly",
    "How to Handle Financial Emergencies",
    "Top Side Hustles for Quick Cash",
    "How to Build an Emergency Fund Fast"
]

AFFILIATE_LINK = "https://try.restream.io/rwapmhjhzv2z"

INTERNAL_LINKS = [
    f"{BASE_URL}/index.html",
    f"{BASE_URL}/blog.html",
    f"{BASE_URL}/faq.html"
]

def ensure_dirs():
    os.makedirs(POSTS_DIR, exist_ok=True)

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'\s+', '-', text)
    return text.strip('-')

def generate_internal_links():
    return " | ".join(
        [f'<a href="{link}">{link.split("/")[-1].replace(".html","")}</a>' for link in INTERNAL_LINKS]
    )

def random_paragraph():
    variations = [
        "Speed matters when dealing with financial pressure. Acting quickly can prevent long-term issues.",
        "The key is leveraging tools that amplify your reach instantly.",
        "Consistency and smart distribution outperform raw effort.",
        "Modern tools allow you to scale faster than ever before."
    ]
    return random.choice(variations)

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

<p>{random_paragraph()}</p>

<h2>Quick solution</h2>
<p>{random_paragraph()}</p>

<h2>Recommended tool</h2>
<p>Use this platform:</p>

<p><a href="{AFFILIATE_LINK}" target="_blank" rel="nofollow sponsored">
Start Free →
</a></p>

<h2>Strategy</h2>
<p>{random_paragraph()}</p>

<h2>Related Pages</h2>
<p>{generate_internal_links()}</p>

<footer style="margin-top:40px;font-size:12px;color:#777">
Affiliate disclosure: links may earn commission.
</footer>

</body>
</html>
"""

def post_exists(slug):
    for file in os.listdir(POSTS_DIR):
        if slug in file:
            return True
    return False

def create_post():
    random.shuffle(TOPICS)

    for title in TOPICS:
        slug = slugify(title)
        if not post_exists(slug):
            filename = f"{slug}-{int(time.time())}.html"
            filepath = os.path.join(POSTS_DIR, filename)

            with open(filepath, "w", encoding="utf-8") as f:
                f.write(generate_html(title))

            print(f"✅ Created: {filepath}")
            return filename

    print("⚠️ All topics already used")
    return None

def update_index(new_file):
    try:
        link = f'<li><a href="posts/{new_file}">{new_file.replace(".html","")}</a></li>\n'

        if not os.path.exists(INDEX_FILE):
            with open(INDEX_FILE, "w") as f:
                f.write("<ul>\n</ul>")

        with open(INDEX_FILE, "r+") as f:
            content = f.read()
            content = content.replace("</ul>", link + "</ul>")
            f.seek(0)
            f.write(content)

        print("✅ Index updated")

    except Exception as e:
        print(f"❌ Index error: {e}")

def update_sitemap():
    try:
        files = sorted(os.listdir(POSTS_DIR))

        urls = f"""
  <url>
    <loc>{BASE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>"""

        for f in files:
            urls += f"""
  <url>
    <loc>{BASE_URL}/posts/{f}</loc>
    <lastmod>{datetime.utcnow().date()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
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
    new_post = create_post()

    if new_post:
        update_index(new_post)

    update_sitemap()

if __name__ == "__main__":
    main()
