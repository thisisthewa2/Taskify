import useRequest from '@/hooks/useRequest';
import MyDashboard from '@/containers/MyDashboard';
import Layout from '@/components/Layout';
import { DashboardsProps } from '../api/mock';

/*
TODO
- dashboard form에서 생성버튼을 누른 경우 내부의 input과 colorchip을 post 하도록
>> 즉시 상태반영 필요
- 초대받은 목록 수락 클릭 시
>> 즉시 상태반영 필요 
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
