function DashBoardColorDot({ color }: { color: string }) {
  return (
    <div className='flex p-16 tablet:px-12 tablet:py-0 '>
      <div
        className='h-4 w-4 rounded-full'
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );
}

export default DashBoardColorDot;
