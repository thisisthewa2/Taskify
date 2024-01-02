import Head from 'next/head';
import Link from 'next/link';
import Landing from '@/containers/Landing';

function LandingPage() {
  return (
    <>
      <Head>
        <link rel='icon' href='/svgs/logo-small.svg' />
        <title>Taskify</title>
      </Head>
      <Landing />
    </>
  );
}

export default LandingPage;
