import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Verdana&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body style={{ fontFamily: 'Verdana, sans-serif' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}