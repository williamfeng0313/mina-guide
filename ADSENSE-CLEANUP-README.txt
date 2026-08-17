Mina Guide AdSense Low-Value Cleanup v1 — 2026-08-17

This build closes the main P0 issues found in the uploaded site:
- Removed all noindex URLs from sitemap.xml.
- Deleted four invalid/unverified boss stub files: astral-gate-warden.html, worm-queen.html, the-worms-back.html, tide-caller.html.
- Rebuilt four genuine boss pages (Carving Man, Dark Deluxy, Major Miner, Nether Kraken) as indexable, useful guides.
- Rebuilt the Boss Database around the current 26-boss reference list.
- Rebuilt Boss Difficulty Ratings from the same master boss data.
- Removed all visible “Image Coming Soon” text/placeholders.
- Fixed Bell of Grace canonical and sitemap URL.
- Normalized Trinkets/Weapons hub canonicals to directory URLs.
- Removed AdSense loader from the navigation-only Tools index.
- Cleaned incorrect boss entries from key map pages.

IMPORTANT DEPLOYMENT NOTE
Best option: replace the entire old project folder with this extracted mina-guide folder, then copy your .git folder back if you need local Git history.
If you OVERLAY files onto the old project, manually delete the four boss files listed above or run cleanup-invalid-boss-pages.ps1.
