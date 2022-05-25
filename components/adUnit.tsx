import Script from 'next/script';
import React, { useEffect } from 'react';
import cn from 'classnames';
import { displayAd } from '../lib/google-adsense';
import styles from './adUnit.module.css';

export type Props = {
  className?: string;
};

function AdUnit({ className }: Props) {
  useEffect(() => {
    displayAd();
  }, []);

  return (
    <div className={className}>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3632473845121107"
        crossOrigin="anonymous"
      />
      <ins
        className={cn('adsbygoogle block', styles.adunit)}
        data-ad-client="ca-pub-3632473845121107"
        data-ad-slot="4984498713"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

export default React.memo(AdUnit);
