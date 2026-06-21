import { useState } from "react";
import {
  FEMALE_CHARACTERS,
  MALE_CHARACTERS,
} from "../utilis/characterOptions";
import { DEFAULT_BY_SYMBOL } from "./CharacterAvatar";
import PlayerMarker from "./PlayerMarker";

function StartPage({ onStart, onViewPlayerHistory }) {
  const [playerX, setPlayerX] = useState("");
  const [playerO, setPlayerO] = useState("");
  const [characterX, setCharacterX] = useState(DEFAULT_BY_SYMBOL.X);
  const [characterO, setCharacterO] = useState(DEFAULT_BY_SYMBOL.O);

  const trimmedX = playerX.trim();
  const trimmedO = playerO.trim();
  const canStart =
    trimmedX.length > 0 &&
    trimmedO.length > 0 &&
    characterX !== characterO;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canStart) return;

    onStart({
      X: { name: trimmedX, character: characterX },
      O: { name: trimmedO, character: characterO },
    });
  };

  const renderCharacterGroup = (heading, characters, symbol, selectedCharacter, onSelect, otherCharacter) => (
    <div className="character-picker-group">
      <span className="character-picker-heading">{heading}</span>
      <div className="character-picker" role="group" aria-label={`${heading} characters for player ${symbol}`}>
        {characters.map(({ id, label }) => {
          const isTaken = id !== selectedCharacter && id === otherCharacter;
          const isSelected = id === selectedCharacter;

          return (
            <button
              key={id}
              type="button"
              className={`character-option${isSelected ? " character-option-selected" : ""}`}
              onClick={() => onSelect(id)}
              disabled={isTaken}
              aria-pressed={isSelected}
              aria-label={label}
              title={isTaken ? `${label} (chosen by other player)` : label}
            >
              <PlayerMarker symbol={symbol} character={id} size="sm" />
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderCharacterPicker = (symbol, selectedCharacter, onSelect, otherCharacter) => (
    <div className="character-picker-groups">
      {renderCharacterGroup("Male", MALE_CHARACTERS, symbol, selectedCharacter, onSelect, otherCharacter)}
      {renderCharacterGroup("Female", FEMALE_CHARACTERS, symbol, selectedCharacter, onSelect, otherCharacter)}
    </div>
  );

  return (
    <div className="start-page">
      <h1 className="h1-bubble">Tic Tac Toe</h1>
      <p className="bubble-tagline">✕ ⭕ let's play ⭕ ✕</p>
      <p className="start-page-subtitle">Enter player names and pick a cartoon character</p>

      <form className="start-form" onSubmit={handleSubmit}>
        <label className="start-field">
          <span className="start-label">
            Player 1{" "}
            <PlayerMarker symbol="X" character={characterX} size="sm" />
          </span>
          <input
            type="text"
            value={playerX}
            onChange={(event) => setPlayerX(event.target.value)}
            placeholder="Enter name"
            maxLength={24}
            autoFocus
          />
          {renderCharacterPicker("X", characterX, setCharacterX, characterO)}
        </label>

        <label className="start-field">
          <span className="start-label">
            Player 2{" "}
            <PlayerMarker symbol="O" character={characterO} size="sm" />
          </span>
          <input
            type="text"
            value={playerO}
            onChange={(event) => setPlayerO(event.target.value)}
            placeholder="Enter name"
            maxLength={24}
          />
          {renderCharacterPicker("O", characterO, setCharacterO, characterX)}
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
