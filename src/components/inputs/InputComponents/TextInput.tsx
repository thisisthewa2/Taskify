import { useAtom } from 'jotai';
import React, { ReactNode, useEffect, useState } from 'react';
import { ColumnsAtom } from '@/store/columnsAtom';

function TextInput({
  required,
  children,
  columnName,
  value,
  ...rest
}: {
  required: boolean;
  children: ReactNode;
  columnName?: string;
  value?: string;
}) {
  const [columnTitle, setColumnTitle] = useAtom(ColumnsAtom);
  const [text, setText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setText(value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setColumnTitle({ columnTitle: value });
    setText('');
  };

  useEffect(() => {
    if (columnName) {
      setColumnTitle({ columnTitle: columnName });
    }
  }, []);
  console.log(value);
  return (
    <input
      className='input'
      onChange={handleChange}
      onBlur={handleBlur}
      required={required}
      defaultValue={value ?? columnTitle.columnTitle ?? ''}
      {...rest}
    >
      {children}
    </input>
  );
}

export default TextInput;
