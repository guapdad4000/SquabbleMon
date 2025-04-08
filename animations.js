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
        buffAnimationType = "scammer-buff";
        characterSpecificBuff = true;
      } else if (characterName.includes("plug")) {
        buffAnimationType = "plug-buff";
        characterSpecificBuff = true;
      } else if (characterName.includes("dysfunctional") || 
                characterName.includes("serial")) {
        buffAnimationType = "dysfunctional-buff";
        characterSpecificBuff = true;
      } else if (characterName.includes("9-5")) {
        buffAnimationType = "9-5-buff";
        characterSpecificBuff = true;
      } else if (characterName.includes("smoker") || 
                characterName.includes("rasta")) {
        buffAnimationType = "smoker-buff";
        characterSpecificBuff = true;
      } else if (characterName.includes("functional") || 
                characterName.includes("addict")) {
        buffAnimationType = "functional-buff";
        characterSpecificBuff = true;
      } else if (characterName.includes("tech") || 
                characterName.includes("rich")) {
        buffAnimationType = "tech-buff";
        characterSpecificBuff = true;
      }
    } else if (user === "opponent" && window.activeOpponent) {
      const characterName = window.activeOpponent.name?.toLowerCase() || "";
      if (characterName.includes("scammer")) {
        buffAnimationType = "scammer-buff";
        characterSpecificBuff = true;
      } else if (characterName.includes("plug")) {
        buffAnimationType = "plug-buff";
        characterSpecificBuff = true;
      } else if (characterName.includes("dysfunctional") || 
                characterName.includes("serial")) {
        buffAnimationType = "dysfunctional-buff";
        characterSpecificBuff = true;
      } else if (characterName.includes("9-5")) {
        buffAnimationType = "9-5-buff";
        characterSpecificBuff = true;
      } else if (characterName.includes("smoker") || 
                characterName.includes("rasta")) {
        buffAnimationType = "smoker-buff";
        characterSpecificBuff = true;
      } else if (characterName.includes("functional") || 
                characterName.includes("addict")) {
        buffAnimationType = "functional-buff";
        characterSpecificBuff = true;
      } else if (characterName.includes("tech") || 
                characterName.includes("rich")) {
        buffAnimationType = "tech-buff";
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
        case 'normal':
        case 'rock':
          buffAnimationType = 'normal-buff';
          break;
        case 'light':
          buffAnimationType = 'light-buff';
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
    // Apply healing animation to character
    if (user === "player") {
      setPlayerAnimation("heal");
      setTimeout(() => setPlayerAnimation("default"), 1000);
    } else {
      setOpponentAnimation("heal");
      setTimeout(() => setOpponentAnimation("default"), 1000);
    }
    
    // Add character-specific healing effect if applicable
    const characterName = user === "player" 
      ? (window.activePlayer?.name || "").toLowerCase()
      : (window.activeOpponent?.name || "").toLowerCase();
    
    if (characterName.includes("vibe")) {
      // Special vibe heal effect
      applyVisualEffectGif("https://i.gifer.com/X5NK.gif", user);
    } else {
      // Default heal effect
      applyVisualEffectGif("heal", user);
    }
  } catch (error) {
    console.error("Error in applyHealAnimation:", error);
  }
}

// Function to apply critical hit animation
function applyCriticalHitAnimation(user) {
  try {
    // Apply critical hit animation to character
    if (user === "player") {
      setPlayerAnimation("criticalHit");
      setTimeout(() => setPlayerAnimation("default"), 500);
    } else {
      setOpponentAnimation("criticalHit");
      setTimeout(() => setOpponentAnimation("default"), 500);
    }
    
    // Add a special explosion effect for critical hits
    applyVisualEffectGif("explosion", user);
    
    // Show "hands" effect for critical hits (like throwing hands)
    setTimeout(() => {
      applyVisualEffectGif("hands", user);
    }, 300);
  } catch (error) {
    console.error("Error in applyCriticalHitAnimation:", error);
  }
}

// Handle status effect animations in battle
function handleStatusEffectAnimation(effectType, target) {
  try {
    // Map effect type to animation type for sprite animation
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
    
    // Apply the animation to the character
    if (target === "player") {
      setPlayerAnimation(animationType);
      setTimeout(() => setPlayerAnimation("default"), 500);
    } else {
      setOpponentAnimation(animationType);
      setTimeout(() => setOpponentAnimation("default"), 500);
    }
    
    // Apply visual effect based on status type
    switch(effectType.toLowerCase()) {
      case "burn":
        applyVisualEffectGif("burn", target);
        break;
      case "sleep":
        applyVisualEffectGif("sleep", target);
        break;
      case "lightning":
      case "paralysis":
        applyVisualEffectGif("lightning", target);
        break;
      case "wet":
      case "water":
        applyVisualEffectGif("water", target);
        break;
      case "leaf":
      case "plant":
        applyVisualEffectGif("leaf", target);
        break;
      default:
        // For other status effects, just use the status bounce animation
        break;
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
      
      // Extended character type detection - prioritize specific character types
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
      } else if (characterName.includes("rasta")) {
        characterType = "rasta";
        isCharacterSpecific = true;
      } else if (characterName.includes("gamer")) {
        characterType = "gamer";
        isCharacterSpecific = true;
      } else if (characterName.includes("vibe")) {
        characterType = "vibe";
        isCharacterSpecific = true;
      } else if (characterName.includes("tech") || characterName.includes("techy")) {
        characterType = "tech";
        isCharacterSpecific = true;
      } else if (characterName.includes("dysfunctional") || 
                characterName.includes("serial")) {
        characterType = "dysfunctional";
        isCharacterSpecific = true;
      } else if (characterName.includes("officer") || 
                characterName.includes("ganger")) {
        characterType = "officer";
        isCharacterSpecific = true;
      } else if (characterName.includes("snitch")) {
        characterType = "snitch";
        isCharacterSpecific = true;
      } else if (characterName.includes("muslim")) {
        characterType = "muslim";
        isCharacterSpecific = true;
      } else if (characterName.includes("rapper")) {
        characterType = "rapper";
        isCharacterSpecific = true;
      } else if (characterName.includes("smoker")) {
        characterType = "smoker";
        isCharacterSpecific = true;
      } else if (characterName.includes("functional") || 
                characterName.includes("addict")) {
        characterType = "functional";
        isCharacterSpecific = true;
      } else if (characterName.includes("cd")) {
        characterType = "cd";
        isCharacterSpecific = true;
      }
    } else if (user === "opponent" && window.activeOpponent) {
      const characterName = window.activeOpponent.name?.toLowerCase() || "";
      
      // Extended character type detection for opponent - prioritize specific character types
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
      } else if (characterName.includes("rasta")) {
        characterType = "rasta";
        isCharacterSpecific = true;
      } else if (characterName.includes("gamer")) {
        characterType = "gamer";
        isCharacterSpecific = true;
      } else if (characterName.includes("vibe")) {
        characterType = "vibe";
        isCharacterSpecific = true;
      } else if (characterName.includes("tech") || characterName.includes("techy")) {
        characterType = "tech";
        isCharacterSpecific = true;
      } else if (characterName.includes("dysfunctional") || 
                characterName.includes("serial")) {
        characterType = "dysfunctional";
        isCharacterSpecific = true;
      } else if (characterName.includes("officer") || 
                characterName.includes("ganger")) {
        characterType = "officer";
        isCharacterSpecific = true;
      } else if (characterName.includes("snitch")) {
        characterType = "snitch";
        isCharacterSpecific = true;
      } else if (characterName.includes("muslim")) {
        characterType = "muslim";
        isCharacterSpecific = true;
      } else if (characterName.includes("rapper")) {
        characterType = "rapper";
        isCharacterSpecific = true;
      } else if (characterName.includes("smoker")) {
        characterType = "smoker";
        isCharacterSpecific = true;
      } else if (characterName.includes("functional") || 
                characterName.includes("addict")) {
        characterType = "functional";
        isCharacterSpecific = true;
      } else if (characterName.includes("cd")) {
        characterType = "cd";
        isCharacterSpecific = true;
      }
    }
    
    // Set animation style based on move type
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
      // Log the character-specific effect being used
      console.log(`Using character-specific effect for ${characterType}`);
      applyVisualEffectGif(characterType, user);
      
      // For certain character types, apply additional effects after a short delay
      if (characterType === "rapper" || characterType === "gamer" || characterType === "vibe") {
        setTimeout(() => {
          // Apply a secondary effect for these character types
          if (characterType === "rapper") {
            applyVisualEffectGif("money", user); // Rappers get money effects
          } else if (characterType === "gamer") {
            applyVisualEffectGif("electric", user); // Gamers get electric effects
          } else if (characterType === "vibe") {
            applyVisualEffectGif("light", user); // Vibe characters get light effects
          }
        }, 300);
      }
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
    
    // Choose animation based on move type - updated with new effect URLs
    let animationUrl = '';
    switch (moveType.toLowerCase()) {
      // Type-based effects
      case 'fire':
        animationUrl = 'https://i.gifer.com/PVYG.gif'; // fire effect
        break;
      case 'water':
        animationUrl = 'https://i.gifer.com/YlW9.gif'; // updated water attack
        break;
      case 'electric':
        animationUrl = 'https://i.gifer.com/4bXG.gif'; // updated electricity attack
        break;
      case 'plant':
      case 'grass':
      case 'leaf':
        animationUrl = 'https://i.imgur.com/Tgv0o7b.gif'; // updated leaf/plant attack
        break;
      case 'dark':
        animationUrl = 'https://i.gifer.com/WXfF.gif'; // updated dark attack
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
      case 'blast':
      case 'explosion':
        animationUrl = 'https://i.gifer.com/XZ5N.gif'; // blast attacks
        break;
      case 'sleep':
        animationUrl = 'https://i.imgur.com/hFYQ7oe.gif'; // sleep effect
        break;
      case 'burn':
        animationUrl = 'https://i.gifer.com/y8.gif'; // burn effect
        break;
      case 'lightning':
        animationUrl = 'https://i.imgur.com/OtnoqvS.gif'; // lightning attack
        break;
      case 'heal':
        animationUrl = 'https://i.imgur.com/684Bb2r.gif'; // heal effect
        break;
      
      // Character-specific effects
      case 'scammer':
        animationUrl = 'https://i.gifer.com/y7.gif'; // scammer effect
        break;
      case 'earthy':
        animationUrl = 'https://i.gifer.com/56i2.gif'; // earthy attack
        break;
      case 'rasta':
      case 'smoker':
        animationUrl = 'https://i.gifer.com/3klZ.gif'; // smoker/rasta attack
        break;
      case 'plug':
        animationUrl = 'https://i.gifer.com/3vIR.gif'; // plug effect
        break;
      case '9-5':
        animationUrl = 'https://i.gifer.com/49a7.gif'; // updated 9-5 attack
        break;
      case 'gamer':
        animationUrl = 'https://i.gifer.com/4XCT.gif'; // gamer attack
        break;
      case 'vibe':
        animationUrl = 'https://i.gifer.com/PZz.gif'; // vibe attack
        break;
      case 'tech':
      case 'techy':
        animationUrl = 'https://i.gifer.com/24S2.gif'; // tech attack
        break;
      case 'dysfunctional':
      case 'serial':
      case 'officer':
      case 'ganger':
        animationUrl = 'https://i.gifer.com/42xO.gif'; // dysfunctional/serial/officer/ganger attack
        break;
      case 'snitch':
        animationUrl = 'https://i.gifer.com/3Alr.gif'; // snitch attack
        break;
      case 'muslim':
        animationUrl = 'https://i.gifer.com/75P0.gif'; // muslim homie attack
        break;
      case 'rapper':
        animationUrl = 'https://i.gifer.com/ZGYt.gif'; // rapper attack
        break;
      case 'crash':
      case 'cd':
        animationUrl = 'https://i.gifer.com/1kME.gif'; // cd use
        break;
      
      // Buff effects
      case 'scammer-buff':
        animationUrl = 'https://i.gifer.com/3BBS.gif'; // scammer buff
        break;
      case '9-5-buff':
        animationUrl = 'https://i.gifer.com/yvL.gif'; // 9-5 buff
        break;
      case 'plug-buff':
        animationUrl = 'https://i.gifer.com/2r6D.gif'; // plug buff
        break;
      case 'dysfunctional-buff':
      case 'serial-buff':
      case 'plug-special-buff':
        animationUrl = 'https://i.gifer.com/YyBN.gif'; // dysfunctional/serial/plug special buff
        break;
      case 'functional-buff':
      case 'addict-buff':
        animationUrl = 'https://i.gifer.com/1pOk.gif'; // functional addict buff
        break;
      case 'smoker-buff':
      case 'rasta-buff':
        animationUrl = 'https://i.gifer.com/1uKK.gif'; // smoker/rasta buff
        break;
      case 'tech-buff':
      case 'rich-buff':
        animationUrl = 'https://i.gifer.com/7sZH.gif'; // tech bro/techy buff
        break;
      case 'dark-buff':
        animationUrl = 'https://i.gifer.com/Dzpn.gif'; // dark buffs
        break;
      case 'water-buff':
        animationUrl = 'https://i.gifer.com/3q60.gif'; // water buff
        break;
      case 'normal-buff':
      case 'rock-buff': 
        animationUrl = 'https://i.gifer.com/5Q11.gif'; // normal/rock buff
        break;
      case 'light-buff':
        animationUrl = 'https://i.gifer.com/XiPv.gif'; // light buff
        break;
      case 'buff':
        animationUrl = 'https://i.gifer.com/XZ5L.gif'; // generic buffs
        break;
        
      // Win/Lose effects
      case 'win':
        animationUrl = 'https://i.gifer.com/ZJF0.gif'; // win screen animation
        break;
      case 'hands':
        animationUrl = 'https://i.gifer.com/1uIf.gif'; // win hands
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