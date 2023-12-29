import Head from 'next/head';
import SignUpContainer from '@/containers/Auth/SignUpContainer';

function signUp() {
  return (
    <>
      <Head>
        <title>회원가입</title>
      </Head>
      <SignUpContainer />
    </>
  );
}

export default signUp;
