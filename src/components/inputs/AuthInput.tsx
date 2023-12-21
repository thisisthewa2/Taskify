import { useState } from 'react';
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';
import { SigninType } from '@/containers/Auth/SigninContainer';
import { IconEyeOff, IconEyeOn } from '@/public/svgs';

interface AuthInputType {
  field:
    | ControllerRenderProps<SigninType, 'email'>
    | ControllerRenderProps<SigninType, 'password'>;
  fieldState: ControllerFieldState;
}

function AuthInput({ field, fieldState }: AuthInputType) {
  const [eyeIconState, setEyeIconState] = useState<boolean>(false);
  const { invalid } = fieldState; /* 에러메세지 불린 */

  const handleClick = () => {
    setEyeIconState(!eyeIconState);
  };

  const isType = () => {
    return field.name === 'email';
  };

  return (
    <>
      <div className='relative w-full'>
        <input
          className={`focus:border-solid-primary pt-15 leading-none ${
            invalid ? 'input border-red' : 'input'
          }`}
          type={eyeIconState || isType() ? 'text' : 'password'}
          name={field.name}
          value={field.value}
          onChange={(e) => {
            field.onChange(e);
          }}
          onBlur={() => {
            field.onBlur();
          }}
          placeholder={
            isType() ? '이메일을 입력해주세요' : '비밀번호를 입력해주세요'
          }
          autoComplete='off'
        />
        {isType() ? null : (
          <div
            className='absolute right-0 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2'
            onClick={handleClick}
          >
            {eyeIconState ? <IconEyeOn /> : <IconEyeOff />}
          </div>
        )}
      </div>
      {fieldState.error && (
        <small className='body2-normal mt-5 text-red'>
          {fieldState.error.message}
        </small>
      )}
    </>
  );
}

export default AuthInput;
