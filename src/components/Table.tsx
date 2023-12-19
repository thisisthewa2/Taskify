import { InvitationProps, Mock_1_6_Invitations } from '@/pages/api/mock';
import { IconSearch } from '@/public/svgs';
import { Button } from './buttons';

function Table() {
  const invitations = Mock_1_6_Invitations.invitations;

  return (
    <div className='mx-16 mt-24 rounded-lg'>
      <p className='heading1-bold'>초대받은 대시보드</p>
      <Search />
      <div className='mb-8 mt-20 hidden grid-cols-10 gap-10 tablet:grid'>
        <p className='body1-light text-gray-4 tablet:col-span-5'>이름</p>
        <p className='body1-light text-gray-4 tablet:col-span-2'>초대자</p>
        <p className='body1-light text-gray-4 tablet:col-span-3'>수락 여부</p>
      </div>
      {invitations.map((invitation, key) => {
        if (invitation.inviteAccepted) return; //이미 수락한 경우

        return <InvitationCard data={invitation} key={key} />;
      })}
    </div>
  );
}

export default Table;

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

function InvitationCard({ data }: { data: InvitationProps }) {
  return (
    <div className='flex flex-col gap-16 border-b border-gray-3 py-16 last:border-b-0 tablet:py-20'>
      <div className='flex gap-16 tablet:flex-col'>
        <div className='flex flex-col gap-10 tablet:hidden'>
          <p className='body1-light text-gray-4'>이름</p>
          <p className='body1-light text-gray-4'>초대자</p>
        </div>
        <div className='flex grid-cols-10 flex-col gap-10 tablet:grid tablet:items-center'>
          <p className='body1-light tablet:col-span-5'>
            {data.dashboard.title}
          </p>
          <p className='body1-light tablet:col-span-2'>
            {data.invitee.nickname}
          </p>
          <TableButton className='hidden tablet:col-span-3 tablet:flex' />
        </div>
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
