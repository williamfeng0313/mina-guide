window.MINA_INTERACTIVE_MAP_DATA = {
  version: "2026-08-18",
  regions: {
    "bone-beach": {
      name: "Bone Beach",
      image: "../assets/images/walkthrough/bone-beach.webp",
      guideUrl: "../database/maps/bone-beach.html",
      description:
        "Bone Beach is the southeast route beyond Sandfalls. This beta tracks only location data that is currently verified against the Wiki/Manual baseline.",
      locations: [
        {
          id: "joule-syringe",
          name: "Joule Syringe",
          type: "trinket",
          sublocation: "Secret Shoals",
          note:
            "Gain Plasma from Sidearms unless Mina is at 1 HP. At 0 Joules, health can be spent to use Sidearms.",
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
            "Glows faintly and reduces damage taken in dark places. Current Wiki location: Bone Beach, Hide Tent (Delver).",
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
            "The Spark Generator boss of Bone Beach.",
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
        "Sandfalls leads toward Bone Beach and uses bombs and sand-flow traversal. This beta tracks two verified Trinkets and Major Miner.",
      locations: [
        {
          id: "niter-belt",
          name: "Niter Belt",
          type: "trinket",
          sublocation: "Sifted Sands",
          note:
            "Creates a radial explosion when emerging from burrow.",
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
            "Hold Jump to burrow repeatedly without needing to land. Awarded for a Ring Dive Parlor score of 5,000 or more.",
          guideUrl: "../database/trinkets/tunneling-codex.html",
          sourceUrl: "https://minathehollower.wiki.gg/wiki/Tunneling_Codex",
          x: null,
          y: null
        },
        {
          id: "major-miner",
          name: "Major Miner",
          type: "boss",
          sublocation: "Miner's Den",
          note:
            "Verified boss location: Sandfalls, Miner's Den.",
          guideUrl: "../database/bosses/major-miner.html",
          sourceUrl: "https://minathehollower.wiki.gg/wiki/Bosses",
          x: null,
          y: null
        }
      ]
    }
  }
};
