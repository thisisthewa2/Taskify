import { DashboardProps } from '@/pages/api/mock';

function DashBoardColorDot({ color }: DashboardProps) {
  const dot_color = {
    green: 'bg-green',
    primary: 'bg-primary',
    orange: 'bg-orange',
    blue: 'bg-blue',
    pink: 'bg-pink',
  };

  return (
    <div className='flex p-16 tablet:px-12 tablet:py-0 '>
      <div className={`h-8 w-8 rounded-full ${dot_color[color]}`} />
    </div>
  );
}

export default DashBoardColorDot;
