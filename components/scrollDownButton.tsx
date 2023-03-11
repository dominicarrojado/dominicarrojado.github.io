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
  const isBtnClickedRef = useRef(false);
  const shouldDisplay = useMounted();
  const shouldImportLib = useWindowLoaded();
  const btnOnMouseLeave = () => {
    if (!getRefValue(isBtnClickedRef)) {
      trackEvent({
        event: GoogleAnalyticsEvent.SCROLL_HOVER,
        hoverText: text,
      });
    }
  };
  const btnOnClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.currentTarget.blur();
    isBtnClickedRef.current = true;
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
        'absolute bottom-0 left-0 w-full z-10 text-center',
        'transform transition duration-1000 delay-1750',
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
        onMouseLeave={btnOnMouseLeave}
        onClick={btnOnClick}
      >
        <div
          className={cn(
            'relative inline-flex pt-1 pb-0.5 text-gray-400 text-2xs select-none',
            'transform transition duration-300 group-hover:translate-y-0.5 group-hover:text-white',
            'motion-reduce:transition-none',
            'md:mb-1 md:text-sm md:group-hover:translate-y-1',
            'xl:mb-2 xl:text-lg'
          )}
        >
          {text}
          <div className="absolute bottom-0 right-0 z-0 w-full h-px bg-white bg-opacity-20 pointer-events-none" />
          <div
            className={cn(
              'absolute bottom-0 right-0 w-0 h-px bg-white z-10 pointer-events-none',
              'transition-width duration-500 group-hover:right-auto group-hover:left-0 group-hover:w-full',
              'motion-reduce:transition-none'
            )}
          />
        </div>
        <SvgArrowDown
          className={cn(
            'inline-flex mt-2 w-2 h-2 text-gray-500',
            'dark:text-gray-600',
            'motion-safe:animate-bounce transition-colors duration-300 group-hover:text-gray-300',
            'motion-reduce:transition-none',
            'md:w-3 md:h-3',
            'xl:w-4 xl:h-4'
          )}
        />
      </a>
    </div>
  );
}
