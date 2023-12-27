import { useRouter } from 'next/router';
import Dashboard from '@/containers/MyDashboard/[id]';
import Layout from '@/components/Layout';

function DashboardPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <Dashboard id={id} />
    </Layout>
  );
}

export default DashboardPage;
