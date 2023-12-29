import { Mock_1_6_Invitations, Mock_1_6_dashboards } from '@/pages/api/mock';
import Table from '@/components/tables';
import MyDashboardButtons from './components/MyDashboardButtons';

function MyDashboard() {
  /* 대시보드 존재할 때 */
  const { dashboards, totalCount } = Mock_1_6_dashboards;
  const dashboardTop5 = dashboards.slice(0, 5); // get 처음에는 데이터 5개만 받아오는 듯 합니다. 확실한 건 api 연결하고 확인..
  const { invitations } = Mock_1_6_Invitations;

  /* 대시보드 비어있을 때 */
  const emptyData = {
    cursorId: 5,
    totalCount: 0,
    dashboards: [],
  };

  const emptyInvitedData = {
    cursorId: 3,
    invitations: [],
  };

  return (
    <div className='flex w-full max-w-[64rem] flex-col gap-24 p-24 tablet:gap-44 tablet:p-40'>
      <MyDashboardButtons data={emptyData.dashboards} totalCount={0} />
      <Table
        type='dashboard'
        data={invitations}
        totalCount={emptyInvitedData.invitations.length}
      />
    </div>
  );
}

export default MyDashboard;
