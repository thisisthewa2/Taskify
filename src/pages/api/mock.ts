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
