import { useRouter } from 'next/router';
import Logo from '@/components/logos/Logo';

function LandingHeader() {
  const router = useRouter();
  const handleSignInClick = () => {
    router.push('/signin');
  };

  const handleSignUpClick = () => {
    router.push('/signup');
  };

  return (
    <div className='flex h-60 w-full max-w-[120rem] items-center justify-between bg-white px-24 tablet:h-70 tablet:pl-16 tablet:pr-40 pc:pr-80'>
      <div className='pl-4 pt-4'>
        <Logo />
      </div>
      <div className='flex gap-20 tablet:gap-36'>
        <TransparentButton onClick={handleSignInClick}>
          로그인
        </TransparentButton>
        <TransparentButton onClick={handleSignUpClick}>
          회원가입
        </TransparentButton>
      </div>
    </div>
  );
}

export default LandingHeader;

interface TransparentButtonProps {
  onClick: () => void;
  children: string;
}

function TransparentButton({ onClick, children }: TransparentButtonProps) {
  return (
    <button
      className='button body1-normal hover:body1-bold text-gray-7'
      onClick={onClick}
    >
      {children}
    </button>
  );
}
