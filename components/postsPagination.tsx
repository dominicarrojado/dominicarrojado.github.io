import React from 'react';
import cn from 'classnames';
import { getPaginationItems } from '../lib/pagination';
import { useMounted } from '../lib/custom-hooks';
import PaginationArrow from './paginationArrow';
import PaginationItem from './paginationItem';
import { Route } from '../lib/types';
import { PAGINATION_MAX_LENGTH } from '../lib/constants';

export type Props = {
  currentPage: number;
  lastPage: number;
};

export default function PostsPagination({ currentPage, lastPage }: Props) {
  const shouldDisplay = useMounted();
  const paginationItems = getPaginationItems(
    currentPage,
    lastPage,
    PAGINATION_MAX_LENGTH
  );

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        'transform transition-transform-opacity duration-700',
        'motion-reduce:transition-none',
        {
          'opacity-0': !shouldDisplay,
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
