import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='ko' data-theme='light'>
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
        <meta
          name='description'
          content={
            '친구와 일정을 만들고 직접 관리해보세요! 꼭 필요한 기능만이 들어가 속도가 빠르고 모바일과 PC 환경 모두 사용할 수 있어요😀'
          }
        />
        <meta property='og:title' content={'Taskify: 일정 관리 서비스'} />
        <meta property='og:type' content='website' />
        <link id='favicon' rel='icon' href='/svgs/colorcon-1.svg' />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                var faviconRoute = '/svgs/';
                var faviconNames = [
                  'colorcon-1.svg', 'colorcon-2.svg', 'colorcon-3.svg',
                  'colorcon-4.svg', 'colorcon-5.svg', 'colorcon-6.svg','colorcon-7.svg',
                ];

                var idx = 0;

                setInterval(function() {
                  document.querySelector("#favicon").setAttribute('href', faviconRoute + faviconNames[idx++]);
                  idx %= faviconNames.length;
                }, 150);
              `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
