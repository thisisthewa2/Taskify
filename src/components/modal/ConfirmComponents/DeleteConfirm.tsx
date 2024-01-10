import { useAtom, useSetAtom } from 'jotai';
import React from 'react';
import useRequest from '@/hooks/useRequest';
import { ColumnsAtom } from '@/store/columnsAtom';
import { closeAllModals } from '@/store/modalAtom';
import { Button } from '@/components/buttons';

interface Props {
  columnId?: string;
}

function DeleteConfirm({ columnId }: Props) {
  const setColumnTitle = useSetAtom(ColumnsAtom);
  const [, closeAll] = useAtom(closeAllModals);

  const { fetch: deleteColumn } = useRequest({
    skip: true,
    options: {
      url: `columns/${columnId}`,
      method: 'delete',
    },
  });

  const handleReset = () => {
    closeAll();
    setColumnTitle({ columnTitle: '' });
  };

  const handleDelete = () => {
    deleteColumn()
      .then(() => {
        handleReset();
      })
      .catch((error) => {
        console.error('컬럼 삭제 실패 : ', error);
      });
  };
  return (
    <>
      <span className='relative bottom-10'>컬럼의 모든 카드가 삭제됩니다.</span>
      <div className='absolute bottom-0 flex gap-10 tablet:right-0'>
        <Button.Secondary size='lg' onClick={handleReset}>
          취소
        </Button.Secondary>
        <Button size='lg' onClick={handleDelete}>
          삭제
        </Button>
      </div>
    </>
  );
}

export default DeleteConfirm;
