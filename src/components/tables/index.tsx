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
  totalCount: number | undefined;
  data: InvitationProps[] | undefined;
}

type Props = DashboardInfoProps | InvitedDashboardsProps;

function Table(props: Props) {
  return props.type !== 'dashboard' ? ( //상단의 대시보드 목록
    <DashboardInfoTable
      type={props.type}
      totalCount={props.totalCount}
      data={(props as DashboardInfoProps).data}
    />
  ) : (
    <InvitedDashboardsTable //초대 받은 대시보드
      data={(props as InvitedDashboardsProps).data}
      totalCount={props.totalCount}
    />
  );
}

export default Table;
