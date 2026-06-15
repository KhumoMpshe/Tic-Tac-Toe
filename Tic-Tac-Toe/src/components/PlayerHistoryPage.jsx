import { formatTime, formatDuration } from "../utilis/formatTime";
import { loadPlayers, loadGames } from "../utilis/playerStorage";

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
  const sortedPlayers = Object.values(loadPlayers()).sort(
    (a, b) => b.lastPlayed - a.lastPlayed
  );
  const games = loadGames();

  const formatResult = (game) => {
    if (game.result === "draw") {
      return "Draw";
    }

    const winnerName = game.players[game.result];
    return `${winnerName} won`;
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
                    {game.players.X}{" "}
                    <span className="marker marker-x">X</span>
                    {" vs "}
                    {game.players.O}{" "}
                    <span className="marker marker-o">O</span>
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
                        Move {index + 1}: {game.players[move.player]}{" "}
                        <span className={`marker marker-${move.player.toLowerCase()}`}>
                          {move.player}
                        </span>
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

      <button type="button" className="back-btn" onClick={onBack}>
        Back
      </button>
    </div>
  );
}

export default PlayerHistoryPage;
