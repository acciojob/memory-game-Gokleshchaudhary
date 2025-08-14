import React, { useState, useEffect } from "react";
import "./GameBoard.css";

const GameBoard = ({ level, onGameEnd, onReturnToMenu }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [disabled, setDisabled] = useState(false);

  // Initialize game based on level
  useEffect(() => {
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

    // Create pairs
    let numbers = [];
    for (let i = 1; i <= pairs; i++) {
      numbers.push(i, i);
    }

    // Shuffle and create cards
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

        // Check for win
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

export default GameBoard;
