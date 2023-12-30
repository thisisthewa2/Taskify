import { IconArrowBackward } from '@/public/svgs';
import PasswordManageBox from './components/PasswordManageBox';
import ProfileManageBox from './components/ProfileManageBox';

function MyPage() {
  return (
    <div className='flex max-w-[40rem] flex-col gap-12 p-12 pt-18'>
      <button className='flex-center body2-normal mb-8 w-80 gap-6'>
        <IconArrowBackward fill='#333236' />
        돌아가기
      </button>
      <ProfileManageBox />
      <PasswordManageBox />
    </div>
  );
}

export default MyPage;
