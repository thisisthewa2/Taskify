import { useRouter } from 'next/router';
import Dashboard from '@/containers/Dashboard/DashboardId';
import Layout from '@/components/Layout';

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
