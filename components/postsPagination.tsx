import Link from 'next/link';
import React, { ReactNode } from 'react';
import cn from 'classnames';
import { getPagination } from '../lib/common';
import { useMounted } from '../lib/custom-hooks';
import AnchorLink from './anchorLink';
import SvgChevronLeft from './svgChevronLeft';
import SvgChevronRight from './svgChevronRight';
import { Route } from '../lib/types';

export type Props = {
  currentPage: number;
  lastPage: number;
};

export default function PostsPagination({ currentPage, lastPage }: Props) {
  const shouldDisplay = useMounted();
  const paginationItems = getPagination(currentPage, lastPage);

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        'transform transition-transform-opacity duration-700 delay-2250',
        'motion-reduce:transition-none',
        {
          'opacity-0 translate-y-10': !shouldDisplay,
        }
      )}
    >
      <ul
        className={cn(
          'flex items-center justify-center gap-0 mt-8 cursor-default',
          'sm:mt-12 sm:gap-2',
          'md:mt-16',
          'xl:mt-20'
        )}
      >
        <PaginationArrow
          href={
            currentPage !== 1
              ? `${Route.POSTS_PAGE}/${currentPage - 1}`
              : undefined
          }
          isPrevious
        />
        {paginationItems.map((pageNumber, idx) => {
          const isNumber = !isNaN(pageNumber);

          return (
            <li key={idx}>
              <PaginationItem
                href={
                  isNumber ? `${Route.POSTS_PAGE}/${pageNumber}` : undefined
                }
                isCurrent={currentPage === pageNumber}
              >
                {isNumber ? pageNumber : '...'}
              </PaginationItem>
            </li>
          );
        })}
        <PaginationArrow
          href={
            currentPage < lastPage
              ? `${Route.POSTS_PAGE}/${currentPage + 1}`
              : undefined
          }
        />
      </ul>
    </nav>
  );
}

function PaginationArrow({
  isPrevious,
  href,
}: {
  isPrevious?: boolean;
  href?: string;
}) {
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
      <Link href={href} passHref>
        <a className={className}>{icon}</a>
      </Link>
    );
  }

  return <li>{body}</li>;
}

function PaginationItem({
  children,
  href,
  isCurrent,
}: {
  children: ReactNode;
  isCurrent?: boolean;
  href?: string;
}) {
  const className = cn(
    'group py-2 px-3',
    'sm:px-4',
    'md:py-3 md:px-5',
    isCurrent
      ? 'text-gray-900 pointer-events-none text-gray-700 bg-gray-100 shadow-md dark:text-white dark:bg-gray-750'
      : 'opacity-75'
  );

  if (!href) {
    return <span className={className}>{children}</span>;
  } else {
    return (
      <Link href={href} passHref>
        <AnchorLink
          className={cn(
            className,
            'transition-colors',
            'motion-reduce:transition-none',
            'hover:text-gray-700 hover:bg-gray-100 hover:opacity-100',
            'dark:hover:text-white dark:hover:bg-gray-750'
          )}
        >
          {children}
        </AnchorLink>
      </Link>
    );
  }
}
