import React from 'react';
import { Button as ReakitButton, ButtonProps } from 'reakit/Button';
import cn from 'classnames';

export type Props = ButtonProps;

export default function Button({ children, ...props }: Props) {
  return (
    <ReakitButton
      {...props}
      className={cn(
        'inline-flex items-center justify-center px-4 py-2 bg-gray-650 text-white font-normal select-none',
        'disabled:opacity-30',
        'dark:bg-gray-200 dark:text-black',
        'transform transition-opacity-color hover:opacity-90 active:opacity-100 active:bg-black',
        'motion-reduce:transition-none',
        'dark:active:bg-white',
        'sm:px-8 sm:py-3'
      )}
    >
      {children}
    </ReakitButton>
  );
}
