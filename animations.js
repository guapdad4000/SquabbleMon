// Animation state management
const ANIMATION_STATE = {
  player: {
    default: "float 2s ease-in-out infinite",
    attack: "attack 1s ease-in-out",
    shake: "player-shake-animation 0.5s ease-in-out",
    current: "float 2s ease-in-out infinite"
  },
  opponent: {
    default: "float 2s ease-in-out infinite", // Will be flipped with transform
    attack: "attack 1s ease-in-out",
    shake: "shake-animation 0.5s ease-in-out",
    current: "float 2s ease-in-out infinite"
  }
};

// Player animation helper function
function setPlayerAnimation(animationType) {
  const playerSprite = document.getElementById("player-sprite");
  if (!playerSprite) return;
  
  const animation = ANIMATION_STATE.player[animationType] || ANIMATION_STATE.player.default;
  playerSprite.style.animation = animation;
  ANIMATION_STATE.player.current = animation;
}

// Opponent animation helper function
function setOpponentAnimation(animationType) {
  const opponentSprite = document.getElementById("opponent-sprite");
  if (!opponentSprite) return;
  
  const animation = ANIMATION_STATE.opponent[animationType] || ANIMATION_STATE.opponent.default;
  opponentSprite.style.animation = animation;
  ANIMATION_STATE.opponent.current = animation;
  
  // Ensure the opponent is always flipped
  opponentSprite.style.transform = "scaleX(-1)";
}

// Function to reset both animations to default state
function resetAnimations() {
  setPlayerAnimation("default");
  setOpponentAnimation("default");
}