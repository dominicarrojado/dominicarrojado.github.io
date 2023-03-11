import React, { ReactNode } from 'react';
import cn from 'classnames';

export type Props = { children: ReactNode };

export default function ErrorText({ children }: Props) {
  return (
    <div className={cn('mt-4 text-rose-600', 'dark:text-rose-400')}>
      {children}
    </div>
  );
}
