import { ButtonHTMLAttributes, ReactNode } from 'react';

const DASHBOARD_BUTTON_SIZE = {
  sm: 'body1-normal w-full h-32 tablet:h-40',
  lg: 'subheading-bold w-full h-60 tablet:h-70',
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: 'sm' | 'lg';
}

function DashboardButton({ children, onClick, disabled, size = 'lg' }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`button border-solid-gray disabled:bg-gray-4 disabled:text-white ${DASHBOARD_BUTTON_SIZE[size]} `}
    >
      {children}
    </button>
  );
}

export default DashboardButton;
