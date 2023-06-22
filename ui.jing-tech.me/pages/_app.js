/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
/* eslint-disable  @typescript-eslint/no-this-alias */
import React from 'react';
import { ThemeProvider } from 'next-themes';
import Script from 'next/script';
import { DefaultSeo } from 'next-seo';
import 'react-toastify/dist/ReactToastify.css';
import { globalStyles, darkTheme, globalCss } from '@washingtonpost/wpds-ui-kit';
import { useRouter } from 'next/router';
import { darkModeStyles } from '~/components/DarkModeStyles';
import { PageLayout } from '~/components/Layout';
import SEO from '../next-seo.config';
// import "../public/global.css";

const globalTextStyles = globalCss({
  body: {
    color: '$accessible',
  },
});

function App({ Component, pageProps }) {
  globalStyles();
  globalTextStyles();
  darkModeStyles();
  const router = useRouter();

  const getLayout = Component.getLayout;

  return (
    <>
      <DefaultSeo {...SEO} />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        value={{
          dark: darkTheme.className,
          light: 'light',
        }}
        disableTransitionOnChange={false}
        enableColorScheme={false}
      >
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {getLayout ? (
          getLayout(
            <>
              <Component {...pageProps} />
            </>,
          )
        ) : (
          <PageLayout {...pageProps}>
            <Component {...pageProps} />
          </PageLayout>
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
