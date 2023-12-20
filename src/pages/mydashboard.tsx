import { useState } from 'react';
import DashBoardColorDot from '@/components/DashBoardColorDot';
import Header from '@/components/Header';
import SideMenu from '@/components/SideMenu';
import ArrowButton from '@/components/buttons/ArrowButton';
import DashboardButton from '@/components/buttons/DashboardButton';
import AddChip from '@/components/chips/AddChip';
import Table from '@/components/tables';
import { IconArrowForward, IconCrown } from '@/public/svgs';
import {
  DashboardProps,
  Mock_1_6_Invitations,
  Mock_1_6_dashboards,
} from './api/mock';

function MyDashboard() {
  const { dashboards, totalCount } = Mock_1_6_dashboards;
  const dashboardTop5 = dashboards.slice(0, 5); // get 처음에는 데이터 5개 받아오는 듯 합니다...?
  const { invitations } = Mock_1_6_Invitations;

  return (
    <div className='flex bg-gray-1'>
      <SideMenu data={dashboards} />
      <div className='flex w-full flex-col'>
        <Header />
        <div className='flex w-full max-w-[64rem] flex-col gap-24 p-24 tablet:gap-44 tablet:p-40'>
          <MyDashboardButtons data={dashboardTop5} totalCount={totalCount} />
          <Table type='dashboard' data={invitations} />
        </div>
      </div>
    </div>
  );
}

export default MyDashboard;

interface ButtonProps {
  data: DashboardProps[];
  totalCount: number;
}

function MyDashboardButtons({ data, totalCount }: ButtonProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.floor((totalCount - 5) / 6) + 2; //2페이지부터는 6개

  const handleLeftClick = () => setCurrentPage(currentPage - 1);
  const handleRightClick = () => setCurrentPage(currentPage + 1);

  return (
    <div className='grid grid-flow-row gap-8 tablet:grid-cols-2 pc:grid-cols-3'>
      <DashboardButton size='lg'>
        <p className='pr-12'>새로운 대시보드</p>
        <AddChip />
      </DashboardButton>
      {data.map((dashBoard, key: number) => {
        return (
          <div key={key}>
            <MyDashboardButton data={dashBoard} />
          </div>
        );
      })}
      <div className='flex w-full items-center justify-end gap-15 pt-3 tablet:col-span-2 pc:col-span-3'>
        <p>
          {totalPage} 페이지 중 {currentPage}
        </p>
        <ArrowButton
          onLeftClick={handleLeftClick}
          onRightClick={handleRightClick}
          leftDisabled={currentPage === 1 ? true : false}
          rightDisabled={currentPage === totalPage ? true : false}
        />
      </div>
    </div>
  );
}

function MyDashboardButton({ data }: { data: DashboardProps }) {
  const { title, color, createdByMe } = data;
  return (
    <DashboardButton size='lg'>
      <div className='flex w-11/12 items-center justify-between '>
        <div className='flex items-center pr-12'>
          <DashBoardColorDot color={color} />
          <p className='heading3-normal px-6 text-gray-6'>{title}</p>
          <IconCrown
            className={createdByMe ? 'inline flex-shrink-0' : 'hidden'}
          />
        </div>
        <IconArrowForward fill='black' />
      </div>
    </DashboardButton>
  );
}
