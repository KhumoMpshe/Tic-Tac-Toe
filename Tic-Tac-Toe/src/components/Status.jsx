import { getPlayerCharacter, getPlayerName } from "../utilis/characterOptions";
import PlayerMarker from "./PlayerMarker";

function Status({ winner, draw, currentPlayer, players }) {
  if (winner) {
    return (
      <h2 className="status status-winner">
        Winner: {getPlayerName(players, winner)}{" "}
        <PlayerMarker
          symbol={winner}
          character={getPlayerCharacter(players, winner)}
          size="lg"
        />
      </h2>
    );
  }

  if (draw) {
    return (
      <h2 className="status status-draw">
        Draw! {getPlayerName(players, "X")} vs {getPlayerName(players, "O")}
      </h2>
    );
  }

  return (
    <h2 className="status">
      Next Player: {getPlayerName(players, currentPlayer)}{" "}
      <PlayerMarker
        symbol={currentPlayer}
        character={getPlayerCharacter(players, currentPlayer)}
        size="lg"
      />
    </h2>
  );
}

export default Status;
