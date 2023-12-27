import { useSetAtom } from 'jotai';
import React, { ReactNode } from 'react';
import { ColumnsAtom } from '@/store/columnsAtom';

function TextInput({
  required,
  children,
  ...rest
}: {
  required: boolean;
  children: ReactNode;
}) {
  const setColumn = useSetAtom(ColumnsAtom);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setColumn({ newColumn: value });
  };
  return (
    <input
      className='input'
      onChange={handleChange}
      required={required}
      {...rest}
    >
      {children}
    </input>
  );
}

export default TextInput;
