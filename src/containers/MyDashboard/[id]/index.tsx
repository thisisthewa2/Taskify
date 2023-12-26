import Router from 'next/router';
import { useEffect, useState } from 'react';
import useRequest from '@/hooks/useRequest';
import DashboardColumn from './components/DashboardColumn';

interface SuccessType {
  result: 'SUCCESS';
  data: {
    id: number;
    title: string;
    teamId: '1-6';
    createdAt: string;
    updatedAt: string;
  }[];
}

interface FailType {
  message: string;
}

type APIResponseType = SuccessType | FailType;

interface DashboardProps {
  id: string;
}

function Dashboard({ id }: DashboardProps) {
  console.log(id);
  let columnId;

  const { data: columnsResponse, fetch: getColumns } = useRequest<
    SuccessType | undefined
  >({
    skip: true,
    options: {
      url: `columns?dashboardId=${id}`,
      method: 'get',
    },
  });

  useEffect(() => {
    if (!id) return;
    getColumns();
  }, [id]);

  if (!columnsResponse || !columnsResponse.result) return;
  return (
    <div className='flex min-h-screen flex-col pc:flex-row'>
      {columnsResponse.data.map((column: any, key: number) => {
        columnId = column.id;
        console.log(columnId);
        return (
          <DashboardColumn
            columnId={column.id}
            title={column.title}
            key={key}
          />
        );
      })}
    </div>
  );
}

export default Dashboard;
