import cn from 'classnames';
import { trackEvent } from '../lib/google-analytics';
import AnchorLink from './anchorLink';
import { GoogleAnalyticsEvent, Social } from '../lib/types';

export type Props = {
  idx: number;
  social: Social;
  shouldDisplay: boolean;
};

export default function HeaderSocialItem({
  idx,
  social,
  shouldDisplay,
}: Props) {
  const onClick = () => {
    trackEvent({
      event: GoogleAnalyticsEvent.SOCIAL_CLICK,
      linkText: social.title,
      linkUrl: social.url,
      socialName: social.name,
    });
  };

  return (
    <li
      className={cn(
        'w-1/3',
        'transform',
        'motion-reduce:transition-none',
        'sm:w-auto',
        {
          [!shouldDisplay
            ? 'translate-y-1/2 opacity-0 transition-transform duration-300'
            : 'translate-y-0 opacity-100 transition duration-500']: true,
        }
      )}
      style={
        shouldDisplay
          ? { transitionDelay: `${(idx + 1) * 75 + 100}ms` }
          : undefined
      }
    >
      <AnchorLink
        href={social.url}
        title={social.title}
        aria-label={social.title}
        className={cn(
          'group flex flex-col items-center px-2 py-3 text-gray-300 outline-none',
          'transition-colors hover:text-white focus-visible:text-white',
          'motion-reduce:transition-none',
          'sm:px-4',
          'md:px-6 md:py-4'
        )}
        onClick={onClick}
        isExternal
      >
        {social.icon({
          className: cn('w-8 h-8', 'sm:w-10 sm:h-10', 'md:w-11 md:h-11'),
        })}
        <span
          className={cn(
            'mt-2 text-2xs uppercase',
            'sm:mt-3 sm:text-xs',
            'xl:text-sm'
          )}
        >
          {social.subtitle}
        </span>
      </AnchorLink>
    </li>
  );
}
