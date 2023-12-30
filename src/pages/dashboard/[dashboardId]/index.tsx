import { useRouter } from 'next/router';
import { useState } from 'react';
import useRequest from '@/hooks/useRequest';
import Dashboard from '@/containers/Dashboard/DashboardId';
import Layout from '@/components/layouts/Layout';
import { MembersProps } from '../../api/mock';

function DashboardPage() {
  const router = useRouter();
  const { dashboardId } = router.query as { dashboardId: string };

  return (
    <Layout>
      <Dashboard id={dashboardId} />
    </Layout>
  );
}

export default DashboardPage;
