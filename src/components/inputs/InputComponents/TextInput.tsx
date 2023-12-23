import React, { ReactNode } from 'react';

function TextInput({
  required,
  children,
  ...rest
}: {
  required: boolean;
  children: ReactNode;
}) {
  return (
    <input className='input' required={required} {...rest}>
      {children}
    </input>
  );
}

export default TextInput;
