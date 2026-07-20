# Builds the mina-guide multi-page site from source HTML files.
$ErrorActionPreference = 'Stop'
$Root = Split-Path $PSScriptRoot -Parent

$SourceHtml = 'c:\Users\Lenovo\Downloads\mina-the-hollower-guide.html'
$TrinketHtml = 'c:\Users\Lenovo\Desktop\Project\Mina the Hollower\mina-the-hollower-guide.html'

function Get-SitePrefix([string]$RelPath) {
  $dir = Split-Path $RelPath -Parent
  if ([string]::IsNullOrEmpty($dir)) { return '' }
  $depth = @($dir -split '[\\/]' | Where-Object { $_ }).Count
  return ('../' * $depth)
}

function Get-AssetPrefix([string]$RelPath) {
  return (Get-SitePrefix $RelPath) + 'assets/'
}

function Get-Slug([string]$Name) {
  $n = $Name
  if ($n.Contains([char]0x26A0)) { $n = $n.Replace([string][char]0x26A0, '').Trim() }
  $arrowIdx = $n.IndexOf([char]0x2192)
  if ($arrowIdx -ge 0) { $n = $n.Substring(0, $arrowIdx).Trim() }
  $slug = ($n.ToLower() -replace '[^a-z0-9]+', '-').Trim('-')
  return $slug
}

function Write-Page {
  param(
    [string]$RelPath,
    [string]$Title,
    [string]$Description,
    [string]$Body,
    [string]$ExtraHead = '',
    [string]$ExtraScripts = '',
    [string]$ActiveNav = ''
  )
  $prefix = Get-SitePrefix $RelPath
  $assets = Get-AssetPrefix $RelPath
  $navClass = { param($k) if ($ActiveNav -eq $k) { ' style="color:var(--candle-light)"' } else { '' } }

  $html = @"
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>$Title - Mina the Hollower Guide</title>
<meta name="description" content="$Description">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=IM+Fell+English:ital@0;1&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${assets}css/main.css">
$ExtraHead
</head>
<body>

<div class="announce">
  Mina the Hollower launched May 29, 2026 - guides are live and updating daily &nbsp;|&nbsp;
  <a href="${prefix}blog/beginner-guide.html">New: 11 beginner tips</a>
</div>

<nav>
  <a href="${prefix}index.html" class="nav-brand">Tenebrous Isle Guide</a>
  <ul class="nav-links">
    <li><a href="${prefix}blog/index.html"$(& $navClass 'blog')>Blog</a></li>
    <li><a href="${prefix}database/index.html"$(& $navClass 'database')>Database</a></li>
    <li><a href="${prefix}tools/index.html"$(& $navClass 'tools')>Tools</a></li>
    <li><a href="${prefix}about.html"$(& $navClass 'about')>About</a></li>
  </ul>
  <div class="nav-search">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
    <input type="text" placeholder="Search guides..." aria-label="Search guides" data-search-root="${prefix}">
  </div>
  <button class="hamburger" aria-label="Open menu" onclick="document.getElementById('mobileNav').classList.add('open')">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
  </button>
</nav>

<div class="mobile-nav-overlay" id="mobileNav" role="dialog" aria-label="Navigation">
  <button class="mobile-close-btn" onclick="document.getElementById('mobileNav').classList.remove('open')" aria-label="Close menu">X</button>
  <a href="${prefix}index.html" onclick="document.getElementById('mobileNav').classList.remove('open')">Home</a>
  <a href="${prefix}blog/index.html" onclick="document.getElementById('mobileNav').classList.remove('open')">Blog</a>
  <a href="${prefix}database/index.html" onclick="document.getElementById('mobileNav').classList.remove('open')">Database</a>
  <a href="${prefix}tools/index.html" onclick="document.getElementById('mobileNav').classList.remove('open')">Tools</a>
  <a href="${prefix}about.html" onclick="document.getElementById('mobileNav').classList.remove('open')">About</a>
</div>

$Body

<footer>
  <div class="footer-brand">Tenebrous Isle Guide</div>
  <p class="footer-text">The most complete English guide for Mina the Hollower — updated daily as we explore the island.</p>
  <div class="footer-links">
    <a href="${prefix}blog/index.html">Blog</a>
    <a href="${prefix}database/bosses/index.html">Bosses</a>
    <a href="${prefix}database/weapons/index.html">Weapons</a>
    <a href="${prefix}database/trinkets/index.html">Trinkets</a>
    <a href="${prefix}tools/index.html">Tools</a>
    <a href="${prefix}about.html">About</a>
  </div>
  <p class="footer-disclaimer">
    This is a fan-made guide site. Mina the Hollower is a trademark of Yacht Club Games.
    All game content belongs to their respective owners.
  </p>
</footer>

<script src="${assets}js/main.js"></script>
$ExtraScripts
</body>
</html>
"@

  $out = Join-Path $Root $RelPath
  $dir = Split-Path $out -Parent
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  [System.IO.File]::WriteAllText($out, $html, (New-Object System.Text.UTF8Encoding $true))
}

# ── Directories ──
@(
  'assets/css','assets/js','assets/images',
  'blog','database/trinkets','database/bosses','database/weapons',
  'tools','scripts'
) | ForEach-Object { New-Item -ItemType Directory -Path (Join-Path $Root $_) -Force | Out-Null }

# ── Extract CSS ──
$src = Get-Content $SourceHtml -Raw -Encoding UTF8
if ($src -notmatch '(?s)<style>\r?\n(.*?)\r?\n</style>') { throw 'CSS not found' }
$css = $Matches[1] + @'
  .page-wrap { max-width: 1200px; margin: 0 auto; padding: 2rem 1.5rem 3rem; }
  .page-wrap.narrow { max-width: 900px; }
  .breadcrumb { font-size: 0.78rem; margin-bottom: 1.2rem; }
  .breadcrumb a { text-decoration: none; }
  .hub-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem; margin-top: 1.5rem; }
  .hub-card { display: block; background: rgba(245,234,216,0.05); border: 1px solid rgba(200,134,10,0.22); border-radius: 4px; padding: 1.2rem; text-decoration: none; transition: background 0.15s, border-color 0.15s; }
  .hub-card:hover { background: rgba(200,134,10,0.08); border-color: rgba(200,134,10,0.4); }
  .hub-card h3 { font-family: Cinzel, serif; font-size: 0.95rem; margin-bottom: 0.4rem; }
  .hub-card p { font-size: 0.85rem; line-height: 1.5; }
  .detail-card { background: rgba(245,234,216,0.05); border: 1px solid rgba(200,134,10,0.25); border-radius: 4px; padding: 1.5rem; margin-bottom: 1.5rem; }
  .detail-card h1 { font-family: Cinzel, serif; font-size: 1.6rem; margin-bottom: 0.5rem; }
  .detail-meta { font-size: 0.82rem; margin-bottom: 1rem; }
  .db-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.6rem; }
  .db-list a { display: block; padding: 0.6rem 0.8rem; background: rgba(245,234,216,0.04); border: 1px solid rgba(200,134,10,0.15); border-radius: 3px; text-decoration: none; font-family: IM Fell English, serif; font-size: 0.95rem; }
  .article-body { font-size: 0.95rem; line-height: 1.75; }
  .article-body h2 { font-family: Cinzel, serif; font-size: 1.1rem; margin: 1.5rem 0 0.6rem; }
  .article-body p { margin-bottom: 1rem; }
'@
[System.IO.File]::WriteAllText((Join-Path $Root 'assets/css/main.css'), $css, (New-Object System.Text.UTF8Encoding $true))

# ── Extract & merge JS ──
if ($src -notmatch '(?s)<script>\r?\n(.*?)\r?\n</script>\r?\n</body>') { throw 'JS not found' }
$js = $Matches[1]
$js += @'
  function filterTrinkets(area) {
    const items = document.querySelectorAll('#trinket-container .trinket-item');
    if (!items.length) return;
    items.forEach(item => {
      item.style.display = (area === 'all' || item.dataset.area === area) ? '' : 'none';
    });
    document.querySelectorAll('[id^="tab-"]').forEach(btn => {
      const isActive = btn.id === 'tab-' + area;
      btn.style.background = isActive ? 'rgba(200,134,10,0.2)' : 'transparent';
      btn.style.borderColor = isActive ? 'rgba(200,134,10,0.5)' : 'rgba(200,134,10,0.25)';
      btn.style.color = isActive ? 'var(--candle-light)' : 'var(--bone)';
    });
  }
  (function initSearch() {
    const input = document.querySelector('.nav-search input');
    if (!input) return;
    const root = input.dataset.searchRoot || '';
    const routes = {
      boss: root + 'database/bosses/index.html',
      weapon: root + 'database/weapons/index.html',
      trinket: root + 'database/trinkets/index.html',
      build: root + 'tools/build-planner.html',
      quiz: root + 'tools/build-quiz.html',
      checklist: root + 'tools/checklist.html',
      beginner: root + 'blog/beginner-guide.html',
      tip: root + 'blog/beginner-guide.html',
      mistake: root + 'blog/mistakes.html',
      blog: root + 'blog/index.html',
      tool: root + 'tools/index.html',
      about: root + 'about.html'
    };
    input.addEventListener('keydown', function(e) {
      if (e.key !== 'Enter' || !this.value.trim()) return;
      const q = this.value.trim().toLowerCase();
      let target = root + 'index.html';
      for (const [kw, href] of Object.entries(routes)) {
        if (q.includes(kw)) { target = href; break; }
      }
      window.location.href = target;
      this.value = '';
    });
  })();
'@
[System.IO.File]::WriteAllText((Join-Path $Root 'assets/js/main.js'), $js, (New-Object System.Text.UTF8Encoding $true))

# ── Parse trinkets ──
$tSrc = Get-Content $TrinketHtml -Raw -Encoding UTF8
$trinkets = @()
[regex]::Matches($tSrc, 'data-area="([^"]+)"><div class="trinket-name">([^<]+)</div><div class="trinket-effect">([^<]+)</div><div class="trinket-location">([^<]+)</div>') | ForEach-Object {
  $trinkets += [pscustomobject]@{
    Area = $_.Groups[1].Value
    Name = $_.Groups[2].Value
    Effect = $_.Groups[3].Value
    Location = $_.Groups[4].Value
    Slug = Get-Slug $_.Groups[2].Value
  }
}
Write-Host "Parsed $($trinkets.Count) trinkets"

# ── Boss data ──
$bosses = @(
  @{ Name='Carving Man'; Slug='carving-man'; Region='Septemburg'; Difficulty='Normal'; DiffClass='diff-normal'; Strategy='Invulnerable during chase — only attack in the final arena. Use Recall Disc to punish his jump.' },
  @{ Name='Nether Kraken'; Slug='nether-kraken'; Region="Loner's Landing"; Difficulty='Hard'; DiffClass='diff-hard'; Strategy='Optional intro boss. Aim for the glowing eye cluster; burrowing avoids the tentacle sweeps entirely.' },
  @{ Name='Major Miner'; Slug='major-miner'; Region='Sifted Sands'; Difficulty='Normal'; DiffClass='diff-normal'; Strategy='Phase 2 spawns TNT carts — use them against him. Battery Buster from range is very effective.' },
  @{ Name='Dark Deluxy'; Slug='dark-deluxy'; Region='Bone Beach'; Difficulty='Secret'; DiffClass='diff-secret'; Strategy='Secret boss. Only accessible after collecting 3+ Sparks. Bring Vascular Syrup for the DoT phases.' },
  @{ Name="The Worm's Back"; Slug='the-worms-back'; Region='Sifted Sands'; Difficulty='Hard'; DiffClass='diff-hard'; Strategy='Ride the segments; jump attacks hit the weak point on top. Thorn Harness negates most poison.' },
  @{ Name='Worm Queen'; Slug='worm-queen'; Region='Queensbury Crypt'; Difficulty='Hard'; DiffClass='diff-hard'; Strategy='Attack the glowing egg sacs; dodge the sweep attacks.' },
  @{ Name='Tide Caller'; Slug='tide-caller'; Region="Nox's Bayou"; Difficulty='Normal'; DiffClass='diff-normal'; Strategy='Use Battery Buster from range; avoid entering the water.' },
  @{ Name='Astral Gate Warden'; Slug='astral-gate-warden'; Region='Astral Orrery'; Difficulty='Brutal'; DiffClass='diff-brutal'; Strategy='Final gauntlet. Activate all 5 mirrors before attempting — fast travel is essential here.' }
)

# ── Extract sections from source ──
function Get-Section([string]$Id) {
  if ($src -notmatch "(?s)<section id=`"$Id`"[^>]*>(.*?)</section>") { return '' }
  return $Matches[1]
}

$tipsSection = Get-Section 'tips'
$weaponsSection = Get-Section 'weapons'
$trinketCombosSection = Get-Section 'trinkets'
$buildPlannerSection = Get-Section 'build-planner'
$areasSection = Get-Section 'areas'

# Fix internal anchors in extracted sections
function Fix-Links([string]$html, [string]$Prefix) {
  $html = $html -replace 'href="#bosses"', "href=`"${Prefix}database/bosses/index.html`""
  $html = $html -replace 'href="#weapons"', "href=`"${Prefix}database/weapons/index.html`""
  $html = $html -replace 'href="#trinkets"', "href=`"${Prefix}database/trinkets/index.html`""
  $html = $html -replace 'href="#tips"', "href=`"${Prefix}blog/beginner-guide.html`""
  $html = $html -replace 'href="#areas"', "href=`"${Prefix}database/index.html`""
  $html = $html -replace 'href="#build-quiz"', "href=`"${Prefix}tools/build-quiz.html`""
  $html = $html -replace 'href="#build-planner"', "href=`"${Prefix}tools/build-planner.html`""
  $html = $html -replace 'href="#"', "href=`"${Prefix}database/trinkets/index.html`""
  return $html
}

# ── Trinkets index HTML ──
$trinketItemsHtml = ($trinkets | ForEach-Object {
  "        <div class=`"trinket-item`" data-area=`"$($_.Area)`"><div class=`"trinket-name`"><a href=`"$($_.Slug).html`" style=`"color:inherit;text-decoration:none;`">$($_.Name)</a></div><div class=`"trinket-effect`">$($_.Effect)</div><div class=`"trinket-location`">$($_.Location)</div></div>"
}) -join "`n"

$trinketsIndexBody = @"
<main class="page-wrap">
  <div class="breadcrumb"><a href="../../index.html">Home</a> / <a href="../index.html">Database</a> / Trinkets</div>
  <div class="section-divider"><h2>All 60 Trinkets — Locations &amp; Effects</h2></div>
  <p style="color:var(--bone-dark); font-size:0.9rem; margin-bottom:1.2rem; font-style:italic;">
    Every trinket in Mina the Hollower — what it does and exactly where to find it. You can equip up to 6 at once. Missable trinkets marked ⚠ can be purchased later from the Black Market.
  </p>
  <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:1.5rem;">
    <button onclick="filterTrinkets('all')" id="tab-all" style="font-family:'Cinzel',serif; font-size:0.72rem; letter-spacing:0.08em; text-transform:uppercase; padding:5px 14px; border-radius:3px; cursor:pointer; border:1px solid rgba(200,134,10,0.5); background:rgba(200,134,10,0.2); color:var(--candle-light);">All (60)</button>
    <button onclick="filterTrinkets('ossex')" id="tab-ossex" style="font-family:'Cinzel',serif; font-size:0.72rem; letter-spacing:0.08em; text-transform:uppercase; padding:5px 14px; border-radius:3px; cursor:pointer; border:1px solid rgba(200,134,10,0.25); background:transparent; color:var(--bone);">Ossex (15)</button>
    <button onclick="filterTrinkets('outskirts')" id="tab-outskirts" style="font-family:'Cinzel',serif; font-size:0.72rem; letter-spacing:0.08em; text-transform:uppercase; padding:5px 14px; border-radius:3px; cursor:pointer; border:1px solid rgba(200,134,10,0.25); background:transparent; color:var(--bone);">S. Outskirts (2)</button>
    <button onclick="filterTrinkets('heath')" id="tab-heath" style="font-family:'Cinzel',serif; font-size:0.72rem; letter-spacing:0.08em; text-transform:uppercase; padding:5px 14px; border-radius:3px; cursor:pointer; border:1px solid rgba(200,134,10,0.25); background:transparent; color:var(--bone);">E. Heath (4)</button>
    <button onclick="filterTrinkets('bayou')" id="tab-bayou" style="font-family:'Cinzel',serif; font-size:0.72rem; letter-spacing:0.08em; text-transform:uppercase; padding:5px 14px; border-radius:3px; cursor:pointer; border:1px solid rgba(200,134,10,0.25); background:transparent; color:var(--bone);">Nox's Bayou (6)</button>
    <button onclick="filterTrinkets('wilds')" id="tab-wilds" style="font-family:'Cinzel',serif; font-size:0.72rem; letter-spacing:0.08em; text-transform:uppercase; padding:5px 14px; border-radius:3px; cursor:pointer; border:1px solid rgba(200,134,10,0.25); background:transparent; color:var(--bone);">W. Wilds (5)</button>
    <button onclick="filterTrinkets('crypt')" id="tab-crypt" style="font-family:'Cinzel',serif; font-size:0.72rem; letter-spacing:0.08em; text-transform:uppercase; padding:5px 14px; border-radius:3px; cursor:pointer; border:1px solid rgba(200,134,10,0.25); background:transparent; color:var(--bone);">Q. Crypt (4)</button>
    <button onclick="filterTrinkets('other')" id="tab-other" style="font-family:'Cinzel',serif; font-size:0.72rem; letter-spacing:0.08em; text-transform:uppercase; padding:5px 14px; border-radius:3px; cursor:pointer; border:1px solid rgba(200,134,10,0.25); background:transparent; color:var(--bone);">Other Areas (24)</button>
  </div>
  <div id="trinket-container" class="trinket-grid" style="display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:0.75rem; margin-bottom:2.5rem;">
$trinketItemsHtml
  </div>
  <p style="font-size:0.82rem; color:var(--bone-dark); font-style:italic;">⚠ Trinkets marked with ⚠ are technically missable but can be purchased retroactively from the Black Market if you meet the condition after the fact.</p>
</main>
"@

# ── Bosses index ──
$bossRows = ($bosses | ForEach-Object {
  "            <tr><td><div class=`"boss-name`"><a href=`"$($_.Slug).html`" style=`"color:inherit;text-decoration:none;`">$($_.Name)</a></div></td><td><span class=`"region-label`">$($_.Region)</span></td><td><span class=`"diff-badge $($_.DiffClass)`">$($_.Difficulty)</span></td><td class=`"boss-tip`">$($_.Strategy)</td></tr>"
}) -join "`n"

$bossesIndexBody = @"
<main class="page-wrap">
  <div class="breadcrumb"><a href="../../index.html">Home</a> / <a href="../index.html">Database</a> / Bosses</div>
  <section class="boss-section" aria-label="Boss guide">
    <div class="section-divider"><h2>Boss Guide</h2></div>
    <p style="color:var(--bone-dark); font-size:0.9rem; margin-bottom:1rem; font-style:italic;">Tenebrous Isle holds 26 bosses — 9 of which are secret fights hidden behind side quests. Difficulty ratings are relative to your first encounter on a standard run.</p>
    <div style="overflow-x:auto;">
      <table class="boss-table" role="table">
        <thead><tr><th>Boss</th><th>Region</th><th>Difficulty</th><th>Key Strategy</th></tr></thead>
        <tbody>
$bossRows
        </tbody>
      </table>
    </div>
    <p style="margin-top:0.8rem; font-size:0.82rem; color:var(--bone-dark); font-style:italic;">✦ Full strategies for all 26 bosses — more entries added daily.</p>
  </section>
</main>
"@

# ── INDEX (home) ──
$indexBody = @"
<header class="hero">
  <p class="hero-eyebrow">✦ Fan-made &nbsp;·&nbsp; No ads &nbsp;·&nbsp; Updated daily since launch</p>
  <h1>Mina the Hollower<span>Stop dying. Start hollowing. Every secret on Tenebrous Isle — in one place.</span></h1>
  <p class="hero-desc">The only guide that covers all 60 trinket locations, every secret boss trigger, and the exact build that trivializes each fight.</p>
  <div class="hero-ctas">
    <a href="tools/build-quiz.html" class="btn-primary">⚡ Find My Build</a>
    <a href="database/bosses/index.html" class="btn-secondary">Boss Guide</a>
    <a href="database/trinkets/index.html" class="btn-secondary">All 60 Trinkets</a>
  </div>
</header>
<div class="stats-bar" role="region" aria-label="Game overview stats">
  <div class="stat-item"><span class="stat-num">26</span><span class="stat-label">Boss Fights</span></div>
  <div class="stat-item"><span class="stat-num">60</span><span class="stat-label">Trinkets</span></div>
  <div class="stat-item"><span class="stat-num">5</span><span class="stat-label">Weapons</span></div>
  <div class="stat-item"><span class="stat-num">15</span><span class="stat-label">Sidearms</span></div>
  <div class="stat-item"><span class="stat-num">7</span><span class="stat-label">NG+ Modes</span></div>
  <div class="stat-item"><span class="stat-num">6</span><span class="stat-label">Regions</span></div>
</div>
<main class="page-wrap">
  <div class="section-divider"><h2>Explore the Guide</h2></div>
  <div class="hub-grid">
    <a class="hub-card" href="blog/index.html"><h3>📜 Blog &amp; Guides</h3><p>Beginner tips, best builds, boss tier lists, and hidden mechanics explained.</p></a>
    <a class="hub-card" href="database/index.html"><h3>💎 Game Database</h3><p>All 60 trinkets, 26 bosses, and 5 weapons with locations and strategies.</p></a>
    <a class="hub-card" href="tools/index.html"><h3>⚙ Interactive Tools</h3><p>Build planner, loadout quiz, 100% checklist, and progress tracker.</p></a>
    <a class="hub-card" href="blog/beginner-guide.html"><h3>🕯 Start Here</h3><p>11 tips every new player should know before the first boss fight.</p></a>
    <a class="hub-card" href="blog/best-trinkets.html"><h3>🔥 Best Trinket Combos</h3><p>Top loadouts ranked by DPS, survival, and Bone farming.</p></a>
    <a class="hub-card" href="tools/build-planner.html"><h3>📋 Build Planner</h3><p>Pick weapon + trinkets and share your build URL instantly.</p></a>
  </div>
</main>
"@

Write-Page 'index.html' 'Home' 'Complete guide for Mina the Hollower - bosses, trinkets, builds, and tools.' $indexBody -ActiveNav ''

# ── ABOUT ──
$aboutBody = @"
<main class="page-wrap narrow">
  <div class="breadcrumb"><a href="index.html">Home</a> / About</div>
  <div class="section-divider"><h2>About This Guide</h2></div>
  <div class="article-body">
    <p>Tenebrous Isle Guide is a fan-made, ad-free resource for <em>Mina the Hollower</em> by Yacht Club Games. We document every trinket location, boss strategy, and build combination so you can focus on exploring the island instead of guessing.</p>
    <h2>What we cover</h2>
    <p>Our database lists all 60 trinkets with exact acquisition steps, every documented boss with key strategies, and all five weapons with recommended playstyles. Interactive tools let you plan builds and track completion.</p>
    <h2>Updates</h2>
    <p>Content is updated daily as the community discovers new secrets. Missing something? Check back — we're still mapping all 26 bosses and hidden questlines.</p>
    <h2>Disclaimer</h2>
    <p>This is not an official Yacht Club Games product. All game content belongs to their respective owners.</p>
  </div>
</main>
"@
Write-Page 'about.html' 'About' 'About the Tenebrous Isle fan guide for Mina the Hollower.' $aboutBody -ActiveNav 'about'

# ── DATABASE hub ──
$dbBody = @"
<main class="page-wrap">
  <div class="breadcrumb"><a href="../index.html">Home</a> / Database</div>
  <div class="section-divider"><h2>Game Database</h2></div>
  <p style="color:var(--bone-dark); font-size:0.9rem; margin-bottom:1.5rem; font-style:italic;">Searchable reference for every collectible, boss, and weapon in Mina the Hollower.</p>
  <div class="hub-grid">
    <a class="hub-card" href="trinkets/index.html"><h3>💎 Trinkets (60)</h3><p>Full list with effects, locations, and individual detail pages.</p></a>
    <a class="hub-card" href="bosses/index.html"><h3>💀 Bosses (26)</h3><p>Difficulty ratings, regions, and key strategies for every fight.</p></a>
    <a class="hub-card" href="weapons/index.html"><h3>⚔ Weapons (5)</h3><p>Stat breakdowns and recommended playstyles for each weapon.</p></a>
  </div>
</main>
"@
Write-Page 'database/index.html' 'Database' 'Mina the Hollower database - trinkets, bosses, and weapons.' $dbBody -ActiveNav 'database'

Write-Page 'database/trinkets/index.html' 'All Trinkets' 'All 60 trinket locations and effects in Mina the Hollower.' $trinketsIndexBody -ActiveNav 'database'
Write-Page 'database/bosses/index.html' 'Boss Guide' 'All boss strategies for Mina the Hollower.' $bossesIndexBody -ActiveNav 'database'

$weaponsBody = @"
<main class="page-wrap">
  <div class="breadcrumb"><a href="../../index.html">Home</a> / <a href="../index.html">Database</a> / Weapons</div>
  <section aria-label="Weapons and builds">$(Fix-Links $weaponsSection '../../')</section>
</main>
"@
Write-Page 'database/weapons/index.html' 'Weapons & Builds' 'All weapons and recommended builds in Mina the Hollower.' $weaponsBody -ActiveNav 'database'

# ── Individual trinket pages ──
foreach ($t in $trinkets) {
  $body = @"
<main class="page-wrap narrow">
  <div class="breadcrumb"><a href="../../index.html">Home</a> / <a href="../index.html">Database</a> / <a href="index.html">Trinkets</a> / $($t.Name)</div>
  <div class="detail-card">
    <h1>$($t.Name)</h1>
    <div class="detail-meta"><span class="region-label">$($t.Area)</span></div>
    <p style="font-size:0.95rem; color:var(--bone); margin-bottom:1rem; line-height:1.6;"><strong>Effect:</strong> $($t.Effect)</p>
    <p style="font-size:0.9rem; color:var(--bone-dark); line-height:1.6;">$($t.Location)</p>
  </div>
  <p><a href="index.html" style="color:var(--candle); font-family:'Cinzel',serif; font-size:0.8rem; letter-spacing:0.08em; text-transform:uppercase;">← Back to all trinkets</a></p>
</main>
"@
  Write-Page "database/trinkets/$($t.Slug).html" $t.Name "$($t.Name) trinket location and effect in Mina the Hollower." $body -ActiveNav 'database'
}

# ── Individual boss pages ──
foreach ($b in $bosses) {
  $body = @"
<main class="page-wrap narrow">
  <div class="breadcrumb"><a href="../../index.html">Home</a> / <a href="../index.html">Database</a> / <a href="index.html">Bosses</a> / $($b.Name)</div>
  <div class="detail-card">
    <h1>$($b.Name)</h1>
    <div class="detail-meta"><span class="region-label">$($b.Region)</span> · <span class="diff-badge $($b.DiffClass)">$($b.Difficulty)</span></div>
    <h2 style="font-family:'Cinzel',serif; font-size:0.85rem; color:var(--candle); letter-spacing:0.08em; margin:1rem 0 0.5rem;">Key Strategy</h2>
    <p style="font-size:0.95rem; color:var(--bone-dark); line-height:1.7;">$($b.Strategy)</p>
  </div>
  <p><a href="index.html" style="color:var(--candle); font-family:'Cinzel',serif; font-size:0.8rem; letter-spacing:0.08em; text-transform:uppercase;">← Back to boss list</a></p>
</main>
"@
  Write-Page "database/bosses/$($b.Slug).html" $b.Name "$($b.Name) boss strategy for Mina the Hollower." $body -ActiveNav 'database'
}

# ── BLOG ──
$blogPosts = @(
  @{ File='beginner-guide.html'; Title='Beginner Guide'; Desc='11 essential tips for new Mina the Hollower players.'; Body="<main class=`"page-wrap narrow`"><div class=`"breadcrumb`"><a href=`"../index.html`">Home</a> / <a href=`"index.html`">Blog</a> / Beginner Guide</div><section aria-label=`"Beginner tips`">$(Fix-Links $tipsSection '../')</section></main>" },
  @{ File='best-trinkets.html'; Title='Best Trinkets'; Desc='Top trinket combos ranked by playstyle in Mina the Hollower.'; Body="<main class=`"page-wrap narrow`"><div class=`"breadcrumb`"><a href=`"../index.html`">Home</a> / <a href=`"index.html`">Blog</a> / Best Trinkets</div><section aria-label=`"Trinket combinations`">$(Fix-Links $trinketCombosSection '../')</section></main>" },
  @{ File='best-builds.html'; Title='Best Builds'; Desc='Best weapon and trinket builds for each playstyle.'; Body="<main class=`"page-wrap narrow`"><div class=`"breadcrumb`"><a href=`"../index.html`">Home</a> / <a href=`"index.html`">Blog</a> / Best Builds</div><section aria-label=`"Weapons and builds`">$(Fix-Links $weaponsSection '../')</section><p style=`"margin-top:1.5rem;`"><a href=`"../tools/build-quiz.html`" class=`"btn-primary`" style=`"display:inline-block;`">Take the Build Quiz →</a></p></main>" },
  @{ File='mistakes.html'; Title='Common Mistakes'; Desc='Mistakes that kill runs in Mina the Hollower.'; Body=@"
<main class="page-wrap narrow">
  <div class="breadcrumb"><a href="../index.html">Home</a> / <a href="index.html">Blog</a> / Common Mistakes</div>
  <div class="section-divider"><h2>5 Mistakes That Kill Runs</h2></div>
  <div class="article-body">
    <h2>1. Carrying too many unbanked Bones</h2><p>Bones on your person are lost on death. Bank at vendors before every boss — especially without Proto Spark.</p>
    <h2>2. Using sidearms during exploration</h2><p>Sidearms cost Joules and disappear when you die. Save them for boss attempts.</p>
    <h2>3. Skipping NPC dialogue after each Spark</h2><p>Vendor stock and questlines unlock after restoring power. Many top trinkets are NPC rewards, not chest drops.</p>
    <h2>4. Entering Nox's Bayou without Thorn Harness</h2><p>Persistent poison makes the region brutal without 60% poison reduction. Farm it on Bone Beach first.</p>
    <h2>5. Delaying mirror activation</h2><p>Mirrors enable fast travel immediately. There is no benefit to saving them — activate on first discovery.</p>
  </div>
</main>
"@ },
  @{ File='hidden-mechanics.html'; Title='Hidden Mechanics'; Desc='Lesser-known systems in Mina the Hollower.'; Body=@"
<main class="page-wrap narrow">
  <div class="breadcrumb"><a href="../index.html">Home</a> / <a href="index.html">Blog</a> / Hidden Mechanics</div>
  <div class="section-divider"><h2>Hidden Mechanics</h2></div>
  <div class="article-body">
    <h2>Burrow invulnerability windows</h2><p>Many attacks whiff entirely if you burrow at the right moment. Shadowhide extends this by preventing burrow cancel on hit.</p>
    <h2>Plasma overflow</h2><p>Glutton's Jug (upgraded to Plasma Jug) lets Plasma exceed the normal cap — pair with Shock Flint for massive burst damage.</p>
    <h2>Black Market retroactive purchases</h2><p>Missable trinkets marked ⚠ can still be bought from the Black Market after meeting their unlock condition.</p>
    <h2>NG+ mode remixing</h2><p>Seven NG+ modes change more than HP scaling — item placement and world rules can shift between runs.</p>
  </div>
</main>
"@ },
  @{ File='boss-tier-list.html'; Title='Boss Tier List'; Desc='Boss difficulty tier list for Mina the Hollower.'; Body=@"
<main class="page-wrap narrow">
  <div class="breadcrumb"><a href="../index.html">Home</a> / <a href="index.html">Blog</a> / Boss Tier List</div>
  <div class="section-divider"><h2>Boss Tier List (First Clear)</h2></div>
  <div class="article-body">
    <p>Relative difficulty on a standard first playthrough — not NG+ or challenge runs.</p>
    <h2>S Tier — Brutal</h2><p><strong>Astral Gate Warden</strong> — Final gauntlet requiring all mirrors and optimal loadout.</p>
    <h2>A Tier — Hard</h2><p><strong>Nether Kraken, The Worm's Back, Worm Queen, Dark Deluxy</strong> — High pattern density or secret unlock requirements.</p>
    <h2>B Tier — Normal</h2><p><strong>Carving Man, Major Miner, Tide Caller</strong> — Learnable patterns with forgiving windows.</p>
    <p style="margin-top:1.5rem;"><a href="../database/bosses/index.html" style="color:var(--candle);">→ Full boss strategies in the database</a></p>
  </div>
</main>
"@ }
)

$blogCards = ($blogPosts | ForEach-Object {
  "    <a class=`"hub-card`" href=`"$($_.File)`"><h3>$($_.Title)</h3><p>$($_.Desc)</p></a>"
}) -join "`n"

$blogIndexBody = @"
<main class="page-wrap">
  <div class="breadcrumb"><a href="../index.html">Home</a> / Blog</div>
  <div class="section-divider"><h2>Blog &amp; Guides</h2></div>
  <p style="color:var(--bone-dark); font-size:0.9rem; margin-bottom:1rem; font-style:italic;">Long-form guides and searchable answers to the most common player questions.</p>
  <div class="hub-grid">
$blogCards
  </div>
</main>
"@
Write-Page 'blog/index.html' 'Blog' 'Guides and articles for Mina the Hollower.' $blogIndexBody -ActiveNav 'blog'
foreach ($post in $blogPosts) {
  Write-Page "blog/$($post.File)" $post.Title $post.Desc $post.Body -ActiveNav 'blog'
}

# ── TOOLS ──
# Extract quiz sidebar from source
if ($src -match '(?s)(<div class="sidebar-box" id="build-quiz".*?</div>\s*</div>)') { $quizHtml = $Matches[1] } else { $quizHtml = '<p>Quiz loading…</p>' }

$toolsIndexBody = @"
<main class="page-wrap">
  <div class="breadcrumb"><a href="../index.html">Home</a> / Tools</div>
  <div class="section-divider"><h2>Interactive Tools</h2></div>
  <div class="hub-grid">
    <a class="hub-card" href="build-quiz.html"><h3>⚡ Build Quiz</h3><p>Answer 3 questions — get your recommended weapon and 6 trinkets.</p></a>
    <a class="hub-card" href="build-planner.html"><h3>📋 Build Planner</h3><p>Pick loadout components and share a build URL.</p></a>
    <a class="hub-card" href="checklist.html"><h3>✓ 100% Checklist</h3><p>Track missables, trinkets, and secret bosses.</p></a>
    <a class="hub-card" href="checklist.html"><h3>🗺 Progress Tracker</h3><p>Mark regions, Sparks, and mirrors as you explore.</p></a>
  </div>
</main>
"@
Write-Page 'tools/index.html' 'Tools' 'Interactive tools for Mina the Hollower - build planner, quiz, checklist.' $toolsIndexBody -ActiveNav 'tools'

$quizBody = @"
<main class="page-wrap narrow">
  <div class="breadcrumb"><a href="../index.html">Home</a> / <a href="index.html">Tools</a> / Build Quiz</div>
  <div class="section-divider"><h2>⚡ Find Your Build</h2></div>
  <div class="sidebar-box" id="build-quiz" style="border-color:rgba(200,134,10,0.45); max-width:480px;">
    <div style="padding:1rem;" id="quiz-body">
      <p style="font-size:0.85rem; color:var(--bone-dark); margin-bottom:0.9rem;">Answer 3 questions — get your recommended weapon + 6 trinkets in 10 seconds.</p>
      <div id="q1">
        <p style="font-family:'Cinzel',serif; font-size:0.75rem; color:var(--candle); letter-spacing:0.08em; margin-bottom:0.5rem;">HOW DO YOU PREFER TO FIGHT?</p>
        <button class="quiz-btn" onclick="quizAnswer('style','aggro',this)">⚔ Get in close, hit fast</button>
        <button class="quiz-btn" onclick="quizAnswer('style','safe',this)">🏹 Keep distance, play safe</button>
        <button class="quiz-btn" onclick="quizAnswer('style','tank',this)">🛡 Absorb hits, counter hard</button>
      </div>
      <div id="q2" style="display:none;">
        <p style="font-family:'Cinzel',serif; font-size:0.75rem; color:var(--candle); letter-spacing:0.08em; margin-bottom:0.5rem;">WHAT KILLS YOU MOST OFTEN?</p>
        <button class="quiz-btn" onclick="quizAnswer('death','burst',this)">💥 Sudden burst damage</button>
        <button class="quiz-btn" onclick="quizAnswer('death','pits',this)">🕳 Falling into pits</button>
        <button class="quiz-btn" onclick="quizAnswer('death','multi',this)">👾 Too many enemies at once</button>
      </div>
      <div id="q3" style="display:none;">
        <p style="font-family:'Cinzel',serif; font-size:0.75rem; color:var(--candle); letter-spacing:0.08em; margin-bottom:0.5rem;">WHERE ARE YOU IN THE GAME?</p>
        <button class="quiz-btn" onclick="quizAnswer('progress','early',this)">🌱 Just started</button>
        <button class="quiz-btn" onclick="quizAnswer('progress','mid',this)">⚡ Mid-game (3+ Sparks)</button>
        <button class="quiz-btn" onclick="quizAnswer('progress','late',this)">🌟 Endgame / NG+</button>
      </div>
      <div id="quiz-result" style="display:none;"></div>
    </div>
  </div>
</main>
"@
Write-Page 'tools/build-quiz.html' 'Build Quiz' 'Find your ideal Mina the Hollower build in 3 questions.' $quizBody -ActiveNav 'tools'

$plannerBody = @"
<main class="page-wrap narrow">
  <div class="breadcrumb"><a href="../index.html">Home</a> / <a href="index.html">Tools</a> / Build Planner</div>
  <section aria-label="Build planner tool">$(Fix-Links $buildPlannerSection '../')</section>
</main>
"@
Write-Page 'tools/build-planner.html' 'Build Planner' 'Plan and share Mina the Hollower builds.' $plannerBody -ActiveNav 'tools'

$checklistBody = @"
<main class="page-wrap narrow">
  <div class="breadcrumb"><a href="../index.html">Home</a> / <a href="index.html">Tools</a> / Checklist</div>
  <div class="section-divider"><h2>100% Completion Checklist</h2></div>
  <p style="color:var(--bone-dark); font-size:0.9rem; margin-bottom:1rem; font-style:italic;">Track missables before they're gone. Progress saves in your browser.</p>
  <div id="checklist-app" style="display:flex; flex-direction:column; gap:0.5rem;"></div>
</main>
<script>
(function(){
  const items = [
    'Proto Spark (Queensbury Crypt quest)','Dead Leaf ⚠ (Kindelwood funeral)','Dark Deluxy secret boss',
    'All 3 Sparks restored','Mirror 1 activated','Mirror 2 activated','Mirror 3 activated',
    'Thorn Harness before Bayou','Mina\'s Grave quest','All 60 trinkets collected'
  ];
  const key = 'minaChecklist';
  const saved = JSON.parse(localStorage.getItem(key) || '{}');
  const app = document.getElementById('checklist-app');
  items.forEach(label => {
    const id = label.replace(/[^a-z0-9]+/gi,'-').toLowerCase();
    const wrap = document.createElement('label');
    wrap.style.cssText = 'display:flex;align-items:flex-start;gap:10px;padding:0.6rem 0.8rem;background:rgba(245,234,216,0.04);border:1px solid rgba(200,134,10,0.15);border-radius:3px;cursor:pointer;color:var(--bone);font-size:0.9rem;';
    const cb = document.createElement('input');
    cb.type = 'checkbox'; cb.checked = !!saved[id]; cb.style.accentColor = 'var(--candle)';
    cb.onchange = () => { saved[id] = cb.checked; localStorage.setItem(key, JSON.stringify(saved)); };
    wrap.appendChild(cb); wrap.appendChild(document.createTextNode(label)); app.appendChild(wrap);
  });
})();
</script>
"@
Write-Page 'tools/checklist.html' 'Checklist' '100% completion checklist for Mina the Hollower.' $checklistBody -ActiveNav 'tools'

$progressBody = @"
<main class="page-wrap narrow">
  <div class="breadcrumb"><a href="../index.html">Home</a> / <a href="index.html">Tools</a> / Progress</div>
  <div class="section-divider"><h2>Region Progress</h2></div>
  <p style="color:var(--bone-dark); font-size:0.9rem; margin-bottom:1rem; font-style:italic;">Mark regions as you clear them. Saved locally in your browser.</p>
  <div id="progress-app"></div>
  <div style="margin-top:2rem;" class="sidebar-box">
    <div class="sidebar-box-title">💀 Community Death Tracker</div>
    <div style="padding:0.9rem 1rem;">
      <div style="text-align:center; margin-bottom:0.8rem;">
        <div id="death-count" style="font-family:'Cinzel',serif; font-size:2rem; font-weight:700; color:var(--candle-light);">84,291</div>
        <div style="font-size:0.7rem; color:var(--bone-dark); font-family:'Cinzel',serif; letter-spacing:0.08em;">TOTAL COMMUNITY DEATHS</div>
      </div>
      <button onclick="addDeath()" style="width:100%; background:rgba(180,30,30,0.25); border:1px solid rgba(180,30,30,0.45); color:#e88080; font-family:'Cinzel',serif; font-size:0.72rem; letter-spacing:0.1em; text-transform:uppercase; padding:0.55rem; border-radius:3px; cursor:pointer;">+ I Just Died</button>
    </div>
  </div>
</main>
<script>
(function(){
  const regions = ['Ossex','Septemburg','Queensbury Crypt','Nox\'s Bayou','Bone Beach','Eastern Heath','Western Wilds','Astral Orrery'];
  const key = 'minaProgress'; const saved = JSON.parse(localStorage.getItem(key) || '{}');
  const app = document.getElementById('progress-app');
  regions.forEach(name => {
    const id = name.replace(/[^a-z0-9]+/gi,'-').toLowerCase();
    const row = document.createElement('label');
    row.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:0.7rem 1rem;margin-bottom:6px;background:rgba(245,234,216,0.04);border:1px solid rgba(200,134,10,0.15);border-radius:3px;cursor:pointer;color:var(--parchment);font-family:\'Cinzel\',serif;font-size:0.85rem;';
    const cb = document.createElement('input'); cb.type='checkbox'; cb.checked=!!saved[id]; cb.style.accentColor='var(--candle)';
    cb.onchange=()=>{saved[id]=cb.checked;localStorage.setItem(key,JSON.stringify(saved));};
    row.appendChild(document.createTextNode(name)); row.appendChild(cb); app.appendChild(row);
  });
})();
</script>
"@
Write-Page 'tools/checklist.html' 'Progress Tracker' 'Track region progress in Mina the Hollower.' $progressBody -ActiveNav 'tools'

# ── images placeholder ──
[System.IO.File]::WriteAllText((Join-Path $Root 'assets/images/.gitkeep'), '', [System.Text.UTF8Encoding]::new($false))

Write-Host "Site built at $Root"
Write-Host "  Pages: index, about, blog ($($blogPosts.Count + 1)), database, trinkets ($($trinkets.Count + 1)), bosses ($($bosses.Count + 1)), weapons, tools (5)"
