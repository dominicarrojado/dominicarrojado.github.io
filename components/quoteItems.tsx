import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { getRefValue } from '../lib/hooks';
import { useMounted } from '../lib/custom-hooks';
import QuoteItem from './quoteItem';
import { QUOTES, QUOTES_INTERVAL, QUOTES_LENGTH } from '../lib/constants';

export default function QuoteItems() {
  const isMounted = useMounted();
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
        'relative overflow-hidden text-center',
        'motion-reduce:transition-none',
        'sm:text-lg',
        'xl:text-xl',
        {
          'transition-height duration-1000': isMounted,
        }
      )}
      style={{ height }}
    >
      {QUOTES.map((item, idx) => {
        const isActive = idx === activeQuote;

        return (
          <QuoteItem
            key={idx}
            ref={isActive ? containerRef : null}
            isActive={isActive}
            quote={item}
          />
        );
      })}
    </ul>
  );
}
