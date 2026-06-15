import { useState } from "react";

function StartPage({ onStart, onViewPlayerHistory }) {
  const [playerX, setPlayerX] = useState("");
  const [playerO, setPlayerO] = useState("");

  const trimmedX = playerX.trim();
  const trimmedO = playerO.trim();
  const canStart = trimmedX.length > 0 && trimmedO.length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canStart) return;

    onStart({ X: trimmedX, O: trimmedO });
  };

  return (
    <div className="start-page">
      <h1>Tic Tac Toe</h1>
      <p className="start-page-subtitle">Enter player names to begin</p>

      <form className="start-form" onSubmit={handleSubmit}>
        <label className="start-field">
          <span className="start-label">
            Player 1{" "}
            <span className="marker marker-x">X</span>
          </span>
          <input
            type="text"
            value={playerX}
            onChange={(event) => setPlayerX(event.target.value)}
            placeholder="Enter name"
            maxLength={24}
            autoFocus
          />
        </label>

        <label className="start-field">
          <span className="start-label">
            Player 2{" "}
            <span className="marker marker-o">O</span>
          </span>
          <input
            type="text"
            value={playerO}
            onChange={(event) => setPlayerO(event.target.value)}
            placeholder="Enter name"
            maxLength={24}
          />
        </label>

        <button type="submit" className="start-btn" disabled={!canStart}>
          Start Game
        </button>
      </form>

      <button
        type="button"
        className="secondary-btn"
        onClick={onViewPlayerHistory}
      >
        Player History
      </button>
    </div>
  );
}

export default StartPage;
