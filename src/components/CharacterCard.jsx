import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';

function CharacterCard({ character }) {
  return (
    <Link to={`/characters/${character.id}`} className="character-card">
      <img src={character.image} alt={character.name} />
      <h3>{character.name}</h3>
      <StatusBadge status={character.status} />
      <p>Species: {character.species}</p>
    </Link>
  );
}

export default CharacterCard;
