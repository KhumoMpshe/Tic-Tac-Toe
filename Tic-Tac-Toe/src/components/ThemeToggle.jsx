function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
    >
      <span className="theme-toggle-track">
        <span className="theme-toggle-thumb" />
      </span>
      <span className="theme-toggle-labels">
        <span className={!isDark ? "active" : ""}>Light</span>
        <span className={isDark ? "active" : ""}>Dark</span>
      </span>
    </button>
  );
}

export default ThemeToggle;
