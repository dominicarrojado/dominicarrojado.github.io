import cn from 'classnames';
import { HTMLProps } from 'react';
import SvgChevronLeft from './svgChevronLeft';
import SvgChevronRight from './svgChevronRight';
import NextLink from './nextLink';

export type Props = HTMLProps<HTMLAnchorElement> & {
  href: string;
  title: string;
  isPrevious?: boolean;
};

export default function PostLink({ title, href, isPrevious, ...props }: Props) {
  const Icon = isPrevious ? SvgChevronLeft : SvgChevronRight;

  return (
    <NextLink href={href} passHref>
      <a
        className={cn('group relative', {
          [isPrevious ? 'pr-2' : 'pl-2']: true,
        })}
        {...props}
      >
        <div className={cn({ 'text-right': !isPrevious })}>
          <div
            className={cn(
              'font-normal',
              'transition-colors duration-300 group-hover:text-black',
              'motion-reduce:transition-none',
              'dark:group-hover:text-white'
            )}
          >
            {title}
          </div>
          <small
            className={cn(
              'text-gray-400',
              'transition-colors duration-300 group-hover:text-black',
              'motion-reduce:transition-none',
              'dark:group-hover:text-white'
            )}
          >
            {isPrevious ? 'Previous Post' : 'Next Post'}
          </small>
        </div>
        <Icon
          className={cn(
            'absolute top-0 bottom-0 m-auto shrink-0 w-2 h-2 text-black opacity-30',
            'dark:text-white',
            'transform transition-transform-opacity duration-300 group-hover:opacity-100',
            'motion-reduce:transition-none',
            'sm:w-2.5 sm:h-2.5',
            'md:w-3 md:h-3',
            'xl:w-3.5 xl:h-3.5',
            {
              [isPrevious
                ? '-left-5 sm:-left-7 xl:-left-8 group-hover:-translate-x-1.5'
                : '-right-5 sm:-right-7 xl:-right-8 group-hover:translate-x-1.5']:
                true,
            }
          )}
        />
      </a>
    </NextLink>
  );
}
