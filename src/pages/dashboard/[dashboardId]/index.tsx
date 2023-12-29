import { useRouter } from 'next/router';
import { useState } from 'react';
import useRequest from '@/hooks/useRequest';
import Dashboard from '@/containers/Dashboard/DashboardId';
import Layout from '@/components/Layout';
import { MembersProps } from '../../api/mock';

function DashboardPage() {
  const router = useRouter();
  const { dashboardId } = router.query as { dashboardId: string };
  const [createdByMe, setCreatedByMe] = useState(false);
  const [members, setMembers] = useState<MembersProps | undefined>(undefined);

  return (
    <Layout createdByMe={createdByMe} members={members}>
      <Dashboard
        id={dashboardId}
        setCreatedByMe={setCreatedByMe}
        setMembers={setMembers}
      />
    </Layout>
  );
}

export default DashboardPage;
