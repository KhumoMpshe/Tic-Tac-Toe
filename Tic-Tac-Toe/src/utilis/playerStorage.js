const PLAYERS_KEY = "ticTacToePlayers";
const GAMES_KEY = "ticTacToeGames";

function loadJson(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadPlayers() {
  return loadJson(PLAYERS_KEY, {});
}

export function loadGames() {
  return loadJson(GAMES_KEY, []);
}

export function registerPlayers(playerNames) {
  const players = loadPlayers();
  const now = Date.now();

  for (const symbol of ["X", "O"]) {
    const name = typeof playerNames[symbol] === "string"
      ? playerNames[symbol]
      : playerNames[symbol]?.name;

    if (!name || players[name]) continue;

    players[name] = {
      name,
      gamesPlayed: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      firstPlayed: now,
      lastPlayed: now,
    };
  }

  saveJson(PLAYERS_KEY, players);
  return players;
}

export function recordGame({ players, result, durationMs, moves }) {
  const registry = loadPlayers();
  const games = loadGames();
  const playedAt = Date.now();

  const gameRecord = {
    id: `${playedAt}-${Math.random().toString(36).slice(2, 8)}`,
    players,
    result,
    durationMs,
    moves,
    playedAt,
  };

  games.unshift(gameRecord);

  for (const symbol of ["X", "O"]) {
    const player = players[symbol];
    const name = typeof player === "string" ? player : player?.name;
    const record = registry[name];

    if (!record) continue;

    record.gamesPlayed += 1;
    record.lastPlayed = playedAt;

    if (result === "draw") {
      record.draws += 1;
    } else if (result === symbol) {
      record.wins += 1;
    } else {
      record.losses += 1;
    }
  }

  saveJson(PLAYERS_KEY, registry);
  saveJson(GAMES_KEY, games);

  return gameRecord;
}

export function clearAllHistory() {
  localStorage.removeItem(PLAYERS_KEY);
  localStorage.removeItem(GAMES_KEY);
}
