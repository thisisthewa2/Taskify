import LargeLogoIcon from '@/public/svgs/large-logo.svg';
import SmallLogoIcon from '@/public/svgs/small-logo.svg';

function SmallLogo() {
  return <SmallLogoIcon className='h-27 w-24 tablet:hidden' />;
}

function LargeLogo() {
  return <LargeLogoIcon className='hidden h-33 w-109 tablet:block pc:block' />;
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
