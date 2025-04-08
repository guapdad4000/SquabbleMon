/**
 * Sprite Manager for Squabble
 * Handles loading and animation of player and NPC sprites
 */

// Use local sprites from public folder
// Main character sprite set (ninja character with directional animations)
const NINJA_CHARACTER_SPRITES = {
  down: [
    './public/sprites/fwd 1.png',
    './public/sprites/fwd 2.png'
  ],
  up: [
    './public/sprites/back 1.png',
    './public/sprites/back 2.png'
  ],
  left: [
    './public/sprites/left 1.png', 
    './public/sprites/left 2.png'
  ],
  right: [
    './public/sprites/right 1.png',
    './public/sprites/right 2.png'
  ]
};

// NPC character sprites
const NPC_SPRITES = {
  'OG Ras': './public/sprites/og_ras.png',
  'Lil Brick': './public/sprites/lil_brick.png',
  'Street Runner': './public/sprites/street_runner.png',
  'Default': './public/sprites/default_npc.png'
};

// Animation timers for each character
const animationTimers = new Map();
let currentFrame = 0;

/**
 * Preload all character sprites to avoid flickering
 */
function preloadSprites() {
  console.log("Preloading character sprites...");
  
  // Preload ninja character sprites
  Object.values(NINJA_CHARACTER_SPRITES).forEach(frames => {
    frames.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  });
  
  // Preload NPC sprites
  Object.values(NPC_SPRITES).forEach(src => {
    const img = new Image();
    img.src = src;
  });
  
  console.log("Sprite preloading complete");
}

/**
 * Set player sprite based on direction and animate
 * @param {HTMLElement} playerElement - The player sprite DOM element
 * @param {string} direction - The direction the player is facing
 * @param {boolean} isMoving - Whether the player is currently moving
 */
function updatePlayerSprite(playerElement, direction, isMoving = false, characterSprite = null) {
  if (!playerElement) {
    console.error("Player element not found in updatePlayerSprite");
    return;
  }
  
  if (!direction || !NINJA_CHARACTER_SPRITES[direction]) {
    console.warn(`Invalid direction: ${direction}`);
    direction = 'down'; // Default direction
  }
  
  // Update direction class
  playerElement.className = `facing-${direction}`;
  
  // If character has a specific sprite, use that instead of directional sprites
  if (characterSprite) {
    console.log("Using character-specific sprite:", characterSprite);
    
    // Clear any existing image
    while (playerElement.firstChild) {
      playerElement.removeChild(playerElement.firstChild);
    }
    
    // Get the resolved sprite URL
    const spriteUrl = getGameSpriteUrl(characterSprite);
    console.log("Resolved sprite URL:", spriteUrl);
    
    // Add the character's sprite
    const img = document.createElement('img');
    img.src = spriteUrl;
    img.alt = 'Player';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';
    playerElement.appendChild(img);
    
    return;
  }
  
  // Get sprite frames for this direction
  const frames = NINJA_CHARACTER_SPRITES[direction];
  
  // If player is moving, animate between frames
  if (isMoving) {
    // Start animation if not already running
    if (!animationTimers.has('player')) {
      const animateSprite = () => {
        currentFrame = (currentFrame + 1) % frames.length;
        
        // Clear any existing image
        while (playerElement.firstChild) {
          playerElement.removeChild(playerElement.firstChild);
        }
        
        // Get resolved sprite URL
        const spriteUrl = getGameSpriteUrl(frames[currentFrame]);
        
        // Add the current frame
        const img = document.createElement('img');
        img.src = spriteUrl;
        img.alt = 'Player';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        playerElement.appendChild(img);
      };
      
      // Initial frame
      animateSprite();
      
      // Start animation timer (more frequent updates for smoother animation)
      const timerId = setInterval(animateSprite, 170); // ~6 frames per second
      animationTimers.set('player', timerId);
    }
  } else {
    // Stop animation if player is not moving
    if (animationTimers.has('player')) {
      clearInterval(animationTimers.get('player'));
      animationTimers.delete('player');
    }
    
    // Set static image (first frame)
    while (playerElement.firstChild) {
      playerElement.removeChild(playerElement.firstChild);
    }
    
    // Get resolved sprite URL
    const spriteUrl = getGameSpriteUrl(frames[0]);
    
    const img = document.createElement('img');
    img.src = spriteUrl; // Use first frame when standing still
    img.alt = 'Player';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';
    playerElement.appendChild(img);
  }
}

/**
 * Update NPC sprite with appropriate image and animation
 * @param {HTMLElement} npcElement - The NPC sprite DOM element
 * @param {Object} npcData - Data about the NPC including name and sprite
 */
function updateNpcSprite(npcElement, npcData) {
  if (!npcElement || !npcData) {
    console.error("Missing parameters in updateNpcSprite");
    return;
  }
  
  // Get base sprite URL for this NPC
  const baseUrl = npcData.sprite || NPC_SPRITES[npcData.name] || NPC_SPRITES['Default'];
  
  // Resolve the sprite URL
  const spriteUrl = getGameSpriteUrl(baseUrl);
  console.log(`NPC ${npcData.name} sprite URL:`, spriteUrl);
  
  // Set up NPC image
  const img = npcElement.querySelector('img');
  if (img) {
    // Update existing image
    img.src = spriteUrl;
    img.alt = npcData.name;
    img.className = `facing-${npcData.direction || 'down'}`;
  } else {
    // Create new image
    const newImg = document.createElement('img');
    newImg.src = spriteUrl;
    newImg.alt = npcData.name;
    newImg.className = `facing-${npcData.direction || 'down'}`;
    npcElement.appendChild(newImg);
  }
  
  // Add the tooltip
  const tooltip = npcElement.querySelector('.npc-tooltip');
  if (!tooltip) {
    const newTooltip = document.createElement('div');
    newTooltip.className = 'npc-tooltip';
    newTooltip.textContent = npcData.name;
    npcElement.appendChild(newTooltip);
  } else {
    tooltip.textContent = npcData.name;
  }
  
  // Add visual indicator for NPC type
  npcElement.classList.remove('battle-npc', 'shop-npc', 'quest-npc');
  
  if (npcData.triggersBattle) {
    npcElement.classList.add('battle-npc');
  } else if (npcData.opensShop) {
    npcElement.classList.add('shop-npc');
  } else if (npcData.givesQuest) {
    npcElement.classList.add('quest-npc');
  }
}

/**
 * Helper function to get sprite URL - handles different sprite formats
 * @param {string} spritePath - Path to the sprite
 * @returns {string} - Resolved sprite URL
 */
function getGameSpriteUrl(spritePath) {
  // If it's a URL, return as is
  if (spritePath && (spritePath.startsWith('http://') || spritePath.startsWith('https://'))) {
    return spritePath;
  }
  
  // If it starts with public or has file extension, use as is
  if (spritePath && (spritePath.startsWith('./public/') || spritePath.includes('.'))) {
    return spritePath;
  }
  
  // Otherwise assume it's a character selection sprite
  return `./public/sprites/${spritePath}.png`;
}

// Export the sprite manager functions
window.SpriteManager = {
  preloadSprites,
  updatePlayerSprite,
  updateNpcSprite,
  getGameSpriteUrl,
  NINJA_CHARACTER_SPRITES,
  NPC_SPRITES
};