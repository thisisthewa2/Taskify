import { IconClose } from '@/public/svgs';

export default function Close({ onClick }: any) {
  return (
    <div
      className='h-24 w-24 cursor-pointer tablet:h-32 tablet:w-32'
      onClick={onClick}
    >
      <IconClose width='100%' height='100%' viewBox='0 0 32 32' />
    </div>
  );
}
