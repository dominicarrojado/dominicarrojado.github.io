import cn from 'classnames';
import NextLink from './nextLink';
import { MENU_ITEMS } from '../lib/constants';

export type Props = {
  shouldDisplay: boolean;
  closeMenu: () => void;
};

export default function HeaderMenuItems({ shouldDisplay, closeMenu }: Props) {
  return (
    <ul>
      {MENU_ITEMS.map((item, idx) => (
        <li
          key={idx}
          className={cn(
            'mb-8 flex',
            'transform',
            'motion-reduce:transition-none',
            'sm:mb-10',
            'xl:mb-12',
            {
              [!shouldDisplay
                ? 'translate-x-1/3 opacity-0 transition-transform duration-300'
                : 'translate-x-0 opacity-100 transition duration-700']: true,
            }
          )}
          style={
            shouldDisplay
              ? { transitionDelay: `${(idx + 1) * 75 + 100}ms` }
              : undefined
          }
        >
          <NextLink href={item.path}>
            <a
              className={cn(
                'group relative select-none pb-2 text-3xl text-gray-300 outline-none',
                'transition-colors duration-300 hover:text-white focus-visible:text-white',
                'motion-reduce:transition-none',
                'sm:text-4xl',
                'md:pb-3 md:text-5xl',
                'xl:pb-4 xl:text-6xl'
              )}
              onClick={closeMenu}
            >
              {item.title}
              <div className="pointer-events-none absolute bottom-0 right-0 z-0 h-px w-full bg-white bg-opacity-20" />
              <div
                className={cn(
                  'pointer-events-none absolute bottom-0 right-0 z-10 h-px w-0 bg-white',
                  'transition-width duration-300 group-hover:left-0 group-hover:right-auto group-hover:w-full',
                  'motion-reduce:transition-none',
                  'group-focus-visible:left-0 group-focus-visible:right-auto group-focus-visible:w-full'
                )}
              />
            </a>
          </NextLink>
        </li>
      ))}
    </ul>
  );
}
