import { useAtom } from 'jotai';
import { loginAtom } from '@/store/loginAtom';

function Home() {
  const [loginInfo, setLoginInfo] = useAtom(loginAtom);
  console.log(loginInfo);
  const onClick = () => {
    setLoginInfo({ isLoggedIn: false });
  };

  return (
    <div className='p-20pxr'>
      <button onClick={onClick}>CLICK</button>
      <div>{loginInfo.nickname}</div>
    </div>
  );
}

export default Home;
