import React from "react";
import { useGame } from "./lib/stores/useGame";
import { useAudio } from "./lib/stores/useAudio";

// Create a simple wrapper/redirect component to serve our static HTML game
const App = () => {
  // We'll use React as a bridge to our vanilla JS game
  // if needed for future expansion
  React.useEffect(() => {
    // Redirect to the root where our index.html is
    window.location.href = "/";
  }, []);

  return (
    <div>
      <h1>Loading Squabblemon...</h1>
    </div>
  );
};

export default App;
