export interface DashboardsProps {
  cursorId: number;
  totalCount: number;
  dashboards: DashboardProps[];
}

export interface DashboardProps {
  id?: number;
  title?: string;
  color: string;
  createdAt?: string;
  updatedAt?: string;
  createdByMe?: boolean;
  userId?: number;
}

export interface GetDashboardInfoType {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  createdByMe: boolean;
}

export interface InvitationsProps {
  cursorId: number;
  invitations: InvitationProps[];
}

export interface InvitationProps {
  id: number;
  inviterUserId: number;
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: {
    nickname: string;
    id: number;
  };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MembersProps {
  members: MemberProps[];
  totalCount: number;
}

export interface MemberProps {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}

export interface DashboardsInvitationsProps {
  totalCount: number;
  invitations: DashboardsInvitationProps[];
}
export interface DashboardsInvitationProps {
  id: number;
  inviterUserId: number;
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: {
    nickname: string;
    id: number;
  };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CardsProps {
  cursorId: number;
  totalCount: number;
  cards: CardProps[];
}

export interface CardProps {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    profileImageUrl?: string;
    nickname: string;
    id: number;
  };
  imageUrl?: string;
  teamId: string; //'3-6'
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ColumnsProps {
  result: 'SUCCESS';
  data: ColumnProps[];
}

export interface ColumnProps {
  id: number;
  title: string;
  teamId: '1-6';
  createdAt: string;
  updatedAt: string;
}
