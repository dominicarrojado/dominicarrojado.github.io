import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Transition } from 'react-transition-group';
import { getRefValue, useScrollOpacityEffect } from '../lib/hooks';
import { getMoveTo } from '../lib/imports';
import Window from '../modules/Window';
import SvgLogo from './svgLogo';
import SvgArrowDown from './svgArrowDown';
import Spinner from './spinner';
import { SCROLL_DOWN_DURATION } from '../lib/constants';

export default function HeroMain() {
  const [windowLoaded, setWindowLoaded] = useState(Window.loaded);

  useEffect(() => {
    const windowOnLoad = async () => {
      setWindowLoaded(true);
    };

    Window.on('load', windowOnLoad);

    return () => {
      Window.off('load', windowOnLoad);
    };
  }, []);

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden min-h-full py-24"
      style={{ backgroundColor: '#2c2c34' }}
    >
      <Loader shouldShow={!windowLoaded} />
      <Background shouldShow={windowLoaded} />
      <div className="w-full -mt-16 text-center z-10">
        <Logo shouldShow={windowLoaded} />
        <Title shouldShow={windowLoaded} />
      </div>
      <ScrollDownButton shouldShow={windowLoaded} />
    </section>
  );
}

function Loader({ shouldShow }: { shouldShow: boolean }) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(true);
  }, []);

  return (
    <Transition
      in={shouldRender && shouldShow}
      timeout={1000}
      mountOnEnter
      unmountOnExit
    >
      {(state) => (
        <Spinner
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

function Background({ shouldShow }: { shouldShow: boolean }) {
  return (
    <div
      className={cn(
        'absolute top-0 left-0 w-full h-full bg-repeat bg-center',
        'animate-slide transition-opacity duration-500',
        {
          ['opacity-0']: !shouldShow,
        }
      )}
      style={{ backgroundImage: "url('/images/bg/pattern.png')" }}
      data-testid="background"
    />
  );
}

function Logo({ shouldShow }: { shouldShow: boolean }) {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const opacity = useScrollOpacityEffect(titleRef);

  return (
    <div ref={titleRef} className="relative inline-flex" style={{ opacity }}>
      <div
        className={cn(
          'absolute top-3 -left-14 text-white text-9xl tracking-normal leading-none select-none',
          'transform transition duration-1250',
          'sm:-top-1 sm:-left-24 sm:text-10xl',
          'md:top-0 md:-left-32 md:text-11xl',
          'xl:-top-5 xl:-left-44 xl:text-12xl',
          {
            [!shouldShow ? 'opacity-0' : 'opacity-40']: true,
            ['translate-x-3']: !shouldShow,
          }
        )}
        data-testid="logo-part-1"
      >
        &lt;
      </div>
      <SvgLogo
        className={cn(
          'w-40 h-40 text-white transform transition duration-1250',
          'sm:w-60 sm:h-60',
          'md:w-80 md:h-80',
          'xl:w-96 xl:h-96',
          {
            ['opacity-0']: !shouldShow,
            ['-translate-y-4']: !shouldShow,
          }
        )}
        data-testid="logo"
      />
      <div
        className={cn(
          'absolute top-3 -right-14 text-white text-9xl tracking-normal leading-none select-none',
          ' transform transition duration-1250',
          'sm:-top-1 sm:-right-24 sm:text-10xl',
          'md:top-0 md:-right-32 md:text-11xl',
          'xl:-top-5 xl:-right-44 xl:text-12xl',
          {
            [!shouldShow ? 'opacity-0' : 'opacity-40']: true,
            ['-translate-x-3']: !shouldShow,
          }
        )}
        data-testid="logo-part-2"
      >
        &gt;
      </div>
    </div>
  );
}

function Title({ shouldShow }: { shouldShow: boolean }) {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const opacity = useScrollOpacityEffect(titleRef);

  return (
    <div ref={titleRef} className="overflow-hidden" style={{ opacity }}>
      <h1
        className={cn(
          'mt-2 text-xs font-light text-white',
          'transform transition duration-1000',
          'sm:text-base',
          'md:mt-3 md:text-2xl',
          'xl:mt-4 xl:text-3xl',
          {
            ['opacity-0']: !shouldShow,
            ['translate-y-full']: !shouldShow,
          }
        )}
        data-testid="title"
      >
        Dominic Arrojado · Senior Software Engineer
      </h1>
    </div>
  );
}

export function ScrollDownButton({ shouldShow }: { shouldShow: boolean }) {
  const btnRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    let unregisterTrigger: () => void | undefined;

    if (shouldShow) {
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
  }, [shouldShow]);

  return (
    <div
      className={cn(
        'absolute bottom-0 left-0 w-full z-10 text-center',
        'transform transition duration-1000',
        {
          ['opacity-0']: !shouldShow,
          ['-translate-y-3']: !shouldShow,
        }
      )}
      data-testid="scroll-down-btn"
    >
      <a
        ref={btnRef}
        href="#about-me"
        className="group relative inline-flex flex-col items-center pb-1 outline-none"
      >
        <div
          className={cn(
            'relative inline-flex pt-1 pb-0.5 text-gray-400 text-2xs select-none',
            'transform transition-all group-hover:translate-y-0.5 group-hover:text-white',
            'md:mb-1 md:text-sm md:group-hover:translate-y-1',
            'xl:mb-2 xl:text-lg'
          )}
        >
          Scroll Down
          <div className="absolute bottom-0 left-0 w-full border-b border-gray-600 z-0"></div>
          <div
            className={cn(
              'absolute bottom-0 left-0 w-0 border-b border-white z-10',
              'transition-all group-hover:w-full'
            )}
          ></div>
        </div>
        <SvgArrowDown
          className={cn(
            'inline-flex mt-2 w-3 h-3 text-gray-600',
            'animate-bounce transition-colors group-hover:text-white',
            'md:w-4 md:h-4',
            'xl:w-5 xl:h-5'
          )}
        />
      </a>
    </div>
  );
}
