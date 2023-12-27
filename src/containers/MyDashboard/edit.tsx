import { Mock_1_6_Invitations } from '@/pages/api/mock';
import { Button } from '@/components/buttons';
import ColorChip from '@/components/chips/ColorChip';
import Table from '@/components/tables';
import { IconArrowBackward } from '@/public/svgs';

const Mock_dashboards_dashboardId_invitations = {
  totalCount: 0,
  invitations: [
    {
      id: 0,
      inviterUserId: 0,
      teamId: 'string',
      dashboard: {
        title: 'string',
        id: 0,
      },
      invitee: {
        nickname: '김다은',
        id: 0,
      },
      inviteAccepted: true,
      createdAt: '2023-12-19T16:17:44.135Z',
      updatedAt: '2023-12-19T16:17:44.135Z',
    },
    {
      id: 0,
      inviterUserId: 0,
      teamId: 'string',
      dashboard: {
        title: 'string',
        id: 0,
      },
      invitee: {
        nickname: '김다은은',
        id: 0,
      },
      inviteAccepted: true,
      createdAt: '2023-12-19T16:17:44.135Z',
      updatedAt: '2023-12-19T16:17:44.135Z',
    },
  ],
};

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
      <TitleManageBox />
      <Table type='member' totalCount={2} data={data2} />
      <Table type='dashboard' data={data3} totalCount={6} />
    </div>
  );
}

export default DashboardEdit;

function TitleManageBox() {
  return (
    <div className='flex flex-col gap-30 rounded-lg bg-white px-16 py-32'>
      <div className='flex items-center justify-between'>
        <span className='heading1-bold'>비브리지</span>
        <ColorChip />
      </div>
      <label className='subheading-normal'>
        대시보드 이름
        <input placeholder='' className='input mt-10' />
      </label>
      <div className='flex justify-end'>
        <Button>변경</Button>
      </div>
    </div>
  );
}
