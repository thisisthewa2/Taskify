import { ReactNode } from 'react';
import { MembersProps } from '@/pages/api/mock';
import Header from './Header';
import SideMenu from './SideMenu';

interface Props {
  children: ReactNode;
  createdByMe?: boolean;
  members?: MembersProps;
}

function Layout({ children, createdByMe, members }: Props) {
  const emptyData = {
    cursorId: 5,
    totalCount: 0,
    dashboards: [],
  };

  return (
    <div className='flex'>
      <SideMenu data={emptyData.dashboards} />
      <div className='flex w-full flex-col bg-gray-1'>
        {members && <Header createdByMe={createdByMe} memberList={members} />}
        {children}
      </div>
    </div>
  );
}

export default Layout;
