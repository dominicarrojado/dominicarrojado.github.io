import Head from 'next/head';
import { Fragment } from 'react';
import { FONTS } from '../lib/constants';

export default function FontPreLoader() {
  return (
    <Head>
      {FONTS.map((font, idx) => (
        <Fragment key={idx}>
          <link
            rel="preload"
            href={`/fonts/${font}.woff2`}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href={`/fonts/${font}.woff`}
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
        </Fragment>
      ))}
    </Head>
  );
}
