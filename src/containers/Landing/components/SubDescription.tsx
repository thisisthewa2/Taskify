import Image from 'next/image';
import ModalImage from '@/public/pngs/modal.png';

function SubDescriptionSection() {
  return (
    <div className='mb-90 flex h-full w-full flex-col rounded-md bg-gray-3 pc:grid pc:grid-cols-2'>
      <div className='order-1 mx-100 mt-100 flex-col justify-center tablet:justify-start pc:order-2'>
        <div className='font-500 text-18 text-gray-5 tablet:text-24'>
          Point2
        </div>
        <div className='mt-80 whitespace-nowrap text-[36px] font-bold tablet:text-[48px]'>
          해야할 일을
        </div>
        <div className='mb-100 whitespace-nowrap text-[36px] font-bold  tablet:text-[48px]'>
          등록하세요
        </div>
      </div>
      <div className='flex-center order-2 justify-end pc:order-1 pc:ml-100'>
        <div className='relative h-250 w-217 tablet:mt-120 tablet:h-415 tablet:w-360 pc:h-[502px] pc:w-436'>
          <Image src={ModalImage} alt='Illustration' fill />
        </div>
      </div>
    </div>
  );
}
export default SubDescriptionSection;
