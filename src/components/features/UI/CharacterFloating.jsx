import React from 'react';

const CharacterFloating = ({ side, image }) => {
  const positionClass = side === 'left' ? 'character-left' : 'character-right';
  
  return (
    <div className={`floating-character ${positionClass}`}>
      <img src={image} alt={`Character ${side}`} className="character-image" />
    </div>
  );
};

export default CharacterFloating;
