import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { loginAtom } from '@/store/loginAtom';
import Footer from './Footer';
import SideMenu from './SideMenu';
import DashboardHeader from './headers/DashboardHeader';
import LandingHeader from './headers/LandingHeader';

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  const loginInfo = useAtomValue(loginAtom);
  const router = useRouter();
  const dashboardId = Array.isArray(router.query.dashboardId)
    ? router.query.dashboardId[0]
    : router.query.dashboardId;

  if (router.pathname === '/signin' || router.pathname === '/signup')
    return <>{children}</>;

  return (
    <>
      {loginInfo.isLoggedIn ? (
        <div className='flex w-full'>
          <SideMenu dashboardId={dashboardId} />
          <div className='flex w-full flex-col bg-gray-1'>
            <DashboardHeader dashboardId={dashboardId} />
            {children}
          </div>
        </div>
      ) : (
        <>
          <LandingHeader />
          {children}
          <Footer />
        </>
      )}
    </>
  );
}

export default Layout;
