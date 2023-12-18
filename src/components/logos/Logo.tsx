import { IconLargeLogo } from '@/public/svgs';
import { IconSmallLogo } from '@/public/svgs';

function Logo() {
  return (
    <div>
      <IconLargeLogo className='hidden fill-primary tablet:inline' />
      <IconSmallLogo className='fill-primary tablet:hidden' />
    </div>
  );
}

export default Logo;
