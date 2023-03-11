import React from 'react';
import cn from 'classnames';
import { useMounted } from '../lib/custom-hooks';
import SocialItems from './socialItems';
import QuoteItems from './quoteItems';
import Copyright from './copyright';

export default function Footer() {
  const shouldDisplay = useMounted();

  return (
    <footer
      className={cn(
        'py-20 px-6 bg-gray-100 dark:bg-gray-850 overflow-hidden',
        'lg:overflow-auto',
        'transition-opacity duration-1000 delay-1750',
        'motion-reduce:transition-none',
        {
          'opacity-0': !shouldDisplay,
        }
      )}
      data-testid="footer"
    >
      <QuoteItems />
      <SocialItems />
      <Copyright />
    </footer>
  );
}
