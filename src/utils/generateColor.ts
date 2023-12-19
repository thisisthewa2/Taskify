const COLORS = ['green', 'purple', 'orange', 'blue', 'pink'] as const;
type COLORS_TYPE = 'green' | 'purple' | 'orange' | 'blue' | 'pink';

export const generateColor = (name: string): COLORS_TYPE => {
  const key = name[0].toUpperCase();

  if (key >= 'A' && key <= 'Z') {
    if (key >= 'A' && key < 'F') {
      return COLORS[0];
    } else if (key >= 'F' && key < 'K') {
      return COLORS[1];
    } else if (key >= 'K' && key < 'Q') {
      return COLORS[2];
    } else if (key >= 'Q' && key < 'V') {
      return COLORS[3];
    } else {
      return COLORS[4];
    }
  }

  if (key >= '가') {
    if (key >= '가' && key < '다') {
      return COLORS[0];
    } else if (key >= '다' && key < '바') {
      return COLORS[1];
    } else if (key >= '바' && key < '아') {
      return COLORS[2];
    } else if (key >= '아' && key < '타') {
      return COLORS[3];
    } else {
      return COLORS[4];
    }
  }

  return COLORS[0];
};
