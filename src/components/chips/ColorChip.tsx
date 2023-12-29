import { useState } from 'react';
import { IconCheck } from '@/public/svgs';

type ButtonIndex = number | null;

interface ColorChipProps {
  onSelectColor?: (color: string) => void | undefined;
}

export default function ColorChip({ onSelectColor }: ColorChipProps) {
  const [selectedButton, setSelectedButton] = useState<ButtonIndex>(null);
  const colors = ['#7AC555', '#760DDE', '#FFA500', '#76A5EA', '#E876EA'];

  const handleButtonClick = (index: ButtonIndex) => {
    if (onSelectColor && index !== null) {
      const selectedColor = colors[index];
      if (index === selectedButton) {
        // 같은 버튼을 두 번 눌렀을 때 선택 취소
        setSelectedButton(null);
        onSelectColor(''); // 선택된 색상을 ''로 설정
      } else {
        setSelectedButton(index);
        onSelectColor(selectedColor);
      }
    }
  };

  return (
    <div className='flex gap-10'>
      {colors.map((color: string, index: number) => (
        <button
          key={index}
          className={`flex-center relative h-28 w-28 rounded-full tablet:h-30 tablet:w-30`}
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
