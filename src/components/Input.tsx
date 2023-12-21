import { useState } from 'react';
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';
import { SigninType } from '@/containers/SigninContainer';
import { IconEyeOff, IconEyeOn } from '@/public/svgs';

interface InputType {
  type: string;
  field:
    | ControllerRenderProps<SigninType, 'email'>
    | ControllerRenderProps<SigninType, 'password'>;
  fieldState: ControllerFieldState;
}

function Input({ type, field, fieldState }: InputType) {
  const [eyeIconState, setEyeIconState] = useState<boolean>(false);

  if (fieldState.error) {
    fieldState.error.message;
  }

  const handleClick = () => {
    setEyeIconState(!eyeIconState);
  };

  const isType = () => {
    return type === 'email';
  };

  return (
    <>
      <div className='relative'>
        <input
          className='input focus:border-solid-primary pt-15 leading-none'
          type={eyeIconState || isType() ? 'text' : 'password'}
          name={type}
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
        <small className='body2-normal mt-8 text-red'>
          {fieldState.error.message}
        </small>
      )}
    </>
  );
}

export default Input;
