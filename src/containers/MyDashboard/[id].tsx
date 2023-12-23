import { Mock_1_6_Cards } from '@/pages/api/mock';
import Card from '@/components/Card';
import DashBoardColorDot from '@/components/DashBoardColorDot';
import Layout from '@/components/Layout';
import AddChip from '@/components/chips/AddChip';
import NumberChip from '@/components/chips/NumberChip';
import { IconSettings } from '@/public/svgs';

interface DashboardProps {
  id: string | string[] | undefined;
}

const titles = ['TO-DO', 'On Progress', 'Done'];

function Dashboard({ id }: DashboardProps) {
  return (
    <div className='flex flex-col pc:flex-row '>
      {titles.map((title, key) => {
        return <Column title={title} key={key} />;
      })}
    </div>
  );
}

export default Dashboard;

function Column({ title }: { title: string }) {
  return (
    <div className='flex min-h-screen w-full flex-col border-gray-2 pc:w-354 pc:border-r'>
      <div className='flex w-full items-center justify-between py-5 pr-12 tablet:py-20 tablet:pl-8 tablet:pr-20'>
        <div className='flex items-center'>
          <DashBoardColorDot color='primary' />
          <p className='subheading-bold pr-12 tablet:pr-20'>{title}</p>
          <NumberChip num={0} />
        </div>
        <IconSettings />
      </div>
      <div className='flex flex-col gap-10 border-b border-gray-2 px-12 pb-12 tablet:gap-16 tablet:px-20 tablet:pb-20 pc:border-b-0'>
        <div className='card flex-center py-9'>
          <AddChip />
        </div>
        <Card data={Mock_1_6_Cards.cards[0]} />
        <Card data={Mock_1_6_Cards.cards[0]} />
      </div>
    </div>
  );
}
