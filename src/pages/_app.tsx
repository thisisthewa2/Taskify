import type { AppProps } from 'next/app';
import Layout from '@/components/layouts/Layout';
import '@/styles/globals.css';
import '@/public/fonts/Montserrat/font.css';
import '@/public/fonts/Pretendard/font.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
