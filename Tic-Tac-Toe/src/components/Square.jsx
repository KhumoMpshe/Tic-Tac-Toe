function Square({ value, onClick }) {
  const squareClass = value
    ? `square square-${value.toLowerCase()}`
    : "square";

  return (
    <button
      className={squareClass}
      onClick={onClick}
      aria-label={value ? `Square ${value}` : "Empty square"}
    >
      {value && (
        <span className={`marker marker-${value.toLowerCase()}`}>
          {value}
        </span>
      )}
    </button>
  );
}

export default Square;
