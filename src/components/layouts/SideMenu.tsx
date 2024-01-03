import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import fetch from '@/services/utils/fetch';
import { DashboardProps, DashboardsProps } from '@/pages/api/mock';
import DashBoardColorDot from '@/components/DashboardColorDot';
import Logo from '@/components/logos/Logo';
import Form from '@/components/modal/Form';
import Modal from '@/components/modal/Modal';
import { IconAddBox, IconCrown } from '@/public/svgs';

interface Props {
  dashboardId?: string;
}

const SIZE = 10;

function SideMenu({ dashboardId }: Props) {
  const getDashboards = async ({ pageParam = 1 }) => {
    console.log(pageParam);
    const { data }: { data: DashboardsProps } = await fetch({
      url: 'dashboards',
      method: 'get',
      params: {
        navigationMethod: 'pagination',
        page: pageParam,
        size: SIZE,
      },
    });
    return data;
  };

  const {
    data: dashboards,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['dashboards'],
    queryFn: getDashboards,
    getNextPageParam: (lastPage, allPageParams) =>
      lastPage.dashboards.length < SIZE ? null : allPageParams.length + 1,
  });

  return (
    <div className='flex h-full w-67 flex-shrink-0 flex-col items-center overflow-hidden border-r border-gray-3 bg-white px-12 py-20 tablet:w-160 pc:w-300'>
      <div className='w-full pb-60 pl-12'>
        <Logo />
      </div>
      <DashboardsHeader />
      <ul className='flex w-full flex-col gap-5'>
        <button onClick={() => fetchNextPage()} className='h-20 w-50 bg-purple'>
          GET DATA
        </button>
        {dashboards?.pages.map((dashboardPage) =>
          dashboardPage.dashboards.map((dashboard) => (
            <li key={dashboard.id}>
              <DashboardCard
                title={dashboard.title}
                color={dashboard.color}
                createdByMe={dashboard.createdByMe}
                id={dashboard.id}
                selected={dashboard.id === Number(dashboardId)}
              />
            </li>
          )),
        )}
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
      <Modal>
        <>
          <Modal.Open opens='modal-form'>
            <div className='cursor-pointer'>
              <IconAddBox fill='gray' viewBox='0 0 21 21' />
            </div>
          </Modal.Open>
          <Modal.Window name='modal-form'>
            <Form>
              <Form.DashboardForm />
            </Form>
          </Modal.Window>
        </>
      </Modal>
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
