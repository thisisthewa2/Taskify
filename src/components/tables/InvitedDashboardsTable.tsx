import { InvitationProps } from '@/pages/api/mock';
import { IconSearch, IconUnsubscribe } from '@/public/svgs';
import { Button } from '../buttons';

interface Props {
  data: InvitationProps[];
  totalCount: number;
}

function InvitedDashboardsTable({ data, totalCount }: Props) {
  return (
    <div className='rounded-lg bg-white px-16 pt-24'>
      <p className='heading1-bold'>초대받은 대시보드</p>
      {totalCount === 0 ? (
        <Empty />
      ) : (
        <>
          <Search />
          <TabletTitleUI />
          {data.map((invitation: InvitationProps, key: number) => {
            if (invitation.inviteAccepted) return; //이미 수락한 경우
            return <InvitedDashboard data={invitation} key={key} />;
          })}
        </>
      )}
    </div>
  );
}

export default InvitedDashboardsTable;

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

function Search() {
  return (
    <div className='body1-normal relative mb-8 mt-20'>
      <input
        className='input body1-light h-36 pl-44 tablet:h-40'
        placeholder='검색'
        type='text'
      />
      <IconSearch className='absolute left-12 top-1/2 -translate-y-1/2' />
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
      <TableButton className='flex tablet:hidden' />
    </div>
  );
}

function TableButton({ className }: { className: string }) {
  return (
    <div className={`gap-10 ${className}`}>
      <Button size='md'>수락</Button>
      <Button.Secondary size='md'>거절</Button.Secondary>
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

function DashboardValue({ data }: { data: InvitationProps }) {
  return (
    <div className='flex grid-cols-10 flex-col gap-10 tablet:grid tablet:items-center'>
      <p className='body1-light tablet:col-span-5 tablet:pl-8'>
        {data.dashboard.title}
      </p>
      <p className='body1-light tablet:col-span-2'>{data.invitee.nickname}</p>
      <TableButton className='hidden tablet:col-span-3 tablet:flex' />
    </div>
  );
}