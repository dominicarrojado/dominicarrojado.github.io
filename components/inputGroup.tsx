import React, { ReactNode } from 'react';
import cn from 'classnames';

export type Props = { children: ReactNode };

export default function InputGroup({ children }: Props) {
  return (
    <div className={cn('mt-6 flex flex-col gap-4', 'sm:flex-row')}>
      {children}
    </div>
  );
}
