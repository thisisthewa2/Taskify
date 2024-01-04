import Head from 'next/head';
import { useRouter } from 'next/router';
import DashboardEdit from '@/containers/Dashboard/Edit';

function DashboardEditPage() {
  const router = useRouter();
  const dashboardId = Array.isArray(router.query.dashboardId)
    ? router.query.dashboardId[0]
    : router.query.dashboardId;

  return (
    <>
      <Head>대시보드 수정</Head>
      <DashboardEdit dashboardId={dashboardId ?? ''} />
    </>
  );
}

export default DashboardEditPage;
