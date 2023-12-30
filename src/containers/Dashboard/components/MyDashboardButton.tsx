import { DashboardProps } from '@/pages/api/mock';
import DashBoardColorDot from '@/components/DashBoardColorDot';
import DashboardButton from '@/components/buttons/DashboardButton';
import { IconArrowForward, IconCrown } from '@/public/svgs';

function MyDashboardButton({ data }: { data: DashboardProps }) {
  const { title, color, createdByMe } = data;
  return (
    <DashboardButton size='lg'>
      <div className='flex w-11/12 items-center justify-between '>
        <div className='flex items-center'>
          <DashBoardColorDot color={color} />
          <p className='heading3-normal pl-6 pr-8 text-gray-6'>{title}</p>
          <IconCrown
            className={createdByMe ? 'inline flex-shrink-0' : 'hidden'}
          />
        </div>
        <IconArrowForward fill='black' />
      </div>
    </DashboardButton>
  );
}

export default MyDashboardButton;
