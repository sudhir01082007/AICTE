import React, { useState, useMemo } from 'react';
import PageContainer from '../../../components/layout/PageContainer';
import { UNDERTAKINGS } from '../../../services/mockData';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import SearchInput from '../../../components/common/SearchInput';
import FilterDropdown from '../../../components/common/FilterDropdown';
import ConfirmationModal from '../../../components/common/ConfirmationModal';
import { 
  AlertTriangle, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Upload, 
  FileCheck2, 
  ShieldAlert, 
  FileText 
} from 'lucide-react';

export default function UndertakingsPage() {
  const [items, setItems] = useState(UNDERTAKINGS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  // Verify modal state
  const [selectedItem, setSelectedItem] = useState(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [actionAlert, setActionAlert] = useState(null);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchSearch =
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = statusFilter === 'ALL' || item.status === statusFilter;
      const matchPriority = priorityFilter === 'ALL' || item.priority === priorityFilter;

      return matchSearch && matchStatus && matchPriority;
    });
  }, [items, searchTerm, statusFilter, priorityFilter]);

  const handleVerify = () => {
    if (selectedItem) {
      setItems(
        items.map((i) =>
          i.id === selectedItem.id
            ? { ...i, status: 'VERIFIED', evidenceSubmitted: true }
            : i
        )
      );
      setShowVerifyModal(false);
      setActionAlert(`Undertaking ${selectedItem.id} for ${selectedItem.institution} successfully verified and cleared.`);
    }
  };

  const handleSimulateUpload = (item) => {
    setItems(
      items.map((i) =>
        i.id === item.id
          ? { ...i, evidenceSubmitted: true, evidenceFile: 'Affidavit_Compliance_Verified.pdf' }
          : i
      )
    );
    setActionAlert(`Signed affidavit & compliance evidence uploaded for ${item.id}. Forwarded to officer for verification.`);
  };

  return (
    <PageContainer
      title="Compliance & Undertaking Covenant Registry"
      subtitle="Track conditional approval commitments, affidavits, and time-bound evidence submissions across technical institutions"
    >
      {actionAlert && (
        <div className="alert alert-success alert-dismissible fade show d-flex align-items-center justify-content-between p-3 mb-4 shadow-sm" role="alert">
          <div className="d-flex align-items-center gap-2 small">
            <CheckCircle2 size={18} className="text-success flex-shrink-0" />
            <span>{actionAlert}</span>
          </div>
          <button type="button" className="btn-close" onClick={() => setActionAlert(null)} />
        </div>
      )}

      <Card className="shadow-sm border mb-4">
        <Card.Header className="bg-white py-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <h6 className="fw-bold mb-1 text-dark">Active Institutional Undertakings</h6>
              <p className="text-muted small mb-0">Institutions must upload stamped notarized evidence before deadline expiry.</p>
            </div>

            <div className="d-flex flex-wrap align-items-center gap-2">
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search Undertaking ID, College..."
              />
              <FilterDropdown
                label="Status"
                value={statusFilter}
                onChange={setStatusFilter}
                options={[
                  { value: 'ALL', label: 'All Statuses' },
                  { value: 'PENDING', label: 'Pending Review' },
                  { value: 'VERIFIED', label: 'Verified & Cleared' },
                  { value: 'OVERDUE', label: 'Overdue / Escalated' },
                ]}
              />
              <FilterDropdown
                label="Priority"
                value={priorityFilter}
                onChange={setPriorityFilter}
                options={[
                  { value: 'ALL', label: 'All Priorities' },
                  { value: 'CRITICAL', label: 'Critical' },
                  { value: 'HIGH', label: 'High' },
                  { value: 'MEDIUM', label: 'Medium' },
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
                  <th>Undertaking ID</th>
                  <th>App Ref</th>
                  <th>Institution</th>
                  <th>Covenant Obligation Title</th>
                  <th>Due Date</th>
                  <th className="text-center">Days Remaining</th>
                  <th>Evidence Status</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id}>
                    <td className="font-monospace fw-bold text-primary">{item.id}</td>
                    <td className="font-monospace fw-semibold text-secondary">{item.applicationId}</td>
                    <td>
                      <div className="fw-semibold text-dark">{item.institution}</div>
                      <div className="text-muted small" style={{ fontSize: '0.725rem' }}>
                        Officer: {item.officerAssigned}
                      </div>
                    </td>
                    <td>
                      <div className="fw-semibold text-dark small">{item.title}</div>
                      <Badge
                        bg={item.priority === 'CRITICAL' ? 'danger' : item.priority === 'HIGH' ? 'warning text-dark' : 'secondary'}
                        className="mt-1"
                        style={{ fontSize: '0.625rem' }}
                      >
                        {item.priority} PRIORITY
                      </Badge>
                    </td>
                    <td className="font-monospace text-secondary">
                      {item.dueDate}
                    </td>
                    <td className="text-center">
                      <span
                        className={`badge ${
                          item.daysRemaining < 0
                            ? 'bg-danger text-white'
                            : item.daysRemaining <= 7
                            ? 'bg-danger-subtle text-danger border border-danger'
                            : item.daysRemaining <= 30
                            ? 'bg-warning-subtle text-warning-emphasis border border-warning'
                            : 'bg-light text-dark border'
                        }`}
                        style={{ fontSize: '0.75rem' }}
                      >
                        {item.daysRemaining < 0 ? `${Math.abs(item.daysRemaining)}d OVERDUE` : `${item.daysRemaining}d`}
                      </span>
                    </td>
                    <td>
                      {item.evidenceSubmitted ? (
                        <div className="d-flex align-items-center gap-1 text-success small fw-medium">
                          <FileCheck2 size={14} />
                          <span>Submitted</span>
                        </div>
                      ) : (
                        <div className="d-flex align-items-center gap-1 text-muted small">
                          <Clock size={14} />
                          <span>Awaiting Upload</span>
                        </div>
                      )}
                    </td>
                    <td>
                      <Badge
                        bg={item.status === 'VERIFIED' ? 'success' : item.status === 'OVERDUE' ? 'danger' : 'warning text-dark'}
                        style={{ fontSize: '0.7rem' }}
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-1">
                        {!item.evidenceSubmitted && (
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="py-1 px-2"
                            style={{ fontSize: '0.75rem' }}
                            onClick={() => handleSimulateUpload(item)}
                            title="Simulate affidavit evidence upload"
                          >
                            <Upload size={12} className="me-1 inline" />
                            <span>Upload</span>
                          </Button>
                        )}
                        {item.status !== 'VERIFIED' && (
                          <Button
                            variant="outline-success"
                            size="sm"
                            className="py-1 px-2"
                            style={{ fontSize: '0.75rem' }}
                            onClick={() => {
                              setSelectedItem(item);
                              setShowVerifyModal(true);
                            }}
                            title="Officer Verify & Clear"
                          >
                            <CheckCircle2 size={12} className="me-1 inline" />
                            <span>Verify</span>
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      <ConfirmationModal
        show={showVerifyModal}
        onHide={() => setShowVerifyModal(false)}
        onConfirm={handleVerify}
        title="Verify Compliance Undertaking"
        message={`Confirm regulatory verification for ${selectedItem?.id} (${selectedItem?.title}) submitted by ${selectedItem?.institution}. This marks the legal undertaking as compliant in the master AICTE record.`}
        confirmText="Confirm Regulatory Clearance"
        confirmVariant="success"
      />
    </PageContainer>
  );
}
