import React from 'react';

/**
 * Loading Component
 * Displays a portal themed spinner with a helpful loading message.
 *
 * @param {{ message?: string }} props
 */
function Loading({ message = 'Loading multiverse data...' }) {
  return (
    <div className="state-box" role="status" aria-live="polite" id="loading-state">
      <div className="loading-spinner"></div>
      <h3 className="state-title">Opening Portal...</h3>
      <p className="state-desc">{message}</p>
    </div>
  );
}

export default Loading;
