import React, { useState, useMemo } from 'react';
import PageContainer from '../../../components/layout/PageContainer';
import { EXPIRY_ALERTS } from '../../../services/mockData';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import SearchInput from '../../../components/common/SearchInput';
import FilterDropdown from '../../../components/common/FilterDropdown';
import { 
  FileClock, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Calendar 
} from 'lucide-react';

export default function DocumentExpiryPage() {
  const [alerts, setAlerts] = useState(EXPIRY_ALERTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('ALL');
  const [actionNotice, setActionNotice] = useState(null);

  const filtered = useMemo(() => {
    return alerts.filter((a) => {
      const matchSearch =
        a.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.documentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchTier = tierFilter === 'ALL' || a.alertTier === tierFilter;
      return matchSearch && matchTier;
    });
  }, [alerts, searchTerm, tierFilter]);

  const handleSendReminder = (alertItem) => {
    setAlerts(
      alerts.map((a) =>
        a.id === alertItem.id
          ? { ...a, noticeSent: true, lastReminderDate: 'Just now' }
          : a
      )
    );
    setActionNotice(`Automated regulatory notice dispatched to ${alertItem.institution} for ${alertItem.documentType}.`);
  };

  const getTierBadge = (tier) => {
    switch (tier) {
      case 'OVERDUE_ESCALATED':
        return <Badge bg="danger" style={{ fontSize: '0.675rem' }}>OVERDUE / ESCALATED</Badge>;
      case 'URGENT_30_DAYS':
        return <Badge bg="danger-subtle text-danger border border-danger" style={{ fontSize: '0.675rem' }}>30-DAY URGENT ALERT</Badge>;
      case 'REMINDER_60_DAYS':
        return <Badge bg="warning text-dark" style={{ fontSize: '0.675rem' }}>60-DAY REMINDER</Badge>;
      case 'ADVANCE_90_DAYS':
        return <Badge bg="info" style={{ fontSize: '0.675rem' }}>90-DAY ADVANCE NOTICE</Badge>;
      default:
        return <Badge bg="secondary" style={{ fontSize: '0.675rem' }}>{tier}</Badge>;
    }
  };

  return (
    <PageContainer
      title="Land Lease & Statutory Document Expiry Monitor"
      subtitle="Persistent scheduled monitoring of land titles, fire safety approvals, structural stability certificates, and institutional clearances"
    >
      {actionNotice && (
        <div className="alert alert-success alert-dismissible fade show d-flex align-items-center justify-content-between p-3 mb-4 shadow-sm" role="alert">
          <div className="d-flex align-items-center gap-2 small">
            <CheckCircle2 size={18} className="text-success flex-shrink-0" />
            <span>{actionNotice}</span>
          </div>
          <button type="button" className="btn-close" onClick={() => setActionNotice(null)} />
        </div>
      )}

      {/* Expiry Schedule Rule Legend */}
      <div className="p-3 bg-white rounded border mb-4 shadow-sm">
        <h6 className="fw-bold small text-dark mb-2">Automated Multi-Tier Notification Matrix (Phase 5 Engine)</h6>
        <div className="d-flex flex-wrap gap-3 small text-muted">
          <div><span className="badge bg-info me-1">90 Days</span> First informational advisory to Registrar</div>
          <div><span className="badge bg-warning text-dark me-1">60 Days</span> Second compliance reminder with portal warning</div>
          <div><span className="badge bg-danger-subtle text-danger border border-danger me-1">30 Days</span> Urgent regulatory notice to Management</div>
          <div><span className="badge bg-danger me-1">Overdue</span> Immediate regional escalation & intake freeze hold</div>
        </div>
      </div>

      <Card className="shadow-sm border">
        <Card.Header className="bg-white py-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <h6 className="fw-bold mb-1 text-dark">Monitored Institutional Documents</h6>
              <p className="text-muted small mb-0">System automatically runs idempotent nightly scans to dispatch timed warnings.</p>
            </div>

            <div className="d-flex flex-wrap align-items-center gap-2">
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search College, Document Type..."
              />
              <FilterDropdown
                label="Alert Tier"
                value={tierFilter}
                onChange={setTierFilter}
                options={[
                  { value: 'ALL', label: 'All Tiers' },
                  { value: 'OVERDUE_ESCALATED', label: 'Overdue / Escalated' },
                  { value: 'URGENT_30_DAYS', label: '30-Day Urgent' },
                  { value: 'REMINDER_60_DAYS', label: '60-Day Reminder' },
                  { value: 'ADVANCE_90_DAYS', label: '90-Day Advance' },
                ]}
              />
            </div>
          </div>
        </Card.Header>

        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="align-middle mb-0" style={{ fontSize: '0.85rem' }}>
              <thead className="table-light">
                <tr>
                  <th>Record ID</th>
                  <th>Institution Name</th>
                  <th>App Ref</th>
                  <th>Document Specification</th>
                  <th>Expiry Date</th>
                  <th className="text-center">Days Remaining</th>
                  <th>Alert Tier</th>
                  <th>Last Advisory Sent</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id}>
                    <td className="font-monospace fw-bold text-primary">{a.id}</td>
                    <td>
                      <div className="fw-semibold text-dark">{a.institution}</div>
                      <div className="text-muted small" style={{ fontSize: '0.725rem' }}>
                        Automated Registry Watch
                      </div>
                    </td>
                    <td className="font-monospace text-secondary small">{a.applicationId}</td>
                    <td className="fw-medium text-dark small">{a.documentType}</td>
                    <td className="font-monospace text-secondary">
                      {a.expiryDate}
                    </td>
                    <td className="text-center">
                      <span
                        className={`badge ${
                          a.daysRemaining < 0
                            ? 'bg-danger text-white'
                            : a.daysRemaining <= 30
                            ? 'bg-danger-subtle text-danger border border-danger'
                            : a.daysRemaining <= 60
                            ? 'bg-warning-subtle text-warning-emphasis border border-warning'
                            : 'bg-light text-dark border'
                        }`}
                        style={{ fontSize: '0.75rem' }}
                      >
                        {a.daysRemaining < 0 ? `${Math.abs(a.daysRemaining)}d OVERDUE` : `${a.daysRemaining}d`}
                      </span>
                    </td>
                    <td>{getTierBadge(a.alertTier)}</td>
                    <td className="small text-muted font-monospace">
                      {a.lastReminderDate || 'Not yet dispatched'}
                    </td>
                    <td className="text-end">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="py-1 px-2"
                        style={{ fontSize: '0.75rem' }}
                        onClick={() => handleSendReminder(a)}
                        title="Trigger Instant Notification"
                      >
                        <Send size={12} className="me-1 inline" />
                        <span>Dispatch Notice</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </PageContainer>
  );
}
