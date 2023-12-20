import Input from '@/components/Input';
import { Button } from '@/components/buttons';
import MainLogo from '@/components/logos/MainLogo';

function SigninContainer() {
  return (
    <div>
      <MainLogo />
      <h3>오늘도 만나서 반가워요!</h3>
      <form>
        <div>
          <label>이메일</label>
          <Input type='email' />
        </div>
        <div>
          <label>비밀번호</label>
          <Input type='password' />
        </div>
        <Button size='full'>로그인</Button>
      </form>
    </div>
  );
}

export default SigninContainer;
