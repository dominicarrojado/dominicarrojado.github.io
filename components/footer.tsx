import React from 'react';
import cn from 'classnames';
import SocialItems from './socialItems';
import QuoteItems from './quoteItems';
import Copyright from './copyright';

export default function Footer() {
  return (
    <footer
      className={cn(
        'overflow-hidden bg-gray-100 px-6 py-20 dark:bg-gray-850',
        'lg:overflow-auto'
      )}
      data-testid="footer"
    >
      <QuoteItems />
      <SocialItems />
      <Copyright />
    </footer>
  );
}
