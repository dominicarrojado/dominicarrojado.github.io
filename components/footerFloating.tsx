import React from 'react';
import cn from 'classnames';
import { SCROLLBAR_WIDTH_CSS_VAR } from '../lib/constants';
import SubscribeButton from './subscribeButton';

export default function FooterFloating() {
  return (
    <footer
      className={cn('fixed bottom-0 z-40 flex w-full items-center justify-end')}
    >
      <div
        className={cn(
          'absolute bottom-3.5 right-3.5 ml-auto flex items-end gap-3',
          'sm:bottom-4 sm:right-4',
          'md:bottom-5 md:right-5',
          'lg:bottom-8 lg:right-8'
        )}
        style={{ paddingRight: `var(${SCROLLBAR_WIDTH_CSS_VAR}, 0)` }}
      >
        <SubscribeButton />
      </div>
    </footer>
  );
}
