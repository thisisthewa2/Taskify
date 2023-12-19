import { useState } from 'react';
import { IconCheck } from '@/public/svgs';

type ButtonIndex = number | null;

export default function ColorChip() {
  const [selectedButton, setSelectedButton] = useState<ButtonIndex>(null);

  const handleButtonClick = (index: ButtonIndex) => {
    setSelectedButton(index === selectedButton ? null : index);
  };

  return (
    <div className='flex gap-10'>
      {[0, 1, 2, 3, 4].map((index: number) => (
        <button
          key={index}
          className={`flex-center h-20 w-20 rounded-full bg-${
            ['green', 'purple', 'orange', 'blue', 'pink'][index]
          } tablet:h-30 tablet:w-30`}
          onClick={() => handleButtonClick(index)}
        >
          {index === selectedButton && <IconCheck fill='white' />}
        </button>
      ))}
    </div>
  );
}
