// This is a shim for running the game in Node.js
// It imports the browser-compatible script.js and handles the environment differences

// Create a mock DOM element factory
function createMockElement(tag) {
  return {
    tagName: tag,
    className: "",
    id: "",
    style: new Proxy(
      {},
      {
        get: function (target, prop) {
          return "";
        },
        set: function (target, prop, value) {
          return true;
        },
      },
    ),
    dataset: {},
    children: [],
    addEventListener: function (event, callback) {
      console.log(`[Node.js] Element event listener registered for: ${event}`);
    },
    appendChild: function (child) {
      this.children.push(child);
      return child;
    },
    removeChild: function (child) {
      const index = this.children.indexOf(child);
      if (index > -1) {
        this.children.splice(index, 1);
      }
      return child;
    },
    querySelector: function (selector) {
      console.log(`[Node.js] Element querySelector called with: ${selector}`);
      return createMockElement("div");
    },
    querySelectorAll: function (selector) {
      console.log(
        `[Node.js] Element querySelectorAll called with: ${selector}`,
      );
      return [];
    },
    getAttribute: function (name) {
      return null;
    },
    setAttribute: function (name, value) {},
    classList: {
      add: function () {},
      remove: function () {},
      toggle: function () {},
      contains: function () {
        return false;
      },
    },
  };
}

// Create a minimal DOM environment for Node.js
global.document = {
  addEventListener: function (event, callback) {
    console.log(`[Node.js] Document event listener registered for: ${event}`);
    if (event === "DOMContentLoaded") {
      // Execute the callback immediately in Node.js
      setTimeout(callback, 0);
    }
  },
  createElement: function (tagName) {
    console.log(`[Node.js] Created element: ${tagName}`);
    return createMockElement(tagName);
  },
  getElementById: function (id) {
    console.log(`[Node.js] getElementById called for: ${id}`);
    const el = createMockElement("div");
    el.id = id;
    return el;
  },
  querySelector: function (selector) {
    console.log(`[Node.js] querySelector called for: ${selector}`);
    return createMockElement("div");
  },
  querySelectorAll: function (selector) {
    console.log(`[Node.js] querySelectorAll called for: ${selector}`);
    return [];
  },
  body: createMockElement("body"),
  documentElement: createMockElement("html"),
};

global.navigator = {
  userAgent: "node.js",
  language: "en-US",
};

global.window = {
  addEventListener: function (event, callback) {
    console.log(`[Node.js] Window event listener registered for: ${event}`);
  },
  location: {
    href: "http://localhost",
    search: "",
    hash: "",
    pathname: "/",
  },
  innerWidth: 1024,
  innerHeight: 768,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: setInterval,
  clearInterval: clearInterval,
  console: console,
  SpriteManager: {
    updatePlayerSprite: function () {},
    updateNpcSprite: function () {},
    preloadSprites: function () {},
  },
};

global.Image = function () {
  const img = {
    src: "",
    onload: null,
    onerror: null,
    width: 64,
    height: 64,
    complete: true,
    naturalWidth: 64,
    naturalHeight: 64,
  };
  setTimeout(() => {
    if (img.onload) img.onload();
  }, 10);
  return img;
};

global.Audio = function () {
  return {
    src: "",
    play: function () {
      console.log("[Node.js] Audio play called");
      return Promise.resolve();
    },
    pause: function () {
      console.log("[Node.js] Audio pause called");
    },
    addEventListener: function (event, callback) {},
    removeEventListener: function (event, callback) {},
    loop: false,
    volume: 1.0,
  };
};

global.HTMLAudioElement = global.Audio;

global.fetch = function (url) {
  console.log(`[Node.js] fetch called for: ${url}`);
  return Promise.resolve({
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(""),
    ok: true,
  });
};

// Add some extra globals to avoid errors
global.alert = function (msg) {
  console.log(`[Node.js] Alert: ${msg}`);
};

global.localStorage = {
  getItem: function (key) {
    return null;
  },
  setItem: function (key, value) {},
  removeItem: function (key) {},
  clear: function () {},
};

global.sessionStorage = { ...global.localStorage };

// Define missing browser APIs
global.MutationObserver = class MutationObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {
    console.log("[Node.js] MutationObserver.observe called");
  }
  disconnect() {
    console.log("[Node.js] MutationObserver.disconnect called");
  }
};

global.XMLHttpRequest = class XMLHttpRequest {
  open() {}
  send() {}
  setRequestHeader() {}
};

global.DOMParser = class DOMParser {
  parseFromString(text, mime) {
    return createMockElement("div");
  }
};

// Export a basic SpriteManager to the window object
global.window.SpriteManager = {
  preloadSprites: function () {
    console.log("[Node.js] SpriteManager.preloadSprites called");
  },

  updatePlayerSprite: function (
    playerElement,
    direction,
    isMoving = false,
    characterSprite = null,
  ) {
    console.log(
      `[Node.js] SpriteManager.updatePlayerSprite called: ${direction}, moving: ${isMoving}`,
    );
  },

  updateNpcSprite: function (npcElement, npcData) {
    console.log(
      `[Node.js] SpriteManager.updateNpcSprite called for NPC: ${npcData?.name || "unknown"}`,
    );
  },

  getGameSpriteUrl: function (spritePath) {
    return spritePath || "";
  },
};

// Import the main script and run it
console.log("Starting game in Node.js environment...");
console.log(
  "This is a server-side test run. For the full game experience, use the Start Game workflow.",
);

// Import the actual script with a better error handler
import("./script.js")
  .then(() => {
    console.log("[Node.js] Game script imported successfully");
    console.log(
      "Game initialization complete. Run the Start Game workflow for the real game experience.",
    );
  })
  .catch((err) => {
    console.error("[Node.js] Error importing game script:", err.message);

    // If error occurs at a specific line, show more details
    if (err.stack) {
      const stackLines = err.stack.split("\n");
      const fileLines = stackLines.filter((line) =>
        line.includes("script.js:"),
      );
      if (fileLines.length > 0) {
        console.error("Error location:", fileLines[0].trim());
      }
    }
  });
