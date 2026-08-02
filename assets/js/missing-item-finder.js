/* Missing Item Finder — tools/what-am-i-missing.html */
"use strict";

/* ================================================================
   1. LANDMARKS
   Add or rename landmark buttons here.
   ================================================================ */
const LANDMARKS = {
  sandfalls: [
    { value: "sandy-station", label: "Sandy Station" },
    { value: "niter-belt-bomb-puzzle", label: "Niter Belt Bomb Puzzle" },
    { value: "ring-dive-parlor", label: "Ring Dive Parlor" },
    { value: "moving-platforms", label: "Moving Platforms" },
    { value: "western-minecart-route", label: "Western Minecart Route" },
    { value: "npc-house", label: "NPC House" },
    { value: "not-sure", label: "Not Sure" }
  ],
  "bone-beach": [
    { value: "region-entrance", label: "Region Entrance / Mr. Furgus" },
    { value: "conveyor-rooms", label: "Conveyor Rooms" },
    { value: "hide-tent", label: "Hide Tent" },
    { value: "secret-shoals", label: "Secret Shoals" },
    { value: "calcified-caves", label: "Calcified Caves" },
    { value: "worms-back", label: "Worm's Back" },
    { value: "stomach-mine", label: "Stomach Mine" },
    { value: "gut-depths", label: "Gut Depths" },
    { value: "brain-alcove", label: "Brain Alcove" },
    { value: "not-sure", label: "Not Sure" }
  ]
};

/* ================================================================
   2. ITEM DATA — MVP

   This first version deliberately covers high-frequency misses instead
   of pretending to diagnose every collectible. To add an item, duplicate
   one object and keep every id unique.

   category: bonestone | trinket | kear | upgrade-other
   landmarks: values from LANDMARKS above
   signals: red | blue | yellow-orange | region-only | no-skull
   ================================================================ */
const ITEM_DATA = [
  {
    id: "sandfalls-volatile-beastium",
    region: "sandfalls",
    category: "trinket",
    title: "Volatile Beastium",
    landmarks: ["sandy-station"],
    signals: ["yellow-orange", "red", "region-only", "no-skull"],
    highMiss: true,
    requirement: "700 Bones",
    location: "Vitas on the moving train, between the passenger carriage and locomotive.",
    reason: "The Sandy Station Skull can flicker yellow/orange for this off-screen train purchase, so normal room searching does not solve it.",
    route: "Use the train route toward Nox's Bayou. Move forward through the train, find Vitas between the passenger carriage and locomotive, then buy the Trinket for 700 Bones.",
    guideUrl: "../database/trinkets/volatile-beastium.html"
  },
  {
    id: "sandfalls-niter-belt",
    region: "sandfalls",
    category: "trinket",
    title: "Niter Belt",
    landmarks: ["niter-belt-bomb-puzzle", "western-minecart-route"],
    signals: ["red", "blue", "region-only", "no-skull"],
    highMiss: true,
    requirement: "A Kear to enter the puzzle route",
    location: "At the end of the Sandfalls bomb-routing puzzle behind the red minecarts.",
    reason: "Players often open only the first route and leave before guiding the bomb through the full puzzle.",
    route: "Enter the locked bomb-puzzle room, use the floor buttons to guide the bomb into the red minecarts, then continue north across the cleared sand to the Trinket.",
    guideUrl: "../database/trinkets/niter-belt.html"
  },
  {
    id: "sandfalls-western-hidden-bonestone",
    region: "sandfalls",
    category: "bonestone",
    title: "Western Minecart Hidden Bonestone",
    landmarks: ["western-minecart-route", "moving-platforms"],
    signals: ["red", "blue", "region-only", "no-skull"],
    highMiss: true,
    requirement: "Carry a bomb across the moving sand",
    location: "Inside a hidden gap revealed after taking a bomb south to the lower wall.",
    reason: "The route asks you to carry a bomb away from the obvious minecarts, so the hidden opening is easy to miss.",
    route: "Take the north-west bomb east onto the moving sand, carry it south to the lower wall, enter the revealed gap, and open the chest inside.",
    guideUrl: "../blog/sandfalls-all-collectibles.html"
  },
  {
    id: "bone-beach-entrance-wall-bonestone",
    region: "bone-beach",
    category: "bonestone",
    title: "Entrance Wall Bonestone",
    landmarks: ["region-entrance"],
    signals: ["red", "blue", "region-only", "no-skull"],
    highMiss: false,
    requirement: "Heal the injured NPC, then use the hidden gap",
    location: "Behind the breakable wall and burrow gap near the Bone Beach entrance.",
    reason: "The wall is behind an NPC and the route continues underneath him, making the chest look inaccessible.",
    route: "Heal the injured NPC, break the wall behind him, then burrow through the gap below to reach the chest.",
    guideUrl: "../blog/bone-beach-all-collectibles.html"
  },
  {
    id: "bone-beach-conveyor-bonestone",
    region: "bone-beach",
    category: "bonestone",
    title: "Conveyor Room Bonestone",
    landmarks: ["conveyor-rooms"],
    signals: ["red", "blue", "region-only", "no-skull"],
    highMiss: true,
    requirement: "Re-enter from the lower room and use the purple launchers",
    location: "On the high east ledge in the large conveyor room.",
    reason: "The chest is visible before the correct route is obvious; the upper ledge must be reached from the room below.",
    route: "Go south, reveal and climb the rope, re-enter the conveyor room, then bounce across the purple launchers until you can reach the east ledge and burrow for the Bonestone.",
    guideUrl: "../blog/bone-beach-all-collectibles.html"
  },
  {
    id: "bone-beach-joule-syringe",
    region: "bone-beach",
    category: "trinket",
    title: "Joule Syringe",
    landmarks: ["secret-shoals", "calcified-caves"],
    signals: ["red", "blue", "region-only", "no-skull"],
    highMiss: true,
    requirement: "Burrow behind the tree",
    location: "On the Secret Shoals island, buried behind the tree near the stranded NPC.",
    reason: "There is no obvious chest in view; the Trinket is hidden underground behind the tree.",
    route: "From the water below the mining camp, enter Secret Shoals, cross the barrels to the island, stand behind the tree, and burrow.",
    guideUrl: "../database/trinkets/joule-syringe.html"
  },
  {
    id: "bone-beach-battery-buster-upgrade",
    region: "bone-beach",
    category: "upgrade-other",
    title: "Battery Buster Upgrade",
    landmarks: ["worms-back", "hide-tent"],
    signals: ["red", "blue", "region-only", "no-skull"],
    highMiss: false,
    requirement: "Bounce across four purple launchers",
    location: "In a red chest reached from Worm's Back.",
    reason: "The route starts above the normal path and requires committing to a chain of four launcher bounces.",
    route: "On Worm's Back, move to the north-east edge, bounce across all four purple launchers, then leave through the west exit to reach the red chest.",
    guideUrl: "../blog/bone-beach-all-collectibles.html"
  },
  {
    id: "bone-beach-stomach-mine-kear",
    region: "bone-beach",
    category: "kear",
    title: "Stomach Mine Kear",
    landmarks: ["stomach-mine"],
    signals: ["red", "blue", "region-only", "no-skull"],
    highMiss: false,
    requirement: "Activate the launcher button",
    location: "In the closed south-east section beneath Stomach Mine.",
    reason: "The Kear is below the main room and the launcher that reaches it must be created with a separate button.",
    route: "Drop into the south-east section, use the purple launchers to reach the Kear, and use the nearby button if the required launcher is not active.",
    guideUrl: "../blog/bone-beach-all-collectibles.html"
  },
  {
    id: "bone-beach-bonestone-11-moving-stairs",
    region: "bone-beach",
    category: "bonestone",
    title: "Bonestone #11 — Moving Staircase",
    landmarks: ["gut-depths"],
    signals: ["blue", "red", "region-only", "no-skull"],
    highMiss: true,
    requirement: "Stay on the retracting staircase",
    location: "In the hidden room carried into view by the moving stairs in Gut Depths.",
    reason: "This is a documented high-frequency miss. The Skull can point from an unintuitive nearby screen, while the staircase itself looks like part of the normal moving-room hazard.",
    route: "After the Gut Depths Underlab, continue through the moving walls. When you reach the retracting stairs, remain on them as they move right into the hidden room, then burrow at the far-right end.",
    guideUrl: "../blog/bone-beach-all-collectibles.html"
  },
  {
    id: "bone-beach-bonestone-12-dark-tunnel",
    region: "bone-beach",
    category: "bonestone",
    title: "Bonestone #12 — Dark Tunnel",
    landmarks: ["gut-depths", "brain-alcove"],
    signals: ["red", "blue", "region-only", "no-skull"],
    highMiss: true,
    requirement: "Enter the left-wall gap and break teeth in darkness",
    location: "At the far end of the hidden dark tunnel in the late Gut Depths rail section.",
    reason: "The entrance is a small left-wall gap during a moving platform section, and the chest is hidden deep in darkness.",
    route: "During the later Gut Depths rail segment, stop at the moving wood-and-metal platforms, enter the gap in the left wall, break the teeth blocking the dark passage, and follow it to the chest.",
    guideUrl: "../blog/bone-beach-all-collectibles.html"
  }
];

const LABELS = {
  regions: {
    sandfalls: "Sandfalls",
    "bone-beach": "Bone Beach"
  },
  categories: {
    bonestone: "Bonestone",
    trinket: "Trinket",
    kear: "Kear",
    "upgrade-other": "Upgrade / Other",
    "not-sure": "Not Sure"
  },
  signals: {
    red: "Red eyes",
    blue: "Blue eyes",
    "yellow-orange": "Yellow / orange flicker",
    "region-only": "Region only",
    "no-skull": "No Skull"
  }
};

const state = {
  region: null,
  category: null,
  signal: null,
  landmark: null,
  rejected: new Set()
};

const elements = {
  categoryStep: document.getElementById("category-step"),
  signalStep: document.getElementById("signal-step"),
  landmarkStep: document.getElementById("landmark-step"),
  landmarkOptions: document.getElementById("landmark-options"),
  backButton: document.getElementById("back-button"),
  resetButton: document.getElementById("reset-button"),
  results: document.getElementById("results"),
  resultList: document.getElementById("result-list"),
  resultSummary: document.getElementById("result-summary"),
  shareButton: document.getElementById("share-button"),
  toast: document.getElementById("toast")
};

function selectChoice(group, value, options = {}) {
  const { fromUrl = false } = options;
  document.querySelectorAll(`[data-group="${group}"]`).forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.value === value));
  });

  if (group === "region") {
    state.region = value;
    state.category = null;
    state.signal = null;
    state.landmark = null;
    state.rejected.clear();
    clearPressed("category");
    clearPressed("signal");
    elements.categoryStep.hidden = false;
    elements.signalStep.hidden = true;
    elements.landmarkStep.hidden = true;
    hideResults();
    if (!fromUrl) elements.categoryStep.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  if (group === "category") {
    state.category = value;
    state.signal = null;
    state.landmark = null;
    state.rejected.clear();
    clearPressed("signal");
    elements.signalStep.hidden = false;
    elements.landmarkStep.hidden = true;
    hideResults();
    if (!fromUrl) elements.signalStep.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  if (group === "signal") {
    state.signal = value;
    state.landmark = null;
    state.rejected.clear();
    const needsLandmark = value === "red" || value === "blue";

    if (needsLandmark) {
      renderLandmarks();
      elements.landmarkStep.hidden = false;
      hideResults();
      if (!fromUrl) elements.landmarkStep.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } else {
      elements.landmarkStep.hidden = true;
      renderResults();
    }
  }

  if (group === "landmark") {
    state.landmark = value;
    state.rejected.clear();
    renderResults();
  }

  updateProgress();
  updateUrl();
}

function clearPressed(group) {
  document.querySelectorAll(`[data-group="${group}"]`).forEach((button) => {
    button.setAttribute("aria-pressed", "false");
  });
}

function renderLandmarks() {
  const landmarks = LANDMARKS[state.region] || [];
  elements.landmarkOptions.innerHTML = landmarks.map((landmark) => `
    <button
      class="finder-choice"
      type="button"
      data-group="landmark"
      data-value="${escapeHtml(landmark.value)}"
      aria-pressed="${state.landmark === landmark.value}"
    >
      <span class="finder-choice__title">${escapeHtml(landmark.label)}</span>
    </button>
  `).join("");
}

function scoreItem(item) {
  let score = 10;

  if (state.category !== "not-sure" && item.category === state.category) score += 35;
  if (item.signals.includes(state.signal)) score += 12;
  if (item.highMiss) score += 8;

  if (state.landmark && state.landmark !== "not-sure") {
    if (item.landmarks.includes(state.landmark)) {
      score += 55;
    } else {
      score -= 8;
    }
  }

  if (state.signal === "yellow-orange") {
    score += item.id === "sandfalls-volatile-beastium" ? 100 : -40;
  }

  if (state.signal === "blue" && item.id === "bone-beach-bonestone-11-moving-stairs") {
    score += 15;
  }

  return score;
}

function getCandidates() {
  return ITEM_DATA
    .filter((item) => item.region === state.region)
    .filter((item) => state.category === "not-sure" || item.category === state.category)
    .filter((item) => !state.rejected.has(item.id))
    .map((item) => ({ ...item, score: scoreItem(item) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function renderResults() {
  if (!state.region || !state.category || !state.signal) return;
  if ((state.signal === "red" || state.signal === "blue") && !state.landmark) return;

  const candidates = getCandidates();
  const regionName = LABELS.regions[state.region];
  const categoryName = LABELS.categories[state.category];
  const signalName = LABELS.signals[state.signal];

  elements.resultSummary.textContent = `${regionName} · ${categoryName} · ${signalName}`;

  if (!candidates.length) {
    const guideUrl = state.region === "sandfalls"
      ? "../blog/sandfalls-all-collectibles.html"
      : "../blog/bone-beach-all-collectibles.html";

    elements.resultList.innerHTML = `
      <div class="finder-empty">
        <h3>No exact candidate remains in the beta database.</h3>
        <p>You may have ruled out every mapped high-frequency miss. Use the full regional checklist rather than accepting a guessed answer.</p>
        <a class="finder-button finder-button--primary" href="${guideUrl}">Open the full ${escapeHtml(regionName)} guide</a>
      </div>
    `;
  } else {
    elements.resultList.innerHTML = candidates.map((item, index) => resultCard(item, index)).join("");
  }

  elements.results.hidden = false;
  elements.backButton.hidden = false;
  updateProgress();
  updateUrl();

  if (window.gtag) {
    window.gtag("event", "missing_item_results", {
      region: state.region,
      category: state.category,
      signal: state.signal,
      landmark: state.landmark || "none",
      result_count: candidates.length
    });
  }

  requestAnimationFrame(() => {
    elements.results.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function resultCard(item, index) {
  const rank = index === 0 ? "Most likely" : `Alternative ${index + 1}`;
  const matchText = buildMatchText(item);
  const categoryLabel = LABELS.categories[item.category];
  const regionLabel = LABELS.regions[item.region];

  return `
    <article class="finder-result-card ${index === 0 ? "is-top" : ""}" data-result-id="${escapeHtml(item.id)}">
      <div class="finder-result-card__body">
        <p class="finder-result-card__rank">${rank}</p>
        <h3>${escapeHtml(item.title)}</h3>
        <div class="finder-tags">
          <span class="finder-tag">${escapeHtml(regionLabel)}</span>
          <span class="finder-tag">${escapeHtml(categoryLabel)}</span>
          ${item.highMiss ? '<span class="finder-tag">Common miss</span>' : ""}
        </div>

        <div class="finder-result-grid">
          <div class="finder-result-block finder-result-block--wide">
            <h4>Why this matches</h4>
            <p>${escapeHtml(matchText)}</p>
          </div>
          <div class="finder-result-block">
            <h4>Where</h4>
            <p>${escapeHtml(item.location)}</p>
          </div>
          <div class="finder-result-block">
            <h4>Requires</h4>
            <p>${escapeHtml(item.requirement)}</p>
          </div>
          <div class="finder-result-block finder-result-block--wide">
            <h4>Shortest route</h4>
            <p>${escapeHtml(item.route)}</p>
          </div>
        </div>
      </div>

      <div class="finder-result-card__actions">
        <a class="finder-button finder-button--primary" href="${escapeHtml(item.guideUrl)}">View exact route</a>
        <button class="finder-button" type="button" data-action="reject" data-id="${escapeHtml(item.id)}">Already have this</button>
        <button class="finder-button" type="button" data-action="found" data-id="${escapeHtml(item.id)}">Found it</button>
      </div>
    </article>
  `;
}

function buildMatchText(item) {
  const pieces = [item.reason];

  if (state.landmark && item.landmarks.includes(state.landmark)) {
    const selectedLandmark = (LANDMARKS[state.region] || []).find((entry) => entry.value === state.landmark);
    if (selectedLandmark) pieces.push(`It also matches your ${selectedLandmark.label} landmark.`);
  }

  if (state.signal === "red") {
    pieces.push("Because you selected red eyes, inspect the current screen before moving farther away.");
  }

  if (state.signal === "blue") {
    pieces.push("Because you selected blue eyes, follow the connected exit or hidden transition near this landmark.");
  }

  return pieces.join(" ");
}

function rejectCandidate(id) {
  state.rejected.add(id);
  renderResults();
  showToast("Removed. Showing the next best candidate.");
}

function markFound(id) {
  const item = ITEM_DATA.find((entry) => entry.id === id);
  if (!item) return;

  const saved = JSON.parse(localStorage.getItem("mina-missing-finder-found") || "[]");
  if (!saved.includes(id)) saved.push(id);
  localStorage.setItem("mina-missing-finder-found", JSON.stringify(saved));

  elements.resultList.innerHTML = `
    <div class="finder-success-message">
      <h3>Found: ${escapeHtml(item.title)}</h3>
      <p>Your result was saved on this device. If the route text was inaccurate, verify the full regional guide before editing the finder data.</p>
      <div class="finder-actions">
        <a class="finder-button finder-button--primary" href="${escapeHtml(item.guideUrl)}">Open full route</a>
        <button class="finder-button" type="button" data-action="restart">Find another item</button>
      </div>
    </div>
  `;

  if (window.gtag) {
    window.gtag("event", "missing_item_found", {
      item_id: item.id,
      region: item.region,
      category: item.category
    });
  }
}

function goBack() {
  if (!elements.results.hidden) {
    hideResults();
    if (state.signal === "red" || state.signal === "blue") {
      state.landmark = null;
      clearPressed("landmark");
      updateUrl();
      elements.landmarkStep.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    return;
  }

  if (state.signal) {
    state.signal = null;
    state.landmark = null;
    clearPressed("signal");
    elements.landmarkStep.hidden = true;
    updateProgress();
    updateUrl();
    return;
  }

  if (state.category) {
    state.category = null;
    clearPressed("category");
    elements.signalStep.hidden = true;
    updateProgress();
    updateUrl();
  }
}

function resetFinder(options = {}) {
  const { keepUrl = false } = options;
  state.region = null;
  state.category = null;
  state.signal = null;
  state.landmark = null;
  state.rejected.clear();
  ["region", "category", "signal", "landmark"].forEach(clearPressed);
  elements.categoryStep.hidden = true;
  elements.signalStep.hidden = true;
  elements.landmarkStep.hidden = true;
  elements.backButton.hidden = true;
  hideResults();
  updateProgress();
  if (!keepUrl) history.replaceState({}, "", window.location.pathname);
  document.getElementById("region-step").scrollIntoView({ behavior: "smooth", block: "start" });
}

function hideResults() {
  elements.results.hidden = true;
  elements.resultList.innerHTML = "";
  elements.backButton.hidden = !state.category;
}

function updateProgress() {
  const completed = [Boolean(state.region), Boolean(state.category), Boolean(state.signal)];
  document.querySelectorAll("[data-progress]").forEach((node, index) => {
    node.classList.toggle("is-complete", completed[index]);
    const priorComplete = index === 0 || completed[index - 1];
    node.classList.toggle("is-active", !completed[index] && priorComplete);
  });
  elements.backButton.hidden = !state.category && elements.results.hidden;
}

function updateUrl() {
  const url = new URL(window.location.href);
  ["region", "category", "signal", "landmark"].forEach((key) => {
    if (state[key]) url.searchParams.set(key, state[key]);
    else url.searchParams.delete(key);
  });
  history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

function loadFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const region = params.get("region");
  const category = params.get("category");
  const signal = params.get("signal");
  const landmark = params.get("landmark");

  if (!LANDMARKS[region]) return;
  selectChoice("region", region, { fromUrl: true });

  if (!Object.prototype.hasOwnProperty.call(LABELS.categories, category)) return;
  selectChoice("category", category, { fromUrl: true });

  if (!Object.prototype.hasOwnProperty.call(LABELS.signals, signal)) return;
  selectChoice("signal", signal, { fromUrl: true });

  if ((signal === "red" || signal === "blue") && LANDMARKS[region].some((item) => item.value === landmark)) {
    renderLandmarks();
    selectChoice("landmark", landmark, { fromUrl: true });
  }
}

async function copySearch() {
  const shareUrl = window.location.href;
  try {
    await navigator.clipboard.writeText(shareUrl);
    showToast("Search link copied.");
  } catch (error) {
    const input = document.createElement("textarea");
    input.value = shareUrl;
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
    showToast("Search link copied.");
  }
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    elements.toast.hidden = true;
  }, 2400);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.addEventListener("click", (event) => {
  const choice = event.target.closest("[data-group]");
  if (choice) {
    selectChoice(choice.dataset.group, choice.dataset.value);
    return;
  }

  const action = event.target.closest("[data-action]");
  if (!action) return;

  if (action.dataset.action === "reject") rejectCandidate(action.dataset.id);
  if (action.dataset.action === "found") markFound(action.dataset.id);
  if (action.dataset.action === "restart") resetFinder();
});

elements.backButton.addEventListener("click", goBack);
elements.resetButton.addEventListener("click", () => resetFinder());
elements.shareButton.addEventListener("click", copySearch);

loadFromUrl();
updateProgress();
