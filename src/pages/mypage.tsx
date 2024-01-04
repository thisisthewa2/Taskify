import Head from 'next/head';
import MyPage from '@/containers/MyPage';

function MyPagePage() {
  return (
    <>
      <Head>
        <title>마이 페이지</title>
      </Head>
      <MyPage />
    </>
  );
}

export default MyPagePage;
