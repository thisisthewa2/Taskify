import { ReactNode } from 'react';
import Header from './Header';
import SideMenu from './SideMenu';

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  const emptyData = {
    cursorId: 5,
    totalCount: 0,
    dashboards: [],
  };

  return (
    <div className='flex'>
      <SideMenu data={emptyData.dashboards} />
      <div className='flex w-full flex-col bg-gray-1'>
        <Header />
        {children}
      </div>
    </div>
  );
}

export default Layout;
