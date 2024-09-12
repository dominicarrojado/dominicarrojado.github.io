import React, { ReactNode } from 'react';
import cn from 'classnames';

export type Props = { children: ReactNode };

export default function ModalTitle({ children }: Props) {
  return (
    <h5
      className={cn(
        'text-lg font-bold',
        'sm:text-xl',
        'md:text-2xl',
        'xl:text-3xl'
      )}
    >
      {children}
    </h5>
  );
}
