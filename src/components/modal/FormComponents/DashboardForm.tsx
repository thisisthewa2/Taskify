import { useState } from 'react';
import useRequest from '@/hooks/useRequest';
import { DashboardProps } from '@/pages/api/mock';
import { Button } from '@/components/buttons';
import ColorChip from '@/components/chips/ColorChip';
import Input from '@/components/inputs/Input';

// DashboardForm > DashboardButtons, Sidemenu
interface Props {
  onCloseModal: () => void;
}

function DashboardForm({ onCloseModal }: Props) {
  const [selectedColor, setSelectedColor] = useState('');
  const [dashboardName, setDashboardName] = useState('');
  const [colorError, setColorError] = useState('');
  const [nameError, setNameError] = useState('');

  const handleColorSelection = (color: string) => {
    setSelectedColor(color); // ColorChip으로부터 선택된 색상을 상태로 설정
  };
  const { fetch: postData } = useRequest<DashboardProps>({
    skip: true,
    options: { url: 'dashboards/', method: 'post' },
  });

  const handleCreateDashboard = async () => {
    let hasError = false;

    if (!selectedColor) {
      setColorError('대시보드의 색상을 지정하세요.');
      hasError = true;
    } else {
      setColorError('');
    }

    if (!dashboardName) {
      setNameError('대시보드의 이름을 입력하세요.');
      hasError = true;
    } else {
      setNameError('');
    }

    if (hasError) {
      return; // 에러가 있으면 이후 로직 실행하지 않음
    }

    try {
      await postData({
        data: {
          title: dashboardName,
          color: selectedColor,
        },
      });

      onCloseModal();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <h1 className='heading1-bold'>새로운 대시보드</h1>
      <div>
        <Input
          type='text'
          title='대시보드 이름'
          placeholder='이름을 입력해 주세요'
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDashboardName(e.target.value)
          }
        />
        <div className='text-14 text-red'>
          {nameError && <p>{nameError}</p>}
        </div>
        <div className='my-20 text-14 text-red'>
          <ColorChip onSelectColor={handleColorSelection} />
          {colorError && <p>{colorError}</p>}
        </div>
      </div>

      <div className='absolute bottom-0 flex gap-10 tablet:right-0'>
        <Button.Secondary size='lg' onClick={onCloseModal}>
          취소
        </Button.Secondary>
        <Button size='lg' onClick={handleCreateDashboard}>
          생성
        </Button>
      </div>
    </>
  );
}

export default DashboardForm;
