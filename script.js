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

// ================ GAME DATA ================
// Character data with battle info
const characters = [
  {
    id: 1,
    name: "Rastamon",
    sprite: "https://i.imgur.com/dZWWrrs.png", 
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
    sprite: "https://i.imgur.com/YeMI4sr.png", 
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
    sprite: "https://i.imgur.com/VVa9pm9.png", 
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
    sprite: "https://i.imgur.com/2n71aSJ.png", 
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
    sprite: "https://i.imgur.com/UkE9crR.png", 
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
    sprite: "https://i.imgur.com/9hFTFQt.png", 
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
    sprite: "https://i.imgur.com/knA2Yxz.png", 
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
    sprite: "https://i.imgur.com/yA0lUbo.png", 
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
  },
  {
    id: 9,
    name: "Gamer YN",
    sprite: "https://i.imgur.com/vFvQKap.png", 
    hp: 190,
    attack: 160,
    defense: 140,
    speed: 140,
    critRate: 0.15,
    type: "Electric",
    status: "normal",
    description: "Lives in a digital world. Will pwn you and teabag your avatar.",
    moves: [
      { name: "Rapid Button Mash", power: 55, accuracy: 90, type: "Normal", description: "Frantic attack with quick button presses." },
      { name: "Energy Drink Rush", power: 65, accuracy: 85, type: "Electric", description: "Energized attack that may cause paralysis." },
      { name: "Paused Game", power: 0, accuracy: 100, type: "Normal", description: "Takes a breather to recover HP." },
      { name: "Rage Mode", power: 80, accuracy: 75, type: "Dark", description: "Powerful but risky attack when games get serious." }
    ]
  },
  {
    id: 10,
    name: "Hooper",
    sprite: "https://i.imgur.com/nmL74YQ.png", 
    hp: 210,
    attack: 180,
    defense: 140,
    speed: 190,
    critRate: 0.2,
    type: "Air",
    status: "normal",
    description: "Ball is life. Will cross you up on the court and in conversation.",
    moves: [
      { name: "Crossover Break", power: 60, accuracy: 90, type: "Normal", description: "Quick dribble move that breaks ankles." },
      { name: "Three-Point Shot", power: 75, accuracy: 80, type: "Air", description: "Long-range attack with high damage but lower accuracy." },
      { name: "Pick & Roll", power: 0, accuracy: 100, type: "Normal", description: "Strategic team move that boosts attack." },
      { name: "Posterize", power: 85, accuracy: 75, type: "Air", description: "Devastating dunk that may intimidate opponent." }
    ]
  },
  {
    id: 11,
    name: "Bikelife YN",
    sprite: "https://i.imgur.com/i6xU3C7.png", 
    hp: 180,
    attack: 160,
    defense: 120,
    speed: 200,
    critRate: 0.15,
    type: "Rock",
    status: "normal",
    description: "Wheelies through traffic and problems alike. Cannot be caught.",
    moves: [
      { name: "Wheelie Strike", power: 60, accuracy: 90, type: "Rock", description: "Front wheel attack with moderate damage." },
      { name: "Burnout", power: 65, accuracy: 85, type: "Fire", description: "Tire-spinning attack that may cause burn status." },
      { name: "Rev Engine", power: 0, accuracy: 100, type: "Normal", description: "Revs up to increase speed." },
      { name: "Stunt Jump", power: 80, accuracy: 75, type: "Air", description: "Aerial bike stunt with high damage but risky landing." }
    ]
  },
  {
    id: 12,
    name: "Streamer",
    sprite: "https://i.imgur.com/3rCsqGF.png", 
    hp: 170,
    attack: 150,
    defense: 120,
    speed: 160,
    critRate: 0.15,
    type: "Electric",
    status: "normal",
    description: "Lives for the chat and donations. Will do anything for subscribers.",
    moves: [
      { name: "Clickbait", power: 55, accuracy: 95, type: "Normal", description: "Misleading attack that's surprisingly effective." },
      { name: "Viral Moment", power: 70, accuracy: 85, type: "Electric", description: "Electric attack powered by viewer energy." },
      { name: "Sub Goal", power: 0, accuracy: 100, type: "Normal", description: "Rallies support to boost defense and attack." },
      { name: "Sponsored Content", power: 75, accuracy: 80, type: "Dark", description: "Sold-out attack that generates cash damage." }
    ]
  },
  // New characters from the provided list
  {
    id: 13,
    name: "Smoker Jr",
    sprite: "https://i.imgur.com/vdaAi7h.png", 
    hp: 185,
    attack: 160,
    defense: 120,
    speed: 110,
    critRate: 0.15,
    type: "Fire",
    status: "normal",
    description: "Always carrying a lighter. Probably shouldn't be smoking, but who's stopping him?",
    moves: [
      { name: "Smoke Screen", power: 50, accuracy: 90, type: "Fire", description: "Creates a cloud of smoke reducing opponent's accuracy." },
      { name: "Lighter Flick", power: 65, accuracy: 85, type: "Fire", description: "Quick flame attack that may cause burn status." },
      { name: "Puff Puff Pass", power: 0, accuracy: 100, type: "Fire", description: "Recovers HP while entering a relaxed state." },
      { name: "Ash Flick", power: 55, accuracy: 95, type: "Fire", description: "Small but irritating attack with high accuracy." }
    ]
  },
  {
    id: 14,
    name: "Suburban YN",
    sprite: "https://i.imgur.com/LKtVgCn.png", 
    hp: 190,
    attack: 140,
    defense: 150,
    speed: 130,
    critRate: 0.1,
    type: "Normal",
    status: "normal",
    description: "Straight from the cul-de-sac. Has never seen an actual struggle but claims street cred.",
    moves: [
      { name: "HOA Complaint", power: 50, accuracy: 95, type: "Normal", description: "Administrative attack with surprising effectiveness." },
      { name: "Mall Shopping Spree", power: 60, accuracy: 90, type: "Normal", description: "Shopping bags used as weapons, may confuse opponent." },
      { name: "Privilege Check", power: 0, accuracy: 100, type: "Normal", description: "Uses advantages to boost defense and attack." },
      { name: "Lawn Mower Charge", power: 75, accuracy: 80, type: "Rock", description: "Suburban weapon of choice that deals solid damage." }
    ]
  },
  {
    id: 15,
    name: "Ganger Blue",
    sprite: "https://i.imgur.com/7THvTR0.png", 
    hp: 200,
    attack: 180,
    defense: 130,
    speed: 150,
    critRate: 0.2,
    type: "Water",
    status: "normal",
    description: "Runs the west side. Don't wear the wrong colors around him.",
    moves: [
      { name: "Set Trippin'", power: 65, accuracy: 90, type: "Water", description: "Territory defense move with moderate damage." },
      { name: "Blue Bandana Wave", power: 70, accuracy: 85, type: "Water", description: "Water attack that showcases gang colors." },
      { name: "Call Backup", power: 0, accuracy: 100, type: "Water", description: "Summons crew to boost attack and defense." },
      { name: "Drive-By Splash", power: 85, accuracy: 75, type: "Water", description: "Powerful but risky water attack with high damage." }
    ]
  },
  {
    id: 16,
    name: "Ganger Red",
    sprite: "https://i.imgur.com/DP4RBGB.png", 
    hp: 190,
    attack: 190,
    defense: 120,
    speed: 160,
    critRate: 0.2,
    type: "Fire",
    status: "normal",
    description: "Controls the east side. Blood runs deep, loyalty runs deeper.",
    moves: [
      { name: "Red Rag Snap", power: 60, accuracy: 90, type: "Fire", description: "Gang sign attack with moderate fire damage." },
      { name: "Hood Tactics", power: 75, accuracy: 85, type: "Dark", description: "Strategic attack learned from street experience." },
      { name: "Gang Meeting", power: 0, accuracy: 100, type: "Normal", description: "Plans with crew to increase all stats temporarily." },
      { name: "Turf War Blaze", power: 90, accuracy: 70, type: "Fire", description: "All-out territorial attack with high damage but lower accuracy." }
    ]
  },
  {
    id: 17,
    name: "Coon",
    sprite: "https://i.imgur.com/CSvkuRk.png", 
    hp: 170,
    attack: 150,
    defense: 120,
    speed: 190,
    critRate: 0.15,
    type: "Dark",
    status: "normal",
    description: "Sells out their own people for validation. Always seeking approval from the wrong crowd.",
    moves: [
      { name: "Identity Betrayal", power: 65, accuracy: 90, type: "Dark", description: "Self-hating attack that damages opponent's pride." },
      { name: "Pick Me Dance", power: 50, accuracy: 95, type: "Normal", description: "Desperate approval-seeking move with high accuracy." },
      { name: "Internalized Hatred", power: 0, accuracy: 100, type: "Dark", description: "Redirects self-loathing to boost attack." },
      { name: "Token Friend Card", power: 70, accuracy: 85, type: "Dark", description: "Uses tokenism as a weapon with moderate damage." }
    ]
  },
  {
    id: 18,
    name: "Rapper",
    sprite: "https://i.imgur.com/HcWNwJT.png", 
    hp: 185,
    attack: 175,
    defense: 110,
    speed: 170,
    critRate: 0.15,
    type: "Electric",
    status: "normal",
    description: "Spits fire and takes no prisoners. Soundcloud link in bio, of course.",
    moves: [
      { name: "Mic Drop", power: 65, accuracy: 90, type: "Electric", description: "Shocking performance that leaves audience stunned." },
      { name: "Freestyle Flow", power: 70, accuracy: 85, type: "Air", description: "Off-the-top rhymes that hit with surprising force." },
      { name: "Hype Man Backup", power: 0, accuracy: 100, type: "Electric", description: "Brings out the entourage to boost attack and speed." },
      { name: "Diss Track", power: 85, accuracy: 75, type: "Dark", description: "Targeted verbal attack that cuts deep with high damage." }
    ]
  },
  {
    id: 19,
    name: "Police",
    sprite: "https://i.imgur.com/AdCwGHp.png", 
    hp: 210,
    attack: 160,
    defense: 170,
    speed: 130,
    critRate: 0.1,
    type: "Rock",
    status: "normal",
    description: "Thinks the badge makes them above the law. Has a quota to fill.",
    moves: [
      { name: "Racial Profiling", power: 60, accuracy: 85, type: "Dark", description: "Discriminatory tactic with moderate damage." },
      { name: "Taser Shot", power: 70, accuracy: 80, type: "Electric", description: "Electric attack that may cause paralysis." },
      { name: "Call for Backup", power: 0, accuracy: 100, type: "Rock", description: "Brings in reinforcements to boost defense." },
      { name: "Excessive Force", power: 90, accuracy: 70, type: "Rock", description: "Powerful but controversial attack with poor accuracy." }
    ]
  },
  {
    id: 20,
    name: "Snitch",
    sprite: "https://i.imgur.com/OOZM6eu.png", 
    hp: 150,
    attack: 130,
    defense: 110,
    speed: 200,
    critRate: 0.1,
    type: "Air",
    status: "normal",
    description: "No loyalty, just self-preservation. Watch what you say around them.",
    moves: [
      { name: "Tell All", power: 55, accuracy: 95, type: "Air", description: "Reveals secrets for a quick, accurate attack." },
      { name: "Recorded Evidence", power: 65, accuracy: 90, type: "Electric", description: "Uses hidden recordings for moderate damage." },
      { name: "Witness Protection", power: 0, accuracy: 100, type: "Air", description: "Hides away to recover HP and boost defense." },
      { name: "Backstab", power: 80, accuracy: 75, type: "Dark", description: "Betrayal attack with high damage to former allies." }
    ]
  },
  {
    id: 21,
    name: "Cornball",
    sprite: "https://i.imgur.com/yUUA3of.png", 
    hp: 180,
    attack: 140,
    defense: 130,
    speed: 150,
    critRate: 0.15,
    type: "Normal",
    status: "normal",
    description: "Painfully uncool but blissfully unaware. Always saying the wrong thing at the wrong time.",
    moves: [
      { name: "Dad Joke", power: 50, accuracy: 95, type: "Normal", description: "Cringeworthy joke that somehow causes damage." },
      { name: "Cultural Misfire", power: 65, accuracy: 85, type: "Normal", description: "Awkward attempt to be relevant that confuses opponent." },
      { name: "Blissful Ignorance", power: 0, accuracy: 100, type: "Normal", description: "Uses lack of awareness to boost defense." },
      { name: "Accidental Offense", power: 75, accuracy: 80, type: "Dark", description: "Unintentionally hurtful comment with surprising impact." }
    ]
  },
  {
    id: 22,
    name: "Crack Head",
    sprite: "https://i.imgur.com/cl7GtvK.png", 
    hp: 150,
    attack: 180,
    defense: 90,
    speed: 190,
    critRate: 0.2,
    type: "Dark",
    status: "normal",
    description: "Unpredictable and always on edge. Might do anything for the next fix.",
    moves: [
      { name: "Wild Swing", power: 65, accuracy: 80, type: "Normal", description: "Erratic attack with moderate damage but lower accuracy." },
      { name: "Paranoid Outburst", power: 75, accuracy: 75, type: "Dark", description: "Fear-driven attack that might confuse both sides." },
      { name: "Desperate Hustle", power: 0, accuracy: 100, type: "Dark", description: "Uses survival instincts to boost speed and attack." },
      { name: "Rock Bottom Rage", power: 90, accuracy: 65, type: "Dark", description: "All-out desperate attack with high damage but poor accuracy." }
    ]
  },
  {
    id: 23,
    name: "Muslim Homie",
    sprite: "https://i.imgur.com/dWO1X6j.png", 
    hp: 200,
    attack: 150,
    defense: 160,
    speed: 140,
    critRate: 0.15,
    type: "Normal",
    status: "normal",
    description: "Strong in faith and character. Will invite you to dinner and defend you till the end.",
    moves: [
      { name: "Prayer Focus", power: 60, accuracy: 90, type: "Normal", description: "Spiritual attack with consistent accuracy." },
      { name: "Cultural Pride", power: 70, accuracy: 85, type: "Fire", description: "Heritage-fueled attack with moderate damage." },
      { name: "Ramadan Strength", power: 0, accuracy: 100, type: "Normal", description: "Draws on spiritual discipline to boost all stats." },
      { name: "Hospitality Surprise", power: 75, accuracy: 80, type: "Normal", description: "Disarms opponent with kindness before striking." }
    ]
  }
];

// Enemy (Opponent) data
const opponents = [
  {
    id: 101,
    name: "Functional Addict",
    sprite: "https://i.imgur.com/G3xfSjU.png", 
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
    sprite: "https://i.imgur.com/b5pnt7o.png", 
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
    sprite: "https://i.imgur.com/LRVrieF.png", 
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
    sprite: "https://i.imgur.com/Kwe1HpA.png", 
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
    sprite: "https://i.imgur.com/GmlKf6u.png", 
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
  },
  {
    id: 106,
    name: "Earthy YN",
    sprite: "https://i.imgur.com/1SuHgnZ.png", 
    hp: 210,
    attack: 140,
    defense: 180,
    speed: 120,
    critRate: 0.1,
    type: "Plant",
    description: "One with nature. Will judge your plastic use while hitting a handmade bamboo bong.",
    moves: [
      { name: "Crystal Healing", power: 50, accuracy: 95, type: "Rock" },
      { name: "Herbal Essence", power: 60, accuracy: 90, type: "Plant" },
      { name: "Meditate", power: 0, accuracy: 100, type: "Normal" },
      { name: "Compost Bomb", power: 75, accuracy: 80, type: "Plant" }
    ],
    ai: "defensive"
  },
  {
    id: 107,
    name: "The Plug",
    sprite: "https://i.imgur.com/Mal7dZQ.png", 
    hp: 190,
    attack: 190,
    defense: 130,
    speed: 150,
    critRate: 0.2,
    type: "Dark",
    description: "Always has what you need. Never caught slipping.",
    moves: [
      { name: "Burner Phone", power: 50, accuracy: 100, type: "Electric" },
      { name: "Product Sample", power: 70, accuracy: 85, type: "Dark" },
      { name: "Re-Up", power: 0, accuracy: 100, type: "Normal" },
      { name: "Trap House Ambush", power: 85, accuracy: 75, type: "Dark" }
    ],
    ai: "aggressive"
  },
  {
    id: 108,
    name: "Scammer",
    sprite: "https://i.imgur.com/tvAPXl8.png", 
    hp: 170,
    attack: 160,
    defense: 140,
    speed: 170,
    critRate: 0.15,
    type: "Dark",
    description: "Always has a sketchy opportunity. Your grandmother already sent him money.",
    moves: [
      { name: "Phishing Attack", power: 55, accuracy: 95, type: "Water" },
      { name: "Identity Theft", power: 70, accuracy: 85, type: "Dark" },
      { name: "Nigerian Prince", power: 0, accuracy: 100, type: "Dark" },
      { name: "Ponzi Scheme", power: 80, accuracy: 75, type: "Dark" }
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
  "https://i.imgur.com/cefa76T.png", // Original background
  "https://i.imgur.com/ivJoNSj.png", // Original background
  "https://i.imgur.com/pEs4HJ5.jpeg", // New wallpaper
  "https://i.imgur.com/VTeIMuN.png", // New wallpaper
  "https://i.imgur.com/LhIaHVy.png", // New wallpaper
  "https://i.imgur.com/OdKFwva.png"  // New wallpaper
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
let battleCounter = 0; // Count battles within a "fade" sequence (3 battles = 1 fade)
let opponentIndex = 0;
let playerStatModifiers = { attack: 1, defense: 1, speed: 1, accuracy: 1 };
let opponentStatModifiers = { attack: 1, defense: 1, speed: 1, accuracy: 1 };
let playerStatusEffect = { type: "normal", duration: 0 };
let opponentStatusEffect = { type: "normal", duration: 0 };
let itemUseCounts = { jcole: 2, nbayoungboy: 2, weed: 2, crashdummy: 1 };
let canAct = true; // For preventing action during animations

// Arrays to track active item effects
let playerActiveItemEffects = []; // [{itemType: 'nbayoungboy', effect: 'atkUp', value: 1.3, remainingDuration: 3}]
let opponentActiveItemEffects = [];

// ================ INITIALIZATION ================
// Initialize the game when the page loads
document.addEventListener("DOMContentLoaded", initGame);

// Audio Functions
function initAudio() {
  // Initialize audio players (wait for user interaction - browser policy)
  if (!menuMusicPlayer) {
    menuMusicPlayer = new Audio(AUDIO.menuMusic);
    menuMusicPlayer.loop = true;
    menuMusicPlayer.volume = 0.5;
  }
  
  if (!battleMusicPlayer) {
    battleMusicPlayer = new Audio(AUDIO.battleMusic);
    battleMusicPlayer.loop = true;
    battleMusicPlayer.volume = 0.5;
  }
  
  if (!hitSoundPlayer) {
    hitSoundPlayer = new Audio(AUDIO.hitSound);
    hitSoundPlayer.volume = 0.7;
  }
  
  if (!successSoundPlayer) {
    successSoundPlayer = new Audio(AUDIO.successSound);
    successSoundPlayer.volume = 0.7;
  }
  
  if (!switchSoundPlayer) {
    switchSoundPlayer = new Audio(AUDIO.switchSound);
    switchSoundPlayer.volume = 0.7;
  }
  
  // Set up audio control buttons
  document.getElementById("toggle-music").addEventListener("click", toggleMusic);
  document.getElementById("toggle-sound").addEventListener("click", toggleSound);
}

function playMenuMusic() {
  if (battleMusicPlayer) battleMusicPlayer.pause();
  if (menuMusicPlayer && !musicMuted) {
    menuMusicPlayer.currentTime = 0;
    menuMusicPlayer.play().catch(e => console.log("Audio play failed:", e));
  }
}

function playBattleMusic() {
  if (menuMusicPlayer) menuMusicPlayer.pause();
  if (battleMusicPlayer && !musicMuted) {
    battleMusicPlayer.currentTime = 0;
    battleMusicPlayer.play().catch(e => console.log("Audio play failed:", e));
  }
}

function playHitSound() {
  if (hitSoundPlayer && !soundMuted) {
    hitSoundPlayer.currentTime = 0;
    hitSoundPlayer.play().catch(e => console.log("Audio play failed:", e));
  }
}

function playSuccessSound() {
  if (successSoundPlayer && !soundMuted) {
    successSoundPlayer.currentTime = 0;
    successSoundPlayer.play().catch(e => console.log("Audio play failed:", e));
  }
}

function playSwitchSound() {
  if (switchSoundPlayer && !soundMuted) {
    switchSoundPlayer.currentTime = 0;
    switchSoundPlayer.play().catch(e => console.log("Audio play failed:", e));
  }
}

function toggleMusic() {
  musicMuted = !musicMuted;
  
  const musicButton = document.getElementById("toggle-music");
  const musicIcon = document.getElementById("music-icon");
  
  if (musicMuted) {
    if (menuMusicPlayer) menuMusicPlayer.pause();
    if (battleMusicPlayer) battleMusicPlayer.pause();
    musicButton.classList.add("muted");
    musicIcon.textContent = "🔇";
  } else {
    if (document.getElementById("battle-screen").style.display === "flex") {
      playBattleMusic();
    } else {
      playMenuMusic();
    }
    musicButton.classList.remove("muted");
    musicIcon.textContent = "🔊";
  }
}

function toggleSound() {
  soundMuted = !soundMuted;
  
  const soundButton = document.getElementById("toggle-sound");
  const soundIcon = document.getElementById("sound-icon");
  
  if (soundMuted) {
    soundButton.classList.add("muted");
    soundIcon.textContent = "🔇";
  } else {
    soundButton.classList.remove("muted");
    soundIcon.textContent = "🔊";
  }
}

function initGame() {
  populateCharacterSelection();
  setupMoveTooltips();
  // Reset game state
  playerTeam = [];
  fadeCount = 0;
  battleCounter = 0;
  opponentIndex = 0;
  updateFadeDisplay();
  
  // Initialize audio controls (but wait for user interaction to play music)
  initAudio();
  
  // Set up a one-time click listener to start audio (browser policy requires user interaction)
  const startAudioOnce = () => {
    // Start menu music
    playMenuMusic();
    // Remove this listener after first click
    document.removeEventListener('click', startAudioOnce);
  };
  document.addEventListener('click', startAudioOnce);
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
    
    // Add tooltip data
    card.setAttribute("data-tooltip", JSON.stringify({
      name: character.name,
      type: character.type,
      hp: character.hp,
      attack: character.attack,
      defense: character.defense,
      speed: character.speed,
      description: character.description,
      moves: character.moves.map(move => move.name).join(", ")
    }));
    
    // Add hover event listeners for tooltips
    card.addEventListener("mouseenter", showCharacterTooltip);
    card.addEventListener("mouseleave", hideCharacterTooltip);
    
    card.addEventListener("click", () => selectCharacter(character));
    characterList.appendChild(card);
  });
}

function selectCharacter(character) {
  if (playerTeam.length >= 3) {
    showFloatingLog("You can only pick 3 YNs!");
    return;
  }
  
  // Play sound effect
  playSuccessSound();
  
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
  
  // Start battle music
  playBattleMusic();
  
  // Play success sound
  playSuccessSound();
  
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
  
  // Clear status effects
  playerStatusEffect = { type: "normal", duration: 0 };
  opponentStatusEffect = { type: "normal", duration: 0 };
  
  // Reset item counts
  itemUseCounts = { jcole: 2, nbayoungboy: 2, weed: 2, crashdummy: 1 };
  
  // Clear active item effects
  playerActiveItemEffects = [];
  opponentActiveItemEffects = [];
  
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
  
  // Update player info tooltip with safety checks
  if (activePlayerCharacter && document.getElementById("player-info-text")) {
    const playerAttack = activePlayerCharacter.stats ? activePlayerCharacter.stats.attack : activePlayerCharacter.attack || 0;
    const playerDefense = activePlayerCharacter.stats ? activePlayerCharacter.stats.defense : activePlayerCharacter.defense || 0;
    const playerSpeed = activePlayerCharacter.stats ? activePlayerCharacter.stats.speed : activePlayerCharacter.speed || 0;
    
    const playerInfo = `
      <div class="character-tooltip">
        <p><strong>${activePlayerCharacter.name}</strong></p>
        <p>Type: ${activePlayerCharacter.type || 'Unknown'}</p>
        <p>ATK: ${playerAttack} | DEF: ${playerDefense} | SPD: ${playerSpeed}</p>
        <small>${activePlayerCharacter.description || 'Hover to see stats'}</small>
      </div>
    `;
    document.getElementById("player-info-text").innerHTML = playerInfo;
  }
  
  // Update opponent info box for tooltip with safety checks
  if (activeOpponent && document.getElementById("opponent-info-text")) {
    const opponentAttack = activeOpponent.stats ? activeOpponent.stats.attack : activeOpponent.attack || 0;
    const opponentDefense = activeOpponent.stats ? activeOpponent.stats.defense : activeOpponent.defense || 0;
    const opponentSpeed = activeOpponent.stats ? activeOpponent.stats.speed : activeOpponent.speed || 0;
    
    const characterInfo = `
      <div class="character-tooltip">
        <p><strong>${activeOpponent.name}</strong></p>
        <p>Type: ${activeOpponent.type || 'Unknown'}</p>
        <p>ATK: ${opponentAttack} | DEF: ${opponentDefense} | SPD: ${opponentSpeed}</p>
        <small>${activeOpponent.description || 'Hover to see stats'}</small>
      </div>
    `;
    document.getElementById("opponent-info-text").innerHTML = characterInfo;
  }
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
  if (!movesContainer || !activePlayerCharacter || !activePlayerCharacter.moves) return;
  
  movesContainer.innerHTML = "";
  
  activePlayerCharacter.moves.forEach(move => {
    if (!move) return;
    
    const moveButton = document.createElement("button");
    moveButton.className = "pixel-button";
    moveButton.textContent = move.name || "Unknown Move";
    moveButton.dataset.move = JSON.stringify(move);
    moveButton.addEventListener("click", () => useMove(move));
    moveButton.addEventListener("mouseover", showMoveTooltip);
    moveButton.addEventListener("mouseout", hideMoveTooltip);
    movesContainer.appendChild(moveButton);
  });
}

function updateItemButtons() {
  const itemButtons = document.querySelectorAll("#items button:not(#toggle-switch)");
  if (!itemButtons || itemButtons.length === 0) return;
  
  itemButtons.forEach(button => {
    const onclickAttr = button.getAttribute("onclick");
    if (!onclickAttr) return;
    
    const match = onclickAttr.match(/'([^']+)'/);
    if (!match || !match[1]) return;
    
    const itemType = match[1];
    if (!itemUseCounts[itemType] && itemUseCounts[itemType] !== 0) return;
    
    button.disabled = itemUseCounts[itemType] <= 0;
  });
}

function updateFadeDisplay() {
  const fadeDisplay = document.getElementById("fade-display");
  if (!fadeDisplay) return;
  fadeDisplay.textContent = `Fades: ${fadeCount}`;
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
  if (!e || !e.target || !e.target.dataset || !e.target.dataset.move) return;
  
  try {
    const moveData = JSON.parse(e.target.dataset.move);
    const tooltip = document.getElementById("move-tooltip");
    if (!tooltip || !moveData) return;
    
    tooltip.innerHTML = `
      <p><strong>${moveData.name || 'Unknown Move'}</strong></p>
      <p>Type: ${moveData.type || 'Normal'}</p>
      <p>Power: ${moveData.power || 0}</p>
      <p>Accuracy: ${moveData.accuracy || 100}%</p>
      <p>${moveData.description || ""}</p>
    `;
    
    tooltip.style.display = "block";
    tooltip.style.left = `${e.pageX + 10}px`;
    tooltip.style.top = `${e.pageY + 10}px`;
  } catch (err) {
    console.error("Error showing move tooltip:", err);
  }
}

function hideMoveTooltip() {
  const tooltip = document.getElementById("move-tooltip");
  if (tooltip) tooltip.style.display = "none";
}

// Character tooltip functions
function showCharacterTooltip(e) {
  if (!e || !e.currentTarget) return;
  
  try {
    const tooltipAttr = e.currentTarget.getAttribute("data-tooltip");
    if (!tooltipAttr) return;
    
    const tooltipData = JSON.parse(tooltipAttr);
    const tooltip = document.getElementById("move-tooltip"); // Reuse the same tooltip element
    if (!tooltip || !tooltipData) return;
    
    tooltip.innerHTML = `
      <div class="character-tooltip">
        <p><strong>${tooltipData.name || 'Unknown'}</strong> (${tooltipData.type || 'Normal'})</p>
        <p>HP: ${tooltipData.hp || 0} | ATK: ${tooltipData.attack || 0} | DEF: ${tooltipData.defense || 0} | SPD: ${tooltipData.speed || 0}</p>
        <p>${tooltipData.description || 'No description available'}</p>
        <p><small>Moves: ${tooltipData.moves || 'None'}</small></p>
      </div>
    `;
    
    tooltip.style.display = "block";
    tooltip.style.left = `${e.pageX + 10}px`;
    tooltip.style.top = `${e.pageY + 10}px`;
  } catch (err) {
    console.error("Error showing character tooltip:", err);
  }
}

function hideCharacterTooltip() {
  const tooltip = document.getElementById("move-tooltip");
  if (tooltip) tooltip.style.display = "none";
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
    
    // Process active item effects at the start of player's turn
    processActiveItemEffects("player");
    
  } else {
    // Check for confusion (opponent's turn)
    if (opponentStatusEffect.type === "confused" && Math.random() < statusEffects.confused.value) {
      hitSelf(activeOpponent);
      endOpponentTurn();
      return;
    }
    
    // Process status effects at the start of opponent's turn
    processStatusEffects(activeOpponent, opponentStatusEffect, "opponent");
    
    // Process active item effects at the start of opponent's turn
    processActiveItemEffects("opponent");
    
    // AI chooses a move
    setTimeout(() => {
      const move = chooseOpponentMove();
      executeOpponentMove(move);
    }, 1000);
  }
}

// Process active item effects and reduce their durations
function processActiveItemEffects(side) {
  if (side === "player") {
    // Process player item effects
    if (playerActiveItemEffects.length > 0) {
      // Filter out any expired effects
      const activeEffects = [];
      
      playerActiveItemEffects.forEach(effect => {
        effect.remainingDuration--;
        
        if (effect.remainingDuration <= 0) {
          // Effect has expired, remove the stat modifier
          if (effect.effect === "atkUp") {
            playerStatModifiers.attack /= effect.value;
            addToBattleLog(`${activePlayerCharacter.name}'s Attack buff wore off.`);
          } else if (effect.effect === "defUp") {
            playerStatModifiers.defense /= effect.value;
            addToBattleLog(`${activePlayerCharacter.name}'s Defense buff wore off.`);
          }
        } else {
          // Effect is still active
          activeEffects.push(effect);
        }
      });
      
      // Update the active effects array with only non-expired effects
      playerActiveItemEffects = activeEffects;
    }
  } else {
    // Process opponent item effects
    if (opponentActiveItemEffects.length > 0) {
      // Filter out any expired effects
      const activeEffects = [];
      
      opponentActiveItemEffects.forEach(effect => {
        effect.remainingDuration--;
        
        if (effect.remainingDuration <= 0) {
          // Effect has expired, remove the stat modifier
          if (effect.effect === "atkUp") {
            opponentStatModifiers.attack /= effect.value;
            addToBattleLog(`${activeOpponent.name}'s Attack buff wore off.`);
          } else if (effect.effect === "defUp") {
            opponentStatModifiers.defense /= effect.value;
            addToBattleLog(`${activeOpponent.name}'s Defense buff wore off.`);
          }
        } else {
          // Effect is still active
          activeEffects.push(effect);
        }
      });
      
      // Update the active effects array with only non-expired effects
      opponentActiveItemEffects = activeEffects;
    }
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
  
  // Play hit sound
  playHitSound();
  
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
  
  // Play hit sound
  playHitSound();
  
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
      // Apply the stat modifier
      playerStatModifiers.attack *= item.value;
      addToBattleLog(`${activePlayerCharacter.name}'s Attack rose sharply!`);
      showFloatingLog("ATK ↑↑");
      
      // Add to active effects with duration
      if (item.duration) {
        playerActiveItemEffects.push({
          itemType: itemType,
          effect: item.effect,
          value: item.value,
          remainingDuration: item.duration
        });
        addToBattleLog(`The effect will last for ${item.duration} turns.`);
      }
      break;
      
    case "defUp":
      // Apply the stat modifier
      playerStatModifiers.defense *= item.value;
      addToBattleLog(`${activePlayerCharacter.name}'s Defense rose sharply!`);
      showFloatingLog("DEF ↑↑");
      
      // Add to active effects with duration
      if (item.duration) {
        playerActiveItemEffects.push({
          itemType: itemType,
          effect: item.effect,
          value: item.value,
          remainingDuration: item.duration
        });
        addToBattleLog(`The effect will last for ${item.duration} turns.`);
      }
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
  
  // Play switch sound
  playSwitchSound();
  
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
  
  // Play success sound
  playSuccessSound();
  
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
  
  // Play hit sound
  playHitSound();
  
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
  // Increment battle counter
  battleCounter++;
  
  // Only increase fade count after 3 battles
  if (battleCounter >= 3) {
    fadeCount++;
    battleCounter = 0; // Reset battle counter for next fade
    updateFadeDisplay();
  }
  
  addToBattleLog(`${activeOpponent.name} got faded!`);
  showFloatingLog(`${activeOpponent.name} faded!`);
  
  // Play success sound
  playSuccessSound();
  
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
  
  // Play appropriate sound
  if (playerWon) {
    playSuccessSound();
    document.getElementById("game-over-message").textContent = "You won! All opponents got faded!";
    document.getElementById("win-lose-gif").src = resultGifs.win[Math.floor(Math.random() * resultGifs.win.length)];
  } else {
    playHitSound(); // Use hit sound for losing
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
  
  // Play success sound
  playSuccessSound();
  
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
  
  // Switch back to menu music
  playMenuMusic();
  
  // Clear battle log
  const battleLogElement = document.getElementById("battle-log");
  battleLogElement.innerHTML = "";
  
  // Reset game state
  playerTeam = [];
  fadeCount = 0;
  battleCounter = 0; // Reset battle counter
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