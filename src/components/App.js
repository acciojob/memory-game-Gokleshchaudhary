<<<<<<< HEAD
import React, { useState } from "react";
import "../styles/App.css";

const App = () => {
  const [gameState, setGameState] = useState("menu");
  const [level, setLevel] = useState("easy");
  const [finalAttempts, setFinalAttempts] = useState(0);

  const startGame = (selectedLevel) => {
    setLevel(selectedLevel);
    setGameState("playing");
  };

  const endGame = (attempts) => {
    setFinalAttempts(attempts);
    setGameState("won");
  };

  const returnToMenu = () => {
    setGameState("menu");
  };

  return (
    <div className="app">
      {gameState === "menu" && <LevelSelector onStartGame={startGame} />}
      {gameState === "playing" && (
        <GameBoard
          level={level}
          onGameEnd={endGame}
          onReturnToMenu={returnToMenu}
        />
      )}
      {gameState === "won" && (
        <WinMessage
          attempts={finalAttempts}
          onPlayAgain={() => startGame(level)}
        />
      )}
    </div>
  );
};

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
            id="easy"
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
            id="normal"
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
            id="hard"
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

const GameBoard = ({ level, onGameEnd, onReturnToMenu }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [disabled, setDisabled] = useState(false);

  React.useEffect(() => {
    startGame();
  }, [level]);

  const startGame = () => {
    let pairs;
    switch (level) {
      case "hard":
        pairs = 16;
        break;
      case "normal":
        pairs = 8;
        break;
      default:
        pairs = 4;
    }

    let numbers = [];
    for (let i = 1; i <= pairs; i++) {
      numbers.push(i, i);
    }

    const shuffled = [...numbers]
      .sort(() => Math.random() - 0.5)
      .map((num, i) => ({
        id: i,
        value: num,
        flipped: false,
        matched: false,
      }));

    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setAttempts(0);
  };

  const handleCardClick = (id) => {
    if (disabled || flipped.length >= 2 || matched.includes(id)) return;

    const newCards = cards.map((card) =>
      card.id === id ? { ...card, flipped: true } : card
    );
    setCards(newCards);

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      setAttempts((prev) => prev + 1);

      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      if (firstCard.value === secondCard.value) {
        setMatched((prev) => [...prev, firstId, secondId]);
        setFlipped([]);
        setDisabled(false);

        if (matched.length + 2 === cards.length) {
          onGameEnd(attempts + 1);
        }
      } else {
        setTimeout(() => {
          setCards(
            cards.map((card) =>
              newFlipped.includes(card.id) ? { ...card, flipped: false } : card
            )
          );
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  const getGridClass = () => {
    switch (level) {
      case "hard":
        return "hard-grid";
      case "normal":
        return "normal-grid";
      default:
        return "easy-grid";
    }
  };

  return (
    <div className="game-container">
      <div className="game-info">
        <p>Attempts: {attempts}</p>
        <button onClick={onReturnToMenu}>Return to Menu</button>
        <button onClick={startGame}>Restart</button>
      </div>
      <div className={`game-board ${getGridClass()}`}>
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card 
              ${card.flipped ? "flipped" : ""} 
              ${matched.includes(card.id) ? "matched" : ""}`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="card-front"></div>
            <div className="card-back">{card.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const WinMessage = ({ attempts, onPlayAgain }) => {
  return (
    <div className="win-message">
      <h2>Congratulations! You won!</h2>
      <p>Total attempts: {attempts}</p>
      <button onClick={onPlayAgain}>Play Again</button>
    </div>
  );
};

export default App;
=======

>>>>>>> 4fc0c344e38a6a43a5b75ea0645a52ae11aa7519
