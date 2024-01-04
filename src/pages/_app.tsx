import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { themeAtom } from '@/store/colorSchemeAtom';
import Layout from '@/components/layouts/Layout';
import '@/styles/globals.css';
import '@/public/fonts/Montserrat/font.css';
import '@/public/fonts/Pretendard/font.css';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const theme = useAtomValue(themeAtom);

  useEffect(() => {
    const html = document.querySelector('html');
    if (html) html.dataset.theme = theme;
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
