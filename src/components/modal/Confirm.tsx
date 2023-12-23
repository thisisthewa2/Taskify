import React, { useContext } from 'react';
import { Button } from '@/components/buttons';

interface Props {
  onCloseModal: () => void;
  children?: React.ReactNode;
}

function Confirm({ onCloseModal, children }: Props) {
  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child as React.ReactElement<any>, { onCloseModal }),
  );

  return (
    <div className='relative flex h-[10rem] flex-col items-center justify-center tablet:h-[12rem]'>
      {childrenWithProps}
    </div>
  );
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

Confirm.CheckConfirm = CheckConfirm;
Confirm.DeleteConfirm = DeleteConfirm;

export default Confirm;
