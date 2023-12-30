import Link from 'next/link';
import useRequest from '@/hooks/useRequest';
import { DashboardProps, DashboardsProps } from '@/pages/api/mock';
import Logo from '@/components/logos/Logo';
import { IconAddBox, IconCrown } from '@/public/svgs';
import DashBoardColorDot from '../DashBoardColorDot';

interface Props {
  dashboardId?: string;
}

function SideMenu({ dashboardId }: Props) {
  const { data } = useRequest<DashboardsProps>({
    options: {
      url: 'dashboards',
      method: 'get',
      params: {
        navigationMethod: 'pagination',
        page: 1,
        size: 10,
      },
    },
  });

  return (
    <div className='flex-center h-full w-67 flex-shrink-0 flex-col overflow-y-scroll border-r border-gray-3 bg-white px-12 py-20 tablet:w-160 pc:w-300'>
      <div className='w-full pb-60 pl-12'>
        <Logo />
      </div>
      <DashboardsHeader />
      <ul className='flex w-full flex-col gap-5'>
        {data?.dashboards?.map((dashboard) => (
          <li key={dashboard.id}>
            <DashboardCard
              title={dashboard.title}
              color={dashboard.color}
              createdByMe={dashboard.createdByMe}
              id={dashboard.id}
              selected={dashboard.id === Number(dashboardId)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideMenu;

function DashboardsHeader() {
  return (
    <div className='flex w-full justify-between px-12 pb-18'>
      <p className='caption-bold hidden text-gray-5 tablet:inline'>
        Dash Boards
      </p>
      <IconAddBox fill='gray' viewBox='0 0 21 21' />
    </div>
  );
}

interface DashboardCardProps extends DashboardProps {
  selected: boolean;
}

function DashboardCard({
  title,
  color,
  createdByMe,
  id,
  selected = false,
}: DashboardCardProps) {
  return (
    <Link
      href={`/dashboard/${id}`}
      className={`flex-center h-40 w-full rounded-sm hover:bg-primary-light tablet:h-45 tablet:justify-start ${
        selected && `bg-primary-light`
      }`}
    >
      <DashBoardColorDot color={color} />
      <div className='hidden items-center pr-12 tablet:flex'>
        <p className='heading3-normal pc:heading2-normal px-6 text-gray-5'>
          {title}
        </p>
        <IconCrown
          className={createdByMe ? 'inline flex-shrink-0' : 'hidden'}
        />
      </div>
    </Link>
  );
}
