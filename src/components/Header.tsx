import { LOGO_LARGE, LOGO_SMALL } from '@/public/svgs';

function Header() {
  return (
    <div className='flex h-60 w-full max-w-[120rem] items-center justify-between bg-white px-24 tablet:h-70 tablet:pl-16 tablet:pr-40 pc:pr-80'>
      <div className='pl-4 pt-4'>
        <Logo />
      </div>
      <div className='flex gap-20 tablet:gap-36'>
        <Button>로그인</Button>
        <Button>회원가입</Button>
      </div>
    </div>
  );
}

export default Header;

export function Logo() {
  return (
    <>
      <LOGO_LARGE className='hidden fill-primary dark:fill-white tablet:inline' />
      <LOGO_SMALL className='fill-primary dark:fill-white tablet:hidden' />
    </>
  );
}

function Button({ children }: { children: string }) {
  return (
    <button className='button body1-normal hover:body1-bold text-gray-7'>
      {children}
    </button>
  );
}
