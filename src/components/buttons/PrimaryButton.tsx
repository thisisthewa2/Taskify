import { ButtonHTMLAttributes, ReactNode } from 'react';
import { BUTTON_SIZE } from '.';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

function PrimaryButton({ children, onClick, disabled, size = 'md' }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`button flex-center bg-primary text-white ${BUTTON_SIZE[size]} disabled:bg-gray-4`}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
