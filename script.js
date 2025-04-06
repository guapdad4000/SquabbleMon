// ================ GAME DATA ================
// Character data with battle info
const characters = [
  {
    id: 1,
    name: "Rastamon",
    sprite: "mc-crazy-legs.png", // Using generated image for now
    hp: 200,
    attack: 150,
    defense: 130,
    speed: 130,
    critRate: 0.1,
    type: "Plant",
    status: "normal",
    description: "Chill vibes only. Prefers napping in sunbeams to actual squabbling.",
    moves: [
      { name: "Dreadlock Whip", power: 50, accuracy: 95, type: "Plant", description: "Plant-type whip attack with dreadlocks." },
      { name: "6 Rasclaat Eggs?!", power: 70, accuracy: 85, type: "Fire", description: "Fiery attack that may cause 'sleep' status." },
      { name: "Irie Recharge", power: 0, accuracy: 100, type: "Plant", description: "Healing move that restores HP." },
      { name: "Chill Vibes", power: 40, accuracy: 90, type: "status", description: "Lowers opponent's speed with relaxed energy." }
    ]
  },
  {
    id: 2,
    name: "Fitness Bro",
    sprite: "dj-scratch.png", // Using generated image for now
    hp: 230,
    attack: 170,
    defense: 130,
    speed: 120,
    critRate: 0.15,
    type: "Fire",
    status: "normal",
    description: "NEVER skips leg day. Or arm day. Or any day. Fueled by pure gainz.",
    moves: [
      { name: "Squat Slap", power: 45, accuracy: 90, type: "Normal", description: "Physical attack with leg strength." },
      { name: "Protein Powder Burn", power: 45, accuracy: 85, type: "Fire", description: "Fire-type attack that may cause 'burn' status." },
      { name: "Flex on 'Em", power: 0, accuracy: 100, type: "Normal", description: "Boosts defense by showing off muscles." },
      { name: "Gym Motivation", power: 50, accuracy: 90, type: "Fire", description: "Energetic attack with fiery passion." }
    ]
  },
  {
    id: 3,
    name: "Techy",
    sprite: "graffiti-king.png", // Using generated image for now
    hp: 170,
    attack: 150,
    defense: 150,
    speed: 190,
    critRate: 0.15,
    type: "Electric",
    status: "normal",
    description: "Runs on caffeine and pure code. Might DDoS you for fun.",
    moves: [
      { name: "Keyboard Smash", power: 60, accuracy: 90, type: "Electric", description: "Electric attack that may cause 'paralysis'." },
      { name: "404 Headshot", power: 80, accuracy: 80, type: "Dark", description: "Powerful dark-type attack with high damage." },
      { name: "Caffeine Overload", power: 0, accuracy: 100, type: "Electric", description: "Boosts speed with excessive caffeine." },
      { name: "Code Error", power: 65, accuracy: 85, type: "Electric", description: "Buggy attack that may confuse the opponent." }
    ]
  },
  {
    id: 4,
    name: "Cool Vibe YN",
    sprite: "beatbox-wizard.png", // Using generated image for now
    hp: 190,
    attack: 170,
    defense: 130,
    speed: 150,
    critRate: 0.2,
    type: "Water",
    status: "normal",
    description: "Smooth operator. Always hydrated and ready to slide into the DMs.",
    moves: [
      { name: "Splash Dat Ass", power: 50, accuracy: 95, type: "Water", description: "Water attack that causes 'wet' status." },
      { name: "Wave Check Fade", power: 70, accuracy: 85, type: "Water", description: "Wave-based attack that might put opponent to sleep." },
      { name: "Call Girls for Gang", power: 0, accuracy: 100, type: "Water", description: "Healing move that restores HP." },
      { name: "Flow State", power: 60, accuracy: 90, type: "Water", description: "Smooth attack with increased critical hit chance." }
    ]
  },
  {
    id: 5,
    name: "9-5 Homie",
    sprite: "flow-master.png", // Using generated image for now
    hp: 210,
    attack: 130,
    defense: 150,
    speed: 180,
    critRate: 0.1,
    type: "Rock",
    status: "normal",
    description: "Just trying to make it to Friday. Powered by lukewarm coffee.",
    moves: [
      { name: "Cubicle Clapback", power: 50, accuracy: 90, type: "Normal", description: "Office-themed attack with moderate damage." },
      { name: "Overtime Overload", power: 65, accuracy: 85, type: "Electric", description: "Stressful attack that may cause paralysis." },
      { name: "PTO Prayer", power: 0, accuracy: 100, type: "Normal", description: "Healing move that gives a much-needed break." },
      { name: "Monday Mayhem", power: 55, accuracy: 85, type: "Rock", description: "Rock-solid attack fueled by beginning-of-week dread." }
    ]
  },
  {
    id: 6,
    name: "All Jokes Roaster",
    sprite: "street-styler.png", // Using generated image for now
    hp: 180,
    attack: 170,
    defense: 110,
    speed: 180,
    critRate: 0.15,
    type: "Air",
    status: "normal",
    description: "Can't take anything seriously. Will ratio you into oblivion.",
    moves: [
      { name: "Ratio'd Receipts", power: 40, accuracy: 100, type: "Air", description: "Quick aerial attack with high accuracy." },
      { name: "Clapback Inferno", power: 55, accuracy: 90, type: "Fire", description: "Fiery comeback that may cause burn status." },
      { name: "Dodge the Shade", power: 0, accuracy: 100, type: "Air", description: "Boosts speed by effortlessly avoiding criticism." },
      { name: "Viral Diss", power: 65, accuracy: 85, type: "Air", description: "Widespread attack that damages opponent's reputation." }
    ]
  },
  {
    id: 7,
    name: "Closet Nerd",
    sprite: "boom-bap.png", // Using generated image for now
    hp: 200,
    attack: 140,
    defense: 100,
    speed: 170,
    critRate: 0.15,
    type: "Dark",
    status: "normal",
    description: "Knows more about anime than you know about yourself. Don't ask.",
    moves: [
      { name: "Manga Smack", power: 60, accuracy: 95, type: "Normal", description: "Physical attack using heavy manga volumes." },
      { name: "Weeb Roast", power: 55, accuracy: 85, type: "Fire", description: "Fiery attack that may cause burn status." },
      { name: "Incognito Glow-Up", power: 0, accuracy: 100, type: "Dark", description: "Dark-type move that raises defense." },
      { name: "Anime Reference", power: 70, accuracy: 80, type: "Dark", description: "Obscure attack that confuses those who don't get it." }
    ]
  },
  {
    id: 8,
    name: "Dysfunctional YN",
    sprite: "mixtape-master.png", // Using generated image for now
    hp: 160,
    attack: 190,
    defense: 90,
    speed: 140,
    critRate: 0.2,
    type: "Fire",
    status: "normal",
    description: "A walking disaster, but somehow still functioning. Handle with care.",
    moves: [
      { name: "Hot Mess Slap", power: 55, accuracy: 90, type: "Fire", description: "Chaotic attack that may cause burn status." },
      { name: "Chaos Cookout", power: 85, accuracy: 75, type: "Fire", description: "Powerful but risky attack with recoil damage." },
      { name: "Trainwreck Tantrum", power: 0, accuracy: 100, type: "Normal", description: "Emotional outburst that raises attack." },
      { name: "Identity Crisis", power: 60, accuracy: 85, type: "Dark", description: "Confusing attack that may cause opponent to hit themselves." }
    ]
  }
];

// Enemy (Opponent) data
const opponents = [
  {
    id: 101,
    name: "Functional Addict",
    sprite: "copycat.png", // Using generated image for now
    hp: 200,
    attack: 150,
    defense: 100,
    speed: 130,
    critRate: 0.15,
    type: "Water",
    description: "Runs on liquids that aren't always water. Surprisingly coherent.",
    moves: [
      { name: "Sip & Splash", power: 45, accuracy: 100, type: "Water" },
      { name: "Henny Haze", power: 60, accuracy: 90, type: "Dark" },
      { name: "Sober Up Sis", power: 0, accuracy: 100, type: "Normal" },
      { name: "Liquid Courage", power: 70, accuracy: 80, type: "Water" }
    ],
    ai: "balanced"
  },
  {
    id: 102,
    name: "Gamer Unemployed",
    sprite: "pop-sellout.png", // Using generated image for now
    hp: 210,
    attack: 150,
    defense: 190,
    speed: 150,
    critRate: 0.15,
    type: "Dark",
    description: "Peak performance involves Cheetos and minimal movement. Hasn't seen the sun in weeks.",
    moves: [
      { name: "Cheeto Dust Jab", power: 50, accuracy: 95, type: "Normal" },
      { name: "WiFi Crash", power: 65, accuracy: 85, type: "Electric" },
      { name: "Couch Potato Power", power: 0, accuracy: 100, type: "Normal" },
      { name: "Rage Quit", power: 75, accuracy: 75, type: "Dark" }
    ],
    ai: "aggressive"
  },
  {
    id: 103,
    name: "Houseless Hustler",
    sprite: "internet-troll.png", // Using generated image for now
    hp: 220,
    attack: 170,
    defense: 110,
    speed: 120,
    critRate: 0.1,
    type: "Rock",
    description: "Resourceful survivor. Turns trash into treasure, and opponents into dust.",
    moves: [
      { name: "Cardboard Cut", power: 50, accuracy: 95, type: "Normal" },
      { name: "Sidewalk Stomp", power: 60, accuracy: 85, type: "Rock" },
      { name: "Hustle Hard", power: 0, accuracy: 100, type: "Normal" },
      { name: "Street Wisdom", power: 65, accuracy: 80, type: "Dark" }
    ],
    ai: "defensive"
  },
  {
    id: 104,
    name: "Night Stalker",
    sprite: "one-hit-wonder.png", // Using generated image for now
    hp: 160,
    attack: 200,
    defense: 100,
    speed: 180,
    critRate: 0.2,
    type: "Dark",
    description: "Moves in the shadows. Definitely gives off creepy vibes.",
    moves: [
      { name: "Knife Nightcap", power: 45, accuracy: 85, type: "Dark" },
      { name: "Stalk & Snooze", power: 90, accuracy: 65, type: "Dark" },
      { name: "Killer Instinct", power: 0, accuracy: 100, type: "Dark" },
      { name: "Shadow Strike", power: 70, accuracy: 80, type: "Dark" }
    ],
    ai: "aggressive"
  },
  {
    id: 105,
    name: "Techbro Rich",
    sprite: "mumble-rapper.png", // Using generated image for now
    hp: 180,
    attack: 180,
    defense: 120,
    speed: 190,
    critRate: 0.15,
    type: "Electric",
    description: "Disrupting the Squabblemon scene, one NFT at a time. Very rich.",
    moves: [
      { name: "Tesla Taze", power: 55, accuracy: 90, type: "Electric" },
      { name: "NFT Nuke", power: 85, accuracy: 70, type: "Normal" },
      { name: "VC Funded Flex", power: 0, accuracy: 100, type: "Electric" },
      { name: "Crypto Crash", power: 75, accuracy: 80, type: "Dark" }
    ],
    ai: "balanced"
  }
];

// Type effectiveness chart
const typeEffectiveness = {
  // Player types
  Fire: { Plant: 1.5, Water: 0.5, Rock: 0.5, Normal: 1.0, Electric: 1.0, Air: 1.0, Dark: 1.0 },
  Plant: { Water: 1.5, Rock: 1.5, Fire: 0.5, Air: 0.5, Normal: 1.0, Electric: 1.0, Dark: 1.0 },
  Water: { Fire: 1.5, Rock: 1.5, Plant: 0.5, Electric: 0.5, Normal: 1.0, Air: 1.0, Dark: 1.0 },
  Rock: { Electric: 1.5, Fire: 1.5, Air: 1.5, Plant: 0.5, Water: 0.5, Normal: 1.0, Dark: 1.0 },
  Electric: { Water: 1.5, Air: 1.5, Rock: 0.5, Plant: 0.5, Normal: 1.0, Fire: 1.0, Dark: 1.0 },
  Air: { Plant: 1.5, Electric: 0.5, Rock: 0.5, Normal: 1.0, Water: 1.0, Fire: 1.0, Dark: 1.0 },
  Dark: { Normal: 1.5, Plant: 1.0, Water: 1.0, Rock: 1.0, Electric: 1.0, Air: 1.0, Fire: 1.0 },
  Normal: { Dark: 0.5, Rock: 0.5, Plant: 1.0, Water: 1.0, Electric: 1.0, Air: 1.0, Fire: 1.0 }
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
      <img src="public/images/${character.sprite}" alt="${character.name}">
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
      slots[index].innerHTML = `<img src="public/images/${character.sprite}" alt="${character.name}">`;
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
  document.getElementById("player-sprite").src = `public/images/${activePlayerCharacter.sprite}`;
  
  // Update opponent display
  document.getElementById("opponent-name").textContent = activeOpponent.name;
  document.getElementById("opponent-hp").textContent = `${activeOpponent.hp}/${opponents[opponentIndex].hp}`;
  document.getElementById("opponent-sprite").src = `public/images/${activeOpponent.sprite}`;
  
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
      case 1: // Rastamon
        if (move.name === "Irie Recharge") {
          // Healing move
          const healAmount = 30;
          activePlayerCharacter.hp = Math.min(activePlayerCharacter.hp + healAmount, playerTeam[playerTeam.findIndex(c => c.id === activePlayerCharacter.id)].hp);
          addToBattleLog(`${activePlayerCharacter.name} recovered ${healAmount} HP!`);
          showFloatingLog(`+${healAmount} HP`);
        } else {
          applyStatusEffect(activeOpponent, "baked", 3, "opponent");
        }
        break;
      case 2: // Fitness Bro
        if (move.name === "Flex on 'Em") {
          playerStatModifiers.defense *= 1.5;
          addToBattleLog(`${activePlayerCharacter.name}'s Defense increased!`);
          showFloatingLog("DEF ↑");
        } else {
          applyStatusEffect(activeOpponent, "dazed", 2, "opponent");
        }
        break;
      case 3: // Techy
        if (move.name === "Caffeine Overload") {
          playerStatModifiers.speed *= 1.5;
          addToBattleLog(`${activePlayerCharacter.name}'s Speed increased!`);
          showFloatingLog("SPD ↑");
        } else {
          applyStatusEffect(activeOpponent, "confused", 2, "opponent");
        }
        break;
      case 4: // Cool Vibe YN
        if (move.name === "Call Girls for Gang") {
          // Healing move
          const healAmount = 40;
          activePlayerCharacter.hp = Math.min(activePlayerCharacter.hp + healAmount, playerTeam[playerTeam.findIndex(c => c.id === activePlayerCharacter.id)].hp);
          addToBattleLog(`${activePlayerCharacter.name} recovered ${healAmount} HP!`);
          showFloatingLog(`+${healAmount} HP`);
        } else {
          applyStatusEffect(activeOpponent, "slimed", 3, "opponent");
        }
        break;
      case 5: // 9-5 Homie
        if (move.name === "PTO Prayer") {
          // Healing move
          const healAmount = 35;
          activePlayerCharacter.hp = Math.min(activePlayerCharacter.hp + healAmount, playerTeam[playerTeam.findIndex(c => c.id === activePlayerCharacter.id)].hp);
          addToBattleLog(`${activePlayerCharacter.name} recovered ${healAmount} HP!`);
          showFloatingLog(`+${healAmount} HP`);
        } else {
          opponentStatModifiers.speed *= 0.7;
          addToBattleLog(`${activeOpponent.name}'s Speed decreased!`);
          showFloatingLog("SPD ↓");
        }
        break;
      case 6: // All Jokes Roaster
        if (move.name === "Dodge the Shade") {
          playerStatModifiers.speed *= 1.5;
          addToBattleLog(`${activePlayerCharacter.name}'s Speed increased!`);
          showFloatingLog("SPD ↑");
        } else {
          applyStatusEffect(activeOpponent, "confused", 2, "opponent");
        }
        break;
      case 7: // Closet Nerd
        if (move.name === "Incognito Glow-Up") {
          playerStatModifiers.defense *= 1.5;
          addToBattleLog(`${activePlayerCharacter.name}'s Defense increased!`);
          showFloatingLog("DEF ↑");
        } else {
          opponentStatModifiers.accuracy *= 0.8;
          addToBattleLog(`${activeOpponent.name}'s Accuracy decreased!`);
          showFloatingLog("ACC ↓");
        }
        break;
      case 8: // Dysfunctional YN
        if (move.name === "Trainwreck Tantrum") {
          playerStatModifiers.attack *= 1.5;
          addToBattleLog(`${activePlayerCharacter.name}'s Attack increased!`);
          showFloatingLog("ATK ↑");
        } else {
          applyStatusEffect(activeOpponent, "confused", 2, "opponent");
        }
        break;
      default:
        applyStatusEffect(activeOpponent, "confused", 2, "opponent");
    }
  } else {
    // Opponent using status move
    switch (activeOpponent.id) {
      case 101: // Functional Addict
        if (move.name === "Sober Up Sis") {
          // Healing move
          const healAmount = 30;
          activeOpponent.hp = Math.min(activeOpponent.hp + healAmount, opponents[opponentIndex].hp);
          addToBattleLog(`${activeOpponent.name} recovered ${healAmount} HP!`);
          showFloatingLog(`+${healAmount} HP`);
        } else {
          applyStatusEffect(activePlayerCharacter, "dazed", 2, "player");
        }
        break;
      case 102: // Gamer Unemployed
        if (move.name === "Couch Potato Power") {
          opponentStatModifiers.attack *= 1.3;
          addToBattleLog(`${activeOpponent.name}'s Attack increased!`);
          showFloatingLog("ATK ↑");
        } else {
          applyStatusEffect(activePlayerCharacter, "confused", 2, "player");
        }
        break;
      case 103: // Houseless Hustler
        if (move.name === "Hustle Hard") {
          opponentStatModifiers.defense *= 1.4;
          addToBattleLog(`${activeOpponent.name}'s Defense increased!`);
          showFloatingLog("DEF ↑");
        } else {
          playerStatModifiers.speed *= 0.7;
          addToBattleLog(`${activePlayerCharacter.name}'s Speed decreased!`);
          showFloatingLog("SPD ↓");
        }
        break;
      case 104: // Night Stalker
        if (move.name === "Killer Instinct") {
          opponentStatModifiers.attack *= 1.5;
          addToBattleLog(`${activeOpponent.name}'s Attack increased!`);
          showFloatingLog("ATK ↑");
        } else {
          applyStatusEffect(activePlayerCharacter, "dazed", 2, "player");
        }
        break;
      case 105: // Techbro Rich
        if (move.name === "VC Funded Flex") {
          opponentStatModifiers.speed *= 1.4;
          addToBattleLog(`${activeOpponent.name}'s Speed increased!`);
          showFloatingLog("SPD ↑");
        } else {
          playerStatModifiers.defense *= 0.7;
          addToBattleLog(`${activePlayerCharacter.name}'s Defense decreased!`);
          showFloatingLog("DEF ↓");
        }
        break;
      default:
        applyStatusEffect(activePlayerCharacter, "confused", 2, "player");
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
      case 1: // Rastamon
        if (move.name === "Dreadlock Whip" && chance < 0.3) {
          // Apply slimed effect
          applyStatusEffect(activeOpponent, "slimed", 2, "opponent");
        }
        else if (move.name === "6 Rasclaat Eggs?!" && chance < 0.3) {
          // Apply sleep effect
          applyStatusEffect(activeOpponent, "baked", 2, "opponent");
        }
        break;
      case 2: // Fitness Bro
        if (move.name === "Protein Powder Burn" && chance < 0.3) {
          // Apply burn effect (bleeding)
          applyStatusEffect(activeOpponent, "bleeding", 2, "opponent");
        }
        else if (move.name === "Squat Slap" && chance < 0.2) {
          // Increase attack
          playerStatModifiers.attack *= 1.1;
          addToBattleLog(`${activePlayerCharacter.name}'s Attack slightly rose!`);
          showFloatingLog("ATK ↑");
        }
        break;
      case 3: // Techy
        if (move.name === "Keyboard Smash" && chance < 0.3) {
          // Apply paralysis effect
          applyStatusEffect(activeOpponent, "dazed", 2, "opponent");
        }
        else if (move.name === "404 Headshot" && chance < 0.3) {
          // Chance for critical hit
          playerStatModifiers.attack *= 1.2;
          addToBattleLog(`${activePlayerCharacter.name}'s targeting system optimized!`);
          showFloatingLog("CRIT chance ↑");
        }
        break;
      case 4: // Cool Vibe YN
        if (move.name === "Splash Dat Ass" && chance < 0.3) {
          // Apply wet effect (slimed)
          applyStatusEffect(activeOpponent, "slimed", 2, "opponent");
        }
        else if (move.name === "Wave Check Fade" && chance < 0.3) {
          // Apply sleep
          applyStatusEffect(activeOpponent, "baked", 2, "opponent");
        }
        break;
      case 5: // 9-5 Homie
        if (move.name === "Overtime Overload" && chance < 0.3) {
          // Apply paralysis
          applyStatusEffect(activeOpponent, "dazed", 2, "opponent");
        }
        else if (move.name === "Monday Mayhem" && chance < 0.2) {
          // Slight drain effect
          const healAmount = Math.floor(move.power * 0.1);
          activePlayerCharacter.hp = Math.min(playerTeam[playerTeam.findIndex(c => c.id === activePlayerCharacter.id)].hp, activePlayerCharacter.hp + healAmount);
          updateBattleUI();
          addToBattleLog(`${activePlayerCharacter.name} found a bit of energy!`);
          showFloatingLog(`+${healAmount} HP`);
        }
        break;
      case 6: // All Jokes Roaster
        if (move.name === "Clapback Inferno" && chance < 0.3) {
          // Apply burn (bleeding)
          applyStatusEffect(activeOpponent, "bleeding", 2, "opponent");
        }
        else if (move.name === "Ratio'd Receipts" && chance < 0.3) {
          // Apply confusion
          applyStatusEffect(activeOpponent, "confused", 2, "opponent");
        }
        break;
      case 7: // Closet Nerd
        if (move.name === "Weeb Roast" && chance < 0.3) {
          // Apply burn
          applyStatusEffect(activeOpponent, "bleeding", 2, "opponent");
        }
        else if (move.name === "Manga Smack" && chance < 0.3) {
          // Defense increase
          playerStatModifiers.defense *= 1.1;
          addToBattleLog(`${activePlayerCharacter.name}'s Defense slightly rose!`);
          showFloatingLog("DEF ↑");
        }
        break;
      case 8: // Dysfunctional YN
        if (move.name === "Hot Mess Slap" && chance < 0.3) {
          // Apply burn
          applyStatusEffect(activeOpponent, "bleeding", 2, "opponent");
        }
        else if (move.name === "Chaos Cookout" && chance < 0.5) {
          // Recoil damage
          const recoilDamage = Math.floor(move.power * 0.15);
          activePlayerCharacter.hp = Math.max(0, activePlayerCharacter.hp - recoilDamage);
          updateBattleUI();
          addToBattleLog(`${activePlayerCharacter.name} took ${recoilDamage} recoil damage!`);
          showFloatingLog(`Recoil: -${recoilDamage} HP`);
        }
        break;
    }
  } else {
    // Opponent hit effects
    switch (activeOpponent.id) {
      case 101: // Functional Addict
        if (move.name === "Henny Haze" && chance < 0.3) {
          // Apply sleep
          applyStatusEffect(activePlayerCharacter, "baked", 2, "player");
        }
        break;
      case 102: // Gamer Unemployed
        if (move.name === "WiFi Crash" && chance < 0.3) {
          // Apply paralysis
          applyStatusEffect(activePlayerCharacter, "dazed", 2, "player");
        }
        break;
      case 103: // Houseless Hustler
        if (move.name === "Sidewalk Stomp" && chance < 0.3) {
          // Lower speed
          playerStatModifiers.speed *= 0.8;
          addToBattleLog(`${activePlayerCharacter.name}'s Speed decreased!`);
          showFloatingLog("SPD ↓");
        }
        break;
      case 104: // Night Stalker
        if (move.name === "Knife Nightcap" && chance < 0.3) {
          // Apply sleep
          applyStatusEffect(activePlayerCharacter, "baked", 2, "player");
        }
        else if (move.name === "Shadow Strike" && chance < 0.3) {
          // Apply bleeding
          applyStatusEffect(activePlayerCharacter, "bleeding", 2, "player");
        }
        break;
      case 105: // Techbro Rich
        if (move.name === "Tesla Taze" && chance < 0.3) {
          // Apply paralysis
          applyStatusEffect(activePlayerCharacter, "dazed", 2, "player");
        }
        break;
    }
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
      <img src="public/images/${character.sprite}" alt="${character.name}">
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