import React, { useEffect } from 'react';
import cn from 'classnames';
import { displayAd } from '../lib/google-adsense';
import {
  GoogleAdSenseUnit,
  GoogleAdSenseUnitFormat,
  GoogleAdSenseUnitLayout,
} from '../lib/types';
import { GOOGLE_ADSENSE_CLIENT_ID } from '../lib/constants';
import styles from './adUnit.module.css';

export type Props = {
  adSlot: GoogleAdSenseUnit;
  adFormat: GoogleAdSenseUnitFormat;
  adLayout?: GoogleAdSenseUnitLayout;
  className?: string;
};

function AdUnit({ adSlot, adFormat, adLayout, className }: Props) {
  useEffect(() => {
    displayAd();
  }, []);

  return (
    <div className={className}>
      <ins
        className={cn('adsbygoogle', styles.adunit)}
        data-ad-client={GOOGLE_ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-full-width-responsive="true"
        data-testid="ad-unit"
        style={{ display: 'block' }}
      />
    </div>
  );
}

export default React.memo(AdUnit);
