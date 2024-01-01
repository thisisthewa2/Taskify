import React from 'react';
import { ConfirmComponents } from '@/components/modal/ConfirmComponents';

interface Props {
  onCloseModal?: () => void;
  onCloseAllModal?: () => void;
  children?: React.ReactNode;
}

function Confirm({ onCloseModal, onCloseAllModal, children }: Props) {
  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child as React.ReactElement<any>, {
      onCloseModal,
      onCloseAllModal,
    }),
  );

  return (
    <div className='relative flex h-[10rem] flex-col items-center justify-center tablet:h-[12rem]'>
      {childrenWithProps}
    </div>
  );
}

Confirm.CheckConfirm = ConfirmComponents?.CheckConfirm;
Confirm.DeleteConfirm = ConfirmComponents.DeleteConfirm;

export default Confirm;
