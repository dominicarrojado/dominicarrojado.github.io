import Link from 'next/link';
import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { getRefValue } from '../lib/hooks';
import { useWindowLoaded } from '../lib/custom-hooks';
import { copyTextToClipboard } from '../lib/dom';
import { trackEvent } from '../lib/google-analytics';
import AnchorLink from './anchorLink';
import Tooltip from './tooltip';
import { GoogleAnalyticsEvents, Route, Social } from '../lib/types';
import {
  QUOTES,
  QUOTES_INTERVAL,
  QUOTES_LENGTH,
  SOCIAL_LINKS,
} from '../lib/constants';

export default function Footer() {
  return (
    <footer className="py-20 px-6 bg-gray-100">
      <Quotes />
      <SocialItems />
      <Legal />
    </footer>
  );
}

function Quotes() {
  const containerRef = useRef<HTMLLIElement>(null);
  const [activeQuote, setActiveQuote] = useState(0);
  const [height, setHeight] = useState(0);
  const setQuoteHeight = () => {
    const containerEl = getRefValue(containerRef);

    setHeight(containerEl.offsetHeight);
  };

  useEffect(() => {
    setQuoteHeight();

    const interval = setInterval(() => {
      setActiveQuote((currentIdx) => {
        const newIdx = currentIdx + 1;

        if (newIdx < QUOTES_LENGTH) {
          return newIdx;
        } else {
          return 0;
        }
      });
      setQuoteHeight();
    }, QUOTES_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <ul
      className={cn(
        'relative text-center overflow-hidden',
        'transition-height duration-1000',
        'sm:text-lg',
        'xl:text-xl'
      )}
      style={{ height }}
    >
      {QUOTES.map((item, idx) => {
        const isActive = idx === activeQuote;

        return (
          <li
            key={idx}
            ref={isActive ? containerRef : null}
            className={cn(
              'absolute top-0 left-0 w-full',
              'transition-opacity duration-1000',
              {
                'opacity-0 pointer-events-none': !isActive,
              }
            )}
          >
            <blockquote>“{item.quote}”</blockquote>
            <p className={cn('mt-1', 'sm:mt-2')}>— {item.author}</p>
          </li>
        );
      })}
    </ul>
  );
}

function SocialItems() {
  const isBtnClickedRef: MutableRefObject<Record<string, boolean>> = useRef({});
  const shouldDisplay = useWindowLoaded();
  const [copiedItem, setCopiedItem] = useState('');
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
  const socialOnClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    social: Social
  ) => {
    const socialName = social.name;

    isBtnClickedRef.current[socialName] = true;

    trackEvent({
      socialName,
      event: GoogleAnalyticsEvents.SOCIAL_CLICK,
      linkText: social.title,
      linkUrl: social.url,
    });

    if (!social.shouldCopyOnClick) {
      return;
    }

    const textToCopy = social.url.replace('mailto:', '');
    const copied = copyTextToClipboard(textToCopy);

    if (!copied) {
      return;
    }

    e.preventDefault();
    setCopiedItem(social.name);
  };
  const tooltipOnHidden = () => setCopiedItem('');

  return (
    <ul
      className={cn(
        'mt-10 text-center',
        'lg:fixed lg:bottom-3 lg:right-7 lg:mt-0 lg:z-40'
      )}
    >
      {SOCIAL_LINKS.map((social, idx) => {
        const { name } = social;

        return (
          <li
            key={name}
            className={cn(
              'inline-flex',
              'lg:transform lg:transition lg:ease-in-out lg:duration-500',
              {
                ['lg:opacity-0 lg:translate-y-full']: !shouldDisplay,
              }
            )}
            style={{
              transitionDelay: `${(idx + 1) * 150 + 1900}ms`,
            }}
          >
            <AnchorLink
              href={social.url}
              className="group relative inline-flex p-4 cursor-pointer"
              onMouseLeave={() => socialOnMouseLeave(social)}
              onClick={(e) => socialOnClick(e, social)}
              tabIndex={idx + 3}
              isExternal
            >
              {social.icon({
                className: cn(
                  'w-8 h-8 text-gray-400',
                  'transition-colors',
                  'group-hover:text-gray-500',
                  'xl:w-9 xl:h-9'
                ),
              })}
              <Tooltip onHidden={tooltipOnHidden}>
                {name !== copiedItem ? social.title : 'Copied!'}
              </Tooltip>
            </AnchorLink>
          </li>
        );
      })}
    </ul>
  );
}

function Legal() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <p
      className={cn(
        'mt-4 text-gray-400 text-sm text-center',
        'sm:text-base',
        'lg:mt-10',
        'xl:text-lg'
      )}
    >
      <span className="font-normal">©{currentYear} Dominic Arrojado</span> ·{' '}
      <Link href={Route.PRIVACY_POLICY}>
        <a>Privacy Policy</a>
      </Link>{' '}
      ·{' '}
      <Link href={Route.DISCLAIMER}>
        <a>Disclaimer</a>
      </Link>
    </p>
  );
}
