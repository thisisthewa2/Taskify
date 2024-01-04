import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='ko' data-theme='light'>
      <Head>
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
