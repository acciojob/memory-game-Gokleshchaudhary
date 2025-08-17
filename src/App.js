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
            <input type="radio" id="level" onClick={() => setLevel("easy")}/>
              Easy
            <input type="radio" id="level" onClick={() => setLevel("normal")}>
              Normal
            </input>
            <input type="radio" id="level" onClick={() => setLevel("hard")}>
              Hard
            </input>
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
