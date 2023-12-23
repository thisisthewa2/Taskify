import React from 'react';
import { Button } from '@/components/buttons';

interface Props {
  onCloseModal: () => void;
  children?: React.ReactNode;
}

function DeleteConfirm({ onCloseModal }: Props) {
  return (
    <>
      <span className='relative bottom-10'>컬럼의 모든 카드가 삭제됩니다.</span>
      <div className='absolute bottom-0 flex gap-10 tablet:right-0'>
        <Button.Secondary size='lg' onClick={onCloseModal}>
          취소
        </Button.Secondary>
        <Button size='lg'>삭제</Button>
      </div>
    </>
  );
}

export default DeleteConfirm;
