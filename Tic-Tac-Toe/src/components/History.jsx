import React from "react";

function History({
  history,
  jumpToMove,
}) {
  return (
    <div className="history">
      <h3>Move History</h3>

      {history.map((move, index) => (
        <button
          key={index}
          onClick={() =>
            jumpToMove(index)
          }
        >
          Move {index + 1}
        </button>
      ))}
    </div>
  );
}

export default History;