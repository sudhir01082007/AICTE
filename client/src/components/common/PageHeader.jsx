import React from 'react';

export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center pb-3 mb-4 border-bottom">
      <div>
        <h1 className="h4 fw-bold text-dark mb-1">{title}</h1>
        {subtitle && <p className="text-muted small mb-0">{subtitle}</p>}
      </div>
      {action && <div className="mt-3 mt-md-0">{action}</div>}
    </div>
  );
}

