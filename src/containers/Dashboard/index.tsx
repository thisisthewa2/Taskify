import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useRequest from '@/hooks/useRequest';
import { loginAtom } from '@/store/loginAtom';
import { InvitationsProps } from '@/pages/api/mock';
import { DashboardsProps } from '@/pages/api/mock';
import Table from '@/components/tables';
import MyDashboardButtons from './components/MyDashboardButtons';

function MyDashboard({ cursorId, totalCount, dashboards }: DashboardsProps) {
  const loginInfo = useAtomValue(loginAtom);

  const router = useRouter();

  const isLoggedIn = loginInfo.isLoggedIn;

  const {
    data: invitationsData,
    isLoading,
    error,
    fetch: fetchInvitationsData,
  } = useRequest<InvitationsProps>({
    options: {
      url: 'invitations',
      method: 'GET',
    },
  });

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/signin');
    }
    fetchInvitationsData();
  }, []);

  const invitations = invitationsData?.invitations;

  return (
    <div className='flex max-h-fit min-h-screen w-full max-w-[64rem] flex-col gap-24 p-24 tablet:gap-44 tablet:p-40'>
      <MyDashboardButtons data={dashboards} totalCount={totalCount} />
      <Table
        type='dashboard'
        data={invitations}
        totalCount={invitations?.length}
      />
    </div>
  );
}

export default MyDashboard;
