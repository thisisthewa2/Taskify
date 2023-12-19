import { ReactNode } from 'react';

function Input({
  value,
  type,
  children,
  ...rest
}: {
  value: string;
  type: string;
  children: ReactNode;
}) {
  return (
    <input className='' type={type} value={value}>
      {children}
    </input>
  );
}

export default Input;
