import { useState } from 'react';
import { IconCheck } from '@/public/svgs';

type ButtonIndex = number | null;

export default function ColorChip() {
  const [selectedButton, setSelectedButton] = useState<ButtonIndex>(null);

  const handleButtonClick = (index: ButtonIndex) => {
    setSelectedButton(index === selectedButton ? null : index);
  };

  return (
    <div className='flex gap-6 tablet:gap-10'>
      {[0, 1, 2, 3, 4].map((index: number) => (
        <button
          key={index}
          className={`flex-center relative h-20 w-20 rounded-full bg-${
            ['green', 'purple', 'orange', 'blue', 'pink'][index]
          } tablet:h-30 tablet:w-30`}
          onClick={() => handleButtonClick(index)}
          style={{ position: 'relative' }}
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
