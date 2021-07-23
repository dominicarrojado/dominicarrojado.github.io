import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Window from '../modules/Window';
import '../styles/global.css';

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Window.init();
  }, []);

  return <Component {...pageProps} />;
}

export default App;
