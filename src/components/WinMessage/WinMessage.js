import React from "react";
import "./WinMessage.css";

const WinMessage = ({ attempts, onPlayAgain }) => {
  return (
    <div className="win-message">
      <h2>Congratulations! You won!</h2>
      <p>Total attempts: {attempts}</p>
      <button onClick={onPlayAgain}>Play Again</button>
    </div>
  );
};

export default WinMessage;
