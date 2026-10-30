import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

export default function StatCard({
  title,
  value,
  label,
  icon: Icon,
  variant = 'primary', // primary, warning, danger, success, info
  trend,
  trendPositive,
  subtext,
  onClick,
}) {
  const variantStyles = {
    primary: {
      borderColor: '#2563EB',
      iconBg: '#EFF6FF',
      iconColor: '#2563EB',
    },
    warning: {
      borderColor: '#D69E18',
      iconBg: '#FEF9C3',
      iconColor: '#D69E18',
    },
    danger: {
      borderColor: '#C62836',
      iconBg: '#FEF2F2',
      iconColor: '#C62836',
    },
    success: {
      borderColor: '#16845B',
      iconBg: '#ECFDF5',
      iconColor: '#16845B',
    },
    info: {
      borderColor: '#2563EB',
      iconBg: '#EFF6FF',
      iconColor: '#2563EB',
    },
  };

  const style = variantStyles[variant] || variantStyles.primary;

  return (
    <Card
      className={`stat-card h-100 shadow-sm ${onClick ? 'cursor-pointer' : ''}`}
      style={{ borderTopColor: style.borderColor }}
      onClick={onClick}
    >
      <Card.Body className="p-3 d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <span className="text-uppercase fw-semibold small text-muted" style={{ fontSize: '0.725rem', letterSpacing: '0.04em' }}>
            {title}
          </span>
          {Icon && (
            <div
              className="stat-icon-wrapper"
              style={{ backgroundColor: style.iconBg, color: style.iconColor }}
            >
              <Icon size={20} />
            </div>
          )}
        </div>

        <div>
          <div className="stat-value text-dark mb-1">{value}</div>
          <div className="d-flex align-items-center gap-2">
            {trend && (
              <Badge
                bg={trendPositive ? 'success' : 'danger'}
                className="font-monospace"
                style={{ fontSize: '0.675rem' }}
              >
                {trend}
              </Badge>
            )}
            <span className="text-muted small" style={{ fontSize: '0.75rem' }}>
              {subtext || label}
            </span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

