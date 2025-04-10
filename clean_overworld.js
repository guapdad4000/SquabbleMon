/**
 * CLEAN OVERWORLD SYSTEM
 * A simplified, self-contained implementation of the exploration mode
 */

// Use a module pattern to avoid global variable conflicts
const NewOverworldSystem = (function () {
  // Main game state
  let player = {
    x: 5,
    y: 5,
    direction: "down",
    moving: false,
    sprite: null,
  };

  // Map data - expanded tile types for a more detailed urban environment
  const TILE_TYPES = {
    // Basic tiles
    EMPTY: 0,
    WALL: 1,
    NPC: 2,
    DOOR: 3,
    ENCOUNTER: 4,
    SHOP: 5,

    // Street tiles
    STREET: 10,
    STREET_HORIZONTAL: 11,
    STREET_VERTICAL: 12,
    STREET_INTERSECTION: 13,
    STREET_CORNER_NE: 14,
    STREET_CORNER_NW: 15,
    STREET_CORNER_SE: 16,
    STREET_CORNER_SW: 17,
    CROSSWALK: 18,

    // Building tiles
    BUILDING_WALL: 20,
    BUILDING_WINDOW: 21,
    BUILDING_DOOR: 22,
    BUILDING_ROOF: 23,
    BUILDING_CORNER: 24,

    // Nature tiles
    GRASS: 30,
    TREE: 31,
    BUSH: 32,
    WATER: 33,

    // Urban decoration
    TRASH_CAN: 40,
    BENCH: 41,
    STREETLIGHT: 42,
    HYDRANT: 43,
    GRAFFITI: 44,
    BASKETBALL_HOOP: 45,

    // Special locations
    TRAP_HOUSE_EXTERIOR: 50,
    MOMMAS_KITCHEN_EXTERIOR: 51,
    CORNER_STORE_EXTERIOR: 52,
    FADE_PARK_ENTRANCE: 53,
    THE_OPPS_TERRITORY: 54,
  };

  // Zone definitions
  const ZONE_TYPES = {
    MAIN_STREET: "main_street", // Central hub connecting all locations
    TRAP_HOUSE: "trap_house", // The Trap House - Dealer's spot
    MOMMAS_KITCHEN: "mommas_kitchen", // Momma's Kitchen - Healing spot
    FADE_PARK: "fade_park", // Fade Park - Battle arena
    THE_OPPS_HOOD: "opps_hood", // The Opps Hood - Enemy territory
  };

  // Current zone
  let currentZone = ZONE_TYPES.MAIN_STREET;

  // Zone-specific data
  const ZONE_DATA = {
    // MAIN STREET - Central hub that connects all four main locations
    [ZONE_TYPES.MAIN_STREET]: {
      name: "Main Street",
      encounterRate: 0.1, // Occasional random encounters
      minLevel: 3,
      maxLevel: 7,
      map: [
        // A 15x15 urban map with streets and buildings
        [20, 20, 20, 20, 20, 21, 22, 21, 20, 20, 20, 20, 20, 20, 20], // 0
        [20, 30, 31, 30, 20, 11, 11, 11, 20, 30, 30, 30, 31, 30, 20], // 1
        [20, 30, 30, 30, 20, 11, 11, 11, 20, 30, 52, 30, 30, 30, 20], // 2 - Corner Store at (10,2)
        [20, 30, 30, 30, 20, 11, 11, 11, 20, 30, 30, 30, 30, 30, 20], // 3
        [20, 20, 20, 20, 20, 11, 11, 11, 20, 20, 20, 20, 20, 20, 20], // 4
        [20, 11, 11, 11, 11, 13, 11, 11, 11, 11, 11, 11, 11, 11, 20], // 5 - Horizontal street
        [20, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 20], // 6
        [20, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 20], // 7
        [20, 20, 20, 20, 20, 11, 11, 11, 20, 20, 20, 20, 20, 20, 20], // 8
        [20, 30, 30, 30, 20, 11, 11, 11, 20, 31, 30, 30, 53, 30, 20], // 9 - Fade Park at (12,9)
        [20, 30, 50, 30, 20, 11, 11, 11, 20, 30, 30, 30, 30, 30, 20], // 10 - Trap House at (2,10)
        [20, 30, 30, 30, 20, 11, 11, 11, 20, 30, 30, 31, 30, 30, 20], // 11
        [20, 20, 20, 20, 20, 11, 11, 11, 20, 20, 20, 20, 20, 20, 20], // 12
        [20, 30, 30, 51, 20, 11, 11, 11, 20, 31, 30, 54, 30, 30, 20], // 13 - Momma's (3,13), Opps Hood (11,13)
        [20, 20, 20, 20, 20, 20, 22, 20, 20, 20, 20, 20, 20, 20, 20], // 14
      ],
      npcs: [
        {
          x: 7,
          y: 5,
          direction: "down",
          name: "Street Vendor",
          sprite: "shopkeeper",
          dialogue: ["Yo, check out my wares.", "Best prices in the hood!"],
          isShop: true,
          shopType: "corner",
        },
        {
          x: 3,
          y: 7,
          direction: "right",
          name: "Hood Kid",
          sprite: "rasta",
          dialogue: [
            "Watch yourself around here.",
            "The opps be patrolling these streets.",
          ],
        },
        {
          x: 11,
          y: 7,
          direction: "left",
          name: "B-Ball Kid",
          sprite: "fitness",
          dialogue: [
            "You tryna ball? Head to Fade Park.",
            "That's where we settle beef.",
          ],
        },
      ],
      doors: [
        // Door to Trap House
        {
          x: 2,
          y: 10,
          targetZone: ZONE_TYPES.TRAP_HOUSE,
          targetX: 5,
          targetY: 8,
        },
        // Door to Momma's Kitchen
        {
          x: 3,
          y: 13,
          targetZone: ZONE_TYPES.MOMMAS_KITCHEN,
          targetX: 4,
          targetY: 8,
        },
        // Door to Fade Park
        {
          x: 12,
          y: 9,
          targetZone: ZONE_TYPES.FADE_PARK,
          targetX: 5,
          targetY: 1,
        },
        // Door to Opps Hood
        {
          x: 11,
          y: 13,
          targetZone: ZONE_TYPES.THE_OPPS_HOOD,
          targetX: 5,
          targetY: 1,
        },
      ],
    },

    // THE TRAP HOUSE - Where you buy items and gear
    [ZONE_TYPES.TRAP_HOUSE]: {
      name: "The Trap House",
      encounterRate: 0.05, // Low encounter rate inside
      minLevel: 4,
      maxLevel: 8,
      map: [
        // A 10x10 interior of the trap house
        [20, 20, 20, 20, 20, 20, 20, 20, 20, 20], // 0
        [20, 21, 21, 21, 21, 21, 21, 21, 21, 20], // 1
        [20, 21, 40, 0, 0, 0, 0, 44, 21, 20], // 2 - Trash can, graffiti
        [20, 0, 0, 0, 0, 0, 0, 0, 0, 20], // 3
        [20, 0, 0, 0, 41, 0, 0, 0, 0, 20], // 4 - Bench
        [20, 0, 0, 0, 0, 0, 0, 0, 0, 20], // 5
        [20, 0, 0, 0, 0, 0, 0, 0, 0, 20], // 6
        [20, 21, 0, 0, 0, 0, 0, 0, 21, 20], // 7
        [20, 21, 0, 0, 0, 22, 0, 0, 21, 20], // 8 - Exit door in middle-bottom
        [20, 20, 20, 20, 20, 20, 20, 20, 20, 20], // 9
      ],
      npcs: [
        {
          x: 7,
          y: 4,
          direction: "left",
          name: "Trap House Dealer",
          sprite: "dealer",
          dialogue: [
            "Welcome to the spot.",
            "I got what you need for the right price.",
          ],
          isShop: true,
          shopType: "trap",
        },
        {
          x: 2,
          y: 6,
          direction: "right",
          name: "Lookout",
          sprite: "rasta",
          dialogue: [
            "Keep it down, we don't want the opps knowing our business.",
            "Cops been rolling through lately too.",
          ],
        },
      ],
      doors: [
        {
          x: 5,
          y: 8,
          targetZone: ZONE_TYPES.MAIN_STREET,
          targetX: 2,
          targetY: 9,
        },
      ],
    },

    // MOMMA'S KITCHEN - Healing spot
    [ZONE_TYPES.MOMMAS_KITCHEN]: {
      name: "Momma's Kitchen",
      encounterRate: 0, // Safe zone, no encounters
      minLevel: 1,
      maxLevel: 1,
      map: [
        // A 9x9 cozy kitchen
        [20, 20, 20, 20, 20, 20, 20, 20, 20], // 0
        [20, 21, 21, 21, 21, 21, 21, 21, 20], // 1
        [20, 21, 0, 0, 0, 0, 0, 21, 20], // 2
        [20, 0, 0, 0, 0, 0, 0, 0, 20], // 3
        [20, 0, 0, 41, 41, 41, 0, 0, 20], // 4 - Table with chairs (benches)
        [20, 0, 0, 0, 0, 0, 0, 0, 20], // 5
        [20, 0, 0, 0, 0, 0, 0, 0, 20], // 6
        [20, 21, 0, 0, 0, 0, 0, 21, 20], // 7
        [20, 20, 20, 20, 22, 20, 20, 20, 20], // 8 - Exit door in middle-bottom
      ],
      npcs: [
        {
          x: 4,
          y: 2,
          direction: "down",
          name: "Momma",
          sprite: "mom",
          dialogue: [
            "Baby, you look tired!",
            "Let me fix you up something good.",
            "Nothing heals like Momma's cooking.",
          ],
          healOnEnd: true,
        },
      ],
      doors: [
        {
          x: 4,
          y: 8,
          targetZone: ZONE_TYPES.MAIN_STREET,
          targetX: 3,
          targetY: 12,
        },
      ],
    },

    // FADE PARK - Battle arena
    [ZONE_TYPES.FADE_PARK]: {
      name: "Fade Park",
      encounterRate: 0.25, // High encounter rate - it's a battle zone
      minLevel: 5,
      maxLevel: 10,
      map: [
        // A 12x12 park with basketball court
        [31, 31, 31, 31, 31, 22, 31, 31, 31, 31, 31, 31], // 0 - Trees with entrance
        [31, 30, 30, 30, 30, 0, 30, 30, 30, 30, 30, 31], // 1
        [31, 30, 45, 30, 30, 30, 30, 30, 30, 45, 30, 31], // 2 - Basketball hoops
        [31, 30, 0, 0, 0, 0, 0, 0, 0, 0, 30, 31], // 3
        [31, 30, 0, 0, 0, 0, 0, 0, 0, 0, 30, 31], // 4
        [31, 30, 0, 0, 0, 0, 0, 0, 0, 0, 30, 31], // 5
        [31, 30, 0, 0, 0, 0, 0, 0, 0, 0, 30, 31], // 6
        [31, 30, 0, 0, 0, 0, 0, 0, 0, 0, 30, 31], // 7
        [31, 30, 0, 0, 0, 0, 0, 0, 0, 0, 30, 31], // 8
        [31, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 31], // 9
        [31, 31, 31, 31, 31, 41, 41, 31, 31, 31, 31, 31], // 10 - Benches and trees
        [31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31], // 11
      ],
      npcs: [
        {
          x: 3,
          y: 5,
          direction: "right",
          name: "B-Ball Captain",
          sprite: "fitness",
          dialogue: [
            "You step on my court, you better be ready to ball.",
            "Let's see what you got!",
          ],
          battleOnEnd: true,
          level: 8,
        },
        {
          x: 8,
          y: 7,
          direction: "left",
          name: "Street Baller",
          sprite: "rasta",
          dialogue: [
            "This park belongs to us.",
            "You want respect? Gotta earn it!",
          ],
          battleOnEnd: true,
          level: 7,
        },
      ],
      doors: [
        {
          x: 5,
          y: 0,
          targetZone: ZONE_TYPES.MAIN_STREET,
          targetX: 12,
          targetY: 8,
        },
      ],
    },

    // THE OPPS HOOD - Enemy territory with tough opponents
    [ZONE_TYPES.THE_OPPS_HOOD]: {
      name: "The Opps Hood",
      encounterRate: 0.3, // Highest encounter rate - dangerous area
      minLevel: 8,
      maxLevel: 12,
      map: [
        // A 10x10 dangerous neighborhood
        [20, 20, 20, 20, 20, 22, 20, 20, 20, 20], // 0 - Entrance at top
        [20, 44, 0, 0, 0, 0, 0, 0, 44, 20], // 1 - Graffiti
        [20, 0, 0, 0, 0, 0, 0, 0, 0, 20], // 2
        [20, 0, 0, 40, 0, 0, 40, 0, 0, 20], // 3 - Trash cans
        [20, 0, 0, 0, 0, 0, 0, 0, 0, 20], // 4
        [20, 0, 0, 0, 4, 4, 0, 0, 0, 20], // 5 - Encounter triggers
        [20, 0, 0, 0, 4, 4, 0, 0, 0, 20], // 6 - Encounter triggers
        [20, 0, 0, 0, 0, 0, 0, 0, 0, 20], // 7
        [20, 0, 43, 0, 0, 0, 0, 43, 0, 20], // 8 - Fire hydrants
        [20, 20, 20, 20, 20, 20, 20, 20, 20, 20], // 9
      ],
      npcs: [
        {
          x: 2,
          y: 4,
          direction: "right",
          name: "Opp Lieutenant",
          sprite: "fitness",
          dialogue: [
            "You're in the wrong hood.",
            "Time to teach you a lesson!",
          ],
          battleOnEnd: true,
          level: 10,
        },
        {
          x: 7,
          y: 4,
          direction: "left",
          name: "Opp Soldier",
          sprite: "karen",
          dialogue: [
            "We don't take kindly to outsiders.",
            "Let's settle this right now!",
          ],
          battleOnEnd: true,
          level: 9,
        },
        {
          x: 5,
          y: 8,
          direction: "up",
          name: "Opp Boss",
          sprite: "dealer",
          dialogue: [
            "So you made it this far?",
            "Let's see if you're really about that life.",
          ],
          battleOnEnd: true,
          level: 12,
        },
      ],
      doors: [
        {
          x: 5,
          y: 0,
          targetZone: ZONE_TYPES.MAIN_STREET,
          targetX: 11,
          targetY: 12,
        },
      ],
    },
  };

  // UI elements
  let overworldContainer = null;
  let mapContainer = null;
  let playerSprite = null;
  let dialogueBox = null;
  let dialogueText = null;
  let dialogueNpcName = null;
  let currentDialogueNpc = null;
  let dialogueIndex = 0;

  // Timing
  let lastMoveTime = 0;
  let moveCooldown = 80; // ms between moves (reduced from 200ms for faster response)

  // Control state
  let keysPressed = {
    up: false,
    down: false,
    left: false,
    right: false,
    action: false,
  };

  /**
   * Initialize the overworld with the given character
   */
  function initOverworld(selectedCharacter) {
    console.log("Initializing clean overworld system...");

    // Load the urban renderer and tiles if they're not already loaded
    if (
      typeof URBAN_RENDERER === "undefined" ||
      typeof URBAN_TILES === "undefined"
    ) {
      console.log("Loading urban renderer and tiles...");

      // Load urban renderer
      const rendererScript = document.createElement("script");
      rendererScript.src = "public/assets/urban_renderer.js";
      document.head.appendChild(rendererScript);

      // Load urban tiles
      const tilesScript = document.createElement("script");
      tilesScript.src = "public/assets/urban_tiles.js";
      document.head.appendChild(tilesScript);

      // Load NPC sprites
      const npcSpritesScript = document.createElement("script");
      npcSpritesScript.src = "public/assets/npc_sprites.js";
      document.head.appendChild(npcSpritesScript);

      // Give a small delay to ensure scripts load
      setTimeout(() => {
        console.log("Urban assets loaded, continuing initialization...");
        continueInitialization();
      }, 100);
    } else {
      continueInitialization();
    }

    function continueInitialization() {
      // Create or get overworld container
      overworldContainer = document.getElementById("overworld-container");
      if (!overworldContainer) {
        overworldContainer = document.createElement("div");
        overworldContainer.id = "overworld-container";
        document.body.appendChild(overworldContainer);
      }

      // Clear any existing content
      overworldContainer.innerHTML = "";
      overworldContainer.style.display = "block";

      // Set styles
      overworldContainer.style.position = "relative";
      overworldContainer.style.width = "100vw";
      overworldContainer.style.height = "100vh";
      overworldContainer.style.backgroundColor = "#222";
      overworldContainer.style.overflow = "hidden";

      // Add CSS classes if needed
      const style = document.createElement("style");
      style.textContent = `
        #overworld-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          background-color: #222;
          overflow: hidden;
          font-family: 'Press Start 2P', monospace;
        }
        
        .map-container {
          position: relative;
          width: 640px;
          height: 640px;
          margin: 0 auto;
          top: 50%;
          transform: translateY(-50%);
          background-color: #333;
          border: 4px solid #555;
        }
        
        .tile {
          position: absolute;
          width: 64px;
          height: 64px;
        }
        
        .wall {
          background-color: #555;
          border: 1px solid #666;
        }
        
        .empty {
          background-color: #333;
        }
        
        .door {
          background-color: #854;
          border: 1px solid #965;
        }
        
        .encounter {
          background-color: #474;
        }
        
        .player-sprite, .npc-sprite {
          position: absolute;
          width: 64px;
          height: 64px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          z-index: 10;
          transition: top 0.1s, left 0.1s; /* Faster transitions for smoother movement */
        }
        
        .dialogue-box {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          max-width: 600px;
          background-color: rgba(0, 0, 0, 0.8);
          border: 2px solid #ccc;
          border-radius: 8px;
          padding: 15px;
          color: white;
          z-index: 100;
          display: none;
        }
        
        .dialogue-name {
          color: #ffcc00;
          font-weight: bold;
          margin-bottom: 8px;
        }
        
        .dialogue-text {
          line-height: 1.5;
        }
        
        .zone-name {
          position: absolute;
          top: 20px;
          left: 20px;
          background-color: rgba(0, 0, 0, 0.6);
          color: white;
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 14px;
          z-index: 100;
        }
      `;
      document.head.appendChild(style);

      // Create map container
      mapContainer = document.createElement("div");
      mapContainer.className = "map-container";
      overworldContainer.appendChild(mapContainer);

      // Create zone name display
      const zoneNameDisplay = document.createElement("div");
      zoneNameDisplay.className = "zone-name";
      zoneNameDisplay.textContent = ZONE_DATA[currentZone].name;
      overworldContainer.appendChild(zoneNameDisplay);

      // Create dialogue box
      dialogueBox = document.createElement("div");
      dialogueBox.className = "dialogue-box";

      dialogueNpcName = document.createElement("div");
      dialogueNpcName.className = "dialogue-name";
      dialogueBox.appendChild(dialogueNpcName);

      dialogueText = document.createElement("div");
      dialogueText.className = "dialogue-text";
      dialogueBox.appendChild(dialogueText);

      overworldContainer.appendChild(dialogueBox);

      // Create player sprite
      playerSprite = document.createElement("div");
      playerSprite.className = "player-sprite";
      mapContainer.appendChild(playerSprite);

      // Set initial player position
      player.x = 5;
      player.y = 5;
      player.direction = "down";
      player.moving = false;
      player.sprite = selectedCharacter?.sprite || "default";

      updatePlayerVisual();

      // Render the map
      renderMap();

      // Set up controls
      setupControls();

      console.log("Overworld initialized successfully");
    }
  }

  /**
   * Render the map based on current zone
   */
  function renderMap() {
    // Check for map wrapper
    let mapWrapper = document.querySelector(".map-wrapper");
    if (!mapWrapper) {
      console.log("Creating map wrapper for the first time");
      mapWrapper = document.createElement("div");
      mapWrapper.className = "map-wrapper";
      mapContainer.appendChild(mapWrapper);
    } else {
      // Clear existing map content in the wrapper
      while (mapWrapper.firstChild) {
        mapWrapper.removeChild(mapWrapper.firstChild);
      }
    }

    const zoneMap = ZONE_DATA[currentZone].map;

    // Helper function to get tile color based on type
    function getTileColor(tileType) {
      switch (tileType) {
        // Basic tiles
        case TILE_TYPES.EMPTY:
          return "#333";
        case TILE_TYPES.WALL:
          return "#555";
        case TILE_TYPES.NPC:
          return "#333";
        case TILE_TYPES.DOOR:
          return "#854";
        case TILE_TYPES.ENCOUNTER:
          return "#474";
        case TILE_TYPES.SHOP:
          return "#785";

        // Street tiles
        case TILE_TYPES.STREET:
          return "#444";
        case TILE_TYPES.STREET_HORIZONTAL:
          return "#444";
        case TILE_TYPES.STREET_VERTICAL:
          return "#444";
        case TILE_TYPES.STREET_INTERSECTION:
          return "#444";
        case TILE_TYPES.STREET_CORNER_NE:
          return "#444";
        case TILE_TYPES.STREET_CORNER_NW:
          return "#444";
        case TILE_TYPES.STREET_CORNER_SE:
          return "#444";
        case TILE_TYPES.STREET_CORNER_SW:
          return "#444";
        case TILE_TYPES.CROSSWALK:
          return "#555";

        // Building tiles
        case TILE_TYPES.BUILDING_WALL:
          return "#665";
        case TILE_TYPES.BUILDING_WINDOW:
          return "#667";
        case TILE_TYPES.BUILDING_DOOR:
          return "#764";
        case TILE_TYPES.BUILDING_ROOF:
          return "#433";
        case TILE_TYPES.BUILDING_CORNER:
          return "#554";

        // Nature tiles
        case TILE_TYPES.GRASS:
          return "#363";
        case TILE_TYPES.TREE:
          return "#252";
        case TILE_TYPES.BUSH:
          return "#353";
        case TILE_TYPES.WATER:
          return "#35a";

        // Urban decoration
        case TILE_TYPES.TRASH_CAN:
          return "#666";
        case TILE_TYPES.BENCH:
          return "#875";
        case TILE_TYPES.STREETLIGHT:
          return "#999";
        case TILE_TYPES.HYDRANT:
          return "#d33";
        case TILE_TYPES.GRAFFITI:
          return "#569";
        case TILE_TYPES.BASKETBALL_HOOP:
          return "#a85";

        // Special locations
        case TILE_TYPES.TRAP_HOUSE_EXTERIOR:
          return "#737";
        case TILE_TYPES.MOMMAS_KITCHEN_EXTERIOR:
          return "#975";
        case TILE_TYPES.CORNER_STORE_EXTERIOR:
          return "#695";
        case TILE_TYPES.FADE_PARK_ENTRANCE:
          return "#364";
        case TILE_TYPES.THE_OPPS_TERRITORY:
          return "#744";

        default:
          return "#333";
      }
    }

    // Helper function to get tile display name
    function getTileName(tileType) {
      switch (tileType) {
        // Basic tiles
        case TILE_TYPES.EMPTY:
          return "empty";
        case TILE_TYPES.WALL:
          return "wall";
        case TILE_TYPES.NPC:
          return "npc";
        case TILE_TYPES.DOOR:
          return "door";
        case TILE_TYPES.ENCOUNTER:
          return "encounter";
        case TILE_TYPES.SHOP:
          return "shop";

        // Street tiles
        case TILE_TYPES.STREET:
          return "street";
        case TILE_TYPES.STREET_HORIZONTAL:
          return "street-h";
        case TILE_TYPES.STREET_VERTICAL:
          return "street-v";
        case TILE_TYPES.STREET_INTERSECTION:
          return "street-x";
        case TILE_TYPES.STREET_CORNER_NE:
          return "street-ne";
        case TILE_TYPES.STREET_CORNER_NW:
          return "street-nw";
        case TILE_TYPES.STREET_CORNER_SE:
          return "street-se";
        case TILE_TYPES.STREET_CORNER_SW:
          return "street-sw";
        case TILE_TYPES.CROSSWALK:
          return "crosswalk";

        // Building tiles
        case TILE_TYPES.BUILDING_WALL:
          return "building-wall";
        case TILE_TYPES.BUILDING_WINDOW:
          return "building-window";
        case TILE_TYPES.BUILDING_DOOR:
          return "building-door";
        case TILE_TYPES.BUILDING_ROOF:
          return "building-roof";
        case TILE_TYPES.BUILDING_CORNER:
          return "building-corner";

        // Nature tiles
        case TILE_TYPES.GRASS:
          return "grass";
        case TILE_TYPES.TREE:
          return "tree";
        case TILE_TYPES.BUSH:
          return "bush";
        case TILE_TYPES.WATER:
          return "water";

        // Urban decoration
        case TILE_TYPES.TRASH_CAN:
          return "trash-can";
        case TILE_TYPES.BENCH:
          return "bench";
        case TILE_TYPES.STREETLIGHT:
          return "streetlight";
        case TILE_TYPES.HYDRANT:
          return "hydrant";
        case TILE_TYPES.GRAFFITI:
          return "graffiti";
        case TILE_TYPES.BASKETBALL_HOOP:
          return "basketball-hoop";

        // Special locations
        case TILE_TYPES.TRAP_HOUSE_EXTERIOR:
          return "trap-house";
        case TILE_TYPES.MOMMAS_KITCHEN_EXTERIOR:
          return "mommas-kitchen";
        case TILE_TYPES.CORNER_STORE_EXTERIOR:
          return "corner-store";
        case TILE_TYPES.FADE_PARK_ENTRANCE:
          return "fade-park";
        case TILE_TYPES.THE_OPPS_TERRITORY:
          return "opps-territory";

        default:
          return "unknown";
      }
    }

    // Helper function to add decorative elements to tiles
    function addTileDecoration(tile, tileType) {
      // If urban renderer is available, use it for special tiles
      if (
        typeof URBAN_RENDERER !== "undefined" &&
        typeof URBAN_TILES !== "undefined"
      ) {
        // Map our tile types to urban tiles
        let urbanTileType = null;

        switch (tileType) {
          case TILE_TYPES.STREET_HORIZONTAL:
            urbanTileType = "STREET_HORIZONTAL";
            break;
          case TILE_TYPES.STREET_VERTICAL:
            urbanTileType = "STREET_VERTICAL";
            break;
          case TILE_TYPES.STREET_INTERSECTION:
            urbanTileType = "STREET_INTERSECTION";
            break;
          case TILE_TYPES.HYDRANT:
            urbanTileType = "FIRE_HYDRANT";
            break;
          case TILE_TYPES.TRAP_HOUSE_EXTERIOR:
            urbanTileType = "TRAP_HOUSE";
            break;
          case TILE_TYPES.MOMMAS_KITCHEN_EXTERIOR:
            urbanTileType = "MOMMAS_KITCHEN";
            break;
          case TILE_TYPES.CORNER_STORE_EXTERIOR:
            urbanTileType = "CORNER_STORE";
            break;
          case TILE_TYPES.FADE_PARK_ENTRANCE:
            urbanTileType = "FADE_PARK";
            break;
          case TILE_TYPES.THE_OPPS_TERRITORY:
            urbanTileType = "THE_OPPS_TERRITORY";
            break;
          case TILE_TYPES.TRASH_CAN:
            urbanTileType = "TRASH_CAN";
            break;
          case TILE_TYPES.BENCH:
            urbanTileType = "BENCH";
            break;
          case TILE_TYPES.STREETLIGHT:
            urbanTileType = "STREET_LIGHT";
            break;
          case TILE_TYPES.BASKETBALL_HOOP:
            urbanTileType = "BASKETBALL_HOOP";
            break;
        }

        // If we have a mapping, use urban renderer
        if (urbanTileType && URBAN_TILES[urbanTileType]) {
          try {
            // Clear any existing content
            tile.innerHTML = "";

            // Create the urban tile
            const urbanTile = URBAN_RENDERER.createTile(urbanTileType, 64);

            // Append it to our tile
            tile.appendChild(urbanTile);
            return;
          } catch (error) {
            console.error("Failed to create urban tile:", error);
            // Fall back to default decoration
          }
        }
      }

      // Fallback to original decorations if urban renderer isn't available or fails
      switch (tileType) {
        case TILE_TYPES.STREET_HORIZONTAL:
          tile.innerHTML =
            '<div style="height: 2px; background-color: #fff; opacity: 0.3; margin-top: 30px;"></div>';
          break;
        case TILE_TYPES.STREET_VERTICAL:
          tile.innerHTML =
            '<div style="width: 2px; background-color: #fff; opacity: 0.3; height: 100%; margin-left: 30px;"></div>';
          break;
        case TILE_TYPES.STREET_INTERSECTION:
          tile.innerHTML =
            '<div style="height: 2px; background-color: #fff; opacity: 0.3; margin-top: 30px;"></div><div style="width: 2px; background-color: #fff; opacity: 0.3; height: 100%; margin-left: 30px; margin-top: -32px;"></div>';
          break;
        case TILE_TYPES.BUILDING_WINDOW:
          tile.innerHTML =
            '<div style="width: 20px; height: 20px; background-color: #88f; margin: 20px auto; border: 2px solid #666;"></div>';
          break;
        case TILE_TYPES.BUILDING_DOOR:
          tile.innerHTML =
            '<div style="width: 30px; height: 45px; background-color: #875; margin: 15px auto; border: 2px solid #543;"></div>';
          break;
        case TILE_TYPES.TREE:
          tile.innerHTML =
            '<div style="width: 20px; height: 30px; background-color: #531; margin: 30px auto 0; border-radius: 0 0 5px 5px;"></div><div style="width: 40px; height: 30px; background-color: #363; margin: 0 auto; border-radius: 50%;"></div>';
          break;
        case TILE_TYPES.HYDRANT:
          tile.innerHTML =
            '<div style="width: 15px; height: 25px; background-color: #d33; margin: 20px auto; border-radius: 3px;"></div>';
          break;
        case TILE_TYPES.TRASH_CAN:
          tile.innerHTML =
            '<div style="width: 25px; height: 30px; background-color: #444; margin: 15px auto; border: 2px solid #333; border-radius: 2px;"></div>';
          break;
        case TILE_TYPES.TRAP_HOUSE_EXTERIOR:
          tile.style.position = "relative";
          tile.innerHTML =
            '<div style="position: absolute; bottom: 0; width: 100%; height: 20px; background-color: #646; font-size: 8px; text-align: center; color: #ffa; padding-top: 3px;">TRAP HOUSE</div>';
          break;
        case TILE_TYPES.MOMMAS_KITCHEN_EXTERIOR:
          tile.style.position = "relative";
          tile.innerHTML =
            '<div style="position: absolute; bottom: 0; width: 100%; height: 20px; background-color: #975; font-size: 8px; text-align: center; color: #fff; padding-top: 3px;">MOMMA\'S</div>';
          break;
        case TILE_TYPES.CORNER_STORE_EXTERIOR:
          tile.style.position = "relative";
          tile.innerHTML =
            '<div style="position: absolute; bottom: 0; width: 100%; height: 20px; background-color: #585; font-size: 8px; text-align: center; color: #fff; padding-top: 3px;">STORE</div>';
          break;
        case TILE_TYPES.FADE_PARK_ENTRANCE:
          tile.style.position = "relative";
          tile.innerHTML =
            '<div style="position: absolute; bottom: 0; width: 100%; height: 20px; background-color: #253; font-size: 8px; text-align: center; color: #ffa; padding-top: 3px;">FADE PARK</div>';
          break;
      }
    }

    // Render tiles
    for (let y = 0; y < zoneMap.length; y++) {
      for (let x = 0; x < zoneMap[y].length; x++) {
        const tileType = zoneMap[y][x];
        // Always create a tile, even for empty ones
        const tile = document.createElement("div");
        tile.className = "tile";

        // Add specific class based on type
        const tileName = getTileName(tileType);
        tile.classList.add(tileName);

        // Set background color based on tile type
        tile.style.backgroundColor = getTileColor(tileType);

        // Add border for certain tile types
        if (
          [
            TILE_TYPES.WALL,
            TILE_TYPES.DOOR,
            TILE_TYPES.BUILDING_WALL,
            TILE_TYPES.BUILDING_WINDOW,
            TILE_TYPES.BUILDING_DOOR,
          ].includes(tileType)
        ) {
          tile.style.border = "1px solid #666";
        }

        // Add decorative elements to some tiles
        addTileDecoration(tile, tileType);

        // Position the tile
        tile.style.left = `${x * 64}px`;
        tile.style.top = `${y * 64}px`;
        mapWrapper.appendChild(tile);
      }
    }

    // Render NPCs
    const npcs = ZONE_DATA[currentZone].npcs || [];

    npcs.forEach((npc) => {
      const npcElement = document.createElement("div");
      npcElement.className = "npc-sprite";
      npcElement.style.left = `${npc.x * 64}px`;
      npcElement.style.top = `${npc.y * 64}px`;

      // Set NPC sprite
      try {
        npcElement.style.backgroundImage = `url(${standardizeSpritePath(npc.sprite)})`;
      } catch (error) {
        console.error("Failed to set NPC sprite:", error);
        npcElement.style.backgroundColor = "#f00"; // Red fallback
      }

      // Store NPC data
      npcElement.dataset.name = npc.name;
      npcElement.dataset.x = npc.x;
      npcElement.dataset.y = npc.y;
      npcElement.dataset.direction = npc.direction;
      npcElement.dataset.dialogue = JSON.stringify(npc.dialogue);

      if (npc.battleOnEnd) {
        npcElement.dataset.battleOnEnd = "true";
        npcElement.dataset.level = npc.level || 5;
      }

      if (npc.healOnEnd) {
        npcElement.dataset.healOnEnd = "true";
      }

      if (npc.isShop) {
        npcElement.dataset.isShop = "true";
        npcElement.dataset.shopType = npc.shopType;
      }

      mapWrapper.appendChild(npcElement);
    });

    // Create player sprite within the wrapper
    playerSprite = document.createElement("div");
    playerSprite.id = "player-sprite";
    mapWrapper.appendChild(playerSprite);

    // Update player position with the new player sprite
    updatePlayerVisual();

    // Update camera to center on player
    updateCameraPosition();
  }

  /**
   * Helper function to standardize sprite paths
   */
  function standardizeSpritePath(spritePath) {
    if (!spritePath) return "https://i.imgur.com/YeMI4sr.png"; // Default sprite

    console.log("Standardizing sprite path:", spritePath);

    // Already a URL
    if (spritePath.startsWith("http")) {
      console.log("Path is already a URL, keeping as is");
      return spritePath;
    }

    // Check if we have NPC_SPRITES available as a global object
    if (typeof window.NPC_SPRITES !== "undefined") {
      // Try to match with a sprite id
      for (const key in window.NPC_SPRITES) {
        // Direct access to NPC_SPRITES since they're now stored as direct URLs
        if (key.toLowerCase() === spritePath.toLowerCase()) {
          console.log(
            "Found NPC sprite match:",
            spritePath,
            "->",
            window.NPC_SPRITES[key],
          );
          return window.NPC_SPRITES[key];
        }
      }

      // Special direct check for Fitness Bro
      if (spritePath.toLowerCase().includes("fitness")) {
        console.log("Found Fitness Bro via special check");
        return "https://i.imgur.com/lKgsziT.png"; // New Fitness sprite
      }
    }

    // Comprehensive fallback mappings for all character types
    const spriteMap = {
      // New NPC sprites
      default: "https://i.imgur.com/gdXycTa.png", // Default now uses the first NPC sprite
      rasta: "https://i.imgur.com/gdXycTa.png", // First NPC sprite
      rastamon: "https://i.imgur.com/gdXycTa.png", // First NPC sprite
      fitness: "https://i.imgur.com/lKgsziT.png", // Second NPC sprite
      karen: "https://i.imgur.com/5CFFE9P.png", // Third NPC sprite
      dealer: "https://i.imgur.com/gdXycTa.png", // First NPC sprite
      shopkeeper: "https://i.imgur.com/5CFFE9P.png", // Third NPC sprite
      mom: "https://i.imgur.com/5CFFE9P.png", // Third NPC sprite
      hood_kid: "https://i.imgur.com/gdXycTa.png", // First NPC sprite
      beat_boxer: "https://i.imgur.com/lKgsziT.png", // Second NPC sprite
      hacker_kid: "https://i.imgur.com/lKgsziT.png", // Second NPC sprite

      // Character types from the main game - we keep their battle sprites for consistency
      "Fitness Bro": "https://i.imgur.com/YeMI4sr.png",
      Rastamon: "https://i.imgur.com/dZWWrrs.png",
      Techy: "https://i.imgur.com/VVa9pm9.png",
      "Cool Vibe YN": "https://i.imgur.com/2n71aSJ.png",
      "9-5 Homie": "https://i.imgur.com/UkE9crR.png",
      "All Jokes YN": "https://i.imgur.com/9hFTFQt.png",
      "Closet Nerd": "https://i.imgur.com/knA2Yxz.png",
      "Functional Addict": "https://i.imgur.com/G3xfSjU.png",
      "Dysfunctional YN": "https://i.imgur.com/yA0lUbo.png",
      "Gamer YN": "https://i.imgur.com/vFvQKap.png",
    };

    // Check for a direct match first
    if (spriteMap[spritePath]) {
      console.log(
        `Direct sprite mapping found for "${spritePath}":`,
        spriteMap[spritePath],
      );
      return spriteMap[spritePath];
    }

    // Try case-insensitive matching (convert keys to lowercase for comparison)
    const lowercasePath = spritePath.toLowerCase();
    for (const [key, url] of Object.entries(spriteMap)) {
      if (key.toLowerCase() === lowercasePath) {
        console.log(`Case-insensitive sprite match for "${spritePath}":`, url);
        return url;
      }
    }

    // Check if input contains any known character type as a substring
    for (const [key, url] of Object.entries(spriteMap)) {
      if (lowercasePath.includes(key.toLowerCase())) {
        console.log(
          `Partial sprite match for "${spritePath}" contains "${key}":`,
          url,
        );
        return url;
      }
    }

    // Still no match, return default with warning
    console.warn(
      `No sprite mapping found for "${spritePath}", using default sprite`,
    );
    return spriteMap["default"];
  }

  /**
   * Update player visual state (position and sprite)
   */
  function updatePlayerVisual() {
    if (!playerSprite) {
      console.error("Player sprite element not found in updatePlayerVisual");
      // Try to recover by getting player sprite from DOM
      playerSprite = document.querySelector(".player-sprite");
      if (!playerSprite) {
        console.error("Could not recover player sprite element");
        return;
      }
    }

    // Set player sprite position
    playerSprite.style.left = `${player.x * 64}px`;
    playerSprite.style.top = `${player.y * 64}px`;

    try {
      // Check if the PlayerSpriteManager is available
      if (typeof PlayerSpriteManager !== 'undefined') {
        // Update the player direction in the sprite manager
        PlayerSpriteManager.setDirection(player.direction);
        
        // Apply the sprite to the player element
        PlayerSpriteManager.applyToElement(playerSprite);
        
        // Make sure the sprite fits properly within the tile
        playerSprite.style.width = "64px";
        playerSprite.style.height = "64px";
        
        console.log("Using animated player sprite sheet");
      } else {
        // Fallback to static sprite if sprite manager not loaded
        const playerOverworldSprite = "https://i.imgur.com/FjAwMlb.png";
        console.log("Using fallback player overworld sprite");
        playerSprite.style.backgroundImage = `url(${playerOverworldSprite})`;
        playerSprite.style.backgroundSize = "cover";
        playerSprite.style.width = "64px";
        playerSprite.style.height = "64px";
      }
    } catch (error) {
      console.error("Failed to set player sprite:", error);
      playerSprite.style.backgroundColor = "#00f"; // Blue fallback
    }

    // Log current position and tile type
    const tileType = ZONE_DATA[currentZone].map[player.y]?.[player.x] || 0;
    console.log(
      `Player at position (${player.x},${player.y}) on tile type: ${tileType}`,
    );

    // Camera follow system
    updateCameraPosition();
  }

  /**
   * Update camera position to follow the player
   */
  function updateCameraPosition() {
    // Find or create the map wrapper
    let mapWrapper = document.querySelector(".map-wrapper");

    if (!mapWrapper) {
      console.log("Creating map wrapper for camera system");
      // Create a wrapper around all map contents
      mapWrapper = document.createElement("div");
      mapWrapper.className = "map-wrapper";

      // Move all existing children of map container to the wrapper
      const mapChildren = Array.from(mapContainer.children);
      mapChildren.forEach((child) => mapWrapper.appendChild(child));

      // Add the wrapper to the map container
      mapContainer.appendChild(mapWrapper);
    }

    // Get map container dimensions
    const mapContainerWidth = mapContainer.offsetWidth;
    const mapContainerHeight = mapContainer.offsetHeight;

    // Calculate the pixel position of the player
    const playerPixelX = player.x * 64 + 32; // Center of player sprite
    const playerPixelY = player.y * 64 + 32; // Center of player sprite

    // Calculate the desired position of the map wrapper
    // We want the player to be centered in the viewport
    const offsetX = mapContainerWidth / 2 - playerPixelX;
    const offsetY = mapContainerHeight / 2 - playerPixelY;

    // Apply transformation to the map wrapper
    mapWrapper.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

    // Log camera position
    console.log(
      `Camera position updated: offsetX=${offsetX}, offsetY=${offsetY}`,
    );
  }

  /**
   * Set up keyboard and touch controls
   */
  function setupControls() {
    // Remove any existing listeners if needed
    document.removeEventListener("keydown", handleKeyDown);
    document.removeEventListener("keyup", handleKeyUp);

    // Add keyboard controls
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    // Listen for messages from parent window (for mobile controls)
    window.addEventListener("message", function (event) {
      // Security check
      if (event.origin !== window.location.origin) {
        console.log("Origin mismatch:", event.origin, window.location.origin);
        return;
      }

      if (!event.data || !event.data.type) return;

      if (event.data.type === "keypress") {
        console.log("Received keypress in overworld:", event.data.key);

        // Create a synthetic event
        const syntheticEvent = {
          key: event.data.key,
          type: "keydown",
          preventDefault: () => {},
        };

        // Process it as a keyboard event
        handleKeyDown(syntheticEvent);

        // Auto-release after a short delay
        setTimeout(() => {
          syntheticEvent.type = "keyup";
          handleKeyUp(syntheticEvent);
        }, 100);
      }
    });

    console.log("Controls set up successfully");
  }

  /**
   * Handle keydown events
   */
  function handleKeyDown(e) {
    console.log("Overworld keydown:", e.key);

    // Check if battle screen is visible - if so, don't allow overworld movement
    const battleScreen = document.getElementById("battle-screen");
    if (battleScreen && getComputedStyle(battleScreen).display !== "none") {
      console.log("Battle screen is active, ignoring overworld movement keys");
      return;
    }

    // In dialogue mode, handle both action key and escape/B keys
    if (dialogueBox && dialogueBox.style.display !== "none") {
      console.log("In dialogue mode, handling:", e.key);

      // Escape or B button closes the dialogue immediately
      if (e.key === "Escape" || e.key === "B" || e.key === "b") {
        console.log("Closing dialogue with escape/B key");
        closeDialogue(); // Use our new function to properly close dialogues
        return;
      }

      // Action keys advance dialogue
      if (
        e.key === " " ||
        e.key === "Enter" ||
        e.key === "e" ||
        e.key === "E" ||
        e.key === "A" ||
        e.key === "a"
      ) {
        console.log("Advancing dialogue with key:", e.key);
        advanceDialogue();
      }
      return;
    }

    switch (e.key) {
      case "ArrowUp":
      case "w":
      case "W":
        keysPressed.up = true;
        attemptMove("up");
        break;
      case "ArrowDown":
      case "s":
      case "S":
        keysPressed.down = true;
        attemptMove("down");
        break;
      case "ArrowLeft":
      case "a":
      case "A":
        keysPressed.left = true;
        attemptMove("left");
        break;
      case "ArrowRight":
      case "d":
      case "D":
        keysPressed.right = true;
        attemptMove("right");
        break;
      case " ":
      case "Enter":
      case "e":
      case "E":
      case "A":
      case "a":
        keysPressed.action = true;
        interact();
        break;
    }
  }

  /**
   * Handle keyup events
   */
  function handleKeyUp(e) {
    switch (e.key) {
      case "ArrowUp":
      case "w":
      case "W":
        keysPressed.up = false;
        break;
      case "ArrowDown":
      case "s":
      case "S":
        keysPressed.down = false;
        break;
      case "ArrowLeft":
      case "a":
      case "A":
        keysPressed.left = false;
        break;
      case "ArrowRight":
      case "d":
      case "D":
        keysPressed.right = false;
        break;
      case " ":
      case "Enter":
      case "e":
      case "E":
      case "A":
      case "a":
        keysPressed.action = false;
        break;
    }
  }

  /**
   * Attempt to move the player in the given direction
   */
  function attemptMove(direction) {
    // Check move cooldown
    const now = Date.now();
    if (now - lastMoveTime < moveCooldown) {
      return;
    }

    // Always update the direction
    player.direction = direction;
    
    // Update sprite animation for the new direction
    if (typeof PlayerSpriteManager !== 'undefined') {
      PlayerSpriteManager.setDirection(direction);
      PlayerSpriteManager.applyToElement(playerSprite);
    }

    // Calculate potential new position
    let newX = player.x;
    let newY = player.y;

    switch (direction) {
      case "up":
        newY--;
        break;
      case "down":
        newY++;
        break;
      case "left":
        newX--;
        break;
      case "right":
        newX++;
        break;
    }

    // Check for collisions
    if (isValidMove(newX, newY)) {
      // Start walking animation
      if (typeof PlayerSpriteManager !== 'undefined') {
        PlayerSpriteManager.startAnimation();
      }
      
      // Update player position
      player.x = newX;
      player.y = newY;
      player.moving = true;

      // Check for zone transitions (doors)
      const doors = ZONE_DATA[currentZone].doors || [];
      const door = doors.find((d) => d.x === newX && d.y === newY);

      if (door) {
        console.log("Found door to", door.targetZone);
        changeZone(door.targetZone, door.targetX, door.targetY);
        return;
      }

      // Check for random encounters
      checkRandomEncounter();

      // Update visual position
      updatePlayerVisual();

      // Reset cooldown
      lastMoveTime = now;

      // Reset moving state after a slightly longer delay to allow animation to be visible
      setTimeout(() => {
        player.moving = false;
        
        // Stop walking animation
        if (typeof PlayerSpriteManager !== 'undefined') {
          PlayerSpriteManager.stopAnimation();
          // Apply the stopped animation frame
          PlayerSpriteManager.applyToElement(playerSprite);
        }
        
        updatePlayerVisual();
      }, 250);
    } else {
      // Just face the direction even if we can't move
      updatePlayerVisual();
    }
  }

  /**
   * Check if a move is valid (no walls or NPCs)
   */
  function isValidMove(x, y) {
    // Map boundaries
    const map = ZONE_DATA[currentZone].map;

    if (y < 0 || y >= map.length || x < 0 || x >= map[0].length) {
      console.log("Attempted to move out of map boundaries");
      return false;
    }

    const tileType = map[y][x];

    // Non-walkable tiles
    const blockedTiles = [
      TILE_TYPES.WALL,
      TILE_TYPES.BUILDING_WALL,
      TILE_TYPES.BUILDING_CORNER,
      TILE_TYPES.BUILDING_WINDOW,
      TILE_TYPES.TREE,
      TILE_TYPES.WATER,
      TILE_TYPES.TRAP_HOUSE_EXTERIOR,
      TILE_TYPES.MOMMAS_KITCHEN_EXTERIOR,
      TILE_TYPES.CORNER_STORE_EXTERIOR,
      TILE_TYPES.FADE_PARK_ENTRANCE,
      TILE_TYPES.THE_OPPS_TERRITORY,
    ];

    // Check for walls and other blocking objects
    if (blockedTiles.includes(tileType)) {
      console.log(
        `Cannot move to position (${x},${y}) - blocked by tile type:`,
        tileType,
      );
      return false;
    }

    // Doors are handled by interact, not by movement
    if (tileType === TILE_TYPES.DOOR || tileType === TILE_TYPES.BUILDING_DOOR) {
      // Doors need to be interacted with, not moved onto
      console.log(
        `Cannot walk through door at (${x},${y}) - use interact instead`,
      );
      return false;
    }

    // Special cases for urban decoration
    const checkPosition = [
      TILE_TYPES.TRASH_CAN,
      TILE_TYPES.BENCH,
      TILE_TYPES.STREETLIGHT,
      TILE_TYPES.HYDRANT,
      TILE_TYPES.BASKETBALL_HOOP,
    ];

    if (checkPosition.includes(tileType)) {
      console.log(
        `Cannot move to position (${x},${y}) - blocked by decoration:`,
        tileType,
      );
      return false;
    }

    // Check for NPCs
    const npcs = ZONE_DATA[currentZone].npcs || [];
    for (const npc of npcs) {
      if (npc.x === x && npc.y === y) {
        console.log(
          `Cannot move to position (${x},${y}) - NPC is there:`,
          npc.name,
        );
        return false;
      }
    }

    // Check for encounter tiles - they're walkable but may trigger battles
    if (tileType === TILE_TYPES.ENCOUNTER) {
      console.log(
        `Walking on encounter tile at (${x},${y}) - may trigger battle`,
      );
      // Allow the move but with a higher chance of encounter
      setTimeout(() => {
        if (Math.random() < 0.5) {
          // 50% chance
          triggerRandomEncounter();
        }
      }, 100);
    }

    console.log(`Valid move to position (${x},${y}) on tile type:`, tileType);
    return true;
  }

  /**
   * Handle interaction with objects facing the player
   */
  function interact() {
    console.log(
      "Interaction key pressed, attempting to interact with facing tile",
    );

    // Calculate position in front of player
    let facingX = player.x;
    let facingY = player.y;

    switch (player.direction) {
      case "up":
        facingY--;
        break;
      case "down":
        facingY++;
        break;
      case "left":
        facingX--;
        break;
      case "right":
        facingX++;
        break;
    }

    // Check map boundaries
    const map = ZONE_DATA[currentZone].map;
    if (
      facingY < 0 ||
      facingY >= map.length ||
      facingX < 0 ||
      facingX >= map[0].length
    ) {
      console.log("Facing position out of bounds:", facingX, facingY);
      return;
    }

    // Check for doors
    const doors = ZONE_DATA[currentZone].doors || [];
    const facingDoor = doors.find(
      (door) => door.x === facingX && door.y === facingY,
    );

    if (facingDoor) {
      console.log("Using door to", facingDoor.targetZone);
      changeZone(facingDoor.targetZone, facingDoor.targetX, facingDoor.targetY);
      return;
    }

    // Check for NPCs at the facing position
    const npcs = ZONE_DATA[currentZone].npcs || [];
    const facingNpc = npcs.find(
      (npc) => npc.x === facingX && npc.y === facingY,
    );

    if (facingNpc) {
      console.log("Interacting with NPC:", facingNpc.name);
      startDialogue(facingNpc);
      return;
    }

    // We didn't find anything to interact with
    console.log(
      "No interactive object found at facing position:",
      facingX,
      facingY,
    );
  }

  /**
   * Start dialogue with an NPC
   */
  function startDialogue(npc) {
    if (!npc) {
      console.error("Attempted to start dialogue with null NPC");
      return;
    }

    // If already in dialogue with this NPC, don't restart
    if (currentDialogueNpc === npc && dialogueBox.style.display === "block") {
      console.log("Already in dialogue with this NPC, not restarting");
      return;
    }

    currentDialogueNpc = npc;
    dialogueIndex = 0;

    // Parse dialogue if it's stored as a JSON string
    let dialogueArray = npc.dialogue;
    if (typeof dialogueArray === "string") {
      try {
        dialogueArray = JSON.parse(dialogueArray);
        console.log("Parsed dialogue:", dialogueArray);
      } catch (error) {
        console.error("Failed to parse dialogue JSON:", error);
        dialogueArray = [dialogueArray]; // Treat the string as a single line
      }
    }

    // Safety check
    if (!Array.isArray(dialogueArray) || dialogueArray.length === 0) {
      console.error(
        "Invalid dialogue format or empty dialogue:",
        dialogueArray,
      );
      dialogueArray = ["..."];
    }

    // Store the parsed dialogue back on the NPC object
    npc.dialogue = dialogueArray;

    // Update dialogue box
    dialogueNpcName.textContent = npc.name;
    dialogueText.textContent = dialogueArray[0];
    dialogueBox.style.display = "block";

    console.log(
      `Started dialogue with ${npc.name}, first line: "${dialogueArray[0]}"`,
    );
  }

  /**
   * Advance to the next dialogue line
   */
  function advanceDialogue() {
    // Safety check - if no dialogue NPC is set, just hide the dialogue box
    if (!currentDialogueNpc) {
      console.error(
        "Attempted to advance dialogue with no active NPC dialogue",
      );
      dialogueBox.style.display = "none";
      return;
    }

    // Parse dialogue if it's stored as a JSON string
    let dialogueArray = currentDialogueNpc.dialogue;
    if (typeof dialogueArray === "string") {
      try {
        dialogueArray = JSON.parse(dialogueArray);
      } catch (error) {
        console.error("Failed to parse dialogue JSON:", error);
        dialogueArray = [dialogueArray]; // Treat the string as a single line
      }
    }

    // Another safety check
    if (!Array.isArray(dialogueArray)) {
      console.error("Invalid dialogue format:", dialogueArray);
      dialogueBox.style.display = "none";
      currentDialogueNpc = null;
      return;
    }

    dialogueIndex++;

    if (dialogueIndex >= dialogueArray.length) {
      // End of dialogue
      closeDialogue();
    } else {
      // Show next dialogue line
      dialogueText.textContent = dialogueArray[dialogueIndex];
    }
  }

  /**
   * Close dialogue and handle any post-dialogue actions
   */
  function closeDialogue() {
    if (!currentDialogueNpc) {
      dialogueBox.style.display = "none";
      return;
    }

    dialogueBox.style.display = "none";

    // Check for post-dialogue actions
    if (currentDialogueNpc.battleOnEnd) {
      startNpcBattle(currentDialogueNpc);
    } else if (currentDialogueNpc.healOnEnd) {
      if (typeof window.healPlayerTeam === "function") {
        window.healPlayerTeam();
        alert("Your squad has been healed!");
      }
    } else if (currentDialogueNpc.isShop) {
      openShop(currentDialogueNpc.shopType);
    }

    // Reset dialogue state
    const previousNpc = currentDialogueNpc;
    currentDialogueNpc = null;
    dialogueIndex = 0;

    console.log("Dialogue closed with NPC:", previousNpc.name);
  }

  /**
   * Start a battle with an NPC
   */
  function startNpcBattle(npc) {
    console.log("Starting battle with NPC:", npc.name);

    // Assign a unique ID to the NPC if it doesn't have one
    if (!npc.id) {
      npc.id = `npc_${npc.name.replace(/\s+/g, "_").toLowerCase()}_${Date.now()}`;
      console.log("Assigned new ID to NPC:", npc.id);
    }

    // Check if this NPC has been defeated already
    if (window.defeatedNPCs && window.defeatedNPCs.includes(npc.id)) {
      console.log("This NPC has already been defeated:", npc.id);
      alert(
        `${npc.name} has already been defeated and isn't looking for another fade!`,
      );
      return;
    }

    // Create opponent based on NPC
    const npcLevel = npc.level || 5;

    // Create proper opponent structure for battle system
    const opponent = {
      id: npc.id, // Include the ID so the battle system can mark it as defeated
      name: npc.name,
      type: "npc",
      level: npcLevel,
      sprite: npc.sprite,
      hp: 100 + npcLevel * 10, // Scale HP with level
      attack: 80 + npcLevel * 5,
      defense: 80 + npcLevel * 5,
      speed: 80 + npcLevel * 5,
      critRate: 0.1,
      status: "normal",
    };

    // Add moves based on sprite/type
    const moveType =
      npc.sprite === "fitness"
        ? "Fire"
        : npc.sprite === "rasta"
          ? "Grass"
          : npc.sprite === "karen"
            ? "Water"
            : npc.sprite === "dealer"
              ? "Dark"
              : "Normal";

    // Add some basic moves
    opponent.moves = [
      {
        name: "Street Punch",
        power: 40,
        accuracy: 95,
        type: "Normal",
        description: "A basic street fighting move.",
      },
      {
        name: "Hood Kick",
        power: 50,
        accuracy: 85,
        type: moveType,
        description: `A ${moveType.toLowerCase()}-infused kick.`,
      },
      {
        name: "Mean Mug",
        power: 0,
        accuracy: 100,
        type: "Normal",
        description: "Glares at opponent, lowering their defense.",
      },
      {
        name: "Trash Talk",
        power: 30,
        accuracy: 90,
        type: "Dark",
        description: "Verbal attack that may cause confusion.",
      },
    ];

    // Show battle confirmation dialog
    if (confirm(`${npc.name} wants to fade! Ready?`)) {
      // Hide overworld container
      overworldContainer.style.display = "none";

      // Start battle with the parent window's battle function
      if (typeof window.startBattle === "function") {
        window.startBattle([opponent]);
      } else {
        console.error("Battle function not found");
        alert("Can't start battle - battle function not found.");
        // Return to overworld
        overworldContainer.style.display = "block";
      }
    }
  }

  /**
   * Open a shop
   */
  function openShop(shopType) {
    console.log("Opening shop:", shopType);

    // Hide overworld container
    overworldContainer.style.display = "none";

    // Call the parent window's shop function
    if (typeof window.openShop === "function") {
      window.openShop(shopType);
    } else {
      console.error("Shop function not found");
      alert("Can't open shop - shop function not found.");
      // Return to overworld
      overworldContainer.style.display = "block";
    }
  }

  /**
   * Check for random encounters
   */
  function checkRandomEncounter() {
    const zone = ZONE_DATA[currentZone];
    const encounterRate = zone.encounterRate || 0;

    // Random chance for encounter
    if (Math.random() < encounterRate) {
      console.log("Random encounter triggered!");
      triggerRandomEncounter();
    }
  }

  /**
   * Trigger a random battle
   */
  function triggerRandomEncounter() {
    const zone = ZONE_DATA[currentZone];

    // Create random opponent based on zone level range
    const opponentLevel =
      Math.floor(Math.random() * (zone.maxLevel - zone.minLevel + 1)) +
      zone.minLevel;

    // Simple opponent types for testing
    const opponentTypes = ["rasta", "fitness", "karen"];
    const randomType =
      opponentTypes[Math.floor(Math.random() * opponentTypes.length)];

    // Create proper opponent structure for battle system
    const typeName = randomType.charAt(0).toUpperCase() + randomType.slice(1);
    const opponent = {
      name: `Wild ${typeName}`,
      type: randomType,
      level: opponentLevel,
      sprite: randomType,
      hp: 100 + opponentLevel * 10, // Scale HP with level
      attack: 80 + opponentLevel * 5,
      defense: 80 + opponentLevel * 5,
      speed: 80 + opponentLevel * 5,
      critRate: 0.1,
      status: "normal",
    };

    // Add moves based on type
    const moveType =
      randomType === "fitness"
        ? "Fire"
        : randomType === "rasta"
          ? "Grass"
          : randomType === "karen"
            ? "Water"
            : "Normal";

    // Add some basic moves
    opponent.moves = [
      {
        name: "Street Punch",
        power: 40,
        accuracy: 95,
        type: "Normal",
        description: "A basic street fighting move.",
      },
      {
        name: "Hood Kick",
        power: 50,
        accuracy: 85,
        type: moveType,
        description: `A ${moveType.toLowerCase()}-infused kick.`,
      },
      {
        name: "Mean Mug",
        power: 0,
        accuracy: 100,
        type: "Normal",
        description: "Glares at opponent, lowering their defense.",
      },
      {
        name: "Trash Talk",
        power: 30,
        accuracy: 90,
        type: "Dark",
        description: "Verbal attack that may cause confusion.",
      },
    ];

    // Show a random encounter notification
    const encounterMsg = `A wild ${typeName} appears! Get ready to fade!`;

    // Show battle confirmation dialog
    if (confirm(encounterMsg)) {
      // Hide overworld container
      overworldContainer.style.display = "none";

      // Start battle with the parent window's battle function
      if (typeof window.startBattle === "function") {
        window.startBattle([opponent]);
      } else {
        console.error("Battle function not found");
        alert("Can't start battle - battle function not found.");
        // Return to overworld
        overworldContainer.style.display = "block";
      }
    }
  }

  /**
   * Change to a different zone
   */
  function changeZone(zoneName, entranceX, entranceY) {
    console.log(
      `Changing zone to ${zoneName} at position (${entranceX}, ${entranceY})`,
    );

    if (!ZONE_DATA[zoneName]) {
      console.error("Invalid zone:", zoneName);
      return;
    }

    // Update current zone
    currentZone = zoneName;

    // Set player position to entrance
    player.x = entranceX;
    player.y = entranceY;

    // Update zone name display
    const zoneNameDisplay = overworldContainer.querySelector(".zone-name");
    if (zoneNameDisplay) {
      zoneNameDisplay.textContent = ZONE_DATA[zoneName].name;
    }

    // Re-render map
    renderMap();
    updatePlayerVisual();
  }

  /**
   * Return to the overworld after battle
   */
  function returnToOverworld(battleWon = true) {
    console.log("Returning to overworld, battle won:", battleWon);

    // Show overworld container
    overworldContainer.style.display = "block";

    // Play overworld music if available
    if (typeof window.playOverworldMusic === "function") {
      window.playOverworldMusic();
    }
  }

  /**
   * Force movement in a direction (primarily for mobile controls)
   * This directly moves the player without synthetic events to reduce delay
   */
  function forceMove(direction) {
    console.log(`Force moving in direction: ${direction}`);

    // If in dialogue mode, we should ignore movement
    if (dialogueBox && dialogueBox.style.display !== "none") {
      console.log("In dialogue mode, ignoring movement");
      return;
    }

    // Always update player direction first for responsiveness
    player.direction = direction;

    // Now attempt the move directly without synthetic events
    attemptMove(direction);

    // Update visuals immediately
    updatePlayerVisual();
  }

  /**
   * Force an interaction (primarily for mobile controls)
   */
  function forceInteract() {
    console.log("Force interaction triggered");
    interact();
  }

  // Export the public API
  return {
    // Core functions
    initOverworld,
    returnToOverworld,

    // Controls
    handleKeyDown,
    handleKeyUp,
    forceMove,
    forceInteract,

    // Map functions
    renderMap,
    attemptMove,

    // Get current zone
    getCurrentZone: function () {
      return currentZone;
    },
  };
})(); // End of module IIFE

// Attach the module to the window object
window.NewOverworldSystem = NewOverworldSystem;
