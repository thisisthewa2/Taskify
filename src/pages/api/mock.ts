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

export interface InvitationsProps {
  cursorId: number | undefined;
  invitations: InvitationProps[] | undefined;
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
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
  isOwner: false;
}

export const Mock_members: MembersProps = {
  members: [
    {
      id: 0,
      userId: 0,
      email: 'dnksf@sdkfmks.com',
      nickname: '가나다',
      createdAt: '2023-12-19T15:00:15.052Z',
      updatedAt: '2023-12-19T15:00:15.052Z',
      isOwner: false,
    },
    {
      id: 1,
      userId: 0,
      email: 'fsekjos@dlksd.net',
      nickname: '라마바',
      createdAt: '2023-12-19T15:00:15.052Z',
      updatedAt: '2023-12-19T15:00:15.052Z',
      isOwner: false,
    },
  ],
  totalCount: 2,
};

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

export const Mock_1_6_Cards = {
  cursorId: 1,
  totalCount: 2,
  cards: [
    {
      id: 1,
      title: '새로운 일정 관리 Taskify',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus nibh arcu, quis consequat ante cursus eget. Cras mattis, nulla non laoreet porttitor, diam justo laoreet eros, vel aliquet diam elit at leo.',
      tags: ['프로젝트', '일반', '백엔드', '상'],
      dueDate: '2022.12.30',
      assignee: {
        profileImageUrl: undefined,
        nickname: '김다은',
        id: 0,
      },
      imageUrl:
        'https://cdn.imweb.me/upload/S202207202685e30f16e24/d2ca3aad13ed9.jpg',
      teamId: '3-6',
      columnId: 1, //to-do같은 거
      createdAt: '2023-12-18T13:48:49.656Z',
      updatedAt: '2023-12-18T13:48:49.656Z',
    },
    {
      id: 2,
      title: '새로운 일정 관리 Taskify',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus nibh arcu, quis consequat ante cursus eget. Cras mattis, nulla non laoreet porttitor, diam justo laoreet eros, vel aliquet diam elit at leo.',
      tags: ['프로젝트', '일반', '백엔드', '상'],
      dueDate: '2022.12.30',
      assignee: {
        profileImageUrl:
          'https://cdn2.colley.kr/item_76566_1_0_title_0.jpeg?d=550x550',
        nickname: '김다은',
        id: 0,
      },
      teamId: '3-6',
      columnId: 1, //to-do같은 거
      createdAt: '2023-12-18T13:48:49.656Z',
      updatedAt: '2023-12-18T13:48:49.656Z',
    },
  ],
};

export interface ColumnsProps {
  result: 'SUCCESS';
  data: ColumnProps[];
}

export interface ColumnProps {
  id: number;
  title: string;
  teamId: '3-6';
  createdAt: string;
  updatedAt: string;
}

export const Mock_1_6_Columns = {
  result: 'SUCCESS',
  data: [
    {
      id: 0,
      title: 'TO-DO',
      teamId: '3-6',
      createdAt: '2023-12-18T14:17:03.397Z',
      updatedAt: '2023-12-18T14:17:03.397Z',
    },
    {
      id: 1,
      title: 'On Progress',
      teamId: '3-6',
      createdAt: '2023-12-18T14:17:03.397Z',
      updatedAt: '2023-12-18T14:17:03.397Z',
    },
  ],
};
