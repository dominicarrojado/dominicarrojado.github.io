import React, { useMemo } from 'react';
import cn from 'classnames';
import NextLink from './nextLink';
import { Route } from '../lib/types';
import { MAIN_TITLE } from '../lib/constants';

export default function Copyright() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <p
      className={cn(
        'mt-4 text-gray-400 text-sm text-center',
        'sm:text-base',
        'lg:mt-10',
        'xl:text-lg'
      )}
    >
      <span className="font-normal">
        ©{currentYear} {MAIN_TITLE}
      </span>{' '}
      <span className="block mt-1 sm:hidden" />
      <span className="hidden sm:inline">·</span>{' '}
      <NextLink href={Route.PRIVACY_POLICY}>
        <a>Privacy Policy</a>
      </NextLink>{' '}
      ·{' '}
      <NextLink href={Route.DISCLAIMER}>
        <a>Disclaimer</a>
      </NextLink>
    </p>
  );
}
