import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import PageContainer from '../../../components/layout/PageContainer';
import StatCard from '../../../components/common/StatCard';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import ApplicationTrendChart from '../../../components/charts/ApplicationTrendChart';
import WorkflowDistributionChart from '../../../components/charts/WorkflowDistributionChart';
import RegionalPendencyChart from '../../../components/charts/RegionalPendencyChart';
import ComplianceChart from '../../../components/charts/ComplianceChart';
import RecentApplicationsTable from '../components/RecentApplicationsTable';
import { 
  getDashboardSummary, 
  getApplicationTrends, 
  getStageDistribution, 
  getRegionalPendency, 
  getComplianceStatus, 
  getRecentApplications,
  MOCK_INDICATOR
} from '../services/dashboardService';
import { 
  FileText, 
  Clock, 
  ClipboardCheck, 
  AlertTriangle, 
  ShieldAlert, 
  FileClock, 
  RefreshCw, 
  Calendar, 
  Download,
  Info
} from 'lucide-react';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [summary, setSummary] = useState(null);
  const [trends, setTrends] = useState([]);
  const [stages, setStages] = useState([]);
  const [regional, setRegional] = useState([]);
  const [compliance, setCompliance] = useState([]);
  const [applications, setApplications] = useState([]);
  const [isSynthetic, setIsSynthetic] = useState(false);

  const loadDashboardData = async () => {
    try {
      const [
        sumRes,
        trendRes,
        stageRes,
        regRes,
        compRes,
        appRes,
      ] = await Promise.all([
        getDashboardSummary(),
        getApplicationTrends(),
        getStageDistribution(),
        getRegionalPendency(),
        getComplianceStatus(),
        getRecentApplications(),
      ]);

      setSummary(sumRes.data);
      setIsSynthetic(sumRes.isMock);
      setTrends(trendRes.data);
      setStages(stageRes.data);
      setRegional(regRes.data);
      setCompliance(compRes.data);
      setApplications(appRes.data);
    } catch (err) {
      console.error('Failed to load dashboard statistics:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadDashboardData();
  };

  if (loading) {
    return <LoadingSpinner message="Aggregating AICTE national regulatory workflow data..." />;
  }

  return (
    <PageContainer
      title="National Pendency & Regulatory Control Dashboard"
      subtitle="Real-time multi-stage approval tracking, SLA violation alerts, and institutional compliance monitoring"
      action={
        <div className="d-flex align-items-center gap-2">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="d-flex align-items-center gap-1 shadow-sm"
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            <span>{refreshing ? 'Refreshing...' : 'Sync Data'}</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => window.print()}
            className="d-flex align-items-center gap-1 shadow-sm"
          >
            <Download size={14} />
            <span>Export Brief</span>
          </Button>
        </div>
      }
    >
      {/* Synthetic Demonstration Notice Banner (Strictly transparent about mock adapter) */}
      {isSynthetic && (
        <div className="alert alert-info border-info d-flex align-items-center justify-content-between p-2 px-3 mb-4 rounded shadow-sm" style={{ fontSize: '0.8125rem' }}>
          <div className="d-flex align-items-center gap-2">
            <Info size={16} className="text-info flex-shrink-0" />
            <span>
              <strong>Demonstration Mode:</strong> Dashboard is rendered via calibrated regulatory mock data adapter. Will bind to live PostgreSQL metrics upon Phase 2 schema execution.
            </span>
          </div>
          <span className="badge bg-info text-dark font-monospace" style={{ fontSize: '0.675rem' }}>
            DEMO ADAPTER
          </span>
        </div>
      )}

      {/* 6 Core Regulatory KPI Cards */}
      <Row className="g-3 mb-4">
        <Col sm={6} lg={4} xl={2}>
          <StatCard
            title="Total Submissions"
            value={summary?.totalApplications || 0}
            trend={summary?.totalTrend}
            trendPositive={true}
            subtext="AY 2026-27 Cycle"
            icon={FileText}
            variant="primary"
          />
        </Col>

        <Col sm={6} lg={4} xl={2}>
          <StatCard
            title="Active Pendency"
            value={summary?.pendingApplications || 0}
            trend={summary?.pendingTrend}
            trendPositive={false}
            subtext="In regulatory stages"
            icon={Clock}
            variant="info"
          />
        </Col>

        <Col sm={6} lg={4} xl={2}>
          <StatCard
            title="Under Scrutiny"
            value={summary?.underScrutiny || 0}
            subtext={summary?.scrutinySubtext || 'Stage 2 evaluation'}
            icon={ClipboardCheck}
            variant="primary"
          />
        </Col>

        <Col sm={6} lg={4} xl={2}>
          <StatCard
            title="SLA Overdue"
            value={summary?.overdueApplications || 0}
            trend={summary?.overdueTrend}
            trendPositive={false}
            subtext="Immediate review needed"
            icon={ShieldAlert}
            variant="danger"
          />
        </Col>

        <Col sm={6} lg={4} xl={2}>
          <StatCard
            title="Active Undertakings"
            value={summary?.activeUndertakings || 0}
            subtext={summary?.undertakingSubtext || 'Conditional approvals'}
            icon={AlertTriangle}
            variant="warning"
          />
        </Col>

        <Col sm={6} lg={4} xl={2}>
          <StatCard
            title="Documents Expiring"
            value={summary?.documentsNearExpiry || 0}
            subtext={summary?.expirySubtext || 'Leases / safety certs'}
            icon={FileClock}
            variant="warning"
          />
        </Col>
      </Row>

      {/* 4 Analytics Visualisations */}
      <Row className="g-4 mb-4">
        {/* A. Monthly Application Trend */}
        <Col lg={6}>
          <Card className="h-100 shadow-sm border">
            <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold mb-0 text-dark">Application Inflow & Resolution Velocity</h6>
                <small className="text-muted">Monthly comparison of received, completed and in-progress applications</small>
              </div>
            </Card.Header>
            <Card.Body>
              <ApplicationTrendChart data={trends} />
            </Card.Body>
          </Card>
        </Col>

        {/* B. Workflow Stage Distribution */}
        <Col lg={6}>
          <Card className="h-100 shadow-sm border">
            <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold mb-0 text-dark">Stage-Wise Workload & Bottleneck Distribution</h6>
                <small className="text-muted">Live distribution of active applications across evaluation tiers</small>
              </div>
            </Card.Header>
            <Card.Body>
              <WorkflowDistributionChart data={stages} />
            </Card.Body>
          </Card>
        </Col>

        {/* C. Regional Pendency */}
        <Col lg={8}>
          <Card className="h-100 shadow-sm border">
            <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold mb-0 text-dark">Regional Office Pendency & SLA Compliance</h6>
                <small className="text-muted">Breakdown of applications across Northern, Western, Southern, Eastern regions</small>
              </div>
            </Card.Header>
            <Card.Body>
              <RegionalPendencyChart data={regional} />
            </Card.Body>
          </Card>
        </Col>

        {/* D. Compliance Breakdown */}
        <Col lg={4}>
          <Card className="h-100 shadow-sm border">
            <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold mb-0 text-dark">Undertaking Compliance Status</h6>
                <small className="text-muted">Compliance ratio across institutional legal covenants</small>
              </div>
            </Card.Header>
            <Card.Body>
              <ComplianceChart data={compliance} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Applications Interactive Table */}
      <RecentApplicationsTable applications={applications} />
    </PageContainer>
  );
}

