import { IconLargeLogo } from '@/public/svgs';
import { IconSmallLogo } from '@/public/svgs';

function SmallLogo() {
  return <IconSmallLogo className='h-27 w-24 tablet:hidden' />;
}

function LargeLogo() {
  return <IconLargeLogo className='hidden h-33 w-109 tablet:block pc:block' />;
}

function Logo() {
  return (
    <div>
      <SmallLogo />
      <LargeLogo />
    </div>
  );
}

export default Logo;
