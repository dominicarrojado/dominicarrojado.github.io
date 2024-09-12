import { useEffect, useState } from 'react';
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
  const [isLogoFocused, setIsLogoFocused] = useState(false);
  const [isPastHeroSection, setIsPastHeroSection] = useState(false);
  const onClick = () => {
    setIsLogoFocused(false);
    props.onClick();
  };
  const onFocus = () => setIsLogoFocused(true);
  const onBlur = () => setIsLogoFocused(false);
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
          'absolute left-3.5 top-3.5 z-50 flex border border-white bg-gray-750 bg-opacity-90 p-1.5 shadow-3xl',
          'transform transition duration-500 ease-in-out hover:bg-opacity-100 hover:shadow-md',
          'motion-reduce:transition-none',
          'sm:left-4 sm:top-4',
          'md:left-5 md:top-5 md:border-2',
          'lg:left-8 lg:top-8',
          {
            ['-translate-y-full opacity-0']: !shouldDisplay,
          }
        )}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-label="Dominic Arrojado logo"
      >
        <SvgLogo
          className={cn(
            'h-7 w-7 text-white',
            'transition-colors duration-300',
            'sm:h-8 sm:w-8',
            'md:h-10 md:w-10',
            'xl:h-11 xl:w-11'
          )}
        />
      </a>
    </NextLink>
  );
}
