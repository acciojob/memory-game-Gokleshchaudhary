import React, { useState } from 'react';
import LevelSelector from './components/LevelSelector/LevelSelector';
import GameBoard from './components/GameBoard/GameBoard';
import WinMessage from './components/WinMessage/WinMessage';

function App() {
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'won'
  const [level, setLevel] = useState('easy');
  const [finalAttempts, setFinalAttempts] = useState(0);

  const startGame = (selectedLevel) => {
    setLevel(selectedLevel);
    setGameState('playing');
  };

  const endGame = (attempts) => {
    setFinalAttempts(attempts);
    setGameState('won');
  };

  const returnToMenu = () => {
    setGameState('menu');
  };

  return (
    <div className="app">
      {gameState === 'menu' && <LevelSelector onStartGame={startGame} />}
      {gameState === 'playing' && (
        <GameBoard 
          level={level} 
          onGameEnd={endGame} 
          onReturnToMenu={returnToMenu}
        />
      )}
      {gameState === 'won' && (
        <WinMessage 
          attempts={finalAttempts} 
          onPlayAgain={() => startGame(level)}
        />
      )}
    </div>
  );
}

export default App;