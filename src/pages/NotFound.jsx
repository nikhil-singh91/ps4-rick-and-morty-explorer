import React from 'react';
import { Link } from 'react-router-dom';

/**
 * NotFound Page (Route: '*')
 * Displays a 404 message when a user navigates to an unrecognized path,
 * along with a short explanation and a link back to Home.
 */
function NotFound() {
  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <div className="state-box" id="not-found-page">
        <div className="state-icon">🌌</div>
        <h1 className="state-title">Page not found</h1>
        <p className="state-desc">
          Looks like you slipped through a malfunctioning interdimensional portal.
          The page you are looking for does not exist in this universe or dimension.
        </p>
        <div>
          <Link to="/" className="btn btn-primary" id="btn-notfound-home">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
