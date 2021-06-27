import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="sv">
        <Head>
          <script
            data-ad-client="ca-pub-9342639940641916"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
