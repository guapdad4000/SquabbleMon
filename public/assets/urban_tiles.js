// Urban Tiles and Decorations for Squabblemon
// This file contains basic ASCII art representations of urban elements
// that can be used until proper pixel art is created

const URBAN_TILES = {
  // Buildings
  TRAP_HOUSE: {
    name: "Trap House",
    ascii: [
      "┌─────────┐",
      "│ ▓▓▓▓▓▓▓ │",
      "│ ▓ ▓▓▓ ▓ │",
      "│ ▓ ▓▓▓ ▓ │",
      "│ ▓▓▓▓▓▓▓ │",
      "│▒▒▒┌─┐▒▒▒│",
      "│▒▒▒│ │▒▒▒│",
      "└───┘ └───┘"
    ],
    color: "#8B4513", // brown
    description: "The notorious Trap House, where deals are made and battles happen."
  },
  
  MOMMAS_KITCHEN: {
    name: "Momma's Kitchen",
    ascii: [
      "┌───────┐",
      "│▓▓▓▓▓▓▓│",
      "│▓╔═╗▓▓▓│",
      "│▓║▓║▓▓▓│",
      "│▓╚═╝▓▓▓│",
      "│▒▒┌─┐▒▒│",
      "│▒▒│ │▒▒│",
      "└──┘ └──┘"
    ],
    color: "#FF6347", // tomato red
    description: "Momma's Kitchen, where you can heal up and get warm food."
  },
  
  CORNER_STORE: {
    name: "Corner Store",
    ascii: [
      "┌────────┐",
      "│▓▓▓▓▓▓▓▓│",
      "│▓╔══╗▓▓▓│",
      "│▓║24║▓▓▓│",
      "│▓╚══╝▓▓▓│",
      "│▒▒┌──┐▒▒│",
      "│▒▒│  │▒▒│",
      "└──┘  └──┘"
    ],
    color: "#4682B4", // steel blue
    description: "The corner store, where you can buy items and supplies."
  },
  
  THE_OPPS_TERRITORY: {
    name: "The Opps Territory",
    ascii: [
      "┌───────────┐",
      "│▓▓▓▓▓▓▓▓▓▓▓│",
      "│▓▓▓⚠️▓▓▓▓▓▓│",
      "│▓▓▓▓▓▓▓▓▓▓▓│",
      "│▓▓▓▓▓▓▓▓▓▓▓│",
      "│▒▒┌───┐▒▒▒▒│",
      "│▒▒│   │▒▒▒▒│",
      "└──┘   └────┘"
    ],
    color: "#8B0000", // dark red
    description: "The Opps Territory, where rival gangs hang out. Danger zone."
  },
  
  FADE_PARK: {
    name: "Fade Park",
    ascii: [
      "┌───────┐",
      "│  ♣♣♣  │",
      "│ ♣♣♣♣♣ │",
      "│♣♣♣♣♣♣♣│",
      "│ ♣♣♣♣♣ │",
      "│  ♣♣♣  │",
      "│       │",
      "└───────┘"
    ],
    color: "#228B22", // forest green
    description: "Fade Park, a place to settle scores in the open."
  },
  
  // Street elements
  STREET_HORIZONTAL: {
    name: "Street (Horizontal)",
    ascii: [
      "═════════",
      "═════════",
      "─  ─  ─  ",
      "         ",
      "─  ─  ─  ",
      "═════════",
      "═════════"
    ],
    color: "#696969", // dim gray
    description: "A horizontal street section."
  },
  
  STREET_VERTICAL: {
    name: "Street (Vertical)",
    ascii: [
      "║     ║",
      "║     ║",
      "║  │  ║",
      "║     ║",
      "║  │  ║",
      "║     ║",
      "║     ║"
    ],
    color: "#696969", // dim gray
    description: "A vertical street section."
  },
  
  STREET_INTERSECTION: {
    name: "Street Intersection",
    ascii: [
      "║     ║",
      "║     ║",
      "═══╬═══",
      "     │ ",
      "═══╬═══",
      "║     ║",
      "║     ║"
    ],
    color: "#696969", // dim gray
    description: "A street intersection."
  },
  
  // Small decorations
  TRASH_CAN: {
    name: "Trash Can",
    ascii: [
      "┌───┐",
      "│╲╱╲│",
      "│╱╲╱│",
      "└───┘"
    ],
    color: "#808080", // gray
    description: "A trash can on the sidewalk."
  },
  
  STREET_LIGHT: {
    name: "Street Light",
    ascii: [
      "┌○┐",
      "│ │",
      "│ │",
      "┴─┴"
    ],
    color: "#FFD700", // gold
    description: "A street light to illuminate the area."
  },
  
  BENCH: {
    name: "Bench",
    ascii: [
      "┌───┐",
      "├───┤",
      "│   │",
      "┴┴┴┴┴"
    ],
    color: "#CD853F", // peru
    description: "A bench to sit on."
  },
  
  FIRE_HYDRANT: {
    name: "Fire Hydrant",
    ascii: [
      " ┌─┐ ",
      "┌┘ └┐",
      "└┐ ┌┘",
      " └─┘ "
    ],
    color: "#FF0000", // red
    description: "A fire hydrant on the sidewalk."
  },
  
  BASKETBALL_HOOP: {
    name: "Basketball Hoop",
    ascii: [
      " ┌───┐ ",
      " │ □ │ ",
      " └┐ ┌┘ ",
      "  │ │  "
    ],
    color: "#FFA500", // orange
    description: "A basketball hoop in the park."
  }
};

// Export for use in game
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { URBAN_TILES };
}