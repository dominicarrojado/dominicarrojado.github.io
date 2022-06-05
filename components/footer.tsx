import React, { useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import { getRefValue } from '../lib/hooks';
import { useMounted } from '../lib/custom-hooks';
import SocialItems from './socialItems';
import NextLink from './nextLink';
import { Route } from '../lib/types';
import { QUOTES, QUOTES_INTERVAL, QUOTES_LENGTH } from '../lib/constants';

export default function Footer() {
  const shouldDisplay = useMounted();

  return (
    <footer
      className={cn(
        'py-20 px-6 bg-gray-100 dark:bg-gray-850 overflow-hidden',
        'lg:overflow-auto',
        'transition-opacity duration-1000 delay-1750',
        'motion-reduce:transition-none',
        {
          'opacity-0': !shouldDisplay,
        }
      )}
      data-testid="footer"
    >
      <Quotes />
      <SocialItems className="lg:hidden" />
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
        'motion-reduce:transition-none',
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
              'motion-reduce:transition-none',
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
      <span className="font-normal">©{currentYear} Dominic Arrojado</span>{' '}
      <span className="block mt-1 sm:hidden" />
      <span className="hidden sm:inline">·</span>{' '}
      <NextLink href={Route.PRIVACY_POLICY}>
        <a>Privacy Policy</a>
      </NextLink>{' '}
      ·{' '}
      <NextLink href={Route.DISCLAIMER}>
        <a>Disclaimer</a>
      </NextLink>
    </p>
  );
}
