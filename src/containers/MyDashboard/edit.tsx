import {
  Mock_1_6_Invitations,
  Mock_dashboards_dashboardId_invitations,
  Mock_members,
} from '@/pages/api/mock';
import Table from '@/components/tables';
import { IconArrowBackward } from '@/public/svgs';

function DashboardEdit() {
  const { totalCount, invitations: data2 } =
    Mock_dashboards_dashboardId_invitations;
  const { invitations: data3 } = Mock_1_6_Invitations;

  return (
    <div className='flex h-screen max-w-[41.25rem] flex-col gap-12 p-20'>
      <button className='flex-center body1-normal mb-8 w-80 gap-6'>
        <IconArrowBackward fill='#333236' />
        돌아가기
      </button>
      <div className='box'></div>
      <Table type='member' totalCount={2} data={data2} />
      <Table type='dashboard' data={data3} totalCount={6} />
    </div>
  );
}

export default DashboardEdit;
