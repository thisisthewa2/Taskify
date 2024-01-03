import { Skeleton } from '@mui/material';

function SideMenuSkeleton() {
  return (
    <>
      <div className='block tablet:hidden '>
        <Skeleton width={40} height={50} />
      </div>
      <div className='hidden tablet:block pc:hidden'>
        <Skeleton width={130} height={50} />
      </div>
      <div className='hidden pc:block'>
        <Skeleton width={270} height={70} />
      </div>
    </>
  );
}

export default SideMenuSkeleton;
