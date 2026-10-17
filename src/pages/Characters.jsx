import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';

function Characters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageQuery = parseInt(searchParams.get('page') || '1', 10);
  const currentPage = isNaN(pageQuery) || pageQuery < 1 ? 1 : pageQuery;
  const currentStatus = searchParams.get('status') || '';
  const currentName = searchParams.get('name') || '';

  const [searchInput, setSearchInput] = useState(currentName);
  const [characters, setCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setSearchInput(currentName);
  }, [currentName]);

  useEffect(() => {
    let active = true;

    async function loadCharacters() {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      params.append('page', currentPage.toString());

      if (currentStatus) {
        params.append('status', currentStatus);
      }

      if (currentName.trim()) {
        params.append('name', currentName.trim());
      }

      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character?${params.toString()}`);

        if (response.status === 404) {
          if (active) {
            setCharacters([]);
            setTotalPages(0);
            setLoading(false);
          }
          return;
        }

        if (!response.ok) {
          throw new Error('Could not fetch character data.');
        }

        const data = await response.json();

        if (active) {
          setCharacters(data.results || []);
          setTotalPages(data.info ? data.info.pages : 1);
          setLoading(false);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'An error occurred while fetching characters.');
          setLoading(false);
        }
      }
    }

    loadCharacters();

    return () => {
      active = false;
    };
  }, [currentPage, currentStatus, currentName]);

  const updateParams = (updates) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, value.toString());
      }
    });

    setSearchParams(nextParams);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParams({ name: searchInput.trim(), page: 1 });
  };

  const handleStatusChange = (e) => {
    updateParams({ status: e.target.value, page: 1 });
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      updateParams({ page: currentPage - 1 });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      updateParams({ page: currentPage + 1 });
    }
  };

  return (
    <div>
      <h1>Characters</h1>

      <div className="controls">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search characters..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <select value={currentStatus} onChange={handleStatusChange}>
          <option value="">All</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      {loading && <p>Loading characters...</p>}

      {!loading && error && <p>{error}</p>}

      {!loading && !error && characters.length === 0 && (
        <p>No characters found.</p>
      )}

      {!loading && !error && characters.length > 0 && (
        <>
          <div className="character-grid">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>

          <div className="pagination">
            <button onClick={handlePrevious} disabled={currentPage <= 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage >= totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Characters;
