import { useAtomValue } from 'jotai';
import { themeAtom } from '@/store/colorSchemeAtom';
import { reduceText } from '@/utils/reduceText';
import { DashboardProps } from '@/pages/api/mock';
import DashboardColorDot from '@/components/DashboardColorDot';
import DashboardButton from '@/components/buttons/DashboardButton';
import { IconArrowForward, IconCrown } from '@/public/svgs';

function MyDashboardButton({ data }: { data: DashboardProps }) {
  const theme = useAtomValue(themeAtom);
  const { title, color, createdByMe } = data;
  const reducedTitle = reduceText(title, 10);
  return (
    <DashboardButton size='lg'>
      <div className='flex w-11/12 items-center justify-between '>
        <div className='flex items-center'>
          <DashboardColorDot color={color} />
          <p className='heading3-normal pl-6 pr-8 text-gray-6'>
            {reducedTitle}
          </p>
          <IconCrown
            className={createdByMe ? 'inline flex-shrink-0' : 'hidden'}
          />
        </div>
        <IconArrowForward fill={theme === 'light' ? 'black' : 'white'} />
      </div>
    </DashboardButton>
  );
}

export default MyDashboardButton;
