const DEFAULT_BY_SYMBOL = {
  X: "male-boy",
  O: "female-girl",
};

const AVATAR_IMAGES = {
  "male-boy": "/avatars/male-boy.png",
  "male-teen": "/avatars/male-teen.png",
  "male-cap": "/avatars/male-cap.png",
  "male-beard": "/avatars/male-beard.png",
  "female-girl": "/avatars/female-girl.png",
  "female-woman": "/avatars/female-woman.png",
  "female-pigtails": "/avatars/female-pigtails.png",
  "female-curly": "/avatars/female-curly.png",
};

function CharacterAvatar({ characterId, className = "" }) {
  const resolvedId = AVATAR_IMAGES[characterId]
    ? characterId
    : DEFAULT_BY_SYMBOL.X;
  const src = AVATAR_IMAGES[resolvedId];

  return (
    <img
      className={`character-avatar ${className}`.trim()}
      src={src}
      alt=""
      draggable="false"
    />
  );
}

export { DEFAULT_BY_SYMBOL, AVATAR_IMAGES };
export default CharacterAvatar;
