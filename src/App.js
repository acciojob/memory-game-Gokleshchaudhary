import React, { useState } from "react";
import "./styles.css";

function App() {
  const [level, setLevel] = useState(null);
  const [tiles, setTiles] = useState([]);

  const startGame = (selectedLevel) => {
    setLevel(selectedLevel);

    let pairs = 0;
    if (selectedLevel === "easy") pairs = 4;
    if (selectedLevel === "normal") pairs = 8;
    if (selectedLevel === "hard") pairs = 16;

    // numbers generate karo (pairs * 2 tiles)
    const numbers = [];
    for (let i = 1; i <= pairs; i++) {
      numbers.push(i, i);
    }

    // shuffle tiles
    const shuffled = numbers.sort(() => Math.random() - 0.5);
    setTiles(shuffled);
  };

  return (
    <div className="app">
      {!level && (
        <div>
          <h1>Welcome!</h1>
          <div className="levels_container">
            <button id="easy" onClick={() => startGame("easy")}>
              Easy
            </button>
            <button id="normal" onClick={() => startGame("normal")}>
              Normal
            </button>
            <button id="hard" onClick={() => startGame("hard")}>
              Hard
            </button>
          </div>
        </div>
      )}

      {level && (
        <div>
          <h2>{level.charAt(0).toUpperCase() + level.slice(1)} Mode</h2>
          <div className="cells_container">
            {tiles.map((num, index) => (
              <div key={index} className="cell">
                ?
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
