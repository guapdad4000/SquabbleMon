// NPC Sprites for Squabblemon
// This file contains URL references to NPC sprites to avoid local path issues

const NPC_SPRITES = {
  // Main NPCs
  hood_kid: {
    name: "Hood Kid",
    sprite: "https://i.imgur.com/G3xfSjU.png", // Urban kid sprite
    description: "A young kid from the hood, streetwise beyond their years.",
  },

  trap_master: {
    name: "Trap Master",
    sprite: "https://i.imgur.com/UkE9crR.png", // Business guy sprite
    description: "The owner of the Trap House, always ready for a battle.",
  },

  momma: {
    name: "Big Momma",
    sprite: "https://i.imgur.com/fgArxwB.png", // Motherly figure
    description:
      "The neighborhood matriarch who keeps everyone fed and healthy.",
  },

  corner_clerk: {
    name: "Corner Clerk",
    sprite: "https://i.imgur.com/q0vYI2v.png", // Store clerk
    description: "Runs the corner store. Has all the goods you need.",
  },

  opps_leader: {
    name: "Opps Leader",
    sprite: "https://i.imgur.com/6Lxu0PY.png", // Tough character
    description: "Leader of the rival gang. Approach with caution.",
  },

  // Generic NPCs
  street_hustler: {
    name: "Street Hustler",
    sprite: "https://i.imgur.com/qRtemtQ.png", // Casual urban character
    description: "Always working an angle, selling something.",
  },

  beat_boxer: {
    name: "Beat Boxer",
    sprite: "https://i.imgur.com/2n71aSJ.png", // Cool character
    description: "Drops beats and battles on the street corners.",
  },

  fitness_trainer: {
    name: "Fitness Trainer",
    sprite: "https://i.imgur.com/YeMI4sr.png", // Fitness character
    description: "Keeps the neighborhood in shape, ready for fade battles.",
  },

  rasta_elder: {
    name: "Rasta Elder",
    sprite: "https://i.imgur.com/dZWWrrs.png", // Rasta character
    description: "Wise and peaceful, but don't mistake kindness for weakness.",
  },

  hacker_kid: {
    name: "Hacker Kid",
    sprite: "https://i.imgur.com/m7Rup7S.png", // Tech character
    description: "Young tech genius, spreading knowledge in the hood.",
  },
};

// Export for use in game
if (typeof module !== "undefined" && module.exports) {
  module.exports = { NPC_SPRITES };
}
