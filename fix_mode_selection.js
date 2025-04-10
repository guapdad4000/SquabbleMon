/**
 * This is an emergency fix for the mode selection screen
 * It completely replaces the mode selection screen with a simplified version
 */

(function() {
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    console.log("Applying emergency mode selection fix");
    
    // Get the mode selection screen
    const modeScreen = document.getElementById('mode-selection-screen');
    
    if (modeScreen) {
      // Create new HTML content
      const newContent = `
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; background-color: #000000; min-height: 100vh; width: 100%;">
          <h1 style="font-size: 48px; color: #ffffff; text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff; text-align: center; margin-bottom: 10px; text-transform: uppercase;">SQUABBLE</h1>
          <p style="color: #ffffff; font-size: 16px; text-align: center; margin-bottom: 30px;">Hood Fantasy Battle System</p>
          
          <div style="width: 100%; max-width: 600px; padding: 0 20px;">
            <button 
              onclick="window.selectGameMode('fade');" 
              style="background-color: #4ecca4; color: #000000; border: none; padding: 20px; width: 100%; margin-bottom: 20px; text-align: center; font-size: 18px; font-weight: bold; cursor: pointer; font-family: inherit;">
              Fade Mode 👊
              <div style="font-size: 14px; margin-top: 8px; font-weight: normal; opacity: 0.9;">Quick battles against opponents</div>
            </button>
            
            <button 
              onclick="window.selectGameMode('story');" 
              style="background-color: #4ecca4; color: #000000; border: none; padding: 20px; width: 100%; margin-bottom: 20px; text-align: center; font-size: 18px; font-weight: bold; cursor: pointer; font-family: inherit;">
              Story Mode 🗺️
              <div style="font-size: 14px; margin-top: 8px; font-weight: normal; opacity: 0.9;">Explore the hood, meet characters, build your squad</div>
            </button>
          </div>
        </div>
      `;
      
      // Replace the entire mode selection screen
      modeScreen.innerHTML = newContent;
      
      // Add glow animation with inline style
      const style = document.createElement('style');
      style.textContent = `
        @keyframes glow {
          from {
            text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff;
          }
          to {
            text-shadow: 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff;
          }
        }
        
        #mode-selection-screen h1 {
          animation: glow 1.5s ease-in-out infinite alternate;
        }
      `;
      document.head.appendChild(style);
      
      console.log("Emergency mode selection fix applied");
    } else {
      console.error("Could not find mode selection screen");
    }
  });
})();