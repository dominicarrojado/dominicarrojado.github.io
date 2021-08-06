import { ReactNode, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Transition } from 'react-transition-group';
import { useScrollOpacityEffect, useWindowLoaded } from '../lib/custom-hooks';
import Spinner from './spinner';

export default function HeroSub({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section
      className={cn(
        'relative flex flex-col justify-center min-h-96 bg-gray-1000 py-28 px-6 text-center',
        'sm:px-20',
        'lg:px-32'
      )}
    >
      <Loader />
      <Background />
      <Title>{title}</Title>
      <Desc>{description}</Desc>
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
        'animate-slide transition-opacity duration-1250',
        {
          ['opacity-0']: !shouldDisplay,
        }
      )}
      style={{ backgroundImage: "url('/images/bg/pattern.png')" }}
      data-testid="background"
    />
  );
}

function Title({ children }: { children: ReactNode }) {
  const titleRef = useRef<HTMLDivElement>(null);
  const shouldDisplay = useWindowLoaded();
  const opacity = useScrollOpacityEffect(titleRef);

  return (
    <div ref={titleRef} className="overflow-hidden py-2" style={{ opacity }}>
      <h1
        className={cn(
          'text-3xl font-bold text-white',
          'transform transition duration-1000',
          'sm:text-4xl sm:leading-tight',
          'md:text-5xl md:leading-tight',
          'xl:text-7xl xl:leading-tight',
          {
            ['opacity-0 translate-y-full']: !shouldDisplay,
          }
        )}
      >
        {children}
      </h1>
    </div>
  );
}

function Desc({ children }: { children: ReactNode }) {
  const descRef = useRef<HTMLDivElement>(null);
  const shouldDisplay = useWindowLoaded();
  const opacity = useScrollOpacityEffect(descRef);

  return (
    <div ref={descRef} className={cn('overflow-hidden')} style={{ opacity }}>
      <p
        className={cn(
          'font-light text-white',
          'transform transition duration-1000 delay-300',
          'md:text-2xl',
          'xl:text-3xl',
          {
            ['opacity-0 translate-y-full']: !shouldDisplay,
          }
        )}
      >
        {children}
      </p>
    </div>
  );
}
