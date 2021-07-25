import React, { useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import { getRefValue } from '../lib/hooks';
import { copyTextToClipboard } from '../lib/dom';
import Tooltip from './tooltip';
import { Social as SocialItem } from '../lib/types';
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
      <Social />
      <Credits />
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
        'relative text-gray-500 text-center overflow-hidden',
        'transition-all duration-1000',
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

function Social() {
  const [copiedItem, setCopiedItem] = useState('');
  const copyUrl = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    social: SocialItem
  ) => {
    const textToCopy = social.url.replace('mailto:', '');
    const copied = copyTextToClipboard(textToCopy);

    if (copied) {
      e.preventDefault();
      setCopiedItem(social.name);
    }
  };
  const onMouseEnter = (name: string) => {
    // display title again if it was "Copied!" on mouse enter
    setCopiedItem((copiedItem) => {
      if (name === copiedItem) {
        return '';
      } else {
        return copiedItem;
      }
    });
  };

  return (
    <ul
      className={cn(
        'mt-10 text-center',
        'lg:fixed lg:bottom-0 lg:right-0 lg:mt-0 lg:mb-3 lg:mr-7 lg:z-40'
      )}
    >
      {SOCIAL_LINKS.map((social) => {
        const { name } = social;

        return (
          <li key={name} className="inline-flex">
            <a
              href={social.url}
              rel="noopener noreferrer nofollow"
              target="_blank"
              className="group relative inline-flex p-4 cursor-pointer"
              onClick={
                social.copyOnClick ? (e) => copyUrl(e, social) : undefined
              }
              onMouseEnter={() => onMouseEnter(social.name)}
            >
              {social.icon({
                className: cn(
                  'w-8 h-8 text-gray-300',
                  'transition-colors',
                  'group-hover:text-gray-400',
                  'xl:w-9 xl:h-9'
                ),
              })}
              <Tooltip>
                {name !== copiedItem ? social.title : 'Copied!'}
              </Tooltip>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function Credits() {
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
      © Dominic Arrojado {currentYear}
    </p>
  );
}
