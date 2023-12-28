import { useAtom, useSetAtom } from 'jotai';
import React, { ReactNode, useEffect } from 'react';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setColumnTitle({ columnTitle: value });
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
      required={required}
      value={columnTitle.columnTitle}
      {...rest}
    >
      {children}
    </input>
  );
}

export default TextInput;
