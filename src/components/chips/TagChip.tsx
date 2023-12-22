import { generateColor } from '@/utils/generateColor';

const DEFAULT_TAG_COLOR = {
  green: 'bg-[#E7F7DB] text-[#86D549]',
  orange: 'bg-[#F9EEE3] text-[#D58D49]',
  blue: 'bg-[#DBE6F7] text-[#4981D5]',
  pink: 'bg-[#F7DBF0] text-[#D549B6]',
  purple: 'bg-[#F1EFFD] text-[#5534DA]',
};

function TagChip({ str }: { str: string }) {
  const color = DEFAULT_TAG_COLOR[generateColor(str)];
  return (
    <div
      className={` flex-center h-20 w-fit rounded-sm px-6 py-6 text-10 tablet:h-22 tablet:text-12 ${color}`}
    >
      {str}
    </div>
  );
}

export default TagChip;
