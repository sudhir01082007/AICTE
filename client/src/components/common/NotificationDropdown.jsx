import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import { Bell, Clock, AlertTriangle, FileText, CheckCircle, ShieldAlert } from 'lucide-react';

const initialNotifications = [
  {
    id: 1,
    title: 'Lease Expiry Final Alert (30 Days)',
    message: 'Delhi Institute of Tech: Land lease agreement expires in 28 days.',
    type: 'warning',
    time: '15m ago',
    unread: true,
  },
  {
    id: 2,
    title: 'Deficiency Resubmission Received',
    message: 'National Inst. of Engg. resubmitted building plan clearances.',
    type: 'info',
    time: '1h ago',
    unread: true,
  },
  {
    id: 3,
    title: 'EVC Visit Scheduled',
    message: 'Inspection scheduled for Bangalore Institute on 05 Nov 2026.',
    type: 'primary',
    time: '3h ago',
    unread: false,
  },
  {
    id: 4,
    title: 'Overdue Undertaking Escalation',
    message: 'Fire Safety Certificate undertaking overdue for 7 days.',
    type: 'danger',
    time: '5h ago',
    unread: true,
  },
];

export default function NotificationDropdown() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle size={16} className="text-warning flex-shrink-0" />;
      case 'danger':
        return <ShieldAlert size={16} className="text-danger flex-shrink-0" />;
      case 'info':
        return <FileText size={16} className="text-info flex-shrink-0" />;
      default:
        return <Clock size={16} className="text-primary flex-shrink-0" />;
    }
  };

  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        variant="link"
        className="text-light p-2 position-relative text-decoration-none border-0 shadow-none"
        id="notification-dropdown"
      >
        <Bell size={20} className="text-slate-300" />
        {unreadCount > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
            {unreadCount}
            <span className="visually-hidden">unread notifications</span>
          </span>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu className="notification-menu shadow-lg border-0">
        <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom bg-light">
          <div className="d-flex align-items-center gap-2">
            <span className="fw-bold small text-dark">Regulatory Alerts</span>
            {unreadCount > 0 && (
              <Badge bg="danger" pill style={{ fontSize: '0.7rem' }}>
                {unreadCount} New
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="btn btn-link btn-sm text-decoration-none p-0 text-primary small"
              style={{ fontSize: '0.75rem' }}
            >
              Mark all read
            </button>
          )}
        </div>

        <div>
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => markAsRead(item.id)}
              className={`notification-item ${item.unread ? 'unread' : ''}`}
            >
              <div className="d-flex align-items-start gap-2">
                <div className="mt-1">{getIcon(item.type)}</div>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-semibold text-dark small" style={{ fontSize: '0.8rem' }}>
                      {item.title}
                    </span>
                    <span className="text-muted" style={{ fontSize: '0.7rem' }}>
                      {item.time}
                    </span>
                  </div>
                  <p className="text-muted mb-0" style={{ fontSize: '0.75rem', lineHeight: '1.3' }}>
                    {item.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center p-2 border-top bg-light">
          <a href="/compliance" className="text-decoration-none small text-primary fw-medium" style={{ fontSize: '0.75rem' }}>
            View All Compliance Alerts →
          </a>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}

