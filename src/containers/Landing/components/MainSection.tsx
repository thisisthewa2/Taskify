import Image from 'next/image';
import { Button } from '@/components/buttons';
import DeskImage from '@/public/pngs/desk-pc.png';

function MainSection() {
  return (
    <div className='flex-center mb-100 mt-100 flex-col tablet:mt-164 tablet:justify-center'>
      <div className='relative mt-100 h-168 w-287 tablet:h-315 tablet:w-[36rem] pc:h-[53rem] pc:w-[90rem]'>
        <Image src={DeskImage} alt='Illustration' fill />
      </div>
      <div className='flex-center flex-col text-[40px] tablet:flex-row tablet:justify-between tablet:text-[42px] pc:text-[50px]'>
        <div className='mt-50 text-center font-bold tablet:mx-20'>
          새로운 일정 관리
        </div>
        <div className='mb-4 mt-50 font-[Montserrat] font-bold text-purple'>
          Taskify
        </div>
      </div>
      <div className='my-40 text-center text-24 font-bold tablet:text-left tablet:text-[32px]'>
        효율적인 일정 관리와 협업을 위한 완벽한 툴
      </div>
      <Button size='lg'>{'   로그인 하기  '}</Button>
    </div>
  );
}

export default MainSection;
