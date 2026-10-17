import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';
import Loading from '../components/Loading';

/**
 * Characters Page (Route: '/characters')
 * Fetches characters from Rick & Morty API with search, status filtering,
 * URL-based pagination, error handling, and responsive grid display.
 */
function Characters() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract query parameters from URL with fallbacks
  const currentPageParam = parseInt(searchParams.get('page') || '1', 10);
  const currentPage = isNaN(currentPageParam) || currentPageParam < 1 ? 1 : currentPageParam;
  const currentStatus = searchParams.get('status') || '';
  const currentName = searchParams.get('name') || '';

  // Local state for the controlled search input
  const [searchInput, setSearchInput] = useState(currentName);

  // Data fetching state
  const [characters, setCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sync search input if URL changes (e.g., user hits back button or resets)
  useEffect(() => {
    setSearchInput(currentName);
  }, [currentName]);

  // Fetch characters when page, status, or search name change
  useEffect(() => {
    // Avoid race conditions if user rapidly changes pages or filters
    let isCurrentRequest = true;
    const controller = new AbortController();

    async function fetchCharacters() {
      setLoading(true);
      setError(null);

      // Build query string for Rick and Morty API
      const query = new URLSearchParams();
      query.append('page', currentPage.toString());

      if (currentStatus) {
        query.append('status', currentStatus);
      }

      if (currentName.trim()) {
        query.append('name', currentName.trim());
      }

      const apiUrl = `https://rickandmortyapi.com/api/character/?${query.toString()}`;

      try {
        const response = await fetch(apiUrl, { signal: controller.signal });

        // Rick and Morty API returns 404 when no characters match the search/filter
        if (response.status === 404) {
          if (isCurrentRequest) {
            setCharacters([]);
            setTotalPages(0);
            setLoading(false);
          }
          return;
        }

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (isCurrentRequest) {
          setCharacters(data.results || []);
          setTotalPages(data.info ? data.info.pages : 1);
          setLoading(false);
        }
      } catch (err) {
        // Ignore aborted requests
        if (err.name === 'AbortError') return;

        if (isCurrentRequest) {
          setError(err.message || 'Unable to connect to the Rick and Morty API.');
          setLoading(false);
        }
      }
    }

    fetchCharacters();

    return () => {
      isCurrentRequest = false;
      controller.abort();
    };
  }, [currentPage, currentStatus, currentName]);

  // Helper to update search params while preserving other active filters
  const updateUrlParams = (updates) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === '' || value === null || value === undefined) {
        newParams.delete(key);
      } else {
        newParams.set(key, value.toString());
      }
    });

    setSearchParams(newParams);
  };

  // Handle Search Submission / Enter or Blur
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Reset to page 1 on new search query
    updateUrlParams({
      name: searchInput.trim(),
      page: 1,
    });
  };

  // Handle Status Filter Change
  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    // Reset to page 1 on new status filter
    updateUrlParams({
      status: selectedStatus,
      page: 1,
    });
  };

  // Handle Pagination
  const handlePrevPage = () => {
    if (currentPage > 1) {
      updateUrlParams({ page: currentPage - 1 });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      updateUrlParams({ page: currentPage + 1 });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchInput('');
    setSearchParams({ page: '1' });
  };

  return (
    <div className="characters-page">
      <div className="container">
        {/* Page Title */}
        <header className="page-header">
          <h1 className="page-title">Characters Directory</h1>
          <p className="page-subtitle">
            Browse, search, and inspect beings from across every dimension
          </p>
        </header>

        {/* Controls: Search Input & Status Filter Dropdown */}
        <div className="controls-bar">
          <form className="search-box" onSubmit={handleSearchSubmit}>
            <span className="search-icon" aria-hidden="true">🔍</span>
            <input
              type="text"
              id="search-input"
              className="search-input"
              placeholder="Search by character name (e.g. Rick, Morty, Summer)..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              aria-label="Search characters by name"
            />
          </form>

          <div className="filter-box">
            <select
              id="status-filter"
              className="filter-select"
              value={currentStatus}
              onChange={handleStatusChange}
              aria-label="Filter characters by status"
            >
              <option value="">All statuses</option>
              <option value="alive">Alive</option>
              <option value="dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
        </div>

        {/* Content Area: Loading, Error, Empty, or Character Grid */}
        {loading && <Loading message={`Loading characters for page ${currentPage}...`} />}

        {!loading && error && (
          <div className="state-box" id="error-state">
            <div className="state-icon">⚡</div>
            <h2 className="state-title">API Connection Issue</h2>
            <p className="state-desc">{error}</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => updateUrlParams({ page: currentPage })}
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && characters.length === 0 && (
          <div className="state-box" id="empty-state">
            <div className="state-icon">🧪</div>
            <h2 className="state-title">No Characters Found</h2>
            <p className="state-desc">
              No beings match your search "{currentName}" {currentStatus ? `with status "${currentStatus}"` : ''} in this dimension.
            </p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleResetFilters}
            >
              Clear Filters
            </button>
          </div>
        )}

        {!loading && !error && characters.length > 0 && (
          <>
            {/* Responsive Grid */}
            <div className="character-grid" id="character-grid">
              {characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>

            {/* Pagination Controls */}
            <nav className="pagination" aria-label="Characters pagination">
              <button
                type="button"
                id="btn-prev-page"
                className="btn btn-secondary"
                onClick={handlePrevPage}
                disabled={currentPage <= 1}
              >
                &larr; Previous
              </button>

              <span className="page-info" id="pagination-info">
                Page <span className="page-info-current">{currentPage}</span> of{' '}
                <span className="page-info-current">{totalPages}</span>
              </span>

              <button
                type="button"
                id="btn-next-page"
                className="btn btn-secondary"
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
              >
                Next &rarr;
              </button>
            </nav>
          </>
        )}
      </div>
    </div>
  );
}

export default Characters;
