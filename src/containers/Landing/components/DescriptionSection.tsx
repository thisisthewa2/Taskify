import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { themeAtom } from '@/store/colorSchemeAtom';
import DashBoardImage from '@/public/webps/dashboard.webp';

function DescriptionSection() {
  const theme = useAtomValue(themeAtom);

  return (
    <div
      className={`flex h-[42.875rem] w-11/12 min-w-fit max-w-7xl flex-col justify-center overflow-hidden rounded-md  text-center tablet:h-[60.75rem] tablet:justify-start pc:grid pc:h-[37.5rem] pc:w-4/6 pc:grid-cols-2 pc:justify-items-center ${
        theme === 'light' ? 'bg-primary-light' : 'bg-gray-1'
      }`}
    >
      <div className='mt-100 flex-col justify-center tablet:ms-50 tablet:text-left'>
        <div className='text-18 text-gray-5 tablet:text-24 '>Point1</div>
        <div className='mt-80 whitespace-nowrap text-[36px] font-bold tablet:text-[48px]'>
          일의 우선순위를
        </div>
        <div className='mb-100 whitespace-nowrap text-[36px] font-bold tablet:text-[48px]'>
          관리하세요
        </div>
      </div>
      <div className='relative ml-auto mt-22 flex h-250 w-296 items-end tablet:mt-120 tablet:h-435 tablet:w-[32.5rem] pc:h-500 pc:w-[37.125rem]'>
        <Image src={DashBoardImage} alt='Illustration' fill />
      </div>
    </div>
  );
}

export default DescriptionSection;
