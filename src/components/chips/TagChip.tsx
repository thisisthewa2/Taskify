const COLORS = ['green', 'orange', 'blue', 'pink'] as const;
type COLORS_TYPE = 'green' | 'orange' | 'blue' | 'pink';

const DEFAULT_PROFILE_COLOR = {
  green: 'bg-[#E7F7DB] text-[#86D549]',
  orange: 'bg-[#F9EEE3] text-[#D58D49]',
  blue: 'bg-[#DBE6F7] text-[#4981D5]',
  pink: 'bg-[#F7DBF0] text-[#D549B6]',
};
export const generateColor = (name: string): COLORS_TYPE => {
  const key = name[0].toUpperCase();

  if (key >= 'A' && key <= 'Z') {
    if (key >= 'A' && key < 'I') {
      return COLORS[0];
    } else if (key >= 'I' && key < 'P') {
      return COLORS[1];
    } else if (key >= 'P' && key < 'V') {
      return COLORS[2];
    } else {
      return COLORS[3];
    }
  }

  if (key >= '가') {
    if (key >= '가' && key < '라') {
      return COLORS[0];
    } else if (key >= '라' && key < '아') {
      return COLORS[1];
    } else if (key >= '아' && key < '타') {
      return COLORS[2];
    } else {
      return COLORS[3];
    }
  }

  return COLORS[0];
};

function TagChip({ str }: { str: string }) {
  const bgColorClass = generateColor(str);
  const color = DEFAULT_PROFILE_COLOR[generateColor(str)];
  return (
    <div
      className={` flex-center h-20 w-fit rounded-sm px-4 py-6 text-10 tablet:h-22 tablet:text-12 ${color}`}
    >
      {str}
    </div>
  );
}

export default TagChip;
