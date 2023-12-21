import { Button } from '@/components/buttons';
import ImageDrop from '@/components/image-drop/ImageDrop';
import Input from '@/components/inputs/Input';
import { IconArrowBackward } from '@/public/svgs';

function MyPage() {
  return (
    <div className='flex flex-col gap-12 p-12 pt-18'>
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

function ProfileManageBox() {
  return (
    <div className='box'>
      <div className='heading1-bold pb-32'>프로필</div>
      <form noValidate>
        <div className='flex flex-col gap-24 pb-16 tablet:flex-row tablet:gap-16 tablet:pb-24'>
          <ImageDrop type='profile' />
          <div className='flex w-full flex-col gap-20'>
            <Input type='text' title='이메일' placeholder='taskify@gmail.com' />
            <Input type='text' title='닉네임' placeholder='홍길동' />
          </div>
        </div>
        <div className='flex justify-end'>
          <Button>변경</Button>
        </div>
      </form>
    </div>
  );
}

function PasswordManageBox() {
  return (
    <div className='box'>
      <div className='heading1-bold pb-32'>비밀번호 변경</div>
      <form noValidate className='flex w-full flex-col gap-16 tablet:gap-20'>
        <Input
          type='text'
          title='현재 비밀번호'
          placeholder='현재 비밀번호 입력'
        />
        <Input type='text' title='새 비밀번호' placeholder='새 비밀번호 입력' />
        <Input
          type='text'
          title='새 비밀번호 확인'
          placeholder='새 비밀번호 입력'
        />
        <div className='flex justify-end tablet:mt-4'>
          <Button>변경</Button>
        </div>
      </form>
    </div>
  );
}
