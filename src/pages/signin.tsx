import Head from 'next/head';
import SigninContainer from '@/containers/signinContainer';

function signin() {
  return (
    <>
      <Head>
        <title>signin</title>
      </Head>
      <SigninContainer />
    </>
  );
}

export default signin;
