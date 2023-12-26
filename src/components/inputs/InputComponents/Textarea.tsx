import React, { ReactNode } from 'react';

function Textarea({
  required,
  children,
  ...rest
}: {
  required: boolean;
  children: ReactNode;
}) {
  return (
    <textarea className='textarea' required={required} {...rest}>
      {children}
    </textarea>
  );
}

export default Textarea;
