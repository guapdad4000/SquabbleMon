/**
 * This is an emergency fix for the overworld controls
 * It bypasses the regular control system and implements direct keyboard controls
 * with minimal dependencies on the existing code
 */

(function () {
  // Constants for game tiles
  const TILE_TYPES = {
    WALKABLE: 0,
    BLOCK: 1,
    GRASS: 2,
    TRAP_ZONE: 3,
    DOOR: 4,
    NPC: 5,
  };

  // Movement cooldown to prevent too rapid movement
  const MOVE_COOLDOWN = 150; // milliseconds
  let lastMoveTime = 0;

  // Debug mode for logging
  const DEBUG = true;
  const log = (message, ...args) => {
    if (DEBUG) {
      console.log(`[FIX] ${message}`, ...args);
    }
  };

  // Get access to the game's player object and maps
  let player = null;
  let currentMap = null;
  let currentNpcs = null;
  let currentDoors = null;
  let dialogueBox = null;
  let characterSprite = null;
  let npcs = [];

  // Function to initialize the fix
  function initFix() {
    log("Initializing emergency controls fix");

    // Try to grab references from the game
    try {
      // Get player reference from window or global scope
      if (window.player) {
        player = window.player;
        log("Found player object in window scope");
      } else if (typeof player !== "undefined") {
        log("Using existing player variable");
      } else {
        log("WARNING: No player object found!");
      }

      // Same for currentMap
      if (window.currentMap) {
        currentMap = window.currentMap;
        log("Found currentMap in window scope");
      } else if (typeof currentMap !== "undefined") {
        log("Using existing currentMap variable");
      } else {
        log("WARNING: No currentMap found!");
      }

      // Get NPCs
      if (window.currentNpcs) {
        currentNpcs = window.currentNpcs;
        log("Found currentNpcs in window scope");
      } else if (typeof currentNpcs !== "undefined") {
        log("Using existing currentNpcs variable");
      }

      // Get doors
      if (window.currentDoors) {
        currentDoors = window.currentDoors;
        log("Found currentDoors in window scope");
      } else if (typeof currentDoors !== "undefined") {
        log("Using existing currentDoors variable");
      }

      // Get dialog box
      dialogueBox = document.getElementById("dialogue-box");
      if (dialogueBox) {
        log("Found dialogue box element");
      }

      // Get player sprite element
      characterSprite = document.querySelector(
        "#overworld-canvas .player-sprite",
      );
      if (characterSprite) {
        log("Found player sprite element");
      }

      // Get NPCs elements
      npcs = Array.from(document.querySelectorAll(".npc-sprite"));
      if (npcs.length > 0) {
        log(`Found ${npcs.length} NPC elements`);
      }

      // Set up keydown event listener
      setupKeyboardControls();

      // Set up click handlers for player and NPCs
      setupClickHandlers();

      log("Emergency controls fix initialized successfully");
    } catch (error) {
      console.error("Error initializing emergency controls fix:", error);
    }
  }

  // Set up keyboard controls
  function setupKeyboardControls() {
    log("Setting up emergency keyboard controls");

    // Remove any existing handlers using the same name
    document.removeEventListener("keydown", handleEmergencyKeydown);

    // Add event listener for keydown
    document.addEventListener("keydown", handleEmergencyKeydown);

    log("Emergency keyboard controls set up");
  }

  // Handle keydown events
  function handleEmergencyKeydown(event) {
    try {
      // Log the keypress
      log(`Key pressed: ${event.key}`);

      // Get current time for cooldown check
      const now = Date.now();

      // Check if we're in a dialogue
      const isInDialogue =
        dialogueBox && window.getComputedStyle(dialogueBox).display !== "none";

      // Handle dialogue advancement
      if (isInDialogue && (event.key === " " || event.key === "Enter")) {
        log("Advancing dialogue");
        advanceDialogueEmergency();
        return;
      }

      // Only handle movement if not in dialogue
      if (!isInDialogue) {
        // Apply cooldown to prevent too rapid movement
        if (now - lastMoveTime < MOVE_COOLDOWN) {
          return;
        }

        // Update last move time
        lastMoveTime = now;

        // Handle movement keys
        switch (event.key) {
          case "ArrowUp":
          case "w":
          case "W":
            log("Moving up");
            movePlayerEmergency("up");
            break;
          case "ArrowDown":
          case "s":
          case "S":
            log("Moving down");
            movePlayerEmergency("down");
            break;
          case "ArrowLeft":
          case "a":
          case "A":
            log("Moving left");
            movePlayerEmergency("left");
            break;
          case "ArrowRight":
          case "d":
          case "D":
            log("Moving right");
            movePlayerEmergency("right");
            break;
          case " ":
          case "Enter":
          case "e":
          case "E":
            log("Interaction key pressed");
            interactWithFacingTileEmergency();
            break;
        }
      }
    } catch (error) {
      console.error("Error handling emergency keydown:", error);
    }
  }

  // Move player in the specified direction
  function movePlayerEmergency(direction) {
    try {
      if (!player || !currentMap) {
        log("Cannot move player: missing player object or currentMap");
        return;
      }

      // Store the old position for reverting if needed
      const oldX = player.x;
      const oldY = player.y;

      // Set the player's direction
      player.direction = direction;

      // Calculate the new position
      let newX = oldX;
      let newY = oldY;

      switch (direction) {
        case "up":
          newY--;
          break;
        case "down":
          newY++;
          break;
        case "left":
          newX--;
          break;
        case "right":
          newX++;
          break;
      }

      // Check if the new position is valid
      if (
        newY >= 0 &&
        newY < currentMap.length &&
        newX >= 0 &&
        newX < currentMap[0].length
      ) {
        // Check if the new position is walkable
        const tileType = currentMap[newY][newX];

        // Check if there's an NPC at the new position
        const npcAtPosition =
          currentNpcs &&
          currentNpcs.some((npc) => npc.x === newX && npc.y === newY);

        if (tileType === TILE_TYPES.WALKABLE && !npcAtPosition) {
          // Move the player
          player.x = newX;
          player.y = newY;

          // Update player position visually
          updatePlayerPositionVisual();

          // Check for random encounters in grass
          if (tileType === TILE_TYPES.GRASS) {
            const encounterChance = Math.random();
            if (encounterChance < 0.1) {
              // 10% chance
              triggerRandomEncounterEmergency();
            }
          }

          // Check for trap zone encounters
          if (tileType === TILE_TYPES.TRAP_ZONE) {
            const trapChance = Math.random();
            if (trapChance < 0.2) {
              // 20% chance
              triggerRandomEncounterEmergency("trap");
            }
          }
        }
      }
    } catch (error) {
      console.error("Error moving player:", error);
    }
  }

  // Update the player's position visually
  function updatePlayerPositionVisual() {
    try {
      if (!player || !characterSprite) {
        log(
          "Cannot update player position visually: missing player object or characterSprite",
        );
        return;
      }

      // Position the player sprite
      characterSprite.style.transform = `translate(${player.x * 32}px, ${player.y * 32}px)`;

      // Update sprite based on direction
      const spriteBase = "public/sprites/";
      let spriteImage = "";

      switch (player.direction) {
        case "up":
          spriteImage = spriteBase + "back 1.png";
          break;
        case "down":
          spriteImage = spriteBase + "fwd 1.png";
          break;
        case "left":
          spriteImage = spriteBase + "left 1.png";
          break;
        case "right":
          spriteImage = spriteBase + "right 1.png";
          break;
      }

      // Update sprite image
      if (spriteImage && characterSprite) {
        characterSprite.src = spriteImage;
      }

      log(
        `Updated player position visual to (${player.x}, ${player.y}) facing ${player.direction}`,
      );
    } catch (error) {
      console.error("Error updating player position visual:", error);
    }
  }

  // Get the tile in front of the player
  function getTileFacingPlayerEmergency() {
    try {
      if (!player || !currentMap) {
        log("Cannot get facing tile: missing player object or currentMap");
        return null;
      }

      // Calculate the coordinates of the facing tile
      let facingX = player.x;
      let facingY = player.y;

      switch (player.direction) {
        case "up":
          facingY--;
          break;
        case "down":
          facingY++;
          break;
        case "left":
          facingX--;
          break;
        case "right":
          facingX++;
          break;
      }

      // Check if the coordinates are valid
      if (
        facingY >= 0 &&
        facingY < currentMap.length &&
        facingX >= 0 &&
        facingX < currentMap[0].length
      ) {
        return {
          x: facingX,
          y: facingY,
          type: currentMap[facingY][facingX],
        };
      }

      return null;
    } catch (error) {
      console.error("Error getting facing tile:", error);
      return null;
    }
  }

  // Interact with the tile in front of the player
  function interactWithFacingTileEmergency() {
    try {
      // Get the facing tile
      const facingTile = getTileFacingPlayerEmergency();

      if (!facingTile) {
        log("No valid tile to interact with");
        return;
      }

      log(
        `Interacting with tile at (${facingTile.x}, ${facingTile.y}) of type ${facingTile.type}`,
      );

      // Check for NPC
      if (currentNpcs) {
        const npcAtTile = currentNpcs.find(
          (npc) => npc.x === facingTile.x && npc.y === facingTile.y,
        );

        if (npcAtTile) {
          log(`Found NPC at tile: ${npcAtTile.name}`);
          startDialogueEmergency(npcAtTile);
          return;
        }
      }

      // Check for door
      if (facingTile.type === TILE_TYPES.DOOR && currentDoors) {
        const doorAtTile = currentDoors.find(
          (door) => door.x === facingTile.x && door.y === facingTile.y,
        );

        if (doorAtTile) {
          log(`Found door at tile leading to ${doorAtTile.leadsTo}`);
          changeZoneEmergency(
            doorAtTile.leadsTo,
            doorAtTile.entranceX,
            doorAtTile.entranceY,
          );
          return;
        }
      }

      log("No interactive object found at facing tile");
    } catch (error) {
      console.error("Error interacting with facing tile:", error);
    }
  }

  // Start dialogue with an NPC
  function startDialogueEmergency(npc) {
    try {
      if (!dialogueBox) {
        log("Cannot start dialogue: missing dialogueBox element");
        return;
      }

      log(`Starting dialogue with ${npc.name}`);

      // Set current dialogue reference (on both window and local scope)
      window.currentDialogue = npc;
      window.currentDialogueLine = 0;

      // Update name element
      const nameElement =
        document.getElementById("dialogue-name") ||
        document.getElementById("npc-name");
      if (nameElement) {
        nameElement.textContent = npc.name;
      }

      // Update text element
      const textElement = document.getElementById("dialogue-text");
      if (textElement && npc.lines && npc.lines.length > 0) {
        textElement.textContent = npc.lines[0];
      }

      // Show the dialogue box
      dialogueBox.style.display = "block";

      // Try to play sound effect
      if (typeof window.playSwitchSound === "function") {
        window.playSwitchSound();
      }
    } catch (error) {
      console.error("Error starting dialogue:", error);
    }
  }

  // Advance to the next line of dialogue
  function advanceDialogueEmergency() {
    try {
      // Check if we have active dialogue
      if (
        !window.currentDialogue ||
        typeof window.currentDialogueLine === "undefined"
      ) {
        log("No active dialogue to advance");
        return;
      }

      // Increment the dialogue line
      window.currentDialogueLine++;

      // Check if we've reached the end of the dialogue
      if (window.currentDialogueLine >= window.currentDialogue.lines.length) {
        // End dialogue
        if (dialogueBox) {
          dialogueBox.style.display = "none";
        }

        // Check for battle trigger
        if (window.currentDialogue.triggersBattle) {
          log("Dialogue triggered battle");
          if (typeof window.startNpcBattle === "function") {
            window.startNpcBattle(window.currentDialogue);
          }
        }

        // Check for shop opening
        if (
          window.currentDialogue.opensShop &&
          typeof window.openShop === "function"
        ) {
          log("Dialogue opened shop");
          if (window.gameShops && window.currentDialogue.shopType) {
            window.openShop(window.gameShops[window.currentDialogue.shopType]);
          }
        }

        // Clear dialogue reference
        window.currentDialogue = null;
        window.currentDialogueLine = 0;

        return;
      }

      // Show the next line of dialogue
      const textElement = document.getElementById("dialogue-text");
      if (textElement) {
        textElement.textContent =
          window.currentDialogue.lines[window.currentDialogueLine];
      }

      // Try to play sound effect
      if (typeof window.playSwitchSound === "function") {
        window.playSwitchSound();
      }
    } catch (error) {
      console.error("Error advancing dialogue:", error);
    }
  }

  // Change zone
  function changeZoneEmergency(zoneName, entranceX, entranceY) {
    try {
      log(`Changing zone to ${zoneName} at (${entranceX}, ${entranceY})`);

      // Try to use the game's change zone function
      if (typeof window.changeZone === "function") {
        window.changeZone(zoneName, entranceX, entranceY);
      } else {
        log("Game's changeZone function not found");
      }
    } catch (error) {
      console.error("Error changing zone:", error);
    }
  }

  // Trigger a random encounter
  function triggerRandomEncounterEmergency(zoneType = "normal") {
    try {
      log(`Triggering random encounter in ${zoneType} zone`);

      // Try to use the game's triggerRandomEncounter function
      if (typeof window.triggerRandomEncounter === "function") {
        window.triggerRandomEncounter();
      } else {
        log("Game's triggerRandomEncounter function not found");
      }
    } catch (error) {
      console.error("Error triggering random encounter:", error);
    }
  }

  // Set up click handlers for player and NPCs
  function setupClickHandlers() {
    try {
      log("Setting up emergency click handlers");

      // Add click handler to player sprite
      if (characterSprite) {
        characterSprite.style.cursor = "pointer";
        characterSprite.addEventListener("click", function () {
          log("Player clicked");
        });
      }

      // Add click handlers to NPC sprites
      npcs.forEach((npcElement) => {
        if (npcElement) {
          npcElement.style.cursor = "pointer";
          npcElement.addEventListener("click", function () {
            log("NPC clicked");

            // Find the NPC data
            if (currentNpcs) {
              // Get position from transform
              const transform = npcElement.style.transform;
              const match = transform.match(/translate\((\d+)px, (\d+)px\)/);
              if (match) {
                const x = parseInt(match[1]) / 32;
                const y = parseInt(match[2]) / 32;

                // Find NPC at this position
                const npcData = currentNpcs.find(
                  (npc) => npc.x === x && npc.y === y,
                );
                if (npcData) {
                  log(`Found NPC ${npcData.name} at (${x}, ${y})`);
                  startDialogueEmergency(npcData);
                }
              }
            }
          });
        }
      });

      log("Emergency click handlers set up");
    } catch (error) {
      console.error("Error setting up click handlers:", error);
    }
  }

  // Initialize the fix when the DOM is loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFix);
  } else {
    initFix();
  }

  // Export functions for global use
  window.emergencyControls = {
    initFix,
    setupKeyboardControls,
    movePlayerEmergency,
    interactWithFacingTileEmergency,
    startDialogueEmergency,
    advanceDialogueEmergency,
  };
})();
