import { DEFAULT_BY_SYMBOL } from "../components/CharacterAvatar";

export const CHARACTER_OPTIONS = [
  { id: "male-boy", label: "Boy", gender: "male" },
  { id: "male-teen", label: "Teen Boy", gender: "male" },
  { id: "male-cap", label: "Cap Boy", gender: "male" },
  { id: "male-beard", label: "Bearded Man", gender: "male" },
  { id: "female-girl", label: "Girl", gender: "female" },
  { id: "female-woman", label: "Woman", gender: "female" },
  { id: "female-pigtails", label: "Pigtails", gender: "female" },
  { id: "female-curly", label: "Curly Hair", gender: "female" },
];

export const MALE_CHARACTERS = CHARACTER_OPTIONS.filter(
  (character) => character.gender === "male"
);

export const FEMALE_CHARACTERS = CHARACTER_OPTIONS.filter(
  (character) => character.gender === "female"
);

export function getCharacterOption(characterId) {
  return CHARACTER_OPTIONS.find((character) => character.id === characterId);
}

export function getPlayerName(players, symbol) {
  const player = players?.[symbol];
  if (!player) return "";
  return typeof player === "string" ? player : player.name;
}

export function getPlayerCharacter(players, symbol) {
  const player = players?.[symbol];
  if (!player) return DEFAULT_BY_SYMBOL[symbol];

  if (typeof player === "string") {
    return DEFAULT_BY_SYMBOL[symbol];
  }

  const characterId = player.character;
  if (getCharacterOption(characterId)) {
    return characterId;
  }

  return DEFAULT_BY_SYMBOL[symbol];
}

export function getCharacterLabel(players, symbol) {
  const characterId = getPlayerCharacter(players, symbol);
  return getCharacterOption(characterId)?.label ?? "Character";
}
