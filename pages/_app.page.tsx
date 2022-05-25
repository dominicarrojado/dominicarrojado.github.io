import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { trackEvent } from '../lib/google-analytics';
import Window from '../modules/Window';
import DarkMode from '../modules/DarkMode';
import Layout from '../components/layout';
import '../styles/global.css';
import { GoogleAnalyticsEvent, Route } from '../lib/types';

function App({ Component, pageProps, router }: AppProps) {
  const routerEvents = router.events;

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
    <Layout route={router.route as Route}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
