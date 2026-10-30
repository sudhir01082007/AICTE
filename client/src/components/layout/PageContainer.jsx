import React from 'react';
import Breadcrumbs from './Breadcrumbs';

export default function PageContainer({ title, subtitle, action, children }) {
  return (
    <div className="container-fluid px-0">
      <div className="mb-3">
        <Breadcrumbs />
      </div>
      {(title || action) && (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center pb-3 mb-4 border-bottom">
          <div>
            {title && <h1 className="h4 fw-bold text-dark mb-1">{title}</h1>}
            {subtitle && <p className="text-muted small mb-0">{subtitle}</p>}
          </div>
          {action && <div className="mt-3 mt-md-0 d-flex gap-2">{action}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}

