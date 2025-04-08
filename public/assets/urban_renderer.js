// Urban Tile Renderer
// This renderer translates ASCII art urban tiles into graphical elements
// on the game's 32x32 pixel grid

const URBAN_RENDERER = (function() {
  // Internal cache for rendered elements
  const cachedTiles = {};
  
  // Convert ASCII art to a grid of colored divs
  function renderAsciiToHTML(asciiArt, color, scale = 1) {
    // Create main container
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gridTemplateRows = `repeat(${asciiArt.length}, ${scale}px)`;
    container.style.gridTemplateColumns = `repeat(${asciiArt[0].length}, ${scale}px)`;
    container.style.width = `${asciiArt[0].length * scale}px`;
    container.style.height = `${asciiArt.length * scale}px`;
    
    // Process each character in the ASCII art
    for (let y = 0; y < asciiArt.length; y++) {
      for (let x = 0; x < asciiArt[y].length; x++) {
        const char = asciiArt[y][x];
        const pixel = document.createElement('div');
        
        // Style the pixel based on the character
        pixel.style.width = `${scale}px`;
        pixel.style.height = `${scale}px`;
        
        // Map ASCII characters to visual styles
        switch (char) {
          case '█': // Solid block
            pixel.style.backgroundColor = color;
            pixel.style.opacity = '1.0';
            break;
          case '▓': // Dark shade
            pixel.style.backgroundColor = color;
            pixel.style.opacity = '0.8';
            break;
          case '▒': // Medium shade
            pixel.style.backgroundColor = color;
            pixel.style.opacity = '0.6';
            break;
          case '░': // Light shade
            pixel.style.backgroundColor = color;
            pixel.style.opacity = '0.3';
            break;
          case '╔': case '╗': case '╚': case '╝': 
          case '═': case '║': case '╬': // Box drawing
            pixel.style.backgroundColor = '#000000';
            pixel.style.opacity = '0.8';
            break;
          case '┌': case '┐': case '└': case '┘': 
          case '─': case '│': case '┼': case '┬': 
          case '┴': case '├': case '┤': // Light box drawing
            pixel.style.backgroundColor = '#000000';
            pixel.style.opacity = '0.6';
            break;
          case '○': // Circle
            pixel.style.backgroundColor = '#FFFFFF';
            pixel.style.opacity = '0.9';
            pixel.style.borderRadius = '50%';
            break;
          case '♣': // Club (for trees/foliage)
            pixel.style.backgroundColor = '#006400'; // Dark green
            pixel.style.opacity = '0.8';
            pixel.style.borderRadius = '40%';
            break;
          case '⚠️': // Warning
            pixel.style.backgroundColor = '#FFD700'; // Gold
            pixel.style.opacity = '0.9';
            break;
          case '□': // Square
            pixel.style.backgroundColor = color;
            pixel.style.opacity = '0.7';
            pixel.style.border = '1px solid black';
            break;
          case ' ': // Empty space
            // Skip or make transparent
            break;
          default:
            // Handle text and other characters
            if (/[0-9A-Za-z]/.test(char)) {
              pixel.style.backgroundColor = '#000000';
              pixel.style.color = '#FFFFFF';
              pixel.style.fontSize = `${scale}px`;
              pixel.style.lineHeight = `${scale}px`;
              pixel.style.textAlign = 'center';
              pixel.innerText = char;
              pixel.style.opacity = '0.9';
            }
        }
        
        container.appendChild(pixel);
      }
    }
    
    return container;
  }
  
  // Create a tile for the game grid
  function createTile(tileType, size = 32) {
    // Check if we've already cached this tile
    const cacheKey = `${tileType}_${size}`;
    if (cachedTiles[cacheKey]) {
      return cachedTiles[cacheKey].cloneNode(true);
    }
    
    // Get tile definition from URBAN_TILES
    const tileDefinition = URBAN_TILES[tileType];
    if (!tileDefinition) {
      console.error(`Tile type '${tileType}' not found in URBAN_TILES`);
      // Create fallback tile
      const fallbackTile = document.createElement('div');
      fallbackTile.style.width = `${size}px`;
      fallbackTile.style.height = `${size}px`;
      fallbackTile.style.backgroundColor = '#FF00FF'; // Magenta for missing tiles
      fallbackTile.style.border = '1px dashed black';
      return fallbackTile;
    }
    
    // Calculate scale for the ASCII art
    const maxRows = tileDefinition.ascii.length;
    const maxCols = Math.max(...tileDefinition.ascii.map(row => row.length));
    const scale = Math.floor(size / Math.max(maxRows, maxCols));
    
    // Create the rendered tile
    const renderedTile = renderAsciiToHTML(
      tileDefinition.ascii, 
      tileDefinition.color, 
      scale
    );
    
    // Add container styling
    renderedTile.style.width = `${size}px`;
    renderedTile.style.height = `${size}px`;
    renderedTile.style.position = 'relative';
    renderedTile.style.overflow = 'hidden';
    renderedTile.title = tileDefinition.name;
    renderedTile.dataset.tileType = tileType;
    
    // Cache the tile for future use
    cachedTiles[cacheKey] = renderedTile.cloneNode(true);
    
    return renderedTile;
  }
  
  // Render an entire grid of tiles
  function renderTileGrid(gridData, tileSize = 32) {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gridTemplateRows = `repeat(${gridData.length}, ${tileSize}px)`;
    container.style.gridTemplateColumns = `repeat(${gridData[0].length}, ${tileSize}px)`;
    
    for (let y = 0; y < gridData.length; y++) {
      for (let x = 0; x < gridData[y].length; x++) {
        const tileType = gridData[y][x];
        const tile = createTile(tileType, tileSize);
        container.appendChild(tile);
      }
    }
    
    return container;
  }
  
  // Load styles needed for rendering
  function loadStyles() {
    // Create a style element if not already present
    if (!document.getElementById('urban-renderer-styles')) {
      const style = document.createElement('style');
      style.id = 'urban-renderer-styles';
      style.textContent = `
        .urban-tile {
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }
        .urban-tile:hover {
          outline: 1px solid white;
          z-index: 1;
        }
        .urban-pixel {
          position: absolute;
          box-sizing: border-box;
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  // Initialize the renderer
  function initialize() {
    console.log("Initializing Urban Renderer");
    loadStyles();
    return true;
  }
  
  // Public API
  return {
    initialize,
    createTile,
    renderTileGrid
  };
})();

// Export for use in game
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { URBAN_RENDERER };
} else {
  // Auto-initialize when loaded in browser
  document.addEventListener('DOMContentLoaded', () => {
    URBAN_RENDERER.initialize();
  });
}