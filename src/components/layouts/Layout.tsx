import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { loginAtom } from '@/store/loginAtom';
import { DashboardProps } from '@/pages/api/mock';
import SideMenu from './SideMenu';
import DashboardHeader from './headers/DashboardHeader';
import LandingHeader from './headers/LandingHeader';

interface Props {
  children: ReactNode;
  dashboards?: DashboardProps[] | [];
}

function Layout({ children, dashboards }: Props) {
  const loginInfo = useAtomValue(loginAtom);

  return (
    <>
      {loginInfo.isLoggedIn ? (
        <div className='flex w-full'>
          <SideMenu data={dashboards} />
          <div className='flex w-full flex-col bg-gray-1'>
            <DashboardHeader />
            {children}
          </div>
        </div>
      ) : (
        <>
          <LandingHeader />
          {children}
        </>
      )}
    </>
  );
}

export default Layout;
