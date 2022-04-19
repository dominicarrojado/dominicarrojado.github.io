import { TransitionEvent, useEffect, useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import cn from 'classnames';
import { SwitchTransition } from 'react-transition-group';
import {
  useDialogState,
  Dialog,
  DialogBackdrop,
  DialogDisclosure,
  DialogStateReturn,
} from 'reakit/Dialog';
import { Button } from 'reakit/Button';
import { Checkbox } from 'reakit/Checkbox';
import Window from '../modules/Window';
import { getRefValue } from '../lib/hooks';
import { useDarkModeEnabled, useWindowLoaded } from '../lib/custom-hooks';
import { trackEvent } from '../lib/google-analytics';
import SvgLogo from './svgLogo';
import SvgSun from './svgSun';
import SvgMoon from './svgMoon';
import AnchorLink from './anchorLink';
import Transition from './transition';
import HeaderSocialItems from './socialItems';
import { GoogleAnalyticsEvents, Route, Social } from '../lib/types';
import {
  MAIN_ELEMENT_ID,
  MENU_ITEMS,
  MENU_ITEMS_LENGTH,
  SOCIAL_LINKS,
} from '../lib/constants';

export default function Header({ route }: { route: Route }) {
  const dialog = useDialogState({
    baseId: 'dialog-menu',
    animated: MENU_ITEMS_LENGTH * 75 + 100,
  });
  const dialogVisible = dialog.visible;
  const commonStyle = useMemo(() => {
    if (!dialogVisible) {
      return undefined;
    }

    const bodyEl = document.body;
    const scrollBarWidth = window.innerWidth - bodyEl.offsetWidth;

    return {
      paddingRight: scrollBarWidth,
    };
  }, [dialogVisible]);

  return (
    <>
      <ProgressBar />
      <header>
        <SkipToMainContentAnchor />
        <Logo route={route} closeMenu={dialog.hide} />
        <div
          className={cn(
            'fixed flex items-end top-3 right-1 z-50',
            'sm:right-2',
            'md:top-6 md:right-4',
            'xl:top-7'
          )}
          style={commonStyle}
          data-testid="header-buttons"
        >
          <ThemeButtonContainer />
          <MenuButton dialog={dialog} />
        </div>
        <div
          className="hidden lg:block lg:fixed lg:bottom-3 lg:right-7 lg:z-40"
          style={commonStyle}
          data-testid="header-social"
        >
          <HeaderSocialItems className="lg:mt-0" />
        </div>
      </header>
      <MenuContainer dialog={dialog} />
    </>
  );
}

function ProgressBar() {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isChanging, setIsChanging] = useState(false);
  const onChangeStart = () => setIsChanging(true);
  const onChangeEnd = () => setIsChanging(false);

  useEffect(() => {
    const routerEvents = Router.events;

    routerEvents.on('routeChangeStart', onChangeStart);
    routerEvents.on('routeChangeComplete', onChangeEnd);
    routerEvents.on('routeChangeError', onChangeEnd);

    return () => {
      routerEvents.off('routeChangeStart', onChangeStart);
      routerEvents.off('routeChangeComplete', onChangeEnd);
      routerEvents.off('routeChangeError', onChangeEnd);
    };
  }, []);

  return (
    <Transition
      in={isChanging}
      nodeRef={progressBarRef}
      timeout={300}
      mountOnEnter
      unmountOnExit
    >
      {(state) => (
        <div
          ref={progressBarRef}
          className={cn(
            'fixed top-0 left-0 flex w-full h-1.5 overflow-hidden z-50',
            'transition-transform duration-300',
            state === 'entered' ? 'translate-y-0' : '-translate-y-2'
          )}
        >
          <div
            className={cn(
              'w-full flex flex-col justify-center overflow-hidden bg-gray-600',
              'bg-[length:1rem_1rem]',
              'animate-stripes'
            )}
            style={{
              backgroundImage:
                'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)',
            }}
            role="progressbar"
          />
        </div>
      )}
    </Transition>
  );
}

function SkipToMainContentAnchor() {
  return (
    <a
      href={`#${MAIN_ELEMENT_ID}`}
      tabIndex={0}
      className={cn(
        'absolute -top-96 -left-96 w-px h-px text-center text-white overflow-hidden -z-50',
        'focus:top-4 focus:inset-x-0 focus:m-auto focus:w-44 focus:h-auto focus:z-50',
        'focus:sm:w-52',
        'focus:xl:w-56'
      )}
    >
      Skip to main content
    </a>
  );
}

function Logo({ route, closeMenu }: { route: string; closeMenu: () => void }) {
  const isWindowLoaded = useWindowLoaded();
  const [animationDone, setAnimationDone] = useState(false);
  const [isLogoFocused, setIsLogoFocused] = useState(false);
  const [isPastHeroSection, setIsPastHeroSection] = useState(false);
  const onClick = () => {
    setIsLogoFocused(false);
    closeMenu();
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
    isWindowLoaded &&
    (route !== Route.HOME || isPastHeroSection || isLogoFocused);

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
          'md:top-6 md:left-8 md:border-2',
          'xl:left-9 xl:p-2',
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
    <Checkbox
      as={Button}
      checked={isDarkModeEnabled}
      className={cn(
        'group min-w-11.5 pt-2 pb-2 px-2 text-gray-400 outline-none',
        'dark:text-gray-300',
        'hover:text-gray-500 focus-visible:text-gray-500',
        'dark:hover:text-white dark:focus-visible:text-white',
        'md:min-w-15 md:px-3',
        'lg:min-w-18'
      )}
      aria-label="Switch between dark and light mode"
      onChange={btnOnClick}
      onMouseLeave={btnOnMouseLeave}
    >
      <SwitchTransition>
        <Transition key={text} nodeRef={containerRef} timeout={100}>
          {(state) => (
            <div ref={containerRef} className="flex items-center flex-col">
              <div
                className={cn(
                  iconStyle,
                  'relative',
                  'transform transition-transform-opacity-color',
                  !animationDone
                    ? {
                        'duration-700 delay-700': true,
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
              >
                <Icon className="absolute inset-0 m-auto" />
              </div>
              <div
                className={cn(
                  'mt-1 text-3xs font-normal uppercase select-none',
                  'transform transition-transform-opacity-color',
                  'md:text-2xs',
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
            </div>
          )}
        </Transition>
      </SwitchTransition>
    </Checkbox>
  );
}

function MenuButton({ dialog }: { dialog: DialogStateReturn }) {
  const isMenuOpen = dialog.visible;
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
    trackEvent({
      event: GoogleAnalyticsEvents.HEADER_BTN_CLICK,
      linkText: text,
    });
  };

  return (
    <DialogDisclosure
      state={dialog}
      className={cn(
        'group flex items-center flex-col min-w-12 pt-3 pb-2 px-2 outline-none',
        'md:min-w-15.5 md:px-3',
        'xl:min-w-18.5'
      )}
      onMouseLeave={btnOnMouseLeave}
      onClick={btnOnClick}
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
              'transform transition group-hover:bg-gray-500 group-focus-visible:bg-gray-500',
              'dark:group-hover:bg-white dark:group-focus-visible:bg-white',
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
    </DialogDisclosure>
  );
}

function MenuContainer({ dialog }: { dialog: DialogStateReturn }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Transition in={dialog.visible} nodeRef={containerRef} timeout={100}>
      {(state) => {
        const shouldDisplay = state === 'entered';

        return (
          <DialogBackdrop
            {...dialog}
            className={cn(
              'fixed top-0 right-0 z-30 w-full h-full bg-gray-750',
              'transition-opacity duration-500',
              {
                ['opacity-0 pointer-events-none delay-100']: !shouldDisplay,
              }
            )}
            data-testid="menu-background"
          >
            <Dialog
              {...dialog}
              ref={containerRef}
              className={cn(
                'fixed inset-0 z-40 overflow-y-auto overflow-x-hidden',
                {
                  'w-0 h-0 pointer-events-none': !shouldDisplay,
                }
              )}
              hideOnClickOutside={false}
              aria-label="Menu"
              data-testid="menu-container"
            >
              <div className="flex justify-center items-center min-h-full">
                <div className={cn('py-10 pl-8', 'sm:pl-0')}>
                  <MenuItems
                    isMenuOpen={shouldDisplay}
                    closeMenu={dialog.hide}
                  />
                  <SocialItems isMenuOpen={shouldDisplay} />
                </div>
              </div>
            </Dialog>
          </DialogBackdrop>
        );
      }}
    </Transition>
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
                'group relative pb-2 text-3xl text-gray-300 select-none outline-none',
                'transition-colors duration-300 hover:text-white focus-visible:text-white',
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
                  'transition-width duration-300 group-hover:right-auto group-hover:left-0 group-hover:w-full',
                  'group-focus-visible:right-auto group-focus-visible:left-0 group-focus-visible:w-full'
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
  const onMouseLeave = () => {
    if (!getRefValue(isBtnClickedRef)) {
      trackEvent({
        event: GoogleAnalyticsEvents.SOCIAL_HOVER,
        hoverText: social.title,
        hoverUrl: social.url,
        socialName: social.name,
      });
    }
  };
  const onClick = () => {
    isBtnClickedRef.current = true;

    trackEvent({
      event: GoogleAnalyticsEvents.SOCIAL_CLICK,
      linkText: social.title,
      linkUrl: social.url,
      socialName: social.name,
    });
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
        className={cn(
          'group flex items-center p-3.5 outline-none',
          'sm:p-5',
          'md:p-6'
        )}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        isExternal
      >
        {social.icon({
          className: cn(
            'w-8 h-8 text-gray-300',
            'transition-colors group-hover:text-white group-focus-visible:text-white',
            'sm:w-10 sm:h-10',
            'md:w-11 md:h-11'
          ),
        })}
      </AnchorLink>
    </li>
  );
}
