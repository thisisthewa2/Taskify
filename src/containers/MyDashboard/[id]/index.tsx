import Router from 'next/router';
import { useEffect, useState } from 'react';
import useRequest from '@/hooks/useRequest';
import AddChip from '@/components/chips/AddChip';
import Form from '@/components/modal/Form';
import Modal from '@/components/modal/Modal';
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
      <AddColumnButton />
    </div>
  );
}

export default Dashboard;

function AddColumnButton() {
  return (
    <Modal>
      <>
        <Modal.Open opens='modal-form'>
          <button className='card flex-center m-12 max-w-full gap-10 p-20 tablet:m-20 tablet:h-70 pc:mt-67 pc:w-354 pc:border-r'>
            <p className='subheading-bold'>새로운 컬럼 추가하기</p>
            <AddChip />
          </button>
        </Modal.Open>
        <Modal.Window name='modal-form'>
          <Form>
            <Form.ColumnForm />
          </Form>
        </Modal.Window>
      </>
    </Modal>
  );
}
