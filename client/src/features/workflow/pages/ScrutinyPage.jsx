import React, { useState } from 'react';
import PageContainer from '../../../components/layout/PageContainer';
import { APPLICATIONS } from '../../../services/mockData';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import StatusBadge from '../../../components/common/StatusBadge';
import ConfirmationModal from '../../../components/common/ConfirmationModal';
import { 
  ClipboardCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  FileText, 
  Building2, 
  UserCheck, 
  Clock, 
  PlusCircle, 
  Calendar 
} from 'lucide-react';

export default function ScrutinyPage() {
  const [selectedAppId, setSelectedAppId] = useState('APP-2026-0841');
  const [checklist, setChecklist] = useState({
    1: true,
    2: true,
    3: false,
    4: true,
  });
  const [deficiencies, setDeficiencies] = useState([
    {
      id: 'DEF-101',
      title: 'Faculty Cadre Ratio Discrepancy',
      description: 'Computer Science department faculty roster lists 18 members, requires 24 for 480 intake capacity.',
      severity: 'HIGH',
      resolved: false,
    },
  ]);
  const [newDefTitle, setNewDefTitle] = useState('');
  const [newDefDesc, setNewDefDesc] = useState('');
  const [showAddDefModal, setShowAddDefModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showRecommendModal, setShowRecommendModal] = useState(false);
  const [actionSuccessMessage, setActionSuccessMessage] = useState(null);

  const currentApp = APPLICATIONS.find((a) => a.id === selectedAppId) || APPLICATIONS[0];

  const handleChecklistToggle = (id) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddDeficiency = (e) => {
    e.preventDefault();
    if (newDefTitle.trim()) {
      const def = {
        id: `DEF-${100 + deficiencies.length + 1}`,
        title: newDefTitle.trim(),
        description: newDefDesc.trim() || 'Documentary evidence clarification required.',
        severity: 'MEDIUM',
        resolved: false,
      };
      setDeficiencies([...deficiencies, def]);
      setNewDefTitle('');
      setNewDefDesc('');
      setShowAddDefModal(false);
      setActionSuccessMessage(`Deficiency ${def.id} recorded in scrutiny registry.`);
    }
  };

  const handleReturnToInstitution = () => {
    setShowReturnModal(false);
    setActionSuccessMessage(
      `Application ${currentApp.id} returned to ${currentApp.institution} with ${deficiencies.length} formal deficiency note(s). 15-day resubmission clock initiated.`
    );
  };

  const handleRecommendForEVC = () => {
    setShowRecommendModal(false);
    setActionSuccessMessage(
      `Scrutiny cleared for ${currentApp.id}. Forwarded to Regional Office for Expert Visit Committee (EVC) scheduling.`
    );
  };

  return (
    <PageContainer
      title="Scrutiny Committee Evaluation Workspace"
      subtitle="Examine institutional compliance documents, record deficiencies, and execute human regulatory transitions"
      action={
        <div className="d-flex align-items-center gap-2">
          <Form.Select
            size="sm"
            value={selectedAppId}
            onChange={(e) => {
              setSelectedAppId(e.target.value);
              setActionSuccessMessage(null);
            }}
            className="shadow-sm fw-semibold font-monospace"
            style={{ width: 220 }}
          >
            {APPLICATIONS.map((app) => (
              <option key={app.id} value={app.id}>
                {app.id} - {app.institution.substring(0, 24)}...
              </option>
            ))}
          </Form.Select>
        </div>
      }
    >
      {/* Action Notification Alert */}
      {actionSuccessMessage && (
        <div className="alert alert-success alert-dismissible fade show d-flex align-items-center justify-content-between p-3 mb-4 shadow-sm" role="alert">
          <div className="d-flex align-items-center gap-2 small">
            <CheckCircle2 size={18} className="text-success flex-shrink-0" />
            <span>{actionSuccessMessage}</span>
          </div>
          <button type="button" className="btn-close" onClick={() => setActionSuccessMessage(null)} />
        </div>
      )}

      {/* Institutional Case Header */}
      <Card className="border shadow-sm mb-4 bg-white">
        <Card.Body className="p-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <span className="font-monospace fw-bold text-primary">{currentApp.id}</span>
                <StatusBadge status={currentApp.status} />
                <span className="badge bg-light text-muted border font-monospace" style={{ fontSize: '0.7rem' }}>
                  {currentApp.region} Region
                </span>
              </div>
              <h5 className="fw-bold text-dark mb-0">{currentApp.institution}</h5>
              <div className="text-muted small mt-1">
                PID: <span className="font-monospace text-dark">{currentApp.institutionId}</span> &bull; Type:{' '}
                <span className="text-dark">{currentApp.type}</span> &bull; Assigned Scrutiny Officer:{' '}
                <span className="text-dark fw-semibold">{currentApp.officer}</span>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2">
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => setShowReturnModal(true)}
                disabled={deficiencies.length === 0}
                className="shadow-sm"
              >
                <AlertTriangle size={14} />
                <span>Return to Institution ({deficiencies.length} Deficiencies)</span>
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowRecommendModal(true)}
                className="shadow-sm"
              >
                <CheckCircle2 size={14} />
                <span>Clear Scrutiny & Recommend EVC</span>
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Row className="g-4">
        {/* Scrutiny Document Checklist */}
        <Col lg={7}>
          <Card className="shadow-sm border h-100">
            <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold mb-0 text-dark">Regulatory Scrutiny Verification Checklist</h6>
                <small className="text-muted">Mandatory verification points as per AICTE Approval Process Handbook (APH 2026)</small>
              </div>
              <Badge bg="primary-subtle" className="text-primary border border-primary-subtle">
                Stage 2: Scrutiny
              </Badge>
            </Card.Header>

            <Card.Body className="p-0">
              <Table hover className="align-middle mb-0" style={{ fontSize: '0.875rem' }}>
                <thead className="table-light">
                  <tr>
                    <th style={{ width: 48 }}>Verify</th>
                    <th>Document / Standard Requirement</th>
                    <th>Officer Finding</th>
                    <th className="text-end">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={checklist[1]}
                        onChange={() => handleChecklistToggle(1)}
                      />
                    </td>
                    <td>
                      <div className="fw-semibold text-dark">Land Ownership & Registered Lease Deed</div>
                      <div className="text-muted small">Minimum contiguous land area norms verified against revenue records.</div>
                    </td>
                    <td className="small text-secondary">Verified against sub-registrar deed (Doc #48291)</td>
                    <td className="text-end">
                      {checklist[1] ? (
                        <Badge bg="success" style={{ fontSize: '0.7rem' }}>VERIFIED</Badge>
                      ) : (
                        <Badge bg="warning text-dark" style={{ fontSize: '0.7rem' }}>PENDING</Badge>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={checklist[2]}
                        onChange={() => handleChecklistToggle(2)}
                      />
                    </td>
                    <td>
                      <div className="fw-semibold text-dark">Occupancy Certificate & Building Plan Approval</div>
                      <div className="text-muted small">Sanctioned building plan from Municipal Corporation / PWD.</div>
                    </td>
                    <td className="small text-secondary">Local civic body occupancy attached & valid</td>
                    <td className="text-end">
                      {checklist[2] ? (
                        <Badge bg="success" style={{ fontSize: '0.7rem' }}>VERIFIED</Badge>
                      ) : (
                        <Badge bg="warning text-dark" style={{ fontSize: '0.7rem' }}>PENDING</Badge>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={checklist[3]}
                        onChange={() => handleChecklistToggle(3)}
                      />
                    </td>
                    <td>
                      <div className="fw-semibold text-dark">Cadre Ratio & Faculty Qualifications</div>
                      <div className="text-muted small">1:20 teacher-student ratio with 1 Professor : 2 Associate : 6 Assistant.</div>
                    </td>
                    <td className="small text-danger fw-semibold">Discrepancy: Shortage of 6 qualified faculty members</td>
                    <td className="text-end">
                      {checklist[3] ? (
                        <Badge bg="success" style={{ fontSize: '0.7rem' }}>VERIFIED</Badge>
                      ) : (
                        <Badge bg="danger" style={{ fontSize: '0.7rem' }}>DEFICIENT</Badge>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={checklist[4]}
                        onChange={() => handleChecklistToggle(4)}
                      />
                    </td>
                    <td>
                      <div className="fw-semibold text-dark">AICTE Pay Scale & Bank Disbursal Proof</div>
                      <div className="text-muted small">Bank statement of faculty salary transfer through PFMS/NEFT.</div>
                    </td>
                    <td className="small text-secondary">Bank disbursal certificate attached</td>
                    <td className="text-end">
                      {checklist[4] ? (
                        <Badge bg="success" style={{ fontSize: '0.7rem' }}>VERIFIED</Badge>
                      ) : (
                        <Badge bg="warning text-dark" style={{ fontSize: '0.7rem' }}>PENDING</Badge>
                      )}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Deficiency Registry & Memo Panel */}
        <Col lg={5}>
          <Card className="shadow-sm border h-100">
            <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold mb-0 text-dark">Identified Deficiencies & Scrutiny Memos</h6>
                <small className="text-muted">Items requiring institutional rectification or clarification</small>
              </div>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => setShowAddDefModal(true)}
                className="d-flex align-items-center gap-1"
              >
                <PlusCircle size={14} />
                <span>Add Memo</span>
              </Button>
            </Card.Header>

            <Card.Body className="p-3">
              {deficiencies.length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  {deficiencies.map((def) => (
                    <div key={def.id} className="p-3 border rounded bg-light border-start border-3 border-danger">
                      <div className="d-flex justify-content-between align-items-start mb-1">
                        <span className="font-monospace fw-bold text-danger small">{def.id}</span>
                        <Badge bg="danger" style={{ fontSize: '0.65rem' }}>OPEN DEFICIENCY</Badge>
                      </div>
                      <div className="fw-semibold text-dark small mb-1">{def.title}</div>
                      <p className="text-muted mb-2" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>
                        {def.description}
                      </p>
                      <div className="d-flex align-items-center justify-content-between pt-2 border-top">
                        <span className="text-muted" style={{ fontSize: '0.7rem' }}>
                          Issued by {currentApp.officer}
                        </span>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="py-0 px-2"
                          style={{ fontSize: '0.7rem' }}
                          onClick={() => {
                            setDeficiencies(deficiencies.filter((d) => d.id !== def.id));
                            setActionSuccessMessage(`Deficiency ${def.id} marked as resolved / deleted.`);
                          }}
                        >
                          Resolve & Dismiss
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5 text-muted">
                  <CheckCircle2 size={36} className="text-success mb-2" />
                  <p className="small mb-0">No open deficiencies for this application. Ready for recommendation.</p>
                </div>
              )}

              {/* Add Deficiency Form (Inline expandable) */}
              {showAddDefModal && (
                <div className="mt-3 p-3 border rounded bg-white shadow-sm">
                  <h6 className="fw-bold small text-dark mb-2">Record New Scrutiny Deficiency</h6>
                  <Form onSubmit={handleAddDeficiency}>
                    <Form.Group className="mb-2">
                      <Form.Label className="small text-muted mb-1">Deficiency Subject</Form.Label>
                      <Form.Control
                        size="sm"
                        placeholder="e.g., Barrier-Free Access certificate missing"
                        value={newDefTitle}
                        onChange={(e) => setNewDefTitle(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="small text-muted mb-1">Regulatory Clause & Specific Finding</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        size="sm"
                        placeholder="Specify required evidence or compliance shortfall..."
                        value={newDefDesc}
                        onChange={(e) => setNewDefDesc(e.target.value)}
                      />
                    </Form.Group>
                    <div className="d-flex justify-content-end gap-2">
                      <Button variant="secondary" size="sm" onClick={() => setShowAddDefModal(false)}>
                        Cancel
                      </Button>
                      <Button variant="danger" size="sm" type="submit">
                        Record Deficiency
                      </Button>
                    </div>
                  </Form>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Confirmation Modals for Regulatory Operations */}
      <ConfirmationModal
        show={showReturnModal}
        onHide={() => setShowReturnModal(false)}
        onConfirm={handleReturnToInstitution}
        title="Return Application to Institution"
        message={`Are you sure you want to return application ${currentApp.id} to ${currentApp.institution}? This will issue ${deficiencies.length} formal deficiency memo(s) and grant a 15-day rectification window.`}
        confirmText="Confirm Return with Deficiencies"
        confirmVariant="danger"
      />

      <ConfirmationModal
        show={showRecommendModal}
        onHide={() => setShowRecommendModal(false)}
        onConfirm={handleRecommendForEVC}
        title="Recommend for Expert Visit Committee (EVC)"
        message={`Confirm that all scrutiny checklist criteria for ${currentApp.id} have been verified in accordance with AICTE approval standards. This will route the application to the Regional Committee / EVC roster.`}
        confirmText="Confirm Recommendation"
        confirmVariant="success"
      />
    </PageContainer>
  );
}
