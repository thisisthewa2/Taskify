import { axiosOptions } from '@/services/utils/fetch';

export interface DashboardsProps {
  cursorId: number | undefined;
  totalCount: number | undefined;
  dashboards: DashboardProps[] | undefined;
  fetchDashboardsData?: (args?: axiosOptions) => Promise<any> | undefined;
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
  invitations: InvitationProps[];
  totalCount: number;
}

export interface InvitationProps {
  id: number;
  inviter: {
    id: number;
    email: string;
    nickname: string;
  };
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  inviteAccepted: boolean | null;
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
    email: string;
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
  dashboardId: number;
}

export interface ColumnsProps {
  result: 'SUCCESS';
  data: ColumnProps[];
}

export interface ColumnProps {
  id: string;
  title: string;
  teamId: '1-6';
  createdAt: string;
  updatedAt: string;
}

export const Mock_1_6_dashboards: DashboardsProps = {
  cursorId: 0,
  totalCount: 6,
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
    {
      id: 3,
      title: '프로덕트 디자인',
      color: 'green',
      createdAt: '2023-12-17T03:59:20.817Z',
      updatedAt: '2023-12-17T03:59:20.817Z',
      createdByMe: false,
      userId: 2,
    },
    {
      id: 4,
      title: '새로운 기획 문서',
      color: 'primary',
      createdAt: '2023-12-17T03:59:20.817Z',
      updatedAt: '2023-12-17T03:59:20.817Z',
      createdByMe: true,
      userId: 2,
    },
    {
      id: 5,
      title: '아함',
      color: 'pink',
      createdAt: '2023-12-17T03:59:20.817Z',
      updatedAt: '2023-12-17T03:59:20.817Z',
      createdByMe: true,
      userId: 2,
    },
    {
      id: 6,
      title: '졸려',
      color: 'blue',
      createdAt: '2023-12-17T03:59:20.817Z',
      updatedAt: '2023-12-17T03:59:20.817Z',
      createdByMe: false,
      userId: 2,
    },
  ],
};

export const Mock_1_6_Invitations: InvitationsProps = {
  invitations: [
    {
      id: 604,
      inviter: {
        id: 68,
        email: 'kde9889@naver.com',
        nickname: '정우부인',
      },
      teamId: '1-6',
      dashboard: {
        id: 123,
        title: '테스트',
      },
      invitee: {
        id: 111,
        email: 'user@email.com',
        nickname: 'useruser',
      },
      inviteAccepted: null,
      createdAt: '2023-12-30T02:15:46.793Z',
      updatedAt: '2023-12-30T02:15:46.793Z',
    },
    {
      id: 1,
      inviter: {
        id: 68,
        email: 'kde9889@naver.com',
        nickname: '정우부인',
      },
      teamId: '1-6',
      dashboard: {
        title: 'Chip 대성공 ',
        id: 4,
      },
      invitee: {
        nickname: '윤진',
        email: 'fkasehjio@fnjkd.com',
        id: 2,
      },
      inviteAccepted: false,
      createdAt: '2023-12-19T05:41:19.594Z',
      updatedAt: '2023-12-19T05:41:19.594Z',
    },
    {
      id: 1,
      inviter: {
        id: 68,
        email: 'kde9889@naver.com',
        nickname: '정우부인',
      },
      teamId: '1-6',
      dashboard: {
        title: '이사 완료!',
        id: 1,
      },
      invitee: {
        nickname: '강현지',
        email: 'fkasehjio@fnjkd.com',
        id: 2,
      },
      inviteAccepted: false,
      createdAt: '2023-12-19T05:41:19.594Z',
      updatedAt: '2023-12-19T05:41:19.594Z',
    },
    {
      id: 1,
      inviter: {
        id: 68,
        email: 'kde9889@naver.com',
        nickname: '정우부인',
      },
      teamId: '1-6',
      dashboard: {
        title: '이미지 업로드',
        id: 2,
      },
      invitee: {
        nickname: '남민섭',
        email: 'fkasehjio@fnjkd.com',
        id: 2,
      },
      inviteAccepted: false,
      createdAt: '2023-12-19T05:41:19.594Z',
      updatedAt: '2023-12-19T05:41:19.594Z',
    },
    {
      id: 1,
      inviter: {
        id: 68,
        email: 'kde9889@naver.com',
        nickname: '정우부인',
      },
      teamId: '1-6',
      dashboard: {
        title: '일요일에 pr 올리지 말기',
        id: 1,
      },
      invitee: {
        nickname: '김다은',
        email: 'fkasehjio@fnjkd.com',
        id: 2,
      },
      inviteAccepted: false,
      createdAt: '2023-12-19T05:41:19.594Z',
      updatedAt: '2023-12-19T05:41:19.594Z',
    },
    {
      id: 1,
      inviter: {
        id: 68,
        email: 'kde9889@naver.com',
        nickname: '정우부인',
      },
      teamId: '1-6',
      dashboard: {
        title: '졸려',
        id: 1,
      },
      invitee: {
        nickname: '김다은',
        email: 'fkasehjio@fnjkd.com',
        id: 2,
      },
      inviteAccepted: true,
      createdAt: '2023-12-19T05:41:19.594Z',
      updatedAt: '2023-12-19T05:41:19.594Z',
    },
  ],
  totalCount: 7,
};
