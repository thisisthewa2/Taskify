import { useRouter } from 'next/router';
import DashboardEdit from '@/containers/Dashboard/Edit';

function DashboardEditPage() {
  const router = useRouter();
  const dashboardId = Array.isArray(router.query.dashboardId)
    ? router.query.dashboardId[0]
    : router.query.dashboardId;

  return <DashboardEdit dashboardId={dashboardId ?? ''} />;
}

export default DashboardEditPage;
