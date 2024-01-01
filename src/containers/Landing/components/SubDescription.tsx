import Image from 'next/image';
import ModalImage from '@/public/webps/modal.webp';

function SubDescriptionSection() {
  return (
    <div className='flex h-[42.875rem] w-11/12 min-w-fit  max-w-7xl flex-col justify-center rounded-md bg-gray-3 text-center tablet:h-[60.75rem] tablet:justify-start pc:grid pc:h-[37.5rem] pc:w-4/6 pc:grid-cols-2 pc:justify-items-center'>
      <div className='mt-100 flex-col justify-center tablet:ms-50 tablet:text-left'>
        <div className='text-18 text-gray-5 tablet:text-24 '>Point2</div>
        <div className='mt-80 whitespace-nowrap text-[36px] font-bold tablet:text-[48px]'>
          해야 할 일을
        </div>
        <div className='mb-100 whitespace-nowrap text-[36px] font-bold tablet:text-[48px]'>
          등록하세요
        </div>
      </div>
      <div className='flex-center pc:h-[38.75rem] pc:w-[37.125rem]'>
        <div className='relative mt-22 flex h-250 w-217 tablet:mt-120 tablet:h-415 tablet:w-360 pc:h-[31.25rem] pc:w-436'>
          <Image src={ModalImage} alt='Illustration' fill />
        </div>
      </div>
    </div>
  );
}
export default SubDescriptionSection;
