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
    profileImageUrl: string;
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
        profileImageUrl:
          'https://cdn2.colley.kr/item_76566_1_0_title_0.jpeg?d=550x550',
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
