/**
 * Player Sprite Manager
 * Handles player sprite animations using individual frame images
 * Updated version that uses separate images instead of a sprite sheet
 */

const PlayerSpriteManager = (function() {
  // Define image URLs for each frame by direction
  const SPRITE_FRAMES = {
    down: [
      './assets/sprites/fwd 1.png',   // Down, first frame
      './assets/sprites/fwd 2.png',   // Down, second frame
      './assets/sprites/fwd 1.png'    // Down, third frame (repeat first for smooth animation)
    ],
    up: [
      './assets/sprites/back 1.png',   // Up, first frame
      './assets/sprites/back 2.png',   // Up, second frame
      './assets/sprites/back 1.png'    // Up, third frame (repeat first for smooth animation)
    ],
    left: [
      './assets/sprites/left 1.png',   // Left, first frame
      './assets/sprites/left 2.png',   // Left, second frame
      './assets/sprites/left 1.png'    // Left, third frame (repeat first for smooth animation)
    ],
    right: [
      './assets/sprites/right 1.png',  // Right, first frame
      './assets/sprites/right 2.png',  // Right, second frame
      './assets/sprites/right 1.png'   // Right, third frame (repeat first for smooth animation)
    ]
  };
  
  // Individual frame size in pixels
  const FRAME_WIDTH = 48;
  const FRAME_HEIGHT = 56;
  
  // Number of frames per animation sequence
  const FRAMES_PER_DIRECTION = 3;
  
  // Animation timing
  const ANIMATION_SPEED = 250; // ms per frame - slightly slower for better visibility
  
  // Current animation state
  let currentDirection = 'down';
  let currentFrame = 0;
  let animationTimer = null;
  let isMoving = false;
  
  // Track loaded images
  let imagesLoaded = {};
  
  /**
   * Initialize the sprite manager
   */
  function init() {
    console.log('[PLAYER SPRITE] Initializing player sprite manager');
    
    // Preload all frame images
    for (const direction in SPRITE_FRAMES) {
      SPRITE_FRAMES[direction].forEach(imgUrl => {
        const img = new Image();
        img.onload = function() {
          console.log(`[PLAYER SPRITE] Image loaded: ${imgUrl}`);
          imagesLoaded[imgUrl] = true;
        };
        img.onerror = function() {
          console.error(`[PLAYER SPRITE] Failed to load image: ${imgUrl}`);
        };
        img.src = imgUrl;
      });
    }
  }
  
  /**
   * Get the current sprite frame CSS
   */
  function getCurrentFrameCSS() {
    // Get the current frame URL based on direction
    const frameUrl = SPRITE_FRAMES[currentDirection][currentFrame];
    
    return {
      backgroundImage: `url(${frameUrl})`,
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    };
  }
  
  /**
   * Start the walking animation
   */
  function startAnimation() {
    if (isMoving) return; // Already moving
    
    isMoving = true;
    currentFrame = 0;
    
    // Set up animation loop
    animationTimer = setInterval(() => {
      currentFrame = (currentFrame + 1) % FRAMES_PER_DIRECTION;
      console.log('[PLAYER SPRITE] Animation frame updated:', currentFrame);
    }, ANIMATION_SPEED);
  }
  
  /**
   * Stop the walking animation
   */
  function stopAnimation() {
    if (!isMoving) return; // Already stopped
    
    isMoving = false;
    clearInterval(animationTimer);
    currentFrame = 0; // Reset to standing frame
    
    // Important: Apply this frame update to make the change visible
    console.log('[PLAYER SPRITE] Animation stopped, reset to frame 0');
  }
  
  /**
   * Set the direction of the character
   */
  function setDirection(direction) {
    if (!['up', 'down', 'left', 'right'].includes(direction)) {
      console.error('[PLAYER SPRITE] Invalid direction:', direction);
      return;
    }
    
    currentDirection = direction;
  }
  
  /**
   * Apply the current frame to a DOM element
   */
  function applyToElement(element) {
    if (!element) {
      console.error('[PLAYER SPRITE] No element provided to apply sprite');
      return;
    }
    
    const frameCSS = getCurrentFrameCSS();
    
    element.style.backgroundImage = frameCSS.backgroundImage;
    element.style.backgroundPosition = frameCSS.backgroundPosition;
    element.style.backgroundSize = frameCSS.backgroundSize;
    element.style.backgroundRepeat = frameCSS.backgroundRepeat;
    
    // Set appropriate element size to fit the sprite
    element.style.width = '64px';
    element.style.height = '64px';
    
    // Add additional styling for pixel art
    element.style.imageRendering = 'pixelated';
    
    // Set player sprite z-index to be above the map
    element.style.zIndex = '10';
    
    console.log(`[PLAYER SPRITE] Applied ${currentDirection} frame ${currentFrame} to element`);
  }
  
  /**
   * Update animation frame - can be called from a game loop for smoother animation
   */
  function updateAnimationFrame() {
    if (isMoving) {
      // Manually update the frame without waiting for the interval
      currentFrame = (currentFrame + 1) % FRAMES_PER_DIRECTION;
      console.log('[PLAYER SPRITE] Manual frame update:', currentFrame);
      return true;
    }
    return false;
  }
  
  /**
   * Check if at least one image is loaded for each direction
   */
  function isLoaded() {
    // We only need one image for each direction to be loaded to start
    for (const direction in SPRITE_FRAMES) {
      // Check if at least the first frame is loaded
      if (!imagesLoaded[SPRITE_FRAMES[direction][0]]) {
        return false;
      }
    }
    return true;
  }

  // Public API
  return {
    init,
    setDirection,
    startAnimation,
    stopAnimation,
    applyToElement,
    updateAnimationFrame,
    isLoaded
  };
})();

// Initialize the sprite manager when script loads
PlayerSpriteManager.init();