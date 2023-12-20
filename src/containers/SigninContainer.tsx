import Link from 'next/link';
import Input from '@/components/Input';
import { Button } from '@/components/buttons';
import MainLogo from '@/components/logos/MainLogo';

function SigninContainer() {
  return (
    <div className=' h-screen bg-[#FAFAFA]'>
      <div className='mx-auto my-0 w-full max-w-xl px-12 pt-223'>
        <div className='mx-auto my-0 w-120 tablet:w-200'>
          <MainLogo />
        </div>
        <h3 className='mt-10 text-center text-20 font-normal'>
          오늘도 만나서 반가워요!
        </h3>
        <form className='mt-38'>
          <div className='mb-16'>
            <label className='text-base font-normal' htmlFor='email'>
              이메일
            </label>
            <Input type='email' />
          </div>
          <div className='mb-20'>
            <label className='text-base font-normal' htmlFor='password'>
              비밀번호
            </label>
            <Input type='password' />
          </div>
          <Button size='full'>로그인</Button>
        </form>
        <div className='text-base mt-24 text-center font-normal'>
          회원이 아니신가요?
          <Link className='ml-7 text-primary underline' href='#none'>
            회원가입하기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SigninContainer;
