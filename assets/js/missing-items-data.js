/*
 * Missing Item Finder data
 * Used by: /tools/what-am-i-missing.html
 *
 * Load this file before missing-item-finder.js.
 * MVP scope: 38 counted records
 *   - Sandfalls: 17
 *   - Bone Beach: 21
 */
(function () {
    "use strict";
  
    const COMMON_SIGNALS = ["red", "blue", "region-only", "no-skull"];
  
    const LANDMARKS = {
      sandfalls: [
        { value: "entrance-water", label: "Region Entrance / Water" },
        { value: "first-bomb-route", label: "First Bomb Route" },
        { value: "niter-belt-bomb-puzzle", label: "Niter Belt Bomb Puzzle" },
        { value: "ring-dive-parlor", label: "Ring Dive Parlor" },
        { value: "moving-platforms", label: "Moving Platforms" },
        { value: "western-minecart-route", label: "Western Minecart Route" },
        { value: "lower-western-route", label: "Lower Western Route" },
        { value: "sandy-station", label: "Sandy Station" },
        { value: "npc-house", label: "NPC House" },
        { value: "not-sure", label: "Not Sure" }
      ],
      "bone-beach": [
        { value: "region-entrance", label: "Region Entrance / Mr. Furgus" },
        { value: "conveyor-rooms", label: "Conveyor Rooms" },
        { value: "hide-tent", label: "Hide Tent" },
        { value: "secret-shoals", label: "Secret Shoals" },
        { value: "calcified-caves", label: "Calcified Caves" },
        { value: "worms-back", label: "Worm's Back / Dreadworm" },
        { value: "stomach-mine", label: "Stomach Mine" },
        { value: "gut-depths", label: "Gut Depths" },
        { value: "brain-alcove", label: "Brain Alcove / Shoreline" },
        { value: "not-sure", label: "Not Sure" }
      ]
    };
  
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
  
    const ITEM_DATA = [
      /* ============================================================
         SANDFALLS — 17 records
         5 Bonestones + 3 Trinkets + 1 Kear + 8 Upgrade / Other
         ============================================================ */
      {
        id: "sandfalls-bouncy-puffy",
        region: "sandfalls",
        category: "upgrade-other",
        title: "Bouncy Puffy",
        landmarks: ["entrance-water"],
        signals: COMMON_SIGNALS,
        highMiss: false,
        requirement: "Fishing Rod",
        location: "The hidden water above the cave entrance at the start of Sandfalls.",
        reason: "The fishing spot sits behind a breakable left wall and is easy to pass before exploring upward.",
        route: "Break the wall left of the Sandfalls entrance, climb the revealed stairs, and fish in the water at the top.",
        guideUrl: "../blog/sandfalls-all-collectibles.html"
      },
      {
        id: "sandfalls-lock-01",
        region: "sandfalls",
        category: "upgrade-other",
        title: "Kear Lock #1",
        landmarks: ["first-bomb-route", "niter-belt-bomb-puzzle"],
        signals: COMMON_SIGNALS,
        highMiss: false,
        requirement: "1 Kear and the first bomb",
        location: "The locked cave behind the first TNT minecart.",
        reason: "The route remains sealed until the nearby bomb is thrown into the TNT minecart.",
        route: "Head down-right from the entrance, burrow under the bomb, throw it at the TNT minecart, then spend one Kear on the revealed Lock.",
        guideUrl: "../blog/sandfalls-all-collectibles.html"
      },
      {
        id: "sandfalls-bonestone-01",
        region: "sandfalls",
        category: "bonestone",
        title: "Bonestone #1 — Left Bomb Chamber",
        landmarks: ["niter-belt-bomb-puzzle"],
        signals: COMMON_SIGNALS,
        highMiss: true,
        requirement: "Open Lock #1 and solve the bomb-routing puzzle",
        location: "The left breakable section at the bottom of the Niter Belt puzzle.",
        reason: "Players often open the middle route for Niter Belt and leave both side rewards behind.",
        route: "Release the bomb, shift the sand strips with the switches, and guide the bomb into the left breakable section.",
        guideUrl: "../blog/sandfalls-all-collectibles.html"
      },
      {
        id: "sandfalls-niter-belt",
        region: "sandfalls",
        category: "trinket",
        title: "Niter Belt",
        landmarks: ["niter-belt-bomb-puzzle"],
        signals: COMMON_SIGNALS,
        highMiss: true,
        requirement: "Open Lock #1 and clear the middle bomb route",
        location: "North of the middle breakable section in the bomb-puzzle cave.",
        reason: "The Trinket is beyond the center section of a three-target bomb puzzle rather than in the first visible chest.",
        route: "Guide the released bomb into the middle breakable section, then follow the opened path north to the Trinket.",
        guideUrl: "../database/trinkets/niter-belt.html"
      },
      {
        id: "sandfalls-bonestone-02",
        region: "sandfalls",
        category: "bonestone",
        title: "Bonestone #2 — Right Bomb Chamber",
        landmarks: ["niter-belt-bomb-puzzle"],
        signals: COMMON_SIGNALS,
        highMiss: true,
        requirement: "Open Lock #1 and solve the bomb-routing puzzle",
        location: "The right breakable section at the bottom of the Niter Belt puzzle.",
        reason: "The right reward can remain unopened even after the central story route has been cleared.",
        route: "Reset the puzzle if needed, guide another bomb into the right breakable section, and open the reward.",
        guideUrl: "../blog/sandfalls-all-collectibles.html"
      },
      {
        id: "sandfalls-tunneling-codex",
        region: "sandfalls",
        category: "trinket",
        title: "Tunneling Codex",
        landmarks: ["ring-dive-parlor", "npc-house"],
        signals: COMMON_SIGNALS,
        highMiss: true,
        requirement: "100 Bones entry fee and a 5,000-point Ring Diver score",
        location: "Ring Dive Parlor below the ledge near the NPC house.",
        reason: "This Trinket is a mini-game score reward, so normal chest hunting will never reveal it.",
        route: "Enter the Ring Dive Parlor, pay 100 Bones, burrow through the ring centers, preserve the combo, and reach 5,000 points.",
        guideUrl: "../database/trinkets/tunneling-codex.html"
      },
      {
        id: "sandfalls-lock-02",
        region: "sandfalls",
        category: "upgrade-other",
        title: "Kear Lock #2",
        landmarks: ["moving-platforms"],
        signals: COMMON_SIGNALS,
        highMiss: true,
        requirement: "1 Kear and the hidden moving-platform entrance",
        location: "Below the raised bomb platform at the bottom of Sifted Sands.",
        reason: "The entrance is hidden underneath a platform and only lines up while the moving platforms pass below.",
        route: "Wait on the right side of the raised bomb platform, ride or follow a moving platform below it, and burrow into the hidden opening.",
        guideUrl: "../blog/sandfalls-all-collectibles.html"
      },
      {
        id: "sandfalls-vial-pouch",
        region: "sandfalls",
        category: "upgrade-other",
        title: "Vial Pouch",
        landmarks: ["moving-platforms"],
        signals: COMMON_SIGNALS,
        highMiss: true,
        requirement: "Open Kear Lock #2",
        location: "The locked chest below the moving-platform bomb route.",
        reason: "The upgrade shares the same concealed entrance as Lock #2 and is invisible from the main path.",
        route: "Use the hidden opening below the bomb platform, spend one Kear on Lock #2, and open the chest inside.",
        guideUrl: "../blog/sandfalls-all-collectibles.html"
      },
      {
        id: "sandfalls-bonestone-03",
        region: "sandfalls",
        category: "bonestone",
        title: "Bonestone #3 — Western Minecart Route",
        landmarks: ["moving-platforms", "western-minecart-route"],
        signals: COMMON_SIGNALS,
        highMiss: false,
        requirement: "Send the bomb across the moving platforms",
        location: "The left side of the western route beyond the linked minecarts.",
        reason: "The route opens only when a bomb is moved left across the platforms before it explodes.",
        route: "Move the bomb above the Vial Pouch route left across the platforms, destroy the minecarts, then continue through the enemy rooms to the chest.",
        guideUrl: "../blog/sandfalls-all-collectibles.html"
      },
      {
        id: "sandfalls-bonestone-04",
        region: "sandfalls",
        category: "bonestone",
        title: "Bonestone #4 — Hidden Western Wall",
        landmarks: ["western-minecart-route"],
        signals: COMMON_SIGNALS,
        highMiss: true,
        requirement: "Carry a bomb back down the western route",
        location: "Behind the bomb-opened wall below the small western tunnels.",
        reason: "The correct bomb must be carried backward and downward, away from the obvious route.",
        route: "Continue above Bonestone #3, take the next bomb back down the left side, and throw it into the lower wall to reveal the chest route.",
        guideUrl: "../blog/sandfalls-all-collectibles.html"
      },
      {
        id: "sandfalls-lock-03",
        region: "sandfalls",
        category: "upgrade-other",
        title: "Kear Lock #3",
        landmarks: ["western-minecart-route", "lower-western-route"],
        signals: COMMON_SIGNALS,
        highMiss: false,
        requirement: "1 Kear",
        location: "The lower western path left of Bonestone #4.",
        reason: "This final Sandfalls Lock is far from the central route and can also be approached from the Bone Beach border pipe.",
        route: "Follow the path left from Bonestone #4, or return through the Hide Tent boundary pipe, then spend one Kear on the Lock.",
        guideUrl: "../blog/sandfalls-all-collectibles.html"
      },
      {
        id: "sandfalls-bonestone-05",
        region: "sandfalls",
        category: "bonestone",
        title: "Bonestone #5 — Lower Rope Route",
        landmarks: ["lower-western-route"],
        signals: COMMON_SIGNALS,
        highMiss: true,
        requirement: "Open Kear Lock #3",
        location: "The chest below the ropes beyond the third Lock.",
        reason: "This chest sits past the last Lock on a boundary route that many players do not revisit.",
        route: "Open Lock #3, continue forward, descend the rope route, and open the chest at the bottom.",
        guideUrl: "../blog/sandfalls-all-collectibles.html"
      },
      {
        id: "sandfalls-anglers-raft",
        region: "sandfalls",
        category: "upgrade-other",
        title: "Angler's Raft",
        landmarks: ["lower-western-route"],
        signals: COMMON_SIGNALS,
        highMiss: false,
        requirement: "Reach the Bonestone #5 route",
        location: "A water-side chest one rope above the Bonestone #5 path.",
        reason: "The upgrade is a Fishing Rod form, not a normal standalone Sidearm pickup.",
        route: "From Bonestone #5, climb back up one rope, head right toward the water, and open the chest.",
        guideUrl: "../blog/sandfalls-all-collectibles.html"
      },
      {
        id: "sandfalls-joule-box",
        region: "sandfalls",
        category: "upgrade-other",
        title: "Joule Box",
        landmarks: ["western-minecart-route"],
        signals: COMMON_SIGNALS,
        highMiss: true,
        requirement: "Throw a bomb upward into the moving sand",
        location: "The chest inside the second bomb-opened western cave.",
        reason: "The sealed cave is above the normal route and requires an upward bomb throw that is easy to overlook.",
        route: "Return to the bomb near the hidden western wall, throw it upward into the moving sand, enter the opened cave, defeat the large skull enemy, and open the right chest.",
        guideUrl: "../blog/sandfalls-all-collectibles.html"
      },
      {
        id: "sandfalls-blaise-race",
        region: "sandfalls",
        category: "upgrade-other",
        title: "Blaise's Sandfalls Race",
        landmarks: ["sandy-station"],
        signals: COMMON_SIGNALS,
        highMiss: false,
        requirement: "Clear the southeast minecart route and win the race",
        location: "Sandy Station.",
        reason: "Winning this race completes the Sandfalls regional task but does not award Bellows Bustle by itself.",
        route: "Clear the southeast minecarts, reach Sandy Station, speak with Blaise, and win the Sandfalls course.",
        guideUrl: "../blog/sandfalls-all-collectibles.html"
      },
      {
        id: "sandfalls-kear-01",
        region: "sandfalls",
        category: "kear",
        title: "Post-Bone Beach Kear",
        landmarks: ["npc-house"],
        signals: COMMON_SIGNALS,
        highMiss: true,
        requirement: "Complete the Bone Beach section, then return",
        location: "Outside the Sandfalls NPC house.",
        reason: "The Kear does not appear during the first Sandfalls visit, so a full early sweep cannot collect it.",
        route: "After completing Bone Beach, return to the NPC house in Sandfalls and defeat the creature outside to collect the Kear.",
        guideUrl: "../blog/sandfalls-all-collectibles.html"
      },
      {
        id: "sandfalls-volatile-beastium",
        region: "sandfalls",
        category: "trinket",
        title: "Volatile Beastium",
        landmarks: ["sandy-station"],
        signals: ["yellow-orange", "red", "region-only", "no-skull"],
        highMiss: true,
        requirement: "700 Bones and access to the train route",
        location: "Vitas on the moving train, between the passenger carriage and locomotive.",
        reason: "The Sandy Station Skull can flicker yellow or orange for this off-screen train purchase.",
        route: "Board the train between Bone Beach and Nox's Bayou, move through the passenger carriage, find Vitas before the locomotive, and buy the Trinket for 700 Bones.",
        guideUrl: "../database/trinkets/volatile-beastium.html"
      },
  
      /* ============================================================
         BONE BEACH — 21 records
         11 Bonestones + 2 Trinkets + 3 Kears + 5 Upgrade / Other
         ============================================================ */
      {
        id: "bone-beach-bonestone-01",
        region: "bone-beach",
        category: "bonestone",
        title: "Bonestone #1 — Entrance Wall",
        landmarks: ["region-entrance"],
        signals: COMMON_SIGNALS,
        highMiss: true,
        requirement: "Progress until Mr. Furgus moves, then return",
        location: "Behind the blocked wall near the Bone Beach entrance.",
        reason: "The wall cannot be cleared while the NPC scene still blocks it, making this a common last item.",
        route: "Help Mr. Furgus if the scene is active, progress farther into Bone Beach, return after he moves, break the wall, and follow the path behind the tower.",
        guideUrl: "../blog/bone-beach-all-collectibles.html"
      },
      {
        id: "bone-beach-bonestone-02",
        region: "bone-beach",
        category: "bonestone",
        title: "Bonestone #2 — Upper Bone Rush Trail",
        landmarks: ["region-entrance"],
        signals: COMMON_SIGNALS,
        highMiss: false,
        requirement: "Use the bat handholds and burrow",
        location: "The far upper-right corner of the early Bone Rush Trail.",
        reason: "The isolated ground tile sits above the normal forward route.",
        route: "Launch from the bat handholds toward the upper wall, continue to the far upper-right corner, and burrow under the isolated tile.",
        guideUrl: "../blog/bone-beach-all-collectibles.html"
      },
      {
        id: "bone-beach-bonestone-03",
        region: "bone-beach",
        category: "bonestone",
        title: "Bonestone #3 — Coral Launcher Loop",
        landmarks: ["conveyor-rooms"],
        signals: COMMON_SIGNALS,
        highMiss: true,
        requirement: "Re-enter from below and chain the coral launchers",
        location: "The raised right ledge above the conveyor and coral launcher loop.",
        reason: "The chest is visible before the correct lower re-entry route becomes obvious.",
        route: "Drop to the room below, re-enter the conveyor screen from the left, bounce across the three coral launchers, exit right, and burrow through the glowing ground.",
        guideUrl: "../blog/bone-beach-all-collectibles.html"
      },
      {
        id: "bone-beach-bonestone-04",
        region: "bone-beach",
        category: "bonestone",
        title: "Bonestone #4 — Second Conveyor Gap",
        landmarks: ["conveyor-rooms"],
        signals: COMMON_SIGNALS,
        highMiss: false,
        requirement: "Cross the right-side gap",
        location: "Beyond the far shore in the later conveyor room.",
        reason: "The right-side crossing looks optional and can be skipped while descending through the region.",
        route: "Cross the gap using an umbrella, air dash, or a clean burrow jump, then follow the short route to the Bonestone.",
        guideUrl: "../blog/bone-beach-all-collectibles.html"
      },
      {
        id: "bone-beach-bonestone-05",
        region: "bone-beach",
        category: "bonestone",
        title: "Bonestone #5 — Lower Beach Hooks",
        landmarks: ["hide-tent"],
        signals: COMMON_SIGNALS,
        highMiss: false,
        requirement: "Cross the water with the hanging hooks",
        location: "The far-left path after the first water crossing.",
        reason: "The reward lies at the end of a side path just before the Hide Tent route.",
        route: "Use the hanging hooks to cross the water, move left, continue to the far end, and open the chest before returning toward the tent.",
        guideUrl: "../blog/bone-beach-all-collectibles.html"
      },
      {
        id: "bone-beach-polyp-lamp",
        region: "bone-beach",
        category: "trinket",
        title: "Polyp Lamp",
        landmarks: ["hide-tent"],
        signals: COMMON_SIGNALS,
        highMiss: false,
        requirement: "1,250 Bones",
        location: "The shopkeeper inside the Hide Tent.",
        reason: "This counted Trinket is purchased rather than found in a chest.",
        route: "Enter the Hide Tent from the main beach, follow the interior route to the shopkeeper, and buy Polyp Lamp for 1,250 Bones.",
        guideUrl: "../database/trinkets/polyp-lamp.html"
      },
      {
        id: "bone-beach-kear-01",
        region: "bone-beach",
        category: "kear",
        title: "Kear #1 — Hide Tent Shop",
        landmarks: ["hide-tent"],
        signals: COMMON_SIGNALS,
        highMiss: false,
        requirement: "750 Bones",
        location: "The shopkeeper inside the Hide Tent.",
        reason: "The Kear is a shop purchase and can be missed by players who only search for world pickups.",
        route: "Enter the Hide Tent, follow the route to the shopkeeper, and buy the Kear for 750 Bones.",
        guideUrl: "../blog/bone-beach-all-collectibles.html"
      },
      {
        id: "bone-beach-goremaw-fang",
        region: "bone-beach",
        category: "upgrade-other",
        title: "Goremaw Fang",
        landmarks: ["hide-tent"],
        signals: COMMON_SIGNALS,
        highMiss: false,
        requirement: "Fishing Rod; heal before the catch if needed",
        location: "The main beach water immediately outside the Hide Tent.",
        reason: "This regional item is a hostile fish encounter rather than a visible pickup.",
        route: "Equip the Fishing Rod and fish in the main beach water outside the Hide Tent until you catch Goremaw Fang.",
        guideUrl: "../blog/bone-beach-all-collectibles.html"
      },
      {
        id: "bone-beach-joule-syringe",
        region: "bone-beach",
        category: "trinket",
        title: "Joule Syringe",
        landmarks: ["secret-shoals"],
        signals: COMMON_SIGNALS,
        highMiss: true,
        requirement: "Reach the castaway island and burrow behind him",
        location: "Sparkling ground behind the Secret Shoals castaway near the tree.",
        reason: "There is no obvious chest; the Trinket is buried behind the tree on an optional island.",
        route: "Enter Secret Shoals from the southern Mining Camp gap, descend by burrowing through the barrels, reach the castaway island, and burrow through the sparkling ground behind him.",
        guideUrl: "../database/trinkets/joule-syringe.html"
      },
      {
        id: "bone-beach-kear-02",
        region: "bone-beach",
        category: "kear",
        title: "Kear #2 — Calcified Caves",
        landmarks: ["calcified-caves"],
        signals: COMMON_SIGNALS,
        highMiss: false,
        requirement: "Enter the cave split from above",
        location: "A middle-level chest in Calcified Caves.",
        reason: "Taking the waterfall drop first bypasses the middle-level chest.",
        route: "At the door-and-waterfall split, enter the cave from above and open the middle-level chest before dropping farther.",
        guideUrl: "../blog/bone-beach-all-collectibles.html"
      },
      {
        id: "bone-beach-lock-01",
        region: "bone-beach",
        category: "upgrade-other",
        title: "Kear Lock #1",
        landmarks: ["calcified-caves"],
        signals: COMMON_SIGNALS,
        highMiss: false,
        requirement: "1 spare Kear",
        location: "Below the waterfall in Calcified Caves.",
        reason: "This is Bone Beach's only Kear Lock and it sits below a one-way-looking drop.",
        route: "Climb back after collecting Kear #2, drop through the waterfall, and spend one Kear on the Lock.",
        guideUrl: "../blog/bone-beach-all-collectibles.html"
      },
      {
        id: "bone-beach-bonestone-06",
        region: "bone-beach",
        category: "bonestone",
        title: "Bonestone #6 — Fian's Cell",
        landmarks: ["calcified-caves"],
        signals: COMMON_SIGNALS,
        highMiss: true,
        requirement: "Open the Kear Lock, clear the Miner cell, and free Fian",
        location: "Behind the breakable wall beside Fian.",
        reason: "The Bonestone is beyond the region's Lock and hidden behind a second wall near the rescued NPC.",
        route: "Open the waterfall Lock, clear the cell room, free Fian, then break the wall beside him and follow the route to the Bonestone.",
        guideUrl: "../blog/bone-beach-all-collectibles.html"
      },
      {
        id: "bone-beach-bonestone-07",
        region: "bone-beach",
        category: "bonestone",
        title: "Bonestone #7 — Beached Creature Shore",
        landmarks: ["worms-back"],
        signals: COMMON_SIGNALS,
        highMiss: false,
        requirement: "Follow the underwater sparkle and handhold route",
        location: "The raised shore beside the beached creature.",
        reason: "The handholds appear only after following the underwater sparkle trail.",
        route: "Before entering the creature, take the right route, burrow along the underwater sparkle trail, reveal the handholds, and follow them to the raised-shore chest.",
        guideUrl: "../blog/bone-beach-all-collectibles.html"
      },
      {
        id: "bone-beach-bonestone-08",
        region: "bone-beach",
        category: "bonestone",
        title: "Bonestone #8 — Pulsing Tract",
        landmarks: ["worms-back"],
        signals: COMMON_SIGNALS,
        highMiss: true,
        requirement: "Break the right wall and the hidden tooth",
        location: "A concealed corridor in the early Dreadworm interior.",
        reason: "The normal route exits left while the collectible route begins through an unmarked wall on the right.",
        route: "In early Pulsing Tract, break the right wall before taking the normal left exit, follow the corridor, and destroy the tooth at the end.",
        guideUrl: "../blog/bone-beach-all-collectibles.html"
      },
      {
        id: "bone-beach-battery-buster",
        region: "bone-beach",
        category: "upgrade-other",
        title: "Battery Buster",
        landmarks: ["worms-back"],
        signals: COMMON_SIGNALS,
        highMiss: false,
        requirement: "Chain the coral launchers above the tent",
        location: "A red chest beyond the left exit on Worm's Back.",
        reason: "The weapon route starts above the main path and requires committing to a launcher chain across the tent.",
        route: "Drop onto the upper-right coral launcher, bounce left across the tent, take the left exit, and open the red chest.",
        guideUrl: "../blog/bone-beach-all-collectibles.html"
      },
      {
        id: "bone-beach-bonestone-09",
        region: "bone-beach",
        category: "bonestone",
        title: "Bonestone #9 — Worm's Back Ledge",
        landmarks: ["worms-back"],
        signals: COMMON_SIGNALS,
        highMiss: false,
        requirement: "Take the wooden path down and burrow at the high ledge",
        location: "The ledge overlooking the Dreadworm's head.",
        reason: "The burrow point sits at the end of an exterior side route after the Battery Buster detour.",
        route: "Return to the tent area, continue right, take the wooden path down, and burrow on the high ledge above the Dreadworm's head.",
        guideUrl: "../blog/bone-beach-all-collectibles.html"
      },
      {
        id: "bone-beach-kear-03",
        region: "bone-beach",
        category: "kear",
        title: "Kear #3 — Stomach Mine",
        landmarks: ["stomach-mine"],
        signals: COMMON_SIGNALS,
        highMiss: true,
        requirement: "Clear the brain enemy, use both switches, and wait for the launcher",
        location: "The lower-right route in the large Stomach Mine room.",
        reason: "The coral launcher rises from a hole only after the route is prepared, so the Kear can appear unreachable.",
        route: "Clear the central brain enemy, use the moving handholds to reach the upper-right route, drop lower-right, activate the route, and bounce across when the launcher rises.",
        guideUrl: "../blog/bone-beach-all-collectibles.html"
      },
      {
        id: "bone-beach-bonestone-10-moving-stairs",
        region: "bone-beach",
        category: "bonestone",
        title: "Bonestone #10 — Moving Staircase",
        landmarks: ["gut-depths"],
        signals: COMMON_SIGNALS,
        highMiss: true,
        requirement: "Stay on the retracting staircase as it moves off-screen",
        location: "A secret right-hand room in the Gut Depths moving-floor section.",
        reason: "The staircase looks like part of the hazard, but it carries Mina into a hidden room outside the visible route.",
        route: "Pass the three green slime enemies, stand on the small upper staircase, let it carry Mina right into the secret room, and burrow through the glowing floor.",
        guideUrl: "../blog/bone-beach-all-collectibles.html"
      },
      {
        id: "bone-beach-bonestone-11-dark-tunnel",
        region: "bone-beach",
        category: "bonestone",
        title: "Bonestone #11 — Dark Tunnel",
        landmarks: ["gut-depths", "brain-alcove"],
        signals: COMMON_SIGNALS,
        highMiss: true,
        requirement: "Enter the left tunnel, attack through darkness, and reveal the floor hole",
        location: "The hidden left tunnel near the Gut Depths endpoint.",
        reason: "The entrance is concealed beside the large platforms and the route continues through darkness behind hidden obstructions.",
        route: "Before leaving Gut Depths, search the left side of the large platforms, enter the dark tunnel, attack through the obstructions, destroy the candlestick, and drop through the revealed burrow hole.",
        guideUrl: "../blog/bone-beach-all-collectibles.html"
      },
      {
        id: "bone-beach-health-rose",
        region: "bone-beach",
        category: "upgrade-other",
        title: "Health Rose",
        landmarks: ["brain-alcove"],
        signals: COMMON_SIGNALS,
        highMiss: false,
        requirement: "Defeat Mined Mind",
        location: "The Mined Mind boss area in Brain Alcove.",
        reason: "The reward is collected after the boss rather than found during the dungeon sweep.",
        route: "Defeat Mined Mind in Brain Alcove and collect the Health Rose before leaving the arena.",
        guideUrl: "../blog/bone-beach-all-collectibles.html"
      },
      {
        id: "bone-beach-spark-generator",
        region: "bone-beach",
        category: "upgrade-other",
        title: "Spark Generator",
        landmarks: ["brain-alcove"],
        signals: COMMON_SIGNALS,
        highMiss: true,
        requirement: "Complete the post-boss Shoreline Generator route",
        location: "The generator route north of Brain Alcove toward Ossex.",
        reason: "The regional generator sits after the boss and away from the main Bone Beach cleanup loop.",
        route: "Continue north after Mined Mind, return toward Ossex, clear the Shoreline Generator obstacles, and burrow into the final generator hole.",
        guideUrl: "../blog/bone-beach-all-collectibles.html"
      }
    ];
  
    window.MISSING_ITEMS_DATA = Object.freeze({
      LANDMARKS: Object.freeze(LANDMARKS),
      ITEM_DATA: Object.freeze(ITEM_DATA),
      LABELS: Object.freeze(LABELS)
    });
  })();
  