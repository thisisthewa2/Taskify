import { Button } from '@/components/buttons';
import Input from '@/components/inputs/Input';

function PasswordManageBox() {
  return (
    <div className='box'>
      <div className='heading1-bold pb-32'>비밀번호 변경</div>
      <Form />
    </div>
  );
}

export default PasswordManageBox;

function Form() {
  return (
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
  );
}
