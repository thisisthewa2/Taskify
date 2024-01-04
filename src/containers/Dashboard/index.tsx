import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { loginAtom } from '@/store/loginAtom';
import Table from '@/components/tables';
import MyDashboardButtons from './components/MyDashboardButtons';

function MyDashboard() {
  const router = useRouter();
  const loginInfo = useAtomValue(loginAtom);
  const { isLoggedIn } = loginInfo;

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/signin');
    }
  }, [isLoggedIn]);

  return (
    <div className='flex max-h-fit min-h-screen w-full max-w-[64rem] flex-col gap-24 p-24 tablet:gap-44 tablet:p-40'>
      <MyDashboardButtons />
      <Table type='dashboard' />
    </div>
  );
}

export default MyDashboard;
