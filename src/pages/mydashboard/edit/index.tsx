import { useRouter } from 'next/router';
import DashboardEdit from '@/containers/MyDashboard/edit';
import Layout from '@/components/Layout';

function DashboardEditPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <DashboardEdit />
    </Layout>
  );
}

export default DashboardEditPage;
