// ================ GAME DATA ================
// Character data with battle info
const characters = [
  {
    id: 1,
    name: "Young Thug",
    sprite: "https://i.imgur.com/VZYTcBw.png",
    hp: 120,
    attack: 65,
    defense: 40,
    speed: 85,
    critRate: 0.1,
    type: "shooter",
    status: "normal",
    description: "The Slime Boss. Fast attacks, high crit chance. Status effects on hit.",
    moves: [
      { name: "Slatt", power: 40, accuracy: 95, type: "shooter", description: "Quick shots, might cause 'Slimed' status." },
      { name: "Gunna Flow", power: 60, accuracy: 85, type: "shooter", description: "Moderate damage attack. Higher crit chance." },
      { name: "Snake Style", power: 25, accuracy: 90, type: "status", description: "Changes opponent's status to 'Slimed', lowering DEF." },
      { name: "YSL Wave", power: 70, accuracy: 75, type: "shooter", description: "Heavy attack with recoil damage." }
    ]
  },
  {
    id: 2,
    name: "Travis Scott",
    sprite: "https://i.imgur.com/9m3LMod.png",
    hp: 110,
    attack: 75,
    defense: 50,
    speed: 70,
    critRate: 0.15,
    type: "mosh",
    status: "normal",
    description: "Rage Rapper. Hits hard with mosh-style attacks. Can induce 'Dazed' status.",
    moves: [
      { name: "Sicko Mode", power: 50, accuracy: 90, type: "mosh", description: "Solid damage, might increase ATK." },
      { name: "Astro Thunder", power: 65, accuracy: 85, type: "mosh", description: "Strong attack with chance to Daze." },
      { name: "Goosebumps", power: 30, accuracy: 95, type: "status", description: "Causes 'Dazed' status, opponent loses accuracy." },
      { name: "Highest Room", power: 80, accuracy: 70, type: "mosh", description: "Heavy damage but risky accuracy." }
    ]
  },
  {
    id: 3,
    name: "Future",
    sprite: "https://i.imgur.com/kJ91Qqp.png",
    hp: 100,
    attack: 80,
    defense: 45,
    speed: 65,
    critRate: 0.15,
    type: "toxic",
    status: "normal",
    description: "Toxic King. His attacks cause 'Dirty Sprite' status, dealing DoT damage.",
    moves: [
      { name: "Dirty Sprite", power: 35, accuracy: 90, type: "toxic", description: "Causes 'Dirty Sprite' status, DoT damage each turn." },
      { name: "Codeine Crazy", power: 60, accuracy: 85, type: "toxic", description: "Moderate damage, may heal self slightly." },
      { name: "Mask Off", power: 70, accuracy: 80, type: "toxic", description: "Strong attack with health drain." },
      { name: "Purple Reign", power: 55, accuracy: 90, type: "status", description: "Extends 'Dirty Sprite' status effect duration." }
    ]
  },
  {
    id: 4,
    name: "Lil Uzi Vert",
    sprite: "https://i.imgur.com/6QM8sGm.png",
    hp: 95,
    attack: 70,
    defense: 45,
    speed: 90,
    critRate: 0.2,
    type: "rage",
    status: "normal",
    description: "Rage Rapper with extraterrestrial vibes. Fast with high crit rate.",
    moves: [
      { name: "XO Tour Life", power: 45, accuracy: 95, type: "rage", description: "Quick rage attack with high crit chance." },
      { name: "Eternal Atake", power: 65, accuracy: 85, type: "rage", description: "Powerful strike with knockback effect." },
      { name: "Baby Pluto", power: 55, accuracy: 90, type: "rage", description: "Medium damage, might boost SPD." },
      { name: "444+222", power: 80, accuracy: 75, type: "rage", description: "Heavy damage but might miss." }
    ]
  },
  {
    id: 5,
    name: "Kendrick Lamar",
    sprite: "https://i.imgur.com/gqLlbV8.png",
    hp: 105,
    attack: 75,
    defense: 60,
    speed: 65,
    critRate: 0.1,
    type: "lyrical",
    status: "normal",
    description: "Conscious Lyricist. Balanced stats with 'Wordplay' abilities that boost stats.",
    moves: [
      { name: "DAMN Flow", power: 50, accuracy: 90, type: "lyrical", description: "Solid lyrical attack." },
      { name: "King Kunta", power: 65, accuracy: 85, type: "lyrical", description: "Strong verbal assault." },
      { name: "Humble", power: 40, accuracy: 100, type: "status", description: "Never misses. Lowers opponent's ATK." },
      { name: "DNA Wordplay", power: 70, accuracy: 80, type: "lyrical", description: "Potent lyrical attack with stun chance." }
    ]
  },
  {
    id: 6,
    name: "Playboi Carti",
    sprite: "https://i.imgur.com/tNSujbF.png",
    hp: 90,
    attack: 65,
    defense: 40,
    speed: 95,
    critRate: 0.15,
    type: "vamp",
    status: "normal",
    description: "Vamp aesthetic with extremely fast attacks. Lower HP but hard to hit.",
    moves: [
      { name: "Vamp Anthem", power: 40, accuracy: 95, type: "vamp", description: "Quick strike, might drain HP." },
      { name: "Magnolia", power: 50, accuracy: 90, type: "vamp", description: "Medium damage with increased evasion." },
      { name: "WLR Rage", power: 70, accuracy: 75, type: "vamp", description: "Strong but risky attack." },
      { name: "Psyched Out", power: 30, accuracy: 100, type: "status", description: "Confuses opponent, might hit themselves." }
    ]
  },
  {
    id: 7,
    name: "21 Savage",
    sprite: "https://i.imgur.com/DWlYKbQ.png",
    hp: 115,
    attack: 85,
    defense: 55,
    speed: 50,
    critRate: 0.15,
    type: "slaughter",
    status: "normal",
    description: "UK-born slaughterer. High attack and defense but slower.",
    moves: [
      { name: "Knife Talk", power: 55, accuracy: 90, type: "slaughter", description: "Direct attack with bleeding effect." },
      { name: "No Heart", power: 70, accuracy: 85, type: "slaughter", description: "Powerful attack, ignores some DEF." },
      { name: "Bank Account", power: 60, accuracy: 90, type: "slaughter", description: "Consistent damage dealer." },
      { name: "Savage Mode", power: 40, accuracy: 95, type: "status", description: "Raises ATK and CRIT but lowers DEF." }
    ]
  },
  {
    id: 8,
    name: "Drake",
    sprite: "https://i.imgur.com/9dQvVZm.png",
    hp: 110,
    attack: 65,
    defense: 70,
    speed: 60,
    critRate: 0.1,
    type: "melodic",
    status: "normal",
    description: "Versatile artist with balanced stats. Can switch styles for different effects.",
    moves: [
      { name: "Hotline Bling", power: 45, accuracy: 95, type: "melodic", description: "Quick melodic attack that rarely misses." },
      { name: "God's Plan", power: 50, accuracy: 90, type: "status", description: "Raises team's DEF and heals slightly." },
      { name: "Started from Bottom", power: 65, accuracy: 85, type: "melodic", description: "Strong attack with self ATK boost." },
      { name: "Certified Lover", power: 75, accuracy: 80, type: "melodic", description: "Heavy damage with charm effect." }
    ]
  },
  {
    id: 9,
    name: "Snoop Dogg",
    sprite: "https://i.imgur.com/BUaMnB1.png",
    hp: 100,
    attack: 60,
    defense: 65,
    speed: 70,
    critRate: 0.1,
    type: "chronic",
    status: "normal",
    description: "OG with 'Chronic' status attacks. Can heal himself with weed abilities.",
    moves: [
      { name: "Gin & Juice", power: 45, accuracy: 95, type: "chronic", description: "Quick attack that may confuse." },
      { name: "Drop It Like It's Hot", power: 60, accuracy: 85, type: "chronic", description: "Medium damage with DEF reduction." },
      { name: "Chronic Haze", power: 30, accuracy: 100, type: "status", description: "Causes 'Baked' status, opponent moves slower." },
      { name: "Doggy Style", power: 70, accuracy: 80, type: "chronic", description: "Strong attack with lingering damage." }
    ]
  },
  {
    id: 10,
    name: "Kanye West",
    sprite: "https://i.imgur.com/4iNAY7p.png",
    hp: 115,
    attack: 75,
    defense: 50,
    speed: 65,
    critRate: 0.15,
    type: "genius",
    status: "normal",
    description: "Musical genius with unstable moves. High attack but unpredictable.",
    moves: [
      { name: "POWER", power: 60, accuracy: 85, type: "genius", description: "Strong attack with self-boost chance." },
      { name: "Yeezus Flow", power: 70, accuracy: 80, type: "genius", description: "Unpredictable damage range." },
      { name: "Ultralight Beam", power: 80, accuracy: 75, type: "genius", description: "Powerful but unreliable attack." },
      { name: "Runaway", power: 40, accuracy: 90, type: "status", description: "Raises DEF but opponent may get confused." }
    ]
  }
];

// Enemy (Opponent) data
const opponents = [
  {
    id: 101,
    name: "Tekashi 6ix9ine",
    sprite: "https://i.imgur.com/NTxD6Hw.png",
    hp: 85,
    attack: 60,
    defense: 30,
    speed: 75,
    critRate: 0.05,
    type: "snitch",
    description: "The rainbow-haired snitch. Will fold under pressure.",
    moves: [
      { name: "STOOPID", power: 40, accuracy: 85, type: "snitch" },
      { name: "GUMMO", power: 55, accuracy: 80, type: "snitch" },
      { name: "Rainbow Hair", power: 30, accuracy: 100, type: "status" },
      { name: "Snitch Tactic", power: 60, accuracy: 70, type: "snitch" }
    ],
    ai: "aggressive"
  },
  {
    id: 102,
    name: "Machine Gun Kelly",
    sprite: "https://i.imgur.com/bz66DpV.png",
    hp: 95,
    attack: 65,
    defense: 40,
    speed: 70,
    critRate: 0.1,
    type: "poser",
    description: "Confused genre-hopper. Thinks he won against Eminem.",
    moves: [
      { name: "RAP DEVIL", power: 50, accuracy: 85, type: "poser" },
      { name: "Genre Switch", power: 40, accuracy: 90, type: "status" },
      { name: "Blonde Ambition", power: 55, accuracy: 85, type: "poser" },
      { name: "Hotel Diablo", power: 70, accuracy: 75, type: "poser" }
    ],
    ai: "balanced"
  },
  {
    id: 103,
    name: "DJ Akademiks",
    sprite: "https://i.imgur.com/SZjf8k5.png",
    hp: 90,
    attack: 30,
    defense: 60,
    speed: 45,
    critRate: 0.05,
    type: "blogger",
    description: "Internet personality who talks too much.",
    moves: [
      { name: "Stream Rant", power: 30, accuracy: 95, type: "blogger" },
      { name: "Cheeto Fingers", power: 20, accuracy: 100, type: "blogger" },
      { name: "Off The Record", power: 45, accuracy: 85, type: "blogger" },
      { name: "Drama Alert", power: 50, accuracy: 80, type: "status" }
    ],
    ai: "defensive"
  },
  {
    id: 104,
    name: "Island Boys",
    sprite: "https://i.imgur.com/UgBrpLQ.png",
    hp: 75,
    attack: 40,
    defense: 30,
    speed: 60,
    critRate: 0.05,
    type: "viral",
    description: "TikTok sensations with questionable talent.",
    moves: [
      { name: "Island Vibes", power: 25, accuracy: 100, type: "viral" },
      { name: "TikTok Dance", power: 35, accuracy: 90, type: "viral" },
      { name: "Coconut Head", power: 40, accuracy: 85, type: "status" },
      { name: "I'm an Island Boy", power: 50, accuracy: 80, type: "viral" }
    ],
    ai: "random"
  },
  {
    id: 105,
    name: "Lil Pump",
    sprite: "https://i.imgur.com/YcQ5YN1.png",
    hp: 85,
    attack: 55,
    defense: 35,
    speed: 65,
    critRate: 0.1,
    type: "mumble",
    description: "One-hit wonder who fell off hard.",
    moves: [
      { name: "Gucci Gang", power: 45, accuracy: 90, type: "mumble" },
      { name: "Esketit", power: 40, accuracy: 95, type: "mumble" },
      { name: "Harvard Dropout", power: 15, accuracy: 100, type: "status" },
      { name: "D Rose", power: 60, accuracy: 80, type: "mumble" }
    ],
    ai: "aggressive"
  }
];

// Type effectiveness chart
const typeEffectiveness = {
  shooter: { slaughter: 0.8, blogger: 1.5, snitch: 1.2, poser: 1.0 },
  mosh: { shooter: 1.2, viral: 1.5, mumble: 1.3, poser: 0.8 },
  toxic: { chronic: 0.8, genius: 1.2, melodic: 1.0, mumble: 1.5 },
  rage: { mosh: 1.2, lyrical: 0.8, snitch: 1.5, blogger: 1.0 },
  lyrical: { rage: 1.5, snitch: 1.2, mumble: 1.5, genius: 0.8 },
  vamp: { poser: 1.5, chronic: 0.8, shooter: 1.0, viral: 1.2 },
  slaughter: { vamp: 1.2, rage: 1.5, melodic: 0.8, shooter: 1.0 },
  melodic: { lyrical: 0.8, toxic: 1.2, slaughter: 1.5, blogger: 1.0 },
  chronic: { toxic: 1.5, vamp: 1.2, mumble: 1.0, viral: 0.8 },
  genius: { lyrical: 1.5, melodic: 1.2, poser: 1.5, toxic: 0.8 },
  // Enemy types
  snitch: { shooter: 0.8, slaughter: 0.5, lyrical: 1.5, rage: 1.2 },
  poser: { mosh: 1.5, vamp: 0.8, genius: 0.5, lyrical: 1.2 },
  blogger: { melodic: 1.2, rage: 1.5, shooter: 0.8, slaughter: 0.5 },
  viral: { chronic: 1.5, vamp: 0.8, mosh: 0.5, genius: 1.2 },
  mumble: { lyrical: 0.5, toxic: 0.8, rage: 1.5, chronic: 1.2 }
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