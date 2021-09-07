import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Transition } from 'react-transition-group';
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
import Spinner from './spinner';
import { GoogleAnalyticsEvents } from '../lib/types';
import { SCROLL_DOWN_DURATION } from '../lib/constants';

export default function HeroMain() {
  const shouldDisplay = useMounted();

  return (
    <section
      className={cn(
        'relative flex flex-col bg-gray-750 items-center justify-center overflow-hidden min-h-full py-32',
        'transform transition-transform ease-in-out duration-700',
        'sm:px-20',
        'lg:px-32',
        {
          [shouldDisplay ? 'translate-y-0' : '-translate-y-full']: true,
        }
      )}
      data-testid="container"
    >
      <Loader />
      <Background />
      <div className="w-full -mt-16 text-center z-10">
        <Logo />
        <Title />
      </div>
      <ScrollDownButton />
    </section>
  );
}

function Loader() {
  const spinnerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const isWindowLoaded = useWindowLoaded();
  const shouldDisplay = isMounted && !isWindowLoaded;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Transition
      in={shouldDisplay}
      nodeRef={spinnerRef}
      timeout={1000}
      mountOnEnter
      unmountOnExit
    >
      {(state) => (
        <Spinner
          ref={spinnerRef}
          className={cn(
            'absolute inset-0 m-auto w-8 h-8 border-2',
            'transition-opacity duration-1000',
            'sm:w-10 sm:h-10 sm:border-4',
            'md:w-12 md:h-12',
            'xl:w-14 xl:h-14',
            {
              [state === 'entered' ? 'opacity-100' : 'opacity-0']: true,
            }
          )}
          color="#ffffff"
        />
      )}
    </Transition>
  );
}

function Background() {
  const shouldDisplay = useWindowLoaded();

  return (
    <div
      className={cn(
        'absolute top-0 left-0 w-full h-full bg-repeat bg-center',
        'animate-slide transition-opacity duration-1250 delay-700',
        {
          ['opacity-0']: !shouldDisplay,
        }
      )}
      style={{ backgroundImage: "url('/images/bg/pattern.png')" }}
      data-testid="background"
    />
  );
}

function Logo() {
  const titleRef = useRef<HTMLDivElement>(null);
  const shouldDisplay = useWindowLoaded();
  const opacity = useScrollOpacityEffect(titleRef);

  return (
    <div ref={titleRef} className="relative inline-flex" style={{ opacity }}>
      <div
        className={cn(
          'absolute top-3 -left-14 text-white text-9xl tracking-normal leading-none select-none',
          'transform transition duration-1250 delay-700',
          'sm:-top-1 sm:-left-24 sm:text-10xl',
          'md:top-0 md:-left-32 md:text-11xl',
          'xl:-top-5 xl:-left-44 xl:text-12xl',
          {
            [!shouldDisplay ? 'opacity-0 translate-x-3' : 'opacity-40']: true,
          }
        )}
        data-testid="logo-part-1"
      >
        &lt;
      </div>
      <SvgLogo
        className={cn(
          'w-40 h-40 text-white transform transition duration-1250 delay-700',
          'sm:w-60 sm:h-60',
          'md:w-80 md:h-80',
          'xl:w-96 xl:h-96',
          {
            ['opacity-0 -translate-y-4']: !shouldDisplay,
          }
        )}
        data-testid="logo"
      />
      <div
        className={cn(
          'absolute top-3 -right-14 text-white text-9xl tracking-normal leading-none select-none',
          ' transform transition duration-1250 delay-700',
          'sm:-top-1 sm:-right-24 sm:text-10xl',
          'md:top-0 md:-right-32 md:text-11xl',
          'xl:-top-5 xl:-right-44 xl:text-12xl',
          {
            [!shouldDisplay ? 'opacity-0 -translate-x-3' : 'opacity-40']: true,
          }
        )}
        data-testid="logo-part-2"
      >
        &gt;
      </div>
    </div>
  );
}

function Title() {
  const titleRef = useRef<HTMLDivElement>(null);
  const shouldDisplay = useWindowLoaded();
  const opacity = useScrollOpacityEffect(titleRef);

  return (
    <div ref={titleRef} className="overflow-hidden" style={{ opacity }}>
      <h1
        className={cn(
          'mt-2 px-4 text-base font-light text-white',
          'transform transition duration-1000 delay-1250',
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

function ScrollDownButton() {
  const text = 'Scroll Down';
  const btnRef = useRef<HTMLAnchorElement>(null);
  const isBtnClickedRef = useRef(false);
  const shouldDisplay = useWindowLoaded();
  const btnOnMouseLeave = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!getRefValue(isBtnClickedRef)) {
      trackEvent({
        event: GoogleAnalyticsEvents.SCROLL_HOVER,
        hoverText: text,
      });
    }
  };
  const btnOnClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.currentTarget.blur();
    isBtnClickedRef.current = true;
    trackEvent({
      event: GoogleAnalyticsEvents.SCROLL_CLICK,
      linkText: text,
    });
  };

  useEffect(() => {
    let unregisterTrigger: () => void | undefined;

    if (shouldDisplay) {
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
  }, [shouldDisplay]);

  return (
    <div
      className={cn(
        'absolute bottom-0 left-0 w-full z-10 text-center',
        'transform transition duration-1000 delay-1750',
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
        tabIndex={2}
      >
        <div
          className={cn(
            'relative inline-flex pt-1 pb-0.5 text-gray-400 text-2xs select-none',
            'transform transition duration-300 group-hover:translate-y-0.5 group-hover:text-white',
            'md:mb-1 md:text-sm md:group-hover:translate-y-1',
            'xl:mb-2 xl:text-lg'
          )}
        >
          {text}
          <div className="absolute bottom-0 right-0 w-full h-px bg-white bg-opacity-20 z-0 pointer-events-none" />
          <div
            className={cn(
              'absolute bottom-0 right-0 w-0 h-px bg-white z-10 pointer-events-none',
              'transition-width duration-500 group-hover:right-auto group-hover:left-0 group-hover:w-full'
            )}
          />
        </div>
        <SvgArrowDown
          className={cn(
            'inline-flex mt-2 w-2 h-2 text-gray-600',
            'animate-bounce transition-colors duration-300 group-hover:text-gray-300',
            'md:w-3 md:h-3',
            'xl:w-4 xl:h-4'
          )}
        />
      </a>
    </div>
  );
}
