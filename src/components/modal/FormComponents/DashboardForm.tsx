import { useState } from 'react';
import { Button } from '@/components/buttons';
import ColorChip from '@/components/chips/ColorChip';
import Input from '@/components/inputs/Input';

interface Props {
  onCloseModal: () => void;
}

function DashboardForm({ onCloseModal }: Props) {
  const [selectedColor, setSelectedColor] = useState('');

  const handleColorSelection = (color: string) => {
    setSelectedColor(color); // ColorChip으로부터 선택된 색상을 상태로 설정
  };

  const handleCreateDashboard = () => {
    // 선택된 색상 및 다른 정보를 사용하여 작업 수행
    console.log('Selected color:', selectedColor); 
    // 여기서 선택된 색상과 input 내용을 이용해 작업을 수행할 수 있음
  };
  return (
    <>
      <h1 className='heading1-bold'>새로운 대시보드</h1>
      <div>
        <Input
          type='text'
          title='대시보드 이름'
          placeholder='이름을 입력해 주세요'
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
