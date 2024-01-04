import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useRequest from '@/hooks/useRequest';
import { loginAtom } from '@/store/loginAtom';
import { InvitationsProps } from '@/pages/api/mock';
import Table from '@/components/tables';
import MyDashboardButtons from './components/MyDashboardButtons';

function MyDashboard() {
  const router = useRouter();
  const loginInfo = useAtomValue(loginAtom);
  const { isLoggedIn } = loginInfo;

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

  if (!invitationsData ?? !invitationsData?.invitations) return;
  const { invitations = [] } = invitationsData;

  return (
    <div className='flex max-h-fit min-h-screen w-full max-w-[64rem] flex-col gap-24 p-24 tablet:gap-44 tablet:p-40'>
      <MyDashboardButtons />
      <Table type='dashboard' data={invitations} fetch={getInvitationsData} />
    </div>
  );
}

export default MyDashboard;
