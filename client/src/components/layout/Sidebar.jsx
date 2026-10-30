import React from 'react';
import { NavLink } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { 
  LayoutDashboard, 
  FileText, 
  ClipboardCheck, 
  CalendarDays, 
  AlertTriangle, 
  FileClock, 
  Building2, 
  ShieldCheck 
} from 'lucide-react';

export default function Sidebar({ collapsed }) {
  const navigationGroups = [
    {
      category: 'OVERVIEW',
      items: [
        { to: '/dashboard', label: 'Pendency Dashboard', icon: LayoutDashboard },
      ],
    },
    {
      category: 'OPERATIONS',
      items: [
        { to: '/applications', label: 'Applications', icon: FileText },
        { to: '/scrutiny', label: 'Scrutiny & Review', icon: ClipboardCheck },
        { to: '/evc', label: 'EVC Management', icon: CalendarDays },
      ],
    },
    {
      category: 'COMPLIANCE',
      items: [
        { to: '/undertakings', label: 'Undertakings', icon: AlertTriangle },
        { to: '/expiry', label: 'Document Expiry', icon: FileClock },
      ],
    },
    {
      category: 'MANAGEMENT',
      items: [
        { to: '/institutions', label: 'Institutions', icon: Building2 },
        { to: '/audit', label: 'Immutable Audit Trail', icon: ShieldCheck },
      ],
    },
  ];

  return (
    <aside className={`aicte-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="py-2 flex-grow-1 overflow-y-auto">
        {navigationGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="mb-2">
            <div className="sidebar-category">
              {collapsed ? '—' : group.category}
            </div>

            <nav className="d-flex flex-column gap-1">
              {group.items.map((item) => {
                const Icon = item.icon;

                const linkContent = (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `sidebar-nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    <Icon size={18} className="flex-shrink-0" />
                    <span className="sidebar-nav-text">{item.label}</span>
                  </NavLink>
                );

                if (collapsed) {
                  return (
                    <OverlayTrigger
                      key={item.to}
                      placement="right"
                      overlay={<Tooltip id={`tt-${item.to}`}>{item.label}</Tooltip>}
                    >
                      {linkContent}
                    </OverlayTrigger>
                  );
                }

                return linkContent;
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Sidebar Branding */}
      <div className="p-3 border-top border-secondary border-opacity-25 text-secondary small text-center">
        {collapsed ? (
          <span className="fw-bold" style={{ fontSize: '0.65rem' }}>AICTE</span>
        ) : (
          <div className="d-flex flex-column align-items-center">
            <span className="fw-bold text-light" style={{ fontSize: '0.75rem', letterSpacing: '0.04em' }}>AICTE</span>
            <span className="text-secondary" style={{ fontSize: '0.625rem' }}>Approval Management System</span>
          </div>
        )}
      </div>
    </aside>
  );
}
