import React, { forwardRef, ForwardedRef } from 'react';
import { Input as ReakitInput, InputProps } from 'reakit/Input';
import cn from 'classnames';

const Input = forwardRef(
  (
    { className, ...props }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => (
    <ReakitInput
      {...props}
      ref={ref}
      className={cn(
        className,
        'block w-full rounded-none border-0 py-2 px-4 ring-1 ring-inset ring-gray-300 text-black outline-none placeholder:text-gray-400',
        'disabled:opacity-40',
        'dark:ring-gray-400 dark:bg-gray-850 dark:text-white dark:placeholder:text-gray-500',
        'focus:ring-2 focus:ring-inset focus:ring-black',
        'dark:focus:ring-white',
        'sm:py-3'
      )}
    />
  )
);

Input.displayName = 'Input';

export default Input;
