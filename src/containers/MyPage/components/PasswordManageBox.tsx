import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import useRequest from '@/hooks/useRequest';
import { ERROR_MESSAGES, REG_EXP } from '@/containers/Auth/validation';
import { Button } from '@/components/buttons';
import InputContainer from '@/components/inputs/InputContainer';

function PasswordManageBox() {
  return (
    <div className='box'>
      <div className='heading1-bold pb-32'>비밀번호 변경</div>
      <Form />
    </div>
  );
}

export default PasswordManageBox;

interface FormValues {
  password: string;
  newPassword: string;
  newPasswordCheck: string;
}

function Form() {
  const { handleSubmit, control, setError, reset } = useForm<FormValues>({
    defaultValues: {
      password: '',
      newPassword: '',
      newPasswordCheck: '',
    },
    mode: 'onBlur',
  });

  const { fetch } = useRequest({
    skip: true,
    options: {
      url: 'auth/password',
      method: 'put',
    },
  });

  const changePassword: SubmitHandler<FormValues> = async (formData) => {
    if (formData.newPassword !== formData.newPasswordCheck) {
      setError('newPasswordCheck', {
        type: 'newPasswordChField',
        message: ERROR_MESSAGES.passwordCh.newPasswordChField,
      });
      return;
    }

    const { error } = await fetch({
      data: { password: formData.password, newPassword: formData.newPassword },
    });

    if (!axios.isAxiosError(error)) {
      return reset();
    }

    if (error.response?.status === 400) {
      setError('password', {
        type: 'invalid',
        message: ERROR_MESSAGES.password.passwordToVerify,
      });
      return;
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(changePassword)}
      className='flex w-full flex-col gap-16 tablet:gap-20'
    >
      <InputContainer<FormValues>
        control={control}
        name='password'
        placeholder='현재 비밀번호 입력'
        rules={{
          required: ERROR_MESSAGES.password.passwordField,
        }}
      >
        현재 비밀번호
      </InputContainer>
      <InputContainer<FormValues>
        control={control}
        name='newPassword'
        placeholder='새 비밀번호 입력'
        rules={{
          required: ERROR_MESSAGES.password.passwordField,
          pattern: {
            value: REG_EXP.CHECK_PASSWORD,
            message: ERROR_MESSAGES.password.passwordPattern,
          },
        }}
      >
        새 비밀번호
      </InputContainer>
      <InputContainer<FormValues>
        control={control}
        name='newPasswordCheck'
        placeholder='새 비밀번호 입력'
      >
        새 비밀번호 확인
      </InputContainer>
      <div className='flex justify-end tablet:mt-4'>
        <Button>변경</Button>
      </div>
    </form>
  );
}
