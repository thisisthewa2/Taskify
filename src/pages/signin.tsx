import Head from 'next/head';
import SigninContainer from '@/containers/SigninContainer';

function signin() {
  return (
    <>
      <Head>
        <title>로그인</title>
      </Head>
      <SigninContainer />
    </>
  );
}

export default signin;
