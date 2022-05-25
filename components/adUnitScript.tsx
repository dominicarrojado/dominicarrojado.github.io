import Script from 'next/script';
import React from 'react';
import { GOOGLE_ADSENSE_CLIENT_ID } from '../lib/constants';

export default function AdUnitScript() {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${GOOGLE_ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
    />
  );
}
