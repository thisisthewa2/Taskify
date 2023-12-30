import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import useRequest from '@/hooks/useRequest';
import { DashboardProps } from '@/pages/api/mock';
import { Button } from '@/components/buttons';
import ColorChip from '@/components/chips/ColorChip';
import InputContainer from '@/components/inputs/InputContainer';

interface Props {
  onCloseModal: () => void;
  fetch: () => void;
}

interface FormValues {
  dashboardName: string;
  selectedColor: string;
}

function DashboardForm({ onCloseModal, fetch }: Props) {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      dashboardName: '',
      selectedColor: '',
    },
    mode: 'onBlur',
  });

  const { fetch: postData } = useRequest<DashboardProps>({
    skip: true,
    options: {
      url: 'dashboards/',
      method: 'post',
    },
  });

  const makeNewDashboard: SubmitHandler<FormValues> = async (formData) => {
    const { error } = await postData({
      data: {
        title: formData.dashboardName,
        color: formData.selectedColor,
      },
    });

    if (error) {
      console.error(error);
      return;
    }

    onCloseModal();
    fetch();
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onCloseModal();
  };

  return (
    <form
      onSubmit={handleSubmit(makeNewDashboard)}
      className='mb-70 flex flex-col gap-30'
    >
      <h1 className='heading1-bold'>새로운 대시보드</h1>
      <div>
        <InputContainer<FormValues>
          control={control}
          name='dashboardName'
          placeholder='이름을 입력해 주세요'
        >
          대시보드 이름
        </InputContainer>
        <div className='my-20 text-14 text-red'>
          <Controller
            name='selectedColor'
            control={control}
            render={({ field }) => (
              <ColorChip
                onSelectColor={(color: string) => field.onChange(color)}
              />
            )}
            rules={{ required: '색상을 선택해주세요' }}
          />
        </div>
      </div>
      <div className='absolute bottom-0 flex gap-10 tablet:right-0'>
        <Button.Secondary size='lg' onClick={handleClick}>
          취소
        </Button.Secondary>
        <Button size='lg' type='submit'>
          생성
        </Button>
      </div>
    </form>
  );
}

export default DashboardForm;
