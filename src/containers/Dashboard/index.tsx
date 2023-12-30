import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useRequest from '@/hooks/useRequest';
import { loginAtom } from '@/store/loginAtom';
import { InvitationsProps } from '@/pages/api/mock';
import { DashboardsProps } from '@/pages/api/mock';
import Table from '@/components/tables';
import MyDashboardButtons from './components/MyDashboardButtons';

function MyDashboard() {
  const router = useRouter();
  const loginInfo = useAtomValue(loginAtom);
  const { isLoggedIn } = loginInfo;

  const [currentPage, setCurrentPage] = useState(1);

  const { data: dashboardsData, fetch: getDashboardsData } =
    useRequest<DashboardsProps>({
      deps: [currentPage],
      options: {
        url: 'dashboards',
        method: 'get',
        params: {
          navigationMethod: 'pagination',
          page: currentPage,
          size: currentPage === 1 ? 5 : 6,
        },
      },
    });

  const { data: invitationsData, fetch: getInvitationsData } =
    useRequest<InvitationsProps>({
      options: {
        url: 'invitations',
        method: 'get',
      },
    });

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/signin');
    }
  }, [isLoggedIn]);

  if (
    !dashboardsData ??
    !invitationsData ??
    !dashboardsData?.dashboards ??
    !dashboardsData?.totalCount
  )
    return;
  const { dashboards, totalCount } = dashboardsData;
  const { invitations } = invitationsData;

  return (
    <div className='flex max-h-fit min-h-screen w-full max-w-[64rem] flex-col gap-24 p-24 tablet:gap-44 tablet:p-40'>
      <MyDashboardButtons
        data={dashboards}
        totalCount={totalCount}
        fetch={getDashboardsData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Table
        type='dashboard'
        data={invitations}
        totalCount={invitations.length}
        fetch={getInvitationsData}
      />
    </div>
  );
}

export default MyDashboard;
