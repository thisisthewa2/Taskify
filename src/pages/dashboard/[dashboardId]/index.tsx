import Head from 'next/head';
import { useRouter } from 'next/router';
import Dashboard from '@/containers/Dashboard/DashboardId';

function DashboardPage() {
  const router = useRouter();
  const { dashboardId } = router.query as { dashboardId: string };

  return (
    <>
      <Head>
        <title>내 대시보드</title>
      </Head>
      <Dashboard id={dashboardId} />
    </>
  );
}

export default DashboardPage;
