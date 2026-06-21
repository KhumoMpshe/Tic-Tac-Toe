import CharacterAvatar from "./CharacterAvatar";

function PlayerMarker({ symbol, character, className = "", size = "md" }) {
  return (
    <span
      className={`player-marker player-marker-${symbol.toLowerCase()} player-marker-size-${size} ${className}`.trim()}
      aria-hidden="true"
    >
      <CharacterAvatar characterId={character} />
    </span>
  );
}

export default PlayerMarker;
