import React from 'react';
import { Button } from '@/components/buttons';

interface Props {
  onCloseModal: () => void;
}

function CheckConfirm({ onCloseModal }: Props) {
  return (
    <>
      <span className='relative bottom-10'>비밀번호가 일치하지 않습니다.</span>
      <div className='absolute bottom-0 tablet:right-0'>
        <Button size='lg' onClick={onCloseModal}>
          확인
        </Button>
      </div>
    </>
  );
}

export default CheckConfirm;
