import { TransitionEvent, useEffect, useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Window from '../modules/Window';
import { useMounted } from '../lib/custom-hooks';
import SvgLogo from './svgLogo';
import NextLink from './nextLink';
import { Route } from '../lib/types';

export type Props = {
  onClick: () => void;
};

export default function HeaderLogo(props: Props) {
  const isMounted = useMounted();
  const { route } = useRouter();
  const [animationDone, setAnimationDone] = useState(false);
  const [isLogoFocused, setIsLogoFocused] = useState(false);
  const [isPastHeroSection, setIsPastHeroSection] = useState(false);
  const onClick = () => {
    setIsLogoFocused(false);
    props.onClick();
  };
  const onFocus = () => setIsLogoFocused(true);
  const onBlur = () => setIsLogoFocused(false);
  const onTransitionEnd = (e: TransitionEvent<HTMLAnchorElement>) => {
    if (e.propertyName === 'opacity') {
      setAnimationDone(true);
    }
  };
  const withAnimationDelay = route !== Route.HOME && !animationDone;
  const shouldDisplay =
    isMounted && (route !== Route.HOME || isPastHeroSection || isLogoFocused);

  useEffect(() => {
    const onScroll = () => {
      setIsPastHeroSection(window.scrollY >= window.innerHeight);
    };

    Window.on('scroll', onScroll);

    return () => {
      Window.off('scroll', onScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NextLink href={Route.HOME}>
      <a
        className={cn(
          'absolute top-3.5 left-3.5 flex shadow-3xl border border-white bg-gray-750 bg-opacity-90 p-1.5 z-50',
          'transform transition ease-in-out duration-500 hover:shadow-md hover:bg-opacity-100',
          'motion-reduce:transition-none',
          'sm:top-4 sm:left-4',
          'md:top-5 md:left-5 md:border-2',
          'lg:top-8 lg:left-8',
          {
            ['delay-700']: withAnimationDelay,
            ['opacity-0 -translate-y-full']: !shouldDisplay,
          }
        )}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onTransitionEnd={onTransitionEnd}
        aria-label="Dominic Arrojado logo"
      >
        <SvgLogo
          className={cn(
            'w-7 h-7 text-white',
            'transition-colors duration-300',
            'sm:w-8 sm:h-8',
            'md:w-10 md:h-10',
            'xl:w-11 xl:h-11'
          )}
        />
      </a>
    </NextLink>
  );
}
