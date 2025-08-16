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
            <label>
              <input
                type="radio"
                id="easy"
                name="level"
                onChange={() => setLevel("easy")}
              />
              Easy
            </label>
            <label>
              <input
                type="radio"
                id="normal"
                name="level"
                onChange={() => setLevel("normal")}
              />
              Normal
            </label>
            <label>
              <input
                type="radio"
                id="hard"
                name="level"
                onChange={() => setLevel("hard")}
              />
              Hard
            </label>
          </div>
        </div>
      )}

      {level && (
        <div className="cells_container">
          <h2>{level.charAt(0).toUpperCase() + level.slice(1)} Mode</h2>
          {/* Tiles generate होंगे यहाँ */}
        </div>
      )}
    </div>
  );
}

export default App;
