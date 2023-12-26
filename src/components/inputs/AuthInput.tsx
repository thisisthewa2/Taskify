import { useState } from 'react';
import {
  ControllerFieldState,
  ControllerRenderProps,
  UseFormTrigger,
} from 'react-hook-form';
import { SignUpType } from '@/containers/Auth/SignUpContainer';
import { IconEyeOff, IconEyeOn } from '@/public/svgs';
import { PLACEHOLDER_TEXT } from './authPlaceholder';

interface AuthInputType {
  field:
    | ControllerRenderProps<SignUpType, 'email'>
    | ControllerRenderProps<SignUpType, 'nickname'>
    | ControllerRenderProps<SignUpType, 'password'>
    | ControllerRenderProps<SignUpType, 'passwordCh'>;
  fieldState: ControllerFieldState;
  trigger?: UseFormTrigger<SignUpType>;
}

function AuthInput({ field, fieldState, trigger }: AuthInputType) {
  const [eyeIconState, setEyeIconState] = useState<boolean>(false);
  const { invalid } = fieldState; /* 에러메세지 불린 */

  const handleClick = () => {
    setEyeIconState(!eyeIconState);
  };

  const isPassword = field.name === 'email' || field.name === 'nickname';

  return (
    <>
      <div className='relative w-full'>
        <input
          className={`focus:border-solid-primary input pt-15 leading-none ${
            invalid && 'input border-red'
          }`}
          type={eyeIconState || isPassword ? 'text' : 'password'}
          name={field.name}
          value={field.value}
          onChange={(e) => {
            field.onChange(e);
            if (field.name !== 'passwordCh') return;
            trigger && trigger('passwordCh');
          }}
          onBlur={() => {
            field.onBlur();
          }}
          placeholder={PLACEHOLDER_TEXT[`${field.name}`]}
          autoComplete='off'
        />
        {!isPassword && (
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
