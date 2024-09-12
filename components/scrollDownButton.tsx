import { useEffect, useRef } from 'react';
import cn from 'classnames';
import { getRefValue } from '../lib/hooks';
import { useMounted, useWindowLoaded } from '../lib/custom-hooks';
import { getMoveTo } from '../lib/imports';
import { trackEvent } from '../lib/google-analytics';
import SvgArrowDown from './svgArrowDown';
import { GoogleAnalyticsEvent } from '../lib/types';
import { SCROLL_DOWN_DURATION } from '../lib/constants';

export default function ScrollDownButton() {
  const text = 'Scroll Down';
  const btnRef = useRef<HTMLAnchorElement>(null);
  const shouldDisplay = useMounted();
  const shouldImportLib = useWindowLoaded();
  const btnOnClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.currentTarget.blur();
    trackEvent({
      event: GoogleAnalyticsEvent.SCROLL_CLICK,
      linkText: text,
    });
  };

  useEffect(() => {
    let unregisterTrigger: () => void | undefined;

    if (shouldImportLib) {
      (async function registerMoveToTrigger() {
        const MoveTo = await getMoveTo();

        if (typeof MoveTo === 'undefined') {
          return;
        }

        const btnEl = getRefValue(btnRef);

        unregisterTrigger = new MoveTo({
          duration: SCROLL_DOWN_DURATION,
        }).registerTrigger(btnEl);
      })();
    }

    return () => {
      if (typeof unregisterTrigger === 'function') {
        unregisterTrigger();
      }
    };
  }, [shouldImportLib]);

  return (
    <div
      className={cn(
        'absolute bottom-0 left-0 z-10 w-full text-center',
        'transform transition duration-700',
        'motion-reduce:transition-none',
        {
          ['opacity-0']: !shouldDisplay,
          ['-translate-y-3']: !shouldDisplay,
        }
      )}
      data-testid="scroll-down-btn"
    >
      <a
        ref={btnRef}
        href="#about"
        className="group relative inline-flex flex-col items-center pb-2"
        onClick={btnOnClick}
      >
        <div
          className={cn(
            'relative inline-flex select-none pb-0.5 pt-1 text-2xs text-gray-400',
            'transform transition duration-300 group-hover:translate-y-0.5 group-hover:text-white',
            'motion-reduce:transition-none',
            'md:mb-1 md:text-sm md:group-hover:translate-y-1',
            'xl:mb-2 xl:text-lg'
          )}
        >
          {text}
          <div className="pointer-events-none absolute bottom-0 right-0 z-0 h-px w-full bg-white bg-opacity-20" />
          <div
            className={cn(
              'pointer-events-none absolute bottom-0 right-0 z-10 h-px w-0 bg-white',
              'transition-width duration-500 group-hover:left-0 group-hover:right-auto group-hover:w-full',
              'motion-reduce:transition-none'
            )}
          />
        </div>
        <SvgArrowDown
          className={cn(
            'mt-2 inline-flex h-2 w-2 text-gray-500',
            'dark:text-gray-600',
            'transition-colors duration-300 group-hover:text-gray-300 motion-safe:animate-bounce',
            'motion-reduce:transition-none',
            'md:h-3 md:w-3',
            'xl:h-4 xl:w-4'
          )}
        />
      </a>
    </div>
  );
}
