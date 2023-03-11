import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { trackEvent } from '../lib/google-analytics';
import Window from '../modules/Window';
import DarkMode from '../modules/DarkMode';
import SeoTags from '../components/seoTags';
import FontPreLoader from '../components/fontPreLoader';
import TagManager from '../components/tagManager';
import Layout from '../components/layout';
import '../styles/global.css';
import { GoogleAnalyticsEvent, Route } from '../lib/types';
import { StoreContext } from '../lib/store';

function App({ Component, pageProps, router }: AppProps) {
  const routerEvents = router.events;
  const [visibleDialogs, setVisibleDialogs] = useState<Array<string>>([]);

  useEffect(() => {
    Window.init();
    DarkMode.init();
  }, []);

  useEffect(() => {
    const onRouteChangeComplete = (_url: string) => {
      trackEvent({ event: GoogleAnalyticsEvent.PAGE_VIEW });
    };

    routerEvents.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      routerEvents.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [routerEvents]);

  return (
    <>
      <SeoTags />
      <FontPreLoader />
      <TagManager />
      <StoreContext.Provider
        value={{
          visibleDialogs,
          setVisibleDialogs,
        }}
      >
        <Layout route={router.route as Route}>
          <Component {...pageProps} />
        </Layout>
      </StoreContext.Provider>
    </>
  );
}

export default App;
