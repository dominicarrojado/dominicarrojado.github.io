import Script from 'next/script';
import React, { useEffect } from 'react';
import cn from 'classnames';
import { displayAd } from '../lib/google-adsense';
import { GoogleAdSenseUnit } from '../lib/types';
import { GOOGLE_ADSENSE_CLIENT_ID } from '../lib/constants';
import styles from './adUnit.module.css';

export type Props = {
  adSlot: GoogleAdSenseUnit;
  className?: string;
};

function AdUnit({ adSlot, className }: Props) {
  useEffect(() => {
    displayAd();
  }, []);

  return (
    <div className={className}>
      <ins
        className={cn('adsbygoogle', styles.adunit)}
        data-ad-client={GOOGLE_ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-testid="ad-unit"
        style={{ display: 'block' }}
      />
    </div>
  );
}

export default React.memo(AdUnit);
