// Animation state management
const ANIMATION_STATE = {
  player: {
    default: "float 3s ease-in-out infinite 0.5px", // Slower and smaller float
    attack: "attack 0.6s ease-in-out", // Faster attack animation
    shake: "player-shake-animation 0.5s ease-in-out",
    hit: "hit-flash 0.4s ease-in-out", // Flash animation when hit
    lunge: "lunge 0.3s ease-in-out", // Lunging forward animation
    glow: "glow 0.5s ease-in-out", // Glowing effect for status moves
    criticalHit: "criticalHit 0.7s ease-out", // Critical hit animation
    heal: "heal 1.5s ease-in-out", // Healing animation
    statusBounce: "statusBounce 0.7s ease-out", // Status effect application
    effectStreet: "effect-street 1.2s ease-in-out", // Street-style effect
    effectHiphop: "effect-hiphop 1.2s ease-in-out", // Hip-hop style effect
    effectUrban: "effect-urban 1.2s ease-in-out", // Urban style effect 
    effectTech: "effect-tech 1.2s ease-in-out", // Tech style effect
    effectStatus: "effect-status 1.2s ease-in-out", // Status effect style
    imposterHit: "imposterHit 1.5s forwards", // Imposter hit effect
    current: "float 3s ease-in-out infinite 0.5px"
  },
  opponent: {
    default: "float 3s ease-in-out infinite 0.5px", // Will be flipped with transform
    attack: "attack 0.6s ease-in-out", // Faster attack animation
    shake: "shake-animation 0.5s ease-in-out",
    hit: "hit-flash 0.4s ease-in-out", // Flash animation when hit
    lungeReverse: "lungeReverse 0.3s ease-in-out", // Reversed lunging animation
    glow: "glow 0.5s ease-in-out", // Glowing effect for status moves
    criticalHit: "criticalHit 0.7s ease-out", // Critical hit animation
    heal: "heal 1.5s ease-in-out", // Healing animation
    statusBounce: "statusBounce 0.7s ease-out", // Status effect application
    effectStreet: "effect-street 1.2s ease-in-out", // Street-style effect
    effectHiphop: "effect-hiphop 1.2s ease-in-out", // Hip-hop style effect
    effectUrban: "effect-urban 1.2s ease-in-out", // Urban style effect
    effectTech: "effect-tech 1.2s ease-in-out", // Tech style effect
    effectStatus: "effect-status 1.2s ease-in-out", // Status effect style
    imposterHit: "imposterHit 1.5s forwards", // Imposter hit effect
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

// Function to apply attack-specific animations based on move type
function applyMoveAnimation(moveType, user) {
  try {
    // Get the right animation based on move type
    let animationType = "attack"; // Default animation
    
    // Map move types to animations
    switch(moveType.toLowerCase()) {
      case "fire":
        animationType = "effectHiphop";
        break;
      case "water":
        animationType = "effectStreet";
        break;
      case "plant":
        animationType = "effectUrban";
        break;
      case "electric":
        animationType = "effectTech";
        break;
      case "dark":
        animationType = "effectStatus";
        break;
      default:
        animationType = "attack";
        break;
    }
    
    // Apply the animation to the correct character
    if (user === "player") {
      setPlayerAnimation(animationType);
    } else {
      setOpponentAnimation(animationType);
    }
    
    // Return to default animation after a delay
    setTimeout(() => {
      if (user === "player") {
        setPlayerAnimation("default");
      } else {
        setOpponentAnimation("default");
      }
    }, 1200); // Match the animation duration
    
  } catch (error) {
    console.error("Error in applyMoveAnimation:", error);
  }
}

// Function to apply status-specific animations
function applyStatusAnimation(statusType, user) {
  try {
    let animationType = "statusBounce"; // Default status animation
    
    // Apply the animation to the correct character
    if (user === "player") {
      setPlayerAnimation(animationType);
    } else {
      setOpponentAnimation(animationType);
    }
    
    // Return to default animation after a delay
    setTimeout(() => {
      if (user === "player") {
        setPlayerAnimation("default");
      } else {
        setOpponentAnimation("default");
      }
    }, 700); // Match the animation duration
    
  } catch (error) {
    console.error("Error in applyStatusAnimation:", error);
  }
}

// Function to apply healing animation
function applyHealAnimation(user) {
  try {
    if (user === "player") {
      setPlayerAnimation("heal");
      setTimeout(() => setPlayerAnimation("default"), 1500);
    } else {
      setOpponentAnimation("heal");
      setTimeout(() => setOpponentAnimation("default"), 1500);
    }
  } catch (error) {
    console.error("Error in applyHealAnimation:", error);
  }
}

// Function to apply critical hit animation
function applyCriticalHitAnimation(user) {
  try {
    if (user === "player") {
      setPlayerAnimation("criticalHit");
      setTimeout(() => setPlayerAnimation("default"), 700);
    } else {
      setOpponentAnimation("criticalHit");
      setTimeout(() => setOpponentAnimation("default"), 700);
    }
  } catch (error) {
    console.error("Error in applyCriticalHitAnimation:", error);
  }
}

// Handle status effect animations in battle
function handleStatusEffectAnimation(effectType, target) {
  try {
    // Map effect type to animation type
    let animationType = "statusBounce";
    
    switch(effectType) {
      case "burn":
      case "bleeding":
        animationType = "effectHiphop";
        break;
      case "paralysis":
        animationType = "effectTech";
        break;
      case "wet":
      case "slimed":
        animationType = "effectStreet";
        break;
      case "sleep":
      case "baked":
        animationType = "effectStatus";
        break;
      case "confused":
      case "dazed":
        animationType = "effectUrban";
        break;
      default:
        animationType = "statusBounce";
    }
    
    // Apply the animation
    if (target === "player") {
      setPlayerAnimation(animationType);
      setTimeout(() => setPlayerAnimation("default"), 1200);
    } else {
      setOpponentAnimation(animationType);
      setTimeout(() => setOpponentAnimation("default"), 1200);
    }
  } catch (error) {
    console.error("Error in handleStatusEffectAnimation:", error);
  }
}

// Function to apply animations specific to move types
function applyMoveAnimation(moveType, user) {
  try {
    // Different animation styles based on move type
    let animationStyle = "";
    
    switch (moveType) {
      case "Street":
        animationStyle = "attackStreet";
        break;
      case "Urban":
        animationStyle = "attackUrban";
        break;
      case "Hiphop":
        animationStyle = "attackHiphop";
        break;
      case "Tech":
        animationStyle = "attackTech";
        break;
      case "Clout":
        animationStyle = "attackClout";
        break;
      case "status":
        animationStyle = "statusBounce";
        break;
      default:
        animationStyle = "attack";
    }
    
    // Apply the animation to the appropriate character
    if (user === "player") {
      setPlayerAnimation(animationStyle);
      // Reset animation after a delay
      setTimeout(() => {
        setPlayerAnimation("default");
      }, 800);
    } else {
      setOpponentAnimation(animationStyle);
      // Reset animation after a delay
      setTimeout(() => {
        setOpponentAnimation("default");
      }, 800);
    }
  } catch (error) {
    console.error("Error in applyMoveAnimation:", error);
  }
}