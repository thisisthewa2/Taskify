import SideMenu from '@/components/SideMenu';
import ManagerDropdown from '@/components/dropdowns/ManagerDropdown';
import StateDropdown from '@/components/dropdowns/StateDropdown';
import Table from '@/components/tables';
import {
  Mock_1_6_Invitations,
  Mock_dashboards_dashboardId_invitations,
  Mock_members,
} from './api/mock';

function Home() {
  const { totalCount, members: data } = Mock_members;
  const { totalCount: totalCount2, invitations: data2 } =
    Mock_dashboards_dashboardId_invitations;
  const { invitations: data3 } = Mock_1_6_Invitations;

  return (
    <div>
      <ManagerDropdown />
      <StateDropdown />
    </div>
  ); /* (
    <div className='flex'>
      <SideMenu />
      <div className='flex w-full flex-col gap-15 bg-gray-2 p-20'>
        <Table type='invitation' totalCount={totalCount} data={data} />
        <Table type='member' totalCount={totalCount2} data={data2} />
        <Table type='dashboard' data={data3} />
      </div>
    </div>
  ); */
}

export default Home;
