import { ReactNode } from 'react';
import { DashboardsProps } from '@/pages/api/mock';
import Header from './Header';
import SideMenu from './SideMenu';

interface Props {
  children: ReactNode;
  dashboards?: DashboardsProps;
}

function Layout({ children, dashboards }: Props) {
  return (
    <div className='flex'>
      <SideMenu data={dashboards} />
      <div className='flex w-full flex-col bg-gray-1'>
        <Header />
        {children}
      </div>
    </div>
  );
}

export default Layout;
