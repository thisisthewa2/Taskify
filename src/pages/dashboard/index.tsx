import { useCallback, useEffect } from 'react';
import useRequest from '@/hooks/useRequest';
import MyDashboard from '@/containers/Dashboard';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { DashboardsProps } from '../api/mock';

function MyDashboardPage() {
  const {
    data: dashboardsData,
    isLoading,
    error,
    fetch: fetchDashboardsData,
  } = useRequest<DashboardsProps>({
    skip: true,
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

  useEffect(() => {
    fetchDashboardsData();
  }, []);

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
