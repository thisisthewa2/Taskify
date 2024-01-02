import Link from 'next/link';
import { IconEmail, IconFacebook, IconInstagram } from '@/public/svgs';
import Facebook from '../buttons/Facebook';
import Instagram from '../icons/Instagram';

function Footer() {
  return (
    <div className='flex-center flex w-full max-w-[120rem] flex-col  items-center pt-100 text-14 tablet:flex-row tablet:justify-between tablet:px-40 tablet:text-18 '>
      <div>©codeit - 2023</div>
      <div className='flex h-14 w-117 justify-between gap-20 whitespace-nowrap'>
        <Link
          href={
            'https://cyan-giver-f83.notion.site/Peachypeachy-bda493039efb4a2ea069324750d435a8?pvs=4'
          }
        >
          Privacy Policy
        </Link>
        <Link href={''}>FAQ</Link>
      </div>
      <div className='flex gap-20 py-80'>
        <IconEmail />
        <Facebook />
        <Instagram />
      </div>
    </div>
  );
}
export default Footer;
