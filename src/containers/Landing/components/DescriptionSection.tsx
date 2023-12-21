import Image from 'next/image';
import DashBoardImage from '@/public/pngs/dashboard.png';

function DescriptionSection() {
  return (
    <div className='mx-16 my-180 grid h-full w-full rounded-md bg-gray-3 tablet:mx-40 tablet:gap-0 pc:mx-360 pc:grid-cols-2 pc:items-center pc:gap-0'>
      <div className='mx-100 mt-100 flex flex-col'>
        <div className='font-500 justify-center text-18 text-gray-5 tablet:justify-start tablet:text-24'>
          Point1
        </div>
        <div className='mt-80 justify-center whitespace-nowrap text-[36px] font-bold tablet:justify-start tablet:text-[48px]'>
          일의 우선순위를
        </div>
        <div className='mb-100 justify-center whitespace-nowrap text-[36px] font-bold tablet:justify-start tablet:text-[48px]'>
          관리하세요
        </div>
      </div>
      <div className='flex justify-end pc:ml-100'>
        <div className='relative h-250 w-296 tablet:mt-120 tablet:h-435 tablet:w-[519px] pc:h-[502px] pc:w-[594px]'>
          <Image src={DashBoardImage} alt='Illustration' fill />
        </div>
      </div>
    </div>
  );
}

export default DescriptionSection;
