/**
 * This script detects the game mode from URL parameters
 * and triggers the appropriate game mode without relying on
 * the problematic mode selection screen.
 */

(function() {
  // Function to parse URL parameters
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }
  
  // Function to directly select game mode and skip the mode selection screen
  function directSelectGameMode() {
    console.log("Checking for direct mode selection");
    
    // Try to get mode from URL parameter
    let mode = getUrlParameter('mode');
    
    // If no URL parameter, try localStorage as fallback
    if (!mode) {
      mode = localStorage.getItem('selectedMode');
    }
    
    // If we have a mode, select it directly
    if (mode && (mode === 'fade' || mode === 'story')) {
      console.log("Direct mode selection:", mode);
      
      // Hide mode selection screen if it exists
      const modeScreen = document.getElementById('mode-selection-screen');
      if (modeScreen) {
        modeScreen.style.display = 'none';
      }
      
      // Call the appropriate game mode function if available
      if (window.selectGameMode) {
        setTimeout(function() {
          window.selectGameMode(mode);
        }, 100); // Small delay to ensure everything is loaded
      } else {
        console.error("selectGameMode function not available");
      }
    } else {
      console.log("No direct mode selection, showing mode screen");
      
      // No mode specified, make sure the mode selection screen is visible
      const modeScreen = document.getElementById('mode-selection-screen');
      if (modeScreen) {
        modeScreen.style.display = 'flex';
      }
    }
  }
  
  // Run the direct mode selection when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', directSelectGameMode);
  } else {
    directSelectGameMode();
  }
})();