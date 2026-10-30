import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import ApplicationsPage from '../features/applications/pages/ApplicationsPage';
import ScrutinyPage from '../features/workflow/pages/ScrutinyPage';
import EVCPage from '../features/evc/pages/EVCPage';
import UndertakingsPage from '../features/compliance/pages/UndertakingsPage';
import DocumentExpiryPage from '../features/compliance/pages/DocumentExpiryPage';
import InstitutionsPage from '../features/institutions/pages/InstitutionsPage';
import AuditPage from '../features/audit/pages/AuditPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/applications" element={<ApplicationsPage />} />
      <Route path="/scrutiny" element={<ScrutinyPage />} />
      <Route path="/evc" element={<EVCPage />} />
      <Route path="/undertakings" element={<UndertakingsPage />} />
      <Route path="/expiry" element={<DocumentExpiryPage />} />
      <Route path="/compliance" element={<Navigate to="/undertakings" replace />} />
      <Route path="/institutions" element={<InstitutionsPage />} />
      <Route path="/audit" element={<AuditPage />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

