import { ButtonHTMLAttributes, ReactNode } from 'react';
import { BUTTON_SIZE } from '.';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

function OutlineButton({ children, onClick, disabled, size = 'md' }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`button flex-center border-solid-gray bg-gray-1 disabled:bg-gray-4 disabled:text-white ${BUTTON_SIZE[size]} `}
    >
      {children}
    </button>
  );
}

export default OutlineButton;
