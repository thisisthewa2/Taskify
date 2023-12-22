import Image from 'next/image';
import { Button } from '@/components/buttons';
import DeskImage from '@/public/pngs/desk-pc.png';

function MainSection() {
  return (
    <div className='flex-center mb-100 mt-102 flex-col tablet:mt-164 tablet:justify-center'>
      <div className='relative mt-100 h-168 w-287 tablet:h-315 tablet:w-[36rem] pc:h-[53rem] pc:w-[90rem]'>
        <Image src={DeskImage} alt='Illustration' fill />
      </div>
      <div className='flex-center flex-col text-40 tablet:flex-row tablet:justify-between tablet:text-[42px] pc:text-[50px]'>
        <div className='text-center font-bold tablet:mx-20'>
          새로운 일정 관리
        </div>
        <div className='font-montserrat mb-4 font-bold text-purple'>
          Taskify
        </div>
      </div>
      <div className='my-80 text-center text-12 tablet:text-left'>
        서비스의 메인 설명 들어갑니다.
      </div>
      <Button size='lg'>{'   로그인 하기  '}</Button>
    </div>
  );
}

export default MainSection;
