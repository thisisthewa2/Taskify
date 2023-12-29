import {
  DashboardsInvitationProps,
  InvitationProps,
  MemberProps,
} from '@/pages/api/mock';
import DashboardInfoTable from './DashboardInfoTable';
import InvitedDashboardsTable from './InvitedDashboardsTable';

export interface DashboardInfoProps {
  type: 'member' | 'invitation';
  totalCount: number;
  data: MemberProps[] | DashboardsInvitationProps[];
  setCurrentPage: (arg: number) => void;
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
      setCurrentPage={props.setCurrentPage}
    />
  ) : (
    <InvitedDashboardsTable
      data={(props as InvitedDashboardsProps).data}
      totalCount={props.totalCount}
    />
  );
}

export default Table;
