import Image from 'next/image';
import DashBoardImage from '@/public/pngs/dashboard.png';

function DescriptionSection() {
  return (
    <div className='mb-90 flex h-full w-full max-w-7xl flex-col rounded-md bg-gray-3 pc:grid pc:grid-cols-2'>
      <div className='mx-100 mt-100 w-fit flex-col justify-center tablet:justify-start pc:ms-100 pc:mt-20'>
        <div className='text-18 text-gray-5 tablet:text-24'>Point1</div>
        <div className='mt-80 whitespace-nowrap text-[36px] font-bold tablet:text-[48px]'>
          일의 우선순위를
        </div>
        <div className='mb-100 whitespace-nowrap text-[36px] font-bold tablet:text-[48px]'>
          관리하세요
        </div>
      </div>
      <div className='flex justify-end'>
        <div className='relative flex h-250 w-296 tablet:mt-120 tablet:h-435 tablet:w-[32.5rem] pc:h-500 pc:w-[37.125rem]'>
          <Image src={DashBoardImage} alt='Illustration' fill />
        </div>
      </div>
    </div>
  );
}

export default DescriptionSection;
