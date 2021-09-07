import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import {
  SwitchTransition,
  Transition,
  TransitionStatus,
} from 'react-transition-group';
import {
  useMounted,
  useScrollOpacityEffect,
  useWindowLoaded,
} from '../lib/custom-hooks';
import Spinner from './spinner';

export default function HeroSub({
  title,
  description,
  isMinHeightFull,
}: {
  title: string;
  description: string;
  isMinHeightFull?: boolean;
}) {
  const shouldDisplay = useMounted();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <SwitchTransition>
      <Transition
        key={title}
        nodeRef={sectionRef}
        timeout={500}
        mountOnEnter
        unmountOnExit
      >
        {(state) => (
          <section
            ref={sectionRef}
            className={cn(
              'relative flex flex-col justify-center bg-gray-750 py-28 px-6 text-center overflow-hidden',
              'transform transition-transform ease-in-out duration-500',
              'sm:px-20',
              'lg:px-32',
              {
                [!isMinHeightFull ? 'min-h-96' : 'min-h-full']: true,
                [shouldDisplay && state === 'entered'
                  ? 'translate-y-0'
                  : '-translate-y-full']: true,
              }
            )}
            data-testid="container"
          >
            <Loader />
            <Background />
            <Title title={title} state={state} />
            <Desc description={description} state={state} />
          </section>
        )}
      </Transition>
    </SwitchTransition>
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
            'transition-opacity duration-1000 delay-1250',
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
        'animate-slide transition-opacity duration-1250 delay-500',
        {
          ['opacity-0']: !shouldDisplay,
        }
      )}
      style={{ backgroundImage: "url('/images/bg/pattern.png')" }}
      data-testid="background"
    />
  );
}

function Title({ title, state }: { title: string; state: TransitionStatus }) {
  const titleRef = useRef<HTMLDivElement>(null);
  const shouldDisplay = useWindowLoaded();
  const opacity = useScrollOpacityEffect(titleRef);

  return (
    <div ref={titleRef} className="overflow-hidden py-2" style={{ opacity }}>
      <h1
        className={cn(
          'text-3xl font-bold text-white leading-tight',
          'transform transition duration-1000 delay-500',
          'sm:text-4xl',
          'md:text-5xl',
          'lg:text-6xl',
          'xl:text-7xl',
          {
            [shouldDisplay && state === 'entered'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-full']: true,
          }
        )}
      >
        {title}
      </h1>
    </div>
  );
}

function Desc({
  description,
  state,
}: {
  description: string;
  state: TransitionStatus;
}) {
  const descRef = useRef<HTMLDivElement>(null);
  const shouldDisplay = useWindowLoaded();
  const opacity = useScrollOpacityEffect(descRef);

  return (
    <div ref={descRef} className="overflow-hidden" style={{ opacity }}>
      <p
        className={cn(
          'font-light text-white',
          'transform transition duration-1000 delay-1000',
          'xl:text-2xl',
          {
            [shouldDisplay && state === 'entered'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-full']: true,
          }
        )}
      >
        {description}
      </p>
    </div>
  );
}
