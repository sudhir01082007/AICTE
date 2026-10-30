import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default function LoadingSpinner({ message = 'Loading regulatory records...' }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-5 text-center">
      <Spinner animation="border" variant="primary" style={{ width: '2.5rem', height: '2.5rem' }} role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      {message && <p className="mt-3 text-muted small">{message}</p>}
    </div>
  );
}

