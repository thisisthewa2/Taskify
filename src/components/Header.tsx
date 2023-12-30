import { useAtomValue } from 'jotai';
import router, { useRouter } from 'next/router';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useRequest from '@/hooks/useRequest';
import { loginAtom } from '@/store/loginAtom';
import { GetDashboardInfoType, MembersProps } from '@/pages/api/mock';
import { Button } from '@/components/buttons';
import { IconAddBox, IconSettings } from '@/public/svgs';
import Members from './Members';
import Logo from './logos/Logo';

function Header() {
  const loginInfo = useAtomValue(loginAtom);

  return <>{loginInfo.isLoggedIn ? <MyHeader /> : <DefaultHeader />}</>;
}

export default Header;

function DefaultHeader() {
  const handleSignInClick = () => {
    router.push('/signin');
  };

  const handleSignUpClick = () => {
    router.push('/signup');
  };

  return (
    <div className='flex h-60 w-full max-w-[120rem] items-center justify-between bg-white px-24 tablet:h-70 tablet:pl-16 tablet:pr-40 pc:pr-80'>
      <div className='pl-4 pt-4'>
        <Logo />
      </div>
      <div className='flex gap-20 tablet:gap-36'>
        <TransparentButton onClick={handleSignInClick}>
          로그인
        </TransparentButton>
        <TransparentButton onClick={handleSignUpClick}>
          회원가입
        </TransparentButton>
      </div>
    </div>
  );
}

function TransparentButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      className='button body1-normal hover:body1-bold text-gray-7'
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function MyHeader() {
  const router = useRouter();
  const title = '내 대시보드';
  const { dashboardId } = router.query as { dashboardId: string };

  const { data: memberList, fetch: getMemberList } = useRequest<
    MembersProps | undefined
  >({
    skip: true,
    options: {
      url: `members?page=1&size=4&dashboardId=${dashboardId}`,
      method: 'get',
    },
  });

  const { data: dashboardInfo, fetch: getDashboardInfo } = useRequest<
    GetDashboardInfoType | undefined
  >({
    skip: true,
    options: {
      url: `dashboards/${dashboardId}`,
      method: 'get',
    },
  });

  useEffect(() => {
    if (!dashboardId) return;
    getMemberList();
    getDashboardInfo();
  }, [dashboardId, memberList?.totalCount, dashboardInfo?.createdByMe]);

  if (!memberList || !dashboardInfo) return;

  const { createdByMe } = dashboardInfo;

  return (
    <div className='flex h-60 items-center justify-between border-b border-solid border-gray-3 bg-white pl-24 pr-12 tablet:h-70 tablet:px-40 pc:pr-80'>
      <div className='heading2-bold pl-4 pt-4'>{title}</div>
      <div className='flex-center body1-normal gap-12 tablet:gap-24'>
        {router.pathname !== '/dashboard' && (
          <DashBoardInfo
            createdByMe={createdByMe}
            memberList={memberList}
            dashboardId={dashboardId}
          />
        )}
        <ProfileInfo />
      </div>
    </div>
  );
}

function ProfileInfo() {
  const loginInfo = useAtomValue(loginAtom);
  const myProfile = {
    id: loginInfo.id ?? 1,
    nickname: loginInfo.nickname ?? '홍길동',
    profileImageUrl: loginInfo.profileImageUrl,
  };

  return (
    <div className='flex-center gap-12'>
      <Members members={[myProfile]} />
      <div className='hidden tablet:block'>{myProfile.nickname}</div>
    </div>
  );
}

interface Props {
  createdByMe: boolean;
  memberList?: MembersProps;
  dashboardId: string;
}

function DashBoardInfo({ createdByMe, memberList, dashboardId }: Props) {
  return (
    <div className='flex-center h-34 gap-16 border-r border-gray-3 pr-12 text-gray-5 tablet:h-38 tablet:gap-23 tablet:pr-24 pc:gap-40'>
      <DashboardManageButton
        createdByMe={createdByMe}
        dashboardId={dashboardId}
      />
      {memberList && <Members members={memberList?.members} />}
    </div>
  );
}

function DashboardManageButton({ createdByMe = false, dashboardId }: Props) {
  return (
    <div className='flex-center gap-16'>
      {createdByMe && (
        <Link href={`/dashboard/${dashboardId}/edit`}>
          <Button.Outline size='sm'>
            <div className='hidden pr-8 tablet:block'>
              <IconSettings />
            </div>
            관리
          </Button.Outline>
        </Link>
      )}
      <Button.Outline size='sm'>
        <div className='hidden pr-8 tablet:block'>
          <IconAddBox fill='#787486' />
        </div>
        초대하기
      </Button.Outline>
    </div>
  );
}
