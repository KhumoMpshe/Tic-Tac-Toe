export const initialState = {
  board: Array(9).fill(null),
  currentPlayer: "X",
  winner: null,
  draw: false,
  history: [],
};

export function checkWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of lines) {
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return board[a];
    }
  }

  return null;
}

export function gameReducer(state, action) {
  switch (action.type) {
    case "MAKE_MOVE": {
      const { index, elapsedMs } = action.payload;
      if (state.board[index] || state.winner) {
        return state;
      }

      const previousElapsed = state.history.at(-1)?.elapsedMs ?? 0;

      const newBoard = [...state.board];
      newBoard[index] = state.currentPlayer;

      const winner = checkWinner(newBoard);

      const draw =
        !winner && newBoard.every((cell) => cell !== null);

      return {
        ...state,
        board: newBoard,
        currentPlayer: state.currentPlayer === "X" ? "O" : "X",
        winner,
        draw,
        history: [...state.history, {
          board: newBoard,
          player: state.currentPlayer,
          position: index,
          currentPlayer: state.currentPlayer === "X" ? "O" : "X",
          winner,
          draw,
          elapsedMs,
          moveDurationMs: elapsedMs - previousElapsed,
        }],
      };
    }

    case "RESET_GAME":
      return initialState;

    case "JUMP_TO_MOVE": {
      const snapshot = state.history[action.payload];

      if (!snapshot) return state;

      return {
        ...state,
        board: snapshot.board,
        currentPlayer: snapshot.currentPlayer,
        winner: snapshot.winner,
        draw: snapshot.draw,
      };
    }

    default:
      return state;
  }
}