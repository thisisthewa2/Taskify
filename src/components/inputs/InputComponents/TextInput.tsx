import { useAtom, useSetAtom } from 'jotai';
import React, { ReactNode, useEffect, useState } from 'react';
import { ColumnsAtom } from '@/store/columnsAtom';

function TextInput({
  required,
  children,
  columnName,
  ...rest
}: {
  required: boolean;
  children: ReactNode;
  columnName?: string;
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

  return (
    <input
      className='input'
      onChange={handleChange}
      onBlur={handleBlur}
      required={required}
      defaultValue={columnTitle.columnTitle && columnTitle.columnTitle}
      {...rest}
    >
      {children}
    </input>
  );
}

export default TextInput;
