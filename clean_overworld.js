/**
 * CLEAN OVERWORLD SYSTEM
 * A simplified, self-contained implementation of the exploration mode
 */

// Use a module pattern to avoid global variable conflicts
const NewOverworldSystem = (function() {
  // Main game state
  let player = {
    x: 5,
    y: 5,
    direction: 'down',
    moving: false,
    sprite: null
  };

  // Map data
  const TILE_TYPES = {
    EMPTY: 0,
    WALL: 1,
    NPC: 2,
    DOOR: 3,
    ENCOUNTER: 4,
    SHOP: 5
  };

  // Zone definitions
  const ZONE_TYPES = {
    STARTER_HOOD: "starter",
    THE_TRAP: "trap",
    MOMMAS_KITCHEN: "momma",
    FADE_PARK: "fade",
    THE_OPPS_HOOD: "opps"
  };

  // Current zone
  let currentZone = ZONE_TYPES.STARTER_HOOD;

  // Zone-specific data
  const ZONE_DATA = {
    [ZONE_TYPES.STARTER_HOOD]: {
      name: "Starter Hood",
      encounterRate: 0.15,
      minLevel: 2,
      maxLevel: 5,
      map: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ],
      npcs: [
        { x: 3, y: 3, direction: 'down', name: "Trap Boy", sprite: "rasta", dialogue: ["What's good, fam?", "Welcome to the Starter Hood."], battleOnEnd: true, level: 3 },
        { x: 7, y: 5, direction: 'left', name: "Corner Store", sprite: "shopkeeper", dialogue: ["Need some supplies?"], isShop: true, shopType: "corner" }
      ],
      doors: [
        { x: 5, y: 9, targetZone: ZONE_TYPES.THE_TRAP, targetX: 5, targetY: 1 }
      ]
    },
    [ZONE_TYPES.THE_TRAP]: {
      name: "The Trap",
      encounterRate: 0.2,
      minLevel: 5,
      maxLevel: 8,
      map: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ],
      npcs: [
        { x: 3, y: 4, direction: 'right', name: "Fitness", sprite: "fitness", dialogue: ["You in the wrong hood!", "Let's settle this!"], battleOnEnd: true, level: 6 },
        { x: 7, y: 3, direction: 'left', name: "Trap House", sprite: "dealer", dialogue: ["I got what you need."], isShop: true, shopType: "trap" }
      ],
      doors: [
        { x: 5, y: 0, targetZone: ZONE_TYPES.STARTER_HOOD, targetX: 5, targetY: 8 },
        { x: 9, y: 5, targetZone: ZONE_TYPES.MOMMAS_KITCHEN, targetX: 1, targetY: 5 }
      ]
    },
    [ZONE_TYPES.MOMMAS_KITCHEN]: {
      name: "Momma's Kitchen",
      encounterRate: 0,
      map: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
      ],
      npcs: [
        { x: 4, y: 3, direction: 'down', name: "Momma", sprite: "mom", dialogue: ["Baby, you hungry?", "Let me heal you up."], healOnEnd: true }
      ],
      doors: [
        { x: 0, y: 3, targetZone: ZONE_TYPES.THE_TRAP, targetX: 8, targetY: 5 }
      ]
    }
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
  let moveCooldown = 200; // ms between moves

  // Control state
  let keysPressed = {
    up: false,
    down: false,
    left: false,
    right: false,
    action: false
  };

  /**
   * Initialize the overworld with the given character
   */
  function initOverworld(selectedCharacter) {
    console.log("Initializing clean overworld system...");
    
    // Create or get overworld container
    overworldContainer = document.getElementById('overworld-container');
    if (!overworldContainer) {
      overworldContainer = document.createElement('div');
      overworldContainer.id = 'overworld-container';
      document.body.appendChild(overworldContainer);
    }
    
    // Clear any existing content
    overworldContainer.innerHTML = '';
    overworldContainer.style.display = 'block';
    
    // Set styles
    overworldContainer.style.position = 'relative';
    overworldContainer.style.width = '100vw';
    overworldContainer.style.height = '100vh';
    overworldContainer.style.backgroundColor = '#222';
    overworldContainer.style.overflow = 'hidden';
    
    // Add CSS classes if needed
    const style = document.createElement('style');
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
        transition: top 0.2s, left 0.2s;
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
    mapContainer = document.createElement('div');
    mapContainer.className = 'map-container';
    overworldContainer.appendChild(mapContainer);
    
    // Create zone name display
    const zoneNameDisplay = document.createElement('div');
    zoneNameDisplay.className = 'zone-name';
    zoneNameDisplay.textContent = ZONE_DATA[currentZone].name;
    overworldContainer.appendChild(zoneNameDisplay);
    
    // Create dialogue box
    dialogueBox = document.createElement('div');
    dialogueBox.className = 'dialogue-box';
    
    dialogueNpcName = document.createElement('div');
    dialogueNpcName.className = 'dialogue-name';
    dialogueBox.appendChild(dialogueNpcName);
    
    dialogueText = document.createElement('div');
    dialogueText.className = 'dialogue-text';
    dialogueBox.appendChild(dialogueText);
    
    overworldContainer.appendChild(dialogueBox);
    
    // Create player sprite
    playerSprite = document.createElement('div');
    playerSprite.className = 'player-sprite';
    mapContainer.appendChild(playerSprite);
    
    // Set initial player position
    player.x = 5;
    player.y = 5;
    player.direction = 'down';
    player.moving = false;
    player.sprite = selectedCharacter?.sprite || 'default';
    
    updatePlayerVisual();
    
    // Render the map
    renderMap();
    
    // Set up controls
    setupControls();
    
    console.log("Overworld initialized successfully");
  }

  /**
   * Render the map based on current zone
   */
  function renderMap() {
    // Clear existing map
    const existingTiles = mapContainer.querySelectorAll('.tile, .npc-sprite');
    existingTiles.forEach(tile => tile.remove());
    
    const zoneMap = ZONE_DATA[currentZone].map;
    
    // Render tiles
    for (let y = 0; y < zoneMap.length; y++) {
      for (let x = 0; x < zoneMap[y].length; x++) {
        const tileType = zoneMap[y][x];
        if (tileType !== TILE_TYPES.EMPTY) {
          const tile = document.createElement('div');
          tile.className = 'tile';
          
          switch (tileType) {
            case TILE_TYPES.WALL:
              tile.classList.add('wall');
              break;
            case TILE_TYPES.DOOR:
              tile.classList.add('door');
              break;
            case TILE_TYPES.ENCOUNTER:
              tile.classList.add('encounter');
              break;
            default:
              tile.classList.add('empty');
          }
          
          tile.style.left = `${x * 64}px`;
          tile.style.top = `${y * 64}px`;
          mapContainer.appendChild(tile);
        }
      }
    }
    
    // Render NPCs
    const npcs = ZONE_DATA[currentZone].npcs || [];
    
    npcs.forEach(npc => {
      const npcElement = document.createElement('div');
      npcElement.className = 'npc-sprite';
      npcElement.style.left = `${npc.x * 64}px`;
      npcElement.style.top = `${npc.y * 64}px`;
      
      // Set NPC sprite
      try {
        npcElement.style.backgroundImage = `url(${standardizeSpritePath(npc.sprite)})`;
      } catch (error) {
        console.error("Failed to set NPC sprite:", error);
        npcElement.style.backgroundColor = '#f00'; // Red fallback
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
      
      mapContainer.appendChild(npcElement);
    });
  }

  /**
   * Helper function to standardize sprite paths
   */
  function standardizeSpritePath(spritePath) {
    if (!spritePath) return "https://i.imgur.com/YeMI4sr.png"; // Default sprite
    
    // Already a URL
    if (spritePath.startsWith('http')) {
      return spritePath;
    }
    
    // Known sprite mappings
    const spriteMap = {
      'default': 'https://i.imgur.com/YeMI4sr.png',
      'rasta': 'https://i.imgur.com/dZWWrrs.png',
      'fitness': 'https://i.imgur.com/YeMI4sr.png',
      'karen': 'https://i.imgur.com/KVEOAYh.png',
      'dealer': 'https://i.imgur.com/nsFpkQK.png',
      'shopkeeper': 'https://i.imgur.com/NJ8ItLM.png',
      'mom': 'https://i.imgur.com/KVEOAYh.png'
    };
    
    return spriteMap[spritePath] || spriteMap['default'];
  }

  /**
   * Update player visual state (position and sprite)
   */
  function updatePlayerVisual() {
    if (!playerSprite) {
      console.error("Player sprite element not found in updatePlayerVisual");
      // Try to recover by getting player sprite from DOM
      playerSprite = document.querySelector('.player-sprite');
      if (!playerSprite) {
        console.error("Could not recover player sprite element");
        return;
      }
    }
    
    playerSprite.style.left = `${player.x * 64}px`;
    playerSprite.style.top = `${player.y * 64}px`;
    
    try {
      // Use a fixed sprite for overworld movement
      console.log("Using fixed overworld sprite rather than character-specific sprite");
      const spriteUrl = standardizeSpritePath(player.sprite);
      playerSprite.style.backgroundImage = `url(${spriteUrl})`;
    } catch (error) {
      console.error("Failed to set player sprite:", error);
      playerSprite.style.backgroundColor = '#00f'; // Blue fallback
    }
    
    // Log current position and tile type
    const tileType = ZONE_DATA[currentZone].map[player.y]?.[player.x] || 0;
    console.log(`Player at position (${player.x},${player.y}) on tile type: ${tileType}`);
  }

  /**
   * Set up keyboard and touch controls
   */
  function setupControls() {
    // Remove any existing listeners if needed
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('keyup', handleKeyUp);
    
    // Add keyboard controls
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    // Listen for messages from parent window (for mobile controls)
    window.addEventListener('message', function(event) {
      // Security check
      if (event.origin !== window.location.origin) {
        console.log("Origin mismatch:", event.origin, window.location.origin);
        return;
      }
      
      if (!event.data || !event.data.type) return;
      
      if (event.data.type === 'keypress') {
        console.log("Received keypress in overworld:", event.data.key);
        
        // Create a synthetic event
        const syntheticEvent = {
          key: event.data.key,
          type: 'keydown',
          preventDefault: () => {}
        };
        
        // Process it as a keyboard event
        handleKeyDown(syntheticEvent);
        
        // Auto-release after a short delay
        setTimeout(() => {
          syntheticEvent.type = 'keyup';
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
    // In dialogue mode, only handle action key
    if (dialogueBox.style.display !== 'none') {
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'e' || e.key === 'E' || e.key === 'A') {
        advanceDialogue();
      }
      return;
    }
    
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        keysPressed.up = true;
        attemptMove('up');
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        keysPressed.down = true;
        attemptMove('down');
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        keysPressed.left = true;
        attemptMove('left');
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        keysPressed.right = true;
        attemptMove('right');
        break;
      case ' ':
      case 'Enter':
      case 'e':
      case 'E':
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
      case 'ArrowUp':
      case 'w':
      case 'W':
        keysPressed.up = false;
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        keysPressed.down = false;
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        keysPressed.left = false;
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        keysPressed.right = false;
        break;
      case ' ':
      case 'Enter':
      case 'e':
      case 'E':
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
    
    // Calculate potential new position
    let newX = player.x;
    let newY = player.y;
    
    switch (direction) {
      case 'up':
        newY--;
        break;
      case 'down':
        newY++;
        break;
      case 'left':
        newX--;
        break;
      case 'right':
        newX++;
        break;
    }
    
    // Check for collisions
    if (isValidMove(newX, newY)) {
      // Update player position
      player.x = newX;
      player.y = newY;
      player.moving = true;
      
      // Check for zone transitions (doors)
      const doors = ZONE_DATA[currentZone].doors || [];
      const door = doors.find(d => d.x === newX && d.y === newY);
      
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
      
      // Reset moving state after a delay
      setTimeout(() => {
        player.moving = false;
        updatePlayerVisual();
      }, 100);
    }
  }

  /**
   * Check if a move is valid (no walls or NPCs)
   */
  function isValidMove(x, y) {
    // Map boundaries
    const map = ZONE_DATA[currentZone].map;
    
    if (y < 0 || y >= map.length || x < 0 || x >= map[0].length) {
      return false;
    }
    
    // Check for walls
    if (map[y][x] === TILE_TYPES.WALL) {
      return false;
    }
    
    // Check for NPCs
    const npcs = ZONE_DATA[currentZone].npcs || [];
    for (const npc of npcs) {
      if (npc.x === x && npc.y === y) {
        return false;
      }
    }
    
    return true;
  }

  /**
   * Handle interaction with objects facing the player
   */
  function interact() {
    // Calculate position in front of player
    let facingX = player.x;
    let facingY = player.y;
    
    switch (player.direction) {
      case 'up':
        facingY--;
        break;
      case 'down':
        facingY++;
        break;
      case 'left':
        facingX--;
        break;
      case 'right':
        facingX++;
        break;
    }
    
    // Check for NPCs at the facing position
    const npcs = ZONE_DATA[currentZone].npcs || [];
    const facingNpc = npcs.find(npc => npc.x === facingX && npc.y === facingY);
    
    if (facingNpc) {
      console.log("Interacting with NPC:", facingNpc.name);
      startDialogue(facingNpc);
    }
  }

  /**
   * Start dialogue with an NPC
   */
  function startDialogue(npc) {
    currentDialogueNpc = npc;
    dialogueIndex = 0;
    
    // Update dialogue box
    dialogueNpcName.textContent = npc.name;
    dialogueText.textContent = npc.dialogue[dialogueIndex];
    dialogueBox.style.display = 'block';
  }

  /**
   * Advance to the next dialogue line
   */
  function advanceDialogue() {
    dialogueIndex++;
    
    if (dialogueIndex >= currentDialogueNpc.dialogue.length) {
      // End of dialogue
      dialogueBox.style.display = 'none';
      
      // Check for post-dialogue actions
      if (currentDialogueNpc.battleOnEnd) {
        startNpcBattle(currentDialogueNpc);
      } else if (currentDialogueNpc.healOnEnd) {
        if (typeof window.healPlayerTeam === 'function') {
          window.healPlayerTeam();
          alert("Your squad has been healed!");
        }
      } else if (currentDialogueNpc.isShop) {
        openShop(currentDialogueNpc.shopType);
      }
      
      currentDialogueNpc = null;
    } else {
      // Show next dialogue line
      dialogueText.textContent = currentDialogueNpc.dialogue[dialogueIndex];
    }
  }

  /**
   * Start a battle with an NPC
   */
  function startNpcBattle(npc) {
    console.log("Starting battle with NPC:", npc.name);
    
    // Create opponent based on NPC
    const npcLevel = npc.level || 5;
    const opponent = {
      name: npc.name,
      type: "npc",
      level: npcLevel,
      sprite: npc.sprite
    };
    
    // Hide overworld container
    overworldContainer.style.display = 'none';
    
    // Start battle with the parent window's battle function
    if (typeof window.startBattle === 'function') {
      window.startBattle([opponent]);
    } else {
      console.error("Battle function not found");
      alert("Can't start battle - battle function not found.");
      // Return to overworld
      overworldContainer.style.display = 'block';
    }
  }

  /**
   * Open a shop
   */
  function openShop(shopType) {
    console.log("Opening shop:", shopType);
    
    // Hide overworld container
    overworldContainer.style.display = 'none';
    
    // Call the parent window's shop function
    if (typeof window.openShop === 'function') {
      window.openShop(shopType);
    } else {
      console.error("Shop function not found");
      alert("Can't open shop - shop function not found.");
      // Return to overworld
      overworldContainer.style.display = 'block';
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
    const opponentLevel = Math.floor(Math.random() * (zone.maxLevel - zone.minLevel + 1)) + zone.minLevel;
    
    // Simple opponent types for testing
    const opponentTypes = ['rasta', 'fitness', 'karen'];
    const randomType = opponentTypes[Math.floor(Math.random() * opponentTypes.length)];
    
    const opponent = {
      name: `Wild ${randomType.charAt(0).toUpperCase() + randomType.slice(1)}`,
      type: randomType,
      level: opponentLevel,
      sprite: randomType
    };
    
    // Hide overworld container
    overworldContainer.style.display = 'none';
    
    // Start battle with the parent window's battle function
    if (typeof window.startBattle === 'function') {
      window.startBattle([opponent]);
    } else {
      console.error("Battle function not found");
      alert("Can't start battle - battle function not found.");
      // Return to overworld
      overworldContainer.style.display = 'block';
    }
  }

  /**
   * Change to a different zone
   */
  function changeZone(zoneName, entranceX, entranceY) {
    console.log(`Changing zone to ${zoneName} at position (${entranceX}, ${entranceY})`);
    
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
    const zoneNameDisplay = overworldContainer.querySelector('.zone-name');
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
    overworldContainer.style.display = 'block';
    
    // Play overworld music if available
    if (typeof window.playOverworldMusic === 'function') {
      window.playOverworldMusic();
    }
  }

  // Export the public API
  return {
    // Core functions
    initOverworld,
    returnToOverworld,
    
    // Controls
    handleKeyDown,
    
    // Map functions
    renderMap,
    attemptMove,
    
    // Get current zone
    getCurrentZone: function() { return currentZone; }
  };
})(); // End of module IIFE

// Attach the module to the window object
window.NewOverworldSystem = NewOverworldSystem;