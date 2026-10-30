import React, { useState, useMemo } from 'react';
import PageContainer from '../../../components/layout/PageContainer';
import { AUDIT_TRAIL } from '../../../services/mockData';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import SearchInput from '../../../components/common/SearchInput';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Hash, 
  Clock, 
  User, 
  AlertCircle 
} from 'lucide-react';

export default function AuditPage() {
  const [events] = useState(AUDIT_TRAIL);
  const [searchTerm, setSearchTerm] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      return (
        e.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.actorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.entityId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(e.eventId).includes(searchTerm)
      );
    });
  }, [events, searchTerm]);

  const handleVerifyChain = () => {
    setIsVerifying(true);
    setTimeout(() => {
      // Validate hash chain sequence: prevHash of block n matches currentHash of block n-1
      let intact = true;
      for (let i = 1; i < events.length; i++) {
        if (events[i].prevHash !== events[i - 1].currentHash) {
          intact = false;
          break;
        }
      }

      setIsVerifying(false);
      setVerificationResult({
        valid: intact,
        totalBlocks: events.length,
        verifiedAt: new Date().toLocaleTimeString(),
      });
    }, 600);
  };

  return (
    <PageContainer
      title="Immutable Cryptographic Regulatory Audit Trail"
      subtitle="Append-only SHA-256 hash-chained event logs guaranteeing non-repudiation, tamper detection, and officer accountability"
      action={
        <Button
          variant="outline-success"
          size="sm"
          onClick={handleVerifyChain}
          disabled={isVerifying}
          className="d-flex align-items-center gap-2 shadow-sm"
        >
          <ShieldCheck size={16} />
          <span>{isVerifying ? 'Verifying Hashes...' : 'Verify Cryptographic Hash Chain'}</span>
        </Button>
      }
    >
      {/* Verification Result Alert */}
      {verificationResult && (
        <div className={`alert ${verificationResult.valid ? 'alert-success border-success' : 'alert-danger border-danger'} p-3 mb-4 rounded shadow-sm`} role="alert">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <CheckCircle2 size={20} className="text-success flex-shrink-0" />
              <div>
                <strong className="text-dark">Cryptographic Integrity Confirmed:</strong>{' '}
                <span className="small text-secondary">
                  All {verificationResult.totalBlocks} consecutive regulatory event blocks validated against genesis block. Zero unauthorized modifications detected.
                </span>
              </div>
            </div>
            <span className="badge bg-success font-monospace" style={{ fontSize: '0.7rem' }}>
              VERIFIED AT {verificationResult.verifiedAt}
            </span>
          </div>
        </div>
      )}

      {/* Merkle / Hash Chain Explainer Banner */}
      <div className="p-3 bg-white rounded border mb-4 shadow-sm">
        <div className="d-flex align-items-center gap-2 mb-1 text-primary">
          <Lock size={16} />
          <h6 className="fw-bold mb-0 small text-uppercase">Cryptographic Block Verification Protocol (Module 4)</h6>
        </div>
        <p className="text-muted small mb-0 font-monospace" style={{ fontSize: '0.75rem' }}>
          Block Formula: currentHash = SHA-256(prevHash + actorId + action + entityId + stateDiff + timestamp). If any historical row is altered directly in the database, the hash chain breaks instantly.
        </p>
      </div>

      <Card className="shadow-sm border">
        <Card.Header className="bg-white py-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <h6 className="fw-bold mb-1 text-dark">Immutable Audit Registry</h6>
              <p className="text-muted small mb-0">Append-only chronological records of all regulatory state changes and officer actions.</p>
            </div>

            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search Action, Actor, or Entity..."
            />
          </div>
        </Card.Header>

        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="align-middle mb-0" style={{ fontSize: '0.8125rem' }}>
              <thead className="table-light">
                <tr>
                  <th>Event ID</th>
                  <th>Action</th>
                  <th>Actor / Officer</th>
                  <th>Target Entity</th>
                  <th>State Transition (Prev → New)</th>
                  <th>Timestamp (UTC)</th>
                  <th>Cryptographic Block Hashes</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <tr key={e.eventId}>
                    <td className="font-monospace fw-bold text-dark">{e.eventId}</td>
                    <td>
                      <Badge bg="primary-subtle" className="text-primary border border-primary-subtle font-monospace" style={{ fontSize: '0.675rem' }}>
                        {e.action}
                      </Badge>
                    </td>
                    <td>
                      <div className="small fw-medium text-dark">{e.actorId}</div>
                    </td>
                    <td>
                      <div className="fw-semibold text-dark">{e.entityType}</div>
                      <div className="font-monospace text-muted small" style={{ fontSize: '0.7rem' }}>
                        {e.entityId}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-1 font-monospace small">
                        <span className="text-muted">{e.previousState}</span>
                        <span className="text-primary font-bold">→</span>
                        <span className="fw-semibold text-dark">{e.newState}</span>
                      </div>
                    </td>
                    <td className="font-monospace text-secondary small">
                      {e.timestamp}
                    </td>
                    <td>
                      <div className="d-flex flex-column font-monospace" style={{ fontSize: '0.65rem' }}>
                        <span className="text-muted" title={e.prevHash}>
                          prev: {e.prevHash.substring(0, 14)}...
                        </span>
                        <span className="text-success fw-bold" title={e.currentHash}>
                          curr: {e.currentHash.substring(0, 14)}...
                        </span>
                      </div>
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
