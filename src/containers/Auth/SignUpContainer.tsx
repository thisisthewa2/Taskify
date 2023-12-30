import axios from 'axios';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import useRequest from '@/hooks/useRequest';
import { loginAtom } from '@/store/loginAtom';
import { setAccessToken } from '@/services/utils/handleToken';
import { Button } from '@/components/buttons';
import AuthInput from '@/components/inputs/AuthInput';
import MainLogo from '@/components/logos/MainLogo';
import { ERROR_MESSAGES, REG_EXP } from './validation';

export interface SignUpType {
  email: string;
  nickname: string;
  password: string;
  passwordCh: string;
  checkBox: boolean;
}

const TOAST_STYLE = {
  succes: 'opacity-100 bottom-20 block',
  basic: 'opacity-0 bottom-0 hidden',
};

function SignUpContainer() {
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useAtom(loginAtom);

  if (loginInfo.isLoggedIn) {
    router.push('/dashboard');
  }

  const [isCheckBox, setIsCheckBox] = useState(false);
  const [isToast, setToast] = useState(false);
  const {
    handleSubmit: onSubmit,
    formState,
    setError,
    control,
    watch,
    trigger,
  } = useForm<SignUpType>({
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordCh: '',
      checkBox: false,
    },
    mode: 'onBlur',
  });
  const passwordState = watch('password');
  const { isDirty, isValid } = formState;

  const isSignUp = isDirty && isValid && isCheckBox; //버튼 활성화

  const { fetch: signup } = useRequest({
    skip: true,
    options: {
      url: 'users',
      method: 'post',
    },
  });

  const { fetch: signin } = useRequest({
    skip: true,
    options: {
      url: 'auth/login',
      method: 'post',
    },
  });

  const handleSubmit: SubmitHandler<SignUpType> = async (formData) => {
    const { email, password, nickname } = formData;

    if (!(email && password && nickname)) return;

    const { data: signupData, error } = await signup({
      data: { email, nickname, password },
    });

    if (signupData) {
      setToast(true);

      const { data: signinData } = await signin({ data: { email, password } });
      const { accessToken, user } = signinData;

      setLoginInfo({
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        profileImageUrl: user.profileImageUrl,
      });

      setAccessToken(accessToken);

      setTimeout(() => {
        setToast(false);
        router.push('/dashboard');
      }, 2000);

      return;
    }

    if (!axios.isAxiosError(error)) return;

    if (error.response?.status === 409) {
      setError('email', {
        type: 'email',
        message: error.response.data.message,
      });
    }
  };

  return (
    <div className='bg-white'>
      <div className='flex-center mx-auto max-h-fit min-h-screen w-full max-w-xl flex-col px-12 py-15 text-center'>
        <Link
          className='mx-auto my-0 inline-block w-120 tablet:w-200'
          href={'/'}
        >
          <MainLogo />
        </Link>
        <h3 className='text-20 font-normal'>첫 방문을 환영합니다!</h3>
        <form className='mt-20 w-full' onSubmit={onSubmit(handleSubmit)}>
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
          <div className='mb-16 flex h-95 flex-col items-start justify-start'>
            <label className='mb-8 text-16 font-normal' htmlFor='email'>
              닉네임
            </label>
            <Controller
              name='nickname'
              control={control}
              rules={{
                required: ERROR_MESSAGES.nickname.nicknameField,
                pattern: {
                  value: REG_EXP.CHECK_NICKNAME,
                  message: ERROR_MESSAGES.nickname.nicknamePattern,
                },
              }}
              render={({ field, fieldState }) => (
                <>
                  <AuthInput field={field} fieldState={fieldState} />
                </>
              )}
            />
          </div>
          <div className='mb-20 flex h-95 flex-col items-start justify-start'>
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
          <div className='mb-20 flex h-95 flex-col items-start justify-start'>
            <label className='mb-8 text-16 font-normal' htmlFor='password'>
              비밀번호 확인
            </label>
            <Controller
              name='passwordCh'
              control={control}
              rules={{
                validate: (value) =>
                  value === passwordState || '비밀번호가 일치하지 않습니다',
              }}
              render={({ field, fieldState }) => (
                <>
                  <AuthInput
                    field={field}
                    fieldState={fieldState}
                    trigger={trigger}
                  />
                </>
              )}
            />
          </div>
          <div className='mb-20 flex items-center justify-start'>
            <Controller
              name='checkBox'
              control={control}
              render={({ field: { value, onChange } }) => (
                <>
                  <input
                    className='h-20 w-20'
                    type='checkbox'
                    checked={!!value}
                    onChange={(e) => {
                      onChange(e.target.checked);
                      setIsCheckBox(e.target.checked);
                    }}
                  />
                  <small className='ml-8 text-16'>이용약관에 동의합니다.</small>
                </>
              )}
            />
          </div>
          <Button size='full' disabled={!isSignUp}>
            가입하기
          </Button>
        </form>
        <div className='mt-24 text-center text-16 font-normal'>
          이미 가입하셨나요?
          <Link className='ml-7 text-primary underline' href='/signin'>
            로그인하기
          </Link>
        </div>
      </div>
      <div
        id='toast'
        className={`fixed left-1/2 -translate-x-1/2 rounded-lg bg-black px-15 py-10 text-white transition-all ${
          isToast ? TOAST_STYLE.succes : TOAST_STYLE.basic
        }`}
      >
        회원가입이 완료되었습니다.
      </div>
    </div>
  );
}

export default SignUpContainer;
