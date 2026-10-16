"""Publishes a finished blog-*.html article: adds its card to resources.html and
registers it in sitemap.xml, blog/feed.json (in-app Learn feed) and llms.txt.

Usage (from the repo root):  python3 _tools/publish_article.py blog-some-slug.html [more.html ...]

The article must carry a `<!-- finiverse-card: {...json...} -->` comment in its <head>
(emoji, datacat, date, readTime, category/title/excerpt in en+es). Safe to re-run:
anything already registered is left alone. Folders starting with "_" are not served
by GitHub Pages (Jekyll), so this script and _queue/ stay private.
"""
import html, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://finiverseapp.com/"


def esc(s):
    return s.replace('"', "&quot;")


def bi(tag, en, es, extra=""):
    return f'<{tag}{extra} data-en="{esc(en)}" data-es="{esc(es)}">{en}</{tag}>'


def plain(s):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", html.unescape(s))).strip()


def read(name):
    with open(os.path.join(ROOT, name), encoding="utf-8") as f:
        return f.read()


def write(name, text):
    with open(os.path.join(ROOT, name), "w", encoding="utf-8") as f:
        f.write(text)


def load_card(filename):
    m = re.search(r"<!-- finiverse-card: (\{.*?\}) -->", read(filename))
    if not m:
        sys.exit(f"{filename}: missing <!-- finiverse-card: {{...}} --> comment in <head>")
    card = json.loads(m.group(1))
    card["file"] = filename
    card["slug"] = filename[:-5]
    card["url"] = SITE + filename
    return card


def update_resources(card):
    s = read("resources.html")
    if f'href="{card["file"]}"' not in s:
        c, t, e = card["category"], card["title"], card["excerpt"]
        lines = [
            f'<a href="{card["file"]}" class="article-card fade-in" data-cat="{card["datacat"]}" style="text-decoration:none;display:block">',
            f'  <span class="article-emoji">{card["emoji"]}</span>',
            "  " + bi("div", c["en"], c["es"], ' class="article-cat"'),
            "  " + bi("div", t["en"], t["es"], ' class="article-title"'),
            "  " + bi("p", e["en"], e["es"], ' class="article-excerpt"'),
            '  <span class="article-meta" data-en="Read article →" data-es="Leer artículo →">Read article →</span>',
            "</a>",
        ]
        block = "".join("      " + l + "\n" for l in lines) + "\n"
        anchor = '<div class="article-grid">\n'
        assert anchor in s, "resources.html: article grid not found"
        s = s.replace(anchor, anchor + "\n" + block, 1)
    # category filter: show it if hidden, create it if missing
    btn = re.search(rf'<button class="res-cat-btn" data-filter="{re.escape(card["datacat"])}"[^>]*>', s)
    if btn:
        s = s.replace(btn.group(0), btn.group(0).replace(' style="display:none"', ""), 1)
    else:
        c = card["category"]
        last = list(re.finditer(r'\n(\s*)<button class="res-cat-btn"[^\n]*</button>', s))[-1]
        new = f'\n{last.group(1)}<button class="res-cat-btn" data-filter="{card["datacat"]}" data-en="{esc(c["en"])}" data-es="{esc(c["es"])}">{c["en"]}</button>'
        s = s[:last.end()] + new + s[last.end():]
    n = s.count('class="article-card fade-in"')
    s = re.sub(r'(id="articleCount" data-en=")\d+ articles(" data-es=")\d+ artículos(">)\d+ articles',
               rf"\g<1>{n} articles\g<2>{n} artículos\g<3>{n} articles", s)
    write("resources.html", s)


def update_sitemap(card):
    s = read("sitemap.xml")
    if f"<loc>{card['url']}</loc>" in s:
        return
    line = f"  <url><loc>{card['url']}</loc><lastmod>{card['date']}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>\n"
    write("sitemap.xml", s.replace("</urlset>", line + "</urlset>", 1))


def update_feed(card):
    feed = json.loads(read("blog/feed.json"))
    if any(a.get("url") == card["url"] for a in feed["articles"]):
        return
    p = lambda d: {"es": plain(d["es"]), "en": plain(d["en"])}
    feed["articles"].insert(0, {
        "id": card["slug"].replace("blog-", ""), "url": card["url"], "emoji": card["emoji"],
        "publishedAt": card["date"], "readTime": card["readTime"],
        "category": p(card["category"]), "title": p(card["title"]), "excerpt": p(card["excerpt"]),
    })
    write("blog/feed.json", json.dumps(feed, ensure_ascii=False, indent=2) + "\n")


def update_llms(card):
    s = read("llms.txt")
    if card["url"] in s:
        return
    line = f"- [{plain(card['title']['en'])}]({card['url']}): {plain(card['excerpt']['en'])}\n"
    marker = "## Articles\n\n"
    assert marker in s, "llms.txt: '## Articles' section not found"
    write("llms.txt", s.replace(marker, marker + line, 1))


def main(files):
    if not files:
        sys.exit(__doc__)
    for f in files:
        card = load_card(os.path.basename(f))
        update_resources(card)
        update_sitemap(card)
        update_feed(card)
        update_llms(card)
        print("published", card["file"])


if __name__ == "__main__":
    main(sys.argv[1:])
