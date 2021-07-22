import React, { ReactNode } from 'react';
import Head from 'next/head';
import { MAIN_TITLE, MAIN_URL } from '../lib/constants';

function Layout({
  path = '',
  title,
  description,
  imageUrl,
  imageWidth,
  imageHeight,
  children,
}: {
  path: string;
  title: string;
  description: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  children: ReactNode;
}) {
  const isIndex = path === '/';
  const metaUrl = isIndex ? MAIN_URL : `${MAIN_URL}${path}`;
  const metaTitle = isIndex ? title : `${title} - ${MAIN_TITLE}`;

  return (
    <>
      <Head>
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

        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=0, minimum-scale=1, maximum-scale=1"
        />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content={description} />
        <link rel="canonical" href={metaUrl} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={metaUrl} />
        <meta property="og:site_name" content={metaTitle} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:secure_url" content={imageUrl} />
        <meta property="og:image:width" content={`${imageWidth}`} />
        <meta property="og:image:height" content={`${imageHeight}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:image" content={imageUrl} />
        <link rel="manifest" href="/manifest.json" />
        <title>{metaTitle}</title>
      </Head>
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
      {children}
    </>
  );
}

export default Layout;
