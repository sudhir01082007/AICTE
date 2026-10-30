import React, { useState, useMemo } from 'react';
import PageContainer from '../../../components/layout/PageContainer';
import { INSTITUTIONS } from '../../../services/mockData';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchInput from '../../../components/common/SearchInput';
import FilterDropdown from '../../../components/common/FilterDropdown';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Eye, 
  FileText, 
  CheckCircle2 
} from 'lucide-react';

export default function InstitutionsPage() {
  const [institutions] = useState(INSTITUTIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('ALL');
  const [selectedInst, setSelectedInst] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filtered = useMemo(() => {
    return institutions.filter((inst) => {
      const matchSearch =
        inst.pid.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inst.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inst.principal.toLowerCase().includes(searchTerm.toLowerCase());

      const matchRegion = regionFilter === 'ALL' || inst.region === regionFilter;
      return matchSearch && matchRegion;
    });
  }, [institutions, searchTerm, regionFilter]);

  const handleOpenDetails = (inst) => {
    setSelectedInst(inst);
    setShowModal(true);
  };

  return (
    <PageContainer
      title="National Technical Institutions Directory"
      subtitle="Registry of AICTE recognized engineering colleges, polytechnics, management institutions, and state universities"
    >
      <Card className="shadow-sm border">
        <Card.Header className="bg-white py-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <h6 className="fw-bold mb-1 text-dark">Approved Institutions Directory</h6>
              <p className="text-muted small mb-0">Institutions with active AICTE Permanent Institute IDs (PID) for AY 2026-27.</p>
            </div>

            <div className="d-flex flex-wrap align-items-center gap-2">
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search PID, College, State..."
              />
              <FilterDropdown
                label="Region"
                value={regionFilter}
                onChange={setRegionFilter}
                options={[
                  { value: 'ALL', label: 'All Regions' },
                  { value: 'Northern', label: 'Northern' },
                  { value: 'Western', label: 'Western' },
                  { value: 'Southern', label: 'Southern' },
                  { value: 'Eastern', label: 'Eastern' },
                  { value: 'Central', label: 'Central' },
                  { value: 'North-Western', label: 'North-Western' },
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
                  <th>AICTE PID</th>
                  <th>Institution Name</th>
                  <th>Institutional Category</th>
                  <th>State & Region</th>
                  <th>Head of Institution</th>
                  <th className="text-center">Campus Land</th>
                  <th>Lease Validity</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((inst) => (
                  <tr key={inst.pid}>
                    <td className="font-monospace fw-bold text-primary">{inst.pid}</td>
                    <td>
                      <div className="fw-semibold text-dark">{inst.name}</div>
                      <div className="text-muted small" style={{ fontSize: '0.725rem' }}>
                        {inst.city}, {inst.state}
                      </div>
                    </td>
                    <td className="small text-secondary">{inst.type}</td>
                    <td>
                      <div className="d-flex align-items-center gap-1 small text-dark">
                        <MapPin size={13} className="text-muted" />
                        <span>{inst.region} Region</span>
                      </div>
                    </td>
                    <td>
                      <div className="small fw-medium text-dark">{inst.principal}</div>
                      <div className="text-muted" style={{ fontSize: '0.7rem' }}>{inst.email}</div>
                    </td>
                    <td className="text-center font-monospace small">
                      {inst.landAreaAcres} Acres
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          inst.leaseStatus === 'OVERDUE'
                            ? 'bg-danger'
                            : inst.leaseStatus === 'NEAR_EXPIRY'
                            ? 'bg-warning text-dark'
                            : 'bg-success'
                        }`}
                        style={{ fontSize: '0.7rem' }}
                      >
                        {inst.leaseExpiryDate}
                      </span>
                    </td>
                    <td className="text-end">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="py-1 px-2"
                        onClick={() => handleOpenDetails(inst)}
                      >
                        <Eye size={12} className="me-1 inline" />
                        <span>Profile</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Institutional Dossier Modal */}
      {selectedInst && (
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
          <Modal.Header closeButton className="border-bottom bg-light">
            <div>
              <span className="font-monospace fw-bold text-primary small">{selectedInst.pid}</span>
              <Modal.Title className="h5 fw-bold text-dark m-0">{selectedInst.name}</Modal.Title>
            </div>
          </Modal.Header>
          <Modal.Body className="p-4">
            <div className="p-3 bg-light rounded border mb-3">
              <Row className="g-3 small">
                <Col md={6}>
                  <div className="text-muted text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>Address</div>
                  <div className="text-dark fw-medium">{selectedInst.address}</div>
                </Col>
                <Col md={6}>
                  <div className="text-muted text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>Classification</div>
                  <div className="text-dark fw-medium">{selectedInst.type} &bull; {selectedInst.region} Region</div>
                </Col>
                <Col md={6}>
                  <div className="text-muted text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>Principal / Director</div>
                  <div className="text-dark fw-medium">{selectedInst.principal}</div>
                  <div className="text-muted">{selectedInst.email} &bull; {selectedInst.phone}</div>
                </Col>
                <Col md={6}>
                  <div className="text-muted text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>Campus Infrastructure</div>
                  <div className="text-dark fw-medium">{selectedInst.landAreaAcres} Contiguous Acres</div>
                  <div className="text-muted">Lease Valid Through: {selectedInst.leaseExpiryDate}</div>
                </Col>
              </Row>
            </div>
            <p className="text-muted small mb-0">
              This institution has <strong>1 active application</strong> registered under the AY 2026-27 AICTE approval cycle.
            </p>
          </Modal.Body>
          <Modal.Footer className="border-top bg-light">
            <Button variant="secondary" size="sm" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setShowModal(false);
                window.location.href = `/applications?search=${selectedInst.name}`;
              }}
            >
              View Related Applications →
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </PageContainer>
  );
}
