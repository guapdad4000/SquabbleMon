/**
 * Squabble Overworld System
 * Top-down exploration between battles with NPCs and triggers
 */

// Map constants for various zones
const ZONE_TYPES = {
  STARTER_HOOD: 'starterHood',
  THE_TRAP: 'theTrap',
  THE_BLOCK: 'theBlock',
  RICH_SUBURBIA: 'richSuburbia',
  BACK_ALLEY_ARENA: 'backAlleyArena'
};

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
    sprite: 'https://i.imgur.com/dZWWrrs.png',
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
      sprite: 'https://i.imgur.com/dZWWrrs.png',
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
    sprite: 'https://i.imgur.com/YeMI4sr.png',
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
    sprite: 'https://i.imgur.com/T0hOs6U.png',
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
    // Set player sprite from selected character
    player.sprite = selectedCharacter.sprite;
    
    // Hide battle screen and show overworld
    const battleScreen = document.getElementById('battle-screen');
    if (battleScreen) battleScreen.style.display = 'none';
    
    const charSelection = document.getElementById('character-selection');
    if (charSelection) charSelection.style.display = 'none';
    
    // Create overworld container if it doesn't exist
    if (!document.getElementById('overworld-container')) {
      console.log("Creating new overworld UI");
      createOverworldUI();
    } else {
      console.log("Using existing overworld UI");
      overworldContainer = document.getElementById('overworld-container');
      mapContainer = document.getElementById('map-container');
      playerSprite = document.getElementById('player-sprite');
      dialogueBox = document.getElementById('dialogue-box');
    }
    
    // Make sure all UI elements are defined
    if (!overworldContainer) {
      console.error("Overworld container not initialized!");
      return;
    }
    
    // Display overworld
    overworldContainer.style.display = 'flex';
    
    // Set up player position
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
  dialogueBox.innerHTML = `
    <div class="dialogue-content">
      <p id="dialogue-text"></p>
      <p id="dialogue-name"></p>
    </div>
    <div class="dialogue-controls">
      <button id="dialogue-next">Next</button>
    </div>
  `;
  dialogueBox.style.display = 'none';
  overworldContainer.appendChild(dialogueBox);
  
  // Set up dialogue controls
  document.getElementById('dialogue-next').addEventListener('click', advanceDialogue);
  
  // Render the map initially
  renderMap();
}

// Render the map grid based on current zone
function renderMap() {
  mapContainer.innerHTML = ''; // Clear existing map
  
  // Add player sprite
  mapContainer.appendChild(playerSprite);
  
  // Render each tile based on map data
  const tileSize = 32; // Each tile is 32x32 pixels
  
  for (let y = 0; y < currentMap.length; y++) {
    for (let x = 0; x < currentMap[y].length; x++) {
      const tileType = currentMap[y][x];
      const tile = document.createElement('div');
      tile.className = 'map-tile';
      tile.style.left = `${x * tileSize}px`;
      tile.style.top = `${y * tileSize}px`;
      tile.style.width = `${tileSize}px`;
      tile.style.height = `${tileSize}px`;
      
      // Apply tile-specific styles
      switch (tileType) {
        case TILE_TYPES.WALKABLE:
          tile.classList.add('walkable');
          break;
        case TILE_TYPES.BLOCKED:
          tile.classList.add('blocked');
          break;
        case TILE_TYPES.GRASS:
          tile.classList.add('grass');
          break;
        case TILE_TYPES.TRAP_ZONE:
          tile.classList.add('trap-zone');
          break;
        case TILE_TYPES.DOOR:
          tile.classList.add('door');
          break;
      }
      
      mapContainer.appendChild(tile);
    }
  }
  
  // Add NPCs to the map
  renderNpcs();
}

// Render NPCs on the map
function renderNpcs() {
  // Remove existing NPCs
  npcs.forEach(npc => {
    if (npc.element && npc.element.parentNode) {
      npc.element.parentNode.removeChild(npc.element);
    }
  });
  
  npcs = [];
  
  // Create NPC elements
  currentNpcs.forEach(npcData => {
    const npcElement = document.createElement('div');
    npcElement.className = 'npc-sprite';
    npcElement.style.left = `${npcData.x * 32}px`;
    npcElement.style.top = `${npcData.y * 32}px`;
    
    // Set NPC appearance
    const npcImg = document.createElement('img');
    npcImg.src = npcData.sprite;
    npcImg.alt = npcData.name;
    npcImg.className = `facing-${npcData.direction}`;
    
    npcElement.appendChild(npcImg);
    mapContainer.appendChild(npcElement);
    
    // Store reference to the element
    npcs.push({
      data: npcData,
      element: npcElement
    });
  });
}

// Update player position on the map
function updatePlayerPosition() {
  const tileSize = 32;
  playerSprite.style.left = `${player.x * tileSize}px`;
  playerSprite.style.top = `${player.y * tileSize}px`;
  
  // Update player sprite direction
  playerSprite.className = `facing-${player.direction}`;
  
  // Set sprite image
  if (!playerSprite.querySelector('img')) {
    const img = document.createElement('img');
    img.src = player.sprite;
    img.alt = 'Player';
    playerSprite.appendChild(img);
  }
  
  // Check current tile type
  checkCurrentTile();
}

// Check the type of tile the player is standing on
function checkCurrentTile() {
  const tileType = currentMap[player.y][player.x];
  
  // Handle trap zones (random encounter areas)
  player.inTrapZone = (tileType === TILE_TYPES.TRAP_ZONE);
  
  // Check for door tiles
  if (tileType === TILE_TYPES.DOOR) {
    const door = currentDoors.find(d => d.x === player.x && d.y === player.y);
    if (door) {
      changeZone(door.leadsTo, door.entranceX, door.entranceY);
    }
  }
  
  // Check for random encounters in trap zones
  if (player.inTrapZone) {
    player.stepCount++;
    
    if (player.stepCount % 5 === 0) {
      if (Math.random() < 0.25) {
        // 25% chance of random encounter every 5 steps in trap zones
        triggerRandomEncounter();
      }
    }
  }
}

// Handle player movement
function movePlayer(direction) {
  // Store previous position
  const prevX = player.x;
  const prevY = player.y;
  
  // Update player direction
  player.direction = direction;
  
  // Update position based on direction
  switch (direction) {
    case 'up':
      if (player.y > 0) player.y--;
      break;
    case 'down':
      if (player.y < currentMap.length - 1) player.y++;
      break;
    case 'left':
      if (player.x > 0) player.x--;
      break;
    case 'right':
      if (player.x < currentMap[0].length - 1) player.x++;
      break;
  }
  
  // Check for collision
  if (currentMap[player.y][player.x] === TILE_TYPES.BLOCKED) {
    // Revert to previous position
    player.x = prevX;
    player.y = prevY;
    return false;
  }
  
  // Check for NPC collision
  const npcAtPosition = currentNpcs.find(npc => npc.x === player.x && npc.y === player.y);
  if (npcAtPosition) {
    // Revert to previous position
    player.x = prevX;
    player.y = prevY;
    return false;
  }
  
  // Update player position on screen
  updatePlayerPosition();
  return true;
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
    
    dialogueBox.style.display = 'block';
    
    const nameElement = document.getElementById('dialogue-name');
    if (nameElement) {
      nameElement.textContent = npc.name;
    } else {
      console.error("Dialogue name element not found!");
    }
    
    currentDialogue = npc;
    currentDialogueLine = 0;
    
    // Show first line of dialogue
    const textElement = document.getElementById('dialogue-text');
    if (textElement) {
      textElement.textContent = npc.lines[currentDialogueLine];
    } else {
      console.error("Dialogue text element not found!");
    }
    
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
  
  // Generate sprite (using a consistent seed for same enemy types)
  const spriteOptions = [
    'https://i.imgur.com/dZWWrrs.png',
    'https://i.imgur.com/YeMI4sr.png',
    'https://i.imgur.com/T0hOs6U.png',
    'https://i.imgur.com/fEPAiIJ.png'
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
  // This should tie into existing audio system
  if (typeof playMenuMusic === 'function') {
    playMenuMusic();
  }
}

// Export overworld system
window.OverworldSystem = {
  initOverworld,
  returnToOverworld,
  ZONE_TYPES
};