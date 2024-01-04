import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { themeAtom } from '@/store/colorSchemeAtom';

interface FeatureSectionProps {
  imageUrl: string;
  title: string;
  description: string;
}

function FeatureSection({ imageUrl, title, description }: FeatureSectionProps) {
  const theme = useAtomValue(themeAtom);

  return (
    <div
      className={`m-16 flex h-347 w-343 flex-col rounded-md bg-gradient-to-b py-26 tablet:h-384 tablet:w-378 ${
        theme === 'light'
          ? 'from-primary-light to-primary-light/30'
          : 'from-gray-1 to-gray-1/30'
      }`}
    >
      <div
        className={`flex-center h-235 tablet:h-260 ${
          theme === 'light' ? 'bg-primary-light' : 'bg-gray-1'
        }`}
      >
        <Image src={imageUrl} alt='Illustration' width={300} height={230} />
      </div>
      <div className='mt-10 px-32 text-left text-18 font-bold tablet:mt-16'>
        {title}
      </div>
      <div className='px-32 text-left text-16'>{description}</div>
    </div>
  );
}

export default FeatureSection;
