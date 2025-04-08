/**
 * Fixed Sprite Manager
 * A robust, error-resistant sprite management system
 */

(function() {
  // Debug mode
  const DEBUG = true;
  const log = (msg) => DEBUG && console.log(`[SPRITE-FIX] ${msg}`);
  
  // Cache for sprite URLs
  const spriteCache = new Map();
  
  // Default sprite paths by direction
  const DEFAULT_SPRITES = {
    up: 'https://i.imgur.com/1rSNlYO.png',    // back 1
    down: 'https://i.imgur.com/qxnS0SH.png',  // fwd 1
    left: 'https://i.imgur.com/LlMLcyZ.png',  // left 1
    right: 'https://i.imgur.com/7D40jZG.png'  // right 1
  };
  
  // Character sprite sets (indexed by character name)
  const CHARACTER_SPRITES = {
    // Default fallbacks
    default: {
      up: 'https://i.imgur.com/1rSNlYO.png',    // back 1
      down: 'https://i.imgur.com/qxnS0SH.png',  // fwd 1
      left: 'https://i.imgur.com/LlMLcyZ.png',  // left 1
      right: 'https://i.imgur.com/7D40jZG.png'  // right 1
    },
    // Add more characters here
  };
  
  // Fixed function to standardize sprite paths (with safety checks)
  function standardizeSpritePath(spritePath) {
    if (!spritePath) return DEFAULT_SPRITES.down;
    
    try {
      // Check cache first
      if (spriteCache.has(spritePath)) {
        return spriteCache.get(spritePath);
      }
      
      // Handle different sprite formats
      let finalPath = spritePath;
      
      // If already an imgur URL, don't modify
      if (spritePath.includes('imgur.com')) {
        // Just ensure it's not the thumbnail version
        finalPath = spritePath.replace(/(\\.png)[a-z]$/, '$1');
      } 
      // Handle file paths - convert to imgur URLs
      else if (spritePath.includes('/')) {
        const fileName = spritePath.split('/').pop();
        
        // Map filenames to known Imgur URLs
        const spriteMap = {
          'fwd 1.png': 'https://i.imgur.com/qxnS0SH.png',
          'fwd 2.png': 'https://i.imgur.com/aXt732G.png',
          'back 1.png': 'https://i.imgur.com/1rSNlYO.png',
          'back 2.png': 'https://i.imgur.com/zyQYr6k.png',
          'left 1.png': 'https://i.imgur.com/LlMLcyZ.png',
          'left 2.png': 'https://i.imgur.com/oW9gHVE.png',
          'right 1.png': 'https://i.imgur.com/7D40jZG.png',
          'right 2.png': 'https://i.imgur.com/0uheBxU.png'
        };
        
        if (spriteMap[fileName]) {
          finalPath = spriteMap[fileName];
        } else {
          // Fallback to default sprite if not found
          log(`No mapped imgur URL for sprite: ${fileName}, using default`);
          finalPath = DEFAULT_SPRITES.down;
        }
      }
      
      // Cache the result
      spriteCache.set(spritePath, finalPath);
      return finalPath;
    } catch (err) {
      console.error('Error in standardizeSpritePath:', err);
      return DEFAULT_SPRITES.down; // Safe fallback
    }
  }
  
  // Improved function to update player sprite
  function updatePlayerSprite(playerElement, direction, isMoving = false, characterSprite = null) {
    if (!playerElement) return;
    
    try {
      // Make sure direction is valid
      direction = ['up', 'down', 'left', 'right'].includes(direction) ? direction : 'down';
      
      // Get the appropriate sprite based on direction
      let spriteUrl;
      
      if (characterSprite) {
        // Use character-specific sprite if provided
        spriteUrl = standardizeSpritePath(characterSprite[direction]);
      } else {
        // Otherwise use default sprite for direction
        spriteUrl = DEFAULT_SPRITES[direction];
      }
      
      // First try to update just the img tag if it exists
      const img = playerElement.querySelector('img');
      
      if (img) {
        img.src = spriteUrl;
      } else {
        // Create new img tag if needed
        const newImg = document.createElement('img');
        newImg.src = spriteUrl;
        newImg.alt = 'Player';
        newImg.style.width = '100%';
        newImg.style.height = '100%';
        
        // Clear existing content and append new image
        playerElement.innerHTML = '';
        playerElement.appendChild(newImg);
      }
    } catch (err) {
      console.error('Error updating player sprite:', err);
    }
  }
  
  // Function to update NPC sprites
  function updateNpcSprite(npcElement, npcData) {
    if (!npcElement || !npcData) return;
    
    try {
      // Get sprite URL from NPC data
      const spriteUrl = standardizeSpritePath(npcData.sprite);
      
      // Update sprite image
      const img = npcElement.querySelector('img');
      
      if (img) {
        img.src = spriteUrl;
      } else {
        const newImg = document.createElement('img');
        newImg.src = spriteUrl;
        newImg.alt = npcData.name || 'NPC';
        newImg.style.width = '100%';
        newImg.style.height = '100%';
        
        npcElement.innerHTML = '';
        npcElement.appendChild(newImg);
      }
    } catch (err) {
      console.error(`Error updating NPC sprite for ${npcData.name}:`, err);
    }
  }
  
  // Preload common sprites to avoid flickering
  function preloadSprites() {
    log('Preloading common sprites');
    
    // Create hidden img elements to preload
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.width = '0';
    container.style.height = '0';
    container.style.overflow = 'hidden';
    container.style.visibility = 'hidden';
    
    // Preload default sprites
    Object.values(DEFAULT_SPRITES).forEach(url => {
      const img = document.createElement('img');
      img.src = url;
      container.appendChild(img);
    });
    
    // Add to DOM temporarily
    document.body.appendChild(container);
    
    // Remove after sprites are loaded
    setTimeout(() => {
      document.body.removeChild(container);
    }, 2000);
  }
  
  // Store original functions for reference
  let originalStandardizeSpritePath = null;
  let originalUpdatePlayerSprite = null;
  let originalUpdateNpcSprite = null;
  
  // Override global functions (if they exist)
  function overrideGlobalFunctions() {
    if (typeof window.standardizeSpritePath === 'function') {
      log('Overriding global standardizeSpritePath function');
      originalStandardizeSpritePath = window.standardizeSpritePath;
      window.standardizeSpritePath = standardizeSpritePath;
    }
    
    if (window.SpriteManager) {
      log('Patching SpriteManager functions');
      
      if (typeof window.SpriteManager.updatePlayerSprite === 'function') {
        originalUpdatePlayerSprite = window.SpriteManager.updatePlayerSprite;
        window.SpriteManager.updatePlayerSprite = updatePlayerSprite;
      }
      
      if (typeof window.SpriteManager.updateNpcSprite === 'function') {
        originalUpdateNpcSprite = window.SpriteManager.updateNpcSprite;
        window.SpriteManager.updateNpcSprite = updateNpcSprite;
      }
    } else {
      // Create global SpriteManager if it doesn't exist
      window.SpriteManager = {
        updatePlayerSprite,
        updateNpcSprite,
        preloadSprites,
        standardizeSpritePath
      };
    }
  }
  
  // Initialize when DOM is loaded
  function initialize() {
    log('Initializing Fixed Sprite Manager');
    preloadSprites();
    overrideGlobalFunctions();
  }
  
  // Execute on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
  
  // Export global access
  window.FixedSpriteManager = {
    standardizeSpritePath,
    updatePlayerSprite,
    updateNpcSprite,
    preloadSprites,
    initialize
  };
})();