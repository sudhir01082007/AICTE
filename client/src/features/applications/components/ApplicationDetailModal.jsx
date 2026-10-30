import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import StatusBadge from '../../../components/common/StatusBadge';
import { 
  Building2, 
  Calendar, 
  Clock, 
  UserCheck, 
  FileText, 
  MapPin, 
  GraduationCap, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export default function ApplicationDetailModal({ application, show, onHide }) {
  if (!application) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="border-bottom bg-light">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="font-monospace fw-bold text-primary">{application.id}</span>
            <StatusBadge status={application.status} />
          </div>
          <Modal.Title className="h5 fw-bold text-dark m-0">
            {application.institution}
          </Modal.Title>
        </div>
      </Modal.Header>

      <Modal.Body className="p-4">
        {/* Core Regulatory Details */}
        <div className="p-3 bg-light rounded border mb-4">
          <Row className="g-3">
            <Col sm={6} md={4}>
              <div className="text-muted small text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>
                Application Type
              </div>
              <div className="fw-semibold text-dark small">{application.type}</div>
            </Col>
            <Col sm={6} md={4}>
              <div className="text-muted small text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>
                Region
              </div>
              <div className="d-flex align-items-center gap-1 text-dark small">
                <MapPin size={13} className="text-muted" /> {application.region || 'Northern'}
              </div>
            </Col>
            <Col sm={6} md={4}>
              <div className="text-muted small text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>
                Current Stage
              </div>
              <div className="small fw-bold text-primary">{application.stage}</div>
            </Col>
            <Col sm={6} md={4}>
              <div className="text-muted small text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>
                Submission Date
              </div>
              <div className="d-flex align-items-center gap-1 text-dark small">
                <Calendar size={13} className="text-muted" /> {application.submissionDate}
              </div>
            </Col>
            <Col sm={6} md={4}>
              <div className="text-muted small text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>
                Application Ageing
              </div>
              <div className="d-flex align-items-center gap-1 text-dark small">
                <Clock size={13} className="text-muted" /> {application.ageingDays} Days Elapsed
              </div>
            </Col>
            <Col sm={6} md={4}>
              <div className="text-muted small text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>
                Assigned Officer
              </div>
              <div className="d-flex align-items-center gap-1 text-dark small">
                <UserCheck size={13} className="text-muted" /> {application.officer || 'Unassigned'}
              </div>
            </Col>
          </Row>
        </div>

        {/* Academic Program Scope */}
        <h6 className="fw-bold text-dark mb-2 d-flex align-items-center gap-2">
          <GraduationCap size={16} className="text-primary" />
          Proposed Program & Intake Capacities
        </h6>
        <div className="table-responsive border rounded mb-4">
          <table className="table table-sm table-striped mb-0" style={{ fontSize: '0.8125rem' }}>
            <thead className="table-light">
              <tr>
                <th>Course Name</th>
                <th>Program Level</th>
                <th>Shift</th>
                <th className="text-end">Approved Intake</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Computer Science & Engineering (AI & ML)</td>
                <td>Under Graduate (B.Tech)</td>
                <td>Regular</td>
                <td className="text-end fw-semibold">120</td>
              </tr>
              <tr>
                <td>Electronics & Communication Engineering</td>
                <td>Under Graduate (B.Tech)</td>
                <td>Regular</td>
                <td className="text-end fw-semibold">60</td>
              </tr>
              <tr>
                <td>Data Science & Analytics</td>
                <td>Post Graduate (M.Tech)</td>
                <td>Regular</td>
                <td className="text-end fw-semibold">30</td>
              </tr>
            </tbody>
            <tfoot className="table-light fw-bold">
              <tr>
                <td colSpan={3}>Total Requested Intake Capacity</td>
                <td className="text-end text-primary">{application.intakeTotal || 210} Seats</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Dynamic Workflow Progression Pipeline */}
        <h6 className="fw-bold text-dark mb-2 d-flex align-items-center gap-2">
          <ShieldCheck size={16} className="text-primary" />
          Workflow Stage Tracking
        </h6>
        <div className="p-3 bg-light rounded border">
          <div className="d-flex flex-column gap-2 small">
            <div className="d-flex align-items-center gap-2 text-success">
              <CheckCircle2 size={16} />
              <span className="fw-semibold">Stage 1: Application Registered & Fee Verified</span>
              <span className="text-muted ms-auto" style={{ fontSize: '0.75rem' }}>{application.submissionDate}</span>
            </div>
            <div className="d-flex align-items-center gap-2 text-primary">
              <Clock size={16} />
              <span className="fw-semibold">Stage 2: Scrutiny Committee Review (Active)</span>
              <Badge bg="primary" className="ms-auto" style={{ fontSize: '0.65rem' }}>In Progress</Badge>
            </div>
            <div className="d-flex align-items-center gap-2 text-muted">
              <span className="badge rounded-circle bg-secondary p-1" style={{ width: 8, height: 8 }} />
              <span>Stage 3: Expert Visit Committee (EVC Inspection)</span>
              <span className="ms-auto" style={{ fontSize: '0.75rem' }}>Conditional</span>
            </div>
            <div className="d-flex align-items-center gap-2 text-muted">
              <span className="badge rounded-circle bg-secondary p-1" style={{ width: 8, height: 8 }} />
              <span>Stage 4: Regional Committee Hearing</span>
              <span className="ms-auto" style={{ fontSize: '0.75rem' }}>Pending</span>
            </div>
            <div className="d-flex align-items-center gap-2 text-muted">
              <span className="badge rounded-circle bg-secondary p-1" style={{ width: 8, height: 8 }} />
              <span>Stage 5: Final Human Regulatory Authority Determination</span>
              <span className="ms-auto" style={{ fontSize: '0.75rem' }}>Pending</span>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="border-top bg-light">
        <Button variant="secondary" size="sm" onClick={onHide}>
          Close
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            onHide();
            window.location.href = `/scrutiny?appId=${application.id}`;
          }}
        >
          Open Scrutiny Workspace →
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

