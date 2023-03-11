import React, { MutableRefObject, useRef } from 'react';
import cn from 'classnames';
import { getRefValue } from '../lib/hooks';
import { trackEvent } from '../lib/google-analytics';
import SocialItem from './socialItem';
import { GoogleAnalyticsEvent, Social } from '../lib/types';
import { SOCIAL_LINKS } from '../lib/constants';

export type Props = {
  className?: string;
};

export default function SocialItems({ className }: Props) {
  const isBtnClickedRef: MutableRefObject<Record<string, boolean>> = useRef({});
  const socialOnMouseLeave = (social: Social) => {
    const socialName = social.name;

    if (!getRefValue(isBtnClickedRef)[socialName]) {
      trackEvent({
        socialName,
        event: GoogleAnalyticsEvent.SOCIAL_HOVER,
        hoverText: social.title,
        hoverUrl: social.url,
      });
    }
  };
  const socialOnClick = (social: Social) => {
    const socialName = social.name;

    isBtnClickedRef.current[socialName] = true;

    trackEvent({
      socialName,
      event: GoogleAnalyticsEvent.SOCIAL_CLICK,
      linkText: social.title,
      linkUrl: social.url,
    });
  };

  return (
    <ul
      className={cn(
        'max-w-full mt-10 flex flex-wrap justify-center',
        className
      )}
    >
      {SOCIAL_LINKS.map((social) => {
        return (
          <SocialItem
            key={social.name}
            social={social}
            onMouseLeave={() => socialOnMouseLeave(social)}
            onClick={() => socialOnClick(social)}
          />
        );
      })}
    </ul>
  );
}
