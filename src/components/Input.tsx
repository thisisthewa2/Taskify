import { useState } from 'react';
import { IconEyeOff, IconEyeOn } from '@/public/svgs';

interface InputType {
  type: string;
}

function Input({ type }: InputType) {
  const [eyeIconState, setEyeIconState] = useState<boolean>(false);

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
      {/* <small className='body2-normal text-red'>이메일을 입력해주세요</small> */}
    </>
  );
}

export default Input;
