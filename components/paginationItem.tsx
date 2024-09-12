import React, { ReactNode } from 'react';
import cn from 'classnames';
import AnchorLink from './anchorLink';
import NextLink from './nextLink';

export type Props = {
  children: ReactNode;
  isCurrent?: boolean;
  href?: string;
};

export default function PaginationItem({ children, href, isCurrent }: Props) {
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
      <NextLink href={href} passHref>
        <AnchorLink
          className={cn(
            className,
            'transition-colors',
            'motion-reduce:transition-none',
            'hover:bg-gray-100 hover:text-gray-700 hover:opacity-100',
            'dark:hover:bg-gray-750 dark:hover:text-white'
          )}
          aria-current={isCurrent ? 'page' : undefined}
        >
          {children}
        </AnchorLink>
      </NextLink>
    );
  }
}
