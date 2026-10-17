import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import Loading from '../components/Loading';

/**
 * CharacterDetails Page (Route: '/characters/:id')
 * Fetches and displays in-depth details for a specific character by ID:
 * image, name, status badge, species, gender, origin name, location name,
 * and episode count. Includes Back and Home navigation.
 */
function CharacterDetails() {
  const { id } = useParams();

  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCurrentRequest = true;

    async function fetchCharacterDetails() {
      setLoading(true);
      setError(null);

      // Validate ID: check if it's a positive integer
      if (!id || isNaN(Number(id)) || Number(id) <= 0) {
        setError(`Invalid character ID "${id}". Please provide a valid numeric ID.`);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);

        if (response.status === 404) {
          throw new Error(`Character with ID #${id} does not exist in the multiverse.`);
        }

        if (!response.ok) {
          throw new Error(`Error ${response.status}: Failed to load character details.`);
        }

        const data = await response.json();

        if (isCurrentRequest) {
          setCharacter(data);
          setLoading(false);
        }
      } catch (err) {
        if (isCurrentRequest) {
          setError(err.message || 'An error occurred while fetching character details.');
          setLoading(false);
        }
      }
    }

    fetchCharacterDetails();

    return () => {
      isCurrentRequest = false;
    };
  }, [id]);

  return (
    <div className="details-page">
      <div className="container">
        {/* Navigation Actions */}
        <div className="details-nav">
          <Link to="/characters" className="btn btn-secondary" id="btn-back-characters">
            &larr; Back to Characters
          </Link>
          <Link to="/" className="btn btn-secondary" id="btn-back-home">
            &larr; Back to Home
          </Link>
        </div>

        {/* Loading State */}
        {loading && <Loading message={`Fetching dossier for character #${id}...`} />}

        {/* Error State */}
        {!loading && error && (
          <div className="state-box" id="character-error-state">
            <div className="state-icon">⚠️</div>
            <h2 className="state-title">Character Not Found</h2>
            <p className="state-desc">{error}</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link to="/characters" className="btn btn-primary">
                Return to Characters
              </Link>
              <Link to="/" className="btn btn-secondary">
                Go to Home
              </Link>
            </div>
          </div>
        )}

        {/* Character Dossier Card */}
        {!loading && !error && character && (
          <article className="details-card" id="character-dossier">
            {/* Character Image */}
            <div className="details-image-wrap">
              <img
                src={character.image}
                alt={character.name}
                className="details-image"
              />
            </div>

            {/* Character Info */}
            <div className="details-info">
              <header className="details-header">
                <h1 className="details-name">{character.name}</h1>
                <StatusBadge status={character.status} />
              </header>

              <div className="details-attributes">
                <div className="attr-item">
                  <span className="attr-label">Species</span>
                  <p className="attr-value">{character.species || 'Unknown'}</p>
                </div>

                <div className="attr-item">
                  <span className="attr-label">Gender</span>
                  <p className="attr-value">{character.gender || 'Unknown'}</p>
                </div>

                <div className="attr-item">
                  <span className="attr-label">Origin Dimension</span>
                  <p className="attr-value">{character.origin?.name || 'Unknown'}</p>
                </div>

                <div className="attr-item">
                  <span className="attr-label">Current Location</span>
                  <p className="attr-value">{character.location?.name || 'Unknown'}</p>
                </div>

                <div className="attr-item" style={{ gridColumn: '1 / -1' }}>
                  <span className="attr-label">Total Episode Appearances</span>
                  <p className="attr-value">
                    {Array.isArray(character.episode) ? character.episode.length : 0} episodes
                  </p>
                </div>
              </div>

              <div>
                <Link to="/characters" className="btn btn-primary">
                  Browse More Characters &rarr;
                </Link>
              </div>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}

export default CharacterDetails;
