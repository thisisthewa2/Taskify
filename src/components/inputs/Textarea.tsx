import React from 'react';

function Textarea({
  title,
  required,
  children,
  ...rest
}: {
  title: string;
  value: string | number;
  type: string;
  required?: boolean;
  placeholder: string;
  children?: React.ReactNode;
  onInput?: React.ChangeEventHandler<HTMLTextAreaElement>;
}) {
  return (
    <div className='flex flex-col gap-[10px]'>
      <label className='text-[18px] font-[500]'>
        {title}
        {required ? <span className='text-[#5534DA]'> *</span> : ''}
      </label>

      <textarea className='textarea' {...rest}>
        {children}
      </textarea>
    </div>
  );
}

export default Textarea;
