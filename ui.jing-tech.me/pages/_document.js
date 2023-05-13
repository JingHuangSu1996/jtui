import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { getCssText, reset } from '@jtui/theme';

/**
 * Get the css and reset the internal css representation.
 * This is very *IMPORTANT* to do as the server might handle multiple requests
 * and we don't want to have the css accumulated from previous requests
 */
const getCssAndReset = () => {
  const css = getCssText();
  reset();
  return css;
};

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    let initialProps = { html: '<></>' };
    try {
      initialProps = await NextDocument.getInitialProps(ctx);
      return { ...initialProps };
    } catch (e) {
      return initialProps;
    }
  }

  render() {
    return (
      <Html lang="en" id="wpds">
        <Head>
          <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssAndReset() }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
