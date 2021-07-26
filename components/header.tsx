import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { SwitchTransition, Transition } from 'react-transition-group';
import { MENU_ITEMS, SOCIAL_LINKS } from '../lib/constants';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((isOpen) => !isOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className={cn('fixed top-4 right-4 z-50', 'md:top-5 md:right-6')}>
        <Button isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </header>
      <MenuBackground shouldDisplay={isMenuOpen} />
      <div
        className={cn('fixed inset-0 z-40 overflow-y-auto overflow-x-hidden', {
          'w-0 h-0 pointer-events-none': !isMenuOpen,
        })}
        data-testid="menu-container"
      >
        <div className="flex justify-center items-center min-h-full">
          <div
            className={cn(
              'py-10 transform',
              'sm:-translate-x-12',
              'md:-translate-x-1/2'
            )}
          >
            <MenuItems shouldDisplay={isMenuOpen} closeMenu={closeMenu} />
            <Social shouldDisplay={isMenuOpen} />
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
  const stacks = useMemo(() => ['top', 'middle', 'bottom'], []);

  return (
    <button
      className={cn(
        'group relative flex items-center flex-col rounded pt-3 pb-2 px-4 outline-none'
      )}
      onClick={toggleMenu}
    >
      {stacks.map((stack) => {
        const isTop = stack === 'top';
        const isMid = stack === 'middle';
        const isBottom = stack === 'bottom';

        return (
          <div
            key={stack}
            className={cn(
              'w-6 h-0.5 bg-gray-300 rounded',
              'transform transition duration-500',
              'group-hover:bg-gray-400',
              'md:w-7 md:h-1',
              'xl:w-8',
              {
                'mt-1.5': !isTop,
                'translate-y-2 -rotate-45 md:translate-y-3':
                  isTop && isMenuOpen,
                '-translate-y-2 rotate-45': isBottom && isMenuOpen,
                'translate-x-7 opacity-0': isMid && isMenuOpen,
              }
            )}
          />
        );
      })}
      <SwitchTransition>
        <Transition key={isMenuOpen as any} nodeRef={textRef} timeout={100}>
          {(state) => (
            <div
              ref={textRef}
              className={cn(
                'mt-1.5 text-gray-300 text-3xs font-normal uppercase',
                'transform transition-all',
                'group-hover:text-gray-400',
                'md:mt-2 md:text-2xs',
                'xl:text-xs',
                {
                  [state === 'entered'
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-3']: true,
                }
              )}
            >
              {!isMenuOpen ? 'Menu' : 'Close'}
            </div>
          )}
        </Transition>
      </SwitchTransition>
    </button>
  );
}

function MenuBackground({ shouldDisplay }: { shouldDisplay: boolean }) {
  return (
    <div
      className={cn(
        'fixed top-0 right-0 w-full h-full bg-gray-1000 z-30',
        'transition-all duration-500',
        {
          ['opacity-0 pointer-events-none']: !shouldDisplay,
        }
      )}
      data-testid="menu-background"
    />
  );
}

function MenuItems({
  shouldDisplay,
  closeMenu,
}: {
  shouldDisplay: boolean;
  closeMenu: () => void;
}) {
  return (
    <ul>
      {MENU_ITEMS.map((item, idx) => (
        <li
          key={idx}
          className={cn(
            'block mb-9',
            'transform',
            'sm:mb-12',
            'md:mb-14',
            'xl:mb-16',
            {
              [!shouldDisplay
                ? 'opacity-0 transition-transform translate-x-1/3 duration-300'
                : 'opacity-100 transition translate-x-0 duration-700']: true,
            }
          )}
          style={
            shouldDisplay
              ? { transitionDelay: `${(idx + 1) * 75 + 100}ms` }
              : undefined
          }
        >
          <Link href={item.path}>
            <a
              className={cn(
                'group relative pb-2 text-3xl text-gray-300 outline-none',
                'transition-colors hover:text-white',
                'sm:text-4xl',
                'md:text-5xl',
                'xl:text-6xl'
              )}
              onClick={closeMenu}
            >
              {item.title}
              <div className="absolute bottom-0 left-0 w-full border-b-2 border-gray-600 z-0" />
              <div
                className={cn(
                  'absolute bottom-0 left-0 w-0 border-b-2 border-white z-10',
                  'transition-all group-hover:w-full'
                )}
              />
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Social({ shouldDisplay }: { shouldDisplay: boolean }) {
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
            [!shouldDisplay
              ? 'opacity-0 transition-transform translate-y-1/2 duration-300'
              : 'opacity-100 transition translate-y-0 duration-500']: true,
          })}
          style={
            shouldDisplay
              ? { transitionDelay: `${(idx + 1) * 75 + 300}ms` }
              : undefined
          }
        >
          <a
            href={social.url}
            title={social.title}
            rel="noopener noreferrer nofollow"
            target="_blank"
            className={cn(
              'flex items-center p-4 outline-none',
              'sm:p-5',
              'md:p-6'
            )}
          >
            {social.icon({
              className: cn(
                'w-9 h-9 text-gray-300',
                'transition-colors hover:text-white',
                'sm:w-10 sm:h-10',
                'md:w-11 md:h-11'
              ),
            })}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default Header;
