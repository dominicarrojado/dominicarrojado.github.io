import { useEffect, useRef } from 'react';
import cn from 'classnames';
import { getRefValue } from '../lib/hooks';
import {
  useMounted,
  useScrollOpacityEffect,
  useWindowLoaded,
} from '../lib/custom-hooks';
import { getMoveTo } from '../lib/imports';
import { trackEvent } from '../lib/google-analytics';
import SvgLogo from './svgLogo';
import SvgArrowDown from './svgArrowDown';
import SvgLessThan from './svgLessThan';
import { GoogleAnalyticsEvent } from '../lib/types';
import { SCROLL_DOWN_DURATION } from '../lib/constants';

export default function HeroMain() {
  const shouldDisplay = useMounted();

  return (
    <section
      className={cn(
        'relative flex flex-col bg-gray-550 items-center justify-center overflow-hidden min-h-full py-32',
        'dark:bg-gray-750',
        'transform transition-transform ease-in-out duration-700',
        'motion-reduce:transition-none',
        'sm:px-20',
        'lg:px-32',
        {
          [shouldDisplay ? 'translate-y-0' : '-translate-y-full']: true,
        }
      )}
      data-testid="container"
    >
      <Background />
      <div className="z-10 w-full -mt-16 text-center">
        <Logo shouldDisplay={shouldDisplay} />
        <Title shouldDisplay={shouldDisplay} />
      </div>
      <ScrollDownButton shouldDisplay={shouldDisplay} />
    </section>
  );
}

function Background() {
  const shouldDisplay = useWindowLoaded();

  return (
    <div
      className={cn(
        'absolute top-0 left-0 w-full h-full bg-repeat bg-center invert-[.1]',
        'dark:invert-0',
        'motion-safe:animate-slide transition-opacity duration-1250 delay-700',
        'motion-reduce:transition-none',
        {
          ['opacity-0']: !shouldDisplay,
        }
      )}
      style={{ backgroundImage: "url('/images/bg/pattern.png')" }}
      data-testid="background"
    />
  );
}

function Logo({ shouldDisplay }: { shouldDisplay: boolean }) {
  const titleRef = useRef<HTMLDivElement>(null);
  const opacity = useScrollOpacityEffect(titleRef);

  return (
    <div ref={titleRef} className="relative inline-flex" style={{ opacity }}>
      <LogoPart shouldDisplay={shouldDisplay} isLeft />
      <SvgLogo
        className={cn(
          'w-40 h-40 text-white',
          'transform transition-transform-opacity duration-1250 delay-700',
          'motion-reduce:transition-none',
          'sm:w-60 sm:h-60',
          'md:w-80 md:h-80',
          'xl:w-96 xl:h-96',
          {
            ['opacity-0 -translate-y-4']: !shouldDisplay,
          }
        )}
        role="img"
        aria-label="Dominic Arrojado logo"
      />
      <LogoPart shouldDisplay={shouldDisplay} />
    </div>
  );
}

function LogoPart({
  shouldDisplay,
  isLeft,
}: {
  shouldDisplay: boolean;
  isLeft?: boolean;
}) {
  return (
    <SvgLessThan
      className={cn(
        'absolute top-12 w-14 h-14 text-white',
        'transform transition duration-1250 delay-700',
        'motion-reduce:transition-none',
        'sm:top-16 sm:w-24 sm:h-24',
        'md:top-20 md:w-32 md:h-32',
        'xl:top-24 xl:w-40 xl:h-40',
        {
          [isLeft
            ? '-left-14 sm:-left-24 md:-left-32 xl:-left-40'
            : '-right-14 sm:-right-24 md:-right-32 xl:-right-40 rotate-180']: true,
          [!shouldDisplay ? 'text-opacity-0' : 'text-opacity-30']: true,
          ['translate-x-3']: !shouldDisplay && isLeft,
          ['-translate-x-3']: !shouldDisplay && !isLeft,
        }
      )}
      data-testid="logo-part"
    />
  );
}

function Title({ shouldDisplay }: { shouldDisplay: boolean }) {
  const titleRef = useRef<HTMLDivElement>(null);
  const opacity = useScrollOpacityEffect(titleRef);

  return (
    <div ref={titleRef} className="overflow-hidden" style={{ opacity }}>
      <h1
        className={cn(
          'mt-2 px-4 text-base font-light text-white',
          'transform transition duration-1000 delay-1250',
          'motion-reduce:transition-none',
          'sm:text-lg',
          'md:mt-3 md:text-2xl',
          'xl:mt-4 xl:text-3xl',
          {
            ['opacity-0 translate-y-full']: !shouldDisplay,
          }
        )}
        data-testid="title"
      >
        Guides, Tips and Tricks to Web Development
      </h1>
    </div>
  );
}

function ScrollDownButton({ shouldDisplay }: { shouldDisplay: boolean }) {
  const text = 'Scroll Down';
  const btnRef = useRef<HTMLAnchorElement>(null);
  const isBtnClickedRef = useRef(false);
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
