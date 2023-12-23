import { useAtom, useAtomValue } from 'jotai';
import { ReactNode, useEffect } from 'react';
import {
  FieldValues,
  UseControllerProps,
  useController,
  useForm,
} from 'react-hook-form';
import { ImageUrlAtom } from '@/store/imageUrlAtom';
import { loginAtom } from '@/store/loginAtom';
import { Button } from '@/components/buttons';
import ImageDrop from '@/components/image-drop/ImageDrop';
import Input from '@/components/inputs/Input';

function ProfileManageBox() {
  return (
    <div className='box'>
      <div className='heading1-bold pb-32'>프로필</div>
      <Form />
    </div>
  );
}
export default ProfileManageBox;

interface FormValues {
  nickname?: string;
  profileImageUrl?: string;
}

function Form() {
  const profileImageUrl = useAtomValue(ImageUrlAtom);
  const [loginInfo, setLoginInfo] = useAtom(loginAtom);

  const { handleSubmit, control, setError, reset } = useForm<FormValues>({
    defaultValues: {
      nickname: loginInfo.nickname,
      profileImageUrl: loginInfo.profileImageUrl,
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    reset({
      nickname: loginInfo.nickname,
      profileImageUrl: loginInfo.profileImageUrl,
    });
    console.log('RUN: ', loginInfo.nickname);
  }, [loginInfo]);

  return (
    <form noValidate>
      <div className='flex flex-col gap-24 pb-16 tablet:flex-row tablet:gap-16 tablet:pb-24'>
        <ImageDrop type='profile' />
        <div className='flex w-full flex-col gap-10'>
          <label htmlFor='password'>이메일</label>
          <input
            id='password'
            className='input'
            placeholder={loginInfo.email}
            disabled
          />
          <InputContainer
            control={control}
            name='nickname'
            placeholder={loginInfo.nickname}
          >
            이메일
          </InputContainer>
        </div>
      </div>
      <div className='flex justify-end'>
        <Button>변경</Button>
      </div>
    </form>
  );
}

interface InputContainer<T extends FieldValues> extends UseControllerProps<T> {
  children: ReactNode;
  placeholder?: string;
}

function InputContainer<T extends FieldValues>({
  children,
  placeholder,
  ...controls
}: InputContainer<T>) {
  const { field } = useController(controls);
  console.log(field.value);
  return (
    <>
      <label htmlFor='password'>{children}</label>
      <input
        id='password'
        placeholder={placeholder}
        {...field}
        className='input'
      />
    </>
  );
}
