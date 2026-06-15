function Status({ winner, draw, currentPlayer, players }) {
  if (winner) {
    return (
      <h2>
        Winner: {players[winner]}{" "}
        <span className={`marker marker-${winner.toLowerCase()}`}>
          {winner}
        </span>
      </h2>
    );
  }

  if (draw) {
    return (
      <h2>
        Draw! {players.X} vs {players.O}
      </h2>
    );
  }

  return (
    <h2>
      Next Player: {players[currentPlayer]}{" "}
      <span className={`marker marker-${currentPlayer.toLowerCase()}`}>
        {currentPlayer}
      </span>
    </h2>
  );
}

export default Status;
