import Head from 'next/head';
import { FONTS } from '../lib/constants';

export default function FontPreLoader() {
  return (
    <Head>
      {FONTS.map((font) => (
        <link
          key={font}
          rel="preload"
          href={`/fonts/${font}.woff2`}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      ))}
    </Head>
  );
}
