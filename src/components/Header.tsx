import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { loginAtom } from '@/store/loginAtom';
import { Mock_members } from '@/pages/api/mock';
import { Button } from '@/components/buttons';
import { IconAddBox, IconSettings } from '@/public/svgs';
import Members from './Members';
import Logo from './logos/Logo';

interface Prop {
  createdByMe?: boolean;
}

function Header({ createdByMe }: Prop) {
  const loginInfo = useAtomValue(loginAtom);

  return (
    <>
      {loginInfo.isLoggedIn ? (
        <MyHeader createdByMe={createdByMe} />
      ) : (
        <DefaultHeader />
      )}
    </>
  );
}

export default Header;

function DefaultHeader() {
  return (
    <div className='flex h-60 w-full max-w-[120rem] items-center justify-between bg-white px-24 tablet:h-70 tablet:pl-16 tablet:pr-40 pc:pr-80'>
      <div className='pl-4 pt-4'>
        <Logo />
      </div>
      <div className='flex gap-20 tablet:gap-36'>
        <TransparentButton>로그인</TransparentButton>
        <TransparentButton>회원가입</TransparentButton>
      </div>
    </div>
  );
}

function TransparentButton({ children }: { children: string }) {
  return (
    <button className='button body1-normal hover:body1-bold text-gray-7'>
      {children}
    </button>
  );
}

function MyHeader({ createdByMe }: Prop) {
  const router = useRouter();
  const title = '내 대시보드';

  return (
    <div className='flex h-60 items-center justify-between border-b border-solid border-gray-3 bg-white pl-24 pr-12 tablet:h-70 tablet:px-40 pc:pr-80'>
      <div className='heading2-bold pl-4 pt-4'>{title}</div>
      <div className='flex-center body1-normal gap-12 tablet:gap-24'>
        {router.pathname !== '/mydashboard' && (
          <DashBoardInfo createdByMe={createdByMe} />
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

function DashBoardInfo({ createdByMe }: Prop) {
  return (
    <div className='flex-center h-34 gap-16 border-r border-gray-3 pr-12 text-gray-5 tablet:h-38 tablet:gap-23 tablet:pr-24 pc:gap-40'>
      <DashboardManageButton createdByMe={createdByMe} />
      <Members members={Mock_members.members} />
    </div>
  );
}

function DashboardManageButton({ createdByMe = false }: Prop) {
  return (
    <div className='flex-center gap-16'>
      {createdByMe && (
        <Button.Outline size='sm'>
          <div className='hidden pr-8 tablet:block'>
            <IconSettings />
          </div>
          관리
        </Button.Outline>
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
