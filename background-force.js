/**
 * Emergency background fix that uses direct DOM manipulation to set backgrounds
 * This script will run after the page loads and force the backgrounds to be visible
 */
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    console.log("Applying emergency background fixes");
    
    // Apply backgrounds using direct style manipulation
    document.body.style.background = "url('https://i.imgur.com/Zg7XCl1.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundColor = "#333";
    
    // Mode selection screen
    const modeScreen = document.getElementById('mode-selection-screen');
    if (modeScreen) {
      modeScreen.style.background = "url('https://i.imgur.com/GdNpKUK.jpg') no-repeat center center";
      modeScreen.style.backgroundSize = "cover";
    }
    
    // Selection screen
    const selectionScreen = document.getElementById('selection-screen');
    if (selectionScreen) {
      selectionScreen.style.background = "url('https://i.imgur.com/ZvMKSyp.jpg') no-repeat center center";
      selectionScreen.style.backgroundSize = "cover";
    }
    
    // Battle screen
    const battleScreen = document.getElementById('battle-screen');
    if (battleScreen) {
      battleScreen.style.backgroundImage = "url('https://i.imgur.com/Rb03YLf.jpg')";
      battleScreen.style.backgroundSize = "cover";
      battleScreen.style.backgroundPosition = "center";
      battleScreen.style.backgroundRepeat = "no-repeat";
    }
    
    // Battle arena
    const battleArena = document.getElementById('battle-arena');
    if (battleArena) {
      battleArena.style.backgroundImage = "url('https://i.imgur.com/nY7oky9.jpg')";
      battleArena.style.backgroundSize = "cover";
      battleArena.style.backgroundPosition = "center";
      battleArena.style.backgroundRepeat = "no-repeat";
    }
    
    // Apply styles also when screens change visibility
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          const element = mutation.target;
          
          // Re-apply background if display is changed
          if (element.id === 'mode-selection-screen' && element.style.display !== 'none') {
            element.style.background = "url('https://i.imgur.com/GdNpKUK.jpg') no-repeat center center";
            element.style.backgroundSize = "cover";
          }
          else if (element.id === 'selection-screen' && element.style.display !== 'none') {
            element.style.background = "url('https://i.imgur.com/ZvMKSyp.jpg') no-repeat center center";
            element.style.backgroundSize = "cover";
          }
          else if (element.id === 'battle-screen' && element.style.display !== 'none') {
            element.style.backgroundImage = "url('https://i.imgur.com/Rb03YLf.jpg')";
            element.style.backgroundSize = "cover";
            element.style.backgroundPosition = "center";
            element.style.backgroundRepeat = "no-repeat";
            
            // Also ensure battle arena has background
            const arena = document.getElementById('battle-arena');
            if (arena) {
              arena.style.backgroundImage = "url('https://i.imgur.com/nY7oky9.jpg')";
              arena.style.backgroundSize = "cover";
              arena.style.backgroundPosition = "center";
              arena.style.backgroundRepeat = "no-repeat";
            }
          }
        }
      });
    });
    
    // Observe mode selection screen
    if (modeScreen) {
      observer.observe(modeScreen, { attributes: true });
    }
    
    // Observe selection screen
    if (selectionScreen) {
      observer.observe(selectionScreen, { attributes: true });
    }
    
    // Observe battle screen
    if (battleScreen) {
      observer.observe(battleScreen, { attributes: true });
    }
    
    console.log("Emergency background fixes applied");
  });
})();