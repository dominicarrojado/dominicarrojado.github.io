import React from 'react';
import { Button as ReakitButton, ButtonProps } from 'ariakit/button';
import cn from 'classnames';

export type Props = ButtonProps;

export default function Button({ children, ...props }: Props) {
  return (
    <ReakitButton
      {...props}
      className={cn(
        'inline-flex select-none items-center justify-center bg-gray-650 px-4 py-2 font-normal text-white',
        'disabled:opacity-30',
        'dark:bg-gray-200 dark:text-black',
        'transform transition-opacity-color hover:opacity-90 active:bg-black active:opacity-100',
        'motion-reduce:transition-none',
        'dark:active:bg-white',
        'sm:px-8 sm:py-3'
      )}
    >
      {children}
    </ReakitButton>
  );
}
