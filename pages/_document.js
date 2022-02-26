import Document, { Html, Head, Main, NextScript } from "next/document";
import { getLangFromReq } from "../utils/fromReq";
import { getCsp } from "../utils/csp";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const lang = getLangFromReq(ctx.req);
    return { ...initialProps, lang };
  }

  render() {
    return (
      <Html lang={this.props.lang}>
        <Head>
          <meta
            name="Description"
            content="Next-shop - buy indoor plants"
          ></meta>
          <meta name="theme-color" content="#FFF" />
          <meta name="referrer" content={"strict-origin"} />
          <meta
            httpEquiv="Content-Security-Policy"
            content={getCsp(NextScript.getInlineScriptSource(this.props))}
          />
          <link rel="icon" type="image/x-icon" href="/icons/icon.ico" />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/icons/icon.ico"
          />
          <link rel="manifest" href="/manifest.json" />
          <link
            href="/icons/icon-16x16.png"
            rel="icon"
            type="image/png"
            sizes="16x16"
          />
          <link
            href="/icons/icon-32x32.png"
            rel="icon"
            type="image/png"
            sizes="32x32"
          />
          <link
            href="/icons/icon-144x144.png"
            rel="icon"
            type="image/png"
            sizes="144x144"
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
