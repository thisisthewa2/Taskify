import { useAtom, useAtomValue } from 'jotai';
import { ReactNode, useEffect } from 'react';
import {
  FieldValues,
  SubmitHandler,
  UseControllerProps,
  useController,
  useForm,
} from 'react-hook-form';
import useRequest from '@/hooks/useRequest';
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

  const { fetch } = useRequest({
    skip: true,
    options: {
      url: 'users/me',
      method: 'put',
    },
  });

  const { handleSubmit, control, setError, reset } = useForm<FormValues>({
    defaultValues: {
      nickname: loginInfo.nickname,
      profileImageUrl: loginInfo.profileImageUrl,
    },
    mode: 'onBlur',
  });

  const changeProfile: SubmitHandler<FormValues> = async (formData) => {
    console.log(formData);
    const newProfile = {
      nickname: formData.nickname ?? '',
      ...(formData.profileImageUrl && {
        profileImageUrl: formData.profileImageUrl,
      }),
    };

    const { error } = await fetch({
      data: newProfile,
    });

    if (error) return;

    setLoginInfo(newProfile);
  };

  useEffect(() => {
    reset({
      nickname: loginInfo.nickname,
      profileImageUrl: loginInfo.profileImageUrl,
    });
  }, [loginInfo]);

  return (
    <form noValidate onSubmit={handleSubmit(changeProfile)}>
      <div className='flex flex-col gap-24 pb-16 tablet:flex-row tablet:gap-16 tablet:pb-24'>
        <ImageDrop type='profile' initialImageUrl={loginInfo.profileImageUrl} />
        <div className='flex w-full flex-col gap-10'>
          <label htmlFor='password'>이메일</label>
          <input
            id='password'
            className='input'
            placeholder={loginInfo.email}
            disabled
          />
          <InputContainer<FormValues>
            control={control}
            name='nickname'
            placeholder={loginInfo.nickname}
          >
            닉네임
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

  return (
    <>
      <label htmlFor={field.name}>{children}</label>
      <input
        id={field.name}
        placeholder={placeholder}
        {...field}
        className='input'
      />
    </>
  );
}
