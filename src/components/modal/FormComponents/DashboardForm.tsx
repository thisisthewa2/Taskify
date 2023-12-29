import { useEffect, useState } from 'react';
import useRequest from '@/hooks/useRequest';
import { DashboardProps } from '@/pages/api/mock';
import { Button } from '@/components/buttons';
import ColorChip from '@/components/chips/ColorChip';
import Input from '@/components/inputs/Input';

interface Props {
  onCloseModal: () => void;
}

function DashboardForm({ onCloseModal }: Props) {
  const [selectedColor, setSelectedColor] = useState('');
  const [dashboardName, setDashboardName] = useState('');
  const [canPost, setCanPost] = useState(false);

  const handleColorSelection = (color: string) => {
    setSelectedColor(color);
  };

  useEffect(() => {
    // selectedColor와 dashboardName이 모두 채워졌을 때만 canPost 상태를 true로 변경
    if (selectedColor && dashboardName) {
      setCanPost(true);
    } else {
      setCanPost(false);
    }
  }, [selectedColor, dashboardName]);

  const { fetch: postData } = useRequest<DashboardProps>({
    skip: true,
    options: { url: 'dashboards/', method: 'post' },
  });

  const handleCreateDashboard = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    let hasError = false;

    if (!selectedColor) {
      hasError = true;
    }

    if (dashboardName === '') {
      hasError = true;
    }

    if (hasError) {
      return; //  로직 실행하지 않음
    }

    try {
      await postData({
        data: {
          title: dashboardName,
          color: selectedColor,
        },
      });
      onCloseModal();
      setSelectedColor(''); // 폼 제출 후 초기화
      setDashboardName('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    setSelectedColor(''); // 취소 시 초기화
    setDashboardName('');
  };

  return (
    <form className='mb-70 flex flex-col gap-30'>
      <h1 className='heading1-bold'>새로운 대시보드</h1>
      <div>
        <Input
          type='text'
          title='대시보드 이름'
          placeholder='이름을 입력해 주세요'
          value={dashboardName}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDashboardName(e.target.value)
          }
        />
        <div className='my-20 text-14 text-red'>
          <ColorChip onSelectColor={handleColorSelection} />
        </div>
      </div>

      <div className='absolute bottom-0 flex gap-10 tablet:right-0'>
        <Button.Secondary size='lg' onClick={handleCancel}>
          취소
        </Button.Secondary>
        <Button size='lg' onClick={handleCreateDashboard} disabled={!canPost}>
          생성
        </Button>
      </div>
    </form>
  );
}

export default DashboardForm;
