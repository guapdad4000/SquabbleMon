/**
 * Player Sprite Manager
 * Handles player sprite animations from the main sprite sheet
 * Fixed version that correctly handles the sprite sheet structure
 */

const PlayerSpriteManager = (function() {
  // Sprite sheet configuration - use the local sprite sheet from attached assets
  const SPRITE_SHEET_URL = './attached_assets/main sprite sheet.png';
  
  // Total dimensions of the sprite sheet
  const SPRITE_SHEET_WIDTH = 144;  // 3 columns x 48px width
  const SPRITE_SHEET_HEIGHT = 168; // 3 rows x 56px height
  
  // Simplified sprite configuration with absolute pixel positions
  // This avoids issues with fractional calculations
  const SPRITE_FRAMES = {
    down: [
      { x: 0, y: 0 },      // Down, first frame (top-left corner)
      { x: 48, y: 0 },     // Down, second frame
      { x: 96, y: 0 }      // Down, third frame
    ],
    left: [
      { x: 0, y: 56 },     // Left, first frame
      { x: 48, y: 56 },    // Left, second frame 
      { x: 96, y: 56 }     // Left, third frame
    ],
    right: [
      { x: 0, y: 112 },    // Right, first frame
      { x: 48, y: 112 },   // Right, second frame
      { x: 96, y: 112 }    // Right, third frame
    ],
    up: [
      { x: 0, y: 0 },      // Using down frames for up (temporary)
      { x: 48, y: 0 },     // Using down frames for up (temporary)
      { x: 96, y: 0 }      // Using down frames for up (temporary)
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
  
  // Check if sprite sheet is loaded
  let spriteSheetLoaded = false;
  
  /**
   * Initialize the sprite manager
   */
  function init() {
    console.log('[PLAYER SPRITE] Initializing player sprite manager');
    
    // Preload the sprite sheet
    const img = new Image();
    img.onload = function() {
      console.log('[PLAYER SPRITE] Sprite sheet loaded successfully');
      spriteSheetLoaded = true;
    };
    img.onerror = function() {
      console.error('[PLAYER SPRITE] Failed to load sprite sheet:', SPRITE_SHEET_URL);
    };
    img.src = SPRITE_SHEET_URL;
  }
  
  /**
   * Get the current sprite frame CSS
   */
  function getCurrentFrameCSS() {
    if (!spriteSheetLoaded) {
      // Return a default frame position if sprite sheet isn't loaded yet
      return {
        backgroundImage: `url(${SPRITE_SHEET_URL})`,
        backgroundPosition: '0px 0px',
        backgroundSize: `${SPRITE_SHEET_WIDTH}px ${SPRITE_SHEET_HEIGHT}px` // Using total sprite sheet dimensions
      };
    }
    
    // Get the current frame based on direction
    const frame = SPRITE_FRAMES[currentDirection][currentFrame];
    
    // Use absolute pixel positions from our frame data
    const posX = frame.x;
    const posY = frame.y;
    
    return {
      backgroundImage: `url(${SPRITE_SHEET_URL})`,
      backgroundPosition: `-${posX}px -${posY}px`,
      backgroundSize: `${SPRITE_SHEET_WIDTH}px ${SPRITE_SHEET_HEIGHT}px` // Using total sprite sheet dimensions
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
    element.style.backgroundRepeat = 'no-repeat';
    
    // Set appropriate element size to fit the sprite
    element.style.width = '48px';
    element.style.height = '56px';
    
    // Add additional styling for pixel art
    element.style.imageRendering = 'pixelated';
    
    // Set player sprite z-index to be above the map
    element.style.zIndex = '10';
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
  
  // Public API
  return {
    init,
    setDirection,
    startAnimation,
    stopAnimation,
    applyToElement,
    updateAnimationFrame,
    isLoaded: () => spriteSheetLoaded
  };
})();

// Initialize the sprite manager when script loads
PlayerSpriteManager.init();