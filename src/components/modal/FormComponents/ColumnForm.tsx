import axios from 'axios';
import { useAtom, useAtomValue } from 'jotai';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import useRequest from '@/hooks/useRequest';
import { ColumnsAtom } from '@/store/columnsAtom';
import { Button } from '@/components/buttons';
import Input from '@/components/inputs/Input';

interface Props {
  onCloseModal: () => void;
  type: 'create' | 'edit';
  columnName?: string;
  columnId?: string;
}

interface CreateColumnType {
  title: string;
  dashboardId: string;
}

interface EditColumnType {
  title: string;
  dashboardId: string;
}

function ColumnForm({
  onCloseModal,
  type = 'create',
  columnName,
  columnId,
}: Props) {
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

  const handleClick = () => {
    onCloseModal();
    setColumnTitle({ columnTitle: '' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === '새 컬럼 생성') {
      const { data, error } = await createColumn();
      if (data) {
        onCloseModal();
        setColumnTitle({ columnTitle: '' });
        return;
      }

      if (!axios.isAxiosError(error)) return;

      if (error.response?.status === 400) {
        setErrorMessage(error.response.data.message);
      } else if (error.response?.status === 404) {
        setErrorMessage(error.response.data.message);
      }
    } else {
      const { data, error } = await editColumn();
      if (data) {
        onCloseModal();
        setColumnTitle({ columnTitle: '' });
        return;
      }

      if (!axios.isAxiosError(error)) return;

      if (error.response?.status === 400) {
        setErrorMessage(error.response.data.message);
      } else if (error.response?.status === 404) {
        setErrorMessage(error.response.data.message);
      }
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
          <button
            type='button'
            className='absolute bottom-0 left-0 text-14 text-gray-4 underline'
          >
            삭제하기
          </button>
        )}

        <div className='absolute bottom-0 flex gap-10 tablet:right-0'>
          <Button.Secondary size='lg' onClick={handleClick}>
            취소
          </Button.Secondary>
          <Button size='lg'>생성</Button>
        </div>
      </form>
    </>
  );
}

export default ColumnForm;
