import MyDashboard from '@/containers/Dashboard';
import Layout from '@/components/Layout';

function MyDashboardPage() {
  return (
    <Layout>
      <MyDashboard cursorId={undefined} totalCount={undefined} dashboards={undefined} />
    </Layout>
  );
}

export default MyDashboardPage;
