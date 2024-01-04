import { useInfiniteQuery } from '@tanstack/react-query';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useRequest from '@/hooks/useRequest';
import useSearchInvitedDashboards from '@/hooks/useSearchInvitedDashboards';
import fetch from '@/services/utils/fetch';
import { InvitationProps, InvitationsProps } from '@/pages/api/mock';
import { IconSearch, IconUnsubscribe } from '@/public/svgs';
import { Button } from '../buttons';

interface SearchProps {
  searchTerm: string;
  handleSearchChange: (value: string) => void;
  filteredItems: InvitationProps[] | null;
}

const SIZE = 5;

function InvitedDashboardsTable() {
  const getInvitations = async ({ pageParam }: { pageParam?: number }) => {
    if (pageParam) {
      const { data }: { data: InvitationsProps } = await fetch({
        url: 'invitations',
        method: 'get',
        params: {
          size: SIZE,
          cursorId: pageParam,
        },
      });
      return data;
    } else {
      const { data }: { data: InvitationsProps } = await fetch({
        url: 'invitations',
        method: 'get',
        params: {
          size: SIZE,
        },
      });
      return data;
    }
  };

  const { data: invitations, fetchNextPage } = useInfiniteQuery({
    queryKey: ['invitations'],
    queryFn: getInvitations,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.cursorId,
  });

  const containerRef = useInfiniteScroll({
    handleScroll: fetchNextPage,
    deps: [invitations],
  });

  const { searchTerm, handleSearchChange, filteredItems } =
    useSearchInvitedDashboards(invitations?.pages);

  if (!invitations?.pages) {
    return (
      <div className='rounded-lg bg-white px-16 pt-24'>
        <p className='heading1-bold'>초대받은 대시보드</p>
        <Empty />
      </div>
    );
  }

  let displayInvitations =
    filteredItems || invitations?.pages.flatMap((page) => page.invitations);
  if (!searchTerm) {
    // 검색어가 없을 때 전체 초대 대시보드를 표시
    displayInvitations = invitations?.pages.flatMap((page) => page.invitations);
  }

  return (
    <div className='rounded-lg bg-white px-16 pt-24'>
      <p className='heading1-bold'>초대받은 대시보드</p>
      <Search
        searchTerm={searchTerm}
        filteredItems={filteredItems}
        handleSearchChange={handleSearchChange}
      />
      <TabletTitleUI />
      {displayInvitations?.map((invitation: InvitationProps) => (
        <InvitedDashboard data={invitation} key={invitation.id} />
      ))}
      <div ref={containerRef} className='h-50 w-full' />
    </div>
  );
}

export default InvitedDashboardsTable;

function Search({
  searchTerm,
  handleSearchChange,
  filteredItems,
}: SearchProps) {
  return (
    <div className='body1-normal relative mb-8 mt-20'>
      <div className='relative'>
        <input
          className='input body1-light h-36 pl-44 tablet:h-40'
          placeholder=''
          type='text'
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <IconSearch className='absolute left-12 top-1/2 -translate-y-1/2' />
      </div>
      <div className='mt-4'>
        {searchTerm &&
          (filteredItems === null || filteredItems.length === 0) && (
            <p className='p-5 text-red'>검색 결과가 존재하지 않습니다</p>
          )}
      </div>
    </div>
  );
}

function Empty() {
  return (
    <div className='flex-center flex-col gap-16 pb-154 pt-120 tablet:gap-24'>
      <div className='h-60 w-60 tablet:h-100 tablet:w-100'>
        <IconUnsubscribe width='100%' height='100%' viewBox='0 0 100 100' />
      </div>
      <p className='body1-light text-gray-4'>아직 초대받은 대시보드가 없어요</p>
    </div>
  );
}

function InvitedDashboard({ data }: InvitedDashboardProps) {
  return (
    <div className='flex flex-col gap-16 border-b border-gray-3 py-16 last:border-b-0 tablet:py-20'>
      <div className='flex gap-16 tablet:flex-col'>
        <MobileTitleUI />
        <DashboardValue data={data} />
      </div>
      <TableButton data={data} className='flex tablet:hidden' />
    </div>
  );
}

interface TableButtonProps extends InvitedDashboardProps {
  className: string;
}

function TableButton({ data, className }: TableButtonProps) {
  const { fetch: putData, error } = useRequest<Boolean>({
    skip: true,
    options: { url: `invitations/${data.id}`, method: 'put' },
  });

  const handleClick = async (answer: boolean) => {
    await putData({
      data: {
        inviteAccepted: answer,
      },
    });
    if (error) console.error('Error:', error);
    await putData();
  };

  return (
    <div className={`gap-10 ${className}`}>
      <Button size='md' onClick={() => handleClick(true)}>
        수락
      </Button>
      <Button.Secondary size='md' onClick={() => handleClick(false)}>
        거절
      </Button.Secondary>
    </div>
  );
}

function MobileTitleUI() {
  return (
    <div className='flex flex-col gap-10 tablet:hidden'>
      <p className='body1-light text-gray-4'>이름</p>
      <p className='body1-light text-gray-4'>초대자</p>
    </div>
  );
}

function TabletTitleUI() {
  return (
    <div className='mb-8 mt-20 hidden grid-cols-10 gap-10 tablet:grid'>
      <p className='body1-light col-span-5 pl-8 text-gray-4'>이름</p>
      <p className='body1-light col-span-2 text-gray-4'>초대자</p>
      <p className='body1-light col-span-3 text-gray-4'>수락 여부</p>
    </div>
  );
}

interface InvitedDashboardProps {
  data: InvitationProps;
}

function DashboardValue({ data }: InvitedDashboardProps) {
  return (
    <div className='flex grid-cols-10 flex-col gap-10 tablet:grid tablet:items-center'>
      <p className='body1-light tablet:col-span-5 tablet:pl-8'>
        {data.dashboard.title}
      </p>
      <p className='body1-light tablet:col-span-2'>{data.inviter.nickname}</p>
      <TableButton
        className='hidden tablet:col-span-3 tablet:flex'
        data={data}
      />
    </div>
  );
}
