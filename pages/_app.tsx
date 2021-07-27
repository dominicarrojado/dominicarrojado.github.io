import { useEffect } from 'react';
import { AppProps } from 'next/app';
import Window from '../modules/Window';
import Layout from '../components/layout';
import '../styles/global.css';

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Window.init();
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
}

export default App;
