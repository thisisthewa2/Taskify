export default function NumberChip({ num }: { num: number }) {
  return (
    <div className='flex-center h-20 w-20 rounded-sm bg-gray-1'>
      <span className='text-12 text-gray-5'>{num}</span>
    </div>
  );
}
