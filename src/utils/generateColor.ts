const COLORS = ['green', 'purple', 'orange', 'blue', 'pink'] as const;
type COLORS_TYPE = 'green' | 'purple' | 'orange' | 'blue' | 'pink';

export const generateColor = (name: string): COLORS_TYPE => {
  const key = name[0].toUpperCase();

  switch (true) {
    case (key >= 'A' && key < 'F') || (key >= '가' && key < '다'):
      return COLORS[0];
    case (key >= 'F' && key < 'K') || (key >= '다' && key < '바'):
      return COLORS[1];
    case (key >= 'K' && key < 'Q') || (key >= '바' && key < '아'):
      return COLORS[2];
    case (key >= 'Q' && key < 'V') || (key >= '아' && key < '타'):
      return COLORS[3];
    default:
      return COLORS[4];
  }
};
