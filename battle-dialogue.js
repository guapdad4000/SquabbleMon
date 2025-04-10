// Randomized Battle Dialogue Generator with Urban Slang
// This module adds dynamic, culturally-relevant dialogue to battle sequences

// Common phrases used at the start of a battle
const battleStartPhrases = [
  "It's about to go down!",
  "Time to shine like new money!",
  "Let's get this bread!",
  "Straight fire battle incoming!",
  "You ain't ready for what's about to happen!",
  "This 'bout to be lit AF!",
  "Flex on 'em!",
  "Let's show 'em how we do!",
  "The vibe is immaculate right now!",
  "No cap, this battle's gonna be legendary!",
  "We outside and ready to battle!",
  "It's giving winner energy!",
  "Main character energy activated!",
  "It's the moment we've all been waiting for!",
];

// Phrases for when a player attacks
const attackPhrases = {
  normal: [
    "Coming through with that heat!",
    "Bussin' moves right now!",
    "That's how we do it!",
    "Catch these hands!",
    "Serving up some pressure!",
    "All gas, no brakes!",
    "Stay in your lane!",
    "Straight disrespectful with that move!",
    "Just like that!",
    "We really outside with these moves!",
    "That's just facts!",
    "This attack is hitting different!",
    "No printer, just fax!",
    "Talk to 'em!",
    "It's giving power moves!",
  ],
  critical: [
    "SHEESH! That's a violation!",
    "Absolutely cooked 'em!",
    "That one's gonna leave a mark!",
    "NO CHILL WHATSOEVER!",
    "Just ended their whole career!",
    "Caught 'em lacking!",
    "That's a big yikes!",
    "On God, that was brutal!",
    "Cleared them like my browser history!",
    "DEAD. STRAIGHT UP DEAD!",
    "That hit was BUSSIN BUSSIN!",
    "THAT'S A VIOLATION AND A HALF!",
    "RIP in the chat!",
    "That's what you call a critical hit!",
    "Sent them to the shadow realm!",
  ],
  weak: [
    "That ain't it, chief...",
    "Barely a scratch, no cap!",
    "Gonna need more than that!",
    "That's mid at best.",
    "Call that a light tap!",
    "They eating that like a snack!",
    "Need to come harder than that!",
    "Not even close to enough!",
    "That's giving bare minimum energy.",
    "Down bad with that weak attack!",
    "Putting no numbers on the board!",
    "My grandma hits harder than that!",
    "Call that a paper cut at best!",
    "You can't be serious with that!",
    "I know they ain't just try that weak move!",
  ],
  miss: [
    "Swing and a miss!",
    "Not even close!",
    "Couldn't hit the broad side of a barn!",
    "Air ball! AIR BALL!",
    "You need glasses or something?",
    "That move ghosted you!",
    "Matrix dodged that one!",
    "That's embarrassing!",
    "Whiffed it completely!",
    "Big yikes on that aim!",
  ],
};

// Reactions to getting hit
const hitReactionPhrases = {
  normal: [
    "That's cold!",
    "Didn't see that coming!",
    "Taking hits but still in the game!",
    "Shake it off!",
    "Is that all you got?",
    "That stung a bit!",
    "I'm good, I'm good!",
    "Nice try!",
  ],
  critical: [
    "YOOOO! That was dirty!",
    "Feeling real disrespected right now!",
    "That one's gonna leave a mark!",
    "Caught me slipping!",
    "Not the combo!",
    "That's actually crazy!",
    "The audacity!",
    "Emotional damage!",
  ],
  resisted: [
    "That's light work!",
    "Call that a love tap!",
    "You thought that would hurt?",
    "Try harder next time!",
    "That's cute!",
    "I eat those for breakfast!",
    "Couldn't be me taking damage from that!",
    "Is that supposed to hurt?",
  ],
};

// Status effect dialogue
const statusEffectPhrases = {
  confused: [
    "What's the GPS coordinates?",
    "Brain.exe has stopped working!",
    "Which way is up right now?",
    "The math ain't mathing!",
    "Too zooted to function!",
    "It's giving confusion!",
    "The vibes are off!",
    "Can't even think straight!",
  ],
  poisoned: [
    "That's toxic!",
    "Not the poison!",
    "This ain't it chief!",
    "System contaminated!",
    "That's foul play!",
    "Need some milk!",
    "Feeling green right now!",
    "Who put something in my drink?",
  ],
  paralyzed: [
    "Can't move, no cap!",
    "Glitched out!",
    "System.exe has crashed!",
    "Stuck like I'm buffering!",
    "It's giving statue vibes!",
    "Lagging IRL!",
    "Connection issues!",
    "Someone hit my reset button!",
  ],
  sleep: [
    "Catching these Z's mid-battle!",
    "It's nap time!",
    "Sleep mode activated!",
    "Knocked all the way out!",
    "Dreamland express!",
    "Someone hit the snooze!",
    "That's a hard reset!",
    "Night night!",
  ],
};

// Healing and buff dialogue
const buffPhrases = {
  heal: [
    "Back in the game!",
    "Feeling brand new!",
    "That's that good medicine!",
    "Health bar looking right!",
    "Rejuvenated!",
    "That hit different!",
    "We back and better!",
    "That's that good good!",
  ],
  attackUp: [
    "Power levels rising!",
    "Just built different now!",
    "Time to go sicko mode!",
    "Attack stat BUSSIN!",
    "Damage about to be disrespectful!",
    "Hitting gym paid off!",
    "Strength increase activated!",
    "About to catch a body!",
  ],
  defenseUp: [
    "Shield gang activated!",
    "Armor on point!",
    "Built like a brick house now!",
    "Tank mode engaged!",
    "Try breaking through this!",
    "Defense on swole!",
    "You can't hurt me now!",
    "Fortified and ready!",
  ],
  speedUp: [
    "Zooming like that!",
    "Speed demon activated!",
    "Can't even see me move!",
    "Quick with it!",
    "Nyoom!",
    "Moving at the speed of light!",
    "Too fast to track!",
    "Sonic WHO?",
  ],
};

// Victory phrases
const victoryPhrases = [
  "GG EZ!",
  "Get rekt!",
  "That's how we do it!",
  "ALL THE WAY UP!",
  "Easy money!",
  "Take that L!",
  "That was light work!",
  "We stay winning!",
  "You weren't ready for the smoke!",
  "And that's on period!",
  "Victory secured, as expected!",
  "The outcome was never in question!",
  "Didn't even break a sweat!",
  "That's just how I'm built!",
];

// Defeat phrases
const defeatPhrases = [
  "This ain't it...",
  "We move still.",
  "Caught an L today.",
  "That's tough...",
  "Back to the drawing board.",
  "Pain. Just pain.",
  "Not me taking an L like this!",
  "Down bad right now.",
  "Wasn't my day.",
  "I was lagging bro!",
  "Run it back!",
  "That's actually crazy!",
  "This game is rigged!",
  "I wasn't even trying for real.",
];

// Get random phrase from an array
function getRandomPhrase(phraseArray) {
  const randomIndex = Math.floor(Math.random() * phraseArray.length);
  return phraseArray[randomIndex];
}

// Generate dialogue for battle actions
function generateBattleDialogue(action, context = {}) {
  // Ensure context is an object
  context = context || {};

  switch (action) {
    case "battle-start":
      return getRandomPhrase(battleStartPhrases);

    case "attack":
      if (context.missed || context.effectiveness === "miss") {
        return getRandomPhrase(attackPhrases.miss);
      } else if (context.effectiveness === "critical" || context.isCritical) {
        return getRandomPhrase(attackPhrases.critical);
      } else if (
        context.effectiveness === "weak" ||
        (context.damage !== undefined && context.damage < 10)
      ) {
        return getRandomPhrase(attackPhrases.weak);
      } else {
        return getRandomPhrase(attackPhrases.normal);
      }

    case "hit-reaction":
      if (context.effectiveness === "critical" || context.isCritical) {
        return getRandomPhrase(hitReactionPhrases.critical);
      } else if (
        context.effectiveness === "resisted" ||
        (context.damage !== undefined && context.damage < 5)
      ) {
        return getRandomPhrase(hitReactionPhrases.resisted);
      } else {
        return getRandomPhrase(hitReactionPhrases.normal);
      }

    case "status-effect":
      if (context.type && statusEffectPhrases[context.type]) {
        return getRandomPhrase(statusEffectPhrases[context.type]);
      }
      return getRandomPhrase(statusEffectPhrases.confused); // Default to confused

    case "heal":
      return getRandomPhrase(buffPhrases.heal);

    case "buff":
      if (context.stat === "attack") {
        return getRandomPhrase(buffPhrases.attackUp);
      } else if (context.stat === "defense") {
        return getRandomPhrase(buffPhrases.defenseUp);
      } else if (context.stat === "speed") {
        return getRandomPhrase(buffPhrases.speedUp);
      }
      return getRandomPhrase(buffPhrases.attackUp); // Default to attack

    case "miss":
      return getRandomPhrase(attackPhrases.miss);

    case "switch":
      return "Switching it up! New challenger approaching!";

    case "item-use":
      return "Using that item strategically!";

    case "victory":
      return getRandomPhrase(victoryPhrases);

    case "defeat":
      return getRandomPhrase(defeatPhrases);

    case "faint":
      return "Completely bodied! Down for the count!";

    default:
      return "Let's go!"; // Default phrase
  }
}

// Character actions based on type
const characterActions = {
  tech: [
    "*adjusts glasses*",
    "*types rapidly*",
    "*scrolls through phone*",
    "*hacks the mainframe*",
    "*pushes up glasses*",
  ],
  hiphop: [
    "*drops mic*",
    "*spins on head*",
    "*does the shoot dance*",
    "*makes it rain*",
    "*hits the woah*",
  ],
  street: [
    "*throws up gang sign*",
    "*mean mugs*",
    "*flexes*",
    "*pops collar*",
    "*does the two-step*",
  ],
  urban: [
    "*poses*",
    "*flips hair*",
    "*struts*",
    "*snaps fingers*",
    "*straightens fit*",
  ],
};

// Character-specific dialogue formatting
function formatDialogue(character, dialogue) {
  if (!character) return dialogue;

  // Get random action for character type
  const getRandomAction = (type) => {
    if (!characterActions[type]) return "";
    const actions = characterActions[type];
    return actions[Math.floor(Math.random() * actions.length)];
  };

  // For certain character types, we can modify the dialogue style
  if (character.type && characterActions[character.type]) {
    const action = getRandomAction(character.type);
    return `"${dialogue}" ${action}`;
  }

  return `"${dialogue}"`;
}

// Move type descriptions
const moveTypeDescriptions = {
  street: [
    "[Street Certified]",
    "[Hood Classic]",
    "[Street Cred]",
    "[Block Hot]",
    "[Streets Talking]",
  ],
  hiphop: [
    "[Bars]",
    "[Straight Fire]",
    "[Mic Drop]",
    "[Flow Master]",
    "[Beat Killer]",
  ],
  tech: ["[Tech]", "[Digital]", "[Algorithm]", "[Megabyte]", "[Cyber]"],
  urban: [
    "[Urban Legend]",
    "[City Style]",
    "[Metropolitan]",
    "[Downtown]",
    "[Urban Jungle]",
  ],
};

// Add character flavor to move descriptions
function enhanceMoveName(move) {
  if (!move) return "";

  // Get random description for move type
  const getRandomDesc = (type) => {
    if (!moveTypeDescriptions[type]) return "";
    const descriptions = moveTypeDescriptions[type];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  };

  // Add urban flavor to move names for display purposes
  if (move.type && moveTypeDescriptions[move.type]) {
    const typeDesc = getRandomDesc(move.type);
    return `${move.name} ${typeDesc}`;
  }

  return move.name;
}

// Export functions
window.BattleDialogue = {
  generateBattleDialogue,
  formatDialogue,
  enhanceMoveName,
};
