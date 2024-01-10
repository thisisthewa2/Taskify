import React from 'react';
import { ConfirmComponents } from '@/components/modal/ConfirmComponents';

interface Props {
  children?: React.ReactNode;
}

function Confirm({ children }: Props) {
  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child as React.ReactElement<any>),
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
