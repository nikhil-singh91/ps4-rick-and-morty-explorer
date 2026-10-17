import React from 'react';

function StatusBadge({ status }) {
  const normalized = (status || 'unknown').toLowerCase();

  let className = 'status-badge status-unknown';
  if (normalized === 'alive') {
    className = 'status-badge status-alive';
  } else if (normalized === 'dead') {
    className = 'status-badge status-dead';
  }

  return (
    <span className={className}>
      {status || 'Unknown'}
    </span>
  );
}

export default StatusBadge;
