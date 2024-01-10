import { useAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import useRequest from '@/hooks/useRequest';
import { loginAtom } from '@/store/loginAtom';
import { setAccessToken } from '@/services/utils/handleToken';
import { Button } from '@/components/buttons';
import AuthInput from '@/components/inputs/AuthInput';
import MainLogo from '@/components/logos/MainLogo';
import { ERROR_MESSAGES, REG_EXP } from './validation';

export interface SigninType {
  email: string;
  password: string;
}

function SigninContainer() {
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useAtom(loginAtom);

  if (loginInfo.isLoggedIn) {
    router.push('/dashboard');
  }

  const {
    handleSubmit: onSubmit,
    formState,
    setError,
    control,
  } = useForm<SigninType>({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  });

  const { isDirty, isValid } = formState;

  const isSignin = isDirty && isValid;

  const { fetch } = useRequest({
    skip: true,
    options: {
      url: 'auth/login',
      method: 'post',
    },
  });

  const handleSubmit: SubmitHandler<SigninType> = async (formData) => {
    const { email, password } = formData;

    if (!(email && password)) return;

    const { data, error } = await fetch({ data: { email, password } });

    if (error) {
      setError('email', {
        type: 'manual',
        message: ERROR_MESSAGES.email.emailToVerify,
      });
      setError('password', {
        type: 'manual',
        message: ERROR_MESSAGES.password.passwordToVerify,
      });
      return;
    }

    const { accessToken, user } = data;

    setLoginInfo({
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      profileImageUrl: user.profileImageUrl,
    });

    setAccessToken(accessToken);
    router.push('/dashboard');
  };

  useEffect(() => {
    const loginInfo = localStorage.getItem('loginInfo');
    if (loginInfo) {
      JSON.parse(loginInfo).isLoggedIn && router.push('/dashboard');
    }
  }, []);

  return (
    <div className='h-screen bg-white'>
      <div className='flex-center mx-auto max-h-fit min-h-screen w-full max-w-xl flex-col px-12 py-15 text-center'>
        <Link
          className='mx-auto my-0 inline-block w-120 tablet:w-200'
          href={'/'}
        >
          <MainLogo />
        </Link>
        <h3 className='mt-10 text-20 font-normal'>오늘도 만나서 반가워요!</h3>
        <form className='mt-38 w-full' onSubmit={onSubmit(handleSubmit)}>
          <div className='mb-16 flex h-95 flex-col items-start justify-start'>
            <label className='mb-8 text-16 font-normal' htmlFor='email'>
              이메일
            </label>
            <Controller
              name='email'
              control={control}
              rules={{
                required: ERROR_MESSAGES.email.emailField,
                pattern: {
                  value: REG_EXP.CHECK_EMAIL,
                  message: ERROR_MESSAGES.email.emailPattern,
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
            <label className='mb-8 text-16 font-normal' htmlFor='password'>
              비밀번호
            </label>
            <Controller
              name='password'
              control={control}
              rules={{
                required: ERROR_MESSAGES.password.passwordField,
                pattern: {
                  value: REG_EXP.CHECK_PASSWORD,
                  message: ERROR_MESSAGES.password.passwordPattern,
                },
              }}
              render={({ field, fieldState }) => (
                <>
                  <AuthInput field={field} fieldState={fieldState} />
                </>
              )}
            />
          </div>
          <Button size='full' disabled={!isSignin}>
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
