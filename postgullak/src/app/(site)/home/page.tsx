'use client';

import Header from '@/components/home/header';

function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
