import React, { useState, useMemo } from 'react';
import PageContainer from '../../../components/layout/PageContainer';
import { EVC_SCHEDULES, APPLICATIONS } from '../../../services/mockData';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchInput from '../../../components/common/SearchInput';
import FilterDropdown from '../../../components/common/FilterDropdown';
import { 
  CalendarDays, 
  MapPin, 
  Users, 
  PlusCircle, 
  CheckCircle2, 
  Eye, 
  FileCheck2, 
  ShieldCheck 
} from 'lucide-react';

export default function EVCPage() {
  const [schedules, setSchedules] = useState(EVC_SCHEDULES);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Schedule modal state
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [newAppId, setNewAppId] = useState('APP-2026-0915');
  const [newDate, setNewDate] = useState('2026-11-18');
  const [newChair, setNewChair] = useState('Prof. D. K. Agarwal (IIT Delhi)');
  const [newExpert, setNewExpert] = useState('Dr. S. K. Bose (NIT Durgapur)');
  const [actionNotice, setActionNotice] = useState(null);

  const filtered = useMemo(() => {
    return schedules.filter((s) => {
      const matchSearch =
        s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.committeeChair.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = statusFilter === 'ALL' || s.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [schedules, searchTerm, statusFilter]);

  const handleCreateSchedule = (e) => {
    e.preventDefault();
    const app = APPLICATIONS.find((a) => a.id === newAppId);
    const newEntry = {
      id: `EVC-2026-${String(schedules.length + 50).padStart(4, '0')}`,
      applicationId: newAppId,
      institution: app?.institution || 'Technical Institution',
      visitDate: newDate,
      status: 'SCHEDULED',
      committeeChair: newChair,
      experts: [newExpert, 'Regional PWD Engineer (Empanelled)'],
      reportingOffice: `${app?.region || 'Northern'} Regional Office`,
      checklistCompleted: 0,
      totalChecklist: 12,
    };

    setSchedules([newEntry, ...schedules]);
    setShowScheduleModal(false);
    setActionNotice(`Expert Visit Committee inspection successfully scheduled under ID: ${newEntry.id}.`);
  };

  return (
    <PageContainer
      title="Expert Visit Committee (EVC) Operations"
      subtitle="Organize expert inspection panels, assign geo-tagged inspection schedules, and manage physical infrastructure audits"
      action={
        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowScheduleModal(true)}
          className="d-flex align-items-center gap-1 shadow-sm"
        >
          <PlusCircle size={15} />
          <span>Schedule New EVC</span>
        </Button>
      }
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

      <Card className="shadow-sm border mb-4">
        <Card.Header className="bg-white py-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <h6 className="fw-bold mb-1 text-dark">Active & Scheduled Physical Inspections</h6>
              <p className="text-muted small mb-0">Inspections require dual-expert roster verification and geotagged timestamped photo uploads.</p>
            </div>

            <div className="d-flex flex-wrap align-items-center gap-2">
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search Inspection ID, Institution..."
              />
              <FilterDropdown
                label="Status"
                value={statusFilter}
                onChange={setStatusFilter}
                options={[
                  { value: 'ALL', label: 'All Statuses' },
                  { value: 'SCHEDULED', label: 'Scheduled' },
                  { value: 'PANEL_CONFIRMED', label: 'Panel Confirmed' },
                  { value: 'REPORT_SUBMITTED', label: 'Report Submitted' },
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
                  <th>EVC Visit ID</th>
                  <th>Application Ref</th>
                  <th>Institution Under Inspection</th>
                  <th>Inspection Date</th>
                  <th>Committee Chairman & Experts</th>
                  <th>Reporting Office</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id}>
                    <td className="font-monospace fw-bold text-primary">{s.id}</td>
                    <td className="font-monospace fw-semibold text-secondary">{s.applicationId}</td>
                    <td>
                      <div className="fw-semibold text-dark">{s.institution}</div>
                      <div className="text-muted small" style={{ fontSize: '0.725rem' }}>
                        Physical Campus Verification Protocol
                      </div>
                    </td>
                    <td className="font-monospace text-dark">
                      <div className="d-flex align-items-center gap-1">
                        <CalendarDays size={13} className="text-primary" />
                        <span>{s.visitDate}</span>
                      </div>
                    </td>
                    <td>
                      <div className="fw-semibold text-dark">{s.committeeChair}</div>
                      <div className="text-muted small" style={{ fontSize: '0.725rem' }}>
                        {s.experts.join(' &bull; ')}
                      </div>
                    </td>
                    <td className="text-secondary small">{s.reportingOffice}</td>
                    <td>
                      <Badge bg={s.status === 'SCHEDULED' ? 'primary' : 'info'} style={{ fontSize: '0.7rem' }}>
                        {s.status}
                      </Badge>
                    </td>
                    <td className="text-end">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="py-1 px-2"
                        onClick={() => alert(`EVC Inspection Dossier for ${s.id} opened. Assigned to ${s.committeeChair}`)}
                      >
                        <Eye size={13} className="me-1 inline" />
                        <span>Dossier</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Schedule EVC Modal */}
      <Modal show={showScheduleModal} onHide={() => setShowScheduleModal(false)} centered>
        <Modal.Header closeButton className="border-bottom">
          <Modal.Title className="h6 fw-bold text-dark m-0 d-flex align-items-center gap-2">
            <CalendarDays size={18} className="text-primary" />
            Schedule Expert Visit Committee Inspection
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleCreateSchedule}>
          <Modal.Body className="p-4">
            <Form.Group className="mb-3">
              <Form.Label className="small text-muted fw-semibold">Target Application</Form.Label>
              <Form.Select
                size="sm"
                value={newAppId}
                onChange={(e) => setNewAppId(e.target.value)}
                required
              >
                {APPLICATIONS.map((app) => (
                  <option key={app.id} value={app.id}>
                    {app.id} - {app.institution} ({app.type})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="small text-muted fw-semibold">Inspection Date</Form.Label>
              <Form.Control
                type="date"
                size="sm"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="small text-muted fw-semibold">Committee Chairman (Senior Professor / Director)</Form.Label>
              <Form.Control
                size="sm"
                value={newChair}
                onChange={(e) => setNewChair(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="small text-muted fw-semibold">Domain Subject Expert</Form.Label>
              <Form.Control
                size="sm"
                value={newExpert}
                onChange={(e) => setNewExpert(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Check
              type="checkbox"
              id="geo-tag-req"
              label="Mandatory Geotagged & Timestamped Photo Uploads via AICTE Mobile App"
              defaultChecked
              className="small text-dark fw-medium"
            />
          </Modal.Body>
          <Modal.Footer className="border-top bg-light">
            <Button variant="secondary" size="sm" onClick={() => setShowScheduleModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Confirm & Dispatch EVC Notice
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </PageContainer>
  );
}
