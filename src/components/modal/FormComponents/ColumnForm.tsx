import axios, { AxiosError } from 'axios';
import { useAtom } from 'jotai';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import useRequest from '@/hooks/useRequest';
import { ColumnsAtom } from '@/store/columnsAtom';
import { closeAllModals } from '@/store/modalAtom';
import { DeleteCardButton } from '@/containers/Dashboard/components/DashboardColumn';
import { Button } from '@/components/buttons';
import Input from '@/components/inputs/Input';

interface Props {
  type: 'create' | 'edit';
  columnName?: string;
  columnId?: number;
}

interface CreateColumnType {
  title: string;
  dashboardId: string;
}

interface EditColumnType {
  title: string;
  dashboardId: string;
}

function ColumnForm({ type = 'create', columnName, columnId }: Props) {
  const [, closeAll] = useAtom(closeAllModals);
  const [errorMessage, setErrorMessage] = useState('');
  const [columnTitle, setColumnTitle] = useAtom(ColumnsAtom);
  const { dashboardId } = useParams();

  const title = type === 'edit' ? '컬럼 관리' : '새 컬럼 생성';

  const { fetch: createColumn } = useRequest<CreateColumnType>({
    skip: true,
    options: {
      url: 'columns',
      method: 'post',
      data: {
        title: columnTitle.columnTitle,
        dashboardId: Number(dashboardId),
      },
    },
  });

  const { fetch: editColumn } = useRequest<EditColumnType>({
    skip: true,
    options: {
      url: `columns/${columnId}`,
      method: 'put',
      data: { title: columnTitle.columnTitle },
    },
  });

  const handleReset = () => {
    closeAll();
    setColumnTitle({ columnTitle: '' });
  };

  const handleDataAndError = (
    data: CreateColumnType | EditColumnType,
    error: unknown,
  ) => {
    if (data) {
      closeAll();
      setColumnTitle({ columnTitle: '' });
      return;
    }

    if (!axios.isAxiosError(error)) return;

    if (error.response?.status === 400) {
      const isEmpty = error.response.data.message.includes('title');
      setErrorMessage(
        isEmpty ? '컬럼 이름을 입력해주세요.' : error.response.data.message,
      );
    } else if (error.response?.status === 404) {
      setErrorMessage(error.response.data.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (columnTitle.columnTitle.length > 13) {
      setErrorMessage('13자 이하로 입력해주세요');
      return;
    }
    if (title === '새 컬럼 생성') {
      const { data, error } = await createColumn();
      handleDataAndError(data, error);
    } else {
      const { data, error } = await editColumn();
      handleDataAndError(data, error);
    }
  };

  return (
    <>
      <form className='mb-70 flex flex-col gap-30' onSubmit={handleSubmit}>
        <h1 className='heading1-bold'>{title}</h1>
        <div>
          <Input
            type='text'
            title='이름'
            placeholder='이름을 입력해 주세요'
            columnName={columnName}
          />
          {errorMessage && (
            <small className='body2-normal mt-5 text-red'>{errorMessage}</small>
          )}
        </div>
        {type === 'edit' && (
          <DeleteCardButton columnId={columnId} isHidden={false} />
        )}

        <div className='absolute bottom-0 flex gap-10 tablet:right-0'>
          <Button.Secondary type='button' size='lg' onClick={handleReset}>
            취소
          </Button.Secondary>
          <Button size='lg'>생성</Button>
        </div>
      </form>
    </>
  );
}

export default ColumnForm;
