import {
  DashboardsInvitationProps,
  InvitationProps,
  MemberProps,
} from '@/pages/api/mock';
import DashboardInfoTable from './DashboardInfoTable';
import InvitedDashboardsTable from './InvitedDashboardsTable';

interface DashboardInfoProps {
  type: 'member' | 'invitation';
  totalCount: number;
  data: MemberProps[] | DashboardsInvitationProps[];
}

interface InvitedDashboardsProps {
  type: 'dashboard';
  totalCount: number;
  data: InvitationProps[];
}

type Props = DashboardInfoProps | InvitedDashboardsProps;

function Table(props: Props) {
  return props.type !== 'dashboard' ? (
    <DashboardInfoTable
      type={props.type}
      totalCount={props.totalCount}
      data={(props as DashboardInfoProps).data}
    />
  ) : (
    <InvitedDashboardsTable
      data={(props as InvitedDashboardsProps).data}
      totalCount={props.totalCount}
    />
  );
}

export default Table;
