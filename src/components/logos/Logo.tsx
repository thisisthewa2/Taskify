import { useAtomValue } from 'jotai';
import Link from 'next/link';
import { loginAtom } from '@/store/loginAtom';
import { IconLargeLogo } from '@/public/svgs';
import { IconSmallLogo } from '@/public/svgs';

function Logo() {
  const loginInfo = useAtomValue(loginAtom);

  return (
    <Link href={loginInfo.isLoggedIn ? '/dashboard' : '/'}>
      <IconLargeLogo className='hidden fill-primary tablet:inline' />
      <IconSmallLogo className='fill-primary tablet:hidden' />
    </Link>
  );
}

export default Logo;
