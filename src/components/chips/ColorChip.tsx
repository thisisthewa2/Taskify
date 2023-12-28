import { useState } from 'react';
import { IconCheck } from '@/public/svgs';

type ButtonIndex = number | null;

interface ColorChipProps {
  onSelectColor: (color: string) => void;
}

export default function ColorChip({ onSelectColor }: ColorChipProps) {
  const [selectedButton, setSelectedButton] = useState<ButtonIndex>(null);
  const colors = ['#7AC555', '#760DDE', '#FFA500', '#76A5EA', '#E876EA'];

  const handleButtonClick = (index: ButtonIndex) => {
    if (index) {
      const selectedColor = colors[index];
      setSelectedButton(index === selectedButton ? null : index);
      onSelectColor(selectedColor); // 색상 선택 시 부모 컴포넌트로 선택된 색상 전달
    }
  };

  return (
    <div className='flex gap-10'>
      {colors.map((color: string, index: number) => (
        <button
          key={index}
          className={`flex-center relative h-28 w-28 rounded-full bg-${color} tablet:h-30 tablet:w-30`}
          onClick={() => handleButtonClick(index)}
          style={{
            position: 'relative',
            backgroundColor: color, // inline 스타일로 배경색 적용
          }}
        >
          {index === selectedButton && (
            <div
              className={`flex-center absolute left-3 top-4 tablet:left-5 tablet:top-6`}
            >
              <IconCheck
                width='100%'
                height='100%'
                viewBox='0 0 30 30'
                fill='white'
              />
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
