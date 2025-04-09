/**
 * Sprite Manager for Squabble
 * Handles loading and animation of player and NPC sprites
 */

// Use local sprites from public folder
// Main character sprite set (ninja character with directional animations)
const NINJA_CHARACTER_SPRITES = {
  // Reversed up/down orientation as requested
  down: [
    'public/sprites/back 1.png', // Character's back now for down direction
    'public/sprites/back 2.png'
  ],
  up: [
    'public/sprites/fwd 1.png',  // Character's front now for up direction
    'public/sprites/fwd 2.png'
  ],
  left: [
    'public/sprites/left 1.png', 
    'public/sprites/left 2.png'
  ],
  right: [
    'public/sprites/right 1.png',
    'public/sprites/right 2.png'
  ]
};

// NPC character sprites - check if already defined in window
if (typeof window.NPC_SPRITES === 'undefined') {
  window.NPC_SPRITES = {
    'OG Ras': 'public/sprites/og_ras.png',
    'Lil Brick': 'public/sprites/lil_brick.png',
    'Street Runner': 'public/sprites/street_runner.png',
    'Default': 'public/sprites/default_npc.png',
    // Add Fitness Bro directly for easy access
    'Fitness Bro': 'https://i.imgur.com/qxnS0SH.png',
    'fitness': 'https://i.imgur.com/qxnS0SH.png'
  };
}
// Use the global NPC_SPRITES for consistency
const NPC_SPRITES = window.NPC_SPRITES;

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
  
  // Determine if we're in a battle or overworld
  const inBattle = document.getElementById('battle-screen') && 
                  document.getElementById('battle-screen').style.display !== 'none';
  
  // In battle, use character-specific sprite if provided
  if (inBattle && characterSprite) {
    console.log("Using character-specific sprite in battle:", characterSprite);
    
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
  
  // In overworld, always use the standard player sprite
  if (!inBattle) {
    console.log("Using standard overworld player sprite rather than character-specific sprite");
    // Use the ninja character sprite set (directional animations)
    
    // Continue to the rest of the function for directional sprite handling
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
 * @returns {string} - Resolved sprite URL using imgur URLs
 */
function getGameSpriteUrl(spritePath) {
  // If window.standardizeSpritePath is available, use that for consistency
  if (typeof window.standardizeSpritePath === 'function') {
    console.log("Using global standardizeSpritePath for consistency");
    return window.standardizeSpritePath(spritePath);
  }
  
  // Debug helper to track standardization of sprites
  const debugEnabled = true;
  const logSprite = (message, path) => {
    if (debugEnabled) {
      console.log(`[SPRITE_MANAGER] ${message}`, path);
    }
  };
  
  // Default sprite if none is provided
  if (!spritePath || typeof spritePath !== 'string') {
    logSprite("Missing or invalid sprite path in getGameSpriteUrl", spritePath);
    return 'https://i.imgur.com/YeMI4sr.png'; // Default to Fitness Bro
  }
  
  // Trim any whitespace
  spritePath = spritePath.trim();
  logSprite("Processing sprite path:", spritePath);
  
  // For imgur URLs, ensure consistency
  if (spritePath.includes('imgur.com')) {
    logSprite("Found imgur URL", spritePath);
    
    // Fix common imgur format issues
    if (spritePath.includes('imgur.com/a/')) {
      logSprite("Imgur album detected, not supported", spritePath);
      return 'https://i.imgur.com/YeMI4sr.png'; // Cannot use album links
    }
    
    // Fix non-direct links to use i.imgur.com format
    if (spritePath.includes('imgur.com') && !spritePath.includes('i.imgur.com')) {
      // Extract the ID (last part of URL)
      const parts = spritePath.split('/');
      const id = parts[parts.length - 1].split('.')[0];
      spritePath = `https://i.imgur.com/${id}.png`;
      logSprite("Converted to direct i.imgur.com format", spritePath);
    }
    
    return spritePath;
  }
  
  // For other URLs, leave as is
  if (spritePath.startsWith('http://') || spritePath.startsWith('https://')) {
    logSprite("Using non-imgur URL", spritePath);
    return spritePath;
  }
  
  // For local paths, map to imgur URLs
  logSprite("Converting local path to imgur URL", spritePath);
  
  // Character name map
  const characterToImageMap = {
    // Main characters
    'Rastamon': 'https://i.imgur.com/dZWWrrs.png',
    'Fitness Bro': 'https://i.imgur.com/YeMI4sr.png',
    'Techy': 'https://i.imgur.com/VVa9pm9.png',
    'Cool Vibe YN': 'https://i.imgur.com/2n71aSJ.png',
    '9-5 Homie': 'https://i.imgur.com/UkE9crR.png',
    'All Jokes YN': 'https://i.imgur.com/9hFTFQt.png',
    'Closet Nerd': 'https://i.imgur.com/knA2Yxz.png',
    'Functional Addict': 'https://i.imgur.com/G3xfSjU.png',
    'Dysfunctional YN': 'https://i.imgur.com/yA0lUbo.png',
    'Gamer YN': 'https://i.imgur.com/vFvQKap.png',
    'Serial YN': 'https://i.imgur.com/Kwe1HpA.png',
    'Homeless YN': 'https://i.imgur.com/LRVrieF.png',
    'Rich Techbro': 'https://i.imgur.com/GmlKf6u.png',
    'Gamer Unemployed': 'https://i.imgur.com/b5pnt7o.png',
    'Earthy': 'https://i.imgur.com/1SuHgnZ.png'
  };
  
  // Try to match character name directly
  for (const [charName, imgurUrl] of Object.entries(characterToImageMap)) {
    if (spritePath.toLowerCase().includes(charName.toLowerCase())) {
      logSprite(`Found character name match: ${charName}`, imgurUrl);
      return imgurUrl;
    }
  }
  
  // Map common character types to known working imgur URLs
  const lowercasePath = spritePath.toLowerCase();
  
  if (lowercasePath.includes('og_ras') || lowercasePath.includes('rasta')) {
    return 'https://i.imgur.com/dZWWrrs.png';
  } else if (lowercasePath.includes('brick') || lowercasePath.includes('fitness') || lowercasePath.includes('workout')) {
    return 'https://i.imgur.com/YeMI4sr.png';
  } else if (lowercasePath.includes('tech') || lowercasePath.includes('computer')) {
    return 'https://i.imgur.com/VVa9pm9.png';
  } else if (lowercasePath.includes('cool') || lowercasePath.includes('vibe')) {
    return 'https://i.imgur.com/2n71aSJ.png';
  } else if (lowercasePath.includes('trap')) {
    return 'https://i.imgur.com/Kwe1HpA.png'; // Serial YN as trap character
  } else if (lowercasePath.includes('guard')) {
    return 'https://i.imgur.com/G3xfSjU.png'; // Functional addict as guard
  } else if (lowercasePath.includes('kingpin')) {
    return 'https://i.imgur.com/GmlKf6u.png'; // Rich techbro as kingpin
  } else if (lowercasePath.includes('momma') || lowercasePath.includes('kitchen')) {
    return 'https://i.imgur.com/vFvQKap.png'; // Gamer YN as momma
  } else if (lowercasePath.includes('opp')) {
    return 'https://i.imgur.com/9hFTFQt.png'; // All jokes as Opp
  } else if (lowercasePath.includes('earthy')) {
    return 'https://i.imgur.com/1SuHgnZ.png'; // Earthy character
  } else if (lowercasePath.includes('dysfunctional')) {
    return 'https://i.imgur.com/yA0lUbo.png'; // Dysfunctional YN
  } else if (lowercasePath.includes('9-5') || lowercasePath.includes('office')) {
    return 'https://i.imgur.com/UkE9crR.png'; // 9-5 homie
  } else if (lowercasePath.includes('jokes')) {
    return 'https://i.imgur.com/9hFTFQt.png'; // All jokes
  } else if (lowercasePath.includes('nerd') || lowercasePath.includes('closet')) {
    return 'https://i.imgur.com/knA2Yxz.png'; // Closet nerd
  } else if (lowercasePath.includes('homeless')) {
    return 'https://i.imgur.com/LRVrieF.png'; // Homeless YN
  } else if (lowercasePath.includes('gamer')) {
    return 'https://i.imgur.com/vFvQKap.png'; // Gamer YN
  } else if (lowercasePath.includes('serial')) {
    return 'https://i.imgur.com/Kwe1HpA.png'; // Serial YN
  } else if (lowercasePath.includes('rich') || lowercasePath.includes('techbro')) {
    return 'https://i.imgur.com/GmlKf6u.png'; // Rich techbro
  } 
  
  // Special case for overworld movement sprites
  if (lowercasePath.includes('back') || lowercasePath.includes('fwd') || 
      lowercasePath.includes('right') || lowercasePath.includes('left')) {
    // For player movement sprites, still use the originals as is
    logSprite("Handling movement sprite for overworld", spritePath);
    
    // Fix paths starting with ./public/ to use public/ instead
    if (spritePath.startsWith('./public/')) {
      const fixedPath = spritePath.replace('./public/', 'public/');
      logSprite("Fixed path from ./public/ to public/", fixedPath);
      return fixedPath;
    }
    
    // Ensure it starts with public/ if needed
    if (!spritePath.startsWith('public/')) {
      const fixedPath = 'public/' + spritePath;
      logSprite("Added public/ prefix to path", fixedPath);
      return fixedPath;
    }
    
    return spritePath;
  }
  
  // Default fallback - use fitness bro for anything we can't map
  logSprite("Using fallback imgur URL for sprite", spritePath);
  return 'https://i.imgur.com/YeMI4sr.png';
}

/**
 * Debugging utility for sprite issues
 * @param {string} context - Where this is being called from 
 * @param {Object} character - Character object to debug sprites for
 */
function debugSpriteIssues(context, character) {
  console.group(`🔍 SPRITE DEBUG [${context}]`);
  
  console.log('Character:', character ? character.name : 'No character provided');
  
  if (character) {
    console.log('Sprite path:', character.sprite);
    if (character.sprite) {
      const standardized = typeof window.standardizeSpritePath === 'function' 
        ? window.standardizeSpritePath(character.sprite) 
        : getGameSpriteUrl(character.sprite);
      
      console.log('Standardized path:', standardized);
      
      if (standardized !== character.sprite) {
        console.warn('⚠️ Non-standardized sprite path detected!');
        // Auto-fix the sprite path if needed
        if (context.includes('BATTLE')) {
          console.log('Auto-fixing sprite path for battle...');
          character.sprite = standardized;
        }
      }
    } else {
      console.warn('⚠️ No sprite path defined for character!');
      // Auto-assign a default sprite based on character name or type
      if (character.name) {
        console.log('Attempting to assign default sprite based on character name...');
        character.sprite = getGameSpriteUrl(character.name);
        console.log('Assigned default sprite:', character.sprite);
      }
    }
  }
  
  // Check for sprite containers in battle screen
  const playerSpriteContainer = document.getElementById('player-sprite-container');
  if (playerSpriteContainer) {
    console.log('Player sprite container found:');
    console.log('  Visibility:', playerSpriteContainer.style.visibility);
    console.log('  Display:', playerSpriteContainer.style.display);
    console.log('  Opacity:', playerSpriteContainer.style.opacity);
    console.log('  Dimensions:', playerSpriteContainer.style.width, 'x', playerSpriteContainer.style.height);
    console.log('  Z-index:', playerSpriteContainer.style.zIndex);
    
    // Check for image inside container
    const playerImg = playerSpriteContainer.querySelector('img');
    if (playerImg) {
      console.log('  Image found inside container');
      console.log('  Image src:', playerImg.src);
    } else {
      console.warn('  ⚠️ No image found inside container!');
    }
  } else {
    // Check for player-sprite element (direct img element)
    const playerSpriteElement = document.getElementById('player-sprite');
    if (playerSpriteElement) {
      console.log('Player sprite element found in DOM');
      console.log('  Current src:', playerSpriteElement.src);
      console.log('  Visibility:', playerSpriteElement.style.visibility);
      console.log('  Display:', playerSpriteElement.style.display);
      console.log('  Opacity:', playerSpriteElement.style.opacity);
      console.log('  Dimensions:', playerSpriteElement.style.width, 'x', playerSpriteElement.style.height);
      console.log('  Z-index:', playerSpriteElement.style.zIndex);
    } else {
      console.warn('⚠️ Neither player sprite container nor element found in DOM');
    }
  }
  
  // Check if we're in battle mode
  const battleScreen = document.getElementById('battle-screen');
  if (battleScreen) {
    console.log('Battle screen detected:');
    console.log('  Display:', battleScreen.style.display);
    console.log('  Visibility:', battleScreen.style.visibility);
  }
  
  // Check if we're in overworld mode
  const overworldContainer = document.getElementById('overworld-container');
  if (overworldContainer) {
    console.log('Overworld container detected:');
    console.log('  Display:', overworldContainer.style.display);
    console.log('  Visibility:', overworldContainer.style.visibility);
  }
  
  console.groupEnd();
}

// Export the sprite manager functions
window.SpriteManager = {
  preloadSprites,
  updatePlayerSprite,
  updateNpcSprite,
  getGameSpriteUrl,
  debugSpriteIssues,
  NINJA_CHARACTER_SPRITES,
  NPC_SPRITES
};