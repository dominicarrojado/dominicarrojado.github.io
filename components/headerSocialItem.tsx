import { useRef } from 'react';
import cn from 'classnames';
import { Tooltip, TooltipReference, useTooltipState } from 'reakit/Tooltip';
import { getRefValue } from '../lib/hooks';
import { trackEvent } from '../lib/google-analytics';
import AnchorLink from './anchorLink';
import { GoogleAnalyticsEvent, Social } from '../lib/types';

export default function HeaderSocialItem({
  idx,
  social,
  isMenuOpen,
}: {
  idx: number;
  social: Social;
  isMenuOpen: boolean;
}) {
  const tooltip = useTooltipState();
  const isBtnClickedRef = useRef(false);
  const onMouseLeave = () => {
    if (!getRefValue(isBtnClickedRef)) {
      trackEvent({
        event: GoogleAnalyticsEvent.SOCIAL_HOVER,
        hoverText: social.title,
        hoverUrl: social.url,
        socialName: social.name,
      });
    }
  };
  const onClick = () => {
    isBtnClickedRef.current = true;

    trackEvent({
      event: GoogleAnalyticsEvent.SOCIAL_CLICK,
      linkText: social.title,
      linkUrl: social.url,
      socialName: social.name,
    });
  };

  return (
    <li
      key={social.name}
      className={cn('transform', 'motion-reduce:transition-none', {
        [!isMenuOpen
          ? 'opacity-0 transition-transform translate-y-1/2 duration-300'
          : 'opacity-100 transition translate-y-0 duration-500']: true,
      })}
      style={
        isMenuOpen
          ? { transitionDelay: `${(idx + 1) * 75 + 300}ms` }
          : undefined
      }
    >
      <TooltipReference
        {...tooltip}
        as={AnchorLink}
        href={social.url}
        title={social.title}
        aria-label={social.title}
        className={cn(
          'group flex items-center p-3.5 outline-none',
          'sm:p-5',
          'md:p-6'
        )}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        isExternal
      >
        {social.icon({
          className: cn(
            'w-8 h-8 text-gray-300',
            'transition-colors group-hover:text-white group-focus-visible:text-white',
            'motion-reduce:transition-none',
            'sm:w-10 sm:h-10',
            'md:w-11 md:h-11'
          ),
        })}
      </TooltipReference>
      <Tooltip {...tooltip}>Tooltip</Tooltip>
    </li>
  );
}
