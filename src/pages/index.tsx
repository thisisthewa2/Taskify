import Head from 'next/head';
import Link from 'next/link';
import Landing from '@/containers/Landing';

function LandingPage() {
  return (
    <>
      <Head>
        <link rel='icon' href='/svgs/logo-small.svg' />
        <title>Taskify 랜딩 페이지</title>
      </Head>
      <Landing />
    </>
  );
}

export default LandingPage;
