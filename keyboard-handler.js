/**
 * Global keyboard handler to solve interaction issues in the overworld.
 * This file provides an alternative keyboard handling that catches keypress events
 * at the document level, bypassing any potential event handling issues.
 */

// Store the last key press time to prevent too-rapid keypresses
let lastKeyPressTime = 0;
const KEY_COOLDOWN = 150; // milliseconds between key presses

// Simple debug flag to enable/disable logging
const DEBUG = true;

// Simple logger function that can be easily enabled/disabled
function log(message, ...args) {
  if (DEBUG) {
    console.log(`[KEYBOARD] ${message}`, ...args);
  }
}

// Main keyboard handler function
function handleGlobalKeyPress(event) {
  // Get current time for cooldown check
  const now = Date.now();

  // Enforce cooldown between keypresses
  if (now - lastKeyPressTime < KEY_COOLDOWN) {
    return;
  }

  // Store the current time as last keypress time
  lastKeyPressTime = now;

  // Log the key press
  log(`Key pressed: ${event.key}`);

  // Detect what screen is active
  const isOnOverworld =
    document.getElementById("overworld-container") &&
    window.getComputedStyle(document.getElementById("overworld-container"))
      .display !== "none";

  const isInBattle =
    document.getElementById("battle-screen") &&
    window.getComputedStyle(document.getElementById("battle-screen"))
      .display !== "none";

  // Handle overworld controls
  if (isOnOverworld) {
    handleOverworldKeyPress(event);
  }
  // Handle battle controls
  else if (isInBattle) {
    // Forward to existing battle key handlers if needed
    log("In battle - delegating to battle system");
  }
  // Handle other screens
  else {
    log("Not in overworld or battle - delegating to default handlers");
  }
}

// Handle overworld-specific keypresses
function handleOverworldKeyPress(event) {
  log(`Handling overworld key: ${event.key}`);

  // Check if dialogue is active
  const dialogueBox = document.getElementById("dialogue-box");
  const isDialogueActive =
    dialogueBox && window.getComputedStyle(dialogueBox).display !== "none";

  // If dialogue is active, only handle dialogue advancement keys
  if (isDialogueActive) {
    log("Dialogue is active");
    if (event.key === " " || event.key === "Enter") {
      log("Advancing dialogue");
      // Call the dialogue advancement function if it exists
      if (typeof window.advanceDialogue === "function") {
        window.advanceDialogue();
      }
    }
    return;
  }

  // Handle movement keys
  switch (event.key) {
    case "ArrowUp":
    case "w":
    case "W":
      log("Moving up");
      if (typeof window.movePlayer === "function") {
        window.movePlayer("up");
      }
      break;

    case "ArrowDown":
    case "s":
    case "S":
      log("Moving down");
      if (typeof window.movePlayer === "function") {
        window.movePlayer("down");
      }
      break;

    case "ArrowLeft":
    case "a":
    case "A":
      log("Moving left");
      if (typeof window.movePlayer === "function") {
        window.movePlayer("left");
      }
      break;

    case "ArrowRight":
    case "d":
    case "D":
      log("Moving right");
      if (typeof window.movePlayer === "function") {
        window.movePlayer("right");
      }
      break;

    case " ":
    case "Enter":
    case "e":
    case "E":
      log("Interaction key pressed");
      if (typeof window.interactWithFacingTile === "function") {
        window.interactWithFacingTile();
      }
      break;

    case "Escape":
    case "b":
    case "B":
      log("Cancel key pressed");
      // Handle cancellation if needed
      break;
  }
}

// Function to initialize the global keyboard handler
function initializeKeyboardHandler() {
  log("Initializing global keyboard handler");

  // Remove any existing handlers with the same function (avoid duplicates)
  document.removeEventListener("keydown", handleGlobalKeyPress);

  // Add the handler
  document.addEventListener("keydown", handleGlobalKeyPress);

  log("Global keyboard handler initialized");
}

// Initialize the handler immediately
document.addEventListener("DOMContentLoaded", initializeKeyboardHandler);

// Also expose the handler globally for manual initialization
window.initializeKeyboardHandler = initializeKeyboardHandler;

// Expose necessary functions for direct calling from the browser console (for debugging)
window.handleGlobalKeyPress = handleGlobalKeyPress;
window.handleOverworldKeyPress = handleOverworldKeyPress;

// Make sure movePlayer and interactWithFacingTile are accessible globally
function exposeRequiredFunctions() {
  // If these functions aren't already global, try to find and expose them
  if (
    typeof window.movePlayer !== "function" &&
    typeof movePlayer === "function"
  ) {
    window.movePlayer = movePlayer;
  }

  if (
    typeof window.interactWithFacingTile !== "function" &&
    typeof interactWithFacingTile === "function"
  ) {
    window.interactWithFacingTile = interactWithFacingTile;
  }

  if (
    typeof window.advanceDialogue !== "function" &&
    typeof advanceDialogue === "function"
  ) {
    window.advanceDialogue = advanceDialogue;
  }

  log("Required functions exposed to window object");
}

// Attempt to expose functions once DOM is loaded
document.addEventListener("DOMContentLoaded", exposeRequiredFunctions);

// Also expose the function itself for manual calling
window.exposeRequiredFunctions = exposeRequiredFunctions;
