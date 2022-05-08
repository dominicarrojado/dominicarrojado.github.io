import { useRef } from 'react';
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

export type Props = {
  title: string;
  description: string;
  isMinHeightFull?: boolean;
};

export default function HeroSub({
  title,
  description,
  isMinHeightFull,
}: Props) {
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
              'relative flex flex-col justify-center bg-gray-550 py-28 px-6 text-center overflow-hidden',
              'dark:bg-gray-750',
              'transform transition-transform ease-in-out duration-500',
              'motion-reduce:transition-none',
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
            <Background />
            <Title title={title} state={state} />
            <Desc description={description} state={state} />
          </section>
        )}
      </Transition>
    </SwitchTransition>
  );
}

function Background() {
  const shouldDisplay = useWindowLoaded();

  return (
    <div
      className={cn(
        'absolute top-0 left-0 w-full h-full bg-repeat bg-center invert-[.1]',
        'dark:invert-0',
        'motion-safe:animate-slide transition-opacity duration-1250 delay-500',
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

function Title({ title, state }: { title: string; state: TransitionStatus }) {
  const titleRef = useRef<HTMLDivElement>(null);
  const shouldDisplay = useMounted();
  const opacity = useScrollOpacityEffect(titleRef);

  return (
    <div ref={titleRef} className="overflow-hidden py-2" style={{ opacity }}>
      <h1
        className={cn(
          'text-3xl font-bold text-white leading-tight',
          'transform transition duration-1000 delay-500',
          'motion-reduce:transition-none',
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
  const shouldDisplay = useMounted();
  const opacity = useScrollOpacityEffect(descRef);

  return (
    <div ref={descRef} className="overflow-hidden" style={{ opacity }}>
      <p
        className={cn(
          'font-light text-white',
          'transform transition duration-1000 delay-1000',
          'motion-reduce:transition-none',
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
