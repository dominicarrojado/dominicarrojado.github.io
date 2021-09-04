import { ReactNode } from 'react';
import Head from 'next/head';
import PreLoadTags from './preLoadTags';
import Header from './header';
import Footer from './footer';
import { Route } from '../lib/types';

function Layout({ route, children }: { route: Route; children: ReactNode }) {
  return (
    <>
      <Head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.location.hostname !== 'localhost') {
                (function (w, d, s, l, i) {
                  w[l] = w[l] || [];
                  w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
                  var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s),
                    dl = l != 'dataLayer' ? '&l=' + l : '';
                  j.async = true;
                  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                  f.parentNode.insertBefore(j, f);
                })(window, document, 'script', 'dataLayer', 'GTM-TSMLTPT');
              }
            `,
          }}
        />
        {/* End Google Tag Manager */}

        <PreLoadTags />
      </Head>

      {/* Google Tag Manager */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: `
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-TSMLTPT"
              height="0"
              width="0"
              style="display: none; visibility: hidden"
            ></iframe>
          `,
        }}
      />
      {/* End Google Tag Manager */}

      <Header route={route} />

      {children}

      <Footer />
    </>
  );
}

export default Layout;