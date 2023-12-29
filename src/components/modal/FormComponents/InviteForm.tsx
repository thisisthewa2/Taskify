import axios from 'axios';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useRequest from '@/hooks/useRequest';
import InputContainer from '@/containers/MyPage/components/InputContainer';
import { Button } from '@/components/buttons';
import Input from '@/components/inputs/Input';

interface FormValue {
  email: string;
}

interface Props {
  dashboardId: string;
  onCloseModal: () => void;
}

function InviteForm({ dashboardId, onCloseModal }: Props) {
  const [errorMessage, setErrorMessage] = useState('');

  const { fetch: postInvitation } = useRequest({
    skip: true,
    options: {
      url: `dashboards/${dashboardId}/invitations`,
      method: 'post',
    },
  });

  const { handleSubmit, control } = useForm<FormValue>({
    defaultValues: {
      email: '',
    },
  });

  const changeEmail: SubmitHandler<FormValue> = async (formData) => {
    const { data, error } = await postInvitation({
      data: { email: formData.email },
    });

    if (data) {
      setErrorMessage('');
      onCloseModal();
    }

    if (!axios.isAxiosError(error)) return;

    if (error.response?.status === 400) {
      setErrorMessage(error.response.data.message);
    } else if (error.response?.status === 404) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <form
        className='mb-70 flex flex-col gap-30'
        onSubmit={handleSubmit(changeEmail)}
      >
        <h1 className='heading1-bold'>초대하기</h1>
        <div>
          <InputContainer<FormValue>
            control={control}
            name='email'
            placeholder='이메일을 입력해 주세요'
          >
            이메일
          </InputContainer>
          {errorMessage && (
            <small className='body2-normal mt-5 text-red'>{errorMessage}</small>
          )}
        </div>
        <div className='absolute bottom-0 flex gap-10 tablet:right-0'>
          <Button.Secondary size='lg' onClick={onCloseModal}>
            취소
          </Button.Secondary>
          <Button size='lg'>생성</Button>
        </div>
      </form>
    </>
  );
}

export default InviteForm;
