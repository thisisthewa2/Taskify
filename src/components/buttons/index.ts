import ArrowButton from './ArrowButton';
import OutlineButton from './OutlineButton';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

export const BUTTON_SIZE = {
  sm: 'body1-normal px-16 w-fit h-30 tablet:36 pc:h-40',
  md: 'body2-normal w-109 h-28 tablet:w-72 tablet:h-30 pc:w-84 pc:h-32',
  lg: 'body1-normal w-138 h-42 tablet:w-120 tablet:h-48',
  full: 'subheading-normal w-full h-40',
};

export const Button = Object.assign(PrimaryButton, {
  Secondary: SecondaryButton,
  Outline: OutlineButton,
  Arrow: ArrowButton,
});
