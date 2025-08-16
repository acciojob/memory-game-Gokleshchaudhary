import React, { useState } from "react";
import Levels from "./components/Levels";
import GameBoard from "./components/GameBoard";
import "./styles.css";

function App() {
  const [level, setLevel] = useState(null);

  return (
    <div className="app">
      {!level ? (
        <Levels setLevel={setLevel} />
      ) : (
        <GameBoard level={level} setLevel={setLevel} />
      )}
    </div>
  );
}

export default App;
