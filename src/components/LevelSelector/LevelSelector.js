import React, {useState} from "react";

const LevelSelector = ({ onStartGame }) => {
  const [level, setLevel] = useState("easy");

  return (
    <div className="levels-container">
      <h1>Memory Matching Game</h1>
      <h2>Select Difficulty Level</h2>

      <div className="levels">
        <label>
          <input
            type="radio"
            name="level"
            value="easy"
            checked={level === "easy"}
            onChange={() => setLevel("easy")}
          />
          Easy (4 pairs)
        </label>

        <label>
          <input
            type="radio"
            name="level"
            value="normal"
            checked={level === "normal"}
            onChange={() => setLevel("normal")}
          />
          Normal (8 pairs)
        </label>

        <label>
          <input
            type="radio"
            name="level"
            value="hard"
            checked={level === "hard"}
            onChange={() => setLevel("hard")}
          />
          Hard (16 pairs)
        </label>
      </div>

      <button onClick={() => onStartGame(level)}>Start Game</button>
    </div>
  );
};

export default LevelSelector;
