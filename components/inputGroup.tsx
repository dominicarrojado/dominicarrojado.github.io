import React, { ReactNode } from 'react';
import cn from 'classnames';

type Props = { children: ReactNode };

export default function InputGroup({ children }: Props) {
  return (
    <div className={cn('flex flex-col gap-4 mt-6', 'sm:flex-row')}>
      {children}
    </div>
  );
}
