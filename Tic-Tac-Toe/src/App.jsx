import { useReducer, useState, useEffect, useRef, useCallback } from 'react';
import './App.css'
import './Responsiveness.css'
import Board from "./components/Board";
import Status from "./components/Status";
import History from "./components/History";
import StartPage from "./components/StartPage";
import PlayerHistoryPage from "./components/PlayerHistoryPage";
import GameTimer from "./components/GameTimer";
import ThemeToggle from "./components/ThemeToggle";
import { gameReducer, initialState, } from "./reducer/gameReducer";
import { celebrateWinner } from "./utilis/celebrateWinner";
import { registerPlayers, recordGame } from "./utilis/playerStorage";
import { getPlayerCharacter, getPlayerName } from "./utilis/characterOptions";
import PlayerMarker from "./components/PlayerMarker";


function App() {
  const [state, dispatch] = useReducer(
    gameReducer,
    initialState
  );

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [screen, setScreen] = useState("start");
  const [players, setPlayers] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);

  const prevWinnerRef = useRef(null);
  const gameStartRef = useRef(null);
  const savedGameRef = useRef(false);

  const isGameOver = Boolean(state.winner || state.draw);

  const resetTimer = useCallback(() => {
    gameStartRef.current = null;
    setElapsedMs(0);
    savedGameRef.current = false;
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (players && state.winner && state.winner !== prevWinnerRef.current) {
      celebrateWinner();
    }

    prevWinnerRef.current = state.winner;
  }, [state.winner, players]);

  useEffect(() => {
    if (
      screen !== "game" ||
      !players ||
      isGameOver ||
      state.history.length === 0 ||
      !gameStartRef.current
    ) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setElapsedMs(Date.now() - gameStartRef.current);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [screen, players, isGameOver, state.history.length]);

  useEffect(() => {
    if (isGameOver && gameStartRef.current) {
      setElapsedMs(Date.now() - gameStartRef.current);
    }
  }, [isGameOver]);

  useEffect(() => {
    if (!players || savedGameRef.current) return;
    if (!state.winner && !state.draw) return;
    if (state.history.length === 0) return;

    const durationMs = state.history.at(-1)?.elapsedMs ?? 0;

    recordGame({
      players,
      result: state.winner || "draw",
      durationMs,
      moves: state.history.map(({ player, position, elapsedMs: moveElapsed, moveDurationMs }) => ({
        player,
        position,
        elapsedMs: moveElapsed,
        moveDurationMs,
      })),
    });

    savedGameRef.current = true;
  }, [state.winner, state.draw, state.history, players]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleStartGame = (playerNames) => {
    registerPlayers(playerNames);
    setPlayers(playerNames);
    setScreen("game");
    setShowHistory(false);
    resetTimer();
    dispatch({ type: "RESET_GAME" });
  };

  const handleMove = (index) => {
    if (isGameOver) return;

    if (gameStartRef.current === null) {
      gameStartRef.current = Date.now();
    }

    dispatch({
      type: "MAKE_MOVE",
      payload: {
        index,
        elapsedMs: Date.now() - gameStartRef.current,
      },
    });
  };

  const resetGame = () => {
    setShowHistory(false);
    resetTimer();
    dispatch({ type: "RESET_GAME" });
  };

  const returnToStart = () => {
    setPlayers(null);
    setScreen("start");
    setShowHistory(false);
    setElapsedMs(0);
    gameStartRef.current = null;
    savedGameRef.current = false;
    dispatch({ type: "RESET_GAME" });
  };

  const jumpToMove = (index) => {
    dispatch({
      type: "JUMP_TO_MOVE",
      payload: index,
    });
  };

  const openPlayerHistory = () => {
    setScreen("playerHistory");
  };

  const backFromPlayerHistory = () => {
    setScreen(players ? "game" : "start");
  };

  return (
    <div className="app">
      <ThemeToggle theme={theme} onToggle={toggleTheme} />

      {screen === "start" && (
        <StartPage
          onStart={handleStartGame}
          onViewPlayerHistory={openPlayerHistory}
        />
      )}

      {screen === "playerHistory" && (
        <PlayerHistoryPage onBack={backFromPlayerHistory} />
      )}

      {screen === "game" && players && (
        <div className="game-screen">
          <h1 className="h1-bubble">Tic Tac Toe</h1>
          <p className="bubble-tagline">✕ ⭕ let's play ⭕ ✕</p>

          <GameTimer
            elapsedMs={elapsedMs}
            isPaused={isGameOver || state.history.length === 0}
          />

          <Status
            winner={state.winner}
            draw={state.draw}
            currentPlayer={state.currentPlayer}
            players={players}
          />

          <div className="game-board-area">
            <aside
              className={`board-side board-side-x${
                !isGameOver && state.currentPlayer === "X" ? " board-side-active" : ""
              }${state.winner === "X" ? " board-side-winner" : ""}`}
              aria-label={`${getPlayerName(players, "X")}, ${getPlayerCharacter(players, "X")}`}
            >
              <PlayerMarker
                symbol="X"
                character={getPlayerCharacter(players, "X")}
                size="side"
              />
              <span className="board-side-name">{getPlayerName(players, "X")}</span>
            </aside>

            <Board
              board={state.board}
              handleMove={handleMove}
            />

            <aside
              className={`board-side board-side-o${
                !isGameOver && state.currentPlayer === "O" ? " board-side-active" : ""
              }${state.winner === "O" ? " board-side-winner" : ""}`}
              aria-label={`${getPlayerName(players, "O")}, ${getPlayerCharacter(players, "O")}`}
            >
              <PlayerMarker
                symbol="O"
                character={getPlayerCharacter(players, "O")}
                size="side"
              />
              <span className="board-side-name">{getPlayerName(players, "O")}</span>
            </aside>
          </div>

          <div className="game-actions">
            <button
              className="restart-btn"
              onClick={resetGame}
            >
              Play Again
            </button>

            <button
              className="history-toggle-btn"
              onClick={() => setShowHistory((prev) => !prev)}
              aria-expanded={showHistory}
            >
              {showHistory ? "Hide Move History" : "Move History"}
            </button>

            <button
              className="new-players-btn"
              onClick={returnToStart}
            >
              Change Players
            </button>

            <button
              className="player-history-btn"
              onClick={openPlayerHistory}
            >
              Player History
            </button>
          </div>

          {showHistory && (
            <History
              history={state.history}
              jumpToMove={jumpToMove}
              players={players}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
