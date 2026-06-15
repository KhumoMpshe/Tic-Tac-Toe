import { formatTime } from "../utilis/formatTime";

function GameTimer({ elapsedMs, isPaused }) {
  return (
    <div className={`game-timer${isPaused ? " game-timer-paused" : ""}`}>
      <span className="game-timer-label">Game Time</span>
      <span className="game-timer-value">{formatTime(elapsedMs)}</span>
    </div>
  );
}

export default GameTimer;
