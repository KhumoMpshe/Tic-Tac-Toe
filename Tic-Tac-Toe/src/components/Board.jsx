import React from "react";
import Square from "./Square";

function Board({
  board,
  handleMove,
}) {
  return (
    <div className="board">
      {board.map((square, index) => (
        <Square
          key={index}
          value={square}
          onClick={() =>
            handleMove(index)
          }
        />
      ))}
    </div>
  );
}

export default Board;