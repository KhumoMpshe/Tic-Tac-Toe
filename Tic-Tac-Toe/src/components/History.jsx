import { formatTime, formatDuration } from "../utilis/formatTime";

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

function History({ history, jumpToMove, players }) {
  return (
    <div className="history">
      <h3>Move History</h3>

      {history.length === 0 ? (
        <p className="history-empty">No moves yet.</p>
      ) : (
        <ol className="history-list">
          {history.map((move, index) => (
            <li key={index}>
              <button onClick={() => jumpToMove(index)}>
                <span className="history-move-main">
                  Move {index + 1}: {players[move.player]}{" "}
                  <span className={`marker marker-${move.player.toLowerCase()}`}>
                    {move.player}
                  </span>
                  {" "}→ {SQUARE_LABELS[move.position]}
                </span>
                {move.elapsedMs != null && (
                  <span className="history-move-time">
                    @ {formatTime(move.elapsedMs)}
                    {move.moveDurationMs != null && (
                      <> (+{formatDuration(move.moveDurationMs)})</>
                    )}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default History;
