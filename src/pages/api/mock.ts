export interface DashboardsProps {
  cursorId: number;
  totalCount: number;
  dashboards: DashboardProps[];
}

export interface DashboardProps {
  id?: number;
  title?: string;
  color: 'green' | 'orange' | 'blue' | 'primary' | 'pink';
  createdAt?: string;
  updatedAt?: string;
  createdByMe?: boolean;
  userId?: number;
}

export const Mock_1_6_dashboards: DashboardsProps = {
  cursorId: 0,
  totalCount: 2,
  dashboards: [
    {
      id: 1,
      title: '핏치핏치',
      color: 'pink',
      createdAt: '2023-12-15T03:59:20.817Z',
      updatedAt: '2023-12-15T03:59:20.817Z',
      createdByMe: false,
      userId: 1,
    },
    {
      id: 2,
      title: '김다은과 아이들',
      color: 'blue',
      createdAt: '2023-12-17T03:59:20.817Z',
      updatedAt: '2023-12-17T03:59:20.817Z',
      createdByMe: true,
      userId: 2,
    },
  ],
};

interface InvitationsProps {
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

export const Mock_1_6_Invitations = {
  cursorId: 0,
  invitations: [
    {
      id: 1,
      inviterUserId: 3,
      teamId: '1-6',
      dashboard: {
        title: '프로덕트 디자인',
        id: 1,
      },
      invitee: {
        nickname: '임건우',
        id: 2,
      },
      inviteAccepted: false,
      createdAt: '2023-12-19T05:41:19.594Z',
      updatedAt: '2023-12-19T05:41:19.594Z',
    },
    {
      id: 1,
      inviterUserId: 3,
      teamId: '1-6',
      dashboard: {
        title: '새로운 기획 문서',
        id: 1,
      },
      invitee: {
        nickname: '윤진',
        id: 2,
      },
      inviteAccepted: false,
      createdAt: '2023-12-19T05:41:19.594Z',
      updatedAt: '2023-12-19T05:41:19.594Z',
    },
    {
      id: 1,
      inviterUserId: 3,
      teamId: '1-6',
      dashboard: {
        title: '유닛 A',
        id: 1,
      },
      invitee: {
        nickname: '강현지',
        id: 2,
      },
      inviteAccepted: false,
      createdAt: '2023-12-19T05:41:19.594Z',
      updatedAt: '2023-12-19T05:41:19.594Z',
    },
    {
      id: 1,
      inviterUserId: 3,
      teamId: '1-6',
      dashboard: {
        title: '유닛 B',
        id: 1,
      },
      invitee: {
        nickname: '남민섭',
        id: 2,
      },
      inviteAccepted: false,
      createdAt: '2023-12-19T05:41:19.594Z',
      updatedAt: '2023-12-19T05:41:19.594Z',
    },
    {
      id: 1,
      inviterUserId: 3,
      teamId: '1-6',
      dashboard: {
        title: '유닛 C',
        id: 1,
      },
      invitee: {
        nickname: '김다은',
        id: 2,
      },
      inviteAccepted: true,
      createdAt: '2023-12-19T05:41:19.594Z',
      updatedAt: '2023-12-19T05:41:19.594Z',
    },
  ],
};
