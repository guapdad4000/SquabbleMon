/**
 * SPRITE HELPERS
 * A set of utility functions to ensure sprite paths are standardized
 * and properly displayed across all game contexts.
 */

// Enable global debug mode by setting window.debugSprites = true in the console
const DEBUG_SPRITES = false;

// Character name to Imgur URL mapping
const CHARACTER_SPRITES = {
  // Main characters
  'Fitness Bro': 'https://i.imgur.com/YeMI4sr.png',
  'Rastamon': 'https://i.imgur.com/dZWWrrs.png',
  'Techy': 'https://i.imgur.com/VVa9pm9.png',
  'Cool Vibe YN': 'https://i.imgur.com/2n71aSJ.png',
  '9-5 Homie': 'https://i.imgur.com/UkE9crR.png',
  'All Jokes YN': 'https://i.imgur.com/9hFTFQt.png',
  'Closet Nerd': 'https://i.imgur.com/knA2Yxz.png',
  'Functional Addict': 'https://i.imgur.com/G3xfSjU.png',
  'Dysfunctional YN': 'https://i.imgur.com/yA0lUbo.png',
  'Gamer YN': 'https://i.imgur.com/vFvQKap.png',
  'Serial YN': 'https://i.imgur.com/Kwe1HpA.png',
  'Homeless YN': 'https://i.imgur.com/LRVrieF.png',
  'Rich Techbro': 'https://i.imgur.com/GmlKf6u.png',
  'Gamer Unemployed': 'https://i.imgur.com/b5pnt7o.png',
  'Earthy': 'https://i.imgur.com/1SuHgnZ.png',
  // Nicknames/shorter versions
  'Fitness': 'https://i.imgur.com/YeMI4sr.png',
  'Rasta': 'https://i.imgur.com/dZWWrrs.png',
  'Tech': 'https://i.imgur.com/VVa9pm9.png',
  'Cool': 'https://i.imgur.com/2n71aSJ.png',
  'Homie': 'https://i.imgur.com/UkE9crR.png',
  'Jokes': 'https://i.imgur.com/9hFTFQt.png',
  'Nerd': 'https://i.imgur.com/knA2Yxz.png',
  'Addict': 'https://i.imgur.com/G3xfSjU.png',
  'Gamer': 'https://i.imgur.com/vFvQKap.png',
  'Serial': 'https://i.imgur.com/Kwe1HpA.png',
  'Homeless': 'https://i.imgur.com/LRVrieF.png',
  'Rich': 'https://i.imgur.com/GmlKf6u.png',
  'Unemployed': 'https://i.imgur.com/b5pnt7o.png'
};

// Keyword-based sprite mapping
const SPRITE_KEYWORDS = [
  { keywords: ['fitness', 'gym', 'workout'], url: 'https://i.imgur.com/YeMI4sr.png' },
  { keywords: ['rasta', 'plant', 'weed', 'jamaica'], url: 'https://i.imgur.com/dZWWrrs.png' },
  { keywords: ['tech', 'electric', 'computer', 'geek'], url: 'https://i.imgur.com/VVa9pm9.png' },
  { keywords: ['vibe', 'cool', 'chill'], url: 'https://i.imgur.com/2n71aSJ.png' },
  { keywords: ['9-5', 'office', 'work', 'homie'], url: 'https://i.imgur.com/UkE9crR.png' },
  { keywords: ['jokes', 'funny', 'comedy', 'all jokes'], url: 'https://i.imgur.com/9hFTFQt.png' },
  { keywords: ['nerd', 'closet', 'glasses'], url: 'https://i.imgur.com/knA2Yxz.png' },
  { keywords: ['functional', 'addict', 'drugs'], url: 'https://i.imgur.com/G3xfSjU.png' },
  { keywords: ['homeless', 'street'], url: 'https://i.imgur.com/LRVrieF.png' },
  { keywords: ['gamer', 'gaming', 'game'], url: 'https://i.imgur.com/vFvQKap.png' },
  { keywords: ['serial', 'killer'], url: 'https://i.imgur.com/Kwe1HpA.png' },
  { keywords: ['rich', 'techbro', 'money'], url: 'https://i.imgur.com/GmlKf6u.png' },
  { keywords: ['unemployed', 'jobless'], url: 'https://i.imgur.com/b5pnt7o.png' },
  { keywords: ['earthy', 'earth', 'nature'], url: 'https://i.imgur.com/1SuHgnZ.png' },
  { keywords: ['dysfunctional'], url: 'https://i.imgur.com/yA0lUbo.png' }
];

// Default fallback sprite
const DEFAULT_SPRITE = 'https://i.imgur.com/YeMI4sr.png'; // Fitness Bro

/**
 * Standardizes sprite paths across the game
 * @param {string} spritePath - The original sprite path
 * @returns {string} - A standardized sprite path 
 */
function standardizeSpritePath(spritePath) {
  // Debug flag - this can be toggled from the console for debugging
  const debug = window.debugSprites || DEBUG_SPRITES;
  
  if (debug) {
    console.log("%c[SPRITE DEBUG] Standardizing path: " + spritePath, "background:#0f2233; color:#ffcc00; padding:3px;");
  }
  
  // Provide a default sprite if none is given or invalid
  if (!spritePath || typeof spritePath !== 'string') {
    console.warn("🚫 Invalid sprite path provided:", spritePath);
    return DEFAULT_SPRITE;
  }
  
  // Trim any whitespace
  spritePath = spritePath.trim();
  
  // CASE 1: If it's already an imgur URL, return it as is (preferred format)
  if (spritePath.includes('imgur.com')) {
    if (debug) console.log("✅ Using existing imgur URL sprite:", spritePath);
    
    // Fix imgur URLs that don't have the proper https:// prefix
    if (!spritePath.startsWith('http')) {
      return 'https://' + spritePath;
    }
    
    return spritePath;
  }
  
  // CASE 2: For other complete URLs, leave as is
  if (spritePath.startsWith('http')) {
    if (debug) console.log("✅ Using non-imgur URL sprite:", spritePath);
    return spritePath;
  }
  
  if (debug) console.log("🔄 Converting local sprite path to imgur URL:", spritePath);
  
  // CASE 3: Check if the path itself is a character name (exact match)
  if (CHARACTER_SPRITES[spritePath]) {
    if (debug) console.log("✅ Found exact character name match:", spritePath);
    return CHARACTER_SPRITES[spritePath];
  }
  
  // CASE 4: Check for character name in global state
  if (window.currentCharacter && window.currentCharacter.name && 
      CHARACTER_SPRITES[window.currentCharacter.name]) {
    if (debug) console.log("✅ Found matching character in currentCharacter:", window.currentCharacter.name);
    return CHARACTER_SPRITES[window.currentCharacter.name];
  }
  
  if (window.activePlayerCharacter && window.activePlayerCharacter.name && 
      CHARACTER_SPRITES[window.activePlayerCharacter.name]) {
    if (debug) console.log("✅ Found matching character in activePlayerCharacter:", window.activePlayerCharacter.name);
    return CHARACTER_SPRITES[window.activePlayerCharacter.name];
  }
  
  if (window.activeOpponent && window.activeOpponent.name && 
      CHARACTER_SPRITES[window.activeOpponent.name]) {
    if (debug) console.log("✅ Found matching character in activeOpponent:", window.activeOpponent.name);
    return CHARACTER_SPRITES[window.activeOpponent.name];
  }
  
  // CASE 5: Keyword-based matching
  for (const match of SPRITE_KEYWORDS) {
    for (const keyword of match.keywords) {
      if (spritePath.toLowerCase().includes(keyword.toLowerCase())) {
        if (debug) console.log(`✅ Found keyword match: ${keyword} → ${match.url}`);
        return match.url;
      }
    }
  }
  
  // CASE 6: Special case for player movement sprites in overworld
  if (spritePath.includes('back') || spritePath.includes('fwd') || 
      spritePath.includes('right') || spritePath.includes('left')) {
    
    if (debug) console.log("🏃 Detected movement sprite:", spritePath);
    
    // Fix paths starting with ./public/ to use public/ instead
    if (spritePath.startsWith('./public/')) {
      return spritePath.replace('./public/', 'public/');
    }
    
    // Ensure it starts with public/ if needed
    if (!spritePath.startsWith('public/') && !spritePath.startsWith('/public/')) {
      return 'public/' + spritePath;
    }
    
    return spritePath;
  }
  
  // CASE 7: Default to fallback
  if (debug) console.warn("⚠️ Using fallback imgur URL for sprite:", spritePath);
  return DEFAULT_SPRITE;
}

/**
 * Adds CSS to fix sprite visibility issues
 */
function injectSpriteFixStyles() {
  // Only inject once
  if (document.getElementById('sprite-fix-styles')) return;
  
  const styleEl = document.createElement('style');
  styleEl.id = 'sprite-fix-styles';
  styleEl.textContent = `
    /* Battle sprite visibility fixes */
    #player-sprite-container {
      position: absolute !important;
      left: 10% !important;
      bottom: 35% !important;
      width: 220px !important;
      height: 220px !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      z-index: 10 !important;
    }
    
    #player-sprite {
      width: 100% !important;
      height: 100% !important;
      object-fit: contain !important;
      visibility: visible !important;
      opacity: 1 !important;
      display: block !important;
    }
    
    #opponent-sprite-container {
      position: absolute !important;
      right: 10% !important;
      top: 15% !important;
      width: 160px !important;
      height: 160px !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      z-index: 10 !important;
    }
    
    #opponent-sprite {
      width: 100% !important;
      height: 100% !important;
      object-fit: contain !important;
      visibility: visible !important;
      opacity: 1 !important;
      display: block !important;
    }
  `;
  
  document.head.appendChild(styleEl);
  console.log("Sprite fix styles injected");
}

/**
 * Checks if sprite elements exist and displays them correctly
 */
function ensureSpriteVisibility() {
  // For player sprite
  const playerSprite = document.getElementById('player-sprite');
  const playerContainer = document.getElementById('player-sprite-container');
  
  if (playerSprite && window.activePlayerCharacter) {
    playerSprite.src = standardizeSpritePath(window.activePlayerCharacter.sprite);
    playerSprite.style.display = 'block';
    playerSprite.style.visibility = 'visible';
    playerSprite.style.opacity = '1';
  }
  
  if (playerContainer) {
    playerContainer.style.display = 'flex';
    playerContainer.style.visibility = 'visible';
    playerContainer.style.opacity = '1';
  }
  
  // For opponent sprite
  const opponentSprite = document.getElementById('opponent-sprite');
  const opponentContainer = document.getElementById('opponent-sprite-container');
  
  if (opponentSprite && window.activeOpponent) {
    opponentSprite.src = standardizeSpritePath(window.activeOpponent.sprite);
    opponentSprite.style.display = 'block';
    opponentSprite.style.visibility = 'visible';
    opponentSprite.style.opacity = '1';
  }
  
  if (opponentContainer) {
    opponentContainer.style.display = 'flex';
    opponentContainer.style.visibility = 'visible';
    opponentContainer.style.opacity = '1';
  }
  
  console.log("Sprite visibility enforced");
}

/**
 * Debug function to help diagnose sprite issues
 */
function debugSpritePaths(playerTeam, opponentTeam) {
  console.group('===== SPRITE PATH DEBUGGING =====');
  console.log('Game Mode:', window.currentGameMode || 'unknown');
  
  if (playerTeam && Array.isArray(playerTeam)) {
    console.log('Player Team Sprites:');
    playerTeam.forEach((char, idx) => {
      console.log(`  ${idx}. ${char.name}: ${char.sprite || 'undefined'}`);
      if (char.sprite) {
        const standardizedPath = standardizeSpritePath(char.sprite);
        if (standardizedPath !== char.sprite) {
          console.warn(`     Non-standardized! Should be: ${standardizedPath}`);
        }
      }
    });
  } else {
    console.warn('No valid player team found!');
  }
  
  if (opponentTeam && Array.isArray(opponentTeam)) {
    console.log('Opponent Team Sprites:');
    opponentTeam.forEach((char, idx) => {
      console.log(`  ${idx}. ${char.name}: ${char.sprite || 'undefined'}`);
      if (char.sprite) {
        const standardizedPath = standardizeSpritePath(char.sprite);
        if (standardizedPath !== char.sprite) {
          console.warn(`     Non-standardized! Should be: ${standardizedPath}`);
        }
      }
    });
  } else if (window.activeOpponent) {
    console.log('Active Opponent Sprite:');
    console.log(`  ${window.activeOpponent.name}: ${window.activeOpponent.sprite || 'undefined'}`);
    if (window.activeOpponent.sprite) {
      const standardizedPath = standardizeSpritePath(window.activeOpponent.sprite);
      if (standardizedPath !== window.activeOpponent.sprite) {
        console.warn(`     Non-standardized! Should be: ${standardizedPath}`);
      }
    }
  } else {
    console.warn('No valid opponent team or active opponent found!');
  }
  
  // Check DOM elements
  console.log('Player sprite element:', document.getElementById('player-sprite'));
  console.log('Player sprite container:', document.getElementById('player-sprite-container'));
  console.log('Opponent sprite element:', document.getElementById('opponent-sprite'));
  console.log('Opponent sprite container:', document.getElementById('opponent-sprite-container'));
  
  console.groupEnd();
}

// Expose functions globally
window.standardizeSpritePath = standardizeSpritePath;
window.injectSpriteFixStyles = injectSpriteFixStyles;
window.ensureSpriteVisibility = ensureSpriteVisibility;
window.debugSpritePaths = debugSpritePaths;

// Automatically inject sprite fix styles when this script loads
document.addEventListener('DOMContentLoaded', () => {
  console.log("Sprite helpers loaded - injecting styles");
  injectSpriteFixStyles();
});