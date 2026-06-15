import { useReducer } from 'react';
import './App.css'
import Board from "./components/Board";
import Status from "./components/Status";
import History from "./components/History";

import { gameReducer, initialState, } from "./reducer/gameReducer";


function App() {
  const [state, dispatch] = useReducer(
    gameReducer,
    initialState
  );

  const handleMove = (index) => {
    dispatch({
      type: "MAKE_MOVE",
      payload: index,
    });
  };

  const resetGame = () => {
    dispatch({
      type: "RESET_GAME",
    });
  };

  const jumpToMove = (index) => {
    dispatch({
      type: "JUMP_TO_MOVE",
      payload: index,
    });
  };

  return (
    <div className="app">

      <h1>Tic Tac Toe</h1>

      <Status
        winner={state.winner}
        draw={state.draw}
        currentPlayer={state.currentPlayer}
      />

      <Board
        board={state.board}
        handleMove={handleMove}
      />

      <button
        className="restart-btn"
        onClick={resetGame}
      >
        Restart Game
      </button>

      <div className="sidebar">

        <div className="history-list">

          <History
            history={state.history}
            jumpToMove={jumpToMove}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
