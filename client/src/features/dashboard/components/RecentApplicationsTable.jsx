import React, { useState, useMemo } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StatusBadge from '../../../components/common/StatusBadge';
import SearchInput from '../../../components/common/SearchInput';
import FilterDropdown from '../../../components/common/FilterDropdown';
import Pagination from '../../../components/common/Pagination';
import EmptyState from '../../../components/common/EmptyState';
import ApplicationDetailModal from '../../applications/components/ApplicationDetailModal';
import { 
  Eye, 
  ArrowUpDown, 
  Calendar, 
  UserCheck, 
  Clock, 
  SlidersHorizontal 
} from 'lucide-react';

export default function RecentApplicationsTable({ applications = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortField, setSortField] = useState('submissionDate');
  const [sortDirection, setSortDirection] = useState('desc'); // 'asc' or 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Filtering
  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (app.officer && app.officer.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStage = stageFilter === 'ALL' || app.stage === stageFilter;
      const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;

      return matchesSearch && matchesStage && matchesStatus;
    });
  }, [applications, searchTerm, stageFilter, statusFilter]);

  // Sorting
  const sortedApps = useMemo(() => {
    return [...filteredApps].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortField === 'ageingDays') {
        aVal = Number(aVal);
        bVal = Number(bVal);
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredApps, sortField, sortDirection]);

  // Pagination
  const totalItems = sortedApps.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const paginatedApps = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedApps.slice(start, start + pageSize);
  }, [sortedApps, currentPage, pageSize]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleViewDetails = (app) => {
    setSelectedApp(app);
    setShowDetailModal(true);
  };

  return (
    <>
      <Card className="shadow-sm border">
        <Card.Header className="bg-white py-3">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
            <div>
              <h5 className="h6 fw-bold mb-1 text-dark">Recent Institutional Applications</h5>
              <p className="text-muted small mb-0">
                Track live stage progression, scrutiny officer assignments, and SLA ageing indicators.
              </p>
            </div>

            {/* Table Controls (Search & Filter) */}
            <div className="d-flex flex-wrap align-items-center gap-2">
              <SearchInput
                value={searchTerm}
                onChange={(val) => {
                  setSearchTerm(val);
                  setCurrentPage(1);
                }}
                placeholder="Search ID, College, Officer..."
              />

              <FilterDropdown
                label="Stage"
                value={stageFilter}
                onChange={(val) => {
                  setStageFilter(val);
                  setCurrentPage(1);
                }}
                options={[
                  { value: 'ALL', label: 'All Stages' },
                  { value: 'SUBMITTED', label: 'Submitted' },
                  { value: 'UNDER_SCRUTINY', label: 'Scrutiny Committee' },
                  { value: 'RE_SCRUTINY', label: 'Re-Scrutiny' },
                  { value: 'UNDER_EVC', label: 'EVC Inspection' },
                  { value: 'REGIONAL_COMMITTEE', label: 'Regional Committee' },
                  { value: 'SAC_SHC', label: 'SAC / SHC' },
                  { value: 'APPROVED', label: 'Approved' },
                ]}
              />

              <FilterDropdown
                label="Status"
                value={statusFilter}
                onChange={(val) => {
                  setStatusFilter(val);
                  setCurrentPage(1);
                }}
                options={[
                  { value: 'ALL', label: 'All Statuses' },
                  { value: 'SUBMITTED', label: 'Submitted' },
                  { value: 'UNDER_SCRUTINY', label: 'Under Scrutiny' },
                  { value: 'DEFICIENT', label: 'Deficiency Issued' },
                  { value: 'EVC_SCHEDULED', label: 'EVC Scheduled' },
                  { value: 'SLA_BREACHED', label: 'SLA Overdue' },
                  { value: 'APPROVED', label: 'Approved' },
                ]}
              />
            </div>
          </div>
        </Card.Header>

        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead>
                <tr>
                  <th onClick={() => handleSort('id')} className="cursor-pointer">
                    <div className="d-flex align-items-center gap-1">
                      <span>Application ID</span>
                      <ArrowUpDown size={12} className="text-muted" />
                    </div>
                  </th>
                  <th>Institution Name</th>
                  <th>Application Type</th>
                  <th>Current Stage</th>
                  <th>Assigned Officer</th>
                  <th onClick={() => handleSort('submissionDate')} className="cursor-pointer">
                    <div className="d-flex align-items-center gap-1">
                      <span>Submitted</span>
                      <ArrowUpDown size={12} className="text-muted" />
                    </div>
                  </th>
                  <th onClick={() => handleSort('ageingDays')} className="cursor-pointer text-center">
                    <div className="d-flex align-items-center justify-content-center gap-1">
                      <span>Ageing</span>
                      <ArrowUpDown size={12} className="text-muted" />
                    </div>
                  </th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedApps.length > 0 ? (
                  paginatedApps.map((app) => (
                    <tr key={app.id}>
                      <td className="font-monospace fw-bold text-primary small">
                        {app.id}
                      </td>
                      <td>
                        <div className="fw-semibold text-dark small">{app.institution}</div>
                        <div className="text-muted" style={{ fontSize: '0.725rem' }}>
                          Region: {app.region || 'Central'} &bull; {app.coursesCount || 4} Courses
                        </div>
                      </td>
                      <td className="small text-secondary">{app.type}</td>
                      <td className="small fw-medium text-dark">{app.stage}</td>
                      <td className="small text-secondary">
                        <div className="d-flex align-items-center gap-1">
                          <UserCheck size={13} className="text-muted" />
                          <span>{app.officer || 'Unassigned'}</span>
                        </div>
                      </td>
                      <td className="small text-secondary font-monospace">
                        {app.submissionDate}
                      </td>
                      <td className="text-center">
                        <span
                          className={`badge ${
                            app.ageingDays > 40
                              ? 'bg-danger-subtle text-danger border border-danger'
                              : app.ageingDays > 20
                              ? 'bg-warning-subtle text-warning-emphasis border border-warning'
                              : 'bg-light text-dark border'
                          }`}
                          style={{ fontSize: '0.75rem' }}
                        >
                          {app.ageingDays}d
                        </span>
                      </td>
                      <td>
                        <StatusBadge status={app.status} />
                      </td>
                      <td className="text-end">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="py-1 px-2"
                          onClick={() => handleViewDetails(app)}
                          title="Inspect application details"
                        >
                          <Eye size={13} />
                          <span className="small ms-1">View</span>
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="p-4">
                      <EmptyState
                        title="No matching applications"
                        message="Try clearing your search query or reset the stage and status filters."
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>

        {totalPages > 1 && (
          <Card.Footer className="bg-white border-top py-2">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={pageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </Card.Footer>
        )}
      </Card>

      {/* Application Detail Modal */}
      <ApplicationDetailModal
        application={selectedApp}
        show={showDetailModal}
        onHide={() => setShowDetailModal(false)}
      />
    </>
  );
}

