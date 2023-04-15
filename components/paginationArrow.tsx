import React from 'react';
import cn from 'classnames';
import SvgChevronLeft from './svgChevronLeft';
import SvgChevronRight from './svgChevronRight';
import NextLink from './nextLink';

export type Props = {
  isPrevious?: boolean;
  href?: string;
};

export default function PaginationArrow({ isPrevious, href }: Props) {
  const withHref = typeof href === 'string';
  const className = cn(
    'group inline-flex py-3 px-3',
    'sm:px-4',
    'md:py-4 md:px-5'
  );
  const iconClassName = cn(
    'w-2 h-2 opacity-60',
    'sm:w-2.5 sm:h-2.5',
    'md:w-3 md:h-3',
    'xl:w-3.5 xl:h-3.5',
    withHref
      ? cn(
          'transition transform duration-300',
          'motion-reduce:transition-none',
          'group-hover:opacity-100',
          isPrevious
            ? 'group-hover:-translate-x-1.5'
            : 'group-hover:translate-x-1.5'
        )
      : undefined
  );
  const icon = isPrevious ? (
    <>
      <span className="sr-only">Previous</span>
      <SvgChevronLeft className={iconClassName} />
    </>
  ) : (
    <>
      <span className="sr-only">Next</span>
      <SvgChevronRight className={iconClassName} />
    </>
  );
  let body;

  if (!withHref) {
    body = <span className={cn(className, 'opacity-40')}>{icon}</span>;
  } else {
    body = (
      <NextLink href={href} passHref>
        <a className={className}>{icon}</a>
      </NextLink>
    );
  }

  return <li>{body}</li>;
}
