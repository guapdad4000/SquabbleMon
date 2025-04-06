// ================ GAME DATA ================
// Character data with battle info
const characters = [
  {
    id: 1,
    name: "MC Crazy Legs",
    sprite: "/images/mc-crazy-legs.png",
    hp: 120,
    attack: 65,
    defense: 40,
    speed: 85,
    critRate: 0.1,
    type: "breaker",
    status: "normal",
    description: "Breakdance specialist with powerful spins and flips. Known for high-speed attacks.",
    moves: [
      { name: "Backflip", power: 40, accuracy: 95, type: "breaker", description: "Quick move with momentum, might cause 'Dazed' status." },
      { name: "Power Spin", power: 60, accuracy: 85, type: "breaker", description: "Moderate damage attack with spinning kicks." },
      { name: "Floor Freeze", power: 25, accuracy: 90, type: "status", description: "Slows opponent's moves by freezing the floor." },
      { name: "Headspin Fury", power: 70, accuracy: 75, type: "breaker", description: "Heavy attack with spinning head strikes." }
    ]
  },
  {
    id: 2,
    name: "DJ Scratch Master",
    sprite: "/images/dj-scratch.png",
    hp: 110,
    attack: 65,
    defense: 70,
    speed: 60,
    critRate: 0.15,
    type: "turntable",
    status: "normal",
    description: "Controls battle rhythm with vinyl precision. Can boost team's performance.",
    moves: [
      { name: "Beat Drop", power: 50, accuracy: 90, type: "turntable", description: "Drops heavy beats that deal solid damage." },
      { name: "Wax Cutter", power: 65, accuracy: 85, type: "turntable", description: "Sharp vinyl attack that may cause bleeding." },
      { name: "Sample Loop", power: 30, accuracy: 95, type: "status", description: "Causes 'Confused' status, opponent moves erratically." },
      { name: "Bass Cannon", power: 80, accuracy: 70, type: "turntable", description: "Massive sound wave blast with area effect." }
    ]
  },
  {
    id: 3,
    name: "Graffiti King",
    sprite: "/images/graffiti-king.png",
    hp: 100,
    attack: 80,
    defense: 45,
    speed: 65,
    critRate: 0.15,
    type: "spray",
    status: "normal",
    description: "Master of aerosol combat. His attacks can cause 'Blinded' status and visual confusion.",
    moves: [
      { name: "Tag Attack", power: 35, accuracy: 90, type: "spray", description: "Quick spray that marks opponent, causing DoT damage." },
      { name: "Chrome Blast", power: 60, accuracy: 85, type: "spray", description: "Metallic paint bomb with reflective damage." },
      { name: "Wall Bomb", power: 70, accuracy: 80, type: "spray", description: "Large-scale tag that overwhelms defenses." },
      { name: "Fade Style", power: 55, accuracy: 90, type: "status", description: "Fades opponent's visibility, reducing accuracy." }
    ]
  },
  {
    id: 4,
    name: "Beatbox Wizard",
    sprite: "/images/beatbox-wizard.png",
    hp: 95,
    attack: 70,
    defense: 45,
    speed: 90,
    critRate: 0.2,
    type: "vocal",
    status: "normal",
    description: "Human sound machine with rapid-fire vocal attacks. High critical hit rate.",
    moves: [
      { name: "Vocal Jab", power: 45, accuracy: 95, type: "vocal", description: "Quick burst of sound with high crit chance." },
      { name: "Bass Drop", power: 65, accuracy: 85, type: "vocal", description: "Low frequency attack that shakes defenses." },
      { name: "Sound Clone", power: 55, accuracy: 90, type: "vocal", description: "Creates sound duplicates that confuse opponents." },
      { name: "Sonic Boom", power: 80, accuracy: 75, type: "vocal", description: "Massive sonic attack with high damage but risky accuracy." }
    ]
  },
  {
    id: 5,
    name: "Flow Master",
    sprite: "/images/flow-master.png",
    hp: 105,
    attack: 75,
    defense: 60,
    speed: 65,
    critRate: 0.1,
    type: "lyrical",
    status: "normal",
    description: "Conscious lyricist with balanced stats and wordplay abilities that boost stats.",
    moves: [
      { name: "Word Play", power: 50, accuracy: 90, type: "lyrical", description: "Clever rhymes deal solid damage." },
      { name: "Battle Verse", power: 65, accuracy: 85, type: "lyrical", description: "Strong verbal assault with increased crit chance." },
      { name: "Ego Check", power: 40, accuracy: 100, type: "status", description: "Never misses. Lowers opponent's ATK." },
      { name: "Mic Drop", power: 70, accuracy: 80, type: "lyrical", description: "Finisher move with stunning effect." }
    ]
  },
  {
    id: 6,
    name: "Street Styler",
    sprite: "/images/street-styler.png",
    hp: 90,
    attack: 65,
    defense: 40,
    speed: 95,
    critRate: 0.15,
    type: "fashion",
    status: "normal",
    description: "Hip-hop fashion icon with extremely fast attacks. Lower HP but hard to hit.",
    moves: [
      { name: "Fresh Kicks", power: 40, accuracy: 95, type: "fashion", description: "Quick sneaker attack, might cause knockback." },
      { name: "Chain Whip", power: 50, accuracy: 90, type: "fashion", description: "Medium damage with gold chain weapons." },
      { name: "Style Blitz", power: 70, accuracy: 75, type: "fashion", description: "Strong but risky style combination attack." },
      { name: "Hype Beast", power: 30, accuracy: 100, type: "status", description: "Increases own speed while confusing opponent." }
    ]
  },
  {
    id: 7,
    name: "Boom Bap",
    sprite: "/images/boom-bap.png",
    hp: 115,
    attack: 85,
    defense: 55,
    speed: 50,
    critRate: 0.15,
    type: "percussion",
    status: "normal",
    description: "Old school rhythm keeper. High attack and defense but slower moving.",
    moves: [
      { name: "Snare Hit", power: 55, accuracy: 90, type: "percussion", description: "Sharp attack with bleeding effect." },
      { name: "Drum Break", power: 70, accuracy: 85, type: "percussion", description: "Powerful attack that ignores some DEF." },
      { name: "Beat Pattern", power: 60, accuracy: 90, type: "percussion", description: "Consistent damage dealer with rhythm." },
      { name: "Tempo Up", power: 40, accuracy: 95, type: "status", description: "Raises team ATK and SPD but lowers DEF." }
    ]
  },
  {
    id: 8,
    name: "Mixtape Master",
    sprite: "/images/mixtape-master.png",
    hp: 110,
    attack: 70,
    defense: 65,
    speed: 60,
    critRate: 0.1,
    type: "producer",
    status: "normal",
    description: "Versatile producer with balanced stats. Can switch styles for different effects.",
    moves: [
      { name: "Track Drop", power: 45, accuracy: 95, type: "producer", description: "Quick release that rarely misses." },
      { name: "Remix", power: 50, accuracy: 90, type: "status", description: "Alters battle flow, raises team's DEF and heals slightly." },
      { name: "Beat Switch", power: 65, accuracy: 85, type: "producer", description: "Strong attack with self ATK boost." },
      { name: "Golden Era", power: 75, accuracy: 80, type: "producer", description: "Classic sound blast with stun effect." }
    ]
  }
];

// Enemy (Opponent) data
const opponents = [
  {
    id: 101,
    name: "Copycat",
    sprite: "/images/copycat.png",
    hp: 85,
    attack: 60,
    defense: 30,
    speed: 75,
    critRate: 0.05,
    type: "biter",
    description: "Steals other people's styles. No originality but dangerous imitations.",
    moves: [
      { name: "Style Theft", power: 40, accuracy: 85, type: "biter" },
      { name: "Fake Move", power: 55, accuracy: 80, type: "biter" },
      { name: "Imitation", power: 30, accuracy: 100, type: "status" },
      { name: "Plagiarism", power: 60, accuracy: 70, type: "biter" }
    ],
    ai: "aggressive"
  },
  {
    id: 102,
    name: "Pop Sellout",
    sprite: "/images/pop-sellout.png",
    hp: 95,
    attack: 65,
    defense: 40,
    speed: 70,
    critRate: 0.1,
    type: "commercial",
    description: "Abandoned underground roots for mainstream success. Flashy but shallow.",
    moves: [
      { name: "Chart Topper", power: 50, accuracy: 85, type: "commercial" },
      { name: "Genre Flip", power: 40, accuracy: 90, type: "status" },
      { name: "Radio Play", power: 55, accuracy: 85, type: "commercial" },
      { name: "Sellout Anthem", power: 70, accuracy: 75, type: "commercial" }
    ],
    ai: "balanced"
  },
  {
    id: 103,
    name: "Internet Troll",
    sprite: "/images/internet-troll.png",
    hp: 90,
    attack: 30,
    defense: 60,
    speed: 45,
    critRate: 0.05,
    type: "digital",
    description: "Online instigator who stirs up drama but can't back it up in person.",
    moves: [
      { name: "Comment Section", power: 30, accuracy: 95, type: "digital" },
      { name: "Keyboard Warrior", power: 20, accuracy: 100, type: "digital" },
      { name: "Ratio'd", power: 45, accuracy: 85, type: "digital" },
      { name: "Cancel Culture", power: 50, accuracy: 80, type: "status" }
    ],
    ai: "defensive"
  },
  {
    id: 104,
    name: "One-Hit Wonder",
    sprite: "/images/one-hit-wonder.png",
    hp: 75,
    attack: 40,
    defense: 30,
    speed: 60,
    critRate: 0.05,
    type: "flash",
    description: "Had one big song years ago. Still riding that wave but fading fast.",
    moves: [
      { name: "That One Song", power: 25, accuracy: 100, type: "flash" },
      { name: "Remember Me?", power: 35, accuracy: 90, type: "flash" },
      { name: "Nostalgia Trip", power: 40, accuracy: 85, type: "status" },
      { name: "Comeback Attempt", power: 50, accuracy: 80, type: "flash" }
    ],
    ai: "random"
  },
  {
    id: 105,
    name: "Mumble Rapper",
    sprite: "/images/mumble-rapper.png",
    hp: 85,
    attack: 55,
    defense: 35,
    speed: 65,
    critRate: 0.1,
    type: "mumble",
    description: "No one can understand what they're saying, but somehow still popular.",
    moves: [
      { name: "Unintelligible Verse", power: 45, accuracy: 90, type: "mumble" },
      { name: "Auto-Tune Overload", power: 40, accuracy: 95, type: "mumble" },
      { name: "Slurred Words", power: 15, accuracy: 100, type: "status" },
      { name: "Lean Sipping", power: 60, accuracy: 80, type: "mumble" }
    ],
    ai: "aggressive"
  }
];

// Type effectiveness chart
const typeEffectiveness = {
  // Player types
  breaker: { biter: 1.2, digital: 0.8, commercial: 1.5, flash: 1.0 },
  turntable: { commercial: 1.2, mumble: 1.5, biter: 0.8, digital: 1.0 },
  spray: { digital: 1.5, flash: 1.2, commercial: 0.8, biter: 1.0 },
  vocal: { mumble: 1.5, flash: 0.8, digital: 1.2, commercial: 1.0 },
  lyrical: { mumble: 1.5, biter: 1.2, flash: 0.8, digital: 1.0 },
  fashion: { flash: 1.5, commercial: 1.2, mumble: 0.8, biter: 1.0 },
  percussion: { digital: 0.8, flash: 1.5, biter: 1.2, commercial: 1.0 },
  producer: { biter: 1.5, digital: 1.2, flash: 0.8, mumble: 1.0 },
  // Enemy types
  biter: { breaker: 0.8, producer: 0.5, lyrical: 1.5, percussion: 1.2 },
  commercial: { turntable: 0.8, fashion: 0.8, spray: 1.5, breaker: 1.2 },
  digital: { spray: 0.5, vocal: 0.8, percussion: 1.5, producer: 1.2 },
  flash: { fashion: 0.5, percussion: 0.8, vocal: 1.5, producer: 1.2 },
  mumble: { lyrical: 0.5, vocal: 0.8, turntable: 1.5, fashion: 1.2 }
};

// Status effect definitions
const statusEffects = {
  normal: { name: "Normal", effect: null, icon: "" },
  slimed: { 
    name: "Slimed", 
    effect: "defDown", 
    value: 0.8, 
    duration: 3, 
    icon: "🤮", 
    description: "Defense decreased by 20%" 
  },
  dazed: { 
    name: "Dazed", 
    effect: "accDown", 
    value: 0.8, 
    duration: 2, 
    icon: "😵", 
    description: "Accuracy decreased by 20%" 
  },
  dirtySprite: { 
    name: "Dirty Sprite", 
    effect: "dot", 
    value: 5, 
    duration: 3, 
    icon: "🥤", 
    description: "Takes 5 damage each turn" 
  },
  baked: { 
    name: "Baked", 
    effect: "spdDown", 
    value: 0.7, 
    duration: 3, 
    icon: "🍃", 
    description: "Speed decreased by 30%" 
  },
  confused: { 
    name: "Confused", 
    effect: "confusion", 
    value: 0.3, 
    duration: 2, 
    icon: "🥴", 
    description: "30% chance to hit yourself" 
  },
  bleeding: { 
    name: "Bleeding", 
    effect: "dot", 
    value: 8, 
    duration: 2, 
    icon: "🩸", 
    description: "Takes 8 damage each turn" 
  },
  charmed: { 
    name: "Charmed", 
    effect: "atkDown", 
    value: 0.7, 
    duration: 2, 
    icon: "😍", 
    description: "Attack decreased by 30%" 
  }
};

// Item effects
const items = {
  jcole: {
    name: "J Cole CD",
    effect: "heal",
    value: 30,
    description: "Heals 30 HP with positive vibes"
  },
  nbayoungboy: {
    name: "NBA Youngboy CD",
    effect: "atkUp",
    value: 1.3,
    duration: 3,
    description: "Raises Attack by 30% for 3 turns"
  },
  weed: {
    name: "Weed",
    effect: "statusCure",
    description: "Cures status effects and gives slight HP boost"
  },
  crashdummy: {
    name: "Crash Dummy",
    effect: "defUp",
    value: 1.5,
    duration: 2,
    description: "Raises Defense by 50% for 2 turns"
  }
};

// Background images for battle scenes
const battleBackgrounds = [
  "https://i.imgur.com/F9vtpJJ.png", // Street
  "https://i.imgur.com/TxYXmcL.png", // Studio
  "https://i.imgur.com/IM883ID.png", // Stage
  "https://i.imgur.com/l3eoGIc.png"  // Club
];

// Win/Lose GIFs
const resultGifs = {
  win: [
    "https://i.imgur.com/GEXD7bk.gif",
    "https://i.imgur.com/tzvjhq5.gif",
    "https://i.imgur.com/DltUedT.gif"
  ],
  lose: [
    "https://i.imgur.com/dR3qDnS.gif",
    "https://i.imgur.com/i4JWxGP.gif",
    "https://i.imgur.com/EWPNbVH.gif"
  ]
};

// ================ GAME STATE ================
// Global game state variables
let playerTeam = [];
let activePlayerCharacter = null;
let activeOpponent = null;
let battleLog = [];
let gameActive = false;
let currentTurn = "player"; // player or opponent
let fadeCount = 0;
let opponentIndex = 0;
let playerStatModifiers = { attack: 1, defense: 1, speed: 1, accuracy: 1 };
let opponentStatModifiers = { attack: 1, defense: 1, speed: 1, accuracy: 1 };
let playerStatusEffect = { type: "normal", duration: 0 };
let opponentStatusEffect = { type: "normal", duration: 0 };
let itemUseCounts = { jcole: 2, nbayoungboy: 2, weed: 2, crashdummy: 1 };
let canAct = true; // For preventing action during animations

// ================ INITIALIZATION ================
// Initialize the game when the page loads
document.addEventListener("DOMContentLoaded", initGame);

function initGame() {
  populateCharacterSelection();
  setupMoveTooltips();
  // Reset game state
  playerTeam = [];
  fadeCount = 0;
  opponentIndex = 0;
  updateFadeDisplay();
}

function populateCharacterSelection() {
  const characterList = document.getElementById("character-list");
  characterList.innerHTML = "";
  
  characters.forEach(character => {
    const card = document.createElement("div");
    card.className = "character-card";
    card.dataset.id = character.id;
    card.innerHTML = `
      <img src="${character.sprite}" alt="${character.name}">
      <p>${character.name}</p>
    `;
    card.addEventListener("click", () => selectCharacter(character));
    characterList.appendChild(card);
  });
}

function selectCharacter(character) {
  if (playerTeam.length >= 3) {
    showFloatingLog("You can only pick 3 YNs!");
    return;
  }
  
  // Check if character is already selected
  if (playerTeam.some(c => c.id === character.id)) {
    // Remove from team if already selected
    playerTeam = playerTeam.filter(c => c.id !== character.id);
    document.querySelector(`.character-card[data-id="${character.id}"]`).classList.remove("selected");
  } else {
    // Add to team
    playerTeam.push(character);
    document.querySelector(`.character-card[data-id="${character.id}"]`).classList.add("selected");
  }
  
  updateTeamSlots();
  
  // Enable/disable start button
  document.getElementById("start-battle").disabled = playerTeam.length !== 3;
}

function updateTeamSlots() {
  const slots = document.querySelectorAll(".team-slot");
  
  // Clear all slots
  slots.forEach(slot => {
    slot.innerHTML = "";
  });
  
  // Fill slots with selected characters
  playerTeam.forEach((character, index) => {
    if (index < slots.length) {
      slots[index].innerHTML = `<img src="${character.sprite}" alt="${character.name}">`;
    }
  });
}

function startBattle() {
  if (playerTeam.length !== 3) return;
  
  // Setup battle screen
  document.getElementById("selection-screen").style.display = "none";
  document.getElementById("battle-screen").style.display = "flex";
  
  // Choose a random background
  const randomBg = battleBackgrounds[Math.floor(Math.random() * battleBackgrounds.length)];
  document.getElementById("battle-arena").style.backgroundImage = `url(${randomBg})`;
  
  // Initialize battle
  gameActive = true;
  
  // Set active characters
  activePlayerCharacter = { ...playerTeam[0] };
  activeOpponent = { ...opponents[opponentIndex] };
  
  // Reset stat modifiers and status effects
  resetBattleModifiers();
  
  // Update UI
  updateBattleUI();
  updateStatusIcons();
  updateMoveButtons();
  updateItemButtons();
  
  // Determine first turn
  currentTurn = determineFirstTurn();
  
  // Add to battle log
  addToBattleLog(`Battle started! ${activePlayerCharacter.name} vs ${activeOpponent.name}!`);
  
  // Start the first turn after a short delay
  setTimeout(() => {
    processTurn();
  }, 1000);
}

function resetBattleModifiers() {
  playerStatModifiers = { attack: 1, defense: 1, speed: 1, accuracy: 1 };
  opponentStatModifiers = { attack: 1, defense: 1, speed: 1, accuracy: 1 };
  playerStatusEffect = { type: "normal", duration: 0 };
  opponentStatusEffect = { type: "normal", duration: 0 };
  itemUseCounts = { jcole: 2, nbayoungboy: 2, weed: 2, crashdummy: 1 };
  canAct = true;
}

function determineFirstTurn() {
  // Calculate effective speed considering modifiers and status effects
  const playerSpeed = activePlayerCharacter.speed * playerStatModifiers.speed;
  const opponentSpeed = activeOpponent.speed * opponentStatModifiers.speed;
  
  // Add a small random factor (0-10% of speed)
  const playerSpeedRandom = playerSpeed * (1 + Math.random() * 0.1);
  const opponentSpeedRandom = opponentSpeed * (1 + Math.random() * 0.1);
  
  // Return whoever is faster
  return playerSpeedRandom >= opponentSpeedRandom ? "player" : "opponent";
}

function updateBattleUI() {
  // Update player character display
  document.getElementById("player-name").textContent = activePlayerCharacter.name;
  document.getElementById("player-hp").textContent = `${activePlayerCharacter.hp}/${playerTeam[playerTeam.findIndex(c => c.id === activePlayerCharacter.id)].hp}`;
  document.getElementById("player-sprite").src = activePlayerCharacter.sprite;
  
  // Update opponent display
  document.getElementById("opponent-name").textContent = activeOpponent.name;
  document.getElementById("opponent-hp").textContent = `${activeOpponent.hp}/${opponents[opponentIndex].hp}`;
  document.getElementById("opponent-sprite").src = activeOpponent.sprite;
  
  // Update HP bars
  const playerMaxHP = playerTeam[playerTeam.findIndex(c => c.id === activePlayerCharacter.id)].hp;
  const opponentMaxHP = opponents[opponentIndex].hp;
  
  document.getElementById("player-hp-fill").style.width = `${(activePlayerCharacter.hp / playerMaxHP) * 100}%`;
  document.getElementById("opponent-hp-fill").style.width = `${(activeOpponent.hp / opponentMaxHP) * 100}%`;
  
  // Update opponent info box
  document.getElementById("opponent-info-text").textContent = activeOpponent.description;
}

function updateStatusIcons() {
  // Update player status
  const playerStatusIcon = document.getElementById("player-status-icon");
  if (playerStatusEffect.type !== "normal" && playerStatusEffect.duration > 0) {
    playerStatusIcon.textContent = statusEffects[playerStatusEffect.type].icon;
    playerStatusIcon.title = statusEffects[playerStatusEffect.type].description;
    playerStatusIcon.style.display = "inline-block";
  } else {
    playerStatusIcon.textContent = "";
    playerStatusIcon.style.display = "none";
  }
  
  // Update opponent status
  const opponentStatusIcon = document.getElementById("opponent-status-icon");
  if (opponentStatusEffect.type !== "normal" && opponentStatusEffect.duration > 0) {
    opponentStatusIcon.textContent = statusEffects[opponentStatusEffect.type].icon;
    opponentStatusIcon.title = statusEffects[opponentStatusEffect.type].description;
    opponentStatusIcon.style.display = "inline-block";
  } else {
    opponentStatusIcon.textContent = "";
    opponentStatusIcon.style.display = "none";
  }
}

function updateMoveButtons() {
  const movesContainer = document.getElementById("moves");
  movesContainer.innerHTML = "";
  
  activePlayerCharacter.moves.forEach(move => {
    const moveButton = document.createElement("button");
    moveButton.className = "pixel-button";
    moveButton.textContent = move.name;
    moveButton.dataset.move = JSON.stringify(move);
    moveButton.addEventListener("click", () => useMove(move));
    moveButton.addEventListener("mouseover", showMoveTooltip);
    moveButton.addEventListener("mouseout", hideMoveTooltip);
    movesContainer.appendChild(moveButton);
  });
}

function updateItemButtons() {
  const itemButtons = document.querySelectorAll("#items button:not(#toggle-switch)");
  
  itemButtons.forEach(button => {
    const itemType = button.getAttribute("onclick").match(/'([^']+)'/)[1];
    if (itemUseCounts[itemType] <= 0) {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  });
}

function updateFadeDisplay() {
  document.getElementById("fade-display").textContent = `Fades: ${fadeCount}`;
}

function setupMoveTooltips() {
  const moveTooltip = document.getElementById("move-tooltip");
  if (!moveTooltip) {
    const tooltip = document.createElement("div");
    tooltip.id = "move-tooltip";
    tooltip.style.display = "none";
    document.body.appendChild(tooltip);
  }
}

function showMoveTooltip(e) {
  const moveData = JSON.parse(e.target.dataset.move);
  const tooltip = document.getElementById("move-tooltip");
  
  tooltip.innerHTML = `
    <p><strong>${moveData.name}</strong></p>
    <p>Type: ${moveData.type}</p>
    <p>Power: ${moveData.power}</p>
    <p>Accuracy: ${moveData.accuracy}%</p>
    <p>${moveData.description || ""}</p>
  `;
  
  tooltip.style.display = "block";
  tooltip.style.left = `${e.pageX + 10}px`;
  tooltip.style.top = `${e.pageY + 10}px`;
}

function hideMoveTooltip() {
  document.getElementById("move-tooltip").style.display = "none";
}

function processTurn() {
  if (!gameActive) return;
  
  if (currentTurn === "player") {
    // Check for confusion (player's turn)
    if (playerStatusEffect.type === "confused" && Math.random() < statusEffects.confused.value) {
      hitSelf(activePlayerCharacter);
      endPlayerTurn();
      return;
    }
    
    // Process status effects at the start of player's turn
    processStatusEffects(activePlayerCharacter, playerStatusEffect, "player");
    
  } else {
    // Check for confusion (opponent's turn)
    if (opponentStatusEffect.type === "confused" && Math.random() < statusEffects.confused.value) {
      hitSelf(activeOpponent);
      endOpponentTurn();
      return;
    }
    
    // Process status effects at the start of opponent's turn
    processStatusEffects(activeOpponent, opponentStatusEffect, "opponent");
    
    // AI chooses a move
    setTimeout(() => {
      const move = chooseOpponentMove();
      executeOpponentMove(move);
    }, 1000);
  }
}

function processStatusEffects(character, statusEffect, side) {
  if (statusEffect.type === "normal" || statusEffect.duration <= 0) return;
  
  // Process damage-over-time effects
  if (statusEffects[statusEffect.type].effect === "dot") {
    const damage = statusEffects[statusEffect.type].value;
    character.hp = Math.max(0, character.hp - damage);
    
    // Update UI
    updateBattleUI();
    addToBattleLog(`${character.name} took ${damage} damage from ${statusEffects[statusEffect.type].name}!`);
    showFloatingLog(`${statusEffects[statusEffect.type].name}: -${damage} HP`);
    
    // Check if character fainted
    if (character.hp <= 0) {
      if (side === "player") {
        handlePlayerFaint();
      } else {
        handleOpponentFaint();
      }
      return;
    }
  }
  
  // Decrease duration
  if (side === "player") {
    playerStatusEffect.duration--;
    if (playerStatusEffect.duration <= 0) {
      playerStatusEffect.type = "normal";
      addToBattleLog(`${character.name} recovered from ${statusEffects[statusEffect.type].name}!`);
      updateStatusIcons();
    }
  } else {
    opponentStatusEffect.duration--;
    if (opponentStatusEffect.duration <= 0) {
      opponentStatusEffect.type = "normal";
      addToBattleLog(`${character.name} recovered from ${statusEffects[statusEffect.type].name}!`);
      updateStatusIcons();
    }
  }
}

function hitSelf(character) {
  // Calculate confusion damage (25% of their own attack with no modifiers)
  const damage = Math.floor(character.attack * 0.25);
  character.hp = Math.max(0, character.hp - damage);
  
  addToBattleLog(`${character.name} is confused and hit themselves for ${damage} damage!`);
  showFloatingLog("Confused! Hit self!");
  
  // Add animation
  if (character === activePlayerCharacter) {
    const sprite = document.getElementById("player-sprite");
    sprite.classList.add("player-shake-animation");
    sprite.classList.add("hit-flash");
    
    setTimeout(() => {
      sprite.classList.remove("player-shake-animation");
      sprite.classList.remove("hit-flash");
    }, 500);
  } else {
    const sprite = document.getElementById("opponent-sprite");
    sprite.classList.add("shake-animation");
    sprite.classList.add("hit-flash");
    
    setTimeout(() => {
      sprite.classList.remove("shake-animation");
      sprite.classList.remove("hit-flash");
    }, 500);
  }
  
  // Update UI
  updateBattleUI();
  
  // Check if character fainted
  if (character.hp <= 0) {
    if (character === activePlayerCharacter) {
      handlePlayerFaint();
    } else {
      handleOpponentFaint();
    }
  }
}

function useMove(move) {
  if (!canAct || currentTurn !== "player") return;
  canAct = false;
  
  addToBattleLog(`${activePlayerCharacter.name} used ${move.name}!`);
  
  // Attack animation
  const playerSprite = document.getElementById("player-sprite");
  playerSprite.classList.add("attack-animation");
  
  // Check accuracy including status effects
  const effectiveAccuracy = move.accuracy * playerStatModifiers.accuracy;
  if (Math.random() * 100 > effectiveAccuracy) {
    // Miss
    addToBattleLog(`${activePlayerCharacter.name}'s attack missed!`);
    showFloatingLog("MISSED!");
    setTimeout(() => endPlayerTurn(), 1000);
    
    // Remove animation
    setTimeout(() => {
      playerSprite.classList.remove("attack-animation");
      canAct = true;
    }, 500);
    return;
  }
  
  // Handle status moves differently
  if (move.type === "status") {
    handleStatusMove(move, "player");
    setTimeout(() => endPlayerTurn(), 1000);
    
    // Remove animation
    setTimeout(() => {
      playerSprite.classList.remove("attack-animation");
      canAct = true;
    }, 500);
    return;
  }
  
  // Calculate damage
  const damage = calculateDamage(
    activePlayerCharacter,
    activeOpponent,
    move,
    playerStatModifiers,
    opponentStatModifiers
  );
  
  // Apply damage
  setTimeout(() => {
    activeOpponent.hp = Math.max(0, activeOpponent.hp - damage);
    updateBattleUI();
    
    // Show damage in battle log
    addToBattleLog(`${activePlayerCharacter.name} dealt ${damage} damage to ${activeOpponent.name}!`);
    
    // Show effectiveness message if applicable
    const effectiveness = calculateTypeEffectiveness(move.type, activeOpponent.type);
    let message = `${damage} damage!`;
    if (effectiveness > 1.2) {
      message = `Super effective! ${damage} damage!`;
    } else if (effectiveness < 0.8) {
      message = `Not very effective... ${damage} damage.`;
    }
    showFloatingLog(message);
    
    // Apply potential hit effects (status changes, etc.)
    applyHitEffects(move, "player");
    
    // Show opponent reaction
    const opponentSprite = document.getElementById("opponent-sprite");
    opponentSprite.classList.add("shake-animation");
    opponentSprite.classList.add("hit-flash");
    
    setTimeout(() => {
      opponentSprite.classList.remove("shake-animation");
      opponentSprite.classList.remove("hit-flash");
    }, 500);
    
    // Check if opponent fainted
    if (activeOpponent.hp <= 0) {
      handleOpponentFaint();
    } else {
      setTimeout(() => endPlayerTurn(), 1000);
    }
    
    // Remove animation
    playerSprite.classList.remove("attack-animation");
    canAct = true;
  }, 500);
}

function executeOpponentMove(move) {
  if (!gameActive || currentTurn !== "opponent") return;
  
  addToBattleLog(`${activeOpponent.name} used ${move.name}!`);
  
  // Attack animation
  const opponentSprite = document.getElementById("opponent-sprite");
  opponentSprite.classList.add("attack-animation-reverse");
  
  // Check accuracy including status effects
  const effectiveAccuracy = move.accuracy * opponentStatModifiers.accuracy;
  if (Math.random() * 100 > effectiveAccuracy) {
    // Miss
    addToBattleLog(`${activeOpponent.name}'s attack missed!`);
    showFloatingLog("MISSED!");
    setTimeout(() => endOpponentTurn(), 1000);
    
    // Remove animation
    setTimeout(() => {
      opponentSprite.classList.remove("attack-animation-reverse");
    }, 500);
    return;
  }
  
  // Handle status moves differently
  if (move.type === "status") {
    handleStatusMove(move, "opponent");
    setTimeout(() => endOpponentTurn(), 1000);
    
    // Remove animation
    setTimeout(() => {
      opponentSprite.classList.remove("attack-animation-reverse");
    }, 500);
    return;
  }
  
  // Calculate damage
  const damage = calculateDamage(
    activeOpponent,
    activePlayerCharacter,
    move,
    opponentStatModifiers,
    playerStatModifiers
  );
  
  // Apply damage
  setTimeout(() => {
    activePlayerCharacter.hp = Math.max(0, activePlayerCharacter.hp - damage);
    updateBattleUI();
    
    // Show damage in battle log
    addToBattleLog(`${activeOpponent.name} dealt ${damage} damage to ${activePlayerCharacter.name}!`);
    
    // Show effectiveness message if applicable
    const effectiveness = calculateTypeEffectiveness(move.type, activePlayerCharacter.type);
    let message = `${damage} damage!`;
    if (effectiveness > 1.2) {
      message = `Super effective! ${damage} damage!`;
    } else if (effectiveness < 0.8) {
      message = `Not very effective... ${damage} damage.`;
    }
    showFloatingLog(message);
    
    // Apply potential hit effects (status changes, etc.)
    applyHitEffects(move, "opponent");
    
    // Show player reaction
    const playerSprite = document.getElementById("player-sprite");
    playerSprite.classList.add("player-shake-animation");
    playerSprite.classList.add("hit-flash");
    
    setTimeout(() => {
      playerSprite.classList.remove("player-shake-animation");
      playerSprite.classList.remove("hit-flash");
    }, 500);
    
    // Check if player fainted
    if (activePlayerCharacter.hp <= 0) {
      handlePlayerFaint();
    } else {
      setTimeout(() => endOpponentTurn(), 1000);
    }
    
    // Remove animation
    opponentSprite.classList.remove("attack-animation-reverse");
  }, 500);
}

function calculateDamage(attacker, defender, move, attackerMods, defenderMods) {
  // Base damage calculation
  let damage = Math.floor((attacker.attack * attackerMods.attack * move.power) / 100);
  
  // Apply defense reduction
  damage = Math.floor(damage / (defender.defense * defenderMods.defense / 50));
  
  // Apply type effectiveness
  const effectiveness = calculateTypeEffectiveness(move.type, defender.type);
  damage = Math.floor(damage * effectiveness);
  
  // Add random factor (85-100% of calculated damage)
  damage = Math.floor(damage * (0.85 + Math.random() * 0.15));
  
  // Critical hit (based on attacker's critRate, typically 10-20%)
  if (Math.random() < attacker.critRate) {
    damage = Math.floor(damage * 1.5);
    addToBattleLog("A critical hit!");
    showFloatingLog("CRITICAL HIT!");
  }
  
  // Ensure minimum damage
  return Math.max(1, damage);
}

function calculateTypeEffectiveness(attackType, defenderType) {
  // Return 1 (neutral) if type matchup is not defined
  if (!typeEffectiveness[attackType] || !typeEffectiveness[attackType][defenderType]) {
    return 1.0;
  }
  
  return typeEffectiveness[attackType][defenderType];
}

function handleStatusMove(move, user) {
  // Apply different status effects based on the move and user
  if (user === "player") {
    switch (activePlayerCharacter.id) {
      case 1: // Young Thug
        applyStatusEffect(activeOpponent, "slimed", 3, "opponent");
        break;
      case 2: // Travis Scott
        applyStatusEffect(activeOpponent, "dazed", 2, "opponent");
        break;
      case 3: // Future
        if (move.name === "Purple Reign") {
          if (opponentStatusEffect.type === "dirtySprite") {
            addToBattleLog(`${activeOpponent.name}'s Dirty Sprite effect was extended!`);
            showFloatingLog("Status extended!");
          } else {
            applyStatusEffect(activeOpponent, "dirtySprite", 3, "opponent");
          }
        } else {
          applyStatusEffect(activeOpponent, "dirtySprite", 3, "opponent");
        }
        break;
      case 9: // Snoop Dogg
        applyStatusEffect(activeOpponent, "baked", 3, "opponent");
        break;
      case 6: // Playboi Carti
        applyStatusEffect(activeOpponent, "confused", 2, "opponent");
        break;
      case 7: // 21 Savage
        // Increase player ATK, but decrease DEF
        playerStatModifiers.attack *= 1.3;
        playerStatModifiers.defense *= 0.8;
        addToBattleLog(`${activePlayerCharacter.name}'s Attack rose but Defense fell!`);
        showFloatingLog("ATK ↑, DEF ↓");
        break;
      case 8: // Drake
        // Heal slightly and raise defense
        const healAmount = Math.floor(activePlayerCharacter.hp * 0.15);
        activePlayerCharacter.hp = Math.min(playerTeam[playerTeam.findIndex(c => c.id === activePlayerCharacter.id)].hp, activePlayerCharacter.hp + healAmount);
        playerStatModifiers.defense *= 1.2;
        updateBattleUI();
        addToBattleLog(`${activePlayerCharacter.name} healed ${healAmount} HP and Defense rose!`);
        showFloatingLog(`+${healAmount} HP, DEF ↑`);
        break;
      case 5: // Kendrick
        // Lower opponent's attack
        opponentStatModifiers.attack *= 0.7;
        addToBattleLog(`${activeOpponent.name}'s Attack was lowered!`);
        showFloatingLog("Opponent ATK ↓");
        break;
      case 10: // Kanye
        // Raise defense but might confuse opponent
        playerStatModifiers.defense *= 1.3;
        addToBattleLog(`${activePlayerCharacter.name}'s Defense rose!`);
        showFloatingLog("DEF ↑");
        
        if (Math.random() < 0.4) {
          applyStatusEffect(activeOpponent, "confused", 2, "opponent");
        }
        break;
    }
  } else {
    // Opponent's status moves
    switch (activeOpponent.id) {
      case 101: // 6ix9ine
        // Rainbow Hair - lower player attack
        playerStatModifiers.attack *= 0.8;
        addToBattleLog(`${activePlayerCharacter.name}'s Attack was lowered!`);
        showFloatingLog("ATK ↓");
        break;
      case 102: // MGK
        // Genre Switch - Apply confused status
        applyStatusEffect(activePlayerCharacter, "confused", 2, "player");
        break;
      case 103: // DJ Akademiks
        // Drama Alert - Apply confused status and raise own defense
        applyStatusEffect(activePlayerCharacter, "confused", 1, "player");
        opponentStatModifiers.defense *= 1.2;
        addToBattleLog(`${activeOpponent.name}'s Defense rose!`);
        showFloatingLog("Enemy DEF ↑");
        break;
      case 104: // Island Boys
        // Coconut Head - Lower player accuracy
        playerStatModifiers.accuracy *= 0.8;
        addToBattleLog(`${activePlayerCharacter.name}'s Accuracy was lowered!`);
        showFloatingLog("ACC ↓");
        break;
      case 105: // Lil Pump
        // Harvard Dropout - Random stat changes
        if (Math.random() < 0.5) {
          // Raise own attack
          opponentStatModifiers.attack *= 1.2;
          addToBattleLog(`${activeOpponent.name}'s Attack rose!`);
          showFloatingLog("Enemy ATK ↑");
        } else {
          // Lower own defense
          opponentStatModifiers.defense *= 0.9;
          addToBattleLog(`${activeOpponent.name}'s Defense fell!`);
          showFloatingLog("Enemy DEF ↓");
        }
        break;
    }
  }
}

function applyStatusEffect(character, statusType, duration, side) {
  // Apply status effect to the appropriate character
  if (side === "player") {
    playerStatusEffect.type = statusType;
    playerStatusEffect.duration = duration;
  } else {
    opponentStatusEffect.type = statusType;
    opponentStatusEffect.duration = duration;
  }
  
  // Log the status application
  addToBattleLog(`${character.name} was afflicted with ${statusEffects[statusType].name}!`);
  showFloatingLog(`${statusEffects[statusType].name} applied!`);
  
  // Update the status icons
  updateStatusIcons();
}

function applyHitEffects(move, user) {
  // Random chance to apply various effects based on move type and user
  const chance = Math.random();
  
  if (user === "player") {
    switch (activePlayerCharacter.id) {
      case 1: // Young Thug
        if (move.name === "Slatt" && chance < 0.3) {
          applyStatusEffect(activeOpponent, "slimed", 2, "opponent");
        }
        else if (move.name === "YSL Wave" && chance < 0.2) {
          // Recoil damage
          const recoilDamage = Math.floor(move.power * 0.1);
          activePlayerCharacter.hp = Math.max(0, activePlayerCharacter.hp - recoilDamage);
          updateBattleUI();
          addToBattleLog(`${activePlayerCharacter.name} took ${recoilDamage} recoil damage!`);
          showFloatingLog(`Recoil: -${recoilDamage} HP`);
        }
        break;
      case 2: // Travis Scott
        if (move.name === "Astro Thunder" && chance < 0.3) {
          applyStatusEffect(activeOpponent, "dazed", 2, "opponent");
        }
        else if (move.name === "Sicko Mode" && chance < 0.3) {
          // Increase attack
          playerStatModifiers.attack *= 1.1;
          addToBattleLog(`${activePlayerCharacter.name}'s Attack slightly rose!`);
          showFloatingLog("ATK ↑");
        }
        break;
      case 3: // Future
        if (move.name === "Dirty Sprite" && chance < 0.4) {
          applyStatusEffect(activeOpponent, "dirtySprite", 3, "opponent");
        }
        else if (move.name === "Mask Off" && chance < 0.3) {
          // Heal a bit
          const healAmount = Math.floor(move.power * 0.2);
          activePlayerCharacter.hp = Math.min(playerTeam[playerTeam.findIndex(c => c.id === activePlayerCharacter.id)].hp, activePlayerCharacter.hp + healAmount);
          updateBattleUI();
          addToBattleLog(`${activePlayerCharacter.name} drained ${healAmount} HP!`);
          showFloatingLog(`Drained: +${healAmount} HP`);
        }
        break;
      case 4: // Lil Uzi Vert
        if (move.name === "Baby Pluto" && chance < 0.3) {
          // Speed boost
          playerStatModifiers.speed *= 1.2;
          addToBattleLog(`${activePlayerCharacter.name}'s Speed rose!`);
          showFloatingLog("SPD ↑");
        }
        break;
      case 7: // 21 Savage
        if (move.name === "Knife Talk" && chance < 0.3) {
          applyStatusEffect(activeOpponent, "bleeding", 2, "opponent");
        }
        break;
      case 8: // Drake
        if (move.name === "Certified Lover" && chance < 0.3) {
          applyStatusEffect(activeOpponent, "charmed", 2, "opponent");
        }
        break;
    }
  } else {
    // Opponent hit effects can be added here if needed
    // Similar logic to player effects
  }
}

function endPlayerTurn() {
  if (!gameActive) return;
  currentTurn = "opponent";
  setTimeout(() => processTurn(), 1000);
}

function endOpponentTurn() {
  if (!gameActive) return;
  currentTurn = "player";
  
  // Re-enable buttons for player's turn
  canAct = true;
  
  // Update UI for item use counts
  updateItemButtons();
}

function chooseOpponentMove() {
  const moves = activeOpponent.moves;
  
  // Different AI behaviors
  switch (activeOpponent.ai) {
    case "aggressive":
      // Prioritize highest damage moves
      moves.sort((a, b) => b.power - a.power);
      // 70% chance to use one of the two strongest moves
      return Math.random() < 0.7 ? moves[0] : moves[Math.floor(Math.random() * moves.length)];
      
    case "defensive":
      // Prioritize status moves when HP is high, damage when low
      if (activeOpponent.hp > opponents[opponentIndex].hp * 0.7) {
        // More likely to use status moves
        const statusMoves = moves.filter(m => m.type === "status");
        if (statusMoves.length > 0 && Math.random() < 0.6) {
          return statusMoves[Math.floor(Math.random() * statusMoves.length)];
        }
      }
      // Otherwise use any move with preference to higher power
      moves.sort((a, b) => b.power - a.power);
      return moves[Math.floor(Math.random() * Math.min(3, moves.length))];
      
    case "balanced":
      // Mix of status and attack moves
      if (opponentStatusEffect.type === "normal" && Math.random() < 0.3) {
        // Try to use a status move if not already affected
        const statusMoves = moves.filter(m => m.type === "status");
        if (statusMoves.length > 0) {
          return statusMoves[Math.floor(Math.random() * statusMoves.length)];
        }
      }
      // Otherwise use any move
      return moves[Math.floor(Math.random() * moves.length)];
      
    case "random":
    default:
      // Completely random move selection
      return moves[Math.floor(Math.random() * moves.length)];
  }
}

function useItem(itemType) {
  if (!canAct || currentTurn !== "player" || itemUseCounts[itemType] <= 0) return;
  
  // Reduce item count
  itemUseCounts[itemType]--;
  updateItemButtons();
  
  const item = items[itemType];
  addToBattleLog(`${activePlayerCharacter.name} used ${item.name}!`);
  
  // Apply item effect
  switch (item.effect) {
    case "heal":
      const maxHp = playerTeam[playerTeam.findIndex(c => c.id === activePlayerCharacter.id)].hp;
      const healAmount = Math.min(item.value, maxHp - activePlayerCharacter.hp);
      activePlayerCharacter.hp = Math.min(maxHp, activePlayerCharacter.hp + item.value);
      addToBattleLog(`${activePlayerCharacter.name} recovered ${healAmount} HP!`);
      showFloatingLog(`Healed: +${healAmount} HP`);
      break;
      
    case "atkUp":
      playerStatModifiers.attack *= item.value;
      addToBattleLog(`${activePlayerCharacter.name}'s Attack rose sharply!`);
      showFloatingLog("ATK ↑↑");
      break;
      
    case "defUp":
      playerStatModifiers.defense *= item.value;
      addToBattleLog(`${activePlayerCharacter.name}'s Defense rose sharply!`);
      showFloatingLog("DEF ↑↑");
      break;
      
    case "statusCure":
      if (playerStatusEffect.type !== "normal") {
        addToBattleLog(`${activePlayerCharacter.name} was cured of ${statusEffects[playerStatusEffect.type].name}!`);
        showFloatingLog("Status cured!");
        playerStatusEffect.type = "normal";
        playerStatusEffect.duration = 0;
        updateStatusIcons();
        
        // Small HP recovery bonus
        const cureHealAmount = Math.floor(playerTeam[playerTeam.findIndex(c => c.id === activePlayerCharacter.id)].hp * 0.1);
        activePlayerCharacter.hp = Math.min(playerTeam[playerTeam.findIndex(c => c.id === activePlayerCharacter.id)].hp, activePlayerCharacter.hp + cureHealAmount);
        addToBattleLog(`${activePlayerCharacter.name} recovered ${cureHealAmount} HP!`);
      } else {
        addToBattleLog(`It had no effect...`);
        showFloatingLog("No effect");
      }
      break;
  }
  
  // Update UI
  updateBattleUI();
  
  // End turn
  setTimeout(() => endPlayerTurn(), 1000);
}

function switchYN() {
  if (!canAct || currentTurn !== "player") return;
  
  // Show switch screen with available characters
  const switchScreen = document.getElementById("switch-screen");
  const switchOptions = document.getElementById("switch-options");
  switchOptions.innerHTML = "";
  
  playerTeam.forEach((character, index) => {
    const isCurrentActive = character.id === activePlayerCharacter.id;
    const isFainted = character.hp <= 0;
    
    const option = document.createElement("div");
    option.className = `switch-option ${isFainted ? "fainted" : ""} ${isCurrentActive ? "current" : ""}`;
    option.innerHTML = `
      <img src="${character.sprite}" alt="${character.name}">
      <p>${character.name}</p>
      <div class="hp-indicator">
        <div class="hp-indicator-fill" style="width: ${(character.hp / playerTeam[index].hp) * 100}%"></div>
      </div>
    `;
    
    if (!isFainted && !isCurrentActive) {
      option.addEventListener("click", () => confirmSwitch(index));
    }
    
    switchOptions.appendChild(option);
  });
  
  switchScreen.style.display = "block";
}

function confirmSwitch(index) {
  // Hide switch screen
  document.getElementById("switch-screen").style.display = "none";
  
  // Get the new active character
  const newActive = playerTeam[index];
  addToBattleLog(`${activePlayerCharacter.name} switched out for ${newActive.name}!`);
  showFloatingLog(`Go, ${newActive.name}!`);
  
  // Update active character
  activePlayerCharacter = newActive;
  
  // Update UI
  updateBattleUI();
  updateStatusIcons();
  updateMoveButtons();
  
  // End turn
  setTimeout(() => endPlayerTurn(), 1000);
}

function cancelSwitch() {
  document.getElementById("switch-screen").style.display = "none";
}

function handlePlayerFaint() {
  addToBattleLog(`${activePlayerCharacter.name} got faded!`);
  showFloatingLog(`${activePlayerCharacter.name} faded!`);
  
  // Mark character as fainted (hp = 0)
  const index = playerTeam.findIndex(c => c.id === activePlayerCharacter.id);
  playerTeam[index].hp = 0;
  
  // Check if all team members are fainted
  const allFainted = playerTeam.every(character => character.hp <= 0);
  
  if (allFainted) {
    // Game over - player lost
    setTimeout(() => showGameOver(false), 1500);
  } else {
    // Show switch screen to choose next character
    setTimeout(() => {
      switchYN();
    }, 1500);
  }
}

function handleOpponentFaint() {
  fadeCount++;
  updateFadeDisplay();
  
  addToBattleLog(`${activeOpponent.name} got faded!`);
  showFloatingLog(`${activeOpponent.name} faded!`);
  
  // Check if all opponents are defeated
  if (opponentIndex >= opponents.length - 1) {
    // Game over - player won
    setTimeout(() => showGameOver(true), 1500);
  } else {
    // Show next opponent screen
    setTimeout(() => showNextOpponentScreen(), 1500);
  }
}

function showNextOpponentScreen() {
  // Set up game-over screen as "continue" screen
  const gameOverScreen = document.getElementById("game-over");
  const continueButton = document.getElementById("continue-battle");
  const againButton = document.querySelector("#game-over button:not(#continue-battle)");
  
  document.getElementById("game-over-message").textContent = `${activeOpponent.name} got faded!`;
  document.getElementById("fade-counter").textContent = `Fades: ${fadeCount}`;
  document.getElementById("win-lose-gif").src = resultGifs.win[Math.floor(Math.random() * resultGifs.win.length)];
  
  continueButton.style.display = "block";
  againButton.style.display = "none";
  document.getElementById("share-buttons").style.display = "none";
  
  gameOverScreen.style.display = "block";
}

function showGameOver(playerWon) {
  const gameOverScreen = document.getElementById("game-over");
  const continueButton = document.getElementById("continue-battle");
  const againButton = document.querySelector("#game-over button:not(#continue-battle)");
  
  if (playerWon) {
    document.getElementById("game-over-message").textContent = "You won! All opponents got faded!";
    document.getElementById("win-lose-gif").src = resultGifs.win[Math.floor(Math.random() * resultGifs.win.length)];
  } else {
    document.getElementById("game-over-message").textContent = "You lost! Your whole squad got faded!";
    document.getElementById("win-lose-gif").src = resultGifs.lose[Math.floor(Math.random() * resultGifs.lose.length)];
  }
  
  document.getElementById("fade-counter").textContent = `Fades: ${fadeCount}`;
  
  continueButton.style.display = "none";
  againButton.style.display = "block";
  document.getElementById("share-buttons").style.display = "flex";
  
  gameOverScreen.style.display = "block";
  gameActive = false;
}

function continueBattle() {
  document.getElementById("game-over").style.display = "none";
  
  // Move to next opponent
  opponentIndex++;
  activeOpponent = { ...opponents[opponentIndex] };
  
  // Reset battle modifiers
  resetBattleModifiers();
  
  // Update UI
  updateBattleUI();
  updateStatusIcons();
  updateMoveButtons();
  updateItemButtons();
  
  // Start battle with next opponent
  addToBattleLog(`${activePlayerCharacter.name} vs ${activeOpponent.name}!`);
  showFloatingLog(`New opponent: ${activeOpponent.name}`);
  
  // Determine first turn
  currentTurn = determineFirstTurn();
  
  // Start the turn after a delay
  setTimeout(() => {
    processTurn();
  }, 1000);
}

function restartGame() {
  // Reset everything
  document.getElementById("game-over").style.display = "none";
  document.getElementById("battle-screen").style.display = "none";
  document.getElementById("selection-screen").style.display = "block";
  
  // Clear battle log
  const battleLogElement = document.getElementById("battle-log");
  battleLogElement.innerHTML = "";
  
  // Reset game state
  playerTeam = [];
  fadeCount = 0;
  opponentIndex = 0;
  battleLog = [];
  gameActive = false;
  
  // Reset character selection
  document.querySelectorAll(".character-card").forEach(card => {
    card.classList.remove("selected");
  });
  
  // Clear team slots
  updateTeamSlots();
  
  // Disable start button
  document.getElementById("start-battle").disabled = true;
  
  // Update fade display
  updateFadeDisplay();
}

function addToBattleLog(text) {
  const battleLogElement = document.getElementById("battle-log");
  const entry = document.createElement("div");
  entry.className = "log-entry";
  entry.textContent = text;
  battleLogElement.appendChild(entry);
  
  // Auto-scroll to bottom
  battleLogElement.scrollTop = battleLogElement.scrollHeight;
  
  // Also store in array for history
  battleLog.push(text);
}

function showFloatingLog(text) {
  const floatingLog = document.getElementById("floating-log");
  floatingLog.textContent = text;
  floatingLog.classList.add("visible");
  
  // Hide after a delay
  setTimeout(() => {
    floatingLog.classList.remove("visible");
  }, 2000);
}

function share(platform) {
  const message = `I just played Squabblemon and got ${fadeCount} fade${fadeCount !== 1 ? 's' : ''}!`;
  
  let url;
  switch (platform) {
    case 'facebook':
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(message)}`;
      break;
    case 'reddit':
      url = `https://www.reddit.com/submit?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(message)}`;
      break;
    case 'bluesky':
      url = `https://bsky.app/intent/compose?text=${encodeURIComponent(message + ' ' + window.location.href)}`;
      break;
    default:
      return;
  }
  
  window.open(url, '_blank');
}