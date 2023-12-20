import { useState } from 'react';
import { DashboardProps } from '@/pages/api/mock';
import DashboardButton from '@/components/buttons/DashboardButton';
import AddChip from '@/components/chips/AddChip';
import ArrowButtonPageChange from './ArrowButtonPageChange';
import MyDashboardButton from './MyDashboardButton';

interface ButtonProps {
  data: DashboardProps[] | [];
  totalCount: number;
}

function MyDashboardButtons({ data, totalCount }: ButtonProps) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className='grid grid-flow-row gap-8 tablet:grid-cols-2 pc:grid-cols-3'>
      <DashboardButton size='lg'>
        <p className='pr-12'>새로운 대시보드</p>
        <AddChip />
      </DashboardButton>
      {totalCount > 0 &&
        data.map((dashBoard, key: number) => {
          return (
            <div key={key}>
              <MyDashboardButton data={dashBoard} />
            </div>
          );
        })}
      {totalCount > 0 && (
        <ArrowButtonPageChange
          totalCount={totalCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}

export default MyDashboardButtons;
