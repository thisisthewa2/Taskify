import { ReactNode } from 'react';
import { DashboardProps } from '@/pages/api/mock';
import Header from './Header';
import SideMenu from './SideMenu';

interface Props {
  children: ReactNode;
  dashboards?: DashboardProps[] | undefined;
}

function MyDashboardLayout({ dashboards, children }: Props) {
  return (
    <div className='flex bg-gray-1'>
      <SideMenu data={dashboards} />
      <div className='flex w-full flex-col'>
        <Header />
        {children}
      </div>
    </div>
  );
}

export default MyDashboardLayout;
