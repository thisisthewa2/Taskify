import { useRouter } from 'next/router';
import useRequest from '@/hooks/useRequest';
import Dashboard from '@/containers/MyDashboard/[id]';
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
