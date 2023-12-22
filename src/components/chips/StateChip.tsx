import { IconEllipse } from '@/public/svgs';

export default function StateChip({ str }: { str: string }) {
  return (
    <div className='flex-center h-20 w-fit rounded-full bg-primary-light px-4 py-8 tablet:h-22'>
      <span className='flex-center gap-6 px-4 py-8 text-10 text-primary tablet:text-12'>
        <IconEllipse /> {str}
      </span>
    </div>
  );
}
