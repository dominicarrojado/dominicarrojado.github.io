import React from 'react';
import cn from 'classnames';
import SocialItems from './socialItems';
import QuoteItems from './quoteItems';
import Copyright from './copyright';

export default function Footer() {
  return (
    <footer
      className={cn(
        'py-20 px-6 bg-gray-100 dark:bg-gray-850 overflow-hidden',
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
