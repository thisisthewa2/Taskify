import axios from 'axios';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useRequest from '@/hooks/useRequest';
import InputContainer from '@/components/InputContainer';
import { Button } from '@/components/buttons';

interface FormValue {
  email: string;
}

interface Props {
  dashboardId: string;
  onCloseModal: () => void;
  fetch: () => void;
}

const errorType: Record<number, string> = {
  400: '이메일 형식이 올바르지 않습니다.',
  403: '대시보드 초대 권한이 없습니다.',
  404: '대시보드 혹은 해당 멤버가 존재하지 않습니다.',
  409: '이미 대시보드에 초대된 멤버입니다.',
};

function InviteForm({ dashboardId, onCloseModal, fetch }: Props) {
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
      fetch();
    }

    if (!axios.isAxiosError(error)) return;
    if (error.response?.status) {
      setErrorMessage(errorType[error.response.status]);
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