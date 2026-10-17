import React from 'react';

/**
 * StatusBadge Component
 * Displays a color-coded status indicator:
 * - Alive: green badge
 * - Dead: red badge
 * - unknown: grey badge
 *
 * @param {{ status: string }} props
 */
function StatusBadge({ status }) {
  // Normalize status string for consistent class name matching
  const normalized = (status || 'unknown').toLowerCase();

  let statusClass = 'status-unknown';
  if (normalized === 'alive') {
    statusClass = 'status-alive';
  } else if (normalized === 'dead') {
    statusClass = 'status-dead';
  }

  return (
    <span className={`status-badge ${statusClass}`} id={`status-badge-${normalized}`}>
      <span className="status-dot" aria-hidden="true"></span>
      <span>{status || 'Unknown'}</span>
    </span>
  );
}

export default StatusBadge;
