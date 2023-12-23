import { useAtom } from 'jotai';
import useRequest from '@/hooks/useRequest';
import { loginAtom } from '@/store/loginAtom';
import { setAccessToken } from '@/services/utils/handleToken';
import SideMenu from '@/components/SideMenu';

function Home() {
  const [loginInfo, setLoginInfo] = useAtom(loginAtom);

  const { data: myInfo } = useRequest({
    options: {
      url: 'users/me',
      method: 'get',
    },
  });

  const { data, fetch }: any = useRequest({
    skip: true,
    options: {
      url: 'dashboards',
      method: 'post',
      data: {
        title: '테스트',
        color: '#7AC555',
      },
    },
  });

  const handleClick = async () => {
    console.log(myInfo);
    await fetch();
    console.log(data);
  };

  return <button onClick={handleClick}>click</button>;
}

export default Home;
