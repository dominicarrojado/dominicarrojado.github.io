import React, { MutableRefObject, useRef } from 'react';
import cn from 'classnames';
import { useTooltipState, TooltipReference } from 'reakit/Tooltip';
import { getRefValue } from '../lib/hooks';
import { useMounted } from '../lib/custom-hooks';
import { trackEvent } from '../lib/google-analytics';
import AnchorLink, { Props as AnchorLinkProps } from './anchorLink';
import Tooltip from './tooltip';
import { GoogleAnalyticsEvents, Social } from '../lib/types';
import { SOCIAL_LINKS } from '../lib/constants';

export type Props = {
  className?: string;
};

export default function SocialItems({ className }: Props) {
  const isBtnClickedRef: MutableRefObject<Record<string, boolean>> = useRef({});
  const shouldDisplay = useMounted();
  const socialOnMouseLeave = (social: Social) => {
    const socialName = social.name;

    if (!getRefValue(isBtnClickedRef)[socialName]) {
      trackEvent({
        socialName,
        event: GoogleAnalyticsEvents.SOCIAL_HOVER,
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
      event: GoogleAnalyticsEvents.SOCIAL_CLICK,
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
      {SOCIAL_LINKS.map((social, idx) => {
        const { name } = social;

        return (
          <li
            key={name}
            className={cn(
              'flex',
              'lg:transform lg:transition lg:ease-in-out lg:duration-500',
              'motion-reduce:lg:transition-none',
              {
                ['lg:opacity-0 lg:translate-y-full']: !shouldDisplay,
              }
            )}
            style={{
              transitionDelay: `${(idx + 1) * 150 + 1900}ms`,
            }}
          >
            <SocialItemTooltip
              social={social}
              onMouseLeave={() => socialOnMouseLeave(social)}
              onClick={() => socialOnClick(social)}
            />
          </li>
        );
      })}
    </ul>
  );
}

function SocialItemTooltip({
  social,
  ...otherProps
}: { social: Social } & AnchorLinkProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const tooltip = useTooltipState({
    baseId: `tooltip-${social.name}`,
    animated: 300,
    placement: 'top',
  });

  return (
    <TooltipReference
      {...tooltip}
      {...otherProps}
      as={AnchorLink}
      ref={anchorRef}
      href={social.url}
      className={cn('group inline-flex p-3 cursor-pointer', 'sm:p-4')}
      aria-label={social.title}
      isExternal
    >
      {social.icon({
        className: cn(
          'w-7 h-7 text-gray-400',
          'dark:text-gray-300',
          'transition-colors group-hover:text-gray-500',
          'motion-reduce:transition-none',
          'dark:group-hover:text-white',
          'sm:w-8 sm:h-8',
          'xl:w-9 xl:h-9'
        ),
      })}

      <Tooltip tooltip={tooltip}>{social.title}</Tooltip>
    </TooltipReference>
  );
}
