import { useEffect } from 'react';
import { AppProps } from 'next/app';
import Window from '../modules/Window';
import Layout from '../components/layout';
import '../styles/global.css';
import { Route } from '../lib/types';

function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    Window.init();
  }, []);

  return (
    <Layout route={router.route as Route}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
