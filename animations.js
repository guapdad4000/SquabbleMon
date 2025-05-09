// Animation state management - optimized for faster gameplay
const ANIMATION_STATE = {
  player: {
    default: "float 3s ease-in-out infinite 0.5px", // Slower and smaller float
    attack: "attack 0.4s ease-in-out", // Faster attack animation
    shake: "player-shake-animation 0.5s ease-in-out",
    hit: "hit-flash 0.2s ease-in-out", // Flash animation when hit
    lunge: "lunge 0.25s ease-in-out", // Lunging forward animation
    glow: "glow 0.4s ease-in-out", // Glowing effect for status moves
    criticalHit: "criticalHit 0.5s ease-out", // Critical hit animation
    heal: "heal 0.8s ease-in-out", // Healing animation
    statusBounce: "statusBounce 0.4s ease-out", // Status effect application
    effectStreet: "effect-street 0.6s ease-in-out", // Street-style effect
    effectHiphop: "effect-hiphop 0.6s ease-in-out", // Hip-hop style effect
    effectUrban: "effect-urban 0.6s ease-in-out", // Urban style effect
    effectTech: "effect-tech 0.6s ease-in-out", // Tech style effect
    effectStatus: "effect-status 0.6s ease-in-out", // Status effect style
    imposterHit: "imposterHit 0.8s forwards", // Imposter hit effect
    current: "float 3s ease-in-out infinite 0.5px",
  },
  opponent: {
    default: "float 3s ease-in-out infinite 0.5px", // Will be flipped with transform
    attack: "attack 0.4s ease-in-out", // Faster attack animation
    shake: "shake-animation 0.5s ease-in-out",
    hit: "hit-flash 0.2s ease-in-out", // Flash animation when hit
    lungeReverse: "lungeReverse 0.25s ease-in-out", // Reversed lunging animation
    glow: "glow 0.4s ease-in-out", // Glowing effect for status moves
    criticalHit: "criticalHit 0.5s ease-out", // Critical hit animation
    heal: "heal 0.8s ease-in-out", // Healing animation
    statusBounce: "statusBounce 0.4s ease-out", // Status effect application
    effectStreet: "effect-street 0.6s ease-in-out", // Street-style effect
    effectHiphop: "effect-hiphop 0.6s ease-in-out", // Hip-hop style effect
    effectUrban: "effect-urban 0.6s ease-in-out", // Urban style effect
    effectTech: "effect-tech 0.6s ease-in-out", // Tech style effect
    effectStatus: "effect-status 0.6s ease-in-out", // Status effect style
    imposterHit: "imposterHit 0.8s forwards", // Imposter hit effect
    current: "float 3s ease-in-out infinite 0.5px",
  },
};

// Player animation helper function
function setPlayerAnimation(animationType) {
  try {
    const playerSprite = document.getElementById("player-sprite");
    if (!playerSprite) {
      console.log("Player sprite element not found");
      return;
    }

    const animation =
      ANIMATION_STATE.player[animationType] || ANIMATION_STATE.player.default;
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

    const animation =
      ANIMATION_STATE.opponent[animationType] ||
      ANIMATION_STATE.opponent.default;
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
      } else if (
        characterName.includes("dysfunctional") ||
        characterName.includes("serial")
      ) {
        buffAnimationType = "dysfunctional-buff";
        characterSpecificBuff = true;
      } else if (characterName.includes("9-5")) {
        buffAnimationType = "9-5-buff";
        characterSpecificBuff = true;
      } else if (
        characterName.includes("smoker") ||
        characterName.includes("rasta")
      ) {
        buffAnimationType = "smoker-buff";
        characterSpecificBuff = true;
      } else if (
        characterName.includes("functional") ||
        characterName.includes("addict")
      ) {
        buffAnimationType = "functional-buff";
        characterSpecificBuff = true;
      } else if (
        characterName.includes("tech") ||
        characterName.includes("rich")
      ) {
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
      } else if (
        characterName.includes("dysfunctional") ||
        characterName.includes("serial")
      ) {
        buffAnimationType = "dysfunctional-buff";
        characterSpecificBuff = true;
      } else if (characterName.includes("9-5")) {
        buffAnimationType = "9-5-buff";
        characterSpecificBuff = true;
      } else if (
        characterName.includes("smoker") ||
        characterName.includes("rasta")
      ) {
        buffAnimationType = "smoker-buff";
        characterSpecificBuff = true;
      } else if (
        characterName.includes("functional") ||
        characterName.includes("addict")
      ) {
        buffAnimationType = "functional-buff";
        characterSpecificBuff = true;
      } else if (
        characterName.includes("tech") ||
        characterName.includes("rich")
      ) {
        buffAnimationType = "tech-buff";
        characterSpecificBuff = true;
      }
    }

    // If character doesn't have a specific buff, check by buff type
    if (!characterSpecificBuff) {
      switch (buffType?.toLowerCase()) {
        case "dark":
          buffAnimationType = "dark-buff";
          break;
        case "water":
          buffAnimationType = "water-buff";
          break;
        case "normal":
        case "rock":
          buffAnimationType = "normal-buff";
          break;
        case "light":
          buffAnimationType = "light-buff";
          break;
        default:
          buffAnimationType = "buff"; // Default buff animation
      }
    }

    // For player, apply visual effect. For opponent, don't show buff effects as requested
    if (user === "player") {
      // Apply the special effect animation based on buff type
      applyVisualEffectGif(buffAnimationType, user);

      // Apply animation for player
      setPlayerAnimation("glow");
      setTimeout(() => setPlayerAnimation("default"), 400); // Reduced timing for faster battles
    } else {
      // For opponent - only apply the character animation, not the visual effect
      console.log(
        `Opponent buff applied (${buffAnimationType}) but visual effect skipped`,
      );
      setOpponentAnimation("glow");
      setTimeout(() => setOpponentAnimation("default"), 400); // Reduced timing for faster battles
    }
  } catch (error) {
    console.error("Error in applyBuffAnimation:", error);
  }
}

// Function to apply healing animation
function applyHealAnimation(user) {
  try {
    // Apply healing animation to character (reduced animation time)
    if (user === "player") {
      setPlayerAnimation("heal");
      setTimeout(() => setPlayerAnimation("default"), 600); // Even shorter time for faster battles
    } else {
      setOpponentAnimation("heal");
      setTimeout(() => setOpponentAnimation("default"), 600); // Even shorter time for faster battles
    }

    // Add character-specific healing effect if applicable
    const characterName =
      user === "player"
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
      setTimeout(() => setPlayerAnimation("default"), 400); // Faster animation
    } else {
      setOpponentAnimation("criticalHit");
      setTimeout(() => setOpponentAnimation("default"), 400); // Faster animation
    }

    // Add a special explosion effect for critical hits
    applyVisualEffectGif("explosion", user);

    // Show "hands" effect for critical hits (like throwing hands) - faster secondary effect
    setTimeout(() => {
      applyVisualEffectGif("hands", user);
    }, 200); // Reduced delay for faster battles
  } catch (error) {
    console.error("Error in applyCriticalHitAnimation:", error);
  }
}

// Handle status effect animations in battle
function handleStatusEffectAnimation(effectType, target) {
  try {
    // Map effect type to animation type for sprite animation
    let animationType = "statusBounce";

    switch (effectType) {
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
      setTimeout(() => setPlayerAnimation("default"), 400); // Faster status animations
    } else {
      setOpponentAnimation(animationType);
      setTimeout(() => setOpponentAnimation("default"), 400); // Faster status animations
    }

    // Apply visual effect based on status type
    switch (effectType.toLowerCase()) {
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
      } else if (
        characterName.includes("tech") ||
        characterName.includes("techy")
      ) {
        characterType = "tech";
        isCharacterSpecific = true;
      } else if (
        characterName.includes("dysfunctional") ||
        characterName.includes("serial")
      ) {
        characterType = "dysfunctional";
        isCharacterSpecific = true;
      } else if (
        characterName.includes("officer") ||
        characterName.includes("ganger")
      ) {
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
      } else if (
        characterName.includes("functional") ||
        characterName.includes("addict")
      ) {
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
      } else if (
        characterName.includes("tech") ||
        characterName.includes("techy")
      ) {
        characterType = "tech";
        isCharacterSpecific = true;
      } else if (
        characterName.includes("dysfunctional") ||
        characterName.includes("serial")
      ) {
        characterType = "dysfunctional";
        isCharacterSpecific = true;
      } else if (
        characterName.includes("officer") ||
        characterName.includes("ganger")
      ) {
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
      } else if (
        characterName.includes("functional") ||
        characterName.includes("addict")
      ) {
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
      case "Electric": // Added Electric for consistency
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
      }, 400); // Reduced time for faster gameplay
    } else {
      setOpponentAnimation(animationStyle);
      // Reset animation after a delay
      setTimeout(() => {
        setOpponentAnimation("default");
      }, 400); // Reduced time for faster gameplay
    }

    // Apply character-specific effect if it exists, otherwise use regular move type
    if (isCharacterSpecific) {
      // Log the character-specific effect being used
      console.log(`Using character-specific effect for ${characterType}`);
      applyVisualEffectGif(characterType, user);

      // For certain character types, apply additional effects after a short delay
      if (
        characterType === "rapper" ||
        characterType === "gamer" ||
        characterType === "vibe"
      ) {
        setTimeout(() => {
          // Apply a secondary effect for these character types
          if (characterType === "rapper") {
            applyVisualEffectGif("money", user); // Rappers get money effects
          } else if (characterType === "gamer") {
            applyVisualEffectGif("electric", user); // Gamers get electric effects
          } else if (characterType === "vibe") {
            applyVisualEffectGif("light", user); // Vibe characters get light effects
          }
        }, 250); // Reduced time for faster battles
      }
    } else {
      // Check for electric or tech move types to ensure proper handling
      if (moveType.toLowerCase() === "electric") {
        applyVisualEffectGif("electric", user);
      } else {
        // Otherwise apply the standard visual effect based on move type
        applyVisualEffectGif(moveType.toLowerCase(), user);
      }
    }
  } catch (error) {
    console.error("Error in applyMoveAnimation:", error);
  }
}

// Apply a visual effect GIF based on move type
function applyVisualEffectGif(moveType, user) {
  try {
    // Check if this is a buff effect being applied to opponent - skip applying visual effects
    const isBuff = moveType.toLowerCase().includes("buff");
    if (isBuff && user === "opponent") {
      console.log("Skipping buff visual effect for opponent:", moveType);
      return; // Don't apply buff effects to opponents as requested
    }

    const effectDiv = document.createElement("div");
    effectDiv.className = "battle-effect";

    // Choose animation based on move type - updated with new effect URLs
    let animationUrl = "";

    // Determine if this is an electric-type move
    const isElectricEffect =
      moveType.toLowerCase() === "electric" ||
      moveType.toLowerCase() === "lightning";

    // Special case: when user is "opponent" and it's an electric move, use a different animation
    if (isElectricEffect && user === "opponent") {
      animationUrl = "https://i.gifer.com/Wgkb.gif"; // Enhanced electric effect for opponents
    } else {
      switch (moveType.toLowerCase()) {
        // Type-based effects
        case "fire":
          animationUrl = "https://i.gifer.com/PVYG.gif"; // fire effect
          break;
        case "water":
          animationUrl = "https://i.gifer.com/YlW9.gif"; // updated water attack
          break;
        case "electric":
          animationUrl = "https://i.gifer.com/4bXG.gif"; // updated electricity attack for player
          break;
        case "plant":
        case "grass":
        case "leaf":
          animationUrl = "https://i.imgur.com/Tgv0o7b.gif"; // updated leaf/plant attack
          break;
        case "dark":
          animationUrl = "https://i.gifer.com/WXfF.gif"; // updated dark attack
          break;
        case "light":
          animationUrl = "https://i.gifer.com/OkV7.gif"; // light effect
          break;
        case "wind":
          animationUrl = "https://i.gifer.com/3klP.gif"; // wind effect
          break;
        case "money":
          animationUrl = "https://i.gifer.com/xt.gif"; // money attacks
          break;
        case "blast":
        case "explosion":
          animationUrl = "https://i.gifer.com/XZ5N.gif"; // blast attacks
          break;
        case "sleep":
          animationUrl = "https://i.imgur.com/hFYQ7oe.gif"; // sleep effect
          break;
        case "burn":
          animationUrl = "https://i.gifer.com/y8.gif"; // burn effect
          break;
        case "bleed":
        case "bleeding":
          animationUrl = "https://i.gifer.com/WwaS.gif"; // bleeding effect
          break;
        case "lightning":
          animationUrl = "https://i.imgur.com/OtnoqvS.gif"; // lightning/electric attack
          break;
        case "heal":
          animationUrl = "https://i.imgur.com/684Bb2r.gif"; // heal effect
          break;

        // Character-specific effects
        case "scammer":
          animationUrl = "https://i.gifer.com/y7.gif"; // scammer effect
          break;
        case "earthy":
          animationUrl = "https://i.gifer.com/56i2.gif"; // earthy attack
          break;
        case "rasta":
        case "smoker":
          animationUrl = "https://i.gifer.com/3klZ.gif"; // smoker/rasta attack
          break;
        case "plug":
          animationUrl = "https://i.gifer.com/3vIR.gif"; // plug effect
          break;
        case "9-5":
          animationUrl = "https://i.gifer.com/49a7.gif"; // updated 9-5 attack
          break;
        case "gamer":
          animationUrl = "https://i.gifer.com/4XCT.gif"; // gamer attack
          break;
        case "vibe":
          animationUrl = "https://i.gifer.com/PZz.gif"; // vibe attack
          break;
        case "tech":
        case "techy":
          animationUrl = "https://i.gifer.com/24S2.gif"; // tech attack
          break;
        case "dysfunctional":
        case "serial":
        case "officer":
        case "ganger":
          animationUrl = "https://i.gifer.com/42xO.gif"; // dysfunctional/serial/officer/ganger attack
          break;
        case "snitch":
          animationUrl = "https://i.gifer.com/3Alr.gif"; // snitch attack
          break;
        case "muslim":
          animationUrl = "https://i.gifer.com/75P0.gif"; // muslim homie attack
          break;
        case "rapper":
          animationUrl = "https://i.gifer.com/ZGYt.gif"; // rapper attack
          break;
        case "crash":
        case "cd":
          animationUrl = "https://i.gifer.com/1kME.gif"; // cd use
          break;

        // Buff effects
        case "scammer-buff":
          animationUrl = "https://i.gifer.com/3BBS.gif"; // scammer buff
          break;
        case "9-5-buff":
          animationUrl = "https://i.gifer.com/yvL.gif"; // 9-5 buff
          break;
        case "plug-buff":
          animationUrl = "https://i.gifer.com/2r6D.gif"; // plug buff
          break;
        case "dysfunctional-buff":
        case "serial-buff":
        case "plug-special-buff":
          animationUrl = "https://i.gifer.com/YyBN.gif"; // dysfunctional/serial/plug special buff
          break;
        case "functional-buff":
        case "addict-buff":
          animationUrl = "https://i.gifer.com/1pOk.gif"; // functional addict buff
          break;
        case "smoker-buff":
        case "rasta-buff":
          animationUrl = "https://i.gifer.com/1uKK.gif"; // smoker/rasta buff
          break;
        case "tech-buff":
        case "rich-buff":
          animationUrl = "https://i.gifer.com/7sZH.gif"; // tech bro/techy buff
          break;
        case "dark-buff":
          animationUrl = "https://i.gifer.com/Dzpn.gif"; // dark buffs
          break;
        case "water-buff":
          animationUrl = "https://i.gifer.com/3q60.gif"; // water buff
          break;
        case "normal-buff":
        case "rock-buff":
          animationUrl = "https://i.gifer.com/5Q11.gif"; // normal/rock buff
          break;
        case "light-buff":
          animationUrl = "https://i.gifer.com/XiPv.gif"; // light buff
          break;
        case "buff":
          animationUrl = "https://i.gifer.com/XZ5L.gif"; // generic buffs
          break;

        // Win/Lose effects
        case "win":
          animationUrl = "https://i.gifer.com/ZJF0.gif"; // win screen animation
          break;
        case "hands":
          animationUrl = "https://i.gifer.com/1uIf.gif"; // win hands
          break;
        case "lose":
          animationUrl = "https://i.gifer.com/Z6W8.gif"; // lose animation
          break;
        default:
          animationUrl = "https://i.gifer.com/Yecx.gif"; // small explosion for default
      }
    }

    effectDiv.style.backgroundImage = `url(${animationUrl})`;
    effectDiv.style.backgroundSize = "contain";
    effectDiv.style.backgroundRepeat = "no-repeat";
    effectDiv.style.backgroundPosition = "center";
    effectDiv.style.position = "absolute";
    effectDiv.style.width = "150px";
    effectDiv.style.height = "150px";
    // Use a lower z-index to ensure the effect appears behind character sprites
    effectDiv.style.zIndex = "5";

    // Position the effect at the bottom of the affected sprite (target), not the user
    // For normal attacks, we want to show the effect on the opponent when player attacks
    // and on the player when opponent attacks
    const isAttackEffect =
      !moveType.toLowerCase().includes("buff") &&
      !moveType.toLowerCase().includes("heal") &&
      !moveType.toLowerCase().includes("status");

    // Determine target sprite based on who's using the move
    const targetUser = isAttackEffect
      ? user === "player"
        ? "opponent"
        : "player"
      : user;

    function positionAndShowEffect() {
      // Find DOM elements we need
      const battleScreen =
        document.getElementById("battle-screen") ||
        document.querySelector(".battle-screen");
      if (!battleScreen) {
        console.warn("Battle screen not found, cannot add visual effect");
        return;
      }

      // Get the appropriate sprite based on who is the target
      const targetSprite = document.getElementById(
        targetUser === "player" ? "player-sprite" : "opponent-sprite",
      );
      if (!targetSprite) {
        console.warn(
          `Target sprite for ${targetUser} not found, using fallback positioning`,
        );
        // Fallback positioning
        effectDiv.style.left = targetUser === "player" ? "60%" : "20%";
        effectDiv.style.top = targetUser === "player" ? "60%" : "40%";
        battleScreen.appendChild(effectDiv);
        return;
      }

      // Get the target sprite position
      const targetRect = targetSprite.getBoundingClientRect();
      const battleRect = battleScreen.getBoundingClientRect();

      // Calculate percentages for positioning
      const leftPos =
        ((targetRect.left + targetRect.width / 2 - battleRect.left) /
          battleRect.width) *
          100 -
        7.5; // Center horizontally

      // Check for specific move types that need better positioning
      const isElectricEffect =
        moveType.toLowerCase() === "electric" ||
        moveType.toLowerCase() === "lightning";

      // Adjust vertical positioning based on effect type
      let topPos = 0;
      if (isElectricEffect) {
        // Center the effect on the sprite
        topPos =
          ((targetRect.top + targetRect.height / 2 - battleRect.top) /
            battleRect.height) *
            100 -
          15;
        effectDiv.style.width = "200px"; // Make electric effects larger
        effectDiv.style.height = "200px";
      } else {
        // Position at the bottom of the sprite for most effects
        topPos =
          ((targetRect.bottom - battleRect.top) / battleRect.height) * 100 - 25; // Align with bottom
      }

      // Set the position
      effectDiv.style.left = `${leftPos}%`;
      effectDiv.style.top = `${topPos}%`;
      effectDiv.style.transform = "translateX(-50%)"; // Center the effect
      console.log(
        `Positioned effect (${moveType}) at bottom of ${targetUser} at:`,
        leftPos,
        topPos,
      );

      // Add to battle screen
      battleScreen.appendChild(effectDiv);
    }

    // Position and show the effect
    positionAndShowEffect();

    // Remove after animation completes - reduced time to 1200ms for even faster battles
    setTimeout(() => {
      if (effectDiv && effectDiv.parentNode) {
        effectDiv.parentNode.removeChild(effectDiv);
      }
    }, 1200);
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
  applyVisualEffectGif,
};
