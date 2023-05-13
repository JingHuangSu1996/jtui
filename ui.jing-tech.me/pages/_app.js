import React from 'react';
import { ThemeProvider } from 'next-themes';
import { DefaultSeo } from 'next-seo';
import 'react-toastify/dist/ReactToastify.css';
import { globalStyles, darkTheme, globalCss } from '@jtui/theme';
import { useRouter } from 'next/router';
import SEO from '../next-seo.config';

const pageview = (url) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'pageview',
    page: url,
  });
};

const globalTextStyles = globalCss({
  body: {
    color: '$accessible',
  },
});

function App({ Component, pageProps }) {
  globalStyles();
  globalTextStyles();

  const getLayout = Component.getLayout;

  const router = useRouter();
  React.useEffect(() => {
    router.events.on('routeChangeComplete', pageview);
    return () => {
      router.events.off('routeChangeComplete', pageview);
    };
  }, [router.events]);

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
        {getLayout ? (
          getLayout(
            <>
              <Component {...pageProps} />
            </>,
          )
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
