import React, { ReactNode } from 'react';
import cn from 'classnames';

export type Props = { children: ReactNode };

export default function ModalContent({ children }: Props) {
  return (
    <div
      className={cn(
        'border border-gray-400 p-6',
        'dark:border-gray-300',
        'md:p-8',
        'lg:p-10'
      )}
    >
      {children}
    </div>
  );
}
