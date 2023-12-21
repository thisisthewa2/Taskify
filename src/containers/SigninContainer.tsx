import Link from 'next/link';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/components/Input';
import { Button } from '@/components/buttons';
import MainLogo from '@/components/logos/MainLogo';

export interface SigninType {
  email: string;
  password: string;
}

function SigninContainer() {
  const {
    register,
    handleSubmit: onSubmit,
    formState,
    setError,
    control,
  } = useForm<SigninType>({
    defaultValues: { email: '', password: '' },
    mode: 'all',
  });

  const { email: isEmail, password: isPassword } = formState.dirtyFields;

  const handleSubmit: SubmitHandler<SigninType> = (data) => {
    console.log(data);
  };

  return (
    <div className=' h-screen bg-[#FAFAFA]'>
      <div className='mx-auto my-0 w-full max-w-xl px-12 pt-143'>
        <div className='mx-auto my-0 w-120 tablet:w-200'>
          <MainLogo />
        </div>
        <h3 className='mt-10 text-center text-20 font-normal'>
          오늘도 만나서 반가워요!
        </h3>
        <form className='mt-38' onSubmit={onSubmit(handleSubmit)}>
          <div className='mb-16 h-100'>
            <label className='text-base font-normal' htmlFor='email'>
              이메일
            </label>
            <Controller
              name='email'
              control={control}
              rules={{
                required: '이메일을 입력해주세요',
              }}
              render={({ field, fieldState }) => (
                <>
                  <Input type='email' field={field} fieldState={fieldState} />
                </>
              )}
            />
          </div>
          <div className='mb-20 h-100'>
            <label className='text-base font-normal' htmlFor='password'>
              비밀번호
            </label>
            <Controller
              name='password'
              control={control}
              rules={{
                required: '비밀번호를 입력해주세요',
              }}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    type='password'
                    field={field}
                    fieldState={fieldState}
                  />
                </>
              )}
            />
          </div>

          <Button size='full' disabled>
            로그인
          </Button>
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
