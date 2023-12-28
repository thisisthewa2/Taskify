import Head from 'next/head';
import SignInContainer from '@/containers/Auth/SignInContainer';

function signIn() {
  return (
    <>
      <Head>
        <title>로그인</title>
      </Head>
      <SignInContainer />
    </>
  );
}

export default signIn;
