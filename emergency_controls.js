/**
 * EMERGENCY CONTROLS - Last resort fix for exploration mode
 * This is a self-contained module that implements basic movement
 * without dependencies on the existing game code.
 */

(function () {
  // Debug logging
  const DEBUG = true;
  const log = (msg) => DEBUG && console.log(`[EMERGENCY] ${msg}`);

  // Keep track of key state (pressed or not)
  const keyState = {
    up: false,
    down: false,
    left: false,
    right: false,
    action: false,
  };

  // Movement speed
  const MOVE_SPEED = 5; // pixels per frame

  // Reference to player element
  let playerElement = null;
  let playerX = 0;
  let playerY = 0;
  let playerDirection = "down";

  // Game world boundaries
  const worldBounds = {
    left: 0,
    top: 0,
    right: window.innerWidth - 64, // player width
    bottom: window.innerHeight - 64, // player height
  };

  // Map obstacle positions (to be detected from the DOM)
  const obstacles = [];

  // Initialize the emergency controls
  function init() {
    log("Initializing emergency controls");

    try {
      // Find player element
      playerElement =
        document.querySelector(".player-sprite") ||
        document.querySelector("#player-sprite");

      if (!playerElement) {
        playerElement = document.createElement("div");
        playerElement.id = "emergency-player";
        playerElement.style.position = "absolute";
        playerElement.style.width = "64px";
        playerElement.style.height = "64px";
        playerElement.style.backgroundColor = "red";
        playerElement.style.zIndex = "1000";
        document.body.appendChild(playerElement);
      }

      // Get initial position
      playerX = parseInt(playerElement.style.left) || window.innerWidth / 2;
      playerY = parseInt(playerElement.style.top) || window.innerHeight / 2;

      // Initialize player position
      updatePlayerPosition();

      // Set up event listeners
      setupKeyboardListeners();

      // Set up game loop for smooth movement
      startGameLoop();

      log("Emergency controls initialized");
    } catch (err) {
      console.error("Error initializing emergency controls:", err);
    }
  }

  // Set up keyboard listeners
  function setupKeyboardListeners() {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    log("Keyboard listeners added");
  }

  // Handle key down events
  function handleKeyDown(event) {
    switch (event.key) {
      case "ArrowUp":
      case "w":
      case "W":
        keyState.up = true;
        playerDirection = "up";
        break;
      case "ArrowDown":
      case "s":
      case "S":
        keyState.down = true;
        playerDirection = "down";
        break;
      case "ArrowLeft":
      case "a":
      case "A":
        keyState.left = true;
        playerDirection = "left";
        break;
      case "ArrowRight":
      case "d":
      case "D":
        keyState.right = true;
        playerDirection = "right";
        break;
      case " ":
      case "Enter":
      case "e":
      case "E":
        keyState.action = true;
        interact();
        break;
    }

    // Update player sprite based on direction
    updatePlayerSprite();
  }

  // Handle key up events
  function handleKeyUp(event) {
    switch (event.key) {
      case "ArrowUp":
      case "w":
      case "W":
        keyState.up = false;
        break;
      case "ArrowDown":
      case "s":
      case "S":
        keyState.down = false;
        break;
      case "ArrowLeft":
      case "a":
      case "A":
        keyState.left = false;
        break;
      case "ArrowRight":
      case "d":
      case "D":
        keyState.right = false;
        break;
      case " ":
      case "Enter":
      case "e":
      case "E":
        keyState.action = false;
        break;
    }
  }

  // Game loop for smooth movement
  function startGameLoop() {
    function loop() {
      updateMovement();
      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
    log("Game loop started");
  }

  // Update player movement based on key state
  function updateMovement() {
    let moved = false;
    let newX = playerX;
    let newY = playerY;

    // Calculate new position
    if (keyState.up) {
      newY -= MOVE_SPEED;
      moved = true;
    }
    if (keyState.down) {
      newY += MOVE_SPEED;
      moved = true;
    }
    if (keyState.left) {
      newX -= MOVE_SPEED;
      moved = true;
    }
    if (keyState.right) {
      newX += MOVE_SPEED;
      moved = true;
    }

    // Check boundaries
    newX = Math.max(worldBounds.left, Math.min(newX, worldBounds.right));
    newY = Math.max(worldBounds.top, Math.min(newY, worldBounds.bottom));

    // Check collision with obstacles
    if (!isColliding(newX, newY)) {
      playerX = newX;
      playerY = newY;
      updatePlayerPosition();
    }
  }

  // Check if position collides with obstacles
  function isColliding(x, y) {
    for (const obstacle of obstacles) {
      if (
        x < obstacle.right &&
        x + 64 > obstacle.left &&
        y < obstacle.bottom &&
        y + 64 > obstacle.top
      ) {
        return true;
      }
    }
    return false;
  }

  // Update player element position
  function updatePlayerPosition() {
    if (playerElement) {
      playerElement.style.left = `${playerX}px`;
      playerElement.style.top = `${playerY}px`;
    }

    // Try to update original game state
    try {
      // Attempt to update the game's internal coordinates
      if (window.player) {
        const tileX = Math.floor(playerX / 64);
        const tileY = Math.floor(playerY / 64);
        window.player.x = tileX;
        window.player.y = tileY;
      }
    } catch (err) {
      // Ignore errors when updating game state
    }
  }

  // Update player sprite based on direction
  function updatePlayerSprite() {
    if (!playerElement) return;

    // Try using the sprite manager if available
    if (
      window.SpriteManager &&
      typeof window.SpriteManager.updatePlayerSprite === "function"
    ) {
      try {
        window.SpriteManager.updatePlayerSprite(
          playerElement,
          playerDirection,
          true,
        );
        return;
      } catch (err) {
        // Fall back to simple method if sprite manager fails
      }
    }

    // Simple fallback sprite update method
    let spriteUrl;
    switch (playerDirection) {
      case "up":
        spriteUrl = "public/sprites/back 1.png";
        break;
      case "down":
        spriteUrl = "public/sprites/fwd 1.png";
        break;
      case "left":
        spriteUrl = "public/sprites/left 1.png";
        break;
      case "right":
        spriteUrl = "public/sprites/right 1.png";
        break;
    }

    if (spriteUrl) {
      // First check if there's an image element
      let imageElement = playerElement.querySelector("img");

      if (imageElement) {
        imageElement.src = spriteUrl;
      } else {
        // Create one if it doesn't exist
        imageElement = document.createElement("img");
        imageElement.src = spriteUrl;
        imageElement.style.width = "100%";
        imageElement.style.height = "100%";

        // Clear any existing content and add image
        playerElement.innerHTML = "";
        playerElement.appendChild(imageElement);
      }
    }
  }

  // Handle interaction with the world
  function interact() {
    log(`Interaction triggered in direction: ${playerDirection}`);

    // Find the facing tile coordinates
    let tileX = Math.floor(playerX / 64);
    let tileY = Math.floor(playerY / 64);

    // Adjust based on facing direction
    switch (playerDirection) {
      case "up":
        tileY--;
        break;
      case "down":
        tileY++;
        break;
      case "left":
        tileX--;
        break;
      case "right":
        tileX++;
        break;
    }

    // Find any NPCs at this position
    const npcs = document.querySelectorAll(".npc-sprite");
    for (const npc of npcs) {
      const npcX = parseInt(npc.style.left) / 64;
      const npcY = parseInt(npc.style.top) / 64;

      if (npcX === tileX && npcY === tileY) {
        log(`Found NPC at (${tileX}, ${tileY})`);
        startDialogue(npc);
        return;
      }
    }

    // Try to trigger the game's interaction function if no NPC found
    try {
      if (typeof window.interactWithFacingTile === "function") {
        window.interactWithFacingTile();
      }
    } catch (err) {
      log("No interaction found at this location");
    }
  }

  // Start dialogue with an NPC
  function startDialogue(npcElement) {
    log("Starting dialogue");

    // Try to use game's dialogue function
    try {
      // Get NPC data from element
      const npcId = npcElement.dataset.npcId;

      if (window.currentNpcs && npcId) {
        const npcData = window.currentNpcs.find(
          (npc) => npc.id.toString() === npcId,
        );

        if (npcData && typeof window.startDialogue === "function") {
          window.startDialogue(npcData);
          return;
        }
      }
    } catch (err) {
      // Fall back to simple dialogue
    }

    // Simple fallback dialogue
    const dialogueBox =
      document.getElementById("dialogue-box") || createSimpleDialogueBox();
    dialogueBox.style.display = "block";

    // Get NPC name if possible
    const npcName = npcElement.dataset.npcName || "NPC";

    // Set dialogue content
    const nameElement =
      dialogueBox.querySelector("#dialogue-name") ||
      dialogueBox.querySelector(".dialogue-name");
    if (nameElement) {
      nameElement.textContent = npcName;
    }

    const textElement =
      dialogueBox.querySelector("#dialogue-text") ||
      dialogueBox.querySelector(".dialogue-text");
    if (textElement) {
      textElement.textContent =
        "Hello there! I cannot talk much due to technical difficulties.";
    }
  }

  // Create a simple dialogue box if one doesn't exist
  function createSimpleDialogueBox() {
    const box = document.createElement("div");
    box.id = "emergency-dialogue-box";
    box.style.position = "absolute";
    box.style.bottom = "20px";
    box.style.left = "50%";
    box.style.transform = "translateX(-50%)";
    box.style.width = "80%";
    box.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    box.style.color = "white";
    box.style.padding = "20px";
    box.style.borderRadius = "8px";
    box.style.zIndex = "2000";

    const name = document.createElement("p");
    name.className = "dialogue-name";
    name.style.fontWeight = "bold";
    name.style.marginBottom = "10px";

    const text = document.createElement("p");
    text.className = "dialogue-text";

    const button = document.createElement("button");
    button.textContent = "Close";
    button.style.marginTop = "10px";
    button.style.padding = "5px 10px";
    button.addEventListener("click", () => {
      box.style.display = "none";
    });

    box.appendChild(name);
    box.appendChild(text);
    box.appendChild(button);

    document.body.appendChild(box);
    return box;
  }

  // Detect map obstacles
  function detectObstacles() {
    // Look for elements with 'blocked' class
    const blockedElements = document.querySelectorAll(".blocked");

    obstacles.length = 0; // Clear existing obstacles

    for (const element of blockedElements) {
      const rect = element.getBoundingClientRect();
      obstacles.push({
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
      });
    }

    log(`Detected ${obstacles.length} obstacles`);
  }

  // Initialize when DOM is loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    // DOM already loaded
    init();
  }

  // Export for global access
  window.emergencyControls = {
    init,
    updatePlayerPosition,
    detect: detectObstacles,
    keyState,
  };
})();
