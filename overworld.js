/**
 * Squabble Overworld System
 * Top-down exploration between battles with NPCs and triggers
 */

// Map constants for various zones
// Check if ZONE_TYPES is already defined to avoid redeclaration
const ZONE_TYPES = window.ZONE_TYPES || {
  STARTER_HOOD: 'starterHood',
  THE_TRAP: 'theTrap',
  THE_BLOCK: 'theBlock',
  RICH_SUBURBIA: 'richSuburbia',
  BACK_ALLEY_ARENA: 'backAlleyArena'
};

// Make ZONE_TYPES available globally
window.ZONE_TYPES = ZONE_TYPES;

// Tile types for collision and interaction
const TILE_TYPES = {
  WALKABLE: 0,
  BLOCKED: 1,
  GRASS: 2,
  TRAP_ZONE: 3,
  DOOR: 4,
  NPC: 5
};

// Map data structure (will be larger in final implementation)
// 0 = walkable, 1 = blocked, 2 = grass, 3 = trap zone, 4 = door, 5 = NPC
const STARTER_HOOD_MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 1],
  [1, 0, 0, 0, 4, 0, 0, 0, 0, 0, 3, 3, 3, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1],
];

// NPC data with positions, dialogue, and battle triggers
const STARTER_HOOD_NPCS = [
  {
    id: 'npc1',
    name: 'OG Ras',
    x: 3,
    y: 3,
    sprite: 'public/sprites/og_ras.png',
    direction: 'down',
    lines: [
      "Ayo, youngblood.",
      "You rollin' through here like you own the trap?",
      "Lemme test them squabble hands."
    ],
    triggersBattle: true,
    character: {
      // Character template for battle
      name: 'OG Ras',
      sprite: 'public/sprites/og_ras.png',
      type: 'Fire',
      level: 5,
      hp: 110,
      maxHp: 110,
      attack: 55,
      defense: 40,
      speed: 45,
      moves: [
        { name: 'Blunt Force', type: 'Fire', power: 40, pp: 15, maxPp: 15, description: 'A burning strike that may cause a burn' },
        { name: 'Light Up', type: 'Fire', power: 0, pp: 10, maxPp: 10, effect: 'buff', stat: 'attack', amount: 1.5, description: 'Raises Attack significantly' },
        { name: 'Hotbox', type: 'Fire', power: 30, pp: 10, maxPp: 10, effect: 'status', status: 'confusion', chance: 0.3, description: 'May confuse the opponent' },
        { name: 'Pressure', type: 'Dark', power: 20, pp: 20, maxPp: 20, effect: 'debuff', stat: 'defense', amount: 0.8, description: 'Deals damage and lowers opponent Defense' }
      ]
    }
  },
  {
    id: 'npc2',
    name: 'Lil Brick',
    x: 11,
    y: 3,
    sprite: 'public/sprites/lil_brick.png',
    direction: 'left',
    lines: [
      "Yo what's good?",
      "I sell the finest product on the block.",
      "You lookin' to cop somethin'?"
    ],
    triggersBattle: false,
    opensShop: true,
    shopType: 'cornerStore'
  },
  {
    id: 'npc3',
    name: 'Street Runner',
    x: 3,
    y: 7,
    sprite: 'public/sprites/street_runner.png',
    direction: 'right',
    lines: [
      "These streets ain't safe no more.",
      "Them dudes from the north side been pushing weight.",
      "Watch yourself if you head to the trap zone down south."
    ],
    triggersBattle: false,
    givesQuest: true,
    quest: {
      id: 'quest1',
      name: 'Clear The Trap',
      description: 'Defeat 3 enemies in the trap zone',
      objective: { type: 'defeat', zone: 'trapZone', count: 3 },
      reward: { money: 100, item: { id: 'gold_chain', name: 'Gold Chain' } }
    }
  }
];

// Door connections to other zones or buildings
const STARTER_HOOD_DOORS = [
  { x: 4, y: 11, leadsTo: 'cornerStore', entranceX: 7, entranceY: 5 },
  { x: 6, y: 14, leadsTo: 'theTrap', entranceX: 7, entranceY: 1 }
];

// Player state in overworld
let player = {
  x: 7, // Starting X position
  y: 7, // Starting Y position
  direction: 'down',
  sprite: '', // Set based on selected character
  speed: 5, // Movement speed
  stepCount: 0,
  inTrapZone: false,
  activeQuests: [],
  completedQuests: []
};

// Current zone and map state
let currentZone = ZONE_TYPES.STARTER_HOOD;
let currentMap = STARTER_HOOD_MAP;
let currentNpcs = STARTER_HOOD_NPCS;
let currentDoors = STARTER_HOOD_DOORS;

// UI elements (will be initialized when overworld loads)
let overworldContainer;
let mapContainer;
let playerSprite;
let dialogueBox;
let npcs = [];

// Initialize overworld after character selection
function initOverworld(selectedCharacter) {
  console.log("Initializing overworld with character:", selectedCharacter);
  
  try {
    // Preload sprites if sprite manager exists
    if (window.SpriteManager && window.SpriteManager.preloadSprites) {
      console.log("Preloading character sprite assets");
      window.SpriteManager.preloadSprites();
    }
    
    // Initialize player movement state for animations
    player.isMoving = false;
    
    // Store the selected character ID/name, but don't use their sprite for movement
    if (selectedCharacter && selectedCharacter.id) {
      player.characterId = selectedCharacter.id;
      player.characterName = selectedCharacter.name;
      // Set player.sprite to null to use the ninja sprite for overworld movement
      player.sprite = null;
    } else {
      console.warn("No character provided, using default");
      player.characterId = 0;
      player.characterName = "Unknown";
      player.sprite = null;
    }
    
    // First, hide other screens
    const battleScreen = document.getElementById('battle-screen');
    if (battleScreen) battleScreen.style.display = 'none';
    
    const charSelection = document.getElementById('character-selection');
    if (charSelection) charSelection.style.display = 'none';
    
    const gameOver = document.getElementById('game-over');
    if (gameOver) gameOver.style.display = 'none';
    
    // Create or update the overworld UI
    const existingContainer = document.getElementById('overworld-container');
    if (!existingContainer) {
      console.log("Creating new overworld UI");
      createOverworldUI();
    } else {
      console.log("Using existing overworld UI");
      overworldContainer = existingContainer;
      mapContainer = document.getElementById('map-container');
      playerSprite = document.getElementById('player-sprite');
      dialogueBox = document.getElementById('dialogue-box');
      
      // Make sure map container is clear before re-rendering
      if (mapContainer) {
        mapContainer.innerHTML = '';
        if (playerSprite) mapContainer.appendChild(playerSprite);
      }
    }
    
    // Double-check that all UI elements are defined
    if (!overworldContainer || !mapContainer || !playerSprite) {
      console.error("Overworld UI elements not properly initialized!");
      console.log("Container:", overworldContainer);
      console.log("Map:", mapContainer);
      console.log("Player:", playerSprite);
      
      // Try to recover by creating the UI again
      createOverworldUI();
      
      // Check again after recovery attempt
      if (!overworldContainer || !mapContainer || !playerSprite) {
        console.error("Failed to initialize overworld UI even after recovery attempt");
        return; // Give up to prevent further errors
      }
    }
    
    // Set overworld to be visible
    overworldContainer.style.display = 'flex';
    
    // Reset player to starting position if needed
    if (!player.hasInitialPosition) {
      player.x = 7; // Starting X position
      player.y = 7; // Starting Y position
      player.hasInitialPosition = true;
    }
    
    // Render the map
    renderMap();
    
    // Update the visual position of the player sprite
    updatePlayerPosition();
    
    // Set up NPCs
    renderNpcs();
    
    // Set up keyboard controls
    setupOverworldControls();
    
    // Set up mobile controls for touchscreens
    setupMobileOverworldControls();
    
    // Play overworld music
    playOverworldMusic();
    
    console.log("Overworld initialization complete");
  } catch (error) {
    console.error("Error initializing overworld:", error);
  }
}

// Create UI elements for overworld
function createOverworldUI() {
  // Check if overworld container already exists
  let existingContainer = document.getElementById('overworld-container');
  
  if (!existingContainer) {
    // Create container if it doesn't exist
    overworldContainer = document.createElement('div');
    overworldContainer.id = 'overworld-container';
    document.body.appendChild(overworldContainer);
  } else {
    // Use existing container
    overworldContainer = existingContainer;
    // Clear it for fresh content
    overworldContainer.innerHTML = '';
  }
  
  // Create map container
  mapContainer = document.createElement('div');
  mapContainer.id = 'map-container';
  overworldContainer.appendChild(mapContainer);
  
  // Create player sprite
  playerSprite = document.createElement('div');
  playerSprite.id = 'player-sprite';
  mapContainer.appendChild(playerSprite);
  
  // Create dialogue box (initially hidden)
  dialogueBox = document.createElement('div');
  dialogueBox.id = 'dialogue-box';
  
  // Create dialogue content
  const dialogueContent = document.createElement('div');
  dialogueContent.className = 'dialogue-content';
  
  // Create text and name elements
  const nameElement = document.createElement('p');
  nameElement.id = 'dialogue-name';
  
  const textElement = document.createElement('p');
  textElement.id = 'dialogue-text';
  
  // Add text elements to content - name first, then text
  dialogueContent.appendChild(nameElement);
  dialogueContent.appendChild(textElement);
  
  // Create controls
  const dialogueControls = document.createElement('div');
  dialogueControls.className = 'dialogue-controls';
  
  const nextButton = document.createElement('button');
  nextButton.id = 'dialogue-next';
  nextButton.textContent = 'Next';
  
  // Add button to controls
  dialogueControls.appendChild(nextButton);
  
  // Add content and controls to dialogue box
  dialogueBox.appendChild(dialogueContent);
  dialogueBox.appendChild(dialogueControls);
  
  // Hide dialogue box initially
  dialogueBox.style.display = 'none';
  overworldContainer.appendChild(dialogueBox);
  
  // Set up dialogue controls
  nextButton.addEventListener('click', advanceDialogue);
  
  // Render the map initially
  renderMap();
}

// Render the map grid based on current zone
function renderMap() {
  try {
    console.log("Rendering map for zone:", currentZone);
    
    // Check if mapContainer exists
    if (!mapContainer) {
      console.error("Map container not found!");
      throw new Error("Map container is missing");
    }
    
    // Use a document fragment for better performance (single reflow)
    const mapFragment = document.createDocumentFragment();
    
    // Render each tile based on map data
    const tileSize = 64; // Each tile is 64x64 pixels for new tileset
    
    // Check if current map is defined and valid
    if (!currentMap || !Array.isArray(currentMap) || currentMap.length === 0) {
      console.error("Current map is invalid:", currentMap);
      throw new Error("Invalid map data");
    }
    
    console.log(`Rendering map with dimensions: ${currentMap[0].length}x${currentMap.length}`);
    
    // Track tile counts for debugging
    const tileCounts = {
      walkable: 0,
      blocked: 0,
      grass: 0,
      trapZone: 0,
      door: 0,
      npc: 0,
      unknown: 0
    };
    
    // Create all tiles at once
    for (let y = 0; y < currentMap.length; y++) {
      for (let x = 0; x < currentMap[y].length; x++) {
        const tileType = currentMap[y][x];
        const tile = document.createElement('div');
        tile.className = 'map-tile';
        tile.style.left = `${x * tileSize}px`;
        tile.style.top = `${y * tileSize}px`;
        tile.style.width = `${tileSize}px`;
        tile.style.height = `${tileSize}px`;
        
        // Add data attributes for debugging
        tile.dataset.x = x;
        tile.dataset.y = y;
        tile.dataset.type = tileType;
        
        // Use the new tileset with proper sprite positions
        // The tileset is organized in a 4x4 grid with different tiles
        const tilesetUrl = 'public/images/tileset.png';
        
        // These offset values are based on the tileset image where each tile is 64x64 pixels
        // The new tileset has 16 tiles in a 4x4 grid
        // First row: concrete, concrete with cracks, dark concrete, line, grass
        // Second row: dirt, dirt path, stone wall, grass/dirt edge
        // Third row: grass with small dirt spots, increasing sizes
        // Fourth row: More grass/dirt patterns, stone path
        const tileOffsets = {
          [TILE_TYPES.WALKABLE]: { x: 0, y: 0 },      // Concrete (top-left)
          [TILE_TYPES.BLOCKED]: { x: 2, y: 1 },       // Stone wall (3rd column, 2nd row)
          [TILE_TYPES.GRASS]: { x: 3, y: 0 },         // Grass (top-right)
          [TILE_TYPES.TRAP_ZONE]: { x: 0, y: 1 },     // Dirt (2nd row, 1st column)
          [TILE_TYPES.DOOR]: { x: 2, y: 3 }           // Stone path (3rd column, 4th row)
        };
        
        // Apply tile-specific styles
        switch (tileType) {
          case TILE_TYPES.WALKABLE:
            tile.classList.add('walkable');
            tileCounts.walkable++;
            break;
          case TILE_TYPES.BLOCKED:
            tile.classList.add('blocked');
            tileCounts.blocked++;
            break;
          case TILE_TYPES.GRASS:
            tile.classList.add('grass');
            tileCounts.grass++;
            break;
          case TILE_TYPES.TRAP_ZONE:
            tile.classList.add('trap-zone');
            tileCounts.trapZone++;
            break;
          case TILE_TYPES.DOOR:
            tile.classList.add('door');
            tileCounts.door++;
            break;
          case TILE_TYPES.NPC:
            // Just render as walkable, NPCs will be added separately
            tile.classList.add('walkable');
            tileCounts.npc++;
            break;
          default:
            // Unknown tile type - use walkable as fallback
            console.warn(`Unknown tile type: ${tileType} at position (${x},${y})`);
            tile.classList.add('walkable');
            tileCounts.unknown++;
        }
        
        // Apply the tileset background with proper sprite coordinates
        const tileOffset = tileOffsets[tileType];
        if (tileOffset) {
          // Calculate background position using the tileset coordinates
          // Each tile is 64x64 pixels in a 4x4 grid
          const bgPosX = -(tileOffset.x * 64);
          const bgPosY = -(tileOffset.y * 64);
          
          // Apply the tileset as background image with the correct positioning
          tile.style.backgroundImage = `url('${tilesetUrl}')`;
          tile.style.backgroundSize = '256px 256px'; // Total tileset size (4*64 x 4*64)
          tile.style.backgroundPosition = `${bgPosX}px ${bgPosY}px`;
          tile.style.backgroundRepeat = 'no-repeat';
        }
        
        // Add to fragment instead of directly to DOM
        mapFragment.appendChild(tile);
      }
    }
    
    // Clear existing map properly
    while (mapContainer.firstChild) {
      mapContainer.removeChild(mapContainer.firstChild);
    }
    
    // Add all tiles at once (single reflow)
    mapContainer.appendChild(mapFragment);
    
    // Add player sprite
    if (!playerSprite) {
      console.error("Player sprite element not found!");
      playerSprite = document.createElement('div');
      playerSprite.id = 'player-sprite';
    }
    
    // Add player to map container (on top of tiles)
    mapContainer.appendChild(playerSprite);
    
    // Update player sprite appearance
    updatePlayerPosition();
    
    // Set player direction class
    playerSprite.className = `facing-${player.direction}`;
    
    // Set player sprite image with pixel art fallback
    if (player.sprite) {
      const img = playerSprite.querySelector('img');
      if (!img) {
        const newImg = document.createElement('img');
        newImg.src = player.sprite;
        newImg.alt = 'Player';
        playerSprite.appendChild(newImg);
      } else if (img.src !== player.sprite) {
        img.src = player.sprite;
      }
    } else {
      console.warn("No player sprite set, using pixel art fallback");
      // Use SVG for pixel art player as fallback
      playerSprite.innerHTML = `
        <svg width="64" height="64" viewBox="0 0 64 64" style="image-rendering: pixelated;">
          <rect x="18" y="12" width="28" height="40" fill="#f25a5a" />
          <rect x="14" y="24" width="36" height="16" fill="#f25a5a" />
          <circle cx="24" cy="26" r="4" fill="#000" />
          <circle cx="40" cy="26" r="4" fill="#000" />
          <rect x="28" y="38" width="8" height="2" fill="#000" />
        </svg>
      `;
    }
    
    console.log("Map rendering complete", tileCounts);
  } catch (error) {
    console.error("Error rendering map:", error);
    // Create a visually appealing error message
    if (mapContainer) {
      mapContainer.innerHTML = `
        <div style="color: white; background-color: rgba(0,0,0,0.8); padding: 20px; 
             border-radius: 8px; border: 2px solid #f25a5a; box-shadow: 0 0 15px rgba(242,90,90,0.5); 
             font-family: 'Press Start 2P', monospace; text-align: center; margin: 20px;">
          <h3 style="color: #f25a5a; margin-bottom: 15px;">Map Error</h3>
          <p>There was a problem loading this area.</p>
          <p>Try returning to the main menu.</p>
          <button onclick="window.location.reload()" 
                  style="background-color: #f25a5a; color: white; border: none; 
                         padding: 8px 15px; margin-top: 15px; cursor: pointer; 
                         font-family: 'Press Start 2P', monospace; font-size: 12px;">
            Reload Game
          </button>
        </div>
      `;
    }
    
    // Recovery attempt with a simple fallback map
    try {
      console.log("Attempting recovery with fallback map");
      setTimeout(() => {
        try {
          // Create a basic fallback map if needed
          const fallbackMap = [
            [1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 1, 1, 1, 1]
          ];
          
          // Only use fallback if rendering completely failed
          if (!mapContainer.querySelector('.map-tile')) {
            console.log("Using fallback map for recovery");
            
            // Store original map data
            const originalMap = currentMap;
            const originalX = player.x;
            const originalY = player.y;
            
            // Reset to safe values
            currentMap = fallbackMap;
            player.x = 2;
            player.y = 2;
            
            // Clear error message and try again
            mapContainer.innerHTML = '';
            renderMap();
          }
        } catch (e) {
          console.error("Fallback map also failed:", e);
        }
      }, 1000);
    } catch (recoveryError) {
      console.error("Recovery attempt failed:", recoveryError);
    }
  }
  
  // Add NPCs to the map
  renderNpcs();
}

// Render NPCs on the map
function renderNpcs() {
  try {
    console.log(`Rendering ${currentNpcs.length} NPCs for zone: ${currentZone}`);
    
    // Remove existing NPCs
    npcs.forEach(npc => {
      if (npc.element && npc.element.parentNode) {
        npc.element.parentNode.removeChild(npc.element);
      }
    });
    
    npcs = [];
    
    // Use document fragment for better performance
    const npcFragment = document.createDocumentFragment();
    
    // Create NPC elements
    currentNpcs.forEach(npcData => {
      try {
        const npcElement = document.createElement('div');
        npcElement.className = 'npc-sprite';
        npcElement.style.left = `${npcData.x * 64}px`;
        npcElement.style.top = `${npcData.y * 64}px`;
        
        // Add identifier attributes
        npcElement.dataset.npcId = npcData.id;
        npcElement.dataset.npcName = npcData.name;
        
        // Use sprite manager if available
        if (window.SpriteManager && window.SpriteManager.updateNpcSprite) {
          npcFragment.appendChild(npcElement);
          window.SpriteManager.updateNpcSprite(npcElement, npcData);
        } else {
          // Legacy sprite handling if sprite manager isn't loaded
          console.log("Using legacy NPC sprite rendering");
          
          // Add visual cues for interactive NPCs
          if (npcData.triggersBattle) {
            npcElement.classList.add('battle-npc');
          } else if (npcData.opensShop) {
            npcElement.classList.add('shop-npc');
          } else if (npcData.givesQuest) {
            npcElement.classList.add('quest-npc');
          }
          
          // Create tooltip with NPC name
          const tooltip = document.createElement('div');
          tooltip.className = 'npc-tooltip';
          tooltip.textContent = npcData.name;
          npcElement.appendChild(tooltip);
          
          // Set NPC appearance
          const npcImg = document.createElement('img');
          npcImg.src = npcData.sprite;
          npcImg.alt = npcData.name;
          npcImg.className = `facing-${npcData.direction}`;
          
          // Error handling for sprite loading
          npcImg.onerror = function() {
            console.warn(`Failed to load sprite for NPC: ${npcData.name}`);
            // Use SVG fallback
            npcElement.innerHTML = `
              <svg width="64" height="64" viewBox="0 0 64 64" style="image-rendering: pixelated;">
                <rect x="18" y="12" width="28" height="40" fill="#aaa" />
                <rect x="14" y="24" width="36" height="16" fill="#aaa" />
                <circle cx="24" cy="26" r="4" fill="#000" />
                <circle cx="40" cy="26" r="4" fill="#000" />
                <rect x="28" y="38" width="8" height="2" fill="#000" />
                <text x="32" y="58" text-anchor="middle" font-size="10" fill="#fff">${npcData.name}</text>
              </svg>
            `;
          };
          
          npcElement.appendChild(npcImg);
          npcFragment.appendChild(npcElement);
        }
        
        // Store reference to the element and data
        npcs.push({
          data: npcData,
          element: npcElement
        });
      } catch (npcError) {
        console.error(`Error rendering NPC ${npcData.name}:`, npcError);
      }
    });
    
    // Add all NPCs to map at once
    mapContainer.appendChild(npcFragment);
    
    console.log(`Successfully rendered ${npcs.length} NPCs`);
  } catch (error) {
    console.error("Error in renderNpcs:", error);
  }
}

// Update player position on the map
function updatePlayerPosition() {
  try {
    console.log("Updating player position:", player.x, player.y, player.direction, "isMoving:", player.isMoving);
    
    if (!playerSprite) {
      console.error("Player sprite element not found in updatePlayerPosition");
      return;
    }
    
    const tileSize = 64;
    playerSprite.style.left = `${player.x * tileSize}px`;
    playerSprite.style.top = `${player.y * tileSize}px`;
    
    // Check if sprite manager is available
    if (window.SpriteManager) {
      // Use the player's isMoving state for animation
      const isMoving = player.isMoving || false;
      
      // Update sprite with direction and animation state - but don't pass character sprite
      // to ensure we use the ninja animation sprites instead
      window.SpriteManager.updatePlayerSprite(playerSprite, player.direction, isMoving, null);
    } else {
      // Fallback to basic sprite handling if sprite manager isn't loaded
      console.warn("SpriteManager not available, using fallback sprite handling");
      
      // Update player sprite direction
      playerSprite.className = `facing-${player.direction}`;
      
      // Set sprite image if not already set
      if (!playerSprite.querySelector('img')) {
        console.log("Adding player sprite image:", player.sprite);
        
        if (!player.sprite) {
          console.warn("No player sprite URL defined, using default");
          player.sprite = 'https://i.imgur.com/m7Rup7S.png'; // Default sprite
        }
        
        const img = document.createElement('img');
        img.src = player.sprite;
        img.alt = 'Player';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        playerSprite.appendChild(img);
      } else {
        // Update existing sprite image if needed
        const img = playerSprite.querySelector('img');
        if (img.src !== player.sprite) {
          console.log("Updating player sprite image to:", player.sprite);
          img.src = player.sprite;
        }
      }
    }
    
    // Check current tile type after position update
    checkCurrentTile();
  } catch (error) {
    console.error("Error updating player position:", error);
  }
}

// Check the type of tile the player is standing on
function checkCurrentTile() {
  try {
    // Validate player position
    if (!currentMap || 
        player.y < 0 || player.y >= currentMap.length || 
        player.x < 0 || player.x >= currentMap[player.y].length) {
      console.error("Invalid player position:", player.x, player.y);
      return;
    }
    
    const tileType = currentMap[player.y][player.x];
    console.log(`Player at position (${player.x},${player.y}) on tile type: ${tileType}`);
    
    // Handle trap zones (random encounter areas)
    player.inTrapZone = (tileType === TILE_TYPES.TRAP_ZONE);
    
    // Check for door tiles
    if (tileType === TILE_TYPES.DOOR) {
      const door = currentDoors.find(d => d.x === player.x && d.y === player.y);
      if (door) {
        console.log(`Found door leading to ${door.leadsTo} at entrance (${door.entranceX},${door.entranceY})`);
        changeZone(door.leadsTo, door.entranceX, door.entranceY);
      } else {
        console.warn(`Door tile at (${player.x},${player.y}) has no corresponding door data`);
      }
    }
    
    // Check for random encounters in trap zones
    if (player.inTrapZone) {
      player.stepCount++;
      console.log(`In trap zone, step count: ${player.stepCount}`);
      
      if (player.stepCount % 5 === 0) {
        const encounterChance = Math.random();
        if (encounterChance < 0.25) {
          console.log("Random encounter triggered!");
          // 25% chance of random encounter every 5 steps in trap zones
          triggerRandomEncounter();
        } else {
          console.log(`No encounter this time (roll: ${encounterChance.toFixed(2)})`);
        }
      }
    }
  } catch (error) {
    console.error("Error checking current tile:", error);
  }
}

// Handle player movement
function movePlayer(direction) {
  // Store previous position
  const prevX = player.x;
  const prevY = player.y;
  
  // Always update player direction, even if we can't move
  player.direction = direction;
  
  // Update player sprite immediately for direction change
  // This ensures the player always faces the requested direction, even if blocked
  player.isMoving = false;
  updatePlayerPosition();
  
  // Try to update position based on direction
  let canMove = true;
  let newX = player.x;
  let newY = player.y;
  
  switch (direction) {
    case 'up':
      if (player.y > 0) newY--;
      else canMove = false;
      break;
    case 'down':
      if (player.y < currentMap.length - 1) newY++;
      else canMove = false;
      break;
    case 'left':
      if (player.x > 0) newX--;
      else canMove = false;
      break;
    case 'right':
      if (player.x < currentMap[0].length - 1) newX++;
      else canMove = false;
      break;
  }
  
  // Check for collision with blocked tiles
  if (canMove && currentMap[newY][newX] === TILE_TYPES.BLOCKED) {
    canMove = false;
  }
  
  // Check for NPC collision
  if (canMove) {
    const npcAtPosition = currentNpcs.find(npc => npc.x === newX && npc.y === newY);
    if (npcAtPosition) {
      canMove = false;
    }
  }
  
  // Only update position if we can move
  if (canMove) {
    player.x = newX;
    player.y = newY;
    
    // Set player as moving (for animation)
    player.isMoving = true;
    
    // Update player position on screen with movement animation
    updatePlayerPosition();
    
    // After a slightly longer delay, set player as not moving (stop animation)
    // This gives the animation more time to complete for smoother movement
    setTimeout(() => {
      player.isMoving = false;
      updatePlayerPosition();
    }, 350); // Animation lasts longer to match CSS transition
  }
  
  return canMove;
}

// Set up keyboard controls for overworld
function setupOverworldControls() {
  document.addEventListener('keydown', handleKeyPress);
}

// Handle keyboard input
function handleKeyPress(e) {
  try {
    // Check if dialogueBox exists and is initialized
    if (!dialogueBox) {
      console.error("Dialogue box not found in handleKeyPress");
      return;
    }
    
    // Only process movement if dialogue is not active
    if (dialogueBox.style.display === 'none') {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          movePlayer('up');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          movePlayer('down');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          movePlayer('left');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          movePlayer('right');
          break;
        case ' ':
        case 'Enter':
          // Interact with NPC or object in front of player
          interactWithFacingTile();
          break;
      }
    } else if (e.key === ' ' || e.key === 'Enter') {
      // Advance dialogue when space or enter is pressed
      advanceDialogue();
    }
  } catch (error) {
    console.error("Error handling key press:", error);
  }
}

// Set up mobile controls for overworld
function setupMobileOverworldControls() {
  try {
    const mobileControls = document.getElementById('mobile-controls-container');
    
    // Update the mobile controls to work with overworld
    if (mobileControls) {
      // Make sure mobile controls are visible on overworld
      mobileControls.style.display = 'block';
      
      // The mobile controls use an iframe, so we need to communicate with it
      window.addEventListener('message', (event) => {
        try {
          if (event.data && event.data.type === 'mobileControl') {
            switch (event.data.button) {
              case 'up':
                movePlayer('up');
                break;
              case 'down':
                movePlayer('down');
                break;
              case 'left':
                movePlayer('left');
                break;
              case 'right':
                movePlayer('right');
                break;
              case 'a':
                interactWithFacingTile();
                break;
              case 'b':
                // Can be used for cancelling dialogue or interactions
                if (dialogueBox && dialogueBox.style && dialogueBox.style.display !== 'none') {
                  dialogueBox.style.display = 'none';
                }
                break;
            }
          }
        } catch (error) {
          console.error("Error in mobile control event handler:", error);
        }
      });
    } else {
      console.log("Mobile controls container not found, mobile controls will not be available");
    }
  } catch (error) {
    console.error("Error setting up mobile controls:", error);
  }
}

// Get the tile in front of the player
function getTileFacingPlayer() {
  let x = player.x;
  let y = player.y;
  
  switch (player.direction) {
    case 'up':
      y--;
      break;
    case 'down':
      y++;
      break;
    case 'left':
      x--;
      break;
    case 'right':
      x++;
      break;
  }
  
  // Check if coordinates are valid
  if (y >= 0 && y < currentMap.length && x >= 0 && x < currentMap[0].length) {
    return { x, y, type: currentMap[y][x] };
  }
  
  return null;
}

// Interact with tile or NPC in front of player
function interactWithFacingTile() {
  const facingTile = getTileFacingPlayer();
  if (!facingTile) return;
  
  // Check for NPCs at the facing tile
  const npcAtTile = currentNpcs.find(npc => npc.x === facingTile.x && npc.y === facingTile.y);
  
  if (npcAtTile) {
    // Start dialogue with NPC
    startDialogue(npcAtTile);
  } else if (facingTile.type === TILE_TYPES.DOOR) {
    // Interact with door
    const door = currentDoors.find(d => d.x === facingTile.x && d.y === facingTile.y);
    if (door) {
      changeZone(door.leadsTo, door.entranceX, door.entranceY);
    }
  }
}

// Start dialogue with an NPC
let currentDialogue = null;
let currentDialogueLine = 0;

function startDialogue(npc) {
  try {
    if (!dialogueBox) {
      console.error("Dialogue box element not found!");
      return;
    }
    
    // Set current dialogue reference
    currentDialogue = npc;
    currentDialogueLine = 0;
    
    // Get name element and update its content
    const nameElement = document.getElementById('dialogue-name');
    if (nameElement) {
      nameElement.textContent = npc.name;
    } else {
      console.error("Dialogue name element not found!");
    }
    
    // Show first line of dialogue
    const textElement = document.getElementById('dialogue-text');
    if (textElement) {
      textElement.textContent = npc.lines[currentDialogueLine];
    } else {
      console.error("Dialogue text element not found!");
    }
    
    // Show the dialogue box
    dialogueBox.style.display = 'block';
    
    // Play dialogue sound
    if (typeof playSwitchSound === 'function') {
      playSwitchSound();
    } else {
      console.warn("Switch sound function not available");
    }
  } catch (error) {
    console.error("Error starting dialogue:", error);
  }
}

// Advance to next dialogue line or end dialogue
function advanceDialogue() {
  try {
    if (!currentDialogue) return;
    
    currentDialogueLine++;
    
    // Check if we've reached the end of dialogue
    if (currentDialogueLine >= currentDialogue.lines.length) {
      // End dialogue
      if (dialogueBox && dialogueBox.style) {
        dialogueBox.style.display = 'none';
      }
      
      // Check for battle trigger
      if (currentDialogue.triggersBattle) {
        startNpcBattle(currentDialogue);
      }
      
      // Check for shop opening
      if (currentDialogue.opensShop && typeof openShop === 'function') {
        openShop(gameShops[currentDialogue.shopType]);
      }
      
      // Check for quest giving
      if (currentDialogue.givesQuest) {
        giveQuest(currentDialogue.quest);
      }
      
      currentDialogue = null;
      return;
    }
    
    // Show next line
    const textElement = document.getElementById('dialogue-text');
    if (textElement) {
      textElement.textContent = currentDialogue.lines[currentDialogueLine];
    } else {
      console.error("Dialogue text element not found!");
    }
    
    // Play dialogue sound
    if (typeof playSwitchSound === 'function') {
      playSwitchSound();
    }
  } catch (error) {
    console.error("Error advancing dialogue:", error);
  }
}

// Trigger a battle with an NPC
function startNpcBattle(npc) {
  // Set up opponent using NPC character data
  window.activeOpponent = npc.character;
  
  // Hide overworld and show battle screen
  overworldContainer.style.display = 'none';
  
  // Start battle
  window.startBattle();
}

// Trigger a random encounter in a trap zone
function triggerRandomEncounter() {
  // Create a random opponent based on the current zone
  const randomOpponent = createRandomOpponent(currentZone);
  
  // Set the active opponent
  window.activeOpponent = randomOpponent;
  
  // Hide overworld and show battle screen
  overworldContainer.style.display = 'none';
  
  // Start battle
  window.startBattle();
}

// Create a random opponent based on zone
function createRandomOpponent(zone) {
  let level, types, namePool;
  
  // Set parameters based on zone
  switch (zone) {
    case ZONE_TYPES.STARTER_HOOD:
      level = 2 + Math.floor(Math.random() * 4); // Level 2-5
      types = ['Fire', 'Water', 'Grass', 'Normal'];
      namePool = ['Street Kid', 'Rookie', 'Young Buck', 'Corner Boy'];
      break;
    case ZONE_TYPES.THE_TRAP:
      level = 5 + Math.floor(Math.random() * 4); // Level 5-8
      types = ['Fire', 'Dark', 'Electric', 'Poison'];
      namePool = ['Trapper', 'Hustler', 'Dealer', 'Lookout'];
      break;
    case ZONE_TYPES.THE_BLOCK:
      level = 8 + Math.floor(Math.random() * 4); // Level 8-11
      types = ['Fire', 'Fighting', 'Steel', 'Ground'];
      namePool = ['Block Boss', 'Enforcer', 'Muscle', 'Shooter'];
      break;
    case ZONE_TYPES.RICH_SUBURBIA:
      level = 12 + Math.floor(Math.random() * 4); // Level 12-15
      types = ['Psychic', 'Flying', 'Ice', 'Normal'];
      namePool = ['Rich Kid', 'Trust Fund', 'Yacht Club', 'Country Club'];
      break;
    case ZONE_TYPES.BACK_ALLEY_ARENA:
      level = 15 + Math.floor(Math.random() * 5); // Level 15-19
      types = ['Dark', 'Fighting', 'Dragon', 'Steel'];
      namePool = ['Champion', 'Contender', 'Veteran', 'OG'];
      break;
    default:
      level = 5;
      types = ['Normal', 'Fire', 'Water'];
      namePool = ['Stranger', 'Unknown', 'Mystery'];
  }
  
  // Choose random name and type
  const name = namePool[Math.floor(Math.random() * namePool.length)];
  const type = types[Math.floor(Math.random() * types.length)];
  
  // Use local sprite options for random enemies - make sure paths are correct
  const spriteOptions = [
    'public/sprites/og_ras.png',
    'public/sprites/lil_brick.png',
    'public/sprites/street_runner.png',
    'public/sprites/default_npc.png',
    'public/sprites/rastamon.png',
    'public/sprites/fitness.png'
  ];
  const sprite = spriteOptions[Math.floor(Math.random() * spriteOptions.length)];
  
  // Create base stats based on level
  const baseHp = 85 + (level * 5);
  const baseAtk = 40 + (level * 3);
  const baseDef = 35 + (level * 2.5);
  const baseSpd = 30 + (level * 2);
  
  // Create random moves appropriate for level and type
  const moves = generateMovesForType(type, level);
  
  // Return opponent object
  return {
    name: name,
    sprite: sprite,
    type: type,
    level: level,
    hp: baseHp,
    maxHp: baseHp,
    attack: baseAtk,
    defense: baseDef,
    speed: baseSpd,
    moves: moves
  };
}

// Generate moves for a character based on type and level
function generateMovesForType(type, level) {
  // This would ideally be a much larger move database
  const movesByType = {
    'Fire': [
      { name: 'Blaze Up', type: 'Fire', power: 40, effect: null },
      { name: 'Heat Wave', type: 'Fire', power: 60, effect: null },
      { name: 'Fire Spin', type: 'Fire', power: 30, effect: 'trap' },
      { name: 'Light Up', type: 'Fire', power: 0, effect: 'buff', stat: 'attack', amount: 1.5 }
    ],
    'Water': [
      { name: 'Water Gun', type: 'Water', power: 40, effect: null },
      { name: 'Splash', type: 'Water', power: 20, effect: 'debuff', stat: 'speed', amount: 0.8 },
      { name: 'Ice Flow', type: 'Water', power: 50, effect: null },
      { name: 'Drip', type: 'Water', power: 0, effect: 'buff', stat: 'defense', amount: 1.5 }
    ],
    'Grass': [
      { name: 'Grass Throw', type: 'Grass', power: 40, effect: null },
      { name: 'Leaf Cut', type: 'Grass', power: 55, effect: null },
      { name: 'Root', type: 'Grass', power: 30, effect: 'trap' },
      { name: 'Grow', type: 'Grass', power: 0, effect: 'heal', amount: 30 }
    ],
    'Normal': [
      { name: 'Taunt', type: 'Normal', power: 0, effect: 'debuff', stat: 'attack', amount: 0.8 },
      { name: 'Take Hit', type: 'Normal', power: 40, effect: null },
      { name: 'Run Fade', type: 'Normal', power: 50, effect: null },
      { name: 'Clutch', type: 'Normal', power: 60, effect: null }
    ],
    'Dark': [
      { name: 'Shade', type: 'Dark', power: 40, effect: null },
      { name: 'Set Up', type: 'Dark', power: 30, effect: 'debuff', stat: 'defense', amount: 0.8 },
      { name: 'Pressure', type: 'Dark', power: 20, effect: 'debuff', stat: 'speed', amount: 0.7 },
      { name: 'Fade Back', type: 'Dark', power: 60, effect: null }
    ],
    'Electric': [
      { name: 'Spark', type: 'Electric', power: 40, effect: null },
      { name: 'Battery', type: 'Electric', power: 50, effect: null },
      { name: 'Shock', type: 'Electric', power: 30, effect: 'status', status: 'paralysis', chance: 0.3 },
      { name: 'Charge Up', type: 'Electric', power: 0, effect: 'buff', stat: 'speed', amount: 1.5 }
    ],
    'Fighting': [
      { name: 'Jab', type: 'Fighting', power: 40, effect: null },
      { name: 'Combo', type: 'Fighting', power: 20, effect: 'multi', hits: 3 },
      { name: 'Finisher', type: 'Fighting', power: 60, effect: null },
      { name: 'Train', type: 'Fighting', power: 0, effect: 'buff', stat: 'attack', amount: 1.3 }
    ]
  };
  
  // Default moves if type not found
  let availableMoves = movesByType['Normal'] || [];
  
  // Get type-specific moves
  if (movesByType[type]) {
    availableMoves = movesByType[type];
  }
  
  // Add a cross-type move for variety
  const crossTypes = Object.keys(movesByType).filter(t => t !== type);
  const secondaryType = crossTypes[Math.floor(Math.random() * crossTypes.length)];
  
  if (movesByType[secondaryType]) {
    // Add one random move from secondary type
    const secondaryMove = movesByType[secondaryType][Math.floor(Math.random() * movesByType[secondaryType].length)];
    availableMoves = [...availableMoves, secondaryMove];
  }
  
  // Shuffle moves
  for (let i = availableMoves.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availableMoves[i], availableMoves[j]] = [availableMoves[j], availableMoves[i]];
  }
  
  // Take first 4 moves or fewer if not enough
  const selectedMoves = availableMoves.slice(0, 4);
  
  // Add PP and descriptions to moves
  return selectedMoves.map(move => {
    return {
      ...move,
      pp: 15, // Default PP
      maxPp: 15,
      description: getGenericMoveDescription(move)
    };
  });
}

// Generate generic move descriptions
function getGenericMoveDescription(move) {
  if (move.effect === 'buff') {
    return `Raises ${move.stat} significantly`;
  } else if (move.effect === 'debuff') {
    return `Lowers opponent's ${move.stat}`;
  } else if (move.effect === 'heal') {
    return `Heals the user`;
  } else if (move.effect === 'status') {
    return `May cause ${move.status}`;
  } else if (move.effect === 'trap') {
    return `Prevents opponent from switching`;
  } else if (move.effect === 'multi') {
    return `Hits ${move.hits} times in succession`;
  } else if (move.power > 50) {
    return `A powerful ${move.type.toLowerCase()} attack`;
  } else if (move.power > 30) {
    return `A moderate ${move.type.toLowerCase()} attack`;
  } else {
    return `A basic ${move.type.toLowerCase()} attack`;
  }
}

// Change to a different zone
function changeZone(zoneName, entranceX, entranceY) {
  // Update current zone
  currentZone = zoneName;
  
  // Update player position to entrance coordinates
  player.x = entranceX;
  player.y = entranceY;
  
  // Set map data based on zone
  switch (zoneName) {
    case ZONE_TYPES.STARTER_HOOD:
      currentMap = STARTER_HOOD_MAP;
      currentNpcs = STARTER_HOOD_NPCS;
      currentDoors = STARTER_HOOD_DOORS;
      break;
    case ZONE_TYPES.THE_TRAP:
      // These would be defined like STARTER_HOOD_MAP, etc.
      // For now we'll just reuse the starter hood as a placeholder
      currentMap = STARTER_HOOD_MAP;
      currentNpcs = STARTER_HOOD_NPCS;
      currentDoors = STARTER_HOOD_DOORS;
      break;
    case 'cornerStore':
      // Interior of corner store would be defined
      // For now, placeholder
      currentMap = STARTER_HOOD_MAP;
      currentNpcs = STARTER_HOOD_NPCS.filter(npc => npc.id === 'npc2'); // Only the shop keeper
      currentDoors = [{ x: 7, y: 13, leadsTo: ZONE_TYPES.STARTER_HOOD, entranceX: 4, entranceY: 12 }];
      break;
    default:
      // Default back to starter hood
      currentMap = STARTER_HOOD_MAP;
      currentNpcs = STARTER_HOOD_NPCS;
      currentDoors = STARTER_HOOD_DOORS;
  }
  
  // Re-render map with new data
  renderMap();
  
  // Update player position display
  updatePlayerPosition();
  
  // Play zone transition sound
  playSwitchSound();
}

// Give a quest to the player
function giveQuest(quest) {
  // Check if player already has this quest
  if (player.activeQuests.some(q => q.id === quest.id) || 
      player.completedQuests.some(q => q.id === quest.id)) {
    showFloatingLog("You already have this quest.");
    return;
  }
  
  // Add quest to player's active quests
  player.activeQuests.push({...quest, progress: 0});
  
  // Show notification
  showFloatingLog(`New Quest: ${quest.name}`);
  
  // Update quest UI if needed
  // (This would be implemented to show active quests)
}

// Update quest progress
function updateQuestProgress(questType, zone, count = 1) {
  // Find matching quests
  player.activeQuests.forEach(quest => {
    if (quest.objective.type === questType && 
        (!quest.objective.zone || quest.objective.zone === zone)) {
      
      quest.progress += count;
      
      // Check if quest is complete
      if (quest.progress >= quest.objective.count) {
        completeQuest(quest);
      }
    }
  });
}

// Complete a quest and give rewards
function completeQuest(quest) {
  // Remove from active quests
  const questIndex = player.activeQuests.findIndex(q => q.id === quest.id);
  if (questIndex !== -1) {
    player.activeQuests.splice(questIndex, 1);
    
    // Add to completed quests
    player.completedQuests.push(quest);
    
    // Give rewards
    if (quest.reward) {
      if (quest.reward.money) {
        playerInventory.money += quest.reward.money;
      }
      
      if (quest.reward.item) {
        window.InventorySystem.addItemToInventory(playerInventory, quest.reward.item);
      }
    }
    
    // Show completion notification
    showFloatingLog(`Quest Complete: ${quest.name}!`);
  }
}

// Return to overworld after battle
function returnToOverworld(battleWon = true) {
  console.log("Overworld: Returning from battle, victory:", battleWon);
  
  // If battle was a random encounter and player won, increment quest counters
  if (battleWon && player.inTrapZone) {
    updateQuestProgress('defeat', 'trapZone');
  }
  
  // Check if container exists, if not, create it
  if (!document.getElementById('overworld-container')) {
    console.log("Overworld container not found, creating it");
    createOverworldUI();
  }
  
  // Hide battle screen
  const battleScreen = document.getElementById('battle-screen');
  if (battleScreen) {
    battleScreen.style.display = 'none';
  }
  
  // Hide game over screen
  const gameOverScreen = document.getElementById('game-over');
  if (gameOverScreen) {
    gameOverScreen.style.display = 'none';
  }
  
  // Show overworld
  overworldContainer.style.display = 'flex';
  
  // Update player display
  updatePlayerPosition();
  
  // Reset the map and NPCs
  renderMap();
  
  // Switch music back to overworld
  playOverworldMusic();
}

// Play overworld music
function playOverworldMusic() {
  try {
    // This should tie into existing audio system
    console.log("Attempting to play overworld music");
    
    // Check if global audio functions are available
    if (typeof window.playMenuMusic === 'function') {
      console.log("Using global playMenuMusic function");
      window.playMenuMusic();
    } else if (typeof playMenuMusic === 'function') {
      console.log("Using local playMenuMusic function");
      playMenuMusic();
    } else {
      console.warn("No music function available - overworld music won't play");
    }
  } catch (error) {
    console.error("Error playing overworld music:", error);
    // Non-critical error, can continue without music
  }
}

// Export overworld system with more accessible functions
window.OverworldSystem = {
  // Core functions
  initOverworld,
  returnToOverworld,
  
  // Constants
  ZONE_TYPES,
  TILE_TYPES,
  
  // Helper functions
  createRandomOpponent,
  triggerRandomEncounter,
  startNpcBattle,
  updateQuestProgress,
  
  // Map functions
  renderMap,
  movePlayer,
  
  // Set the current zone type
  getCurrentZone: function() { return currentZone; }
};