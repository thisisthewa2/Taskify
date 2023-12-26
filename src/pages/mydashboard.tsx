import useRequest from '@/hooks/useRequest';
import MyDashboard from '@/containers/MyDashboard';
import Layout from '@/components/Layout';
import { DashboardsProps } from './api/mock';

function MyDashboardPage() {
  const {
    data: dashboardsData,
    isLoading,
    error,
    fetch: fetchDashboardsData,
  } = useRequest<DashboardsProps>({
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

  console.log('real total count', totalCount);
  console.log('real total count', dashboards);
  return (
    <Layout cursorId={0} totalCount={totalCount} dashboards={dashboards}>
      <MyDashboard
        cursorId={0}
        totalCount={totalCount}
        dashboards={dashboards}
      />
    </Layout>
  );
}

export default MyDashboardPage;
