import { useRouter } from 'next/router';
import { IconArrowBackward } from '@/public/svgs';

function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className='flex-center body1-normal mb-8 w-80 gap-6'
    >
      <IconArrowBackward fill='#333236' />
      돌아가기
    </button>
  );
}

export default BackButton;
