import useRequest from '@/hooks/useRequest';
import MyDashboard from '@/containers/Dashboard';
import Layout from '@/components/Layout';
import { DashboardsProps } from '../api/mock';

function MyDashboardPage() {
  const { data: dashboardsData, fetch: fetchDashboardsData } =
    useRequest<DashboardsProps>({
      options: {
        url: 'dashboards',
        method: 'GET',
        params: {
          navigationMethod: 'pagination',
          cursorId: 0,
          page: 1,
          size: 100,
        },
      },
    });

  const dashboards = dashboardsData?.dashboards;
  const totalCount = dashboardsData?.totalCount; //대시보드 개수

  return (
    <Layout dashboards={dashboards}>
      <MyDashboard
        cursorId={0}
        totalCount={totalCount}
        dashboards={dashboards}
        fetchDashboardsData={fetchDashboardsData}
      />
    </Layout>
  );
}

export default MyDashboardPage;
