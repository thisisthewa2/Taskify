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

  const [trigger, setTrigger] = useState<number>(0);
  useEffect(() => {
    // trigger 상태가 변경될 때마다 실행되는 부분
    // 추가적인 로직이 있을 경우 여기에 구현
    console.log('Trigger changed:', trigger);
  }, [trigger]); // trigger 상태가 변경될 때마다 실행
  const invitations = invitationsData?.invitations;

  //로그인 되어 있지 않다면 signIn페이지로 이동
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/signIn');
    }
  }, [isLoggedIn, router]);

  return (
    <div className='flex max-h-fit min-h-screen w-full max-w-[64rem] flex-col gap-24 p-24 tablet:gap-44 tablet:p-40'>
      <MyDashboardButtons
        data={dashboards}
        totalCount={totalCount}
        setPostTrigger={setTrigger}
      />
      <Table
        type='dashboard'
        data={invitations}
        totalCount={invitations?.length}
      />
    </div>
  );
}

export default MyDashboard;
