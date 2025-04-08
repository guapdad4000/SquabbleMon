/**
 * Squabble Overworld System
 * Top-down exploration between battles with NPCs and triggers
 */

// Map constants for various zones
// Check if ZONE_TYPES is already defined to avoid redeclaration
const ZONE_TYPES = window.ZONE_TYPES || {
  STARTER_HOOD: 'starterHood',
  THE_TRAP: 'theTrap',
  THE_BLOCK: 'theBlock',
  RICH_SUBURBIA: 'richSuburbia',
  BACK_ALLEY_ARENA: 'backAlleyArena',
  
  // New expanded zones
  TRAP_HOUSE: 'trapHouse',
  MOMMA_HOUSE: 'mommaHouse',
  OPPS_HOOD: 'oppsHood',
  FADE_PARK: 'fadePark'
};

// Make ZONE_TYPES available globally
window.ZONE_TYPES = ZONE_TYPES;

// Tile types for collision and interaction - only create if not already defined
if (typeof window.TILE_TYPES === 'undefined') {
  window.TILE_TYPES = {
    WALKABLE: 0,
    BLOCKED: 1,
    GRASS: 2,
    TRAP_ZONE: 3,
    DOOR: 4,
    NPC: 5
  };
}

// Use window.TILE_TYPES consistently
const TILE_TYPES = window.TILE_TYPES;

// Map data structure (will be larger in final implementation)
// 0 = walkable, 1 = blocked, 2 = grass, 3 = trap zone, 4 = door, 5 = NPC
const STARTER_HOOD_MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 1],
  [1, 0, 0, 0, 4, 0, 0, 0, 0, 0, 3, 3, 3, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1],
];

// NPC data with positions, dialogue, and battle triggers
const STARTER_HOOD_NPCS = [
  {
    id: 'npc1',
    name: 'OG Ras',
    x: 3,
    y: 3,
    sprite: 'public/sprites/og_ras.png',
    direction: 'down',
    lines: [
      "Ayo, youngblood.",
      "You rollin' through here like you own the trap?",
      "Lemme test them squabble hands."
    ],
    triggersBattle: true,
    character: {
      // Character template for battle
      name: 'OG Ras',
      sprite: 'public/sprites/og_ras.png',
      type: 'Fire',
      level: 5,
      hp: 110,
      maxHp: 110,
      attack: 55,
      defense: 40,
      speed: 45,
      moves: [
        { name: 'Blunt Force', type: 'Fire', power: 40, pp: 15, maxPp: 15, description: 'A burning strike that may cause a burn' },
        { name: 'Light Up', type: 'Fire', power: 0, pp: 10, maxPp: 10, effect: 'buff', stat: 'attack', amount: 1.5, description: 'Raises Attack significantly' },
        { name: 'Hotbox', type: 'Fire', power: 30, pp: 10, maxPp: 10, effect: 'status', status: 'confusion', chance: 0.3, description: 'May confuse the opponent' },
        { name: 'Pressure', type: 'Dark', power: 20, pp: 20, maxPp: 20, effect: 'debuff', stat: 'defense', amount: 0.8, description: 'Deals damage and lowers opponent Defense' }
      ]
    }
  },
  {
    id: 'npc2',
    name: 'Lil Brick',
    x: 11,
    y: 3,
    sprite: 'public/sprites/lil_brick.png',
    direction: 'left',
    lines: [
      "Yo what's good?",
      "I sell the finest product on the block.",
      "You lookin' to cop somethin'?"
    ],
    triggersBattle: false,
    opensShop: true,
    shopType: 'cornerStore'
  },
  {
    id: 'npc3',
    name: 'Street Runner',
    x: 3,
    y: 7,
    sprite: 'public/sprites/street_runner.png',
    direction: 'right',
    lines: [
      "These streets ain't safe no more.",
      "Them dudes from the north side been pushing weight.",
      "Watch yourself if you head to the trap zone down south."
    ],
    triggersBattle: false,
    givesQuest: true,
    quest: {
      id: 'quest1',
      name: 'Clear The Trap',
      description: 'Defeat 3 enemies in the trap zone',
      objective: { type: 'defeat', zone: 'trapZone', count: 3 },
      reward: { money: 100, item: { id: 'gold_chain', name: 'Gold Chain' } }
    }
  }
];

// Door connections to other zones or buildings
// Define doors for the starter hood - make sure to be consistent in leadsTo values
const STARTER_HOOD_DOORS = [
  // Using simple string values for these original doors for compatibility
  { x: 4, y: 11, leadsTo: 'cornerStore', entranceX: 7, entranceY: 5 },
  { x: 6, y: 14, leadsTo: 'theTrap', entranceX: 7, entranceY: 1 },
  
  // New doors to our expanded zones - make them extra visible
  { x: 2, y: 14, leadsTo: ZONE_TYPES.TRAP_HOUSE, entranceX: 7, entranceY: 1 },
  { x: 12, y: 14, leadsTo: ZONE_TYPES.MOMMA_HOUSE, entranceX: 7, entranceY: 1 },
  { x: 10, y: 1, leadsTo: ZONE_TYPES.OPPS_HOOD, entranceX: 7, entranceY: 13 },
  { x: 3, y: 1, leadsTo: ZONE_TYPES.FADE_PARK, entranceX: 7, entranceY: 13 }
];

// THE TRAP HOUSE - Map and NPCs
const TRAP_HOUSE_MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 5, 0, 5, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1]
];

const TRAP_HOUSE_NPCS = [
  {
    id: 'trap_dealer',
    name: 'Trap Dealer',
    x: 6,
    y: 5,
    sprite: 'public/sprites/trap_dealer.png',
    direction: 'down',
    lines: [
      "Welcome to the trap house.",
      "I got all the goods you need to survive the streets.",
      "Whatchu need today?"
    ],
    opensShop: true,
    shopType: 'trapHouse'
  },
  {
    id: 'trap_guard',
    name: 'Trap Guard',
    x: 8,
    y: 5,
    sprite: 'public/sprites/trap_guard.png',
    direction: 'left',
    lines: [
      "You better have business here.",
      "Don't make me test you in these streets.",
      "Step wrong and we got problems."
    ],
    triggersBattle: true,
    character: {
      name: 'Trap Guard',
      sprite: 'public/sprites/trap_guard.png',
      type: 'Dark',
      level: 8,
      hp: 150,
      maxHp: 150,
      attack: 65,
      defense: 50,
      speed: 40,
      moves: [
        { name: 'Glock Shot', type: 'Dark', power: 50, pp: 10, maxPp: 10, description: 'A powerful ranged attack' },
        { name: 'Street Intimidation', type: 'Dark', power: 0, pp: 5, maxPp: 5, effect: 'debuff', stat: 'attack', amount: 0.7, description: 'Severely lowers opponent Attack' },
        { name: 'Trap House Rules', type: 'Dark', power: 40, pp: 15, maxPp: 15, effect: 'status', status: 'poison', chance: 0.3, description: 'May poison the opponent' },
        { name: 'Bulletproof', type: 'Steel', power: 0, pp: 5, maxPp: 5, effect: 'buff', stat: 'defense', amount: 1.5, description: 'Significantly raises Defense' }
      ]
    }
  },
  {
    id: 'trap_kingpin',
    name: 'Trap Kingpin',
    x: 6,
    y: 9,
    sprite: 'public/sprites/trap_kingpin.png',
    direction: 'up',
    lines: [
      "So you made it this far into my trap?",
      "You either brave or stupid.",
      "Let's see if you got what it takes to survive here."
    ],
    triggersBattle: true,
    character: {
      name: 'Trap Kingpin',
      sprite: 'public/sprites/trap_kingpin.png',
      type: 'Psychic',
      level: 12,
      hp: 180,
      maxHp: 180,
      attack: 75,
      defense: 60,
      speed: 55,
      moves: [
        { name: 'Mind Games', type: 'Psychic', power: 60, pp: 10, maxPp: 10, description: 'A powerful mental attack' },
        { name: 'Street Connect', type: 'Psychic', power: 0, pp: 5, maxPp: 5, effect: 'buff', stat: 'speed', amount: 1.5, description: 'Significantly raises Speed' },
        { name: 'Hood Politics', type: 'Dark', power: 50, pp: 10, maxPp: 10, effect: 'debuff', stat: 'defense', amount: 0.8, description: 'Deals damage and lowers Defense' },
        { name: 'Trap Lord', type: 'Psychic', power: 70, pp: 5, maxPp: 5, description: 'An extremely powerful attack' }
      ]
    }
  }
];

const TRAP_HOUSE_DOORS = [
  { x: 7, y: 1, leadsTo: ZONE_TYPES.STARTER_HOOD, entranceX: 2, entranceY: 13 },
  { x: 7, y: 14, leadsTo: ZONE_TYPES.STARTER_HOOD, entranceX: 6, entranceY: 13 }
];

// MOMMA'S HOUSE - Map and NPCs
const MOMMA_HOUSE_MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 5, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1]
];

const MOMMA_HOUSE_NPCS = [
  {
    id: 'momma',
    name: 'Big Momma',
    x: 6,
    y: 6,
    sprite: 'public/sprites/big_momma.png',
    direction: 'down',
    lines: [
      "Baby, you look hungry! Let me fix you a plate.",
      "I got some healing food for you to take on your journey.",
      "Don't forget to eat and keep your strength up out there."
    ],
    opensShop: true,
    shopType: 'mommaKitchen',
    givesHeal: true
  }
];

const MOMMA_HOUSE_DOORS = [
  { x: 7, y: 1, leadsTo: ZONE_TYPES.STARTER_HOOD, entranceX: 12, entranceY: 13 },
  { x: 7, y: 14, leadsTo: ZONE_TYPES.STARTER_HOOD, entranceX: 12, entranceY: 13 }
];

// THE OPPS HOOD - Map and NPCs
const OPPS_HOOD_MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
  [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
  [1, 3, 0, 5, 0, 0, 0, 0, 0, 0, 0, 5, 0, 3, 1],
  [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
  [1, 3, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 3, 1],
  [1, 3, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 3, 1],
  [1, 3, 0, 0, 0, 1, 1, 5, 1, 1, 0, 0, 0, 3, 1],
  [1, 3, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 3, 1],
  [1, 3, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 3, 1],
  [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
  [1, 3, 0, 5, 0, 0, 0, 0, 0, 0, 0, 5, 0, 3, 1],
  [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
  [1, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const OPPS_HOOD_NPCS = [
  {
    id: 'opp_leader',
    name: 'Opp Leader',
    x: 7,
    y: 7,
    sprite: 'public/sprites/opp_leader.png',
    direction: 'down',
    lines: [
      "You in the wrong hood, fool.",
      "This our territory. You better bounce.",
      "Or we can settle this right now."
    ],
    triggersBattle: true,
    character: {
      name: 'Opp Leader',
      sprite: 'public/sprites/opp_leader.png',
      type: 'Fighting',
      level: 15,
      hp: 200,
      maxHp: 200,
      attack: 85,
      defense: 70,
      speed: 65,
      moves: [
        { name: 'Opp Pack', type: 'Fighting', power: 70, pp: 10, maxPp: 10, description: 'A devastating physical attack' },
        { name: 'Gang Gang', type: 'Dark', power: 0, pp: 5, maxPp: 5, effect: 'buff', stat: 'attack', amount: 1.5, description: 'Significantly raises Attack' },
        { name: 'Drive By', type: 'Steel', power: 80, pp: 5, maxPp: 5, description: 'An extremely powerful ranged attack' },
        { name: 'Opps K', type: 'Fighting', power: 60, pp: 10, maxPp: 10, effect: 'status', status: 'paralysis', chance: 0.3, description: 'May paralyze the opponent' }
      ]
    }
  },
  {
    id: 'opp_soldier1',
    name: 'Opp Soldier',
    x: 3,
    y: 3,
    sprite: 'public/sprites/opp_soldier.png',
    direction: 'right',
    lines: [
      "On sight! On sight!",
      "We don't play around here.",
      "Let's get it poppin'!"
    ],
    triggersBattle: true,
    character: {
      name: 'Opp Soldier',
      sprite: 'public/sprites/opp_soldier.png',
      type: 'Dark',
      level: 10,
      hp: 160,
      maxHp: 160,
      attack: 70,
      defense: 55,
      speed: 60,
      moves: [
        { name: 'Stick Talk', type: 'Dark', power: 55, pp: 15, maxPp: 15, description: 'A threatening attack' },
        { name: 'Street Tactics', type: 'Dark', power: 0, pp: 10, maxPp: 10, effect: 'buff', stat: 'speed', amount: 1.3, description: 'Raises Speed' },
        { name: 'Set Trippin', type: 'Fighting', power: 45, pp: 15, maxPp: 15, effect: 'debuff', stat: 'defense', amount: 0.8, description: 'Deals damage and lowers Defense' },
        { name: 'Ambush', type: 'Dark', power: 60, pp: 10, maxPp: 10, description: 'A powerful surprise attack' }
      ]
    }
  },
  {
    id: 'opp_soldier2',
    name: 'Opp Soldier',
    x: 11,
    y: 3,
    sprite: 'public/sprites/opp_soldier2.png',
    direction: 'left',
    lines: [
      "You lost or something?",
      "Wrong turn, homie.",
      "This gonna hurt you more than me."
    ],
    triggersBattle: true,
    character: {
      name: 'Opp Soldier',
      sprite: 'public/sprites/opp_soldier2.png',
      type: 'Fire',
      level: 10,
      hp: 155,
      maxHp: 155,
      attack: 75,
      defense: 50,
      speed: 65,
      moves: [
        { name: 'Heat Wave', type: 'Fire', power: 60, pp: 10, maxPp: 10, description: 'A scorching attack that may burn' },
        { name: 'Hood Swagger', type: 'Dark', power: 0, pp: 10, maxPp: 10, effect: 'buff', stat: 'attack', amount: 1.3, description: 'Raises Attack' },
        { name: 'Flame Up', type: 'Fire', power: 50, pp: 15, maxPp: 15, effect: 'status', status: 'burn', chance: 0.3, description: 'May burn the opponent' },
        { name: 'Block Party', type: 'Normal', power: 45, pp: 15, maxPp: 15, description: 'A solid hit' }
      ]
    }
  },
  {
    id: 'opp_soldier3',
    name: 'Opp Soldier',
    x: 3,
    y: 11,
    sprite: 'public/sprites/opp_soldier3.png',
    direction: 'right',
    lines: [
      "End of the line for you.",
      "Ain't no way out now.",
      "Time to catch these hands."
    ],
    triggersBattle: true,
    character: {
      name: 'Opp Soldier',
      sprite: 'public/sprites/opp_soldier3.png',
      type: 'Electric',
      level: 10,
      hp: 150,
      maxHp: 150,
      attack: 65,
      defense: 60,
      speed: 70,
      moves: [
        { name: 'Shock Value', type: 'Electric', power: 55, pp: 15, maxPp: 15, description: 'A shocking attack' },
        { name: 'Charged Up', type: 'Electric', power: 0, pp: 10, maxPp: 10, effect: 'buff', stat: 'speed', amount: 1.3, description: 'Raises Speed' },
        { name: 'Live Wire', type: 'Electric', power: 50, pp: 15, maxPp: 15, effect: 'status', status: 'paralysis', chance: 0.3, description: 'May paralyze the opponent' },
        { name: 'Static Shock', type: 'Electric', power: 60, pp: 10, maxPp: 10, description: 'A powerful electrical attack' }
      ]
    }
  },
  {
    id: 'opp_soldier4',
    name: 'Opp Soldier',
    x: 11,
    y: 11,
    sprite: 'public/sprites/opp_soldier4.png',
    direction: 'left',
    lines: [
      "You walked into the wrong situation.",
      "No mercy in these streets.",
      "It's fade on sight!"
    ],
    triggersBattle: true,
    character: {
      name: 'Opp Soldier',
      sprite: 'public/sprites/opp_soldier4.png',
      type: 'Water',
      level: 10,
      hp: 165,
      maxHp: 165,
      attack: 60,
      defense: 65,
      speed: 55,
      moves: [
        { name: 'Drip Too Hard', type: 'Water', power: 55, pp: 15, maxPp: 15, description: 'A forceful water attack' },
        { name: 'Ice Cold', type: 'Water', power: 0, pp: 10, maxPp: 10, effect: 'buff', stat: 'defense', amount: 1.3, description: 'Raises Defense' },
        { name: 'Flood The Block', type: 'Water', power: 70, pp: 5, maxPp: 5, description: 'An extremely powerful water attack' },
        { name: 'Wave Check', type: 'Water', power: 45, pp: 15, maxPp: 15, effect: 'debuff', stat: 'speed', amount: 0.8, description: 'Deals damage and lowers Speed' }
      ]
    }
  }
];

const OPPS_HOOD_DOORS = [
  { x: 7, y: 13, leadsTo: ZONE_TYPES.STARTER_HOOD, entranceX: 10, entranceY: 2 }
];

// FADE PARK - Map and NPCs
const FADE_PARK_MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1],
  [1, 2, 2, 0, 5, 0, 0, 0, 0, 0, 5, 0, 2, 2, 1],
  [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1],
  [1, 2, 2, 0, 0, 0, 1, 1, 1, 0, 0, 0, 2, 2, 1],
  [1, 2, 2, 0, 0, 1, 1, 5, 1, 1, 0, 0, 2, 2, 1],
  [1, 2, 2, 0, 0, 0, 1, 1, 1, 0, 0, 0, 2, 2, 1],
  [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1],
  [1, 2, 2, 0, 5, 0, 0, 0, 0, 0, 5, 0, 2, 2, 1],
  [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const FADE_PARK_NPCS = [
  {
    id: 'park_champion',
    name: 'Park Champion',
    x: 7,
    y: 7,
    sprite: 'public/sprites/park_champion.png',
    direction: 'down',
    lines: [
      "This park is where legends are made.",
      "I'm the undefeated champion of Fade Park.",
      "Step up if you're ready to be humbled."
    ],
    triggersBattle: true,
    character: {
      name: 'Park Champion',
      sprite: 'public/sprites/park_champion.png',
      type: 'Grass',
      level: 18,
      hp: 220,
      maxHp: 220,
      attack: 90,
      defense: 80,
      speed: 85,
      moves: [
        { name: 'Fade Run', type: 'Fighting', power: 80, pp: 10, maxPp: 10, description: 'A devastating physical attack' },
        { name: 'Park Status', type: 'Grass', power: 0, pp: 5, maxPp: 5, effect: 'buff', stat: 'attack', amount: 1.5, description: 'Significantly raises Attack' },
        { name: 'City Nature', type: 'Grass', power: 70, pp: 10, maxPp: 10, effect: 'status', status: 'sleep', chance: 0.3, description: 'May put the opponent to sleep' },
        { name: 'Champion Style', type: 'Normal', power: 90, pp: 5, maxPp: 5, description: 'The champion\'s signature move' }
      ]
    }
  },
  {
    id: 'park_challenger1',
    name: 'Park Challenger',
    x: 4,
    y: 4,
    sprite: 'public/sprites/park_challenger1.png',
    direction: 'right',
    lines: [
      "You look strong. Let's battle!",
      "I'm training to take on the Park Champion.",
      "Show me what you got!"
    ],
    triggersBattle: true,
    character: {
      name: 'Park Challenger',
      sprite: 'public/sprites/park_challenger1.png',
      type: 'Normal',
      level: 12,
      hp: 170,
      maxHp: 170,
      attack: 65,
      defense: 65,
      speed: 65,
      moves: [
        { name: 'Quick Strike', type: 'Normal', power: 50, pp: 20, maxPp: 20, description: 'A fast, reliable attack' },
        { name: 'Park Training', type: 'Normal', power: 0, pp: 10, maxPp: 10, effect: 'buff', stat: 'speed', amount: 1.3, description: 'Raises Speed' },
        { name: 'Body Slam', type: 'Normal', power: 65, pp: 10, maxPp: 10, effect: 'status', status: 'paralysis', chance: 0.2, description: 'May paralyze the opponent' },
        { name: 'Challenger Spirit', type: 'Fighting', power: 60, pp: 10, maxPp: 10, description: 'A powerful fighting spirit attack' }
      ]
    }
  },
  {
    id: 'park_challenger2',
    name: 'Park Challenger',
    x: 10,
    y: 4,
    sprite: 'public/sprites/park_challenger2.png',
    direction: 'left',
    lines: [
      "This is my training ground.",
      "I come here every day to get stronger.",
      "Let me show you my progress!"
    ],
    triggersBattle: true,
    character: {
      name: 'Park Challenger',
      sprite: 'public/sprites/park_challenger2.png',
      type: 'Flying',
      level: 12,
      hp: 165,
      maxHp: 165,
      attack: 70,
      defense: 60,
      speed: 75,
      moves: [
        { name: 'Air Slash', type: 'Flying', power: 55, pp: 15, maxPp: 15, description: 'A quick aerial attack' },
        { name: 'Wind Rush', type: 'Flying', power: 0, pp: 10, maxPp: 10, effect: 'buff', stat: 'speed', amount: 1.4, description: 'Significantly raises Speed' },
        { name: 'Sky Drop', type: 'Flying', power: 70, pp: 10, maxPp: 10, description: 'A powerful attack from above' },
        { name: 'Breeze Through', type: 'Flying', power: 45, pp: 15, maxPp: 15, effect: 'debuff', stat: 'defense', amount: 0.8, description: 'Deals damage and lowers Defense' }
      ]
    }
  },
  {
    id: 'park_challenger3',
    name: 'Park Challenger',
    x: 4,
    y: 10,
    sprite: 'public/sprites/park_challenger3.png',
    direction: 'right',
    lines: [
      "I heard you've been winning battles.",
      "Let's see if the rumors are true.",
      "Give me your best shot!"
    ],
    triggersBattle: true,
    character: {
      name: 'Park Challenger',
      sprite: 'public/sprites/park_challenger3.png',
      type: 'Rock',
      level: 12,
      hp: 180,
      maxHp: 180,
      attack: 75,
      defense: 80,
      speed: 50,
      moves: [
        { name: 'Rock Throw', type: 'Rock', power: 60, pp: 15, maxPp: 15, description: 'A solid rock attack' },
        { name: 'Concrete Jungle', type: 'Rock', power: 0, pp: 10, maxPp: 10, effect: 'buff', stat: 'defense', amount: 1.4, description: 'Significantly raises Defense' },
        { name: 'Stone Edge', type: 'Rock', power: 75, pp: 5, maxPp: 5, description: 'A devastating rock attack' },
        { name: 'Ground Game', type: 'Ground', power: 65, pp: 10, maxPp: 10, effect: 'status', status: 'confusion', chance: 0.2, description: 'May confuse the opponent' }
      ]
    }
  },
  {
    id: 'park_challenger4',
    name: 'Park Challenger',
    x: 10,
    y: 10,
    sprite: 'public/sprites/park_challenger4.png',
    direction: 'left',
    lines: [
      "People come to Fade Park to prove themselves.",
      "I'm here to be the best there ever was.",
      "Show me if you have what it takes!"
    ],
    triggersBattle: true,
    character: {
      name: 'Park Challenger',
      sprite: 'public/sprites/park_challenger4.png',
      type: 'Ice',
      level: 12,
      hp: 160,
      maxHp: 160,
      attack: 70,
      defense: 65,
      speed: 70,
      moves: [
        { name: 'Ice Punch', type: 'Ice', power: 55, pp: 15, maxPp: 15, description: 'A freezing punch attack' },
        { name: 'Cold Heart', type: 'Ice', power: 0, pp: 10, maxPp: 10, effect: 'buff', stat: 'attack', amount: 1.3, description: 'Raises Attack' },
        { name: 'Frost Bite', type: 'Ice', power: 60, pp: 10, maxPp: 10, effect: 'status', status: 'freeze', chance: 0.2, description: 'May freeze the opponent' },
        { name: 'Icy Wind', type: 'Ice', power: 55, pp: 15, maxPp: 15, effect: 'debuff', stat: 'speed', amount: 0.8, description: 'Deals damage and lowers Speed' }
      ]
    }
  }
];

const FADE_PARK_DOORS = [
  { x: 7, y: 13, leadsTo: ZONE_TYPES.STARTER_HOOD, entranceX: 3, entranceY: 2 }
];

// Player state in overworld
let player = {
  x: 7, // Starting X position
  y: 7, // Starting Y position
  direction: 'down',
  sprite: '', // Set based on selected character
  speed: 5, // Movement speed
  stepCount: 0,
  inTrapZone: false,
  activeQuests: [],
  completedQuests: []
};

// Current zone and map state
let currentZone = ZONE_TYPES.STARTER_HOOD;
let currentMap = STARTER_HOOD_MAP;
let currentNpcs = STARTER_HOOD_NPCS;
let currentDoors = STARTER_HOOD_DOORS;

// Add movement cooldown to prevent super fast movement
// This variable is used by both keyboard and mobile controls
let lastMoveTime = 0;

// UI elements (will be initialized when overworld loads)
let overworldContainer;
let mapContainer;
let playerSprite;
let dialogueBox;
let npcs = [];

// Initialize overworld after character selection
function initOverworld(selectedCharacter) {
  console.log("Initializing overworld with character:", selectedCharacter);
  
  try {
    // Preload sprites if sprite manager exists
    if (window.SpriteManager && window.SpriteManager.preloadSprites) {
      console.log("Preloading character sprite assets");
      window.SpriteManager.preloadSprites();
    }
    
    // Create player object if it doesn't exist
    if (!player) {
      player = {
        x: 7,
        y: 7,
        direction: 'down',
        isMoving: false,
        characterId: 0,
        characterName: 'Player',
        stepCount: 0,
        inTrapZone: false,
        hasInitialPosition: false
      };
    } else {
      // Initialize player movement state for animations
      player.isMoving = false;
    }
    
    // Store the selected character ID/name, but don't use their sprite for movement
    if (selectedCharacter && selectedCharacter.id) {
      player.characterId = selectedCharacter.id;
      player.characterName = selectedCharacter.name;
      // Only store character sprite for battle, not for overworld
      player.characterSprite = selectedCharacter.sprite;
      // Set player.sprite to a fixed overworld sprite
      player.sprite = 'public/sprites/player_overworld.png';
      
      // Check if there's a window.playerTeam and make it accessible when battles start
      if (window.playerTeam && Array.isArray(window.playerTeam) && window.playerTeam.length > 0) {
        console.log("Player team found in window object:", window.playerTeam.length, "characters");
        
        // Make sure selected character is in the team
        const hasSelectedCharacter = window.playerTeam.some(char => 
          char.id === selectedCharacter.id || char.name === selectedCharacter.name);
          
        if (!hasSelectedCharacter && selectedCharacter.id) {
          console.log("Adding selected character to player team");
          window.playerTeam.push(selectedCharacter);
        }
      } else {
        // If no playerTeam is set globally, create one from the selected character
        // This is a fallback in case the team selection didn't initialize the team properly
        console.warn("No player team found, creating from selected character");
        window.playerTeam = [selectedCharacter];
      }
      
      // Make sure the global player team is properly initialized with at least one character
      if (!window.playerTeam || window.playerTeam.length === 0) {
        console.error("Player team is still empty after initialization attempt");
        window.playerTeam = [{
          id: "rastamon",
          name: "Rastamon",
          hp: 200,
          maxHp: 200,
          attack: 150,
          defense: 130,
          speed: 130,
          type: "Plant",
          sprite: "https://i.imgur.com/dZWWrrs.png",
          moves: [
            { name: "Blunt Force", type: "Plant", power: 50, pp: 15, maxPp: 15, description: "Plant-type whip attack with dreadlocks." },
            { name: "Hotbox", type: "Fire", power: 30, pp: 10, maxPp: 10, effect: 'status', status: 'confusion', chance: 0.3, description: "May confuse the opponent" },
            { name: "Irie Recharge", type: "Plant", power: 0, pp: 5, maxPp: 5, effect: 'heal', amount: 40, description: "Healing move that restores HP." }
          ]
        }];
        console.warn("Using Rastamon character as fallback for player team");
      }
      
      // Ensure character sprites are properly standardized
      window.playerTeam.forEach(character => {
        if (character.sprite && typeof window.standardizeSpritePath === 'function') {
          character.sprite = window.standardizeSpritePath(character.sprite);
        }
      });
    } else {
      console.warn("No character provided, using default");
      player.characterId = 0;
      player.characterName = "Unknown";
      
      // Try to get a character from the player team
      if (window.playerTeam && window.playerTeam.length > 0) {
        player.characterId = window.playerTeam[0].id;
        player.characterName = window.playerTeam[0].name;
        player.characterSprite = window.playerTeam[0].sprite;
      }
    }
    
    // First, hide other screens
    const battleScreen = document.getElementById('battle-screen');
    if (battleScreen) battleScreen.style.display = 'none';
    
    const charSelection = document.getElementById('character-selection');
    if (charSelection) charSelection.style.display = 'none';
    
    const gameOver = document.getElementById('game-over');
    if (gameOver) gameOver.style.display = 'none';
    
    // Create or update the overworld UI
    const existingContainer = document.getElementById('overworld-container');
    if (!existingContainer) {
      console.log("Creating new overworld UI");
      createOverworldUI();
    } else {
      console.log("Using existing overworld UI");
      overworldContainer = existingContainer;
      mapContainer = document.getElementById('map-container');
      playerSprite = document.getElementById('player-sprite');
      dialogueBox = document.getElementById('dialogue-box');
      
      // Make sure map container is clear before re-rendering
      if (mapContainer) {
        mapContainer.innerHTML = '';
        if (playerSprite) mapContainer.appendChild(playerSprite);
      }
    }
    
    // Double-check that all UI elements are defined
    if (!overworldContainer || !mapContainer || !playerSprite) {
      console.error("Overworld UI elements not properly initialized!");
      console.log("Container:", overworldContainer);
      console.log("Map:", mapContainer);
      console.log("Player:", playerSprite);
      
      // Try to recover by creating the UI again
      createOverworldUI();
      
      // Check again after recovery attempt
      if (!overworldContainer || !mapContainer || !playerSprite) {
        console.error("Failed to initialize overworld UI even after recovery attempt");
        return; // Give up to prevent further errors
      }
    }
    
    // Set overworld to be visible
    overworldContainer.style.display = 'flex';
    
    // Reset player to starting position if needed
    if (!player.hasInitialPosition) {
      player.x = 7; // Starting X position
      player.y = 7; // Starting Y position
      player.hasInitialPosition = true;
    }
    
    // Safety check - ensure player position is within map bounds
    if (currentMap && currentMap.length > 0) {
      if (player.y >= currentMap.length) {
        player.y = currentMap.length - 2;
      }
      if (player.x >= currentMap[0].length) {
        player.x = currentMap[0].length - 2;
      }
      if (player.y < 1) player.y = 1;
      if (player.x < 1) player.x = 1;
      console.log("Player position after bounds check:", player.x, player.y);
    }
    
    // Render the map
    renderMap();
    
    // Update the visual position of the player sprite
    updatePlayerPosition();
    
    // Set up NPCs
    renderNpcs();
    
    // Set up keyboard controls
    setupOverworldControls();
    
    // Set up mobile controls for touchscreens
    setupMobileOverworldControls();
    
    // Play overworld music
    playOverworldMusic();
    
    console.log("Overworld initialization complete");
  } catch (error) {
    console.error("Error initializing overworld:", error);
  }
}

// Create UI elements for overworld
function createOverworldUI() {
  console.log("Creating or updating overworld UI...");
  
  // Check if overworld container already exists
  let existingContainer = document.getElementById('overworld-container');
  
  if (!existingContainer) {
    console.log("No existing overworld container, creating new one");
    // Create container if it doesn't exist
    overworldContainer = document.createElement('div');
    overworldContainer.id = 'overworld-container';
    overworldContainer.style.width = '100%';
    overworldContainer.style.height = '100%';
    overworldContainer.style.position = 'relative';
    overworldContainer.style.display = 'flex';
    overworldContainer.style.flexDirection = 'column';
    overworldContainer.style.backgroundColor = '#222';
    document.body.appendChild(overworldContainer);
  } else {
    console.log("Using existing overworld container");
    // Use existing container
    overworldContainer = existingContainer;
    // Clear it for fresh content
    overworldContainer.innerHTML = '';
  }
  
  // Create map container with explicit styles
  mapContainer = document.createElement('div');
  mapContainer.id = 'map-container';
  mapContainer.style.position = 'relative';
  mapContainer.style.width = '100%';
  mapContainer.style.height = '100%';
  mapContainer.style.overflow = 'hidden';
  overworldContainer.appendChild(mapContainer);
  
  // Create player sprite with explicit styles
  playerSprite = document.createElement('div');
  playerSprite.id = 'player-sprite';
  playerSprite.style.position = 'absolute';
  playerSprite.style.width = '64px';
  playerSprite.style.height = '64px';
  playerSprite.style.zIndex = '10';
  playerSprite.style.transition = 'left 0.2s, top 0.2s';
  mapContainer.appendChild(playerSprite);
  
  // Create dialogue box (initially hidden)
  dialogueBox = document.createElement('div');
  dialogueBox.id = 'dialogue-box';
  
  // Create dialogue content
  const dialogueContent = document.createElement('div');
  dialogueContent.className = 'dialogue-content';
  
  // Create text and name elements
  const nameElement = document.createElement('p');
  nameElement.id = 'dialogue-name';
  
  const textElement = document.createElement('p');
  textElement.id = 'dialogue-text';
  
  // Add text elements to content - name first, then text
  dialogueContent.appendChild(nameElement);
  dialogueContent.appendChild(textElement);
  
  // Create controls
  const dialogueControls = document.createElement('div');
  dialogueControls.className = 'dialogue-controls';
  
  const nextButton = document.createElement('button');
  nextButton.id = 'dialogue-next';
  nextButton.textContent = 'Next';
  
  // Add button to controls
  dialogueControls.appendChild(nextButton);
  
  // Add content and controls to dialogue box
  dialogueBox.appendChild(dialogueContent);
  dialogueBox.appendChild(dialogueControls);
  
  // Hide dialogue box initially
  dialogueBox.style.display = 'none';
  overworldContainer.appendChild(dialogueBox);
  
  // Set up dialogue controls
  nextButton.addEventListener('click', advanceDialogue);
  
  // Render the map initially
  renderMap();
}

// Render the map grid based on current zone
function renderMap() {
  try {
    console.log("Rendering map for zone:", currentZone);
    
    // Check if mapContainer exists
    if (!mapContainer) {
      console.error("Map container not found!");
      throw new Error("Map container is missing");
    }
    
    // Use a document fragment for better performance (single reflow)
    const mapFragment = document.createDocumentFragment();
    
    // Render each tile based on map data
    const tileSize = 64; // Each tile is 64x64 pixels for new tileset
    
    // Check if current map is defined and valid
    if (!currentMap || !Array.isArray(currentMap) || currentMap.length === 0) {
      console.error("Current map is invalid:", currentMap);
      throw new Error("Invalid map data");
    }
    
    console.log(`Rendering map with dimensions: ${currentMap[0].length}x${currentMap.length}`);
    
    // Track tile counts for debugging
    const tileCounts = {
      walkable: 0,
      blocked: 0,
      grass: 0,
      trapZone: 0,
      door: 0,
      npc: 0,
      unknown: 0
    };
    
    // Create all tiles at once
    for (let y = 0; y < currentMap.length; y++) {
      for (let x = 0; x < currentMap[y].length; x++) {
        const tileType = currentMap[y][x];
        const tile = document.createElement('div');
        tile.className = 'map-tile';
        tile.style.left = `${x * tileSize}px`;
        tile.style.top = `${y * tileSize}px`;
        tile.style.width = `${tileSize}px`;
        tile.style.height = `${tileSize}px`;
        
        // Add data attributes for debugging
        tile.dataset.x = x;
        tile.dataset.y = y;
        tile.dataset.type = tileType;
        
        // Use the new tileset with proper sprite positions
        // The tileset is organized in a 4x4 grid with different tiles
        const tilesetUrl = 'public/images/tileset.png';
        
        // These offset values are based on the tileset image where each tile is 64x64 pixels
        // The new tileset has 16 tiles in a 4x4 grid
        // First row: concrete, concrete with cracks, dark concrete, line, grass
        // Second row: dirt, dirt path, stone wall, grass/dirt edge
        // Third row: grass with small dirt spots, increasing sizes
        // Fourth row: More grass/dirt patterns, stone path
        const tileOffsets = {
          [TILE_TYPES.WALKABLE]: { x: 0, y: 0 },      // Concrete (top-left)
          [TILE_TYPES.BLOCKED]: { x: 2, y: 1 },       // Stone wall (3rd column, 2nd row)
          [TILE_TYPES.GRASS]: { x: 3, y: 0 },         // Grass (top-right)
          [TILE_TYPES.TRAP_ZONE]: { x: 0, y: 1 },     // Dirt (2nd row, 1st column)
          [TILE_TYPES.DOOR]: { x: 2, y: 3 }           // Stone path (3rd column, 4th row)
        };
        
        // Apply tile-specific styles
        switch (tileType) {
          case TILE_TYPES.WALKABLE:
            tile.classList.add('walkable');
            tileCounts.walkable++;
            break;
          case TILE_TYPES.BLOCKED:
            tile.classList.add('blocked');
            tileCounts.blocked++;
            break;
          case TILE_TYPES.GRASS:
            tile.classList.add('grass');
            tileCounts.grass++;
            break;
          case TILE_TYPES.TRAP_ZONE:
            tile.classList.add('trap-zone');
            tileCounts.trapZone++;
            break;
          case TILE_TYPES.DOOR:
            tile.classList.add('door');
            // Add a visual indicator for doors to make them more visible
            tile.innerHTML = '<div class="door-indicator"></div>';
            tileCounts.door++;
            break;
          case TILE_TYPES.NPC:
            // Just render as walkable, NPCs will be added separately
            tile.classList.add('walkable');
            tileCounts.npc++;
            break;
          default:
            // Unknown tile type - use walkable as fallback
            console.warn(`Unknown tile type: ${tileType} at position (${x},${y})`);
            tile.classList.add('walkable');
            tileCounts.unknown++;
        }
        
        // Apply the tileset background with proper sprite coordinates
        const tileOffset = tileOffsets[tileType];
        if (tileOffset) {
          // Calculate background position using the tileset coordinates
          // Each tile is 64x64 pixels in a 4x4 grid
          const bgPosX = -(tileOffset.x * 64);
          const bgPosY = -(tileOffset.y * 64);
          
          // Apply the tileset as background image with the correct positioning
          tile.style.backgroundImage = `url('${tilesetUrl}')`;
          tile.style.backgroundSize = '256px 256px'; // Total tileset size (4*64 x 4*64)
          tile.style.backgroundPosition = `${bgPosX}px ${bgPosY}px`;
          tile.style.backgroundRepeat = 'no-repeat';
        }
        
        // Add to fragment instead of directly to DOM
        mapFragment.appendChild(tile);
      }
    }
    
    // Clear existing map properly
    while (mapContainer.firstChild) {
      mapContainer.removeChild(mapContainer.firstChild);
    }
    
    // Add all tiles at once (single reflow)
    mapContainer.appendChild(mapFragment);
    
    // Add player sprite
    if (!playerSprite) {
      console.error("Player sprite element not found!");
      playerSprite = document.createElement('div');
      playerSprite.id = 'player-sprite';
    }
    
    // Add player to map container (on top of tiles)
    mapContainer.appendChild(playerSprite);
    
    // Update player sprite appearance
    updatePlayerPosition();
    
    // Set player direction class
    playerSprite.className = `facing-${player.direction}`;
    
    // Set player sprite image with pixel art fallback
    if (player.sprite) {
      const img = playerSprite.querySelector('img');
      if (!img) {
        const newImg = document.createElement('img');
        newImg.src = player.sprite;
        newImg.alt = 'Player';
        playerSprite.appendChild(newImg);
      } else if (img.src !== player.sprite) {
        img.src = player.sprite;
      }
    } else {
      console.warn("No player sprite set, using pixel art fallback");
      // Use SVG for pixel art player as fallback
      playerSprite.innerHTML = `
        <svg width="64" height="64" viewBox="0 0 64 64" style="image-rendering: pixelated;">
          <rect x="18" y="12" width="28" height="40" fill="#f25a5a" />
          <rect x="14" y="24" width="36" height="16" fill="#f25a5a" />
          <circle cx="24" cy="26" r="4" fill="#000" />
          <circle cx="40" cy="26" r="4" fill="#000" />
          <rect x="28" y="38" width="8" height="2" fill="#000" />
        </svg>
      `;
    }
    
    console.log("Map rendering complete", tileCounts);
  } catch (error) {
    console.error("Error rendering map:", error);
    // Create a visually appealing error message
    if (mapContainer) {
      mapContainer.innerHTML = `
        <div style="color: white; background-color: rgba(0,0,0,0.8); padding: 20px; 
             border-radius: 8px; border: 2px solid #f25a5a; box-shadow: 0 0 15px rgba(242,90,90,0.5); 
             font-family: 'Press Start 2P', monospace; text-align: center; margin: 20px;">
          <h3 style="color: #f25a5a; margin-bottom: 15px;">Map Error</h3>
          <p>There was a problem loading this area.</p>
          <p>Try returning to the main menu.</p>
          <button onclick="window.location.reload()" 
                  style="background-color: #f25a5a; color: white; border: none; 
                         padding: 8px 15px; margin-top: 15px; cursor: pointer; 
                         font-family: 'Press Start 2P', monospace; font-size: 12px;">
            Reload Game
          </button>
        </div>
      `;
    }
    
    // Recovery attempt with a simple fallback map
    try {
      console.log("Attempting recovery with fallback map");
      setTimeout(() => {
        try {
          // Create a basic fallback map if needed
          const fallbackMap = [
            [1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 1, 1, 1, 1]
          ];
          
          // Only use fallback if rendering completely failed
          if (!mapContainer.querySelector('.map-tile')) {
            console.log("Using fallback map for recovery");
            
            // Store original map data
            const originalMap = currentMap;
            const originalX = player.x;
            const originalY = player.y;
            
            // Reset to safe values
            currentMap = fallbackMap;
            player.x = 2;
            player.y = 2;
            
            // Clear error message and try again
            mapContainer.innerHTML = '';
            renderMap();
          }
        } catch (e) {
          console.error("Fallback map also failed:", e);
        }
      }, 1000);
    } catch (recoveryError) {
      console.error("Recovery attempt failed:", recoveryError);
    }
  }
  
  // Add NPCs to the map
  renderNpcs();
}

// Render NPCs on the map
function renderNpcs() {
  try {
    console.log(`Rendering ${currentNpcs.length} NPCs for zone: ${currentZone}`);
    
    // Remove existing NPCs
    npcs.forEach(npc => {
      if (npc.element && npc.element.parentNode) {
        npc.element.parentNode.removeChild(npc.element);
      }
    });
    
    npcs = [];
    
    // Use document fragment for better performance
    const npcFragment = document.createDocumentFragment();
    
    // Create NPC elements
    currentNpcs.forEach(npcData => {
      try {
        const npcElement = document.createElement('div');
        npcElement.className = 'npc-sprite';
        npcElement.style.left = `${npcData.x * 64}px`;
        npcElement.style.top = `${npcData.y * 64}px`;
        
        // Add identifier attributes
        npcElement.dataset.npcId = npcData.id;
        npcElement.dataset.npcName = npcData.name;
        
        // Use sprite manager if available
        if (window.SpriteManager && window.SpriteManager.updateNpcSprite) {
          npcFragment.appendChild(npcElement);
          window.SpriteManager.updateNpcSprite(npcElement, npcData);
        } else {
          // Legacy sprite handling if sprite manager isn't loaded
          console.log("Using legacy NPC sprite rendering");
          
          // Add visual cues for interactive NPCs
          if (npcData.triggersBattle) {
            npcElement.classList.add('battle-npc');
          } else if (npcData.opensShop) {
            npcElement.classList.add('shop-npc');
          } else if (npcData.givesQuest) {
            npcElement.classList.add('quest-npc');
          }
          
          // Create tooltip with NPC name
          const tooltip = document.createElement('div');
          tooltip.className = 'npc-tooltip';
          tooltip.textContent = npcData.name;
          npcElement.appendChild(tooltip);
          
          // Set NPC appearance with fixed sprite path
          const npcImg = document.createElement('img');
          console.log("NPC " + npcData.name + " sprite URL:", npcData.sprite);
          // Ensure the sprite path is correct
          let spritePath = npcData.sprite;
          if (spritePath.startsWith('./public/')) {
            spritePath = spritePath.replace('./public/', 'public/');
          }
          npcImg.src = spritePath;
          npcImg.alt = npcData.name;
          npcImg.className = `facing-${npcData.direction}`;
          
          // Error handling for sprite loading
          npcImg.onerror = function() {
            console.warn(`Failed to load sprite for NPC: ${npcData.name}`);
            // Use SVG fallback
            npcElement.innerHTML = `
              <svg width="64" height="64" viewBox="0 0 64 64" style="image-rendering: pixelated;">
                <rect x="18" y="12" width="28" height="40" fill="#aaa" />
                <rect x="14" y="24" width="36" height="16" fill="#aaa" />
                <circle cx="24" cy="26" r="4" fill="#000" />
                <circle cx="40" cy="26" r="4" fill="#000" />
                <rect x="28" y="38" width="8" height="2" fill="#000" />
                <text x="32" y="58" text-anchor="middle" font-size="10" fill="#fff">${npcData.name}</text>
              </svg>
            `;
          };
          
          npcElement.appendChild(npcImg);
          npcFragment.appendChild(npcElement);
        }
        
        // Store reference to the element and data
        npcs.push({
          data: npcData,
          element: npcElement
        });
      } catch (npcError) {
        console.error(`Error rendering NPC ${npcData.name}:`, npcError);
      }
    });
    
    // Add all NPCs to map at once
    mapContainer.appendChild(npcFragment);
    
    console.log(`Successfully rendered ${npcs.length} NPCs`);
  } catch (error) {
    console.error("Error in renderNpcs:", error);
  }
}

// Update player position on the map
function updatePlayerPosition() {
  try {
    console.log("Updating player position:", player.x, player.y, player.direction, "isMoving:", player.isMoving);
    
    // Safety check - ensure currentMap exists and is valid
    if (!currentMap || !Array.isArray(currentMap) || currentMap.length === 0) {
      console.error("Current map is invalid or not initialized in updatePlayerPosition");
      return;
    }
    
    // Safety check - ensure player position is valid
    if (player.x < 0 || player.y < 0 || player.y >= currentMap.length || player.x >= currentMap[0].length) {
      console.error("Player position is outside map bounds in updatePlayerPosition:", player.x, player.y);
      // Fix player position
      player.x = Math.min(Math.max(1, player.x), currentMap[0].length - 2);
      player.y = Math.min(Math.max(1, player.y), currentMap.length - 2);
      console.log("Corrected player position to:", player.x, player.y);
    }
    
    if (!playerSprite) {
      console.error("Player sprite element not found in updatePlayerPosition");
      // Try to recover by getting player sprite from DOM
      playerSprite = document.getElementById('player-sprite');
      if (!playerSprite) {
        console.error("Could not recover player sprite element");
        return;
      }
    }
    
    const tileSize = 64;
    playerSprite.style.left = `${player.x * tileSize}px`;
    playerSprite.style.top = `${player.y * tileSize}px`;
    
    // Check if sprite manager is available
    if (window.SpriteManager && typeof window.SpriteManager.updatePlayerSprite === 'function') {
      // Use the player's isMoving state for animation
      const isMoving = player.isMoving || false;
      
      // Use a fixed player sprite for overworld, not character-specific
      const overworldSprite = 'public/sprites/player_overworld.png';
      console.log("Using fixed overworld sprite rather than character-specific sprite");
      window.SpriteManager.updatePlayerSprite(playerSprite, player.direction, isMoving, null);
    } else {
      // Fallback to basic sprite handling if sprite manager isn't loaded
      console.warn("SpriteManager not available, using fallback sprite handling");
      
      // Update player sprite direction
      playerSprite.className = `player-sprite facing-${player.direction}`;
      
      // Set sprite image if not already set
      if (!playerSprite.querySelector('img')) {
        console.log("Adding player sprite image:", player.sprite);
        
        if (!player.sprite) {
          console.warn("No player sprite URL defined, using default");
          
          // Use a character sprite from window.playerTeam if available
          if (window.playerTeam && window.playerTeam.length > 0 && window.playerTeam[0].sprite) {
            player.sprite = window.playerTeam[0].sprite;
            console.log("Using sprite from player team:", player.sprite);
          } else {
            player.sprite = 'https://i.imgur.com/m7Rup7S.png'; // Default fallback sprite
          }
        }
        
        const img = document.createElement('img');
        img.src = player.sprite;
        img.alt = 'Player';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        playerSprite.appendChild(img);
      } else {
        // Update existing sprite image if needed
        const img = playerSprite.querySelector('img');
        if (img.src !== player.sprite && player.sprite) {
          console.log("Updating player sprite image to:", player.sprite);
          img.src = player.sprite;
        }
      }
    }
    
    // Check current tile type after position update
    checkCurrentTile();
  } catch (error) {
    console.error("Error updating player position:", error);
  }
}

// Check the type of tile the player is standing on
function checkCurrentTile() {
  try {
    // Validate player position
    if (!currentMap || 
        player.y < 0 || player.y >= currentMap.length || 
        player.x < 0 || player.x >= currentMap[player.y].length) {
      console.error("Invalid player position:", player.x, player.y);
      return;
    }
    
    const tileType = currentMap[player.y][player.x];
    console.log(`Player at position (${player.x},${player.y}) on tile type: ${tileType}`);
    
    // Handle trap zones (random encounter areas)
    player.inTrapZone = (tileType === TILE_TYPES.TRAP_ZONE);
    
    // Check for door tiles
    if (tileType === TILE_TYPES.DOOR) {
      const door = currentDoors.find(d => d.x === player.x && d.y === player.y);
      if (door) {
        console.log(`Found door leading to ${door.leadsTo} at entrance (${door.entranceX},${door.entranceY})`);
        changeZone(door.leadsTo, door.entranceX, door.entranceY);
      } else {
        console.warn(`Door tile at (${player.x},${player.y}) has no corresponding door data`);
      }
    }
    
    // Check for random encounters in trap zones
    if (player.inTrapZone) {
      player.stepCount++;
      console.log(`In trap zone, step count: ${player.stepCount}`);
      
      if (player.stepCount % 5 === 0) {
        const encounterChance = Math.random();
        if (encounterChance < 0.25) {
          console.log("Random encounter triggered!");
          // 25% chance of random encounter every 5 steps in trap zones
          triggerRandomEncounter();
        } else {
          console.log(`No encounter this time (roll: ${encounterChance.toFixed(2)})`);
        }
      }
    }
  } catch (error) {
    console.error("Error checking current tile:", error);
  }
}

// Handle player movement
function movePlayer(direction) {
  // Store previous position
  const prevX = player.x;
  const prevY = player.y;
  
  // Always update player direction, even if we can't move
  player.direction = direction;
  
  // Update player sprite immediately for direction change
  // This ensures the player always faces the requested direction, even if blocked
  player.isMoving = false;
  updatePlayerPosition();
  
  // Try to update position based on direction
  let canMove = true;
  let newX = player.x;
  let newY = player.y;
  
  // Add a movement cooldown to prevent too fast movement
  const now = Date.now();
  if (now - lastMoveTime < 150) { // 150ms cooldown between movements
    return; // Skip this movement request if too soon
  }
  lastMoveTime = now;
  
  // Safety check - ensure currentMap exists and is valid
  if (!currentMap || !Array.isArray(currentMap) || currentMap.length === 0) {
    console.error("Current map is invalid or not initialized");
    return false;
  }
  
  // Ensure player position is valid before trying to move
  if (player.x < 0 || player.y < 0 || player.y >= currentMap.length || player.x >= currentMap[0].length) {
    console.error("Player position is outside map bounds:", player.x, player.y);
    // Reset to a safe position
    player.x = Math.min(Math.max(1, player.x), currentMap[0].length - 2);
    player.y = Math.min(Math.max(1, player.y), currentMap.length - 2);
    updatePlayerPosition();
    return false;
  }
  
  switch (direction) {
    case 'up':
      if (player.y > 0) newY--;
      else canMove = false;
      break;
    case 'down':
      if (player.y < currentMap.length - 1) newY++;
      else canMove = false;
      break;
    case 'left':
      if (player.x > 0) newX--;
      else canMove = false;
      break;
    case 'right':
      if (player.x < currentMap[0].length - 1) newX++;
      else canMove = false;
      break;
  }
  
  // Safety check - ensure the new position is within bounds
  if (newY < 0 || newY >= currentMap.length || newX < 0 || newX >= currentMap[0].length) {
    console.error("New position would be outside map bounds:", newX, newY);
    canMove = false;
  }
  
  // Check for collision with blocked tiles
  if (canMove && currentMap[newY][newX] === TILE_TYPES.BLOCKED) {
    console.log(`Tile at (${newX},${newY}) is blocked`);
    canMove = false;
  }
  
  // Check for NPC collision
  if (canMove) {
    const npcAtPosition = currentNpcs.find(npc => npc.x === newX && npc.y === newY);
    if (npcAtPosition) {
      console.log(`NPC ${npcAtPosition.name} is blocking at (${newX},${newY})`);
      canMove = false;
    }
  }
  
  // Only update position if we can move
  if (canMove) {
    player.x = newX;
    player.y = newY;
    
    // Set player as moving (for animation)
    player.isMoving = true;
    
    // Update player position on screen with movement animation
    updatePlayerPosition();
    
    // After a slightly longer delay, set player as not moving (stop animation)
    // This gives the animation more time to complete for smoother movement
    setTimeout(() => {
      player.isMoving = false;
      updatePlayerPosition();
    }, 350); // Animation lasts longer to match CSS transition
  }
  
  return canMove;
}

// Set up keyboard controls for overworld
function setupOverworldControls() {
  document.addEventListener('keydown', handleKeyPress);
}

// Handle keyboard input
// Player movement cooldown to prevent moving too quickly 
// Using the global lastMoveTime variable declared at the top of the file
const MOVE_COOLDOWN = 150; // milliseconds

function handleKeyPress(e) {
  try {
    // Check if dialogueBox exists and is initialized
    if (!dialogueBox) {
      console.error("Dialogue box not found in handleKeyPress");
      return;
    }
    
    // Current time for cooldown check
    const now = Date.now();
    
    // Only process movement if dialogue is not active
    if (dialogueBox.style.display === 'none') {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (now - lastMoveTime >= MOVE_COOLDOWN) {
            movePlayer('up');
            lastMoveTime = now;
          }
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (now - lastMoveTime >= MOVE_COOLDOWN) {
            movePlayer('down');
            lastMoveTime = now;
          }
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (now - lastMoveTime >= MOVE_COOLDOWN) {
            movePlayer('left');
            lastMoveTime = now;
          }
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (now - lastMoveTime >= MOVE_COOLDOWN) {
            movePlayer('right');
            lastMoveTime = now;
          }
          break;
        case ' ':
        case 'Enter':
        case 'e':
        case 'E':
          // Interact with NPC or object in front of player
          console.log("Interaction key pressed, attempting to interact with facing tile");
          interactWithFacingTile();
          break;
      }
    } else if (e.key === ' ' || e.key === 'Enter') {
      // Advance dialogue when space or enter is pressed
      advanceDialogue();
    }
  } catch (error) {
    console.error("Error handling key press:", error);
  }
}

// Set up mobile controls for overworld
function setupMobileOverworldControls() {
  try {
    const mobileControls = document.getElementById('mobile-controls-container');
    
    // Update the mobile controls to work with overworld
    if (mobileControls) {
      // Make sure mobile controls are visible on overworld
      mobileControls.style.display = 'block';
      mobileControls.style.visibility = 'visible';
      mobileControls.style.opacity = '1';
      mobileControls.style.zIndex = '9999';
      
      // The mobile controls use an iframe, so we need to communicate with it
      window.addEventListener('message', (event) => {
        try {
          console.log("Received message in overworld:", event.data);
          
          // Handle keypresses from mobile-controls.html
          if (event.data && event.data.type === 'keypress') {
            console.log("Processing keypress in overworld:", event.data.key);
            
            // Current time for cooldown check
            const now = Date.now();
            
            // Map the keypress to the appropriate action
            switch (event.data.key) {
              case 'ArrowUp':
                if (now - lastMoveTime >= MOVE_COOLDOWN) {
                  movePlayer('up');
                  lastMoveTime = now;
                }
                break;
              case 'ArrowDown':
                if (now - lastMoveTime >= MOVE_COOLDOWN) {
                  movePlayer('down');
                  lastMoveTime = now;
                }
                break;
              case 'ArrowLeft':
                if (now - lastMoveTime >= MOVE_COOLDOWN) {
                  movePlayer('left');
                  lastMoveTime = now;
                }
                break;
              case 'ArrowRight':
                if (now - lastMoveTime >= MOVE_COOLDOWN) {
                  movePlayer('right');
                  lastMoveTime = now;
                }
                break;
              case 'Enter':
              case 'A':
                console.log("A button pressed, checking if dialogue is active");
                // Check if dialogue box is active
                if (dialogueBox && dialogueBox.style.display !== 'none') {
                  console.log("Dialogue box is active, advancing dialogue");
                  advanceDialogue();
                } else {
                  console.log("No active dialogue, attempting to interact with facing tile");
                  interactWithFacingTile();
                }
                break;
              case 'Escape':
              case 'B':
                // Cancel current action or close dialogs
                if (dialogueBox && dialogueBox.style.display !== 'none') {
                  dialogueBox.style.display = 'none';
                }
                break;
            }
          } else if (event.data && event.data.type === 'mobileControl') {
            switch (event.data.button) {
              case 'up':
                movePlayer('up');
                break;
              case 'down':
                movePlayer('down');
                break;
              case 'left':
                movePlayer('left');
                break;
              case 'right':
                movePlayer('right');
                break;
              case 'a':
                // Check if dialogue box is active
                if (dialogueBox && dialogueBox.style && dialogueBox.style.display !== 'none') {
                  advanceDialogue();
                } else {
                  interactWithFacingTile();
                }
                break;
              case 'b':
                // Can be used for cancelling dialogue or interactions
                if (dialogueBox && dialogueBox.style && dialogueBox.style.display !== 'none') {
                  dialogueBox.style.display = 'none';
                }
                break;
            }
          }
        } catch (error) {
          console.error("Error in mobile control event handler:", error);
        }
      });
    } else {
      console.log("Mobile controls container not found, mobile controls will not be available");
    }
  } catch (error) {
    console.error("Error setting up mobile controls:", error);
  }
}

// Get the tile in front of the player
function getTileFacingPlayer() {
  let x = player.x;
  let y = player.y;
  
  switch (player.direction) {
    case 'up':
      y--;
      break;
    case 'down':
      y++;
      break;
    case 'left':
      x--;
      break;
    case 'right':
      x++;
      break;
  }
  
  // Check if coordinates are valid
  if (y >= 0 && y < currentMap.length && x >= 0 && x < currentMap[0].length) {
    return { x, y, type: currentMap[y][x] };
  }
  
  return null;
}

// Interact with tile or NPC in front of player
function interactWithFacingTile() {
  const facingTile = getTileFacingPlayer();
  if (!facingTile) return;
  
  // Check for NPCs at the facing tile
  const npcAtTile = currentNpcs.find(npc => npc.x === facingTile.x && npc.y === facingTile.y);
  
  if (npcAtTile) {
    // Start dialogue with NPC
    startDialogue(npcAtTile);
  } else if (facingTile.type === TILE_TYPES.DOOR) {
    // Interact with door
    const door = currentDoors.find(d => d.x === facingTile.x && d.y === facingTile.y);
    if (door) {
      changeZone(door.leadsTo, door.entranceX, door.entranceY);
    }
  }
}

// Start dialogue with an NPC
let currentDialogue = null;
let currentDialogueLine = 0;

function startDialogue(npc) {
  try {
    if (!dialogueBox) {
      console.error("Dialogue box element not found!");
      return;
    }
    
    // Set current dialogue reference
    currentDialogue = npc;
    currentDialogueLine = 0;
    
    // Get name element and update its content
    const nameElement = document.getElementById('dialogue-name');
    if (nameElement) {
      nameElement.textContent = npc.name;
    } else {
      console.error("Dialogue name element not found!");
    }
    
    // Show first line of dialogue
    const textElement = document.getElementById('dialogue-text');
    if (textElement) {
      textElement.textContent = npc.lines[currentDialogueLine];
    } else {
      console.error("Dialogue text element not found!");
    }
    
    // Show the dialogue box
    dialogueBox.style.display = 'block';
    
    // Play dialogue sound
    if (typeof playSwitchSound === 'function') {
      playSwitchSound();
    } else {
      console.warn("Switch sound function not available");
    }
  } catch (error) {
    console.error("Error starting dialogue:", error);
  }
}

// Advance to next dialogue line or end dialogue
function advanceDialogue() {
  try {
    if (!currentDialogue) return;
    
    currentDialogueLine++;
    
    // Check if we've reached the end of dialogue
    if (currentDialogueLine >= currentDialogue.lines.length) {
      // End dialogue
      if (dialogueBox && dialogueBox.style) {
        dialogueBox.style.display = 'none';
      }
      
      // Check for battle trigger
      if (currentDialogue.triggersBattle) {
        startNpcBattle(currentDialogue);
      }
      
      // Check for shop opening
      if (currentDialogue.opensShop && typeof openShop === 'function' && typeof window.gameShops !== 'undefined') {
        // Use window.gameShops to ensure we access the global shop data that's properly initialized
        openShop(window.gameShops[currentDialogue.shopType]);
      }
      
      // Check for quest giving
      if (currentDialogue.givesQuest) {
        giveQuest(currentDialogue.quest);
      }
      
      currentDialogue = null;
      return;
    }
    
    // Show next line
    const textElement = document.getElementById('dialogue-text');
    if (textElement) {
      textElement.textContent = currentDialogue.lines[currentDialogueLine];
    } else {
      console.error("Dialogue text element not found!");
    }
    
    // Play dialogue sound
    if (typeof playSwitchSound === 'function') {
      playSwitchSound();
    }
  } catch (error) {
    console.error("Error advancing dialogue:", error);
  }
}

// Trigger a battle with an NPC
function startNpcBattle(npc) {
  try {
    console.log("Starting NPC battle with NPC:", npc.name);
    
    // Set game mode to story mode for team validation requirements
    window.currentGameMode = 'story';
    
    // Make sure we have a player team for the battle
    if (!window.playerTeam || !Array.isArray(window.playerTeam) || window.playerTeam.length === 0) {
      console.warn("No player team found, creating fallback team from player character");
      
      // Get known default character sprites that work properly
      const defaultSprite = "https://i.imgur.com/YeMI4sr.png"; // Fitness Bro sprite
      
      // Create a simple character if no team exists, with a sprite URL we know works
      window.playerTeam = [{
        id: "player",
        name: player.characterName || "Fitness Bro", // Use a known character name
        hp: 100,
        maxHp: 100,
        attack: 50,
        defense: 50,
        speed: 50,
        image: defaultSprite,
        sprite: defaultSprite, // Use a sprite we know works with imgur URL format
        type: "Fire", // Match the character type
        moves: [
          { name: "Basic Attack", type: "Normal", power: 40, pp: 15, maxPp: 15, description: "A standard attack" }
        ]
      }];
      
      console.log("Created fallback player with sprite:", defaultSprite);
    } else {
      console.log("Using existing player team for battle:", window.playerTeam);
    }
    
    // Make sure we have at least one character with standardized sprites
    if (window.playerTeam.length === 0) {
      console.error("Player team is empty after initialization, battle cannot proceed");
      return;
    }
    
    // Ensure all player sprites use the imgur URL format for consistency
    window.playerTeam.forEach(character => {
      if (character.sprite) {
        // Check if it's already an imgur URL
        if (!character.sprite.includes('imgur.com')) {
          console.log(`Converting sprite format for ${character.name}:`, character.sprite);
          
          // Map known character sprites to their imgur URLs
          if (character.name.includes("Fitness")) {
            character.sprite = "https://i.imgur.com/YeMI4sr.png";
          } else if (character.name.includes("Rasta")) {
            character.sprite = "https://i.imgur.com/dZWWrrs.png";
          } else {
            // Default to fitness bro as fallback
            character.sprite = "https://i.imgur.com/YeMI4sr.png";
          }
          
          console.log(`Sprite converted to:`, character.sprite);
        }
      }
    });
    
    // Make sure local playerTeam variable is synced with window.playerTeam if it exists
    if (typeof playerTeam !== 'undefined') {
      console.log("Syncing local playerTeam variable with window.playerTeam");
      playerTeam = window.playerTeam.slice(); // Create a copy to avoid reference issues
    }
    
    // Instead of using the NPC as a character in the battle, we'll create a random team 
    // from predefined characters
    
    // Define characters if window.characters isn't available
    let battleCharacters = [];
    if (window.characters && window.characters.length > 0) {
      battleCharacters = window.characters;
    } else {
      // Fallback characters for battles - use characters from our actual game data with proper image links
      battleCharacters = [
        {
          id: "battle1",
          name: "Rastamon",
          sprite: "https://i.imgur.com/dZWWrrs.png", // Updated rasta image link
          type: "Plant",
          hp: 200,
          attack: 150,
          defense: 130,
          speed: 130,
          moves: [
            { name: "Dreadlock Whip", type: "Plant", power: 50, pp: 15, maxPp: 15, description: "Plant-type whip attack with dreadlocks." },
            { name: "6 Rasclaat Eggs?!", type: "Fire", power: 70, pp: 10, maxPp: 10, description: "Fiery attack that may cause 'sleep' status." },
            { name: "Irie Recharge", type: "Plant", power: 0, pp: 5, maxPp: 5, effect: 'heal', amount: 40, description: "Healing move that restores HP." },
            { name: "Chill Vibes", type: "Normal", power: 40, pp: 10, maxPp: 10, effect: 'debuff', stat: 'speed', amount: 0.8, description: "Lowers opponent's speed with relaxed energy." }
          ]
        },
        {
          id: "battle2",
          name: "Fitness Bro",
          sprite: "https://i.imgur.com/YeMI4sr.png", // Updated fitness image link
          type: "Fire",
          hp: 230,
          attack: 170,
          defense: 130,
          speed: 120,
          moves: [
            { name: "Squat Slap", type: "Normal", power: 45, pp: 15, maxPp: 15, description: "Physical attack with leg strength." },
            { name: "Protein Powder Burn", type: "Fire", power: 45, pp: 10, maxPp: 10, effect: 'status', status: 'burn', chance: 0.3, description: "Fire-type attack that may cause 'burn' status." },
            { name: "Flex on 'Em", type: "Normal", power: 0, pp: 5, maxPp: 5, effect: 'buff', stat: 'defense', amount: 1.5, description: "Boosts defense by showing off muscles." },
            { name: "Gym Motivation", type: "Fire", power: 50, pp: 10, maxPp: 10, description: "Energetic attack with fiery passion." }
          ]
        },
        {
          id: "battle3",
          name: "Techy",
          sprite: "https://i.imgur.com/VVa9pm9.png", // Updated techy image link
          type: "Electric",
          hp: 170,
          attack: 150,
          defense: 150,
          speed: 190,
          moves: [
            { name: "Keyboard Smash", type: "Electric", power: 60, pp: 15, maxPp: 15, description: "Electric attack that may cause 'paralysis'." },
            { name: "404 Headshot", type: "Dark", power: 80, pp: 10, maxPp: 10, description: "Powerful dark-type attack with high damage." },
            { name: "Caffeine Overload", type: "Electric", power: 0, pp: 5, maxPp: 5, effect: 'buff', stat: 'speed', amount: 1.5, description: "Boosts speed with excessive caffeine." },
            { name: "Code Error", type: "Electric", power: 65, pp: 10, maxPp: 10, effect: 'status', status: 'confusion', chance: 0.3, description: "Buggy attack that may confuse the opponent." }
          ]
        },
        {
          id: "battle4",
          name: "Cool Vibe YN",
          sprite: "https://i.imgur.com/2n71aSJ.png", // Cool vibe image
          type: "Water",
          hp: 190,
          attack: 170,
          defense: 130,
          speed: 150,
          moves: [
            { name: "Splash Dat Ass", type: "Water", power: 50, pp: 15, maxPp: 15, description: "Water attack that causes 'wet' status." },
            { name: "Wave Check Fade", type: "Water", power: 70, pp: 10, maxPp: 10, effect: 'status', status: 'sleep', chance: 0.3, description: "Wave-based attack that might put opponent to sleep." },
            { name: "Call Girls for Gang", type: "Water", power: 0, pp: 5, maxPp: 5, effect: 'heal', amount: 50, description: "Healing move that restores HP." },
            { name: "Flow State", type: "Water", power: 60, pp: 10, maxPp: 10, description: "Smooth attack with increased critical hit chance." }
          ]
        },
        {
          id: "battle5",
          name: "9-5 Homie",
          sprite: "https://i.imgur.com/UkE9crR.png", // 9-5 homie image
          type: "Rock",
          hp: 210,
          attack: 130,
          defense: 150,
          speed: 180,
          moves: [
            { name: "Cubicle Clapback", type: "Normal", power: 50, pp: 15, maxPp: 15, description: "Office-themed attack with moderate damage." },
            { name: "Overtime Overload", type: "Electric", power: 65, pp: 10, maxPp: 10, effect: 'status', status: 'paralysis', chance: 0.3, description: "Stressful attack that may cause paralysis." },
            { name: "PTO Prayer", type: "Normal", power: 0, pp: 5, maxPp: 5, effect: 'heal', amount: 45, description: "Healing move that gives a much-needed break." },
            { name: "Monday Mayhem", type: "Rock", power: 55, pp: 10, maxPp: 10, description: "Rock-solid attack fueled by beginning-of-week dread." }
          ]
        },
        {
          id: "battle6",
          name: "All Jokes YN",
          sprite: "https://i.imgur.com/9hFTFQt.png", // All jokes image
          type: "Normal",
          hp: 180,
          attack: 140,
          defense: 120,
          speed: 160,
          moves: [
            { name: "Punchline", type: "Normal", power: 55, pp: 15, maxPp: 15, description: "Lands a killer joke that hits hard." },
            { name: "Roast Session", type: "Fire", power: 65, pp: 10, maxPp: 10, effect: 'status', status: 'burn', chance: 0.3, description: "Brutal roast that may burn the opponent." },
            { name: "Self Deprecation", type: "Normal", power: 0, pp: 5, maxPp: 5, effect: 'buff', stat: 'attack', amount: 1.5, description: "Makes fun of self to boost confidence and attack." },
            { name: "Callback", type: "Normal", power: 70, pp: 10, maxPp: 10, description: "References an earlier joke for devastating effect." }
          ]
        },
        {
          id: "battle7",
          name: "Closet Nerd",
          sprite: "https://i.imgur.com/knA2Yxz.png", // Closet nerd image
          type: "Psychic",
          hp: 165,
          attack: 160,
          defense: 140,
          speed: 150,
          moves: [
            { name: "Secret Knowledge", type: "Psychic", power: 60, pp: 15, maxPp: 15, description: "Uses hidden intelligence for a powerful attack." },
            { name: "Anime Reference", type: "Normal", power: 50, pp: 10, maxPp: 10, effect: 'status', status: 'confusion', chance: 0.3, description: "Confuses opponent with obscure references." },
            { name: "Well Actually", type: "Psychic", power: 45, pp: 15, maxPp: 15, effect: 'debuff', stat: 'defense', amount: 0.7, description: "Corrects opponent, lowering their defense." },
            { name: "Glasses Adjustment", type: "Normal", power: 0, pp: 5, maxPp: 5, effect: 'buff', stat: 'accuracy', amount: 1.5, description: "Dramatically adjusts glasses to improve accuracy." }
          ]
        },
        {
          id: "battle8",
          name: "Functional Addict",
          sprite: "https://i.imgur.com/G3xfSjU.png", // Functional addict image
          type: "Dark",
          hp: 195,
          attack: 180,
          defense: 110,
          speed: 170,
          moves: [
            { name: "Quick Fix", type: "Dark", power: 65, pp: 15, maxPp: 15, description: "Gets a boost that increases attack power." },
            { name: "Manic Episode", type: "Dark", power: 80, pp: 10, maxPp: 10, effect: 'recoil', amount: 0.2, description: "Powerful but causes recoil damage." },
            { name: "Withdrawal", type: "Normal", power: 0, pp: 5, maxPp: 5, effect: 'heal', amount: 30, description: "Recovers HP through sheer willpower." },
            { name: "Double Life", type: "Dark", power: 50, pp: 10, maxPp: 10, effect: 'status', status: 'confusion', chance: 0.4, description: "Confuses opponent with erratic behavior." }
          ]
        }
      ];
    }
    
    // Determine difficulty based on NPC's level (if any)
    const npcLevel = npc.character && npc.character.level ? npc.character.level : 3;
    const difficultyFactor = npcLevel / 5;
    
    // Create a shuffled copy of the characters to pick from
    const shuffledCharacters = [...battleCharacters].sort(() => 0.5 - Math.random());
    
    // Pick 3 random characters for the opponent team
    const opponentTeam = [];
    for (let i = 0; i < Math.min(3, shuffledCharacters.length); i++) {
      const teamMember = JSON.parse(JSON.stringify(shuffledCharacters[i]));
      
      // Adjust stats based on difficulty (NPC level)
      teamMember.hp = Math.floor(teamMember.hp * difficultyFactor);
      teamMember.maxHp = teamMember.hp;
      teamMember.attack = Math.floor(teamMember.attack * difficultyFactor);
      teamMember.defense = Math.floor(teamMember.defense * difficultyFactor);
      
      // Add some randomness to stats
      const randomFactor = 0.8 + (Math.random() * 0.4); // 0.8 to 1.2
      teamMember.hp = Math.floor(teamMember.hp * randomFactor);
      teamMember.maxHp = teamMember.hp;
      teamMember.attack = Math.floor(teamMember.attack * randomFactor);
      teamMember.defense = Math.floor(teamMember.defense * randomFactor);
      
      // Ensure moves have PP values
      if (teamMember.moves) {
        teamMember.moves.forEach(move => {
          if (move.pp === undefined || move.pp === null) {
            move.pp = move.maxPp || 15; // Default to 15 if maxPp is also not set
          }
          if (move.maxPp === undefined || move.maxPp === null) {
            move.maxPp = move.pp; // Use pp value as maxPp if not set
          }
        });
      }
      
      // Standardize sprite path
      if (typeof window.standardizeSpritePath === 'function') {
        teamMember.sprite = window.standardizeSpritePath(teamMember.sprite);
      }
      
      opponentTeam.push(teamMember);
    }
    
    // Use the generated team
    if (opponentTeam.length > 0) {
      window.activeOpponentTeam = opponentTeam;
      window.activeOpponent = opponentTeam[0];
      console.log("Created random opponent team with", opponentTeam.length, "members for NPC battle");
    } else {
      console.error("Failed to create opponent team for NPC battle");
      return;
    }
    
    // Hide overworld and show battle screen
    const overworldContainer = document.getElementById('overworld-container');
    if (overworldContainer) {
      overworldContainer.style.display = 'none';
    } else {
      console.warn("Overworld container not found, continuing with battle");
    }
    
    // Make sure mobile controls are hidden for battle
    const mobileContainer = document.getElementById('mobile-controls-container');
    if (mobileContainer) {
      mobileContainer.style.display = 'none';
    }
    
    // Start battle
    if (typeof window.startBattle === 'function') {
      window.startBattle();
    } else {
      console.error("startBattle function not found on window object");
    }
  } catch (error) {
    console.error("Error starting NPC battle:", error);
  }
}

// Trigger a random encounter in a trap zone
function triggerRandomEncounter() {
  try {
    console.log("Triggering random encounter in zone:", currentZone);
    
    // Set game mode to story mode for team validation requirements
    window.currentGameMode = 'story';

    // Make sure we have a player team for the battle
    if (!window.playerTeam || !Array.isArray(window.playerTeam) || window.playerTeam.length === 0) {
      console.warn("No player team found for random encounter, creating fallback team from player character");
      
      // Get known default character sprites that work properly
      const defaultSprite = "https://i.imgur.com/YeMI4sr.png"; // Fitness Bro sprite
      
      // Create a simple character if no team exists, with a sprite URL we know works
      window.playerTeam = [{
        id: "player",
        name: player.characterName || "Fitness Bro", // Use a known character name
        hp: 100,
        maxHp: 100,
        attack: 50,
        defense: 50,
        speed: 50,
        image: defaultSprite,
        sprite: defaultSprite, // Use a sprite we know works with imgur URL format
        type: "Fire", // Match the character type
        moves: [
          { name: "Basic Attack", type: "Normal", power: 40, pp: 15, maxPp: 15, description: "A standard attack" }
        ]
      }];
      
      console.log("Created fallback player with sprite:", defaultSprite);
    } else {
      console.log("Using existing player team for random encounter battle:", window.playerTeam);
    }
    
    // Make sure we have at least one character
    if (window.playerTeam.length === 0) {
      console.error("Player team is empty after initialization, battle cannot proceed");
      return;
    }
    
    // Ensure all player sprites use the imgur URL format for consistency
    window.playerTeam.forEach(character => {
      if (character.sprite) {
        // Check if it's already an imgur URL
        if (!character.sprite.includes('imgur.com')) {
          console.log(`Converting sprite format for ${character.name}:`, character.sprite);
          
          // Map known character sprites to their imgur URLs
          if (character.name.includes("Fitness")) {
            character.sprite = "https://i.imgur.com/YeMI4sr.png";
          } else if (character.name.includes("Rasta")) {
            character.sprite = "https://i.imgur.com/dZWWrrs.png";
          } else {
            // Default to fitness bro as fallback
            character.sprite = "https://i.imgur.com/YeMI4sr.png";
          }
          
          console.log(`Sprite converted to:`, character.sprite);
        }
      }
    });
    
    // Make sure local playerTeam variable is synced with window.playerTeam if it exists
    if (typeof playerTeam !== 'undefined') {
      console.log("Syncing local playerTeam variable with window.playerTeam");
      playerTeam = window.playerTeam.slice(); // Create a copy to avoid reference issues
    }
    
    // Create a team of random opponents based on the current zone
    const randomOpponentTeam = [];
    
    // Create the main opponent for the team
    const mainOpponent = createRandomOpponent(currentZone);
    randomOpponentTeam.push(mainOpponent);
    
    // Create 1-2 additional opponents for the team (lower level)
    const teamSize = 1 + Math.floor(Math.random() * 2); // 1-2 additional members
    
    for (let i = 0; i < teamSize; i++) {
      const teammate = createRandomOpponent(currentZone);
      
      // Make teammates slightly weaker than the main opponent
      teammate.level = Math.max(1, teammate.level - 2);
      teammate.hp = Math.floor(teammate.hp * 0.8);
      teammate.attack = Math.floor(teammate.attack * 0.9);
      teammate.defense = Math.floor(teammate.defense * 0.9);
      teammate.maxHp = teammate.hp;
      
      randomOpponentTeam.push(teammate);
    }
    
    // Set the active opponent team
    window.activeOpponentTeam = randomOpponentTeam;
    window.activeOpponent = randomOpponentTeam[0];
    
    console.log("Created random encounter team with", randomOpponentTeam.length, "members");
    
    // Hide overworld and show battle screen
    const overworldContainer = document.getElementById('overworld-container');
    if (overworldContainer) {
      overworldContainer.style.display = 'none';
    } else {
      console.warn("Overworld container not found, continuing with battle");
    }
    
    // Make sure mobile controls are hidden for battle
    const mobileContainer = document.getElementById('mobile-controls-container');
    if (mobileContainer) {
      mobileContainer.style.display = 'none';
    }
    
    // Start battle
    if (typeof window.startBattle === 'function') {
      window.startBattle();
    } else {
      console.error("startBattle function not found on window object");
    }
  } catch (error) {
    console.error("Error triggering random encounter:", error);
  }
}

// Create a random opponent based on zone
function createRandomOpponent(zone) {
  let level, types, namePool;
  
  // Set parameters based on zone
  switch (zone) {
    case ZONE_TYPES.STARTER_HOOD:
      level = 2 + Math.floor(Math.random() * 4); // Level 2-5
      types = ['Fire', 'Water', 'Grass', 'Normal'];
      namePool = ['Street Kid', 'Rookie', 'Young Buck', 'Corner Boy'];
      break;
    case ZONE_TYPES.THE_TRAP:
      level = 5 + Math.floor(Math.random() * 4); // Level 5-8
      types = ['Fire', 'Dark', 'Electric', 'Poison'];
      namePool = ['Trapper', 'Hustler', 'Dealer', 'Lookout'];
      break;
    case ZONE_TYPES.THE_BLOCK:
      level = 8 + Math.floor(Math.random() * 4); // Level 8-11
      types = ['Fire', 'Fighting', 'Steel', 'Ground'];
      namePool = ['Block Boss', 'Enforcer', 'Muscle', 'Shooter'];
      break;
    case ZONE_TYPES.RICH_SUBURBIA:
      level = 12 + Math.floor(Math.random() * 4); // Level 12-15
      types = ['Psychic', 'Flying', 'Ice', 'Normal'];
      namePool = ['Rich Kid', 'Trust Fund', 'Yacht Club', 'Country Club'];
      break;
    case ZONE_TYPES.BACK_ALLEY_ARENA:
      level = 15 + Math.floor(Math.random() * 5); // Level 15-19
      types = ['Dark', 'Fighting', 'Dragon', 'Steel'];
      namePool = ['Champion', 'Contender', 'Veteran', 'OG'];
      break;
    default:
      level = 5;
      types = ['Normal', 'Fire', 'Water'];
      namePool = ['Stranger', 'Unknown', 'Mystery'];
  }
  
  // Choose random name and type
  const name = namePool[Math.floor(Math.random() * namePool.length)];
  const type = types[Math.floor(Math.random() * types.length)];
  
  // Use external sprite options for better character variety - directly using imgur URLs that we know work
  const spriteOptions = [
    'https://i.imgur.com/dZWWrrs.png', // rasta
    'https://i.imgur.com/YeMI4sr.png', // fitness
    'https://i.imgur.com/VVa9pm9.png', // techy
    'https://i.imgur.com/2n71aSJ.png', // vibe
    'https://i.imgur.com/UkE9crR.png', // 9-5
    'https://i.imgur.com/9hFTFQt.png', // all jokes
    'https://i.imgur.com/knA2Yxz.png', // closet nerd
    'https://i.imgur.com/yA0lUbo.png', // dysfunctional
    'https://i.imgur.com/G3xfSjU.png', // functional addict
    'https://i.imgur.com/b5pnt7o.png', // gamer unemployed
    'https://i.imgur.com/vFvQKap.png', // gamer
    'https://i.imgur.com/LRVrieF.png', // homeless yn
    'https://i.imgur.com/Kwe1HpA.png', // serial yn
    'https://i.imgur.com/1SuHgnZ.png', // earthy
    'https://i.imgur.com/GmlKf6u.png'  // techbro rich
  ];
  
  // Choose a sprite directly - no need for standardizeSpritePath since these are already Imgur URLs
  const finalSpritePath = spriteOptions[Math.floor(Math.random() * spriteOptions.length)];
  console.log("Using opponent sprite:", finalSpritePath);
  
  // Create base stats based on level
  const baseHp = 85 + (level * 5);
  const baseAtk = 40 + (level * 3);
  const baseDef = 35 + (level * 2.5);
  const baseSpd = 30 + (level * 2);
  
  // Create random moves appropriate for level and type
  const moves = generateMovesForType(type, level);
  
  // Return opponent object
  return {
    name: name,
    sprite: finalSpritePath, // Use the standardized sprite path
    type: type,
    level: level,
    hp: baseHp,
    maxHp: baseHp,
    attack: baseAtk,
    defense: baseDef,
    speed: baseSpd,
    moves: moves
  };
}

// Generate moves for a character based on type and level
function generateMovesForType(type, level) {
  // This would ideally be a much larger move database
  const movesByType = {
    'Fire': [
      { name: 'Blaze Up', type: 'Fire', power: 40, effect: null },
      { name: 'Heat Wave', type: 'Fire', power: 60, effect: null },
      { name: 'Fire Spin', type: 'Fire', power: 30, effect: 'trap' },
      { name: 'Light Up', type: 'Fire', power: 0, effect: 'buff', stat: 'attack', amount: 1.5 }
    ],
    'Water': [
      { name: 'Water Gun', type: 'Water', power: 40, effect: null },
      { name: 'Splash', type: 'Water', power: 20, effect: 'debuff', stat: 'speed', amount: 0.8 },
      { name: 'Ice Flow', type: 'Water', power: 50, effect: null },
      { name: 'Drip', type: 'Water', power: 0, effect: 'buff', stat: 'defense', amount: 1.5 }
    ],
    'Grass': [
      { name: 'Grass Throw', type: 'Grass', power: 40, effect: null },
      { name: 'Leaf Cut', type: 'Grass', power: 55, effect: null },
      { name: 'Root', type: 'Grass', power: 30, effect: 'trap' },
      { name: 'Grow', type: 'Grass', power: 0, effect: 'heal', amount: 30 }
    ],
    'Normal': [
      { name: 'Taunt', type: 'Normal', power: 0, effect: 'debuff', stat: 'attack', amount: 0.8 },
      { name: 'Take Hit', type: 'Normal', power: 40, effect: null },
      { name: 'Run Fade', type: 'Normal', power: 50, effect: null },
      { name: 'Clutch', type: 'Normal', power: 60, effect: null }
    ],
    'Dark': [
      { name: 'Shade', type: 'Dark', power: 40, effect: null },
      { name: 'Set Up', type: 'Dark', power: 30, effect: 'debuff', stat: 'defense', amount: 0.8 },
      { name: 'Pressure', type: 'Dark', power: 20, effect: 'debuff', stat: 'speed', amount: 0.7 },
      { name: 'Fade Back', type: 'Dark', power: 60, effect: null }
    ],
    'Electric': [
      { name: 'Spark', type: 'Electric', power: 40, effect: null },
      { name: 'Battery', type: 'Electric', power: 50, effect: null },
      { name: 'Shock', type: 'Electric', power: 30, effect: 'status', status: 'paralysis', chance: 0.3 },
      { name: 'Charge Up', type: 'Electric', power: 0, effect: 'buff', stat: 'speed', amount: 1.5 }
    ],
    'Fighting': [
      { name: 'Jab', type: 'Fighting', power: 40, effect: null },
      { name: 'Combo', type: 'Fighting', power: 20, effect: 'multi', hits: 3 },
      { name: 'Finisher', type: 'Fighting', power: 60, effect: null },
      { name: 'Train', type: 'Fighting', power: 0, effect: 'buff', stat: 'attack', amount: 1.3 }
    ]
  };
  
  // Default moves if type not found
  let availableMoves = movesByType['Normal'] || [];
  
  // Get type-specific moves
  if (movesByType[type]) {
    availableMoves = movesByType[type];
  }
  
  // Add a cross-type move for variety
  const crossTypes = Object.keys(movesByType).filter(t => t !== type);
  const secondaryType = crossTypes[Math.floor(Math.random() * crossTypes.length)];
  
  if (movesByType[secondaryType]) {
    // Add one random move from secondary type
    const secondaryMove = movesByType[secondaryType][Math.floor(Math.random() * movesByType[secondaryType].length)];
    availableMoves = [...availableMoves, secondaryMove];
  }
  
  // Shuffle moves
  for (let i = availableMoves.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availableMoves[i], availableMoves[j]] = [availableMoves[j], availableMoves[i]];
  }
  
  // Take first 4 moves or fewer if not enough
  const selectedMoves = availableMoves.slice(0, 4);
  
  // Add PP and descriptions to moves
  return selectedMoves.map(move => {
    return {
      ...move,
      pp: 15, // Default PP
      maxPp: 15,
      description: getGenericMoveDescription(move)
    };
  });
}

// Generate generic move descriptions
function getGenericMoveDescription(move) {
  if (move.effect === 'buff') {
    return `Raises ${move.stat} significantly`;
  } else if (move.effect === 'debuff') {
    return `Lowers opponent's ${move.stat}`;
  } else if (move.effect === 'heal') {
    return `Heals the user`;
  } else if (move.effect === 'status') {
    return `May cause ${move.status}`;
  } else if (move.effect === 'trap') {
    return `Prevents opponent from switching`;
  } else if (move.effect === 'multi') {
    return `Hits ${move.hits} times in succession`;
  } else if (move.power > 50) {
    return `A powerful ${move.type.toLowerCase()} attack`;
  } else if (move.power > 30) {
    return `A moderate ${move.type.toLowerCase()} attack`;
  } else {
    return `A basic ${move.type.toLowerCase()} attack`;
  }
}

// Change to a different zone
function changeZone(zoneName, entranceX, entranceY) {
  // Update current zone
  currentZone = zoneName;
  
  // Update player position to entrance coordinates
  player.x = entranceX;
  player.y = entranceY;
  
  // Set map data based on zone
  switch (zoneName) {
    case ZONE_TYPES.STARTER_HOOD:
      currentMap = STARTER_HOOD_MAP;
      currentNpcs = STARTER_HOOD_NPCS;
      currentDoors = STARTER_HOOD_DOORS;
      break;
    case ZONE_TYPES.THE_TRAP:
      // These would be defined like STARTER_HOOD_MAP, etc.
      // For now we'll just reuse the starter hood as a placeholder
      currentMap = STARTER_HOOD_MAP;
      currentNpcs = STARTER_HOOD_NPCS;
      currentDoors = STARTER_HOOD_DOORS;
      break;
    case 'cornerStore':
      // Interior of corner store would be defined
      // For now, placeholder
      currentMap = STARTER_HOOD_MAP;
      currentNpcs = STARTER_HOOD_NPCS.filter(npc => npc.id === 'npc2'); // Only the shop keeper
      currentDoors = [{ x: 7, y: 13, leadsTo: ZONE_TYPES.STARTER_HOOD, entranceX: 4, entranceY: 12 }];
      break;
    // New zones
    case ZONE_TYPES.TRAP_HOUSE:
      currentMap = TRAP_HOUSE_MAP;
      currentNpcs = TRAP_HOUSE_NPCS;
      currentDoors = TRAP_HOUSE_DOORS;
      break;
    case ZONE_TYPES.MOMMA_HOUSE:
      currentMap = MOMMA_HOUSE_MAP;
      currentNpcs = MOMMA_HOUSE_NPCS;
      currentDoors = MOMMA_HOUSE_DOORS;
      break;
    case ZONE_TYPES.OPPS_HOOD:
      currentMap = OPPS_HOOD_MAP;
      currentNpcs = OPPS_HOOD_NPCS;
      currentDoors = OPPS_HOOD_DOORS;
      player.inTrapZone = true; // Make this a dangerous zone with high encounter rate
      break;
    case ZONE_TYPES.FADE_PARK:
      currentMap = FADE_PARK_MAP;
      currentNpcs = FADE_PARK_NPCS;
      currentDoors = FADE_PARK_DOORS;
      break;
    default:
      // Default back to starter hood
      currentMap = STARTER_HOOD_MAP;
      currentNpcs = STARTER_HOOD_NPCS;
      currentDoors = STARTER_HOOD_DOORS;
  }
  
  // Re-render map with new data
  renderMap();
  
  // Update player position display
  updatePlayerPosition();
  
  // Play zone transition sound
  playSwitchSound();
}

// Give a quest to the player
function giveQuest(quest) {
  // Check if player already has this quest
  if (player.activeQuests.some(q => q.id === quest.id) || 
      player.completedQuests.some(q => q.id === quest.id)) {
    showFloatingLog("You already have this quest.");
    return;
  }
  
  // Add quest to player's active quests
  player.activeQuests.push({...quest, progress: 0});
  
  // Show notification
  showFloatingLog(`New Quest: ${quest.name}`);
  
  // Update quest UI if needed
  // (This would be implemented to show active quests)
}

// Update quest progress
function updateQuestProgress(questType, zone, count = 1) {
  // Find matching quests
  player.activeQuests.forEach(quest => {
    if (quest.objective.type === questType && 
        (!quest.objective.zone || quest.objective.zone === zone)) {
      
      quest.progress += count;
      
      // Check if quest is complete
      if (quest.progress >= quest.objective.count) {
        completeQuest(quest);
      }
    }
  });
}

// Complete a quest and give rewards
function completeQuest(quest) {
  // Remove from active quests
  const questIndex = player.activeQuests.findIndex(q => q.id === quest.id);
  if (questIndex !== -1) {
    player.activeQuests.splice(questIndex, 1);
    
    // Add to completed quests
    player.completedQuests.push(quest);
    
    // Give rewards
    if (quest.reward) {
      if (quest.reward.money) {
        playerInventory.money += quest.reward.money;
      }
      
      if (quest.reward.item) {
        window.InventorySystem.addItemToInventory(playerInventory, quest.reward.item);
      }
    }
    
    // Show completion notification
    showFloatingLog(`Quest Complete: ${quest.name}!`);
  }
}

// Return to overworld after battle
function returnToOverworld(battleWon = true) {
  try {
    console.log("Overworld: Returning from battle, victory:", battleWon);
    
    // If battle was a random encounter and player won, increment quest counters
    if (battleWon && player.inTrapZone) {
      updateQuestProgress('defeat', 'trapZone');
    }
    
    // Check if container exists, if not, create it
    if (!document.getElementById('overworld-container')) {
      console.log("Overworld container not found, creating it");
      createOverworldUI();
    }
    
    // Get the overworld container after ensuring it exists
    const overworldContainer = document.getElementById('overworld-container');
    
    // Hide battle screen
    const battleScreen = document.getElementById('battle-screen');
    if (battleScreen) {
      battleScreen.style.display = 'none';
    }
    
    // Hide game over screen
    const gameOverScreen = document.getElementById('game-over');
    if (gameOverScreen) {
      gameOverScreen.style.display = 'none';
    }
    
    // Show mobile controls if they exist
    const mobileContainer = document.getElementById('mobile-controls-container');
    if (mobileContainer) {
      mobileContainer.style.display = 'block';
    }
    
    // Show overworld
    if (overworldContainer) {
      overworldContainer.style.display = 'flex';
      
      // Update player display
      updatePlayerPosition();
      
      // Reset the map and NPCs
      renderMap();
    } else {
      console.error("Failed to find overworld container even after create attempt");
    }
    
    // Switch music back to overworld
    playOverworldMusic();
  } catch (error) {
    console.error("Error returning to overworld:", error);
  }
}

// Play overworld music
function playOverworldMusic() {
  try {
    // This should tie into existing audio system
    console.log("Attempting to play overworld music");
    
    // Check if global audio functions are available
    if (typeof window.playMenuMusic === 'function') {
      console.log("Using global playMenuMusic function");
      window.playMenuMusic();
    } else if (typeof playMenuMusic === 'function') {
      console.log("Using local playMenuMusic function");
      playMenuMusic();
    } else {
      console.warn("No music function available - overworld music won't play");
    }
  } catch (error) {
    console.error("Error playing overworld music:", error);
    // Non-critical error, can continue without music
  }
}

// Export overworld system with more accessible functions
window.OverworldSystem = {
  // Core functions
  initOverworld,
  returnToOverworld,
  
  // Constants
  ZONE_TYPES,
  TILE_TYPES,
  
  // Helper functions
  createRandomOpponent,
  triggerRandomEncounter,
  startNpcBattle,
  updateQuestProgress,
  
  // Map functions
  renderMap,
  movePlayer,
  
  // Set the current zone type
  getCurrentZone: function() { return currentZone; }
};