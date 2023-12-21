import { useState } from 'react';
import { DashboardsInvitationProps, MemberProps } from '@/pages/api/mock';
import { IconAddBox } from '@/public/svgs';
import Members from '../Members';
import { Button } from '../buttons';
import ArrowButton from '../buttons/ArrowButton';

//예시 데이터
// const { totalCount, members } = Mock_members;
// const { totalCount: totalCount2, invitations } =
//   Mock_dashboards_dashboardId_invitations;

interface Props {
  type: 'invitation' | 'member';
  totalCount: number;
  data: MemberProps[] | DashboardsInvitationProps[];
}

function DashboardInfoTable({ type, totalCount, data }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  // const data = get /1-6/members page=currentPage size=5 해서 MemberList로 넘겨주기(dep = currentPage)

  return (
    <div className='flex flex-col rounded-lg bg-white px-16 pt-24'>
      <TableHeader
        type={type}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={totalCount}
      />
      {totalCount > 0 &&
        data.map((account, key) => {
          return <AccountInfo data={account} key={key} />;
        })}
    </div>
  );
}

export default DashboardInfoTable;

interface HeaderProps {
  type: string;
  currentPage: number;
  setCurrentPage: (arg: number) => void;
  totalCount: number;
}

function TableHeader({
  type,
  currentPage,
  setCurrentPage,
  totalCount,
}: HeaderProps) {
  const totalPage = Math.floor(totalCount / 5) + 1;

  const handleLeftClick = () => setCurrentPage(currentPage - 1);
  const handleRightClick = () => setCurrentPage(currentPage + 1);

  return (
    <>
      <div className='flex items-center justify-between'>
        <p className='heading1-bold'>
          {type === 'member' ? '구성원' : '초대 내역'}
        </p>
        <div className='relative flex items-center gap-12'>
          <p className='body2-light'>
            {totalPage} 페이지 중 {currentPage}
          </p>
          <ArrowButton
            onLeftClick={handleLeftClick}
            onRightClick={handleRightClick}
            leftDisabled={currentPage === 1 ? true : false}
            rightDisabled={currentPage === totalPage ? true : false}
          />
          {type === 'invitation' && <InvitingButton />}
        </div>
      </div>
      <p className='body1-light pb-18 pt-24 text-gray-4'>
        {type === 'member' ? '이름' : '이메일'}
      </p>
    </>
  );
}

function InvitingButton() {
  return (
    <div className='absolute right-0 top-61 tablet:static'>
      <Button size='sm'>
        <div className='h-14 w-19 pr-5'>
          <IconAddBox
            width='100%'
            height='100%'
            viewBox='0 0 19 19'
            fill='white'
          />
        </div>
        초대하기
      </Button>
    </div>
  );
}

function AccountInfo({
  data,
}: {
  data: MemberProps | DashboardsInvitationProps;
}) {
  let text;
  let profile;

  if ('email' in data) {
    text = data.email;
    profile = [
      {
        id: data.id,
        profileImageUrl: data.profileImageUrl || undefined,
        nickname: data.nickname,
      },
    ];
  } else {
    text = data.invitee.nickname;
    profile = [
      {
        id: data.invitee.id,
        profileImageUrl: undefined,
        nickname: data.invitee.nickname,
      },
    ];
  }

  return (
    <div className='flex shrink-0 items-center justify-between border-b border-gray-3 py-12 last:border-b-0 tablet:py-16'>
      <div className='flex items-center gap-8'>
        {'invitee' in data && <Members members={profile} />}
        <p className='body1-light'>{text}</p>
      </div>
      <div className='shrink-0'>
        <Button.Secondary size='sm'>취소</Button.Secondary>
      </div>
    </div>
  );
}
