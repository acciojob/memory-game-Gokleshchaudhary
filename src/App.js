import React, { useState } from "react";
import "./styles.css";

function App() {
  const [level, setLevel] = useState(null);

  return (
    <div className="app">
      {!level && (
        <div>
          <h1>Welcome!</h1>
          <div className="levels_container">
            <button id="easy" onClick={() => setLevel("easy")}>
              Easy
            </button>
            <button id="normal" onClick={() => setLevel("normal")}>
              Normal
            </button>
            <button id="hard" onClick={() => setLevel("hard")}>
              Hard
            </button>
          </div>
        </div>
      )}

      {level && (
        <div className="cells_container">
          <h2>{level.charAt(0).toUpperCase() + level.slice(1)} Mode</h2>
          {/* यहाँ बाद में tiles generate होंगे */}
        </div>
      )}
    </div>
  );
}

export default App;
