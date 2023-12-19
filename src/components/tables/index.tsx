import { DashboardsInvitationProps, MemberProps } from '@/pages/api/mock';
import DashboardInfoTable from './DashboardInfoTable';
import InvitedDashboardsTable from './InvitedDashboardsTable';

interface DashboardInfoProps {
  type: 'member' | 'invitation';
  totalCount: number;
  data: MemberProps[] | DashboardsInvitationProps[];
}

interface InvitedDashboardsProps {
  type: 'dashboard';
}

type Props = DashboardInfoProps | InvitedDashboardsProps;

function Table(props: Props) {
  return props.type !== 'dashboard' ? (
    <DashboardInfoTable
      type={props.type}
      totalCount={(props as DashboardInfoProps).totalCount}
      data={(props as DashboardInfoProps).data}
    />
  ) : (
    <InvitedDashboardsTable />
  );
}

export default Table;
