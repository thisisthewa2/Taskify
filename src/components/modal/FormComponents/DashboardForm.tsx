import { useState } from 'react';
import useRequest from '@/hooks/useRequest';
import { Button } from '@/components/buttons';
import ColorChip from '@/components/chips/ColorChip';
import Input from '@/components/inputs/Input';

interface Props {
  onCloseModal: () => void;
}

function DashboardForm({ onCloseModal }: Props) {
  const [selectedColor, setSelectedColor] = useState('');
  const [dashboardName, setDashboardName] = useState('');

  const handleColorSelection = (color: string) => {
    setSelectedColor(color); // ColorChip으로부터 선택된 색상을 상태로 설정
  };
  const { fetch: postData } = useRequest<any>({
    options: { url: 'dashboards/', method: 'post' },
  });
  const handleCreateDashboard = async () => {
    try {
      await postData({
        data: {
          title: dashboardName,
          color: selectedColor,
        },
      });

      // Post 성공 후에 상위 컴포넌트의 콜백 함수 호출하여 리렌더링 유도
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
        <div className='py-20'>
          <ColorChip onSelectColor={handleColorSelection} />
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
