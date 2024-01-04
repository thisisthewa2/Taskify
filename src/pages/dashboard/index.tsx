import Head from 'next/head';
import MyDashboard from '@/containers/Dashboard';

function MyDashboardPage() {
  return (
    <>
      <Head>
        <title>내 대시보드</title>
      </Head>
      <MyDashboard />
    </>
  );
}

export default MyDashboardPage;
