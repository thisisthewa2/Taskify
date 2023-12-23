import { Mock_1_6_Cards } from '@/pages/api/mock';
import Card from '@/components/Card';
import DashBoardColorDot from '@/components/DashBoardColorDot';
import Layout from '@/components/Layout';
import NumberChip from '@/components/chips/NumberChip';
import { IconSettings } from '@/public/svgs';

interface DashboardProps {
  id: string | string[] | undefined;
}

const titles = ['TO-DO', 'On Progress', 'Done'];

function Dashboard({ id }: DashboardProps) {
  return (
    <div className='flex flex-col'>
      {titles.map((title, key) => {
        return <Column title={title} key={key} />;
      })}
    </div>
  );
}

export default Dashboard;

function Column({ title }: { title: string }) {
  return (
    <div className='flex w-full flex-col'>
      <div className='flex w-full items-center justify-between py-5 pr-12'>
        <div className='flex items-center'>
          <DashBoardColorDot color='primary' />
          <p className='subheading-bold pr-12'>{title}</p>
          <NumberChip num={0} />
        </div>
        <IconSettings />
      </div>
      <div className='flex flex-col gap-10 border-b border-gray-3 px-12 pb-12'>
        <Card data={Mock_1_6_Cards.cards[0]} />
        <Card data={Mock_1_6_Cards.cards[0]} />
      </div>
    </div>
  );
}
