import React from 'react';
import cn from 'classnames';
import { Button, ButtonProps } from 'reakit/Button';

type Props = ButtonProps;

export default function ModalCloseButton({ className, ...props }: Props) {
  return (
    <Button
      {...props}
      className={cn(
        className,
        'flex flex-col items-center justify-center text-gray-400 select-none',
        'transition-colors hover:text-gray-900',
        'motion-reduce:transition-none',
        'dark:hover:text-gray-100'
      )}
      aria-label="Close"
    >
      <small>close</small>
    </Button>
  );
}
