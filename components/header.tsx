import { TransitionEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { SwitchTransition, Transition } from 'react-transition-group';
import Window from '../modules/Window';
import { getRefValue } from '../lib/hooks';
import { useDarkModeEnabled, useWindowLoaded } from '../lib/custom-hooks';
import { copyTextToClipboard } from '../lib/dom';
import { trackEvent } from '../lib/google-analytics';
import SvgLogo from './svgLogo';
import SvgSun from './svgSun';
import SvgMoon from './svgMoon';
import Tooltip from './tooltip';
import AnchorLink from './anchorLink';
import { GoogleAnalyticsEvents, Route, Social } from '../lib/types';
import { MENU_ITEMS, SOCIAL_LINKS } from '../lib/constants';

export default function Header({ route }: { route: Route }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((isOpen) => !isOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header>
        <Logo route={route} closeMenu={closeMenu} />
        <ThemeButtonContainer />
        <MenuButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </header>
      <MenuBackground isMenuOpen={isMenuOpen} />
      <div
        className={cn('fixed inset-0 z-40 overflow-y-auto overflow-x-hidden', {
          'w-0 h-0 pointer-events-none': !isMenuOpen,
        })}
        data-testid="menu-container"
      >
        <div className="flex justify-center items-center min-h-full">
          <div className={cn('py-10 pl-8', 'sm:pl-0')}>
            <MenuItems isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
            <SocialItems isMenuOpen={isMenuOpen} />
          </div>
        </div>
      </div>
    </>
  );
}

function Logo({ route, closeMenu }: { route: string; closeMenu: () => void }) {
  const isWindowLoaded = useWindowLoaded();
  const [animationDone, setAnimationDone] = useState(false);
  const [isPastHeroSection, setIsPastHeroSection] = useState(false);
  const onTransitionEnd = (e: TransitionEvent<HTMLAnchorElement>) => {
    if (e.propertyName === 'opacity') {
      setAnimationDone(true);
    }
  };
  const withAnimationDelay = route !== Route.HOME && !animationDone;
  const shouldDisplay =
    isWindowLoaded && (route !== Route.HOME || isPastHeroSection);

  useEffect(() => {
    const onScroll = () => {
      setIsPastHeroSection(window.pageYOffset >= window.innerHeight);
    };

    Window.on('scroll', onScroll);

    return () => {
      Window.off('scroll', onScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Link href={Route.HOME}>
      <a
        className={cn(
          'group fixed top-3.5 left-3.5 z-50 flex shadow-3xl border border-white bg-gray-750 bg-opacity-90 p-1.5',
          'transform transition ease-in-out duration-500 hover:shadow-md hover:bg-opacity-100',
          'sm:top-4 sm:left-4',
          'md:top-6 md:left-7 md:border-2',
          'xl:top-5 xl:left-9 xl:p-2',
          {
            ['delay-700']: withAnimationDelay,
            ['opacity-0 -translate-y-full']: !shouldDisplay,
          }
        )}
        onClick={closeMenu}
        onTransitionEnd={onTransitionEnd}
        data-testid="logo"
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
    </Link>
  );
}

function ThemeButtonContainer() {
  const { isDarkModeReady, isDarkModeEnabled, toggleDarkMode } =
    useDarkModeEnabled();

  return isDarkModeReady ? (
    <ThemeButton
      isDarkModeEnabled={isDarkModeEnabled}
      toggleDarkMode={toggleDarkMode}
    />
  ) : null;
}

function ThemeButton({
  isDarkModeEnabled,
  toggleDarkMode,
}: {
  isDarkModeEnabled: boolean;
  toggleDarkMode: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isBtnClickedRef = useRef(false);
  const shouldDisplay = useWindowLoaded();
  const [animationDone, setAnimationDone] = useState(false);
  const Icon = !isDarkModeEnabled ? SvgSun : SvgMoon;
  const iconStyle = !isDarkModeEnabled
    ? 'w-6 h-6 md:w-8 md:h-8'
    : 'w-5 h-5 my-0.5 md:w-7 md:h-7';
  const text = !isDarkModeEnabled ? 'Light' : 'Dark';
  const onTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName === 'opacity') {
      setAnimationDone(true);
    }
  };
  const btnOnMouseLeave = () => {
    if (!getRefValue(isBtnClickedRef)) {
      trackEvent({
        event: GoogleAnalyticsEvents.THEME_BTN_HOVER,
        hoverText: text,
      });
    }
  };
  const btnOnClick = () => {
    isBtnClickedRef.current = true;
    setAnimationDone(true); // in case it was clicked during initial transitioning
    toggleDarkMode();
    trackEvent({
      event: GoogleAnalyticsEvents.THEME_BTN_CLICK,
      linkText: text,
    });
  };

  return (
    <button
      className={cn(
        'group fixed top-3 right-16 z-50 min-w-16 pt-2 pb-2 px-4 text-gray-400',
        'dark:text-gray-300',
        'transition-colors hover:text-gray-500',
        'dark:hover:text-gray-100',
        'sm:top-3',
        'md:top-6 md:right-20 md:min-w-16.5',
        'lg:right-24 lg:min-w-18',
        'xl:top-7 xl:right-24'
      )}
      onMouseLeave={btnOnMouseLeave}
      onClick={btnOnClick}
      tabIndex={2}
    >
      <SwitchTransition>
        <Transition key={text} nodeRef={containerRef} timeout={100}>
          {(state) => (
            <div ref={containerRef} className="flex items-center flex-col">
              <div className={cn(iconStyle, 'relative')}>
                <Icon
                  className={cn(
                    'absolute inset-0 m-auto',
                    'transform transition-transform-opacity-color',
                    !animationDone
                      ? {
                          'duration-700 delay-500': true,
                          [shouldDisplay
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-2']: true,
                        }
                      : {
                          'duration-150': true,
                          [state === 'entered'
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-2']: true,
                        }
                  )}
                />
              </div>
              <div
                className={cn(
                  'mt-1 text-3xs font-normal uppercase select-none',
                  'transform transition-transform-opacity-color',
                  'md:text-2xs',
                  'xl:text-xs',
                  !animationDone
                    ? {
                        'duration-700 delay-700': true,
                        [shouldDisplay
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 -translate-y-3']: true,
                      }
                    : {
                        'duration-150': true,
                        [state === 'entered'
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 -translate-y-3']: true,
                      }
                )}
                onTransitionEnd={!animationDone ? onTransitionEnd : undefined}
              >
                {text}
              </div>
            </div>
          )}
        </Transition>
      </SwitchTransition>
    </button>
  );
}

function MenuButton({
  isMenuOpen,
  toggleMenu,
}: {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}) {
  const textRef = useRef<HTMLDivElement>(null);
  const isBtnClickedRef = useRef(false);
  const stacks = Array.from(Array(3).keys());
  const shouldDisplay = useWindowLoaded();
  const [animationDone, setAnimationDone] = useState(false);
  const text = !isMenuOpen ? 'Menu' : 'Close';
  const onTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName === 'opacity') {
      setAnimationDone(true);
    }
  };
  const btnOnMouseLeave = () => {
    if (!getRefValue(isBtnClickedRef)) {
      trackEvent({
        event: GoogleAnalyticsEvents.HEADER_BTN_HOVER,
        hoverText: text,
      });
    }
  };
  const btnOnClick = () => {
    isBtnClickedRef.current = true;
    setAnimationDone(true); // in case it was clicked during initial transitioning
    toggleMenu();
    trackEvent({
      event: GoogleAnalyticsEvents.HEADER_BTN_CLICK,
      linkText: text,
    });
  };

  return (
    <button
      className={cn(
        'group fixed top-3 right-1 z-50 flex items-center flex-col rounded pt-3 pb-2 px-4',
        'sm:top-3 sm:right-2',
        'md:top-6 md:right-4',
        'lg:right-6',
        'xl:top-7'
      )}
      onMouseLeave={btnOnMouseLeave}
      onClick={btnOnClick}
      tabIndex={1}
    >
      {stacks.map((stack) => {
        const isTop = stack === 0;
        const isMid = stack === 1;
        const isBottom = stack === 2;

        return (
          <div
            key={stack}
            className={cn(
              'w-6 h-0.5 bg-gray-400 rounded',
              'dark:bg-gray-300',
              'transform transition group-hover:bg-gray-500',
              'dark:group-hover:bg-white',
              'md:w-7 md:h-1',
              'xl:w-8',
              { 'mt-1.5': !isTop },
              !animationDone
                ? {
                    'duration-1000': true,
                    'opacity-0': !shouldDisplay,
                    'translate-x-1/2': (isTop || isBottom) && !shouldDisplay,
                    '-translate-x-1/2': isMid && !shouldDisplay,
                  }
                : {
                    'duration-300': true,
                    'translate-y-2 -rotate-45 md:translate-y-3':
                      isTop && isMenuOpen,
                    '-translate-y-2 rotate-45': isBottom && isMenuOpen,
                    'translate-x-7 opacity-0': isMid && isMenuOpen,
                  }
            )}
            style={
              !animationDone
                ? {
                    transitionDelay: `${stack * 150 + 500}ms`,
                  }
                : undefined
            }
            data-testid="menu-stack"
          />
        );
      })}
      <SwitchTransition>
        <Transition key={text} nodeRef={textRef} timeout={100}>
          {(state) => (
            <div
              ref={textRef}
              className={cn(
                'mt-1.5 text-gray-400 text-3xs font-normal uppercase select-none',
                'dark:text-gray-300',
                'transform transition-transform-opacity-color group-hover:text-gray-500',
                'dark:group-hover:text-gray-100',
                'md:mt-2 md:text-2xs',
                'xl:text-xs',
                !animationDone
                  ? {
                      'duration-700 delay-1000': true,
                      [shouldDisplay
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 -translate-y-3']: true,
                    }
                  : {
                      'duration-150': true,
                      [state === 'entered'
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 -translate-y-3']: true,
                    }
              )}
              onTransitionEnd={!animationDone ? onTransitionEnd : undefined}
            >
              {text}
            </div>
          )}
        </Transition>
      </SwitchTransition>
    </button>
  );
}

function MenuBackground({ isMenuOpen }: { isMenuOpen: boolean }) {
  return (
    <div
      className={cn(
        'fixed top-0 right-0 z-30 w-full h-full bg-gray-750',
        'transition-opacity duration-500',
        {
          ['opacity-0 pointer-events-none delay-100']: !isMenuOpen,
        }
      )}
      data-testid="menu-background"
    />
  );
}

function MenuItems({
  isMenuOpen,
  closeMenu,
}: {
  isMenuOpen: boolean;
  closeMenu: () => void;
}) {
  return (
    <ul>
      {MENU_ITEMS.map((item, idx) => (
        <li
          key={idx}
          className={cn(
            'flex mb-8',
            'transform',
            'sm:mb-10',
            'md:mb-12',
            'xl:mb-14',
            {
              [!isMenuOpen
                ? 'opacity-0 transition-transform translate-x-1/3 duration-300'
                : 'opacity-100 transition translate-x-0 duration-700']: true,
            }
          )}
          style={
            isMenuOpen
              ? { transitionDelay: `${(idx + 1) * 75 + 100}ms` }
              : undefined
          }
        >
          <Link href={item.path}>
            <a
              className={cn(
                'group relative pb-2 text-3xl text-gray-300 select-none',
                'transition-colors duration-300 hover:text-white focus:text-white',
                'sm:text-4xl',
                'md:pb-3 md:text-5xl',
                'xl:pb-4 xl:text-6xl'
              )}
              onClick={closeMenu}
            >
              {item.title}
              <div className="absolute bottom-0 right-0 w-full h-px bg-white bg-opacity-20 z-0 pointer-events-none" />
              <div
                className={cn(
                  'absolute bottom-0 right-0 z-10 w-0 h-px bg-white pointer-events-none',
                  'transition-width duration-300 group-hover:right-auto group-hover:left-0 group-hover:w-full'
                )}
              />
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function SocialItems({ isMenuOpen }: { isMenuOpen: boolean }) {
  return (
    <ul
      className={cn(
        'flex mt-10 transform -translate-x-4',
        'sm:-translate-x-5',
        'md:-translate-x-6',
        'lg:hidden'
      )}
    >
      {SOCIAL_LINKS.map((social, idx) => (
        <SocialItem
          key={idx}
          idx={idx}
          social={social}
          isMenuOpen={isMenuOpen}
        />
      ))}
    </ul>
  );
}

function SocialItem({
  idx,
  social,
  isMenuOpen,
}: {
  idx: number;
  social: Social;
  isMenuOpen: boolean;
}) {
  const isBtnClickedRef = useRef(false);
  const [isUrlCopied, setIsUrlCopied] = useState(false);
  const tipContainerRef = useRef<HTMLDivElement>(null);
  const onMouseLeave = () => {
    setIsUrlCopied(false);

    if (!getRefValue(isBtnClickedRef)) {
      trackEvent({
        event: GoogleAnalyticsEvents.SOCIAL_HOVER,
        hoverText: social.title,
        hoverUrl: social.url,
        socialName: social.name,
      });
    }
  };
  const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    isBtnClickedRef.current = true;

    trackEvent({
      event: GoogleAnalyticsEvents.SOCIAL_CLICK,
      linkText: social.title,
      linkUrl: social.url,
      socialName: social.name,
    });

    if (!social.shouldCopyOnClick) {
      return;
    }

    const textToCopy = social.url.replace('mailto:', '');
    const copied = copyTextToClipboard(textToCopy);

    if (!copied) {
      return;
    }

    e.preventDefault();
    setIsUrlCopied(true);
  };

  return (
    <li
      key={social.name}
      className={cn('transform', {
        [!isMenuOpen
          ? 'opacity-0 transition-transform translate-y-1/2 duration-300'
          : 'opacity-100 transition translate-y-0 duration-500']: true,
      })}
      style={
        isMenuOpen
          ? { transitionDelay: `${(idx + 1) * 75 + 300}ms` }
          : undefined
      }
    >
      <AnchorLink
        href={social.url}
        title={social.title}
        className={cn('flex items-center p-3.5', 'sm:p-5', 'md:p-6')}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        isExternal
      >
        {social.icon({
          className: cn(
            'w-8 h-8 text-gray-300',
            'transition-colors hover:text-white focus:text-white',
            'sm:w-10 sm:h-10',
            'md:w-11 md:h-11'
          ),
        })}
        <Transition
          in={isUrlCopied}
          nodeRef={tipContainerRef}
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          {(state) => (
            <div ref={tipContainerRef}>
              <Tooltip show={state === 'entered'}>Copied!</Tooltip>
            </div>
          )}
        </Transition>
      </AnchorLink>
    </li>
  );
}
