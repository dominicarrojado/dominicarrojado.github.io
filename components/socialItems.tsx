import React from 'react';
import cn from 'classnames';
import { trackEvent } from '../lib/google-analytics';
import SocialItem from './socialItem';
import { GoogleAnalyticsEvent, Social } from '../lib/types';
import { SOCIAL_LINKS } from '../lib/constants';

export type Props = {
  className?: string;
};

export default function SocialItems({ className }: Props) {
  const socialOnClick = (social: Social) => {
    const socialName = social.name;

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
            onClick={() => socialOnClick(social)}
          />
        );
      })}
    </ul>
  );
}
