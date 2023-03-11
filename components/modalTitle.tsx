import React, { ReactNode } from 'react';
import cn from 'classnames';

type Props = { children: ReactNode };

export default function ModalTitle({ children }: Props) {
  return (
    <h5
      className={cn(
        'font-bold text-lg',
        'sm:text-xl',
        'md:text-2xl',
        'xl:text-3xl'
      )}
    >
      {children}
    </h5>
  );
}
