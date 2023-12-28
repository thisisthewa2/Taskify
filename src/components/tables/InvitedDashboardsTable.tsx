import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCallback } from 'react';
import useRequest from '@/hooks/useRequest';
import { getAccessToken } from '@/services/utils/handleToken';
import { InvitationProps } from '@/pages/api/mock';
import { IconSearch, IconUnsubscribe } from '@/public/svgs';
import { Button } from '../buttons';

interface InvitedProps {
  data: InvitationProps[] | undefined;
  totalCount: number | undefined; // TO FIX
}

// 초대목록 검색 기능: InvitedDashboardsTable에 포함시키자니 너무 길어져서 분리하면서 useEffect를 사용하게되었음..
function useInvitedDashboardsSearch(data: InvitationProps[] | undefined) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<InvitationProps[] | null>(
    null,
  );

  const getFilteredItems = (searchTerm: string, items: InvitationProps[]) => {
    if (!searchTerm) {
      setFilteredItems(null);
      return;
    }
    const filtered = items.filter((item) =>
      item.dashboard.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredItems(filtered);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    if (data === undefined) return; // data가 undefined인 경우 처리
    getFilteredItems(searchTerm, data);
  }, [searchTerm, data]);

  return {
    searchTerm,
    handleSearchChange,
    filteredItems,
  };
}

function InvitedDashboardsTable({ data }: InvitedProps) {
  const { searchTerm, handleSearchChange, filteredItems } =
    useInvitedDashboardsSearch(data);

  if (!data || data.length === 0) {
    return (
      <div className='rounded-lg bg-white px-16 pt-24'>
        <p className='heading1-bold'>초대받은 대시보드</p>
        <Empty />
      </div>
    );
  }

  return (
    <div className='rounded-lg bg-white px-16 pt-24'>
      <p className='heading1-bold'>초대받은 대시보드</p>
      <div className='body1-normal relative mb-8 mt-20'>
        <div className='relative'>
          <input
            className='input body1-light h-36 pl-44 tablet:h-40'
            placeholder='검색'
            type='text'
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <IconSearch className='absolute left-12 top-1/2 -translate-y-1/2' />
        </div>
        <div className='mt-4'>
          {searchTerm &&
            (filteredItems === null || filteredItems.length === 0) && (
              <p>검색 결과가 존재하지 않습니다</p>
            )}
        </div>
      </div>
      <TabletTitleUI />
      {data.map((invitation: InvitationProps, key: number) => {
        if (
          invitation?.inviteAccepted || // 이미 수락한 경우
          (filteredItems && !filteredItems.includes(invitation)) // 필터링된 항목이 아닌 경우
        ) {
          return null; // 이미 수락하거나 거절한 경우는 보이지 않도록 처리
        }
        return <InvitedDashboard data={invitation} key={key} />;
      })}
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

function InvitedDashboard({ data }: { data: InvitationProps }) {
  return (
    <div className='flex flex-col gap-16 border-b border-gray-3 py-16 last:border-b-0 tablet:py-20'>
      <div className='flex gap-16 tablet:flex-col'>
        <MobileTitleUI />
        <DashboardValue data={data} />
      </div>
      <TableButton className='flex tablet:hidden' data={data} />
    </div>
  );
}

function TableButton({
  className,
  data,
}: {
  className: string;
  data: InvitationProps;
}) {
  const router = useRouter();

  const { fetch: putData } = useRequest<Boolean>({
    skip: true,
    options: { url: `invitations/${data.id}`, method: 'put' },
  });

  const acceptInvitation = async () => {
    try {
      await putData({
        data: {
          inviteAccepted: true,
        },
      });
      router.reload(); // 페이지 전체 다시 렌더링
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const rejectInvitation = async () => {
    try {
      await putData({
        data: {
          inviteAccepted: false,
        },
      });
      router.reload(); // 페이지 전체 다시 렌더링
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={`gap-10 ${className}`}>
      <Button size='md' onClick={acceptInvitation}>
        {'수락'}
      </Button>
      <Button.Secondary size='md' onClick={rejectInvitation}>
        {'거절'}
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
//이상하게도 api 상엔 초대를 보낼 때 invitee nickname과 inviteruseid를 보냄.. 초대보낸 이용자의 닉네임을 표기하고 싶은데..
function DashboardValue({ data }: { data: InvitationProps }) {
  return (
    <div className='flex grid-cols-10 flex-col gap-10 tablet:grid tablet:items-center'>
      <p className='body1-light tablet:col-span-5 tablet:pl-8'>
        {data.dashboard.title}
      </p>
      <p className='body1-light tablet:col-span-2'>{data.inviterUserId}</p>
      <TableButton
        className='hidden tablet:col-span-3 tablet:flex'
        data={data}
      />
    </div>
  );
}
export default InvitedDashboardsTable;
