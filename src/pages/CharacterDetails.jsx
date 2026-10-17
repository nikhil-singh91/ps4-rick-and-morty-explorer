import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';

function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadCharacter() {
      setLoading(true);
      setError(null);

      if (!id || isNaN(Number(id))) {
        setError('Invalid character ID.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);

        if (response.status === 404) {
          throw new Error('Character not found.');
        }

        if (!response.ok) {
          throw new Error('Failed to load character details.');
        }

        const data = await response.json();

        if (active) {
          setCharacter(data);
          setLoading(false);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Error loading character.');
          setLoading(false);
        }
      }
    }

    loadCharacter();

    return () => {
      active = false;
    };
  }, [id]);

  return (
    <div>
      <Link to="/characters">
        <button type="button">Back to Characters</button>
      </Link>

      {loading && <p>Loading character details...</p>}

      {!loading && error && <p>{error}</p>}

      {!loading && !error && character && (
        <div className="details-view">
          <h2>{character.name}</h2>
          <img src={character.image} alt={character.name} />
          
          <div className="details-row">
            <strong>Status: </strong>
            <StatusBadge status={character.status} />
          </div>

          <div className="details-row">
            <strong>Species: </strong>
            <span>{character.species}</span>
          </div>

          <div className="details-row">
            <strong>Gender: </strong>
            <span>{character.gender}</span>
          </div>

          <div className="details-row">
            <strong>Origin: </strong>
            <span>{character.origin ? character.origin.name : 'Unknown'}</span>
          </div>

          <div className="details-row">
            <strong>Current location: </strong>
            <span>{character.location ? character.location.name : 'Unknown'}</span>
          </div>

          <div className="details-row">
            <strong>Number of episodes: </strong>
            <span>{character.episode ? character.episode.length : 0}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CharacterDetails;
