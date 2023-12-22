import { DashboardProps, Mock_1_6_dashboards } from '@/pages/api/mock';
import { IconAddBox, IconCrown } from '@/public/svgs';
import DashBoardColorDot from './DashBoardColorDot';
import Logo from './logos/Logo';

function SideMenu({ data }: { data: DashboardProps[] }) {
  return (
    <div className='h-auto w-67 border-r-[1px] border-gray-3 bg-white px-12 tablet:w-160 pc:w-300'>
      <SideMenuLogo />
      <div className='py-20'>
        <DashBoards />
      </div>
      {data.map((dashBoard, key: number) => {
        return (
          <div key={key}>
            <Card
              title={dashBoard.title}
              color={dashBoard.color}
              createdByMe={dashBoard.createdByMe}
            />
          </div>
        );
      })}
    </div>
  );
}

export default SideMenu;

function SideMenuLogo() {
  return (
    <div className='py-20 pl-12'>
      <Logo />
    </div>
  );
}

function DashBoards() {
  return (
    <div className='flex justify-between px-12 py-18'>
      <p className='caption-bold hidden text-gray-5 tablet:inline'>
        Dash Boards
      </p>
      <IconAddBox fill='gray' viewBox='0 0 21 21' />
    </div>
  );
}

function Card({ title, color, createdByMe }: DashboardProps) {
  return (
    <div className='flex-center w-full py-12 tablet:justify-start'>
      <DashBoardColorDot color={color} />
      <div className='hidden items-center pr-12 tablet:flex'>
        <p className='heading3-normal pc:heading2-normal px-6 text-gray-5'>
          {title}
        </p>
        <IconCrown
          className={createdByMe ? 'inline flex-shrink-0' : 'hidden'}
        />
      </div>
    </div>
  );
}
