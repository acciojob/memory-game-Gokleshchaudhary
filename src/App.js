import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Game state variables
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  // Difficulty configurations
  const difficulties = {
    easy: { pairs: 4, columns: 4 },
    normal: { pairs: 8, columns: 4 },
    hard: { pairs: 16, columns: 8 },
  };

  // Initialize game
  const startGame = () => {
    const { pairs } = difficulties[difficulty];
    const numbers = [];

    // Generate pairs
    for (let i = 1; i <= pairs; i++) {
      numbers.push(i, i);
    }

    // Shuffle cards
    const shuffled = [...numbers].sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setFlippedCards([]);
    setMatchedCards([]);
    setAttempts(0);
    setGameComplete(false);
    setGameStarted(true);
  };

  // Handle card click
  const handleCardClick = (index) => {
    // Don't allow flipping if:
    // - Game isn't started
    // - Card is already flipped or matched
    // - Two cards are already flipped
    if (
      !gameStarted ||
      flippedCards.includes(index) ||
      matchedCards.includes(index) ||
      flippedCards.length === 2
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    // Check for match when two cards are flipped
    if (newFlippedCards.length === 2) {
      setAttempts(attempts + 1);

      const [firstIndex, secondIndex] = newFlippedCards;
      if (cards[firstIndex] === cards[secondIndex]) {
        // Match found
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
        setFlippedCards([]);

        // Check if game is complete
        if (matchedCards.length + 2 === cards.length) {
          setGameComplete(true);
        }
      } else {
        // No match - flip back after delay
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Reset game
  const resetGame = () => {
    setGameStarted(false);
    setGameComplete(false);
  };

  // Render card
  const renderCard = (number, index) => {
    const isFlipped = flippedCards.includes(index);
    const isMatched = matchedCards.includes(index);

    return (
      <div
        key={index}
        className={`card ${isFlipped || isMatched ? "flipped" : ""} ${
          isMatched ? "matched" : ""
        }`}
        onClick={() => handleCardClick(index)}
        data-testid={`card-${index}`}
      >
        <div className="card-inner">
          <div className="card-front"></div>
          <div className="card-back">{number}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      {/* Welcome Message Added */}
      <div className="welcome-message">
        <h1>Welcome to Memory Matching Game!</h1>
        <p>Match pairs of numbers in the fewest attempts</p>
      </div>

      {!gameStarted ? (
        <div className="level-selection">
          <h2>Select Difficulty:</h2>
          <div className="difficulty-options">
            {Object.entries(difficulties).map(([level, config]) => (
              <label key={level}>
                <input
                  type="radio"
                  name="difficulty"
                  value={level}
                  checked={difficulty === level}
                  onChange={() => setDifficulty(level)}
                  id={level} // Added ID for Cypress tests
                  data-testid={`difficulty-${level}`}
                />
                {`${level.charAt(0).toUpperCase() + level.slice(1)} (${
                  config.pairs
                } pairs)`}
              </label>
            ))}
          </div>
          <button onClick={startGame} data-testid="start-button">
            Start Game
          </button>
        </div>
      ) : (
        <div className="game-container">
          <div className="game-stats">
            <p>Attempts: {attempts}</p>
            <p>Matches: {matchedCards.length / 2}</p>
          </div>

          <div
            className="game-board"
            style={{
              gridTemplateColumns: `repeat(${difficulties[difficulty].columns}, 1fr)`,
            }}
            data-testid="game-board"
          >
            {cards.map((number, index) => renderCard(number, index))}
          </div>

          {gameComplete && (
            <div className="game-complete" data-testid="game-complete">
              <h2>Congratulations!</h2>
              <p>You completed the game in {attempts} attempts!</p>
            </div>
          )}

          <button onClick={resetGame} data-testid="reset-button">
            Reset Game
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
