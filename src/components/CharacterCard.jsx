import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';

/**
 * CharacterCard Component
 * Renders a single character card with image, name, species, status badge,
 * and episode count. Links to `/characters/:id`.
 *
 * @param {{ character: object }} props
 */
function CharacterCard({ character }) {
  const episodeCount = Array.isArray(character.episode) ? character.episode.length : 0;

  return (
    <Link 
      to={`/characters/${character.id}`} 
      className="character-card"
      id={`character-card-${character.id}`}
      aria-label={`View details for ${character.name}`}
    >
      <div className="card-image-wrap">
        <img 
          src={character.image} 
          alt={character.name} 
          className="card-image"
          loading="lazy"
        />
      </div>

      <div className="card-content">
        <div className="card-header">
          <h2 className="card-name">{character.name}</h2>
          <StatusBadge status={character.status} />
        </div>

        <p className="card-species">
          <span>Species: </span>
          <strong>{character.species}</strong>
        </p>

        <div className="card-footer">
          <span>{episodeCount} {episodeCount === 1 ? 'episode' : 'episodes'}</span>
          <span className="card-link-hint">Details &rarr;</span>
        </div>
      </div>
    </Link>
  );
}

export default CharacterCard;
