import React from 'react';
import cn from 'classnames';
import { useDialogOffsetWidth } from '../lib/custom-hooks';
import SubscribeButton from './subscribeButton';

function FooterFloating() {
  const dialogOffsetWidth = useDialogOffsetWidth();

  return (
    <footer
      className={cn('fixed flex items-center justify-end bottom-0 w-full z-50')}
    >
      <div
        className={cn(
          'absolute bottom-3.5 right-3.5 flex items-end gap-3 ml-auto',
          'sm:bottom-4 sm:right-4',
          'md:bottom-5 md:right-5',
          'lg:bottom-8 lg:right-8'
        )}
        style={{ paddingRight: `${dialogOffsetWidth}px` }}
      >
        <SubscribeButton />
      </div>
    </footer>
  );
}

export default FooterFloating;
