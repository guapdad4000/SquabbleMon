// ================ ZONE TYPES ================
// Zone types for integration with overworld - exposed via window
window.ZONE_TYPES = window.ZONE_TYPES || {
  STARTER_HOOD: 'starterHood',
  THE_TRAP: 'theTrap',
  THE_BLOCK: 'theBlock',
  RICH_SUBURBIA: 'richSuburbia',
  BACK_ALLEY_ARENA: 'backAlleyArena'
};

// ================ AUDIO CONFIGURATION ================
// Audio URLs
const AUDIO = {
  menuMusic: "audio/sounds/menu-music.mp3",
  battleMusic: "audio/sounds/battle-music.mp3", 
  hitSound: "audio/sounds/hit-sound.mp3",
  successSound: "audio/sounds/success-sound.mp3",
  switchSound: "audio/sounds/switch-sound.mp3"
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

// Animation functions are now loaded from animations.js

// ================ GAME DATA ================
// Game mode tracking
let currentGameMode = null; // Track if we're in 'fade' or 'story' mode
// Character data with battle info
const characters = [
  {
    id: 1,
    name: "Rastamon",
    sprite: "public/sprites/rastamon.png", 
    image: "public/sprites/rastamon.png", 
    hp: 200,
    attack: 150,
    defense: 130,
    speed: 130,
    critRate: 0.1,
    type: "Plant",
    status: "normal",
    description: "Chill vibes only. Prefers napping in sunbeams to actual squabbling.",
    moves: [
      { name: "Dreadlock Whip", power: 50, accuracy: 95, type: "Plant", description: "Plant-type whip attack with dreadlocks.", pp: 15, maxPp: 15 },
      { name: "6 Rasclaat Eggs?!", power: 70, accuracy: 85, type: "Fire", description: "Fiery attack that may cause 'sleep' status.", pp: 10, maxPp: 10 },
      { name: "Irie Recharge", power: 0, accuracy: 100, type: "Plant", description: "Healing move that restores HP.", pp: 5, maxPp: 5 },
      { name: "Chill Vibes", power: 40, accuracy: 90, type: "status", description: "Lowers opponent's speed with relaxed energy.", pp: 10, maxPp: 10 }
    ]
  },
  {
    id: 2,
    name: "Fitness Bro",
    sprite: "public/sprites/fitness.png", 
    image: "public/sprites/fitness.png", 
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
    sprite: "https://i.imgur.com/m7Rup7S.png", 
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
    sprite: "https://i.imgur.com/qRtemtQ.png", 
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
  },
  {
    id: 24,
    name: "Techbro Rich",
    sprite: "https://i.imgur.com/eJpAcGt.png", 
    hp: 180,
    attack: 180,
    defense: 120,
    speed: 190,
    critRate: 0.15,
    type: "Electric",
    status: "normal",
    description: "Disrupting the Squabblemon scene, one NFT at a time. Very rich.",
    moves: [
      { name: "Tesla Taze", power: 55, accuracy: 90, type: "Electric", description: "Electric shock that may cause paralysis.", pp: 15, maxPp: 15 },
      { name: "NFT Nuke", power: 85, accuracy: 70, type: "Normal", description: "Powerful attack with lower accuracy.", pp: 5, maxPp: 5 },
      { name: "VC Funded Flex", power: 0, accuracy: 100, type: "Electric", description: "Raises speed with venture capital backing.", pp: 10, maxPp: 10 },
      { name: "Crypto Crash", power: 70, accuracy: 80, type: "Dark", description: "Financial attack that can cause confusion.", pp: 10, maxPp: 10 }
    ]
  },
  {
    id: 25,
    name: "Scammer",
    sprite: "https://i.imgur.com/tvAPXl8.png", 
    hp: 170,
    attack: 150,
    defense: 110,
    speed: 190,
    critRate: 0.15,
    type: "Dark",
    status: "normal",
    description: "Probably not who they say they are. Watch your wallet.",
    moves: [
      { name: "Catfish Swipe", power: 50, accuracy: 95, type: "Dark", description: "Deceptive attack with good accuracy.", pp: 15, maxPp: 15 },
      { name: "Cash App Cripple", power: 75, accuracy: 80, type: "Electric", description: "Financial attack that may cause paralysis.", pp: 10, maxPp: 10 },
      { name: "Fake Link Flick", power: 5, accuracy: 100, type: "Dark", description: "Raises speed through deception.", pp: 10, maxPp: 10 },
      { name: "Identity Theft", power: 65, accuracy: 85, type: "Dark", description: "Steals opponent's identity for extra damage.", pp: 10, maxPp: 10 }
    ]
  },
  {
    id: 26,
    name: "Smoker Jr",
    sprite: "https://i.imgur.com/vdaAi7h.png", 
    hp: 190,
    attack: 120,
    defense: 130,
    speed: 150,
    critRate: 0.1,
    type: "Air",
    status: "normal",
    description: "Permanently hazy. Might forget what move it was using mid-battle.",
    moves: [
      { name: "Cloud Cough", power: 40, accuracy: 100, type: "Air", description: "Smoky attack that may lower accuracy.", pp: 15, maxPp: 15 },
      { name: "Bong Rip Blast", power: 45, accuracy: 95, type: "Fire", description: "Hazy attack that may cause sleep.", pp: 15, maxPp: 15 },
      { name: "Smoke Screen Stunt", power: 0, accuracy: 100, type: "Normal", description: "Uses smoke to raise defense.", pp: 10, maxPp: 10 },
      { name: "Dazed Confusion", power: 60, accuracy: 85, type: "Dark", description: "Confused attack that may cause confusion to both sides.", pp: 10, maxPp: 10 }
    ]
  },
  {
    id: 27,
    name: "Suburban Kid",
    sprite: "https://i.imgur.com/LKtVgCn.png", 
    hp: 180,
    attack: 130,
    defense: 140,
    speed: 200,
    critRate: 0.1,
    type: "Normal",
    status: "normal",
    description: "Just grilled. Enjoys well-maintained lawns and quiet evenings.",
    moves: [
      { name: "Lawnmower Lash", power: 50, accuracy: 95, type: "Plant", description: "Plant attack using lawn care tools.", pp: 15, maxPp: 15 },
      { name: "BBQ Blaze", power: 55, accuracy: 85, type: "Fire", description: "Grilling attack that may cause burn.", pp: 10, maxPp: 10 },
      { name: "Picket Fence", power: 0, accuracy: 100, type: "Normal", description: "Uses suburban defenses to boost defense.", pp: 10, maxPp: 10 },
      { name: "HOA Citation", power: 45, accuracy: 100, type: "Normal", description: "Bureaucratic attack with perfect accuracy.", pp: 15, maxPp: 15 }
    ]
  },
  {
    id: 28,
    name: "Bikelife YN",
    sprite: "https://i.imgur.com/i6xU3C7.png", 
    hp: 185,
    attack: 150,
    defense: 125,
    speed: 190,
    critRate: 0.15,
    type: "Electric",
    status: "normal",
    description: "Swerving through traffic and battles. Speed is everything.",
    moves: [
      { name: "Wheelie Whip", power: 55, accuracy: 95, type: "Normal", description: "Trick attack with good accuracy.", pp: 15, maxPp: 15 },
      { name: "Exhaust Burn", power: 60, accuracy: 90, type: "Fire", description: "Bike exhaust attack that may cause burn.", pp: 10, maxPp: 10 },
      { name: "Ride Out", power: 0, accuracy: 100, type: "Electric", description: "Uses bike momentum to boost speed.", pp: 10, maxPp: 10 },
      { name: "High-Speed Trick", power: 60, accuracy: 100, type: "Normal", description: "Impressive trick that lowers opponent's attack.", pp: 10, maxPp: 10 }
    ]
  },
  {
    id: 29,
    name: "Hooper",
    sprite: "https://i.imgur.com/nmL74YQ.png", 
    hp: 210,
    attack: 175,
    defense: 140,
    speed: 135,
    critRate: 0.15,
    type: "Fire",
    status: "normal",
    description: "Got handles and heart. Plays above the rim and talks trash.",
    moves: [
      { name: "Ankle Breaker Combo", power: 55, accuracy: 85, type: "Normal", description: "Quick moves that may lower opponent's speed.", pp: 15, maxPp: 15 },
      { name: "Heat Check", power: 75, accuracy: 75, type: "Fire", description: "High-risk, high-reward scoring move.", pp: 10, maxPp: 10 },
      { name: "Hoop Harder", power: 70, accuracy: 85, type: "Normal", description: "Aggressive dunk that may cause flinching.", pp: 10, maxPp: 10 },
      { name: "Support Bunny", power: 0, accuracy: 100, type: "Normal", description: "Uses support to heal HP.", pp: 5, maxPp: 5 }
    ]
  },
  {
    id: 30,
    name: "Live Streamer",
    sprite: "https://i.imgur.com/3rCsqGF.png", 
    hp: 175,
    attack: 120,
    defense: 115,
    speed: 185,
    critRate: 0.1,
    type: "Electric",
    status: "normal",
    description: "'Yo, chat! Smash that like button!' Always online, never AFK.",
    moves: [
      { name: "Stan Submission", power: 40, accuracy: 100, type: "Normal", description: "Fan-powered attack with perfect accuracy.", pp: 20, maxPp: 20 },
      { name: "Follower Frenzy", power: 10, accuracy: 100, type: "Normal", description: "Uses online clout to boost speed.", pp: 10, maxPp: 10 },
      { name: "Donate Debuff", power: 50, accuracy: 90, type: "Dark", description: "Monetization attack that lowers defense.", pp: 10, maxPp: 10 },
      { name: "Subscribe Spam", power: 55, accuracy: 85, type: "Electric", description: "Annoying notification attack with flinch chance.", pp: 15, maxPp: 15 }
    ]
  }
];

// Enemy (Opponent) data
let opponents = [
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
    sprite: "https://i.imgur.com/eJpAcGt.png", 
    hp: 180,
    attack: 180,
    defense: 120,
    speed: 190,
    critRate: 0.15,
    type: "Electric",
    description: "Disrupting the Squabblemon scene, one NFT at a time. Very rich.",
    moves: [
      { name: "Tesla Taze", power: 55, accuracy: 90, type: "Electric", description: "Electric-type attack that may cause paralysis.", pp: 15, maxPp: 15 },
      { name: "NFT Nuke", power: 85, accuracy: 70, type: "Normal", description: "Normal-type powerful attack with low accuracy.", pp: 5, maxPp: 5 },
      { name: "VC Funded Flex", power: 0, accuracy: 100, type: "Electric", description: "Raises speed with venture capital energy.", pp: 10, maxPp: 10 },
      { name: "Crypto Crash", power: 75, accuracy: 80, type: "Dark", description: "Dark-type attack with medium power and accuracy.", pp: 10, maxPp: 10 }
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
  },
  {
    id: 109,
    name: "Functional Addict",
    sprite: "https://i.imgur.com/G3xfSjU.png",
    hp: 190,
    attack: 120,
    defense: 130,
    speed: 150,
    critRate: 0.05,
    type: "Water",
    description: "Runs on liquids that aren't always water. Surprisingly coherent.",
    moves: [
      { name: "Sip & Splash", power: 45, accuracy: 100, type: "Water", pp: 15, maxPp: 15, effect: "lowerAccuracy" },
      { name: "Henny Haze", power: 60, accuracy: 90, type: "Dark", pp: 15, maxPp: 15, effect: "sleep" },
      { name: "Sober Up Sis", power: 0, accuracy: 100, type: "Normal", pp: 10, maxPp: 10, effect: "raiseDefense" },
      { name: "Liquid Courage", power: 70, accuracy: 80, type: "Water", pp: 10, maxPp: 10, effect: "none" }
    ],
    ai: "balanced"
  },
  {
    id: 110,
    name: "Jittery Junkman",
    sprite: "https://i.imgur.com/cl7GtvK.png",
    hp: 150,
    attack: 140,
    defense: 90,
    speed: 195,
    critRate: 0.10,
    type: "Poison",
    description: "Moves fast, thinks faster... maybe too fast. Always looking for the next score.",
    moves: [
      { name: "Scrap Scramble", power: 40, accuracy: 100, type: "Poison", pp: 15, maxPp: 20, effect: "poison" },
      { name: "Twitchy Takedown", power: 60, accuracy: 85, type: "Normal", pp: 15, maxPp: 15, effect: "none" },
      { name: "Fiending Focus", power: 0, accuracy: 100, type: "Poison", pp: 10, maxPp: 10, effect: "raiseSpeed" },
      { name: "Pookie Push", power: 60, accuracy: 100, type: "Rock", pp: 10, maxPp: 10, effect: "raiseEvasion" }
    ],
    ai: "aggressive"
  },
  {
    id: 111,
    name: "Closet Nerd",
    sprite: "https://i.imgur.com/knA2Yxz.png",
    hp: 200,
    attack: 140,
    defense: 100,
    speed: 170,
    critRate: 0.05,
    type: "Dark",
    description: "Knows more about anime than you know about yourself. Don't ask.",
    moves: [
      { name: "Manga Smack", power: 60, accuracy: 95, type: "Normal", pp: 15, maxPp: 15, effect: "none" },
      { name: "Weeb Roast", power: 55, accuracy: 85, type: "Fire", pp: 10, maxPp: 10, effect: "burn" },
      { name: "Anime Reference", power: 0, accuracy: 100, type: "Dark", pp: 10, maxPp: 10, effect: "raiseAttack" }
    ],
    ai: "defensive"
  },
  {
    id: 112,
    name: "Cool Vibe YN",
    sprite: "https://i.imgur.com/2n71aSJ.png",
    hp: 190,
    attack: 170,
    defense: 130,
    speed: 150,
    critRate: 0.08,
    type: "Water",
    description: "Smooth operator. Always hydrated and ready to slide into the DMs.",
    moves: [
      { name: "Splash Dat Ass", power: 50, accuracy: 95, type: "Water", pp: 15, maxPp: 15, effect: "wet" },
      { name: "Wave Check Fade", power: 70, accuracy: 85, type: "Water", pp: 10, maxPp: 10, effect: "sleep" },
      { name: "Call Girls for Gang", power: 0, accuracy: 100, type: "Water", pp: 5, maxPp: 5, effect: "heal" }
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
    description: "Heals 30 HP with positive vibes",
    icon: "💿"
  },
  nbayoungboy: {
    name: "NBA Youngboy CD",
    effect: "atkUp",
    value: 1.3,
    duration: 3,
    description: "Raises Attack by 30% for 3 turns",
    icon: "🎵"
  },
  weed: {
    name: "Weed",
    effect: "statusCure",
    description: "Cures status effects and gives slight HP boost",
    icon: "🌿"
  },
  crashdummy: {
    name: "Crash Dummy",
    effect: "imposter",
    duration: 1,
    description: "Sends out an imposter to take a hit for a turn",
    icon: "🎭"
  }
};

// Background images for battle scenes
const battleBackgrounds = [
  "./public/backgrounds/bg3.png", // Urban city background
  "./public/backgrounds/bg4.png", // Alleyway background
  "./public/backgrounds/bg5.png", // Street scene background
  "./public/backgrounds/bg6.png", // Urban night background
  "./public/backgrounds/bg3.png", // Urban city background (duplicate)
  "./public/backgrounds/bg4.png"  // Alleyway background (duplicate)
];

// Type images from provided URLs
const typeImages = {
  "Fire": "https://i.imgur.com/SNIiQlg.png",
  "Water": "https://i.imgur.com/7UM8JDs.png",
  "Plant": "https://i.imgur.com/rsqXcY7.png",
  "Earth": "https://i.imgur.com/iOeteHQ.png",
  "Rock": "https://i.imgur.com/iOeteHQ.png", // Using Earth for Rock
  "Electric": "https://i.imgur.com/UWi3DFj.png", // Using credit image temporarily
  "Air": "https://i.imgur.com/UWi3DFj.png", // Using credit image temporarily
  "Dark": "https://i.imgur.com/UWi3DFj.png", // Using credit image temporarily
  "Normal": "https://i.imgur.com/UWi3DFj.png" // Using credit image temporarily
};

// Attack effect animations
const attackAnimations = {
  // Urban themes
  "urban": "https://i.imgur.com/nRllcOZ.gif",   // Water splash effect
  "street": "https://i.imgur.com/ikygIg7.gif",  // Fiery effect
  "hiphop": "https://i.imgur.com/Z6VXMwT.gif",  // Electric effect
  "tech": "https://i.imgur.com/2hTPscl.gif",    // Leaf/plant effect
  "status": "https://i.imgur.com/HNQ2XDC.gif",  // Status/purple effect
  
  // Standard types 
  "Fire": "https://i.imgur.com/ikygIg7.gif",    // Fire animation - Updated
  "Water": "https://i.imgur.com/nRllcOZ.gif",   // Water animation - Updated
  "Plant": "https://i.imgur.com/2hTPscl.gif",   // Plant animation
  "Electric": "https://i.imgur.com/Z6VXMwT.gif", // Electric animation
  "Dark": "https://i.imgur.com/HNQ2XDC.gif",    // Dark animation
  "Air": "https://i.imgur.com/yaNJUVn.gif",     // Air animation
  "Normal": "https://i.imgur.com/B1tVuGQ.gif",  // Normal animation
  "Rock": "https://i.imgur.com/Z8UgFb1.gif"     // Rock animation
};

// Status effect animations
const statusAnimations = {
  // Urban status effects
  "slimed": "https://i.imgur.com/nRllcOZ.gif", // Water effect - Updated
  "confused": "https://i.imgur.com/yaNJUVn.gif", // Dizzy stars effect
  "baked": "https://i.imgur.com/PpxuqBD.gif",   // Sleep effect
  "bleeding": "https://i.imgur.com/jW8KQD2.gif", // Fire effect - Updated
  "dazed": "https://i.imgur.com/fP0lG2M.gif",    // Thunder effect
  
  // Keep original effects for compatibility
  "burn": "https://i.imgur.com/jW8KQD2.gif", // Use bleeding animation - Updated
  "paralysis": "https://i.imgur.com/fP0lG2M.gif", // Use dazed animation
  "sleep": "https://i.imgur.com/PpxuqBD.gif", // Use baked animation
  "poison": "https://i.imgur.com/nRllcOZ.gif", // Use slimed animation - Updated
  "heal": "https://i.imgur.com/684Bb2r.gif"   // Healing animation
};

// Win/Lose GIFs
const resultGifs = {
  win: [
    "https://i.gifer.com/ZJF0.gif",
    "https://i.gifer.com/1uIf.gif",
    "https://i.imgur.com/GEXD7bk.gif",
    "https://i.imgur.com/tzvjhq5.gif"
  ],
  lose: [
    "https://i.gifer.com/Z6W8.gif",
    "https://i.imgur.com/dR3qDnS.gif",
    "https://i.imgur.com/i4JWxGP.gif"
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

// Mobile controls functionality
function initMobileControls() {
  console.log("Initializing mobile controls");
  
  // Check if the device is mobile using a more reliable way (user agent)
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
  
  // Control container and iframe references
  const mobileContainer = document.getElementById("mobile-controls-container");
  const iframe = document.getElementById("mobile-controls-frame");
  
  if (isMobile) {
    // Only show mobile controls in overworld or selection modes, hide in battle
    const isInBattle = document.getElementById("battle-screen").style.display !== "none";
    
    if (isInBattle) {
      // Hide mobile controls during battles
      if (mobileContainer) {
        mobileContainer.style.display = "none";
        mobileContainer.style.visibility = "hidden";
      }
      console.log("Battle mode detected, hiding d-pad controls");
    } else {
      // Show mobile controls for overworld and selection screens
      if (mobileContainer) {
        mobileContainer.style.display = "block";
        mobileContainer.style.visibility = "visible";
        mobileContainer.style.opacity = "1";
        mobileContainer.style.zIndex = "9999";
        
        console.log("Mobile device detected, showing controls:", mobileContainer);
        
        // Ensure the iframe is loaded properly
        if (iframe) {
          iframe.style.display = "block";
          iframe.style.visibility = "visible";
          iframe.style.height = "100%";
          iframe.style.width = "100%";
          
          iframe.onload = function() {
            console.log("Mobile controls iframe loaded successfully");
          };
        }
      }
    }
  } else {
    // Hide controls for desktop
    if (mobileContainer) {
      mobileContainer.style.display = "none";
      mobileContainer.style.visibility = "hidden";
    }
    console.log("Desktop device detected, hiding mobile controls");
  }
  
  // Shared navigation state
  let currentFocus = null;
  let navItems = [];
  let navIndex = -1;
  let currentScreen = "selection"; // selection, battle, switch, simple-switch, game-over
  
  // Message handler from iframe
  window.addEventListener('message', function(event) {
    // Security check
    if (event.origin !== window.location.origin) {
      console.log("Origin mismatch:", event.origin, window.location.origin);
      return;
    }
    
    console.log("Received message:", event.data);
    
    const keyData = event.data;
    if (!keyData || !keyData.type) return;
    
    if (keyData.type === 'keypress') {
      console.log("Processing keypress:", keyData.key);
      // Handle virtual D-pad and button controls from iframe
      switch (keyData.key) {
        case 'ArrowUp':
          handleDpadUp();
          break;
        case 'ArrowDown':
          handleDpadDown();
          break;
        case 'ArrowLeft':
          handleDpadLeft();
          break;
        case 'ArrowRight':
          handleDpadRight();
          break;
        case 'A':
          handleAButton();
          break;
        case 'B':
          handleBButton();
          break;
      }
    }
  });
  
  // Keyboard handlers for desktop users
  function handleKeyboardNavigation(e) {
    console.log("Handling keyboard navigation:", e.key);
    
    // Check if we're in the overworld (we may need to forward the key to the overworld controls)
    const overworldContainer = document.getElementById('overworld-container');
    const isInOverworld = overworldContainer && overworldContainer.style.display !== 'none';
    
    if (isInOverworld) {
      // If in overworld, we need to add player movement by posting a message to the overworld
      console.log("Sending keypress:", e.key);
      const message = {
        type: 'keypress',
        key: e.key
      };
      window.postMessage(message, window.location.origin);
      return; // Don't continue with the menu navigation if we're in overworld
    }
    
    // Only handle navigation keys for menus
    switch (e.key) {
      case 'ArrowUp':
        handleDpadUp();
        playSwitchSound(); // Add navigation sound feedback
        e.preventDefault();
        break;
      case 'ArrowDown':
        handleDpadDown();
        playSwitchSound(); // Add navigation sound feedback
        e.preventDefault();
        break;
      case 'ArrowLeft':
        handleDpadLeft();
        playSwitchSound(); // Add navigation sound feedback
        e.preventDefault();
        break;
      case 'ArrowRight':
        handleDpadRight();
        playSwitchSound(); // Add navigation sound feedback
        e.preventDefault();
        break;
    }
  }
  
  function handleKeyboardAction(e) {
    // Handle action keys (Enter = A button, Escape = B button)
    switch (e.key) {
      case 'Enter':
      case ' ': // Space bar
        handleAButton();
        playSuccessSound(); // Add selection sound feedback
        e.preventDefault();
        break;
      case 'Escape':
        handleBButton();
        playSwitchSound(); // Add back/cancel sound feedback
        e.preventDefault();
        break;
    }
  }
  
  // Add keyboard event listeners for desktop users
  document.addEventListener('keydown', handleKeyboardNavigation);
  document.addEventListener('keyup', handleKeyboardAction);
  
  // Helper to update the current screen
  function updateCurrentScreen() {
    if (document.getElementById("selection-screen").style.display !== "none") {
      currentScreen = "selection";
    } else if (document.getElementById("battle-screen").style.display !== "none") {
      currentScreen = "battle";
    } else if (document.getElementById("switch-screen").style.display !== "none") {
      currentScreen = "switch";
    } else if (document.getElementById("simple-switch-prompt").style.display !== "none") {
      currentScreen = "simple-switch";
    } else if (document.getElementById("game-over").style.display !== "none") {
      currentScreen = "game-over";
    }
  }
  
  // Get available navigation items based on current screen
  function getNavItems() {
    updateCurrentScreen();
    
    switch (currentScreen) {
      case "selection":
        // Include ALL character cards (including selected ones) and the start button
        const startButton = document.getElementById("start-battle");
        const characters = Array.from(document.querySelectorAll(".character-card"));
        return startButton && !startButton.disabled ? [...characters, startButton] : characters;
      case "battle":
        // Get both moves and items for a unified navigation
        const moveButtons = Array.from(document.querySelectorAll("#moves button:not(:disabled)"));
        const itemButtons = Array.from(document.querySelectorAll("#items button:not(:disabled)"));
        const switchButton = document.getElementById("toggle-switch");
        
        // Include all interactive elements in the battle screen
        return [...moveButtons, ...itemButtons, switchButton];
      case "switch":
        return Array.from(document.querySelectorAll(".switch-option:not(.fainted):not(.current)"));
      case "simple-switch":
        return Array.from(document.querySelectorAll("#simple-switch-prompt button"));
      case "game-over":
        return Array.from(document.querySelectorAll("#game-over button:not([style*='display: none'])"));
      default:
        return [];
    }
  }
  
  // Helper function to add visual focus to an element
  function addFocus(element) {
    if (currentFocus) {
      currentFocus.style.outline = "none";
      currentFocus.style.boxShadow = "none";
    }
    
    if (element) {
      element.style.outline = "2px solid white";
      element.style.boxShadow = "0 0 0 4px rgba(255, 255, 255, 0.5)";
      currentFocus = element;
      
      // Special handling for start-battle button - make it more noticeable
      if (element.id === "start-battle") {
        // Make sure it's visible in the viewport
        document.getElementById("selection-screen").scrollTop = 
          document.getElementById("selection-screen").scrollHeight;
        
        // Apply special styling and animation
        element.style.outline = "3px solid yellow";
        element.style.boxShadow = "0 0 10px rgba(255, 255, 0, 0.7)";
        
        // Use our more noticeable pulse animation
        element.style.animation = "pulseHighlight 1.2s infinite";
        element.style.position = "relative";
        element.style.zIndex = "10";
        
        // Create a floating indicator pointing to the button if it's ready
        if (!element.disabled) {
          showFloatingLog("Select this button to start the battle!", 2000);
        }
      } else if (currentScreen === "selection") {
        // Remove effects from start button when not focused
        const startBtn = document.getElementById("start-battle");
        if (startBtn) {
          startBtn.style.animation = "";
          startBtn.style.outline = "none";
          startBtn.style.boxShadow = "none";
          startBtn.style.zIndex = "1";
        }
      }
      
      // Ensure the element is visible
      if (typeof element.scrollIntoView === 'function') {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }
  
  // Initialize navigation
  function initNav() {
    navItems = getNavItems();
    console.log("initNav called, found", navItems.length, "navigable items");
    
    if (navItems.length > 0) {
      navIndex = 0;
      addFocus(navItems[navIndex]);
      console.log("Focus set to:", navItems[navIndex].textContent || "unnamed element");
    } else {
      navIndex = -1;
      currentFocus = null;
      console.log("No navigable items found");
    }
  }
  
  // D-pad handlers
  function handleDpadUp() {
    // Always refresh the nav items in case the UI has changed
    navItems = getNavItems();
    if (navItems.length === 0) return;
    
    // Initialize if not already done
    if (navIndex === -1) {
      initNav();
      return;
    }
    
    // Different behavior based on screen
    if (currentScreen === "selection") {
      // In character selection, go up a row (assume characters are in a grid)
      const cardsPerRow = Math.floor(document.getElementById("character-list").clientWidth / navItems[0].clientWidth);
      navIndex = Math.max(0, navIndex - cardsPerRow);
    } else {
      // Simple up movement
      navIndex = Math.max(0, navIndex - 1);
    }
    
    addFocus(navItems[navIndex]);
  }
  
  function handleDpadDown() {
    // Always refresh the nav items in case the UI has changed
    navItems = getNavItems();
    if (navItems.length === 0) return;
    
    // Initialize if not already done
    if (navIndex === -1) {
      initNav();
      return;
    }
    
    // Different behavior based on screen
    if (currentScreen === "selection") {
      // In character selection, go down a row (assume characters are in a grid)
      const cardsPerRow = Math.floor(document.getElementById("character-list").clientWidth / navItems[0].clientWidth);
      navIndex = Math.min(navItems.length - 1, navIndex + cardsPerRow);
    } else {
      // Simple down movement
      navIndex = Math.min(navItems.length - 1, navIndex + 1);
    }
    
    addFocus(navItems[navIndex]);
  }
  
  function handleDpadLeft() {
    // Always refresh the nav items in case the UI has changed
    navItems = getNavItems();
    if (navItems.length === 0) return;
    
    // Initialize if not already done
    if (navIndex === -1) {
      initNav();
      return;
    }
    
    // Move left
    navIndex = Math.max(0, navIndex - 1);
    addFocus(navItems[navIndex]);
  }
  
  function handleDpadRight() {
    // Always refresh the nav items in case the UI has changed
    navItems = getNavItems();
    if (navItems.length === 0) return;
    
    // Initialize if not already done
    if (navIndex === -1) {
      initNav();
      return;
    }
    
    // Move right
    navIndex = Math.min(navItems.length - 1, navIndex + 1);
    addFocus(navItems[navIndex]);
  }
  
  // Action button handlers
  function handleAButton() {
    if (currentFocus) {
      const currentScreenBefore = currentScreen;
      const currentNavIndex = navIndex; // Store current index
      
      // Click the element
      currentFocus.click();
      
      // Re-initialize navigation after screen changes, but maintain position if possible
      setTimeout(() => {
        navItems = getNavItems();
        
        // Only reset index to 0 if we've changed screens or there are no items
        if (currentScreenBefore !== currentScreen || navItems.length === 0) {
          if (navItems.length > 0) {
            navIndex = 0;
            addFocus(navItems[navIndex]);
          } else {
            navIndex = -1;
            currentFocus = null;
          }
        } else {
          // Try to maintain position
          navIndex = Math.min(currentNavIndex, navItems.length - 1);
          if (navIndex >= 0 && navItems.length > 0) {
            addFocus(navItems[navIndex]);
          }
        }
      }, 300);
    }
  }
  
  function handleBButton() {
    updateCurrentScreen();
    
    // Different behavior based on screen
    switch (currentScreen) {
      case "battle":
        // In our new UI, we don't need to toggle between views
        // Everything is always visible
        // This is kept for compatibility with the navigation system
        break;
      case "switch":
        // Cancel switch if possible
        const cancelBtn = document.querySelector("#switch-screen button");
        if (cancelBtn && cancelBtn.style.display !== "none") {
          cancelBtn.click();
        }
        break;
      case "simple-switch":
        // Select "No" on the simple switch prompt
        const noBtn = document.querySelectorAll("#simple-switch-prompt button")[1];
        if (noBtn) {
          noBtn.click();
        }
        break;
    }
  }
  
  // Initialize navigation on page load and when screens change
  const screens = ["selection-screen", "battle-screen", "switch-screen", "simple-switch-prompt", "game-over"];
  
  // Also observe battle menu containers
  const menuElements = ["action-container", "moves", "items"];
  
  // Use MutationObserver to detect when screens are shown/hidden
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'style' && 
          mutation.target.style.display !== mutation.oldValue) {
        setTimeout(initNav, 100); // Small delay to let the UI update
      }
    });
  });
  
  // Observe all screens for display changes
  screens.forEach(screenId => {
    const el = document.getElementById(screenId);
    if (el) {
      observer.observe(el, { 
        attributes: true, 
        attributeFilter: ['style'],
        attributeOldValue: true
      });
    }
  });
  
  // Also observe battle menu containers
  menuElements.forEach(menuId => {
    const el = document.getElementById(menuId);
    if (el) {
      observer.observe(el, { 
        attributes: true, 
        attributeFilter: ['style'],
        attributeOldValue: true
      });
    }
  });
  
  // Initial navigation setup
  initNav();
}

// Initialize the game and mobile controls when the page loads
// Game mode state is declared at the top of the file

// Function to select game mode
function selectGameMode(mode) {
  console.log(`Selecting game mode: ${mode}`);
  currentGameMode = mode;
  
  // Hide mode selection screen
  document.getElementById('mode-selection-screen').style.display = 'none';
  
  // Show character selection
  document.getElementById('selection-screen').style.display = 'flex';
  
  // Update UI based on selected mode
  if (mode === 'fade') {
    // Fade mode just needs character selection for battle
    document.getElementById('explore-button').style.display = 'none';
  } else if (mode === 'story') {
    // Story mode shows explore button
    document.getElementById('explore-button').style.display = 'inline-block';
  }
  
  // Initialize game components after mode selection
  initGame();
}

// Expose the function to window object so it can be called from onclick events
window.selectGameMode = selectGameMode;

// Function to start explore mode
function startExploreMode() {
  console.log("Starting explore mode...");
  
  try {
    // Check if we have at least one character
    if (playerTeam.length === 0) {
      alert("Select at least one character to explore");
      return;
    }
    
    // Hide selection screen
    const selectionScreen = document.getElementById('selection-screen');
    if (selectionScreen) {
      selectionScreen.style.display = 'none';
    }
    
    // Make sure the overworld.js script is loaded
    if (!window.OverworldSystem) {
      console.log("Loading overworld script...");
      
      // Load the overworld.js script if it's not already loaded
      if (!document.querySelector('script[src*="overworld.js"]')) {
        const overworldScript = document.createElement('script');
        overworldScript.src = 'overworld.js';
        document.head.appendChild(overworldScript);
        
        // Wait for script to load before continuing
        overworldScript.onload = function() {
          console.log("Overworld script loaded, initializing...");
          continueToOverworld();
        };
        
        overworldScript.onerror = function() {
          console.error("Failed to load overworld script");
          alert("Failed to load overworld. Please try again.");
          if (selectionScreen) selectionScreen.style.display = 'flex';
        };
        
        return; // Exit function and wait for script to load
      }
    }
    
    // Continue to overworld immediately if script is already loaded
    continueToOverworld();
    
  } catch (error) {
    console.error("Error starting explore mode:", error);
    alert("An error occurred. Please try again.");
    const selectionScreen = document.getElementById('selection-screen');
    if (selectionScreen) selectionScreen.style.display = 'flex';
  }
  
  // Helper function to continue to overworld after script is loaded
  function continueToOverworld() {
    try {
      console.log("Continuing to overworld...");
      
      // Hide other screens first
      const battleScreen = document.getElementById('battle-screen');
      if (battleScreen) battleScreen.style.display = 'none';
      
      const gameOver = document.getElementById('game-over');
      if (gameOver) gameOver.style.display = 'none';
      
      // Make sure overworld container exists
      let overworldContainer = document.getElementById('overworld-container');
      if (!overworldContainer) {
        console.log("Creating overworld container");
        overworldContainer = document.createElement('div');
        overworldContainer.id = 'overworld-container';
        document.body.appendChild(overworldContainer);
      }
      
      // Make sure overworld system is loaded
      if (!window.OverworldSystem || typeof window.OverworldSystem.initOverworld !== 'function') {
        console.error("Overworld system not found or not initialized properly");
        
        // Attempt to reload the script
        const overworldScript = document.createElement('script');
        overworldScript.src = 'overworld.js';
        
        overworldScript.onload = function() {
          console.log("Overworld script reloaded successfully");
          
          // Try initializing again after script reload
          setTimeout(() => {
            if (window.OverworldSystem && typeof window.OverworldSystem.initOverworld === 'function') {
              console.log("Initializing overworld with character:", playerTeam[0]);
              window.OverworldSystem.initOverworld(playerTeam[0]);
            } else {
              console.error("Still can't access overworld system after reload");
              alert("Unable to load overworld. Please refresh the page and try again.");
            }
          }, 500); // Short delay to ensure script is processed
        };
        
        document.head.appendChild(overworldScript);
        return; // Exit and let the onload handler continue
      }
      
      // Make sure the selected character has sprite information
      if (playerTeam[0] && window.SpriteManager) {
        // If no sprite is set, use the character image as sprite
        if (!playerTeam[0].sprite) {
          playerTeam[0].sprite = playerTeam[0].image;
          console.log("Setting sprite from character image:", playerTeam[0].sprite);
        }
      }
      
      // Initialize overworld with the first character in team
      console.log("Initializing overworld with character:", playerTeam[0]);
      window.OverworldSystem.initOverworld(playerTeam[0]);
      
    } catch (error) {
      console.error("Error entering overworld:", error);
      alert("Overworld system not available. Please try again.");
      
      // Show selection screen again if overworld fails to load
      const selectionScreen = document.getElementById('selection-screen');
      if (selectionScreen) selectionScreen.style.display = 'flex';
    }
  }
}

// Return to the overworld after a battle
function returnToOverworld(battleWon = true) {
  console.log("Returning to overworld...");
  
  try {
    // Only do this in story mode
    if (currentGameMode !== 'story') {
      console.log("Not in story mode, skipping return to overworld");
      return;
    }
    
    // Hide battle screen
    const battleScreen = document.getElementById('battle-screen');
    if (battleScreen) {
      battleScreen.style.display = 'none';
    }
    
    // Hide game over screen if it's visible
    const gameOverScreen = document.getElementById('game-over');
    if (gameOverScreen) {
      gameOverScreen.style.display = 'none';
    }
    
    // Show mobile controls for overworld navigation
    const mobileContainer = document.getElementById("mobile-controls-container");
    if (mobileContainer) {
      mobileContainer.style.display = "block";
      mobileContainer.style.visibility = "visible";
      mobileContainer.style.opacity = "1";
    }
    
    // Make sure overworld container exists
    let overworldContainer = document.getElementById('overworld-container');
    if (!overworldContainer) {
      console.log("Creating overworld container");
      overworldContainer = document.createElement('div');
      overworldContainer.id = 'overworld-container';
      document.body.appendChild(overworldContainer);
    }
    
    // Make sure the overworld.js script is loaded
    if (!window.OverworldSystem) {
      console.log("Loading overworld script...");
      
      // Load the overworld.js script if it's not already loaded
      if (!document.querySelector('script[src*="overworld.js"]')) {
        const overworldScript = document.createElement('script');
        overworldScript.src = 'overworld.js';
        document.head.appendChild(overworldScript);
        
        // Wait for script to load before continuing
        overworldScript.onload = function() {
          console.log("Overworld script loaded, continuing to overworld");
          continueReturnToOverworld();
        };
        
        overworldScript.onerror = function() {
          console.error("Failed to load overworld script");
          alert("Failed to return to overworld. Please try again.");
        };
        
        return; // Exit function and wait for script to load
      }
    }
    
    // Continue to overworld immediately if script is already loaded
    continueReturnToOverworld();
    
  } catch (error) {
    console.error("Error returning to overworld:", error);
  }
  
  // Helper function to continue to overworld after script is loaded
  function continueReturnToOverworld() {
    try {
      console.log("Continuing return to overworld...");
      
      // Hide battle screens
      const battleScreen = document.getElementById('battle-screen');
      if (battleScreen) battleScreen.style.display = 'none';
      
      const gameOver = document.getElementById('game-over');
      if (gameOver) gameOver.style.display = 'none';
      
      // Show overworld container
      let overworldContainer = document.getElementById('overworld-container');
      if (overworldContainer) {
        overworldContainer.style.display = 'flex';
      } else {
        console.error("Overworld container not found!");
        // Try to create it
        overworldContainer = document.createElement('div');
        overworldContainer.id = 'overworld-container';
        document.body.appendChild(overworldContainer);
      }
      
      // Make sure overworld system is available
      if (!window.OverworldSystem) {
        console.error("Overworld system not found!");
        throw new Error("Overworld system not available");
      }
      
      // Re-initialize overworld with updated state after battle
      if (typeof window.OverworldSystem.returnToOverworld === 'function') {
        console.log("Calling overworld system's returnToOverworld function");
        window.OverworldSystem.returnToOverworld(battleWon);
      } else {
        console.error("returnToOverworld function not found");
        
        // Fall back to re-initializing if return function isn't available
        if (typeof window.OverworldSystem.initOverworld === 'function') {
          console.log("Falling back to re-initializing overworld");
          
          // Try to reset any state in the overworld system first
          if (window.OverworldSystem.ZONE_TYPES) {
            console.log("Using default zone: STARTER_HOOD");
            
            // Make sure the selected character has sprite information
            if (playerTeam[0] && window.SpriteManager) {
              // If no sprite is set, use the character image as sprite
              if (!playerTeam[0].sprite) {
                playerTeam[0].sprite = playerTeam[0].image;
                console.log("Setting sprite from character image:", playerTeam[0].sprite);
              }
            }
            
            window.OverworldSystem.initOverworld(playerTeam[0]);
          } else {
            console.error("Overworld system seems incomplete");
            throw new Error("Could not initialize overworld");
          }
        } else {
          console.error("initOverworld function not found either");
          throw new Error("Complete overworld system failure");
        }
      }
      
      console.log("Successfully returned to overworld");
    } catch (error) {
      console.error("Error in continueReturnToOverworld:", error);
      
      // Show selection screen if returning to overworld fails completely
      const selectionScreen = document.getElementById('selection-screen');
      if (selectionScreen) {
        selectionScreen.style.display = 'flex';
      }
      
      // Alert user to error
      alert("Error returning to overworld. Try reloading the page.");
    }
  }
}

// Expose the game functions to the window object for external access
window.Game = {
  // Core battle functions
  startBattle,
  returnToOverworld,
  processActiveItemEffects,
  processStatusEffects,
  calculateDamage,
  
  // Game mode functions
  selectGameMode,
  startExploreMode,
  
  // Character management
  populateCharacterSelection,
  selectCharacter,
  updateTeamSlots,
  
  // UI management
  updateBattleUI,
  showMoves,
  showItems,
  openShop,
  closeShop,
  
  // Audio
  playBattleMusic,
  playHitSound,
  playSuccessSound,
  playSwitchSound,
  
  // Debugging helpers
  getPlayerTeam: function() { return playerTeam; },
  getOpponentTeam: function() { return opponentTeam; }
};

// Immediately expose essential functions directly on window for backward compatibility
window.selectGameMode = selectGameMode;
window.startExploreMode = startExploreMode;
window.openShop = openShop;
window.closeShop = closeShop;
window.startBattle = startBattle;
window.returnToOverworld = returnToOverworld;
window.handleSimpleSwitchYes = handleSimpleSwitchYes;
window.handleSimpleSwitchNo = handleSimpleSwitchNo;

// gameShops will be assigned to window after it's initialized

// Initialize other functions that might be needed immediately
console.log("Exposing essential functions to window object:", 
  "selectGameMode, startExploreMode, openShop, closeShop, startBattle, returnToOverworld");

document.addEventListener("DOMContentLoaded", function() {
  // Reset any potentially lingering window state from previous sessions
  console.log("DOMContentLoaded: Resetting game state");
  
  // Clear active opponent to prevent auto-battle starts
  if (window.activeOpponent) {
    console.log("Clearing previously set active opponent:", window.activeOpponent.name);
    window.activeOpponent = null;
  }
  
  // Initialize audio but wait for user interaction to play
  initAudio();
  
  // Set up mobile controls if needed
  initMobileControls();
  
  // Start with mode selection screen visible
  document.getElementById('mode-selection-screen').style.display = 'flex';
  
  // Hide other screens
  document.getElementById('selection-screen').style.display = 'none';
  document.getElementById('battle-screen').style.display = 'none';
  
  // Don't auto-initialize game, wait for mode selection first
  
  console.log("Game functions exposed to window object:", Object.keys(window.Game));
});

// Audio Functions
function initAudio() {
  // Only initialize once
  if (audioInitialized) return;
  
  try {
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
    
    audioInitialized = true;
    console.log("Audio initialized successfully");
  } catch (error) {
    console.error("Error initializing audio:", error);
  }
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

// Function to use the first available move when user clicks ATTACK/ITEMS
function useFirstMove() {
  const playerCharacter = playerTeam[currentPlayerCharacter];
  
  // Find the first usable move
  if (playerCharacter && playerCharacter.moves && playerCharacter.moves.length > 0) {
    // Get the first move
    const firstMove = playerCharacter.moves[0];
    
    // Use it if we're not in a locked state
    if (!turnInProgress && !waitingForSwitch) {
      useMove(firstMove);
    }
  }
}

// Global player inventory
let playerInventory;

// Global shops - Define before exposing to window
let gameShops = {
  cornerStore: {
    name: "Corner Store",
    items: [
      { id: "potion", name: "Health Potion", price: 10, description: "Restores 50 HP", effect: { type: "heal", value: 50 } },
      { id: "revive", name: "Revive Kit", price: 30, description: "Revives a fainted character", effect: { type: "revive", value: 30 } },
      { id: "energy_drink", name: "Energy Drink", price: 25, description: "Increases Speed", effect: { type: "statBoost", stat: "speed", value: 1.5, duration: 3 } }
    ]
  },
  trapShop: {
    name: "The Trap",
    items: [
      { id: "smoke_bomb", name: "Smoke Bomb", price: 15, description: "Lowers opponent accuracy", effect: { type: "debuff", stat: "accuracy", value: 0.7, duration: 3 } },
      { id: "brass_knuckles", name: "Brass Knuckles", price: 40, description: "Raises Attack", effect: { type: "statBoost", stat: "attack", value: 1.4, duration: 3 } },
      { id: "kevlar", name: "Kevlar Vest", price: 60, description: "Raises Defense", effect: { type: "statBoost", stat: "defense", value: 1.5, duration: 3 } }
    ]
  }
};

function initGame() {
  populateCharacterSelection();
  setupMoveTooltips();
  // Reset game state
  playerTeam = [];
  fadeCount = 0;
  battleCounter = 0;
  opponentIndex = 0;
  updateFadeDisplay();
  
  // Initialize player inventory
  playerInventory = window.InventorySystem.createPlayerInventory();
  
  // Initialize shops
  gameShops = {
    cornerStore: window.ShopSystem.createShopInventory(window.ShopSystem.SHOP_TYPES.CORNER_STORE),
    theTrap: window.ShopSystem.createShopInventory(window.ShopSystem.SHOP_TYPES.THE_TRAP),
    cloutDealer: window.ShopSystem.createShopInventory(window.ShopSystem.SHOP_TYPES.CLOUT_DEALER),
    popUpVan: window.ShopSystem.createShopInventory(window.ShopSystem.SHOP_TYPES.POP_UP_VAN)
  };
  
  // Now that gameShops is initialized, expose it to window
  window.gameShops = gameShops;
  
  // Initialize audio controls (but wait for user interaction to play music)
  initAudio();
  
  // These functions have already been exposed earlier, but we'll check to make sure
  if (!window.startBattle) window.startBattle = startBattle;
  if (!window.returnToOverworld) window.returnToOverworld = returnToOverworld;
  
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
  console.log("Populating character selection...");
  const characterList = document.getElementById("character-list");
  characterList.innerHTML = "";
  
  console.log("Available characters:", characters);
  
  // Filter out any NPC characters that might have been accidentally added
  // Only show characters with valid IDs (numerical IDs from the characters array)
  const playerCharacters = characters.filter(character => {
    // Ensure it's a valid player character with a numeric ID
    return character && typeof character.id === 'number';
  });
  
  console.log("Filtered player characters:", playerCharacters.length);
  
  playerCharacters.forEach(character => {
    console.log(`Processing character: ${character.name}`, character);
    console.log(`Character sprite path: ${character.sprite}`);
    
    const card = document.createElement("div");
    card.className = "character-card";
    card.dataset.id = character.id;
    
    // Fix sprite path if needed
    let spritePath = character.sprite;
    if (spritePath && spritePath.startsWith('./public/')) {
      spritePath = spritePath.replace('./public/', 'public/');
      console.log(`Fixed sprite path for ${character.name}: ${spritePath}`);
    }
    
    card.innerHTML = `
      <img src="${spritePath}" alt="${character.name}" onerror="console.error('Failed to load sprite: ${spritePath}')">
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
    
    console.log(`Added character card for ${character.name}`);
  });
}

// Helper function to standardize sprite paths
function standardizeSpritePath(spritePath) {
  // Provide a default sprite if none is given or invalid
  if (!spritePath || typeof spritePath !== 'string') {
    console.warn("Invalid sprite path provided:", spritePath);
    // Use a known working imgur URL as default
    return 'https://i.imgur.com/YeMI4sr.png'; // Fitness Bro
  }
  
  // Trim any whitespace
  spritePath = spritePath.trim();
  
  // If it's an imgur URL, return it as is (preferred format)
  if (spritePath.includes('imgur.com')) {
    console.log("Using existing imgur URL sprite:", spritePath);
    return spritePath;
  }
  
  // For other URLs, leave as is
  if (spritePath.startsWith('http')) {
    console.log("Using non-imgur URL sprite:", spritePath);
    // We could convert known URLs to imgur here if needed
    return spritePath;
  }
  
  console.log("Converting local sprite path to imgur URL:", spritePath);
  
  // Map character names to imgur URLs for consistency across game modes
  const nameToImgurMap = {
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
    'Earthy': 'https://i.imgur.com/1SuHgnZ.png'
  };
  
  // Check for character name in local data
  if (window.currentCharacter && window.currentCharacter.name && nameToImgurMap[window.currentCharacter.name]) {
    console.log("Found matching character in currentCharacter:", window.currentCharacter.name);
    return nameToImgurMap[window.currentCharacter.name];
  }
  
  // Map path-based identifiers to known imgur URLs
  if (spritePath.includes('fitness') || spritePath.includes('gym')) {
    return 'https://i.imgur.com/YeMI4sr.png'; // Fitness Bro
  } else if (spritePath.includes('rasta') || spritePath.includes('plant')) {
    return 'https://i.imgur.com/dZWWrrs.png'; // Rasta
  } else if (spritePath.includes('tech') || spritePath.includes('electric')) {
    return 'https://i.imgur.com/VVa9pm9.png'; // Techy
  } else if (spritePath.includes('vibe') || spritePath.includes('cool')) {
    return 'https://i.imgur.com/2n71aSJ.png'; // Vibe
  } else if (spritePath.includes('9-5') || spritePath.includes('office')) {
    return 'https://i.imgur.com/UkE9crR.png'; // 9-5
  } else if (spritePath.includes('jokes') || spritePath.includes('all jokes')) {
    return 'https://i.imgur.com/9hFTFQt.png'; // All jokes
  } else if (spritePath.includes('nerd') || spritePath.includes('closet')) {
    return 'https://i.imgur.com/knA2Yxz.png'; // Closet nerd
  } else if (spritePath.includes('functional') || spritePath.includes('addict')) {
    return 'https://i.imgur.com/G3xfSjU.png'; // Functional addict
  } else if (spritePath.includes('homeless')) {
    return 'https://i.imgur.com/LRVrieF.png'; // Homeless YN
  } else if (spritePath.includes('gamer')) {
    return 'https://i.imgur.com/vFvQKap.png'; // Gamer YN
  } else if (spritePath.includes('serial')) {
    return 'https://i.imgur.com/Kwe1HpA.png'; // Serial YN
  } else if (spritePath.includes('rich') || spritePath.includes('techbro')) {
    return 'https://i.imgur.com/GmlKf6u.png'; // Rich techbro
  } else if (spritePath.includes('unemployed')) {
    return 'https://i.imgur.com/b5pnt7o.png'; // Gamer unemployed
  } else if (spritePath.includes('earthy')) {
    return 'https://i.imgur.com/1SuHgnZ.png'; // Earthy
  } else if (spritePath.includes('dysfunctional')) {
    return 'https://i.imgur.com/yA0lUbo.png'; // Dysfunctional
  }
  
  // Special case for player movement sprites
  if (spritePath.includes('back') || spritePath.includes('fwd') || 
      spritePath.includes('right') || spritePath.includes('left')) {
    // Keep these as local paths for the overworld character
    
    // Fix paths starting with ./public/ to use public/ instead
    if (spritePath.startsWith('./public/')) {
      return spritePath.replace('./public/', 'public/');
    }
    
    // Ensure it starts with public/ if needed
    if (!spritePath.startsWith('public/')) {
      return 'public/' + spritePath;
    }
    
    return spritePath;
  }
  
  // Default to fitness bro for any local paths we can't map
  console.log("Using fallback imgur URL for sprite:", spritePath);
  return 'https://i.imgur.com/YeMI4sr.png';
}

// Expose the standardizeSpritePath function globally for other modules to use
window.standardizeSpritePath = standardizeSpritePath;

// Add debugging capabilities for sprite problems
window.debugSpritePaths = function(playerTeam, opponentTeam) {
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
  
  console.groupEnd();
};

function selectCharacter(character) {
  // Create a deep copy and fix sprite paths
  const characterCopy = JSON.parse(JSON.stringify(character));
  characterCopy.sprite = standardizeSpritePath(characterCopy.sprite);
  
  // Check if character is already selected
  if (playerTeam.some(c => c.id === characterCopy.id)) {
    // Remove from team if already selected
    playerTeam = playerTeam.filter(c => c.id !== characterCopy.id);
    document.querySelector(`.character-card[data-id="${characterCopy.id}"]`).classList.remove("selected");
    
    // Play sound effect
    playSuccessSound();
  } else {
    // Check if team is already full
    if (playerTeam.length >= 3) {
      showFloatingLog("You can only pick 3 YNs! Deselect one first.");
      return;
    }
    
    // Add to team
    playerTeam.push(characterCopy);
    document.querySelector(`.character-card[data-id="${characterCopy.id}"]`).classList.add("selected");
    
    // Play sound effect
    playSuccessSound();
  }
  
  updateTeamSlots();
  
  // Enable/disable start button
  document.getElementById("start-battle").disabled = playerTeam.length !== 3;
}

function updateTeamSlots() {
  console.log("Updating team slots with playerTeam:", playerTeam);
  const slots = document.querySelectorAll(".team-slot");
  
  // Clear all slots
  slots.forEach(slot => {
    slot.innerHTML = "";
  });
  
  // Fill slots with selected characters
  playerTeam.forEach((character, index) => {
    if (index < slots.length) {
      console.log(`Setting slot ${index} with ${character.name}, sprite: ${character.sprite}`);
      
      // Use standardize path helper
      const spritePath = standardizeSpritePath(character.sprite);
      console.log(`Using sprite path for team slot ${index}: ${spritePath}`);
      
      slots[index].innerHTML = `
        <img 
          src="${spritePath}" 
          alt="${character.name}" 
          onerror="console.error('Failed to load team sprite: ${spritePath}')"
          onload="console.log('Team slot ${index} sprite loaded successfully: ${spritePath}')"
        >`;
    }
  });
}

// Make startBattle globally accessible for overworld battles
function startBattle() {
  // Sync playerTeam with window.playerTeam if it exists (for overworld battles)
  if (window.playerTeam && Array.isArray(window.playerTeam) && window.playerTeam.length > 0) {
    console.log("Found window.playerTeam, syncing with local playerTeam:", window.playerTeam);
    playerTeam = window.playerTeam;
    
    // Ensure all player sprites are standardized
    playerTeam.forEach(character => {
      if (character.sprite) {
        character.sprite = standardizeSpritePath(character.sprite);
        console.log(`Standardized player sprite: ${character.name} → ${character.sprite}`);
      }
    });
  } else if (playerTeam && playerTeam.length > 0) {
    // Or sync window.playerTeam with local playerTeam
    console.log("Setting window.playerTeam from local playerTeam:", playerTeam);
    window.playerTeam = playerTeam;
  }
  
  console.log("Battle starting with player team:", playerTeam);
  
  // Check if we have an active opponent from the overworld
  if (window.activeOpponent) {
    // Use the overworld opponent
    console.log("Using opponent from overworld:", window.activeOpponent);
    // Update our active opponent in the opponent list
    opponents[0] = window.activeOpponent;
    
    // Ensure the opponent sprite is standardized
    if (opponents[0].sprite) {
      opponents[0].sprite = standardizeSpritePath(opponents[0].sprite);
      console.log(`Standardized opponent sprite: ${opponents[0].name} → ${opponents[0].sprite}`);
    }
  } else {
    console.warn("No active opponent set, using a default opponent");
    // Create a default opponent if none is set
    window.activeOpponent = opponents[0];
  }
  
  // Check for valid player team
  if (!playerTeam || playerTeam.length === 0) {
    console.error("Player team not initialized at all, cannot start battle");
    showFloatingLog("No characters available for battle");
    
    // Return to appropriate screen
    if (currentGameMode === 'story') {
      if (document.getElementById('overworld-container')) {
        document.getElementById('overworld-container').style.display = 'block';
      } else {
        document.getElementById('selection-screen').style.display = 'flex';
      }
    } else {
      document.getElementById('selection-screen').style.display = 'flex';
    }
    
    document.getElementById('battle-screen').style.display = 'none';
    return;
  }
  
  // If we're in fade mode (direct battle), enforce exactly 3 characters
  // In story mode, we'll allow battles with fewer characters for better gameplay flow
  if (currentGameMode !== 'story' && playerTeam.length !== 3) {
    console.error("Player team not properly initialized, needs exactly 3 characters in Fade Mode");
    showFloatingLog("Please select 3 characters before starting battle");
    
    // Default to selection screen in Fade mode
    document.getElementById('selection-screen').style.display = 'flex';
    document.getElementById('battle-screen').style.display = 'none';
    return;
  }
  
  // For story mode, make sure we have at least one character
  if (currentGameMode === 'story' && playerTeam.length < 1) {
    console.error("Need at least one character for battle in Story Mode");
    showFloatingLog("You need at least one character for battle!");
    
    if (document.getElementById('overworld-container')) {
      document.getElementById('overworld-container').style.display = 'block';
    } else {
      document.getElementById('selection-screen').style.display = 'flex';
    }
    
    document.getElementById('battle-screen').style.display = 'none';
    return;
  }
  
  // Setup battle screen
  document.getElementById("selection-screen").style.display = "none";
  document.getElementById("battle-screen").style.display = "flex";
  
  // Hide overworld if it exists
  const overworldContainer = document.getElementById("overworld-container");
  if (overworldContainer) {
    overworldContainer.style.display = "none";
  }
  
  // Hide mobile controls during battle
  const mobileContainer = document.getElementById("mobile-controls-container");
  if (mobileContainer) {
    mobileContainer.style.display = "none";
    mobileContainer.style.visibility = "hidden";
  }
  
  // Start battle music
  playBattleMusic();
  
  // Play success sound
  playSuccessSound();
  
  // Choose a random background
  const randomBg = battleBackgrounds[Math.floor(Math.random() * battleBackgrounds.length)];
  document.getElementById("battle-arena").style.backgroundImage = `url(${randomBg})`;
  
  // Initialize battle
  gameActive = true;
  
  // Set active characters and ensure maxHp is set
  playerTeam.forEach(character => {
    // Set maxHp for each character if not already set
    character.maxHp = character.maxHp || character.hp;
    // Standardize sprite paths for all characters
    character.sprite = standardizeSpritePath(character.sprite);
  });
  
  // Debug sprite paths before creating the active player character
  window.debugSpritePaths(playerTeam, window.activeOpponentTeam || opponents);
  
  // Deep clone to avoid reference issues
  activePlayerCharacter = JSON.parse(JSON.stringify(playerTeam[0]));
  
  // For opponent, check if it's an NPC battle or regular battle
  if (window.activeOpponent && window.activeOpponent.name) {
    // Check if we have an opponent team from an NPC battle
    if (window.activeOpponentTeam && window.activeOpponentTeam.length > 0) {
      console.log("Using NPC opponent team:", window.activeOpponentTeam);
      // Use the NPC team instead of a single opponent
      opponents = JSON.parse(JSON.stringify(window.activeOpponentTeam));
      // Set the first team member as the active opponent
      activeOpponent = JSON.parse(JSON.stringify(opponents[0]));
    } else {
      // Single NPC battle - deep clone to avoid reference issues
      activeOpponent = JSON.parse(JSON.stringify(window.activeOpponent));
      
      // If we have a single opponent, create an opponents array with just that opponent
      // This ensures consistency when handling single opponents
      opponents = [activeOpponent];
      
      console.log("Using single NPC opponent:", activeOpponent.name);
    }
  } else {
    // Make sure opponents is initialized as an array if it's not already
    if (!Array.isArray(opponents) || opponents.length === 0) {
      // Create a default opponent if none exists
      opponents = [
        {
          id: "default1",
          name: "Random Challenger",
          hp: 100,
          maxHp: 100,
          attack: 20,
          defense: 20,
          speed: 20,
          type: "trap",
          sprite: "public/sprites/default_npc.png",
          moves: [
            { name: "Weak Attack", power: 20, type: "normal", description: "A basic attack" },
            { name: "Defend", power: 0, type: "status", statusEffect: { type: "defense-up", duration: 3 } }
          ]
        }
      ];
      console.warn("No opponents defined, using default opponent");
    }
    
    // Use opponents array and make sure opponentIndex is valid
    opponentIndex = Math.min(opponentIndex, opponents.length - 1);
    activeOpponent = JSON.parse(JSON.stringify(opponents[opponentIndex]));
  }
  
  // Set maxHp for opponent
  activeOpponent.maxHp = activeOpponent.maxHp || activeOpponent.hp;
  
  // Standardize opponent sprite path
  activeOpponent.sprite = standardizeSpritePath(activeOpponent.sprite);
  
  // Initialize moves with proper PP values
  initializeMoves(playerTeam);
  initializeMoves([activeOpponent]);
  
  // Reset stat modifiers and status effects
  resetBattleModifiers();
  
  // Function to ensure all moves have proper PP and maxPp values
  function initializeMoves(characters) {
    characters.forEach(character => {
      if (character.moves) {
        character.moves.forEach(move => {
          // Set maxPp if not already set
          if (move.maxPp === undefined && move.pp !== undefined) {
            move.maxPp = move.pp;
          }
          // Set pp to maxPp if not already set
          if (move.pp === undefined && move.maxPp !== undefined) {
            move.pp = move.maxPp;
          }
          // Set default values if neither is set
          if (move.pp === undefined && move.maxPp === undefined) {
            move.pp = move.power > 0 ? 15 : 10; // Attack moves get 15 PP, status moves get 10 PP
            move.maxPp = move.pp;
          }
        });
      }
    });
  }
  
  // Update UI - make sure everything is initialized properly first
  updateBattleUI();
  updateStatusIcons();
  
  // Update move and item buttons FIRST - always ensure these are populated before showing
  updateMoveButtons();
  updateItemButtons();
  
  // Make sure all elements are visible and properly displayed
  const movesElement = document.getElementById("moves");
  const itemsElement = document.getElementById("items");
  const battleLogElement = document.getElementById("battle-log");
  
  // Safely update display properties with null checks
  if (movesElement) movesElement.style.display = "grid";
  if (itemsElement) itemsElement.style.display = "grid";
  if (battleLogElement) battleLogElement.style.display = "block";
  
  // Determine first turn
  currentTurn = determineFirstTurn();
  
  // Add to battle log
  addToBattleLog(`Battle started! ${activePlayerCharacter.name} vs ${activeOpponent.name}!`);
  
  // For story mode (overworld) battles, don't auto-process the turn, wait for player input
  if (window.currentGameMode === 'story') {
    console.log("Story mode battle started, waiting for player input");
    // Don't auto-process the turn, let player choose first
    updateBattleUI(); // Just update UI once more
  } else {
    // Only in Fade mode do we auto-process the first turn
    console.log("Fade mode battle started, processing first turn automatically");
    setTimeout(() => {
      processTurn();
    }, 1000);
  }
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
  // Always start with player on first turn of the battle
  if (battleCounter === 0 && opponentIndex === 0) {
    return "player";
  }
  
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
  console.log("Starting updateBattleUI...");
  
  // Debug active character data
  console.log("Active player character:", activePlayerCharacter);
  console.log("Active opponent:", activeOpponent);
  
  // Verify all required elements exist and create if needed
  const battleBackground = document.getElementById("battle-background");
  console.log("Battle background:", battleBackground);
  
  // Make sure we have a battle background to work with
  if (!battleBackground) {
    console.log("Battle background not found, creating battle-screen structure");
    
    // Create the entire battle screen structure
    const battleScreen = document.getElementById("battle-screen") || document.createElement("div");
    if (!battleScreen.id) {
      battleScreen.id = "battle-screen";
      document.body.appendChild(battleScreen);
    }
    
    // Create battle background
    const newBattleBackground = document.createElement("div");
    newBattleBackground.id = "battle-background";
    
    // Add player and opponent info areas
    newBattleBackground.innerHTML = `
      <div id="player-info">
        <span id="player-name">${activePlayerCharacter.name}</span>
        <div class="hp-bar">
          <div id="player-hp-fill" class="hp-fill" style="width: 100%;"></div>
        </div>
        <span id="player-hp">${activePlayerCharacter.hp}/${activePlayerCharacter.maxHp}</span>
        <span id="player-status-icon" class="status-icon"></span>
      </div>
      <div id="opponent-info">
        <span id="opponent-name">${activeOpponent.name}</span>
        <div class="hp-bar">
          <div id="opponent-hp-fill" class="hp-fill" style="width: 100%;"></div>
        </div>
        <span id="opponent-hp">${activeOpponent.hp}/${activeOpponent.maxHp}</span>
        <span id="opponent-status-icon" class="status-icon"></span>
      </div>
    `;
    
    battleScreen.appendChild(newBattleBackground);
  }
  
  // Get or create player sprite container
  let playerSpriteContainer = document.getElementById("player-sprite-container");
  if (!playerSpriteContainer) {
    console.log("Creating player sprite container");
    playerSpriteContainer = document.createElement("div");
    playerSpriteContainer.id = "player-sprite-container";
    playerSpriteContainer.className = "player-sprite-container";
    playerSpriteContainer.style.display = "flex";
    playerSpriteContainer.style.visibility = "visible";
    playerSpriteContainer.style.opacity = "1";
    playerSpriteContainer.style.width = "300px";
    playerSpriteContainer.style.height = "300px";
    playerSpriteContainer.style.position = "absolute";
    playerSpriteContainer.style.left = "10%";
    playerSpriteContainer.style.bottom = "30%";
    playerSpriteContainer.style.justifyContent = "center";
    playerSpriteContainer.style.alignItems = "center";
    playerSpriteContainer.style.zIndex = "10";
    
    // Add to battle background if it exists, otherwise to battle screen
    const container = document.getElementById("battle-background") || document.getElementById("battle-screen");
    container.appendChild(playerSpriteContainer);
  }
  
  // Get or create player sprite
  let playerSprite = document.getElementById("player-sprite");
  if (!playerSprite) {
    console.log("Creating player sprite element");
    playerSprite = document.createElement("img");
    playerSprite.id = "player-sprite";
    playerSprite.alt = "Player";
    playerSprite.style.display = "block";
    playerSprite.style.visibility = "visible";
    playerSprite.style.opacity = "1";
    playerSprite.style.width = "220px";
    playerSprite.style.height = "220px";
    playerSprite.style.position = "relative";
    playerSprite.style.zIndex = "15";
    playerSpriteContainer.appendChild(playerSprite);
  }
  
  // Get or create opponent sprite container
  let opponentSpriteContainer = document.getElementById("opponent-sprite-container");
  if (!opponentSpriteContainer) {
    console.log("Creating opponent sprite container");
    opponentSpriteContainer = document.createElement("div");
    opponentSpriteContainer.id = "opponent-sprite-container";
    opponentSpriteContainer.className = "opponent-sprite-container";
    opponentSpriteContainer.style.display = "flex";
    opponentSpriteContainer.style.visibility = "visible";
    opponentSpriteContainer.style.opacity = "1";
    opponentSpriteContainer.style.width = "200px";
    opponentSpriteContainer.style.height = "200px";
    opponentSpriteContainer.style.position = "absolute";
    opponentSpriteContainer.style.right = "10%";
    opponentSpriteContainer.style.top = "20%";
    opponentSpriteContainer.style.justifyContent = "center";
    opponentSpriteContainer.style.alignItems = "center";
    opponentSpriteContainer.style.zIndex = "10";
    
    // Add to battle background if it exists, otherwise to battle screen
    const container = document.getElementById("battle-background") || document.getElementById("battle-screen");
    container.appendChild(opponentSpriteContainer);
  }
  
  // Get or create opponent sprite
  let opponentSprite = document.getElementById("opponent-sprite");
  if (!opponentSprite) {
    console.log("Creating opponent sprite element");
    opponentSprite = document.createElement("img");
    opponentSprite.id = "opponent-sprite";
    opponentSprite.alt = "Opponent";
    opponentSprite.style.display = "block";
    opponentSprite.style.visibility = "visible";
    opponentSprite.style.opacity = "1";
    opponentSprite.style.width = "140px";
    opponentSprite.style.height = "140px";
    opponentSprite.style.position = "relative";
    opponentSprite.style.zIndex = "15";
    opponentSpriteContainer.appendChild(opponentSprite);
  }
  
  // Update player character display and add debug logging
  const playerNameElement = document.getElementById("player-name");
  console.log("Player name element before setting:", playerNameElement.innerHTML);
  playerNameElement.textContent = activePlayerCharacter.name;
  console.log("Player name element after setting:", playerNameElement.innerHTML);
  
  // Make sure maxHp is set for both active characters
  activePlayerCharacter.maxHp = activePlayerCharacter.maxHp || activePlayerCharacter.hp;
  activeOpponent.maxHp = activeOpponent.maxHp || activeOpponent.hp;
  
  // Update HP display using maxHp
  document.getElementById("player-hp").textContent = `${activePlayerCharacter.hp}/${activePlayerCharacter.maxHp}`;
  
  // Debug sprite paths
  console.log("Player sprite path:", activePlayerCharacter.sprite);
  console.log("Opponent sprite path:", activeOpponent.sprite);
  
  // Get player sprite element from the container we created earlier
  const playerSpriteElem = document.getElementById("player-sprite");
  console.log("Player sprite element check:", playerSpriteElem);
  console.log("Player sprite current src:", playerSpriteElem.src);
  console.log("Player sprite current display:", playerSpriteElem.style.display);
  console.log("Player sprite current visibility:", playerSpriteElem.style.visibility);
  console.log("Player sprite current opacity:", playerSpriteElem.style.opacity);
  
  try {
    // Use our standardize helper for player sprite path
    const playerSpritePath = standardizeSpritePath(activePlayerCharacter.sprite);
    
    console.log("Updated player sprite path:", playerSpritePath);
    console.log("Setting player sprite src to:", playerSpritePath);
    
    // Get the container for additional styling
    const playerSpriteContainer = document.getElementById("player-sprite-container");
    if (playerSpriteContainer) {
      playerSpriteContainer.style.display = "flex";
      playerSpriteContainer.style.visibility = "visible";
      playerSpriteContainer.style.opacity = "1";
      playerSpriteContainer.style.width = "100%";
      playerSpriteContainer.style.height = "220px";
      playerSpriteContainer.style.justifyContent = "center";
      playerSpriteContainer.style.alignItems = "center";
      playerSpriteContainer.style.position = "relative";
      playerSpriteContainer.style.zIndex = "10";
      console.log("Applied container styles");
    }
    
    // Force visibility settings on sprite
    playerSpriteElem.style.display = "block";
    playerSpriteElem.style.visibility = "visible";
    playerSpriteElem.style.opacity = "1";
    playerSpriteElem.style.width = "220px";
    playerSpriteElem.style.height = "220px";
    playerSpriteElem.style.zIndex = "15";
    playerSpriteElem.style.position = "relative";
    
    // Set the source last
    playerSpriteElem.src = playerSpritePath;
    
    console.log("After update - display:", playerSpriteElem.style.display);
    console.log("After update - visibility:", playerSpriteElem.style.visibility);
    console.log("After update - opacity:", playerSpriteElem.style.opacity);
    
    playerSpriteElem.onload = function() {
      console.log("Player sprite loaded successfully:", playerSpritePath);
      
      // Double-check settings after load
      console.log("After load - display:", playerSpriteElem.style.display);
      console.log("After load - visibility:", playerSpriteElem.style.visibility);
      console.log("After load - opacity:", playerSpriteElem.style.opacity);
    };
    
    playerSpriteElem.onerror = function() {
      console.error("Failed to load player sprite:", playerSpritePath);
      // Retry with default sprite
      console.log("Trying fallback sprite...");
      playerSpriteElem.src = "https://i.imgur.com/YeMI4sr.png"; // Fitness Bro as fallback
    };
  } catch (error) {
    console.error("Error setting player sprite:", error);
  }
  
  // Update opponent display
  document.getElementById("opponent-name").textContent = activeOpponent.name;
  document.getElementById("opponent-hp").textContent = `${activeOpponent.hp}/${activeOpponent.maxHp}`;
  
  // Handle opponent sprite with error handling
  const opponentSpriteElem = document.getElementById("opponent-sprite");
  console.log("Opponent sprite element:", opponentSpriteElem);
  console.log("Opponent sprite current src:", opponentSpriteElem.src);
  console.log("Opponent sprite current display:", opponentSpriteElem.style.display);
  console.log("Opponent sprite current visibility:", opponentSpriteElem.style.visibility);
  console.log("Opponent sprite current opacity:", opponentSpriteElem.style.opacity);
  
  try {
    // Use our standardize helper for opponent sprite path
    const opponentSpritePath = standardizeSpritePath(activeOpponent.sprite);
    
    console.log("Updated opponent sprite path:", opponentSpritePath);
    console.log("Setting opponent sprite src to:", opponentSpritePath);
    
    // Force visibility settings
    opponentSpriteElem.style.display = "block";
    opponentSpriteElem.style.visibility = "visible";
    opponentSpriteElem.style.opacity = "1";
    opponentSpriteElem.style.width = "140px";
    opponentSpriteElem.style.height = "140px";
    
    // Set the source last
    opponentSpriteElem.src = opponentSpritePath;
    
    console.log("After update - display:", opponentSpriteElem.style.display);
    console.log("After update - visibility:", opponentSpriteElem.style.visibility);
    console.log("After update - opacity:", opponentSpriteElem.style.opacity);
    
    opponentSpriteElem.onload = function() {
      console.log("Opponent sprite loaded successfully:", opponentSpritePath);
      
      // Double-check settings after load
      console.log("After load - display:", opponentSpriteElem.style.display);
      console.log("After load - visibility:", opponentSpriteElem.style.visibility);
      console.log("After load - opacity:", opponentSpriteElem.style.opacity);
    };
    
    opponentSpriteElem.onerror = function() {
      console.error("Failed to load opponent sprite:", opponentSpritePath);
      // Retry with default sprite
      console.log("Trying fallback sprite...");
      opponentSpriteElem.src = "https://i.imgur.com/UkE9crR.png"; // 9-5 Homie as fallback
    };
  } catch (error) {
    console.error("Error setting opponent sprite:", error);
  }
  
  // Update HP bars using maxHp directly
  document.getElementById("player-hp-fill").style.width = `${(activePlayerCharacter.hp / activePlayerCharacter.maxHp) * 100}%`;
  document.getElementById("opponent-hp-fill").style.width = `${(activeOpponent.hp / activeOpponent.maxHp) * 100}%`;
  
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
  // Update each move button with the correct move data
  const movesContainer = document.getElementById("moves");
  if (!movesContainer || !activePlayerCharacter || !activePlayerCharacter.moves) return;
  
  // Get all move buttons
  const moveButtons = movesContainer.querySelectorAll(".move-button");
  
  // Update each button with the corresponding move
  moveButtons.forEach((button, index) => {
    if (index < activePlayerCharacter.moves.length) {
      const move = activePlayerCharacter.moves[index];
      
      // Set default PP and maxPp values if they don't exist
      if (move.pp === undefined || move.pp === null) {
        move.pp = move.maxPp || 15; // Default to 15 if maxPp is also not set
      }
      if (move.maxPp === undefined || move.maxPp === null) {
        move.maxPp = move.pp; // Use pp value as maxPp if not set
      }
      
      // Clear any existing content
      button.innerHTML = '';
      
      // Create the move name element
      const moveNameElement = document.createElement('span');
      moveNameElement.textContent = move.name;
      button.appendChild(moveNameElement);
      
      // Always add PP count (even for status moves)
      const ppCount = document.createElement('span');
      ppCount.className = 'pp-count';
      ppCount.textContent = `${move.pp}/${move.maxPp}`;
      button.appendChild(ppCount);
      
      // Add data for tooltips
      button.dataset.move = JSON.stringify(move);
      
      // Style based on move type
      button.className = "move-button";
      
      // If move has no PP left, disable the button
      if (move.pp !== undefined && move.pp <= 0) {
        button.disabled = true;
        button.style.opacity = "0.5";
        button.style.cursor = "not-allowed";
      } else {
        button.disabled = false;
        button.style.opacity = "1";
        button.style.cursor = "pointer";
      }
      
      // Set click handler
      button.onclick = () => useMove(move);
      
      // Show button
      button.style.display = "block";
      
      // Add tooltip event listeners
      button.addEventListener("mouseenter", showMoveTooltip);
      button.addEventListener("mouseleave", hideMoveTooltip);
    } else {
      // Hide buttons for moves we don't have
      button.style.display = "none";
    }
  });
  
  // Refresh navigation for mobile controls
  setTimeout(() => {
    if (typeof initNav === 'function') {
      console.log("Refreshing navigation after move buttons update");
      initNav();
    }
  }, 50);
}

function updateItemButtons() {
  // In our new UI, item buttons are fixed and styled directly in the HTML
  const itemButtons = document.querySelectorAll("#items button");
  if (!itemButtons || itemButtons.length === 0) return;
  
  // Update button states based on available items
  itemButtons.forEach(button => {
    const onclickAttr = button.getAttribute("onclick");
    if (!onclickAttr) return;
    
    const match = onclickAttr.match(/'([^']+)'/);
    if (!match || !match[1]) return;
    
    const itemType = match[1];
    if (!itemUseCounts[itemType] && itemUseCounts[itemType] !== 0) return;
    
    // Disable if item is used up and style it differently
    button.disabled = itemUseCounts[itemType] <= 0;
    if (itemUseCounts[itemType] <= 0) {
      button.style.opacity = "0.5";
      button.style.cursor = "not-allowed";
    } else {
      button.style.opacity = "1";
      button.style.cursor = "pointer";
    }
  });
  
  // Refresh navigation for mobile controls
  setTimeout(() => {
    if (typeof initNav === 'function') {
      console.log("Refreshing navigation after item buttons update");
      initNav();
    }
  }, 50);
}

function updateFadeDisplay() {
  const fadeDisplay = document.getElementById("fade-display");
  if (!fadeDisplay) return;
  
  fadeDisplay.textContent = `Fades: ${fadeCount}`;
  
  // If we're in the middle of completing a fade, show progress
  if (battleCounter > 0) {
    const remaining = 3 - battleCounter;
    fadeDisplay.textContent += ` (${remaining} more battle${remaining !== 1 ? 's' : ''} to complete fade)`;
  }
}

// Functions to set up battle menu
function showMoves() {
  if (!canAct || currentTurn !== "player") return;
  
  // In our new simplified UI, we don't toggle between views
  // Everything is always visible, so just make sure all containers are shown
  document.getElementById("moves").style.display = "grid";
  document.getElementById("items").style.display = "grid";
  
  // Update buttons and actions
  updateMoveButtons();
  updateItemButtons();
  
  // Refresh navigation for mobile controls
  setTimeout(() => {
    if (typeof initNav === 'function') {
      initNav();
    }
  }, 50);
}

function showItems() {
  // In our new UI, we don't have separate views - both sections are always shown
  showMoves();
}

function setupMoveTooltips() {
  const moveTooltip = document.getElementById("move-tooltip");
  if (!moveTooltip) {
    const tooltip = document.createElement("div");
    tooltip.id = "move-tooltip";
    tooltip.style.display = "none";
    document.body.appendChild(tooltip);
  }
  
  // Add mouse event listeners to each move button
  const moveButtons = document.querySelectorAll('.move-button');
  if (moveButtons.length > 0) {
    moveButtons.forEach(button => {
      button.addEventListener("mouseenter", showMoveTooltip);
      button.addEventListener("mouseleave", hideMoveTooltip);
    });
  }
}

function showMoveTooltip(e) {
  if (!e || !e.target || !e.target.dataset || !e.target.dataset.move) return;
  
  try {
    const moveData = JSON.parse(e.target.dataset.move);
    if (!moveData) return;
    
    // Use floating tooltip on hover
    const tooltip = document.getElementById("move-tooltip");
    const rect = e.target.getBoundingClientRect();
    
    // Get the battle menu to calculate available space
    const battleMenu = document.getElementById('battle-menu');
    const battleMenuRect = battleMenu.getBoundingClientRect();
    
    // Calculate available space to the right and left
    const availableRightSpace = window.innerWidth - rect.right - 20;
    
    // Position tooltip to the right of the button with offset for visibility
    tooltip.style.display = "block"; // Make visible first so we can calculate width
    
    // Place tooltip on the right with enough margin if there's space
    if (availableRightSpace >= 250) { // Using 250px as a guideline for tooltip width
      tooltip.style.left = `${rect.right + 20}px`; // 20px offset from right edge of button
      tooltip.style.top = `${rect.top - 10}px`; // Align near top of button with slight offset
    } else {
      // Not enough space right, position left if possible, or position fixed on the screen
      tooltip.style.left = `${Math.max(20, rect.left - 270)}px`; // Account for tooltip width
      tooltip.style.top = `${rect.top - 10}px`;
    }
    
    tooltip.innerHTML = `
      <p><strong>${moveData.name || 'Unknown Move'}</strong></p>
      <p>Type: ${moveData.type || 'Normal'}</p>
      <p>Power: ${moveData.power || 0}</p>
      <p>Accuracy: ${moveData.accuracy || 100}%</p>
      <p>PP: ${moveData.pp || 0}/${moveData.maxPp || 0}</p>
      <p>${moveData.description || ""}</p>
    `;
    
    // Also update the move-info-box for continued compatibility
    const moveInfoBox = document.getElementById("move-info-box");
    if (moveInfoBox) {
      moveInfoBox.innerHTML = `
        <h3>Move Info:</h3>
        <p><strong>${moveData.name || 'Unknown Move'}</strong></p>
        <p>Type: ${moveData.type || 'Normal'}</p>
        <p>Power: ${moveData.power || 0}</p>
        <p>Accuracy: ${moveData.accuracy || 100}%</p>
        <p>PP: ${moveData.pp || 0}/${moveData.maxPp || 0}</p>
        <p>${moveData.description || ""}</p>
      `;
    }
  } catch (err) {
    console.error("Error showing move tooltip:", err);
  }
}

function hideMoveTooltip() {
  // Hide the tooltip
  const tooltip = document.getElementById("move-tooltip");
  if (tooltip) tooltip.style.display = "none";
  
  // Keep the move info box hidden and battle log visible
  const moveInfoBox = document.getElementById("move-info-box");
  if (moveInfoBox) moveInfoBox.style.display = "none";
  
  const battleLog = document.getElementById("battle-log-label");
  if (battleLog) battleLog.style.display = "block";
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
    
    // Calculate available space
    const rect = e.currentTarget.getBoundingClientRect();
    const availableRightSpace = window.innerWidth - rect.right - 20;
    
    tooltip.style.display = "block";
    
    // Position the tooltip to the right of the character with enough margin if there's space
    if (availableRightSpace >= 270) {
      tooltip.style.left = `${rect.right + 20}px`;
      tooltip.style.top = `${rect.top}px`;
    } else {
      // Not enough space right, try the left side
      tooltip.style.left = `${Math.max(20, rect.left - 270)}px`;
      tooltip.style.top = `${rect.top}px`;
    }
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
            
            // Apply "buff expiring" animation if animation function exists
            if (typeof applyBuffAnimation === 'function') {
              applyBuffAnimation("dark", "player");
            }
          } else if (effect.effect === "defUp") {
            playerStatModifiers.defense /= effect.value;
            addToBattleLog(`${activePlayerCharacter.name}'s Defense buff wore off.`);
            
            // Apply "buff expiring" animation if animation function exists
            if (typeof applyBuffAnimation === 'function') {
              applyBuffAnimation("water", "player");
            }
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
            
            // Apply "buff expiring" animation if animation function exists
            if (typeof applyBuffAnimation === 'function') {
              applyBuffAnimation("dark", "opponent");
            }
          } else if (effect.effect === "defUp") {
            opponentStatModifiers.defense /= effect.value;
            addToBattleLog(`${activeOpponent.name}'s Defense buff wore off.`);
            
            // Apply "buff expiring" animation if animation function exists
            if (typeof applyBuffAnimation === 'function') {
              applyBuffAnimation("water", "opponent");
            }
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
    }, 1000);
  } else {
    const sprite = document.getElementById("opponent-sprite");
    sprite.classList.add("shake-animation");
    sprite.classList.add("hit-flash");
    
    setTimeout(() => {
      sprite.classList.remove("shake-animation");
      sprite.classList.remove("hit-flash");
    }, 1000);
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
  if (move.pp <= 0) {
    showFloatingLog("No PP remaining!");
    return;
  }
  canAct = false;
  
  // Decrease PP
  move.pp--;
  
  // Update move buttons to reflect PP change
  updateMoveButtons();
  
  // Enhance the move name for display if we have the BattleDialogue module
  let displayMoveName = move.name;
  if (window.BattleDialogue) {
    displayMoveName = window.BattleDialogue.enhanceMoveName(move);
  }
  
  // Add to battle log with dialogue
  addToBattleLog(`${activePlayerCharacter.name} used ${displayMoveName}!`, 'attack', {}, activePlayerCharacter);
  
  // Check if this is a damage move or a status/healing move
  const isZeroDamageMove = move.power === 0 || move.type === "status";
  
  // Check if it's a healing move (by move name)
  const isHealingMove = ["Irie Recharge", "Call Girls for Gang", "PTO Prayer"].includes(move.name);
  
  // Check if it's a stat change move (buffs and debuffs)
  const isStatModifyingMove = ["Flex on 'Em", "Caffeine Overload", "Hustle Hard", "VC Funded Flex", "Low Battery", "Game On Bro"].includes(move.name);
  
  // Only play attack sound for damage moves (not healing/stat moves)
  if (!isZeroDamageMove && !isHealingMove) {
    // Play hit sound
    playHitSound();
    
    // Apply attack animation
    setPlayerAnimation("attack");
    
    // Apply move-specific animation based on type
    applyMoveAnimation(move.type, "player");
  } else {
    // Play a different sound for status/healing moves
    playSuccessSound();
    
    // Apply a non-attack animation
    if (move.type === "status" || isHealingMove) {
      // For healing moves specifically, use healing animation
      if (isHealingMove) {
        applyHealAnimation("player");
      } else {
        applyMoveAnimation("status", "player");
      }
    }
  }
  
  // Add visual effect based on move type
  const battleArena = document.getElementById("battle-arena");
  const opponentSprite = document.getElementById("opponent-sprite");
  const playerSprite = document.getElementById("player-sprite");
  
  // Create speed lines effect for dynamic attacks
  if (move.power > 50) {
    const speedLines = document.createElement("div");
    speedLines.className = "speed-lines";
    battleArena.appendChild(speedLines);
    
    // Remove speed lines after animation completes (faster animation)
    setTimeout(() => {
      speedLines.remove();
    }, 400);
  }
  
  // Make player sprite move forward when attacking - only for damage moves (not healing/stat moves)
  if (playerSprite && !isZeroDamageMove && !isHealingMove && !isStatModifyingMove) {
    playerSprite.classList.add("attack-lunge");
  }
  
  // Only create attack animations for damage moves (not healing/stat moves)
  const isAttackAnimation = !isZeroDamageMove && !isHealingMove && !isStatModifyingMove;
  
  // Get the appropriate animation based on type (only for attack animations)
  const animationUrl = isAttackAnimation ? 
                     (attackAnimations[move.type] || attackAnimations["Normal"]) : 
                     null;
  
  // Create attack animation element (only for attack animations)
  const attackAnimation = isAttackAnimation ? document.createElement("div") : null;
  
  if (attackAnimation) {
    attackAnimation.className = "attack-effect";
    
    try {
      // Try to set the background image
      attackAnimation.style.backgroundImage = `url(${animationUrl})`;
      
      // Position the animation centered on the opponent sprite
      const opponentRect = opponentSprite.getBoundingClientRect();
      const battleArenaRect = battleArena.getBoundingClientRect();
      
      // Calculate position relative to battle arena
      const left = opponentRect.left - battleArenaRect.left + (opponentRect.width / 2) - 75;
      const top = opponentRect.top - battleArenaRect.top + (opponentRect.height / 2) - 75;
      
      attackAnimation.style.position = "absolute";
      attackAnimation.style.left = `${left}px`;
      attackAnimation.style.top = `${top}px`;
      attackAnimation.style.width = "150px";
      attackAnimation.style.height = "150px";
      attackAnimation.style.backgroundSize = "contain";
      attackAnimation.style.backgroundPosition = "center center";
      attackAnimation.style.backgroundRepeat = "no-repeat";
      attackAnimation.style.zIndex = "100";
      
      // Add to battle arena
      battleArena.appendChild(attackAnimation);
      
      // Remove animation after it completes
      setTimeout(() => {
        attackAnimation.remove();
      }, 1000);
    } catch (error) {
      console.error("Animation error:", error);
    }
  }
  
  // Remove lunge animation after a short delay
  setTimeout(() => {
    const playerElement = document.getElementById("player-sprite");
    if (playerElement) {
      playerElement.classList.remove("attack-lunge");
    }
  }, 300);
  
  // Add a class based on the move type for visual feedback
  battleArena.classList.add(`effect-${move.type}`);
  setTimeout(() => {
    battleArena.classList.remove(`effect-${move.type}`);
  }, 1200);
  
  // Check accuracy including status effects
  const effectiveAccuracy = move.accuracy * playerStatModifiers.accuracy;
  if (Math.random() * 100 > effectiveAccuracy) {
    // Miss
    addToBattleLog(`${activePlayerCharacter.name}'s attack missed!`, 'attack', { effectiveness: 'miss' }, activePlayerCharacter);
    showFloatingLog("MISSED!");
    
    // Keep UI as is - don't hide move and item buttons
    
    setTimeout(() => endPlayerTurn(), 600);
    
    // Remove animation
    setTimeout(() => {
      // Reset to default animation
      setPlayerAnimation("default");
      canAct = true;
    }, 1000);
    return;
  }
  
  // Check if this is a healing move
  if (isHealingMove) {
    handleStatusMove(move, "player");
    
    // Keep battle UI as-is - don't hide moves or items
    
    setTimeout(() => endPlayerTurn(), 600);
    
    // Remove animation
    setTimeout(() => {
      // Reset to default animation
      setPlayerAnimation("default");
      canAct = true;
    }, 1000);
    return;
  }
  
  // Handle status moves differently
  if (move.type === "status") {
    handleStatusMove(move, "player");
    
    // Keep battle UI as-is - don't hide moves or items
    
    setTimeout(() => endPlayerTurn(), 600);
    
    // Remove animation
    setTimeout(() => {
      // Reset to default animation
      setPlayerAnimation("default");
      canAct = true;
    }, 1000);
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
    
    // Show damage in battle log with reaction
    const effectivenessValue = calculateTypeEffectiveness(move.type, activeOpponent.type);
    const damageContext = {
      damage: damage,
      effectiveness: effectivenessValue > 1.2 ? 'critical' : (effectivenessValue < 0.8 ? 'weak' : 'normal')
    };
    
    addToBattleLog(`${activePlayerCharacter.name} dealt ${damage} damage to ${activeOpponent.name}!`, 'hit-reaction', damageContext, activeOpponent);
    
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
    // Use our new hit animation function from animations.js
    setOpponentAnimation("hit");
    
    setTimeout(() => {
      opponentSprite.classList.remove("shake-animation");
      setOpponentAnimation("default");
    }, 1000);
    
    // Keep battle UI as-is - don't hide moves or items
    
    // Check if opponent fainted
    if (activeOpponent.hp <= 0) {
      handleOpponentFaint();
    } else {
      setTimeout(() => endPlayerTurn(), 600);
    }
    // Remove animation and restore floating
    // Reset to default animation
      setPlayerAnimation("default");
    canAct = true;
  }, 1000);
}

function executeOpponentMove(move) {
  if (!gameActive || currentTurn !== "opponent") return;
  
  // Decrease PP for opponent move if it's not the struggle move
  if (move.name !== "Struggle" && move.pp !== undefined) {
    move.pp--;
  }
  
  // Enhance the move name for display if we have the BattleDialogue module
  let displayMoveName = move.name;
  if (window.BattleDialogue) {
    displayMoveName = window.BattleDialogue.enhanceMoveName(move);
  }
  
  addToBattleLog(`${activeOpponent.name} used ${displayMoveName}!`, 'attack', {}, activeOpponent);
  
  // Check if this is a damage move or a status/healing move
  const isZeroDamageMove = move.power === 0 || move.type === "status";
  
  // Check if it's a healing move (by move name)
  const isHealingMove = ["Irie Recharge", "Call Girls for Gang", "PTO Prayer"].includes(move.name);
  
  // Check if it's a stat change move (buffs and debuffs)
  const isStatModifyingMove = ["Flex on 'Em", "Caffeine Overload", "Hustle Hard", "VC Funded Flex", "Low Battery", "Game On Bro"].includes(move.name);
  
  // Only play attack sound for damage moves (not healing/stat moves)
  if (!isZeroDamageMove && !isHealingMove) {
    // Play hit sound
    playHitSound();
    
    // Apply attack animation
    setOpponentAnimation("attack");
    
    // Apply move-specific animation based on type
    applyMoveAnimation(move.type, "opponent");
  } else {
    // Play a different sound for status/healing moves
    playSuccessSound();
    
    // Apply a non-attack animation
    if (move.type === "status" || isHealingMove) {
      // For healing moves specifically, use healing animation
      if (isHealingMove) {
        applyHealAnimation("opponent");
      } else {
        applyMoveAnimation("status", "opponent");
      }
    }
  }
  
  // Add visual effect based on move type
  const battleArena = document.getElementById("battle-arena");
  const playerSprite = document.getElementById("player-sprite");
  const opponentSprite = document.getElementById("opponent-sprite");
  
  // Create speed lines effect for powerful attacks
  if (move.power > 50) {
    const speedLines = document.createElement("div");
    speedLines.className = "speed-lines";
    speedLines.style.transform = "scaleX(-1)"; // Reverse the direction for opponent
    battleArena.appendChild(speedLines);
    
    // Remove speed lines after animation completes (faster animation)
    setTimeout(() => {
      speedLines.remove();
    }, 400);
  }
  
  // Make opponent sprite move forward when attacking - only for damage moves (not healing/stat moves)
  if (opponentSprite && !isZeroDamageMove && !isHealingMove && !isStatModifyingMove) {
    opponentSprite.classList.add("attack-lunge-reverse");
  }
  
  // Only create attack animations for damage moves (not healing/stat moves)
  const isAttackAnimation = !isZeroDamageMove && !isHealingMove && !isStatModifyingMove;
  
  // Get the appropriate animation based on type (only for attack animations)
  const animationUrl = isAttackAnimation ? 
                      (attackAnimations[move.type] || attackAnimations["Normal"]) : 
                      null;
  
  // Create attack animation element (only for attack animations)
  const attackAnimation = isAttackAnimation ? document.createElement("div") : null;
  
  if (attackAnimation) {
    attackAnimation.className = "attack-effect";
    
    try {
      // Try to set the background image
      attackAnimation.style.backgroundImage = `url(${animationUrl})`;
      
      // Position the animation centered on the player sprite
      const playerRect = playerSprite.getBoundingClientRect();
      const battleArenaRect = battleArena.getBoundingClientRect();
    
      // Calculate position relative to battle arena
      const left = playerRect.left - battleArenaRect.left + (playerRect.width / 2) - 75;
      const top = playerRect.top - battleArenaRect.top + (playerRect.height / 2) - 75;
      
      attackAnimation.style.position = "absolute";
      attackAnimation.style.left = `${left}px`;
      attackAnimation.style.top = `${top}px`;
      attackAnimation.style.width = "150px";
      attackAnimation.style.height = "150px";
      attackAnimation.style.backgroundSize = "contain";
      attackAnimation.style.backgroundPosition = "center center";
      attackAnimation.style.backgroundRepeat = "no-repeat";
      attackAnimation.style.zIndex = "100";
      
      // Add to battle arena
      battleArena.appendChild(attackAnimation);
      
      // Remove animation after it completes
      setTimeout(() => {
        attackAnimation.remove();
      }, 1000);
    } catch (error) {
      console.error("Animation error:", error);
    }
  }
  
  // Remove lunge animation after a short delay
  setTimeout(() => {
    const opponentElement = document.getElementById("opponent-sprite");
    if (opponentElement) {
      opponentElement.classList.remove("attack-lunge-reverse");
    }
  }, 300);
  
  // Add a class based on the move type for visual feedback
  battleArena.classList.add(`effect-${move.type}`);
  setTimeout(() => {
    battleArena.classList.remove(`effect-${move.type}`);
  }, 1200);
  
  // Check accuracy including status effects
  const effectiveAccuracy = move.accuracy * opponentStatModifiers.accuracy;
  if (Math.random() * 100 > effectiveAccuracy) {
    // Miss
    addToBattleLog(`${activeOpponent.name}'s attack missed!`, 'attack', { effectiveness: 'miss' }, activeOpponent);
    showFloatingLog("MISSED!");
    setTimeout(() => endOpponentTurn(), 600);
    
    // Remove animation
    setTimeout(() => {
      const opponentElement = document.getElementById("opponent-sprite");
      if (opponentElement) {
        opponentElement.classList.remove("attack-animation-reverse");
      }
      setOpponentAnimation("default");
    }, 1000);
    return;
  }
  
  // Check if this is a healing move
  if (isHealingMove) {
    handleStatusMove(move, "opponent");
    setTimeout(() => endOpponentTurn(), 600);
    
    // Remove animation
    setTimeout(() => {
      const opponentElement = document.getElementById("opponent-sprite");
      if (opponentElement) {
        opponentElement.classList.remove("attack-animation-reverse");
      }
      setOpponentAnimation("default");
    }, 1000);
    return;
  }
  
  // Handle status moves differently
  if (move.type === "status") {
    handleStatusMove(move, "opponent");
    setTimeout(() => endOpponentTurn(), 600);
    
    // Remove animation
    setTimeout(() => {
      const opponentElement = document.getElementById("opponent-sprite");
      if (opponentElement) {
        opponentElement.classList.remove("attack-animation-reverse");
      }
      setOpponentAnimation("default");
    }, 1000);
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
    // Check if player has an imposter (Crash Dummy) effect active
    const hasImposterEffect = playerActiveItemEffects.some(effect => effect.effect === "imposter");
    
    if (hasImposterEffect) {
      // The imposter (Crash Dummy) takes the hit instead
      addToBattleLog("The Crash Dummy imposter took the hit instead!");
      
      // Show a visual effect for the imposter taking damage
      const playerAreaElement = document.getElementById("player-area");
      if (playerAreaElement) {
        const imposterHitElement = document.createElement("div");
        imposterHitElement.className = "imposter-hit-effect";
        playerAreaElement.appendChild(imposterHitElement);
        
        // The animation will handle the visual effects and automatically fade out
        // Remove the element after the animation completes (imposterHitEffect animation)
        setTimeout(() => {
          if (imposterHitElement && imposterHitElement.parentNode) {
            imposterHitElement.remove();
          }
        }, 1500);
      }
      
      // Remove the imposter effect
      playerActiveItemEffects = playerActiveItemEffects.filter(effect => effect.effect !== "imposter");
      
      addToBattleLog(`The Crash Dummy took ${damage} damage and shattered!`);
      showFloatingLog("Crash Dummy shattered!");
      
      // Don't apply damage to the player
      updateBattleUI();
    } else {
      // Normal damage process
      activePlayerCharacter.hp = Math.max(0, activePlayerCharacter.hp - damage);
      updateBattleUI();
      
      // Show damage in battle log with reaction
      const effectivenessValue = calculateTypeEffectiveness(move.type, activePlayerCharacter.type);
      const damageContext = {
        damage: damage,
        effectiveness: effectivenessValue > 1.2 ? 'critical' : (effectivenessValue < 0.8 ? 'weak' : 'normal')
      };
      
      addToBattleLog(`${activeOpponent.name} dealt ${damage} damage to ${activePlayerCharacter.name}!`, 'hit-reaction', damageContext, activePlayerCharacter);
      
      // Show effectiveness message if applicable
      const effectiveness = calculateTypeEffectiveness(move.type, activePlayerCharacter.type);
      let message = `${damage} damage!`;
      if (effectiveness > 1.2) {
        message = `Super effective! ${damage} damage!`;
      } else if (effectiveness < 0.8) {
        message = `Not very effective... ${damage} damage.`;
      }
      showFloatingLog(message);
    }
    
    // Apply potential hit effects (status changes, etc.)
    applyHitEffects(move, "opponent");
    
    // Show player reaction
    const playerSprite = document.getElementById("player-sprite");
    playerSprite.classList.add("player-shake-animation");
    // Use our new hit animation function from animations.js
    setPlayerAnimation("hit");
    
    setTimeout(() => {
      playerSprite.classList.remove("player-shake-animation");
      setPlayerAnimation("default");
    }, 1000);
    
    // Check if player fainted
    if (activePlayerCharacter.hp <= 0) {
      handlePlayerFaint();
    } else {
      setTimeout(() => endOpponentTurn(), 600);
    }
    // Remove animation
    const opponentElement = document.getElementById("opponent-sprite");
    if (opponentElement) {
      opponentElement.classList.remove("attack-animation-reverse");
    }
    setOpponentAnimation("default");
  }, 1000);
}

function calculateDamage(attacker, defender, move, attackerMods, defenderMods) {
  // Comprehensive safety checks
  if (!attacker || !defender || !move) {
    console.error("Missing critical parameters in calculateDamage:", { attacker, defender, move });
    return 0;
  }
  
  // Provide default stat modifiers if missing
  attackerMods = attackerMods || { attack: 1, defense: 1, speed: 1, accuracy: 1 };
  defenderMods = defenderMods || { attack: 1, defense: 1, speed: 1, accuracy: 1 };
  
  // For status moves or moves with 0 power, return 0 damage
  if (move.type === "status" || move.power === 0 || move.power === undefined) {
    return 0;
  }
  
  // Extract stats safely - handle both direct properties and stats object structure
  let attackerAttack = 50; // Default if we can't find a value
  if (typeof attacker.attack === 'number') {
    attackerAttack = attacker.attack;
  } else if (attacker.stats && typeof attacker.stats.attack === 'number') {
    attackerAttack = attacker.stats.attack;
  }
  
  let defenderDefense = 50; // Default if we can't find a value
  if (typeof defender.defense === 'number') {
    defenderDefense = defender.defense;
  } else if (defender.stats && typeof defender.stats.defense === 'number') {
    defenderDefense = defender.stats.defense;
  }
  
  // Ensure all values are positive numbers
  const movePower = Math.max(1, move.power || 40); // Minimum power of 1
  const attackerModAttack = Math.max(0.1, attackerMods.attack || 1); // Minimum modifier of 0.1
  const defenderModDefense = Math.max(0.1, defenderMods.defense || 1); // Minimum modifier of 0.1
  
  // Log the values being used for damage calculation
  console.log("Damage calculation values:", {
    attackerAttack,
    defenderDefense,
    movePower,
    attackerModAttack,
    defenderModDefense
  });
  
  // Base damage calculation with safety
  let damage = Math.floor((attackerAttack * attackerModAttack * movePower) / 110);
  
  // Apply defense reduction - increased defender impact for balance
  // Ensure we don't divide by zero by using Math.max
  const defenseValue = Math.max(1, defenderDefense * defenderModDefense / 40);
  damage = Math.floor(damage / defenseValue);
  
  // Apply type effectiveness with balanced multipliers (with safety check)
  const defenderType = defender.type || 'normal';
  const moveType = move.type || 'normal';
  const effectiveness = calculateTypeEffectiveness(moveType, defenderType);
  damage = Math.floor(damage * effectiveness);
  
  // Add random factor (85-100% of calculated damage) for variation
  damage = Math.floor(damage * (0.85 + Math.random() * 0.15));
  
  // Cap damage to prevent one-hit KOs (max 60% of defender's max HP)
  let maxHP = 0;
  try {
    if (defender === activePlayerCharacter && playerTeam) {
      const playerIndex = playerTeam.findIndex(c => c && c.id === defender.id);
      maxHP = playerIndex >= 0 ? playerTeam[playerIndex].hp : defender.hp || 100;
    } else if (opponents && opponentIndex >= 0 && opponentIndex < opponents.length) {
      maxHP = opponents[opponentIndex].hp || defender.hp || 100;
    } else {
      maxHP = defender.hp || defender.maxHp || 100;
    }
  } catch (error) {
    console.error("Error determining max HP:", error);
    maxHP = defender.hp || defender.maxHp || 100;
  }
  const maxDamage = Math.floor(maxHP * 0.6);
  damage = Math.min(damage, maxDamage);
  
  // Critical hit (based on attacker's critRate, typically 10-20%)
  if (Math.random() < attacker.critRate) {
    damage = Math.floor(damage * 1.3); // Reduced from 1.5 for balance
    addToBattleLog("A critical hit!", 'critical-hit', {}, attacker === activePlayerCharacter ? activeOpponent : activePlayerCharacter);
    showFloatingLog("CRITICAL HIT!");
    
    // Add critical hit visual effect
    const targetSprite = document.getElementById(attacker === activePlayerCharacter ? "opponent-sprite" : "player-sprite");
    targetSprite.classList.add("critical-hit");
    
    // Create flash effect for critical hits
    const battleArena = document.getElementById("battle-arena");
    const flashEffect = document.createElement("div");
    flashEffect.style.position = "absolute";
    flashEffect.style.top = "0";
    flashEffect.style.left = "0";
    flashEffect.style.width = "100%";
    flashEffect.style.height = "100%";
    flashEffect.style.backgroundColor = "rgba(255, 255, 0, 0.2)";
    flashEffect.style.zIndex = "50";
    flashEffect.style.animation = "fadeOut 0.5s forwards";
    
    battleArena.appendChild(flashEffect);
    
    // Remove flash effect after animation completes
    setTimeout(() => {
      flashEffect.remove();
      targetSprite.classList.remove("critical-hit");
    }, 700);
  }
  
  // Ensure minimum damage for actual attack moves
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
          // Healing move - more dynamic calculation: 20-30% of maxHp
          // Make sure maxHp is set
          activePlayerCharacter.maxHp = activePlayerCharacter.maxHp || activePlayerCharacter.hp;
          
          // Calculate a dynamic heal amount (20-30% of max HP)
          const healPercent = 0.2 + Math.random() * 0.1; // 20-30%
          const healAmount = Math.floor(activePlayerCharacter.maxHp * healPercent);
          
          // Apply the healing
          const oldHp = activePlayerCharacter.hp; // Store old hp for logging
          activePlayerCharacter.hp = Math.min(activePlayerCharacter.hp + healAmount, activePlayerCharacter.maxHp);
          
          // Calculate the actual amount healed (could be less if near max HP)
          const actualHealAmount = activePlayerCharacter.hp - oldHp;
          
          // Add visual healing effect
          const playerSprite = document.getElementById("player-sprite");
          playerSprite.classList.add("heal-effect");
          
          // Create healing particles
          const battleArena = document.getElementById("battle-arena");
          for (let i = 0; i < 5; i++) {
            const healParticle = document.createElement("div");
            healParticle.style.position = "absolute";
            healParticle.style.width = "30px";
            healParticle.style.height = "30px";
            healParticle.style.backgroundImage = "url('https://i.imgur.com/5jzg2L3.png')";
            healParticle.style.backgroundSize = "contain";
            healParticle.style.backgroundRepeat = "no-repeat";
            healParticle.style.zIndex = "50";
            
            // Random positions around player
            const playerRect = playerSprite.getBoundingClientRect();
            const battleArenaRect = battleArena.getBoundingClientRect();
            
            const left = playerRect.left - battleArenaRect.left + Math.random() * playerRect.width;
            const top = playerRect.top - battleArenaRect.top + Math.random() * playerRect.height;
            
            healParticle.style.left = `${left}px`;
            healParticle.style.top = `${top}px`;
            healParticle.style.transform = "translateY(0)";
            healParticle.style.opacity = "1";
            healParticle.style.transition = "all 1.5s ease-out";
            
            battleArena.appendChild(healParticle);
            
            // Animate particles rising up and fading
            setTimeout(() => {
              healParticle.style.transform = "translateY(-50px)";
              healParticle.style.opacity = "0";
            }, 10);
            
            // Remove particles after animation
            setTimeout(() => {
              healParticle.remove();
              playerSprite.classList.remove("heal-effect");
            }, 1500);
          }
          
          addToBattleLog(`${activePlayerCharacter.name} recovered ${actualHealAmount} HP!`);
          showFloatingLog(`+${actualHealAmount} HP!`);
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
          // Healing move - more dynamic calculation: 25-35% of maxHp
          // Make sure maxHp is set
          activePlayerCharacter.maxHp = activePlayerCharacter.maxHp || activePlayerCharacter.hp;
          
          // Calculate a dynamic heal amount (25-35% of max HP)
          const healPercent = 0.25 + Math.random() * 0.1; // 25-35%
          const healAmount = Math.floor(activePlayerCharacter.maxHp * healPercent);
          
          // Apply the healing
          const oldHp = activePlayerCharacter.hp; // Store old hp for logging
          activePlayerCharacter.hp = Math.min(activePlayerCharacter.hp + healAmount, activePlayerCharacter.maxHp);
          
          // Calculate the actual amount healed (could be less if near max HP)
          const actualHealAmount = activePlayerCharacter.hp - oldHp;
          
          // Add visual healing effect
          const playerSprite = document.getElementById("player-sprite");
          playerSprite.classList.add("heal-effect");
          
          // Create healing particles
          const battleArena = document.getElementById("battle-arena");
          for (let i = 0; i < 6; i++) {
            const healParticle = document.createElement("div");
            healParticle.style.position = "absolute";
            healParticle.style.width = "30px";
            healParticle.style.height = "30px";
            healParticle.style.backgroundImage = "url('https://i.imgur.com/5jzg2L3.png')";
            healParticle.style.backgroundSize = "contain";
            healParticle.style.backgroundRepeat = "no-repeat";
            healParticle.style.zIndex = "50";
            
            // Random positions around player
            const playerRect = playerSprite.getBoundingClientRect();
            const battleArenaRect = battleArena.getBoundingClientRect();
            
            const left = playerRect.left - battleArenaRect.left + Math.random() * playerRect.width;
            const top = playerRect.top - battleArenaRect.top + Math.random() * playerRect.height;
            
            healParticle.style.left = `${left}px`;
            healParticle.style.top = `${top}px`;
            healParticle.style.transform = "translateY(0)";
            healParticle.style.opacity = "1";
            healParticle.style.transition = "all 1.5s ease-out";
            
            battleArena.appendChild(healParticle);
            
            // Animate particles rising up and fading
            setTimeout(() => {
              healParticle.style.transform = "translateY(-50px)";
              healParticle.style.opacity = "0";
            }, 10);
            
            // Remove particles after animation
            setTimeout(() => {
              healParticle.remove();
              playerSprite.classList.remove("heal-effect");
            }, 1500);
          }
          
          addToBattleLog(`${activePlayerCharacter.name} recovered ${actualHealAmount} HP!`);
          showFloatingLog(`+${actualHealAmount} HP!`);
        } else {
          applyStatusEffect(activeOpponent, "slimed", 3, "opponent");
        }
        break;
      case 5: // 9-5 Homie
        if (move.name === "PTO Prayer") {
          // Healing move - more dynamic calculation: 22-32% of maxHp
          // Make sure maxHp is set
          activePlayerCharacter.maxHp = activePlayerCharacter.maxHp || activePlayerCharacter.hp;
          
          // Calculate a dynamic heal amount (22-32% of max HP)
          const healPercent = 0.22 + Math.random() * 0.1; // 22-32%
          const healAmount = Math.floor(activePlayerCharacter.maxHp * healPercent);
          
          // Apply the healing
          const oldHp = activePlayerCharacter.hp; // Store old hp for logging
          activePlayerCharacter.hp = Math.min(activePlayerCharacter.hp + healAmount, activePlayerCharacter.maxHp);
          
          // Calculate the actual amount healed (could be less if near max HP)
          const actualHealAmount = activePlayerCharacter.hp - oldHp;
          
          // Add visual healing effect
          const playerSprite = document.getElementById("player-sprite");
          playerSprite.classList.add("heal-effect");
          
          // Create healing particles
          const battleArena = document.getElementById("battle-arena");
          for (let i = 0; i < 5; i++) {
            const healParticle = document.createElement("div");
            healParticle.style.position = "absolute";
            healParticle.style.width = "30px";
            healParticle.style.height = "30px";
            healParticle.style.backgroundImage = "url('https://i.imgur.com/5jzg2L3.png')";
            healParticle.style.backgroundSize = "contain";
            healParticle.style.backgroundRepeat = "no-repeat";
            healParticle.style.zIndex = "50";
            
            // Random positions around player
            const playerRect = playerSprite.getBoundingClientRect();
            const battleArenaRect = battleArena.getBoundingClientRect();
            
            const left = playerRect.left - battleArenaRect.left + Math.random() * playerRect.width;
            const top = playerRect.top - battleArenaRect.top + Math.random() * playerRect.height;
            
            healParticle.style.left = `${left}px`;
            healParticle.style.top = `${top}px`;
            healParticle.style.transform = "translateY(0)";
            healParticle.style.opacity = "1";
            healParticle.style.transition = "all 1.5s ease-out";
            
            battleArena.appendChild(healParticle);
            
            // Animate particles rising up and fading
            setTimeout(() => {
              healParticle.style.transform = "translateY(-50px)";
              healParticle.style.opacity = "0";
            }, 10);
            
            // Remove particles after animation
            setTimeout(() => {
              healParticle.remove();
              playerSprite.classList.remove("heal-effect");
            }, 1500);
          }
          
          addToBattleLog(`${activePlayerCharacter.name} recovered ${actualHealAmount} HP!`);
          showFloatingLog(`+${actualHealAmount} HP!`);
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
          // Healing move - more dynamic calculation: 20-30% of maxHp for opponent
          // Make sure maxHp is set
          activeOpponent.maxHp = activeOpponent.maxHp || activeOpponent.hp;
          
          // Calculate a dynamic heal amount (20-30% of max HP)
          const healPercent = 0.2 + Math.random() * 0.1; // 20-30%
          const healAmount = Math.floor(activeOpponent.maxHp * healPercent);
          
          // Apply the healing
          const oldHp = activeOpponent.hp; // Store old hp for logging
          activeOpponent.hp = Math.min(activeOpponent.hp + healAmount, activeOpponent.maxHp);
          
          // Calculate the actual amount healed (could be less if near max HP)
          const actualHealAmount = activeOpponent.hp - oldHp;
          
          // Add visual healing effect
          const opponentSprite = document.getElementById("opponent-sprite");
          opponentSprite.classList.add("heal-effect");
          
          // Create healing particles
          const battleArena = document.getElementById("battle-arena");
          for (let i = 0; i < 5; i++) {
            const healParticle = document.createElement("div");
            healParticle.style.position = "absolute";
            healParticle.style.width = "30px";
            healParticle.style.height = "30px";
            healParticle.style.backgroundImage = "url('https://i.imgur.com/5jzg2L3.png')";
            healParticle.style.backgroundSize = "contain";
            healParticle.style.backgroundRepeat = "no-repeat";
            healParticle.style.zIndex = "50";
            
            // Random positions around opponent
            const opponentRect = opponentSprite.getBoundingClientRect();
            const battleArenaRect = battleArena.getBoundingClientRect();
            
            const left = opponentRect.left - battleArenaRect.left + Math.random() * opponentRect.width;
            const top = opponentRect.top - battleArenaRect.top + Math.random() * opponentRect.height;
            
            healParticle.style.left = `${left}px`;
            healParticle.style.top = `${top}px`;
            healParticle.style.transform = "translateY(0)";
            healParticle.style.opacity = "1";
            healParticle.style.transition = "all 1.5s ease-out";
            
            battleArena.appendChild(healParticle);
            
            // Animate particles rising up and fading
            setTimeout(() => {
              healParticle.style.transform = "translateY(-50px)";
              healParticle.style.opacity = "0";
            }, 10);
            
            // Remove particles after animation
            setTimeout(() => {
              healParticle.remove();
              opponentSprite.classList.remove("heal-effect");
            }, 1500);
          }
          
          addToBattleLog(`${activeOpponent.name} recovered ${actualHealAmount} HP!`);
          showFloatingLog(`+${actualHealAmount} HP!`);
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
  
  // Apply status effect animation using our animation system
  handleStatusEffectAnimation(statusType, side);
  
  // Show status effect animation if available
  if (statusAnimations[statusType]) {
    const battleArena = document.getElementById("battle-arena");
    const targetSprite = document.getElementById(side === "player" ? "player-sprite" : "opponent-sprite");
    
    // Create status animation element
    const statusAnimation = document.createElement("div");
    statusAnimation.className = "status-effect";
    statusAnimation.style.backgroundImage = `url(${statusAnimations[statusType]})`;
    
    // Position the animation centered on the character
    const targetRect = targetSprite.getBoundingClientRect();
    const battleArenaRect = battleArena.getBoundingClientRect();
    
    // Calculate position relative to battle arena
    const left = targetRect.left - battleArenaRect.left + (targetRect.width / 2) - 60;
    const top = targetRect.top - battleArenaRect.top + (targetRect.height / 2) - 60;
    
    statusAnimation.style.position = "absolute";
    statusAnimation.style.left = `${left}px`;
    statusAnimation.style.top = `${top}px`;
    statusAnimation.style.width = "120px";
    statusAnimation.style.height = "120px";
    statusAnimation.style.backgroundSize = "contain";
    statusAnimation.style.backgroundPosition = "center center";
    statusAnimation.style.backgroundRepeat = "no-repeat";
    statusAnimation.style.zIndex = "100";
    
    // Add to battle arena
    battleArena.appendChild(statusAnimation);
    
    // Remove after animation completes
    setTimeout(() => {
      statusAnimation.remove();
    }, 1500);
  }
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
          // Make sure maxHp is set
          activePlayerCharacter.maxHp = activePlayerCharacter.maxHp || activePlayerCharacter.hp;
          
          // Use maxHp directly for healing calculation 
          activePlayerCharacter.hp = Math.min(activePlayerCharacter.maxHp, activePlayerCharacter.hp + healAmount);
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
  
  // Initialize PP for opponent moves if not already set
  moves.forEach(move => {
    if (move.pp === undefined) {
      move.pp = move.power > 0 ? 10 : 5; // Attack moves get 10 PP, status moves get 5 PP
    }
    if (move.maxPp === undefined) {
      move.maxPp = move.pp;
    }
  });
  
  // Filter out moves with no PP
  const availableMoves = moves.filter(move => move.pp > 0);
  
  // If no moves with PP, return a default struggle move
  if (availableMoves.length === 0) {
    return {
      name: "Struggle",
      power: 30,
      accuracy: 100,
      type: "Normal",
      description: "A desperate attack used when no other moves can be used."
    };
  }
  
  // Different AI behaviors
  switch (activeOpponent.ai) {
    case "aggressive":
      // Prioritize highest damage moves
      availableMoves.sort((a, b) => b.power - a.power);
      // 70% chance to use one of the two strongest moves
      return Math.random() < 0.7 ? availableMoves[0] : availableMoves[Math.floor(Math.random() * availableMoves.length)];
      
    case "defensive":
      // Prioritize status moves when HP is high, damage when low
      if (activeOpponent.hp > opponents[opponentIndex].hp * 0.7) {
        // More likely to use status moves
        const statusMoves = availableMoves.filter(m => m.type === "status");
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
  
  // Prevent multiple actions
  canAct = false;
  
  // Reduce item count
  itemUseCounts[itemType]--;
  updateItemButtons();
  
  const item = items[itemType];
  addToBattleLog(`${activePlayerCharacter.name} used ${item.name}!`);
  
  // Play success sound for item use
  playSuccessSound();
  
  // Add item use animation
  const playerSprite = document.getElementById("player-sprite");
  playerSprite.classList.add("glow-effect");
  
  // Create a floating item effect
  const battleArena = document.getElementById("battle-arena");
  const itemAnimation = document.createElement("div");
  itemAnimation.className = "item-effect";
  itemAnimation.textContent = item.icon || "🎵"; // Default to music note if no icon
  
  // Position above the player
  const playerRect = playerSprite.getBoundingClientRect();
  const battleArenaRect = battleArena.getBoundingClientRect();
  
  const left = playerRect.left - battleArenaRect.left + (playerRect.width / 2) - 25;
  const top = playerRect.top - battleArenaRect.top - 50;
  
  itemAnimation.style.left = `${left}px`;
  itemAnimation.style.top = `${top}px`;
  
  // Add to battle arena
  battleArena.appendChild(itemAnimation);
  
  // Remove animations after they complete
  setTimeout(() => {
    playerSprite.classList.remove("glow-effect");
    itemAnimation.remove();
    canAct = true;
  }, 1500);
  
  // Apply item effect
  switch (item.effect) {
    case "heal":
      // Make sure maxHp is set
      activePlayerCharacter.maxHp = activePlayerCharacter.maxHp || activePlayerCharacter.hp;
      
      // Use the maxHp property directly
      const healAmount = Math.min(item.value, activePlayerCharacter.maxHp - activePlayerCharacter.hp);
      activePlayerCharacter.hp = Math.min(activePlayerCharacter.maxHp, activePlayerCharacter.hp + item.value);
      
      // Add visual healing effect
      const healingPlayerSprite = document.getElementById("player-sprite");
      healingPlayerSprite.classList.add("heal-effect");
      
      // Create healing particles
      const battleArenaElement = document.getElementById("battle-arena");
      for (let i = 0; i < 8; i++) {
        const healParticle = document.createElement("div");
        healParticle.style.position = "absolute";
        healParticle.style.width = "30px";
        healParticle.style.height = "30px";
        healParticle.style.backgroundImage = "url('https://i.imgur.com/5jzg2L3.png')";
        healParticle.style.backgroundSize = "contain";
        healParticle.style.backgroundRepeat = "no-repeat";
        healParticle.style.zIndex = "50";
        
        // Random positions around player
        const playerRect = healingPlayerSprite.getBoundingClientRect();
        const battleArenaRect = battleArenaElement.getBoundingClientRect();
        
        const left = playerRect.left - battleArenaRect.left + Math.random() * playerRect.width;
        const top = playerRect.top - battleArenaRect.top + Math.random() * playerRect.height;
        
        healParticle.style.left = `${left}px`;
        healParticle.style.top = `${top}px`;
        healParticle.style.transform = "translateY(0)";
        healParticle.style.opacity = "1";
        healParticle.style.transition = "all 1.5s ease-out";
        
        battleArenaElement.appendChild(healParticle);
        
        // Animate particles rising up and fading
        setTimeout(() => {
          healParticle.style.transform = "translateY(-50px)";
          healParticle.style.opacity = "0";
        }, 10);
        
        // Remove particles after animation
        setTimeout(() => {
          healParticle.remove();
        }, 1500);
      }
      
      // Remove heal effect class after animation completes
      setTimeout(() => {
        healingPlayerSprite.classList.remove("heal-effect");
      }, 1500);
      
      addToBattleLog(`${activePlayerCharacter.name} recovered ${healAmount} HP!`);
      showFloatingLog(`Healed: +${healAmount} HP`);
      break;
      
    case "atkUp":
      // Apply the stat modifier
      playerStatModifiers.attack *= item.value;
      addToBattleLog(`${activePlayerCharacter.name}'s Attack rose sharply!`);
      showFloatingLog("ATK ↑↑");
      
      // Apply buff animation
      if (typeof applyBuffAnimation === 'function') {
        // Use the item type to determine buff type - default to "dark" for nbayoungboy
        const buffType = itemType === "nbayoungboy" ? "dark" : "normal";
        applyBuffAnimation(buffType, "player");
      }
      
      // Add to active effects with duration
      if (item.duration) {
        // Remove any existing attack boost effects first to prevent stacking
        playerActiveItemEffects = playerActiveItemEffects.filter(effect => effect.effect !== "atkUp");
        
        // Add the new effect
        playerActiveItemEffects.push({
          itemType: itemType,
          effect: item.effect,
          value: item.value,
          remainingDuration: item.duration
        });
        addToBattleLog(`The effect will last for ${item.duration} turns.`);
      }
      break;
      
    case "imposter":
      // Send out an imposter to take a hit for a turn
      addToBattleLog(`${activePlayerCharacter.name} sent out a Crash Dummy imposter!`);
      showFloatingLog("Imposter deployed!");
      
      // Add visual effect - create a greyed-out blob dummy
      const imposterPlayerSprite = document.getElementById("player-sprite");
      if (imposterPlayerSprite) {
        // Create the dummy element
        const imposterElement = document.createElement("div");
        imposterElement.className = "imposter-effect";
        imposterElement.innerHTML = `<img src="/imposter.svg" alt="Imposter">`;
        
        // Style the imposter
        imposterElement.style.position = "absolute";
        imposterElement.style.zIndex = "6";
        imposterElement.style.transform = "translateX(-20px) scale(0.9)";
        imposterElement.style.opacity = "0.85";
        
        // Add to the player's area
        const playerContainer = document.getElementById("player-area");
        if (playerContainer) {
          playerContainer.appendChild(imposterElement);
          
          // Remove after visual effect completes
          setTimeout(() => {
            imposterElement.style.transform = "translateX(-40px) scale(0.8)";
            imposterElement.style.opacity = "0.6";
          }, 500);
          
          setTimeout(() => {
            if (imposterElement && imposterElement.parentNode) {
              imposterElement.remove();
            }
          }, 2000);
        }
      }
      
      // Set the duration to 1 regardless of what's in the items definition 
      // to ensure it only lasts for one hit
      
      // Remove any existing imposter effects first to prevent stacking
      playerActiveItemEffects = playerActiveItemEffects.filter(effect => effect.effect !== "imposter");
      
      // Add the new effect - always with duration 1
      playerActiveItemEffects.push({
        itemType: itemType,
        effect: item.effect,
        value: 0, // No direct value, just presence
        remainingDuration: 1 // Force to 1 so it only lasts for one hit
      });
      addToBattleLog(`The Crash Dummy will take the next hit for ${activePlayerCharacter.name}!`);
      break;
      
    case "statusCure":
      if (playerStatusEffect.type !== "normal") {
        addToBattleLog(`${activePlayerCharacter.name} was cured of ${statusEffects[playerStatusEffect.type].name}!`);
        showFloatingLog("Status cured!");
        playerStatusEffect.type = "normal";
        playerStatusEffect.duration = 0;
        updateStatusIcons();
        
        // Apply status cure animation
        if (typeof applyBuffAnimation === 'function') {
          applyBuffAnimation("water", "player"); // Using water-type animation for cure effect
        }
        
        // Small HP recovery bonus
        // Make sure maxHp is set
        activePlayerCharacter.maxHp = activePlayerCharacter.maxHp || activePlayerCharacter.hp;
        
        // Use maxHp for healing calculation
        const cureHealAmount = Math.floor(activePlayerCharacter.maxHp * 0.1);
        activePlayerCharacter.hp = Math.min(activePlayerCharacter.maxHp, activePlayerCharacter.hp + cureHealAmount);
        addToBattleLog(`${activePlayerCharacter.name} recovered ${cureHealAmount} HP!`);
        
        // Apply small heal animation after the status cure
        if (typeof applyHealAnimation === 'function') {
          setTimeout(() => applyHealAnimation("player"), 300);
        }
      } else {
        addToBattleLog(`It had no effect...`);
        showFloatingLog("No effect");
      }
      break;
  }
  
  // Update UI
  updateBattleUI();
  
  // In our new UI, both moves and items are always visible
  // This is kept for compatibility
  
  // End turn
  setTimeout(() => endPlayerTurn(), 600);
}

function switchYN() {
  // Special handling for when active character is fainted - always allow switching
  const isActiveFainted = activePlayerCharacter && activePlayerCharacter.hp <= 0;
  
  // Normal case - only allow switching during player's turn and when canAct is true
  if (!isActiveFainted && (!canAct || currentTurn !== "player")) return;
  
  // Play switch sound
  playSwitchSound();
  
  // Show switch screen with available characters
  const switchScreen = document.getElementById("switch-screen");
  const switchOptions = document.getElementById("switch-options");
  switchOptions.innerHTML = "";
  
  // Add a message at the top if the active character is fainted
  if (isActiveFainted) {
    const message = document.createElement("p");
    message.className = "switch-message";
    message.textContent = "Your character faded! Choose a new one:";
    switchOptions.appendChild(message);
  }
  
  // Check if the player has any non-fainted characters left
  const hasAvailableCharacters = playerTeam.some(character => character.hp > 0);
  
  // If no available characters, trigger game over
  if (!hasAvailableCharacters) {
    // Hide switch screen
    switchScreen.style.display = "none";
    
    // Show game over
    setTimeout(() => {
      gameActive = false;
      showGameOver(false);
    }, 500);
    
    return;
  }
  
  playerTeam.forEach((character, index) => {
    const isCurrentActive = character.id === activePlayerCharacter.id;
    const isFainted = character.hp <= 0;
    
    const option = document.createElement("div");
    option.className = `switch-option ${isFainted ? "fainted" : ""} ${isCurrentActive ? "current" : ""}`;
    
    // If character is fainted, apply greyed out style 
    let imgStyle = isFainted ? "filter: grayscale(100%) opacity(0.7);" : "";
    
    option.innerHTML = `
      <img src="${character.sprite}" alt="${character.name}" style="${imgStyle}">
      <p>${character.name}${isFainted ? " (faded)" : ""}</p>
      <div class="hp-indicator">
        <div class="hp-indicator-fill" style="width: ${isFainted ? 0 : Math.max(0, (character.hp / character.maxHp) * 100)}%"></div>
      </div>
    `;
    
    if (!isFainted && !isCurrentActive) {
      option.addEventListener("click", () => confirmSwitch(index));
    }
    
    switchOptions.appendChild(option);
  });
  
  // Only show cancel button if active character is not fainted
  const cancelButton = document.querySelector("#switch-screen button");
  if (cancelButton) {
    cancelButton.style.display = isActiveFainted ? "none" : "block";
  }
  
  switchScreen.style.display = "block";
  
  // Initialize navigation for mobile controls
  setTimeout(() => {
    if (typeof initNav === 'function') {
      console.log("Refreshing navigation after switch screen display");
      initNav();
    }
  }, 50);
}

function confirmSwitch(index) {
  // Hide switch screen
  document.getElementById("switch-screen").style.display = "none";
  
  // Play success sound
  playSuccessSound();
  
  // Get the new active character
  const newActive = playerTeam[index];
  
  // Check if this is a forced switch due to faint or a voluntary switch
  const isForced = activePlayerCharacter && activePlayerCharacter.hp <= 0;
  
  if (isForced) {
    addToBattleLog(`${newActive.name} was sent out!`);
    showFloatingLog(`Go, ${newActive.name}!`);
  } else {
    addToBattleLog(`${activePlayerCharacter.name} switched out for ${newActive.name}!`);
    showFloatingLog(`Go, ${newActive.name}!`);
  }
  
  // Update active character
  activePlayerCharacter = newActive;
  
  // Update UI
  updateBattleUI();
  updateStatusIcons();
  updateMoveButtons();
  
  // In our new UI, both moves and items are always visible
  // This is kept for compatibility with the navigation system
  
  // Check if this was after an opponent switch/faint
  if (isForced || (currentTurn === "player" && canAct)) {
    // Start the next turn after a brief delay
    setTimeout(() => {
      processTurn();
    }, 600);
  } else {
    // Normal case - end the player's turn
    setTimeout(() => endPlayerTurn(), 600);
  }
}

function cancelSwitch() {
  // If the active player character is fainted, don't allow canceling the switch
  if (activePlayerCharacter && activePlayerCharacter.hp <= 0) {
    // Show a message explaining why they must switch
    showFloatingLog("You must choose a new character!");
    return;
  }
  
  // Otherwise, hide the switch screen
  document.getElementById("switch-screen").style.display = "none";
  
  // In our new UI, both moves and items are always visible
  // This is kept for compatibility with the navigation system
  
  // If this was after an opponent switch, proceed with the battle
  if (currentTurn === "player" && canAct) {
    // Start the next turn after a brief delay
    setTimeout(() => {
      addToBattleLog(`${activePlayerCharacter.name} stays in the battle!`);
      showFloatingLog(`${activePlayerCharacter.name} is ready!`);
      processTurn();
    }, 500);
  }
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
  
  // Set game state to ensure no other actions can be performed during this transition
  canAct = false;
  
  if (allFainted) {
    // Game over - player lost
    setTimeout(() => {
      gameActive = false; // Ensure game is marked as not active
      showGameOver(false);
    }, 500);
  } else {
    // Immediately show switch screen to choose next character
    canAct = true; // Re-enable actions before showing switch screen
    switchYN(); // Show switch screen right away
  }
}

// Function to show the simplified switch prompt
function showSimpleSwitchPrompt() {
  // Set the message
  document.getElementById("simple-switch-message").textContent = 
    `Do you want to switch ${activePlayerCharacter.name} for a different character?`;
  
  // Show the popup
  document.getElementById("simple-switch-prompt").style.display = "block";
  
  // Initialize navigation for mobile controls
  setTimeout(() => {
    if (typeof initNav === 'function') {
      console.log("Refreshing navigation after simple switch prompt display");
      initNav();
    }
  }, 50);
}

// Function to handle "Yes" response to switch prompt
function handleSimpleSwitchYes() {
  // Hide the simple switch prompt
  document.getElementById("simple-switch-prompt").style.display = "none";
  
  // Show the full switch screen
  switchYN();
}

// Function to handle "No" response to switch prompt
function handleSimpleSwitchNo() {
  // Hide the simple switch prompt
  document.getElementById("simple-switch-prompt").style.display = "none";
  
  // In our new UI, both moves and items are always visible
  // This is kept for compatibility with the navigation system
  
  // Add a message to the battle log
  addToBattleLog(`${activePlayerCharacter.name} stays in the battle!`);
  
  // Start the next turn
  setTimeout(() => {
    processTurn();
  }, 600);
}

function handleOpponentFaint() {
  // Increment battle counter
  battleCounter++;
  
  addToBattleLog(`${activeOpponent.name} got faded!`);
  showFloatingLog(`${activeOpponent.name} faded!`);
  
  // Play success sound
  playSuccessSound();
  
  // Check if we've completed a fade (3 battles)
  if (battleCounter >= 3) {
    fadeCount++;
    battleCounter = 0; // Reset battle counter for next fade
    updateFadeDisplay();
    
    // Show fade completion message
    addToBattleLog(`You've completed a fade! (${fadeCount} total fades)`);
  }
  
  // Check if all opponents are defeated
  if (opponentIndex >= opponents.length - 1) {
    // Check if we've completed the current fade (3 battles)
    if (battleCounter === 0) {
      // Game over - player won and a fade was just completed
      setTimeout(() => showGameOver(true), 1000);
    } else {
      // We haven't completed a full fade yet
      setTimeout(() => {
        addToBattleLog("You need to complete a full fade (3 battles) to win!");
        
        // Reset opponents to give the player more battles to reach 3 for the fade
        opponentIndex = 0;
        
        // Automatically continue to the next battle with new opponent
        continueBattle();
      }, 1000);
    }
  } else {
    // Move to next opponent
    opponentIndex++;
    
    // Show switch option to player
    setTimeout(() => {
      addToBattleLog(`${activeOpponent.name} got faded! Next opponent is coming out!`);
      
      // Set the active opponent for the next battle
      activeOpponent = { ...opponents[opponentIndex] };
      
      // Reset battle modifiers
      resetBattleModifiers();
      
      // Update UI
      updateBattleUI();
      updateStatusIcons();
      
      // Instead of the full switch screen, show the simple switch prompt
      showSimpleSwitchPrompt();
    }, 1000);
  }
}

function showNextOpponentScreen(isFinalOpponent = false) {
  // Set up game-over screen as "continue" screen
  const gameOverScreen = document.getElementById("game-over");
  const continueButton = document.getElementById("continue-battle");
  const againButton = document.querySelector("#game-over button:not(#continue-battle)");
  
  // Check if we've completed a full fade (3 battles)
  const isFullFadeCompleted = battleCounter === 0;
  
  // Customize the message based on whether this is the final opponent
  if (isFinalOpponent) {
    const remainingBattles = 3 - battleCounter;
    document.getElementById("game-over-message").textContent = 
      `${activeOpponent.name} got faded! You need ${remainingBattles} more battle${remainingBattles !== 1 ? 's' : ''} to complete this fade!`;
  } else {
    document.getElementById("game-over-message").textContent = `${activeOpponent.name} got faded!`;
  }
  
  document.getElementById("fade-counter").textContent = `Fades: ${fadeCount}`;
  document.getElementById("win-lose-gif").src = resultGifs.win[Math.floor(Math.random() * resultGifs.win.length)];
  
  // Only show the "Next Fade" button if player has completed a full fade (3 battles)
  continueButton.style.display = isFullFadeCompleted ? "block" : "none";
  continueButton.textContent = isFullFadeCompleted ? "Next Fade" : "Continue";
  
  // For battles within a fade, show the "Continue" button instead
  if (!isFullFadeCompleted) {
    continueButton.style.display = "block";
    continueButton.textContent = "Continue";
  }
  
  againButton.style.display = "none";
  document.getElementById("share-buttons").style.display = "none";
  
  gameOverScreen.style.display = "block";
  
  // Initialize navigation for mobile controls
  setTimeout(() => {
    if (typeof initNav === 'function') {
      console.log("Refreshing navigation after next opponent screen display");
      initNav();
    }
  }, 50);
}

function showGameOver(playerWon) {
  const gameOverScreen = document.getElementById("game-over");
  const continueButton = document.getElementById("continue-battle");
  const againButton = document.querySelector("#game-over button:not(#continue-battle):not(#return-to-overworld)");
  
  // Grant XP, money, and possibly items
  grantBattleRewards(playerWon);
  
  // Play appropriate sound
  if (playerWon) {
    playSuccessSound();
    document.getElementById("game-over-message").textContent = `You won! You completed ${fadeCount} fade${fadeCount !== 1 ? 's' : ''}!`;
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
  
  // Add "Return to Overworld" button if we're in story mode
  if (currentGameMode === 'story') {
    // Create or show return button
    let returnButton = document.getElementById("return-to-overworld");
    
    if (!returnButton) {
      returnButton = document.createElement("button");
      returnButton.id = "return-to-overworld";
      returnButton.className = "pixel-button";
      returnButton.textContent = "Return to Hood";
      returnButton.style.marginTop = "10px";
      returnButton.onclick = function() {
        document.getElementById("game-over").style.display = "none";
        returnToOverworld(playerWon);
      };
      
      // Add the button to game over screen
      document.getElementById("game-over").appendChild(returnButton);
    } else {
      returnButton.style.display = "block";
    }
  }
  
  gameOverScreen.style.display = "block";
  gameActive = false;
  
  // Initialize navigation for mobile controls
  setTimeout(() => {
    if (typeof initNav === 'function') {
      console.log("Refreshing navigation after game over screen display");
      initNav();
    }
  }, 50);
}

function continueBattle() {
  document.getElementById("game-over").style.display = "none";
  
  // Play success sound
  playSuccessSound();
  
  // Heal player's team between battles
  healPlayerTeam();
  
  // If we're not at opponentIndex 0, it means we're moving to the next opponent
  // If we're at 0, it means we're starting a new series after completing all opponents
  if (opponentIndex < opponents.length - 1) {
    // Normal case: move to next opponent
    opponentIndex++;
  }
  
  // Set the active opponent
  activeOpponent = { ...opponents[opponentIndex] };
  
  // Reset battle modifiers
  resetBattleModifiers();
  
  // Update UI
  updateBattleUI();
  updateStatusIcons();
  updateMoveButtons();
  updateItemButtons();
  
  // Keep battle UI as-is - don't hide moves or items
  
  // Start battle with next opponent
  if (battleCounter > 0) {
    const remainingBattles = 3 - battleCounter;
    addToBattleLog(`${activePlayerCharacter.name} vs ${activeOpponent.name}! (${remainingBattles} more battle${remainingBattles !== 1 ? 's' : ''} to complete the fade)`);
    showFloatingLog(`New opponent: ${activeOpponent.name} (${remainingBattles} more to fade)`);
  } else {
    addToBattleLog(`${activePlayerCharacter.name} vs ${activeOpponent.name}!`);
    showFloatingLog(`New opponent: ${activeOpponent.name}`);
  }
  
  // Determine first turn
  currentTurn = determineFirstTurn();
  
  // Start the turn after a delay
  setTimeout(() => {
    processTurn();
  }, 1000);
}

// Function to heal player's team between battles
function healPlayerTeam() {
  // Heal all characters in the player's team to full health
  playerTeam.forEach(character => {
    // Restore HP to original value (even for fainted characters)
    character.hp = character.maxHp || character.hp; // Use maxHp if available, otherwise use default hp value
    
    // Clear status effects
    character.status = "normal";
    character.statusEffects = []; // Remove all status effects
    
    // Reset PP for all moves
    if (character.moves) {
      character.moves.forEach(move => {
        if (move.pp !== undefined && move.maxPp !== undefined) {
          move.pp = move.maxPp;
        }
      });
    }
  });
  
  // Reset item use counts to default values
  itemUseCounts = { jcole: 2, nbayoungboy: 2, weed: 2, crashdummy: 1 };
  
  // Apply visual heal effect to active player character
  if (activePlayerCharacter) {
    const healTeamSprite = document.getElementById("player-sprite");
    if (healTeamSprite) {
      healTeamSprite.classList.add("heal-effect");
      
      // Remove heal effect class after animation completes
      setTimeout(() => {
        healTeamSprite.classList.remove("heal-effect");
      }, 1500);
    }
  }
  
  addToBattleLog("Your team has been fully healed for the next battle!");
  showFloatingLog("Team healed!");
}

// Open shop with a specific shop inventory
function openShop(shop) {
  if (!shop) return;
  
  // Update shop UI
  document.getElementById("shop-name").textContent = shop.name;
  document.getElementById("player-money").textContent = playerInventory.money;
  
  // Populate shop items
  const shopItemsContainer = document.getElementById("shop-items-container");
  shopItemsContainer.innerHTML = "";
  
  // Check if shop has items
  if (!shop.items || shop.items.length === 0) {
    shopItemsContainer.innerHTML = "<p>This shop is currently sold out.</p>";
  } else {
    // Create item elements
    shop.items.forEach(item => {
      const itemElement = document.createElement("div");
      itemElement.className = "shop-item";
      
      // Create icon element
      const iconElement = document.createElement("div");
      iconElement.className = "shop-item-icon";
      iconElement.textContent = item.icon || "📦";
      
      // Create details element
      const detailsElement = document.createElement("div");
      detailsElement.className = "shop-item-details";
      
      // Create name element
      const nameElement = document.createElement("div");
      nameElement.className = "shop-item-name";
      nameElement.textContent = item.name;
      
      // Create description element
      const descElement = document.createElement("div");
      descElement.className = "shop-item-description";
      descElement.textContent = item.description;
      
      // Add name and description to details
      detailsElement.appendChild(nameElement);
      detailsElement.appendChild(descElement);
      
      // Create price element
      const priceElement = document.createElement("div");
      priceElement.className = "shop-item-price";
      
      // Create price text
      const priceText = document.createElement("div");
      priceText.textContent = `$${item.price}`;
      
      // Create stock text
      const stockText = document.createElement("div");
      stockText.className = "shop-item-stock";
      stockText.textContent = `Stock: ${item.stock}`;
      
      // Create buy button
      const buyButton = document.createElement("button");
      buyButton.className = "pixel-button shop-buy-button";
      buyButton.textContent = "Buy";
      buyButton.onclick = () => buyShopItem(shop, item);
      
      // Disable buy button if player can't afford
      if (playerInventory.money < item.price) {
        buyButton.disabled = true;
        buyButton.style.opacity = "0.5";
        buyButton.title = "Not enough money";
      }
      
      // Add elements to price
      priceElement.appendChild(priceText);
      priceElement.appendChild(stockText);
      priceElement.appendChild(buyButton);
      
      // Add all elements to item
      itemElement.appendChild(iconElement);
      itemElement.appendChild(detailsElement);
      itemElement.appendChild(priceElement);
      
      // Add item to container
      shopItemsContainer.appendChild(itemElement);
    });
  }
  
  // Show shop screen
  document.getElementById("shop-screen").style.display = "block";
}

// Close shop
function closeShop() {
  document.getElementById("shop-screen").style.display = "none";
}

// Buy an item from the shop
function buyShopItem(shop, item) {
  // Use the shop system to process the purchase
  const result = window.ShopSystem.buyItem(shop, item.id, playerInventory);
  
  if (result.success) {
    // Play success sound
    if (typeof playSuccessSound === 'function') playSuccessSound();
    
    // Show floating notification
    showFloatingLog(result.message);
    
    // Update money display
    document.getElementById("player-money").textContent = playerInventory.money;
    
    // Refresh shop display (items may be out of stock now)
    openShop(shop);
  } else {
    // Show error message
    showFloatingLog(result.message);
  }
}

// Apply level up to a character
function handleCharacterLevelUp(character, levelUpResult) {
  if (!character || !levelUpResult) return;
  
  // Show level up notification
  const levelUpContent = document.getElementById("level-up-content");
  
  // Build level up content
  let contentHTML = `
    <div class="level-up-header">
      <p><strong>${character.name}</strong> reached level ${character.level}!</p>
    </div>
    <div class="level-up-stat">
      <span class="level-up-stat-name">Level</span>
      <span class="stat-increase">${character.level}</span>
    </div>
    <div class="level-up-stat">
      <span class="level-up-stat-name">XP</span>
      <span>${character.currentXP} / ${levelUpResult.nextLevelXP}</span>
    </div>
  `;
  
  // If new moves were unlocked, display them
  if (levelUpResult.newMoves && levelUpResult.newMoves.length > 0) {
    levelUpResult.newMoves.forEach(move => {
      contentHTML += `
        <div class="new-move">
          <strong>New Move Unlocked:</strong> ${move.name}
        </div>
      `;
    });
  }
  
  // Update content and show notification
  levelUpContent.innerHTML = contentHTML;
  document.getElementById("level-up-notification").style.display = "block";
  
  // Play success sound
  if (typeof playSuccessSound === 'function') playSuccessSound();
}

// Grant battle rewards (XP, items, money)
function grantBattleRewards(wasVictorious) {
  // Calculate base money reward
  const moneyReward = wasVictorious ? 
    50 + (activeOpponent.level || 1) * 10 : 
    Math.floor((25 + (activeOpponent.level || 1) * 5) * 0.5);
  
  // Add money to inventory
  playerInventory.money += moneyReward;
  
  // Calculate XP for each character in the team
  playerTeam.forEach(character => {
    // Initialize level properties if not already set
    window.LevelSystem.initializeCharacterLevel(character);
    
    // Calculate XP based on opponent level and victory status
    const xpGained = window.LevelSystem.calculateBattleXP(
      activeOpponent.level || 1, 
      wasVictorious,
      wasVictorious ? 1 : 0  // One knockout for victory, none for loss
    );
    
    // Grant XP to character
    const levelUpResult = window.LevelSystem.grantXP(character, xpGained);
    
    // If character leveled up, show notification
    if (levelUpResult && levelUpResult.leveledUp) {
      // Queue level up notifications to show after battle ends
      setTimeout(() => {
        handleCharacterLevelUp(character, levelUpResult);
      }, 1500);
    }
    
    // Log XP gain to battle log
    addToBattleLog(`${character.name} gained ${xpGained} XP!`);
  });
  
  // Log money reward
  addToBattleLog(`You got $${moneyReward}!`);
  
  // Chance for item drop (only if victorious)
  if (wasVictorious && Math.random() < 0.3) {
    // Define possible drops (basic items)
    const possibleDrops = [
      { id: 'weed', name: 'Weed', type: 'consumable', effect: 'statusCure', hpBoost: 10, count: 1, icon: '🌿', description: 'Cures status effects and restores a small amount of HP' },
      { id: 'energy_drink', name: 'Energy Drink', type: 'consumable', effect: 'healing', hpBoost: 30, count: 1, icon: '🥤', description: 'Restores 30 HP to a character' }
    ];
    
    // Select random drop
    const drop = possibleDrops[Math.floor(Math.random() * possibleDrops.length)];
    
    // Add to inventory
    window.InventorySystem.addItemToInventory(playerInventory, drop);
    
    // Log item drop
    addToBattleLog(`Found item: ${drop.name}!`);
  }
}

function restartGame() {
  // Reset everything
  document.getElementById("game-over").style.display = "none";
  document.getElementById("battle-screen").style.display = "none";
  document.getElementById("selection-screen").style.display = "block";
  document.getElementById("shop-screen").style.display = "none";
  document.getElementById("level-up-notification").style.display = "none";
  
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
  
  // Reset inventory and shops
  playerInventory = window.InventorySystem.createPlayerInventory();
  
  // Restock shops
  gameShops = {
    cornerStore: window.ShopSystem.createShopInventory(window.ShopSystem.SHOP_TYPES.CORNER_STORE),
    theTrap: window.ShopSystem.createShopInventory(window.ShopSystem.SHOP_TYPES.THE_TRAP),
    cloutDealer: window.ShopSystem.createShopInventory(window.ShopSystem.SHOP_TYPES.CLOUT_DEALER),
    popUpVan: window.ShopSystem.createShopInventory(window.ShopSystem.SHOP_TYPES.POP_UP_VAN)
  };
  
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

function addToBattleLog(text, dialogueType = null, context = {}, character = null) {
  // Add urban slang flavor if dialogue type is provided and BattleDialogue is loaded
  let displayText = text;
  
  if (dialogueType && window.BattleDialogue) {
    try {
      // Generate urban dialogue based on the dialogue type and context
      const urbanDialogue = window.BattleDialogue.generateBattleDialogue(dialogueType, context);
      
      // Format dialogue with character-specific styling
      const formattedDialogue = window.BattleDialogue.formatDialogue(character, urbanDialogue);
      
      // Add the original message plus the urban dialogue
      displayText = `${text}\n${formattedDialogue}`;
    } catch (error) {
      console.log("Error generating battle dialogue:", error);
      // Keep the original text if there's an error
    }
  }
  
  // Create a timestamp for the entry
  const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}).replace(/AM|PM/, '');
  
  // Format the entry with timestamp and maintain multiline formatting
  const formattedEntry = `[${timestamp}] ${displayText}`;
  
  // Update the battle log text element with the new entry and preserve previous entries
  const battleLogTextElement = document.getElementById("battle-log-text");
  
  // If there's existing content, add line breaks to clearly separate entries
  if (battleLogTextElement.textContent.trim() !== "") {
    battleLogTextElement.textContent = battleLogTextElement.textContent + "\n\n" + formattedEntry;
  } else {
    battleLogTextElement.textContent = formattedEntry;
  }
  
  // Keep only the last 15 entries to prevent overflow, but respect multiline entries
  const logEntries = battleLogTextElement.textContent.split("\n\n");
  if (logEntries.length > 15) {
    battleLogTextElement.textContent = logEntries.slice(logEntries.length - 15).join("\n\n");
  }
  
  // Auto-scroll battle log text to the newest entry
  battleLogTextElement.scrollTop = battleLogTextElement.scrollHeight;
  
  // Also keep the old battle log for compatibility and browsing history
  const battleLogElement = document.getElementById("battle-log");
  if (battleLogElement) {
    const entry = document.createElement("div");
    entry.className = "log-entry";
    
    // Use innerHTML to preserve line breaks in the log entry
    entry.innerHTML = displayText.replace(/\n/g, "<br>");
    
    battleLogElement.appendChild(entry);
    
    // Auto-scroll to bottom
    battleLogElement.scrollTop = battleLogElement.scrollHeight;
    
    // Limit entries to prevent excessive memory usage (keep last 50 entries)
    while (battleLogElement.children.length > 50) {
      battleLogElement.removeChild(battleLogElement.children[0]);
    }
  }
  
  // Also store in array for history
  battleLog.push(displayText);
}

function showFloatingLog(text, duration = 2000) {
  const floatingLog = document.getElementById("floating-log");
  floatingLog.textContent = text;
  floatingLog.classList.add("visible");
  
  // Clear any existing timeout
  if (window.floatingLogTimeout) {
    clearTimeout(window.floatingLogTimeout);
  }
  
  // Hide after the specified duration (default 2000ms)
  window.floatingLogTimeout = setTimeout(() => {
    floatingLog.classList.remove("visible");
  }, duration);
}

function share(platform) {
  const message = `I just played Squabblemon - Retro Fade v2 and got ${fadeCount} fade${fadeCount !== 1 ? 's' : ''}!`;
  
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