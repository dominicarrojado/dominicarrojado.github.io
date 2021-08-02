import { MutableRefObject, TransitionEvent, useRef, useState } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { SwitchTransition, Transition } from 'react-transition-group';
import { getRefValue } from '../lib/hooks';
import { useWindowLoaded } from '../lib/custom-hooks';
import { copyTextToClipboard } from '../lib/dom';
import { trackEvent } from '../lib/google-analytics';
import Tooltip from './tooltip';
import { GoogleAnalyticsEvents, Social } from '../lib/types';
import {
  EXTERNAL_LINK_ATTRIBUTES,
  MENU_ITEMS,
  SOCIAL_LINKS,
} from '../lib/constants';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((isOpen) => !isOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className={cn('fixed top-4 right-4 z-50', 'md:top-5 md:right-6')}>
        <Button isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </header>
      <MenuBackground isMenuOpen={isMenuOpen} />
      <div
        className={cn('fixed inset-0 z-40 overflow-y-auto overflow-x-hidden', {
          'w-0 h-0 pointer-events-none': !isMenuOpen,
        })}
        data-testid="menu-container"
      >
        <div className="flex justify-center items-center min-h-full">
          <div className="py-10">
            <MenuItems isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
            <SocialItems isMenuOpen={isMenuOpen} />
          </div>
        </div>
      </div>
    </>
  );
}

function Button({
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
    toggleMenu();
    trackEvent({
      event: GoogleAnalyticsEvents.HEADER_BTN_CLICK,
      linkText: text,
    });
  };

  return (
    <button
      className={cn(
        'group relative flex items-center flex-col rounded pt-3 pb-2 px-4',
        {
          'pointer-events-none': !animationDone,
        }
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
              'transform transition',
              'group-hover:bg-gray-500',
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
                'transform transition-transform-opacity-color',
                'group-hover:text-gray-500',
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
        'fixed top-0 right-0 w-full h-full bg-gray-1000 z-30',
        'transition-opacity duration-500',
        {
          ['opacity-0 pointer-events-none']: !isMenuOpen,
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
              <div className="absolute bottom-0 left-0 w-full h-px bg-white bg-opacity-20 z-0" />
              <div
                className={cn(
                  'absolute bottom-0 left-0 w-0 h-px bg-white z-10',
                  'transition-width duration-300 group-hover:w-full'
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
  const isBtnClickedRef: MutableRefObject<Record<string, boolean>> = useRef({});
  const [copiedItem, setCopiedItem] = useState('');
  const socialOnMouseLeave = (social: Social) => {
    setCopiedItem('');

    const socialName = social.name;

    if (!getRefValue(isBtnClickedRef)[socialName]) {
      trackEvent({
        socialName,
        event: GoogleAnalyticsEvents.SOCIAL_HOVER,
        hoverText: social.title,
        hoverUrl: social.url,
      });
    }
  };
  const socialOnClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    social: Social
  ) => {
    const socialName = social.name;

    isBtnClickedRef.current[socialName] = true;

    trackEvent({
      socialName,
      event: GoogleAnalyticsEvents.SOCIAL_CLICK,
      linkText: social.title,
      linkUrl: social.url,
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
    setCopiedItem(social.name);
  };

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
          <a
            href={social.url}
            title={social.title}
            {...EXTERNAL_LINK_ATTRIBUTES}
            className={cn('flex items-center p-4', 'sm:p-5', 'md:p-6')}
            onMouseLeave={() => socialOnMouseLeave(social)}
            onClick={(e) => socialOnClick(e, social)}
          >
            {social.icon({
              className: cn(
                'w-9 h-9 text-gray-300',
                'transition-colors hover:text-white focus:text-white',
                'sm:w-10 sm:h-10',
                'md:w-11 md:h-11'
              ),
            })}
            <Transition
              in={social.name === copiedItem}
              timeout={300}
              mountOnEnter
              unmountOnExit
            >
              {(state) => <Tooltip show={state === 'entered'}>Copied!</Tooltip>}
            </Transition>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default Header;
