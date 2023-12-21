import Image from 'next/image';
import ModalImage from '@/public/pngs/modal.png';

function SubDescriptionSection() {
  return (
    <div className='mx-16 mb-180 grid h-full w-full rounded-md bg-gray-3 tablet:mx-40 pc:mx-360 pc:grid-cols-2 pc:items-center pc:gap-0'>
      <div className='mx-100 mt-100 flex flex-col pc:order-2'>
        <div className='font-500 justify-center text-18 text-gray-5 tablet:justify-start tablet:text-24'>
          Point2
        </div>
        <div className='mt-80 justify-center whitespace-nowrap text-[36px] font-bold tablet:justify-start tablet:text-[48px]'>
          해야할 일을
        </div>
        <div className='mb-100 justify-center whitespace-nowrap text-[36px] font-bold tablet:justify-start tablet:text-[48px]'>
          등록하세요
        </div>
      </div>
      <div className='flex-center order-1 pc:ml-100'>
        <div className='relative h-250 w-217 tablet:mt-120 tablet:h-415 tablet:w-360 pc:h-[502px] pc:w-436'>
          <Image src={ModalImage} alt='Illustration' fill />
        </div>
      </div>
    </div>
  );
}
export default SubDescriptionSection;
