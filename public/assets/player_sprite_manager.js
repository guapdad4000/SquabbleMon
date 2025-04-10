/**
 * Player Sprite Manager
 * Handles player sprite animations from the main sprite sheet
 */

const PlayerSpriteManager = (function() {
  // Sprite sheet configuration - use our sprite sheet from attached assets 
  const SPRITE_SHEET_URL = '/attached_assets/main sprite sheet.png';
  
  // Sprite frame configuration - updated based on the actual sprite sheet
  // The first row (0) is down/front, second row (1) is left, third row (2) is right
  const SPRITE_FRAMES = {
    down: [
      { x: 0, y: 0 },   // First row, first frame
      { x: 1, y: 0 },   // First row, second frame
      { x: 2, y: 0 }    // First row, third frame
    ],
    left: [
      { x: 0, y: 1 },   // Second row, first frame
      { x: 1, y: 1 },   // Second row, second frame 
      { x: 2, y: 1 }    // Second row, third frame
    ],
    right: [
      { x: 0, y: 2 },   // Third row, first frame
      { x: 1, y: 2 },   // Third row, second frame
      { x: 2, y: 2 }    // Third row, third frame
    ],
    up: [
      { x: 0, y: 0 },   // Using down frames for up (temporary)
      { x: 1, y: 0 },   // Using down frames for up (temporary)
      { x: 2, y: 0 }    // Using down frames for up (temporary)
    ]
  };
  
  // Sprite frame size (pixels) - adjusted based on the actual dimensions of the sprite sheet
  const FRAME_WIDTH = 48;
  const FRAME_HEIGHT = 56;
  
  // Number of frames per direction
  const FRAMES_PER_DIRECTION = 3;
  
  // Animation timing
  const ANIMATION_SPEED = 200; // ms per frame - slightly slower for better visibility
  
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
        backgroundSize: `${FRAME_WIDTH * 3}px ${FRAME_HEIGHT * 3}px` // Updated to match sprite sheet (3x3 grid)
      };
    }
    
    // Get the current frame based on direction
    const frame = SPRITE_FRAMES[currentDirection][currentFrame];
    
    // Calculate pixel positions
    const posX = frame.x * FRAME_WIDTH;
    const posY = frame.y * FRAME_HEIGHT;
    
    return {
      backgroundImage: `url(${SPRITE_SHEET_URL})`,
      backgroundPosition: `-${posX}px -${posY}px`,
      backgroundSize: `${FRAME_WIDTH * 3}px ${FRAME_HEIGHT * 3}px` // Updated to match sprite sheet (3x3 grid)
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