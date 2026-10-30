import React from 'react';
import { Inbox } from 'lucide-react';

export default function EmptyState({ title = 'No records found', message = 'There are no active entries matching your criteria.', icon: Icon = Inbox }) {
  return (
    <div className="card text-center p-5 border-dashed">
      <div className="card-body">
        <div className="d-inline-flex p-3 rounded-circle bg-light text-muted mb-3">
          <Icon size={36} strokeWidth={1.5} />
        </div>
        <h5 className="card-title fw-semibold text-dark">{title}</h5>
        <p className="card-text text-muted small max-w-md mx-auto">{message}</p>
      </div>
    </div>
  );
}

