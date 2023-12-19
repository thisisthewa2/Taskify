import useRequest from '@/hooks/useRequest';
import SideMenu from '@/components/SideMenu';

function Home() {
  const { data, error } = useRequest({
    options: {
      url: '/users/me',
      method: 'get',
    },
  });

  return (
    <div>
      <SideMenu />
    </div>
  );
}

export default Home;
