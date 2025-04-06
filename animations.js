// Animation state management
const ANIMATION_STATE = {
  player: {
    default: "float 3s ease-in-out infinite 0.5px", // Slower and smaller float
    attack: "attack 0.6s ease-in-out", // Faster attack animation
    shake: "player-shake-animation 0.5s ease-in-out",
    current: "float 3s ease-in-out infinite 0.5px"
  },
  opponent: {
    default: "float 3s ease-in-out infinite 0.5px", // Will be flipped with transform
    attack: "attack 0.6s ease-in-out", // Faster attack animation
    shake: "shake-animation 0.5s ease-in-out",
    current: "float 3s ease-in-out infinite 0.5px"
  }
};

// Player animation helper function
function setPlayerAnimation(animationType) {
  try {
    const playerSprite = document.getElementById("player-sprite");
    if (!playerSprite) {
      console.log("Player sprite element not found");
      return;
    }
    
    const animation = ANIMATION_STATE.player[animationType] || ANIMATION_STATE.player.default;
    playerSprite.style.animation = animation;
    ANIMATION_STATE.player.current = animation;
  } catch (error) {
    console.error("Error in setPlayerAnimation:", error);
  }
}

// Opponent animation helper function
function setOpponentAnimation(animationType) {
  try {
    const opponentSprite = document.getElementById("opponent-sprite");
    if (!opponentSprite) {
      console.log("Opponent sprite element not found");
      return;
    }
    
    const animation = ANIMATION_STATE.opponent[animationType] || ANIMATION_STATE.opponent.default;
    opponentSprite.style.animation = animation;
    ANIMATION_STATE.opponent.current = animation;
    
    // Ensure the opponent is always flipped
    opponentSprite.style.transform = "scaleX(-1)";
  } catch (error) {
    console.error("Error in setOpponentAnimation:", error);
  }
}

// Function to reset both animations to default state
function resetAnimations() {
  setPlayerAnimation("default");
  setOpponentAnimation("default");
}