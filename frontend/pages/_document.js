import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link
            rel="android-chrome"
            sizes="180x180"
            href="/images/android-chrome-192x192.png"
          />
          <link
            rel="android-chrome"
            sizes="180x180"
            href="/images/android-chrome-512x512.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="images/png"
            sizes="32x32"
            href="/images/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="images/png"
            sizes="16x16"
            href="/images/favicon-16x16.png"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Rajdhani&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* Empty script tag as chrome bug fix, see https://stackoverflow.com/a/42969608/943337 */}
          <script></script>
        </body>
      </Html>
    );
  }
}
