import api from '../../../services/api';
import { APPLICATIONS } from '../../../services/mockData';

/**
 * AICTE Regulatory Dashboard Data Service
 * Integrates with Backend Pendency & Analytics API.
 * Uses clearly identified synthetic demonstration defaults when backend database is pending migrations.
 */

export const MOCK_INDICATOR = '[SYNTHETIC DEMONSTRATION DATA]';

const DEMO_KPI_DATA = {
  totalApplications: 1248,
  totalTrend: '+8.4%',
  pendingApplications: 412,
  pendingTrend: '-3.2%',
  underScrutiny: 168,
  scrutinySubtext: '42 near 15-day SLA',
  overdueApplications: 29,
  overdueTrend: '+5 this week',
  activeUndertakings: 340,
  undertakingSubtext: '92 awaiting evidence',
  documentsNearExpiry: 18,
  expirySubtext: '12 land leases < 30 days',
};

const DEMO_APPLICATION_TRENDS = [
  { month: 'Jun', total: 110, completed: 85, pending: 25 },
  { month: 'Jul', total: 145, completed: 115, pending: 30 },
  { month: 'Aug', total: 190, completed: 140, pending: 50 },
  { month: 'Sep', total: 240, completed: 180, pending: 60 },
  { month: 'Oct', total: 310, completed: 220, pending: 90 },
  { month: 'Nov', total: 253, completed: 96, pending: 157 },
];

const DEMO_STAGE_DISTRIBUTION = [
  { name: 'Scrutiny Committee', count: 168, color: '#2563EB' },
  { name: 'Re-Scrutiny', count: 74, color: '#7C3AED' },
  { name: 'EVC Inspection', count: 58, color: '#0D9488' },
  { name: 'Regional Committee', count: 67, color: '#142B4A' },
  { name: 'SAC / SHC', count: 45, color: '#D69E18' },
];

const DEMO_REGIONAL_PENDENCY = [
  { region: 'Northern', pending: 84, overdue: 8, compliant: 142 },
  { region: 'North-Western', pending: 62, overdue: 4, compliant: 110 },
  { region: 'Western', pending: 95, overdue: 9, compliant: 180 },
  { region: 'Central', pending: 48, overdue: 3, compliant: 94 },
  { region: 'Eastern', pending: 52, overdue: 2, compliant: 88 },
  { region: 'Southern', pending: 71, overdue: 3, compliant: 165 },
];

const DEMO_COMPLIANCE_STATUS = [
  { name: 'Verified / Compliant', value: 248, color: '#16845B' },
  { name: 'Pending Review', value: 68, color: '#D69E18' },
  { name: 'Overdue / Escalated', value: 24, color: '#C62836' },
];

export const DEMO_APPLICATIONS = APPLICATIONS;

export const getDashboardSummary = async () => {
  try {
    const res = await api.get('/analytics/dashboard/summary');
    return { data: res.data, isMock: false };
  } catch (err) {
    return { data: DEMO_KPI_DATA, isMock: true, notice: MOCK_INDICATOR };
  }
};

export const getApplicationTrends = async () => {
  try {
    const res = await api.get('/analytics/dashboard/trends');
    return { data: res.data, isMock: false };
  } catch (err) {
    return { data: DEMO_APPLICATION_TRENDS, isMock: true };
  }
};

export const getStageDistribution = async () => {
  try {
    const res = await api.get('/analytics/dashboard/stages');
    return { data: res.data, isMock: false };
  } catch (err) {
    return { data: DEMO_STAGE_DISTRIBUTION, isMock: true };
  }
};

export const getRegionalPendency = async () => {
  try {
    const res = await api.get('/analytics/dashboard/regional');
    return { data: res.data, isMock: false };
  } catch (err) {
    return { data: DEMO_REGIONAL_PENDENCY, isMock: true };
  }
};

export const getComplianceStatus = async () => {
  try {
    const res = await api.get('/analytics/dashboard/compliance');
    return { data: res.data, isMock: false };
  } catch (err) {
    return { data: DEMO_COMPLIANCE_STATUS, isMock: true };
  }
};

export const getRecentApplications = async () => {
  try {
    const res = await api.get('/applications/recent');
    return { data: res.data, isMock: false };
  } catch (err) {
    return { data: APPLICATIONS, isMock: true };
  }
};
