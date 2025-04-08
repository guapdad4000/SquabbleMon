// Animation state management - optimized for faster gameplay
const ANIMATION_STATE = {
  player: {
    default: "float 3s ease-in-out infinite 0.5px", // Slower and smaller float
    attack: "attack 0.6s ease-in-out", // Faster attack animation
    shake: "player-shake-animation 0.6s ease-in-out",
    hit: "hit-flash 0.3s ease-in-out", // Flash animation when hit
    lunge: "lunge 0.3s ease-in-out", // Lunging forward animation
    glow: "glow 0.5s ease-in-out", // Glowing effect for status moves
    criticalHit: "criticalHit 0.6s ease-out", // Critical hit animation
    heal: "heal 1s ease-in-out", // Healing animation
    statusBounce: "statusBounce 0.5s ease-out", // Status effect application
    effectStreet: "effect-street 0.8s ease-in-out", // Street-style effect
    effectHiphop: "effect-hiphop 0.8s ease-in-out", // Hip-hop style effect
    effectUrban: "effect-urban 0.8s ease-in-out", // Urban style effect 
    effectTech: "effect-tech 0.8s ease-in-out", // Tech style effect
    effectStatus: "effect-status 0.8s ease-in-out", // Status effect style
    imposterHit: "imposterHit 1s forwards", // Imposter hit effect
    current: "float 3s ease-in-out infinite 0.5px"
  },
  opponent: {
    default: "float 3s ease-in-out infinite 0.5px", // Will be flipped with transform
    attack: "attack 0.6s ease-in-out", // Faster attack animation
    shake: "shake-animation 0.6s ease-in-out",
    hit: "hit-flash 0.3s ease-in-out", // Flash animation when hit
    lungeReverse: "lungeReverse 0.3s ease-in-out", // Reversed lunging animation
    glow: "glow 0.5s ease-in-out", // Glowing effect for status moves
    criticalHit: "criticalHit 0.6s ease-out", // Critical hit animation
    heal: "heal 1s ease-in-out", // Healing animation
    statusBounce: "statusBounce 0.5s ease-out", // Status effect application
    effectStreet: "effect-street 0.8s ease-in-out", // Street-style effect
    effectHiphop: "effect-hiphop 0.8s ease-in-out", // Hip-hop style effect
    effectUrban: "effect-urban 0.8s ease-in-out", // Urban style effect
    effectTech: "effect-tech 0.8s ease-in-out", // Tech style effect
    effectStatus: "effect-status 0.8s ease-in-out", // Status effect style
    imposterHit: "imposterHit 1s forwards", // Imposter hit effect
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

// This function was replaced by the more detailed implementation below

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
    
    // Return to default animation after a delay (faster)
    setTimeout(() => {
      if (user === "player") {
        setPlayerAnimation("default");
      } else {
        setOpponentAnimation("default");
      }
    }, 500); // Faster animation duration
    
  } catch (error) {
    console.error("Error in applyStatusAnimation:", error);
  }
}

// Function to apply buff animations with character-specific effects
function applyBuffAnimation(buffType, user) {
  try {
    let characterSpecificBuff = false;
    let buffAnimationType = "buff"; // Default generic buff
    
    // Check for character-specific buffs
    if (user === "player" && window.activePlayer) {
      const characterName = window.activePlayer.name?.toLowerCase() || "";
      if (characterName.includes("scammer")) {
        buffAnimationType = "scammer";
        characterSpecificBuff = true;
      } else if (characterName.includes("plug") || 
                characterName.includes("dysfunctional") || 
                characterName.includes("serial")) {
        buffAnimationType = "dysfunctional";
        characterSpecificBuff = true;
      } else if (characterName.includes("9-5")) {
        buffAnimationType = "9-5";
        characterSpecificBuff = true;
      } else if (characterName.includes("smoker") || 
                characterName.includes("functional")) {
        buffAnimationType = "smoker";
        characterSpecificBuff = true;
      }
    } else if (user === "opponent" && window.activeOpponent) {
      const characterName = window.activeOpponent.name?.toLowerCase() || "";
      if (characterName.includes("scammer")) {
        buffAnimationType = "scammer";
        characterSpecificBuff = true;
      } else if (characterName.includes("plug") || 
                characterName.includes("dysfunctional") || 
                characterName.includes("serial")) {
        buffAnimationType = "dysfunctional";
        characterSpecificBuff = true;
      } else if (characterName.includes("9-5")) {
        buffAnimationType = "9-5";
        characterSpecificBuff = true;
      } else if (characterName.includes("smoker") || 
                characterName.includes("functional")) {
        buffAnimationType = "smoker";
        characterSpecificBuff = true;
      }
    }
    
    // If character doesn't have a specific buff, check by buff type
    if (!characterSpecificBuff) {
      switch (buffType?.toLowerCase()) {
        case 'dark':
          buffAnimationType = 'dark-buff';
          break;
        case 'water':
          buffAnimationType = 'water-buff';
          break;
        default:
          buffAnimationType = 'buff'; // Default buff animation
      }
    }
    
    // Apply the special effect animation based on buff type
    applyVisualEffectGif(buffAnimationType, user);
    
    // Apply character animation
    if (user === "player") {
      setPlayerAnimation("glow");
      setTimeout(() => setPlayerAnimation("default"), 500);
    } else {
      setOpponentAnimation("glow");
      setTimeout(() => setOpponentAnimation("default"), 500);
    }
  } catch (error) {
    console.error("Error in applyBuffAnimation:", error);
  }
}

// Function to apply healing animation
function applyHealAnimation(user) {
  try {
    if (user === "player") {
      setPlayerAnimation("heal");
      setTimeout(() => setPlayerAnimation("default"), 1000);
    } else {
      setOpponentAnimation("heal");
      setTimeout(() => setOpponentAnimation("default"), 1000);
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
      setTimeout(() => setPlayerAnimation("default"), 500);
    } else {
      setOpponentAnimation("criticalHit");
      setTimeout(() => setOpponentAnimation("default"), 500);
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
    
    // Apply the animation (faster)
    if (target === "player") {
      setPlayerAnimation(animationType);
      setTimeout(() => setPlayerAnimation("default"), 500);
    } else {
      setOpponentAnimation(animationType);
      setTimeout(() => setOpponentAnimation("default"), 500);
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
    // Character-specific indicator for special character-based effects
    let isCharacterSpecific = false;
    let characterType = "";
    
    // Check if the active character is any special type for character-specific effects
    if (user === "player" && window.activePlayer) {
      const characterName = window.activePlayer.name?.toLowerCase() || "";
      if (characterName.includes("scammer")) {
        characterType = "scammer";
        isCharacterSpecific = true;
      } else if (characterName.includes("plug")) {
        characterType = "plug";
        isCharacterSpecific = true;
      } else if (characterName.includes("earthy")) {
        characterType = "earthy";
        isCharacterSpecific = true;
      } else if (characterName.includes("9-5")) {
        characterType = "9-5";
        isCharacterSpecific = true;
      } else if (characterName.includes("dysfunctional") || 
                characterName.includes("serial") || 
                characterName.includes("addict")) {
        characterType = "dysfunctional";
        isCharacterSpecific = true;
      } else if (characterName.includes("smoker") || 
                characterName.includes("functional")) {
        characterType = "smoker";
        isCharacterSpecific = true;
      }
    } else if (user === "opponent" && window.activeOpponent) {
      const characterName = window.activeOpponent.name?.toLowerCase() || "";
      if (characterName.includes("scammer")) {
        characterType = "scammer";
        isCharacterSpecific = true;
      } else if (characterName.includes("plug")) {
        characterType = "plug";
        isCharacterSpecific = true;
      } else if (characterName.includes("earthy")) {
        characterType = "earthy";
        isCharacterSpecific = true;
      } else if (characterName.includes("9-5")) {
        characterType = "9-5";
        isCharacterSpecific = true;
      } else if (characterName.includes("dysfunctional") || 
                characterName.includes("serial") || 
                characterName.includes("addict")) {
        characterType = "dysfunctional";
        isCharacterSpecific = true;
      } else if (characterName.includes("smoker") || 
                characterName.includes("functional")) {
        characterType = "smoker";
        isCharacterSpecific = true;
      }
    }
    
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
      }, 500);
    } else {
      setOpponentAnimation(animationStyle);
      // Reset animation after a delay
      setTimeout(() => {
        setOpponentAnimation("default");
      }, 500);
    }
    
    // Apply character-specific effect if it exists, otherwise use regular move type
    if (isCharacterSpecific) {
      applyVisualEffectGif(characterType, user);
    } else {
      // Also apply the visual effect GIF based on move type
      applyVisualEffectGif(moveType.toLowerCase(), user);
    }
  } catch (error) {
    console.error("Error in applyMoveAnimation:", error);
  }
}

// Apply a visual effect GIF based on move type
function applyVisualEffectGif(moveType, user) {
  try {
    const effectDiv = document.createElement('div');
    effectDiv.className = 'battle-effect';
    
    // Choose animation based on move type
    let animationUrl = '';
    switch (moveType.toLowerCase()) {
      case 'fire':
        animationUrl = 'https://i.gifer.com/PVYG.gif'; // fire effect
        break;
      case 'water':
        animationUrl = 'https://i.gifer.com/X5Nb.gif'; // water effect
        break;
      case 'electric':
        animationUrl = 'https://i.gifer.com/Z9pp.gif'; // electricity effect
        break;
      case 'plant':
      case 'grass':
        animationUrl = 'https://i.gifer.com/56i2.gif'; // earthy attack (using for plant)
        break;
      case 'dark':
        animationUrl = 'https://i.gifer.com/3iCN.gif'; // dark effect
        break;
      case 'light':
        animationUrl = 'https://i.gifer.com/OkV7.gif'; // light effect
        break;
      case 'wind':
        animationUrl = 'https://i.gifer.com/3klP.gif'; // wind effect
        break;
      case 'money':
        animationUrl = 'https://i.gifer.com/xt.gif'; // money attacks 
        break;
      // Character-specific effects
      case 'scammer':
        animationUrl = 'https://i.gifer.com/y7.gif'; // scammer effect
        break;
      case 'earthy':
        animationUrl = 'https://i.gifer.com/56i2.gif'; // earthy attack
        break;
      case 'plug':
        animationUrl = 'https://i.gifer.com/3vIR.gif'; // plug effect
        break;
      case '9-5':
        animationUrl = 'https://i.gifer.com/yvL.gif'; // 9-5 buff
        break;
      case 'dysfunctional':
        animationUrl = 'https://i.gifer.com/YyBN.gif'; // dysfunctional/serial/plug buff
        break;
      case 'smoker':
        animationUrl = 'https://i.gifer.com/1pOk.gif'; // smoker/functional buff
        break;
      case 'dark-buff':
        animationUrl = 'https://i.gifer.com/Dzpn.gif'; // dark buffs
        break;
      case 'water-buff':
        animationUrl = 'https://i.gifer.com/3q60.gif'; // water buff
        break;
      case 'buff':
        animationUrl = 'https://i.gifer.com/XZ5L.gif'; // generic buffs
        break;
      case 'win':
        animationUrl = 'https://i.gifer.com/ZJF0.gif'; // win screen animation
        break;
      case 'lose':
        animationUrl = 'https://i.gifer.com/Z6W8.gif'; // lose animation
        break;
      default:
        animationUrl = 'https://i.gifer.com/Yecx.gif'; // small explosion for default
    }
    
    effectDiv.style.backgroundImage = `url(${animationUrl})`;
    effectDiv.style.backgroundSize = 'contain';
    effectDiv.style.backgroundRepeat = 'no-repeat';
    effectDiv.style.backgroundPosition = 'center';
    effectDiv.style.position = 'absolute';
    effectDiv.style.width = '150px';
    effectDiv.style.height = '150px';
    // Use a lower z-index to ensure the effect appears behind character sprites
    effectDiv.style.zIndex = '5';
    
    // Position the effect depending on who is using the move - align behind character
    if (user === 'player') {
      // Get the player sprite position
      const playerSprite = document.getElementById('player-sprite');
      if (playerSprite) {
        // Position the effect behind the player, aligning the bottom of the effect with the bottom of the sprite
        const playerRect = playerSprite.getBoundingClientRect();
        const battleScreen = document.getElementById('battle-screen') || document.querySelector('.battle-screen');
        const battleRect = battleScreen.getBoundingClientRect();
        
        // Calculate percentages for positioning
        const leftPos = ((playerRect.left + playerRect.width/2 - battleRect.left) / battleRect.width * 100) - 7.5; // Center horizontally
        const topPos = ((playerRect.bottom - battleRect.top) / battleRect.height * 100) - 25; // Align bottoms with offset
        
        effectDiv.style.left = `${leftPos}%`;
        effectDiv.style.top = `${topPos}%`;
        effectDiv.style.transform = 'translateX(-50%)'; // Center the effect
        console.log("Positioned effect behind player at:", leftPos, topPos);
      } else {
        // Fallback if sprite not found
        effectDiv.style.left = '60%';
        effectDiv.style.top = '60%';
      }
    } else {
      // For opponent
      const opponentSprite = document.getElementById('opponent-sprite');
      if (opponentSprite) {
        // Position the effect behind the opponent, aligning the bottom of the effect with the bottom of the sprite
        const opponentRect = opponentSprite.getBoundingClientRect();
        const battleScreen = document.getElementById('battle-screen') || document.querySelector('.battle-screen');
        const battleRect = battleScreen.getBoundingClientRect();
        
        // Calculate percentages for positioning
        const leftPos = ((opponentRect.left + opponentRect.width/2 - battleRect.left) / battleRect.width * 100) - 7.5; // Center horizontally
        const topPos = ((opponentRect.bottom - battleRect.top) / battleRect.height * 100) - 25; // Align bottoms with offset
        
        effectDiv.style.left = `${leftPos}%`;
        effectDiv.style.top = `${topPos}%`;
        effectDiv.style.transform = 'translateX(-50%)'; // Center the effect
        console.log("Positioned effect behind opponent at:", leftPos, topPos);
      } else {
        // Fallback if sprite not found
        effectDiv.style.left = '20%';
        effectDiv.style.top = '60%';
      }
    }
    
    // Add to battle screen
    const battleScreen = document.getElementById('battle-screen') || document.querySelector('.battle-screen');
    if (battleScreen) {
      battleScreen.appendChild(effectDiv);
      
      // Remove after animation completes
      setTimeout(() => {
        if (effectDiv && effectDiv.parentNode) {
          effectDiv.parentNode.removeChild(effectDiv);
        }
      }, 2000);
    } else {
      console.warn("Battle screen not found, cannot add visual effect");
    }
  } catch (error) {
    console.error("Error applying visual effect GIF:", error);
  }
}

// Make animation functions available globally
window.AnimationSystem = {
  setPlayerAnimation,
  setOpponentAnimation,
  resetAnimations,
  applyStatusAnimation,
  applyBuffAnimation,
  applyHealAnimation,
  applyCriticalHitAnimation,
  handleStatusEffectAnimation,
  applyMoveAnimation,
  applyVisualEffectGif
};