import SideMenu from '@/components/SideMenu';
import DashboardsTable from '@/components/tables/DashboardsTable';
import Table from '@/components/tables/Table';
import {
  Mock_dashboards_dashboardId_invitations,
  Mock_members,
} from './api/mock';

function Home() {
  const { totalCount, members } = Mock_members;
  const { totalCount: totalCount2, invitations } =
    Mock_dashboards_dashboardId_invitations;

  return (
    <div className='flex'>
      <SideMenu />
      <div className='flex w-full flex-col gap-15 bg-gray-2 p-20'>
        <Table type='invitation' totalCount={totalCount} data={members} />
        <Table type='member' totalCount={totalCount2} data={invitations} />
        <DashboardsTable />
      </div>
    </div>
  );
}

export default Home;
