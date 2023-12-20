import Link from 'next/link';
import SideMenu from '@/components/SideMenu';
import { Button } from '@/components/buttons';
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
    // <div>
    //   <ManagerDropdown />
    //   <StateDropdown />
    // </div>
    <Button>
      <Link href={'/mydashboard'}>나의 대시보드</Link>
    </Button>
  );
}

export default Home;
