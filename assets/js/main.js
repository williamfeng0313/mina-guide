/* Mina the Hollower — shared site JavaScript */
(function () {
  "use strict";

  const MAX_TRINKETS = 6;
  const quizAnswers = {};

  const BUILD_RESULTS = {
    aggro_burst_early: {
      weapon: "Whisper & Vesper",
      trinkets: [
        "Vascular Syrup",
        "Proto Spark",
        "Brisk Brew",
        "Steady Soles",
        "Iron Lung",
        "Primed Vial Pouch"
      ],
      tip:
        "Get in fast and use Vascular Syrup before each boss. Proto Spark is your safety net."
    },
    aggro_burst_mid: {
      weapon: "Whisper & Vesper",
      trinkets: [
        "Uranium Bracelet",
        "Vascular Syrup",
        "Chain Capacitor",
        "Dodging Pendulum",
        "Bellows Bustle",
        "Evasion Powder"
      ],
      tip:
        "Uranium Bracelet and Chain Capacitor make the daggers melt bosses. Risky but fast."
    },
    aggro_burst_late: {
      weapon: "Whisper & Vesper",
      trinkets: [
        "Uranium Bracelet",
        "Chain Capacitor",
        "Wallower's Gauntlets",
        "Blinking Glass",
        "Vascular Syrup",
        "Voltaic Guard"
      ],
      tip:
        "A full-aggression glass-cannon setup with strong damage windows against major bosses."
    },
    aggro_pits_early: {
      weapon: "Nightstar",
      trinkets: [
        "Keri the Wisp",
        "Pit Preserver",
        "Primed Vial Pouch",
        "Vascular Syrup",
        "Steady Soles",
        "Proto Spark"
      ],
      tip:
        "Keri the Wisp and Pit Preserver reduce fall risk. Use Nightstar's range to stay safe."
    },
    aggro_pits_mid: {
      weapon: "Nightstar",
      trinkets: [
        "Keri the Wisp",
        "Bellows Bustle",
        "Pit Preserver",
        "Chain Capacitor",
        "Vascular Syrup",
        "Evasion Powder"
      ],
      tip:
        "Bellows Bustle improves aerial control while Nightstar handles enemies from a safer distance."
    },
    aggro_pits_late: {
      weapon: "Battery Buster",
      trinkets: [
        "Wallower's Gauntlets",
        "Bellows Bustle",
        "Keri the Wisp",
        "Voltaic Guard",
        "Chain Capacitor",
        "Evasion Powder"
      ],
      tip:
        "Wallower's Gauntlets and Bellows Bustle provide strong late-game movement around dangerous gaps."
    },
    aggro_multi_early: {
      weapon: "Nightstar",
      trinkets: [
        "Seismic Belt",
        "Repulsing Root",
        "Primed Vial Pouch",
        "Vascular Syrup",
        "Proto Spark",
        "Stolenoid"
      ],
      tip:
        "Seismic Belt helps pressure groups while Nightstar's reach controls enemies at a distance."
    },
    aggro_multi_mid: {
      weapon: "Blaststrike Maul",
      trinkets: [
        "Seismic Belt",
        "Repulsing Root",
        "Bellows Bustle",
        "Volatile Beastium",
        "Vascular Syrup",
        "Chain Capacitor"
      ],
      tip:
        "Maul stagger and Volatile Beastium give this setup strong crowd-clearing potential."
    },
    aggro_multi_late: {
      weapon: "Blaststrike Maul",
      trinkets: [
        "Seismic Belt",
        "Volatile Beastium",
        "Burning Beastium",
        "Repulsing Root",
        "Voltaic Guard",
        "Chain Capacitor"
      ],
      tip:
        "Several area-damage effects combine with the Maul's direct pressure against groups."
    },
    safe_burst_early: {
      weapon: "Nightstar",
      trinkets: [
        "Vascular Syrup",
        "Primed Vial Pouch",
        "Evasion Powder",
        "Proto Spark",
        "Bell of Grace",
        "Steady Soles"
      ],
      tip:
        "A defensive early-game kit with recovery support and comfortable ranged attacks."
    },
    safe_burst_mid: {
      weapon: "Battery Buster",
      trinkets: [
        "Vascular Syrup",
        "Evasion Powder",
        "Shock Flint",
        "Primed Vial Pouch",
        "Bell of Grace",
        "Intravenous Vial"
      ],
      tip:
        "Use Battery Buster and Shock Flint from range while the Vial-focused Trinkets support recovery."
    },
    safe_burst_late: {
      weapon: "Battery Buster",
      trinkets: [
        "Shock Flint",
        "Uranium Bracelet",
        "Evasion Powder",
        "Vial Salvo",
        "Intravenous Vial",
        "Vascular Syrup"
      ],
      tip:
        "A ranged late-game setup that connects Vial use with additional offense."
    },
    safe_pits_early: {
      weapon: "Nightstar",
      trinkets: [
        "Keri the Wisp",
        "Pit Preserver",
        "Steady Soles",
        "Primed Vial Pouch",
        "Proto Spark",
        "Vascular Syrup"
      ],
      tip:
        "This setup reduces fall risk and lets you take a slower, safer approach with Nightstar."
    },
    safe_pits_mid: {
      weapon: "Battery Buster",
      trinkets: [
        "Bellows Bustle",
        "Keri the Wisp",
        "Pit Preserver",
        "Shock Flint",
        "Evasion Powder",
        "Vascular Syrup"
      ],
      tip:
        "Movement and pit protection combine with ranged pressure from Battery Buster."
    },
    safe_pits_late: {
      weapon: "Battery Buster",
      trinkets: [
        "Wallower's Gauntlets",
        "Bellows Bustle",
        "Keri the Wisp",
        "Vial Salvo",
        "Shock Flint",
        "Voltaic Guard"
      ],
      tip:
        "Late-game aerial movement and ranged damage make hazardous traversal more forgiving."
    },
    safe_multi_early: {
      weapon: "Nightstar",
      trinkets: [
        "Repulsing Root",
        "Seismic Belt",
        "Primed Vial Pouch",
        "Vascular Syrup",
        "Stolenoid",
        "Proto Spark"
      ],
      tip:
        "Nightstar's reach and reactive space-making effects help when enemies begin to surround Mina."
    },
    safe_multi_mid: {
      weapon: "Battery Buster",
      trinkets: [
        "Shock Flint",
        "Volatile Beastium",
        "Repulsing Root",
        "Seismic Belt",
        "Vascular Syrup",
        "Evasion Powder"
      ],
      tip:
        "A ranged crowd-control setup with defensive recovery and several area-damage effects."
    },
    safe_multi_late: {
      weapon: "Battery Buster",
      trinkets: [
        "Shock Flint",
        "Volatile Beastium",
        "Burning Beastium",
        "Vial Salvo",
        "Voltaic Guard",
        "Draining Beastium"
      ],
      tip:
        "Late-game ranged pressure combines with Vial offense and several effects suited to groups."
    },
    tank_burst_early: {
      weapon: "Blaststrike Maul",
      trinkets: [
        "Vascular Syrup",
        "Warding Beastium",
        "Primed Vial Pouch",
        "Proto Spark",
        "Valor Medallion",
        "Bubble Ring"
      ],
      tip:
        "Recovery and protection support the Maul's slower, close-range style."
    },
    tank_burst_mid: {
      weapon: "Guardian Casket",
      trinkets: [
        "Bubble Ring",
        "Vascular Syrup",
        "Valor Medallion",
        "Counter Vial",
        "Evasion Powder",
        "Bell of Grace"
      ],
      tip:
        "Guardian Casket and Counter Vial reward careful defensive timing."
    },
    tank_burst_late: {
      weapon: "Guardian Casket",
      trinkets: [
        "Uranium Bracelet",
        "Bubble Ring",
        "Counter Vial",
        "Voltaic Guard",
        "Vascular Syrup",
        "Blinking Glass"
      ],
      tip:
        "A late-game counter-focused setup with mobility, recovery, and defensive insurance."
    },
    tank_pits_early: {
      weapon: "Blaststrike Maul",
      trinkets: [
        "Pit Preserver",
        "Steady Soles",
        "Vascular Syrup",
        "Proto Spark",
        "Bubble Ring",
        "Primed Vial Pouch"
      ],
      tip:
        "Pit protection and steady positioning make the Maul's slower attacks easier to manage."
    },
    tank_pits_mid: {
      weapon: "Guardian Casket",
      trinkets: [
        "Bellows Bustle",
        "Pit Preserver",
        "Steady Soles",
        "Bubble Ring",
        "Counter Vial",
        "Valor Medallion"
      ],
      tip:
        "A safe mid-game setup built around aerial correction, protection, and counters."
    },
    tank_pits_late: {
      weapon: "Guardian Casket",
      trinkets: [
        "Wallower's Gauntlets",
        "Bellows Bustle",
        "Steady Soles",
        "Counter Vial",
        "Voltaic Guard",
        "Blinking Glass"
      ],
      tip:
        "Wall burrowing, aerial movement, and defensive counters provide strong positional control."
    },
    tank_multi_early: {
      weapon: "Blaststrike Maul",
      trinkets: [
        "Seismic Belt",
        "Repulsing Root",
        "Bubble Ring",
        "Vascular Syrup",
        "Proto Spark",
        "Stolenoid"
      ],
      tip:
        "Maul pressure, Seismic Belt, and Repulsing Root help create space against groups."
    },
    tank_multi_mid: {
      weapon: "Guardian Casket",
      trinkets: [
        "Seismic Belt",
        "Volatile Beastium",
        "Bubble Ring",
        "Counter Vial",
        "Repulsing Root",
        "Valor Medallion"
      ],
      tip:
        "A defensive crowd-control setup that mixes counters with reactive area effects."
    },
    tank_multi_late: {
      weapon: "Guardian Casket",
      trinkets: [
        "Seismic Belt",
        "Volatile Beastium",
        "Burning Beastium",
        "Counter Vial",
        "Voltaic Guard",
        "Wallower's Gauntlets"
      ],
      tip:
        "A late-game defensive build with counter damage, area pressure, and improved movement."
    }
  };

  function getGameData() {
    const data = window.MINA_DATA || {};

    const trinkets = Array.isArray(data.trinkets)
      ? data.trinkets
          .map(function (item) {
            return typeof item === "string" ? item : item && item.name;
          })
          .filter(Boolean)
      : [];

    const sidearms = Array.isArray(data.sidearms)
      ? data.sidearms.filter(function (name) {
          return typeof name === "string" && name.trim();
        })
      : [];

    return {
      trinkets: Array.from(new Set(trinkets)),
      sidearms: Array.from(new Set(sidearms))
    };
  }

  function copyText(text) {
    if (
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      const input = document.createElement("textarea");
      input.value = text;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.left = "-9999px";
      document.body.appendChild(input);
      input.select();

      try {
        const copied = document.execCommand("copy");
        input.remove();
        copied ? resolve() : reject(new Error("Copy failed"));
      } catch (error) {
        input.remove();
        reject(error);
      }
    });
  }

  function slugify(value) {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function initMobileNavigation() {
    const overlay = document.getElementById("mobileNav");
    if (!overlay || overlay.dataset.mainJsReady === "true") return;

    overlay.dataset.mainJsReady = "true";

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        overlay.classList.remove("open");
      }
    });

    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) {
        overlay.classList.remove("open");
      }
    });
  }

  function initSearch() {
    const input = document.querySelector(".nav-search input");
    if (!input || input.dataset.mainJsReady === "true") return;

    input.dataset.mainJsReady = "true";

    const root = input.dataset.searchRoot || "";
    const normalized = function (value) {
      return value
        .toLowerCase()
        .replace(/[’']/g, "'")
        .replace(/\s+/g, " ")
        .trim();
    };

    const exactRoutes = [
      [["loner's landing", "loners landing"], "database/maps/loners-landing.html"],
      [["southern outskirts", "southern outskirt"], "database/maps/southern-outskirts.html"],
      [["ossex"], "database/maps/ossex.html"],
      [["eastern heath"], "database/maps/eastern-heath.html"],
      [["mourner's mile", "mourners mile"], "database/maps/mourners-mile.html"],
      [["queensbury crypt"], "database/maps/queensbury-crypt.html"],
      [["western wilds"], "database/maps/western-wilds.html"],
      [["kindlewood"], "database/maps/kindlewood.html"],
      [["septemburg"], "database/maps/septemburg.html"],
      [["backwaters"], "database/maps/backwaters.html"],
      [["nox's bayou", "noxs bayou"], "database/maps/noxs-bayou.html"],
      [["sandfalls"], "database/maps/sandfalls.html"],
      [["bone beach"], "database/maps/bone-beach.html"],
      [["coltrane peak"], "database/maps/coltrane-peak.html"],
      [["astral orrery"], "database/maps/astral-orrery.html"],
      [["radiant manor"], "database/maps/radiant-manor.html"]
    ];

    const categoryRoutes = [
      [
        ["interactive map", "map tracker", "location tracker"],
        "tools/interactive-map.html"
      ],
      [["map", "maps", "region", "regions", "atlas"], "database/maps/index.html"],
      [["boss", "bosses"], "database/bosses/index.html"],
      [["weapon", "weapons"], "database/weapons/index.html"],
      [["sidearm", "sidearms"], "database/sidearms/index.html"],
      [["trinket", "trinkets"], "database/trinkets/index.html"],
      [["build planner", "build"], "tools/build-planner.html"],
      [["quiz"], "tools/build-quiz.html"],
      [["what am i missing", "missing item", "missing"], "tools/what-am-i-missing.html"],
      [["checklist", "100%"], "tools/checklist.html"],
      [["release date"], "blog/mina-the-hollower-release-date.html"],
      [["walkthrough", "progression"], "blog/mina-the-hollower-walkthrough.html"],
      [["beginner", "tips"], "blog/beginner-guide.html"],
      [["mistake", "mistakes"], "blog/mistakes.html"],
      [["secret", "secrets"], "blog/hidden-secrets.html"],
      [["mechanic", "mechanics"], "blog/hidden-mechanics.html"],
      [["blog", "guide", "guides"], "blog/index.html"],
      [["tool", "tools"], "tools/index.html"],
      [["about"], "about.html"]
    ];

    input.addEventListener("keydown", function (event) {
      if (event.key !== "Enter") return;

      const query = normalized(input.value);
      if (!query) return;

      for (const entry of exactRoutes) {
        const aliases = entry[0];
        const path = entry[1];
        if (aliases.some(function (alias) { return query.includes(alias); })) {
          window.location.href = root + path;
          return;
        }
      }

      for (const entry of categoryRoutes) {
        const aliases = entry[0];
        const path = entry[1];
        if (aliases.some(function (alias) { return query.includes(alias); })) {
          window.location.href = root + path;
          return;
        }
      }

      window.location.href = root + "index.html";
    });
  }

  function initDeathCounter() {
    const counter = document.getElementById("death-count");
    if (!counter) return;

    const stored = Number.parseInt(
      localStorage.getItem("minaDeaths") || "84291",
      10
    );

    const deaths = Number.isFinite(stored) ? stored : 84291;
    counter.textContent = deaths.toLocaleString();
  }

  function addDeath() {
    const counter = document.getElementById("death-count");
    if (!counter) return;

    const stored = Number.parseInt(
      localStorage.getItem("minaDeaths") || "84291",
      10
    );

    const deaths = (Number.isFinite(stored) ? stored : 84291) + 1;
    localStorage.setItem("minaDeaths", String(deaths));
    counter.textContent = deaths.toLocaleString();

    const button = document.querySelector(
      'button[onclick*="addDeath"]'
    );

    if (!button) return;

    const originalText = button.textContent;
    button.textContent = "💀 Noted. You'll get 'em next time.";

    window.setTimeout(function () {
      button.textContent = originalText;
    }, 2000);
  }

  function quizAnswer(key, value, button) {
    if (!button) return;

    quizAnswers[key] = value;

    const group = button.parentElement;
    if (group) {
      group.querySelectorAll(".quiz-btn").forEach(function (item) {
        item.classList.remove("selected");
      });
    }

    button.classList.add("selected");

    window.setTimeout(function () {
      const steps = {
        style: ["q1", "q2"],
        death: ["q2", "q3"],
        progress: ["q3", "quiz-result"]
      };

      const step = steps[key];
      if (!step) return;

      const current = document.getElementById(step[0]);
      const next = document.getElementById(step[1]);

      if (current) current.style.display = "none";

      if (step[1] === "quiz-result") {
        showQuizResult();
      } else if (next) {
        next.style.display = "block";
      }
    }, 250);
  }

  function showQuizResult() {
    const key = [
      quizAnswers.style,
      quizAnswers.death,
      quizAnswers.progress
    ].join("_");

    const build = BUILD_RESULTS[key] || BUILD_RESULTS.safe_burst_early;
    const output = document.getElementById("quiz-result");
    if (!output) return;

    output.textContent = "";
    output.style.display = "block";

    const box = document.createElement("div");
    box.className = "quiz-result-box";

    const heading = document.createElement("h4");
    heading.textContent = "⚡ YOUR BUILD";
    box.appendChild(heading);

    const weaponLabel = document.createElement("div");
    weaponLabel.style.marginBottom = "0.5rem";
    weaponLabel.innerHTML =
      '<span style="font-size:0.72rem;color:var(--bone-dark);' +
      "font-family:'Cinzel',serif;letter-spacing:0.06em;\">" +
      "WEAPON</span><br>";

    const weapon = document.createElement("span");
    weapon.style.fontFamily = "'IM Fell English', serif";
    weapon.style.fontSize = "1rem";
    weapon.style.color = "var(--parchment)";
    weapon.textContent = build.weapon;
    weaponLabel.appendChild(weapon);
    box.appendChild(weaponLabel);

    const trinketBlock = document.createElement("div");
    trinketBlock.style.marginBottom = "0.6rem";

    const trinketLabel = document.createElement("span");
    trinketLabel.style.fontSize = "0.72rem";
    trinketLabel.style.color = "var(--bone-dark)";
    trinketLabel.style.fontFamily = "'Cinzel', serif";
    trinketLabel.style.letterSpacing = "0.06em";
    trinketLabel.textContent = "6 TRINKETS";
    trinketBlock.appendChild(trinketLabel);
    trinketBlock.appendChild(document.createElement("br"));

    const pills = document.createElement("div");
    pills.style.marginTop = "4px";

    build.trinkets.forEach(function (name) {
      const pill = document.createElement("span");
      pill.className = "quiz-trinket-pill";
      pill.textContent = name;
      pills.appendChild(pill);
    });

    trinketBlock.appendChild(pills);
    box.appendChild(trinketBlock);

    const tip = document.createElement("p");
    tip.style.fontSize = "0.8rem";
    tip.style.color = "var(--bone-dark)";
    tip.style.lineHeight = "1.5";
    tip.style.fontStyle = "italic";
    tip.style.marginBottom = "0.6rem";
    tip.textContent = build.tip;
    box.appendChild(tip);

    const shareButton = document.createElement("button");
    shareButton.className = "share-btn";
    shareButton.type = "button";
    shareButton.textContent = "📤 Share this build →";
    shareButton.addEventListener("click", function () {
      shareResult(build.weapon);
    });
    box.appendChild(shareButton);

    const resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.textContent = "↩ Retake quiz";
    resetButton.style.cssText =
      "display:block;width:100%;margin-top:6px;background:transparent;" +
      "border:1px solid rgba(200,134,10,0.2);color:var(--bone-dark);" +
      "font-family:'Cinzel',serif;font-size:0.7rem;letter-spacing:0.08em;" +
      "padding:0.4rem;border-radius:3px;cursor:pointer;";
    resetButton.addEventListener("click", resetQuiz);
    box.appendChild(resetButton);

    output.appendChild(box);
  }

  function resetQuiz() {
    Object.keys(quizAnswers).forEach(function (key) {
      delete quizAnswers[key];
    });

    ["q1", "q2", "q3", "quiz-result"].forEach(function (id) {
      const element = document.getElementById(id);
      if (!element) return;
      element.style.display = id === "q1" ? "block" : "none";
    });

    document.querySelectorAll(".quiz-btn").forEach(function (button) {
      button.classList.remove("selected");
    });
  }

  function shareResult(weapon) {
    const text =
      'I got "' +
      weapon +
      '" as my Mina the Hollower build — take the quiz: ' +
      window.location.href;

    if (navigator.share) {
      navigator
        .share({
          title: "Mina Build Quiz",
          text: text,
          url: window.location.href
        })
        .catch(function () {
          /* The user may cancel the native share dialog. */
        });
      return;
    }

    copyText(text)
      .then(function () {
        window.alert("Build copied to clipboard.");
      })
      .catch(function () {
        window.alert(text);
      });
  }

  function initBuildPlanner() {
    const trinketContainer = document.getElementById("planner-trinkets");
    if (
      !trinketContainer ||
      trinketContainer.dataset.mainJsReady === "true"
    ) {
      return;
    }

    const weaponSelect = document.getElementById("planner-weapon");
    const sidearmSelect = document.getElementById("planner-sidearm");
    const searchInput = document.getElementById("planner-search");
    const countElement = document.getElementById("trinket-count");
    const summaryElement = document.getElementById("planner-summary");
    const urlElement = document.getElementById("planner-url");
    const messageElement = document.getElementById("planner-message");
    const copyButton = document.getElementById("copy-btn");
    const redditButton = document.getElementById("reddit-btn");
    const resetButton = document.getElementById("reset-btn");

    const requiredElements = [
      weaponSelect,
      sidearmSelect,
      searchInput,
      countElement,
      summaryElement,
      urlElement,
      messageElement,
      copyButton,
      redditButton,
      resetButton
    ];

    if (requiredElements.some(function (element) { return !element; })) {
      console.error(
        "Build Planner could not start because required HTML elements are missing."
      );
      return;
    }

    const data = getGameData();
    const trinkets = data.trinkets;
    const sidearms = data.sidearms;

    console.assert(
      trinkets.length === 61,
      "Expected 61 Trinket entries, found " + trinkets.length
    );
    console.assert(
      sidearms.length === 15,
      "Expected 15 Sidearms, found " + sidearms.length
    );

    if (!trinkets.length || !sidearms.length) {
      messageElement.textContent =
        "Build data failed to load. Load game-data.js before main.js.";
      return;
    }

    trinketContainer.dataset.mainJsReady = "true";
    const selectedTrinkets = new Set();

    sidearmSelect
      .querySelectorAll('option:not([value=""])')
      .forEach(function (option) {
        option.remove();
      });

    sidearms.forEach(function (name) {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      sidearmSelect.appendChild(option);
    });

    function setMessage(message) {
      messageElement.textContent = message;

      if (!message) return;

      window.setTimeout(function () {
        if (messageElement.textContent === message) {
          messageElement.textContent = "";
        }
      }, 2500);
    }

    function renderTrinkets() {
      const query = searchInput.value.trim().toLowerCase();
      trinketContainer.textContent = "";

      const matches = trinkets.filter(function (name) {
        return name.toLowerCase().includes(query);
      });

      matches.forEach(function (name) {
        const selected = selectedTrinkets.has(name);
        const limitReached =
          selectedTrinkets.size >= MAX_TRINKETS && !selected;

        const label = document.createElement("label");
        label.className = "trinket-option";

        if (selected) label.classList.add("is-selected");
        if (limitReached) label.classList.add("is-disabled");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "trinket-" + slugify(name);
        checkbox.value = name;
        checkbox.checked = selected;
        checkbox.disabled = limitReached;

        const text = document.createElement("span");
        text.textContent = name;

        checkbox.addEventListener("change", function () {
          if (checkbox.checked) {
            if (selectedTrinkets.size >= MAX_TRINKETS) {
              checkbox.checked = false;
              setMessage("You can select up to six Trinkets.");
              return;
            }

            selectedTrinkets.add(name);
          } else {
            selectedTrinkets.delete(name);
          }

          updatePlanner();
          renderTrinkets();
        });

        label.appendChild(checkbox);
        label.appendChild(text);
        trinketContainer.appendChild(label);
      });

      if (!matches.length) {
        const empty = document.createElement("p");
        empty.style.color = "var(--bone-dark)";
        empty.textContent = "No Trinkets match your search.";
        trinketContainer.appendChild(empty);
      }
    }

    function buildUrl() {
      const url = new URL(window.location.href);
      url.search = "";
      url.hash = "";

      if (weaponSelect.value) {
        url.searchParams.set("weapon", weaponSelect.value);
      }

      if (sidearmSelect.value) {
        url.searchParams.set("sidearm", sidearmSelect.value);
      }

      if (selectedTrinkets.size) {
        url.searchParams.set(
          "trinkets",
          Array.from(selectedTrinkets).join("|")
        );
      }

      return url.toString();
    }

    function renderSummary(weapon, sidearm, selected) {
      summaryElement.textContent = "";

      if (!weapon && !sidearm && !selected.length) {
        const empty = document.createElement("p");
        empty.className = "planner-summary-empty";
        empty.textContent =
          "Select a weapon and at least one Trinket to generate your build.";
        summaryElement.appendChild(empty);
        return;
      }

      const list = document.createElement("div");
      list.className = "planner-summary-list";

      [
        ["Weapon", weapon || "Not selected"],
        ["Sidearm", sidearm || "Not selected"],
        [
          "Trinkets",
          selected.length ? selected.join(", ") : "None selected"
        ]
      ].forEach(function (row) {
        const line = document.createElement("div");
        const label = document.createElement("strong");
        label.textContent = row[0] + ": ";
        line.appendChild(label);
        line.appendChild(document.createTextNode(row[1]));
        list.appendChild(line);
      });

      summaryElement.appendChild(list);
    }

    function updatePlanner() {
      const weapon = weaponSelect.value;
      const sidearm = sidearmSelect.value;
      const selected = Array.from(selectedTrinkets);

      countElement.textContent =
        selected.length + " / " + MAX_TRINKETS + " selected";

      renderSummary(weapon, sidearm, selected);

      if (!weapon && !sidearm && !selected.length) {
        urlElement.value = "";
        window.history.replaceState(
          {},
          "",
          window.location.pathname + window.location.hash
        );
        return;
      }

      const generatedUrl = buildUrl();
      urlElement.value = generatedUrl;

      const relativeUrl =
        generatedUrl.replace(window.location.origin, "");

      window.history.replaceState({}, "", relativeUrl);
    }

    function restoreFromUrl() {
      const params = new URLSearchParams(window.location.search);
      const weapon = params.get("weapon") || "";
      const sidearm = params.get("sidearm") || "";
      const trinketValue = params.get("trinkets") || "";

      const weaponValues = Array.from(weaponSelect.options).map(
        function (option) {
          return option.value;
        }
      );

      if (weaponValues.includes(weapon)) {
        weaponSelect.value = weapon;
      }

      if (sidearms.includes(sidearm)) {
        sidearmSelect.value = sidearm;
      }

      if (trinketValue) {
        trinketValue
          .split("|")
          .filter(function (name) {
            return trinkets.includes(name);
          })
          .slice(0, MAX_TRINKETS)
          .forEach(function (name) {
            selectedTrinkets.add(name);
          });
      }
    }

    function copyBuildUrl() {
      if (!urlElement.value) {
        setMessage("Choose at least one build option first.");
        return;
      }

      copyText(urlElement.value)
        .then(function () {
          setMessage("Build URL copied.");
        })
        .catch(function () {
          urlElement.focus();
          urlElement.select();
          setMessage("Copy the URL manually from the field.");
        });
    }

    function shareToReddit() {
      if (!urlElement.value) {
        setMessage("Choose at least one build option first.");
        return;
      }

      const redditUrl =
        "https://www.reddit.com/submit?url=" +
        encodeURIComponent(urlElement.value) +
        "&title=" +
        encodeURIComponent("My Mina the Hollower build");

      window.open(redditUrl, "_blank", "noopener,noreferrer");
    }

    function resetPlanner() {
      weaponSelect.value = "";
      sidearmSelect.value = "";
      selectedTrinkets.clear();
      searchInput.value = "";
      messageElement.textContent = "";

      window.history.replaceState(
        {},
        "",
        window.location.pathname
      );

      renderTrinkets();
      updatePlanner();
    }

    weaponSelect.addEventListener("change", updatePlanner);
    sidearmSelect.addEventListener("change", updatePlanner);
    searchInput.addEventListener("input", renderTrinkets);
    copyButton.addEventListener("click", copyBuildUrl);
    redditButton.addEventListener("click", shareToReddit);
    resetButton.addEventListener("click", resetPlanner);

    window.copyBuildUrl = copyBuildUrl;
    window.updatePlanner = updatePlanner;
    window.shareForum = function (platform) {
      shareToForum(platform, urlElement.value);
    };

    restoreFromUrl();
    renderTrinkets();
    updatePlanner();
  }

  function shareToForum(platform, url) {
    const shareUrl = url || window.location.href;
    const title =
      "Mina the Hollower — Complete Guide & Build Planner";
    const text =
      "Mina the Hollower guide with Trinket locations, builds, and tools: ";

    const targets = {
      reddit:
        "https://www.reddit.com/r/MinaTheHollower/submit?type=link" +
        "&title=" +
        encodeURIComponent(title) +
        "&url=" +
        encodeURIComponent(shareUrl),
      twitter:
        "https://twitter.com/intent/tweet?text=" +
        encodeURIComponent(text + shareUrl)
    };

    if (platform === "discord") {
      copyText(text + shareUrl).then(function () {
        const button =
          document.getElementById("footer-copy-btn") ||
          document.querySelector('button[onclick*="discord"]');

        if (!button) return;

        const originalText = button.textContent;
        button.textContent = "✓ Copied for Discord!";
        window.setTimeout(function () {
          button.textContent = originalText;
        }, 2500);
      });
      return;
    }

    if (targets[platform]) {
      window.open(
        targets[platform],
        "_blank",
        "noopener,noreferrer,width=700,height=500"
      );
    }
  }

  function copyPageUrl() {
    copyText(window.location.href).then(function () {
      const button = document.getElementById("footer-copy-btn");
      if (!button) return;

      const originalText = button.textContent;
      button.textContent = "✓ Copied!";
      window.setTimeout(function () {
        button.textContent = originalText;
      }, 2000);
    });
  }

  function voteUp(button) {
    if (!button || button.disabled) return;

    const count = button.querySelector("span");
    if (!count) return;

    const current = Number.parseInt(count.textContent, 10) || 0;
    count.textContent = String(current + 1);
    button.disabled = true;
    button.style.opacity = "0.5";
  }

  function submitBuild() {
    const nameInput = document.getElementById("sub-name");
    const authorInput = document.getElementById("sub-author");
    const loadoutInput = document.getElementById("sub-loadout");
    const descriptionInput = document.getElementById("sub-desc");
    const message = document.getElementById("sub-msg");
    const list = document.getElementById("community-builds-list");

    if (
      !nameInput ||
      !authorInput ||
      !loadoutInput ||
      !descriptionInput ||
      !message ||
      !list
    ) {
      return;
    }

    const name = nameInput.value.trim();
    const author = authorInput.value.trim() || "Anonymous";
    const loadout = loadoutInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!name || !loadout) {
      message.textContent =
        "Please fill in the build name and loadout.";
      message.style.color = "#e88080";
      return;
    }

    const card = document.createElement("div");
    card.style.cssText =
      "background:rgba(245,234,216,0.05);" +
      "border:1px solid rgba(200,134,10,0.3);" +
      "border-radius:4px;padding:1rem 1.2rem;";

    const header = document.createElement("div");
    header.style.cssText =
      "display:flex;justify-content:space-between;" +
      "align-items:flex-start;flex-wrap:wrap;gap:8px;" +
      "margin-bottom:0.5rem;";

    const identity = document.createElement("div");
    const buildName = document.createElement("span");
    buildName.style.cssText =
      "font-family:'IM Fell English',serif;" +
      "font-size:1rem;color:var(--parchment);";
    buildName.textContent = name;

    const byline = document.createElement("span");
    byline.style.cssText =
      "font-size:0.72rem;color:var(--bone-dark);margin-left:8px;";
    byline.textContent = "by " + author + " · just now";

    identity.appendChild(buildName);
    identity.appendChild(byline);

    const voteButton = document.createElement("button");
    voteButton.type = "button";
    voteButton.style.cssText =
      "background:rgba(200,134,10,0.12);" +
      "border:1px solid rgba(200,134,10,0.3);" +
      "color:var(--candle-light);font-size:0.78rem;" +
      "padding:3px 10px;border-radius:2px;cursor:pointer;";
    voteButton.appendChild(document.createTextNode("▲ "));

    const voteCount = document.createElement("span");
    voteCount.textContent = "0";
    voteButton.appendChild(voteCount);
    voteButton.addEventListener("click", function () {
      voteUp(voteButton);
    });

    header.appendChild(identity);
    header.appendChild(voteButton);
    card.appendChild(header);

    const loadoutLine = document.createElement("div");
    loadoutLine.style.cssText =
      "font-size:0.82rem;color:var(--candle-pale);" +
      "margin-bottom:0.5rem;";
    loadoutLine.textContent = loadout;
    card.appendChild(loadoutLine);

    if (description) {
      const descriptionLine = document.createElement("p");
      descriptionLine.style.cssText =
        "font-size:0.82rem;color:var(--bone-dark);line-height:1.5;";
      descriptionLine.textContent = '"' + description + '"';
      card.appendChild(descriptionLine);
    }

    list.prepend(card);

    [nameInput, authorInput, loadoutInput, descriptionInput].forEach(
      function (input) {
        input.value = "";
      }
    );

    message.textContent =
      "✓ Build submitted locally. It will disappear after refresh.";
    message.style.color = "var(--candle-light)";

    window.setTimeout(function () {
      message.textContent = "";
    }, 4000);
  }

  function filterTrinkets(area) {
    const items = document.querySelectorAll(
      "#trinket-container .trinket-item"
    );

    if (!items.length) return;

    items.forEach(function (item) {
      item.style.display =
        area === "all" || item.dataset.area === area ? "" : "none";
    });

    document.querySelectorAll('[id^="tab-"]').forEach(function (button) {
      const active = button.id === "tab-" + area;
      button.style.background = active
        ? "rgba(200,134,10,0.2)"
        : "transparent";
      button.style.borderColor = active
        ? "rgba(200,134,10,0.5)"
        : "rgba(200,134,10,0.25)";
      button.style.color = active
        ? "var(--candle-light)"
        : "var(--bone)";
    });
  }

  function validateQuizData() {
    const data = getGameData();
    if (!data.trinkets.length) return;

    const known = new Set(data.trinkets);
    const unknown = [];

    Object.keys(BUILD_RESULTS).forEach(function (key) {
      BUILD_RESULTS[key].trinkets.forEach(function (name) {
        if (!known.has(name)) {
          unknown.push(key + ": " + name);
        }
      });
    });

    console.assert(
      unknown.length === 0,
      "Unknown Trinkets in Build Quiz: " + unknown.join(", ")
    );
  }

  function init() {
    initMobileNavigation();
    initSearch();
    initDeathCounter();
    initBuildPlanner();
    validateQuizData();
  }

  window.quizAnswer = quizAnswer;
  window.resetQuiz = resetQuiz;
  window.shareResult = shareResult;
  window.addDeath = addDeath;
  window.shareToForum = shareToForum;
  window.copyPageUrl = copyPageUrl;
  window.voteUp = voteUp;
  window.submitBuild = submitBuild;
  window.filterTrinkets = filterTrinkets;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
