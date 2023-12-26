import useRequest from '@/hooks/useRequest';
import MyDashboard from '@/containers/MyDashboard';
import Layout from '@/components/Layout';
import { DashboardsProps } from '../api/mock';
/*
TODO
- dashboard form에서 생성버튼을 누른 경우 내부의 input과 colorchip을 post 하도록
1. colorchip의 선택결과를 상위 컴포넌트로 전달하도록 (O)
2. input
3. useRequest 
*/
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
