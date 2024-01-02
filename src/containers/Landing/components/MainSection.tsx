import Image from 'next/image';
import { Button } from '@/components/buttons';
import DeskImage from '@/public/webps/desktop.webp';
import Link from 'next/link';

function MainSection() {
  return (
    <div className='flex-center mb-100 flex-col tablet:justify-center'>
      <div className='relative mt-50 h-168 max-h-[26.375rem] w-287 max-w-[45.125rem] tablet:mt-100 tablet:h-315 tablet:w-[36rem] pc:h-[53rem] pc:w-[90rem]'>
        <Image src={DeskImage} alt='Illustration' fill priority />
      </div>
      <div className='flex-center mt-50 flex-col text-[40px] tablet:flex-row tablet:justify-between tablet:text-[42px] pc:text-[50px]'>
        <div className='text-center font-bold tablet:mx-20'>
          새로운 일정 관리
        </div>
        <div className='font-["Montserrat"] font-bold text-purple first-letter:text-center'>
          Taskify
        </div>
      </div>
      <div className='my-40 whitespace-break-spaces text-center text-24 font-bold tablet:text-left tablet:text-[32px]'>
        <div className='hidden tablet:block'>
          효율적인 일정 관리와 협업을 위한 완벽한 툴
        </div>
        <div className='block tablet:hidden'>
          효율적인 일정 관리와
          <br />
          협업을 위한 완벽한 툴
        </div>
      </div>
      <Button size='lg'>
        <Link href='/signin'>{'   로그인 하기  '}</Link>
      </Button>
    </div>
  );
}

export default MainSection;
