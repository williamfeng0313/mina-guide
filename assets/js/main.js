  // ── Search ──
  document.querySelector('.nav-search input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && this.value.trim()) {
      const q = this.value.trim().toLowerCase();
      const sectionMap = {
        boss: '#bosses', weapon: '#weapons', trinket: '#trinkets',
        area: '#areas', region: '#areas', tip: '#tips', guide: '#guides',
        beginner: '#tips', build: '#weapons', walkthrough: '#areas'
      };
      let target = '#guides';
      for (const [kw, href] of Object.entries(sectionMap)) {
        if (q.includes(kw)) { target = href; break; }
      }
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
      this.value = '';
    }
  });

  // ── Build Quiz ──
  const quizAnswers = {};
  const builds = {
    aggro_burst_early:  { weapon:'Whisper & Vesper', trinkets:['Vascular Syrup','Proto Spark','Brisk Brew','Blinkstep Claw','Iron Lung','Primed Vial Pouch'], tip:'Get in fast, pop Vascular Syrup before each boss. Proto Spark is your safety net.' },
    aggro_burst_mid:    { weapon:'Whisper & Vesper', trinkets:['Uranium Bracelet','Vascular Syrup','Chain Capacitor','Blinkstep Claw','Bellows Bustle','Evasion Powder'], tip:'Uranium Bracelet + Chain Capacitor makes daggers melt bosses. Risky but fast.' },
    aggro_burst_late:   { weapon:'Whisper & Vesper', trinkets:['Uranium Bracelet','Chain Capacitor','Wallower\'s Gauntlets','Blinkstep Claw','Vascular Syrup','Voltaic Guard'], tip:'Full aggro glass cannon. One-shot windows on every major boss.' },
    aggro_pits_early:   { weapon:'Nightstar', trinkets:['Keri the Wisp','Pit Preserver','Primed Vial Pouch','Vascular Syrup','Steady Soles','Proto Spark'], tip:'Keri + Pit Preserver = almost impossible to fall. Focus on range with Nightstar.' },
    aggro_pits_mid:     { weapon:'Nightstar', trinkets:['Keri the Wisp','Bellows Bustle','Pit Preserver','Chain Capacitor','Vascular Syrup','Evasion Powder'], tip:'Bellows Bustle air dash fixes most pit deaths mid-game. Keep whip for safe damage.' },
    aggro_pits_late:    { weapon:'Battery Buster', trinkets:['Wallower\'s Gauntlets','Bellows Bustle','Keri the Wisp','Voltaic Guard','Chain Capacitor','Evasion Powder'], tip:'Wallower\'s Gauntlets + Bellows Bustle = full aerial mobility. Pits become irrelevant.' },
    aggro_multi_early:  { weapon:'Nightstar', trinkets:['Seismic Belt','Repulsing Root','Primed Vial Pouch','Vascular Syrup','Proto Spark','Stolenoid'], tip:'Seismic Belt burrow pulse clears crowds instantly. Nightstar range handles the rest.' },
    aggro_multi_mid:    { weapon:'Blaststrike Maul', trinkets:['Seismic Belt','Repulsing Root','Bellows Bustle','Volatile Beastium','Vascular Syrup','Chain Capacitor'], tip:'Maul stagger + bomb drops from Volatile Beastium = crowd deletion.' },
    aggro_multi_late:   { weapon:'Blaststrike Maul', trinkets:['Seismic Belt','Volatile Beastium','Burning Beastium','Repulsing Root','Voltaic Guard','Chain Capacitor'], tip:'Three Beastium trinkets stack DoT, explosion, and AOE. Nothing survives.' },
    safe_burst_early:   { weapon:'Nightstar', trinkets:['Vascular Syrup','Primed Vial Pouch','Evasion Powder','Proto Spark','Bell of Grace','Steady Soles'], tip:'Maximum defensive kit. Vascular Syrup makes you near-unkillable early on.' },
    safe_burst_mid:     { weapon:'Battery Buster', trinkets:['Vascular Syrup','Evasion Powder','Shock Flint','Primed Vial Pouch','Bell of Grace','Intravenous Vial'], tip:'Shock Flint + Battery Buster from range trivializes most mid-game bosses.' },
    safe_burst_late:    { weapon:'Battery Buster', trinkets:['Shock Flint','Uranium Bracelet','Evasion Powder','Vial Salvo','Intravenous Vial','Vascular Syrup'], tip:'High risk/reward ranged build. Uranium Bracelet dramatically boosts Shock Flint damage.' },
    safe_pits_early:    { weapon:'Nightstar', trinkets:['Keri the Wisp','Pit Preserver','Steady Soles','Primed Vial Pouch','Proto Spark','Vascular Syrup'], tip:'Zero falling deaths possible with this setup. Take your time, use Nightstar range.' },
    safe_pits_mid:      { weapon:'Battery Buster', trinkets:['Bellows Bustle','Keri the Wisp','Pit Preserver','Shock Flint','Evasion Powder','Vascular Syrup'], tip:'Air dash + float + bounce = you never fall. Battery Buster clears from safety.' },
    safe_pits_late:     { weapon:'Battery Buster', trinkets:['Wallower\'s Gauntlets','Bellows Bustle','Keri the Wisp','Vial Salvo','Shock Flint','Voltaic Guard'], tip:'Full aerial + ranged late game. You barely need to touch the ground.' },
    safe_multi_early:   { weapon:'Nightstar', trinkets:['Repulsing Root','Seismic Belt','Primed Vial Pouch','Vascular Syrup','Stolenoid','Proto Spark'], tip:'Whip range + Repulsing Root keeps crowds off you. Stolenoid grabs all Bone pickups.' },
    safe_multi_mid:     { weapon:'Battery Buster', trinkets:['Shock Flint','Volatile Beastium','Repulsing Root','Seismic Belt','Vascular Syrup','Evasion Powder'], tip:'Ranged chaos — chain explosions from Volatile Beastium while Shock Flint picks stragglers.' },
    safe_multi_late:    { weapon:'Battery Buster', trinkets:['Shock Flint','Volatile Beastium','Burning Beastium','Vial Salvo','Voltaic Guard','Draining Beastium'], tip:'Three Beastium + Vial Salvo converts healing into AOE damage. Self-sustaining ranged chaos.' },
    tank_burst_early:   { weapon:'Blaststrike Maul', trinkets:['Vascular Syrup','Warding Beastium','Primed Vial Pouch','Proto Spark','Valor Medallion','Bubble Ring'], tip:'Warding Beastium + Valor Medallion lets you heal while moving. Maul stagger soaks hits.' },
    tank_burst_mid:     { weapon:'Guardian Casket', trinkets:['Bubble Ring','Vascular Syrup','Valor Medallion','Counter Vial','Evasion Powder','Bell of Grace'], tip:'Guardian Casket parry + Counter Vial = burst damage reflected back. Extremely satisfying.' },
    tank_burst_late:    { weapon:'Guardian Casket', trinkets:['Uranium Bracelet','Bubble Ring','Counter Vial','Voltaic Guard','Vascular Syrup','Blinking Glass'], tip:'Full parry tank. Uranium Bracelet makes counter hits devastating. High skill ceiling.' },
    tank_pits_early:    { weapon:'Blaststrike Maul', trinkets:['Pit Preserver','Steady Soles','Vascular Syrup','Proto Spark','Bubble Ring','Primed Vial Pouch'], tip:'Steady Soles means knockback into pits is nearly impossible. Maul is slow but safe.' },
    tank_pits_mid:      { weapon:'Guardian Casket', trinkets:['Bellows Bustle','Pit Preserver','Steady Soles','Bubble Ring','Counter Vial','Valor Medallion'], tip:'Air dash escape + parry counter. The safest mid-game setup available.' },
    tank_pits_late:     { weapon:'Guardian Casket', trinkets:['Wallower\'s Gauntlets','Bellows Bustle','Steady Soles','Counter Vial','Voltaic Guard','Blinking Glass'], tip:'Blink dodge + parry + wall-burrow = total positional control. Nothing touches you.' },
    tank_multi_early:   { weapon:'Blaststrike Maul', trinkets:['Seismic Belt','Repulsing Root','Bubble Ring','Vascular Syrup','Proto Spark','Stolenoid'], tip:'Maul + Seismic Belt pulse clears rooms. Repulsing Root prevents being surrounded.' },
    tank_multi_mid:     { weapon:'Guardian Casket', trinkets:['Seismic Belt','Volatile Beastium','Bubble Ring','Counter Vial','Repulsing Root','Valor Medallion'], tip:'Parry tank that explodes enemies on death. Extremely safe crowd-control loop.' },
    tank_multi_late:    { weapon:'Guardian Casket', trinkets:['Seismic Belt','Volatile Beastium','Burning Beastium','Counter Vial','Voltaic Guard','Wallower\'s Gauntlets'], tip:'Final-form parry build. Three AoE sources + Voltaic Guard makes you a walking explosion.' },
  };

  function quizAnswer(key, val, btn) {
    quizAnswers[key] = val;
    btn.parentElement.querySelectorAll('.quiz-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    setTimeout(() => {
      const steps = { style: ['q1','q2'], death: ['q2','q3'], progress: ['q3','quiz-result'] };
      const [cur, nxt] = steps[key];
      document.getElementById(cur).style.display = 'none';
      if (nxt === 'quiz-result') showResult();
      else document.getElementById(nxt).style.display = 'block';
    }, 250);
  }

  function showResult() {
    const k = `${quizAnswers.style}_${quizAnswers.death}_${quizAnswers.progress}`;
    const b = builds[k] || builds['safe_burst_early'];
    const el = document.getElementById('quiz-result');
    el.style.display = 'block';
    el.innerHTML = `
      <div class="quiz-result-box">
        <h4>⚡ YOUR BUILD</h4>
        <div style="margin-bottom:0.5rem;">
          <span style="font-size:0.72rem; color:var(--bone-dark); font-family:'Cinzel',serif; letter-spacing:0.06em;">WEAPON</span><br>
          <span style="font-family:'IM Fell English',serif; font-size:1rem; color:var(--parchment);">${b.weapon}</span>
        </div>
        <div style="margin-bottom:0.6rem;">
          <span style="font-size:0.72rem; color:var(--bone-dark); font-family:'Cinzel',serif; letter-spacing:0.06em;">6 TRINKETS</span><br>
          <div style="margin-top:4px;">${b.trinkets.map(t => `<span class="quiz-trinket-pill">${t}</span>`).join('')}</div>
        </div>
        <p style="font-size:0.8rem; color:var(--bone-dark); line-height:1.5; font-style:italic; margin-bottom:0.6rem;">${b.tip}</p>
        <button class="share-btn" onclick="shareResult('${b.weapon}')">📤 Share this build →</button>
        <button onclick="resetQuiz()" style="display:block; width:100%; margin-top:6px; background:transparent; border:1px solid rgba(200,134,10,0.2); color:var(--bone-dark); font-family:'Cinzel',serif; font-size:0.7rem; letter-spacing:0.08em; padding:0.4rem; border-radius:3px; cursor:pointer;">↩ Retake quiz</button>
      </div>`;
  }

  function resetQuiz() {
    Object.keys(quizAnswers).forEach(k => delete quizAnswers[k]);
    ['q1','q2','q3','quiz-result'].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.style.display = id === 'q1' ? 'block' : 'none'; }
    });
    document.querySelectorAll('.quiz-btn').forEach(b => b.classList.remove('selected'));
  }

  function shareResult(weapon) {
    const text = `I got "${weapon}" as my Mina the Hollower build — take the quiz yourself: ${window.location.href}`;
    if (navigator.share) { navigator.share({ title: 'Mina Build Quiz', text, url: window.location.href }); }
    else { navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard! Share it anywhere.\
\n' + text)); }
  }

  // ── Death Counter ──
  let deaths = parseInt(localStorage.getItem('minaDeaths') || '84291');
  function updateCounter() { document.getElementById('death-count').textContent = deaths.toLocaleString(); }
  function addDeath() {
    deaths++;
    localStorage.setItem('minaDeaths', deaths);
    updateCounter();
    const btn = document.querySelector('button[onclick="addDeath()"]');
    const orig = btn.textContent;
    btn.textContent = '💀 Noted. You\'ll get 'em next time.';
    setTimeout(() => btn.textContent = orig, 2000);
  }
  updateCounter();

  // ── Build Planner ──
  const TRINKET_LIST = [
    'Proto Spark','Vascular Syrup','Iron Lung','Keri the Wisp','Thorn Harness',
    'Blinkstep Claw','Marrow Flask','Shadowhide','Brisk Brew','Uranium Bracelet',
    'Shock Flint','Bubble Ring','Counter Vial','Chain Capacitor','Evasion Powder',
    'Bellows Bustle','Seismic Belt','Repulsing Root','Volatile Beastium','Burning Beastium',
    'Draining Beastium','Voltaic Guard','Pit Preserver','Tumbling Tutu','Bell of Grace',
    'Valor Medallion','Warding Beastium','Thermal Pack','Deboning Wand','Steady Soles',
    'Pneumatic Armlet','Windfall Charm','Willow the Wisp','Helio the Wisp','Flame Guard',
    'Dummy Cache','Dead Leaf','Lace Glove','Spike Spurs','Desperation Bonnet',
    'Stolenoid','Fly Bait','Wallower\'s Gauntlets','Spring Heels','Niter Belt',
    'Dodging Pendulum','Primed Vial Pouch','Twill Weave','Smelling Salts','Intravenous Vial',
    'Plasma Funnel','Vial Salvo','Watchful Eye','Blinking Glass','Polyp Lamp',
    'Bridge Weaver','Starving Beastium','Spark Catcher','Glutton\'s Jug','Bubble Ring'
  ];
  const plannerContainer = document.getElementById('planner-trinkets');
  if (plannerContainer) {
    plannerContainer.innerHTML = TRINKET_LIST.map(t =>
      `<label style="display:flex;align-items:center;gap:6px;font-size:0.82rem;color:var(--bone);cursor:pointer;padding:3px 4px;border-radius:2px;transition:background 0.1s;" onmouseover="this.style.background='rgba(200,134,10,0.08)'" onmouseout="this.style.background='transparent'">
        <input type="checkbox" value="${t}" onchange="updatePlanner()" style="accent-color:var(--candle);"> ${t}
      </label>`
    ).join('');
  }

  function updatePlanner() {
    const weapon = document.getElementById('planner-weapon')?.value || '';
    const sidearm = document.getElementById('planner-sidearm')?.value || '';
    const checked = [...document.querySelectorAll('#planner-trinkets input:checked')].map(i=>i.value);
    const countEl = document.getElementById('trinket-count');
    if (countEl) countEl.textContent = `(${checked.length} / 6 selected)`;
    if (checked.length > 6) {
      const last = document.querySelector('#planner-trinkets input:checked:last-of-type');
      if (last) { last.checked = false; return; }
    }
    const summary = document.getElementById('planner-summary');
    if (!weapon && checked.length === 0) { summary.textContent = 'Select a weapon and at least one trinket to generate your build.'; return; }
    const parts = [];
    if (weapon) parts.push(`⚔ ${weapon}`);
    if (sidearm) parts.push(`🏹 ${sidearm}`);
    if (checked.length) parts.push(`💎 ${checked.join(' · ')}`);
    summary.innerHTML = parts.join('<br>');
    const params = new URLSearchParams();
    if (weapon) params.set('w', weapon);
    if (sidearm) params.set('s', sidearm);
    if (checked.length) params.set('t', checked.join(','));
    const urlInput = document.getElementById('planner-url');
    if (urlInput) urlInput.value = `${window.location.origin}${window.location.pathname}?build=${btoa(params.toString())}`;
  }

  function copyBuildUrl() {
    const url = document.getElementById('planner-url')?.value;
    if (!url || url === '') return;
    navigator.clipboard.writeText(url).then(() => {
      const btn = document.getElementById('copy-btn');
      btn.textContent = '✓ Copied!';
      setTimeout(() => btn.textContent = '📋 Copy URL', 2000);
    });
  }

  function shareForum(platform) { shareToForum(platform, document.getElementById('planner-url')?.value); }

  // ── Forum share ──
  function shareToForum(platform, url) {
    const shareUrl = url || window.location.href;
    const title = 'Mina the Hollower — Complete Guide & Build Planner';
    const text = 'Found this guide super useful for Mina the Hollower — covers all 60 trinkets, best builds, and has a shareable build planner tool: ';
    const targets = {
      reddit: `https://www.reddit.com/r/MinaTheHollower/submit?type=link&title=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
      discord: null,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text + shareUrl)}`
    };
    if (platform === 'discord') {
      navigator.clipboard.writeText(text + shareUrl).then(() => {
        const btn = document.getElementById('footer-copy-btn') || document.querySelector('button[onclick*="discord"]');
        if (btn) { const o=btn.textContent; btn.textContent='✓ Copied for Discord!'; setTimeout(()=>btn.textContent=o,2500); }
      });
      return;
    }
    if (targets[platform]) window.open(targets[platform], '_blank', 'width=700,height=500');
  }

  function copyPageUrl() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      const btn = document.getElementById('footer-copy-btn');
      if (btn) { const o=btn.textContent; btn.textContent='✓ Copied!'; setTimeout(()=>btn.textContent=o,2000); }
    });
  }

  // ── Vote Up ──
  function voteUp(btn, base) {
    const span = btn.querySelector('span');
    const cur = parseInt(span.textContent);
    span.textContent = cur + 1;
    btn.disabled = true;
    btn.style.opacity = '0.5';
  }

  // ── Build Planner: read URL params on load ──
  (function loadBuildFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const b = params.get('build');
    if (!b) return;
    try {
      const p = new URLSearchParams(atob(b));
      const w = p.get('w'); const s = p.get('s'); const t = p.get('t');
      const wEl = document.getElementById('planner-weapon');
      const sEl = document.getElementById('planner-sidearm');
      if (wEl && w) { [...wEl.options].forEach(o => { if (o.value===w) o.selected=true; }); }
      if (sEl && s) { [...sEl.options].forEach(o => { if (o.value===s) o.selected=true; }); }
      if (t) { t.split(',').forEach(name => {
        const cb = document.querySelector(`#planner-trinkets input[value="${name}"]`);
        if (cb) cb.checked = true;
      }); }
      setTimeout(updatePlanner, 100);
      document.getElementById('build-planner')?.scrollIntoView({behavior:'smooth'});
    } catch(e){}
  })();

  // ── Submit Build (UGC) ──
  function submitBuild() {
    const name = document.getElementById('sub-name')?.value.trim();
    const author = document.getElementById('sub-author')?.value.trim() || 'Anonymous';
    const loadout = document.getElementById('sub-loadout')?.value.trim();
    const desc = document.getElementById('sub-desc')?.value.trim();
    const msg = document.getElementById('sub-msg');
    if (!name || !loadout) { msg.textContent = 'Please fill in the build name and loadout.'; msg.style.color='#e88080'; return; }
    // In production this would POST to a backend; for now, append to DOM
    const list = document.getElementById('community-builds-list');
    const card = document.createElement('div');
    card.style.cssText = 'background:rgba(245,234,216,0.05);border:1px solid rgba(200,134,10,0.3);border-radius:4px;padding:1rem 1.2rem;animation:fadeIn 0.3s ease;';
    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;margin-bottom:0.5rem;">
        <div><span style="font-family:'IM Fell English',serif;font-size:1rem;color:var(--parchment);">${name}</span><span style="font-size:0.72rem;color:var(--bone-dark);margin-left:8px;">by <em>${author}</em> · just now</span></div>
        <button onclick="voteUp(this,0)" style="background:rgba(200,134,10,0.12);border:1px solid rgba(200,134,10,0.3);color:var(--candle-light);font-size:0.78rem;padding:3px 10px;border-radius:2px;cursor:pointer;">▲ <span>0</span></button>
      </div>
      <div style="font-size:0.82rem;color:var(--candle-pale);margin-bottom:0.5rem;">${loadout}</div>
      ${desc ? `<p style="font-size:0.82rem;color:var(--bone-dark);line-height:1.5;">"${desc}"</p>` : ''}`;
    list.prepend(card);
    ['sub-name','sub-author','sub-loadout','sub-desc'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
    msg.textContent = '✓ Build submitted! Thanks for contributing.';
    msg.style.color = 'var(--candle-light)';
    setTimeout(()=>msg.textContent='', 4000);
  }  function filterTrinkets(area) {
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