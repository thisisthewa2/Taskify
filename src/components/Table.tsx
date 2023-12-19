import { InvitationProps, Mock_1_6_Invitations } from '@/pages/api/mock';
import { IconSearch } from '@/public/svgs';
import { Button } from './buttons';

function Table() {
  const invitations = Mock_1_6_Invitations.invitations;
  const data = Mock_1_6_Invitations.invitations[0];

  return (
    <div className='mx-16 mt-24 rounded-lg'>
      <p className='heading1-bold'>초대받은 대시보드</p>
      <Search />
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
      <input className='input h-36 pl-44' placeholder='검색' type='text' />
      <IconSearch className='absolute left-12 top-6' />
    </div>
  );
}

function InvitationCard({ data }: { data: InvitationProps }) {
  return (
    <div className='flex flex-col gap-16 border-b border-gray-3 py-16 last:border-b-0'>
      <Info data={data} />
      <TableButton />
    </div>
  );
}

function Info({ data }: { data: InvitationProps }) {
  return (
    <div className='flex gap-16'>
      <div className='flex flex-col gap-10'>
        <p className='body1-light text-gray-4'>이름</p>
        <p className='body1-light text-gray-4'>초대자</p>
      </div>
      <div className='flex flex-col gap-10'>
        <p className='body1-light'>{data.dashboard.title}</p>
        <p className='body1-light'>{data.invitee.nickname}</p>
      </div>
    </div>
  );
}

function TableButton() {
  return (
    <div className='flex gap-10'>
      <Button size='md'>수락</Button>
      <Button.Secondary size='md'>거절</Button.Secondary>
    </div>
  );
}
