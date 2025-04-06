// ================ AUDIO CONFIGURATION ================
// Audio URLs
const AUDIO = {
  menuMusic: "https://audio.jukehost.co.uk/nMJQi5KbwFgvSdkPEfRZW5WLPQrK2ZUu",
  battleMusic: "https://audio.jukehost.co.uk/D2O32Qb2y6tpAXHw8c35FYoHRJzXoRbG", 
  hitSound: "https://audio.jukehost.co.uk/8tUlDNLpvRgMxmbO1IXqubCDEOXTkvOm",
  successSound: "https://audio.jukehost.co.uk/YXtQw8hsDwVXXqkPoDQwfPrpJ36PnqjB",
  switchSound: "https://audio.jukehost.co.uk/9E15JVLzv4uKcTgUy6yUYkCRaS6htByd"
};

// Audio objects
let menuMusicPlayer = null;
let battleMusicPlayer = null;
let hitSoundPlayer = null;
let successSoundPlayer = null;
let switchSoundPlayer = null;

// Audio state
let musicMuted = false;
let soundMuted = false;
let audioInitialized = false; // Track if audio is initialized

// Animation state management
const ANIMATION_STATE = {
  player: {
    default: "float 2s ease-in-out infinite",
    attack: "attack 1s ease-in-out",
    current: "float 2s ease-in-out infinite"
  },
  opponent: {
    default: "float 2s ease-in-out infinite", // Will be flipped with transform
    attack: "attack 1s ease-in-out",
    current: "float 2s ease-in-out infinite"
  }
};

// Animation helper functions
function setPlayerAnimation(animationType) {
  const playerSprite = document.getElementById("player-sprite");
  if (!playerSprite) return;
  
  const animation = ANIMATION_STATE.player[animationType] || ANIMATION_STATE.player.default;
  playerSprite.style.animation = animation;
  ANIMATION_STATE.player.current = animation;
}

function setOpponentAnimation(animationType) {
  const opponentSprite = document.getElementById("opponent-sprite");
  if (!opponentSprite) return;
  
  const animation = ANIMATION_STATE.opponent[animationType] || ANIMATION_STATE.opponent.default;
  opponentSprite.style.animation = animation;
  ANIMATION_STATE.opponent.current = animation;
  
  // Ensure the opponent is always flipped
  opponentSprite.style.transform = "scaleX(-1)";
}