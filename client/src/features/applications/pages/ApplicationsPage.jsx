import React, { useState } from 'react';
import PageContainer from '../../../components/layout/PageContainer';
import RecentApplicationsTable from '../../dashboard/components/RecentApplicationsTable';
import { DEMO_APPLICATIONS } from '../../dashboard/services/dashboardService';
import Button from 'react-bootstrap/Button';
import { PlusCircle, Filter } from 'lucide-react';

export default function ApplicationsPage() {
  const [apps] = useState(DEMO_APPLICATIONS);

  return (
    <PageContainer
      title="Institutional Approval Applications"
      subtitle="Comprehensive registry of technical institution applications, dynamic routing stages, and deficiency logs"
      action={
        <div className="d-flex gap-2">
          <Button variant="primary" size="sm" onClick={() => alert('New Application submission dialog will be enabled in Phase 4')}>
            <PlusCircle size={15} />
            <span>New Application</span>
          </Button>
        </div>
      }
    >
      <RecentApplicationsTable applications={apps} />
    </PageContainer>
  );
}

