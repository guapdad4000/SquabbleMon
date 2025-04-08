/**
 * Sprite Manager for Squabble
 * Handles loading and animation of player and NPC sprites
 */

// Main character sprite set (ninja character with directional animations)
const NINJA_CHARACTER_SPRITES = {
  down: [
    'https://i.postimg.cc/W4rWTcgH/fwd-1.png',
    'https://i.postimg.cc/W4n2zLkY/fwd-2.png'
  ],
  up: [
    'https://i.postimg.cc/FKn0RmS5/back-1.png',
    'https://i.postimg.cc/qRB1bwkC/back-2.png'
  ],
  left: [
    'https://i.postimg.cc/RhyCm3sn/left-1.png',
    'https://i.postimg.cc/85WGcKkm/left-2.png'
  ],
  right: [
    'https://i.postimg.cc/1z9X0JFM/right-1.png',
    'https://i.postimg.cc/rFhqqVsX/right-2.png'
  ]
};

// NPC character sprites
const NPC_SPRITES = {
  'OG Ras': 'https://i.imgur.com/dZWWrrs.png',
  'Lil Brick': 'https://i.imgur.com/YeMI4sr.png',
  'Street Runner': 'https://i.imgur.com/T0hOs6U.png',
  'Default': 'https://i.imgur.com/m7Rup7S.png'
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
function updatePlayerSprite(playerElement, direction, isMoving = false) {
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
        
        // Add the current frame
        const img = document.createElement('img');
        img.src = frames[currentFrame];
        img.alt = 'Player';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        playerElement.appendChild(img);
      };
      
      // Initial frame
      animateSprite();
      
      // Start animation timer
      const timerId = setInterval(animateSprite, 250); // 4 frames per second
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
    
    const img = document.createElement('img');
    img.src = frames[0]; // Use first frame when standing still
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
  
  // Get sprite URL for this NPC
  const spriteUrl = npcData.sprite || NPC_SPRITES[npcData.name] || NPC_SPRITES['Default'];
  
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

// Export the sprite manager functions
window.SpriteManager = {
  preloadSprites,
  updatePlayerSprite,
  updateNpcSprite,
  NINJA_CHARACTER_SPRITES,
  NPC_SPRITES
};