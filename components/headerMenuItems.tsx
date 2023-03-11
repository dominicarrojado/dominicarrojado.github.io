import cn from 'classnames';
import NextLink from './nextLink';
import { MENU_ITEMS } from '../lib/constants';

export default function HeaderMenuItems({
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
            'motion-reduce:transition-none',
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
          <NextLink href={item.path}>
            <a
              className={cn(
                'group relative pb-2 text-3xl text-gray-300 select-none outline-none',
                'transition-colors duration-300 hover:text-white focus-visible:text-white',
                'motion-reduce:transition-none',
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
                  'motion-reduce:transition-none',
                  'group-focus-visible:right-auto group-focus-visible:left-0 group-focus-visible:w-full'
                )}
              />
            </a>
          </NextLink>
        </li>
      ))}
    </ul>
  );
}
