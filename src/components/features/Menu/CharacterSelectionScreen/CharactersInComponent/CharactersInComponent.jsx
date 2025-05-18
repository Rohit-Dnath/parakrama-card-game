export default function CharactersInComponent({
  characterPack,
  handleCharacterPackChange,
  characters,
  handleCharacterPackHover,
  handleCharacterPackLeave,
}) {
  const handleBorder = (characterPack) => {
    if (characters[0] === characterPack) {
      return "0 0 5px 0 gold"; // Only bottom border
    }
    return "none";
  };
  return (
    <div
      onClick={() => handleCharacterPackChange(characterPack)}
      onMouseOver={() => handleCharacterPackHover(characterPack)}
      onMouseLeave={handleCharacterPackLeave}
      style={{ display: 'inline-block', cursor: 'pointer', margin: '7px 16px 0 16px' }} // Increased margin above cards
    >
      <img
        width="140"
        height="200"
        style={{
          border: 'none',
          borderBottom: handleBorder(characterPack) !== 'none' ? '4px solid gold' : 'none',
          transition: 'transform 0.2s',
          display: 'block',
          width: '140px',
          height: '200px',
          objectFit: 'cover',
        }}
        className="character-pack-img"
        src={
          "/cards/card-images/" + characterPack + "/" + characterPack + ".png"
        }
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      />
    </div>
  );
}
