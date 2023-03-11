import React, { ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';
import { Quote } from '../lib/types';

type Props = { quote: Quote; isActive: boolean };

const QuoteItem = forwardRef(
  ({ quote, isActive }: Props, ref: ForwardedRef<HTMLLIElement>) => (
    <li
      ref={ref}
      className={cn(
        'absolute top-0 left-0 w-full',
        'transition-opacity duration-1000',
        'motion-reduce:transition-none',
        {
          'opacity-0 pointer-events-none': !isActive,
        }
      )}
    >
      <blockquote>“{quote.quote}”</blockquote>
      <p className={cn('mt-1', 'sm:mt-2')}>— {quote.author}</p>
    </li>
  )
);

QuoteItem.displayName = 'QuoteItem';

export default QuoteItem;
