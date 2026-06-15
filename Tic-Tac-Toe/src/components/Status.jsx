import React from "react";
import Square from "./Square";
import Board from "./Board";
import History from "./History";

function Status({
  winner,
  draw,
  currentPlayer,
}) {
  if (winner) {
    return (
      <h2>
        Winner: {winner}
      </h2>
    );
  }

  if (draw) {
    return <h2>Draw!</h2>;
  }

  return (
    <h2>
      Next Player: {currentPlayer}
    </h2>
  );
}

export default Status;