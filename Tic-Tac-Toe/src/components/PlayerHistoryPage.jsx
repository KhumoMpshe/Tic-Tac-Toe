import { useState } from "react";
import { formatTime, formatDuration } from "../utilis/formatTime";
import { getPlayerCharacter, getPlayerName, getCharacterLabel } from "../utilis/characterOptions";
import PlayerMarker from "./PlayerMarker";
import { loadPlayers, loadGames, clearAllHistory } from "../utilis/playerStorage";

const SQUARE_LABELS = [
  "top-left",
  "top-center",
  "top-right",
  "middle-left",
  "center",
  "middle-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

function PlayerHistoryPage({ onBack }) {
  const [, setHistoryVersion] = useState(0);

  const sortedPlayers = Object.values(loadPlayers()).sort(
    (a, b) => b.lastPlayed - a.lastPlayed
  );
  const games = loadGames();
  const hasHistory = sortedPlayers.length > 0 || games.length > 0;

  const handleClearHistory = () => {
    const confirmed = window.confirm(
      "Clear all player stats and game history from this device? This cannot be undone."
    );

    if (!confirmed) return;

    clearAllHistory();
    setHistoryVersion((version) => version + 1);
  };

  const formatResult = (game) => {
    if (game.result === "draw") {
      return "Draw";
    }

    const winnerName = getPlayerName(game.players, game.result);
    const winnerCharacter = getCharacterLabel(game.players, game.result);
    return `${winnerName} won (${winnerCharacter})`;
  };

  const formatDate = (timestamp) =>
    new Date(timestamp).toLocaleString();

  return (
    <div className="player-history-page">
      <h1>Player History</h1>
      <p className="player-history-subtitle">
        All players and past games are saved on this device.
      </p>

      <section className="player-history-section">
        <h2>Players</h2>

        {sortedPlayers.length === 0 ? (
          <p className="history-empty">No players yet. Start a game to add names.</p>
        ) : (
          <ul className="player-registry">
            {sortedPlayers.map((player) => (
              <li key={player.name} className="player-registry-item">
                <div className="player-registry-name">{player.name}</div>
                <div className="player-registry-stats">
                  <span>{player.gamesPlayed} games</span>
                  <span>{player.wins}W</span>
                  <span>{player.losses}L</span>
                  <span>{player.draws}D</span>
                </div>
                <div className="player-registry-meta">
                  Last played: {formatDate(player.lastPlayed)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="player-history-section">
        <h2>Game History</h2>

        {games.length === 0 ? (
          <p className="history-empty">No completed games yet.</p>
        ) : (
          <ul className="game-history-list">
            {games.map((game) => (
              <li key={game.id} className="game-history-item">
                <div className="game-history-header">
                  <span>
                    {getPlayerName(game.players, "X")}{" "}
                    <PlayerMarker
                      symbol="X"
                      character={getPlayerCharacter(game.players, "X")}
                      size="sm"
                    />
                    {" vs "}
                    {getPlayerName(game.players, "O")}{" "}
                    <PlayerMarker
                      symbol="O"
                      character={getPlayerCharacter(game.players, "O")}
                      size="sm"
                    />
                  </span>
                  <span className="game-history-result">{formatResult(game)}</span>
                </div>
                <div className="game-history-meta">
                  {formatDate(game.playedAt)} · {formatDuration(game.durationMs)}
                </div>
                {game.moves?.length > 0 && (
                  <ol className="game-history-moves">
                    {game.moves.map((move, index) => (
                      <li key={index}>
                        Move {index + 1}: {getPlayerName(game.players, move.player)}{" "}
                        <PlayerMarker
                          symbol={move.player}
                          character={getPlayerCharacter(game.players, move.player)}
                          size="sm"
                        />
                        {" "}→ {SQUARE_LABELS[move.position]} @ {formatTime(move.elapsedMs)}
                        {move.moveDurationMs != null && (
                          <> (+{formatDuration(move.moveDurationMs)})</>
                        )}
                      </li>
                    ))}
                  </ol>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="player-history-actions">
        <button
          type="button"
          className="clear-history-btn"
          onClick={handleClearHistory}
          disabled={!hasHistory}
        >
          Clear History
        </button>
        <button type="button" className="back-btn" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
}

export default PlayerHistoryPage;
