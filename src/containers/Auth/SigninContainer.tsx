import { useAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import useRequest from '@/hooks/useRequest';
import { loginAtom } from '@/store/loginAtom';
import { Button } from '@/components/buttons';
import AuthInput from '@/components/inputs/AuthInput';
import MainLogo from '@/components/logos/MainLogo';
import { REG_EXP } from './validation';

export interface SigninType {
  email: string;
  password: string;
}

function SigninContainer() {
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useAtom(loginAtom);
  const {
    handleSubmit: onSubmit,
    formState,
    setError,
    control,
  } = useForm<SigninType>({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  });

  const { email: isEmail, password: isPassword } = formState.dirtyFields;

  const { fetch } = useRequest({
    skip: true,
    options: {
      url: 'auth/login',
      method: 'post',
    },
  });

  const handleSubmit: SubmitHandler<SigninType> = async (formData) => {
    const { email, password } = formData;

    if (email && password) {
      const { data, error } = await fetch({ data: { email, password } });

      if (error) {
        setError('email', {
          type: 'menual',
          message: '이메일을 확인해주세요',
        });
        setError('password', {
          type: 'menual',
          message: '비밀번호를 확인해주세요',
        });
        return;
      }

      alert('환영합니다.');
      const { accessToken, user } = data;

      setLoginInfo({
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        profileImageUrl: user.profileImageUrl,
      });

      localStorage.setItem('accessToken', accessToken);
      router.push('/');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      router.push('/');
    }
  }, []);

  return (
    <div className=' h-screen bg-[#FAFAFA]'>
      <div className='mx-auto my-0 w-full max-w-xl px-12 pt-143 text-center'>
        <Link
          className='mx-auto my-0 inline-block w-120 tablet:w-200'
          href={'/'}
        >
          <MainLogo />
        </Link>
        <h3 className='mt-10 text-20 font-normal'>오늘도 만나서 반가워요!</h3>
        <form className='mt-38' onSubmit={onSubmit(handleSubmit)}>
          <div className='mb-16 flex h-100 flex-col items-start justify-start'>
            <label className='text-base mb-8 font-normal' htmlFor='email'>
              이메일
            </label>
            <Controller
              name='email'
              control={control}
              rules={{
                required: '이메일을 입력해주세요',
                pattern: {
                  value: REG_EXP.CHECK_EMAIL,
                  message: '이메일 형식으로 작성해 주세요',
                },
              }}
              render={({ field, fieldState }) => (
                <>
                  <AuthInput field={field} fieldState={fieldState} />
                </>
              )}
            />
          </div>
          <div className='mb-20 flex h-110 flex-col items-start justify-start'>
            <label className='text-base mb-8 font-normal' htmlFor='password'>
              비밀번호
            </label>
            <Controller
              name='password'
              control={control}
              rules={{
                required: '비밀번호를 입력해주세요',
                pattern: {
                  value: REG_EXP.CHECK_PASSWORD,
                  message: '8자 이상입력해 주세요',
                },
              }}
              render={({ field, fieldState }) => (
                <>
                  <AuthInput field={field} fieldState={fieldState} />
                </>
              )}
            />
          </div>
          <Button size='full' disabled={!(isEmail && isPassword)}>
            로그인
          </Button>
        </form>
        <div className='text-base mt-24 text-center font-normal'>
          회원이 아니신가요?
          <Link className='ml-7 text-primary underline' href='/signup'>
            회원가입하기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SigninContainer;
