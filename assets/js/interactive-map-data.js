window.MINA_INTERACTIVE_MAP_DATA = {
  version: "2026-08-19",
  regions: {
    "bone-beach": {
      name: "Bone Beach",
      image: "../assets/images/walkthrough/bone-beach.webp",
      guideUrl: "../database/maps/bone-beach.html",
      description:
        "Bone Beach begins after the Sandfalls / Major Miner route. Sandy Station is not classified as a Bone Beach station on this site; it belongs to Sandfalls. Coltrane Peak has no direct Bone Beach land connection and is initially reached by train.",
      locations: [
        {
          id: "joule-syringe",
          name: "Joule Syringe",
          type: "trinket",
          sublocation: "Secret Shoals",
          note:
            "Verified Bone Beach Trinket. Gain Plasma from Sidearms unless Mina is at 1 HP. At 0 Joules, health can be spent to use Sidearms.",
          guideUrl: "../database/trinkets/joule-syringe.html",
          sourceUrl: "https://minathehollower.wiki.gg/wiki/Trinkets",
          x: null,
          y: null
        },
        {
          id: "polyp-lamp",
          name: "Polyp Lamp",
          type: "trinket",
          sublocation: "Hide Tent (Delver)",
          note:
            "Verified Bone Beach Trinket. Glows faintly and reduces damage taken in dark places.",
          guideUrl: "../database/trinkets/polyp-lamp.html",
          sourceUrl: "https://minathehollower.wiki.gg/wiki/Trinkets",
          x: null,
          y: null
        },
        {
          id: "mined-mind",
          name: "Mined Mind",
          type: "boss",
          sublocation: "Brain Alcove",
          note:
            "Verified Bone Beach boss. Mined Mind is the Spark Generator boss of Bone Beach.",
          guideUrl: "../database/bosses/index.html#mined-mind",
          sourceUrl: "https://minathehollower.wiki.gg/wiki/Mined_Mind",
          x: null,
          y: null
        }
      ]
    },

    "sandfalls": {
      name: "Sandfalls",
      image: "../assets/images/walkthrough/sandfalls.webp",
      guideUrl: "../database/maps/sandfalls.html",
      description:
        "Sandfalls is reached through the Southern Outskirts cave route and leads to Bone Beach. Sandy Station belongs to Sandfalls, south of Sifted Sands. Major Miner is also a Sandfalls boss and is the final progression gate before Bone Beach.",
      locations: [
        {
          id: "niter-belt",
          name: "Niter Belt",
          type: "trinket",
          sublocation: "Sifted Sands",
          note:
            "Verified Sandfalls Trinket. Creates a radial explosion when emerging from burrow.",
          guideUrl: "../database/trinkets/niter-belt.html",
          sourceUrl: "https://minathehollower.wiki.gg/wiki/Trinkets",
          x: null,
          y: null
        },
        {
          id: "tunneling-codex",
          name: "Tunneling Codex",
          type: "trinket",
          sublocation: "Ring Dive Parlor (Ring Master)",
          note:
            "Verified Sandfalls Trinket. Score 5,000 or more in the Ring Dive Parlor to earn it.",
          guideUrl: "../database/trinkets/tunneling-codex.html",
          sourceUrl: "https://minathehollower.wiki.gg/wiki/Tunneling_Codex",
          x: null,
          y: null
        },
        {
          id: "sandy-station",
          name: "Sandy Station",
          type: "station",
          sublocation: "South of Sifted Sands",
          note:
            "This is the Sandfalls train station. Some guides informally call it the Bone Beach Train Station because it serves the route toward Bone Beach. Reach it by clearing the southeast TNT route. Train travel unlocks after 10,000 Bones have been funded across the train network.",
          guideUrl: "../database/maps/sandfalls.html#sandy-station",
          sourceUrl: "https://www.gamespot.com/articles/mina-the-hollower-fast-travel/",
          x: null,
          y: null
        },
        {
          id: "major-miner",
          name: "Major Miner",
          type: "boss",
          sublocation: "Miner's Den",
          note:
            "Verified Sandfalls boss. The central mine requires three Plasma Vials to enter; Major Miner is the last major obstacle before Bone Beach.",
          guideUrl: "../database/bosses/major-miner.html",
          sourceUrl: "https://minathehollower.wiki.gg/wiki/Bosses",
          x: null,
          y: null
        },
        {
          id: "route-to-bone-beach",
          name: "Route to Bone Beach",
          type: "route",
          sublocation: "Miner's Den → Bone Beach",
          note:
            "After defeating Major Miner, continue through the exit to enter Bone Beach. Treat Major Miner and Sandy Station as Sandfalls entries, not Bone Beach collectibles.",
          guideUrl: "../database/maps/bone-beach.html#how-to-get-there",
          sourceUrl: "https://www.gamespot.com/articles/how-to-get-to-bone-beach-in-mina-the-hollower/",
          x: null,
          y: null
        }
      ]
    }
  }
};
