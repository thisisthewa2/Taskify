import { useAtom } from 'jotai';
import React from 'react';
import { closeAllModals } from '@/store/modalAtom';
import { Button } from '@/components/buttons';

function CheckConfirm() {
  const [, closeAll] = useAtom(closeAllModals);
  return (
    <>
      <span className='relative bottom-10'>비밀번호가 일치하지 않습니다.</span>
      <div className='absolute bottom-0 tablet:right-0'>
        <Button size='lg' onClick={closeAll}>
          확인
        </Button>
      </div>
    </>
  );
}

export default CheckConfirm;
