import Image from 'next/image';

interface FeatureSectionProps {
  imageUrl: string;
  title: string;
  description: string;
}

function FeatureSection({ imageUrl, title, description }: FeatureSectionProps) {
  return (
    <div className='h-686 m-16 flex w-343 flex-col rounded-md bg-gradient-to-b from-gray-3 to-gray-3/50 py-16'>
      <div className='flex h-235 items-center justify-center bg-gray-3'>
        <Image src={imageUrl} alt='Illustration' width={296} height={248} />
      </div>
      <div className='mt-4 px-32 text-left text-18 font-bold'>{title}</div>
      <div className='px-32 text-left text-16'>{description}</div>
    </div>
  );
}

export default FeatureSection;
