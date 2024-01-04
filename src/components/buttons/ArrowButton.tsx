import { useAtomValue } from 'jotai';
import { ButtonHTMLAttributes } from 'react';
import { themeAtom } from '@/store/colorSchemeAtom';
import { IconArrowBackward, IconArrowForward } from '@/public/svgs';

const ARROW_COLOR = {
  light: {
    enabled: '#333236',
    disabled: '#D9D9D9',
  },
  dark: {
    enabled: '#fcfcfc',
    disabled: '#646464',
  },
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  onLeftClick?: () => void;
  onRightClick?: () => void;
  leftDisabled?: boolean;
  rightDisabled?: boolean;
}

function ArrowButton({
  onLeftClick,
  onRightClick,
  leftDisabled,
  rightDisabled,
}: Props) {
  const theme = useAtomValue(themeAtom);

  const leftArrowColor = leftDisabled
    ? ARROW_COLOR[theme].disabled
    : ARROW_COLOR[theme].enabled;
  const rightArrowColor = rightDisabled
    ? ARROW_COLOR[theme].disabled
    : ARROW_COLOR[theme].enabled;

  return (
    <div className='flex'>
      <button
        onClick={onLeftClick}
        disabled={leftDisabled}
        className='border-solid-gray flex-center h-40 w-40 rounded-l-sm'
      >
        <IconArrowBackward fill={leftArrowColor} />
      </button>
      <button
        onClick={onRightClick}
        disabled={rightDisabled}
        className='border-solid-gray flex-center h-40 w-40 rounded-r-sm'
      >
        <IconArrowForward fill={rightArrowColor} />
      </button>
    </div>
  );
}

export default ArrowButton;
