import Link from 'next/link';
import { IconEmail, IconFacebook, IconInstagram } from '@/public/svgs';

function Footer() {
  return (
    <div className='flex-center flex w-full max-w-[120rem] flex-col  items-center pt-100 text-14 tablet:flex-row tablet:justify-between tablet:px-40 tablet:text-18 '>
      <div>©codeit - 2023</div>
      <div className='flex h-14 w-117 justify-between gap-20 whitespace-nowrap'>
        <Link href={''}>Privacy Policy</Link>
        <Link href={''}>FAQ</Link>
      </div>
      <div className='flex gap-20 py-80'>
        <IconEmail />
        <IconFacebook />
        <IconInstagram />
      </div>
    </div>
  );
}
export default Footer;
