import { useRouter } from 'next/router';
import Dashboard from '@/containers/Dashboard/DashboardId';

function DashboardPage() {
  const router = useRouter();
  const { dashboardId } = router.query as { dashboardId: string };

  return <Dashboard id={dashboardId} />;
}

export default DashboardPage;
