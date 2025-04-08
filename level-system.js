/**
 * Squabble Character Leveling System
 * Handles character progression, XP, level-ups, and move unlocks
 */

// XP curve calculation - determines how much XP is needed for each level
function calculateRequiredXP(level) {
  // Base formula: Each level requires progressively more XP
  // Level 1-10: Linear growth
  // Level 11-30: Moderate exponential growth
  // Level 31-50: Steeper exponential growth
  
  if (level < 2) return 0; // Level 1 has no requirement
  if (level <= 10) return 100 * (level - 1); // 100, 200, 300, etc.
  if (level <= 30) return 1000 + 250 * (level - 10); // 1250, 1500, 1750, etc.
  if (level <= 50) return 6000 + 500 * (level - 30); // 6500, 7000, 7500, etc.
  
  return Infinity; // Cannot level past 50
}

// Grant XP to a character
function grantXP(character, amount) {
  if (!character || !amount || amount <= 0) return false;
  
  // Cannot gain XP past level 50
  if (character.level >= 50) return false;
  
  // Add XP to character
  character.currentXP = (character.currentXP || 0) + amount;
  
  // Check for level-up(s)
  let leveledUp = false;
  let newMoves = [];
  
  // Keep checking for level-ups as long as XP exceeds requirements
  while (character.level < 50) {
    const requiredXP = calculateRequiredXP(character.level + 1);
    
    if (character.currentXP >= requiredXP) {
      // Level up
      character.level++;
      leveledUp = true;
      
      // Check if new move is unlocked at this level
      const unlockedMove = checkMoveUnlocks(character);
      if (unlockedMove) {
        newMoves.push(unlockedMove);
      }
    } else {
      break; // Not enough XP for another level up
    }
  }
  
  return {
    leveledUp,
    newMoves,
    level: character.level,
    xpGained: amount,
    currentXP: character.currentXP,
    nextLevelXP: calculateRequiredXP(character.level + 1)
  };
}

// Check if a character unlocks a new move at their current level
function checkMoveUnlocks(character) {
  // Ensure character has a moves array and possible moves array
  if (!character.moves) character.moves = [];
  if (!character.possibleMoves) return null;
  
  // Level-based move unlock logic
  let unlockedMove = null;
  
  // Move unlock logic based on level
  if (character.level === 6 && character.possibleMoves.length >= 2) {
    unlockedMove = character.possibleMoves[1]; // Second move at level 6
  } else if (character.level === 16 && character.possibleMoves.length >= 3) {
    unlockedMove = character.possibleMoves[2]; // Third move at level 16
  } else if (character.level === 31 && character.possibleMoves.length >= 4) {
    unlockedMove = character.possibleMoves[3]; // Fourth move at level 31
  }
  
  // If a move was unlocked, add it to the character's moves
  if (unlockedMove && !character.moves.some(move => move.name === unlockedMove.name)) {
    character.moves.push(unlockedMove);
    return unlockedMove;
  }
  
  return null;
}

// Calculate battle XP reward based on opponent level, victory status, etc.
function calculateBattleXP(opponentLevel, wasVictorious, knockoutCount = 0) {
  // Base XP is relative to opponent level
  let baseXP = opponentLevel * 10;
  
  // Victory multiplier (win = full XP, loss = reduced XP)
  const victoryMultiplier = wasVictorious ? 1.0 : 0.3;
  
  // Bonus for knockouts (fading opponents)
  const knockoutBonus = knockoutCount * 15;
  
  // Final XP calculation
  return Math.floor((baseXP + knockoutBonus) * victoryMultiplier);
}

// Add gear slot to a character
function addGearSlot(character, slotType) {
  if (!character.gearSlots) character.gearSlots = [];
  
  // Check if this slot type already exists
  const existingSlot = character.gearSlots.find(slot => slot.type === slotType);
  if (existingSlot) return false;
  
  // Add the new gear slot
  character.gearSlots.push({
    type: slotType,
    equipped: null
  });
  
  return true;
}

// Initialize a character's level properties
function initializeCharacterLevel(character) {
  if (!character) return;
  
  // Set initial level properties if not present
  if (!character.level) character.level = 1;
  if (!character.currentXP) character.currentXP = 0;
  if (!character.moves) character.moves = [];
  if (!character.gearSlots) character.gearSlots = [];
  
  // Ensure starting moves are assigned
  if (character.possibleMoves && character.possibleMoves.length > 0) {
    // Level 1 characters should have at least one move
    if (character.moves.length === 0) {
      character.moves.push(character.possibleMoves[0]);
    }
  }
  
  // Initialize gear slots (typically characters start with 1 gear slot)
  if (character.gearSlots.length === 0) {
    addGearSlot(character, "accessory");
  }
  
  return character;
}

// Export the leveling system functions
window.LevelSystem = {
  calculateRequiredXP,
  grantXP,
  checkMoveUnlocks,
  calculateBattleXP,
  addGearSlot,
  initializeCharacterLevel
};