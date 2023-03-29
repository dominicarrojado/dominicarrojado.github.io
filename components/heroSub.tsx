import { useRef } from 'react';
import cn from 'classnames';
import { Transition } from 'react-transition-group';
import {
  useMounted,
  useScrollOpacityEffect,
  useWindowLoaded,
} from '../lib/custom-hooks';
import { checkShouldAnimate } from '../lib/transition-group';

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
  const isMounted = useMounted();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <Transition in={isMounted} nodeRef={sectionRef} timeout={0}>
      {(state) => {
        const shouldDisplay = checkShouldAnimate(state);

        return (
          <section
            ref={sectionRef}
            className={cn(
              'relative flex flex-col justify-center bg-gray-550 py-28 px-6 text-center overflow-hidden',
              'dark:bg-gray-750',
              'sm:px-20',
              'lg:px-32',
              !isMinHeightFull ? 'min-h-96' : 'min-h-full'
            )}
            data-testid="container"
          >
            <Background />
            <Title title={title} shouldDisplay={shouldDisplay} />
            <Desc description={description} shouldDisplay={shouldDisplay} />
          </section>
        );
      }}
    </Transition>
  );
}

function Background() {
  const shouldDisplay = useWindowLoaded();

  return (
    <div
      className={cn(
        'absolute top-0 left-0 w-full h-full bg-repeat bg-center invert-[.1]',
        'dark:invert-0',
        'motion-safe:animate-slide transition-opacity duration-1250',
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

function Title({
  title,
  shouldDisplay,
}: {
  title: string;
  shouldDisplay: boolean;
}) {
  const titleRef = useRef<HTMLDivElement>(null);
  const opacity = useScrollOpacityEffect(titleRef);

  return (
    <div ref={titleRef} className="overflow-hidden py-2" style={{ opacity }}>
      <h1
        className={cn(
          'text-3xl font-bold text-white leading-tight',
          'transform transition duration-700',
          'motion-reduce:transition-none',
          'sm:text-4xl',
          'md:text-5xl',
          'lg:text-6xl',
          'xl:text-7xl',
          {
            [shouldDisplay
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
  shouldDisplay,
}: {
  description: string;
  shouldDisplay: boolean;
}) {
  const descRef = useRef<HTMLDivElement>(null);
  const opacity = useScrollOpacityEffect(descRef);

  return (
    <div ref={descRef} className="overflow-hidden" style={{ opacity }}>
      <p
        className={cn(
          'font-light text-white',
          'transform transition duration-700',
          'motion-reduce:transition-none',
          'xl:text-2xl',
          {
            [shouldDisplay
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
