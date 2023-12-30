import React from 'react';
import { FormComponents } from '@/components/modal/FormComponents';

interface Props {
  onCloseModal?: () => void;
  children?: React.ReactNode;
}

function Form({ onCloseModal, children }: Props) {
  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child as React.ReactElement<any>, { onCloseModal }),
  );
  return (
    <div className='relative flex min-h-[12rem] flex-col bg-scroll tablet:min-h-[14rem]'>
      {childrenWithProps}
    </div>
  );
}

Form.DashboardForm = FormComponents.DashboardForm;
Form.TodoForm = FormComponents.TodoForm;
Form.ColumnForm = FormComponents.ColumnForm;
Form.CardViewDetail = FormComponents.CardViewDetail;
Form.InviteForm = FormComponents.InviteForm;

export default Form;
