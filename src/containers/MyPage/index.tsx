import BackButton from '@/components/buttons/BackButton';
import PasswordManageBox from './components/PasswordManageBox';
import ProfileManageBox from './components/ProfileManageBox';

function MyPage() {
  return (
    <div className='flex max-w-[40rem] flex-col gap-12 p-12 pt-18'>
      <BackButton />
      <ProfileManageBox />
      <PasswordManageBox />
    </div>
  );
}

export default MyPage;
