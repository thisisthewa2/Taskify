import { useRouter } from 'next/router';
import DashboardEdit from '@/containers/Dashboard/Edit';
import Layout from '@/components/layouts/Layout';

function DashboardEditPage() {
  const router = useRouter();
  const dashboardId = Array.isArray(router.query.dashboardId)
    ? router.query.dashboardId[0]
    : router.query.dashboardId;

  return (
    <Layout>
      <DashboardEdit dashboardId={dashboardId ?? ''} />
    </Layout>
  );
}

export default DashboardEditPage;
