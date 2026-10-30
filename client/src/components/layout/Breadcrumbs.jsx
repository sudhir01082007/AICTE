import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Home } from 'lucide-react';

const routeNameMap = {
  dashboard: 'Pendency Dashboard',
  applications: 'Applications',
  scrutiny: 'Scrutiny & Review',
  evc: 'EVC Management',
  compliance: 'Compliance',
  undertakings: 'Undertakings',
  expiry: 'Document Expiry',
  institutions: 'Institutions',
  audit: 'Immutable Audit Trail',
};

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumb className="d-flex align-items-center">
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/dashboard' }}>
        <Home size={14} className="me-1 inline" style={{ verticalAlign: '-1px' }} />
        Home
      </Breadcrumb.Item>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = routeNameMap[value.toLowerCase()] || value.charAt(0).toUpperCase() + value.slice(1);

        return isLast ? (
          <Breadcrumb.Item active key={to}>
            {displayName}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item linkAs={Link} linkProps={{ to }} key={to}>
            {displayName}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}

