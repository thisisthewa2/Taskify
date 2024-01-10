function DashboardColorDot({ color }: { color: string }) {
  return (
    <div className='flex p-16 tablet:px-12 tablet:py-0 '>
      <div
        className='h-8 w-8 rounded-full'
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );
}

export default DashboardColorDot;
